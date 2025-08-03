import { z } from "zod";

// Common validation schemas that can be reused across the application

// File validation
export const fileValidation = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  MAX_GALLERY_IMAGES: 10,
  MAX_REVIEW_IMAGES: 5,
};

// Phone number validation (US format)
export const phoneSchema = z
  .string()
  .regex(
    /^(\+1\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/,
    "Please enter a valid US phone number"
  )
  .optional()
  .or(z.literal(""));

// URL validation
export const urlSchema = z
  .string()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

// Email validation with additional checks
export const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address")
  .max(254, "Email is too long") // RFC 5321 limit
  .refine((email) => {
    const domain = email.split("@")[1];
    if (!domain) return false;
    
    // Check for common typos
    const typos: Record<string, string> = {
      "gmial.com": "gmail.com",
      "gmai.com": "gmail.com", 
      "yahooo.com": "yahoo.com",
      "hotmial.com": "hotmail.com",
    };
    
    return !typos[domain.toLowerCase()];
  }, "Please check your email address for typos");

// ZIP code validation (US)
export const zipCodeSchema = z
  .string()
  .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code (e.g., 12345 or 12345-6789)");

// Business name validation
export const businessNameSchema = z
  .string()
  .min(2, "Business name must be at least 2 characters")
  .max(100, "Business name must be less than 100 characters")
  .refine((name) => {
    // Check for suspicious patterns
    const suspiciousPatterns = [
      /^test\s*$/i,
      /^sample\s*$/i, 
      /^example\s*$/i,
      /^\s*$/, // only whitespace
    ];
    return !suspiciousPatterns.some(pattern => pattern.test(name));
  }, "Please enter a valid business name");

// Rating validation
export const ratingSchema = z
  .number()
  .min(1, "Rating must be at least 1 star")
  .max(5, "Rating cannot exceed 5 stars")
  .int("Rating must be a whole number");

// Text content validation
export const reviewContentSchema = z
  .string()
  .min(10, "Review must be at least 10 characters long")
  .max(5000, "Review must be less than 5000 characters")
  .refine((content) => {
    // Check for spam patterns
    const spamPatterns = [
      /(.)\1{10,}/, // Repeated characters (11+ times)
      /https?:\/\/[^\s]+/g, // URLs (basic check)
      /\b(buy now|click here|free money|guaranteed|urgent|limited time)\b/gi,
    ];
    return !spamPatterns.some(pattern => pattern.test(content));
  }, "Content appears to be spam or invalid");

// File validation function
export function validateFile(file: File): { valid: boolean; error?: string } {
  if (file.size > fileValidation.MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size must be less than ${fileValidation.MAX_FILE_SIZE / (1024 * 1024)}MB`,
    };
  }

  if (!fileValidation.ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type must be one of: ${fileValidation.ALLOWED_IMAGE_TYPES.join(", ")}`,
    };
  }

  // Check file name for suspicious patterns
  const suspiciousExtensions = [".exe", ".bat", ".cmd", ".com", ".pif", ".scr"];
  const fileName = file.name.toLowerCase();
  if (suspiciousExtensions.some(ext => fileName.endsWith(ext))) {
    return {
      valid: false,
      error: "File type not allowed for security reasons",
    };
  }

  return { valid: true };
}

// Sanitize text input
export function sanitizeText(text: string): string {
  // Remove HTML tags and excessive whitespace
  return text
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/\s+/g, " ") // Normalize whitespace
    .trim();
}

// Rate limiting helpers
export const rateLimits = {
  CONTACT_FORM: { attempts: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  REVIEW_SUBMISSION: { attempts: 5, windowMs: 24 * 60 * 60 * 1000 }, // 5 per day
  BUSINESS_REGISTRATION: { attempts: 2, windowMs: 24 * 60 * 60 * 1000 }, // 2 per day
};

// Common error messages
export const errorMessages = {
  AUTHENTICATION_REQUIRED: "You must be signed in to perform this action",
  VALIDATION_FAILED: "Please check your input and try again",
  RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later",
  FILE_TOO_LARGE: "File size is too large",
  INVALID_FILE_TYPE: "File type is not supported",
  BUSINESS_NOT_FOUND: "Business not found",
  DUPLICATE_REVIEW: "You have already reviewed this business",
  DUPLICATE_BUSINESS: "A business is already registered for this account",
  SERVER_ERROR: "An unexpected error occurred. Please try again",
};

// Create a standardized error response
export function createErrorResponse(error: string, details?: any): { success: false; error: string; details?: any } {
  return {
    success: false as const,
    error,
    details: process.env.NODE_ENV === "development" ? details : undefined,
  };
}

// Create a standardized success response  
export function createSuccessResponse(message: string, data?: any): { success: true; message: string; data?: any } {
  return {
    success: true as const,
    message,
    data,
  };
}