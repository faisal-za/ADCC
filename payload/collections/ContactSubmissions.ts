import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: {
    singular: { en: 'Contact Submission', ar: 'طلب تواصل' },
    plural: { en: 'Contact Submissions', ar: 'طلبات التواصل' },
  },
  access: authenticatedAccess,
  admin: {
    group: { en: 'Submissions', ar: 'الطلبات' },
    defaultColumns: ['name', 'phoneNumber', 'email', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: { en: 'Name', ar: 'الاسم' },
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      label: { en: 'Email', ar: 'البريد الإلكتروني' },
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: { en: 'Phone Number', ar: 'رقم الهاتف' },
      required: true,
    },
    {
      name: 'serviceType',
      type: 'text',
      label: { en: 'Service Type', ar: 'نوع الخدمة' },
    },
    {
      name: 'description',
      type: 'textarea',
      label: { en: 'Description', ar: 'الوصف' },
    },
  ],
}
