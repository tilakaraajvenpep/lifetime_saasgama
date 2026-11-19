// Remembers the visitor's plan pick in sessionStorage so, after they verify
// their email and finish onboarding on the main app, that app's landing page
// can reopen the checkout dialog with the coupon already applied -- instead
// of losing the selection behind a generic "pick a plan" screen.

const STORAGE_KEY = 'saasgama_pending_plan_selection';

export interface PendingPlanSelection {
  planId: string;
  billingCycle: 'monthly' | 'yearly';
  source: 'landing' | 'pricing' | 'lifetime';
  couponCode?: string;
}

export function markPendingPlanSelection(selection: PendingPlanSelection) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  } catch {
    // sessionStorage can throw in private-browsing edge cases -- non-fatal.
  }
}
