import { courseModules } from "@/lib/courses/ai-course";
import { htmlCourseLessons } from "@/lib/courses/html-course";

const htmlModules = htmlCourseLessons.filter((lesson) => lesson.kind === "module");

export const educationCourses = [
  {
    slug: "html",
    eyebrow: "Web Foundations",
    title: "HTML Fundamentals",
    description: "A full beginner path covering structure, semantic markup, forms, metadata, and a publish-ready capstone.",
    href: "/education/html",
    startHref: "/education/html/module-01",
    accent: "from-[rgba(0,95,95,0.16)] via-[rgba(223,108,34,0.08)] to-transparent",
    stats: [`${htmlModules.length} modules`, "Original lesson files preserved", "Capstone and resources included"],
    spotlight: htmlModules.slice(0, 3).map((lesson) => ({
      label: lesson.label,
      title: lesson.title,
      description: lesson.summary,
      href: `/education/html/${lesson.slug}`,
    })),
  },
  {
    slug: "ai",
    eyebrow: "Applied AI",
    title: "AI for Beginners",
    description: "An 8-module course designed for the Ethiopian community, with guided lessons, exercises, module projects, and bilingual context.",
    href: "/education/ai",
    startHref: "/education/ai/module/module-1",
    accent: "from-[rgba(0,95,95,0.1)] via-[rgba(254,221,0,0.18)] to-[rgba(218,2,14,0.08)]",
    stats: [`${courseModules.length} modules`, `${courseModules.reduce((total, module) => total + module.lessons.length, 0)} lessons`, "Exercises and project flow included"],
    spotlight: courseModules.slice(0, 3).map((module) => ({
      label: `Module ${module.number}`,
      title: module.title,
      description: module.description,
      href: `/education/ai/module/${module.id}`,
    })),
  },
] as const;
