'use client'

import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { useTranslation } from '../../hooks/use-translation'

export default function NotFound() {
  const { t } = useTranslation()
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="text-center max-w-md mx-auto px-6">
        <h1 className="text-6xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-slate-600 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              {t('home')}
            </Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/contact">
              {t('contactUs')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}