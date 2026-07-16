import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'
import { homepageRevalidation } from '../hooks/revalidate'

export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: {
    singular: { en: 'Client', ar: 'عميل' },
    plural: { en: 'Clients', ar: 'العملاء' },
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
      required: true,
    },
    {
      name: 'logo',
      type: 'upload',
      label: { en: 'Logo', ar: 'الشعار' },
      relationTo: 'media',
    },
  ],
}
