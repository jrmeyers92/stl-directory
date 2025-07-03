"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/utils/supabase/create-client/client";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2, Star, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// Define the form schema
const reviewFormSchema = z.object({
  rating: z.number().min(1, "Please select a rating").max(5),
  reviewTitle: z
    .string()
    .max(100, "Title must be less than 100 characters")
    .optional(),
  reviewContent: z
    .string()
    .min(10, "Review must be at least 10 characters long")
    .max(5000, "Review must be less than 5000 characters"),
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewFormProps {
  businessId: string;
}

export default function ReviewForm({ businessId }: ReviewFormProps) {
  const { user } = useUser();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Image handling states
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isUploadingImages, setIsUploadingImages] = useState(false);
  const [hoveredRating, setHoveredRating] = useState(0);

  // File input ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize form with react-hook-form
  const form = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      reviewTitle: "",
      reviewContent: "",
    },
  });

  // Watch the rating value for visual feedback
  // const currentRating = form.watch("rating");

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Limit to 5 images
    if (images.length + files.length > 5) {
      toast.error("You can upload a maximum of 5 images");
      return;
    }

    setIsUploadingImages(true);

    try {
      const supabase = createClient();
      const uploadedUrls: string[] = [];

      for (const file of files) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Please upload only image files");
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("Images must be less than 5MB");
          continue;
        }

        // Upload to Supabase Storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${user?.id}-${Date.now()}-${Math.random()
          .toString(36)
          .substring(7)}.${fileExt}`;
        const filePath = `review-images/${businessId}/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("business-images")
          .upload(filePath, file);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          toast.error("Failed to upload image");
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

      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }
    } catch (err) {
      console.error("Image upload error:", err);
      toast.error("Failed to upload images");
    } finally {
      setIsUploadingImages(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  async function onSubmit(values: ReviewFormValues) {
    if (!user) {
      toast.error("You must be signed in to submit a review");
      return;
    }

    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const reviewData = {
        clerk_id: user.id,
        business_id: businessId,
        rating: values.rating,
        review_title: values.reviewTitle?.trim() || null,
        review_content: values.reviewContent.trim(),
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

      toast.success("Review submitted successfully!", {
        description: "Your review will be visible once approved by our team.",
      });

      // Redirect to business page after 3 seconds
      setTimeout(() => {
        router.push(`/business/${businessId}`);
      }, 3000);
    } catch (err) {
      console.error("Review submission error:", err);
      toast.error("Failed to submit review", {
        description: "Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Rating Field */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    How would you rate your experience? *
                  </FormLabel>
                  <FormControl>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => field.onChange(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                            className="focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 rounded"
                          >
                            <Star
                              className={`h-10 w-10 transition-all ${
                                star <= (hoveredRating || field.value)
                                  ? "fill-amber-400 text-amber-400 scale-110"
                                  : "text-gray-300 hover:text-gray-400"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      {field.value > 0 && (
                        <span className="text-lg font-medium text-gray-700">
                          {field.value === 1 && "Poor"}
                          {field.value === 2 && "Fair"}
                          {field.value === 3 && "Good"}
                          {field.value === 4 && "Very Good"}
                          {field.value === 5 && "Excellent"}
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Title Field */}
            <FormField
              control={form.control}
              name="reviewTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Review Title (Optional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Summarize your experience in a few words"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Give your review a catchy title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Review Content Field */}
            <FormField
              control={form.control}
              name="reviewContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Your Review *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share details about your experience. What did you like? What could be improved? Would you recommend this business?"
                      rows={8}
                      className="resize-none text-base"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    <div className="flex justify-between">
                      <span>{field.value.length} characters (minimum 10)</span>
                      <span
                        className={
                          field.value.length >= 50 ? "text-green-600" : ""
                        }
                      >
                        {field.value.length >= 50
                          ? "Great detail!"
                          : "Add more detail for a helpful review"}
                      </span>
                    </div>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload Section */}
            <div className="space-y-3">
              <FormLabel className="text-base font-semibold">
                Add Photos (Optional)
              </FormLabel>
              <p className="text-sm text-gray-600">
                Help others visualize your experience
              </p>

              <div className="space-y-4">
                {/* Upload Button */}
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
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
                  ref={fileInputRef}
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
                  disabled={isSubmitting || !form.formState.isValid}
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
        </Form>
      </CardContent>
    </Card>
  );
}
