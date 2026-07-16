# Payload Arabic Admin Localization Design

**Date:** 2026-07-16  
**Status:** Approved

## Purpose

Localize all project-defined Payload Admin collection and field labels into Arabic while preserving English labels when an editor selects English. Use Payload 3.86's built-in i18n facilities and documented language-keyed label objects rather than custom Admin components or a separate translation framework.

## Current State

The application already configures:

- Payload Admin languages `en` and `ar`
- English as the Admin fallback language
- English and Arabic content locales
- RTL behavior for the Arabic content locale

Payload already translates its built-in Admin controls, authentication fields, upload fields, timestamps, validation messages, and actions. Project-defined collection and field labels currently fall back to English names inferred from slugs and field names.

Primary-source implementation guidance is recorded in [`docs/research/2026-07-16-payload-arabic-admin-labels.md`](../../research/2026-07-16-payload-arabic-admin-labels.md).

## Goals

- Display English project labels when the Admin interface language is English.
- Display Arabic project labels when the Admin interface language is Arabic.
- Localize every project-defined collection name and field label.
- Add a small bilingual navigation-group structure.
- Localize the names shown in the content-locale selector.
- Preserve Payload's existing Arabic translations and RTL behavior.

## Non-Goals

- Do not rename collection slugs, field names, API properties, or MongoDB data.
- Do not change which content fields are localized.
- Do not add descriptions, placeholders, or other new editorial guidance.
- Do not add custom React Admin components.
- Do not introduce custom translation keys or a translation framework.
- Do not override Payload's built-in Arabic strings.
- Do not modify website-facing translations.

## Payload Pattern

Use Payload's documented static language-keyed values directly in collection configuration:

```ts
labels: {
  singular: { en: 'Post', ar: 'مقال' },
  plural: { en: 'Posts', ar: 'المقالات' },
}

label: {
  en: 'Title',
  ar: 'العنوان',
}
```

Every project label must include both `en` and `ar`. English remains the fallback if a language preference is unavailable.

## Navigation Groups

| Group | Arabic | Collections |
|---|---|---|
| Content | المحتوى | Media, Services, Categories, Projects, Posts, Testimonials, Clients |
| Submissions | الطلبات | Contact Submissions |
| System | النظام | Users |

Each collection receives its group through `admin.group` as a bilingual object. No collection order changes are required.

## Collection Labels

| Slug | English singular | Arabic singular | English plural | Arabic plural |
|---|---|---|---|---|
| `users` | User | مستخدم | Users | المستخدمون |
| `media` | Media Item | ملف وسائط | Media | الوسائط |
| `services` | Service | خدمة | Services | الخدمات |
| `categories` | Category | تصنيف | Categories | التصنيفات |
| `projects` | Project | مشروع | Projects | المشاريع |
| `posts` | Post | مقال | Posts | المقالات |
| `testimonials` | Testimonial | رأي عميل | Testimonials | آراء العملاء |
| `clients` | Client | عميل | Clients | العملاء |
| `contact-submissions` | Contact Submission | طلب تواصل | Contact Submissions | طلبات التواصل |

## Field Labels

Only fields explicitly defined by this project receive labels. Payload-generated auth, upload, and timestamp fields remain untouched.

### Categories

| Field | English | Arabic |
|---|---|---|
| `title` | Title | العنوان |
| `slug` | Slug | الرابط المختصر |
| `description` | Description | الوصف |

### Clients

| Field | English | Arabic |
|---|---|---|
| `name` | Name | الاسم |
| `logo` | Logo | الشعار |

### Contact Submissions

| Field | English | Arabic |
|---|---|---|
| `name` | Name | الاسم |
| `email` | Email | البريد الإلكتروني |
| `phoneNumber` | Phone Number | رقم الهاتف |
| `serviceType` | Service Type | نوع الخدمة |
| `description` | Description | الوصف |

### Media

| Field | English | Arabic |
|---|---|---|
| `alt` | Alt Text | النص البديل |

### Posts

| Field | English | Arabic |
|---|---|---|
| `title` | Title | العنوان |
| `description` | Description | الوصف |
| `content` | Content | المحتوى |
| `image` | Image | الصورة |
| `readTime` | Read Time (Minutes) | مدة القراءة (بالدقائق) |
| `categories` | Categories | التصنيفات |

### Projects

| Field | English | Arabic |
|---|---|---|
| `title` | Title | العنوان |
| `description` | Description | الوصف |
| `images` | Images | الصور |
| `categories` | Categories | التصنيفات |

### Services

| Field | English | Arabic |
|---|---|---|
| `title` | Title | العنوان |
| `description` | Description | الوصف |
| `icon` | Icon | الأيقونة |
| `image` | Image | الصورة |

### Testimonials

| Field | English | Arabic |
|---|---|---|
| `name` | Name | الاسم |
| `client` | Client | العميل |
| `text` | Testimonial | نص الرأي |
| `rating` | Rating | التقييم |

The Users collection has no project-defined fields.

## Content-Locale Selector

Change the locale selector's display labels without changing locale codes:

- `en`: `{ en: 'English', ar: 'الإنجليزية' }`
- `ar`: `{ en: 'Arabic', ar: 'العربية' }`

The Arabic locale retains `rtl: true`.

## Data and Runtime Behavior

These changes affect Admin presentation only. Payload collection slugs, field names, generated types, REST contracts, Local API calls, stored documents, and website rendering remain unchanged. Switching the Admin language through Account settings causes Payload to select the corresponding value from each label object.

## Validation

Implementation must include:

1. A focused contract check confirming all nine collections define bilingual singular/plural labels and a bilingual Admin group.
2. A focused contract check confirming every project-defined field has both English and Arabic labels.
3. A check confirming both content-locale selector labels are bilingual and Arabic remains RTL.
4. Payload type and import-map generation.
5. Repository tests and TypeScript checking.
6. Production build.
7. An authenticated Admin smoke test that switches the interface to Arabic and verifies Arabic navigation, collection labels, representative field labels, and RTL layout; switching back to English must restore English labels.

## Acceptance Criteria

- All project-defined collection and field labels switch between English and Arabic with the editor's Admin language preference.
- The three navigation groups display in the selected language.
- Content-locale selector names display in the selected language.
- Payload's built-in strings remain managed by its official language pack.
- No database, API, schema, website-content, or access-control behavior changes.
- Tests, type checking, type/import-map generation, and production build pass.
