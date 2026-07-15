import type { Access, CollectionConfig } from 'payload'

export const isAuthenticated: Access = ({ req }) => Boolean(req.user)

export const authenticatedAccess = {
  create: isAuthenticated,
  delete: isAuthenticated,
  read: isAuthenticated,
  update: isAuthenticated,
} satisfies NonNullable<CollectionConfig['access']>
