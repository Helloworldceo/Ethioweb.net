"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronUp, Globe, LogOut, Mail, Settings, Shield, UserRound } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type UserProfile = {
  username: string;
  full_name: string;
  avatar_url: string | null;
};

const BUSINESS_EMAIL = "helloworldceo@1gmail.com";
const BUSINESS_PORTFOLIO = "https://helloworldceo.github.io/";

export function ProfileDock() {
  const pathname = usePathname();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    async function loadSessionAndProfile() {
      if (!supabase) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setIsAuthenticated(false);
        setProfile(null);
        return;
      }

      setIsAuthenticated(true);

      const { data } = await supabase
        .from("profiles")
        .select("username,full_name,avatar_url")
        .eq("id", user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
      }
    }

    loadSessionAndProfile();

    if (!supabase) return;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!session?.user) {
        setIsAuthenticated(false);
        setProfile(null);
        return;
      }

      setIsAuthenticated(true);
      const { data } = await supabase
        .from("profiles")
        .select("username,full_name,avatar_url")
        .eq("id", session.user.id)
        .maybeSingle();

      if (data) {
        setProfile(data);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    setOpen(false);
    window.location.href = "/";
  }

  const initials = (profile?.full_name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "U";

  if (!isAuthenticated || !profile) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-40">
      {open && (
        <div className="mb-2 w-72 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3 shadow-xl">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-[var(--paper)] p-2">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="h-10 w-10 rounded-full border border-[var(--line)] object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] text-sm font-bold">
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-[var(--ink)]">{profile.full_name}</p>
              <p className="truncate text-xs text-[var(--muted)]">@{profile.username}</p>
            </div>
          </div>

          <nav className="grid gap-1 text-sm">
            <Link className="rounded-lg px-3 py-2 hover:bg-[var(--paper)]" href="/dashboard#profile-basics">
              <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4" />Edit Profile</span>
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-[var(--paper)]" href="/dashboard#settings">
              <span className="inline-flex items-center gap-2"><Settings className="h-4 w-4" />Settings</span>
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-[var(--paper)]" href="/privacy">
              <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4" />Privacy</span>
            </Link>
            <Link className="rounded-lg px-3 py-2 hover:bg-[var(--paper)]" href={`/u/${profile.username}`}>
              <span className="inline-flex items-center gap-2"><Globe className="h-4 w-4" />Public Profile</span>
            </Link>
          </nav>

          <div className="my-2 border-t border-[var(--line)]" />

          <div className="space-y-1 px-1 text-xs text-[var(--muted)]">
            <a href={`mailto:${BUSINESS_EMAIL}`} className="block truncate hover:text-[var(--ink)]">
              <span className="inline-flex items-center gap-2"><Mail className="h-3.5 w-3.5" />{BUSINESS_EMAIL}</span>
            </a>
            <a href={BUSINESS_PORTFOLIO} target="_blank" rel="noreferrer" className="block truncate hover:text-[var(--ink)]">
              Portfolio
            </a>
          </div>

          <button
            type="button"
            onClick={logout}
            className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--line)] px-3 py-2 text-sm font-semibold text-[var(--ink)] hover:bg-[var(--paper)]"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm font-semibold text-[var(--ink)] shadow-md"
        aria-label={open ? "Close profile tools" : "Open profile tools"}
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] text-xs font-bold">
          {initials}
        </span>
        <span className="hidden sm:inline">Profile</span>
        <ChevronUp className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
    </div>
  );
}
