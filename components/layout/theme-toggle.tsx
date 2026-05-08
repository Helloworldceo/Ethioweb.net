"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "original" | "blue-dark";

const THEME_STORAGE_KEY = "ethioweb-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("original");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    const initialTheme: Theme = stored === "blue-dark" ? "blue-dark" : "original";
    applyTheme(initialTheme);
    setTheme(initialTheme);
  }, []);

  function applyTheme(nextTheme: Theme) {
    const root = document.documentElement;
    if (nextTheme === "blue-dark") {
      root.setAttribute("data-theme", "blue-dark");
    } else {
      root.removeAttribute("data-theme");
    }
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  }

  function toggleTheme() {
    const nextTheme: Theme = theme === "original" ? "blue-dark" : "original";
    setTheme(nextTheme);
    applyTheme(nextTheme);
  }

  const isDarkBlue = theme === "blue-dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDarkBlue ? "Switch to original theme" : "Switch to dark blue theme"}
      title={isDarkBlue ? "Original mode" : "Dark blue mode"}
      className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel)] px-3 text-sm font-semibold text-[var(--ink)]"
    >
      {isDarkBlue ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDarkBlue ? "Original" : "Dark Blue"}</span>
    </button>
  );
}
