import { Star } from "lucide-react";
import Review from "@/schemas/reviewSchema";

interface RatingOverviewProps {
  business: {
    average_rating?: number | null;
    review_count?: number | null;
  };
  reviews: Review[];
}

export default function RatingOverview({ business, reviews }: RatingOverviewProps) {
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

  if (!business.average_rating || !reviews || reviews.length === 0) {
    return null;
  }

  return (
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
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-2 mb-1">
              <span className="text-sm font-medium w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-amber-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}