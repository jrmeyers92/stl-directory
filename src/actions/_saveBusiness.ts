"use server";

import { createClient } from "@/utils/supabase/create-client/server";
import { currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define the schema for validation
const saveSchema = z.object({
  businessId: z.string().uuid(),
  clerkId: z.string(),
});

export async function saveBusiness(formData: FormData) {
  console.log("saveBusiness called with formData:", formData);

  try {
    // Get current user
    const user = await currentUser();
    console.log("Current user:", user?.id);

    if (!user) {
      return { success: false, error: "User not authenticated" };
    }

    // Extract and validate form data
    const business_id = formData.get("businessId") as string;
    console.log("Business ID from form:", business_id);

    // Validate the data
    const validationResult = saveSchema.safeParse({
      businessId: business_id,
      clerkId: user.id,
    });

    console.log("Validation result:", validationResult);

    if (!validationResult.success) {
      return {
        success: false,
        error: `Validation failed: ${validationResult.error.errors
          .map((e) => e.message)
          .join(", ")}`,
      };
    }

    const supabase = await createClient();
    console.log("Supabase client created");

    // Check if business exists
    const { data: businessExists, error: businessCheckError } = await supabase
      .from("stl_directory_businesses")
      .select("id")
      .eq("id", business_id)
      .single();

    console.log("Business check result:", {
      businessExists,
      businessCheckError,
    });

    if (businessCheckError || !businessExists) {
      console.log("Business not found:", {
        businessCheckError,
        businessExists,
      });
      return {
        success: false,
        error: "Business not found",
      };
    }

    // Check if the user has already saved this business
    const { data: existingFavorite, error: favoriteCheckError } = await supabase
      .from("stl_directory_favorites")
      .select("id")
      .eq("business_id", business_id)
      .eq("clerk_id", user.id)
      .single();

    console.log("Existing favorite check:", {
      existingFavorite,
      favoriteCheckError,
    });

    if (favoriteCheckError && favoriteCheckError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected if no favorite exists
      console.log("Error checking favorite status:", favoriteCheckError);
      return {
        success: false,
        error: "Error checking favorite status",
      };
    }

    if (existingFavorite) {
      // If already saved, remove it (unsave)
      const { error: deleteError } = await supabase
        .from("stl_directory_favorites")
        .delete()
        .eq("id", existingFavorite.id);

      if (deleteError) {
        return {
          success: false,
          error: "Failed to unsave business",
        };
      }

      // Revalidate the current path to update the UI
      revalidatePath("/");

      return {
        success: true,
        message: "Business unsaved successfully",
        action: "unsaved",
      };
    } else {
      // If not saved, add it to favorites
      console.log("Attempting to insert favorite:", {
        business_id,
        clerk_id: user.id,
      });

      const { data, error: insertError } = await supabase
        .from("stl_directory_favorites")
        .insert([
          {
            business_id: business_id,
            clerk_id: user.id,
          },
        ])
        .select()
        .single();

      console.log("Insert result:", { data, insertError });

      if (insertError) {
        console.log("Insert error details:", insertError);
        return {
          success: false,
          error: "Failed to save business",
        };
      }

      // Revalidate the current path to update the UI
      revalidatePath("/");

      return {
        success: true,
        message: "Business saved successfully",
        action: "saved",
        data,
      };
    }
  } catch (error) {
    console.error("Error in saveBusiness:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
