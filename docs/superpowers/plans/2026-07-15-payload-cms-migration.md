# Payload CMS Migration Implementation Plan

> **MongoDB correction:** Supersede all Neon/Postgres and SQL migration instructions below. Use `@payloadcms/db-mongodb` 3.86.0 with `MONGODB_URI`; Task 8 requires isolated test, Preview, and Production Mongo databases plus Local API integration tests, but no initial relational migration, `payload migrate`, or migration-aware build command.

**Source of truth:** `docs/superpowers/specs/2026-07-15-payload-cms-migration-design.md`  
**Execution mode:** isolated sequential workers, one implementation commit per task, followed by an independent read-only review  
**Stop line:** do not push, deploy, mutate Vercel settings, create production users, or run migrations against Production without explicit user authorization

## Non-negotiable guardrails

1. Create a dedicated worktree/branch from the approved design commit. Do not work in the main checkout, where `.gitignore` has an unrelated user modification. Never copy, stage, restore, or normalize the main checkout's `.gitignore`.
2. Pin every first-party Payload package to exactly `3.86.0`; do not use `^` or `~`.
3. Configure `graphQL: { disable: true }`, create no GraphQL route and no playground route, and test that GraphQL is nonfunctional. Payload's required `graphql` peer may exist in the lockfile/package manifest only to satisfy its package contract.
4. Use the official manual existing-app integration and official 3.86.0 generated route files; do not run `create-payload-app` over this repository.
5. Configure `vercelPostgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })`. Do not assume a Neon Marketplace variable is named `POSTGRES_URL`.
6. Configure a **public** Vercel Blob store with `clientUploads: true`. Never commit tokens.
7. Preserve static, hard-coded R2 hero images/videos and the corresponding Next Image remote pattern and preloads. They are frontend assets, not Directus-managed content.
8. No Directus records, files, users, IDs, or schema are migrated.
9. Generated migrations must be inspected and committed; they run in CI before build, never during serverless startup.
10. Preview and Production must point at separate Neon branches/databases before migration-aware Preview builds are enabled.

## Required review loop for every task

For each task below:

1. Assign one worker only to the isolated worktree.
2. Worker writes or updates the named contract/unit tests first and confirms the relevant new assertion fails for the intended reason.
3. Worker implements only that task.
4. Worker runs the task's focused tests, `pnpm check`, and `git diff --check` where credentials permit.
5. Worker self-reviews the diff and commits with the stated commit message.
6. Launch a fresh read-only reviewer against that commit. Reviewer classifies findings as Critical, Important, or Minor and verifies scope, tests, and the approved design.
7. Resolve all Critical and Important findings before beginning the next task; re-review fixes.

---

## Task 0 — Isolate work and establish the baseline

### Files

- No source changes.
- Worktree target: `.worktrees/payload-cms`
- Branch: `feat/payload-cms`

### Steps

1. In the main checkout, capture state without modifying it:

   ```bash
   git status --short --branch
   git diff -- .gitignore
   git rev-parse HEAD
   ```

   Expected: the approved design commit is present; `.gitignore` is modified only in the main checkout and must remain untouched.

2. Create the isolated worktree:

   ```bash
   git worktree add .worktrees/payload-cms -b feat/payload-cms HEAD
   cd .worktrees/payload-cms
   git status --short --branch
   ```

3. Establish baseline behavior:

   ```bash
   pnpm install --frozen-lockfile
   pnpm test:deployment
   pnpm check
   pnpm build
   git diff --check
   ```

4. Record existing expected Directus connection warnings separately from actual command failures.

### Gate

- Worktree clean.
- Main checkout's `.gitignore` unchanged and unstaged.
- No commit required.

---

## Task 1 — Add exact Payload dependencies and foundational scripts

### Files

- Modify `package.json`
- Modify `pnpm-lock.yaml`
- Verify `pnpm-workspace.yaml` retains `allowBuilds.sharp: true`
- Update `test/vercel-routing.test.mjs` only enough to add dependency/script contract assertions if keeping static contract tests together; otherwise add `test/payload-foundation.test.mjs`

### Tests first

Add assertions that:

- `payload`, `@payloadcms/next`, `@payloadcms/db-vercel-postgres`, `@payloadcms/richtext-lexical`, `@payloadcms/storage-vercel-blob`, `@payloadcms/ui`, and `@payloadcms/translations` are exactly `3.86.0`.
- `sharp` is exact-pinned to the compatible current version selected during install (expected `0.34.5`, verify peer/package compatibility before committing).
- `graphql` satisfies Payload's peer contract but no GraphQL application script exists.
- `@directus/sdk` is absent after the eventual cleanup; mark this assertion pending until Task 7 if it prevents incremental commits.
- Scripts exist for `payload`, `generate:types`, `generate:importmap`, and `ci`.

Run the new test and confirm it fails before editing dependencies.

### Implementation

1. Install exact matching packages, without widening unrelated package versions:

   ```bash
   pnpm add -E payload@3.86.0 @payloadcms/next@3.86.0 \
     @payloadcms/db-vercel-postgres@3.86.0 \
     @payloadcms/richtext-lexical@3.86.0 \
     @payloadcms/storage-vercel-blob@3.86.0 \
     @payloadcms/ui@3.86.0 @payloadcms/translations@3.86.0 \
     sharp@0.34.5 graphql@16.11.0
   ```

   If pnpm resolves a peer incompatibility, stop and verify current 3.86.0 package metadata rather than changing Payload versions independently.

2. Add scripts while preserving current analyzer and TypeScript behavior:

   ```json
   "payload": "cross-env NODE_OPTIONS=--no-deprecation payload",
   "generate:types": "pnpm payload generate:types",
   "generate:importmap": "pnpm payload generate:importmap",
   "ci": "pnpm payload migrate && pnpm build"
   ```

   Keep `build` running `check` before `next build`. Prefer pnpm in nested scripts for package-manager consistency, but do not alter behavior unrelated to Payload.

3. Keep `pnpm-workspace.yaml`'s Sharp build approval. Do not add broad ignored-build exceptions.

### Validation

```bash
pnpm install --frozen-lockfile
pnpm why payload
pnpm why sharp
pnpm test:deployment
pnpm check
git diff --check
```

A production build is not yet expected because Payload config does not exist.

### Commit

`build: add exact Payload CMS dependencies`

### Review focus

- All first-party Payload versions are exactly aligned at `3.86.0`.
- No unrelated upgrades.
- Sharp install runs rather than being silently ignored.
- GraphQL is only a peer dependency, not an exposed feature.

---

## Task 2 — Define Payload access, collections, hooks, and config

### New files

- `payload.config.ts`
- `payload/access/is-authenticated.ts`
- `payload/hooks/revalidate.ts`
- `payload/collections/Users.ts`
- `payload/collections/Media.ts`
- `payload/collections/Services.ts`
- `payload/collections/Categories.ts`
- `payload/collections/Projects.ts`
- `payload/collections/Posts.ts`
- `payload/collections/Testimonials.ts`
- `payload/collections/Clients.ts`
- `payload/collections/ContactSubmissions.ts`
- Generated later in this task: `payload-types.ts`
- Add or update `test/payload-config.test.mjs`

### Tests first

Create static contract tests that fail until the config exists and verify:

- `graphQL.disable` is true.
- Postgres is configured from `DATABASE_URL`, not `POSTGRES_URL`.
- Blob config names `media`, uses `BLOB_READ_WRITE_TOKEN`, and sets `clientUploads: true`.
- All nine collection slugs exist.
- Posts have no drafts/versions configuration.
- Access defaults to authenticated users for REST.
- Revalidation hooks cover change and delete, including category/media broad invalidation.
- No secret value is present in source.

### Collection definitions

Use reusable `isAuthenticated` access (`Boolean(req.user)`) for explicit REST/Admin protection. Local API calls intentionally use default `overrideAccess: true` unless a test explicitly checks access.

1. `Users`
   - `slug: 'users'`, `auth: true`.
   - No roles and no public registration customization.
   - Keep Payload's first-user flow functional; do not write an access rule that blocks bootstrap creation. Verify this against Payload 3.86 behavior.

2. `Media`
   - `slug: 'media'`, `upload: true`.
   - Required localized `alt` text.
   - Explicit authenticated collection access for REST metadata.
   - Attach media revalidation hooks.

3. `Services`
   - Localized required `title`; localized `description`; `icon`; optional upload `image` to `media`.
   - Attach homepage hooks.

4. `Categories`
   - Localized required `title`; localized indexed `slug`; localized optional `description`.
   - Attach homepage/blog/broad detail hooks.
   - Add uniqueness only if Payload/Postgres supports the intended localized uniqueness safely; otherwise index and validate without inventing a broken global uniqueness constraint.

5. `Projects`
   - Localized required `title`; localized `description`.
   - `images` upload relationship with `hasMany: true` to `media`.
   - `categories` relationship with `hasMany: true` to `categories`.
   - Attach homepage hooks.

6. `Posts`
   - Localized required `title`, localized description, localized required Lexical `content`.
   - Featured `image` upload to media, numeric `readTime` with positive minimum/default, categories relationship `hasMany`.
   - Do not set `versions` or drafts.
   - Attach blog index and exact detail revalidation hooks.

7. `Testimonials`
   - Localized name, client/company, text; rating constrained from 1 to 5 with default 5 if retained.
   - Attach homepage hooks.

8. `Clients`
   - Name and logo upload relationship.
   - Attach homepage hooks.

9. `ContactSubmissions`
   - Required `name` and `phoneNumber`; optional validated email, `serviceType`, and description.
   - Authenticated access for all REST CRUD. The trusted Server Action will create through Local API.

### Revalidation hooks

In `payload/hooks/revalidate.ts`, use Next.js 16's current `revalidatePath` signatures:

- Home: `/en`, `/ar`.
- Blog indexes: `/en/blog`, `/ar/blog`.
- Exact post paths: `/en/blog/${doc.id}`, `/ar/blog/${doc.id}`.
- Broad detail patterns for category/media changes: `revalidatePath('/en/blog/[id]', 'page')` and Arabic equivalent.

Provide typed `afterChange` and `afterDelete` hook factories/helpers. Log concise invalidation failures but do not swallow collection writes unless the approved behavior explicitly requires a failed cache invalidation to abort a write. Avoid duplicate invalidation where practical.

### Payload config

- Validate required variables with a small server-side helper. In production, missing `PAYLOAD_SECRET`, `DATABASE_URL`, or `BLOB_READ_WRITE_TOKEN` must produce clear errors. Type generation may need documented non-secret placeholders; do not weaken production checks.
- Use `vercelPostgresAdapter({ pool: { connectionString: process.env.DATABASE_URL } })`.
- Use `vercelBlobStorage({ collections: { media: true }, token: process.env.BLOB_READ_WRITE_TOKEN, clientUploads: true })` and document that the linked store must be public.
- Configure localization `{ locales: [{ code: 'en', label: 'English' }, { code: 'ar', label: 'Arabic', rtl: true }], defaultLocale: 'en', fallback: true }`.
- Configure Admin i18n with Payload's English/Arabic translations.
- Set `editor: lexicalEditor()`, `sharp`, `admin.user`, import-map base directory, generated type output, and `graphQL: { disable: true }`.
- Do not add `payloadCloudPlugin`.

### Generate types

```bash
DATABASE_URL='postgresql://placeholder.invalid/payload' \
PAYLOAD_SECRET='type-generation-placeholder-not-for-runtime' \
BLOB_READ_WRITE_TOKEN='type-generation-placeholder' \
pnpm generate:types
```

Use a platform-appropriate environment command on Windows. Confirm generation does not attempt a connection; if it does, stop and request a development database rather than embedding bypass logic.

### Validation

```bash
node --test test/payload-config.test.mjs
pnpm generate:types
pnpm check
git diff --check
```

### Commit

`feat: define Payload CMS schema and hooks`

### Review focus

- First-user flow remains possible.
- REST authentication is explicit.
- Localized fields match approved model.
- GraphQL is disabled in config.
- Blob is public/client-uploaded and database variable is explicit.
- Hooks cover both deletes and relation/media effects.

---

## Task 3 — Install official Payload App Router files and split frontend route group

### Moves

Use `git mv` so history is retained:

- `app/layout.tsx` -> `app/(frontend)/layout.tsx`
- `app/providers.tsx` -> `app/(frontend)/providers.tsx`
- `app/[locale]` -> `app/(frontend)/[locale]`
- `app/not-found.tsx` -> `app/(frontend)/not-found.tsx`
- `app/robots.ts` -> `app/(frontend)/robots.ts`
- `app/sitemap.ts` -> `app/(frontend)/sitemap.ts`

Delete in Task 7 after hooks are complete:

- `app/api/revalidate/route.ts`

### New official 3.86.0 files

- `app/(payload)/admin/[[...segments]]/page.tsx`
- `app/(payload)/admin/[[...segments]]/not-found.tsx`
- `app/(payload)/admin/importMap.js` (generated)
- `app/(payload)/api/[...slug]/route.ts`
- `app/(payload)/layout.tsx`
- `app/(payload)/custom.scss`

Do **not** create:

- `app/(payload)/api/graphql/route.ts`
- `app/(payload)/api/graphql-playground/route.ts`
- Any alternate GraphQL directory.

### Other modified files

- `next.config.js`
- `tsconfig.json`
- `proxy.ts`
- `test/vercel-routing.test.mjs`
- `test/payload-config.test.mjs`
- All moved frontend files whose relative imports changed

### Tests first

Replace Directus service-routing assertions with Payload route ownership assertions:

- Admin and REST route files exist.
- GraphQL and playground route files do not exist.
- Proxy bypasses `/admin`, `/admin/*`, `/api`, and `/api/*`.
- `@payload-config` maps to `./payload.config.ts`.
- Next config is wrapped in `withPayload` while analyzer composition remains enabled.
- R2 hero host remains configured.
- Vercel Blob host pattern is added.

Confirm failures before moving files.

### Implementation

1. Copy the official generated route/layout/not-found files from Payload's **3.86.0 blank template/package**, retaining generated-file comments and import patterns.
2. Move frontend routes into `(frontend)` and fix imports. Prefer existing `@/*` aliases over fragile deeper relative paths, especially in moved pages and layout.
3. Ensure frontend global CSS is imported only by the frontend layout; Payload CSS/custom SCSS stays scoped to the Payload layout.
4. Wrap the analyzer result correctly:

   - Build the existing `nextConfig`.
   - Apply analyzer condition without losing `withPayload`.
   - Export `withPayload(analyzedOrBaseConfig)` (or the documented equivalent that ensures both wrappers run).

5. Add Vercel Blob remote pattern such as `*.public.blob.vercel-storage.com`, verified against the actual current Blob URL format. Preserve `images.unsplash.com` and the existing R2 pattern.
6. Add `@payload-config: ['./payload.config.ts']` to TypeScript paths; preserve `@/*`.
7. Update proxy's function guard and matcher so Payload Admin/API never localize. The matcher already excludes `api`, but keep an explicit API guard for defense and tests.
8. Generate the import map:

   ```bash
   pnpm generate:importmap
   ```

### Validation

```bash
pnpm generate:importmap
node --test test/vercel-routing.test.mjs test/payload-config.test.mjs
pnpm check
git diff --check
```

If build requires a database, record it as a credential blocker rather than adding fallback CMS data or disabling Payload.

### Commit

`feat: embed Payload routes in Next.js`

### Review focus

- Root-layout collision is avoided.
- Existing public URLs do not change.
- No GraphQL route exists.
- Payload styles do not leak into frontend and vice versa.
- Static R2 hero assets are untouched.

---

## Task 4 — Add server-only Local API data layer and typed view models

### New files

- `lib/payload.ts`
- `lib/cms-types.ts`
- `lib/cms-data.ts`
- Optionally `lib/media.ts` if media normalization is clearer separately
- Add `test/cms-data-contract.test.mjs` for static/server-boundary contracts

### Modified files

- `lib/actions/contact.ts`
- Later tasks consume helpers; do not change components yet beyond types required to compile.

### Tests first

Assert that:

- Payload initialization imports `server-only` and uses `getPayload({ config })`.
- No token, database URL, or Payload client is exported to browser code.
- Locales are narrowed to `en | ar` with a deliberate fallback/rejection policy.
- Media and relationship normalization handle expanded object, scalar ID, and null safely.
- Contact validation converts empty optional email to `undefined` rather than failing `z.email()` on an empty form value.
- Contact uses `payload.create({ collection: 'contact-submissions' })` and not REST.

### Implementation

1. `lib/payload.ts`: cache or reuse Payload initialization in the officially supported server-only manner; import root config through `@payload-config`.
2. `lib/cms-types.ts`: define narrow serializable view models for client components, for example:
   - `MediaView` with nullable URL, localized alt, dimensions.
   - `CategoryView`.
   - `ServiceView`, `ProjectView`, `TestimonialView`, `ClientView`.
   - `PostCardView` and `PostDetailView` (Lexical content remains the correct generated type, not `any`).
   - IDs support Payload's generated ID type; normalize to strings at client boundaries if that simplifies state and keys.
3. `lib/cms-data.ts`: focused helpers, not a generic repository:
   - `getHomepageData(locale)` using parallel `payload.find` with `pagination: false`, locale, and sufficient `depth`.
   - `getBlogPage({ locale, page, limit, categoryId? })` sorted `-createdAt`, returning `docs`, `totalDocs`, and `hasNextPage`; category filter must query all relationships, not just inspect the first category.
   - `getBlogPost(id, locale)` with strict numeric-ID parsing if the adapter uses serial IDs; return null for invalid/missing IDs.
   - Normalizers that omit unresolved scalar-only relationships rather than constructing invalid media URLs.
4. Preserve fail-soft policy in page callers; helpers can throw typed/internal errors and pages decide empty/not-found behavior.
5. Update contact action to use the Local API. Keep Zod issue responses and generic unexpected failure. Do not let user input choose a collection or access options.

### Validation

```bash
node --test test/cms-data-contract.test.mjs
pnpm check
git diff --check
```

With an isolated database available, add a non-destructive smoke invocation; otherwise defer runtime data validation to Task 8.

### Commit

`feat: add typed Payload Local API data layer`

### Review focus

- Server-only boundary is real.
- No `any` at new CMS boundaries.
- Relationship/null handling is safe.
- Category filtering and pagination are server-correct.
- Contact REST remains inaccessible anonymously while Local API create works.

---

## Task 5 — Migrate homepage reads and components to Payload shapes

### Modified files

- `app/(frontend)/[locale]/page.tsx`
- `components/services-section.tsx`
- `components/projects-section.tsx`
- `components/testimonials-section.tsx`
- `components/clients-section.tsx`
- `components/client-sections.tsx` only if typed props require it
- `test/cms-data-contract.test.mjs`
- Replace relevant portions of `test/same-origin-directus.test.mjs` or rename it to `test/payload-frontend.test.mjs`

### Tests first

Add assertions that:

- Homepage imports the Payload helper, not `@directus/sdk`.
- It exports an explicit ISR interval (recommended `export const revalidate = 3600`) and no `force-dynamic`.
- Components consume direct `title`/`description` fields and Blob `media.url`, not translation arrays or `/assets/{id}`.
- Projects filter against every category relationship.
- Media fallbacks do not generate `undefined`, scalar-ID, or empty URLs.
- `any[]` CMS props are gone.

### Implementation

1. Replace five Directus queries with `getHomepageData(locale)` and retain empty-array fallbacks plus server logging.
2. Use typed view-model props in all four CMS-fed components.
3. Render Blob URLs and localized alt text. Preserve existing `unoptimized` behavior only if needed for public Blob delivery or current visual behavior; otherwise allow Next Image using the new remote pattern. Do not change unrelated hero R2 images.
4. Map project galleries from normalized media URLs and filter null media.
5. Keep testimonial fallback data behavior unless the approved product behavior requires an empty state; type the union/view shape instead of using `any`.
6. Add `export const revalidate = 3600`; remove Directus runtime-binding comments and `force-dynamic`.

### Validation

```bash
node --test test/payload-frontend.test.mjs test/cms-data-contract.test.mjs
pnpm check
git diff --check
```

When a development DB is available, render `/en` and `/ar` with empty and populated collections.

### Commit

`feat: render homepage content from Payload`

### Review focus

- Locale handling is correct.
- No first-category-only project bug.
- No broken media URL construction.
- R2 hero assets are preserved.
- ISR policy is explicit.

---

## Task 6 — Migrate blog list, pagination, filtering, detail, and Lexical rendering

### Modified files

- `app/(frontend)/[locale]/blog/page.tsx`
- `app/(frontend)/[locale]/blog/[id]/page.tsx`
- `components/blog-page-client.tsx`
- `lib/actions/blog.ts`
- `test/payload-frontend.test.mjs`
- Add focused tests such as `test/blog-contract.test.mjs`

### Tests first

Assert that:

- Blog pages/actions have no Directus imports or translation-array assumptions.
- List uses Payload `totalDocs`/`hasNextPage` semantics.
- Category selection is sent to the server query and matches any related category; it is not limited to the initial six posts or first relation.
- Detail uses the official Payload Lexical React renderer.
- The old CMS HTML `dangerouslySetInnerHTML` call is absent specifically from blog detail. Do not globally ban legitimate JSON-LD or static critical-CSS uses elsewhere.
- Detail has ISR and on-demand dynamic-ID caching: `revalidate = 3600`, `dynamicParams = true`, and `generateStaticParams` returning an empty list (or the exact Next 16 supported equivalent).
- Invalid/missing IDs use `notFound()`.

### Implementation

1. Blog index calls `getBlogPage({ locale, page: 1, limit: 6 })` and category helper in parallel; use `totalDocs` and `hasNextPage` directly.
2. Change load-more action from offset arithmetic to Payload page-based pagination. Accept and validate `page`, `limit`, locale, and optional category ID; impose a maximum page size.
3. Update `BlogPageClient` to typed props and stable pagination state. When category changes:
   - Reset to page 1.
   - Fetch server-filtered results for that category.
   - Continue load-more within that category.
   - Handle rapid changes/stale TanStack results safely through query keys.
4. Use normalized post/category/media fields. Match a post against all categories.
5. Detail calls `getBlogPost`, renders featured Blob media, first/available category label, and localized fields.
6. Render Lexical content using `RichText` from Payload's official React export for 3.86.0. Remove the Directus HTML injection entirely.
7. Preserve ID-based URLs.
8. Add explicit ISR and empty `generateStaticParams`/`dynamicParams` according to Next 16's dynamic ISR requirements.

### Validation

```bash
node --test test/blog-contract.test.mjs test/payload-frontend.test.mjs
pnpm check
git diff --check
```

With test data, verify English/Arabic text, category pagination, no duplicate posts, missing IDs, and Lexical headings/lists/links.

### Commit

`feat: migrate localized blog to Payload`

### Review focus

- Rich text is rendered structurally and safely.
- Category filtering works beyond initial results.
- Pagination cannot return stale cross-category data.
- Dynamic detail routes are actually cacheable/on-demand ISR.

---

## Task 7 — Retire Directus runtime and simplify Vercel routing

### Delete

- `lib/directus.ts`
- `Dockerfile.vercel`
- `.dockerignore`
- `app/(frontend)/api/revalidate/route.ts` (or old path if not moved)
- `test/same-origin-directus.test.mjs`

### Modify

- `package.json` — remove `@directus/sdk`; remove obsolete revalidation references
- `pnpm-lock.yaml`
- `vercel.json`
- `proxy.ts` if final route tests expose gaps
- `test/vercel-routing.test.mjs`
- `test/payload-frontend.test.mjs`
- Historical docs:
  - `docs/plans/2026-07-14-directus-vercel-sdk-design.md`
  - `docs/research/2026-07-14-vercel-directus-containers.md`
  - `docs/superpowers/specs/2026-07-14-same-origin-directus-routing-design.md`
  - `docs/superpowers/plans/2026-07-14-same-origin-directus-routing.md`

### Tests first

Rewrite deployment contracts to assert:

- `vercel.json` has no `services`, service bindings, or Directus rewrites.
- Canonical `admin.adcc.sa` and `www.adcc.sa` redirects remain exact.
- `/admin` and `/api` belong to the single Next app.
- Payload GraphQL is config-disabled; no GraphQL/playground route exists. Because the REST catch-all may syntactically match `/api/graphql`, runtime smoke must assert no successful GraphQL response rather than only file absence.
- No runtime code imports `@directus/sdk`, references Directus env names, or builds `/assets/${id}` for CMS media.
- Hard-coded R2 hero files and host remain.

### Implementation

1. Remove `@directus/sdk` and refresh lockfile:

   ```bash
   pnpm remove @directus/sdk
   ```

2. Delete Directus runtime/container files and obsolete revalidation endpoint.
3. Reduce `vercel.json` to schema plus canonical redirects. Do not add service definitions or catch-all rewrites.
4. Add migration-aware build command only if Task 8's Preview/Production isolation gate is satisfied. Until then, keep the `ci` script ready but do not create a configuration that can migrate Production from Preview.
5. Add short superseded notices to historical Directus docs; do not rewrite their historical findings.
6. Search runtime/source/package files, excluding historical docs and lockfile where peer history may appear.

### Validation

```bash
pnpm install --frozen-lockfile
pnpm test:deployment
pnpm check
rg -n "@directus/sdk|DIRECTUS_|DIRECTUS_INTERNAL_URL|/assets/\$\{" app components lib package.json vercel.json proxy.ts
rg -n "pub-739d7839c19e41459d767b500777a0c7\.r2\.dev" app components next.config.js
git diff --check
```

The first search must return no active runtime matches; the R2 search must still find hero/static asset references.

### Commit

`refactor: retire Directus runtime and services`

### Review focus

- No accidental removal of R2 hero assets.
- Redirect semantics remain exact.
- No old secret/environment contract survives in runtime.
- API revalidation removal is safe because hooks exist.

---

## Task 8 — Generate import map, initial Postgres migration, and DB-backed tests

### Credential hard gate

Before this task, obtain or confirm all of the following without committing values:

- An isolated development/test Neon database or branch.
- A separate Preview Neon branch/database.
- Confirmation that Production uses a different Neon target.
- `DATABASE_URL` is the pooled development/test URL during local generation/testing.
- A long local/test `PAYLOAD_SECRET`.
- Blob token is optional for DB tests but required for upload testing.

If database isolation cannot be confirmed, stop. Do not point migration tooling at an unknown or Production URL.

### Files

- Generated `app/(payload)/admin/importMap.js`
- Generated `payload-types.ts` (regenerate after final schema)
- Generated migration directory/files (Payload default, expected `migrations/` or the configured explicit directory)
- Add DB integration test script under `test/integration/payload-local-api.ts`
- Modify `package.json` test scripts if needed
- Modify `vercel.json` to add `buildCommand: "pnpm ci"` only after isolation is confirmed
- Add deployment documentation under `docs/deployment/payload-vercel.md`

### Integration test safety

The integration script must:

- Require an explicit opt-in such as `PAYLOAD_INTEGRATION_TEST=1`.
- Reject a URL equal to known Production or lacking a test/development marker/allowlist confirmation.
- Use unique test document markers.
- Create both English and Arabic localized values, relationships, a post with Lexical JSON, and a contact submission through Local API.
- Verify Local API reads and relationship depth.
- Exercise access behavior through Payload operations/request context or a running REST server: anonymous REST content read/create is rejected; authenticated administrator can access it.
- Delete all test records in `finally` in reverse relationship order.
- Never create the production first user.

### Migration steps

1. Use a disposable development branch/database with push mode while finalizing schema.
2. Generate final types/import map:

   ```bash
   pnpm generate:types
   pnpm generate:importmap
   ```

3. Generate initial migration:

   ```bash
   pnpm payload migrate:create payload-initial-schema
   ```

4. Inspect every generated SQL operation. Confirm it creates only Payload tables/indexes/localization/relationships and does not touch old Directus tables or schemas.
5. Test migration from an empty disposable DB:

   ```bash
   pnpm payload migrate
   pnpm payload migrate:status
   ```

6. Run integration tests against that migrated disposable DB.
7. Configure `vercel.json` build command to `pnpm ci` only after Preview and Production database scope separation is documented/confirmed.

### Validation

```bash
pnpm generate:types
pnpm generate:importmap
pnpm payload migrate:status
PAYLOAD_INTEGRATION_TEST=1 pnpm exec tsx --test test/integration/payload-local-api.ts
pnpm test:deployment
pnpm check
pnpm ci
pnpm audit
git diff --check
```

Run `pnpm ci` only against the disposable/test database. If Blob credentials are absent, DB/build validation may pass but Blob upload stays pending.

### Commit

`feat: add Payload schema migration and CI workflow`

### Review focus

- Migration is fresh-schema only and reversible where generated down migration supports it.
- Build migrations cannot cross Preview/Production boundaries.
- Test cleanup and DB safety guards are strong.
- Generated files match config.

---

## Task 9 — Validate Blob uploads, Admin/REST, build, and documentation

### Credential hard gate

Requires:

- Public Vercel Blob store and scoped `BLOB_READ_WRITE_TOKEN` for a non-production/test environment.
- Isolated migrated database.
- Test administrator credentials created only in the isolated environment.

No production dashboard changes or production account creation.

### Tests and manual checks

1. Start production-mode app with isolated environment:

   ```bash
   pnpm build
   pnpm start
   ```

2. Verify routes:

   - `/en`, `/ar`, `/en/blog`, `/ar/blog`.
   - Missing blog ID returns localized 404.
   - `/admin` shows first-user on an empty isolated DB, then login after test user creation.
   - Anonymous `/api/services`, `/api/posts`, `/api/contact-submissions`, and `/api/media` are rejected.
   - Authenticated REST succeeds.
   - `/api/graphql` and playground produce no functional GraphQL response.

3. Blob test:

   - Upload an image through Admin using client upload.
   - Confirm metadata exists in Payload and object exists in the public Blob store.
   - Confirm the returned URL renders on the homepage/blog without the old `/assets` path.
   - Verify localized alt text.
   - Delete the test media/document and confirm expected Blob cleanup behavior.

4. Hook test:

   - Warm `/en`, `/ar`, both blog indexes, and a detail page.
   - Create/update/delete each relevant collection in isolated Admin/Local API.
   - Confirm exact and broad invalidation results, especially categories and media.

5. Canonical redirects can be contract-tested locally, but live host redirects remain a production smoke item until authorized.

### Documentation

Update `docs/deployment/payload-vercel.md` with names only:

- `PAYLOAD_SECRET`.
- Pooled `DATABASE_URL` mapping from Neon.
- Public Blob and `BLOB_READ_WRITE_TOKEN`.
- Separate Neon branches/databases for Development, Preview, Production.
- Vercel Build Command `pnpm ci`.
- First-user bootstrap steps.
- Migration rollback/backup expectations.
- Explicit note that GraphQL is disabled and routes omitted.
- Password-reset email is out of scope.
- Post-cutover removal checklist for Directus/R2 credentials, while clarifying static public R2 hero URLs remain intentional and require no secret.

Do not create or commit `.env.example`.

### Validation

```bash
pnpm install --frozen-lockfile
pnpm generate:types
pnpm generate:importmap
pnpm test:deployment
pnpm check
pnpm build
pnpm analyze
pnpm audit
git diff --check
```

Also run a source search excluding historical docs:

```bash
rg -n "@directus/sdk|DIRECTUS_|DIRECTUS_INTERNAL_URL|dangerouslySetInnerHTML.*translation|/assets/\$\{" app components lib package.json vercel.json
```

### Commit

`docs: document Payload deployment and verification`

### Review focus

- No secrets in Git or logs.
- Blob is public and uses client upload.
- Authenticated REST and disabled GraphQL are demonstrated, not inferred.
- Build and migration use isolated DB.

---

## Task 10 — Final independent review and integration handoff

### Fresh review fleet

Run three independent read-only reviews in parallel:

1. **Payload schema/security reviewer**
   - Collections, localization, auth, first-user flow, GraphQL disablement, contact access, hooks.
2. **Next.js/frontend reviewer**
   - Route groups/layout isolation, ISR correctness, typed data, pagination, Lexical rendering, media handling, preserved hero assets.
3. **Deployment/database reviewer**
   - Exact versions, Neon variable mapping, migration safety, Preview/Production isolation, Blob config, Vercel redirects, secret hygiene.

Resolve every Critical/Important finding and rerun affected validation.

### Final local checks

```bash
pnpm install --frozen-lockfile
pnpm generate:types
pnpm generate:importmap
pnpm test:deployment
pnpm check
pnpm build
pnpm audit
git diff --check
git status --short --branch
git log --oneline --decorate -15
```

Run DB-backed and Blob-backed tests only against the isolated environment.

### Main-checkout hygiene

Back in the main checkout:

- Confirm the user's `.gitignore` modification is byte-for-byte unchanged from Task 0.
- Delete the ignored local `.env.example` that contained real credentials without staging it.
- Recommend rotating those credentials; never print their values.
- Remove `.pi-subagents`, temporary package tarballs, generated `*.tsbuildinfo`, and retired worktree artifacts only if they were created by this work and are not user files.

### Handoff report

Provide:

- Commit list and review results.
- Automated checks and exact outcomes.
- Credential-gated checks completed/pending.
- Required Vercel environment variable **names only**.
- Explicit production checklist.
- Confirmation that no push/deployment/dashboard mutation occurred.
- Ask the user whether to merge locally; do not merge or push without instruction.

## Production smoke checklist (after separate explicit authorization)

1. Confirm backup and Neon Production target.
2. Confirm Preview and Production do not share database URLs.
3. Confirm public Blob is linked in all intended scopes.
4. Deploy with `pnpm ci`; verify migration succeeds before build.
5. Create the first production administrator at `/admin/create-first-user` over HTTPS.
6. Verify authenticated Admin and REST.
7. Verify `/api/graphql` and playground are nonfunctional.
8. Create localized sample content and media; verify `/en` and `/ar`.
9. Submit a contact form and verify Admin visibility.
10. Verify hook revalidation, scale-to-zero recovery, and canonical host redirects.
11. Remove obsolete Directus/R2 secret variables only after successful cutover; retain static public R2 hero asset URLs.
12. Rotate the credentials formerly present in the ignored local `.env.example`.
