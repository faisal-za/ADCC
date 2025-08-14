'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../lib/queryClient'
import { LanguageProvider } from '../contexts/language-context'
import { Toaster } from '../components/ui/toaster'
import { TooltipProvider } from '../components/ui/tooltip'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  )
}