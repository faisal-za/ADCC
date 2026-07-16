# Payload 3.86 Arabic Admin Label Localization

## Primary-source findings

- Payload separates **Admin interface language** (`i18n`) from **content localization** (`localization`). Built-in Admin controls and API errors are translated by `@payloadcms/translations`; project-defined collection and field text must be supplied by the project. [Payload i18n documentation](https://payloadcms.com/docs/configuration/i18n)
- The supported project pattern is a language-keyed object, such as `{ en: 'Title', ar: 'العنوان' }`, wherever a config property accepts translated text. Payload documents this for collection singular/plural labels, collection Admin groups, field labels, and placeholders. [Project Translations](https://payloadcms.com/docs/configuration/i18n#project-translations)
- `i18n.supportedLanguages: { en, ar }` loads Payload's built-in English and Arabic Admin translations. `fallbackLanguage` controls the interface fallback. Editors can change their interface language from Account settings, and Payload stores that preference. [Adding Languages](https://payloadcms.com/docs/configuration/i18n#adding-languages), [Changing Languages](https://payloadcms.com/docs/configuration/i18n#changing-languages)
- `localization.locales[].rtl: true` makes localized input fields use RTL when the Arabic content locale is active. Payload's Root Admin layout also identifies Arabic as an RTL interface language through `@payloadcms/translations`. [Localization locale object](https://payloadcms.com/docs/configuration/localization#locale-object), [Payload 3.86 Root layout source](https://github.com/payloadcms/payload/blob/v3.86.0/packages/next/src/layouts/Root/index.tsx)

## Supported translated configuration surfaces

Payload 3.86's public types permit language-keyed records on these relevant surfaces:

- `CollectionConfig.labels.singular` and `.plural`
- `CollectionConfig.admin.group`
- Field `label`
- `admin.description`
- Text, textarea, email, number, date, code, JSON and similar field placeholders where their field type declares `Record<string, string> | string`
- Relationship/select placeholders through a `LabelFunction` or string; a `LabelFunction` can use Payload's `t` function for custom translation keys
- Select option labels (`OptionLabel` accepts `StaticLabel`, including language-keyed records)
- Array and blocks singular/plural labels
- Named visual structures such as tab, group, collapsible and block labels when their config type accepts `StaticLabel` / language-keyed records
- Content-locale selector labels (`localization.locales[].label`)

Sources: [Payload 3.86 config types](https://github.com/payloadcms/payload/blob/v3.86.0/packages/payload/src/config/types.ts), [field config types](https://github.com/payloadcms/payload/blob/v3.86.0/packages/payload/src/fields/config/types.ts), [collection config types](https://github.com/payloadcms/payload/blob/v3.86.0/packages/payload/src/collections/config/types.ts).

## Important distinctions

- A field's `localized: true` controls stored content values; it does **not** translate that field's Admin label. The `label` property handles the interface text.
- Slugs and field names must remain stable English identifiers because they are API/database contracts. Only display labels, descriptions, placeholders and option labels should be translated.
- Built-in auth/upload/timestamp fields are already translated by Payload's Arabic language pack. The project should not duplicate or replace those translations unless a deliberate wording override is required.
- Not every placeholder type accepts a language-keyed object directly. For relationship/select placeholders, the safe supported method is a `LabelFunction` backed by typed custom `i18n.translations` keys if translated placeholders are needed.
- Custom translation keys are mainly useful for repeated phrases or function-only properties. For this project's static collection and field names, direct `{ en, ar }` labels are simpler and match Payload's documented project-translation pattern.

## Current ADCC configuration

The application already has:

- `i18n.supportedLanguages: { en, ar }`
- English fallback language
- content locales `en` and `ar`
- `rtl: true` for the Arabic content locale

The nine collection configs currently rely almost entirely on labels inferred from English slugs and field names. No current collection defines tabs, groups, blocks, select options, descriptions or placeholders, so the immediate useful scope is collection labels, field labels, collection Admin grouping, and localized content-locale selector names. Additional descriptions/placeholders would be new editorial guidance rather than merely translation of existing text.
