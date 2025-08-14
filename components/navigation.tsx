'use client'

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import LanguageSwitch from "./language-switch";
import { useTranslation } from "../hooks/use-translation";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

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
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-6">
              <button
                onClick={() => scrollToSection("home")}
                className="text-slate-900 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('home')}
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('services')}
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {t('projects')}
              </button>
              <Link href="/blog">
                <button className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors">
                  {t('blog')}
                </button>
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-slate-600 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
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
          <div className="md:hidden">
            <Button
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
        <div className="md:hidden bg-white border-t mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <button
              onClick={() => scrollToSection("home")}
              className="text-slate-900 block px-3 py-2 text-base font-medium w-full text-left rtl:text-right"
            >
              {t('home')}
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left rtl:text-right"
            >
              {t('services')}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left rtl:text-right"
            >
              {t('projects')}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-slate-600 hover:text-slate-900 block px-3 py-2 text-base font-medium w-full text-left rtl:text-right"
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
