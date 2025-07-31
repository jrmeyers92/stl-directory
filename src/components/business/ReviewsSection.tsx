import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { CheckCircle, Filter, Star, User } from "lucide-react";
import Link from "next/link";
import Review from "@/schemas/reviewSchema";
import RatingOverview from "./RatingOverview";
import ReviewCard from "./ReviewCard";

interface ReviewsSectionProps {
  business: {
    id: string;
    average_rating?: number | null;
    review_count?: number | null;
  };
  reviews: Review[];
  userHasReviewed: boolean;
}

export default function ReviewsSection({
  business,
  reviews,
  userHasReviewed,
}: ReviewsSectionProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Customer Reviews ({reviews?.length || 0})
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Rating Overview */}
        <RatingOverview business={business} reviews={reviews} />

        {/* Reviews List */}
        {reviews && reviews.length > 0 ? (
          <div className="space-y-8">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
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
                  <Link href={`/leave-review/${business.id}`}>
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
          {reviews && reviews.length > 0 && !userHasReviewed && (
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
                  <Link href={`/leave-review/${business.id}`}>
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
  );
}