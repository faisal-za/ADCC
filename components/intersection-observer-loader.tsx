'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import dynamic from 'next/dynamic'

interface IntersectionLoaderProps {
  children: ReactNode
  fallback: ReactNode
  rootMargin?: string
  threshold?: number
  importComponent: () => Promise<{ default: any }>
}

export default function IntersectionLoader({
  children,
  fallback,
  rootMargin = '100px',
  threshold = 0.1,
  importComponent,
}: IntersectionLoaderProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [Component, setComponent] = useState<any>(null)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
          // Load the component dynamically
          importComponent().then((mod) => {
            setComponent(() => mod.default)
          })
        }
      },
      {
        rootMargin,
        threshold,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [importComponent, isVisible, rootMargin, threshold])

  return (
    <div ref={ref}>
      {Component ? <Component {...(children as any)?.props} /> : fallback}
    </div>
  )
}