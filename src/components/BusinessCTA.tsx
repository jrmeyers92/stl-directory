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
      <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 shadow-md overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <CardContent className="flex-1 pt-6 px-6 md:px-8">
            <CardTitle className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
              Own a business in St. Louis?
            </CardTitle>
            <CardDescription className="text-base md:text-lg mb-6 text-gray-700">
              Get discovered by local customers looking for the services you
              offer. Join our directory today and grow your local customer base.
            </CardDescription>

            <div className="space-y-4">
              <div className="flex items-start gap-2">
                <div className="bg-yellow-200 p-1.5 rounded-full mt-0.5">
                  <Building className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Increase Local Visibility
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Be found when locals search for businesses like yours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="bg-yellow-200 p-1.5 rounded-full mt-0.5">
                  <MapPin className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Showcase Your Business
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Add photos, services, hours, and highlight what makes you
                    special
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="bg-yellow-200 p-1.5 rounded-full mt-0.5">
                  <Mail className="h-4 w-4 text-yellow-700" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    Connect With Customers
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Receive messages and reviews directly from interested locals
                  </p>
                </div>
              </div>
            </div>

            <CardFooter className="flex px-0 pt-8 pb-2">
              <SignedOut>
                <Link
                  href="/business/register"
                  className={`${buttonVariants()} bg-yellow-600 hover:bg-yellow-700 text-white`}
                >
                  List Your Business <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/business/register"
                  className={`${buttonVariants()} bg-yellow-600 hover:bg-yellow-700 text-white`}
                >
                  List Your Business <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </SignedIn>
            </CardFooter>
          </CardContent>

          {/* Image Block - Hide on smaller screens */}
          <div className="hidden md:block w-80 bg-yellow-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/business-owners.jpg')] bg-cover bg-center opacity-90 transition-transform hover:scale-105 duration-500"></div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BusinessCTA;
