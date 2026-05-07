"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useLanguage } from "@/components/i18n/language-provider";

export function SignupForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const callbackOrigin =
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  async function handleSignup(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);

    if (!supabase) {
      setError("Supabase is not configured yet.");
      return;
    }

    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${callbackOrigin}/auth/callback`,
        data: {
          full_name: fullName,
          username,
        },
      },
    });

    if (signupError) {
      setLoading(false);
      setError(signupError.message);
      return;
    }

    if (data.user) {
      await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
        }),
      });
    }

    setLoading(false);

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setMessage("Check your email to confirm your account, then continue to your dashboard.");
  }

  async function handleOAuth(provider: "google" | "facebook") {
    if (!supabase) {
      setError("Supabase is not configured yet.");
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
        <h1 className="heading-display text-3xl font-black">{t("Create your Ethioweb account", "የEthioweb መለያ ይፍጠሩ")}</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          {t(
            "Launch your public profile and professional dashboard in minutes.",
            "የሕዝብ ፕሮፋይልዎን እና ዳሽቦርድዎን በጥቂት ደቂቃዎች ያስጀምሩ።",
          )}
        </p>

        {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {message && <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</p>}

        <form className="mt-6 space-y-3" onSubmit={handleSignup}>
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
            placeholder="Full name"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
            required
          />
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <input
            className="w-full rounded-xl border border-[var(--line)] bg-white p-3"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? t("Creating...", "በመፍጠር ላይ...") : t("Create Account", "መለያ ፍጠር")}
          </button>
        </form>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button className="btn-secondary" onClick={() => handleOAuth("google")} type="button">
            Google Sign Up
          </button>
          <button className="btn-secondary" onClick={() => handleOAuth("facebook")} type="button">
            Facebook Sign Up
          </button>
        </div>

        <p className="mt-4 text-sm text-[var(--muted)]">
          {t("Already have an account?", "አስቀድሞ መለያ አለዎት?")} <Link className="font-semibold text-[var(--brand)]" href="/auth/login">{t("Login", "ይግቡ")}</Link>
        </p>
      </div>
    </section>
  );
}
