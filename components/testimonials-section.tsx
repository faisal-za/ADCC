'use client'

import { Star, User } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useTranslation } from "../hooks/use-translation";

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
  }
];

export default function TestimonialsSection() {
  const { t } = useTranslation();

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
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-6xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full md:basis-1/3">
                <Card className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <CardContent className="p-6">
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
                    <blockquote className="text-slate-700 text-sm leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}