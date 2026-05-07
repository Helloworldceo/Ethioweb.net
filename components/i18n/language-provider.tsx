"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Language = "en" | "am";

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (en: string, am: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "ethioweb-language";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved === "en" || saved === "am" ? saved : "en";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.cookie = `ethioweb_lang=${language}; path=/; max-age=31536000; samesite=lax`;
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: (en: string, am: string) => (language === "am" ? am : en),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
