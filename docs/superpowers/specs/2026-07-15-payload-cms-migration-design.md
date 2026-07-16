# Payload CMS Clean-Rebuild Migration Design

> **MongoDB correction:** MongoDB now replaces every Neon/Postgres assumption below. Payload uses `@payloadcms/db-mongodb` 3.86.0 with `MONGODB_URI`; Development, Preview, and Production require isolated Mongo databases, and no relational schema migration or migration-aware build command is used.

**Status:** Approved on 2026-07-15

## 1. Purpose

Replace the failed standalone Directus-on-Vercel service with Payload CMS embedded in the existing Next.js App Router application. Payload will own the Admin UI at `/admin`, use Neon PostgreSQL through Vercel, and store new uploads in Vercel Blob.

This is a clean rebuild. No Directus content, users, files, metadata, identifiers, or schema data will be migrated or preserved.

## 2. Confirmed decisions

- Embed Payload manually into the existing Next.js application, following Payload's official existing-app documentation.
- Use current matching Payload 3.86.x packages.
- Use `@payloadcms/db-vercel-postgres` with the Vercel Neon integration.
- Use `@payloadcms/storage-vercel-blob`, following the verified pattern in the local Finaa website and current official documentation.
- Enable Vercel Blob client uploads to avoid Vercel's 4.5 MB server-upload limit.
- Use Payload's official Lexical rich-text editor and React renderer for blog content.
- Use immediate publishing only; do not enable drafts or version history.
- Use one authenticated Payload users collection with full CMS access and no role tiers.
- Require administrator authentication for Payload REST access.
- Use Payload Local API for all website reads and writes.
- Keep contact submission behind the existing validated Server Action.
- Revalidate affected Next.js paths from Payload collection hooks after create, update, and delete.
- Disable GraphQL in Payload configuration and do not create GraphQL or playground routes.
- Preserve `admin.adcc.sa` only as a redirect to the canonical same-origin Admin UI.

## 3. Architecture

The result is one standard Next.js/Vercel application rather than two Vercel Services:

- Frontend: localized Next.js routes under `/en` and `/ar`.
- Payload Admin: `/admin`.
- Payload REST: `/api/*`, protected by Payload authentication and collection access controls.
- Website data access: server-only Payload Local API.
- Database: Neon PostgreSQL supplied through Vercel.
- Upload storage: Vercel Blob.

Remove the Directus container, service binding, catch-all routing, SDK client, and Directus-specific asset paths.

## 4. App Router integration

Follow Payload's official existing-app structure by separating frontend and Payload layouts with route groups:

```text
app/
├── (frontend)/
│   ├── [locale]/
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
└── (payload)/
    ├── admin/[[...segments]]/
    ├── api/[...slug]/
    └── layout.tsx
```

Route groups do not change public URLs. Existing localized URLs remain unchanged.

The Payload route group will contain the official generated Admin page, not-found page, import map, REST route, layout, and scoped Admin stylesheet. It will deliberately omit GraphQL and GraphQL playground directories.

Wrap the existing ESM Next.js configuration with `withPayload`, preserve bundle-analyzer behavior, and add the `@payload-config` TypeScript alias. Add the Vercel Blob media hostname pattern where Next Image requires it.

The locale proxy must bypass `/admin` and `/api`, including nested routes, so Payload requests are never redirected beneath a locale.

## 5. Payload configuration

The root `payload.config.ts` will include:

- `admin.user` pointing to the users collection.
- English and Arabic Admin translations where supplied by Payload.
- Native content localization with `en` and RTL `ar`; English is the default locale.
- `lexicalEditor()`.
- `vercelPostgresAdapter()` with an explicit pooled connection string from `DATABASE_URL`; the linked Neon integration must supply or deliberately map this variable rather than relying on an assumed Marketplace variable name.
- `vercelBlobStorage()` for the media collection, using `BLOB_READ_WRITE_TOKEN` and `clientUploads: true`. The connected Blob store must be public because the website renders its delivery URLs directly.
- `sharp` for upload image support.
- Generated TypeScript output at `payload-types.ts`.
- `graphQL: { disable: true }`.
- A long, required `PAYLOAD_SECRET` in production.

Do not copy Finaa's Payload Cloud plugin because it is not required for this Vercel-hosted application.

Although Payload declares `graphql` as a peer dependency and pnpm may install it to satisfy Payload's package contract, the application will expose no GraphQL endpoint and use no GraphQL operations.

## 6. Collections

### Users

- Slug: `users`.
- Payload authentication enabled.
- One administrator class with full CMS access.
- No public registration and no roles field.

### Media

- Slug: `media`.
- Upload collection backed by Vercel Blob.
- Localized, required alternative text.
- Public Blob delivery URL.
- No local production storage.

### Services

- Slug: `services`.
- Localized required title.
- Localized description.
- Icon identifier.
- Featured image relationship to media.

### Categories

- Slug: `categories`.
- Localized required title.
- Localized slug.
- Localized optional description.
- Shared by projects and posts.

### Projects

- Slug: `projects`.
- Localized required title.
- Localized description.
- Multiple media images.
- Multiple category relationships.

### Posts

- Slug: `posts`.
- Localized required title.
- Localized description.
- Localized Lexical rich-text content.
- Featured image.
- Numeric read time.
- Multiple category relationships.
- Immediate publishing; no drafts or versions.

Existing `/[locale]/blog/[id]` URLs remain ID-based in this migration to avoid an unrelated URL migration.

### Testimonials

- Slug: `testimonials`.
- Localized name.
- Localized client or company.
- Localized testimonial text.
- Optional rating constrained to the existing display range if retained.

### Clients

- Slug: `clients`.
- Name.
- Logo relationship to media.

### Contact submissions

- Slug: `contact-submissions`.
- Required name and phone number.
- Optional email, service type, and description.
- Created only by the website's validated Server Action or an authenticated administrator.
- Read, update, and delete restricted to authenticated administrators.

## 7. Access control

Payload's normal REST and Admin operations require an authenticated Payload user. Collection access functions will make this explicit where necessary.

The website uses the Local API on the server. Payload's Local API skips access checks by default, which is intentional for trusted server code. No Local API client or database credential reaches browser bundles.

Contact submission continues to validate untrusted form input with Zod before calling `payload.create`. It returns structured validation failures and a generic message for unexpected errors.

Vercel Blob media URLs are public delivery URLs even though media metadata REST access is administrator-only.

## 8. Data access and frontend migration

Create a server-only Payload initializer using `getPayload({ config })` and focused query helpers without introducing a broad repository abstraction.

- Homepage: parallel Local API `find` operations for services, projects, categories, testimonials, and clients, using the requested locale and sufficient relationship depth.
- Blog index: paginated `find`, sorted newest first, using `totalDocs`.
- Blog detail: `findByID` with the requested locale; missing records use the localized 404 flow.
- Blog load-more action: Local API pagination, returning typed records and `hasNextPage`/equivalent state.
- Contact action: Local API `create` after Zod validation.

Generate and use Payload's `payload-types.ts`. Remove handwritten Directus schema types and replace component `any` boundaries with focused typed view models or generated Payload types.

Components will consume Payload's native localized field shape rather than Directus translation arrays. Expanded relationships will use Payload's depth behavior. Media rendering will use generated `url`, localized `alt`, width, and height values. Project and post category filtering will support every related category, not only the first.

Render blog Lexical data with Payload's official React rich-text renderer. Remove `dangerouslySetInnerHTML` entirely.

Homepage and blog-list failures retain usable empty states and server-side logging. Missing detail records return 404. Configuration errors for required production secrets should fail clearly.

## 9. Rendering and revalidation

Remove the current Directus-motivated `dynamic = 'force-dynamic'` declarations from CMS-backed frontend routes. Make the rendering policy explicit with time-bounded ISR (`revalidate`) so routes are cacheable, have a periodic recovery path, and can also be invalidated immediately by Payload hooks. Production and integration builds therefore require a reachable database.

Attach collection `afterChange` and `afterDelete` hooks:

- Services, projects, testimonials, and clients revalidate `/en` and `/ar`.
- Categories revalidate `/en`, `/ar`, `/en/blog`, `/ar/blog`, and both localized blog-detail route patterns.
- Posts revalidate `/en/blog` and `/ar/blog`; post changes and deletion also revalidate the affected ID-based detail paths in both locales.
- Media changes and deletion broadly revalidate both homepages, both blog indexes, and both localized blog-detail route patterns because media can be referenced by services, projects, clients, and posts.

Use current Next.js 16 revalidation APIs with their required signatures. Use dynamic-pattern invalidation with the required `type: 'page'` argument where invalidating every localized blog detail. Remove the old externally-secreted `/api/revalidate` route once hooks fully replace it.

## 10. Vercel routing

Delete Vercel Services definitions, Directus service bindings, and the Directus catch-all rewrite. The project deploys as a normal Next.js application.

Keep canonical redirects:

- `admin.adcc.sa/` -> `https://adcc.sa/admin`.
- `admin.adcc.sa/*` -> the equivalent path on `https://adcc.sa`.
- `www.adcc.sa/*` -> the equivalent canonical `https://adcc.sa` path.

`/admin`, `/api`, localized frontend routes, Next.js assets, and metadata are all owned directly by the single Next.js deployment.

## 11. Environment contract

Production requires:

- `PAYLOAD_SECRET`.
- `DATABASE_URL`, explicitly mapped to the pooled connection variable supplied by the linked Vercel Neon integration.
- `BLOB_READ_WRITE_TOKEN` from a public Vercel Blob store.
- Canonical public server URL set to `https://adcc.sa` if needed by Payload's absolute URL configuration.

After successful cutover, remove Directus, R2, and obsolete revalidation environment values.

The ignored local `.env.example` previously contained real credentials. Delete that local file during implementation and rotate those credentials as a precaution. Do not commit an environment example because the user previously required `.env.example` to remain excluded from Git. Document variable names only, never values.

## 12. Postgres migration workflow

Follow Payload's official Postgres migration process:

1. Use development push mode only against a development database.
2. Generate the initial schema migration with Payload CLI.
3. Inspect and commit migration files.
4. Add scripts for `payload`, type generation, import-map generation, and a migration-aware CI build.
5. Run `payload migrate` before the Vercel production build.
6. Reject deployment if migration execution fails.
7. Scope Preview and Production to separate Neon databases or branches before enabling migration-aware preview builds; preview deployments must never migrate the production database accidentally.

Do not run migrations during serverless cold starts.

## 13. Dependency and file cleanup

Add matching Payload 3.86.x packages:

- `payload`.
- `@payloadcms/next`.
- `@payloadcms/db-vercel-postgres`.
- `@payloadcms/richtext-lexical`.
- `@payloadcms/storage-vercel-blob`.
- Matching Payload UI/translation packages where required.
- `sharp`.
- Payload's required `graphql` peer if pnpm requires it, without exposing GraphQL.

Remove:

- `@directus/sdk`.
- `Dockerfile.vercel`.
- `.dockerignore`.
- `lib/directus.ts`.
- Directus-only SDK calls, environment checks, service routing, tests, and asset URL construction.
- Obsolete external revalidation code after hook migration.

Retain historical research and design documents for traceability, but clearly mark Directus deployment designs as superseded by this approved Payload design.

## 14. Validation

Automated and local validation must cover:

- Frozen pnpm installation and approved Sharp build.
- Payload type and Admin import-map generation.
- TypeScript checking.
- Initial migration generation and review.
- Production Next.js build.
- Existing `/en`, `/ar`, and localized blog routes.
- `/admin` first-user, login, and authenticated Admin flows.
- Authenticated Payload REST operations.
- Rejected unauthenticated content REST operations.
- No functional GraphQL endpoint or playground: `/api/graphql` may syntactically match the REST catch-all, so tests assert a non-success/non-GraphQL response rather than claiming no Next.js route can match it.
- English and Arabic Local API results.
- Safe localized Lexical rendering.
- Blog pagination and multi-category filtering.
- Contact validation and creation.
- Vercel Blob client upload and public delivery.
- Revalidation after create, update, and delete.
- Canonical subdomain redirects.
- Absence of active Directus imports, environment references, container routes, and asset assumptions.

Production smoke tests happen only after Neon, Blob, and Payload variables exist in Vercel. No production push or Vercel dashboard mutation should occur without explicit user authorization.

## 15. Known constraints

- Full local integration, migration generation, and production build require an accessible Postgres database; Blob upload validation requires Blob credentials.
- Preview and Production database variables must target separate Neon databases or branches before migration-aware preview builds are enabled.
- The initial Payload administrator is created through Payload's first-user Admin flow after the database migration succeeds.
- Password-reset email delivery is outside this migration unless an email adapter is separately selected.
- The `graphql` package may exist only because Payload declares it as a peer; GraphQL remains disabled in config and absent from routing.
