import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Services: CollectionConfig = {
  slug: 'services',
  labels: {
    singular: { en: 'Service', ar: 'خدمة' },
    plural: { en: 'Services', ar: 'الخدمات' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Content', ar: 'المحتوى' },
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
      label: { en: 'Title', ar: 'العنوان' },
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', ar: 'الوصف' },
      localized: true,
    },
    {
      name: 'icon',
      type: 'text',
      label: { en: 'Icon', ar: 'الأيقونة' },
    },
    {
      name: 'image',
      type: 'upload',
      label: { en: 'Image', ar: 'الصورة' },
      relationTo: 'media',
    },
  ],
}
