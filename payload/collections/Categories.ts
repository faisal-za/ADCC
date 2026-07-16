import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { categoryRevalidation } from '../hooks/revalidate'

export const Categories: CollectionConfig = {
  slug: 'categories',
  labels: {
    singular: { en: 'Category', ar: 'تصنيف' },
    plural: { en: 'Categories', ar: 'التصنيفات' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Content', ar: 'المحتوى' },
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
      label: { en: 'Title', ar: 'العنوان' },
      localized: true,
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: { en: 'Slug', ar: 'الرابط المختصر' },
      index: true,
      localized: true,
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', ar: 'الوصف' },
      localized: true,
    },
  ],
}
