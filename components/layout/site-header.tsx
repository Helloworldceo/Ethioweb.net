"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { useLanguage } from "@/components/i18n/language-provider";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { navItems } from "@/lib/site";

const primaryHeaderLinks = navItems.filter((item) =>
  ["/", "/about", "/services", "/contact"].includes(item.href),
);

const secondaryHeaderLinks = navItems.filter((item) =>
  !["/", "/about", "/services", "/contact"].includes(item.href),
);

export function SiteHeader() {
  const pathname = usePathname();
  const { t, language } = useLanguage();
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

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
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[color:color-mix(in_srgb,var(--paper)_86%,white_14%)]/90 backdrop-blur-sm">
      <div className="container-wrap flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/newlogo.png"
              alt="Ethioweb logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-lg object-cover"
            />
            <span className="heading-display truncate text-lg font-semibold text-[var(--ink)] sm:text-xl">
              Ethioweb
            </span>
        </Link>

        <div className="hidden flex-1 items-center justify-between gap-6 lg:flex">
          <nav className="flex items-center gap-2 xl:gap-3">
            {primaryHeaderLinks.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active
                    ? "rounded-full border border-[color:color-mix(in_srgb,var(--brand)_35%,white_65%)] bg-[color:color-mix(in_srgb,var(--brand)_12%,white_88%)] px-4 py-2 text-sm font-semibold text-[var(--brand)]"
                    : "rounded-full border border-transparent px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--line)] hover:bg-[var(--panel)] hover:text-[var(--ink)]"
                  }
                >
                  {language === "am" ? item.labelAm : item.labelEn}
                </Link>
              );
            })}

            <div className="relative shrink-0">
              <button
                type="button"
                aria-expanded={moreMenuOpen}
                className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:border-[var(--line)] hover:bg-[var(--panel)] hover:text-[var(--ink)]"
                onClick={() => setMoreMenuOpen((open) => !open)}
              >
                {t("More", "ተጨማሪ")}
              </button>

              {moreMenuOpen ? (
                <div className="absolute left-0 top-[calc(100%+0.75rem)] z-20 w-64 rounded-3xl border border-[var(--line)] bg-[var(--paper)] p-3 shadow-[0_24px_48px_rgba(20,33,61,0.16)]">
                  <div className="grid gap-1">
                    {secondaryHeaderLinks.map((item) => {
                      const active = pathname === item.href;

                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setMoreMenuOpen(false)}
                          className={active
                            ? "rounded-2xl bg-[color:color-mix(in_srgb,var(--brand)_10%,white_90%)] px-3 py-2 text-sm font-semibold text-[var(--brand)]"
                            : "rounded-2xl px-3 py-2 text-sm font-medium text-[var(--muted)] transition-colors hover:bg-[var(--panel)] hover:text-[var(--ink)]"
                          }
                        >
                          {language === "am" ? item.labelAm : item.labelEn}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                  {t("Dashboard", "ዳሽቦርድ")}
                </Link>
                <button className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0b5252]" onClick={logout} type="button">
                  {t("Log out", "ውጣ")}
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]">
                  {t("Log in", "ግባ")}
                </Link>
                <Link href="/auth/signup" className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0b5252]">
                  {t("Register", "ተመዝገብ")}
                </Link>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)] lg:hidden"
          aria-label={menuOpen ? t("Close menu", "ምናሌ ዝጋ") : t("Open menu", "ምናሌ ክፈት")}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-[var(--line)] bg-[var(--paper)] lg:hidden">
          <div className="container-wrap grid gap-4 py-4">
            <nav className="grid gap-4">
              {primaryHeaderLinks.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={active ? "text-sm font-medium text-[var(--brand)]" : "text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"}
                  >
                    {language === "am" ? item.labelAm : item.labelEn}
                  </Link>
                );
              })}
            </nav>

            <div className="grid gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                {t("Other pages", "ሌሎች ገፆች")}
              </p>
              <nav className="grid gap-3">
                {secondaryHeaderLinks.map((item) => {
                  const active = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className={active ? "text-sm font-medium text-[var(--brand)]" : "text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--ink)]"}
                    >
                      {language === "am" ? item.labelAm : item.labelEn}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="flex items-center justify-between gap-3">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" className="rounded-lg border border-[var(--line)] px-4 py-2 text-center text-sm font-medium text-[var(--ink)]" onClick={() => setMenuOpen(false)}>
                    {t("Dashboard", "ዳሽቦርድ")}
                  </Link>
                  <button className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0b5252]" onClick={logout} type="button">
                    {t("Log out", "ውጣ")}
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="rounded-lg border border-[var(--line)] px-4 py-2 text-center text-sm font-medium text-[var(--ink)]" onClick={() => setMenuOpen(false)}>
                    {t("Log in", "ግባ")}
                  </Link>
                  <Link href="/auth/signup" className="rounded-lg bg-[var(--brand)] px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-[#0b5252]" onClick={() => setMenuOpen(false)}>
                    {t("Register", "ተመዝገብ")}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
