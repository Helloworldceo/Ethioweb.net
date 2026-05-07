import { PageHero } from "@/components/sections/page-hero";

export const metadata = {
  title: "About",
  description: "Learn the mission behind Ethioweb.",
};

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Ethioweb"
        title="A trusted digital platform for professionals and businesses"
        subtitle="We help people show their work, build credibility, and manage visibility."
      />

      <section className="container-wrap grid gap-5 pb-16 md:grid-cols-2">
        <article className="card p-6">
          <h2 className="heading-display text-2xl font-black">Mission</h2>
          <p className="mt-3 leading-8 text-[var(--muted)]">
            Ethioweb exists to make digital identity simple, credible, and useful. Every user should
            have one professional home online for profiles, achievements, documents, and services.
          </p>
        </article>

        <article className="card p-6">
          <h2 className="heading-display text-2xl font-black">Vision</h2>
          <p className="mt-3 leading-8 text-[var(--muted)]">
            We are building the infrastructure for modern personal branding in Africa and beyond,
            with scalable tools for individuals, creators, startups, and teams.
          </p>
        </article>
      </section>
    </div>
  );
}
