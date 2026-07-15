import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
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
      name: 'images',
      type: 'upload',
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'categories',
    },
  ],
}
