import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/create-client/server";
import { ArrowLeft, Globe, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const supabase = await createClient();

  // Query businesses by category
  const { data: businesses, error } = await supabase
    .from("stl_directory_businesses")
    .select("*")
    .eq("business_category", category);

  console.log(businesses);

  if (error) {
    console.error("Error fetching businesses:", error);
    throw new Error("Failed to fetch businesses");
  }

  if (businesses.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-8">
        <div>
          <Link
            href="/categories"
            className="flex items-center text-muted-foreground hover:text-primary mb-2"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all categories
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">{category}</h1>
          <p className="text-muted-foreground mt-1">
            Found {businesses.length} business
            {businesses.length !== 1 ? "es" : ""}
          </p>
        </div>
        <Badge variant="outline" className="px-3 py-1 text-sm">
          {category}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <Card
            key={business.id}
            className="overflow-hidden h-full flex flex-col"
          >
            <CardHeader className="pb-2">
              <Image
                src={business.banner_image_url}
                alt={business.business_name}
                width={200}
                height={100}
              />
              <CardTitle>{business.business_name}</CardTitle>
              {business.business_category && (
                <CardDescription>
                  <Badge variant="secondary" className="mt-1">
                    {business.business_category}
                  </Badge>
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              {business.business_description && (
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {business.business_description}
                </p>
              )}
              <div className="space-y-2 mt-2">
                {business.business_address && (
                  <div className="flex items-start text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{business.business_address}</span>
                  </div>
                )}
                {business.business_phone && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{business.business_phone}</span>
                  </div>
                )}

                {business.business_website && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Globe className="h-4 w-4 mr-2 flex-shrink-0" />
                    <Link
                      href={business.business_website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      {business.business_website}
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
            {business.business_website && (
              <CardFooter className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link
                    href={business.business_website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Visit Website
                  </Link>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
