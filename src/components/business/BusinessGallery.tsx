import { Card, CardContent } from "@/components/ui/card";

interface BusinessGalleryProps {
  business: {
    business_name: string;
    gallery_images?: string | null;
  };
}

export default function BusinessGallery({ business }: BusinessGalleryProps) {
  // Parse gallery images if they exist
  let galleryImages: string[] = [];
  if (business.gallery_images && business.gallery_images !== "[]") {
    try {
      galleryImages = JSON.parse(business.gallery_images);
    } catch (e) {
      console.error("Error parsing gallery images:", e);
    }
  }

  // Don't render the component if there are no images
  if (galleryImages.length === 0) {
    return null;
  }

  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((imageUrl, index) => (
            <div
              key={index}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={imageUrl}
                alt={`${business.business_name} gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}