import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";

interface BusinessHeroProps {
  business: {
    id: string;
    business_name: string;
    banner_image_url?: string | null;
    logo_url?: string | null;
    is_featured?: boolean;
    is_verified?: boolean;
  };
}

export default function BusinessHero({ business }: BusinessHeroProps) {
  return (
    <div className="relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
      {business.banner_image_url ? (
        <>
          <img
            src={business.banner_image_url}
            alt={business.business_name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
      )}

      {/* Back button */}
      <div className="absolute top-4 left-4 z-20">
        <Link
          href="/categories"
          className="inline-flex items-center px-3 py-2 bg-white/90 hover:bg-white text-gray-900 rounded-lg transition-colors backdrop-blur-sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>
      </div>

      {/* Business logo overlay */}
      {business.logo_url && (
        <div className="absolute bottom-6 left-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
            <img
              src={business.logo_url}
              alt={`${business.business_name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Featured/Verified badges */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {business.is_featured && (
          <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
            ⭐ Featured
          </Badge>
        )}
        {business.is_verified && (
          <Badge className="bg-green-500 hover:bg-green-600 text-white">
            <CheckCircle className="mr-1 h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>
    </div>
  );
}