import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const globalsPath = new URL('../lib/globals.css', import.meta.url)
const footerPath = new URL('../components/footer.tsx', import.meta.url)

test('enabled semantic interactive controls use the pointer cursor', async () => {
  const globals = await readFile(globalsPath, 'utf8')
  const pointerRule = globals.match(
    /:where\(\s*a\[href\],[\s\S]*?\)\s*\{\s*cursor:\s*pointer;\s*\}/,
  )?.[0]
  const disabledRule = globals.match(
    /:where\(\s*button:disabled,[\s\S]*?\)\s*\{\s*cursor:\s*not-allowed;\s*\}/,
  )?.[0]

  assert.ok(pointerRule)
  assert.match(pointerRule, /button:not\(:disabled\)/)
  assert.match(pointerRule, /\[role="option"\]:not\(\[aria-disabled="true"\]\)/)
  assert.ok(disabledRule)
  assert.match(disabledRule, /\[aria-disabled="true"\]/)
  assert.match(disabledRule, /\[data-disabled\]/)
})

test('opening a Radix dropdown keeps the page width stable', async () => {
  const globals = await readFile(globalsPath, 'utf8')

  assert.match(globals, /html\s*\{[^}]*scrollbar-gutter:\s*stable/s)
  assert.match(
    globals,
    /html body\[data-scroll-locked\]\s*\{[^}]*margin-right:\s*0\s*!important/s,
  )
})

test('the footer copyright year follows the current year', async () => {
  const footer = await readFile(footerPath, 'utf8')

  assert.match(footer, /new Date\(\)\.getFullYear\(\)/)
  assert.doesNotMatch(footer, /&copy;\s*2024/)
})
