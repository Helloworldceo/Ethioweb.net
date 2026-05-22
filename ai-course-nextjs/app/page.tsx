"use client"

import { useState, useEffect } from "react"
import { courseModules } from "@/lib/courseData"
import { loadProgress, canAccessModule } from "@/lib/progress"
import { UserProgress } from "@/types/course"
import ModuleCard from "@/components/ModuleCard"
import ProgressBar from "@/components/ProgressBar"
import { Brain, BookOpen, Users, Award, RotateCcw } from "lucide-react"

export default function Home() {
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setProgress(loadProgress())
    setMounted(true)
  }, [])

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      localStorage.removeItem("ai-course-progress-v1")
      setProgress(loadProgress())
      window.location.reload()
    }
  }

  if (!mounted || !progress) {
    return (
      <div className="min-h-screen bg-ethiopia-dark flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FEDD00]"></div>
      </div>
    )
  }

  const getModuleProgress = (moduleId: string) => {
    const module = courseModules.find((m) => m.id === moduleId)
    if (!module) return 0
    const completed = module.lessons.filter((l) =>
      progress.completedLessons.includes(l.id)
    ).length
    return (completed / module.lessons.length) * 100
  }

  return (
    <div className="min-h-screen bg-ethiopia-dark">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-b from-[#0a0a1a] to-[#1a1a2e] border-b border-[#2d2d44]">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-8 h-8 text-[#FEDD00]" />
            <span className="text-[#FEDD00] font-bold tracking-wider text-sm uppercase">
              AI for Beginners
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Let&apos;s Learn AI{" "}
            <span className="text-[#009639]">Together</span>
          </h1>
          <p className="text-xl text-gray-400 mb-2">AIን አብረን እንማር</p>
          <p className="text-gray-500 max-w-2xl mb-8">
            A complete 8-week course designed for the Ethiopian community. 
            No coding required. Learn at your own pace.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-400">
              <BookOpen className="w-5 h-5 text-[#009639]" />
              <span>8 Modules</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Users className="w-5 h-5 text-[#FEDD00]" />
              <span>24 Lessons</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400">
              <Award className="w-5 h-5 text-[#DA020E]" />
              <span>8 Projects</span>
            </div>
          </div>

          <ProgressBar progress={progress} />
        </div>
      </header>

      {/* Modules Grid */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Course Modules</h2>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset Progress
          </button>
        </div>

        <div className="space-y-4">
          {courseModules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isAccessible={canAccessModule(progress, module.id)}
              isCompleted={progress.completedModules.includes(module.id)}
              progressPercent={getModuleProgress(module.id)}
            />
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-[#2d2d44] text-center text-gray-600">
          <p className="mb-2">AIን አብረን እንማር — Let&apos;s Learn AI Together</p>
          <p className="text-sm">Built for the Ethiopian community 🇪🇹</p>
        </footer>
      </main>
    </div>
  )
}
