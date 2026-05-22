export interface Exercise {
  id: string
  type: 'multiple-choice' | 'checkbox' | 'text'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

export interface Lesson {
  id: string
  title: string
  content: string
  exercises: Exercise[]
  completed: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  steps: string[]
  deliverables: string[]
  completed: boolean
}

export interface Module {
  id: string
  number: number
  title: string
  subtitle: string
  description: string
  lessons: Lesson[]
  project: Project
  locked: boolean
  completed: boolean
}

export interface UserProgress {
  currentModuleId: string
  currentLessonId: string
  completedLessons: string[]
  completedModules: string[]
  exerciseScores: Record<string, { correct: boolean; attempts: number }>
  projectSubmissions: Record<string, { completed: boolean; url?: string; notes?: string }>
  totalPoints: number
}
