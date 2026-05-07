import { NextRequest, NextResponse } from "next/server";
import {
  applyResponseCookies,
  getSupabaseRouteHandlerClient,
  hasSupabaseEnv,
} from "@/lib/supabase/server";

function formatUsername(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}

export async function GET(request: NextRequest) {
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

  const [{ data: profile, error: profileError }, { data: assets, error: assetsError }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("profile_assets").select("*").eq("profile_id", user.id).order("created_at", { ascending: false }),
  ]);

  if (profileError || assetsError) {
    return applyResponseCookies(
      response,
      NextResponse.json(
        { error: profileError?.message || assetsError?.message || "Unable to load profile" },
        { status: 500 },
      ),
    );
  }

  return applyResponseCookies(response, NextResponse.json({ profile, assets: assets ?? [] }));
}

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

  const payload = (await request.json().catch(() => ({}))) as {
    fullName?: string;
    username?: string;
  };

  const fullName =
    payload.fullName ||
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "Ethioweb User";
  const usernameBase =
    payload.username ||
    (user.user_metadata?.username as string | undefined) ||
    fullName.replace(/\s+/g, "");
  const username = formatUsername(usernameBase) || `user${user.id.slice(0, 6)}`;

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    username,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return applyResponseCookies(response, NextResponse.json({ error: error.message }, { status: 500 }));
  }

  return applyResponseCookies(response, NextResponse.json({ ok: true }));
}

export async function PATCH(request: NextRequest) {
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

  const payload = (await request.json()) as {
    fullName?: string;
    username?: string;
    role?: string;
    location?: string;
    bio?: string;
    visibility?: "public" | "private";
  };

  if (!payload.username || !payload.fullName) {
    return applyResponseCookies(
      response,
      NextResponse.json({ error: "fullName and username are required" }, { status: 400 }),
    );
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: payload.fullName,
      username: formatUsername(payload.username),
      role: payload.role,
      location: payload.location,
      bio: payload.bio,
      visibility: payload.visibility,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) {
    return applyResponseCookies(response, NextResponse.json({ error: error.message }, { status: 500 }));
  }

  return applyResponseCookies(response, NextResponse.json({ ok: true }));
}
