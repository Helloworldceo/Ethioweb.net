import { getSupabaseServerClient } from "@/lib/supabase/server";

type ServerSupabaseClient = NonNullable<Awaited<ReturnType<typeof getSupabaseServerClient>>>;

type ViewerProfile = {
  id: string;
  username: string;
  role: string | null;
};

export type ViewerContext = {
  user: Awaited<ReturnType<ServerSupabaseClient["auth"]["getUser"]>>["data"]["user"];
  profile: ViewerProfile | null;
  isAdmin: boolean;
};

export async function getViewerContext(supabase: ServerSupabaseClient): Promise<ViewerContext> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null, isAdmin: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username, role")
    .eq("id", user.id)
    .maybeSingle();

  const isAdmin = profile?.role?.toLowerCase() === "admin";

  return {
    user,
    profile,
    isAdmin,
  };
}
