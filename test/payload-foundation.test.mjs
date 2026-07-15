import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const packageJson = JSON.parse(await readFile(new URL('package.json', root), 'utf8'))
const workspaceConfig = await readFile(new URL('pnpm-workspace.yaml', root), 'utf8')

const exactPayloadPackages = [
  'payload',
  '@payloadcms/next',
  '@payloadcms/db-vercel-postgres',
  '@payloadcms/richtext-lexical',
  '@payloadcms/storage-vercel-blob',
  '@payloadcms/ui',
  '@payloadcms/translations',
]

test('pins the Payload CMS package family to one exact version', () => {
  for (const dependency of exactPayloadPackages) {
    assert.equal(
      packageJson.dependencies?.[dependency],
      '3.86.0',
      `${dependency} must be pinned exactly to 3.86.0`,
    )
  }
})

test('pins Payload runtime peers and keeps Sharp build approval explicit', () => {
  assert.equal(packageJson.dependencies?.sharp, '0.34.5')
  assert.equal(packageJson.dependencies?.graphql, '16.11.0')
  assert.match(workspaceConfig, /^  sharp:\s*true\s*$/m)
  assert.match(workspaceConfig, /^  esbuild:\s*true\s*$/m)
  assert.match(workspaceConfig, /^  bufferutil:\s*false\s*$/m)
})

test('provides Payload maintenance and migration-aware CI scripts', () => {
  assert.equal(packageJson.scripts?.payload, 'cross-env NODE_OPTIONS=--no-deprecation payload')
  assert.equal(packageJson.scripts?.['generate:types'], 'pnpm payload generate:types')
  assert.equal(packageJson.scripts?.['generate:importmap'], 'pnpm payload generate:importmap')
  assert.equal(packageJson.scripts?.ci, 'pnpm payload migrate && pnpm build')

  for (const scriptName of Object.keys(packageJson.scripts ?? {})) {
    assert.doesNotMatch(scriptName, /graphql/i)
  }
})

test('contains no Directus runtime dependency after retirement', () => {
  assert.equal(packageJson.dependencies?.['@directus/sdk'], undefined)
})
