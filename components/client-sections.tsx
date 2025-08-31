'use client'

import dynamic from 'next/dynamic'
import { Skeleton } from './ui/skeleton'

function AboutSkeleton() {
  return (
    <section className="py-24 bg-slate-50 contain-layout" style={{ minHeight: '500px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="skeleton aspect-[4/3] w-full rounded-2xl"></div>
          <div>
            <div className="skeleton h-12 w-3/4 mb-6 rounded"></div>
            <div className="skeleton h-4 w-full mb-2 rounded"></div>
            <div className="skeleton h-4 w-full mb-2 rounded"></div>
            <div className="skeleton h-4 w-2/3 mb-8 rounded"></div>
            <div className="skeleton h-12 w-40 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TestimonialsSkeleton() {
  return (
    <section className="py-24 contain-layout" style={{ minHeight: '500px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-64 mx-auto mb-16 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-lg" style={{ minHeight: '250px' }}>
              <div className="skeleton h-20 w-full mb-6 rounded"></div>
              <div className="flex items-center">
                <div className="skeleton h-12 w-12 rounded-full mr-4"></div>
                <div>
                  <div className="skeleton h-5 w-24 mb-2 rounded"></div>
                  <div className="skeleton h-4 w-32 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSkeleton() {
  return (
    <section className="py-24 bg-slate-50 contain-layout" style={{ minHeight: '600px' }}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-64 mx-auto mb-16 rounded"></div>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="skeleton h-12 w-full rounded"></div>
            <div className="skeleton h-12 w-full rounded"></div>
            <div className="skeleton h-12 w-full md:col-span-2 rounded"></div>
            <div className="skeleton h-12 w-full md:col-span-2 rounded"></div>
            <div className="skeleton h-32 w-full md:col-span-2 rounded"></div>
            <div className="skeleton h-12 w-40 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export const AboutSection = dynamic(() => import('./about-section'), {
  ssr: false,
  loading: () => <AboutSkeleton />
})

export const TestimonialsSection = dynamic(() => import('./testimonials-section'), {
  ssr: false,
  loading: () => <TestimonialsSkeleton />
})

export const ContactSection = dynamic(() => import('./contact-section'), {
  ssr: false,
  loading: () => <ContactSkeleton />
})