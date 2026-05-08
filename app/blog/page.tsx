import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { blogPosts as staticPosts } from "@/lib/site";

export const revalidate = 60;

export const metadata = {
  title: "Blog",
  description: "Insights on digital identity, portfolio strategy, and web growth.",
};

async function getPosts() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return data && data.length > 0 ? data : null;
}

export default async function BlogPage() {
  const dbPosts = await getPosts();

  const posts = dbPosts
    ? dbPosts.map((p) => ({
        slug: p.slug,
        title: p.title,
        excerpt: p.excerpt,
        date: p.published_at?.slice(0, 10) ?? "",
      }))
    : staticPosts.map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, date: p.date }));

  return (
    <div>
      <PageHero
        eyebrow="Blog"
        title="Insights for digital growth"
        subtitle="Simple, practical articles on portfolios and online identity."
      />

      <section className="container-wrap grid gap-4 pb-16 md:grid-cols-2">
        {posts.map((post) => (
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

