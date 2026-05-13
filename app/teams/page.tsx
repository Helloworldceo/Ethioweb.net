import Link from "next/link";

export const metadata = {
  title: "Teams",
  description: "Team and company profile pages for collaborative brand presence.",
};

export default function TeamsPage() {
  const teams = [
    { slug: "ethioweb-studio", name: "Ethioweb Studio", members: 6, focus: "Web platforms and digital identity" },
    { slug: "nile-product-lab", name: "Nile Product Lab", members: 4, focus: "SaaS product design and growth" },
  ];

  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Team / Company Profiles</h1>
      <p className="mt-2 text-[var(--muted)]">Publish a shared company identity, team services, and member roster.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {teams.map((team) => (
          <article key={team.slug} className="card p-5">
            <h2 className="heading-display text-2xl font-bold">{team.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{team.focus}</p>
            <p className="mt-1 text-xs text-[var(--muted)]">{team.members} members</p>
            <Link href={`/team/${team.slug}`} className="btn-secondary mt-4 text-sm">View team profile</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
