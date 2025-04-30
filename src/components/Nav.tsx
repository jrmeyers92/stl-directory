import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs";
import {
  Calendar,
  Gem,
  Heart,
  Home,
  Info,
  MapPin,
  Menu,
  Search,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { buttonVariants } from "./ui/button";

const Nav = () => {
  return (
    <nav className="border-b sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 py-3 px-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand Name */}
        <Link
          href="/"
          className="flex gap-2 items-center text-xl font-bold justify-center"
        >
          <Gem className="text-yellow-600" size={28} />
          <span>STL Wedding Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[300px] md:w-[400px] lg:w-[500px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-yellow-500 to-yellow-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/featured-vendors"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Featured Vendors
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Discover top St. Louis wedding professionals
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <CategoryLink
                      href="/categories/venues"
                      title="Venues"
                      icon={<MapPin className="h-4 w-4" />}
                    />
                    <CategoryLink
                      href="/categories/photographers"
                      title="Photographers"
                      icon={<Camera className="h-4 w-4" />}
                    />
                    <CategoryLink
                      href="/categories/caterers"
                      title="Caterers"
                      icon={<Utensils className="h-4 w-4" />}
                    />
                    <CategoryLink
                      href="/top-rated"
                      title="Top Rated"
                      icon={<Star className="h-4 w-4" />}
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/planning-tools"
                    className={navigationMenuTriggerStyle()}
                  >
                    Planning Tools
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/inspiration"
                    className={navigationMenuTriggerStyle()}
                  >
                    Inspiration
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/about" className={navigationMenuTriggerStyle()}>
                    About
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Auth Buttons */}
          <SignedIn>
            <div className="flex items-center gap-4">
              <Link
                href="/favorites"
                className={buttonVariants({ variant: "ghost", size: "icon" })}
                title="Favorites"
              >
                <Heart size={20} />
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          <SignedOut>
            <div className="flex gap-3">
              <Link href="/sign-up" className={buttonVariants({ size: "sm" })}>
                Sign Up
              </Link>
              <Link
                href="/sign-in"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Sign In
              </Link>
            </div>
          </SignedOut>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Link
            href="/search"
            className={buttonVariants({ variant: "ghost", size: "icon" })}
          >
            <Search size={20} />
          </Link>

          <SignedIn>
            <Link
              href="/favorites"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Heart size={20} />
            </Link>
          </SignedIn>

          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>STL Wedding Hub</SheetTitle>
                <SheetDescription>
                  Find wedding professionals in St. Louis
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    Home
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/featured-vendors"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Star className="h-4 w-4 mr-2" />
                    Featured Vendors
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/categories"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Vendor Categories
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/planning-tools"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Planning Tools
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/inspiration"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Inspiration
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    <Info className="h-4 w-4 mr-2" />
                    About
                  </Link>
                </SheetClose>

                <div className="border-t my-2"></div>

                <SignedIn>
                  <div className="flex flex-col gap-3">
                    <SheetClose asChild>
                      <Link href="/dashboard" className={buttonVariants()}>
                        Dashboard
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <SignOutButton>
                        <button
                          className={buttonVariants({ variant: "outline" })}
                        >
                          Sign Out
                        </button>
                      </SignOutButton>
                    </SheetClose>
                  </div>
                </SignedIn>

                <SignedOut>
                  <div className="flex flex-col gap-3">
                    <SheetClose asChild>
                      <Link href="/sign-up" className={buttonVariants()}>
                        Sign Up
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link
                        href="/sign-in"
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Sign In
                      </Link>
                    </SheetClose>
                  </div>
                </SignedOut>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

// Camera and Utensils icons for the dropdown menu
const Camera: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

const Utensils: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
    <path d="M7 2v20" />
    <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
  </svg>
);

// Properly implemented CategoryLink component following shadcn patterns
const CategoryLink = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & {
    title: string;
    icon?: React.ReactNode;
  }
>(({ className, title, icon, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
              {children}
            </p>
          )}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
CategoryLink.displayName = "CategoryLink";

export default Nav;
