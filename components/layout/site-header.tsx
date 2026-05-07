"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { navItems } from "@/lib/site";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguage } from "@/components/i18n/language-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    let active = true;

    if (!supabase) {
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setIsAuthenticated(Boolean(data.session));
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  async function logout() {
    if (!supabase) {
      return;
    }

    await supabase.auth.signOut();
    setIsAuthenticated(false);
    window.location.href = "/";
  }

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)]/90 bg-[color:color-mix(in_srgb,var(--paper)_88%,white_12%)]/90 backdrop-blur">
      <div className="container-wrap relative flex min-h-20 items-center justify-between pr-28 md:pr-36">
        <div className="absolute right-1 top-1 md:right-0 md:top-1.5">
          <LanguageSwitcher />
        </div>

        <Link href="/" className="heading-display text-xl font-extrabold tracking-tight">
          Ethioweb
          <span className="ml-2 text-xs align-middle text-[var(--brand)]">.net</span>
        </Link>

        <nav className="hidden items-center gap-6 pt-4 text-sm font-semibold md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "text-[var(--brand)]" : "text-[var(--muted)] hover:text-[var(--ink)]"}
              >
                {t(item.labelEn, item.labelAm)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 pt-4">
          {isAuthenticated ? (
            <>
              <Link href="/dashboard" className="btn-secondary text-sm">
                {t("Dashboard", "ዳሽቦርድ")}
              </Link>
              <button className="btn-primary text-sm" onClick={logout} type="button">
                {t("Logout", "ውጣ")}
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="btn-secondary text-sm">
                {t("Login", "ይግቡ")}
              </Link>
              <Link href="/auth/signup" className="btn-primary text-sm">
                {t("Get Started", "ጀምር")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
