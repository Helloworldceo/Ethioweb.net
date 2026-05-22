"use client"

import { UserProgress } from "@/types/course"
import { courseModules } from "@/lib/courseData"

interface ProgressBarProps {
  progress: UserProgress
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const totalLessons = courseModules.reduce((acc, m) => acc + m.lessons.length, 0)
  const completedLessons = progress.completedLessons.length
  const overallPercent = Math.round((completedLessons / totalLessons) * 100)

  const totalExercises = courseModules.reduce(
    (acc, m) => acc + m.lessons.reduce((lacc, l) => lacc + l.exercises.length, 0),
    0
  )
  const completedExercises = Object.values(progress.exerciseScores).filter(
    (s) => s.correct
  ).length

  return (
    <div className="bg-[#1e1e2e] rounded-xl border border-[#2d2d44] p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">Course Progress</span>
        <span className="text-sm font-bold text-[#FEDD00]">{overallPercent}%</span>
      </div>
      <div className="w-full h-2 bg-[#2d2d44] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#009639] via-[#FEDD00] to-[#DA020E] transition-all duration-500"
          style={{ width: `${overallPercent}%` }}
        />
      </div>
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
        <span>{completedLessons}/{totalLessons} lessons</span>
        <span>{completedExercises}/{totalExercises} exercises</span>
        <span>{progress.totalPoints} points</span>
      </div>
    </div>
  )
}
