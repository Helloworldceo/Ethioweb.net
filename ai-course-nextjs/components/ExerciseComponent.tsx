"use client"

import { useState } from "react"
import { Exercise } from "@/types/course"
import { CheckCircle, XCircle, AlertCircle, ChevronDown, ChevronUp } from "lucide-react"

interface ExerciseComponentProps {
  exercise: Exercise
  onSubmit: (exerciseId: string, correct: boolean, points: number) => void
  isCompleted: boolean
  attempts: number
}

export default function ExerciseComponent({
  exercise,
  onSubmit,
  isCompleted,
  attempts,
}: ExerciseComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    exercise.type === "checkbox" ? [] : ""
  )
  const [submitted, setSubmitted] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [shake, setShake] = useState(false)

  const handleSingleSelect = (option: string) => {
    if (submitted && isCorrect) return
    setSelectedAnswer(option)
    setSubmitted(false)
  }

  const handleCheckboxSelect = (option: string) => {
    if (submitted && isCorrect) return
    setSelectedAnswer((prev) => {
      const current = Array.isArray(prev) ? prev : []
      if (current.includes(option)) {
        return current.filter((o) => o !== option)
      }
      return [...current, option]
    })
    setSubmitted(false)
  }

  const handleSubmit = () => {
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) {
      setShake(true)
      setTimeout(() => setShake(false), 300)
      return
    }

    let correct = false

    if (exercise.type === "multiple-choice") {
      correct = selectedAnswer === exercise.correctAnswer
    } else if (exercise.type === "checkbox") {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : []
      const correctAnswers = Array.isArray(exercise.correctAnswer)
        ? exercise.correctAnswer
        : [exercise.correctAnswer]
      correct =
        selected.length === correctAnswers.length &&
        selected.every((s) => correctAnswers.includes(s))
    }

    setIsCorrect(correct)
    setSubmitted(true)
    setShowExplanation(true)
    onSubmit(exercise.id, correct, exercise.points)

    if (!correct) {
      setShake(true)
      setTimeout(() => setShake(false), 300)
    }
  }

  const handleRetry = () => {
    setSelectedAnswer(exercise.type === "checkbox" ? [] : "")
    setSubmitted(false)
    setIsCorrect(false)
    setShowExplanation(false)
  }

  const isDisabled = submitted && isCorrect

  return (
    <div
      className={`bg-[#1e1e2e] rounded-xl p-6 mb-6 border ${
        isCompleted
          ? "border-green-500/50"
          : submitted && isCorrect
          ? "border-green-500/50"
          : submitted && !isCorrect
          ? "border-red-500/50"
          : "border-[#2d2d44]"
      } ${shake ? "animate-shake" : ""} transition-all duration-300`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#FEDD00] bg-[#FEDD00]/10 px-2 py-1 rounded">
            Exercise
          </span>
          <span className="text-xs text-gray-400">{exercise.points} points</span>
          {attempts > 0 && (
            <span className="text-xs text-gray-500">
              {attempts} attempt{attempts !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        {isCompleted && (
          <CheckCircle className="w-5 h-5 text-green-500" />
        )}
      </div>

      {/* Question */}
      <h3 className="text-lg font-semibold text-white mb-4">{exercise.question}</h3>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {exercise.options?.map((option, index) => {
          const isSelected =
            exercise.type === "checkbox"
              ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
              : selectedAnswer === option

          let optionStyle = "border-[#2d2d44] hover:border-[#3b3b5c] hover:bg-[#252538]"

          if (submitted) {
            if (exercise.type === "multiple-choice") {
              if (option === exercise.correctAnswer) {
                optionStyle = "border-green-500 bg-green-500/10"
              } else if (isSelected && option !== exercise.correctAnswer) {
                optionStyle = "border-red-500 bg-red-500/10"
              } else {
                optionStyle = "border-[#2d2d44] opacity-50"
              }
            } else if (exercise.type === "checkbox") {
              const correctAnswers = Array.isArray(exercise.correctAnswer)
                ? exercise.correctAnswer
                : [exercise.correctAnswer]
              if (correctAnswers.includes(option)) {
                optionStyle = "border-green-500 bg-green-500/10"
              } else if (isSelected && !correctAnswers.includes(option)) {
                optionStyle = "border-red-500 bg-red-500/10"
              } else {
                optionStyle = "border-[#2d2d44] opacity-50"
              }
            }
          } else if (isSelected) {
            optionStyle = "border-[#FEDD00] bg-[#FEDD00]/10"
          }

          return (
            <button
              key={index}
              onClick={() =>
                exercise.type === "checkbox"
                  ? handleCheckboxSelect(option)
                  : handleSingleSelect(option)
              }
              disabled={isDisabled}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${optionStyle} ${
                isDisabled ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center border-2 ${
                    exercise.type === "checkbox"
                      ? "rounded-sm"
                      : "rounded-full"
                  } ${
                    isSelected
                      ? submitted
                        ? option === exercise.correctAnswer ||
                          (Array.isArray(exercise.correctAnswer) &&
                            exercise.correctAnswer.includes(option))
                          ? "border-green-500 bg-green-500"
                          : "border-red-500 bg-red-500"
                        : "border-[#FEDD00] bg-[#FEDD00]"
                      : "border-gray-500"
                  }`}
                >
                  {isSelected && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-gray-200">{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Submit / Retry Buttons */}
      {!isCompleted && (
        <div className="flex gap-3">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-[#009639] hover:bg-[#007a2e] text-white font-semibold rounded-lg transition-colors"
            >
              Submit Answer
            </button>
          ) : !isCorrect ? (
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-[#0645B1] hover:bg-[#053a94] text-white font-semibold rounded-lg transition-colors"
            >
              Try Again
            </button>
          ) : (
            <div className="flex items-center gap-2 px-6 py-3 bg-green-500/20 text-green-400 rounded-lg">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">Correct! +{exercise.points} points</span>
            </div>
          )}
        </div>
      )}

      {/* Result Message */}
      {submitted && (
        <div
          className={`mt-4 p-4 rounded-lg ${
            isCorrect
              ? "bg-green-500/10 border border-green-500/30"
              : "bg-red-500/10 border border-red-500/30"
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <XCircle className="w-5 h-5 text-red-500" />
            )}
            <span
              className={`font-semibold ${
                isCorrect ? "text-green-400" : "text-red-400"
              }`}
            >
              {isCorrect ? "Correct!" : "Not quite right"}
            </span>
          </div>
        </div>
      )}

      {/* Explanation */}
      {(showExplanation || isCompleted) && (
        <div className="mt-4 animate-fade-in">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-2 text-[#FEDD00] hover:text-[#FEDD00]/80 transition-colors mb-2"
          >
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Explanation</span>
            {showExplanation ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
          {showExplanation && (
            <div className="p-4 bg-[#252538] rounded-lg text-gray-300 text-sm leading-relaxed">
              {exercise.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
