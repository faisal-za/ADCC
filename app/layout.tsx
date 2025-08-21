import type { Metadata } from 'next'
import { Inter, Almarai } from 'next/font/google'
import '../lib/globals.css'
import Providers from './providers'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })
const almarai = Almarai({ 
  subsets: ['arabic'], 
  weight: ['300', '400', '700', '800'],
  variable: '--font-arabic'
})

export const metadata: Metadata = {
  title: {
    default: 'ADCC - Advanced Design & Contracting Company | Construction & Interior Design',
    template: '%s | ADCC'
  },
  description: 'Leading construction company in UAE offering professional building, renovation, interior design, and finishing services. Transform your vision with ADCC\'s expert craftsmanship and modern solutions.',
  keywords: ['construction company', 'interior design', 'renovation services', 'building contractor', 'finishing works', 'UAE construction', 'design and build'],
  authors: [{ name: 'ADCC Team' }],
  creator: 'ADCC - Advanced Design & Contracting Co.',
  publisher: 'ADCC',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://adcc-website.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en': '/en',
      'ar': '/ar',
    },
  },
  openGraph: {
    title: 'ADCC - Advanced Design & Contracting Company',
    description: 'Leading construction company offering professional building, renovation, and interior design services in UAE.',
    url: 'https://adcc-website.com',
    siteName: 'ADCC',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ADCC Construction and Design Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ADCC - Advanced Design & Contracting Company',
    description: 'Professional construction, renovation, and interior design services.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${almarai.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}