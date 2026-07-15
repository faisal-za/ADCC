import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const readSource = (path) => readFile(new URL(path, root), 'utf8')

const homepagePath = 'app/(frontend)/[locale]/page.tsx'
const cmsComponents = [
  'components/services-section.tsx',
  'components/projects-section.tsx',
  'components/testimonials-section.tsx',
  'components/clients-section.tsx',
]

test('renders cacheable homepage data through the Payload helper with graceful empty state', async () => {
  const source = await readSource(homepagePath)

  assert.match(source, /getHomepageData/)
  assert.match(source, /parseCMSLocale/)
  assert.match(source, /export const revalidate\s*=\s*3600/)
  assert.doesNotMatch(source, /force-dynamic|@directus|directus\.|readItems/)
  assert.doesNotMatch(source, /\bany\[\]|:\s*any\b/)
  assert.match(source, /services:\s*\[\]/)
  assert.match(source, /projects:\s*\[\]/)
  assert.match(source, /categories:\s*\[\]/)
  assert.match(source, /testimonials:\s*\[\]/)
  assert.match(source, /clients:\s*\[\]/)
  assert.match(source, /console\.error\(/)
})

test('uses typed Payload fields and safe Blob relationships in homepage sections', async () => {
  for (const path of cmsComponents) {
    const source = await readSource(path)
    assert.match(source, /@\/lib\/cms-types/)
    assert.doesNotMatch(source, /translations|directus_files|['"`]\/assets\/\$\{|\bany\[\]|:\s*any\b/)
  }

  const services = await readSource('components/services-section.tsx')
  const clients = await readSource('components/clients-section.tsx')
  const projects = await readSource('components/projects-section.tsx')

  assert.match(services, /service\.image\?\.value/)
  assert.match(services, /image\?\.url/)
  assert.match(clients, /client\.logo\?\.value\?\.url/)
  assert.match(projects, /image\.value\?\.url/)
})

test('filters and renders every project category relationship', async () => {
  const source = await readSource('components/projects-section.tsx')

  assert.match(source, /project\.categories\.some\(\(category\)\s*=>\s*category\.id\s*===\s*selectedCategory\)/)
  assert.match(source, /project\.categories\.map\(\(category\)/)
  assert.match(source, /category\.value\?\.title/)
  assert.doesNotMatch(source, /categories\?\.\[0\]|categories\.\[0\]/)
})

test('keeps testimonial fallback content typed after removing translation arrays', async () => {
  const source = await readSource('components/testimonials-section.tsx')

  assert.match(source, /fallbackTestimonials:\s*TestimonialView\[\]/)
  assert.match(source, /testimonials\?:\s*TestimonialView\[\]/)
  assert.match(source, /testimonial\.name/)
  assert.match(source, /testimonial\.client/)
  assert.match(source, /testimonial\.text/)
  assert.doesNotMatch(source, /testimonial\.translations|testimonial\.company|testimonial\.content/)
})

test('preserves unrelated hard-coded R2 hero assets and configuration', async () => {
  const sources = await Promise.all([
    readSource('components/hero-section.tsx'),
    readSource('components/hero-section-server.tsx'),
    readSource('app/(frontend)/layout.tsx'),
    readSource('next.config.js'),
  ])

  for (const [index, source] of sources.entries()) {
    assert.match(
      source,
      /pub-739d7839c19e41459d767b500777a0c7\.r2\.dev/,
      `R2 reference missing from source ${index}`,
    )
  }
})
