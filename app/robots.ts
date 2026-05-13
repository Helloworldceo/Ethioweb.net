import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/api", "/api/*", "/auth/callback"],
    },
    sitemap: "https://ethioweb.net/sitemap.xml",
  };
}
