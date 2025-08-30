'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";
import { scrollToSection } from "../lib/utils/scroll";

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const { t } = useTranslation();

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


  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Hero Video with Poster for Instant LCP */}
      <div className="absolute inset-0">
        {/* Current Video */}
        <video
          key={videos[currentVideo]}
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster={`https://pub-739d7839c19e41459d767b500777a0c7.r2.dev/hero-videos/poster-${currentVideo + 1}.jpg`}
          className="absolute inset-0 w-full h-full object-cover"
          onEnded={switchToNextVideo}
          onLoadStart={() => {
            // Preload next video
            const nextIndex = (currentVideo + 1) % videos.length;
            const nextVideo = document.createElement('video');
            nextVideo.preload = 'metadata';
            nextVideo.src = videos[nextIndex];
          }}
        >
          <source src={videos[currentVideo]} type="video/webm" />
          <source src={videos[currentVideo].replace('.webm', '.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
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
