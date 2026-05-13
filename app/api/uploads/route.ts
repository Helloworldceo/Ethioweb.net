import { NextRequest, NextResponse } from "next/server";
import {
  applyResponseCookies,
  getSupabaseRouteHandlerClient,
  hasSupabaseEnv,
} from "@/lib/supabase/server";
import { ensureUserProfile } from "@/lib/supabase/ensure-profile";
import { writeAuditEvent } from "@/lib/audit";

const ALLOWED_TYPES = ["application/pdf", "image/png", "image/jpeg"];
const IMAGE_TYPES = ["image/png", "image/jpeg"];

export async function POST(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const response = NextResponse.next();
  const supabase = getSupabaseRouteHandlerClient(request, response);

  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return applyResponseCookies(response, NextResponse.json({ error: "Unauthorized" }, { status: 401 }));
  }

  const { error: profileError } = await ensureUserProfile(supabase, user);

  if (profileError) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: profileError.message }, { status: 500 }),
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");
  const kind = formData.get("kind")?.toString() ?? "other";
  const isPublic = formData.get("isPublic")?.toString() === "true";
  const isAvatarUpload = kind === "avatar";

  if (!(file instanceof File)) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: "Missing file." }, { status: 400 }),
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: "Unsupported file type" }, { status: 400 }),
    );
  }

  if (isAvatarUpload && !IMAGE_TYPES.includes(file.type)) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: "Profile photos must be PNG or JPEG." }, { status: 400 }),
    );
  }

  const extension = file.name.split(".").pop() ?? "dat";
  const path = `${user.id}/${isAvatarUpload ? "avatar" : kind}-${Date.now()}.${extension}`;

  const { error } = await supabase.storage.from("profile-files").upload(path, file, {
    contentType: file.type,
    upsert: true,
  });

  if (error) {
    return applyResponseCookies(response, NextResponse.json({ error: error.message }, { status: 500 }));
  }

  const { data } = supabase.storage.from("profile-files").getPublicUrl(path);

  if (isAvatarUpload) {
    const { error: avatarError } = await supabase
      .from("profiles")
      .update({ avatar_url: data.publicUrl, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    if (avatarError) {
      return applyResponseCookies(
        response,
        NextResponse.json({ error: avatarError.message }, { status: 500 }),
      );
    }

    await writeAuditEvent({
      action: "profile.avatar.upload",
      actorId: user.id,
      resource: "profile-files",
      metadata: { path },
    });

    return applyResponseCookies(
      response,
      NextResponse.json({ ok: true, kind: "avatar", path, publicUrl: data.publicUrl }),
    );
  }

  const { error: insertError } = await supabase.from("profile_assets").insert({
    profile_id: user.id,
    asset_kind: kind,
    title: file.name,
    file_path: path,
    public_url: data.publicUrl,
    is_public: isPublic,
  });

  if (insertError) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: insertError.message }, { status: 500 }),
    );
  }

  await writeAuditEvent({
    action: "profile.asset.upload",
    actorId: user.id,
    resource: "profile-files",
    metadata: { path, kind, isPublic },
  });

  return applyResponseCookies(response, NextResponse.json({ ok: true, path, publicUrl: data.publicUrl }));
}
