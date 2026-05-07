"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/site";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguage } from "@/components/i18n/language-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

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
      <div className="container-wrap py-3 md:py-0">
        <div className="flex min-h-14 items-center justify-between gap-3 md:min-h-20">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/Logo.png"
              alt="Ethioweb logo"
              width={36}
              height={36}
              className="h-9 w-9 rounded-lg object-cover"
            />
            <span className="heading-display truncate text-lg font-extrabold tracking-tight sm:text-xl">
              Ethioweb
              <span className="ml-1.5 text-xs align-middle text-[var(--brand)]">.net</span>
            </span>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher />
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

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)]"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((prev) => !prev)}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
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

        <div className={menuOpen ? "mt-3 grid gap-2 border-t border-[var(--line)] pt-3 md:hidden" : "hidden"}>
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "rounded-xl bg-[var(--paper)] px-3 py-2 text-sm font-semibold text-[var(--brand)]" : "rounded-xl px-3 py-2 text-sm font-semibold text-[var(--muted)]"}
              >
                {t(item.labelEn, item.labelAm)}
              </Link>
            );
          })}

          <div className="grid grid-cols-2 gap-2 pt-1">
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
      </div>
    </header>
  );
}
