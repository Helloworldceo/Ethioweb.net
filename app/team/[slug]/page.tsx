import { notFound } from "next/navigation";

type TeamPageProps = {
  params: Promise<{ slug: string }>;
};

const teams = [
  {
    slug: "ethioweb-studio",
    name: "Ethioweb Studio",
    focus: "Web platforms and digital identity",
    services: ["Website Development", "Portfolio Creation", "IT Consulting"],
  },
  {
    slug: "nile-product-lab",
    name: "Nile Product Lab",
    focus: "SaaS product design and growth",
    services: ["Product Strategy", "UI/UX", "Growth Experiments"],
  },
];

export async function generateStaticParams() {
  return teams.map((team) => ({ slug: team.slug }));
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;
  const team = teams.find((item) => item.slug === slug);

  if (!team) notFound();

  return (
    <section className="container-wrap py-12">
      <article className="card p-7">
        <p className="chip">Team Profile</p>
        <h1 className="heading-display mt-3 text-4xl font-black">{team.name}</h1>
        <p className="mt-2 text-[var(--muted)]">{team.focus}</p>

        <h2 className="heading-display mt-6 text-2xl font-bold">Services</h2>
        <ul className="mt-2 space-y-2 text-sm text-[var(--muted)]">
          {team.services.map((service) => (
            <li key={service}>- {service}</li>
          ))}
        </ul>
      </article>
    </section>
  );
}
