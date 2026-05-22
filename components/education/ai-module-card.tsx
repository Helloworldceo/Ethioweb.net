"use client";

import Link from "next/link";
import { CheckCircle, ChevronRight, Circle, Lock } from "lucide-react";
import type { Module } from "@/types/course";

type AiModuleCardProps = {
  module: Module;
  href: string;
  isAccessible: boolean;
  isCompleted: boolean;
  progressPercent: number;
};

const moduleAccents = [
  "from-emerald-500/15 via-emerald-400/8 to-transparent border-emerald-500/30",
  "from-amber-500/18 via-amber-400/8 to-transparent border-amber-500/30",
  "from-red-500/16 via-red-400/8 to-transparent border-red-500/30",
  "from-sky-500/16 via-sky-400/8 to-transparent border-sky-500/30",
  "from-lime-500/15 via-lime-400/8 to-transparent border-lime-500/30",
  "from-orange-500/16 via-orange-400/8 to-transparent border-orange-500/30",
  "from-teal-500/16 via-teal-400/8 to-transparent border-teal-500/30",
  "from-fuchsia-500/16 via-fuchsia-400/8 to-transparent border-fuchsia-500/30",
];

export function AiModuleCard({ module, href, isAccessible, isCompleted, progressPercent }: AiModuleCardProps) {
  const accent = moduleAccents[(module.number - 1) % moduleAccents.length];

  if (!isAccessible) {
    return (
      <div className="card relative overflow-hidden p-5 opacity-75">
        <div className="absolute inset-x-0 top-0 h-1 bg-[var(--line)]" />
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--muted)]">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">Module {module.number}</p>
              <h3 className="heading-display mt-2 text-xl font-bold text-[var(--muted)]">{module.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{module.subtitle}</p>
            </div>
          </div>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">Locked</span>
        </div>
        <p className="mt-5 text-sm leading-7 text-[var(--muted)]">Complete the previous module to unlock this section.</p>
      </div>
    );
  }

  return (
    <Link href={href} className="card group relative block overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1">
      <div className={`absolute inset-0 bg-gradient-to-br ${accent}`} />
      <div className="absolute inset-x-0 top-0 h-1 overflow-hidden bg-[var(--line)]">
        <div className="h-full bg-[var(--brand)] transition-all duration-500" style={{ width: `${progressPercent}%` }} />
      </div>
      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={`rounded-2xl border p-3 ${isCompleted ? "border-emerald-300 bg-emerald-50 text-emerald-700" : "border-[var(--line)] bg-[var(--paper)] text-[var(--brand)]"}`}>
              {isCompleted ? <CheckCircle className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand)]">Module {module.number}</p>
              <h3 className="heading-display mt-2 text-xl font-bold">{module.title}</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{module.subtitle}</p>
            </div>
          </div>
          <ChevronRight className="mt-1 h-5 w-5 text-[var(--muted)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--brand)]" />
        </div>

        <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{module.description}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs font-semibold text-[var(--muted)]">
          <div className="flex items-center gap-2">
            <span>{module.lessons.length} lessons</span>
            <span>•</span>
            <span>1 project</span>
          </div>
          {isCompleted ? <span className="text-emerald-700">Completed</span> : <span>{Math.round(progressPercent)}% done</span>}
        </div>
      </div>
    </Link>
  );
}
