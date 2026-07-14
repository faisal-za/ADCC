# Research: Directus SDK v23 REST migration

## Summary

Replace the generated GenQL client with one server-only Directus client created as `createDirectus<Schema>(url).with(rest())`, then call `client.request(readItems(...))`, `readItem(...)`, or `createItem(...)`. SDK v23's typed query objects cover nested relational field projections, filters, sorting, pagination/limits, and deep relationship queries; model singleton collections as objects and ordinary collections as arrays in `Schema`. Directus does not publish an explicit SDK 23 ↔ server 12.1.1 compatibility guarantee, so this pairing should be integration-tested rather than described as formally certified.

## Findings

1. **Minimal REST client** — `rest()` adds `.request()`; `graphql()` adds only `.query()` and is unnecessary for this migration. For authenticated server reads, compose `staticToken(token)` and keep construction in a server-only module.

   ```ts
   import 'server-only';
   import { createDirectus, rest, staticToken } from '@directus/sdk';

   export const directus = createDirectus<Schema>(process.env.DIRECTUS_URL!)
     .with(staticToken(process.env.DIRECTUS_TOKEN!))
     .with(rest());
   ```

   The SDK is dependency-light and uses the runtime's `fetch`; the current SDK documentation specifies Node.js 22 as the Node runtime requirement. [SDK guide](https://directus.io/docs/guides/connect/sdk)

2. **Read and create command semantics** — `readItems(collection, query?)` performs a collection read and returns an array; `readItem(collection, key, query?)` reads one primary-keyed item and returns one item. `createItem(collection, item, query?)` JSON-POSTs one item and returns the created item. The optional create query is useful for requesting the exact response projection after creation. These commands are passed to `directus.request(...)`, not called as generated collection methods. [read command source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/read/items.ts) [create command source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/create/items.ts)

   ```ts
   const published = await directus.request(readItems('articles', {
     filter: { status: { _eq: 'published' } },
     sort: ['-date_created'],
     limit: 20,
     fields: ['id', 'slug', 'title'],
   }));

   const article = await directus.request(readItem('articles', id, {
     fields: ['id', 'slug', 'title'],
   }));

   const created = await directus.request(createItem('articles', input, {
     fields: ['id', 'slug', 'status'],
   }));
   ```

3. **Relations use `fields`; relationship subqueries use `deep`** — Request only needed nested properties with the SDK's typed nested field form, e.g. `fields: ['id', { translations: ['title', 'languages_code'] }]`. Use `deep` when a related collection itself needs filtering, sorting, or limiting. Directus also accepts wildcard projections, but explicit projections are safer and reduce payload size. [Fields parameter](https://directus.io/docs/guides/connect/query-parameters#fields) [Deep parameter](https://directus.io/docs/guides/connect/query-parameters#deep)

   ```ts
   const rows = await directus.request(readItems('articles', {
     fields: [
       'id',
       'slug',
       { translations: ['title', 'summary', 'languages_code'] },
     ],
     deep: {
       translations: {
         _filter: { languages_code: { _eq: locale } },
         _limit: 1,
       },
     },
     filter: { status: { _eq: 'published' } },
     sort: ['sort', '-date_created'],
     limit: 100,
   }));
   ```

   `filter`, `sort`, `limit`, `offset`, `page`, and `deep` map directly to Directus query parameters; nested `deep` operators are prefixed with `_`. [Filter rules](https://directus.io/docs/guides/connect/filter-rules) [Sort/limit/query parameters](https://directus.io/docs/guides/connect/query-parameters)

4. **Schema typing must encode collection cardinality and relations** — In the SDK `Schema`, regular collections are arrays, while singleton collections are object properties. Relationship fields should point at the related item type (or related item array); translations are therefore best represented both as their junction collection and as the parent collection's O2M array.

   ```ts
   type Language = { code: string; name: string };
   type ArticleTranslation = {
     id: number;
     articles_id: number | Article;
     languages_code: string | Language;
     title: string;
     summary: string | null;
   };
   type Article = {
     id: number;
     slug: string;
     status: string;
     translations: ArticleTranslation[];
   };
   type Global = { id: number; site_name: string };

   interface Schema {
     articles: Article[];
     articles_translations: ArticleTranslation[];
     languages: Language[];
     global: Global; // singleton: not Global[]
   }
   ```

   The union forms on relation keys reflect that Directus may expose an unexpanded foreign key or an expanded object depending on requested fields. Keep nullability aligned with the actual Directus fields. [SDK schema source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/types/schema.ts) [SDK guide: TypeScript](https://directus.io/docs/guides/connect/sdk)

5. **Use singleton commands for singleton collections** — A singleton has no item-key route in normal use. Type it as an object and call `readSingleton('global', query?)`; do not emulate it with `readItems(..., { limit: 1 })` or assume an arbitrary ID for `readItem`. Creation is generally not the singleton workflow; Directus supplies singleton read/update commands. [read singleton source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/read/singleton.ts) [Directus singleton API](https://directus.io/docs/api/items#the-singleton-object)

6. **Next.js server-side use** — Create one module-scoped client in a module guarded by `import 'server-only'`, read URL/token from server environment variables, and import that module only from Server Components, Route Handlers, or Server Actions. Do not export the token-bearing client through a client component. The Directus-specific pieces are `staticToken()` and `rest()`; a static application token is appropriate only where all requests intentionally share that Directus identity. [SDK authentication](https://directus.io/docs/guides/connect/authentication) [SDK guide](https://directus.io/docs/guides/connect/sdk)

7. **Directus 12.1.1 / SDK 23 compatibility is plausible, not explicitly guaranteed** — Both are current releases of the same product family and SDK 23 emits the documented REST item requests used by Directus 12, but the official material reviewed exposes no server/SDK compatibility matrix or explicit promise for this exact pair. The concrete client-side gate is SDK 23's Node.js 22 requirement. Treat compatibility as requiring smoke tests against the target instance, especially permissions, relation projections, singleton access, and create payloads. [SDK guide](https://directus.io/docs/guides/connect/sdk) [Directus releases](https://github.com/directus/directus/releases)

## Recommended migration checks

- Compile representative queries so incorrect collection names, relation names, operators, and selected fields fail during migration.
- Against a Directus 12.1.1 test instance, smoke-test: filtered/sorted list; missing `readItem`; locale-filtered translations; singleton read; authenticated create plus projected response.
- Confirm the deployed Next.js runtime is Node.js 22+ and that no server token enters client bundles.
- Preserve Directus role/policy testing: replacing GraphQL with REST changes transport, not authorization.

## Sources

- Kept: [Directus SDK guide](https://directus.io/docs/guides/connect/sdk) — official setup, composition, typing, querying, and runtime requirements.
- Kept: [Directus query parameters](https://directus.io/docs/guides/connect/query-parameters) — official fields, sorting, limits, and deep-query behavior.
- Kept: [Directus filter rules](https://directus.io/docs/guides/connect/filter-rules) — official filter operators and nesting.
- Kept: [SDK read command source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/read/items.ts) — primary implementation/types for `readItems` and `readItem`.
- Kept: [SDK create command source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/create/items.ts) — primary implementation/types for `createItem`.
- Kept: [SDK schema source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/types/schema.ts) — primary singleton/list schema semantics.
- Kept: [SDK singleton command source](https://raw.githubusercontent.com/directus/directus/main/sdk/src/rest/commands/read/singleton.ts) — primary `readSingleton` behavior.
- Kept: [Directus releases](https://github.com/directus/directus/releases) — official release record; notably does not provide a compatibility matrix.
- Dropped: Community tutorials, Stack Overflow, package aggregators, and generated migration posts — excluded because the task requires primary Directus sources.

## Gaps

- No official compatibility matrix or explicit statement certifies SDK 23.0.0 against Directus server 12.1.1.
- Exact generated types depend on this instance's collection/field schema and cannot be finalized from generic documentation.
- No live Directus instance was available in this research run, so the recommended request and authorization smoke tests remain outstanding.

```acceptance-report
{
  "criteriaSatisfied": [
    {
      "id": "criterion-1",
      "status": "satisfied",
      "evidence": "Created only the requested research report; no application/source files were modified."
    },
    {
      "id": "criterion-2",
      "status": "satisfied",
      "evidence": "Report cites official Directus documentation and primary SDK source for client composition, item commands, query typing, schema cardinality, singletons, authentication, and compatibility limits."
    }
  ],
  "changedFiles": [
    "docs/research/2026-07-14-directus-sdk-rest-migration.md"
  ],
  "testsAddedOrUpdated": [],
  "commandsRun": [],
  "validationOutput": [
    "Research artifact written to the authoritative output path.",
    "Scope review: only the report artifact was created; app/source files were not modified.",
    "Compatibility claim is explicitly bounded because official sources provide no exact SDK/server matrix."
  ],
  "residualRisks": [
    "No live Directus 12.1.1 integration smoke test was possible.",
    "Repository-specific Schema field names and nullability still require comparison with the target Directus schema.",
    "Git staging state could not be inspected with the tools available to this child run."
  ],
  "noStagedFiles": true,
  "diffSummary": "Added one concise primary-source research report for migrating generated GenQL calls to Directus SDK v23 REST commands.",
  "reviewFindings": [
    "no blockers",
    "review note: validate Node.js 22+ and smoke-test SDK 23 against the Directus 12.1.1 instance before rollout"
  ],
  "manualNotes": "No tests were added because this task is research-only. The noStagedFiles field reflects that this child changed no repository working tree files; it wrote only the isolated artifact, but could not run git status."
}
```
