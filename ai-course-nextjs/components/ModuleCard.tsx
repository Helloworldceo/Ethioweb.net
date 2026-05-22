"use client"

import { Module } from "@/types/course"
import { Lock, CheckCircle, Circle, ChevronRight } from "lucide-react"
import Link from "next/link"

interface ModuleCardProps {
  module: Module
  isAccessible: boolean
  isCompleted: boolean
  progressPercent: number
}

export default function ModuleCard({
  module,
  isAccessible,
  isCompleted,
  progressPercent,
}: ModuleCardProps) {
  const moduleColors = [
    "from-blue-600/20 to-blue-900/20 border-blue-500/30",
    "from-green-600/20 to-green-900/20 border-green-500/30",
    "from-yellow-600/20 to-yellow-900/20 border-yellow-500/30",
    "from-red-600/20 to-red-900/20 border-red-500/30",
    "from-purple-600/20 to-purple-900/20 border-purple-500/30",
    "from-pink-600/20 to-pink-900/20 border-pink-500/30",
    "from-cyan-600/20 to-cyan-900/20 border-cyan-500/30",
    "from-emerald-600/20 to-emerald-900/20 border-emerald-500/30",
  ]

  const colorIndex = (module.number - 1) % moduleColors.length
  const gradientClass = moduleColors[colorIndex]

  if (!isAccessible) {
    return (
      <div className="relative bg-[#1e1e2e]/50 rounded-xl border border-[#2d2d44]/50 p-6 opacity-60">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2d2d44] flex items-center justify-center">
              <Lock className="w-5 h-5 text-gray-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-500">{module.title}</h3>
              <p className="text-sm text-gray-600">{module.subtitle}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-gray-600 bg-gray-800/50 px-3 py-1 rounded-full">
            Module {module.number}
          </span>
        </div>
        <p className="text-sm text-gray-600">Complete previous module to unlock</p>
      </div>
    )
  }

  return (
    <Link href={`/module/${module.id}`}>
      <div
        className={`relative bg-gradient-to-br ${gradientClass} rounded-xl border p-6 hover:scale-[1.02] transition-all duration-300 cursor-pointer group`}
      >
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#2d2d44]/50 rounded-t-xl overflow-hidden">
          <div
            className="h-full bg-[#009639] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isCompleted
                  ? "bg-[#009639]/20"
                  : "bg-[#FEDD00]/10"
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-6 h-6 text-[#009639]" />
              ) : (
                <Circle className="w-6 h-6 text-[#FEDD00]" />
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-[#FEDD00] transition-colors">
                {module.title}
              </h3>
              <p className="text-sm text-gray-400">{module.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 bg-[#2d2d44]/50 px-3 py-1 rounded-full">
              Module {module.number}
            </span>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#FEDD00] group-hover:translate-x-1 transition-all" />
          </div>
        </div>

        <p className="text-sm text-gray-300 mb-4">{module.description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{module.lessons.length} lessons</span>
            <span>•</span>
            <span>1 project</span>
          </div>
          {progressPercent > 0 && progressPercent < 100 && (
            <span className="text-xs font-semibold text-[#FEDD00]">
              {Math.round(progressPercent)}% complete
            </span>
          )}
          {isCompleted && (
            <span className="text-xs font-semibold text-[#009639]">Completed!</span>
          )}
        </div>
      </div>
    </Link>
  )
}
