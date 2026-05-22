"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, Circle, FileText, Lock, Target } from "lucide-react";
import { canAccessModule, courseModules, getModuleById, isModuleCompleted } from "@/lib/courses/ai-course";
import { useAiCourseProgress } from "@/lib/courses/use-ai-course-progress";

export default function AiModulePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const moduleId = params.id;
  const progress = useAiCourseProgress();

  useEffect(() => {
    if (!canAccessModule(progress, moduleId)) {
      router.replace("/education/ai");
    }
  }, [moduleId, progress, router]);

  const moduleItem = getModuleById(moduleId);
  if (!moduleItem) {
    router.replace("/education/ai");
    return null;
  }

  const completed = isModuleCompleted(progress, moduleId);
  const moduleIndex = courseModules.findIndex((entry) => entry.id === moduleId);
  const prevModule = moduleIndex > 0 ? courseModules[moduleIndex - 1] : null;
  const nextModule = moduleIndex < courseModules.length - 1 ? courseModules[moduleIndex + 1] : null;

  return (
    <div>
      <section className="container-wrap pt-14 pb-8">
        <Link href="/education/ai" className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
          <ChevronLeft className="h-4 w-4" /> Back to AI course
        </Link>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="chip">Module {moduleItem.number}</span>
          {completed && <span className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">Completed</span>}
        </div>
        <h1 className="heading-display mt-4 text-4xl font-black md:text-5xl">{moduleItem.title}</h1>
        <p className="mt-3 max-w-3xl text-lg leading-8 text-[var(--muted)]">{moduleItem.subtitle}</p>
      </section>

      <section className="container-wrap grid gap-5 pb-12 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="card p-6">
          <p className="text-sm leading-8 text-[var(--muted)]">{moduleItem.description}</p>

          <div className="mt-8">
            <h2 className="heading-display flex items-center gap-2 text-2xl font-bold"><FileText className="h-5 w-5 text-[var(--brand)]" /> Lessons</h2>
            <div className="mt-4 space-y-3">
              {moduleItem.lessons.map((lesson, index) => {
                const lessonComplete = progress.completedLessons.includes(lesson.id);
                return (
                  <Link key={lesson.id} href={`/education/ai/lesson/${moduleId}/${lesson.id}`} className="card block p-4 transition-transform hover:-translate-y-1">
                    <div className="flex items-center gap-4">
                      <div className={`rounded-full border p-3 ${lessonComplete ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-[var(--line)] bg-[var(--paper)] text-[var(--brand)]"}`}>
                        {lessonComplete ? <CheckCircle className="h-4 w-4" /> : <span className="text-sm font-bold">{index + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <h3 className="heading-display text-lg font-bold">{lesson.title}</h3>
                        <p className="mt-1 text-sm text-[var(--muted)]">{lesson.exercises.length} exercise{lesson.exercises.length === 1 ? "" : "s"}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-[var(--muted)]" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </article>

        <aside className="card p-6">
          <h2 className="heading-display flex items-center gap-2 text-2xl font-bold"><Target className="h-5 w-5 text-[var(--brand)]" /> Module project</h2>
          <h3 className="mt-4 text-lg font-bold">{moduleItem.project.title}</h3>
          <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{moduleItem.project.description}</p>

          <div className="mt-5">
            <p className="text-sm font-semibold text-[var(--brand)]">Steps</p>
            <ol className="mt-3 space-y-3 text-sm leading-7 text-[var(--muted)]">
              {moduleItem.project.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--paper)] text-xs font-bold text-[var(--brand)]">{index + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-5">
            <p className="text-sm font-semibold text-[var(--brand)]">Deliverables</p>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-[var(--muted)]">
              {moduleItem.project.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Circle className="mt-1 h-4 w-4 text-[var(--brand)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section className="container-wrap pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {prevModule ? (
            <Link href={`/education/ai/module/${prevModule.id}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">{prevModule.title}</p>
            </Link>
          ) : (
            <div className="card p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">Start of course</p>
            </div>
          )}

          {nextModule && canAccessModule(progress, nextModule.id) ? (
            <Link href={`/education/ai/module/${nextModule.id}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">{nextModule.title}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">Continue <ChevronRight className="h-4 w-4" /></p>
            </Link>
          ) : nextModule ? (
            <div className="card p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">{nextModule.title}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)]"><Lock className="h-4 w-4" /> Complete this module to unlock</p>
            </div>
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
