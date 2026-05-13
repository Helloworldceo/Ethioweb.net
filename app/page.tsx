"use client";

import Link from "next/link";
import { ArrowRight, BadgeCheck, CheckCircle2, Search, ShieldCheck, Upload } from "lucide-react";
import { projects, services } from "@/lib/site";
import { useLanguage } from "@/components/i18n/language-provider";
import { NewsletterForm } from "@/components/sections/newsletter-form";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div>
      <section className="container-wrap grid gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:py-24">
        <div className="animate-rise">
          <span className="chip">{t("Built for Ethiopian professionals", "ለኢትዮጵያ ባለሙያዎች የተሰራ")}</span>
          <h1 className="heading-display mt-5 text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
            Get found faster,
            <br />
            prove your credibility,
            <br />
            win better clients.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
            Ethioweb gives you one trusted profile link with CVs, certifications, portfolio proof,
            and privacy controls so clients can decide faster and trust you sooner in one
            {t(
              " modern platform.",
              " ዘመናዊ ፕላትፎርም።",
            )}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/auth/signup" className="btn-primary">
              {t("Create Your Profile", "ፕሮፋይል ፍጠር")} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/discover" className="text-sm font-semibold text-[var(--brand)] underline-offset-4 hover:underline">
              {t("See live profile examples", "የተለቀ የፕሮፋይል ምሳሌዎችን ይመልከቱ")}
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-2 text-xs text-[var(--muted)]">
            <span className="rounded-full border border-[var(--line)] px-3 py-1">1 profile link</span>
            <span className="rounded-full border border-[var(--line)] px-3 py-1">Visibility controls</span>
            <span className="rounded-full border border-[var(--line)] px-3 py-1">Portfolio + CV downloads</span>
          </div>
        </div>

        <div className="card animate-rise p-6 [animation-delay:140ms]">
          <p className="heading-display text-2xl font-bold">{t("Proof that builds trust", "እምነት የሚገነባ ማስረጃ")}</p>
          <ul className="mt-6 space-y-4 text-sm text-[var(--muted)]">
            <li className="flex items-start gap-3">
              <Upload className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Upload CV, portfolio, certificates, and business cards with public/private control.
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Keep sensitive items private while sharing what clients need to see.
            </li>
            <li className="flex items-start gap-3">
              <Search className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Make your profile searchable by full name or username.
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="mt-0.5 h-4 w-4 text-[var(--brand)]" />
              Verification badges and trust checks are rolling out for eligible accounts.
            </li>
          </ul>
        </div>
      </section>

      <section className="container-wrap py-4">
        <div className="grid gap-3 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 md:grid-cols-4">
          <div>
            <p className="text-2xl font-black">2 mins</p>
            <p className="text-xs text-[var(--muted)]">Average profile setup time</p>
          </div>
          <div>
            <p className="text-2xl font-black">3x</p>
            <p className="text-xs text-[var(--muted)]">More trust with proof assets attached</p>
          </div>
          <div>
            <p className="text-2xl font-black">24/7</p>
            <p className="text-xs text-[var(--muted)]">Shareable profile link availability</p>
          </div>
          <div>
            <p className="text-2xl font-black">EN + AM</p>
            <p className="text-xs text-[var(--muted)]">Bilingual experience for local reach</p>
          </div>
        </div>
      </section>

      <section className="container-wrap py-12">
        <div className="mb-5">
          <p className="chip">How it works</p>
          <h2 className="heading-display mt-3 text-3xl font-black">Build your digital identity in 3 steps</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              title: "1. Create your profile",
              desc: "Add your full name, role, location, and bio so people understand you quickly.",
            },
            {
              title: "2. Attach proof",
              desc: "Upload CV, certificates, and portfolio files to support your claims with real evidence.",
            },
            {
              title: "3. Share and grow",
              desc: "Share your profile link across WhatsApp, LinkedIn, and proposals to convert faster.",
            },
          ].map((item) => (
            <article key={item.title} className="card p-5">
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                <CheckCircle2 className="h-4 w-4" /> {item.title}
              </p>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{item.desc}</p>
            </article>
          ))}
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

      <section className="container-wrap pb-14">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <article className="card p-6">
            <p className="chip">Trust layer</p>
            <h3 className="heading-display mt-3 text-2xl font-black">Verification is coming next</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Ethioweb verification will help employers and clients identify trusted profiles at a glance.
              Join early access to get priority onboarding for badge checks and credibility scoring.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/contact" className="btn-secondary text-sm">Join verification waitlist</Link>
              <Link href="/about" className="text-sm font-semibold text-[var(--brand)]">See our mission</Link>
            </div>
          </article>
          <article className="card p-6">
            <p className="text-sm font-semibold">Get weekly growth briefs</p>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Practical ideas on profile conversion, authority building, and digital trust.
            </p>
            <NewsletterForm />
          </article>
        </div>
      </section>
    </div>
  );
}
