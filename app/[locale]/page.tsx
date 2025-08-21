import { Metadata } from 'next'
import Navigation from '../../components/navigation'
import HeroSection from '../../components/hero-section'
import ServicesSection from '../../components/services-section'
import ProjectsSection from '../../components/projects-section'
import StatsSection from '../../components/stats-section'
import AboutSection from '../../components/about-section'
import TestimonialsSection from '../../components/testimonials-section'
import ContactSection from '../../components/contact-section'
import Footer from '../../components/footer'
import { OrganizationStructuredData, ServicesStructuredData, BreadcrumbStructuredData } from '../../components/structured-data'

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
  
  return (
    <>
      <OrganizationStructuredData />
      <ServicesStructuredData />
      <BreadcrumbStructuredData locale={locale} />
      <div className="min-h-screen overflow-x-hidden">
        <Navigation />
        <HeroSection />
        <ServicesSection />
        <ProjectsSection />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  )
}