'use client'

import { useState } from 'react'
import { Loader, PageLoader, InlineLoader } from './ui/loader'
import { LoadingOverlay } from './page-transition-loader'
import { Button } from './ui/button'

export function LoaderExamples() {
  const [showPageLoader, setShowPageLoader] = useState(false)
  const [showOverlay, setShowOverlay] = useState(false)

  return (
    <div className="p-8 space-y-8">
      <h2 className="text-2xl font-bold">Loader Examples</h2>
      
      {/* Basic Loaders */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Loaders</h3>
        <div className="flex items-center space-x-8">
          <div className="text-center space-y-2">
            <Loader size="sm" variant="spinner" />
            <p className="text-xs">Small Spinner</p>
          </div>
          <div className="text-center space-y-2">
            <Loader size="md" variant="spinner" />
            <p className="text-xs">Medium Spinner</p>
          </div>
          <div className="text-center space-y-2">
            <Loader size="lg" variant="spinner" />
            <p className="text-xs">Large Spinner</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="text-center space-y-2">
            <Loader size="md" variant="dots" />
            <p className="text-xs">Dots</p>
          </div>
          <div className="text-center space-y-2">
            <Loader size="md" variant="pulse" />
            <p className="text-xs">Pulse</p>
          </div>
          <div className="text-center space-y-2">
            <Loader size="md" variant="bars" />
            <p className="text-xs">Bars</p>
          </div>
        </div>
      </div>

      {/* Inline Loader */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Inline Loader</h3>
        <InlineLoader />
      </div>

      {/* Interactive Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Examples</h3>
        <div className="space-x-4">
          <Button onClick={() => setShowPageLoader(!showPageLoader)}>
            {showPageLoader ? 'Hide' : 'Show'} Page Loader
          </Button>
          <Button onClick={() => setShowOverlay(!showOverlay)}>
            {showOverlay ? 'Hide' : 'Show'} Loading Overlay
          </Button>
        </div>
      </div>

      {/* Show loaders */}
      {showPageLoader && <PageLoader text="Example page loading..." />}
      <LoadingOverlay isLoading={showOverlay} text="Loading overlay example..." />
    </div>
  )
}