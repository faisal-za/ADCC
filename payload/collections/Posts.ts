import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { postRevalidation } from '../hooks/revalidate'

export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: { en: 'Post', ar: 'مقال' },
    plural: { en: 'Posts', ar: 'المقالات' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Content', ar: 'المحتوى' },
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
      name: 'content',
      type: 'richText',
      label: { en: 'Content', ar: 'المحتوى' },
      localized: true,
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      label: { en: 'Image', ar: 'الصورة' },
      relationTo: 'media',
    },
    {
      name: 'readTime',
      type: 'number',
      label: { en: 'Read Time (Minutes)', ar: 'مدة القراءة (بالدقائق)' },
      defaultValue: 5,
      min: 1,
      required: true,
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
