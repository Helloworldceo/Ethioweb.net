import { notFound } from "next/navigation";
import { Mail } from "lucide-react";
import { demoProfiles } from "@/lib/site";
import { getSupabaseServerClient } from "@/lib/supabase/server";

type PublicProfilePageProps = {
  params: Promise<{ username: string }>;
};

type ProfileDetails = {
  name: string;
  username: string;
  avatarUrl: string;
  role: string;
  location: string;
  bio: string;
  publicEmail: string;
  links: { label: string; href: string }[];
  publicAssets: {
    cv: string;
    portfolio: string;
    businessCard: string;
  };
};

async function loadPublicProfile(username: string): Promise<ProfileDetails | null> {
  const supabase = await getSupabaseServerClient();

  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("id,username,full_name,avatar_url,role,location,bio")
      .eq("username", username)
      .eq("visibility", "public")
      .maybeSingle();

    if (profile) {
      const [{ data: links }, { data: assets }] = await Promise.all([
        supabase
          .from("profile_links")
          .select("label,url")
          .eq("profile_id", profile.id)
          .eq("is_public", true)
          .order("sort_order", { ascending: true }),
        supabase
          .from("profile_assets")
          .select("asset_kind,public_url,is_public")
          .eq("profile_id", profile.id)
          .eq("is_public", true),
      ]);

      const resolveAsset = (kind: string) =>
        assets?.find((item) => item.asset_kind === kind && item.public_url)?.public_url || "";

      return {
        name: profile.full_name,
        username: profile.username,
        avatarUrl: profile.avatar_url || "",
        role: profile.role || "Professional",
        location: profile.location || "",
        bio: profile.bio || "",
        publicEmail: "",
        links: (links || []).map((item) => ({ label: item.label, href: item.url })),
        publicAssets: {
          cv: resolveAsset("cv"),
          portfolio: resolveAsset("portfolio"),
          businessCard: resolveAsset("business_card"),
        },
      };
    }
  }

  return demoProfiles.find((item) => item.username === username) || null;
}

export async function generateMetadata({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const profile = await loadPublicProfile(username);

  if (!profile) {
    return { title: "Profile not found" };
  }

  return {
    title: `${profile.name} (@${profile.username})`,
    description: profile.bio,
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";
}

export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { username } = await params;
  const profile = await loadPublicProfile(username);

  if (!profile) {
    notFound();
  }

  return (
    <section className="container-wrap py-12">
      <article className="card p-7">
        <p className="chip">Public Profile</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-start">
          {profile.avatarUrl ? (
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="h-28 w-28 rounded-3xl border border-[var(--line)] object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-28 w-28 items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] text-3xl font-black text-[var(--brand)]">
              {getInitials(profile.name)}
            </div>
          )}

          <div>
            <h1 className="heading-display text-4xl font-black">{profile.name}</h1>
            <p className="mt-1 text-sm font-semibold text-[var(--brand)]">@{profile.username}</p>
            <p className="mt-3 text-[var(--muted)]">{profile.role} • {profile.location}</p>
            <p className="mt-4 max-w-2xl leading-8 text-[var(--muted)]">{profile.bio}</p>
          </div>
        </div>

        {profile.publicEmail && (
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--muted)]">
            <Mail className="h-4 w-4" />
            {profile.publicEmail}
          </p>
        )}

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <p className="text-sm font-semibold">Public Downloads</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {profile.publicAssets.cv && (
                <a href={profile.publicAssets.cv} className="btn-secondary text-sm">Download CV</a>
              )}
              {profile.publicAssets.portfolio && (
                <a href={profile.publicAssets.portfolio} className="btn-secondary text-sm">Download Portfolio</a>
              )}
              {profile.publicAssets.businessCard && (
                <a href={profile.publicAssets.businessCard} className="btn-secondary text-sm">Business Card</a>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--line)] bg-white p-4">
            <p className="text-sm font-semibold">Links</p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--muted)]">
              {profile.links.map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="font-semibold text-[var(--brand)]" target="_blank" rel="noreferrer">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
