"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  CheckCircle,
  Cookie,
  Database,
  Download,
  Eye,
  Globe,
  Info,
  Lock,
  Mail,
  Phone,
  Settings,
  Shield,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import Link from "next/link";

interface PolicySection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
  subsections?: {
    title: string;
    content: string[];
  }[];
}

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2025";

  const policySections: PolicySection[] = [
    {
      id: "information-collection",
      title: "Information We Collect",
      icon: Database,
      content: [
        "We collect information to provide better services to our users and improve our platform. This includes information you provide directly, information we collect automatically, and information from third parties.",
      ],
      subsections: [
        {
          title: "Information You Provide",
          content: [
            "Account Information: Name, email address, phone number, and password when you create an account.",
            "Business Information: Business name, description, address, contact details, photos, and other business-related data when listing a business.",
            "Reviews and Ratings: Content of reviews, ratings, photos, and other user-generated content you submit.",
            "Communications: Messages you send to us, including customer support inquiries and feedback.",
            "Payment Information: Billing details and payment method information for premium services (processed securely by our payment processors).",
          ],
        },
        {
          title: "Information We Collect Automatically",
          content: [
            "Usage Data: How you interact with our platform, pages visited, features used, and time spent.",
            "Device Information: IP address, browser type, device type, operating system, and unique device identifiers.",
            "Location Data: General location information based on IP address and precise location if you grant permission.",
            "Cookies and Tracking: Information collected through cookies, web beacons, and similar technologies.",
          ],
        },
        {
          title: "Information from Third Parties",
          content: [
            "Social Media: Information from social media platforms when you connect your accounts or use social login.",
            "Business Verification: Information from public records and verification services to confirm business legitimacy.",
            "Analytics Partners: Aggregated and anonymized data from analytics and advertising partners.",
          ],
        },
      ],
    },
    {
      id: "information-use",
      title: "How We Use Your Information",
      icon: Settings,
      content: [
        "We use the information we collect to provide, maintain, and improve our services, communicate with you, and ensure the security and integrity of our platform.",
      ],
      subsections: [
        {
          title: "Service Provision",
          content: [
            "Create and manage your account and business listings",
            "Process and display reviews and ratings",
            "Facilitate communication between businesses and customers",
            "Provide customer support and respond to inquiries",
            "Process payments for premium services",
          ],
        },
        {
          title: "Platform Improvement",
          content: [
            "Analyze usage patterns to improve user experience",
            "Develop new features and services",
            "Conduct research and analytics",
            "Optimize platform performance and reliability",
          ],
        },
        {
          title: "Communication",
          content: [
            "Send account-related notifications and updates",
            "Provide customer support and respond to inquiries",
            "Send marketing communications (with your consent)",
            "Notify you about changes to our services or policies",
          ],
        },
        {
          title: "Safety and Security",
          content: [
            "Verify business legitimacy and prevent fraud",
            "Moderate content and enforce community guidelines",
            "Protect against spam, abuse, and malicious activity",
            "Comply with legal obligations and law enforcement requests",
          ],
        },
      ],
    },
    {
      id: "information-sharing",
      title: "How We Share Your Information",
      icon: Users,
      content: [
        "We do not sell your personal information to third parties. We may share your information in limited circumstances as described below.",
      ],
      subsections: [
        {
          title: "Public Information",
          content: [
            "Business listings, reviews, and ratings are publicly visible by design",
            "Your name and profile information may be displayed with your reviews",
            "Business contact information is publicly available in listings",
          ],
        },
        {
          title: "Service Providers",
          content: [
            "Payment processors for handling transactions",
            "Email service providers for sending notifications",
            "Analytics providers for understanding platform usage",
            "Cloud storage providers for data hosting",
            "Customer support tools for providing assistance",
          ],
        },
        {
          title: "Legal Requirements",
          content: [
            "When required by law or legal process",
            "To protect our rights, property, or safety",
            "To prevent fraud or illegal activity",
            "In connection with business transfers or mergers",
          ],
        },
        {
          title: "With Your Consent",
          content: [
            "When you explicitly agree to share information with third parties",
            "For marketing partnerships (opt-in only)",
            "When integrating with third-party services you choose to connect",
          ],
        },
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      icon: Lock,
      content: [
        "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
      ],
      subsections: [
        {
          title: "Security Measures",
          content: [
            "Encryption of data in transit and at rest using industry-standard protocols",
            "Regular security assessments and vulnerability testing",
            "Access controls and authentication requirements for our systems",
            "Employee training on data protection and security best practices",
            "Incident response procedures for potential security breaches",
          ],
        },
        {
          title: "Data Retention",
          content: [
            "We retain your information only as long as necessary for legitimate business purposes",
            "Account information is retained while your account is active",
            "Reviews and ratings are retained to maintain platform integrity",
            "Deleted accounts are purged from our systems within 30 days",
            "Backup data is retained for up to 90 days for disaster recovery",
          ],
        },
      ],
    },
    {
      id: "user-rights",
      title: "Your Rights and Choices",
      icon: UserCheck,
      content: [
        "You have several rights regarding your personal information. We provide tools and processes to help you exercise these rights.",
      ],
      subsections: [
        {
          title: "Access and Control",
          content: [
            "Access: View and download the personal information we have about you",
            "Correction: Update or correct inaccurate information in your account",
            "Deletion: Request deletion of your account and associated data",
            "Portability: Export your data in a commonly used format",
            "Restriction: Limit how we process your information in certain circumstances",
          ],
        },
        {
          title: "Communication Preferences",
          content: [
            "Opt out of marketing emails using the unsubscribe link",
            "Adjust notification settings in your account preferences",
            "Choose whether to receive promotional communications",
            "Control frequency and type of platform updates",
          ],
        },
        {
          title: "Cookie Management",
          content: [
            "Accept or decline non-essential cookies through our cookie banner",
            "Modify cookie preferences in your browser settings",
            "Understand the types of cookies we use and their purposes",
            "Opt out of third-party tracking cookies",
          ],
        },
      ],
    },
    {
      id: "cookies-tracking",
      title: "Cookies and Tracking",
      icon: Cookie,
      content: [
        "We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content.",
      ],
      subsections: [
        {
          title: "Types of Cookies",
          content: [
            "Essential: Required for basic platform functionality and security",
            "Performance: Help us analyze how the platform is used and improve performance",
            "Functional: Remember your preferences and personalize your experience",
            "Targeting: Used for advertising and measuring marketing campaign effectiveness",
          ],
        },
        {
          title: "Third-Party Services",
          content: [
            "Google Analytics for website analytics and insights",
            "Social media platforms for social login and sharing features",
            "Payment processors for secure transaction processing",
            "Email service providers for communication delivery",
          ],
        },
      ],
    },
    {
      id: "international-transfers",
      title: "International Data Transfers",
      icon: Globe,
      content: [
        "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international transfers.",
      ],
      subsections: [
        {
          title: "Data Processing Locations",
          content: [
            "Primary data processing occurs in the United States",
            "Cloud services may process data in multiple regions for redundancy",
            "Customer support may be provided from various international locations",
          ],
        },
        {
          title: "Transfer Safeguards",
          content: [
            "Standard Contractual Clauses for transfers to countries without adequacy decisions",
            "Certification programs and codes of conduct where applicable",
            "Regular assessment of transfer mechanisms and safeguards",
          ],
        },
      ],
    },
    {
      id: "children-privacy",
      title: "Children's Privacy",
      icon: Shield,
      content: [
        "Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.",
      ],
      subsections: [
        {
          title: "Age Requirements",
          content: [
            "Users must be at least 13 years old to create an account",
            "Users between 13-18 require parental consent in some jurisdictions",
            "Business owners must be of legal age to enter contracts",
          ],
        },
        {
          title: "Parental Rights",
          content: [
            "Parents can review information collected from their children",
            "Request deletion of their child's information",
            "Prevent further collection or use of their child's information",
          ],
        },
      ],
    },
    {
      id: "policy-changes",
      title: "Changes to This Policy",
      icon: Calendar,
      content: [
        "We may update this privacy policy from time to time to reflect changes in our practices or for legal and regulatory reasons.",
      ],
      subsections: [
        {
          title: "Notification Process",
          content: [
            "Material changes will be announced via email to registered users",
            "Updates will be posted prominently on our platform",
            "Continued use of our services constitutes acceptance of changes",
            "Users can review previous versions upon request",
          ],
        },
      ],
    },
  ];

  const quickAccess = [
    {
      icon: Download,
      title: "Download Your Data",
      description: "Export your account information and data",
      action: "Download",
      href: "/account/export",
    },
    {
      icon: Settings,
      title: "Privacy Settings",
      description: "Manage your privacy preferences",
      action: "Manage",
      href: "/account/privacy",
    },
    {
      icon: Trash2,
      title: "Delete Account",
      description: "Permanently remove your account and data",
      action: "Delete",
      href: "/account/delete",
    },
    {
      icon: Mail,
      title: "Contact Us",
      description: "Questions about your privacy rights",
      action: "Contact",
      href: "/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              We respect your privacy and are committed to protecting your
              personal information. This policy explains how we collect, use,
              and safeguard your data.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-600 hover:bg-green-700 text-white">
                <CheckCircle className="mr-2 h-4 w-4" />
                GDPR Compliant
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white">
                <Shield className="mr-2 h-4 w-4" />
                Data Encrypted
              </Badge>
              <Badge className="bg-purple-600 hover:bg-purple-700 text-white">
                <UserCheck className="mr-2 h-4 w-4" />
                Your Rights Protected
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Last Updated Notice */}
        <Alert className="mb-8">
          <Info className="h-4 w-4" />
          <AlertDescription>
            This privacy policy was last updated on{" "}
            <strong>{lastUpdated}</strong>. We&apos;ll notify you of any significant
            changes via email.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5" />
                    Quick Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {policySections.map((section) => {
                    const IconComponent = section.icon;
                    return (
                      <Button
                        key={section.id}
                        variant="ghost"
                        className="w-full justify-start text-sm"
                        onClick={() => {
                          const element = document.getElementById(section.id);
                          element?.scrollIntoView({ behavior: "smooth" });
                        }}
                      >
                        <IconComponent className="mr-2 h-4 w-4" />
                        {section.title}
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {quickAccess.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-gray-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{item.title}</p>
                          <p className="text-xs text-gray-600 truncate">
                            {item.description}
                          </p>
                        </div>
                        <Button size="sm" variant="outline" asChild>
                          <Link href={item.href}>{item.action}</Link>
                        </Button>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Mail className="mr-2 h-5 w-5" />
                    Data Protection Officer
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    For privacy-related inquiries, contact our Data Protection
                    Officer:
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-500" />
                      <Link
                        href="mailto:privacy@yourbusiness.com"
                        className="text-blue-600 hover:underline"
                      >
                        privacy@yourbusiness.com
                      </Link>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-gray-500" />
                      <Link
                        href="tel:+15551234567"
                        className="text-blue-600 hover:underline"
                      >
                        (555) 123-4567
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {policySections.map((section) => {
              const IconComponent = section.icon;
              return (
                <Card key={section.id} id={section.id} className="scroll-mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center text-2xl">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                        <IconComponent className="h-5 w-5 text-blue-600" />
                      </div>
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {section.content.map((paragraph, pIndex) => (
                      <p key={pIndex} className="text-gray-700 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}

                    {section.subsections && (
                      <div className="space-y-6">
                        {section.subsections.map((subsection, sIndex) => (
                          <div key={sIndex}>
                            <h4 className="font-semibold text-lg text-gray-900 mb-3">
                              {subsection.title}
                            </h4>
                            <ul className="space-y-2">
                              {subsection.content.map((item, iIndex) => (
                                <li
                                  key={iIndex}
                                  className="flex items-start space-x-3"
                                >
                                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                                  <span className="text-gray-700 leading-relaxed">
                                    {item}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}

            {/* Contact Section */}
            <Card id="contact" className="scroll-mt-8">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                  </div>
                  Contact Us About Privacy
                </CardTitle>
                <CardDescription>
                  If you have any questions about this privacy policy or our
                  data practices, please don&apos;t hesitate to reach out.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      General Privacy Questions
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="mr-2 h-4 w-4 text-gray-500" />
                        <Link
                          href="mailto:privacy@yourbusiness.com"
                          className="text-blue-600 hover:underline"
                        >
                          privacy@yourbusiness.com
                        </Link>
                      </div>
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-500" />
                        <Link
                          href="tel:+15551234567"
                          className="text-blue-600 hover:underline"
                        >
                          (555) 123-4567
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">
                      Data Subject Requests
                    </h4>
                    <p className="text-sm text-gray-600">
                      For requests to access, correct, or delete your data,
                      please use our automated tools or contact us directly.
                    </p>
                    <Button asChild>
                      <Link href="/contact">Submit Privacy Request</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0">
            <CardContent className="p-12 text-center text-white">
              <Shield className="h-16 w-16 mx-auto mb-6 opacity-80" />
              <h2 className="text-3xl font-bold mb-4">
                Your Privacy Matters to Us
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                We&apos;re committed to transparency and giving you control over your
                data. If you have any questions or concerns, we&apos;re here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  asChild
                >
                  <Link href="/contact">
                    <Mail className="mr-2 h-5 w-5" />
                    Contact Privacy Team
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/account/privacy">
                    <Settings className="mr-2 h-5 w-5" />
                    Privacy Settings
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
