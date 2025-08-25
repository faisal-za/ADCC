'use client'

import { useTranslation } from "../hooks/use-translation";
import { useLanguage } from "../contexts/language-context";
import { useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export default function Footer() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const scrollToSection = useCallback((id: string) => {
    const isHomePage = pathname === `/${language}`;

    const performScroll = () => {
      const element = document.querySelector(`#${id}`);
      if (element) {
        const yOffset = -80; // Height of navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({
          top: y,
          behavior: 'smooth'
        });
      }
    };

    if (!isHomePage) {
      // Navigate to home page first
      router.push(`/${language}`);

      // Use MutationObserver for more reliable element detection
      const observer = new MutationObserver((mutations, obs) => {
        const element = document.querySelector(`#${id}`);
        if (element) {
          obs.disconnect();
          performScroll();
        }
      });

      // Start observing after navigation
      setTimeout(() => {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Fallback timeout to prevent infinite observation
        setTimeout(() => observer.disconnect(), 5000);
      }, 100);
    } else {
      performScroll();
    }
  }, [pathname, language, router]);

  return (
    <footer className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-400">ADCC</span>
            </div>
            <p className=" mb-4">Advanced Design & Contracting Co.</p>
            <p className="">
              {t('companyDescription')}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className=" hover: transition-colors"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className=" hover: transition-colors"
                >
                  {t('services')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("projects")}
                  className=" hover: transition-colors"
                >
                  {t('projects')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className=" hover: transition-colors"
                >
                  {t('about')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className=" hover: transition-colors"
                >
                  {t('contactUs')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contactInfo')}</h4>
            <div className="space-y-2 ">
              <p dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>+966 55 243 3880</p>
              <p>info@adcc.sa</p>
              <p>Saudi Arabia</p>
            </div>
            <div className="flex justify-center gap-x-4 mt-4">
              <a
                href="https://wa.me/+966552433880"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-green-400 transition-colors"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/adccsa/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a
                href="https://www.instagram.com/adccsaudi/"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:text-pink-400 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center">
          <p className="">&copy; 2024 Advanced Design & Contracting Co. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  );
}
