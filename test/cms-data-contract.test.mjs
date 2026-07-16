import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const readSource = (path) => readFile(new URL(path, root), 'utf8')
const cmsTypes = await import(new URL('../lib/cms-types.ts', import.meta.url))

test('keeps Payload initialization server-only and token-free', async () => {
  const source = await readSource('lib/payload.ts')

  assert.match(source, /import ['"]server-only['"]/)
  assert.match(source, /config from ['"]@payload-config['"]/)
  assert.match(source, /getPayload\(\{\s*config\s*\}\)/s)
  assert.doesNotMatch(source, /DIRECTUS|TOKEN|fetch\(|axios|\/api\//i)
})

test('defines strict locales and serializable relationship-safe CMS view models', async () => {
  const source = await readSource('lib/cms-types.ts')

  assert.match(source, /type CMSLocale\s*=\s*['"]en['"]\s*\|\s*['"]ar['"]/)
  assert.match(source, /parseCMSLocale/)
  assert.match(source, /throw new RangeError/)
  assert.match(source, /type CMSRelation<[^>]+>\s*=\s*\{[\s\S]*id:\s*string[\s\S]*value:\s*T\s*\|\s*null/)
  assert.match(source, /typeof source === ['"]string['"]/)
  assert.doesNotMatch(source, /typeof source === ['"]number['"]/)
  assert.match(source, /value:\s*null/)
  assert.doesNotMatch(source, /\bany\b/)
})

test('normalizes locales, strict Mongo ObjectIDs, and unresolved relationships without losing identifiers', () => {
  assert.equal(cmsTypes.parseCMSLocale('en'), 'en')
  assert.equal(cmsTypes.parseCMSLocale('ar'), 'ar')
  assert.throws(() => cmsTypes.parseCMSLocale('fr'), RangeError)

  const objectID = '507f1f77bcf86cd799439011'
  const upperObjectID = '507F1F77BCF86CD799439011'
  assert.equal(cmsTypes.parsePayloadID(objectID), objectID)
  assert.equal(cmsTypes.parsePayloadID(upperObjectID), upperObjectID)
  for (const invalid of ['', '42', '507f1f77bcf86cd79943901', '507f1f77bcf86cd7994390110', 'g07f1f77bcf86cd799439011', ` ${objectID}`, 9, null]) {
    assert.equal(cmsTypes.parsePayloadID(invalid), null)
  }

  assert.equal(cmsTypes.normalizeRelation(null, String), null)
  assert.deepEqual(cmsTypes.normalizeRelation(objectID, String), {
    id: objectID,
    value: null,
  })
  assert.deepEqual(
    cmsTypes.normalizeRelation({ id: objectID, title: 'Expanded' }, ({ title }) => title),
    { id: objectID, value: 'Expanded' },
  )
})

test('generates Mongo string identifiers for Payload collections', async () => {
  const generated = await readSource('payload-types.ts')

  assert.match(generated, /export interface User \{[\s\S]*?id: string;/)
  assert.match(generated, /export interface Post \{[\s\S]*?id: string;/)
  assert.doesNotMatch(generated, /\bid: number;/)
})

test('reads homepage collections in parallel through trusted Local API calls', async () => {
  const source = await readSource('lib/cms.ts')

  assert.match(source, /Promise\.all\(/)
  for (const collection of ['services', 'projects', 'categories', 'testimonials', 'clients']) {
    assert.match(source, new RegExp(`collection:\\s*['"]${collection}['"]`))
  }
  assert.match(source, /pagination:\s*false/)
  assert.match(source, /overrideAccess:\s*true/)
  assert.match(source, /depth:\s*1/)
  assert.doesNotMatch(source, /fetch\(|axios|@directus|DIRECTUS|staticToken|rest\(/i)
  assert.doesNotMatch(source, /\bany\b/)
})

test('uses Payload pagination and all-category relationship filtering', async () => {
  const source = await readSource('lib/cms.ts')

  assert.match(source, /sort:\s*['"]-createdAt['"]/)
  assert.match(source, /categories:\s*\{\s*contains:/s)
  assert.match(source, /totalDocs:/)
  assert.match(source, /hasNextPage:/)
  assert.match(source, /page:/)
  assert.match(source, /limit:/)
})

test('looks up posts by strict Mongo ObjectID and only treats Payload NotFound as missing', async () => {
  const source = await readSource('lib/cms.ts')
  const typesSource = await readSource('lib/cms-types.ts')

  assert.match(source, /parsePayloadID/)
  assert.match(typesSource, /\^\[a-fA-F0-9\]\{24\}\$/)
  assert.doesNotMatch(typesSource, /Number\.isSafeInteger|Number\(id\)/)
  assert.match(source, /findByID\(/)
  assert.match(source, /error instanceof NotFound/)
  assert.match(source, /return null/)
})
