import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { mediaRevalidation } from '../hooks/revalidate'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: {
    singular: { en: 'Media Item', ar: 'ملف وسائط' },
    plural: { en: 'Media', ar: 'الوسائط' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Content', ar: 'المحتوى' },
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
      label: { en: 'Alt Text', ar: 'النص البديل' },
      localized: true,
      required: true,
    },
  ],
  upload: true,
}
