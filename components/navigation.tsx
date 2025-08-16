'use client'

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import LanguageSwitch from "./language-switch";
import { useTranslation } from "../hooks/use-translation";

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();
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

  const scrollToSection = (id: string) => {
    if (pathname !== "/") {
      router.push(`/#${id}`);
      setIsOpen(false);
      setActiveSection(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setActiveSection(id);
    }
  };

  const [activeSection, setActiveSection] = useState<string>(pathname === "/blog" ? "blog" : "home");

  // Listen to scroll and update active section only on homepage
  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname === "/blog" ? "blog" : "home");
      return;
    }
    const handleScroll = () => {
      const sections = ["home", "services", "projects", "about", "contact"];
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
  }, [pathname]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-white shadow-lg" : "bg-white shadow-lg"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl font-bold text-primary-600">ADCC</span>
              <span className="text-sm text-slate-600 block -mt-1">Advanced Design & Contracting Co.</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-baseline gap-6">
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
                onClick={() => { scrollToSection("projects"); setActiveSection("projects"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "projects" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
              >
                {t('projects')}
              </button>
              <Link href="/blog">
                <button className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "blog" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`} onClick={() => setActiveSection("blog")}> 
                  {t('blog')}
                </button>
              </Link>
              <button
                onClick={() => { scrollToSection("about"); setActiveSection("about"); }}
                className={`font-bold px-3 py-2 text-sm transition-colors ${activeSection === "about" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
              >
                {t('about')}
              </button>
              <LanguageSwitch />
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-primary-600 text-white hover:bg-primary-700"
              >
                {t('contactUs')}
              </Button>
            </div>
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
            <button
              onClick={() => { scrollToSection("about"); setActiveSection("about"); }}
              className={`font-bold block px-3 py-2 text-base w-full text-left rtl:text-right transition-colors ${activeSection === "about" ? "text-secondary" : "text-slate-600 hover:text-primary-600"}`}
            >
              {t('about')}
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
