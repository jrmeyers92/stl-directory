import { z } from "zod";

// Social media schema
const socialMediaItemSchema = z.object({
  platform: z.string().min(1, {
    message: "Platform is required",
  }),
  url: z.string().url({
    message: "Please enter a valid URL",
  }),
});

// This is the schema for the business onboarding form
export const businessOnboardingFormSchema = z.object({
  clerkId: z.string(),
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  businessCategory: z.string().min(1, {
    message: "Please select a business category.",
  }),
  businessAddress: z.string().min(5, {
    message: "Please enter a valid street address.",
  }),
  businessCity: z.string().min(2, {
    message: "Please enter a valid city name.",
  }),
  businessState: z.string().length(2, {
    message: "Please enter a valid 2-letter state code.",
  }),
  businessZip: z.string().regex(/^\d{5}(-\d{4})?$/, {
    message: "Please enter a valid ZIP code (12345 or 12345-6789).",
  }),
  businessPhone: z
    .string()
    .regex(/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, {
      message: "Please enter a valid phone number.",
    }),
  businessEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  businessWebsite: z
    .string()
    .url({
      message: "Please enter a valid URL (or leave empty).",
    })
    .optional()
    .or(z.literal("")),
  businessDescription: z
    .string()
    .min(20, {
      message: "Description should be at least 20 characters.",
    })
    .max(500, {
      message: "Description should not exceed 500 characters.",
    }),
  socialMedia: z.array(socialMediaItemSchema),
});

export type BusinessOnboardingValues = z.infer<
  typeof businessOnboardingFormSchema
>;
