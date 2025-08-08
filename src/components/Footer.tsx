import Link from "next/link";

import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t mt-20 bg-gradient-to-t from-rose-50/30 to-white">
      <div className="border-t border-rose-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <h3 className="font-bold text-lg mb-4 text-gray-900">Wed in STL</h3>
              <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                Your trusted wedding vendor directory connecting engaged couples with exceptional wedding professionals throughout St. Louis, Missouri.
              </p>
              <div className="flex gap-4">
                <Link
                  href="#"
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                  title="Follow us on Instagram for wedding inspiration"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-pink-500 transition-colors"
                  title="Like us on Facebook"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <Link
                  href="#"
                  className="text-gray-400 hover:text-purple-500 transition-colors"
                  title="Follow us on Pinterest for wedding ideas"
                >
                  <span className="sr-only">Pinterest</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.082.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-12.014C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Planning Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-rose-600 transition-colors">
                    About Wed in STL
                  </Link>
                </li>
                <li>
                  <Link href="/featured" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Featured Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Blog
                  </Link>
                </li>
                <li>
                  <Link href="/inspiration" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Inspiration
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Wedding Services</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/categories/venues" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Venues
                  </Link>
                </li>
                <li>
                  <Link href="/categories/photographers" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Photographers
                  </Link>
                </li>
                <li>
                  <Link href="/categories/caterers" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Catering
                  </Link>
                </li>
                <li>
                  <Link href="/categories/florists" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Wedding Florists
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-gray-900">Support & Info</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/FAQ" className="text-gray-600 hover:text-rose-600 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-600 hover:text-rose-600 transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/business/register" className="text-rose-600 hover:text-rose-700 font-medium transition-colors">
                    Join as Vendor
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-rose-200" />

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© {currentYear} Wed in STL. Made with ❤️ for St. Louis couples.</p>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-rose-600 transition-colors">
                Privacy
              </Link>
              <span className="text-rose-300">·</span>
              <Link href="/terms" className="hover:text-rose-600 transition-colors">
                Terms
              </Link>
              <span className="text-rose-300">·</span>
              <Link href="/cookies" className="hover:text-rose-600 transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
