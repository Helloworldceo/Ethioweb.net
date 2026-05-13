import type { MetadataRoute } from "next";
import { blogPosts, demoProfiles } from "@/lib/site";

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

  return [...staticPages, ...blogPages, ...profilePages];
}
