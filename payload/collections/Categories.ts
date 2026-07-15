import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { categoryRevalidation } from '../hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: authenticatedAccess,
  admin: {
    useAsTitle: 'title',
  },
  hooks: {
    afterChange: [categoryRevalidation.afterChange],
    afterDelete: [categoryRevalidation.afterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      index: true,
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
    },
  ],
}
