import { useState, useEffect } from "react";
import { Award, Clock, Leaf } from "lucide-react";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      title: "Excellence in Craftsmanship",
      description: "Every project adheres to the highest standards of craftsmanship and efficiency with meticulous attention to detail.",
      color: "bg-primary-100 text-primary-600"
    },
    {
      icon: Clock,
      title: "On-Time Delivery",
      description: "We pride ourselves on delivering projects on schedule without compromising quality or safety standards.",
      color: "bg-accent-100 text-accent-600"
    },
    {
      icon: Leaf,
      title: "Sustainable Practices",
      description: "Environmental responsibility is at the core of our construction and design methodologies.",
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose ADCC?</h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              At Advanced Design & Contracting Co., we take pride in our ability to execute projects on time and within budget, while maintaining a focus on quality, sustainability, and customer satisfaction.
            </p>
            
            <div className="space-y-6">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-start transition-all duration-700 delay-${index * 200} ${
                      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                    }`}
                  >
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mr-4 mt-1`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                      <p className="text-slate-600">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Professional construction team collaborating" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold text-primary-600 mb-1">10+</div>
                <div className="text-slate-600">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
