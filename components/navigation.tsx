'use client'

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitch from "./language-switch";
import { useTranslation } from "../hooks/use-translation";
import { useLanguage } from "../contexts/language-context";
import { useWindowScroll, useDebounce } from "react-use";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
  const { language } = useLanguage();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        menuButtonRef.current &&
        !menuButtonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const isHomePage = pathname === `/${language}`;
    
    const performScroll = () => {
      // Use querySelector for more flexible selection
      const element = document.querySelector(`#${id}`);
      if (element) {
        const yOffset = -80; // Height of navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ 
          top: y, 
          behavior: 'smooth' 
        });
        setActiveSection(id);
      }
    };
    
    if (!isHomePage) {
      // Navigate to home page first
      router.push(`/${language}`);
      
      // Use MutationObserver for more reliable element detection
      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
          obs.disconnect();
          performScroll();
        }
      });
      
      // Start observing after navigation
      setTimeout(() => {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
        
        // Fallback timeout to prevent infinite observation
        setTimeout(() => observer.disconnect(), 5000);
      }, 100);
    } else {
      performScroll();
    }
    
    setIsOpen(false);
  }, [pathname, language, router]);

  const [activeSection, setActiveSection] = useState<string>(() => {
    if (pathname.includes("/blog")) return "blog";
    return "home";
  });

  // Listen to scroll and update active section only on homepage
  useEffect(() => {
    const isHomePage = pathname === `/${language}`;
    
    if (!isHomePage) {
      setActiveSection(pathname.includes("/blog") ? "blog" : "home");
      return;
    }
    const handleScroll = () => {
      const sections = ["home", "services", "about", "projects", "blog"];
      let found = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, language]);

  return (
    <nav className={`fixed top-0 w-full z-50 bg-gradient-to-b from-white via-white via-90% to-transparent`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600">ADCC</span>
              <span className="text-sm text-slate-600 block -mt-1">Advanced Design & Contracting Co.</span>
            </div>
          </div>
          
          {/* Desktop Menu - Centered Navigation Links */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-6">
              <button
                onClick={() => { scrollToSection("home"); setActiveSection("home"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "home" ? "text-secondary" : "text-slate-900 hover:text-primary-600"}`}
              >
                {t('home')}
              </button>
              <button
                onClick={() => { scrollToSection("services"); setActiveSection("services"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "services" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
              >
                {t('services')}
              </button>
              <button
                onClick={() => { scrollToSection("about"); setActiveSection("about"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "about" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
              >
                {t('about')}
              </button>
              <button
                onClick={() => { scrollToSection("projects"); setActiveSection("projects"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "projects" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
              >
                {t('projects')}
              </button>
              <Link href={`/${language}/blog`}>
                <button className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "blog" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`} onClick={() => setActiveSection("blog")}> 
                  {t('blog')}
                </button>
              </Link>
            </div>
          </div>

          {/* Desktop Right Side - Language Switch & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitch />
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary-600 text-white hover:bg-primary-700"
            >
              {t('contactUs')}
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              ref={menuButtonRef}
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div ref={mobileMenuRef} className="lg:hidden animate-slide-down mt-2 mx-2">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-sm border-t mobile-menu rounded-2xl shadow-lg">
              <button
                onClick={() => { scrollToSection("home"); setActiveSection("home"); }}
                className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "home" ? "text-secondary" : "text-slate-900 hover:text-primary-600"}`}
              >
                {t('home')}
              </button>
            <button
              onClick={() => { scrollToSection("services"); setActiveSection("services"); }}
              className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "services" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
            >
              {t('services')}
            </button>
            <button
              onClick={() => { scrollToSection("about"); setActiveSection("about"); }}
              className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "about" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
            >
              {t('about')}
            </button>
            <button
              onClick={() => { scrollToSection("projects"); setActiveSection("projects"); }}
              className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "projects" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
            >
              {t('projects')}
            </button>
            <button
              onClick={() => { router.push('/blog'); setActiveSection('blog'); setIsOpen(false); }}
              className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "blog" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
            >
              {t('blog')}
            </button>
            <div className="px-3 py-2">
              <LanguageSwitch />
            </div>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-primary-600 text-white mx-3 mt-2 w-auto"
            >
              {t('contactUs')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
