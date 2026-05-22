"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { courseModules, getModuleById } from "@/lib/courseData"
import { loadProgress, canAccessModule, isModuleCompleted } from "@/lib/progress"
import { UserProgress } from "@/types/course"
import { CheckCircle, Circle, Lock, ChevronLeft, ChevronRight, FileText, Target } from "lucide-react"

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.id as string

  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const loaded = loadProgress()
    setProgress(loaded)
    setMounted(true)

    if (!canAccessModule(loaded, moduleId)) {
      router.push("/")
    }
  }, [moduleId, router])

  if (!mounted || !progress) {
    return (
      <div className="min-h-screen bg-ethiopia-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FEDD00]"></div>
      </div>
    )
  }

  const module = getModuleById(moduleId)
  if (!module) {
    router.push("/")
    return null
  }

  const isCompleted = isModuleCompleted(progress, moduleId)
  const moduleIndex = courseModules.findIndex((m) => m.id === moduleId)
  const prevModule = moduleIndex > 0 ? courseModules[moduleIndex - 1] : null
  const nextModule = moduleIndex < courseModules.length - 1 ? courseModules[moduleIndex + 1] : null

  return (
    <div className="min-h-screen bg-ethiopia-dark">
      <header className="bg-[#1e1e2e] border-b border-[#2d2d44]">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4">
            <ChevronLeft className="w-4 h-4" />
            Back to Course
          </Link>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold text-[#FEDD00] bg-[#FEDD00]/10 px-2 py-1 rounded">
                  Module {module.number}
                </span>
                {isCompleted && (
                  <span className="flex items-center gap-1 text-xs font-bold text-[#009639] bg-[#009639]/10 px-2 py-1 rounded">
                    <CheckCircle className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-white">{module.title}</h1>
              <p className="text-gray-400 mt-1">{module.subtitle}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-[#1e1e2e] rounded-xl border border-[#2d2d44] p-6 mb-8">
          <p className="text-gray-300">{module.description}</p>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#FEDD00]" />
            Lessons
          </h2>
          <div className="space-y-3">
            {module.lessons.map((lesson, index) => {
              const isLessonCompleted = progress.completedLessons.includes(lesson.id)

              return (
                <Link key={lesson.id} href={`/lesson/${moduleId}/${lesson.id}`}>
                  <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01] ${
                      isLessonCompleted
                        ? "bg-[#009639]/5 border-[#009639]/30"
                        : "bg-[#1e1e2e] border-[#2d2d44] hover:border-[#3b3b5c]"
                    }`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isLessonCompleted ? "bg-[#009639]/20" : "bg-[#2d2d44]"
                      }`}>
                      {isLessonCompleted ? (
                        <CheckCircle className="w-5 h-5 text-[#009639]" />
                      ) : (
                        <span className="text-sm font-bold text-gray-500">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold ${isLessonCompleted ? "text-[#009639]" : "text-white"}`}>
                        {lesson.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {lesson.exercises.length} exercise{lesson.exercises.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#DA020E]" />
            Module Project
          </h2>
          <div className="bg-gradient-to-br from-[#DA020E]/10 to-[#2d2d44] rounded-xl border border-[#DA020E]/30 p-6">
            <h3 className="text-lg font-bold text-white mb-2">{module.project.title}</h3>
            <p className="text-gray-300 mb-4">{module.project.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Steps:</h4>
              <ol className="space-y-2">
                {module.project.steps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="w-5 h-5 rounded-full bg-[#2d2d44] flex items-center justify-center text-xs font-bold text-gray-500 flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Deliverables:</h4>
              <ul className="space-y-1">
                {module.project.deliverables.map((d, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Circle className="w-3 h-3 text-[#FEDD00]" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 border-t border-[#2d2d44]">
          {prevModule ? (
            <Link href={`/module/${prevModule.id}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left">
                <div className="text-xs text-gray-600">Previous</div>
                <div className="font-medium">{prevModule.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextModule && canAccessModule(progress, nextModule.id) ? (
            <Link href={`/module/${nextModule.id}`} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <div className="text-right">
                <div className="text-xs text-gray-600">Next</div>
                <div className="font-medium">{nextModule.title}</div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : nextModule ? (
            <div className="flex items-center gap-2 text-gray-600">
              <Lock className="w-4 h-4" />
              <span className="text-sm">Complete this module to unlock</span>
            </div>
          ) : (
            <div />
          )}
        </div>
      </main>
    </div>
  )
}
