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

  return (
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
  );
}
