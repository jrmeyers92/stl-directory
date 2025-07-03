// Define the categories as a const assertion for better type safety
export const businessCategories = {
  "Wedding Planners": "wedding-planners",
  "Day-of Coordinators": "day-of-coordinators",
  Venues: "venues",
  Photographers: "photographers",
  Videographers: "videographers",
  Florists: "florists",
  Caterers: "caterers",
  "Cake Designers": "cake-designers",
  DJs: "djs",
  "Live Bands": "live-bands",
  "Ceremony Musicians": "ceremony-musicians",
  Officiants: "officiants",
  "Transportation Services": "transportation-services",
  "Bridal Shops": "bridal-shops",
  "Hair/Makeup Artists": "hair-makeup-artists",
  "Jewelry Stores": "jewelry-stores",
  "Decor Rental Companies": "decor-rental-companies",
  "Lighting Specialists": "lighting-specialists",
  "Photo Booth Providers": "photo-booth-providers",
  "Hotels for Guests": "hotels-for-guests",
  "Rehearsal Dinner Venues": "rehearsal-dinner-venues",
  "Bartending Services": "bartending-services",
  "Rental Companies": "rental-companies",
  "Tailors & Alterations": "tailors-alterations",
  "Mobile Bars": "mobile-bars",
} as const;

// Export type for the category names
export type BusinessCategory = keyof typeof businessCategories;

// Helper function to get slug safely
export function getCategorySlug(category: string): string {
  return (
    (businessCategories as Record<string, string>)[category] ||
    category.toLowerCase().replace(/\s+/g, "-")
  );
}
