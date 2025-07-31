import BusinessGallery from "@/components/business/BusinessGallery";
import BusinessHero from "@/components/business/BusinessHero";
import BusinessInfo from "@/components/business/BusinessInfo";
import BusinessSidebar from "@/components/business/BusinessSidebar";
import ReviewsSection from "@/components/business/ReviewsSection";
import ViewCounter from "@/components/ViewCounter";
import Review from "@/schemas/reviewSchema";
import { createClient } from "@/utils/supabase/create-client/server";
import { currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch business data for metadata
  const { data: business } = await supabase
    .from("stl_directory_businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (!business) {
    return {
      title: "Business Not Found | St. Louis Wedding Vendors",
    };
  }

  const title = `${business.business_name} - ${business.business_category} in St. Louis`;
  const description = business.business_description 
    ? `${business.business_description.slice(0, 160)}...`
    : `Find ${business.business_name}, a trusted ${business.business_category.toLowerCase()} in St. Louis, Missouri. Read reviews, view photos, and get contact information.`;

  return {
    title,
    description,
    keywords: [
      business.business_name,
      `${business.business_category} St. Louis`,
      `St. Louis ${business.business_category.toLowerCase()}`,
      `wedding ${business.business_category.toLowerCase()}`,
      `${business.business_city || 'St. Louis'} wedding vendors`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_US",
      siteName: "St. Louis Wedding Vendors Directory",
      images: business.banner_image_url ? [{
        url: business.banner_image_url,
        width: 1200,
        height: 630,
        alt: `${business.business_name} - ${business.business_category}`,
      }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: business.banner_image_url ? [business.banner_image_url] : undefined,
    },
  };
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await currentUser();

  // Fetch business by ID
  const { data: business, error } = await supabase
    .from("stl_directory_businesses")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !business) {
    notFound();
  }

  // Fetch approved reviews for this business with proper ordering
  const { data: reviews, error: reviewsError } = await supabase
    .from("stl_directory_reviews")
    .select("*")
    .eq("business_id", id)
    .order("is_featured", { ascending: false })
    .order("created_at", { ascending: false });

  if (reviewsError) {
    console.error("Error fetching reviews:", reviewsError);
  }

  // Type the reviews data
  const typedReviews: Review[] = reviews || [];

  // Check if current user has already reviewed this business
  let userHasReviewed = false;
  if (user) {
    const { data: userReview } = await supabase
      .from("stl_directory_reviews")
      .select("id")
      .eq("business_id", id)
      .eq("clerk_id", user.id)
      .single();

    userHasReviewed = !!userReview;
  }

  let userHasSaved = false;
  if (user) {
    const { data: isSaved } = await supabase
      .from("stl_directory_favorites")
      .select("id")
      .eq("business_id", id)
      .eq("clerk_id", user.id)
      .single();

    userHasSaved = !!isSaved;
  }

  // JSON-LD structured data for the business
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.business_name,
    description: business.business_description || `${business.business_category} in St. Louis`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/business/${business.id}`,
    image: business.banner_image_url || business.logo_url,
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
    priceRange: "$$$", // You might want to add this to your business schema
    aggregateRating: business.average_rating ? {
      "@type": "AggregateRating",
      ratingValue: business.average_rating,
      reviewCount: business.review_count || 0,
      bestRating: 5,
      worstRating: 1,
    } : undefined,
    review: typedReviews.slice(0, 5).map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        "@type": "Person",
        name: review.reviewer_first_name && review.reviewer_last_name
          ? `${review.reviewer_first_name} ${review.reviewer_last_name}`
          : review.reviewer_username || review.reviewer_name || "Anonymous",
      },
      reviewBody: review.review_content,
      datePublished: review.created_at,
      headline: review.review_title,
    })),
    openingHours: [], // Add business hours if available
    geo: business.business_city === "St. Louis" ? {
      "@type": "GeoCoordinates",
      latitude: 38.6270,
      longitude: -90.1994,
    } : undefined,
    areaServed: {
      "@type": "City",
      name: "St. Louis",
      addressRegion: "MO",
      addressCountry: "US",
    },
    serviceType: business.business_category,
    additionalType: "https://schema.org/WeddingService",
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
      {/* View Counter - runs on client side */}
      <ViewCounter businessId={business.id} />

      {/* Hero Section */}
      <BusinessHero business={business} />

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Info Card */}
            <BusinessInfo business={business} />

            {/* Gallery Section */}
            <BusinessGallery business={business} />

            {/* Reviews Section */}
            <ReviewsSection
              business={business}
              reviews={typedReviews}
              userHasReviewed={userHasReviewed}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <BusinessSidebar
              business={business}
              user={user}
              userHasSaved={userHasSaved}
            />
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
