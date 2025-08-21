"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { HardHat, Gem, Wrench, Palette } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";
import type { TranslationKey } from "../lib/translations";

const services = [
  {
    icon: HardHat,
    titleKey: "constructionTitle" as TranslationKey,
    descriptionKey: "constructionDesc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    color: "bg-accent-100 text-accent-600"
  },
  {
    icon: Gem,
    titleKey: "finishingTitle" as TranslationKey,
    descriptionKey: "finishingDesc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    color: "bg-secondary-100 text-secondary-600"
  },
  {
    icon: Wrench,
    titleKey: "renovationTitle" as TranslationKey,
    descriptionKey: "renovationDesc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Palette,
    titleKey: "interiorTitle" as TranslationKey,
    descriptionKey: "interiorDesc" as TranslationKey,
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    color: "bg-purple-100 text-purple-600"
  }
];

export default function ServicesSection() {
  const { t } = useTranslation();

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('servicesDescription')}
          </p>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="service-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={t(service.titleKey)}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                    <IconComponent className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {t(service.titleKey)}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {t(service.descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}