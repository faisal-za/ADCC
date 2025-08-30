"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { getIconComponent } from "../lib/icon-map";
import ServicesSectionHeader from "./services-section-header";

interface ServicesSectionProps {
  services?: any[];
}

function getServiceColorClass(index: number): string {
  const colorClasses = [
    "bg-accent-100 text-accent-600",
    "bg-secondary-100 text-secondary-600", 
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
    "bg-blue-100 text-blue-600",
    "bg-red-100 text-red-600",
    "bg-yellow-100 text-yellow-600",
    "bg-pink-100 text-pink-600",
  ];
  
  return colorClasses[index % colorClasses.length];
}

function ServicesSkeleton() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-12 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto mb-16" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <Card key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <Skeleton className="aspect-[16/9] w-full" />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                </div>
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection({ services = [] }: ServicesSectionProps) {
  if (!services || services.length === 0) {
    return <ServicesSkeleton />;
  }

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesSectionHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.length > 0 ? (
            services.map((service, index) => {
              const IconComponent = getIconComponent(service.icon);
              const colorClass = getServiceColorClass(index);
              
              return (
                <Card
                  key={service.id}
                  className="service-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                >
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <Image
                      src={service.image?.id ? `https://admin.adcc.sa/assets/${service.image.id}` : '/placeholder-service.jpg'}
                      alt={service.translations?.[0]?.title || 'Service'}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mb-4`}>
                      <IconComponent className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3">
                      {service.translations?.[0]?.title || 'Service'}
                    </h3>
                    <p className="text-slate-600 mb-4">
                      {service.translations?.[0]?.description || ''}
                    </p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            // Fallback loading state or empty state
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500">Loading services...</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}