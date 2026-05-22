import Link from "next/link";
import { Brain, GraduationCap } from "lucide-react";
import { LearningAccessCta } from "@/components/education/learning-access-cta";
import { PageHero } from "@/components/sections/page-hero";
import { educationCourses } from "@/lib/courses/catalog";

export const metadata = {
  title: "Education",
  description: "Explore Ethioweb learning tracks for HTML foundations and practical AI education.",
};

export default function EducationPage() {
  return (
    <div>
      <PageHero
        eyebrow="Education"
        title="Choose a course and start studying"
        subtitle="Two courses are available now. Pick one and start learning right away."
      />

      <section className="container-wrap pb-16">
        <div className="grid gap-5 lg:grid-cols-2">
          {educationCourses.map((course) => (
            <article key={course.slug} className="card relative overflow-hidden p-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${course.accent}`} />
              <div className="relative">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">{course.eyebrow}</p>
                    <h3 className="heading-display mt-3 text-3xl font-black">{course.title}</h3>
                  </div>
                  {course.slug === "ai" ? <Brain className="h-6 w-6 text-[var(--brand)]" /> : <GraduationCap className="h-6 w-6 text-[var(--brand)]" />}
                </div>

                <p className="mt-4 text-sm leading-8 text-[var(--muted)]">{course.description}</p>

                <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold text-[var(--muted)]">
                  {course.stats.map((stat) => (
                    <span key={stat} className="rounded-full border border-[var(--line)] bg-[var(--paper)] px-3 py-1">{stat}</span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <LearningAccessCta
                    authenticatedHref={course.startHref}
                    authenticatedLabel="Start learning"
                    guestHref="/auth/login"
                    guestLabel="Log in to study"
                    className="btn-primary text-sm"
                  />
                  <Link href={course.href} className="btn-secondary text-sm">View course</Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-[24px] border border-[var(--line)] bg-[var(--panel)] p-5 md:p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Learning access</p>
          <p className="mt-3 max-w-3xl text-sm leading-8 text-[var(--muted)]">
            Course pages stay public so visitors can explore the curriculum. Logging in is only required when someone wants to start studying inside Ethioweb.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <LearningAccessCta
              authenticatedHref="/dashboard"
              authenticatedLabel="Open your learning workspace"
              guestHref="/auth/login"
              guestLabel="Log in to start studying"
              className="btn-primary text-sm"
            />
            <Link href="/auth/login" className="btn-secondary text-sm">Already registered? Log in</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
