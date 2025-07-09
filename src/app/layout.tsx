import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "St. Louis Wedding Vendors",
  description: "A directory of wedding vendors in St. Louis, Missouri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <header>
              <Nav />
            </header>
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </ThemeProvider>
        </body>
        <GoogleAnalytics gaId="G-KYSJVG96LE" />
      </html>
    </ClerkProvider>
  );
}
