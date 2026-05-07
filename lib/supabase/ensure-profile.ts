type AuthLikeUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    username?: string;
  };
};

function formatUsername(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}

export async function ensureUserProfile(
  supabase: any,
  user: AuthLikeUser,
) {
  const fullName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Ethioweb User";
  const usernameBase = user.user_metadata?.username || fullName.replace(/\s+/g, "");
  const username = formatUsername(usernameBase) || `user${user.id.slice(0, 6)}`;

  return supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    username,
    visibility: "public",
    updated_at: new Date().toISOString(),
  });
}