import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: { en: 'Testimonial', ar: 'رأي عميل' },
    plural: { en: 'Testimonials', ar: 'آراء العملاء' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Content', ar: 'المحتوى' },
    useAsTitle: 'name',
  },
  hooks: {
    afterChange: [homepageRevalidation.afterChange],
    afterDelete: [homepageRevalidation.afterDelete],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', ar: 'الاسم' },
      localized: true,
      required: true,
    },
    {
      name: 'client',
      type: 'text',
      label: { en: 'Client', ar: 'العميل' },
      localized: true,
    },
    {
      name: 'text',
      type: 'textarea',
      label: { en: 'Testimonial', ar: 'نص الرأي' },
      localized: true,
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: { en: 'Rating', ar: 'التقييم' },
      defaultValue: 5,
      max: 5,
      min: 1,
      required: true,
    },
  ],
}
