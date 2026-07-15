import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const proxySource = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')
const nextConfigSource = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')
const dockerfileSource = readFileSync(new URL('../Dockerfile.vercel', import.meta.url), 'utf8')

const frontendSources = [
  '/',
  '/en',
  '/en/(.*)',
  '/ar',
  '/ar/(.*)',
  '/_next/(.*)',
  '/api/revalidate',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/logo_dark.png',
  '/logo_white.png',
]

const serviceDestination = (service) => ({ service })

test('routes the frontend allowlist before the Directus catch-all', () => {
  assert.deepEqual(
    vercel.rewrites.map(({ source }) => source),
    [...frontendSources, '/(.*)'],
  )

  for (const rewrite of vercel.rewrites.slice(0, -1)) {
    assert.deepEqual(rewrite.destination, serviceDestination('frontend'))
    assert.equal(rewrite.has, undefined)
  }

  assert.deepEqual(
    vercel.rewrites.at(-1),
    { source: '/(.*)', destination: serviceDestination('directus') },
  )
})

test('binds the frontend runtime to the Directus service', () => {
  assert.deepEqual(vercel.services.frontend.bindings, [
    {
      type: 'service',
      service: 'directus',
      format: 'url',
      env: 'DIRECTUS_INTERNAL_URL',
    },
  ])
})

test('redirects legacy hosts at the top-level routing layer', () => {
  assert.deepEqual(vercel.redirects, [
    {
      source: '/',
      has: [{ type: 'host', value: 'admin.adcc.sa' }],
      destination: 'https://adcc.sa/admin',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'admin.adcc.sa' }],
      destination: 'https://adcc.sa/:path*',
      permanent: true,
    },
    {
      source: '/:path*',
      has: [{ type: 'host', value: 'www.adcc.sa' }],
      destination: 'https://adcc.sa/:path*',
      permanent: true,
    },
  ])
})

test('does not reinterpret the Directus Admin path as a locale', () => {
  assert.match(proxySource, /pathname === ['"]\/admin['"]/)
  assert.match(proxySource, /pathname\.startsWith\(['"]\/admin\/['"]\)/)
})

test('keeps canonical host routing out of the frontend-only Next config', () => {
  assert.doesNotMatch(nextConfigSource, /async redirects\s*\(/)
})

test('starts Directus immediately on Vercel-provided host and port settings', () => {
  assert.match(dockerfileSource, /^ENV HOST=0\.0\.0\.0\r?$/m)
  assert.match(dockerfileSource, /^CMD \["node", "cli\.js", "start"\]\r?$/m)
  assert.doesNotMatch(dockerfileSource, /^\s*ENV\s+PORT(?:\s|=)/m)
  assert.doesNotMatch(dockerfileSource, /^\s*(?:RUN|CMD|ENTRYPOINT)\b.*\bbootstrap\b/m)
})
