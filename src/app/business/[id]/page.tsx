import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ViewCounter from "@/components/ViewCounter";
import Review from "@/schemas/reviewSchema";
import { createClient } from "@/utils/supabase/create-client/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Eye,
  Filter,
  Flag,
  Globe,
  Heart,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Share2,
  Star,
  ThumbsUp,
  User,
} from "lucide-react";
import Link from "next/link";
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

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews?.filter((r) => r.rating === rating).length || 0,
    percentage: reviews?.length
      ? (
          (reviews.filter((r) => r.rating === rating).length / reviews.length) *
          100
        ).toFixed(0)
      : 0,
  }));

  // Parse gallery images if they exist
  let galleryImages: string[] = [];
  if (business.gallery_images && business.gallery_images !== "[]") {
    try {
      galleryImages = JSON.parse(business.gallery_images);
    } catch (e) {
      console.error("Error parsing gallery images:", e);
    }
  }

  // Helper function to get review display name
  const getReviewerDisplayName = (review: any) => {
    if (review.reviewer_first_name && review.reviewer_last_name) {
      return `${review.reviewer_first_name} ${review.reviewer_last_name}`;
    }
    if (review.reviewer_username) {
      return review.reviewer_username;
    }
    return review.reviewer_name || "Anonymous";
  };

  // Helper function to get reviewer initials
  const getReviewerInitials = (review: any) => {
    const name = getReviewerDisplayName(review);
    return name
      .split(" ")
      .map((n: string) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* View Counter - runs on client side */}
      <ViewCounter businessId={business.id} />

      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
        {business.banner_image_url ? (
          <>
            <img
              src={business.banner_image_url}
              alt={business.business_name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}

        {/* Back button */}
        <div className="absolute top-4 left-4 z-20">
          <Link
            href="/categories"
            className="inline-flex items-center px-3 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors backdrop-blur-sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Categories
          </Link>
        </div>

        {/* Business logo overlay */}
        {business.logo_url && (
          <div className="absolute bottom-6 left-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
              <img
                src={business.logo_url}
                alt={`${business.business_name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Featured/Verified badges */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {business.is_featured && (
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
              ⭐ Featured
            </Badge>
          )}
          {business.is_verified && (
            <Badge className="bg-green-500 hover:bg-green-600 text-white">
              <CheckCircle className="mr-1 h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Business Info Card */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                        {business.business_name}
                      </h1>
                      <Badge variant="secondary" className="w-fit">
                        {business.business_category}
                      </Badge>
                    </div>

                    {business.average_rating && (
                      <div className="flex items-center space-x-1 bg-amber-50 px-3 py-2 rounded-lg">
                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-lg">
                          {Number(business.average_rating).toFixed(1)}
                        </span>
                        <span className="text-gray-600">
                          ({business.review_count || 0} reviews)
                        </span>
                      </div>
                    )}
                  </div>

                  {business.business_description && (
                    <>
                      <Separator />
                      <div>
                        <h2 className="text-xl font-semibold mb-3">About</h2>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {business.business_description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
              <Card className="bg-white shadow-lg">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
                      >
                        <img
                          src={imageUrl}
                          alt={`${business.business_name} gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Reviews Section */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">
                    Customer Reviews ({typedReviews?.length || 0})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filter
                    </Button>
                  </div>
                </div>

                {/* Rating Overview */}
                {business.average_rating &&
                  typedReviews &&
                  typedReviews.length > 0 && (
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-4xl font-bold text-gray-900">
                              {Number(business.average_rating).toFixed(1)}
                            </div>
                            <div className="flex items-center justify-center space-x-1 mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= Math.round(business.average_rating!)
                                      ? "fill-amber-400 text-amber-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {business.review_count || 0} reviews
                            </div>
                          </div>
                        </div>

                        {/* Rating Distribution */}
                        <div className="flex-1 max-w-md">
                          {ratingDistribution.map(
                            ({ rating, count, percentage }) => (
                              <div
                                key={rating}
                                className="flex items-center space-x-2 mb-1"
                              >
                                <span className="text-sm font-medium w-8">
                                  {rating}★
                                </span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                                <span className="text-sm text-gray-600 w-8">
                                  {count}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Reviews List */}
                {typedReviews && typedReviews.length > 0 ? (
                  <div className="space-y-8">
                    {typedReviews.map((review) => (
                      <div
                        key={review.id}
                        className="border-b border-gray-100 last:border-0 pb-8 last:pb-0"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Reviewer Avatar */}
                          <div className="flex-shrink-0">
                            {review.reviewer_avatar_url ? (
                              <img
                                src={review.reviewer_avatar_url}
                                alt={getReviewerDisplayName(review)}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                                {getReviewerInitials(review)}
                              </div>
                            )}
                          </div>

                          {/* Review Content */}
                          <div className="flex-1 min-w-0">
                            {/* Review Header */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <h4 className="font-semibold text-gray-900">
                                    {getReviewerDisplayName(review)}
                                  </h4>
                                  {review.is_verified && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs border-green-200 text-green-700"
                                    >
                                      <CheckCircle className="mr-1 h-3 w-3" />
                                      Verified
                                    </Badge>
                                  )}
                                  {review.is_featured && (
                                    <Badge className="text-xs bg-amber-100 text-amber-800">
                                      ⭐ Featured
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-500">
                                  <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating
                                            ? "fill-amber-400 text-amber-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <span>•</span>
                                  <div className="flex items-center space-x-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>
                                      {new Date(
                                        review.created_at
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Review Title */}
                            {review.review_title && (
                              <h5 className="font-semibold text-gray-900 mb-3 text-lg">
                                {review.review_title}
                              </h5>
                            )}

                            {/* Review Content */}
                            <p className="text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                              {review.review_content}
                            </p>

                            {/* Review Images */}
                            {review.review_images &&
                              review.review_images.length > 0 && (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
                                  {review.review_images.map(
                                    (imageUrl: string, index: number) => (
                                      <div
                                        key={index}
                                        className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                                      >
                                        <img
                                          src={imageUrl}
                                          alt={`Review image ${index + 1}`}
                                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                                        />
                                      </div>
                                    )
                                  )}
                                </div>
                              )}

                            {/* Review Actions */}
                            <div className="flex items-center space-x-6 text-sm">
                              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                <span>Helpful</span>
                                {/* {review.helpful_count?? && review.helpful_count > 0 && (
                                  <span className="font-medium">
                                    ({review.helpful_count})
                                  </span>
                                )} */}
                              </button>
                              <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
                                <MessageCircle className="h-4 w-4" />
                                <span>Reply</span>
                              </button>
                              <button className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors">
                                <Flag className="h-4 w-4" />
                                <span>Report</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <Star className="h-16 w-16 mx-auto" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No reviews yet
                    </h3>
                    <p className="text-gray-500 mb-4">
                      Be the first to share your experience with this business!
                    </p>
                    <SignedIn>
                      {!userHasReviewed && (
                        <Button asChild>
                          <Link href={`/leave-review/${id}`}>
                            Write the First Review
                          </Link>
                        </Button>
                      )}
                    </SignedIn>
                    <SignedOut>
                      <p className="text-sm text-gray-400">
                        <Link
                          href="/sign-in"
                          className="text-primary hover:underline"
                        >
                          Sign in
                        </Link>{" "}
                        to leave a review
                      </p>
                    </SignedOut>
                  </div>
                )}

                {/* Write Review Button */}
                <SignedIn>
                  {typedReviews &&
                    typedReviews.length > 0 &&
                    !userHasReviewed && (
                      <div className="mt-8 pt-6 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              Share Your Experience
                            </h3>
                            <p className="text-sm text-gray-600">
                              Help others by writing a review
                            </p>
                          </div>
                          <Button asChild>
                            <Link href={`/leave-review/${id}`}>
                              <User className="mr-2 h-4 w-4" />
                              Write a Review
                            </Link>
                          </Button>
                        </div>
                      </div>
                    )}
                  {userHasReviewed && (
                    <div className="mt-8 pt-6 border-t border-gray-100">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">
                            You have already reviewed this business
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </SignedIn>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <Card className="bg-white shadow-lg sticky top-4">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Contact Information
                </h2>
                <div className="space-y-4">
                  {(business.business_address || business.business_city) && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
                      <div>
                        {business.business_address && (
                          <p className="font-medium">
                            {business.business_address}
                          </p>
                        )}
                        <p className="text-gray-600">
                          {business.business_city}
                          {business.business_city &&
                            business.business_state &&
                            ", "}
                          {business.business_state} {business.business_zip}
                        </p>
                      </div>
                    </div>
                  )}

                  {business.business_phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <Link
                        href={`tel:${business.business_phone}`}
                        className="text-primary hover:text-primary/80 font-medium"
                      >
                        {business.business_phone}
                      </Link>
                    </div>
                  )}

                  {business.business_email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <Link
                        href={`mailto:${business.business_email}`}
                        className="text-primary hover:text-primary/80 font-medium break-all"
                      >
                        {business.business_email}
                      </Link>
                    </div>
                  )}

                  {business.business_website && (
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      <Link
                        href={business.business_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 font-medium break-all"
                      >
                        Visit Website
                      </Link>
                    </div>
                  )}
                </div>

                <Separator className="my-6" />

                {/* Action Buttons */}
                <div className="space-y-3">
                  {business.business_phone && (
                    <Button className="w-full" size="lg" asChild>
                      <Link href={`tel:${business.business_phone}`}>
                        <Phone className="mr-2 h-4 w-4" />
                        Call Now
                      </Link>
                    </Button>
                  )}

                  {business.business_website && (
                    <Button
                      variant="outline"
                      className="w-full"
                      size="lg"
                      asChild
                    >
                      <Link
                        href={business.business_website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="mr-2 h-4 w-4" />
                        Visit Website
                      </Link>
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Heart className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Stats */}
                {business.view_count !== undefined && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex items-center justify-center text-sm text-gray-500">
                      <Eye className="mr-1 h-4 w-4" />
                      {business.view_count || 0} views
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
