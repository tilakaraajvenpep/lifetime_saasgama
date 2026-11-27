// This app only ever serves the lifetime-deal landing page -- everything
// past "Buy Now" (register, email-link onboarding, Stripe checkout, dashboard)
// happens on the main SaaSGama app. These two env vars point this standalone
// deployment at that app: API_BASE for /api/* calls, APP_BASE for full-page
// redirects. Both must be set (see .env.example) for the page to work when
// deployed on its own origin (e.g. lifetime.saasgama.com).
export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";
export const APP_BASE = import.meta.env.VITE_APP_BASE_URL || "";
// Sign in / register / checkout live on the app subdomain.
export const AUTH_BASE = import.meta.env.VITE_AUTH_BASE_URL || "https://app.saasgama.com";
