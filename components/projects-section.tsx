'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";

// Image Carousel Component
function ProjectImageCarousel({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full group">
      <div 
        className="w-full h-full bg-cover bg-center transition-all duration-500"
        style={{ backgroundImage: `url('${images[currentIndex]}')` }}
      />
      
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-opacity-70"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
      
      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const getProjects = (t: any) => [
  {
    id: 1,
    titleKey: "healthMatrixTitle",
    descriptionKey: "healthMatrixDesc",
    category: "commercial",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1555421689-d68471e189f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "commercial"
  },
  {
    id: 2,
    titleKey: "alqasimTitle",
    descriptionKey: "alqasimDesc",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "residential"
  },
  {
    id: 3,
    titleKey: "kfVillaTitle",
    descriptionKey: "kfVillaDesc",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "residential"
  },
  {
    id: 4,
    titleKey: "alrahmaniahTitle",
    descriptionKey: "alrahmaniahDesc",
    category: "residential",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1571939228382-b2f2b585ce15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "residential"
  },
  {
    id: 5,
    titleKey: "daisamTitle",
    descriptionKey: "daisamDesc",
    category: "commercial",
    images: [
      "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "commercial"
  },
  {
    id: 6,
    titleKey: "abdulrahmanTitle",
    descriptionKey: "abdulrahmanDesc",
    category: "renovation",
    images: [
      "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    badgeKey: "renovation"
  }
];

const getFilters = (t: any) => [
  { id: "all", label: t('allProjects') },
  { id: "residential", label: t('residential') },
  { id: "commercial", label: t('commercial') },
  { id: "renovation", label: t('renovation') }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const { t } = useTranslation();
  const filters = getFilters(t);
  const projects = getProjects(t);

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects(prev => new Set(Array.from(prev).concat([index])));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [filteredProjects]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('projectsTitle')}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            {t('projectsDescription')}
          </p>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-lg font-medium transition-all btn-hover ${
                  activeFilter === filter.id 
                    ? "bg-primary-600 text-white" 
                    : "bg-slate-200 text-slate-600 hover:bg-slate-300"
                }`}
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className={`project-card bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 ${
                visibleProjects.has(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              data-index={index}
            >
              <div className="h-64 relative overflow-hidden">
                <ProjectImageCarousel images={project.images} />
                <div className="absolute top-4 left-4">
                  <Badge 
                    variant="secondary"
                    className={`project-tag ${
                      project.category === 'commercial' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'residential' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {t(project.badgeKey as any)}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <ExternalLink className="h-5 w-5 text-white opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t(project.titleKey as any)}</h3>
                <p className="text-slate-600 mb-4">{t(project.descriptionKey as any)}</p>
                <button
                  onClick={scrollToContact}
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                  {t('viewDetails')} <ArrowRight className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            onClick={scrollToContact}
            className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-4 text-lg font-semibold"
          >
            {t('startProjectToday')}
          </Button>
        </div>
      </div>
    </section>
  );
}
