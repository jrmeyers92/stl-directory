"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle,
  CreditCard,
  HelpCircle,
  Info,
  Mail,
  MessageCircle,
  Phone,
  Search,
  Settings,
  Shield,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  featured?: boolean;
}

interface FAQCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      id: "business-listings",
      name: "Business Listings",
      description: "Questions about adding and managing your business",
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: "reviews",
      name: "Reviews & Ratings",
      description: "Understanding our review system",
      icon: Star,
      color: "bg-amber-500",
    },
    {
      id: "account",
      name: "Account & Profile",
      description: "Managing your account settings",
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "verification",
      name: "Verification",
      description: "Getting verified and trusted status",
      icon: Shield,
      color: "bg-purple-500",
    },
    {
      id: "pricing",
      name: "Pricing & Plans",
      description: "Information about our pricing structure",
      icon: CreditCard,
      color: "bg-pink-500",
    },
    {
      id: "technical",
      name: "Technical Support",
      description: "Technical issues and troubleshooting",
      icon: Settings,
      color: "bg-gray-500",
    },
  ];

  const faqs: FAQItem[] = [
    // Business Listings
    {
      id: "how-to-list",
      question: "How do I list my business on your platform?",
      answer:
        "Listing your business is simple and free! Click the 'Add Business' button in the header, fill out the required information including your business name, category, location, and description. You can also add photos, contact information, and business hours. Once submitted, your listing will be reviewed and published within 24 hours.",
      category: "business-listings",
      tags: ["listing", "add business", "getting started"],
      featured: true,
    },
    {
      id: "edit-listing",
      question: "Can I edit my business information after it's published?",
      answer:
        "Yes! If you're the verified owner of a business, you can edit your listing at any time. Simply log in to your account, navigate to 'My Businesses' and click 'Edit' on your listing. Changes to basic information are applied immediately, while major changes may require re-verification.",
      category: "business-listings",
      tags: ["edit", "update", "modify"],
    },
    {
      id: "listing-requirements",
      question: "What information is required to create a business listing?",
      answer:
        "Required information includes: business name, category, phone number or email, and business address. Optional but recommended: business description, photos, website, social media links, and business hours. The more complete your listing, the better it will perform in search results.",
      category: "business-listings",
      tags: ["requirements", "information", "mandatory"],
    },
    {
      id: "multiple-locations",
      question: "Can I list multiple locations for my business?",
      answer:
        "Yes, you can create separate listings for each location. Each location should have its own unique address and can have location-specific information like hours, phone numbers, and staff. This helps customers find the location most convenient for them.",
      category: "business-listings",
      tags: ["multiple locations", "chain", "branches"],
    },
    {
      id: "delete-listing",
      question: "How do I remove my business listing?",
      answer:
        "To remove your listing, log in to your account, go to 'My Businesses', and click 'Delete' on the listing you want to remove. Note that this action is permanent and will remove all associated reviews and data. If you're temporarily closing, consider marking your business as 'Temporarily Closed' instead.",
      category: "business-listings",
      tags: ["delete", "remove", "close"],
    },

    // Reviews & Ratings
    {
      id: "review-system",
      question: "How does your review system work?",
      answer:
        "Our review system allows verified customers to leave honest feedback about businesses. Reviews include a 1-5 star rating and written comments. We use verification methods to ensure reviews are from real customers. Business owners can respond to reviews, and we moderate content to maintain quality and authenticity.",
      category: "reviews",
      tags: ["reviews", "ratings", "system"],
      featured: true,
    },
    {
      id: "respond-to-reviews",
      question: "Can I respond to reviews of my business?",
      answer:
        "Yes! As a verified business owner, you can respond to any review left for your business. This is a great way to address concerns, thank customers, and show that you value feedback. Responses are public and help potential customers see how you interact with your clientele.",
      category: "reviews",
      tags: ["respond", "reply", "owner response"],
    },
    {
      id: "fake-reviews",
      question: "What do you do about fake or inappropriate reviews?",
      answer:
        "We take review authenticity seriously. Our moderation team reviews flagged content and uses various verification methods to detect fake reviews. Inappropriate content, spam, or reviews that violate our guidelines are removed. You can report suspicious reviews using the 'Report' button.",
      category: "reviews",
      tags: ["fake reviews", "moderation", "report"],
    },
    {
      id: "review-guidelines",
      question: "What are the guidelines for writing reviews?",
      answer:
        "Reviews should be honest, specific, and based on actual experiences. Include details about what you liked or disliked, but avoid personal attacks or discriminatory language. Photos are welcome if they're relevant to your experience. Reviews should focus on the business service, not personal issues with individual staff members.",
      category: "reviews",
      tags: ["guidelines", "writing reviews", "rules"],
    },

    // Account & Profile
    {
      id: "create-account",
      question: "Do I need an account to use your platform?",
      answer:
        "You can browse businesses without an account, but you'll need to create one to leave reviews, save favorite businesses, or list your own business. Creating an account is free and only takes a minute. You can sign up with your email or social media accounts.",
      category: "account",
      tags: ["account", "registration", "sign up"],
    },
    {
      id: "account-security",
      question: "How do you protect my personal information?",
      answer:
        "We use industry-standard encryption and security measures to protect your data. Your personal information is never sold to third parties. You can control your privacy settings and choose what information is publicly visible. We comply with all relevant privacy laws and regulations.",
      category: "account",
      tags: ["security", "privacy", "data protection"],
    },
    {
      id: "forgot-password",
      question: "What should I do if I forget my password?",
      answer:
        "Click the 'Forgot Password' link on the login page and enter your email address. We'll send you a secure link to reset your password. If you don't receive the email within a few minutes, check your spam folder. For additional help, contact our support team.",
      category: "account",
      tags: ["password", "reset", "login"],
    },

    // Verification
    {
      id: "business-verification",
      question: "How do I get my business verified?",
      answer:
        "Business verification confirms you're the legitimate owner. The process involves verifying your business registration, providing documentation, and confirming your authority to represent the business. Verified businesses get a special badge and increased trust from customers. Start the verification process from your business dashboard.",
      category: "verification",
      tags: ["verification", "verified badge", "trust"],
      featured: true,
    },
    {
      id: "verification-requirements",
      question: "What documents do I need for verification?",
      answer:
        "Required documents typically include: business registration or license, proof of address matching your business location, and government-issued ID. Additional documents may be requested based on your business type. All documents are reviewed securely and deleted after verification.",
      category: "verification",
      tags: ["documents", "requirements", "proof"],
    },
    {
      id: "verification-time",
      question: "How long does verification take?",
      answer:
        "Most verifications are completed within 2-3 business days. Complex cases or businesses requiring additional documentation may take up to 1 week. You'll receive email updates throughout the process. Once verified, you'll immediately see the verified badge on your listing.",
      category: "verification",
      tags: ["timeline", "process", "duration"],
    },

    // Pricing & Plans
    {
      id: "free-listings",
      question: "Are business listings really free?",
      answer:
        "Yes! Basic business listings are completely free and include all essential features: business information, photos, customer reviews, and basic analytics. There are no hidden fees or time limits. We also offer premium features for businesses wanting enhanced visibility and additional tools.",
      category: "pricing",
      tags: ["free", "cost", "basic plan"],
      featured: true,
    },
    {
      id: "premium-features",
      question: "What premium features are available?",
      answer:
        "Premium features include: featured listing placement, advanced analytics, priority customer support, additional photos, promotional banners, and social media integration. Premium plans start at $19/month and offer significant visibility improvements.",
      category: "pricing",
      tags: ["premium", "paid features", "upgrade"],
    },
    {
      id: "cancel-premium",
      question: "Can I cancel my premium plan anytime?",
      answer:
        "Yes, you can cancel your premium plan at any time. Your premium features will continue until the end of your current billing period, after which your listing will revert to the free plan. No cancellation fees apply, and you can upgrade again anytime.",
      category: "pricing",
      tags: ["cancel", "downgrade", "billing"],
    },

    // Technical Support
    {
      id: "technical-issues",
      question: "I'm experiencing technical issues. What should I do?",
      answer:
        "First, try refreshing your browser or clearing your cache. If the problem persists, check our status page for known issues. For ongoing problems, contact our support team with details about your browser, device, and the specific issue you're experiencing.",
      category: "technical",
      tags: ["bugs", "issues", "troubleshooting"],
    },
    {
      id: "browser-compatibility",
      question: "Which browsers are supported?",
      answer:
        "Our platform works best on modern browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your preferred browser for optimal performance. Mobile browsers are fully supported on both iOS and Android devices.",
      category: "technical",
      tags: ["browsers", "compatibility", "mobile"],
    },
    {
      id: "mobile-app",
      question: "Do you have a mobile app?",
      answer:
        "Currently, we offer a mobile-optimized website that works great on all devices. A dedicated mobile app is in development and will be available soon. You can add our website to your home screen for an app-like experience.",
      category: "technical",
      tags: ["mobile app", "mobile", "app"],
    },
  ];

  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter((faq) => faq.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (faq) =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query) ||
          faq.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const featuredFAQs = faqs.filter((faq) => faq.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Find answers to common questions about our business directory
              platform. Can't find what you're looking for? We're here to help!
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg bg-white/10 border-white/20 text-white placeholder-blue-200 focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Featured FAQs */}
        {!selectedCategory && !searchQuery && (
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Most Popular Questions
              </h2>
              <p className="text-lg text-gray-600">
                Quick answers to the questions we hear most often
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFAQs.map((faq) => (
                <Card
                  key={faq.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <HelpCircle className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                          {faq.question}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="mr-2 h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    variant={selectedCategory === null ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                    <Badge variant="secondary" className="ml-auto">
                      {faqs.length}
                    </Badge>
                  </Button>
                  {categories.map((category) => {
                    const IconComponent = category.icon;
                    const categoryFAQs = faqs.filter(
                      (faq) => faq.category === category.id
                    );

                    return (
                      <Button
                        key={category.id}
                        variant={
                          selectedCategory === category.id ? "default" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {category.name}
                        <Badge variant="secondary" className="ml-auto">
                          {categoryFAQs.length}
                        </Badge>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Contact Support */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Still Need Help?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    Can't find the answer you're looking for? Our support team
                    is here to help!
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full" asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Contact Support
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="tel:+15551234567">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Content */}
          <div className="lg:col-span-3">
            {/* Search Results Header */}
            {(searchQuery || selectedCategory) && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {searchQuery
                        ? "Search Results"
                        : selectedCategory
                        ? categories.find((c) => c.id === selectedCategory)
                            ?.name
                        : "All FAQs"}
                    </h2>
                    <p className="text-gray-600">
                      {filteredFAQs.length}{" "}
                      {filteredFAQs.length === 1 ? "question" : "questions"}{" "}
                      found
                    </p>
                  </div>
                  {(searchQuery || selectedCategory) && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory(null);
                      }}
                    >
                      Clear Filters
                    </Button>
                  )}
                </div>
                <Separator />
              </div>
            )}

            {/* FAQ List */}
            {filteredFAQs.length > 0 ? (
              <Card>
                <CardContent className="p-0">
                  <Accordion type="single" collapsible className="w-full">
                    {filteredFAQs.map((faq, index) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="px-6 py-4 text-left hover:bg-gray-50">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-xs font-medium text-blue-600">
                                  {index + 1}
                                </span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 mb-2">
                                {faq.question}
                              </h3>
                              <div className="flex flex-wrap gap-2">
                                {faq.featured && (
                                  <Badge className="bg-amber-100 text-amber-800">
                                    <Star className="mr-1 h-3 w-3" />
                                    Popular
                                  </Badge>
                                )}
                                <Badge variant="outline">
                                  {
                                    categories.find(
                                      (c) => c.id === faq.category
                                    )?.name
                                  }
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                          <div className="pl-9">
                            <p className="text-gray-700 leading-relaxed mb-4">
                              {faq.answer}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {faq.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="text-gray-400 mb-4">
                    <HelpCircle className="h-16 w-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No FAQs Found
                  </h3>
                  <p className="text-gray-500 mb-6">
                    {searchQuery
                      ? "Try adjusting your search terms or browse by category."
                      : "No questions found in this category."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory(null);
                      }}
                    >
                      View All FAQs
                    </Button>
                    <Button asChild>
                      <Link href="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Ask a Question
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0">
            <CardContent className="p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses and customers already using our
                platform to connect with their local community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/add-business">
                    <Building2 className="mr-2 h-5 w-5" />
                    List Your Business
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/categories">
                    Browse Businesses
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
