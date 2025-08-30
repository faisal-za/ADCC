"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";

interface ProjectsSectionProps {
  projects?: any[];
  categories?: any[];
}

const fallbackProjects = [
  {
    id: 1,
    titleKey: "kfVillaTitle",
    descriptionKey: "kfVillaDesc",
    category: "construction",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600607687644-c7171b176c86?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["residential", "luxury", "modern"]
  },
  {
    id: 2,
    titleKey: "healthMatrixTitle",
    descriptionKey: "healthMatrixDesc",
    category: "commercial",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["commercial", "healthcare", "modern"]
  },
  {
    id: 3,
    titleKey: "abdulrahmanTitle",
    descriptionKey: "abdulrahmanDesc",
    category: "renovation",
    images: [
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["renovation", "residential", "upgrade"]
  },
  {
    id: 4,
    titleKey: "alrahmaniahTitle",
    descriptionKey: "alrahmaniahDesc",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["residential", "traditional", "luxury"]
  },
  {
    id: 5,
    titleKey: "daisamTitle",
    descriptionKey: "daisamDesc",
    category: "commercial",
    images: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["commercial", "real-estate", "sustainable"]
  },
  {
    id: 6,
    titleKey: "alqasimTitle",
    descriptionKey: "alqasimDesc",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    tags: ["residential", "apartments", "luxury"]
  }
];

function ImageScroller({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (images.length > 1) {
      const interval = setInterval(() => {
        if (!isHovered) {
          setCurrentIndex((prev) => (prev + 1) % images.length);
        }
      }, 4000); // Change image every 4 seconds

      return () => clearInterval(interval);
    }
  }, [images.length, isHovered]);

  return (
    <div 
      className="aspect-[4/3] relative overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`${title} - ${index + 1}`}
          fill
          loading="lazy"
          priority={false}
          quality={85}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 bg-white/80 hover:bg-white/90 z-10"
            onClick={prevImage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 bg-white/80 hover:bg-white/90 z-10"
            onClick={nextImage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  index === currentIndex ? "bg-white scale-110" : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function ProjectsSection({ projects = [], categories = [] }: ProjectsSectionProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Debug log

  // Filter projects based on selected category
  const filteredProjects = selectedCategory 
    ? projects.filter(project => 
        project.categories?.some((cat: any) => cat.categories?.id === selectedCategory)
      )
    : projects;

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            {t('projectsTitle') || 'Our Projects'}
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('projectsDescription') || 'Discover our portfolio of exceptional construction and design projects that showcase our expertise and commitment to excellence.'}
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={`transition-all duration-300 ${
              selectedCategory === null 
                ? "bg-primary-600 hover:bg-primary-700 text-white" 
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {t('allProjects')}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-primary-600 hover:bg-primary-700 text-white" 
                  : "border-slate-300 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {category.translations?.[0]?.title || 'Category'}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="project-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <ImageScroller 
                images={project.images?.map((img: any) => `https://admin.adcc.sa/assets/${img.directus_files_id?.id}`).filter(Boolean) || []} 
                title={project.translations?.[0]?.title || 'Project'} 
              />
              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.categories?.map((cat: any) => (
                    <Badge 
                      key={cat.id}
                      variant={cat.categories?.id === selectedCategory ? "default" : "secondary"}
                      className={`transition-all duration-300 ${
                        cat.categories?.id === selectedCategory 
                          ? "bg-primary-600 text-white shadow-md" 
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {cat.categories?.translations?.[0]?.title || 'Category'}
                    </Badge>
                  )) || []}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {project.translations?.[0]?.title || 'Untitled'}
                </h3>
                <p className="text-slate-600 mb-4">
                  {project.translations?.[0]?.description || ''}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No projects found with the selected category.</p>
          </div>
        )}

        {/* Call to Action Button */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="bg-primary-600 hover:bg-primary-700 px-8 py-3"
            onClick={() => {
              const contactSection = document.getElementById('contact');
              contactSection?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('startProjectToday') || 'ابدأ مشروعك اليوم'}
          </Button>
        </div>
      </div>
    </section>
  );
}