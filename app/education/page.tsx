import Link from "next/link";
import { BookOpenCheck, Code2, FileCode2, GraduationCap, PlayCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";

export const metadata = {
  title: "Education",
  description: "Learn web development with Ethioweb courses, starting with HTML fundamentals.",
};

const lessons = [
  {
    title: "1. HTML Foundations",
    description: "Understand elements, tags, attributes, headings, paragraphs, links, and images.",
    status: "Ready",
    href: "/education/html/module-01",
  },
  {
    title: "2. Page Structure",
    description: "Build clean pages with semantic sections, navigation, main content, and footers.",
    status: "Next",
    href: "/education/html/module-02",
  },
  {
    title: "3. Forms and Inputs",
    description: "Create contact forms, labels, inputs, buttons, and accessible field groups.",
    status: "Draft",
    href: "/education/html/module-07",
  },
  {
    title: "4. Project Practice",
    description: "Turn the course into a small profile page project students can publish.",
    status: "Draft",
    href: "/education/html/module-12",
  },
];

const resources = [
  "Beginner-friendly lessons",
  "Practice tasks after each section",
  "HTML examples we can update anytime",
  "Course notes for Ethioweb learners",
];

export default function EducationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Education"
        title="HTML course home"
        subtitle="A dedicated space for Ethioweb lessons. We will keep the HTML course here and update it as the class grows."
      />

      <section className="container-wrap grid gap-5 pb-14 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="card p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--brand)]">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--brand)]">Current course</p>
              <h2 className="heading-display mt-2 text-3xl font-black">HTML for Beginners</h2>
              <p className="mt-3 leading-8 text-[var(--muted)]">
                This course introduces the building blocks of the web. Students will learn how to
                structure pages, add content, link resources, and prepare a simple web page project.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/education/html" className="btn-primary">
              Start learning
            </Link>
            <Link href="#lessons" className="btn-secondary">
              View lessons
            </Link>
          </div>
        </article>

        <aside className="card p-6">
          <p className="heading-display text-2xl font-bold">Course resources</p>
          <div className="mt-5 grid gap-3">
            {resources.map((resource) => (
              <div key={resource} className="flex items-center gap-3 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3">
                <BookOpenCheck className="h-4 w-4 text-[var(--brand)]" />
                <span className="text-sm text-[var(--muted)]">{resource}</span>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section id="lessons" className="container-wrap scroll-mt-28 pb-16">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="chip">Course outline</p>
            <h2 className="heading-display mt-3 text-3xl font-black">HTML lessons</h2>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
            <PlayCircle className="h-4 w-4" />
            More lessons coming
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {lessons.map((lesson) => (
            <Link key={lesson.title} href={lesson.href} className="card block p-5 transition-transform hover:-translate-y-1">
              <div className="flex items-start justify-between gap-3">
                <Code2 className="mt-1 h-5 w-5 text-[var(--brand)]" />
                <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">
                  {lesson.status}
                </span>
              </div>
              <h3 className="heading-display mt-4 text-xl font-bold">{lesson.title}</h3>
              <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{lesson.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-wrap pb-16">
        <article className="card p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                <FileCode2 className="h-4 w-4" />
                HTML practice area
              </p>
              <h2 className="heading-display mt-2 text-2xl font-black">Next update: add lesson content</h2>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                When the course material is ready, we can add lesson pages, examples, assignments,
                downloadable notes, and videos here.
              </p>
            </div>
            <Link href="/education/html/module-01" className="btn-secondary text-sm">
              Start lesson 1
            </Link>
          </div>
        </article>
      </section>
    </div>
  );
}
