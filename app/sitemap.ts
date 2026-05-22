import type { MetadataRoute } from "next";
import { blogPosts, demoProfiles } from "@/lib/site";
import { courseModules } from "@/lib/courses/ai-course";
import { htmlCourseLessons } from "@/lib/courses/html-course";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ethioweb.net";

  const staticPages = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/education",
    "/education/html",
    "/education/ai",
    "/html-course/index.html",
    "/contact",
    "/discover",
    "/privacy",
    "/terms",
    "/auth/login",
    "/auth/signup",
    "/dashboard",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.65,
  }));

  const profilePages = demoProfiles.map((profile) => ({
    url: `${base}/u/${profile.username}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const coursePages = htmlCourseLessons.map((lesson) => ({
    url: `${base}/education/html/${lesson.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.65,
  }));

  const aiPages = courseModules.flatMap((module) => {
    const modulePage = {
      url: `${base}/education/ai/module/${module.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.65,
    };

    const lessonPages = module.lessons.map((lesson) => ({
      url: `${base}/education/ai/lesson/${module.id}/${lesson.id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    return [modulePage, ...lessonPages];
  });

  return [...staticPages, ...blogPages, ...profilePages, ...coursePages, ...aiPages];
}
