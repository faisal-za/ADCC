import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: { en: 'User', ar: 'مستخدم' },
    plural: { en: 'Users', ar: 'المستخدمون' },
  },
  auth: true,
  admin: {
    group: { en: 'System', ar: 'النظام' },
    useAsTitle: 'email',
  },
  fields: [],
}
