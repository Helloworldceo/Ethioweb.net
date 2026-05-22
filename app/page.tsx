"use client";

import Link from "next/link";
import {
  AppWindow,
  ArrowRight,
  CheckCircle2,
  FolderOpen,
  Globe,
  MessageSquare,
  PenLine,
  ShieldCheck,
} from "lucide-react";
import { services } from "@/lib/site";
import { useLanguage } from "@/components/i18n/language-provider";

const serviceStyles = [
  {
    icon: Globe,
    eyebrowEn: "Web Presence",
    eyebrowAm: "የድር ተገኝነት",
    tint: "from-[#0a6c62]/24 via-[#102343]/10 to-transparent",
  },
  {
    icon: FolderOpen,
    eyebrowEn: "Portfolio",
    eyebrowAm: "ፖርትፎሊዮ",
    tint: "from-[#ffb300]/18 via-[#df6c22]/10 to-transparent",
  },
  {
    icon: AppWindow,
    eyebrowEn: "Product Systems",
    eyebrowAm: "የምርት ሥርዓቶች",
    tint: "from-[#66c3ff]/20 via-[#0a6c62]/8 to-transparent",
  },
  {
    icon: MessageSquare,
    eyebrowEn: "Consulting",
    eyebrowAm: "የምክር አገልግሎት",
    tint: "from-[#df6c22]/18 via-[#102343]/10 to-transparent",
  },
  {
    icon: ShieldCheck,
    eyebrowEn: "Trust Layer",
    eyebrowAm: "የእምነት ደረጃ",
    tint: "from-[#0a6c62]/24 via-[#66c3ff]/12 to-transparent",
  },
  {
    icon: PenLine,
    eyebrowEn: "Publishing",
    eyebrowAm: "ህትመት",
    tint: "from-[#ffb300]/20 via-[#102343]/10 to-transparent",
  },
];

const journeySteps = [
  {
    step: "01",
    titleEn: "Strategy before screens",
    titleAm: "ከስክሪን በፊት ስትራቴጂ",
    descriptionEn:
      "We start with your offer, audience, and trust gap so the final website or system has a clear business purpose.",
    descriptionAm:
      "የመጨረሻው ድረ-ገፅ ወይም ስርዓት ግልጽ የንግድ ዓላማ እንዲኖረው ከአገልግሎትዎ፣ ከታዳሚዎችዎ እና ከእምነት ክፍተትዎ እንጀምራለን።",
  },
  {
    step: "02",
    titleEn: "Design and launch with polish",
    titleAm: "በጥራት ይንደፉ እና ያስጀምሩ",
    descriptionEn:
      "From positioning to visual execution, Ethioweb builds assets that feel modern, credible, and ready for serious opportunities.",
    descriptionAm:
      "ከአቀማመጥ እስከ ቪዥዋል አፈጻጸም ድረስ Ethioweb ዘመናዊ፣ አስተማማኝ እና ለከባድ እድሎች ዝግጁ የሚሰሙ ንብረቶችን ይገነባል።",
  },
];

const heroSignals = [
  {
    icon: ShieldCheck,
    labelEn: "Strategy",
    labelAm: "ስትራቴጂ",
  },
  {
    icon: FolderOpen,
    labelEn: "Design",
    labelAm: "ዲዛይን",
  },
  {
    icon: Globe,
    labelEn: "Launch",
    labelAm: "ማስጀመር",
  },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="pb-20">
      <section className="container-wrap pt-6 md:pt-12">
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,179,0,0.18),transparent_28%),radial-gradient(circle_at_top_right,rgba(62,214,198,0.16),transparent_30%),linear-gradient(135deg,#102343_0%,#0f2442_44%,#09182f_100%)] px-5 py-6 shadow-[0_30px_90px_rgba(9,24,47,0.32)] md:rounded-[32px] md:px-10 md:py-12">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
          <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-[rgba(255,179,0,0.18)] blur-2xl" />
          <div className="absolute bottom-8 right-8 h-32 w-32 rounded-full bg-[rgba(62,214,198,0.16)] blur-3xl" />

          <div className="relative max-w-4xl">
            <div className="animate-rise">
              <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd57a] backdrop-blur md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
                {t("Premium digital studio", "ፕሪሚየም ዲጂታል ስቱዲዮ")}
              </span>

              <h1 className="heading-display mt-5 max-w-3xl text-4xl font-semibold leading-[1.02] text-white sm:text-5xl md:mt-6 md:text-7xl">
                {t(
                  "We build websites",
                  "እኛ ድረ-ገፆችን እንገነባለን",
                )}
                <br />
                <span className="text-[#ffd57a]">
                  {t(
                    "portfolios, and digital tools",
                    "ፖርትፎሊዮዎችን እና ዲጂታል መሳሪያዎችን",
                  )}
                </span>
                <br />
                {t(
                  "that make your business look credible.",
                  "ንግድዎን አስተማማኝ እንዲታይ የሚያደርጉ።",
                )}
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#d9e6ff] md:mt-6 md:text-xl md:leading-8">
                {t(
                  "From websites to portfolios and internal tools, each project is shaped to look polished, trustworthy, and ready for real opportunities.",
                  "ከድረ-ገፆች እስከ ፖርትፎሊዮዎች እና የውስጥ መሳሪያዎች ድረስ እያንዳንዱ ፕሮጀክት የተጠናቀቀ፣ አስተማማኝ እና ለእውነተኛ እድሎች ዝግጁ እንዲሆን ይቀረፃል።",
                )}
              </p>

              <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-8 md:gap-4">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ffb300] px-6 py-3 text-sm font-semibold text-[#102343] transition-all hover:bg-[#ffc133] hover:shadow-[0_12px_24px_rgba(255,179,0,0.25)]">
                  {t("Start a project", "ፕሮጀክት ይጀምሩ")} <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/services" className="text-sm font-semibold text-white/80 transition-colors hover:text-white">
                  {t("See services", "አገልግሎቶችን ይመልከቱ")}
                </Link>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 md:mt-8 md:gap-3">
                {heroSignals.map((signal) => {
                  const Icon = signal.icon;

                  return (
                    <div
                      key={signal.labelEn}
                      className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs text-[#d9e6ff] backdrop-blur-sm md:px-4 md:text-sm"
                    >
                      <Icon className="h-4 w-4 text-[#ffd57a]" />
                      <span>{t(signal.labelEn, signal.labelAm)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </section>

      <section id="how-it-works" className="container-wrap py-16">
        <div className="mb-8 flex flex-col gap-3 md:max-w-3xl">
          <p className="chip w-fit">{t("Our Process", "የስራ ሂደታችን")}</p>
          <h2 className="heading-display text-4xl font-semibold text-[var(--ink)] md:text-5xl">
            {t(
              "A sharper process for digital work that needs to feel premium.",
              "ፕሪሚየም እንዲሰማ የሚፈልግ ዲጂታል ስራ የተሻለ ሂደት።",
            )}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {journeySteps.map((item) => (
            <article key={item.step} className="group rounded-[28px] border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[0_18px_40px_rgba(20,33,61,0.08)] transition-transform duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{item.step}</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[color:color-mix(in_srgb,var(--brand)_12%,white_88%)] text-[var(--brand)]">
                  <CheckCircle2 className="h-5 w-5" />
                </span>
              </div>
              <h3 className="heading-display mt-8 text-2xl font-semibold text-[var(--ink)]">{t(item.titleEn, item.titleAm)}</h3>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">{t(item.descriptionEn, item.descriptionAm)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container-wrap py-14">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="chip w-fit">{t("Core Services", "ዋና አገልግሎቶች")}</p>
            <h2 className="heading-display mt-4 text-4xl font-semibold text-[var(--ink)] md:text-5xl">
              {t("What Ethioweb builds for clients", "Ethioweb ለደንበኞች የሚገነባው")}
            </h2>
          </div>
          <Link href="/services" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)] transition-colors hover:text-[var(--ink)]">
            {t("Explore all services", "ሁሉንም አገልግሎቶች ይመልከቱ")}
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.slice(0, 2).map((service, index) => {
            const treatment = serviceStyles[index] ?? serviceStyles[0];
            const Icon = treatment.icon;

            return (
              <article
                key={service.title}
                className={`group relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_40px_rgba(20,33,61,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(20,33,61,0.12)]`}
              >
                <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-br ${treatment.tint} opacity-80`} />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">{t(treatment.eyebrowEn, treatment.eyebrowAm)}</p>
                  <div className="mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[color:color-mix(in_srgb,var(--brand)_10%,white_90%)] text-[var(--brand)]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="heading-display mt-8 text-2xl font-semibold text-[var(--ink)]">{service.title}</h3>
                  <p className="mt-4 text-base leading-8 text-[var(--muted)]">{service.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="container-wrap pt-4">
        <article className="relative overflow-hidden rounded-[28px] border border-[var(--line)] bg-[linear-gradient(135deg,#102343_0%,#173156_100%)] p-6 text-white shadow-[0_24px_50px_rgba(9,24,47,0.18)] md:p-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-[rgba(255,179,0,0.2)] blur-3xl" />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd57a]">Studio Inquiry</p>
          <h3 className="heading-display mt-3 text-3xl font-semibold">Ready to build something that looks serious?</h3>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-[#d9e6ff]">
            Bring your website, portfolio, or business system idea and Ethioweb can turn it into a clearer, more credible digital presence.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ffb300] px-6 py-3 text-sm font-semibold text-[#102343] transition-colors hover:bg-[#ffc133]">
              Start a project
            </Link>
            <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12">
              Review services
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
