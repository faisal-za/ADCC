import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)
const readSource = (path) => readFile(new URL(path, root), 'utf8')

const indexPath = 'app/(frontend)/[locale]/blog/page.tsx'
const detailPath = 'app/(frontend)/[locale]/blog/[id]/page.tsx'

test('loads the initial localized blog page and categories in parallel with ISR', async () => {
  const source = await readSource(indexPath)

  assert.match(source, /getBlogPage/)
  assert.match(source, /getCategories/)
  assert.match(source, /Promise\.all\(/)
  assert.match(source, /parseCMSLocale/)
  assert.match(source, /export const revalidate\s*=\s*3600/)
  assert.doesNotMatch(source, /force-dynamic|@directus|directus\.|aggregate\(|readItems|translations|\bany\b/)
  assert.match(source, /hasNextPage:\s*false/)
  assert.match(source, /totalDocs:\s*0/)
})

test('uses validated page-based Payload pagination with optional server category filtering', async () => {
  const source = await readSource('lib/actions/blog.ts')

  assert.match(source, /getBlogPage/)
  assert.match(source, /parseCMSLocale/)
  assert.match(source, /page:\s*number/)
  assert.match(source, /limit:\s*number/)
  assert.match(source, /categoryId\?:\s*string/)
  assert.match(source, /categoryId/)
  assert.doesNotMatch(source, /offset|@directus|directus\.|readItems|translations|\bany\b/)
})

test('keeps category pagination isolated with stable keys and stale-request protection', async () => {
  const source = await readSource('components/blog-page-client.tsx')

  assert.match(source, /PostCardView\[\]/)
  assert.match(source, /CategoryView\[\]/)
  assert.match(source, /BlogPageResult/)
  assert.match(source, /initialResult\.totalDocs/)
  assert.match(source, /result\.totalDocs/)
  assert.match(source, /queryKey:\s*\[[\s\S]*locale[\s\S]*category[\s\S]*page/s)
  assert.match(source, /requestSequence/)
  assert.match(source, /loadPage\(categoryId,\s*1,\s*true\)/)
  assert.match(source, /categoryId/)
  assert.doesNotMatch(source, /currentOffset|offset|translations|directus_files|['"`]\/assets\/\$\{|:\s*any\b|\bany\[\]/)
  assert.doesNotMatch(source, /blogData\.filter\(/)
})

test('renders all normalized post categories and safe Blob media with ID links', async () => {
  const source = await readSource('components/blog-page-client.tsx')

  assert.match(source, /post\.categories\.map\(\(category\)/)
  assert.match(source, /category\.value\?\.title/)
  assert.match(source, /post\.image\?\.value\?\.url/)
  assert.match(source, /blog\/\$\{post\.id\}/)
  assert.doesNotMatch(source, /categories\?\.\[0\]|categories\.\[0\]/)
})

test('renders dynamic ISR blog details with the official Lexical renderer', async () => {
  const source = await readSource(detailPath)

  assert.match(source, /getBlogPost/)
  assert.match(source, /parseCMSLocale/)
  assert.match(source, /@payloadcms\/richtext-lexical\/react/)
  assert.match(source, /<RichText[\s\S]*data=\{blogPost\.content\}/)
  assert.match(source, /export const revalidate\s*=\s*3600/)
  assert.match(source, /export const dynamicParams\s*=\s*true/)
  assert.match(source, /generateStaticParams\(\)[\s\S]*return \[\]/)
  assert.match(source, /notFound\(\)/)
  assert.match(source, /blogPost\.image\?\.value\?\.url/)
  assert.match(source, /blogPost\.categories\.map\(\(category\)/)
  assert.doesNotMatch(source, /dangerouslySetInnerHTML|@directus|directus\.|readItem|translations|['"`]\/assets\/\$\{|\bany\b/)
})
