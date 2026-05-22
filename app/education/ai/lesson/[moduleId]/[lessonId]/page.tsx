"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Award, BookOpen, CheckCircle, ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { AiExercise } from "@/components/education/ai-exercise";
import { AiLessonContent } from "@/components/education/ai-lesson-content";
import {
  canAccessLesson,
  completeLesson,
  getExerciseStatus,
  getLessonById,
  getModuleById,
  getNextLesson,
  getPreviousLesson,
  submitExercise,
} from "@/lib/courses/ai-course";
import { useAiCourseProgress } from "@/lib/courses/use-ai-course-progress";

export default function AiLessonPage() {
  const params = useParams<{ moduleId: string; lessonId: string }>();
  const router = useRouter();
  const moduleId = params.moduleId;
  const lessonId = params.lessonId;
  const progress = useAiCourseProgress();
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    if (!canAccessLesson(progress, moduleId, lessonId)) {
      router.replace("/education/ai");
    }
  }, [lessonId, moduleId, progress, router]);

  const moduleItem = getModuleById(moduleId);
  const lesson = getLessonById(moduleId, lessonId);

  if (!moduleItem || !lesson) {
    router.replace("/education/ai");
    return null;
  }

  const lessonCompleted = progress.completedLessons.includes(lessonId);
  const allExercisesCorrect = lesson.exercises.every((exercise) => progress.exerciseScores[exercise.id]?.correct);
  const nextLessonInfo = getNextLesson(moduleId, lessonId);
  const prevLessonInfo = getPreviousLesson(moduleId, lessonId);

  function handleExerciseSubmit(exerciseId: string, correct: boolean, points: number) {
    submitExercise(progress, exerciseId, correct, points);
  }

  function handleCompleteLesson() {
    completeLesson(progress, moduleId, lessonId);
    setShowCompletion(true);
  }

  return (
    <div>
      <section className="container-wrap pt-10 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href={`/education/ai/module/${moduleId}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
            <ChevronLeft className="h-4 w-4" /> Back to module
          </Link>
          <div className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--muted)]">
            <BookOpen className="h-4 w-4 text-[var(--brand)]" />
            Lesson {moduleItem.lessons.findIndex((item) => item.id === lessonId) + 1} of {moduleItem.lessons.length}
          </div>
        </div>
        <h1 className="heading-display mt-4 text-4xl font-black md:text-5xl">{lesson.title}</h1>
      </section>

      <section className="container-wrap grid gap-5 pb-10 lg:grid-cols-[1.08fr_0.92fr]">
        <article className="card p-6">
          <AiLessonContent content={lesson.content} />
        </article>

        <aside className="space-y-5">
          <article className="card p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
              <Award className="h-4 w-4" /> Lesson progress
            </div>
            <h2 className="heading-display mt-3 text-2xl font-bold">
              {lessonCompleted ? "Lesson completed" : allExercisesCorrect ? "Ready to complete" : "Finish the exercises"}
            </h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              {lessonCompleted
                ? "You can move to the next lesson or review this content again any time."
                : allExercisesCorrect
                  ? "All exercises are correct. Mark the lesson complete to unlock the next step."
                  : "Answer every exercise correctly to unlock the lesson completion button."}
            </p>
            <div className="mt-5">
              {lessonCompleted ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle className="h-4 w-4" /> Completed
                </div>
              ) : (
                <button type="button" className="btn-primary text-sm disabled:cursor-not-allowed disabled:opacity-50" disabled={!allExercisesCorrect} onClick={handleCompleteLesson}>
                  Mark lesson complete
                </button>
              )}
            </div>
          </article>

          <article className="card p-6">
            <h2 className="heading-display text-2xl font-bold">Exercises</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">Correct answers save in your browser progress.</p>
          </article>
        </aside>
      </section>

      <section className="container-wrap pb-12">
        <div className="space-y-4">
          {lesson.exercises.map((exercise) => {
            const status = getExerciseStatus(progress, exercise.id);
            return (
              <AiExercise
                key={exercise.id}
                exercise={exercise}
                onSubmit={handleExerciseSubmit}
                isCompleted={status.correct}
                attempts={status.attempts}
              />
            );
          })}
        </div>
      </section>

      <section className="container-wrap pb-16">
        <div className="grid gap-4 md:grid-cols-2">
          {prevLessonInfo ? (
            <Link href={`/education/ai/lesson/${prevLessonInfo.moduleId}/${prevLessonInfo.lessonId}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">Previous lesson</p>
            </Link>
          ) : (
            <div className="card p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Previous</p>
              <p className="heading-display mt-2 text-xl font-bold">Start of module</p>
            </div>
          )}

          {nextLessonInfo ? (
            <Link
              href={`/education/ai/lesson/${nextLessonInfo.moduleId}/${nextLessonInfo.lessonId}`}
              className={`card block p-5 ${lessonCompleted ? "" : "pointer-events-none opacity-70"}`}
            >
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">Next lesson</p>
              <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--brand)]">
                {lessonCompleted ? <><span>Continue</span><ChevronRight className="h-4 w-4" /></> : <><Lock className="h-4 w-4" /><span>Complete this lesson to unlock</span></>}
              </p>
            </Link>
          ) : (
            <Link href={`/education/ai/module/${moduleId}`} className="card block p-5">
              <p className="text-xs font-semibold text-[var(--muted)]">Next</p>
              <p className="heading-display mt-2 text-xl font-bold">Back to module overview</p>
            </Link>
          )}
        </div>
      </section>

      {showCompletion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4">
          <div className="card max-w-md p-7 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h2 className="heading-display mt-4 text-2xl font-black">Lesson complete</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">You finished {lesson.title}. Your progress is saved locally in this browser.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button type="button" className="btn-secondary text-sm" onClick={() => setShowCompletion(false)}>Stay here</button>
              {nextLessonInfo && (
                <Link href={`/education/ai/lesson/${nextLessonInfo.moduleId}/${nextLessonInfo.lessonId}`} className="btn-primary text-sm" onClick={() => setShowCompletion(false)}>
                  Next lesson
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
