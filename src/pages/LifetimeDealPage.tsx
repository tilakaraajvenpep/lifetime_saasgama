import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Check, BarChart3, Calendar, Users, Shield, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { WebsiteHeader } from "@/components/layout/WebsiteHeader";
import { WebsiteFooter } from "@/components/layout/WebsiteFooter";
import { markPendingPlanSelection } from "@/lib/pending-plan-selection";
import { APP_BASE } from "@/config";

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  isPopular: boolean;
  prices: {
    month?: { id: string; amount: number; currency: string; interval: string };
    year?: { id: string; amount: number; currency: string; interval: string };
  };
}

const LIFETIME_CODE = "LIFETIMESG";

const aboutHighlights = [
  { icon: BarChart3, title: "Spend Visibility", description: "See every SaaS subscription and what it actually costs you, in one place.", gradient: "from-blue-500 to-cyan-400" },
  { icon: Calendar, title: "Renewal Tracking", description: "Never get blindsided by an auto-renewal again -- alerts before every deadline.", gradient: "from-violet-500 to-fuchsia-400" },
  { icon: Users, title: "License Management", description: "Spot unused seats and duplicate tools before they quietly drain your budget.", gradient: "from-amber-500 to-orange-400" },
  { icon: Shield, title: "Centralized Control", description: "One dashboard for every application, vendor, and contract your team relies on.", gradient: "from-emerald-500 to-teal-400" },
];

const trustBadges = [
  { icon: ShieldCheck, label: "Secure checkout" },
  { icon: Zap, label: "Instant access" },
  { icon: Sparkles, label: "No recurring fees" },
];

// Standalone deployment of the main app's "Grab it now" lifetime-deal
// landing page. "Get Lifetime Access" always sends the visitor through the
// main app's register -> email verification -> onboarding flow and only
// then to payment -- deliberately NOT branching on any existing session,
// since a session cookie shared from saasgama.com (COOKIE_DOMAIN=.saasgama.com)
// would otherwise let this page skip straight to checkout for someone who
// never actually signed in here, which is confusing on a marketing page
// whose whole job is funneling new signups through onboarding.
export default function LifetimeDealPage() {
  const navigate = (path: string) => {
    window.location.href = path.startsWith("/") ? `${APP_BASE}${path}` : path;
  };

  const { data: pricingPlans = [] } = useQuery<PricingPlan[]>({
    queryKey: ["/api/pricing-plans"],
  });
  const singlePlan = pricingPlans.find((p) => p.id === "single") || null;

  const handleGetStarted = () => {
    // sessionStorage here is same-origin only, so it can't carry across to
    // the main app -- the coupon/plan actually travel via the URL params
    // on the /register redirect below, which the main app reads itself.
    markPendingPlanSelection({ planId: "single", billingCycle: "yearly", source: "landing", couponCode: LIFETIME_CODE });
    navigate(`/register?plan=single&billing=yearly&source=landing&coupon=${encodeURIComponent(LIFETIME_CODE)}`);
  };

  const yearlyAmount = singlePlan?.prices.year ? singlePlan.prices.year.amount / 100 : null;
  const discountedAmount = 79;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Helmet>
        <title>Lifetime Deal -- SaaSGama Single Plan for $79</title>
        <meta name="description" content="Get the SaaSGama Single plan for life -- a one-time $79 payment, no recurring fees. Manage your SaaS subscriptions, licenses, and renewals forever." />
        <link rel="canonical" href="https://lifetime.saasgama.com/" />
      </Helmet>

      <WebsiteHeader />

      {/* Content on the left, plan card on the right */}
      <section className="relative overflow-hidden pt-28 pb-24 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
        <div className="pointer-events-none absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-amber-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-[28rem] w-[28rem] rounded-full bg-blue-500/25 blur-[120px]" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:48px_48px]" />

        <div className="relative container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About SaaSGama -- left */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-4 py-1.5 mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span className="text-xs font-medium text-amber-200 tracking-wide">Limited-time lifetime offer</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-[1.1]">
                Own <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">SaaSGama</span> for life
              </h1>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-12 max-w-xl">
                Track every software subscription, manage licenses, and stay ahead of renewals --
                all from one dashboard. This is a one-time offer to get the Single plan forever, for a single $79 payment.
              </p>

              <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                {aboutHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <div className={`mb-4 w-11 h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg shadow-black/20`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-white mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan card -- right */}
            <div className="relative lg:justify-self-end w-full max-w-sm lg:mr-20">
              <div className="absolute -inset-0.5 rounded-[1.5rem] bg-gradient-to-br from-emerald-400 via-teal-300 to-emerald-500 opacity-60 blur-sm" />
              <div className="relative rounded-[1.5rem] bg-white overflow-hidden shadow-2xl">
                <div
                  className="py-1.5 text-center"
                  style={{ background: "linear-gradient(90deg, #a86200 0%, #D4AF37 50%, #a86200 100%)" }}
                >
                  <span className="text-white font-bold uppercase tracking-widest text-xs">★ Limited Lifetime Offer ★</span>
                </div>

                <div className="p-6">
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900">{singlePlan?.name || "Single"} Plan</h2>
                    <p className="text-xs text-gray-500 mt-1">{singlePlan?.description || "For individual users managing software costs"}</p>

                    <div className="mt-4">
                      {yearlyAmount !== null && (
                        <div className="text-sm text-gray-400 line-through">${yearlyAmount.toFixed(0)}/year</div>
                      )}
                      <div className="flex items-end justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900 tracking-tight">${discountedAmount.toFixed(0)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">one-time payment, forever</div>
                      <div className="text-xs text-gray-500">code {LIFETIME_CODE} already applied</div>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-gray-100" />

                  <ul className="space-y-2.5 mb-5">
                    {(singlePlan?.features || [
                      "Up to 2 users (including admin)",
                      "Up to 25 people management",
                      "Up to 50 SaaS applications",
                      "120 license limit",
                      "Basic reporting",
                      "Email support",
                    ]).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                          <Check className="w-3 h-3 text-emerald-600" strokeWidth={3} />
                        </span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full py-5 rounded-xl font-semibold text-base bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
                    onClick={handleGetStarted}
                  >
                    Get Lifetime Access -- ${discountedAmount.toFixed(0)}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">No credit card required to get started.</p>

                  <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    {trustBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.label} className="flex items-center gap-1.5 text-gray-400">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">{badge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
