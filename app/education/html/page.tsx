import Link from "next/link";
import { BookOpenCheck, ClipboardCheck, FileBadge2, GraduationCap } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { htmlCourseLessons } from "@/lib/courses/html-course";

export const metadata = {
  title: "HTML Course",
  description: "Next.js powered HTML beginner course with 12 modules, resources, and capstone guidance.",
};

export default function HtmlCoursePage() {
  const modules = htmlCourseLessons.filter((lesson) => lesson.kind === "module");
  const resources = htmlCourseLessons.filter((lesson) => lesson.kind === "resource");

  return (
    <div>
      <PageHero
        eyebrow="HTML Course"
        title="HTML Fundamentals in Next.js"
        subtitle="A full 12-module learning path with exercises, references, and capstone requirements, now rendered natively in the app router."
      />

      <section className="container-wrap grid gap-5 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="card p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--brand)]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--brand)]">Course path</p>
              <h2 className="heading-display mt-2 text-3xl font-black">Start from Module 01</h2>
              <p className="mt-3 leading-8 text-[var(--muted)]">
                Learn the complete HTML foundation from document structure to semantic layout,
                accessibility, SEO metadata, and a publish-ready capstone.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/education/html/module-01" className="btn-primary">
              Start module 01
            </Link>
            <Link href="#resources" className="btn-secondary">
              View resources
            </Link>
          </div>
        </article>

        <aside className="card p-6">
          <p className="heading-display text-2xl font-bold">What you get</p>
          <div className="mt-5 grid gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
              <BookOpenCheck className="h-4 w-4 text-[var(--brand)]" />
              <span className="text-sm text-[var(--muted)]">{modules.length} structured modules</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
              <ClipboardCheck className="h-4 w-4 text-[var(--brand)]" />
              <span className="text-sm text-[var(--muted)]">Exercise in every lesson</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
              <FileBadge2 className="h-4 w-4 text-[var(--brand)]" />
              <span className="text-sm text-[var(--muted)]">Capstone and certificate guidance</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="container-wrap pb-14">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="chip">Learning modules</p>
            <h2 className="heading-display mt-3 text-3xl font-black">Course curriculum</h2>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {modules.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/education/html/${lesson.slug}`}
              className="card block p-5 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-[var(--brand)]">{lesson.label}</span>
                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                  {lesson.duration}
                </span>
              </div>
              <h3 className="heading-display mt-3 text-xl font-bold">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{lesson.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section id="resources" className="container-wrap pb-16">
        <div className="mb-5">
          <p className="chip">Resources</p>
          <h2 className="heading-display mt-3 text-3xl font-black">Bonus materials</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {resources.map((lesson) => (
            <Link key={lesson.slug} href={`/education/html/${lesson.slug}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--brand)]">{lesson.label}</p>
              <h3 className="heading-display mt-2 text-lg font-bold">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{lesson.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
