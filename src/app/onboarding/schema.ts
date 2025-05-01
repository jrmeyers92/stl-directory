import { z } from "zod";

// Schema for social media links
const socialMediaSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Must be a valid URL"),
});

// Main business onboarding schema
export const businessOnboardingFormSchema = z.object({
  clerkId: z.string(),
  businessName: z.string().min(2, "Business name is required"),
  businessCategory: z.string().min(1, "Please select a category"),
  businessAddress: z.string().min(3, "Address is required"),
  businessCity: z.string().min(2, "City is required"),
  businessState: z.string().min(2, "State is required"),
  businessZip: z.string().min(5, "ZIP code is required"),
  businessPhone: z.string().min(10, "Valid phone number is required"),
  businessEmail: z.string().email("Must be a valid email address"),
  businessWebsite: z
    .string()
    .url("Must be a valid URL")
    .optional()
    .or(z.literal("")),
  businessDescription: z
    .string()
    .min(20, "Description must be at least 20 characters"),
  socialMedia: z
    .array(socialMediaSchema)
    .min(1, "At least one social media link is required"),
  logoImage: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => {
        if (!file) return true;
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) return false;
        // Check file type
        const validTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        return validTypes.includes(file.type);
      },
      {
        message:
          "Profile image must be less than 5MB and in JPEG, PNG, GIF, or WEBP format",
      }
    ),
});

// Type for the form values
export type BusinessOnboardingValues = z.infer<
  typeof businessOnboardingFormSchema
>;
