// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();
  const path = req.nextUrl.pathname;

  // Skip middleware for public routes
  if (!userId || path.startsWith("/_next") || path.startsWith("/api")) {
    return NextResponse.next();
  }

  const role = sessionClaims?.metadata?.role as string | undefined;
  const onboardingComplete = sessionClaims?.metadata?.onboardingComplete as
    | boolean
    | undefined;

  // If a user is signed in but has no role, redirect to role selection
  if (userId && !role && path !== "/onboarding/role-selection") {
    return NextResponse.redirect(
      new URL("/onboarding/role-selection", req.url)
    );
  }

  // If user hasn't completed onboarding, redirect to appropriate onboarding flow
  if (userId && role && onboardingComplete !== true) {
    if (role === "user" && !path.startsWith("/onboarding/user")) {
      return NextResponse.redirect(new URL("/onboarding/user", req.url));
    }

    if (role === "businessOwner" && !path.startsWith("/onboarding/business")) {
      return NextResponse.redirect(new URL("/onboarding/business", req.url));
    }
  }

  // Protect businessOwner-only routes
  if (
    path.startsWith("/business-dashboard") &&
    role !== "businessOwner" &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Protect admin-only routes
  if (path.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
