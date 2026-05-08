"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, Search, ShieldCheck, Upload } from "lucide-react";
import { projects, services } from "@/lib/site";
import { useLanguage } from "@/components/i18n/language-provider";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="container-wrap grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="animate-rise">
          <span className="chip">{t("Digital Presence, Simplified", "የዲጂታል መለያ ቀላል ተደርጓል")}</span>
          <h1 className="heading-display mt-5 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Build your profile,
            <br />
            grow your business,
            <br />
            own your identity.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Ethioweb helps professionals and businesses create a trusted public identity with CVs,
            portfolios, certifications, profile privacy controls, and service-ready websites in one
            {t(
              " modern platform.",
              " ዘመናዊ ፕላትፎርም።",
            )}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/auth/signup" className="btn-primary">
              {t("Create Your Profile", "ፕሮፋይል ፍጠር")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/services" className="btn-secondary">
              {t("Explore Services", "አገልግሎቶችን ይመልከቱ")}
            </Link>
          </div>
        </div>

        <div className="card animate-rise p-6 [animation-delay:140ms]">
          <p className="heading-display text-2xl font-bold">{t("Platform Capabilities", "የመድረኩ ችሎታዎች")}</p>
          <ul className="mt-6 space-y-4 text-sm text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <Upload className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Upload CV, portfolio, certificates, and business cards with visibility controls.
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Public/private settings on each profile section for privacy-first sharing.
            </li>
            <li className="flex items-start gap-3">
              <Search className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Search by full name or username to discover professionals quickly.
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Ready for verification badges, team profiles, messaging, and custom domains.
            </li>
          </ul>
        </div>
      </section>

      <section className="container-wrap py-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="chip">{t("Core Services", "ዋና አገልግሎቶች")}</p>
            <h2 className="heading-display mt-3 text-3xl font-black">{t("What Ethioweb delivers", "Ethioweb የሚያቀርበው")}</h2>
          </div>
          <Link href="/services" className="text-sm font-semibold text-[var(--brand)]">
            {t("See all services", "ሁሉንም አገልግሎቶች")}
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="card p-5">
              <h3 className="heading-display text-xl font-bold">{service.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-wrap py-14">
        <div className="card grid gap-5 p-7 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.slug} className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
                {project.category}
              </p>
              <h3 className="heading-display mt-2 text-lg font-bold">{project.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
