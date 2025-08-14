import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

const getProjects = (t: any) => [
  {
    id: 1,
    titleKey: "healthMatrixTitle",
    descriptionKey: "healthMatrixDesc",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badgeKey: "commercial"
  },
  {
    id: 2,
    titleKey: "alqasimTitle",
    descriptionKey: "alqasimDesc",
    category: "residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badgeKey: "residential"
  },
  {
    id: 3,
    titleKey: "kfVillaTitle",
    descriptionKey: "kfVillaDesc",
    category: "residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badgeKey: "residential"
  },
  {
    id: 4,
    titleKey: "alrahmaniahTitle",
    descriptionKey: "alrahmaniahDesc",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badgeKey: "residential"
  },
  {
    id: 5,
    titleKey: "daisamTitle",
    descriptionKey: "daisamDesc",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badgeKey: "commercial"
  },
  {
    id: 6,
    titleKey: "abdulrahmanTitle",
    descriptionKey: "abdulrahmanDesc",
    category: "renovation",
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
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
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url('${project.image}')` }}
              >
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
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{t(project.titleKey)}</h3>
                <p className="text-slate-600 mb-4">{t(project.descriptionKey)}</p>
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
