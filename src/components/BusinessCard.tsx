import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Globe, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

interface Business {
  id: string;
  business_name: string;
  business_category: string;
  business_description?: string;
  business_email?: string;
  business_phone?: string;
  business_website?: string;
  business_address?: string;
  business_city?: string;
  business_state?: string;
  business_zip?: string;
  logo_url?: string;
  banner_image_url?: string;
  gallery_images?: string;
  average_rating?: number;
  review_count?: number;
  is_featured?: boolean;
  is_verified?: boolean;
  view_count?: number;
}

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white">
      {/* Banner Image Header */}
      <div className="relative h-32 overflow-hidden">
        {business.banner_image_url ? (
          <>
            <img
              src={business.banner_image_url}
              alt={business.business_name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-gray-100 to-gray-200" />
        )}

        {/* Logo positioned in bottom right of banner */}
        {business.logo_url && (
          <div className="absolute bottom-2 right-2">
            <div className="relative w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-white">
              <img
                src={business.logo_url}
                alt={`${business.business_name} logo`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        {/* Featured badge */}
        {business.is_featured && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs px-2 py-1">
              ⭐ Featured
            </Badge>
          </div>
        )}

        {/* Verified badge */}
        {business.is_verified && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1">
              ✓ Verified
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3 pt-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
              {business.business_name}
            </CardTitle>
            {business.average_rating && (
              <div className="flex items-center text-sm text-muted-foreground flex-shrink-0">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                <span className="font-medium">{business.average_rating}</span>
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-xs w-fit">
            {business.business_category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-grow space-y-3 pt-0">
        {business.business_description && (
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
            {business.business_description}
          </p>
        )}

        <div className="space-y-2">
          {(business.business_city || business.business_state) && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
              <span className="text-foreground text-sm">
                {business.business_city}
                {business.business_city && business.business_state && ", "}
                {business.business_state}
              </span>
            </div>
          )}

          {business.business_phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-muted-foreground" />
              <Link
                href={`tel:${business.business_phone}`}
                className="text-foreground hover:text-primary transition-colors"
              >
                {business.business_phone}
              </Link>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-gray-50/30">
        <div className="flex gap-2 w-full">
          <Button
            variant="default"
            size="sm"
            className="flex-1 h-8 text-xs"
            asChild
          >
            <Link href={`/business/${business.id}`}>View Details</Link>
          </Button>

          {business.business_website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs"
              asChild
            >
              <Link
                href={business.business_website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-1 h-3 w-3" />
                Website
              </Link>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
