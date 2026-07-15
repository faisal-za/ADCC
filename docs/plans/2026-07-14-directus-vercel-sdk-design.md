# Directus Vercel Services and SDK REST Design

**Date:** 2026-07-14
**Status:** Implemented; deployment smoke tests pending credentials

## Decisions

- Deploy Directus 12.1.1 from a root `Dockerfile.vercel` in the same Vercel project as the Next.js frontend.
- Define two explicit Vercel Services: Next.js frontend and Directus container.
- Route the explicit frontend surface (`/`, localized `/en` and `/ar` pages, Next internals, metadata, revalidation, and current public root files) to Next.js.
- Route the final catch-all to Directus so Admin is available at `https://adcc.sa/admin` without enumerating Directus endpoints.
- Preserve the existing PostgreSQL database and R2/S3-compatible asset storage.
- Use `https://adcc.sa` as the shared public website, CMS API, and asset origin.
- Disable Directus Realtime/WebSockets; Redis is not required for this initial deployment.
- Remove GenQL and all GraphQL application code. Use only Directus SDK REST commands from Server Components and Server Actions.
- Upgrade project dependencies to the latest versions in the already-approved staged sequence.

## Deployment

Add a minimal root `Dockerfile.vercel` pinned to `directus/directus:12.1.1`. Set `HOST=0.0.0.0` and `PORT=80` to match Vercel's container forwarding default, then start Directus directly with `node cli.js start`. The official image otherwise defaults Directus to port 8055, and its inherited command runs database maintenance before opening its HTTP listener, which exceeds Vercel's 15-second startup deadline for this deployment. Run required database migrations separately and deliberately before changing the pinned Directus version.

Add `vercel.json` with:

- `frontend`: repository root, explicitly configured as Next.js and bound internally to `directus` as `DIRECTUS_INTERNAL_URL`.
- `directus`: repository root, explicitly configured as a container using `Dockerfile.vercel`.
- Top-level canonical redirects from `www.adcc.sa` and the legacy `admin.adcc.sa` host.
- Ordered frontend allowlist rewrites for localized pages, Next internals, metadata, revalidation, and current root public files.
- Final catch-all rewrite to `directus`.

This same-root Services topology must pass Vercel configuration validation. If Vercel rejects duplicate roots, the fallback is moving only the Directus Dockerfile into a `directus/` subdirectory; no separate repository or project will be introduced without approval.

Configure secrets in Vercel, never in the image or repository:

- Directus: `SECRET`, `PUBLIC_URL=https://adcc.sa`, `DB_CLIENT=pg`, PostgreSQL connection string/SSL settings, and R2 storage driver/bucket/endpoint/key/secret.
- Frontend server: runtime binding `DIRECTUS_INTERNAL_URL`, build fallback `DIRECTUS_URL=https://adcc.sa`, and a static `DIRECTUS_TOKEN` with read access plus create access only for `contact_us`.
- Non-secret: `WEBSOCKETS_ENABLED=false`.

The existing database already has its admin user, so bootstrap admin credentials will not be configured.

## SDK-only data access

Replace `lib/directus.ts` with a `server-only` typed Directus client composed with `staticToken()` and `rest()` only. Retain the current collection/interface shapes as hand-maintained SDK `Schema` types; delete generated GraphQL-only fields and helpers.

Replace operations directly where they already run:

- Homepage Server Component: five independent `readItems()` calls in `Promise.all()`.
- Blog index Server Component: `aggregate()` for count plus parallel `readItems()` calls for posts and categories.
- Blog detail Server Component: `readItem()`.
- Blog pagination Server Action: `readItems()` with sort, limit, offset, relation fields, and locale-filtered `deep` options.
- Contact Server Action: validated `createItem('contact_us', data)`.

Translations remain filtered to `ar-SA` or `en-US`. Only required fields are requested. Client components continue receiving serializable data and never import the Directus client or token.

Delete:

- `lib/generated/`
- `genql.config.js`
- `@genql/cli`
- the `genql` package script
- `graphql()` composition and all `.query()`/operation-generation helpers

## Rest-of-application upgrade

The upgrade covers the whole application, not only Directus.

### Next.js 16 and React 19.2

- Upgrade `next` and `@next/bundle-analyzer` to 16.2.10; upgrade `react` and `react-dom` to 19.2.7 with matching types.
- Replace the deprecated `middleware.ts` convention with `proxy.ts` and export `proxy` while preserving locale redirects and the matcher.
- Simplify `next.config.js`: remove `experimental.optimizeServerReact`, the undeclared lodash alias, custom split-chunk code, `crypto`, and unnecessary Directus externalization.
- Make normal production builds use Next 16's default Turbopack path. Apply bundle-analyzer wrapping only when `ANALYZE=true`; the analysis script may explicitly use Webpack if required by the analyzer.
- Accept Next 16's required `tsconfig.json` updates (`jsx: react-jsx` and generated development types).
- Make `build:production` Windows-portable with the already-installed `cross-env`.

### Directus SDK 23

- Upgrade `@directus/sdk` to 23.0.0 after replacing GraphQL with REST commands.
- Keep the client in a `server-only` module and require Node.js 22 or newer.
- Replace the inefficient blog ID count query with the SDK aggregate command.

### Tailwind CSS 4

- Upgrade Tailwind to 4.3.2 and add its required `@tailwindcss/postcss` package.
- Change PostCSS from the legacy `tailwindcss`/`autoprefixer` plugins to `@tailwindcss/postcss`; remove direct `autoprefixer` because Tailwind 4 handles prefixing.
- Update `lib/globals.css` to import Tailwind 4 and explicitly load the existing `tailwind.config.ts`, preserving the current colors, fonts, breakpoints, keyframes, and typography plugin instead of rewriting the design system.
- Use the already-declared `tw-animate-css` stylesheet for shadcn animation utilities and remove the older `tailwindcss-animate` plugin.
- Correct `components.json` to identify the App Router project as RSC and point to `lib/globals.css` instead of the nonexistent legacy stylesheet.
- Perform responsive visual checks for `/en`, `/ar`, blog index/detail, dialogs, menus, selects, sheets, tooltips, and toasts because Tailwind 4 changes browser support and some defaults.

### TypeScript 7 and UI majors

- Upgrade TypeScript to 7.0.2 and resolve newly exposed application/dependency type errors without weakening compiler settings. Because TypeScript 7 no longer exposes the legacy compiler API that Next 16's built-in checker loads, the implemented build runs `npm run check` first and then disables only Next's duplicate type-check phase; `jsconfig.json` mirrors the `@/*` alias for analyzer/Webpack resolution.
- Upgrade `lucide-react` to 1.24.0. Replace removed brand-icon exports (`Linkedin`, `Instagram`) with local accessible SVG markup; do not add an icon dependency for two logos.
- Upgrade `react-resizable-panels` to 4.12.2 and update the wrapper from `PanelGroup`/`PanelResizeHandle` to `Group`/`Separator`, including its orientation styling.
- Upgrade remaining dependencies to their latest compatible releases and regenerate `package-lock.json`.

### Deletions

Remove direct dependencies with no application integration after confirming typecheck/build:

- `@genql/cli` and all generated GraphQL files/config/scripts
- `react-use`
- `embla-carousel-fade`
- `critters`
- direct `esbuild`
- `tailwindcss-animate` after switching to `tw-animate-css`

Keep React DOM, build tooling, and packages with actual source/config usage. No speculative abstractions or new runtime dependencies will be added.

## Validation

Completed locally:

- `npm run check`
- `npm run build` with Next.js 16's default Turbopack path
- `npm run analyze` with Webpack and bundle-analyzer
- `npm audit` (zero reported vulnerabilities)
- Node deployment routing contract tests
- Same-origin SDK and asset URL contract tests
- Published Vercel schema validation for `vercel.json`

Pending deployment access:

- Set `PUBLIC_URL=https://adcc.sa` and `DIRECTUS_URL=https://adcc.sa` in the appropriate Vercel environments before deployment; do not manually set Vercel's generated `DIRECTUS_INTERNAL_URL` binding.
- After deployment: `/admin`, `/server/health`, Admin login, representative REST list/detail requests, contact creation, R2 asset read/upload, canonical host redirects, scale-from-zero, and frontend ownership for `/`, `/en`, `/ar`, `/_next`, metadata, and revalidation.

## Known constraints

- Vercel container requests retain Function limits, including the 4.5 MB request/response payload ceiling.
- Containers scale to zero and may start concurrently; PostgreSQL and R2 must remain external.
- Vercel custom containers currently lack static outbound IP/Secure Compute support.
- Same-project Services share deployment lifecycle and may expose project environment variables to both server runtimes; secrets remain server-only but are less isolated than separate projects.
- Directus WebSockets remain disabled.
