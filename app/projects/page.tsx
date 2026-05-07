import { PageHero } from "@/components/sections/page-hero";
import { projects } from "@/lib/site";

export const metadata = {
  title: "Projects",
  description: "Selected Ethioweb projects and portfolio work.",
};

export default function ProjectsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Projects"
        title="Portfolio work and platform builds"
        subtitle="A curated look at product, branding, and web platforms built through Ethioweb."
      />

      <section className="container-wrap grid gap-4 pb-16 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.slug} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">
              {project.category}
            </p>
            <h2 className="heading-display mt-2 text-2xl font-bold">{project.title}</h2>
            <p className="mt-3 leading-8 text-[var(--muted)]">{project.summary}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
