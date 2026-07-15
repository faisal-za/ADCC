import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { mediaRevalidation } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  access: authenticatedAccess,
  admin: {
    useAsTitle: 'filename',
  },
  hooks: {
    afterChange: [mediaRevalidation.afterChange],
    afterDelete: [mediaRevalidation.afterDelete],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      required: true,
    },
  ],
  upload: true,
}
