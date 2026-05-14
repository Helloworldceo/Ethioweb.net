import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { getHtmlCourseLesson, htmlCourseLessons } from "@/lib/courses/html-course";

type HtmlLessonPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return htmlCourseLessons.map((lesson) => ({ slug: lesson.slug }));
}

export async function generateMetadata({ params }: HtmlLessonPageProps) {
  const { slug } = await params;
  const lesson = getHtmlCourseLesson(slug);

  if (!lesson) {
    return {
      title: "Lesson not found",
      description: "The requested HTML course lesson does not exist.",
    };
  }

  return {
    title: `${lesson.label}: ${lesson.title}`,
    description: lesson.summary,
  };
}

export default async function HtmlLessonPage({ params }: HtmlLessonPageProps) {
  const { slug } = await params;
  const lesson = getHtmlCourseLesson(slug);

  if (!lesson) {
    notFound();
  }

  const lessonIndex = htmlCourseLessons.findIndex((item) => item.slug === slug);
  const prevLesson = lessonIndex > 0 ? htmlCourseLessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < htmlCourseLessons.length - 1 ? htmlCourseLessons[lessonIndex + 1] : null;

  return (
    <div>
      <PageHero
        eyebrow={lesson.label}
        title={lesson.title}
        subtitle={lesson.summary}
      />

      <section className="container-wrap pb-12">
        <div className="card p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <p className="chip">Estimated time: {lesson.duration}</p>
            <Link href="/education/html" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
              <ArrowLeft className="h-4 w-4" />
              Back to course home
            </Link>
          </div>

          <h2 className="heading-display text-2xl font-black">Learning objectives</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--muted)]">
            {lesson.objectives.map((objective) => (
              <li key={objective} className="rounded-xl border border-[var(--line)] bg-[var(--paper)] px-4 py-3">
                {objective}
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Practice task</p>
            <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{lesson.exercise}</p>
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 px-1">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand)]">Full original lesson content</p>
              <a
                href={`/html-course/${lesson.sourceFile}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[var(--brand)]"
              >
                Open standalone version
              </a>
            </div>

            <iframe
              title={`${lesson.title} full lesson`}
              src={`/html-course/${lesson.sourceFile}`}
              className="h-[78vh] w-full rounded-xl border border-[var(--line)] bg-white"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="container-wrap pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {prevLesson ? (
            <Link href={`/education/html/${prevLesson.slug}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">{prevLesson.title}</p>
            </Link>
          ) : (
            <div className="card p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">Start of course</p>
            </div>
          )}

          {nextLesson ? (
            <Link href={`/education/html/${nextLesson.slug}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">{nextLesson.title}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                Continue <ArrowRight className="h-4 w-4" />
              </p>
            </Link>
          ) : (
            <div className="card p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">Course completed</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
