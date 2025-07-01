import { Badge } from "@/components/ui/badge";

import { CheckCircle, Heart, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[500px] h-[70vh] md:h-[600px] lg:h-[700px]">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/homepageHero.jpg"
          alt="St. Louis Wedding Scene"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
          Your Perfect Wedding in St. Louis
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl leading-relaxed">
          Find trusted wedding professionals to make your special day
          unforgettable
        </p>

        {/* Search Bar using shadcn components */}
        {/* <div className="w-full max-w-2xl">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for wedding vendors"
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
                  {businessCategories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category.toLowerCase().replace(/\s+/g, "-")}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button className="h-12 bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              Search
            </Button>
          </div>
        </div> */}

        {/* Trust Badges using shadcn Badge component - improved for mobile */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-2">
          <Badge
            variant="secondary"
            className="bg-white py-2 px-3 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm border border-gray-200 shadow-sm"
          >
            <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
            Verified Wedding Professionals
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white py-2 px-3 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm border border-gray-200 shadow-sm"
          >
            <Star className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />
            Trusted Reviews
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white py-2 px-3 sm:px-4 text-gray-900 font-medium text-xs sm:text-sm border border-gray-200 shadow-sm"
          >
            <Heart className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
            Local Expertise
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Hero;
