import { SaaSGamaLogo } from "@/components/SaaSGamaLogo";
import { APP_BASE } from "@/config";

export function WebsiteFooter() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <SaaSGamaLogo size="md" />
            <p className="text-gray-400">Intelligent SaaS management for modern teams</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href={`${APP_BASE}/features`} className="hover:text-white transition-colors">Features</a></li>
              <li><a href={`${APP_BASE}/pricing`} className="hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href={`${APP_BASE}/about`} className="hover:text-white transition-colors">About</a></li>
              <li><a href={`${APP_BASE}/contact`} className="hover:text-white transition-colors">Contact</a></li>
              <li><a href={`${APP_BASE}/privacy-policy`} className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href={`${APP_BASE}/terms-and-conditions`} className="hover:text-white transition-colors">Terms and Conditions</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-white">Follow Us</h4>
            <a
              href="https://www.linkedin.com/company/saasgama/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">&copy; 2026 SAASGAMA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
