"use client";

import { useSyncExternalStore } from "react";
import { getInitialProgress, loadProgress } from "@/lib/courses/ai-course";
import type { UserProgress } from "@/types/course";

const COURSE_PROGRESS_EVENT = "ai-course-progress-change";
const serverSnapshot = getInitialProgress();

let cachedSnapshot = serverSnapshot;
let cachedSerializedSnapshot = JSON.stringify(serverSnapshot);

function subscribe(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleChange = () => callback();
  window.addEventListener("storage", handleChange);
  window.addEventListener(COURSE_PROGRESS_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(COURSE_PROGRESS_EVENT, handleChange);
  };
}

function getSnapshot(): UserProgress {
  const nextSnapshot = loadProgress();
  const nextSerializedSnapshot = JSON.stringify(nextSnapshot);

  if (nextSerializedSnapshot !== cachedSerializedSnapshot) {
    cachedSnapshot = nextSnapshot;
    cachedSerializedSnapshot = nextSerializedSnapshot;
  }

  return cachedSnapshot;
}

function getServerSnapshot(): UserProgress {
  return serverSnapshot;
}

export function emitAiCourseProgressChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COURSE_PROGRESS_EVENT));
}

export function useAiCourseProgress() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
