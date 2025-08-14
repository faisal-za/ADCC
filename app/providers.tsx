'use client'

import { ReactNode } from 'react'
import { LanguageProvider } from '../contexts/language-context'
import { Toaster } from '../components/ui/toaster'
import { TooltipProvider } from '../components/ui/tooltip'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <TooltipProvider>
        {children}
        <Toaster />
      </TooltipProvider>
    </LanguageProvider>
  )
}