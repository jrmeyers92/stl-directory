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
  BookOpen,
  MapPin,
  Menu,
  Search,
  SearchCheck,
  Star,
  Store,
  User,
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
          <BookOpen className="text-yellow-600" size={28} />
          <span className="hidden sm:inline"> St. Louis, MO Directory</span>
          <span className="sm:hidden"> STL Directory</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Explore</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-yellow-500 to-yellow-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/featured"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Featured Businesses
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Discover the most loved local businesses in St.
                            Louis
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <CategoryLink
                      href="/categories/restaurants"
                      title="Restaurants"
                      icon={<Store className="h-4 w-4" />}
                    />
                    <CategoryLink
                      href="/categories/services"
                      title="Services"
                      icon={<User className="h-4 w-4" />}
                    />
                    <CategoryLink
                      href="/categories/neighborhoods"
                      title="Neighborhoods"
                      icon={<MapPin className="h-4 w-4" />}
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
                href="/dashboard"
                className={buttonVariants({ variant: "outline", size: "sm" })}
              >
                Dashboard
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

          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "outline", size: "icon" })}
            >
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>St. Louis Directory</SheetTitle>
                <SheetDescription>Discover local businesses</SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-4 py-4">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/featured"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Featured Businesses
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/categories/restaurants"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Restaurants
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/categories/services"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Services
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/categories/neighborhoods"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Neighborhoods
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/top-rated"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
                    Top Rated
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="flex items-center py-2 px-3 rounded-lg hover:bg-gray-100"
                  >
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

// Properly implemented ListItem component following shadcn patterns
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
