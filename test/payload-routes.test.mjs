import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const source = (path) => readFile(new URL(path, root), 'utf8')
const exists = async (path) => {
  try {
    await access(new URL(path, root))
    return true
  } catch {
    return false
  }
}

test('separates frontend and official Payload App Router files with GraphQL disabled and no GraphQL routes', async () => {
  for (const path of [
    'app/(frontend)/layout.tsx',
    'app/(frontend)/[locale]/page.tsx',
    'app/(frontend)/robots.ts',
    'app/robots.ts',
    'app/(payload)/layout.tsx',
    'app/(payload)/admin/[[...segments]]/page.tsx',
    'app/(payload)/admin/[[...segments]]/not-found.tsx',
    'app/(payload)/admin/importMap.js',
    'app/(payload)/api/[...slug]/route.ts',
    'app/(payload)/custom.scss',
  ]) {
    assert.equal(await exists(path), true, `${path} must exist`)
  }

  assert.equal(await exists('app/layout.tsx'), false)
  assert.equal(await exists('app/[locale]/page.tsx'), false)
  assert.equal(await exists('app/(payload)/api/graphql/route.ts'), false)
  assert.equal(await exists('app/(payload)/api/graphql-playground/route.ts'), false)
  assert.equal(await exists('app/(payload)/graphql/route.ts'), false)
  assert.equal(await exists('app/(payload)/graphql-playground/route.ts'), false)

  const payloadConfig = await source('payload.config.ts')
  assert.match(payloadConfig, /graphQL:\s*\{\s*disable:\s*true,?\s*\}/)

  const robotsBridge = await source('app/robots.ts')
  assert.match(robotsBridge, /from ['"]\.\/\(frontend\)\/robots['"]/)

  const admin = await source('app/(payload)/admin/[[...segments]]/page.tsx')
  const api = await source('app/(payload)/api/[...slug]/route.ts')
  const layout = await source('app/(payload)/layout.tsx')

  assert.match(admin, /RootPage/)
  assert.match(admin, /generatePageMetadata/)
  for (const handler of ['REST_GET', 'REST_POST', 'REST_DELETE', 'REST_PATCH', 'REST_PUT', 'REST_OPTIONS']) {
    assert.match(api, new RegExp(`\\b${handler}\\b`))
  }
  assert.match(layout, /RootLayout/)
  assert.match(layout, /handleServerFunctions/)
  assert.match(layout, /@payloadcms\/next\/css/)
})

test('wraps Next config with Payload while preserving analyzer and media hosts', async () => {
  const config = await source('next.config.js')

  assert.match(config, /@payloadcms\/next\/withPayload/)
  assert.match(config, /withPayload\(/)
  assert.match(config, /bundleAnalyzer/)
  assert.match(config, /process\.env\.ANALYZE\s*===\s*['"]true['"]/)
  assert.match(config, /pub-739d7839c19e41459d767b500777a0c7\.r2\.dev/)
  assert.match(config, /\*\.public\.blob\.vercel-storage\.com/)
})

test('maps the Payload config alias and keeps the existing project alias', async () => {
  const tsconfig = JSON.parse(await source('tsconfig.json'))

  assert.deepEqual(tsconfig.compilerOptions.paths['@/*'], ['./*'])
  assert.deepEqual(tsconfig.compilerOptions.paths['@payload-config'], ['./payload.config.ts'])
})

test('defends Payload Admin and REST from locale rewriting', async () => {
  const proxy = await source('proxy.ts')

  assert.match(proxy, /pathname === ['"]\/admin['"]/)
  assert.match(proxy, /pathname\.startsWith\(['"]\/admin\/['"]\)/)
  assert.match(proxy, /pathname === ['"]\/api['"]/)
  assert.match(proxy, /pathname\.startsWith\(['"]\/api\/['"]\)/)
})
