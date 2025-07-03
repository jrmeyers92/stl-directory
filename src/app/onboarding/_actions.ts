"use server";

import { businessCategories, getCategorySlug } from "@/data/businessCategory";
import {
  businessOnboardingDBSchema,
  businessOnboardingFormSchema,
  BusinessOnboardingValues,
} from "@/schemas/businessSchema";
import { Roles } from "@/types/globals";
import { createClient } from "@/utils/supabase/create-client/server";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { SupabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

// Define return type for the upload function
type UploadResult = {
  success: boolean;
  error: string | null;
  path: string | null;
};

// Helper function to upload a single file
async function uploadFile(
  supabase: SupabaseClient,
  file: File,
  userId: string,
  folder: string
): Promise<UploadResult> {
  // Generate a unique filename with original extension
  const fileExt = file.name.split(".").pop();
  const fileName = `${userId}-${uuidv4()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  // Upload the file to Supabase storage
  const { error: uploadError } = await supabase.storage
    .from("stl-directory")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("File upload error:", uploadError);
    return { success: false, error: "Failed to upload file", path: null };
  }

  // Get the public URL of the uploaded file
  const { data: urlData } = supabase.storage
    .from("stl-directory")
    .getPublicUrl(filePath);

  return { success: true, error: null, path: urlData.publicUrl };
}

export async function completeBusinessOnboarding(
  businessData: BusinessOnboardingValues
) {
  try {
    // Validate form data with the form schema
    try {
      businessOnboardingFormSchema.parse(businessData);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return {
          success: false,
          error: `Validation failed: ${validationError.errors
            .map((e) => e.message)
            .join(", ")}`,
        };
      }
      throw validationError;
    }

    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const supabase = await createClient();
    let logoUrl: string | null = null;
    let bannerImageUrl: string | null = null;
    const galleryImageUrls: string[] = [];

    // Handle logo upload if provided
    if (businessData.logoImage) {
      const logoUpload = await uploadFile(
        supabase,
        businessData.logoImage,
        userId,
        "business-profiles"
      );
      if (!logoUpload.success) {
        return { success: false, error: logoUpload.error || "Upload failed" };
      }
      if (logoUpload.path) {
        logoUrl = logoUpload.path;
      }
    }

    // Handle banner image upload if provided
    if (businessData.bannerImage) {
      const bannerUpload = await uploadFile(
        supabase,
        businessData.bannerImage,
        userId,
        "business-banners"
      );
      if (!bannerUpload.success) {
        return { success: false, error: bannerUpload.error || "Upload failed" };
      }
      if (bannerUpload.path) {
        bannerImageUrl = bannerUpload.path;
      }
    }

    // Handle gallery images upload if provided
    if (businessData.galleryImages && businessData.galleryImages.length > 0) {
      for (const image of businessData.galleryImages) {
        const galleryUpload = await uploadFile(
          supabase,
          image,
          userId,
          "business-galleries"
        );
        if (!galleryUpload.success) {
          return {
            success: false,
            error: galleryUpload.error || "Upload failed",
          };
        }
        if (galleryUpload.path) {
          galleryImageUrls.push(galleryUpload.path);
        }
      }
    }

    // Filter out empty social media entries
    const filteredSocialMedia = businessData.socialMedia.filter(
      (item) => item.platform && item.url
    );

    // Prepare database object with all image URLs
    const dbData = {
      clerkId: userId,
      businessName: businessData.businessName,
      businessCategory: businessData.businessCategory,
      businessDescription: businessData.businessDescription,
      businessEmail: businessData.businessEmail,
      businessPhone: businessData.businessPhone,
      businessWebsite: businessData.businessWebsite || null,
      businessAddress: businessData.businessAddress,
      businessCity: businessData.businessCity,
      businessState: businessData.businessState,
      businessZip: businessData.businessZip,
      socialMedia: filteredSocialMedia,
      logoImageUrl: logoUrl,
      bannerImageUrl: bannerImageUrl,
      galleryImageUrls: galleryImageUrls.length > 0 ? galleryImageUrls : null,
    };

    // Validate the DB data before inserting
    try {
      businessOnboardingDBSchema.parse(dbData);
    } catch (dbValidationError) {
      if (dbValidationError instanceof z.ZodError) {
        return {
          success: false,
          error: `Database validation failed: ${dbValidationError.errors
            .map((e) => e.message)
            .join(", ")}`,
        };
      }
      throw dbValidationError;
    }

    // Insert business data into database
    const { error } = await supabase.from("stl_directory_businesses").insert({
      clerk_id: userId,
      business_name: businessData.businessName,
      business_category: businessData.businessCategory,
      business_description: businessData.businessDescription,
      business_email: businessData.businessEmail,
      business_phone: businessData.businessPhone,
      business_website: businessData.businessWebsite || null,
      business_address: businessData.businessAddress,
      business_city: businessData.businessCity,
      business_state: businessData.businessState,
      business_zip: businessData.businessZip,
      social_media: JSON.stringify(filteredSocialMedia),
      logo_url: logoUrl,
      banner_image_url: bannerImageUrl,
      business_category_slug: getCategorySlug(businessData.businessCategory),
      gallery_images:
        galleryImageUrls.length > 0 ? JSON.stringify(galleryImageUrls) : null,
      is_active: true, // Set to false if you want to review businesses before activation
    });

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Failed to create business in database" };
    }

    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "businessOwner", // Ensure role is set correctly
        onboardingComplete: true,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, error: "Failed to complete onboarding" };
  }
}

export async function setRole(formData: FormData) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const role = formData.get("role") as Roles;

    if (!role || (role !== "user" && role !== "businessOwner")) {
      return { success: false, error: "Invalid role" };
    }

    const client = await clerkClient();

    const updateOnboarding = role === "user" ? true : false;

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        onboardingComplete: updateOnboarding,
      },
    });

    // Return user role in the response so client doesn't need to fetch it separately
    return {
      success: true,
      role: role,
    };
  } catch (error) {
    console.error("Error setting role:", error);
    return { success: false, error: "Failed to set role" };
  }
}
