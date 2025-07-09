export default interface Review {
  id: string;
  clerk_id: string;
  business_id: string;
  created_at: string;
  updated_at: string;
  rating: number;
  review_title: string | null;
  review_content: string;
  reviewer_name: string;
  reviewer_email: string | null;
  is_verified: boolean | null;
  is_featured: boolean | null;
  is_approved: boolean | null;
  helpful_count: number | null;
  reported_count: number | null;
  admin_notes: string | null;
  review_meta: any | null;
  review_images: string[] | null;
  search_vector: any | null;
  reviewer_avatar_url: string | null;
  reviewer_first_name: string | null;
  reviewer_last_name: string | null;
  reviewer_username: string | null;
}
