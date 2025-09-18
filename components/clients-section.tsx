"use client";

import React from "react";
import AutoScroll from "embla-carousel-auto-scroll";
import { useTranslation } from "../hooks/use-translation";
import { useLanguage } from "../contexts/language-context";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

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

// Helper function to create infinite scrolling slides
const createInfiniteSlides = (clients: Client[]) => {
  return [...clients, ...clients, ...clients];
};

// Individual client logo slide component
const ClientLogoSlide = ({ client }: { client: Client }) => (
  <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/5 lg:basis-1/6 pl-4">
    <div className="p-2">
      {client.logo?.id ? (
        <ClientLogo client={client} />
      ) : (
        <ClientPlaceholder name={client.name} />
      )}
    </div>
  </CarouselItem>
);

// Client logo component
const ClientLogo = ({ client }: { client: Client }) => (
    <Image
      src={`https://admin.adcc.sa/assets/${client.logo!.id}`}
      alt={client.name || 'Client logo'}
      width={130}
      height={95}
      className="rounded-sm"
      loading="lazy"
      sizes="(max-width: 640px) 150px, (max-width: 768px) 120px, 100px"
    />
);

// Client placeholder for missing logos
const ClientPlaceholder = ({ name }: { name: string | null }) => (
  <div className="text-center text-slate-400 font-medium text-sm">
    {name || 'Client'}
  </div>
);

export default function ClientsSection({ clients, locale }: ClientsSectionProps) {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const plugin = React.useRef(
    AutoScroll({
      playOnInit: true,
      speed: 1,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false
    })
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
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            containScroll: "keepSnaps",
            direction: isRTL ? "rtl" : "ltr",
          }}
         
        >
          <CarouselContent>
            {createInfiniteSlides(clients).map((client, index) => (
              <ClientLogoSlide
                key={`${client.id}-${index}`}
                client={client}
              />
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}