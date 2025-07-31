import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Flag, MessageCircle, Star, ThumbsUp } from "lucide-react";
import Review from "@/schemas/reviewSchema";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
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
    <div className="border-b border-gray-100 last:border-0 pb-8 last:pb-0">
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
                    {new Date(review.created_at).toLocaleDateString("en-US", {
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
          {review.review_images && review.review_images.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {review.review_images.map((imageUrl: string, index: number) => (
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
              ))}
            </div>
          )}

          {/* Review Actions */}
          <div className="flex items-center space-x-6 text-sm">
            <button className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 transition-colors">
              <ThumbsUp className="h-4 w-4" />
              <span>Helpful</span>
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
  );
}