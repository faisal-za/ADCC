'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { PageLoader } from './ui/loader'

export default function PageTransitionLoader() {
  const [loading, setLoading] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    // Show loader when pathname changes
    setLoading(true)
    
    // Hide loader after a brief delay to simulate loading
    const timer = setTimeout(() => {
      setLoading(false)
    }, 100)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname])

  if (!loading) return null

  return <PageLoader text="Loading..." fullScreen />
}

interface LoadingOverlayProps {
  isLoading: boolean
  text?: string
}

export function LoadingOverlay({ isLoading, text = "Loading..." }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-slate-200"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-primary-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-sm font-medium text-slate-600 animate-pulse">
          {text}
        </p>
      </div>
    </div>
  )
}