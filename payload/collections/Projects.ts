import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: {
    singular: { en: 'Project', ar: 'مشروع' },
    plural: { en: 'Projects', ar: 'المشاريع' },
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
      name: 'images',
      type: 'upload',
      label: { en: 'Images', ar: 'الصور' },
      hasMany: true,
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      label: { en: 'Categories', ar: 'التصنيفات' },
      hasMany: true,
      relationTo: 'categories',
    },
  ],
}
