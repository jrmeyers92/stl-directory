import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { z } from "zod";
import { rateLimit, getRateLimitKey, RateLimitConfig } from "./rateLimit";
import { createErrorResponse, errorMessages } from "./validation";

// Middleware options
interface MiddlewareOptions {
  requireAuth?: boolean;
  rateLimit?: {
    action: string;
    config: RateLimitConfig;
  };
  validation?: z.ZodSchema<any>;
}

// Middleware result
interface MiddlewareResult {
  success: boolean;
  error?: string;
  user?: any;
  validatedData?: any;
}

// Server action middleware function
export async function withMiddleware(
  options: MiddlewareOptions,
  formData?: FormData,
  data?: any
): Promise<MiddlewareResult> {
  try {
    let user = null;

    // Authentication check
    if (options.requireAuth) {
      user = await currentUser();
      if (!user) {
        return {
          success: false,
          error: errorMessages.AUTHENTICATION_REQUIRED,
        };
      }
    }

    // Rate limiting
    if (options.rateLimit) {
      const headersList = await headers();
      const ip = headersList.get("x-forwarded-for") || 
                 headersList.get("x-real-ip") || 
                 "unknown";
      
      const rateLimitKey = getRateLimitKey(
        options.rateLimit.action, 
        user?.id, 
        ip
      );
      
      const rateCheck = rateLimit(rateLimitKey, options.rateLimit.config);
      
      if (!rateCheck.allowed) {
        return {
          success: false,
          error: errorMessages.RATE_LIMIT_EXCEEDED,
        };
      }
    }

    // Data validation
    let validatedData = data;
    if (options.validation && (formData || data)) {
      let dataToValidate = data;
      
      // If FormData is provided, extract it to an object
      if (formData && !data) {
        dataToValidate = {};
        for (const [key, value] of formData.entries()) {
          dataToValidate[key] = value;
        }
      }

      const validationResult = options.validation.safeParse(dataToValidate);
      
      if (!validationResult.success) {
        return {
          success: false,
          error: errorMessages.VALIDATION_FAILED,
        };
      }
      
      validatedData = validationResult.data;
    }

    return {
      success: true,
      user,
      validatedData,
    };
  } catch (error) {
    console.error("Middleware error:", error);
    return {
      success: false,
      error: errorMessages.SERVER_ERROR,
    };
  }
}

// Helper function to create a server action with middleware
export function createServerAction<T, R>(
  options: MiddlewareOptions,
  handler: (params: { 
    user?: any; 
    validatedData?: T; 
    formData?: FormData 
  }) => Promise<R>
) {
  return async (formData: FormData, data?: T): Promise<R> => {
    const middlewareResult = await withMiddleware(options, formData, data);
    
    if (!middlewareResult.success) {
      return createErrorResponse(middlewareResult.error!) as R;
    }

    return handler({
      user: middlewareResult.user,
      validatedData: middlewareResult.validatedData,
      formData,
    });
  };
}

// Common middleware configurations
export const middlewareConfigs = {
  requireAuth: { requireAuth: true },
  
  contactForm: {
    rateLimit: {
      action: "contact_form",
      config: { attempts: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
    },
  },
  
  reviewSubmission: {
    requireAuth: true,
    rateLimit: {
      action: "review_submission", 
      config: { attempts: 5, windowMs: 24 * 60 * 60 * 1000 }, // 5 per day
    },
  },
  
  businessRegistration: {
    requireAuth: true,
    rateLimit: {
      action: "business_registration",
      config: { attempts: 2, windowMs: 24 * 60 * 60 * 1000 }, // 2 per day
    },
  },
  
  saveBusiness: {
    requireAuth: true,
    rateLimit: {
      action: "save_business",
      config: { attempts: 50, windowMs: 60 * 60 * 1000 }, // 50 per hour
    },
  },
} as const;