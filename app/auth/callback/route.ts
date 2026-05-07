import { NextRequest, NextResponse } from "next/server";
import {
  applyResponseCookies,
  getSupabaseRouteHandlerClient,
  hasSupabaseEnv,
} from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  if (!hasSupabaseEnv()) {
    return NextResponse.redirect(new URL("/auth/login?error=supabase_not_configured", request.url));
  }

  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/auth/login?error=${encodeURIComponent(error)}`, request.url));
  }

  if (!code) {
    return NextResponse.redirect(new URL("/auth/login?error=missing_code", request.url));
  }

  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  const supabase = getSupabaseRouteHandlerClient(request, response);

  if (!supabase) {
    return NextResponse.redirect(new URL("/auth/login?error=supabase_not_configured", request.url));
  }

  const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

  if (exchangeError) {
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(exchangeError.message)}`, request.url),
    );
  }

  const user = data.user;
  if (user) {
    const fullName =
      (user.user_metadata?.full_name as string | undefined) ||
      user.email?.split("@")[0] ||
      "New User";
    const avatarUrl =
      (user.user_metadata?.avatar_url as string | undefined) ||
      (user.user_metadata?.picture as string | undefined) ||
      null;
    const requestedUsername =
      (user.user_metadata?.username as string | undefined) || fullName.replace(/\s+/g, "");
    const username = requestedUsername
      .toLowerCase()
      .replace(/[^a-z0-9_]/g, "")
      .slice(0, 18) || `user${user.id.slice(0, 6)}`;

    await supabase.from("profiles").upsert({
      id: user.id,
      full_name: fullName,
      username,
      avatar_url: avatarUrl,
      visibility: "public",
      updated_at: new Date().toISOString(),
    });
  }

  return applyResponseCookies(response, NextResponse.redirect(new URL("/dashboard", request.url)));
}
