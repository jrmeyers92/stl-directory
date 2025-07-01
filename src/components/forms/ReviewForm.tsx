"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/create-client/client";
import { useUser } from "@clerk/nextjs";
import { CheckCircle, Loader2, Star, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface ReviewFormProps {
  businessId: string;
}

export default function ReviewForm({ businessId }: ReviewFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Form state
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 images
    if (images.length + files.length > 5) {
      setError("You can upload a maximum of 5 images");
      return;
    }

    setIsUploadingImages(true);
    setError(null);

    try {
      const supabase = createClient();
      const uploadedUrls: string[] = [];

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          setError("Please upload only image files");
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          setError("Images must be less than 5MB");
          continue;
        }

        // Upload to Supabase Storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `review-images/${businessId}/${fileName}`;

        const { error: uploadError, data } = await supabase.storage
          .from("business-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          setError("Failed to upload image");
          continue;
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("business-images").getPublicUrl(filePath);

        uploadedUrls.push(publicUrl);
      }

      setImages([...images, ...files]);
      setImageUrls([...imageUrls, ...uploadedUrls]);
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Failed to upload images");
    } finally {
      setIsUploadingImages(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!user) {
      setError("You must be signed in to submit a review");
      return;
    }

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    if (reviewContent.trim().length < 10) {
      setError("Review content must be at least 10 characters long");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();

      const reviewData = {
        clerk_id: user.id,
        business_id: businessId,
        rating,
        review_title: reviewTitle.trim() || null,
        review_content: reviewContent.trim(),
        reviewer_name: user.fullName || user.firstName || "Anonymous",
        reviewer_email: user.emailAddresses?.[0]?.emailAddress || null,
        review_images: imageUrls.length > 0 ? imageUrls : null,
        is_verified: false,
        is_featured: false,
        is_approved: false, // Reviews need admin approval
      };

      const { error: insertError } = await supabase
        .from("stl_directory_reviews")
        .insert([reviewData]);

      if (insertError) {
        throw insertError;
      }

      setSuccess(true);

      // Redirect to business page after 3 seconds
      setTimeout(() => {
        router.push(`/business/${businessId}`);
      }, 3000);
    } catch (err) {
      console.error("Review submission error:", err);
      setError("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-8 text-center">
          <div className="mb-4">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            Review Submitted Successfully!
          </h2>
          <p className="text-green-700 mb-4">
            Thank you for sharing your experience. Your review will be visible
            once approved by our team.
          </p>
          <p className="text-sm text-green-600">
            Redirecting you back to the business page...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Rating Section */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              How would you rate your experience? *
            </Label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded"
                  >
                    <Star
                      className={`h-10 w-10 transition-all ${
                        star <= (hoveredRating || rating)
                          ? "fill-amber-400 text-amber-400 scale-110"
                          : "text-gray-300 hover:text-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <span className="text-lg font-medium text-gray-700">
                  {rating === 1 && "Poor"}
                  {rating === 2 && "Fair"}
                  {rating === 3 && "Good"}
                  {rating === 4 && "Very Good"}
                  {rating === 5 && "Excellent"}
                </span>
              )}
            </div>
          </div>

          {/* Review Title */}
          <div className="space-y-2">
            <Label htmlFor="reviewTitle" className="text-base font-semibold">
              Review Title (Optional)
            </Label>
            <Input
              id="reviewTitle"
              type="text"
              placeholder="Summarize your experience in a few words"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              maxLength={100}
              className="text-base"
            />
          </div>

          {/* Review Content */}
          <div className="space-y-2">
            <Label htmlFor="reviewContent" className="text-base font-semibold">
              Your Review *
            </Label>
            <Textarea
              id="reviewContent"
              placeholder="Share details about your experience. What did you like? What could be improved? Would you recommend this business?"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              rows={8}
              className="resize-none text-base"
              required
              minLength={10}
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{reviewContent.length} characters (minimum 10)</span>
              <span
                className={reviewContent.length >= 50 ? "text-green-600" : ""}
              >
                {reviewContent.length >= 50
                  ? "Great detail!"
                  : "Add more detail for a helpful review"}
              </span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">
              Add Photos (Optional)
            </Label>
            <p className="text-sm text-gray-600">
              Help others visualize your experience
            </p>

            <div className="space-y-4">
              {/* Upload Button */}
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                  disabled={isUploadingImages || images.length >= 5}
                  className="h-auto py-3 px-4"
                >
                  <Upload className="mr-2 h-5 w-5" />
                  Choose Images
                </Button>
                <span className="text-sm text-gray-600">
                  {images.length}/5 images (max 5MB each)
                </span>
              </div>

              <input
                id="image-upload"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Review image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isUploadingImages && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Uploading images...</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Section */}
          <div className="pt-6 border-t">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <p className="text-sm text-gray-600">
                By submitting, you agree to our review guidelines
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={
                  isSubmitting || rating === 0 || reviewContent.length < 10
                }
                className="w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Review...
                  </>
                ) : (
                  "Submit Review"
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
