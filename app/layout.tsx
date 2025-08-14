import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../lib/globals.css'
import Providers from './providers'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}