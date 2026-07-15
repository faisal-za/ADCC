# Same-Origin Directus Routing Design

> **Superseded:** The application now uses embedded Payload CMS; this Directus routing design is retained only as historical context.

**Date:** 2026-07-14
**Status:** Approved

## Goal

Serve the existing Next.js website and Directus 12.1.1 from one Vercel project and one public origin, with Directus Admin available at `https://adcc.sa/admin` and without maintaining an exhaustive list of Directus API routes.

## Current failure

The current `vercel.json` routes Directus only when the request host is `admin.adcc.sa`; every path on `adcc.sa` goes to the frontend service. A request for `/admin` therefore reaches `proxy.ts`, which treats `admin` as a missing locale and redirects it into the locale route. In Vercel Services this produces the observed missing generated module error for the frontend `[locale]` route. The request never reaches Directus.

## Architecture

Use an ordered frontend allowlist followed by a Directus catch-all.

The Next.js application has a deliberately small public surface: `/`, localized routes beneath `/en` and `/ar`, Next.js internals, one revalidation endpoint, generated metadata routes, and two root public images. These paths will explicitly target the `frontend` service. The final `/(.*)` rewrite will target the `directus` service, so Directus owns `/admin`, all standard REST/system routes, asset routes, and extension endpoints without duplicating Directus's route registry in `vercel.json`.

This is preferable to enumerating Directus endpoints because Directus has many system routes and can add extension endpoints. It is also preferable to mounting all Directus traffic beneath `/admin`: Directus Admin derives its API root from the browser path before the first `admin` segment, so an Admin application at exactly `/admin` natively expects API routes at the origin root.

## Routing ownership

Rules are ordered and first-match wins.

### Frontend service

The frontend owns exactly:

- `/`
- `/en` and `/en/(.*)`
- `/ar` and `/ar/(.*)`
- `/_next/(.*)`
- `/api/revalidate`
- `/robots.txt`
- `/sitemap.xml`
- `/favicon.ico`
- `/logo_dark.png`
- `/logo_white.png`

### Directus service

The final catch-all owns every remaining path. This includes, without enumerating them in configuration:

- `/admin` and `/admin/(.*)`
- `/auth/(.*)`
- `/server/(.*)`
- `/items/(.*)`
- `/assets/(.*)`
- Directus system routes and custom extension endpoints

An unknown localized URL such as `/en/not-a-page` remains frontend-owned and receives the Next.js not-found behavior. An unknown non-localized root URL becomes Directus-owned; this is the accepted tradeoff for avoiding a brittle backend endpoint list. Any future non-localized frontend route or root public file must be added to the frontend allowlist.

## Host migration

`adcc.sa` is the canonical public origin.

- Redirect `www.adcc.sa/:path*` to `https://adcc.sa/:path*`.
- Redirect the old `admin.adcc.sa` root to `https://adcc.sa/admin`.
- Redirect other `admin.adcc.sa/:path*` requests to the equivalent `https://adcc.sa/:path*` during migration.

These redirects belong in top-level Vercel routing so they execute before service ownership is selected. The frontend-only `next.config.js` host redirect is removed after the canonical redirects move to `vercel.json`.

## Service communication and URLs

The frontend service declares a Vercel service binding to `directus`, injected as `DIRECTUS_INTERNAL_URL`. Server-side Directus SDK requests prefer this deployment-aware binding at runtime, then fall back to `DIRECTUS_URL` because Vercel bindings are unavailable during builds, and finally use `https://adcc.sa` for local compatibility.

Configuration values:

- Directus: `PUBLIC_URL=https://adcc.sa`
- Frontend build fallback: `DIRECTUS_URL=https://adcc.sa`
- Frontend runtime binding: `DIRECTUS_INTERNAL_URL`, injected by Vercel rather than manually configured
- Existing `DIRECTUS_TOKEN` remains server-only

The static token remains required on Vercel. The service binding controls reachability, not application authorization.

## Asset URLs

Application-rendered Directus asset URLs become same-origin paths such as `/assets/<file-id>`. This removes browser dependence on `admin.adcc.sa`, works on production and preview deployment origins, and lets the ordered service routing send asset requests to Directus.

Remove the obsolete `admin.adcc.sa` image remote pattern and preconnect hint. Keep the external R2 image host configuration because hero media still uses it directly.

## Locale proxy defense

Vercel routing should prevent `/admin` from reaching Next.js. `proxy.ts` will nevertheless explicitly pass `/admin` and `/admin/(.*)` through without locale redirection so local frontend-only development or a routing regression does not reinterpret `admin` as a locale. It will not proxy Directus; it only avoids the incorrect `/en/admin` redirect.

## Error handling and security

- Existing Directus fetch error handling remains unchanged.
- Directus permissions and the least-privilege static token remain the authorization boundary.
- Directus and the website share one browser origin, reducing CORS complexity but also reducing cookie and content isolation compared with a subdomain.
- Directus WebSockets remain disabled.
- Vercel container request, response, duration, and scale-to-zero limits remain unchanged.
- The final catch-all intentionally exposes Directus's normal public route surface; Directus role and endpoint configuration must deny unauthorized operations.

## Validation

Automated configuration checks will assert:

- Every current frontend route appears before the Directus catch-all.
- The last rewrite is the Directus catch-all.
- No host-based rewrite still sends only `admin.adcc.sa` to Directus.
- Canonical host redirects preserve paths and send the old admin root to `/admin`.
- The frontend service declares the runtime Directus binding.

Local checks:

- TypeScript check.
- Next.js production build.
- Published Vercel schema validation for `vercel.json`.
- Search confirms no runtime `admin.adcc.sa` asset or SDK URL remains.

Deployment smoke checks:

- `/admin` serves Directus rather than redirecting to a locale.
- `/server/health` reaches Directus.
- Directus login and Admin navigation work.
- Representative SDK list/detail reads and contact creation work.
- `/assets/<known-id>` serves an R2-backed asset.
- `/`, `/en`, `/ar`, blog pages, `/_next` assets, metadata routes, and revalidation remain frontend-owned.
- Unknown localized routes retain Next.js not-found behavior.
