import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { blogPosts } from "@/lib/site";

export const metadata = {
  title: "Blog",
  description: "Insights on digital identity, portfolio strategy, and web growth.",
};

export default function BlogPage() {
  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Insights for digital growth"
        subtitle="Simple, practical articles on portfolios and online identity."
      />

      <section className="container-wrap grid gap-4 pb-16 md:grid-cols-2">
        {blogPosts.map((post) => (
          <article key={post.slug} className="card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{post.date}</p>
            <h2 className="heading-display mt-2 text-2xl font-bold">{post.title}</h2>
            <p className="mt-3 text-[var(--muted)]">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="mt-4 inline-flex text-sm font-semibold text-[var(--brand)]">
              Read article
            </Link>
          </article>
        ))}
      </section>
    </div>
  );
}
