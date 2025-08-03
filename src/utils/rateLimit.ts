// Simple in-memory rate limiting for server actions
// For production, consider using Redis or a database for persistence

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60 * 1000); // Clean every minute

export interface RateLimitConfig {
  attempts: number;
  windowMs: number;
}

export function rateLimit(
  identifier: string, 
  config: RateLimitConfig
): { allowed: boolean; resetTime?: number; remaining?: number } {
  const now = Date.now();
  const key = identifier;
  
  // Get or create entry
  if (!store[key] || store[key].resetTime < now) {
    store[key] = {
      count: 1,
      resetTime: now + config.windowMs,
    };
    return { 
      allowed: true, 
      resetTime: store[key].resetTime,
      remaining: config.attempts - 1 
    };
  }
  
  // Check if limit exceeded
  if (store[key].count >= config.attempts) {
    return { 
      allowed: false, 
      resetTime: store[key].resetTime,
      remaining: 0 
    };
  }
  
  // Increment counter
  store[key].count++;
  
  return { 
    allowed: true,
    resetTime: store[key].resetTime,
    remaining: config.attempts - store[key].count 
  };
}

// Helper to get rate limit key for different actions
export function getRateLimitKey(action: string, userId?: string, ip?: string): string {
  // Use userId if available, fallback to IP
  const identifier = userId || ip || 'anonymous';
  return `${action}:${identifier}`;
}

// Rate limit configurations
export const RATE_LIMIT_CONFIGS = {
  CONTACT_FORM: { attempts: 3, windowMs: 60 * 60 * 1000 }, // 3 per hour
  REVIEW_SUBMISSION: { attempts: 5, windowMs: 24 * 60 * 60 * 1000 }, // 5 per day
  BUSINESS_REGISTRATION: { attempts: 2, windowMs: 24 * 60 * 60 * 1000 }, // 2 per day
  SAVE_BUSINESS: { attempts: 50, windowMs: 60 * 60 * 1000 }, // 50 per hour
} as const;