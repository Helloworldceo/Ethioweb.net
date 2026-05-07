type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="container-wrap pt-14 pb-8">
      <span className="chip">{eyebrow}</span>
      <h1 className="heading-display mt-4 max-w-3xl text-4xl font-black tracking-tight md:text-6xl">
        {title}
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">{subtitle}</p>
    </section>
  );
}
