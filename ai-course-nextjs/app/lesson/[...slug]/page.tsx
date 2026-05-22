"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { courseModules, getModuleById, getLessonById, getNextLesson, getPreviousLesson } from "@/lib/courseData"
import { loadProgress, canAccessLesson, completeLesson, submitExercise, getExerciseStatus } from "@/lib/progress"
import { UserProgress } from "@/types/course"
import ExerciseComponent from "@/components/ExerciseComponent"
import { CheckCircle, ChevronLeft, ChevronRight, Lock, BookOpen, Award } from "lucide-react"

export default function LessonPage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string
  const lessonId = params.lessonId as string

  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [mounted, setMounted] = useState(false)
  const [showCompletionModal, setShowCompletionModal] = useState(false)

  useEffect(() => {
    const loaded = loadProgress()
    setProgress(loaded)
    setMounted(true)

    if (!canAccessLesson(loaded, moduleId, lessonId)) {
      router.push("/")
    }
  }, [moduleId, lessonId, router])

  const handleExerciseSubmit = (exerciseId: string, correct: boolean, points: number) => {
    if (!progress) return
    const updated = submitExercise(progress, exerciseId, correct, points)
    setProgress({ ...updated })
  }

  const handleCompleteLesson = () => {
    if (!progress) return
    const updated = completeLesson(progress, moduleId, lessonId)
    setProgress({ ...updated })
    setShowCompletionModal(true)
  }

  if (!mounted || !progress) {
    return (
      <div className="min-h-screen bg-ethiopia-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FEDD00]"></div>
      </div>
    )
  }

  const module = getModuleById(moduleId)
  const lesson = getLessonById(moduleId, lessonId)

  if (!module || !lesson) {
    router.push("/")
    return null
  }

  const isLessonCompleted = progress.completedLessons.includes(lessonId)
  const allExercisesCorrect = lesson.exercises.every(
    (e) => progress.exerciseScores[e.id]?.correct
  )
  const nextLessonInfo = getNextLesson(moduleId, lessonId)
  const prevLessonInfo = getPreviousLesson(moduleId, lessonId)

  // Parse markdown-like content to HTML
  const renderContent = (content: string) => {
    let html = content
      .replace(/## (.*)/g, '<h2>$1</h2>')
      .replace(/### (.*)/g, '<h3>$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/
/g, '<br/>')

    return { __html: html }
  }

  return (
    <div className="min-h-screen bg-ethiopia-dark">
      {/* Header */}
      <header className="bg-[#1e1e2e] border-b border-[#2d2d44] sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href={`/module/${moduleId}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">{module.title}</span>
            </Link>

            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#FEDD00]" />
              <span className="text-sm text-gray-400">
                Lesson {module.lessons.findIndex((l) => l.id === lessonId) + 1} of {module.lessons.length}
              </span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white mt-3">{lesson.title}</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Lesson Content */}
        <div className="bg-[#1e1e2e] rounded-xl border border-[#2d2d44] p-6 mb-8">
          <div 
            className="prose-custom"
            dangerouslySetInnerHTML={renderContent(lesson.content)}
          />
        </div>

        {/* Exercises */}
        {lesson.exercises.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FEDD00]" />
              Exercises
            </h2>

            {lesson.exercises.map((exercise) => {
              const status = getExerciseStatus(progress, exercise.id)
              return (
                <ExerciseComponent
                  key={exercise.id}
                  exercise={exercise}
                  onSubmit={handleExerciseSubmit}
                  isCompleted={status.correct}
                  attempts={status.attempts}
                />
              )
            })}
          </div>
        )}

        {/* Lesson Completion */}
        <div className="bg-[#1e1e2e] rounded-xl border border-[#2d2d44] p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                {isLessonCompleted ? "Lesson Completed!" : "Complete This Lesson"}
              </h3>
              <p className="text-sm text-gray-400">
                {isLessonCompleted 
                  ? "Great job! You can move on to the next lesson."
                  : allExercisesCorrect
                  ? "All exercises correct! Mark this lesson as complete."
                  : "Complete all exercises to finish this lesson."
                }
              </p>
            </div>

            {!isLessonCompleted ? (
              <button
                onClick={handleCompleteLesson}
                disabled={!allExercisesCorrect}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  allExercisesCorrect
                    ? "bg-[#009639] hover:bg-[#007a2e] text-white cursor-pointer"
                    : "bg-[#2d2d44] text-gray-500 cursor-not-allowed"
                }`}
              >
                Mark Complete
              </button>
            ) : (
              <div className="flex items-center gap-2 px-6 py-3 bg-[#009639]/20 text-[#009639] rounded-lg">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold">Completed</span>
              </div>
            )}
          </div>

          {!allExercisesCorrect && !isLessonCompleted && (
            <p className="text-xs text-gray-500 mt-3">
              Complete all exercises correctly to unlock the next lesson.
            </p>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-[#2d2d44]">
          {prevLessonInfo ? (
            <Link
              href={`/lesson/${prevLessonInfo.moduleId}/${prevLessonInfo.lessonId}`}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-gray-600">Previous</div>
                <div className="font-medium text-sm">Previous Lesson</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextLessonInfo ? (
            <Link
              href={`/lesson/${nextLessonInfo.moduleId}/${nextLessonInfo.lessonId}`}
              className={`flex items-center gap-2 transition-colors ${
                isLessonCompleted
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-600 cursor-not-allowed pointer-events-none"
              }`}
            >
              <div className="text-right">
                <div className="text-xs text-gray-600">Next</div>
                <div className="font-medium text-sm">Next Lesson</div>
              </div>
              {isLessonCompleted ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
            </Link>
          ) : (
            <Link
              href={`/module/${moduleId}`}
              className="flex items-center gap-2 text-[#FEDD00] hover:text-[#FEDD00]/80 transition-colors"
            >
              <div className="text-right">
                <div className="text-xs text-[#FEDD00]/60">Back to</div>
                <div className="font-medium text-sm">Module Overview</div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </main>

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e2e] rounded-2xl border border-[#009639]/50 p-8 max-w-md w-full animate-fade-in">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#009639]/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#009639]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Lesson Complete!</h2>
              <p className="text-gray-400 mb-6">
                Great job finishing "{lesson.title}". You earned points for correct exercises!
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="px-6 py-2 bg-[#2d2d44] hover:bg-[#3b3b5c] text-white rounded-lg transition-colors"
                >
                  Stay Here
                </button>
                {nextLessonInfo && (
                  <Link
                    href={`/lesson/${nextLessonInfo.moduleId}/${nextLessonInfo.lessonId}`}
                    className="px-6 py-2 bg-[#009639] hover:bg-[#007a2e] text-white rounded-lg transition-colors"
                    onClick={() => setShowCompletionModal(false)}
                  >
                    Next Lesson →
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
