"use client"

import { UserProgress } from "@/types/course"
import { emitAiCourseProgressChange } from "@/lib/courses/use-ai-course-progress"

const STORAGE_KEY = "ai-course-progress-v1"

export function getInitialProgress(): UserProgress {
  return {
    currentModuleId: "module-1",
    currentLessonId: "m1-l1",
    completedLessons: [],
    completedModules: [],
    exerciseScores: {},
    projectSubmissions: {},
    totalPoints: 0,
  }
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") return getInitialProgress()

  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      return JSON.parse(saved)
    } catch {
      return getInitialProgress()
    }
  }
  return getInitialProgress()
}

export function saveProgress(progress: UserProgress): void {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  emitAiCourseProgressChange()
}

export function isLessonCompleted(progress: UserProgress, lessonId: string): boolean {
  return progress.completedLessons.includes(lessonId)
}

export function isModuleCompleted(progress: UserProgress, moduleId: string): boolean {
  return progress.completedModules.includes(moduleId)
}

export function canAccessLesson(progress: UserProgress, moduleId: string, lessonId: string): boolean {
  // First lesson of first module is always accessible
  if (moduleId === "module-1" && lessonId === "m1-l1") return true

  // If already completed, can access
  if (progress.completedLessons.includes(lessonId)) return true

  // Check if previous lesson is completed
  const allLessons: { moduleId: string; lessonId: string }[] = []

  // Build ordered list of all lessons
  const moduleOrder = ["module-1", "module-2", "module-3", "module-4", "module-5", "module-6", "module-7", "module-8"]
  const lessonMap: Record<string, string[]> = {
    "module-1": ["m1-l1", "m1-l2", "m1-l3"],
    "module-2": ["m2-l1", "m2-l2", "m2-l3"],
    "module-3": ["m3-l1", "m3-l2", "m3-l3"],
    "module-4": ["m4-l1", "m4-l2", "m4-l3"],
    "module-5": ["m5-l1", "m5-l2"],
    "module-6": ["m6-l1", "m6-l2"],
    "module-7": ["m7-l1", "m7-l2"],
    "module-8": ["m8-l1", "m8-l2"],
  }

  for (const modId of moduleOrder) {
    for (const lesId of lessonMap[modId] || []) {
      allLessons.push({ moduleId: modId, lessonId: lesId })
    }
  }

  const currentIndex = allLessons.findIndex(
    (l) => l.moduleId === moduleId && l.lessonId === lessonId
  )

  if (currentIndex <= 0) return true

  const previous = allLessons[currentIndex - 1]
  return progress.completedLessons.includes(previous.lessonId)
}

export function canAccessModule(progress: UserProgress, moduleId: string): boolean {
  const moduleOrder = ["module-1", "module-2", "module-3", "module-4", "module-5", "module-6", "module-7", "module-8"]
  const index = moduleOrder.indexOf(moduleId)

  if (index === 0) return true

  const previousModuleId = moduleOrder[index - 1]
  return progress.completedModules.includes(previousModuleId)
}

export function completeLesson(progress: UserProgress, moduleId: string, lessonId: string): UserProgress {
  if (!progress.completedLessons.includes(lessonId)) {
    progress.completedLessons.push(lessonId)
  }

  // Check if all lessons in module are completed
  const lessonMap: Record<string, string[]> = {
    "module-1": ["m1-l1", "m1-l2", "m1-l3"],
    "module-2": ["m2-l1", "m2-l2", "m2-l3"],
    "module-3": ["m3-l1", "m3-l2", "m3-l3"],
    "module-4": ["m4-l1", "m4-l2", "m4-l3"],
    "module-5": ["m5-l1", "m5-l2"],
    "module-6": ["m6-l1", "m6-l2"],
    "module-7": ["m7-l1", "m7-l2"],
    "module-8": ["m8-l1", "m8-l2"],
  }

  const moduleLessons = lessonMap[moduleId] || []
  const allCompleted = moduleLessons.every((id) => progress.completedLessons.includes(id))

  if (allCompleted && !progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId)
  }

  saveProgress(progress)
  return progress
}

export function submitExercise(
  progress: UserProgress,
  exerciseId: string,
  correct: boolean,
  points: number
): UserProgress {
  const existing = progress.exerciseScores[exerciseId]

  if (!existing) {
    progress.exerciseScores[exerciseId] = { correct, attempts: 1 }
    if (correct) {
      progress.totalPoints += points
    }
  } else {
    progress.exerciseScores[exerciseId].attempts += 1
    if (!existing.correct && correct) {
      progress.exerciseScores[exerciseId].correct = true
      progress.totalPoints += points
    }
  }

  saveProgress(progress)
  return progress
}

export function getExerciseStatus(progress: UserProgress, exerciseId: string) {
  return progress.exerciseScores[exerciseId] || { correct: false, attempts: 0 }
}

export function submitProject(
  progress: UserProgress,
  projectId: string,
  url?: string,
  notes?: string
): UserProgress {
  progress.projectSubmissions[projectId] = { completed: true, url, notes }

  // Also mark module as completed if project is submitted
  const moduleMap: Record<string, string> = {
    "m1-project": "module-1",
    "m2-project": "module-2",
    "m3-project": "module-3",
    "m4-project": "module-4",
    "m5-project": "module-5",
    "m6-project": "module-6",
    "m7-project": "module-7",
    "m8-project": "module-8",
  }

  const moduleId = moduleMap[projectId]
  if (moduleId && !progress.completedModules.includes(moduleId)) {
    progress.completedModules.push(moduleId)
  }

  saveProgress(progress)
  return progress
}

export function resetProgress(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(STORAGE_KEY)
  emitAiCourseProgressChange()
}
