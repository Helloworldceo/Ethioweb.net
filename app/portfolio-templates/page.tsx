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
            <Link href="/auth/signup" className="btn-secondary mt-4 text-sm">Register to use this template</Link>
          </article>
        ))}
      </div>

      <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Access model</p>
        <p className="mt-3 max-w-3xl text-sm leading-8 text-[var(--muted)]">
          Anyone can browse templates. Registration is required before you can apply a template inside your Ethioweb workspace.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/auth/signup" className="btn-primary text-sm">Register now</Link>
          <Link href="/auth/login" className="btn-secondary text-sm">Already registered? Log in</Link>
        </div>
      </div>
    </section>
  );
}
