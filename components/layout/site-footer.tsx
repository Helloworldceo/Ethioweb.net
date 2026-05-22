"use client";

import Link from "next/link";
import { NewsletterForm } from "@/components/sections/newsletter-form";

export function SiteFooter() {
  const footerColumns = [
    {
      title: "Product",
      links: [
        { label: "Features", href: "/discover" },
        { label: "Services", href: "/services" },
        { label: "Verification", href: "/about" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/jobs" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Help Center", href: "/contact" },
        { label: "Guides", href: "/education" },
        { label: "Portfolio Templates", href: "/portfolio-templates" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Cookies", href: "/privacy#cookies" },
      ],
    },
  ];

  return (
    <footer className="mt-16 bg-[#102343] px-4 py-12 text-sm text-[#d7e6ff]">
      <div className="container-wrap space-y-12">
        <div>
          <p className="heading-display text-lg font-semibold text-white">Ethioweb</p>
          <p className="mt-4 max-w-md text-[#bdd0ef]">
            Ethioweb is led by Dawit Abdisa and helps professionals, businesses, and teams present their work clearly and professionally online.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_repeat(4,minmax(0,1fr))]">
          <div>
            <p className="font-medium text-white">Newsletter</p>
            <p className="mt-4 text-[#bdd0ef]">Occasional product updates and practical visibility tips.</p>
            <NewsletterForm />
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <p className="font-medium text-white">{column.title}</p>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}-${link.href}`}>
                    <Link href={link.href} className="text-[#bdd0ef] transition-colors hover:text-white">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-[#29456f] pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[#bdd0ef]">© 2026 Ethioweb. Built in Ethiopia.</p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-[#bdd0ef] transition-colors hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const socialLinks = [
  {
    label: "Ethioweb on X",
    href: "https://x.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M18.901 2H21.98l-6.723 7.683L23.166 22h-6.192l-4.849-6.35L6.566 22H3.485l7.191-8.218L1.5 2h6.349l4.383 5.792L18.901 2Zm-1.085 18h1.706L5.573 3.895H3.742L17.816 20Z" />
      </svg>
    ),
  },
  {
    label: "Ethioweb on LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M4.983 3.5C4.983 4.881 3.87 6 2.498 6A2.502 2.502 0 0 1 0 3.5C0 2.119 1.113 1 2.485 1h.013a2.5 2.5 0 0 1 2.485 2.5ZM.5 8h4V23h-4V8Zm7 0h3.833v2.047h.055C11.922 8.98 13.4 7.5 15.89 7.5 21.056 7.5 22 10.87 22 15.255V23h-4v-6.844c0-1.633-.03-3.734-2.275-3.734-2.278 0-2.625 1.779-2.625 3.617V23h-4V8Z" />
      </svg>
    ),
  },
  {
    label: "Ethioweb on GitHub",
    href: "https://github.com",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
        <path d="M12 .5C5.649.5.5 5.649.5 12c0 5.084 3.292 9.399 7.86 10.921.574.105.784-.249.784-.554 0-.273-.01-.997-.016-1.957-3.197.694-3.872-1.541-3.872-1.541-.523-1.328-1.278-1.682-1.278-1.682-1.045-.715.079-.701.079-.701 1.156.081 1.764 1.188 1.764 1.188 1.028 1.761 2.697 1.252 3.354.957.104-.745.402-1.252.731-1.54-2.552-.29-5.236-1.276-5.236-5.682 0-1.255.449-2.282 1.184-3.086-.119-.29-.513-1.457.113-3.037 0 0 .966-.31 3.164 1.179A10.98 10.98 0 0 1 12 6.055c.975.005 1.958.132 2.876.387 2.196-1.489 3.16-1.179 3.16-1.179.628 1.58.234 2.747.115 3.037.737.804 1.182 1.831 1.182 3.086 0 4.417-2.688 5.389-5.249 5.674.413.355.781 1.057.781 2.131 0 1.539-.014 2.779-.014 3.157 0 .308.206.665.79.552C20.21 21.395 23.5 17.082 23.5 12 23.5 5.649 18.351.5 12 .5Z" />
      </svg>
    ),
  },
];
