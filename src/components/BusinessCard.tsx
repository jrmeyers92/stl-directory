import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Business from "@/schemas/businessSchema";
import { Globe, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

interface BusinessCardProps {
  business: Business;
}

export default function BusinessCard({ business }: BusinessCardProps) {
  return (
    <Card className="group overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 border-0 shadow-md bg-white hover:-translate-y-1">
      {/* Banner Image Header */}
      <div className="relative h-32 overflow-hidden">
        {business.banner_image_url ? (
          <>
            <img
              src={business.banner_image_url}
              alt={business.business_name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100" />
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
            <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs px-3 py-1 shadow-lg">
              ✨ Featured
            </Badge>
          </div>
        )}

        {/* Verified badge */}
        {business.is_verified && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white text-xs px-3 py-1 shadow-lg">
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
                <Star className="h-4 w-4 fill-rose-400 text-rose-400 mr-1" />
                <span className="font-medium text-rose-600">{business.average_rating}</span>
              </div>
            )}
          </div>
          <Badge variant="secondary" className="text-xs w-fit bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100">
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

      <CardFooter className="pt-3 border-t bg-gradient-to-r from-rose-50/30 to-pink-50/30">
        <div className="flex gap-2 w-full">
          <Button
            variant="default"
            size="sm"
            className="flex-1 h-8 text-xs bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-0"
            asChild
          >
            <Link href={`/business/${business.id}`}>View Details</Link>
          </Button>

          {business.business_website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs border-rose-200 text-rose-700 hover:bg-rose-50 hover:border-rose-300"
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
