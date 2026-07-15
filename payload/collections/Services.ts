import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  access: authenticatedAccess,
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [homepageRevalidation.afterChange],
    afterDelete: [homepageRevalidation.afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
