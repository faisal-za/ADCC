import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const vercel = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const proxySource = readFileSync(new URL('../proxy.ts', import.meta.url), 'utf8')
const nextConfigSource = readFileSync(new URL('../next.config.js', import.meta.url), 'utf8')

test('deploys one Next and Payload application without services or route rewrites', () => {
  assert.deepEqual(Object.keys(vercel).sort(), ['$schema', 'redirects'])
  assert.equal(vercel.$schema, 'https://openapi.vercel.sh/vercel.json')

  for (const retiredKey of ['services', 'rewrites', 'buildCommand']) {
    assert.equal(vercel[retiredKey], undefined, `${retiredKey} must remain absent`)
  }
})

test('keeps only the exact canonical legacy-host redirects', () => {
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

test('keeps Payload Admin and API owned by Next without locale rewriting', () => {
  assert.match(proxySource, /pathname === ['"]\/admin['"]/)
  assert.match(proxySource, /pathname\.startsWith\(['"]\/admin\/['"]\)/)
  assert.match(proxySource, /pathname === ['"]\/api['"]/)
  assert.match(proxySource, /pathname\.startsWith\(['"]\/api\/['"]\)/)
})

test('keeps canonical host routing out of the Next config', () => {
  assert.doesNotMatch(nextConfigSource, /async redirects\s*\(/)
})
