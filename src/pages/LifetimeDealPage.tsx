import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Check, BarChart3, Calendar, Users, Shield, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { WebsiteHeader } from "@/components/layout/WebsiteHeader";
import { WebsiteFooter } from "@/components/layout/WebsiteFooter";
import { markPendingPlanSelection } from "@/lib/pending-plan-selection";
import { AUTH_BASE } from "@/config";

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


const aboutHighlights = [
  { icon: BarChart3, title: "Spend Visibility", description: "See every SaaS subscription and what it actually costs you, in one place.", gradient: "from-blue-500 to-cyan-400" },
  { icon: Calendar, title: "Renewal Tracking", description: "Never get blindsided by an auto-renewal again - alerts before every deadline.", gradient: "from-violet-500 to-fuchsia-400" },
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
    window.location.href = path.startsWith("/") ? `${AUTH_BASE}${path}` : path;
  };

  const { data: pricingPlans = [] } = useQuery<PricingPlan[]>({
    queryKey: ["/api/pricing-plans"],
  });
  const singlePlan = pricingPlans.find((p) => p.id === "single") || null;
  const teamPlan = pricingPlans.find((p) => p.id === "team") || null;

  const handleTeamGetStarted = () => {
    markPendingPlanSelection({ planId: "team", billingCycle: "yearly", source: "landing" });
    navigate(`/register?plan=team&billing=yearly&source=landing`);
  };

  const teamOriginalAmount = 390;
  const teamDiscountedAmount = 150;

  const handleGetStarted = () => {
    // sessionStorage here is same-origin only, so it can't carry across to
    // the main app -- the coupon/plan actually travel via the URL params
    // on the /register redirect below, which the main app reads itself.
    markPendingPlanSelection({ planId: "single", billingCycle: "yearly", source: "landing" });
    navigate(`/register?plan=single&billing=yearly&source=landing`);
  };

  const yearlyAmount = singlePlan?.prices.year ? singlePlan.prices.year.amount / 100 : null;
  const discountedAmount = 75;

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <Helmet>
        <title>Lifetime Deal - SaaSGama Single Plan for $75</title>
        <meta name="description" content="Get the SaaSGama Single plan for life - a one-time $75 payment, no recurring fees. Manage your SaaS subscriptions, licenses, and renewals forever." />
        <link rel="canonical" href="https://lifetime.saasgama.com/" />
      </Helmet>

      <WebsiteHeader />

      {/* Content on the left, plan card on the right */}
      <section className="relative overflow-hidden pt-24 pb-16 md:pt-28 md:pb-24 bg-[#faf8f5]">

        <div className="relative container mx-auto px-4 sm:px-6">
          <div className="grid xl:grid-cols-[1fr_auto] gap-12 items-center">
            {/* About SaaSGama - left */}
            <div className="text-[#1f1f1f]">
              <div className="mb-6">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#e31b23]">Limited-time lifetime offer</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-6 leading-[1.05] text-[#1f1f1f]">
                Own SaaSGama <span className="italic text-[#e31b23]">for life</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-10 md:mb-12 max-w-xl xl:max-w-xl">
                Track every software subscription, manage licenses, and stay ahead of renewals -
                all from one dashboard. This is a one-time offer to get the Single plan forever, for a single $75 payment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 md:gap-y-10">
                {aboutHighlights.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title}>
                      <div className={`mb-4 w-11 h-11 rounded-xl bg-[#fde8e8] flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-[#e31b23]" />
                      </div>
                      <h3 className="font-semibold text-base text-[#1f1f1f] mb-1.5">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Plan card - right */}
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-stretch md:justify-center xl:justify-self-end">
            <div className="relative w-full max-w-sm md:w-[340px] md:max-w-none">
                            <div className="relative h-full flex flex-col rounded-2xl bg-white overflow-hidden border border-[#e31b23]/70 shadow-[0_10px_40px_-10px_rgba(227,27,35,0.25)]">
                <div
                  className="py-1.5 text-center"
                  style={{ background: "#e31b23" }}
                >
                  <span className="text-white font-bold uppercase tracking-widest text-xs">★ Limited Lifetime Offer ★</span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-[#1f1f1f]">{singlePlan?.name || "Single"} Plan</h2>
                    <p className="text-xs text-gray-500 mt-1">{singlePlan?.description || "For individual users managing software costs"}</p>

                    <div className="mt-4">
                      <div className="text-sm text-gray-400 line-through">$250</div>
                      <div className="flex items-end justify-center gap-1">
                        <span className="font-serif text-5xl font-bold text-[#1f1f1f] tracking-tight">${discountedAmount.toFixed(0)}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">one-time payment, forever</div>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-gray-100" />

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {([
                      "Up to 2 users (including admin)",
                      "Up to 25 people management",
                      "Up to 50 SaaS applications",
                      "120 license limit",
                      "Basic reporting",
                      "Email support",
                      "License renewal tracking",
                    ]).map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#fde8e8] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#e31b23]" strokeWidth={3} />
                        </span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full py-5 rounded-lg font-semibold text-base bg-[#e31b23] hover:bg-[#c8161d] text-white shadow-md transition-all hover:-translate-y-0.5"
                    onClick={handleGetStarted}
                  >
                    Get Lifetime Access - ${discountedAmount.toFixed(0)}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">No credit card required to get started.</p>

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-4 pt-4 border-t border-gray-100">
                    {trustBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.label} className="flex items-center gap-1.5 text-gray-400 whitespace-nowrap">
                          <Icon className="w-3.5 h-3.5" />
                          <span className="text-[11px] font-medium">{badge.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Team annual plan card */}
            <div className="relative w-full max-w-sm md:w-[340px] md:max-w-none">
                            <div className="relative h-full rounded-2xl bg-white overflow-hidden border border-[#e31b23]/70 shadow-[0_10px_40px_-10px_rgba(227,27,35,0.25)] flex flex-col">
                <div
                  className="py-1.5 text-center"
                  style={{ background: "#e31b23" }}
                >
                  <span className="text-white font-bold uppercase tracking-widest text-xs">★ Limited Lifetime Offer ★</span>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="text-center">
                    <h2 className="font-serif text-2xl font-bold text-[#1f1f1f]">{teamPlan?.name || "Team"} Plan</h2>
                    <p className="text-xs text-gray-500 mt-1">{teamPlan?.description || "Ideal for growing businesses"}</p>

                    <div className="mt-4">
                      <div className="text-sm text-gray-400 line-through">${teamOriginalAmount}</div>
                      <div className="flex items-end justify-center gap-1">
                        <span className="font-serif text-5xl font-bold text-[#1f1f1f] tracking-tight">${teamDiscountedAmount}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">one-time payment, forever</div>
                    </div>
                  </div>

                  <div className="my-5 h-px bg-gray-100" />

                  <ul className="space-y-2.5 mb-5 flex-1">
                    {[
                      "Up to 4 users (including admin)",
                      "Up to 100 people management",
                      "Up to 100 SaaS applications",
                      "250 license limit",
                      "Advanced reporting",
                      "Priority email support",
                      "License renewal tracking",
                      "Team management",
                    ].map((feature) => (
                      <li key={feature} className="flex items-start">
                        <span className="mr-3 mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-[#fde8e8] flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#e31b23]" strokeWidth={3} />
                        </span>
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full py-5 rounded-lg font-semibold text-base bg-[#e31b23] hover:bg-[#c8161d] text-white shadow-md transition-all hover:-translate-y-0.5"
                    onClick={handleTeamGetStarted}
                  >
                    Get Lifetime Access - ${teamDiscountedAmount}
                  </Button>
                  <p className="text-xs text-center text-gray-500 mt-3">No credit card required to get started.</p>

                  <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-4 pt-4 border-t border-gray-100">
                    {trustBadges.map((badge) => {
                      const Icon = badge.icon;
                      return (
                        <div key={badge.label} className="flex items-center gap-1.5 text-gray-400 whitespace-nowrap">
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
        </div>
      </section>

      <WebsiteFooter />
    </div>
  );
}
