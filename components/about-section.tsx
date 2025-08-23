'use client'

import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Award, Clock, Leaf } from "lucide-react";
import { useTranslation } from "../hooks/use-translation";

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('about');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Award,
      titleKey: "excellenceTitle" as const,
      descriptionKey: "excellenceDesc" as const,
      color: "bg-primary-50 text-primary-600"
    },
    {
      icon: Clock,
      titleKey: "timeTitle" as const,
      descriptionKey: "timeDesc" as const,
      color: "bg-secondary-100 text-secondary-600"
    },
    {
      icon: Leaf,
      titleKey: "sustainableTitle" as const,
      descriptionKey: "sustainableDesc" as const,
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('whyChoose')}</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {t('aboutDescription')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{t(feature.titleKey)}</h3>
                    <p className="text-slate-600">{t(feature.descriptionKey)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">150+</div>
              <p className="text-slate-600">{t('completedProjects')}</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-accent-500 mb-2">15+</div>
              <p className="text-slate-600">{t('yearsExperience')}</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">98%</div>
              <p className="text-slate-600">{t('clientSatisfaction')}</p>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-slate-600">{t('supportAvailable')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}