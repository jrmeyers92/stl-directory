import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";

interface BusinessInfoProps {
  business: {
    business_name: string;
    business_category: string;
    business_description?: string | null;
    average_rating?: number | null;
    review_count?: number | null;
  };
}

export default function BusinessInfo({ business }: BusinessInfoProps) {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {business.business_name}
              </h1>
              <Badge variant="secondary" className="w-fit">
                {business.business_category}
              </Badge>
            </div>

            {business.average_rating && (
              <div className="flex items-center space-x-1 bg-amber-50 px-3 py-2 rounded-lg">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-lg">
                  {Number(business.average_rating).toFixed(1)}
                </span>
                <span className="text-gray-600">
                  ({business.review_count || 0} reviews)
                </span>
              </div>
            )}
          </div>

          {business.business_description && (
            <>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-3">About</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {business.business_description}
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}