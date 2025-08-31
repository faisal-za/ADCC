import { Metadata } from 'next'
import HeroSection from '../../components/hero-section'
import dynamic from 'next/dynamic'
import { Skeleton } from '../../components/ui/skeleton'

const ServicesSection = dynamic(() => import('../../components/services-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ServicesSkeleton />
})

const ProjectsSection = dynamic(() => import('../../components/projects-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ProjectsSkeleton />
})


const ClientsSection = dynamic(() => import('../../components/clients-section').then(mod => ({ default: mod.default })), {
  ssr: true,
  loading: () => <ClientsSkeleton />
})
import {
   OrganizationStructuredData, 
   ServicesStructuredData, BreadcrumbStructuredData } from '../../components/structured-data'
import { AboutSection, TestimonialsSection, ContactSection } from '../../components/client-sections'
   
import { generateQueryOp } from '../../lib/generated'
import { directus } from '../../lib/directus'

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
  
  // Fetch all data in a single GraphQL query
  const directusLocale = locale === 'ar' ? 'ar-SA' : 'en-US'
  
  const { query, variables } = generateQueryOp({
    service: {
      id: true,
      date_created: true,
      date_updated: true,
      icon: true,
      image: {
        id: true
      },
      translations: {
        __args: {
          filter: {
            languages_code: { 
              code: { _eq: directusLocale }
            }
          }
        },
        id: true,
        title: true,
        description: true,
        languages_code: {
          code: true,
          name: true
        }
      }
    },
    project: {
      id: true,
      date_created: true,
      date_updated: true,
      images: {
        id: true,
        directus_files_id: {
          id: true
        }
      },
      categories: {
        id: true,
        categories: {
          id: true,
          translations: {
            __args: {
              filter: {
                languages_code: {
                  code: { _eq: directusLocale }
                }
              }
            },
            id: true,
            title: true,
            slug: true
          }
        }
      },
      translations: {
        __args: {
          filter: {
            languages_code: {
              code: { _eq: directusLocale }
            }
          }
        },
        id: true,
        title: true,
        description: true
      }
    },
    categories: {
      id: true,
      translations: {
        __args: {
          filter: {
            languages_code: {
              code: { _eq: directusLocale }
            }
          }
        },
        id: true,
        title: true,
        slug: true
      }
    },
    testimonials: {
      id: true,
      date_created: true,
      translations: {
        __args: {
          filter: {
            languages_code: {
              code: { _eq: directusLocale }
            }
          }
        },
        id: true,
        name: true,
        text: true,
        client: true
      }
    },
    clients: {
      id: true,
      name: true,
      logo: {
        id: true
      }
    }
  })

  let servicesData = []
  let projectsData = []
  let categoriesData = []
  let testimonialsData = []
  let clientsData = []
  try {
    const result = await directus.query(query, variables)
    
    servicesData = result.service || []
    projectsData = result.project || []
    categoriesData = result.categories || []
    testimonialsData = result.testimonials || []
    clientsData = result.clients || []
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
  
  return (
    <>
      <OrganizationStructuredData />
      <ServicesStructuredData />
      <BreadcrumbStructuredData locale={locale} />
      <div className="min-h-screen overflow-x-hidden">
        <HeroSection />
        <ServicesSection services={servicesData} />
        <ClientsSection clients={clientsData} locale={locale} />
        <AboutSection />
        <ProjectsSection projects={projectsData} categories={categoriesData} />
        <TestimonialsSection testimonials={testimonialsData} />
        <ContactSection />
      </div>
    </>
  )
}