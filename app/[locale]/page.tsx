import { Metadata } from 'next'
import HeroSection from '../../components/hero-section'
import ServicesSection from '../../components/services-section'
import ProjectsSection from '../../components/projects-section'
import AboutSection from '../../components/about-section'
import TestimonialsSection from '../../components/testimonials-section'
import ContactSection from '../../components/contact-section'
import {
   OrganizationStructuredData, 
   ServicesStructuredData, BreadcrumbStructuredData } from '../../components/structured-data'
   
import { generateQueryOp } from '../../lib/generated'
import { directus } from '../../lib/directus'

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
      : 'ADCC - Construction & Interior Design Company UAE',
    description: isArabic
      ? 'شركة رائدة في الإنشاءات في الإمارات تقدم خدمات البناء والتجديد والتصميم الداخلي والتشطيبات المهنية. حوّل رؤيتك مع خبرة ADCC والحلول العصرية.'
      : 'Leading UAE construction company offering professional building, renovation, interior design, and finishing services. Transform your vision with ADCC expert craftsmanship.',
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
        ? 'شركة رائدة في الإنشاءات تقدم خدمات البناء والتجديد والتصميم الداخلي المهنية في الإمارات.'
        : 'Leading construction company offering professional building, renovation, and interior design services in UAE.',
      url: `https://adcc-website.com/${locale}`,
      locale: isArabic ? 'ar_AE' : 'en_US',
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
    }
  })

  let servicesData = []
  let projectsData = []
  let categoriesData = []
  let testimonialsData = []
  try {
    const result = await directus.query(query, variables)
    
    servicesData = result.service || []
    projectsData = result.project || []
    categoriesData = result.categories || []
    testimonialsData = result.testimonials || []
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
        <AboutSection />
        <ProjectsSection projects={projectsData} categories={categoriesData} />
        <TestimonialsSection testimonials={testimonialsData} />
        <ContactSection />
      </div>
    </>
  )
}