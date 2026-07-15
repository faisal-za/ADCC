'use server'

import { getPayloadClient } from '@/lib/payload'
import { z } from 'zod'

const normalizeOptionalString = (value: unknown) => {
  if (value == null) return undefined
  if (typeof value === 'string' && value.trim() === '') return undefined
  return typeof value === 'string' ? value.trim() : value
}

const optionalString = z.preprocess(
  normalizeOptionalString,
  z.string().optional(),
)

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.preprocess(
    normalizeOptionalString,
    z.string().email('Invalid email address').optional(),
  ),
  phone_number: z.string().min(1, 'Phone number is required'),
  service_type: optionalString,
  description: optionalString,
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone_number: formData.get('phone_number'),
      service_type: formData.get('service_type'),
      description: formData.get('description'),
    }

    const validated = contactSchema.parse(data)
    const payload = await getPayloadClient()

    await payload.create({
      collection: 'contact-submissions',
      data: {
        name: validated.name,
        email: validated.email,
        phoneNumber: validated.phone_number,
        serviceType: validated.service_type,
        description: validated.description,
      },
      overrideAccess: true,
    })

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.issues }
    }
    return { success: false, error: 'Failed to submit form' }
  }
}
