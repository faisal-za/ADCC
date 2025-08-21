'use client'

import * as React from "react";
import { Star, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useTranslation } from "../hooks/use-translation";
import { useLanguage } from "../contexts/language-context";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    company: "Downtown Plaza LLC",
    content: "ADCC transformed our space beyond expectations. Exceptional quality and professional service.",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    company: "Residential Client",
    content: "On time, within budget, outstanding craftsmanship. Highly recommend ADCC for any project.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Chen",
    company: "Golden Dragon Restaurant",
    content: "Perfect execution of our restaurant redesign. Beautiful, functional space with minimal disruption.",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    company: "Tech Innovations Inc",
    content: "Exceptional project management and coordination. Created a modern, inspiring workspace.",
    rating: 5,
  },
  {
    id: 5,
    name: "Lisa Martinez",
    company: "Urban Retail Group",
    content: "Creative solutions with remarkable attention to detail. Stayed true to our brand identity.",
    rating: 5,
  },
  {
    id: 6,
    name: "Ahmed Al-Mansouri",
    company: "Gulf Construction",
    content: "Outstanding construction quality and timely delivery. ADCC exceeded all our expectations for this major project.",
    rating: 5,
  },
  {
    id: 7,
    name: "Fatima Hassan",
    company: "Modern Living Spaces",
    content: "Incredible interior design work. They understood our vision perfectly and brought it to life beautifully.",
    rating: 5,
  },
  {
    id: 8,
    name: "Omar Khalil",
    company: "Riyadh Developments",
    content: "Professional team with excellent project management. Delivered a high-quality renovation on schedule.",
    rating: 5,
  }
];

export default function TestimonialsSection() {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [api, setApi] = React.useState<any>();
  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );


  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-3 w-3 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            {t('testimonialsTitle') || 'What Our Clients Say'}
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            {t('testimonialsDescription') || 'Hear from our satisfied clients about their experience working with ADCC on their construction and renovation projects.'}
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="px-4 md:px-8">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
              skipSnaps: false,
              direction: isRTL ? "rtl" : "ltr",
            }}
            onMouseEnter={() => plugin.current?.stop?.()}
            onMouseLeave={() => plugin.current?.play?.()}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-2">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={`${testimonial.id}-${index}`} className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                  <div className="px-1 py-4">
                    <Card className="bg-white h-56 border-0 shadow-lg flex flex-col">
                      <CardContent className="p-4 flex flex-col h-full">
                        {/* User Icon */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-slate-900 text-sm">
                              {testimonial.name}
                            </h4>
                            <p className="text-slate-600 text-xs">
                              {testimonial.company}
                            </p>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-3">
                          {renderStars(testimonial.rating)}
                        </div>
                        
                        {/* Testimonial Content */}
                        <blockquote className="text-slate-700 text-sm leading-relaxed flex-1">
                          "{testimonial.content}"
                        </blockquote>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="flex" />
            <CarouselNext className="flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}