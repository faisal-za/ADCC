import assert from 'node:assert/strict'
import { access, readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const root = fileURLToPath(new URL('../', import.meta.url))
const exists = async (relativePath) => {
  try {
    await access(path.join(root, relativePath))
    return true
  } catch {
    return false
  }
}

const sourceExtensions = new Set(['.js', '.json', '.mjs', '.ts', '.tsx'])

async function collectSources(relativeDirectory) {
  const directory = path.join(root, relativeDirectory)
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = path.join(relativeDirectory, entry.name)
    if (entry.isDirectory()) {
      files.push(...await collectSources(relativePath))
    } else if (sourceExtensions.has(path.extname(entry.name))) {
      files.push(relativePath)
    }
  }

  return files
}

test('removes retired Directus runtime, container, and revalidation artifacts', async () => {
  for (const retiredPath of [
    'lib/directus.ts',
    'Dockerfile.vercel',
    '.dockerignore',
    'app/api/revalidate/route.ts',
    'app/(frontend)/api/revalidate/route.ts',
    'test/same-origin-directus.test.mjs',
  ]) {
    assert.equal(await exists(retiredPath), false, `${retiredPath} must be removed`)
  }
})

test('contains no retired Directus or relational database contract in active code', async () => {
  const activeFiles = [
    ...await collectSources('app'),
    ...await collectSources('components'),
    ...await collectSources('lib'),
    ...await collectSources('payload'),
    'next.config.js',
    'package.json',
    'payload.config.ts',
    'proxy.ts',
    'vercel.json',
  ]

  for (const relativePath of activeFiles) {
    const source = await readFile(path.join(root, relativePath), 'utf8')
    assert.doesNotMatch(
      source,
      /@directus\/sdk|DIRECTUS_[A-Z_]+|\/assets\/\$\{|DATABASE_URL|POSTGRES_URL|db-vercel-postgres|vercelPostgresAdapter/,
      relativePath,
    )
  }
})

test('preserves the unrelated hard-coded R2 hero host and files', async () => {
  const host = 'pub-739d7839c19e41459d767b500777a0c7.r2.dev'
  const nextConfig = await readFile(path.join(root, 'next.config.js'), 'utf8')
  const serverHero = await readFile(path.join(root, 'components/hero-section-server.tsx'), 'utf8')
  const clientHero = await readFile(path.join(root, 'components/hero-section.tsx'), 'utf8')

  assert.match(nextConfig, new RegExp(host.replaceAll('.', '\\.')))
  for (const index of [1, 2, 3]) {
    assert.match(serverHero, new RegExp(`${host}/hero-images/hero-${index}-mobile\\.jpg`))
    assert.match(clientHero, new RegExp(`${host}/hero-images/hero-${index}-mobile\\.jpg`))
    assert.match(clientHero, new RegExp(`${host}/hero-videos/video-${index}\\.webm`))
  }
  assert.match(clientHero, /hero-videos\/poster-\$\{currentVideo \+ 1\}\.jpg/)
})
