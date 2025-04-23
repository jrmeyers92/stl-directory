import {
  ArrowRight,
  Camera,
  Car,
  Coffee,
  Hammer,
  Home,
  MapPin,
  Search,
  ShoppingBag,
  Star,
  Users,
  Utensils,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample featured businesses data
const featuredBusinesses = [
  {
    id: 1,
    name: "Riverfront Café",
    category: "Restaurants",
    neighborhood: "Downtown",
    rating: 4.8,
    reviewCount: 124,
    image: "/businesses/cafe.jpg",
    tags: ["Coffee", "Breakfast", "Lunch"],
  },
  {
    id: 2,
    name: "Gateway Home Services",
    category: "Contractors",
    neighborhood: "Multiple Locations",
    rating: 4.7,
    reviewCount: 89,
    image: "/businesses/contractor.jpg",
    tags: ["Plumbing", "Electrical", "Remodeling"],
  },
  {
    id: 3,
    name: "StL Moments Photography",
    category: "Photographers",
    neighborhood: "Central West End",
    rating: 4.9,
    reviewCount: 56,
    image: "/businesses/photographer.jpg",
    tags: ["Weddings", "Portraits", "Events"],
  },
  {
    id: 4,
    name: "Forest Park Boutique",
    category: "Retail",
    neighborhood: "Forest Park",
    rating: 4.6,
    reviewCount: 72,
    image: "/businesses/boutique.jpg",
    tags: ["Clothing", "Gifts", "Local Goods"],
  },
];

// Sample neighborhood data
const neighborhoods = [
  {
    name: "Downtown",
    businessCount: 124,
    image: "/neighborhoods/downtown.jpg",
    slug: "downtown",
  },
  {
    name: "Central West End",
    businessCount: 98,
    image: "/neighborhoods/cwe.jpg",
    slug: "central-west-end",
  },
  {
    name: "The Hill",
    businessCount: 76,
    image: "/neighborhoods/the-hill.jpg",
    slug: "the-hill",
  },
  {
    name: "Soulard",
    businessCount: 87,
    image: "/neighborhoods/soulard.jpg",
    slug: "soulard",
  },
  {
    name: "The Loop",
    businessCount: 105,
    image: "/neighborhoods/the-loop.jpg",
    slug: "the-loop",
  },
  {
    name: "Cherokee Street",
    businessCount: 68,
    image: "/neighborhoods/cherokee.jpg",
    slug: "cherokee-street",
  },
];

// Sample recent reviews
const recentReviews = [
  {
    id: 1,
    businessName: "Tower Grove Bakery",
    userName: "Sarah L.",
    rating: 5,
    text: "Absolutely the best sourdough in the city! The staff is incredibly friendly and they always have seasonal specials worth trying.",
    date: "2 days ago",
  },
  {
    id: 2,
    businessName: "South City Auto Repair",
    userName: "Michael T.",
    rating: 4,
    text: "Fair prices and honest service. They fixed my car in one day and didn't try to upsell me on unnecessary repairs.",
    date: "5 days ago",
  },
  {
    id: 3,
    businessName: "Midtown Fitness Studio",
    userName: "Jessica R.",
    rating: 5,
    text: "Amazing instructors and a welcoming atmosphere. They offer a variety of class times that work with my busy schedule.",
    date: "1 week ago",
  },
];

const HomeSection = () => {
  return (
    <main className="max-w-7xl mx-auto px-4">
      {/* Categories Section */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Explore St. Louis Businesses
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated local businesses across all categories in St.
            Louis. From restaurants to contractors, find exactly what you need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <CategoryCard
            title="Restaurants"
            icon={<Utensils />}
            count={348}
            href="/categories/restaurants"
          />
          <CategoryCard
            title="Retail"
            icon={<ShoppingBag />}
            count={276}
            href="/categories/retail"
          />
          <CategoryCard
            title="Contractors"
            icon={<Hammer />}
            count={194}
            href="/categories/contractors"
          />
          <CategoryCard
            title="Photographers"
            icon={<Camera />}
            count={87}
            href="/categories/photographers"
          />
          <CategoryCard
            title="Auto Services"
            icon={<Car />}
            count={153}
            href="/categories/auto-services"
          />
          <CategoryCard
            title="Coffee Shops"
            icon={<Coffee />}
            count={112}
            href="/categories/coffee-shops"
          />
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link href="/categories">
              View All Categories <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured Businesses Section */}
      <section className="py-12 bg-gray-50 rounded-xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">
              Featured St. Louis Businesses
            </h2>
            <p className="text-gray-600">
              Highlighted local businesses that St. Louisans love
            </p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0" asChild>
            <Link href="/featured">View All Featured</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </section>

      {/* Explore By Neighborhood Section */}
      <section className="py-12 md:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Explore By Neighborhood</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find the best local businesses in your favorite St. Louis
            neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {neighborhoods.map((neighborhood) => (
            <NeighborhoodCard
              key={neighborhood.name}
              neighborhood={neighborhood}
            />
          ))}
        </div>
      </section>

      {/* Activity Section */}
      <section className="py-12 bg-gray-50 rounded-xl px-6 mb-16">
        <h2 className="text-3xl font-bold mb-8">Latest Community Activity</h2>

        <Tabs defaultValue="reviews">
          <TabsList className="w-full md:w-auto justify-start mb-6">
            <TabsTrigger value="reviews">Recent Reviews</TabsTrigger>
            <TabsTrigger value="popular">Popular Places</TabsTrigger>
            <TabsTrigger value="new">Newly Added</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-4">
            {recentReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}

            <div className="text-center mt-8">
              <Button variant="outline" asChild>
                <Link href="/reviews">See More Reviews</Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="popular">
            <div className="h-60 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                Popular businesses will appear here
              </p>
            </div>
          </TabsContent>

          <TabsContent value="new">
            <div className="h-60 flex items-center justify-center bg-gray-100 rounded-lg">
              <p className="text-gray-500">
                Newly added businesses will appear here
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Community Stats Section */}
      <section className="py-12 mb-16 border-y">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCard
            title="Local Businesses"
            value="1,200+"
            icon={<Home className="h-8 w-8 mb-3" />}
          />
          <StatCard
            title="St. Louisans"
            value="25,000+"
            icon={<Users className="h-8 w-8 mb-3" />}
          />
          <StatCard
            title="Reviews"
            value="18,500+"
            icon={<Star className="h-8 w-8 mb-3" />}
          />
          <StatCard
            title="Neighborhoods"
            value="78"
            icon={<MapPin className="h-8 w-8 mb-3" />}
          />
        </div>
      </section>
    </main>
  );
};

// Helper Components

const CategoryCard = ({ title, icon, count, href }) => {
  return (
    <Link href={href}>
      <div className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow p-5 text-center h-full">
        <div className="text-yellow-600 mb-3 flex justify-center">
          {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{count} businesses</p>
      </div>
    </Link>
  );
};

const BusinessCard = ({ business }) => {
  return (
    <Card className="overflow-hidden h-full">
      <div className="aspect-video relative">
        <Image
          src="/api/placeholder/600/320"
          alt={business.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{business.name}</CardTitle>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium">{business.rating}</span>
          </div>
        </div>
        <CardDescription>
          {business.category} · {business.neighborhood}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1">
          {business.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-gray-100">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full" asChild>
          <Link href={`/business/${business.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const NeighborhoodCard = ({ neighborhood }) => {
  return (
    <Link href={`/neighborhoods/${neighborhood.slug}`}>
      <div className="relative rounded-lg overflow-hidden group h-48">
        <Image
          src="/api/placeholder/600/320"
          alt={neighborhood.name}
          fill
          className="object-cover transition-transform group-hover:scale-105 duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">{neighborhood.name}</h3>
          <p className="text-sm">{neighborhood.businessCount} businesses</p>
        </div>
      </div>
    </Link>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div>
            <CardTitle className="text-base">{review.businessName}</CardTitle>
            <CardDescription>
              Reviewed by {review.userName} · {review.date}
            </CardDescription>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 text-sm">{review.text}</p>
      </CardContent>
    </Card>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-yellow-600">{icon}</div>
      <p className="text-3xl font-bold mb-1">{value}</p>
      <p className="text-gray-600">{title}</p>
    </div>
  );
};

export default HomeSection;
