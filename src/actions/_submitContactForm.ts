"use server";

import { createClient } from "@/utils/supabase/create-client/server";
import { revalidatePath } from "next/cache";
import { rateLimit, getRateLimitKey, RATE_LIMIT_CONFIGS } from "@/utils/rateLimit";
import { createErrorResponse, createSuccessResponse, errorMessages, sanitizeText, emailSchema } from "@/utils/validation";
import { ContactFormResponse } from "@/types/serverActions";
import { headers } from "next/headers";
import { z } from "zod";

// Define the schema for validation
const contactFormSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .refine((name) => !/^\s*$/.test(name), "Name cannot be empty"),
  email: emailSchema,
  phone: z.string().optional(),
  subject: z.string()
    .min(5, "Subject must be at least 5 characters")
    .max(200, "Subject must be less than 200 characters"),
  inquiryType: z.enum([
    "general",
    "business-inquiry", 
    "technical-support",
    "partnership",
    "advertising",
    "other"
  ], { errorMap: () => ({ message: "Please select a valid inquiry type" }) }),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be less than 2000 characters")
    .refine((msg) => {
      // Check for spam patterns
      const spamPatterns = [
        /(.)\1{10,}/, // Repeated characters
        /https?:\/\/[^\s]+/g, // URLs
        /\b(buy now|click here|free money|guaranteed)\b/gi,
      ];
      return !spamPatterns.some(pattern => pattern.test(msg));
    }, "Message appears to be spam"),
});

export async function submitContactForm(formData: FormData): Promise<ContactFormResponse> {
  console.log("submitContactForm called with formData:", formData);

  try {
    // Rate limiting based on IP address
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip") || "unknown";
    const rateLimitKey = getRateLimitKey("contact_form", undefined, ip);
    const rateCheck = rateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.CONTACT_FORM);
    
    if (!rateCheck.allowed) {
      return createErrorResponse(errorMessages.RATE_LIMIT_EXCEEDED);
    }

    // Extract and sanitize form data
    const name = sanitizeText(formData.get("name") as string);
    const email = (formData.get("email") as string)?.toLowerCase().trim();
    const phone = sanitizeText(formData.get("phone") as string);
    const subject = sanitizeText(formData.get("subject") as string);
    const inquiryType = formData.get("inquiryType") as string;
    const message = sanitizeText(formData.get("message") as string);

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
      return createErrorResponse(
        errorMessages.VALIDATION_FAILED,
        validationResult.error.errors
      );
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

    return createSuccessResponse("Contact form submitted successfully", data);
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return createErrorResponse(errorMessages.SERVER_ERROR);
  }
}
