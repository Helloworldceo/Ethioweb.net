import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { LanguageProvider } from "@/components/i18n/language-provider";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethioweb.net"),
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethioweb",
    description:
      "A modern platform for digital identity, business services, and professional portfolios.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <head>
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
      </head>
      <body className="min-h-full bg-[var(--bg)] text-[var(--ink)]">
        <div className="mesh-bg" aria-hidden />
        <LanguageProvider>
          <div className="relative min-h-screen flex flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
