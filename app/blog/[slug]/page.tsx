import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

function getStaticPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug) ?? null;
}

async function getDbPost(slug: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const supabase = createClient(url, key);
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  return data ?? null;
}

export async function generateStaticParams() {
  const staticSlugs = blogPosts.map((post) => ({ slug: post.slug }));

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return staticSlugs;

  const supabase = createClient(url, key);
  const { data } = await supabase.from("blog_posts").select("slug").eq("is_published", true);
  const dbSlugs = (data ?? []).map((p: { slug: string }) => ({ slug: p.slug }));

  const all = [...staticSlugs, ...dbSlugs];
  const unique = Array.from(new Map(all.map((s) => [s.slug, s])).values());
  return unique;
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const dbPost = await getDbPost(slug);
  const post = dbPost ?? getStaticPost(slug);
  if (!post) return { title: "Post not found" };

  const ogTitle = encodeURIComponent(post.title);
  const ogSubtitle = encodeURIComponent(post.excerpt || "Insights for digital growth");
  const ogImage = `https://ethioweb.net/api/og?kind=blog&title=${ogTitle}&subtitle=${ogSubtitle}`;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
      languages: {
        en: `/blog/${slug}`,
        am: `/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://ethioweb.net/blog/${slug}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const dbPost = await getDbPost(slug);
  const staticPost = getStaticPost(slug);
  const post = dbPost ?? staticPost;

  if (!post) notFound();

  const date = "published_at" in post
    ? (post.published_at as string | null)?.slice(0, 10) ?? ""
    : (post as { date: string }).date;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: date,
    dateModified: date,
    mainEntityOfPage: `https://ethioweb.net/blog/${slug}`,
    author: {
      "@type": "Organization",
      name: "Ethioweb",
    },
    publisher: {
      "@type": "Organization",
      name: "Ethioweb",
      logo: {
        "@type": "ImageObject",
        url: "https://ethioweb.net/newlogo.png",
      },
    },
  };

  return (
    <section className="container-wrap py-14">
      <article className="card max-w-3xl p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{date}</p>
        <h1 className="heading-display mt-3 text-4xl font-black">{post.title}</h1>
        <p className="mt-6 whitespace-pre-wrap leading-8 text-[var(--muted)]">{post.content}</p>
      </article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
    </section>
  );
}

