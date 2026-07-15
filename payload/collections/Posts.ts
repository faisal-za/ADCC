import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { postRevalidation } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  access: authenticatedAccess,
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'readTime', 'updatedAt'],
  },
  hooks: {
    afterChange: [postRevalidation.afterChange],
    afterDelete: [postRevalidation.afterDelete],
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
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'readTime',
      type: 'number',
      defaultValue: 5,
      min: 1,
      required: true,
    },
    {
      name: 'categories',
      type: 'relationship',
      hasMany: true,
      relationTo: 'categories',
    },
  ],
}
