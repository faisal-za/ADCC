"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useTranslation } from "../hooks/use-translation";

interface Client {
  id: string;
  name: string | null;
  logo: {
    id: string;
  } | null;
}

interface ClientsSectionProps {
  clients: Client[];
  locale: string;
}

export default function ClientsSection({ clients, locale }: ClientsSectionProps) {
  const { t } = useTranslation();
  
  // Initialize Embla with auto-scroll plugin (not autoplay)
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      dragFree: true,
      containScroll: "keepSnaps",
      watchSlides: false,
      direction: locale === 'ar' ? 'rtl' : 'ltr',
    },
    [
      AutoScroll({
        playOnInit: true,
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false
      })
    ]
  );

  if (!clients || clients.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('ourClients') || 'Our Clients'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('clientsDescription') || 'Trusted by leading companies across Saudi Arabia'}
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...clients, ...clients, ...clients].map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-[0_0_33.333%] min-w-0 px-3 sm:flex-[0_0_25%] md:flex-[0_0_16.666%] lg:flex-[0_0_12.5%]"
              >
                <div className="flex items-center justify-center h-28 sm:h-32 md:h-32 lg:h-36 p-4 bg-white rounded-xl hover:border-primary-300 hover:shadow-md transition-all duration-300">
                  {client.logo?.id ? (
                    <img
                      src={`https://admin.adcc.sa/assets/${client.logo.id}`}
                      alt={client.name || 'Client logo'}
                      className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300"
                      style={{ maxWidth: '120px', maxHeight: '80px' }}
                      loading="lazy"
                    />
                  ) : (
                    <div className="text-center text-slate-400 font-medium text-sm">
                      {client.name || 'Client'}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}