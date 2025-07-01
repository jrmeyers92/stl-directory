import ReviewForm from "@/components/forms/ReviewForm";
import { createClient } from "@/utils/supabase/create-client/server";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Business {
  id: string;
  business_name: string;
  business_category: string;
  logo_url?: string;
  banner_image_url?: string;
}

export default async function LeaveReviewPage({
  params,
}: {
  params: Promise<{ businessId: string }>;
}) {
  const { businessId } = await params;
  const supabase = await createClient();

  // Fetch business details
  const { data: business, error } = await supabase
    .from("stl_directory_businesses")
    .select("id, business_name, business_category, logo_url, banner_image_url")
    .eq("id", businessId)
    .single();

  if (error || !business) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Business Info */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />

        {/* Content */}
        <div className="relative">
          <div className="container mx-auto px-4 py-8">
            {/* Back button */}
            <Link
              href={`/business/${businessId}`}
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Business
            </Link>

            {/* Business Info */}
            <div className="flex items-center space-x-6">
              {business.logo_url && (
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-white shadow-lg flex-shrink-0">
                  <img
                    src={business.logo_url}
                    alt={business.business_name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Leave a Review
                </h1>
                <p className="text-gray-300 mt-1">
                  for{" "}
                  <span className="text-white font-medium">
                    {business.business_name}
                  </span>
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {business.business_category}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <SignedIn>
            <ReviewForm businessId={business.id} />
          </SignedIn>

          <SignedOut>
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Sign in to Leave a Review
                </h2>
                <p className="text-gray-600 mb-8">
                  Join our community to share your experiences and help others
                  make informed decisions.
                </p>
                <div className="space-y-3">
                  <Link
                    href="/sign-in"
                    className="block w-full bg-primary text-white py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </div>
          </SignedOut>
        </div>

        {/* Guidelines Section */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Review Guidelines
            </h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Be honest and constructive in your feedback</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Focus on your personal experience with the business</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>Avoid offensive language or personal attacks</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Include specific details to help others understand your
                  experience
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                <span>
                  Reviews are subject to approval before being published
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
