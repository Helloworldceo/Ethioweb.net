import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { services } from "@/lib/site";

export const metadata = {
  title: "Services",
  description: "Explore Ethioweb services for business and personal branding.",
};

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Business-focused digital services"
        subtitle="Explore the services Ethioweb offers for websites, portfolios, and digital systems. Reach out when you want to start a project."
      />

      <section className="container-wrap grid gap-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="card p-6">
            <h2 className="heading-display text-2xl font-bold">{service.title}</h2>
            <p className="mt-3 leading-8 text-[var(--muted)]">{service.description}</p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-full bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#0b5252]"
            >
              Talk about this service
            </Link>
          </article>
        ))}
      </section>

      <section className="container-wrap pb-16">
        <div className="rounded-[28px] border border-[var(--line)] bg-[var(--panel)] p-6 shadow-[0_18px_40px_rgba(20,33,61,0.08)] md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">Next step</p>
          <h2 className="heading-display mt-3 text-3xl font-semibold text-[var(--ink)]">Find the right service, then start the conversation.</h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--muted)]">
            Services are public so people can understand what Ethioweb offers before reaching out. Course login stays separate for the education experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="rounded-full bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0b5252]">
              Start a project
            </Link>
            <Link href="/about" className="rounded-full border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--brand)] hover:text-[var(--brand)]">
              Learn more about Ethioweb
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
