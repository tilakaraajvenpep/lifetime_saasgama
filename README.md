# lifetime.saasgama.com

Standalone build of the SaaSGama "lifetime deal" landing page, extracted from
the main app (`/lifetime-deal`) so it can be hosted on its own subdomain
while still using the main app's backend for everything else.

This app has no backend of its own. It is a static bundle that talks to the
main SaaSGama backend over the network.

## Setup

```bash
npm install
cp .env.example .env   # then edit the values
npm run dev            # local dev, http://localhost:5173
npm run build          # production build -> dist/
```

### Required env vars

| Var | What it's for |
| --- | --- |
| `VITE_API_BASE_URL` | Base URL for `/api/*` calls (coupon validation, checkout session creation, pricing plans, current-user check). |
| `VITE_APP_BASE_URL` | Base URL used for every redirect past "Buy Now" -- register, onboarding, Stripe checkout return, dashboard. |

Both normally point at the same place, e.g. `https://saasgama.com`.

## Deploying

Build (`npm run build`) and host `dist/` on any static host (Netlify,
Vercel, Render static site, S3+CloudFront, etc.), with the subdomain
`lifetime.saasgama.com` pointed at it.

## Backend prerequisites (on the main SaaSGama app)

This page is a stranger to the main backend by default -- cross-origin
requests are blocked and session cookies don't carry over. Three things
need to be set on the **main app's** backend (not here) before "Buy Now"
works end-to-end for an already-logged-in visitor:

1. **Shared cookie domain** -- set `COOKIE_DOMAIN=.saasgama.com` in the main
   app's environment, so a session cookie set on `saasgama.com` is also
   sent on requests from `lifetime.saasgama.com`.
2. **CORS** -- the main app's `server/index.ts` already allows
   `https://lifetime.saasgama.com` as an origin (with credentials). If the
   subdomain differs, add it there.
3. Nothing else changes on the backend -- it keeps running exactly as it
   does today for the main app.

**Guest visitors** (not logged in) don't depend on any of the above: "Buy
Now" just does a normal full-page redirect to
`${VITE_APP_BASE_URL}/register?...`, carrying the plan and coupon as URL
query params that the main app reads on load. Email verification,
onboarding, Stripe checkout, and the dashboard all happen on the main app
from that point on -- this page is only the entry screen.

## What's intentionally not here

No login/register forms, no dashboard, no other marketing pages -- just
this one page. The header/footer nav links point back to the main app's
pages (`VITE_APP_BASE_URL` + path) rather than being duplicated here.
