# Payload Arabic Admin Localization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make every project-defined Payload collection and field label switch between English and Arabic with the editor's selected Admin language.

**Architecture:** Use Payload 3.86's native static language-keyed label objects directly in the nine collection configs and content-locale definitions. Keep slugs, field names, persisted data, APIs, and website localization unchanged.

**Tech Stack:** Payload CMS 3.86.0, TypeScript 6.0.3, Next.js 16.2.10.

## Global Constraints

- Every project-defined display label uses the exact `en` and `ar` values from `docs/superpowers/specs/2026-07-16-payload-arabic-admin-localization-design.md`.
- Keep collection slugs, field names, API properties, MongoDB data, localization flags, access controls, and hooks unchanged.
- Add no custom Admin components, custom translation keys, descriptions, placeholders, schema fields, or dependencies.
- Leave Payload-generated labels to Payload's official Arabic language pack.
- Per the user's execution override, do not add or run functional tests; the user will test the Admin behavior. Run only the existing TypeScript check.

---

### Task 1: Apply Payload's native bilingual labels

**Files:**
- Modify: `payload.config.ts`
- Modify: `payload/collections/Users.ts`
- Modify: `payload/collections/Media.ts`
- Modify: `payload/collections/Services.ts`
- Modify: `payload/collections/Categories.ts`
- Modify: `payload/collections/Projects.ts`
- Modify: `payload/collections/Posts.ts`
- Modify: `payload/collections/Testimonials.ts`
- Modify: `payload/collections/Clients.ts`
- Modify: `payload/collections/ContactSubmissions.ts`

**Interfaces:**
- Consumes: Payload `CollectionConfig` language-keyed `labels`, `admin.group`, and field `label` properties.
- Produces: bilingual Admin display configuration without data-contract changes.

- [x] **Step 1: Add collection labels and navigation groups**

Add bilingual singular/plural labels to all nine collections. Use Content/المحتوى for Media, Services, Categories, Projects, Posts, Testimonials, and Clients; Submissions/الطلبات for Contact Submissions; System/النظام for Users.

```ts
labels: {
  singular: { en: 'Post', ar: 'مقال' },
  plural: { en: 'Posts', ar: 'المقالات' },
},
admin: {
  group: { en: 'Content', ar: 'المحتوى' },
  useAsTitle: 'title',
},
```

- [x] **Step 2: Add field labels**

Add each exact `label: { en, ar }` pair from the approved design to every project-defined field. Do not alter field names, types, validation, localization, relationships, access, or hooks.

- [x] **Step 3: Localize content-locale selector names**

```ts
{ code: 'en', label: { en: 'English', ar: 'الإنجليزية' } }
{ code: 'ar', label: { en: 'Arabic', ar: 'العربية' }, rtl: true }
```

- [x] **Step 4: Type-check and inspect the diff**

Run:

```bash
pnpm check
git diff --check
```

Expected: TypeScript exits successfully and Git reports no whitespace errors.

- [x] **Step 5: Commit**

```bash
git add payload.config.ts payload/collections docs/superpowers/plans/2026-07-16-payload-arabic-admin-localization.md
git commit -m "feat: localize Payload admin labels in Arabic"
```
