import Navigation from '../components/navigation'
import HeroSection from '../components/hero-section'
import ServicesSection from '../components/services-section'
import ProjectsSection from '../components/projects-section'
import StatsSection from '../components/stats-section'
import AboutSection from '../components/about-section'
import ContactSection from '../components/contact-section'
import Footer from '../components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}