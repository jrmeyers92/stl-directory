import BusinessCard from "@/components/BusinessCard";
import { Badge } from "@/components/ui/badge";
import {
  getCategoryFromSlug,
  isValidCategorySlug,
} from "@/data/businessCategory";
import { createClient } from "@/utils/supabase/create-client/server";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  
  if (!isValidCategorySlug(category)) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName = getCategoryFromSlug(category);
  const supabase = await createClient();
  
  // Get business count for this category
  const { data: businesses } = await supabase
    .from("stl_directory_businesses")
    .select("id")
    .eq("business_category_slug", category);

  const businessCount = businesses?.length || 0;
  
  return {
    title: `${categoryName} in St. Louis | Wedding Vendor Directory`,
    description: `Find the best ${categoryName?.toLowerCase()} in St. Louis, Missouri. Browse ${businessCount} verified wedding vendors with reviews, ratings, and contact information.`,
    keywords: [
      `St. Louis ${categoryName?.toLowerCase()}`,
      `Missouri ${categoryName?.toLowerCase()}`,
      `wedding ${categoryName?.toLowerCase()} St. Louis`,
      `St. Louis wedding vendors`,
      `${categoryName?.toLowerCase()} near me`,
    ],
    openGraph: {
      title: `${categoryName} in St. Louis | Wedding Vendor Directory`,
      description: `Find the best ${categoryName?.toLowerCase()} in St. Louis, Missouri. Browse ${businessCount} verified wedding vendors.`,
      type: "website",
      locale: "en_US",
      siteName: "St. Louis Wedding Vendors Directory",
    },
    twitter: {
      card: "summary_large_image",
      title: `${categoryName} in St. Louis | Wedding Vendor Directory`,
      description: `Find the best ${categoryName?.toLowerCase()} in St. Louis, Missouri. Browse ${businessCount} verified wedding vendors.`,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  // First check if the category slug is valid
  if (!isValidCategorySlug(category)) {
    notFound();
  }

  const supabase = await createClient();

  // Query businesses by category
  const { data: businesses, error } = await supabase
    .from("stl_directory_businesses")
    .select("*")
    .eq("business_category_slug", category);

  if (error) {
    console.error("Error fetching businesses:", error);
    throw new Error("Failed to fetch businesses");
  }

  const categoryName = getCategoryFromSlug(category);

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} in St. Louis`,
    description: `Directory of ${categoryName?.toLowerCase()} in St. Louis, Missouri for weddings and events`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/categories/${category}`,
    isPartOf: {
      "@type": "WebSite",
      name: "St. Louis Wedding Vendors Directory",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    },
    mainEntity: {
      "@type": "ItemList",
      name: `${categoryName} in St. Louis`,
      numberOfItems: businesses.length,
      itemListElement: businesses.map((business, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "LocalBusiness",
          name: business.business_name,
          description: business.business_description || `${business.business_category} in St. Louis`,
          url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/business/${business.id}`,
          address: business.business_address && business.business_city ? {
            "@type": "PostalAddress",
            streetAddress: business.business_address,
            addressLocality: business.business_city,
            addressRegion: business.business_state || "MO",
            postalCode: business.business_zip,
            addressCountry: "US",
          } : undefined,
          telephone: business.business_phone,
          email: business.business_email,
          sameAs: business.business_website,
          aggregateRating: business.average_rating ? {
            "@type": "AggregateRating",
            ratingValue: business.average_rating,
            reviewCount: business.review_count || 0,
            bestRating: 5,
            worstRating: 1,
          } : undefined,
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Categories",
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/categories`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: categoryName,
          item: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/categories/${category}`,
        },
      ],
    },
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
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
          <h1 className="text-3xl font-bold tracking-tight">{categoryName}</h1>
          <p className="text-muted-foreground mt-1">
            Found {businesses.length} business
            {businesses.length !== 1 ? "es" : ""}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {categoryName}
        </Badge>
      </div>

      {businesses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No businesses found
          </h3>
          <p className="text-gray-500 mb-4">
            There are currently no businesses listed in the {categoryName}{" "}
            category.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Browse other categories
          </Link>
        </div>
      )}
      </div>
    </>
  );
}
