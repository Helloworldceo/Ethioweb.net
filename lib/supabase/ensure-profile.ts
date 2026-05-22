type AuthLikeUser = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    username?: string;
  };
};

type ProfileUpsertPayload = {
  id: string;
  full_name: string;
  username: string;
  avatar_url?: string | null;
  visibility: "public";
  updated_at: string;
};

type SupabaseProfileWriter = {
  from: (...args: unknown[]) => {
    select: (...args: unknown[]) => {
      eq: (...args: unknown[]) => {
        maybeSingle: () => Promise<{ data: { id: string; username: string } | null }>;
      };
    };
    upsert: (payload: ProfileUpsertPayload) => Promise<unknown>;
  };
};

function formatUsername(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 24);
}

function appendNumericSuffix(base: string, suffix: number) {
  const suffixText = String(suffix);
  const trimmedBase = base.slice(0, Math.max(1, 24 - suffixText.length));
  return `${trimmedBase}${suffixText}`;
}

async function resolveUniqueUsername(
  supabase: SupabaseProfileWriter,
  requestedUsername: string,
  userId: string,
) {
  const base = formatUsername(requestedUsername) || `user${userId.slice(0, 6)}`;

  for (let index = 0; index < 500; index += 1) {
    const candidate = index === 0 ? base : appendNumericSuffix(base, index);
    const { data: existing } = await supabase
      .from("profiles")
      .select("id,username")
      .eq("username", candidate)
      .maybeSingle();

    if (!existing || existing.id === userId) {
      return candidate;
    }
  }

  return `user${userId.replace(/-/g, "").slice(0, 12)}`;
}

export async function ensureUserProfile(
  supabase: SupabaseProfileWriter,
  user: AuthLikeUser,
  options?: {
    fullName?: string;
    username?: string;
    avatarUrl?: string | null;
  },
) {
  const fullName =
    options?.fullName ||
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Ethioweb User";

  const { data: existingProfile } = await supabase
    .from("profiles")
    .select("id,username")
    .eq("id", user.id)
    .maybeSingle();

  const usernameBase =
    options?.username ||
    user.user_metadata?.username ||
    fullName.replace(/\s+/g, "");

  const username = existingProfile?.username
    ? existingProfile.username
    : await resolveUniqueUsername(supabase, usernameBase, user.id);

  const result = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: fullName,
    username,
    avatar_url: options?.avatarUrl,
    visibility: "public",
    updated_at: new Date().toISOString(),
  });

  return {
    error: (result as { error?: { message: string } | null }).error ?? null,
  };
}
