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
        subtitle="From websites to profile systems, Ethioweb delivers fast and scalable products."
      />

      <section className="container-wrap grid gap-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <article key={service.title} className="card p-6">
            <h2 className="heading-display text-2xl font-bold">{service.title}</h2>
            <p className="mt-3 leading-8 text-[var(--muted)]">{service.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
