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
  title: 'ADCC - Advanced Design & Contracting Co.',
  description: 'Professional construction and contracting services with modern design solutions',
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