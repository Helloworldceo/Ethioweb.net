import { NextRequest, NextResponse } from "next/server";
import { demoProfiles } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim().toLowerCase() ?? "";

  const supabase = await getSupabaseServerClient();

  if (supabase) {
    let builder = supabase
      .from("profiles")
      .select("username,full_name,role")
      .eq("visibility", "public")
      .limit(24);

    if (query) {
      builder = builder.or(`full_name.ilike.%${query}%,username.ilike.%${query}%`);
    }

    const { data, error } = await builder;

    if (!error && data) {
      const items = data.map((item) => ({
        username: item.username,
        name: item.full_name,
        role: item.role || "Professional",
        location: "",
        bio: "",
        publicEmail: "",
        links: [],
        publicAssets: {
          cv: "",
          portfolio: "",
          businessCard: "",
        },
      }));

      return NextResponse.json({ items });
    }
  }

  if (!query) {
    return NextResponse.json({ items: demoProfiles });
  }

  const items = demoProfiles.filter((profile) => {
    const name = profile.name.toLowerCase();
    const username = profile.username.toLowerCase();

    return name.includes(query) || username.includes(query);
  });

  return NextResponse.json({ items });
}
