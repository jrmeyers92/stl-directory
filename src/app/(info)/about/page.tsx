// app/about/page.jsx
import Link from "next/link";

// Import shadcn components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          About STL Weddings
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your premier destination for discovering exceptional wedding vendors
          and service providers throughout the St. Louis area.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            STL Weddings was created with one goal in mind: to connect engaged
            couples with the most talented wedding professionals in the St.
            Louis region, making wedding planning easier and more enjoyable.
          </p>
          <p className="text-lg mb-4">
            We believe your wedding day should be perfect, and that starts with
            finding the right team of vendors who understand your vision. From
            photographers who capture every precious moment to caterers who
            create unforgettable dining experiences, we&apos;ve curated the best
            wedding professionals in St. Louis.
          </p>
          <p className="text-lg">
            By connecting couples with exceptional local wedding vendors,
            we&apos;re helping create magical moments while supporting the
            talented professionals who make St. Louis weddings truly special.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <div className="relative h-64 w-full bg-gray-200">
            {/* Replace with your actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span>Beautiful St. Louis wedding venue</span>
            </div>
            {/* Uncomment when you have an actual image
            <Image
              src="/images/stl-wedding-venue.jpg"
              alt="Beautiful St. Louis wedding"
              fill
              className="object-cover"
            />
            */}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-rose-600 text-xl font-bold">1</span>
              </div>
              <CardTitle>Browse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Explore our curated directory of wedding vendors including
                photographers, venues, caterers, florists, and more.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-rose-600 text-xl font-bold">2</span>
              </div>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                View portfolios, read reviews from real couples, and contact
                vendors directly to discuss your wedding vision.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-rose-600 text-xl font-bold">3</span>
              </div>
              <CardTitle>Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Book the perfect team of wedding professionals and plan the St.
                Louis wedding of your dreams.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Wedding Vendors */}
      <section className="mb-16 bg-rose-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">For Wedding Professionals</h2>
          <p className="text-lg mb-6">
            Are you a wedding vendor in the St. Louis area? Join our platform to
            showcase your work, connect with engaged couples, and grow your
            wedding business with quality leads.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Join as a Vendor</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/vendor-info">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>Sarah Mitchell</CardTitle>
              <CardDescription>Founder & Wedding Specialist</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Former wedding planner with 8 years of experience helping St.
                Louis couples create their perfect day.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>Michael Torres</CardTitle>
              <CardDescription>Vendor Relations Manager</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Connecting exceptional wedding vendors with couples and
                maintaining our high standards for quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>Emma Chen</CardTitle>
              <CardDescription>Customer Experience Lead</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Ensuring every couple has an amazing experience finding their
                dream wedding team through our platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="bg-rose-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg mb-6">
            Planning your wedding or have questions about our platform?
            We&apos;re here to help make your wedding planning journey seamless!
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
