import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SaaSGamaLogo } from "@/components/SaaSGamaLogo";
import { Button } from "@/components/ui/button";
import { APP_BASE } from "@/config";

// Every link here goes to the main app -- this page is a standalone entry
// point, not part of that app's own client-side router.
const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function WebsiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a href={APP_BASE || "/"}>
            <SaaSGamaLogo size="lg" />
          </a>

          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={`${APP_BASE}${href}`}
                className="font-medium transition-colors text-sm lg:text-base text-gray-600 hover:text-blue-600"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden md:inline-flex text-gray-700 hover:text-blue-600 hover:bg-blue-50 text-sm"
              asChild
            >
              <a href={`${APP_BASE}/login`}>Sign In</a>
            </Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 md:px-5 py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all text-sm"
              asChild
            >
              <a href={`${APP_BASE}/register`}>Get Started</a>
            </Button>
            <button
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-4 py-3 space-y-1">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={`${APP_BASE}${href}`}
                className="py-3 px-4 rounded-lg font-medium transition-colors text-gray-700 hover:bg-gray-50 hover:text-blue-600"
              >
                {label}
              </a>
            ))}
            <div className="pt-3 border-t border-gray-100 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <a href={`${APP_BASE}/login`}>Sign In</a>
              </Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <a href={`${APP_BASE}/register`}>Get Started Free</a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
