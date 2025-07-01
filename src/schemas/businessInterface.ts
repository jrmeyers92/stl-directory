export default interface Business {
  id: string;
  business_name: string;
  business_category: string;
  business_description?: string;
  business_email?: string;
  business_phone?: string;
  business_website?: string;
  business_address?: string;
  business_city?: string;
  business_state?: string;
  business_zip?: string;
  logo_url?: string;
  banner_image_url?: string;
  gallery_images?: string;
  average_rating?: number;
  review_count?: number;
  is_featured?: boolean;
  is_verified?: boolean;
  view_count?: number;
}
