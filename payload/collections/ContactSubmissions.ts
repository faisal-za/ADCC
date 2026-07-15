import type { CollectionConfig } from 'payload'

import { authenticatedAccess } from '../access/is-authenticated'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  access: authenticatedAccess,
  admin: {
    defaultColumns: ['name', 'phoneNumber', 'email', 'createdAt'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      required: true,
    },
    {
      name: 'serviceType',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}
