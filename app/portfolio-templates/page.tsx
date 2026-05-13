import Link from "next/link";

const templates = [
  {
    id: "consultant-proof",
    name: "Consultant Proof",
    description: "Case-study first layout for consultants and freelancers.",
  },
  {
    id: "creative-showcase",
    name: "Creative Showcase",
    description: "Visual-first layout for designers and creators.",
  },
  {
    id: "engineering-portfolio",
    name: "Engineering Portfolio",
    description: "Technical-project layout for software professionals.",
  },
];

export const metadata = {
  title: "Portfolio Templates",
  description: "Pick a portfolio template and launch your public profile faster.",
};

export default function PortfolioTemplatesPage() {
  return (
    <section className="container-wrap py-12">
      <h1 className="heading-display text-4xl font-black">Portfolio Templates</h1>
      <p className="mt-2 text-[var(--muted)]">Choose a structure built for your career type, then customize in your dashboard.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <article key={template.id} className="card p-5">
            <h2 className="heading-display text-2xl font-bold">{template.name}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{template.description}</p>
            <Link href="/dashboard" className="btn-secondary mt-4 text-sm">Use this template</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
