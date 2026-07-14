# Same-Origin Directus Routing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Serve Directus Admin at `https://adcc.sa/admin` while preserving the locale-routed Next.js site and avoiding an enumerated Directus endpoint list.

**Architecture:** Vercel top-level routing will explicitly send the small known frontend surface to the Next.js service, then send the final catch-all to Directus. Browser asset URLs become same-origin, while server-side SDK requests prefer a deployment-aware Vercel service binding and fall back to the canonical public origin during builds.

**Tech Stack:** Vercel Services and ordered rewrites, Next.js 16 proxy, Directus 12.1.1 container, Directus SDK 23, Node.js built-in test runner, TypeScript 6.

## Global Constraints

- The canonical public origin is exactly `https://adcc.sa`.
- Directus Admin must be available at exactly `https://adcc.sa/admin`.
- Directus remains the final route owner; do not enumerate its REST, system, asset, or extension endpoints.
- Next.js owns only `/`, `/en`, `/en/(.*)`, `/ar`, `/ar/(.*)`, `/_next/(.*)`, `/api/revalidate`, metadata routes, and current root public files.
- Keep Directus WebSockets disabled.
- Keep `DIRECTUS_TOKEN` server-only and preserve its existing Vercel requirement.
- Never add database, R2, Directus token, or other secret values to tracked files.
- Do not add a new runtime dependency or test framework.
- Do not alter the Directus database schema, R2 storage, UI data shapes, or localized page URLs.

---

## File structure

- `vercel.json`: canonical host redirects, service binding, ordered service ownership.
- `proxy.ts`: defensive prevention of locale redirects for `/admin` if it ever reaches Next.js.
- `next.config.js`: image policy and frontend-only configuration; no canonical host routing after migration.
- `lib/directus.ts`: server SDK base URL precedence.
- `components/services-section.tsx`: same-origin service image paths.
- `components/projects-section.tsx`: same-origin project image paths.
- `components/clients-section.tsx`: same-origin client logo paths.
- `components/blog-page-client.tsx`: same-origin blog card image paths.
- `app/[locale]/blog/[id]/page.tsx`: same-origin blog hero image path.
- `app/layout.tsx`: remove obsolete Directus-subdomain connection hint.
- `test/vercel-routing.test.mjs`: deployment routing contract.
- `test/same-origin-directus.test.mjs`: canonical-origin and SDK binding contract.
- `docs/plans/2026-07-14-directus-vercel-sdk-design.md`: supersede the old host-based routing decision and record validation state.

---

### Task 1: Establish and implement the Vercel routing contract

**Files:**
- Create: `test/vercel-routing.test.mjs`
- Modify: `package.json:9-16`
- Modify: `vercel.json:1-34`
- Modify: `proxy.ts:1-23`
- Modify: `next.config.js:51-65`

**Interfaces:**
- Consumes: Vercel service names `frontend` and `directus`; locale prefixes `en` and `ar`.
- Produces: `DIRECTUS_INTERNAL_URL` in the frontend runtime; deterministic first-match service ownership; `pnpm test:deployment`.

- [ ] **Step 1: Add the failing routing contract test**

Create `test/vercel-routing.test.mjs`:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const proxySource = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')
const nextConfigSource = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')

const frontendSources = [
  '/',
  '/en',
  '/en/(.*)',
  '/ar',
  '/ar/(.*)',
  '/_next/(.*)',
  '/api/revalidate',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/logo_dark.png',
  '/logo_white.png',
]

const serviceDestination = (service) => ({ service })

test('routes the frontend allowlist before the Directus catch-all', () => {
  assert.deepEqual(
    vercel.rewrites.map(({ source }) => source),
    [...frontendSources, '/(.*)'],
  )

  for (const rewrite of vercel.rewrites.slice(0, -1)) {
    assert.deepEqual(rewrite.destination, serviceDestination('frontend'))
    assert.equal(rewrite.has, undefined)
  }

  assert.deepEqual(
    vercel.rewrites.at(-1),
    { source: '/(.*)', destination: serviceDestination('directus') },
  )
})

test('binds the frontend runtime to the Directus service', () => {
  assert.deepEqual(vercel.services.frontend.bindings, [
    {
      type: 'service',
      service: 'directus',
      format: 'url',
      env: 'DIRECTUS_INTERNAL_URL',
    },
  ])
})

test('redirects legacy hosts at the top-level routing layer', () => {
  assert.deepEqual(vercel.redirects, [
    {
      source: '/',
      has: [{ type: 'host', value: 'admin.adcc.sa' }],
      destination: 'https://adcc.sa/admin',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'admin.adcc.sa' }],
      destination: 'https://adcc.sa/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.adcc.sa' }],
      destination: 'https://adcc.sa/:path*',
      permanent: true,
    },
  ])
})

test('does not reinterpret the Directus Admin path as a locale', () => {
  assert.match(proxySource, /pathname === ['"]\/admin['"]/)
  assert.match(proxySource, /pathname\.startsWith\(['"]\/admin\/['"]\)/)
})

test('keeps canonical host routing out of the frontend-only Next config', () => {
  assert.doesNotMatch(nextConfigSource, /async redirects\s*\(/)
})
```

Add the deployment test script to `package.json` immediately after `check`:

```json
"check": "tsc",
"test:deployment": "node --test",
"build:production": "cross-env NODE_ENV=production npm run build"
```

- [ ] **Step 2: Run the contract and verify the current configuration fails**

Run:

```bash
pnpm test:deployment
```

Expected: FAIL because the current rewrites are host-based, `frontend.bindings` and top-level redirects are absent, `/admin` has no proxy guard, and `next.config.js` still owns the `www` redirect.

- [ ] **Step 3: Replace `vercel.json` with the ordered allowlist configuration**

Use this complete `vercel.json`:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "services": {
    "frontend": {
      "root": ".",
      "framework": "nextjs",
      "bindings": [
        {
          "type": "service",
          "service": "directus",
          "format": "url",
          "env": "DIRECTUS_INTERNAL_URL"
        }
      ]
    },
    "directus": {
      "root": ".",
      "runtime": "container",
      "entrypoint": "Dockerfile.vercel"
    }
  },
  "redirects": [
    {
      "source": "/",
      "has": [{ "type": "host", "value": "admin.adcc.sa" }],
      "destination": "https://adcc.sa/admin",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "admin.adcc.sa" }],
      "destination": "https://adcc.sa/:path*",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "www.adcc.sa" }],
      "destination": "https://adcc.sa/:path*",
      "permanent": true
    }
  ],
  "rewrites": [
    { "source": "/", "destination": { "service": "frontend" } },
    { "source": "/en", "destination": { "service": "frontend" } },
    { "source": "/en/(.*)", "destination": { "service": "frontend" } },
    { "source": "/ar", "destination": { "service": "frontend" } },
    { "source": "/ar/(.*)", "destination": { "service": "frontend" } },
    { "source": "/_next/(.*)", "destination": { "service": "frontend" } },
    { "source": "/api/revalidate", "destination": { "service": "frontend" } },
    { "source": "/robots.txt", "destination": { "service": "frontend" } },
    { "source": "/sitemap.xml", "destination": { "service": "frontend" } },
    { "source": "/favicon.ico", "destination": { "service": "frontend" } },
    { "source": "/logo_dark.png", "destination": { "service": "frontend" } },
    { "source": "/logo_white.png", "destination": { "service": "frontend" } },
    { "source": "/(.*)", "destination": { "service": "directus" } }
  ]
}
```

- [ ] **Step 4: Add the defensive proxy guard and remove frontend host redirects**

Replace `proxy.ts` with:

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { i18n } from './i18n.config'

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return NextResponse.next()
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.ico|.*\\.mp4).*)']
}
```

Delete the complete `async redirects()` method from `next.config.js`; top-level Vercel redirects now own both canonical host migrations. The properties around the deletion must read:

```js
  compress: true,
  poweredByHeader: false,
  async headers() {
```

- [ ] **Step 5: Run the routing tests and published-schema validation**

Run:

```bash
pnpm test:deployment
```

Expected: all five tests PASS.

Then run:

```bash
python - <<'PY'
import json
import urllib.request
from jsonschema import Draft7Validator

with open('vercel.json', encoding='utf-8') as file:
    config = json.load(file)

with urllib.request.urlopen('https://openapi.vercel.sh/vercel.json', timeout=30) as response:
    schema = json.load(response)

errors = sorted(Draft7Validator(schema).iter_errors(config), key=lambda error: list(error.path))
if errors:
    raise SystemExit('\n'.join(error.message for error in errors))
print('vercel.json matches the published Vercel schema')
PY
```

Expected: `vercel.json matches the published Vercel schema`.

- [ ] **Step 6: Run type checking and commit the routing contract**

Run:

```bash
pnpm check
git diff --check
git status --short
```

Expected: TypeScript exits 0, no whitespace errors, and only Task 1 files are modified/untracked.

Commit:

```bash
git add package.json vercel.json proxy.ts next.config.js test/vercel-routing.test.mjs
git commit -m "fix: route same-origin Directus service"
```

---

### Task 2: Move SDK and browser assets to the same origin

**Files:**
- Create: `test/same-origin-directus.test.mjs`
- Modify: `lib/directus.ts:231-240`
- Modify: `components/services-section.tsx:74-82`
- Modify: `components/projects-section.tsx:226-236`
- Modify: `components/clients-section.tsx:44-56`
- Modify: `components/blog-page-client.tsx:143-151`
- Modify: `app/[locale]/blog/[id]/page.tsx:87-94`
- Modify: `app/layout.tsx:88-92`
- Modify: `next.config.js:6-25`

**Interfaces:**
- Consumes: `DIRECTUS_INTERNAL_URL` from Task 1, `DIRECTUS_URL` during Vercel builds, `DIRECTUS_TOKEN` for authentication.
- Produces: an SDK client using binding → public env → canonical fallback precedence; browser URLs rooted at `/assets/<id>`.

- [ ] **Step 1: Add the failing same-origin contract test**

Create `test/same-origin-directus.test.mjs`:

```js
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const runtimeFiles = [
  'lib/directus.ts',
  'components/services-section.tsx',
  'components/projects-section.tsx',
  'components/clients-section.tsx',
  'components/blog-page-client.tsx',
  'app/[locale]/blog/[id]/page.tsx',
  'app/layout.tsx',
  'next.config.js',
]

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

test('contains no runtime dependency on the old Directus hostname', () => {
  for (const path of runtimeFiles) {
    assert.doesNotMatch(read(path), /https:\/\/admin\.adcc\.sa/, path)
  }
})

test('prefers the runtime service binding and keeps a build-time public fallback', () => {
  const source = read('lib/directus.ts')
  assert.match(
    source,
    /process\.env\.DIRECTUS_INTERNAL_URL\s*\?\?\s*process\.env\.DIRECTUS_URL\s*\?\?\s*['"]https:\/\/adcc\.sa['"]/,
  )
})

test('renders Directus-managed media through same-origin asset paths', () => {
  const assetFiles = [
    'components/services-section.tsx',
    'components/projects-section.tsx',
    'components/clients-section.tsx',
    'components/blog-page-client.tsx',
    'app/[locale]/blog/[id]/page.tsx',
  ]

  for (const path of assetFiles) {
    assert.match(read(path), /\/assets\/\$\{/, path)
  }
})
```

- [ ] **Step 2: Run the contract and verify old-origin usage is detected**

Run:

```bash
pnpm test:deployment
```

Expected: routing tests PASS and same-origin tests FAIL on the old `admin.adcc.sa` SDK fallback, image URLs, preconnect, and image remote pattern.

- [ ] **Step 3: Update the Directus SDK base URL precedence**

Replace the URL declaration in `lib/directus.ts` with:

```ts
const directusUrl =
  process.env.DIRECTUS_INTERNAL_URL ??
  process.env.DIRECTUS_URL ??
  'https://adcc.sa'
const directusToken = process.env.DIRECTUS_TOKEN
```

Keep the existing Vercel token guard and `createDirectus(...).with(staticToken()).with(rest())` composition unchanged.

- [ ] **Step 4: Replace each browser-facing Directus asset URL**

In `components/services-section.tsx`, use:

```tsx
src={service.image?.id ? `/assets/${service.image.id}` : '/placeholder-service.jpg'}
```

In `components/projects-section.tsx`, use:

```tsx
<ImageScroller
  images={project.images?.map((img: any) => `/assets/${img.directus_files_id?.id}`).filter(Boolean) || []}
  title={project.translations?.[0]?.title || 'Project'}
/>
```

In `components/clients-section.tsx`, use:

```tsx
<Image
  src={`/assets/${client.logo!.id}`}
  alt={client.name || 'Client logo'}
  width={130}
  height={95}
  className="rounded-sm"
  loading="lazy"
  sizes="(max-width: 640px) 150px, (max-width: 768px) 120px, 100px"
/>
```

In `components/blog-page-client.tsx`, use:

```tsx
backgroundImage: post.image?.id
  ? `url('/assets/${post.image.id}')`
  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
```

In `app/[locale]/blog/[id]/page.tsx`, use:

```ts
const getImageUrl = () => {
  return hasImage
    ? `url('/assets/${blogPost.image.id}')`
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
};
```

- [ ] **Step 5: Remove obsolete browser connection and image-host configuration**

Delete this line from `app/layout.tsx`:

```tsx
<link rel="preconnect" href="https://admin.adcc.sa" />
```

Delete only the `admin.adcc.sa` entry from `next.config.js`:

```js
{
  protocol: 'https',
  hostname: 'admin.adcc.sa',
  port: '',
  pathname: '/assets/**',
},
```

Keep the Unsplash and R2 remote patterns unchanged.

- [ ] **Step 6: Run deployment contracts, type checking, and the production build**

Run:

```bash
pnpm test:deployment
pnpm check
pnpm build
```

Expected: all deployment tests PASS, TypeScript exits 0, and Next.js completes its production build. Directus requests may log connection or HTTP failures before deployment, but the existing fallback behavior must allow the build to complete.

- [ ] **Step 7: Confirm the old runtime hostname is gone and commit**

Run:

```bash
rg -n "https://admin\.adcc\.sa" app components lib next.config.js vercel.json
```

Expected: only the intentional legacy-host redirect condition in `vercel.json` may match; no SDK URL, asset URL, image allowlist, or preconnect may match.

Then run:

```bash
git diff --check
git status --short
```

Commit:

```bash
git add lib/directus.ts components/services-section.tsx components/projects-section.tsx components/clients-section.tsx components/blog-page-client.tsx app/[locale]/blog/[id]/page.tsx app/layout.tsx next.config.js test/same-origin-directus.test.mjs
git commit -m "refactor: use same-origin Directus URLs"
```

---

### Task 3: Update deployment documentation and complete local validation

**Files:**
- Modify: `docs/plans/2026-07-14-directus-vercel-sdk-design.md:5-35,116-136`

**Interfaces:**
- Consumes: final routing and URL behavior from Tasks 1 and 2.
- Produces: deployment instructions that no longer direct operators to `admin.adcc.sa`.

- [ ] **Step 1: Replace the obsolete host-routing decisions**

In `docs/plans/2026-07-14-directus-vercel-sdk-design.md`, replace the host-based deployment decisions with:

```markdown
- Define two explicit Vercel Services: Next.js frontend and Directus container.
- Route the explicit frontend surface (`/`, localized `/en` and `/ar` pages, Next internals, metadata, revalidation, and current public root files) to Next.js.
- Route the final catch-all to Directus so Admin is available at `https://adcc.sa/admin` without enumerating Directus endpoints.
- Preserve the existing PostgreSQL database and R2/S3-compatible asset storage.
- Use `https://adcc.sa` as the shared public website, CMS API, and asset origin.
```

Replace the old two-rule deployment description with:

```markdown
Add `vercel.json` with:

- `frontend`: repository root, explicitly configured as Next.js and bound internally to `directus` as `DIRECTUS_INTERNAL_URL`.
- `directus`: repository root, explicitly configured as a container using `Dockerfile.vercel`.
- Top-level canonical redirects from `www.adcc.sa` and the legacy `admin.adcc.sa` host.
- Ordered frontend allowlist rewrites for localized pages, Next internals, metadata, revalidation, and current root public files.
- Final catch-all rewrite to `directus`.
```

Replace the URL configuration bullets with:

```markdown
- Directus: `SECRET`, `PUBLIC_URL=https://adcc.sa`, `DB_CLIENT=pg`, PostgreSQL connection string/SSL settings, and R2 storage driver/bucket/endpoint/key/secret.
- Frontend server: runtime binding `DIRECTUS_INTERNAL_URL`, build fallback `DIRECTUS_URL=https://adcc.sa`, and a static `DIRECTUS_TOKEN` with read access plus create access only for `contact_us`.
- Non-secret: `WEBSOCKETS_ENABLED=false`.
```

- [ ] **Step 2: Replace the pending host-routing validation notes**

Record these completed local checks:

```markdown
- Node deployment routing contract tests
- Same-origin SDK and asset URL contract tests
- Published Vercel schema validation for `vercel.json`
```

Record these exact pending deployment checks:

```markdown
- Set `PUBLIC_URL=https://adcc.sa` and `DIRECTUS_URL=https://adcc.sa` in the appropriate Vercel environments before deployment; do not manually set Vercel's generated `DIRECTUS_INTERNAL_URL` binding.
- After deployment: `/admin`, `/server/health`, Admin login, representative REST list/detail requests, contact creation, R2 asset read/upload, canonical host redirects, scale-from-zero, and frontend ownership for `/`, `/en`, `/ar`, `/_next`, metadata, and revalidation.
```

- [ ] **Step 3: Run the complete local validation suite**

Run:

```bash
pnpm test:deployment
pnpm check
pnpm build
git diff --check
```

Expected: deployment tests and TypeScript PASS, production build completes, and no whitespace errors are reported.

Run:

```bash
rg -n "admin\.adcc\.sa" app components lib next.config.js vercel.json docs/plans/2026-07-14-directus-vercel-sdk-design.md
```

Expected: matches are limited to intentional legacy-host redirect documentation/configuration; no active Directus origin remains `https://admin.adcc.sa`.

- [ ] **Step 4: Commit the deployment documentation**

```bash
git add docs/plans/2026-07-14-directus-vercel-sdk-design.md
git commit -m "docs: update same-origin Directus deployment"
```

---

### Task 4: Deploy and smoke-test service ownership

**Files:**
- Modify after validation: `docs/plans/2026-07-14-directus-vercel-sdk-design.md`

**Interfaces:**
- Consumes: deployed Vercel Services configuration and project environment variables.
- Produces: recorded evidence that production requests reach the intended service.

- [ ] **Step 1: Set deployment environment values**

In Vercel project settings, set for Production and Preview as appropriate:

```text
PUBLIC_URL=https://adcc.sa
DIRECTUS_URL=https://adcc.sa
```

Keep the existing `DIRECTUS_TOKEN`, `SECRET`, database, and R2 values. Do not create `DIRECTUS_INTERNAL_URL`; Vercel injects it from the frontend service binding at runtime.

- [ ] **Step 2: Deploy the commits through the connected Git integration**

Push only after reviewing the committed diff:

```bash
git log --oneline origin/main..HEAD
git diff --stat origin/main..HEAD
git push origin main
```

Expected: Vercel builds both `frontend` and `directus` services and reports a successful deployment.

- [ ] **Step 3: Verify routing and canonical redirects**

Run:

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://adcc.sa/admin
curl -fsS https://adcc.sa/server/health
curl -fsS -o /dev/null -w '%{http_code}\n' https://adcc.sa/en
curl -fsS -o /dev/null -w '%{http_code}\n' https://adcc.sa/ar
curl -fsSI https://admin.adcc.sa/
curl -fsSI https://www.adcc.sa/en
```

Expected:

- `/admin` returns 200 and does not redirect to `/en/admin`.
- `/server/health` returns a successful Directus health response.
- `/en` and `/ar` return 200 from Next.js.
- `admin.adcc.sa/` redirects permanently to `https://adcc.sa/admin`.
- `www.adcc.sa/en` redirects permanently to `https://adcc.sa/en`.

- [ ] **Step 4: Complete authenticated Directus smoke tests**

Using the browser and existing credentials:

1. Sign in at `https://adcc.sa/admin`.
2. Open representative service, project, blog, testimonial, and client records.
3. Upload a small image below Vercel's request-size limit and confirm it is stored in R2.
4. Open the resulting `/assets/<id>` URL on `adcc.sa`.
5. Submit the website contact form and confirm the `contact_us` item is created.
6. Open `/en/blog` and `/ar/blog`; confirm localized content and images render.

Expected: authentication, Admin navigation, REST reads/writes, R2 assets, and frontend pages all work from the shared origin.

- [ ] **Step 5: Record deployment evidence**

Update the status line in `docs/plans/2026-07-14-directus-vercel-sdk-design.md` to:

```markdown
**Status:** Implemented and production smoke-tested
```

Under Validation, record the deployment URL/date and the successful checks from Steps 3-4. If a check fails, keep the status as deployment-pending and record the exact failing URL, status code, and Vercel service log instead of claiming success.

Commit only when the smoke tests pass:

```bash
git add docs/plans/2026-07-14-directus-vercel-sdk-design.md
git commit -m "docs: record Directus deployment validation"
```
