"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { demoProfiles } from "@/lib/site";
import { useLanguage } from "@/components/i18n/language-provider";

export default function DiscoverPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(demoProfiles);

  useEffect(() => {
    fetch("/api/search")
      .then((response) => response.json())
      .then((data: { items: typeof demoProfiles }) => {
        setResults(data.items);
      })
      .catch(() => {
        setResults(demoProfiles);
      });
  }, []);

  async function onSearch(event: FormEvent) {
    event.preventDefault();

    if (!query.trim()) {
      const resetResponse = await fetch("/api/search");
      const resetData = (await resetResponse.json()) as { items: typeof demoProfiles };
      setResults(resetData.items);
      return;
    }

    const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = (await response.json()) as { items: typeof demoProfiles };
    setResults(data.items);
  }

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">{t("Find professionals", "ሙያዊ ሰዎችን ያግኙ")}</h1>
      <p className="mt-2 text-[var(--muted)]">{t("Search by full name or username.", "በሙሉ ስም ወይም በተጠቃሚ ስም ይፈልጉ።")}</p>

      <form className="mt-5 flex flex-wrap gap-2" onSubmit={onSearch}>
        <input
          className="w-full min-w-0 flex-1 rounded-full border border-[var(--line)] bg-[var(--panel)] px-4 py-3 sm:min-w-[260px]"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("Search name or username", "ስም ወይም ተጠቃሚ ስም")}
        />
        <button className="btn-primary" type="submit">{t("Search", "ፈልግ")}</button>
      </form>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {results.map((profile) => (
          <article key={profile.username} className="card p-5">
            <h2 className="heading-display text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-[var(--brand)]">@{profile.username}</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{profile.role}</p>
            <Link href={`/u/${profile.username}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--brand)]">
              {t("View public profile", "ይፋ ፕሮፋይል")}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
