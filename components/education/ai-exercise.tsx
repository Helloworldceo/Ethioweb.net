"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import type { Exercise } from "@/types/course";

type AiExerciseProps = {
  exercise: Exercise;
  onSubmit: (exerciseId: string, correct: boolean, points: number) => void;
  isCompleted: boolean;
  attempts: number;
};

export function AiExercise({ exercise, onSubmit, isCompleted, attempts }: AiExerciseProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(exercise.type === "checkbox" ? [] : "");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  function handleSingleSelect(option: string) {
    if (submitted && isCorrect) return;
    setSelectedAnswer(option);
    setSubmitted(false);
  }

  function handleCheckboxSelect(option: string) {
    if (submitted && isCorrect) return;
    setSelectedAnswer((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      if (current.includes(option)) {
        return current.filter((item) => item !== option);
      }
      return [...current, option];
    });
    setSubmitted(false);
  }

  function handleSubmit() {
    if (!selectedAnswer || (Array.isArray(selectedAnswer) && selectedAnswer.length === 0)) {
      return;
    }

    let correct = false;
    if (exercise.type === "multiple-choice") {
      correct = selectedAnswer === exercise.correctAnswer;
    } else if (exercise.type === "checkbox") {
      const selected = Array.isArray(selectedAnswer) ? selectedAnswer : [];
      const answers = Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer : [exercise.correctAnswer];
      correct = selected.length === answers.length && selected.every((item) => answers.includes(item));
    }

    setIsCorrect(correct);
    setSubmitted(true);
    setShowExplanation(true);
    onSubmit(exercise.id, correct, exercise.points);
  }

  function handleRetry() {
    setSelectedAnswer(exercise.type === "checkbox" ? [] : "");
    setSubmitted(false);
    setIsCorrect(false);
    setShowExplanation(false);
  }

  return (
    <article
      className={`card p-5 ${
        isCompleted || (submitted && isCorrect)
          ? "border-emerald-300"
          : submitted && !isCorrect
            ? "border-red-300"
            : ""
      }`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="chip">Exercise</span>
        <span className="text-xs font-semibold text-[var(--muted)]">{exercise.points} points</span>
        <span className="text-xs text-[var(--muted)]">{attempts} attempt{attempts === 1 ? "" : "s"}</span>
        {isCompleted && <CheckCircle className="ml-auto h-5 w-5 text-emerald-600" />}
      </div>

      <h3 className="heading-display mt-4 text-xl font-bold">{exercise.question}</h3>

      <div className="mt-5 space-y-3">
        {exercise.options?.map((option) => {
          const selected = Array.isArray(selectedAnswer)
            ? selectedAnswer.includes(option)
            : selectedAnswer === option;

          let classes = "border-[var(--line)] bg-[var(--panel)]";
          if (!submitted && selected) classes = "border-[var(--brand)] bg-[var(--paper)]";
          if (submitted) {
            const answers = Array.isArray(exercise.correctAnswer) ? exercise.correctAnswer : [exercise.correctAnswer];
            if (answers.includes(option)) {
              classes = "border-emerald-300 bg-emerald-50";
            } else if (selected) {
              classes = "border-red-300 bg-red-50";
            } else {
              classes = "border-[var(--line)] bg-[var(--panel)] opacity-70";
            }
          }

          return (
            <button
              key={option}
              type="button"
              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${classes}`}
              disabled={submitted && isCorrect}
              onClick={() => (exercise.type === "checkbox" ? handleCheckboxSelect(option) : handleSingleSelect(option))}
            >
              <span
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border text-xs font-bold ${
                  exercise.type === "checkbox" ? "rounded-md" : "rounded-full"
                } ${selected ? "border-[var(--brand)] text-[var(--brand)]" : "border-[var(--line)] text-[var(--muted)]"}`}
              >
                {selected ? "•" : ""}
              </span>
              <span className="text-sm leading-7">{option}</span>
            </button>
          );
        })}
      </div>

      {!isCompleted && (
        <div className="mt-5 flex flex-wrap gap-3">
          {!submitted ? (
            <button type="button" className="btn-primary text-sm" onClick={handleSubmit}>
              Submit answer
            </button>
          ) : isCorrect ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              <CheckCircle className="h-4 w-4" />
              Correct +{exercise.points}
            </div>
          ) : (
            <button type="button" className="btn-secondary text-sm" onClick={handleRetry}>
              Try again
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${isCorrect ? "border-emerald-300 bg-emerald-50 text-emerald-800" : "border-red-300 bg-red-50 text-red-700"}`}>
          <div className="flex items-center gap-2 font-semibold">
            {isCorrect ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            {isCorrect ? "Correct" : "Not quite right"}
          </div>
        </div>
      )}

      {(showExplanation || isCompleted) && (
        <div className="mt-5 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-4">
          <button
            type="button"
            className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)]"
            onClick={() => setShowExplanation((value) => !value)}
          >
            <AlertCircle className="h-4 w-4" />
            Explanation
            {showExplanation ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {showExplanation && <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{exercise.explanation}</p>}
        </div>
      )}
    </article>
  );
}
