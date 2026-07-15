import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  access: authenticatedAccess,
  admin: {
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [homepageRevalidation.afterChange],
    afterDelete: [homepageRevalidation.afterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      localized: true,
    },
    {
      name: 'text',
      type: 'textarea',
      localized: true,
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      defaultValue: 5,
      max: 5,
      min: 1,
      required: true,
    },
  ],
}
