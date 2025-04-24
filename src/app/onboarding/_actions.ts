"use server";

import { Roles } from "@/types/globals";
import { createAdminClient } from "@/utils/supabase/admin";
import { auth, clerkClient } from "@clerk/nextjs/server";

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

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role,
        onboardingComplete: false,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error setting role:", error);
    return { success: false, error: "Failed to set role" };
  }
}

export async function completeBusinessOnboarding(businessData: any) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, error: "User not authenticated" };
    }

    const client = await clerkClient();

    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        onboardingComplete: true,
      },
    });

    const supabase = await createAdminClient();

    const { data, error } = await supabase
      .from("stl_directory_businesses")
      .insert({
        clerk_id: userId,
        business_name: businessData.businessName,
        business_category: businessData.businessCategory,
        business_subcategory: businessData.businessSubcategory,
        business_description: businessData.businessDescription,
        business_email: businessData.businessEmail,
        business_phone: businessData.businessPhone,
        business_website: businessData.businessWebsite || null,
        business_address: businessData.businessAddress,
        business_city: businessData.businessCity,
        business_state: businessData.businessState,
        business_zip: businessData.businessZip,
        is_active: true, // Set to false if you want to review businesses before activation
      });

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: "Failed to create business in database" };
    }
    return { success: true };
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return { success: false, error: "Failed to complete onboarding" };
  }
}
