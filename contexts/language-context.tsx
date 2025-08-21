'use client'

import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { Locale } from '@/i18n.config';

interface LanguageContextType {
  language: Locale;
  switchLanguage: (locale: Locale) => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const language = (params?.locale as Locale) || 'ar';
  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    
    // Force font refresh by adding/removing a class
    const body = document.body;
    if (isRTL) {
      body.classList.add('rtl-font');
    } else {
      body.classList.remove('rtl-font');
    }
  }, [language, isRTL]);

  const switchLanguage = (locale: Locale) => {
    // Get the current pathname without the locale
    const segments = pathname.split('/');
    segments[1] = locale; // Replace the locale segment
    const newPath = segments.join('/');
    
    router.push(newPath);
  };

  return (
    <LanguageContext.Provider value={{ language, switchLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}