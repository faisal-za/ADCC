'use client'

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { useTranslation } from "../hooks/use-translation";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  project: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Property Manager",
    company: "Downtown Plaza LLC",
    content: "ADCC transformed our commercial space beyond our expectations. Their attention to detail and professional approach made the entire renovation process smooth and stress-free. The quality of workmanship is outstanding.",
    rating: 5,
    project: "Commercial Office Renovation",
    image: "https://images.unsplash.com/photo-1494790108755-2616b95b8e51?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Homeowner",
    company: "Residential Client",
    content: "We hired ADCC for our home addition and couldn't be happier with the results. They delivered on time, stayed within budget, and the craftsmanship exceeded our expectations. Highly recommend!",
    rating: 5,
    project: "Home Addition & Remodeling",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Restaurant Owner",
    company: "Golden Dragon Restaurant",
    content: "The team at ADCC completely redesigned our restaurant space. They understood our vision perfectly and created a beautiful, functional space that our customers love. The project was completed efficiently with minimal disruption to our business.",
    rating: 5,
    project: "Restaurant Interior Design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Facility Director",
    company: "Tech Innovations Inc",
    content: "ADCC handled our corporate headquarters construction with exceptional professionalism. Their project management was top-notch, and they coordinated all aspects seamlessly. The end result is a modern, inspiring workspace.",
    rating: 5,
    project: "Corporate Headquarters",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 5,
    name: "Lisa Martinez",
    role: "Store Manager",
    company: "Urban Retail Group",
    content: "Working with ADCC on our retail storefront was an excellent experience. They brought creative solutions to maximize our space while staying true to our brand identity. The attention to detail is remarkable.",
    rating: 5,
    project: "Retail Store Design",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face"
  }
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useTranslation();

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
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
        <div className="relative max-w-4xl mx-auto">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col items-center text-center">
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-primary-500 mb-6" />
                
                {/* Testimonial Content */}
                <blockquote className="text-lg md:text-xl text-slate-700 mb-8 leading-relaxed max-w-3xl">
                  "{testimonials[currentIndex].content}"
                </blockquote>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>
                
                {/* Client Info */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {testimonials[currentIndex].image && (
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="text-center sm:text-left">
                    <h4 className="font-semibold text-slate-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-slate-600">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-slate-500 text-sm">
                      {testimonials[currentIndex].company}
                    </p>
                    <p className="text-primary-600 text-sm font-medium mt-1">
                      {testimonials[currentIndex].project}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            onClick={prevTestimonial}
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-slate-50 border-slate-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            onClick={nextTestimonial}
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white shadow-md hover:bg-slate-50 border-slate-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary-600 scale-125' 
                  : 'bg-slate-300 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-6">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            {isAutoPlaying ? '⏸️ Pause' : '▶️ Play'} Auto-advance
          </button>
        </div>
      </div>
    </section>
  );
}