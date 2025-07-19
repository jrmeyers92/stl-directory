// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)", // Usually webhooks should be public
  // Add other public routes as needed
]);

// Define API routes that need protection
const isProtectedApiRoute = createRouteMatcher([
  "/api/protected(.*)",
  // Add other protected API routes
]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // Handle API routes first
  if (path.startsWith("/api")) {
    // Allow public API routes
    if (path.startsWith("/api/webhooks")) {
      return NextResponse.next();
    }

    // Protect specific API routes if needed
    if (isProtectedApiRoute(req)) {
      const { userId } = await auth();
      if (!userId) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.next();
  }

  // Skip middleware for Next.js internals and static files
  if (path.startsWith("/_next")) {
    return NextResponse.next();
  }

  // For public routes, don't require authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Get auth info for protected routes
  const { userId, sessionClaims } = await auth();

  // Protect authenticated-only routes
  if (path.startsWith("/favorites") && !userId) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If not authenticated and trying to access protected route
  if (!userId && !isPublicRoute(req)) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  // If user is authenticated, handle onboarding flow
  if (userId) {
    const role = sessionClaims?.metadata?.role as string | undefined;
    const onboardingComplete = sessionClaims?.metadata?.onboardingComplete as
      | boolean
      | undefined;

    // If a user is signed in but has no role, redirect to role selection
    if (!role && path !== "/onboarding/role-selection") {
      return NextResponse.redirect(
        new URL("/onboarding/role-selection", req.url)
      );
    }

    // If user hasn't completed onboarding, redirect to appropriate onboarding flow
    if (role && onboardingComplete !== true) {
      if (role === "user" && !path.startsWith("/onboarding/user")) {
        return NextResponse.redirect(new URL("/onboarding/user", req.url));
      }

      if (
        role === "businessOwner" &&
        !path.startsWith("/onboarding/business")
      ) {
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
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
