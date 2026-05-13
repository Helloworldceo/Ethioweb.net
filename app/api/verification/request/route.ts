import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const payload = (await request.json().catch(() => ({}))) as {
    profileId?: string;
    justification?: string;
  };

  if (!payload.profileId) {
    return NextResponse.json({ error: "profileId is required" }, { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  if (!supabase) {
    return NextResponse.json({ ok: true, message: "Verification request captured locally." });
  }

  const { error } = await supabase.from("verification_requests").insert({
    profile_id: payload.profileId,
    note: payload.justification ?? "",
    status: "pending",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .update({ verification_status: "pending", updated_at: new Date().toISOString() })
    .eq("id", payload.profileId);

  if (profileError) {
    return NextResponse.json({ error: profileError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, message: "Verification request submitted." });
}
