import { Badge } from "@/components/ui/badge";

import { CheckCircle, Heart, Sparkles, Star } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full min-h-[500px] h-[70vh] md:h-[600px] lg:h-[700px] bg-gray-900">
      {/* Hero Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/homepageHero.jpg"
          alt="St. Louis Wedding Scene"
          className="w-full h-full object-cover"
        />
        {/* Strong dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/50"></div>
        {/* Romantic gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 via-pink-900/25 to-purple-900/20"></div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float">
          <Sparkles className="h-6 w-6 text-rose-300/30" />
        </div>
        <div className="absolute top-40 right-32 animate-float-delayed">
          <Heart className="h-4 w-4 text-pink-300/40" />
        </div>
        <div className="absolute bottom-32 left-16 animate-float">
          <Sparkles className="h-5 w-5 text-rose-300/25" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8 max-w-7xl mx-auto">
        <div className="mb-6">
          <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-white text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            <Heart className="mr-2 h-4 w-4 text-rose-200" />
            St. Louis Wedding Directory
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight ">
          Your Dream Wedding
          <br />
          <span className="bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent ">
            Starts Here
          </span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl leading-relaxed font-light drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          Discover extraordinary wedding professionals in St. Louis who will
          bring your vision to life with elegance and perfection
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

        {/* Trust Badges with wedding elegance */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-2">
          <Badge
            variant="secondary"
            className="bg-white/95 backdrop-blur-sm py-3 px-4 sm:px-5 text-gray-800 font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <CheckCircle className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-emerald-600" />
            Verified Wedding Experts
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/95 backdrop-blur-sm py-3 px-4 sm:px-5 text-gray-800 font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Star className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-rose-500" />
            Loved by Couples
          </Badge>
          <Badge
            variant="secondary"
            className="bg-white/95 backdrop-blur-sm py-3 px-4 sm:px-5 text-gray-800 font-medium text-xs sm:text-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Heart className="mr-2 h-3 w-3 sm:h-4 sm:w-4 text-pink-600" />
            St. Louis Specialists
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default Hero;
