import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="container-wrap py-14">
      <article className="card max-w-3xl p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">{post.date}</p>
        <h1 className="heading-display mt-3 text-4xl font-black">{post.title}</h1>
        <p className="mt-6 leading-8 text-[var(--muted)]">{post.content}</p>
      </article>
    </section>
  );
}
