"use server";

import { createClient } from "@/utils/supabase/create-client/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Define the schema for validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function submitContactForm(formData: FormData) {
  console.log("submitContactForm called with formData:", formData);

  try {
    // Extract form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const subject = formData.get("subject") as string;
    const inquiryType = formData.get("inquiryType") as string;
    const message = formData.get("message") as string;

    console.log("Form data extracted:", {
      name,
      email,
      phone,
      subject,
      inquiryType,
      message,
    });

    // Validate the data
    const validationResult = contactFormSchema.safeParse({
      name,
      email,
      phone,
      subject,
      inquiryType,
      message,
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

    // Insert the contact form submission
    const { data, error: insertError } = await supabase
      .from("stl_directory_contact_form")
      .insert([
        {
          name: validationResult.data.name,
          email: validationResult.data.email,
          phone: validationResult.data.phone || null,
          subject: `[${validationResult.data.inquiryType}] ${validationResult.data.subject}`,
          message: validationResult.data.message,
        },
      ])
      .select()
      .single();

    console.log("Insert result:", { data, insertError });

    if (insertError) {
      console.log("Insert error details:", insertError);
      return {
        success: false,
        error: "Failed to submit contact form",
      };
    }

    // Revalidate the current path to update the UI
    revalidatePath("/contact");

    return {
      success: true,
      message: "Contact form submitted successfully",
      data,
    };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
}
