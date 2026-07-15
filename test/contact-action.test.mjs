import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const actionPath = new URL('../lib/actions/contact.ts', import.meta.url)
const readAction = () => readFile(actionPath, 'utf8')

test('keeps the existing form field contract and normalizes blank optional email', async () => {
  const source = await readAction()

  for (const field of ['name', 'email', 'phone_number', 'service_type', 'description']) {
    assert.match(source, new RegExp(`formData\\.get\\(['"]${field}['"]\\)`), field)
  }

  assert.match(source, /typeof value === ['"]string['"]/)
  assert.match(source, /value\.trim\(\) === ['"]['"]/)
  assert.match(source, /return undefined/)
  assert.match(source, /z\.string\(\)\.email\(['"]Invalid email address['"]\)\.optional\(\)/)
  assert.match(source, /name:\s*z\.string\(\)\.min\(1,\s*['"]Name is required['"]\)/)
  assert.match(source, /phone_number:\s*z\.string\(\)\.min\(1,\s*['"]Phone number is required['"]\)/)
  assert.match(source, /service_type:\s*optionalString/)
  assert.match(source, /description:\s*optionalString/)
})

test('creates a fixed contact submission through the server-only Payload Local API', async () => {
  const source = await readAction()

  assert.match(source, /import \{ getPayloadClient \} from ['"]@\/lib\/payload['"]/)
  assert.match(source, /const payload = await getPayloadClient\(\)/)
  assert.match(source, /payload\.create\(\{[\s\S]*collection:\s*['"]contact-submissions['"]/)
  assert.match(source, /data:\s*\{[\s\S]*name:\s*validated\.name[\s\S]*email:\s*validated\.email[\s\S]*phoneNumber:\s*validated\.phone_number[\s\S]*serviceType:\s*validated\.service_type[\s\S]*description:\s*validated\.description/)
  assert.match(source, /overrideAccess:\s*true/)
  assert.doesNotMatch(source, /@directus\/sdk|directus\.|createItem\(|\bfetch\(|\bREST\b/i)
})

test('preserves structured Zod issues and the generic unexpected failure response', async () => {
  const source = await readAction()

  assert.match(source, /error instanceof z\.ZodError/)
  assert.match(source, /return \{ success:\s*false, errors:\s*error\.issues \}/)
  assert.match(source, /return \{ success:\s*false, error:\s*['"]Failed to submit form['"] \}/)
  assert.match(source, /return \{ success:\s*true \}/)
})
