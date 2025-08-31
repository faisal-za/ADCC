import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

export default function HeroSectionServer() {
  const mobileImages = [
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-1-mobile.jpg",
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-2-mobile.jpg",
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-3-mobile.jpg"
  ];

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Initial static background */}
      <div className="absolute inset-0">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet={`${mobileImages[0]}?w=640&f=avif 640w, ${mobileImages[0]}?w=750&f=avif 750w`}
            sizes="100vw"
            type="image/avif"
          />
          <source
            media="(max-width: 640px)"
            srcSet={`${mobileImages[0]}?w=640&f=webp 640w, ${mobileImages[0]}?w=750&f=webp 750w`}
            sizes="100vw"
            type="image/webp"
          />
          <Image
            src={`${mobileImages[0]}?w=750&f=webp`}
            alt="ADCC Construction"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover"
          />
        </picture>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className="backdrop-blur-lg bg-gradient-to-b from-black/30 via-black/20 to-black/10 rounded-3xl px-10 py-6 md:p-12 shadow-2xl border border-transparent opacity-100 translate-y-0"
          style={{ minHeight: '400px' }}
        >
          <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Advanced Design & Contracting Company
            <span className="text-accent-500"> ADCC</span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{ minHeight: '64px' }}
          >
            Leading construction company offering professional building, renovation, and interior design services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-accent-500 text-white hover:bg-accent-600 px-8 py-4 text-lg font-semibold w-full sm:w-auto"
            >
              Start Your Project
            </Button>
            <Button
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-slate-900 px-8 py-4 text-lg font-semibold w-full sm:w-auto transition-all duration-300"
            >
              View Our Work
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