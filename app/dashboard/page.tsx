import { redirect } from "next/navigation";
import { DashboardClient } from "@/components/dashboard/dashboard-client";
import { ensureUserProfile } from "@/lib/supabase/ensure-profile";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard",
  description: "Manage profile, uploads, and visibility controls.",
};

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient();

  if (!supabase) {
    return (
      <section className="container-wrap py-12">
        <div className="card p-6">
          <h1 className="heading-display text-3xl font-black">Supabase is not configured</h1>
          <p className="mt-3 text-[var(--muted)]">
            Add your Supabase environment variables to continue.
          </p>
        </div>
      </section>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  await ensureUserProfile(supabase, user);

  const [{ data: profile }, { data: assets }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
    supabase.from("profile_assets").select("*").eq("profile_id", user.id).order("created_at", { ascending: false }),
  ]);

  return <DashboardClient initialProfile={profile} initialAssets={assets ?? []} />;
}
