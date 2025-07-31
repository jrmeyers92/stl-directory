import SaveBusinessButton from "@/components/SaveBusinessButton";
import ShareButton from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Eye, Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

interface BusinessSidebarProps {
  business: {
    id: string;
    business_name: string;
    business_address?: string | null;
    business_city?: string | null;
    business_state?: string | null;
    business_zip?: string | null;
    business_phone?: string | null;
    business_email?: string | null;
    business_website?: string | null;
    view_count?: number | null;
  };
  user: any;
  userHasSaved: boolean;
}

export default function BusinessSidebar({
  business,
  user,
  userHasSaved,
}: BusinessSidebarProps) {
  return (
    <Card className="bg-white shadow-lg sticky top-4">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
        <div className="space-y-4">
          {(business.business_address || business.business_city) && (
            <div className="flex items-start space-x-3">
              <MapPin className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" />
              <div>
                {business.business_address && (
                  <p className="font-medium">{business.business_address}</p>
                )}
                <p className="text-gray-600">
                  {business.business_city}
                  {business.business_city && business.business_state && ", "}
                  {business.business_state} {business.business_zip}
                </p>
              </div>
            </div>
          )}

          {business.business_phone && (
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <Link
                href={`tel:${business.business_phone}`}
                className="text-primary hover:text-primary/80 font-medium"
              >
                {business.business_phone}
              </Link>
            </div>
          )}

          {business.business_email && (
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <Link
                href={`mailto:${business.business_email}`}
                className="text-primary hover:text-primary/80 font-medium break-all"
              >
                {business.business_email}
              </Link>
            </div>
          )}

          {business.business_website && (
            <div className="flex items-center space-x-3">
              <Globe className="h-5 w-5 text-gray-500 flex-shrink-0" />
              <Link
                href={business.business_website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-medium break-all"
              >
                Visit Website
              </Link>
            </div>
          )}
        </div>

        <Separator className="my-6" />

        {/* Action Buttons */}
        <div className="space-y-3">
          {business.business_phone && (
            <Button className="w-full" size="lg" asChild>
              <Link href={`tel:${business.business_phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </Link>
            </Button>
          )}

          {business.business_website && (
            <Button variant="outline" className="w-full" size="lg" asChild>
              <Link
                href={business.business_website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Globe className="mr-2 h-4 w-4" />
                Visit Website
              </Link>
            </Button>
          )}

          <div className="flex gap-2">
            {user && (
              <SaveBusinessButton
                businessId={business.id}
                isSaved={userHasSaved}
              />
            )}
            <ShareButton
              businessName={business.business_name}
              businessId={business.id}
            />
          </div>
        </div>

        {/* Stats */}
        {business.view_count !== undefined && (
          <>
            <Separator className="my-4" />
            <div className="flex items-center justify-center text-sm text-gray-500">
              <Eye className="mr-1 h-4 w-4" />
              {business.view_count || 0} views
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}