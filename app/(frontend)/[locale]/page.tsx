import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import nextDynamic from 'next/dynamic'
import { Skeleton } from '@/components/ui/skeleton'

const ServicesSection = nextDynamic(() => import('@/components/services-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ServicesSkeleton />
})

const ProjectsSection = nextDynamic(() => import('@/components/projects-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ProjectsSkeleton />
})


const ClientsSection = nextDynamic(() => import('@/components/clients-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ClientsSkeleton />
})
import {
   OrganizationStructuredData, 
   ServicesStructuredData, BreadcrumbStructuredData } from '@/components/structured-data'
import { AboutSection, TestimonialsSection, ContactSection } from '@/components/client-sections'
import { getHomepageData } from '@/lib/cms'
import { parseCMSLocale, type HomepageData } from '@/lib/cms-types'

export const revalidate = 3600

function ServicesSkeleton() {
  return (
    <section className="py-24 bg-slate-50 contain-layout" style={{ minHeight: '600px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-64 mx-auto mb-4 rounded"></div>
        <div className="skeleton h-6 w-96 mx-auto mb-16 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ minHeight: '380px' }}>
              <div className="skeleton aspect-[16/9] w-full"></div>
              <div className="p-6">
                <div className="skeleton h-12 w-12 rounded-lg mb-4"></div>
                <div className="skeleton h-6 w-full mb-2 rounded"></div>
                <div className="skeleton h-4 w-full mb-1 rounded"></div>
                <div className="skeleton h-4 w-3/4 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectsSkeleton() {
  return (
    <section className="py-24 contain-layout" style={{ minHeight: '800px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton h-12 w-64 mx-auto mb-16 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg" style={{ minHeight: '320px' }}>
              <div className="skeleton aspect-[4/3] w-full"></div>
              <div className="p-6">
                <div className="skeleton h-6 w-full mb-2 rounded"></div>
                <div className="skeleton h-4 w-2/3 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ClientsSkeleton() {
  return (
    <section className="py-16 bg-white contain-layout" style={{ minHeight: '200px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="skeleton h-8 w-48 mx-auto mb-12 rounded"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton h-16 w-full rounded"></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}): Promise<Metadata> {
  const { locale } = await params
  
  const isArabic = locale === 'ar'
  
  return {
    title: isArabic 
      ? 'شركة ADCC للتصميم والمقاولات المتقدمة | إنشاء وتصميم داخلي'
      : 'ADCC - Construction & Interior Design Company',
    description: isArabic
      ? 'شركة رائدة في الإنشاءات في المملكة العربية السعودية تقدم خدمات البناء والتجديد والتصميم الداخلي والتشطيبات المهنية. حوّل رؤيتك مع خبرة ADCC والحلول العصرية.'
      : 'Leading Saudi construction company offering professional building, renovation, interior design, and finishing services. Transform your vision with ADCC expert craftsmanship.',
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
      },
    },
    openGraph: {
      title: isArabic 
        ? 'شركة ADCC للتصميم والمقاولات المتقدمة'
        : 'ADCC - Advanced Design & Contracting Company',
      description: isArabic
        ? 'شركة رائدة في الإنشاءات تقدم خدمات البناء والتجديد والتصميم الداخلي المهنية في المملكة العربية السعودية.'
        : 'Leading construction company offering professional building, renovation, and interior design services in Saudi Arabia.',
      url: `https://adcc.sa/${locale}`,
      locale: isArabic ? 'ar_SA' : 'en_SA',
    },
  }
}


export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const cmsLocale = parseCMSLocale(locale)

  let homepageData: HomepageData = {
    services: [],
    projects: [],
    categories: [],
    testimonials: [],
    clients: [],
  }

  try {
    homepageData = await getHomepageData(cmsLocale)
  } catch (error) {
    console.error('Failed to fetch homepage data:', error)
  }
  
  return (
    <>
      <OrganizationStructuredData />
      <ServicesStructuredData />
      <BreadcrumbStructuredData locale={locale} />
      <div className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ServicesSection services={homepageData.services} />
        <ClientsSection clients={homepageData.clients} locale={locale} />
        <AboutSection />
        <ProjectsSection projects={homepageData.projects} categories={homepageData.categories} />
        <TestimonialsSection testimonials={homepageData.testimonials} />
        <ContactSection />
      </div>
    </>
  )
}