'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import { LanguageProvider } from '../contexts/language-context'
import { Toaster } from '../components/ui/toaster'
import { TooltipProvider } from '../components/ui/tooltip'
import dynamic from 'next/dynamic'
import Navigation from '../components/navigation'

const Footer = dynamic(() => import('../components/footer').then(mod => ({ default: mod.default })), {
  ssr: true
})

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Navigation />
          <div className="pt-20 min-h-screen flex flex-col">
            <div className="flex-1">
              {children}
            </div>
            <Footer />
          </div>
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}