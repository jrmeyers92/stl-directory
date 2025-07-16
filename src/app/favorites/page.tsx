import Business from "@/schemas/businessschema";
import { createClient } from "@/utils/supabase/create-client/server";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

interface FavoriteWithBusiness {
  stl_directory_businesses: Business;
}

const page = async () => {
  const supabase = await createClient();
  const user = await currentUser();

  if (!user) {
    redirect("/");
  }

  const { data: userFavoritesWithBusiness } = await supabase
    .from("stl_directory_favorites")
    .select(
      `
    stl_directory_businesses (
      id,
      business_name,
      business_category,
      business_description,
      business_email,
      business_phone,
      business_website,
      business_address,
      business_city,
      business_state,
      business_zip,
      logo_url,
      banner_image_url,
      average_rating,
      review_count,
      is_featured,
      is_verified
    )
  `
    )
    .eq("clerk_id", user.id);

  const favorites = userFavoritesWithBusiness as FavoriteWithBusiness[] | null;

  if (!favorites || favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">
            You haven't added any favorites yet.
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Businesses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favorites.map((favorite) => {
          const business = favorite.stl_directory_businesses;
          return (
            <div
              key={business.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Business Logo/Banner */}
              <div className="h-48 bg-gray-200 relative">
                {business.banner_image_url ? (
                  <img
                    src={business.banner_image_url}
                    alt={business.business_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400 text-sm">No Image</span>
                  </div>
                )}
                {business.is_featured && (
                  <span className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Featured
                  </span>
                )}
                {business.is_verified && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Verified
                  </span>
                )}
              </div>

              {/* Business Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900 line-clamp-1">
                    {business.business_name}
                  </h3>
                  {business.logo_url && (
                    <img
                      src={business.logo_url}
                      alt={`${business.business_name} logo`}
                      className="w-12 h-12 rounded-full object-cover ml-2"
                    />
                  )}
                </div>

                <p className="text-sm text-blue-600 mb-2">
                  {business.business_category}
                </p>

                {business.business_description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {business.business_description}
                  </p>
                )}

                {/* Rating */}
                {business.average_rating && (
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < Math.floor(business.average_rating!) ? "★" : "☆"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {business.average_rating.toFixed(1)} (
                      {business.review_count || 0} reviews)
                    </span>
                  </div>
                )}

                {/* Contact Info */}
                <div className="space-y-1 text-sm text-gray-600">
                  {business.business_phone && (
                    <p className="flex items-center">
                      <span className="mr-2">📞</span>
                      {business.business_phone}
                    </p>
                  )}
                  {business.business_address && (
                    <p className="flex items-center">
                      <span className="mr-2">📍</span>
                      {business.business_address}
                      {business.business_city && `, ${business.business_city}`}
                      {business.business_state &&
                        `, ${business.business_state}`}
                    </p>
                  )}
                  {business.business_website && (
                    <p className="flex items-center">
                      <span className="mr-2">🌐</span>
                      <a
                        href={business.business_website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Visit Website
                      </a>
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-4 flex space-x-2">
                  <Link
                    href={`/business/${business.id}`}
                    className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    View Details
                  </Link>
                  {business.business_email && (
                    <a
                      href={`mailto:${business.business_email}`}
                      className="flex-1 bg-gray-200 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                    >
                      Contact
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
