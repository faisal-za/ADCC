import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const readSource = (path) => readFile(new URL(path, root), 'utf8')

const collections = [
  ['Users.ts', 'users'],
  ['Media.ts', 'media'],
  ['Services.ts', 'services'],
  ['Categories.ts', 'categories'],
  ['Projects.ts', 'projects'],
  ['Posts.ts', 'posts'],
  ['Testimonials.ts', 'testimonials'],
  ['Clients.ts', 'clients'],
  ['ContactSubmissions.ts', 'contact-submissions'],
]

test('configures Payload with explicit Neon, public Blob, localization, and disabled GraphQL', async () => {
  const source = await readSource('payload.config.ts')

  assert.match(source, /graphQL:\s*\{\s*disable:\s*true,?\s*\}/s)
  assert.match(source, /vercelPostgresAdapter\(\{[\s\S]*pool:\s*\{[\s\S]*connectionString:\s*process\.env\.DATABASE_URL/)
  assert.doesNotMatch(source, /POSTGRES_URL/)
  assert.match(source, /vercelBlobStorage\(\{[\s\S]*access:\s*['"]public['"]/)
  assert.match(source, /collections:\s*\{\s*media:\s*true\s*\}/s)
  assert.match(source, /token:\s*process\.env\.BLOB_READ_WRITE_TOKEN/)
  assert.match(source, /clientUploads:\s*true/)
  assert.match(source, /code:\s*['"]ar['"][\s\S]*rtl:\s*true/)
  assert.match(source, /defaultLocale:\s*['"]en['"]/)
  assert.match(source, /editor:\s*lexicalEditor\(\)/)
  assert.match(source, /process\.env\.NODE_ENV\s*===\s*['"]production['"]/)
  for (const name of ['PAYLOAD_SECRET', 'DATABASE_URL', 'BLOB_READ_WRITE_TOKEN']) {
    assert.match(source, new RegExp(`['"]${name}['"]`))
  }
  assert.match(source, /throw new Error\(`\$\{name\} is required in production`\)/)
  assert.doesNotMatch(source, /payloadCloudPlugin/)
})

test('defines all approved collections and leaves posts unversioned', async () => {
  for (const [filename, slug] of collections) {
    const source = await readSource(`payload/collections/${filename}`)
    assert.match(source, new RegExp(`slug:\\s*['"]${slug}['"]`), `${filename} must use ${slug}`)
  }

  const posts = await readSource('payload/collections/Posts.ts')
  assert.doesNotMatch(posts, /\bversions\s*:/)
  assert.doesNotMatch(posts, /\bdrafts\s*:/)
})

test('protects REST operations and preserves the users bootstrap collection', async () => {
  const access = await readSource('payload/access/is-authenticated.ts')
  assert.match(access, /Boolean\(req\.user\)/)

  const users = await readSource('payload/collections/Users.ts')
  assert.match(users, /auth:\s*true/)
  assert.doesNotMatch(users, /roles/)

  for (const [filename] of collections.filter(([name]) => name !== 'Users.ts')) {
    const source = await readSource(`payload/collections/${filename}`)
    assert.match(source, /access:\s*authenticatedAccess/, `${filename} must authenticate REST CRUD`)
  }
})

test('wires after-change and after-delete revalidation including broad relation paths', async () => {
  const hooks = await readSource('payload/hooks/revalidate.ts')

  assert.match(hooks, /revalidatePath\(['"]\/en['"]\)/)
  assert.match(hooks, /revalidatePath\(['"]\/ar['"]\)/)
  assert.match(hooks, /revalidatePath\(['"]\/en\/blog['"]\)/)
  assert.match(hooks, /revalidatePath\(['"]\/ar\/blog['"]\)/)
  assert.match(hooks, /revalidatePath\(['"]\/en\/blog\/\[id\]['"],\s*['"]page['"]\)/)
  assert.match(hooks, /revalidatePath\(['"]\/ar\/blog\/\[id\]['"],\s*['"]page['"]\)/)
  assert.match(hooks, /afterChange/)
  assert.match(hooks, /afterDelete/)

  for (const filename of ['Media.ts', 'Services.ts', 'Categories.ts', 'Projects.ts', 'Posts.ts', 'Testimonials.ts', 'Clients.ts']) {
    const source = await readSource(`payload/collections/${filename}`)
    assert.match(source, /afterChange:/, `${filename} needs afterChange`)
    assert.match(source, /afterDelete:/, `${filename} needs afterDelete`)
  }
})

test('does not embed credential-shaped values in Payload source', async () => {
  const files = ['payload.config.ts', ...collections.map(([name]) => `payload/collections/${name}`)]
  const source = (await Promise.all(files.map(readSource))).join('\n')

  assert.doesNotMatch(source, /postgres(?:ql)?:\/\/[^\s'"`]+:[^\s'"`]+@/i)
  assert.doesNotMatch(source, /vercel_blob_rw_[A-Za-z0-9_-]+/)
  assert.doesNotMatch(source, /BLOB_READ_WRITE_TOKEN\s*\|\|\s*['"][^'"]+['"]/)
})
