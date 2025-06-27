import BusinessCard from "@/components/BusinessCard";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/utils/supabase/create-client/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const supabase = await createClient();

  // Query businesses by category
  const { data: businesses, error } = await supabase
    .from("stl_directory_businesses")
    .select("*")
    .eq("business_category", category);

  if (error) {
    console.error("Error fetching businesses:", error);
    throw new Error("Failed to fetch businesses");
  }

  if (businesses.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <Link
            href="/categories"
            className="flex items-center text-muted-foreground hover:text-primary mb-2 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all categories
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{category}</h1>
          <p className="text-muted-foreground mt-1">
            Found {businesses.length} business
            {businesses.length !== 1 ? "es" : ""}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {category}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  );
}
