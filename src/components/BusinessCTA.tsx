import { SignedIn, SignedOut } from "@clerk/nextjs";
import { ArrowRight, Building, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

const BusinessCTA = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <Card className="bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 border-rose-200 shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <CardContent className="flex-1 pt-6 px-6 md:px-8">
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-rose-100 text-rose-700 text-sm font-medium rounded-full">
                <Building className="mr-2 h-4 w-4" />
                For Wedding Vendors
              </span>
            </div>
            <CardTitle className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Are you a wedding professional?
            </CardTitle>
            <CardDescription className="text-base md:text-lg mb-6 text-gray-700 leading-relaxed">
              Connect with engaged couples planning their dream weddings in St. Louis. Showcase your expertise and grow your wedding business with our trusted directory.
            </CardDescription>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-rose-200 to-pink-200 p-2 rounded-full mt-0.5 shadow-sm">
                  <Building className="h-4 w-4 text-rose-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Reach Engaged Couples
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Connect with couples actively planning their weddings in the St. Louis area
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-rose-200 to-pink-200 p-2 rounded-full mt-0.5 shadow-sm">
                  <MapPin className="h-4 w-4 text-rose-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Showcase Your Wedding Portfolio
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Display your stunning wedding photos, packages, and services to attract dream clients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-gradient-to-br from-rose-200 to-pink-200 p-2 rounded-full mt-0.5 shadow-sm">
                  <Mail className="h-4 w-4 text-rose-700" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    Build Your Wedding Reputation
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Collect reviews from happy couples and build trust with future clients
                  </p>
                </div>
              </div>
            </div>

            <CardFooter className="flex px-0 pt-8 pb-2">
              <SignedOut>
                <Link
                  href="/business/register"
                  className={`${buttonVariants()} bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3`}
                >
                  Join Our Wedding Directory <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/business/register"
                  className={`${buttonVariants()} bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3`}
                >
                  Join Our Wedding Directory <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </SignedIn>
            </CardFooter>
          </CardContent>

          {/* Image Block - Hide on smaller screens */}
          <div className="hidden md:block w-80 bg-gradient-to-br from-rose-400 to-pink-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/business-owners.jpg')] bg-cover bg-center opacity-90 transition-transform hover:scale-105 duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-rose-600/30 to-transparent"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessCTA;
