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
        <h1 className="text-4xl md:text-6xl font-bold mb-6">About STL Local</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connecting St. Louis to its vibrant community of local businesses and
          service providers.
        </p>
      </section>

      {/* Our Mission */}
      <section className="mb-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            STL Local was born from a simple idea: make it easier for St. Louis
            residents to discover and support the incredible local businesses
            that make our city unique.
          </p>
          <p className="text-lg mb-4">
            We believe that local businesses are the backbone of our community.
            They create jobs, preserve neighborhood character, and provide
            personalized services that chain stores simply can't match.
          </p>
          <p className="text-lg">
            By connecting residents with local photographers, restaurants,
            shops, contractors, and more, we're helping to build a stronger,
            more resilient local economy for everyone.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <div className="relative h-64 w-full bg-gray-200">
            {/* Replace with your actual image */}
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <span>Image of St. Louis local business</span>
            </div>
            {/* Uncomment when you have an actual image
            <Image
              src="/images/stl-local-business.jpg"
              alt="St. Louis local business"
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
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <CardTitle>Discover</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Browse our comprehensive directory of local St. Louis businesses
                across dozens of categories.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <CardTitle>Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Read reviews, view portfolios, and get in touch directly with
                the businesses that interest you.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <CardTitle>Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Support the local economy by choosing St. Louis businesses for
                your needs and services.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Business Owners */}
      <section className="mb-16 bg-gray-50 rounded-xl p-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            For St. Louis Business Owners
          </h2>
          <p className="text-lg mb-6">
            Are you a local St. Louis business owner? Join our directory to
            increase your visibility, connect with new customers, and be part of
            our mission to strengthen the local economy.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/register">Register Your Business</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/business-faq">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Team (Optional) */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Replace with actual team members or remove this section if not applicable */}
          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>Jane Doe</CardTitle>
              <CardDescription>Founder & CEO</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                St. Louis native with a passion for local businesses and
                community building.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>John Smith</CardTitle>
              <CardDescription>Community Manager</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Connecting businesses with customers and helping the community
                thrive.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4">
                {/* Placeholder for team member photo */}
              </div>
              <CardTitle>Emily Johnson</CardTitle>
              <CardDescription>Lead Developer</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Building the technology that powers our mission to support local
                businesses.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Section */}
      <section>
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg mb-6">
            Have questions or suggestions? We'd love to hear from you!
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
