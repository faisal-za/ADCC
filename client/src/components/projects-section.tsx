import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ArrowRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Health Matrix",
    description: "Modern healthcare facility with state-of-the-art infrastructure and patient-centered design.",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Commercial"
  },
  {
    id: 2,
    title: "Alqasim Apartments",
    description: "Luxury residential complex featuring modern amenities and sustainable design principles.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Residential"
  },
  {
    id: 3,
    title: "KF District Villa",
    description: "Contemporary villa design combining luxury living with functional architecture and premium finishes.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Residential"
  },
  {
    id: 4,
    title: "Alrahmaniah Villa",
    description: "Elegant villa featuring traditional elements with modern functionality and beautiful landscaping.",
    category: "residential",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Residential"
  },
  {
    id: 5,
    title: "Daisam Real Estate",
    description: "Modern commercial development with innovative design and sustainable construction practices.",
    category: "commercial",
    image: "https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Commercial"
  },
  {
    id: 6,
    title: "Abdulrahman Renovation",
    description: "Complete transformation of existing structure with modern upgrades and enhanced functionality.",
    category: "renovation",
    image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    badge: "Renovation"
  }
];

const filters = [
  { id: "all", label: "All Projects" },
  { id: "residential", label: "Residential" },
  { id: "commercial", label: "Commercial" },
  { id: "renovation", label: "Renovation" }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(new Set<number>());

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleProjects(prev => new Set([...prev, index]));
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
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Featured Projects</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Explore our portfolio of successfully completed projects that showcase our expertise and commitment to excellence.
          </p>
          
          {/* Project Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
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
                    className={`${
                      project.category === 'commercial' ? 'bg-blue-100 text-blue-800' :
                      project.category === 'residential' ? 'bg-green-100 text-green-800' :
                      'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {project.badge}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <ExternalLink className="h-5 w-5 text-white opacity-70 hover:opacity-100 cursor-pointer transition-opacity" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <button
                  onClick={scrollToContact}
                  className="text-primary-600 font-medium hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                  View Details <ArrowRight className="h-4 w-4" />
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
            Start Your Project Today
          </Button>
        </div>
      </div>
    </section>
  );
}
