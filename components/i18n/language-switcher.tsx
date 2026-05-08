"use client";

import { useLanguage } from "@/components/i18n/language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--panel)] p-1 text-xs font-bold">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={language === "en" ? "rounded-full bg-[var(--brand)] px-2.5 py-1 text-white" : "rounded-full px-2.5 py-1 text-[var(--muted)]"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("am")}
        className={language === "am" ? "rounded-full bg-[var(--brand)] px-2.5 py-1 text-white" : "rounded-full px-2.5 py-1 text-[var(--muted)]"}
      >
        አማ
      </button>
    </div>
  );
}
