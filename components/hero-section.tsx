'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";
import { scrollToSection } from "../lib/utils/scroll";

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

   const videos = [
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-videos/video-1.webm",
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-videos/video-2.webm",    
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-videos/video-3.webm"     
  ];

  const switchToNextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  // Restart video when it becomes active
  useEffect(() => {
    const activeVideo = document.querySelector('section video') as HTMLVideoElement;
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {
        // Handle autoplay restrictions
      });
    }
  }, [currentVideo]);


  const mobileImages = [
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-1-mobile.jpg",
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-2-mobile.jpg",
    "https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-images/hero-3-mobile.jpg"
  ];

  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Optimized Background - Images for Mobile, Videos for Desktop */}
      <div className="absolute inset-0">
        {isMobile ? (
          // Mobile: Use optimized responsive images
          <div className="relative w-full h-full">
            <picture>
              <source
                media="(max-width: 640px)"
                srcSet={`${mobileImages[currentVideo]}?w=640&f=webp 640w, ${mobileImages[currentVideo]}?w=750&f=webp 750w`}
                sizes="100vw"
                type="image/webp"
              />
              <source
                media="(max-width: 640px)"
                srcSet={`${mobileImages[currentVideo]}?w=640 640w, ${mobileImages[currentVideo]}?w=750 750w`}
                sizes="100vw"
              />
              <Image
                src={`${mobileImages[currentVideo]}?w=750&f=webp`}
                alt="ADCC Construction"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover"
                onLoad={() => setVideoLoaded(true)}
              />
            </picture>
          </div>
        ) : (
          // Desktop: Use videos with lazy loading
          <>
            {!videoLoaded && (
              <Image
                src={`https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-videos/poster-${currentVideo + 1}.jpg`}
                alt="ADCC Construction"
                fill
                priority
                quality={85}
                sizes="100vw"
                className="object-cover"
              />
            )}
            <video
              key={videos[currentVideo]}
              autoPlay
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => setVideoLoaded(true)}
              onEnded={switchToNextVideo}
            >
              <source src={videos[currentVideo]} type="video/webm" />
              <source src={videos[currentVideo].replace('.webm', '.mp4')} type="video/mp4" />
            </video>
          </>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div 
          className="backdrop-blur-lg bg-gradient-to-b from-black/30 via-black/20 to-black/10 rounded-3xl px-10 py-6 md:p-12 shadow-2xl border border-transparent opacity-100 translate-y-0"
          style={{ minHeight: '400px' }} // Prevent CLS
        >
          <h1 className="hero-text text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('heroTitle')}
            <span className="text-accent-500"> {t('heroTitleHighlight')}</span>
          </h1>
          <p 
            className="text-xl md:text-2xl text-slate-200 mb-8 max-w-4xl mx-auto leading-relaxed"
            style={{ minHeight: '64px' }} // Prevent CLS
          >
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
