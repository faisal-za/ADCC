import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { ar } from '@payloadcms/translations/languages/ar'
import { en } from '@payloadcms/translations/languages/en'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Categories } from './payload/collections/Categories'
import { Clients } from './payload/collections/Clients'
import { ContactSubmissions } from './payload/collections/ContactSubmissions'
import { Media } from './payload/collections/Media'
import { Posts } from './payload/collections/Posts'
import { Projects } from './payload/collections/Projects'
import { Services } from './payload/collections/Services'
import { Testimonials } from './payload/collections/Testimonials'
import { Users } from './payload/collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (process.env.NODE_ENV === 'production') {
  for (const name of ['PAYLOAD_SECRET', 'MONGODB_URI', 'BLOB_READ_WRITE_TOKEN'] as const) {
    if (!process.env[name]) {
      throw new Error(`${name} is required in production`)
    }
  }
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [
    Users,
    Media,
    Services,
    Categories,
    Projects,
    Posts,
    Testimonials,
    Clients,
    ContactSubmissions,
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI ?? '',
  }),
  editor: lexicalEditor(),
  graphQL: {
    disable: true,
  },
  i18n: {
    supportedLanguages: { en, ar },
    fallbackLanguage: 'en',
  },
  localization: {
    locales: [
      {
        code: 'en',
        label: 'English',
      },
      {
        code: 'ar',
        label: 'Arabic',
        rtl: true,
      },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    vercelBlobStorage({
      // The linked Vercel Blob store must allow public delivery URLs.
      access: 'public',
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
    }),
  ],
  secret: process.env.PAYLOAD_SECRET ?? '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
