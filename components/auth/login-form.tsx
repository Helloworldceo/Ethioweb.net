"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { getOAuthProviderSetupMessage, isOAuthProviderEnabled } from "@/lib/supabase/oauth-providers";
import { useLanguage } from "@/components/i18n/language-provider";

type LoginFormProps = {
  initialError?: string;
};

export function LoginForm({ initialError }: LoginFormProps) {
  const router = useRouter();
  const { t } = useLanguage();

  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  async function handlePasswordLogin(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!supabase) {
      setError(t("Supabase is not configured yet.", "Supabase እስካሁን አልተዋቀረም።"));
      return;
    }

    setLoading(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  async function handleOAuth(provider: "google" | "facebook") {
    if (!supabase) {
      setError(t("Supabase is not configured yet.", "Supabase እስካሁን አልተዋቀረም።"));
      return;
    }

    if (!isOAuthProviderEnabled(provider)) {
      setError(getOAuthProviderSetupMessage(provider));
      return;
    }

    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${callbackOrigin}/auth/callback`,
      },
    });

    if (oauthError) {
      setError(oauthError.message);
    }
  }

  return (
    <section className="container-wrap py-14">
      <div className="card mx-auto max-w-lg p-7">
        <h1 className="heading-display text-3xl font-black">{t("Welcome back", "እንኳን ደህና መጡ")}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {t(
            "Login to manage your profile, files, and visibility settings.",
            "ፕሮፋይልዎን እና ፋይሎችዎን ከዚህ ያስተዳድሩ።",
          )}
        </p>

        {(error || initialError) && (
          <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error || initialError}
          </p>
        )}

        <form className="mt-6 space-y-3" onSubmit={handlePasswordLogin}>
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
            type="email"
            placeholder={t("Email", "ኢሜይል")}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-[var(--panel)] p-3 text-[var(--ink)] placeholder:text-[var(--muted)]"
            type="password"
            placeholder={t("Password", "የምስጢር ቃል")}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? t("Signing in...", "በመግባት ላይ...") : t("Login", "ይግቡ")}
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => handleOAuth("google")}
            type="button"
            disabled={!isOAuthProviderEnabled("google")}
            title={!isOAuthProviderEnabled("google") ? getOAuthProviderSetupMessage("google") : undefined}
          >
            {isOAuthProviderEnabled("google")
              ? t("Continue with Google", "በGoogle ቀጥል")
              : t("Google setup pending", "Google ማዋቀር በሂደት ላይ ነው")}
          </button>
          <button
            className="btn-secondary disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => handleOAuth("facebook")}
            type="button"
            disabled={!isOAuthProviderEnabled("facebook")}
            title={!isOAuthProviderEnabled("facebook") ? getOAuthProviderSetupMessage("facebook") : undefined}
          >
            {isOAuthProviderEnabled("facebook")
              ? t("Continue with Facebook", "በFacebook ቀጥል")
              : t("Facebook setup pending", "Facebook ማዋቀር በሂደት ላይ ነው")}
          </button>
        </div>

        <p className="mt-3 text-xs leading-6 text-[var(--muted)]">
          {t(
            "Social sign-in only works after the provider is enabled in Supabase for this environment.",
            "የማህበራዊ መግቢያ የሚሠራው አቅራቢው በዚህ አካባቢ በSupabase ከተነቃ በኋላ ብቻ ነው።",
          )}
        </p>

        <p className="mt-4 text-sm text-[var(--muted)]">
          {t("No account?", "መለያ የለዎትም?")} <Link className="font-semibold text-[var(--brand)]" href="/auth/signup">{t("Create one", "መለያ ይፍጠሩ")}</Link>
        </p>
      </div>
    </section>
  );
}
