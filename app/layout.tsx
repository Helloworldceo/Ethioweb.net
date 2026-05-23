import type { Metadata } from "next";
import { Inter, Noto_Sans_Ethiopic } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ProfileDock } from "@/components/layout/profile-dock";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageProvider } from "@/components/i18n/language-provider";
import { ClientErrorTracker } from "@/components/monitoring/client-error-tracker";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansEthiopic = Noto_Sans_Ethiopic({
  variable: "--font-ethiopic",
  subsets: ["ethiopic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethioweb.net"),
  applicationName: "Ethioweb",
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      am: "/",
      "x-default": "/",
    },
  },
  title: {
    default: "Ethioweb | Digital Presence Platform",
    template: "%s | Ethioweb",
  },
  description:
    "Build your digital identity with professional profiles, CV hosting, portfolios, business services, and privacy-first public pages.",
  keywords: [
    "Ethioweb",
    "digital profile",
    "portfolio",
    "CV hosting",
    "website development",
    "business app development",
  ],
  openGraph: {
    title: "Ethioweb | Digital Presence Platform",
    description:
      "Create your profile, upload CV and portfolio files, control visibility, and grow your digital presence.",
    url: "https://ethioweb.net",
    siteName: "Ethioweb",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://ethioweb.net/api/og?kind=blog&title=Ethioweb&subtitle=Digital%20Presence%20Platform",
        width: 1200,
        height: 630,
        alt: "Ethioweb digital presence platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethioweb",
    description:
      "A modern platform for digital identity, business services, and professional portfolios.",
    images: ["https://ethioweb.net/api/og?kind=blog&title=Ethioweb&subtitle=Digital%20Presence%20Platform"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Ethioweb",
    url: "https://ethioweb.net",
    logo: "https://ethioweb.net/newlogo.png",
    sameAs: ["https://helloworldceo.github.io/"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "helloworldceo@1gmail.com",
      },
    ],
  };

  return (
    <html
      lang="en"
      data-theme="blue-dark"
      suppressHydrationWarning
      className={`${inter.variable} ${notoSansEthiopic.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--bg)] text-[var(--ink)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-[var(--paper)] focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <div className="mesh-bg" aria-hidden />
        <LanguageProvider>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main id="main-content" className="flex-1">{children}</main>
            <SiteFooter />
            <ProfileDock />
            <ClientErrorTracker />
          </div>
        </LanguageProvider>
        <Script id="organization-ld" type="application/ld+json">
          {JSON.stringify(organizationLd)}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-E3DQ87ER88"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-E3DQ87ER88');
          `}
        </Script>
      </body>
    </html>
  );
}
