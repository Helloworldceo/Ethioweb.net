"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Coins,
  FolderOpen,
  Globe,
  GraduationCap,
  LayoutGrid,
  Landmark,
  Palette,
  Rocket,
  Scissors,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Stethoscope,
  Scale,
  UtensilsCrossed,
} from "lucide-react";
import amosPhoto from "@/Amos.jpg";
import dawitPhoto from "@/David Photo.jpg";
import { useLanguage } from "@/components/i18n/language-provider";

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

const businessTypes = [
  {
    title: "Banks & Finance",
    icon: Landmark,
  },
  {
    title: "Schools & Universities",
    icon: GraduationCap,
  },
  {
    title: "Hospitals & Clinics",
    icon: Stethoscope,
  },
  {
    title: "Hotels & Resorts",
    icon: Building2,
  },
  {
    title: "Lawyers & Law Firms",
    icon: Scale,
  },
  {
    title: "Microfinance",
    icon: Coins,
  },
  {
    title: "Retail & E-Commerce",
    icon: ShoppingBag,
  },
  {
    title: "Restaurants & Cafes",
    icon: UtensilsCrossed,
  },
  {
    title: "Salons & Beauty",
    icon: Scissors,
  },
  {
    title: "Startups & Companies",
    icon: Rocket,
  },
];

const offerItems = [
  {
    title: "Custom Websites",
    description: "Tailored to your brand, audience, and goals.",
    icon: Globe,
  },
  {
    title: "Mobile Apps",
    description: "Native and cross-platform mobile experiences.",
    icon: Smartphone,
  },
  {
    title: "Business Branding",
    description: "Identity, logos, and brand systems that stand out.",
    icon: Palette,
  },
  {
    title: "Modern UI/UX",
    description: "Interfaces people actually enjoy using.",
    icon: LayoutGrid,
  },
  {
    title: "Portfolio & CVs",
    description: "Professional profiles and personal branding.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Digital Presence",
    description: "Full digital strategy and business platforms.",
    icon: Sparkles,
  },
];

const amosSocialLinks = [
  {
    label: "Amos on GitHub",
    href: "https://github.com/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.399 7.86 10.921.574.105.784-.249.784-.554 0-.273-.01-.997-.016-1.957-3.197.694-3.872-1.541-3.872-1.541-.523-1.328-1.278-1.682-1.278-1.682-1.045-.715.079-.701.079-.701 1.156.081 1.764 1.188 1.764 1.188 1.028 1.761 2.697 1.252 3.354.957.104-.745.402-1.252.731-1.54-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.457.113-3.037 0 0 .966-.31 3.164 1.179A10.98 10.98 0 0 1 12 6.055c.975.005 1.958.132 2.876.387 2.196-1.489 3.16-1.179 3.16-1.179.628 1.58.234 2.747.115 3.037.737.804 1.182 1.831 1.182 3.086 0 4.417-2.688 5.389-5.249 5.674.413.355.781 1.057.781 2.131 0 1.539-.014 2.779-.014 3.157 0 .308.206.665.79.552C20.21 21.395 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Amos on Facebook",
    href: "https://facebook.com/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M13.5 22v-8.25h2.77l.41-3.22H13.5V8.47c0-.93.26-1.56 1.59-1.56h1.7V4.03c-.29-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.49-4.13 4.23v2.4H7.41v3.22h2.77V22h3.32Z" />
      </svg>
    ),
  },
  {
    label: "Amos on Instagram",
    href: "https://instagram.com/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm0 1.8A3.955 3.955 0 0 0 3.8 7.75v8.5A3.955 3.955 0 0 0 7.75 20.2h8.5a3.955 3.955 0 0 0 3.95-3.95v-8.5a3.955 3.955 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.156 5.156 0 0 1 12 6.85Zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.354 3.354 0 0 0 12 8.65Z" />
      </svg>
    ),
  },
  {
    label: "Amos on Telegram",
    href: "https://t.me/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M21.944 4.215c.29-.12.61.135.53.442l-3.223 13.84c-.062.265-.35.4-.597.28l-4.58-2.225-2.293 2.052c-.19.17-.495.069-.543-.183l-.734-3.83 7.353-6.62c.16-.145-.019-.389-.2-.273l-9.08 5.787-4.12-1.487c-.285-.103-.302-.502-.028-.628L21.944 4.215Z" />
      </svg>
    ),
  },
  {
    label: "Amos on LinkedIn",
    href: "https://linkedin.com/in/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.983 3.5C4.983 4.881 3.87 6 2.498 6A2.502 2.502 0 0 1 0 3.5C0 2.119 1.113 1 2.485 1h.013a2.5 2.5 0 0 1 2.485 2.5ZM.5 8h4V23h-4V8Zm7 0h3.833v2.047h.055C11.922 8.98 13.4 7.5 15.89 7.5 21.056 7.5 22 10.87 22 15.255V23h-4v-6.844c0-1.633-.03-3.734-2.275-3.734-2.278 0-2.625 1.779-2.625 3.617V23h-4V8Z" />
      </svg>
    ),
  },
  {
    label: "Amos on X",
    href: "https://x.com/ngoahamos",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.901 2H21.98l-6.723 7.683L23.166 22h-6.192l-4.849-6.35L6.566 22H3.485l7.191-8.218L1.5 2h6.349l4.383 5.792L18.901 2Zm-1.085 18h1.706L5.573 3.895H3.742L17.816 20Z" />
      </svg>
    ),
  },
];

const dawitSocialLinks = [
  {
    label: "Dawit on GitHub",
    href: "https://github.com/Helloworldceo",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.399 7.86 10.921.574.105.784-.249.784-.554 0-.273-.01-.997-.016-1.957-3.197.694-3.872-1.541-3.872-1.541-.523-1.328-1.278-1.682-1.278-1.682-1.045-.715.079-.701.079-.701 1.156.081 1.764 1.188 1.764 1.188 1.028 1.761 2.697 1.252 3.354.957.104-.745.402-1.252.731-1.54-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.457.113-3.037 0 0 .966-.31 3.164 1.179A10.98 10.98 0 0 1 12 6.055c.975.005 1.958.132 2.876.387 2.196-1.489 3.16-1.179 3.16-1.179.628 1.58.234 2.747.115 3.037.737.804 1.182 1.831 1.182 3.086 0 4.417-2.688 5.389-5.249 5.674.413.355.781 1.057.781 2.131 0 1.539-.014 2.779-.014 3.157 0 .308.206.665.79.552C20.21 21.395 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z" />
      </svg>
    ),
  },
  {
    label: "Dawit on Facebook",
    href: "https://www.facebook.com/helloworldceo",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M13.5 22v-8.25h2.77l.41-3.22H13.5V8.47c0-.93.26-1.56 1.59-1.56h1.7V4.03c-.29-.04-1.3-.13-2.48-.13-2.45 0-4.13 1.49-4.13 4.23v2.4H7.41v3.22h2.77V22h3.32Z" />
      </svg>
    ),
  },
  {
    label: "Dawit on Instagram",
    href: "https://www.instagram.com/helloworldceo/",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M7.75 2h8.5A5.756 5.756 0 0 1 22 7.75v8.5A5.756 5.756 0 0 1 16.25 22h-8.5A5.756 5.756 0 0 1 2 16.25v-8.5A5.756 5.756 0 0 1 7.75 2Zm0 1.8A3.955 3.955 0 0 0 3.8 7.75v8.5A3.955 3.955 0 0 0 7.75 20.2h8.5a3.955 3.955 0 0 0 3.95-3.95v-8.5a3.955 3.955 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 6.85A5.15 5.15 0 1 1 6.85 12 5.156 5.156 0 0 1 12 6.85Zm0 1.8A3.35 3.35 0 1 0 15.35 12 3.354 3.354 0 0 0 12 8.65Z" />
      </svg>
    ),
  },
  {
    label: "Dawit on Telegram",
    href: "https://t.me/helloworldceo",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M21.944 4.215c.29-.12.61.135.53.442l-3.223 13.84c-.062.265-.35.4-.597.28l-4.58-2.225-2.293 2.052c-.19.17-.495.069-.543-.183l-.734-3.83 7.353-6.62c.16-.145-.019-.389-.2-.273l-9.08 5.787-4.12-1.487c-.285-.103-.302-.502-.028-.628L21.944 4.215Z" />
      </svg>
    ),
  },
  {
    label: "Dawit on LinkedIn",
    href: "https://linkedin.com/in/dawit-abdisa-44915518a",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.983 3.5C4.983 4.881 3.87 6 2.498 6A2.502 2.502 0 0 1 0 3.5C0 2.119 1.113 1 2.485 1h.013a2.5 2.5 0 0 1 2.485 2.5ZM.5 8h4V23h-4V8Zm7 0h3.833v2.047h.055C11.922 8.98 13.4 7.5 15.89 7.5 21.056 7.5 22 10.87 22 15.255V23h-4v-6.844c0-1.633-.03-3.734-2.275-3.734-2.278 0-2.625 1.779-2.625 3.617V23h-4V8Z" />
      </svg>
    ),
  },
  {
    label: "Dawit on X",
    href: "https://x.com/DawitAbdisa1",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.901 2H21.98l-6.723 7.683L23.166 22h-6.192l-4.849-6.35L6.566 22H3.485l7.191-8.218L1.5 2h6.349l4.383 5.792L18.901 2Zm-1.085 18h1.706L5.573 3.895H3.742L17.816 20Z" />
      </svg>
    ),
  },
];

const dawitHandles = [
  { label: "WeChat", value: "Helloworld_Ceo" },
  { label: "Discord", value: "helloworldceo" },
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

          <div className="relative max-w-6xl">
            <div className="animate-rise">
              <span className="inline-flex rounded-full border border-white/12 bg-white/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#ffd57a] backdrop-blur md:px-4 md:py-2 md:text-xs md:tracking-[0.18em]">
                {t("Premium digital studio", "ፕሪሚየም ዲጂታል ስቱዲዮ")}
              </span>

              <h1 className="heading-display mt-5 max-w-[19ch] text-[clamp(2.3rem,4.2vw,4.2rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-white md:mt-6">
                {t(
                  "We build websites",
                  "እኛ ድረ-ገፆችን እንገነባለን",
                )}
                {" "}
                <span className="text-[#ffd57a]">
                  {t(
                    "portfolios, and digital tools",
                    "ፖርትፎሊዮዎችን እና ዲጂታል መሳሪያዎችን",
                  )}
                </span>
                {" "}
                {t(
                  "that make your business look credible.",
                  "ንግድዎን አስተማማኝ እንዲታይ የሚያደርጉ።",
                )}
              </h1>

              <p className="mt-5 max-w-[46rem] text-base leading-7 text-[#d9e6ff] md:mt-6 md:text-xl md:leading-8">
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

      <section className="container-wrap py-4">
        <article className="relative overflow-hidden rounded-[28px] border border-[#d7c8b2] bg-[linear-gradient(135deg,#f6ead7_0%,#eef4ff_52%,#fffdf8_100%)] p-6 shadow-[0_20px_44px_rgba(20,33,61,0.08)] md:p-8">
          <div className="absolute inset-y-0 right-0 w-40 bg-[radial-gradient(circle_at_center,rgba(255,179,0,0.16),transparent_68%)] blur-2xl" />

          <div className="relative grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div>
              <p className="inline-flex w-fit rounded-full border border-[#d7c8b2] bg-white/90 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8a4b12] shadow-[0_10px_24px_rgba(20,33,61,0.05)] md:text-xs">
                Professional Website & App Developer
              </p>
              <h2 className="heading-display mt-4 max-w-3xl text-4xl font-semibold text-[#14213d] md:text-5xl">
                We create modern websites and applications for serious businesses.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#40516f]">
                We create modern websites and applications for all kinds of businesses. We also help business owners build professional business profiles and grow their online presence.
              </p>

              <div className="mt-8 rounded-[24px] border border-[#d7c8b2] bg-white/72 p-5 shadow-[0_14px_30px_rgba(20,33,61,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6a62]">Industries we serve</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {businessTypes.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[24px] border border-[#d9d3ca] bg-[#fffdfa] px-5 py-6 shadow-[0_10px_24px_rgba(20,33,61,0.05)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d9d3ca] bg-white text-[#44413d]">
                          <Icon className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <h3 className="mt-5 max-w-[13ch] text-[1.2rem] font-medium leading-[1.18] tracking-[-0.03em] text-[#20242c] md:text-[1.35rem]">
                          {item.title}
                        </h3>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-[24px] border border-[#d7c8b2] bg-white p-5 shadow-[0_14px_30px_rgba(20,33,61,0.08)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6f6a62]">What we build</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  {offerItems.map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[24px] border border-[#d9d3ca] bg-[#fffdfa] px-5 py-6 shadow-[0_10px_24px_rgba(20,33,61,0.05)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d9d3ca] bg-white text-[#44413d]">
                          <Icon className="h-5 w-5" strokeWidth={2.1} />
                        </div>
                        <h3 className="mt-5 text-[1.65rem] font-medium leading-[1.08] tracking-[-0.04em] text-[#20242c]">
                          {item.title}
                        </h3>
                        <p className="mt-3 max-w-[18ch] text-base leading-8 text-[#4f545d]">
                          {item.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-[24px] border border-[#102343]/10 bg-[#102343] p-5 text-white shadow-[0_20px_40px_rgba(9,24,47,0.18)]">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#ffd57a]">Business inquiries</p>
                <p className="mt-3 text-base leading-8 text-[#d9e6ff]">
                  DM for business inquiries and projects.
                </p>
                <div className="mt-5 grid gap-3 text-sm">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Facebook</p>
                    <a
                      href="https://www.facebook.com/helloworldceo/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex font-semibold text-white transition-colors hover:text-[#ffd57a]"
                    >
                      facebook.com/helloworldceo
                    </a>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">Telegram</p>
                    <p className="mt-1 font-semibold text-white">@helloworldceo</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">WhatsApp</p>
                    <p className="mt-1 font-semibold text-white">+8619851960050</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ffb300] px-5 py-3 text-sm font-semibold text-[#102343] transition-colors hover:bg-[#ffc133]">
                    Start a project
                  </Link>
                  <Link href="/services" className="inline-flex items-center gap-2 rounded-full border border-white/16 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/12">
                    Explore services
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="container-wrap py-6">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="chip w-fit">Our Team</p>
            <h2 className="heading-display mt-4 text-4xl font-semibold text-[var(--ink)] md:text-5xl">
              Meet the people building Ethioweb.
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              A focused team shaping credible websites, digital products, and AI-driven experiences for modern businesses.
            </p>
          </div>
          <Link href="/teams" className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)] transition-colors hover:text-[var(--ink)]">
            View all teams
          </Link>
        </div>

        <div className="grid gap-6">
          <article className="grid gap-6 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_20px_44px_rgba(20,33,61,0.08)] md:grid-cols-[280px_minmax(0,1fr)] md:p-8">
            <div className="relative mx-auto h-[220px] w-full max-w-[280px] overflow-hidden rounded-[24px] bg-white sm:h-[250px] sm:max-w-[320px] md:mx-0 md:h-[300px] md:max-w-none md:bg-[linear-gradient(180deg,#f4e2c5_0%,#e7efff_100%)]">
              <Image
                src={dawitPhoto}
                alt="Dawit Abdisa"
                className="h-full w-full object-cover object-[center_10%]"
                priority
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">CEO</p>
                <h3 className="heading-display mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">Dawit Abdisa</h3>
                <p className="mt-3 text-lg font-medium text-[var(--muted)]">Software Developer and AI Engineer</p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Dawit builds modern websites, digital products, and AI-enabled business experiences that help brands present themselves more clearly and professionally online.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[var(--brand)]">
                  {dawitSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--brand)_8%,white_92%)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand)_14%,white_86%)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {dawitHandles.map((item) => (
                    <span
                      key={item.label}
                      className="inline-flex items-center rounded-full border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--brand)_7%,white_93%)] px-3 py-1.5 text-xs font-semibold text-[var(--ink)]"
                    >
                      {item.label}: {item.value}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ffb300] px-5 py-3 text-sm font-semibold text-[#102343] transition-colors hover:bg-[#ffc133]">
                  Work with us
                </Link>
                <Link href="/dawit-abdisa-business-card.html" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand)_8%,transparent)]">
                  View business card
                </Link>
              </div>
            </div>
          </article>

          <article className="grid gap-6 overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_20px_44px_rgba(20,33,61,0.08)] md:grid-cols-[280px_minmax(0,1fr)] md:p-8">
            <div className="relative mx-auto h-[280px] w-full max-w-[280px] overflow-hidden rounded-[24px] bg-white sm:h-[320px] sm:max-w-[320px] md:mx-0 md:h-full md:max-w-none md:min-h-[420px] md:bg-[linear-gradient(180deg,#f4e2c5_0%,#e7efff_100%)]">
              <Image
                src={amosPhoto}
                alt="Amos Ngoah"
                className="h-full w-full object-contain md:object-cover md:object-center"
                priority
              />
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">CTO</p>
                <h3 className="heading-display mt-3 text-3xl font-semibold text-[var(--ink)] md:text-4xl">Amos Ngoah</h3>
                <p className="mt-3 text-lg font-medium text-[var(--muted)]">Fullstack Developer and AI Engineer</p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                  Amos works across frontend, backend, and AI-enabled product experiences to help businesses launch systems that look polished and perform reliably.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-3 text-[var(--brand)]">
                  {amosSocialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-[color:color-mix(in_srgb,var(--brand)_8%,white_92%)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand)_14%,white_86%)]"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-[#ffb300] px-5 py-3 text-sm font-semibold text-[#102343] transition-colors hover:bg-[#ffc133]">
                  Work with us
                </Link>
                <Link href="/teams" className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-transparent px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--brand)_8%,transparent)]">
                  Explore team profiles
                </Link>
              </div>
            </div>
          </article>
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
