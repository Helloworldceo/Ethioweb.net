import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-wrap py-16">
      <div className="card max-w-2xl p-8">
        <h1 className="heading-display text-4xl font-black">Page not found</h1>
        <p className="mt-3 text-[var(--muted)]">The page you are looking for does not exist or was moved.</p>
        <Link href="/" className="btn-primary mt-6">Return home</Link>
      </div>
    </section>
  );
}
