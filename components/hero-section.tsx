'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated GIF Background */}
      <div className="absolute inset-0">
        <img 
          src="https://media.giphy.com/media/xT9IgEHkj9mE42D0Zu/giphy.gif"
          alt="Building Construction Timelapse"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-accent-500"> {t('heroTitleHighlight')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-accent-500 text-white hover:bg-accent-600 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
            >
              {t('startProject')}
            </Button>
            <Button
              onClick={() => scrollToSection("projects")}
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold w-full sm:w-auto transition-all duration-300"
            >
              {t('viewWork')}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce">
          <ChevronDown className="text-white h-8 w-8" />
        </div>
      </div>
    </section>
  );
}
