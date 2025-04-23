import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Heart, Search, Star } from "lucide-react";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="relative w-full h-[600px]">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/homepageHero.jpg"
          alt="St. Louis Skyline with Arch"
          fill
          priority
          className="object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Discover St. Louis<span className="text-yellow-400">'s Finest</span>
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl">
          Your trusted directory of local businesses, artisans, and service
          providers in the Gateway City
        </p>

        {/* Search Bar using shadcn components */}
        <div className="w-full max-w-2xl">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="What are you looking for?"
                className="pl-9 bg-white h-12"
              />
            </div>

            <Select>
              <SelectTrigger className="md:w-48 h-12 bg-white">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="restaurants">Restaurants</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="contractors">Contractors</SelectItem>
                  <SelectItem value="photographers">Photographers</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              Search
            </Button>
          </div>
        </div>

        {/* Trust Badges using shadcn Badge component - improved for ADA compliance */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Badge
            variant="secondary"
            className="bg-white py-2 px-4 text-gray-900 font-medium text-sm border border-gray-200 shadow-sm"
          >
            <CheckCircle className="mr-2 h-4 w-4 text-green-600" /> Verified
            Local Businesses
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white py-2 px-4 text-gray-900 font-medium text-sm border border-gray-200 shadow-sm"
          >
            <Star className="mr-2 h-4 w-4 text-amber-500" /> Trusted Reviews
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white py-2 px-4 text-gray-900 font-medium text-sm border border-gray-200 shadow-sm"
          >
            <Heart className="mr-2 h-4 w-4 text-red-600" /> Support Local
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Hero;
