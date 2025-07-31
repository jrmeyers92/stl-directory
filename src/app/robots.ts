import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/sign-in",
        "/sign-up", 
        "/onboarding",
        "/favorites",
        "/business/register",
        "/leave-review",
        "/api",
        "/_next",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}