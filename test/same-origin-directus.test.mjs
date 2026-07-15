import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const runtimeFiles = [
  'lib/directus.ts',
  'components/services-section.tsx',
  'components/projects-section.tsx',
  'components/clients-section.tsx',
  'components/blog-page-client.tsx',
  'app/(frontend)/[locale]/blog/[id]/page.tsx',
  'app/(frontend)/layout.tsx',
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
    'components/blog-page-client.tsx',
    'app/(frontend)/[locale]/blog/[id]/page.tsx',
  ]

  for (const path of assetFiles) {
    assert.match(read(path), /['"`]\/assets\/\$\{/, path)
  }
})
