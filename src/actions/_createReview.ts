"use server";

import { createClient } from "@/utils/supabase/create-client/server";
import { currentUser } from "@clerk/nextjs/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";

// Define the schema for validation
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  reviewTitle: z.string().optional(),
  reviewContent: z.string().min(10).max(5000),
  businessId: z.string().uuid(),
  imageUrls: z.array(z.string().url()).max(5),
});

// File validation constants
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp"];

// Helper function to validate file
function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${ALLOWED_FILE_TYPES.join(", ")}`,
    };
  }

  return { valid: true };
}

// Helper function to upload a single file
async function uploadFile(
  supabase: SupabaseClient,
  file: File,
  userId: string,
  businessId: string
): Promise<{ success: boolean; error?: string; url?: string }> {
  // Validate file first
  const validation = validateFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error! };
  }

  // Generate a unique filename with original extension
  const fileExt = file.name.split(".").pop() || "webp";
  const fileName = `${userId}-${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${fileExt}`;
  const filePath = `review-images/${businessId}/${fileName}`;

  // Upload the file to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from("stl-directory")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("File upload error:", uploadError);
    return { success: false, error: "Failed to upload file" };
  }

  // Get the public URL of the uploaded file
  const { data: urlData } = supabase.storage
    .from("stl-directory")
    .getPublicUrl(filePath);

  return { success: true, url: urlData.publicUrl };
}

// Helper function to clean up uploaded files
async function cleanupFiles(supabase: SupabaseClient, imageUrls: string[]) {
  for (const url of imageUrls) {
    try {
      // Extract the file path from the public URL
      const urlParts = url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const businessId = urlParts[urlParts.length - 2];
      const filePath = `review-images/${businessId}/${fileName}`;

      await supabase.storage.from("stl-directory").remove([filePath]);
    } catch (error) {
      console.error("Error cleaning up file:", url, error);
    }
  }
}

export async function submitReview(formData: FormData) {
  const uploadedImageUrls: string[] = [];

  try {
    // Get current user
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Extract and validate form data
    const rating = parseInt(formData.get("rating") as string);
    const reviewTitle = formData.get("reviewTitle") as string;
    const reviewContent = formData.get("reviewContent") as string;
    const businessId = formData.get("businessId") as string;
    const imageUrlsJson = formData.get("imageUrls") as string;

    let imageUrls: string[] = [];
    try {
      imageUrls = imageUrlsJson ? JSON.parse(imageUrlsJson) : [];
    } catch (error) {
      console.error("Error parsing image URLs:", error);
      imageUrls = [];
    }

    // Validate the data
    const validationResult = reviewSchema.safeParse({
      rating,
      reviewTitle: reviewTitle || undefined,
      reviewContent,
      businessId,
      imageUrls,
    });

    if (!validationResult.success) {
      return {
        success: false,
        error: `Validation failed: ${validationResult.error.errors
          .map((e) => e.message)
          .join(", ")}`,
      };
    }

    const supabase = await createClient();

    // Check if business exists
    const { data: business, error: businessError } = await supabase
      .from("stl_directory_businesses")
      .select("id")
      .eq("id", businessId)
      .single();

    if (businessError || !business) {
      return { success: false, error: "Business not found" };
    }

    // Check if user has already reviewed this business
    const { data: existingReview, error: existingReviewError } = await supabase
      .from("stl_directory_reviews")
      .select("id")
      .eq("clerk_id", user.id)
      .eq("business_id", businessId)
      .single();

    if (existingReview) {
      return {
        success: false,
        error: "You have already reviewed this business",
      };
    }

    // Prepare review data
    const reviewData = {
      clerk_id: user.id,
      business_id: businessId,
      rating,
      review_title: reviewTitle || null,
      review_content: reviewContent,
      reviewer_name:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Anonymous",
      reviewer_email: user.emailAddresses[0]?.emailAddress || null,
      reviewer_avatar_url: user.imageUrl || null,
      reviewer_first_name: user.firstName || null,
      reviewer_last_name: user.lastName || null,
      reviewer_username: user.username || null,
      review_images: imageUrls.length > 0 ? imageUrls : null,
      is_verified: false,
      is_featured: false,
      is_approved: false, // Set to false for manual approval
      helpful_count: 0,
      reported_count: 0,
    };

    // Insert the review into the database
    const { data: insertedReview, error: insertError } = await supabase
      .from("stl_directory_reviews")
      .insert(reviewData)
      .select("id")
      .single();

    if (insertError) {
      console.error("Review insertion error:", insertError);
      return { success: false, error: "Failed to submit review" };
    }

    return {
      success: true,
      message:
        "Review submitted successfully! It will be visible once approved.",
      reviewId: insertedReview.id,
    };
  } catch (error) {
    console.error("Error submitting review:", error);

    // Clean up any uploaded images on error
    if (uploadedImageUrls.length > 0) {
      const supabase = await createClient();
      await cleanupFiles(supabase, uploadedImageUrls);
    }

    return { success: false, error: "Failed to submit review" };
  }
}

// Alternative action if you want to handle file uploads in the server action
export async function submitReviewWithFiles(formData: FormData) {
  const uploadedImageUrls: string[] = [];

  try {
    // Get current user
    const user = await currentUser();
    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Extract form data
    const rating = parseInt(formData.get("rating") as string);
    const reviewTitle = formData.get("reviewTitle") as string;
    const reviewContent = formData.get("reviewContent") as string;
    const businessId = formData.get("businessId") as string;

    // Extract files
    const files: File[] = [];
    for (let i = 0; i < 5; i++) {
      const file = formData.get(`image_${i}`) as File;
      if (file && file.size > 0) {
        files.push(file);
      }
    }

    // Validate the basic data
    const validationResult = reviewSchema.safeParse({
      rating,
      reviewTitle: reviewTitle || undefined,
      reviewContent,
      businessId,
      imageUrls: [], // Will be populated after upload
    });

    if (!validationResult.success) {
      return {
        success: false,
        error: `Validation failed: ${validationResult.error.errors
          .map((e) => e.message)
          .join(", ")}`,
      };
    }

    const supabase = await createClient();

    // Check if business exists
    const { data: business, error: businessError } = await supabase
      .from("stl_directory_businesses")
      .select("id")
      .eq("id", businessId)
      .single();

    if (businessError || !business) {
      return { success: false, error: "Business not found" };
    }

    // Check if user has already reviewed this business
    const { data: existingReview } = await supabase
      .from("stl_directory_reviews")
      .select("id")
      .eq("clerk_id", user.id)
      .eq("business_id", businessId)
      .single();

    if (existingReview) {
      return {
        success: false,
        error: "You have already reviewed this business",
      };
    }

    // Upload images if provided
    if (files.length > 0) {
      for (const file of files) {
        const uploadResult = await uploadFile(
          supabase,
          file,
          user.id,
          businessId
        );
        if (!uploadResult.success) {
          // Clean up any previously uploaded files
          await cleanupFiles(supabase, uploadedImageUrls);
          return {
            success: false,
            error: uploadResult.error || "Failed to upload image",
          };
        }
        if (uploadResult.url) {
          uploadedImageUrls.push(uploadResult.url);
        }
      }
    }

    // Prepare review data
    const reviewData = {
      clerk_id: user.id,
      business_id: businessId,
      rating,
      review_title: reviewTitle || null,
      review_content: reviewContent,
      reviewer_name:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() ||
        user.username ||
        "Anonymous",
      reviewer_email: user.emailAddresses[0]?.emailAddress || null,
      reviewer_avatar_url: user.imageUrl || null,
      reviewer_first_name: user.firstName || null,
      reviewer_last_name: user.lastName || null,
      reviewer_username: user.username || null,
      review_images: uploadedImageUrls.length > 0 ? uploadedImageUrls : null,
      is_verified: false,
      is_featured: false,
      is_approved: false, // Set to false for manual approval
      helpful_count: 0,
      reported_count: 0,
    };

    // Insert the review into the database
    const { data: insertedReview, error: insertError } = await supabase
      .from("stl_directory_reviews")
      .insert(reviewData)
      .select("id")
      .single();

    if (insertError) {
      console.error("Review insertion error:", insertError);
      // Clean up uploaded images on database error
      await cleanupFiles(supabase, uploadedImageUrls);
      return { success: false, error: "Failed to submit review" };
    }

    return {
      success: true,
      message:
        "Review submitted successfully! It will be visible once approved.",
      reviewId: insertedReview.id,
    };
  } catch (error) {
    console.error("Error submitting review:", error);

    // Clean up any uploaded images on error
    if (uploadedImageUrls.length > 0) {
      const supabase = await createClient();
      await cleanupFiles(supabase, uploadedImageUrls);
    }

    return { success: false, error: "Failed to submit review" };
  }
}
