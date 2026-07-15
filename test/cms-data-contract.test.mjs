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
  assert.match(source, /typeof source === ['"]number['"]\s*\|\|\s*typeof source === ['"]string['"]/)
  assert.match(source, /value:\s*null/)
  assert.doesNotMatch(source, /\bany\b/)
})

test('normalizes locales, IDs, and unresolved relationships without losing identifiers', () => {
  assert.equal(cmsTypes.parseCMSLocale('en'), 'en')
  assert.equal(cmsTypes.parseCMSLocale('ar'), 'ar')
  assert.throws(() => cmsTypes.parseCMSLocale('fr'), RangeError)

  assert.equal(cmsTypes.parsePayloadID('42'), 42)
  assert.equal(cmsTypes.parsePayloadID(9), 9)
  for (const invalid of ['', '01', '1.5', 0, -2, Number.MAX_SAFE_INTEGER + 1]) {
    assert.equal(cmsTypes.parsePayloadID(invalid), null)
  }

  assert.equal(cmsTypes.normalizeRelation(null, String), null)
  assert.deepEqual(cmsTypes.normalizeRelation(42, String), { id: '42', value: null })
  assert.deepEqual(cmsTypes.normalizeRelation('asset-id', String), {
    id: 'asset-id',
    value: null,
  })
  assert.deepEqual(
    cmsTypes.normalizeRelation({ id: 7, title: 'Expanded' }, ({ title }) => title),
    { id: '7', value: 'Expanded' },
  )
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

test('looks up posts by strict numeric ID and only treats Payload NotFound as missing', async () => {
  const source = await readSource('lib/cms.ts')

  assert.match(source, /parsePayloadID/)
  assert.match(source, /Number\.isSafeInteger/)
  assert.match(source, /findByID\(/)
  assert.match(source, /error instanceof NotFound/)
  assert.match(source, /return null/)
})
