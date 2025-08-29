'use client'

import { useEffect } from "react";
import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from "../contexts/language-context";

export default function LanguageSwitch() {
  const { language, switchLanguage } = useLanguage();

  useEffect(() => {
    console.log('🔍 LanguageSwitch mounted, current language:', language);
    
    // Check if we're on mobile
    const isMobile = window.innerWidth < 1024;
    console.log('📱 Is mobile device?', isMobile);
    
    // Check parent element
    const parentElement = document.querySelector('.mobile-menu');
    if (parentElement) {
      console.log('📦 Parent mobile menu found:', parentElement);
      const styles = window.getComputedStyle(parentElement);
      console.log('📏 Parent z-index:', styles.zIndex);
      console.log('📏 Parent position:', styles.position);
    }
    
    // Check for Select portal after a delay
    setTimeout(() => {
      const portal = document.querySelector('[data-radix-popper-content-wrapper]');
      if (portal) {
        console.log('🌀 Portal found:', portal);
        const portalStyles = window.getComputedStyle(portal as HTMLElement);
        console.log('🌀 Portal z-index:', portalStyles.zIndex);
        console.log('🌀 Portal position:', portalStyles.position);
      }
    }, 500);
    
    return () => {
      console.log('🔚 LanguageSwitch unmounting');
    };
  }, [language]);

  const handleLanguageChange = (newLanguage: string) => {
    console.log('🎯 handleLanguageChange called with:', newLanguage);
    console.log('📍 Current language before switch:', language);
    console.log('📍 Event timestamp:', new Date().toISOString());
    
    try {
      switchLanguage(newLanguage as 'en' | 'ar');
      console.log('✅ switchLanguage called successfully');
      console.log('📍 Language after switch call:', language);
    } catch (error) {
      console.error('❌ Language switch error:', error);
    }
  };

  return (
    <Select 
      value={language} 
      onValueChange={handleLanguageChange}
      onOpenChange={(open) => {
        console.log('📂 Select open state changed:', open);
        if (open) {
          setTimeout(() => {
            const content = document.querySelector('[role="listbox"]');
            console.log('📋 Select content element:', content);
            if (content) {
              const styles = window.getComputedStyle(content as HTMLElement);
              console.log('📋 Content z-index:', styles.zIndex);
              console.log('📋 Content position:', styles.position);
              console.log('📋 Content pointer-events:', styles.pointerEvents);
            }
          }, 100);
        }
      }}
    >
      <SelectTrigger 
        className="h-9 w-[100px] text-sm"
        onClick={(e) => {
          console.log('🔘 Select trigger clicked');
          console.log('🔘 Click event:', e);
          console.log('🔘 Event target:', e.target);
        }}
        onMouseDown={(e) => {
          console.log('👇 Select trigger mouse down');
        }}
        onTouchStart={(e) => {
          console.log('👆 Select trigger touch start');
        }}
      >
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem 
          value="en" 
          className="text-sm"
          onMouseDown={(e) => {
            console.log('🇬🇧 English item mouse down');
          }}
          onTouchStart={(e) => {
            console.log('🇬🇧 English item touch start');
          }}
        >
          English
        </SelectItem>
        <SelectItem 
          value="ar" 
          className="text-sm"
          onMouseDown={(e) => {
            console.log('🇸🇦 Arabic item mouse down');
          }}
          onTouchStart={(e) => {
            console.log('🇸🇦 Arabic item touch start');
          }}
        >
          العربية
        </SelectItem>
      </SelectContent>
    </Select>
  );
}