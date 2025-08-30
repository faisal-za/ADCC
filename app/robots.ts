import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/', '/_next/', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/ar', '/en', '/ar/blog', '/en/blog'],
        disallow: ['/api/', '/_next/', '/admin/'],
      }
    ],
    sitemap: 'https://adcc.sa/sitemap.xml',
  }
}