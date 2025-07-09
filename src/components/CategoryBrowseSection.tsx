"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategorySlug } from "@/data/businessCategory";
import { createClient } from "@/utils/supabase/create-client/client";
import {
  Cake,
  Calendar,
  Camera,
  Car,
  ChevronDown,
  ChevronUp,
  Film,
  Gem,
  Gift,
  Home,
  Hotel,
  Lightbulb,
  Mic,
  Music,
  Pen,
  Scissors,
  Shirt,
  Sparkles,
  Tags,
  Truck,
  User,
  Utensils,
  Wine,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Map categories to icons
const categoryIcons: Record<string, typeof Gift> = {
  "Wedding Planners": Calendar,
  "Day-of Coordinators": Calendar,
  Venues: Home,
  Photographers: Camera,
  Videographers: Film,
  Florists: Gift,
  Caterers: Utensils,
  "Cake Designers": Cake,
  DJs: Music,
  "Live Bands": Mic,
  "Ceremony Musicians": Music,
  Officiants: User,
  "Transportation Services": Car,
  "Bridal Shops": Shirt,
  "Tuxedo & Suit Rentals": Shirt,
  "Hair/Makeup Artists": Scissors,
  "Jewelry Stores": Gem,
  "Invitation Designers": Pen,
  "Decor Rental Companies": Sparkles,
  "Lighting Specialists": Lightbulb,
  "Photo Booth Providers": Camera,
  "Hotels for Guests": Hotel,
  "Rehearsal Dinner Venues": Home,
  "Bartending Services": Wine,
  "Rental Companies": Truck,
  "Tailors & Alterations": Scissors,
  "Mobile Bars": Wine,
};

const DefaultIcon = Tags;

const CategoryBrowseSection = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [loading, setLoading] = useState(true);

  // Calculate how many categories to show per row based on screen size
  const itemsPerRow = 5;
  const initialRows = 2;
  const initialCategories = itemsPerRow * initialRows;

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const supabase = createClient();

      // Query unique business categories
      const { data, error } = await supabase
        .from("stl_directory_businesses")
        .select("business_category")
        .not("business_category", "is", null);

      if (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
        return;
      }

      // Create a map to count businesses per category
      const categoryMap = data.reduce((acc, item) => {
        const category = item.business_category;
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      // Get unique, sorted categories
      const uniqueCategories = Object.keys(categoryMap).sort();

      setCategories(uniqueCategories);
      setCategoryCounts(categoryMap);
      setLoading(false);
    };

    fetchCategories();
  }, []);

  // Categories to display based on state
  const displayedCategories = showAllCategories
    ? categories
    : categories.slice(0, initialCategories);

  const getCategoryIcon = (categoryName: string) => {
    const IconComponent = categoryIcons[categoryName] || DefaultIcon;
    return <IconComponent className="h-10 w-10 mb-2" />;
  };

  if (loading) {
    return (
      <section className="py-16 w-full">
        <div className="container mx-auto px-4 text-center">
          <p>Loading categories...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 w-full">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">
            Browse Business Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Find the perfect businesses for your needs in St. Louis
          </p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8">
            <p>No business categories found. Please check back later.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {displayedCategories.map((category) => (
                <Link
                  key={category}
                  href={`/categories/${encodeURIComponent(
                    getCategorySlug(category)
                  )}`}
                >
                  <Card className="cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full">
                    <CardContent className="flex flex-col items-center justify-center text-center p-6">
                      {getCategoryIcon(category)}
                      <h3 className="font-semibold mb-1">{category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryCounts[category]}{" "}
                        {categoryCounts[category] === 1
                          ? "business"
                          : "businesses"}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {categories.length > initialCategories && (
              <div className="mt-10 text-center">
                <Button
                  onClick={() => setShowAllCategories(!showAllCategories)}
                  variant="outline"
                  className="px-6"
                >
                  {showAllCategories ? (
                    <>
                      <span className="mr-2">Show Less</span>
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      <span className="mr-2">See More Categories</span>
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default CategoryBrowseSection;
