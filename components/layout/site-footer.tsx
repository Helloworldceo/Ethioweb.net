"use client";

import Link from "next/link";
import { useLanguage } from "@/components/i18n/language-provider";
import { NewsletterForm } from "@/components/sections/newsletter-form";

export function SiteFooter() {
  const { t } = useLanguage();

  return (
    <footer className="mt-20 border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="container-wrap grid gap-8 py-10 md:grid-cols-3">
        <div>
          <p className="heading-display text-lg font-bold">Ethioweb</p>
          <p className="mt-2 max-w-xs text-sm text-[var(--muted)]">
            {t(
              "Your all-in-one platform for professional identity and growth.",
              "ለሙያዊ ማንነት እና እድገት አንድ መድረክ።",
            )}
          </p>
        </div>

        <div className="text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--ink)]">{t("Platform", "መድረክ")}</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/dashboard">{t("Dashboard", "ዳሽቦርድ")}</Link>
            </li>
            <li>
              <Link href="/discover">{t("Find Profiles", "ፕሮፋይል ፈልግ")}</Link>
            </li>
            <li>
              <Link href="/blog">{t("Blog", "ብሎግ")}</Link>
            </li>
          </ul>
        </div>

        <div className="text-sm text-[var(--muted)]">
          <p className="font-semibold text-[var(--ink)]">{t("Legal", "ህጋዊ")}</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link href="/privacy">{t("Privacy Policy", "የግላዊነት ፖሊሲ")}</Link>
            </li>
            <li>
              <Link href="/terms">{t("Terms of Service", "የአገልግሎት ውል")}</Link>
            </li>
          </ul>

          <p className="mt-4 font-semibold text-[var(--ink)]">{t("Contact", "አድራሻ")}</p>
          <ul className="mt-2 space-y-2">
            <li>
              <a href="mailto:helloworldceo@1gmail.com">helloworldceo@1gmail.com</a>
            </li>
            <li>
              <a href="https://helloworldceo.github.io/" target="_blank" rel="noreferrer">Portfolio</a>
            </li>
          </ul>

          <p className="mt-4 font-semibold text-[var(--ink)]">{t("Newsletter", "ዜና መልዕክት")}</p>
          <p className="mt-1 text-xs text-[var(--muted)]">{t("Weekly growth insights for professionals.", "ለባለሙያዎች ሳምንታዊ የእድገት ምክሮች።")}</p>
          <NewsletterForm />
        </div>
      </div>
    </footer>
  );
}
