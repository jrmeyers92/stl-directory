import { getAllCategories } from "@/data/businessCategory";
import { createClient } from "@/utils/supabase/create-client/server";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const supabase = await createClient();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/FAQ`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Category pages
  const categories = getAllCategories();
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Business pages
  const { data: businesses } = await supabase
    .from("stl_directory_businesses")
    .select("id, updated_at")
    .order("updated_at", { ascending: false });

  const businessPages =
    businesses?.map((business) => ({
      url: `${baseUrl}/business/${business.id}`,
      lastModified: new Date(business.updated_at || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })) || [];

  return [...staticPages, ...categoryPages, ...businessPages];
}
