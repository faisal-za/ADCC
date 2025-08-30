'use client'

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";
import { scrollToSection } from "../lib/utils/scroll";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Restart video when it becomes active
  useEffect(() => {
    const activeVideo = document.querySelector(`video[data-index="${currentVideo}"]`) as HTMLVideoElement;
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play();
    }
  }, [currentVideo]);


  return (
    <section id="home" className="relative h-[calc(100vh-4rem)] flex items-center overflow-hidden">
      {/* Simple Stacked Videos with CSS Transitions */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <video
            key={video}
            data-index={index}
            autoPlay
            muted
            playsInline
            preload={index === 0 ? "auto" : "metadata"}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentVideo ? 'opacity-100' : 'opacity-0'
            }`}
            onEnded={index === currentVideo ? switchToNextVideo : undefined}
          >
            <source src={video} type="video/webm" />
            <source src={video.replace('.webm', '.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`backdrop-blur-lg bg-gradient-to-b from-black/30 via-black/20 to-black/10 rounded-3xl px-10 py-6 md:p-12 shadow-2xl border border-transparent transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
