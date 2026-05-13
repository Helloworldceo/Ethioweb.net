import Link from "next/link";

export const metadata = {
  title: "Capability Roadmap",
  description: "Track Ethioweb platform capability rollout status.",
};

const rows = [
  { name: "AI-generated CV builder", status: "Live (MVP)", href: "/dashboard/cv-builder" },
  { name: "Portfolio templates", status: "Live (MVP)", href: "/portfolio-templates" },
  { name: "Job matching", status: "Live (MVP)", href: "/jobs" },
  { name: "Verification badges", status: "Live (request flow)", href: "/dashboard#settings" },
  { name: "Team/company profiles", status: "Live (MVP)", href: "/teams" },
  { name: "Messaging", status: "Live (MVP)", href: "/messages" },
  { name: "Custom domains", status: "Live (MVP)", href: "/dashboard/domains" },
];

export default function RoadmapPage() {
  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Capability Rollout</h1>
      <p className="mt-2 text-[var(--muted)]">Strict tracking for original prompt capabilities.</p>

      <div className="mt-6 grid gap-3">
        {rows.map((row) => (
          <article key={row.name} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{row.name}</p>
              <p className="text-sm text-[var(--muted)]">{row.status}</p>
            </div>
            <Link href={row.href} className="btn-secondary text-sm">Open</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
