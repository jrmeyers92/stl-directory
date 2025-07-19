import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap", // Better font loading performance
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Separate viewport export (required by Next.js 14+)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  // Add metadataBase to resolve social media images
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),

  title: {
    default:
      "St. Louis Wedding Vendors Directory | Find Your Perfect Wedding Vendors",
    template: "%s | St. Louis Wedding Vendors",
  },
  description:
    "Discover the best wedding vendors in St. Louis, Missouri. Find photographers, caterers, venues, florists, and more for your perfect wedding day. Reviews, ratings, and contact information included.",
  keywords: [
    "St. Louis wedding vendors",
    "Missouri wedding directory",
    "wedding photographers St. Louis",
    "wedding venues St. Louis",
    "wedding caterers Missouri",
    "St. Louis wedding planning",
    "wedding florists St. Louis",
    "wedding services Missouri",
  ],
  authors: [{ name: "St. Louis Wedding Vendors Directory" }],
  creator: "St. Louis Wedding Vendors Directory",
  publisher: "St. Louis Wedding Vendors Directory",

  // Open Graph
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/", // Will be resolved with metadataBase
    title: "St. Louis Wedding Vendors Directory",
    description:
      "Discover the best wedding vendors in St. Louis, Missouri. Find photographers, caterers, venues, florists, and more for your perfect wedding day.",
    siteName: "St. Louis Wedding Vendors Directory",
    images: [
      {
        url: "/og-image.jpg", // Will be resolved with metadataBase
        width: 1200,
        height: 630,
        alt: "St. Louis Wedding Vendors Directory",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "St. Louis Wedding Vendors Directory",
    description: "Discover the best wedding vendors in St. Louis, Missouri.",
    images: ["/og-image.jpg"], // Will be resolved with metadataBase
    creator: "@yourtwitterhandle", // Replace with your Twitter handle
  },

  // Additional SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Verification (add these to your domain)
  verification: {
    google: "your-google-verification-code", // Get from Google Search Console
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },

  // Favicon and icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Manifest for PWA
  manifest: "/manifest.json",

  // Additional meta tags
  other: {
    "theme-color": "#ffffff",
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
  },
};

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "St. Louis Wedding Vendors Directory",
  description:
    "Discover the best wedding vendors in St. Louis, Missouri. Find photographers, caterers, venues, florists, and more for your perfect wedding day.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  potentialAction: {
    "@type": "SearchAction",
    target: `${
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    }/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "St. Louis Wedding Vendors Directory",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <head>
          {/* JSON-LD structured data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />

          {/* Additional meta tags for better SEO */}
          <meta name="format-detection" content="telephone=no" />
          <meta name="geo.region" content="US-MO" />
          <meta name="geo.placename" content="St. Louis" />
          <meta name="geo.position" content="38.6270;-90.1994" />
          <meta name="ICBM" content="38.6270, -90.1994" />

          {/* Preconnect to external domains for better performance */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />

          {/* Canonical URL (should be dynamic based on current page) */}
          <link
            rel="canonical"
            href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}
          />

          {/* Sitemap */}
          <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

          {/* RSS Feed (if you have a blog) */}
          <link
            rel="alternate"
            type="application/rss+xml"
            title="St. Louis Wedding Vendors Blog"
            href="/feed.xml"
          />
        </head>

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header role="banner">
              <Nav />
            </header>

            <main role="main" className="flex-grow">
              {children}
            </main>

            <Footer />
            <Toaster />
          </ThemeProvider>

          <GoogleAnalytics gaId="G-KYSJVG96LE" />
        </body>
      </html>
    </ClerkProvider>
  );
}
