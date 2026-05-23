"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "@/components/i18n/language-provider";

type Theme = "original" | "blue-dark";

const THEME_STORAGE_KEY = "ethioweb-theme";

export function ThemeToggle() {
  const { t } = useLanguage();
  const [theme, setTheme] = useState<Theme>("blue-dark");

  const applyTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    if (nextTheme === "blue-dark") {
      root.setAttribute("data-theme", "blue-dark");
    } else {
      root.removeAttribute("data-theme");
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) === "original" ? "original" : "blue-dark";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function toggleTheme() {
    const nextTheme: Theme = theme === "original" ? "blue-dark" : "original";
    setTheme(nextTheme);
  }

  const isDarkBlue = theme === "blue-dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-testid="theme-toggle"
      aria-label={isDarkBlue ? t("Switch to original theme", "ወደ ዋናው ገጽታ ቀይር") : t("Switch to dark blue theme", "ወደ ጥቁር ሰማያዊ ገጽታ ቀይር")}
      title={isDarkBlue ? t("Original mode", "ዋና ሁነታ") : t("Dark blue mode", "ጥቁር ሰማያዊ ሁነታ")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]"
    >
      {isDarkBlue ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  );
}
