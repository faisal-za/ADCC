'use server'

import { z } from 'zod'
import { directus } from '../directus'
import { generateMutationOp } from '../generated'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address').optional(),
  phone_number: z.string().min(1, 'Phone number is required'),
  service_type: z.string().optional(),
  description: z.string().optional(),
})

export async function submitContactForm(formData: FormData) {
  try {
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone_number: formData.get('phone_number') as string,
      service_type: formData.get('service_type') as string,
      description: formData.get('description') as string,
    }

    const validated = contactSchema.parse(data)

    const { query, variables } = generateMutationOp({
      create_contact_us_item: {
        __args: {
          data: validated
        }
      }
    })

    await directus.query(query, variables)

    return { success: true }
  } catch (error) {
    console.error('Contact form error:', error)
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }
    return { success: false, error: 'Failed to submit form' }
  }
}