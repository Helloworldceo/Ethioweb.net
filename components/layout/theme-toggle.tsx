"use client";

import { MoonStar, Sun } from "lucide-react";
import { useEffect, useState } from "react";

type Theme = "original" | "blue-dark";

const THEME_STORAGE_KEY = "ethioweb-theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("blue-dark");

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    // Default is blue-dark; only switch to original if explicitly stored
    const initialTheme: Theme = stored === "original" ? "original" : "blue-dark";
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
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--panel)] text-[var(--ink)]"
    >
      {isDarkBlue ? <Sun className="h-4 w-4" /> : <MoonStar className="h-4 w-4" />}
    </button>
  );
}
