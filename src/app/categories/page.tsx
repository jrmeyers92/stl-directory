// app/categories/page.tsx
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategorySlug } from "@/data/businessCategory";
import { createClient } from "@/utils/supabase/create-client/server";
import { ArrowRight, Tags } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wedding Vendor Categories | St. Louis Wedding Directory",
  description: "Browse wedding vendors by category in St. Louis, Missouri. Find photographers, venues, caterers, florists, and more for your perfect wedding day.",
  keywords: [
    "St. Louis wedding vendors",
    "wedding categories",
    "Missouri wedding services", 
    "wedding vendor directory",
    "St. Louis wedding planning",
  ],
  openGraph: {
    title: "Wedding Vendor Categories | St. Louis Wedding Directory",
    description: "Browse wedding vendors by category in St. Louis, Missouri. Find the perfect vendors for your wedding day.",
    type: "website",
    locale: "en_US",
    siteName: "St. Louis Wedding Vendors Directory",
  },
  twitter: {
    card: "summary",
    title: "Wedding Vendor Categories | St. Louis Wedding Directory", 
    description: "Browse wedding vendors by category in St. Louis, Missouri.",
  },
};

export default async function CategoriesPage() {
  const supabase = await createClient();

  // Query unique business categories and count businesses per category
  const { data: categoriesData, error } = await supabase
    .from("stl_directory_businesses")
    .select("business_category")
    .not("business_category", "is", null);

  if (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }

  // Extract unique categories and count occurrences
  const categoryMap = categoriesData.reduce((acc, item) => {
    const category = item.business_category;
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(categoryMap).sort();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Tags className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          Business Categories
        </h1>
      </div>

      <p className="text-muted-foreground mb-8">
        Browse {sortedCategories.length} business categories in our directory.
        Click on a category to see all businesses.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedCategories.map((category) => (
          <Link
            key={category}
            href={`/categories/${getCategorySlug(category)}`}
          >
            <Card className="h-full hover:bg-accent/10 transition-colors cursor-pointer overflow-hidden border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{category}</CardTitle>
                  <CardDescription>
                    {categoryMap[category]} business
                    {categoryMap[category] !== 1 ? "es" : ""}
                  </CardDescription>
                </div>
                <Badge variant="outline" className="ml-2">
                  {categoryMap[category]}
                </Badge>
              </CardHeader>
              <div className="px-6 pb-4 pt-0 flex justify-end">
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
