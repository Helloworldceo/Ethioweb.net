"use client";

import Link from "next/link";
import { Award, BookOpen, Brain, RotateCcw, Users } from "lucide-react";
import { LearningAccessCta } from "@/components/education/learning-access-cta";
import { PageHero } from "@/components/sections/page-hero";
import { AiModuleCard } from "@/components/education/ai-module-card";
import { canAccessModule, courseModules, isModuleCompleted, resetProgress } from "@/lib/courses/ai-course";
import { useAiCourseProgress } from "@/lib/courses/use-ai-course-progress";

export default function AiCoursePage() {
  const progress = useAiCourseProgress();

  const totalLessons = courseModules.reduce((sum, module) => sum + module.lessons.length, 0);
  const completion = totalLessons > 0
    ? Math.round((progress.completedLessons.length / totalLessons) * 100)
    : 0;

  function handleReset() {
    resetProgress();
  }

  return (
    <div>
      <PageHero
        eyebrow="AI Course"
        title="AI for Beginners, rebuilt inside Ethioweb"
        subtitle="A guided learning path for the Ethiopian community with structured modules, interactive exercises, and course projects you can finish at your own pace."
      />

      <section className="container-wrap grid gap-5 pb-12 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="card relative overflow-hidden p-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(254,221,0,0.22),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(218,2,14,0.12),transparent_30%)]" />
          <div className="relative">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--brand)]">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--brand)]">Community track</p>
                <h2 className="heading-display mt-2 text-3xl font-black">Let&apos;s Learn AI Together</h2>
                <p className="mt-3 max-w-2xl text-sm leading-8 text-[var(--muted)]">
                  Start with mental models, move into real-world applications, and finish with practical projects and responsible AI habits.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <LearningAccessCta
                authenticatedHref="/education/ai/module/module-1"
                authenticatedLabel="Start module 1"
                guestHref="/auth/login"
                guestLabel="Log in to study"
                className="btn-primary"
              />
              <Link href="#ai-modules" className="btn-secondary">Browse modules</Link>
              <button type="button" className="btn-secondary text-sm" onClick={handleReset}>
                <RotateCcw className="mr-2 h-4 w-4" /> Reset progress
              </button>
            </div>
          </div>
        </article>

        <aside className="card p-6">
          <p className="heading-display text-2xl font-bold">Course snapshot</p>
          <div className="mt-5 grid gap-3">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"><BookOpen className="h-4 w-4" /> {courseModules.length} modules</div>
              <p className="mt-2 text-sm text-[var(--muted)]">Structured to move from AI basics to real-world use, privacy, bias, and final commitments.</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"><Users className="h-4 w-4" /> {totalLessons} lessons</div>
              <p className="mt-2 text-sm text-[var(--muted)]">Short lessons with guided exercises and Ethiopian context throughout the course.</p>
            </div>
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"><Award className="h-4 w-4" /> {completion}% complete</div>
              <p className="mt-2 text-sm text-[var(--muted)]">Your progress is stored locally in the browser so learners can continue where they left off.</p>
            </div>
          </div>
        </aside>
      </section>

      <section id="ai-modules" className="container-wrap pb-16">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="chip">AI curriculum</p>
            <h2 className="heading-display mt-3 text-3xl font-black">Eight modules, one clear path</h2>
          </div>
          <p className="text-sm font-semibold text-[var(--muted)]">Progress saves in this browser</p>
        </div>

        <div className="grid gap-4">
          {courseModules.map((module) => {
            const completed = isModuleCompleted(progress, module.id);
            const accessible = canAccessModule(progress, module.id);
            const moduleProgress = Math.round((module.lessons.filter((lesson) => progress.completedLessons.includes(lesson.id)).length / module.lessons.length) * 100);

            return (
              <AiModuleCard
                key={module.id}
                module={module}
                href={`/education/ai/module/${module.id}`}
                isAccessible={accessible}
                isCompleted={completed}
                progressPercent={moduleProgress}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
