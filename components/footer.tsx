import { useTranslation } from "../hooks/use-translation";

export default function Footer() {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-primary-400">ADCC</span>
            </div>
            <p className="text-slate-300 mb-4">Advanced Design & Contracting Co.</p>
            <p className="text-slate-400">
              {t('companyDescription')}
            </p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection("home")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {t('home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("services")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {t('services')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("projects")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {t('projects')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("about")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {t('about')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("contact")}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {t('contactUs')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contactInfo')}</h4>
            <div className="space-y-2 text-slate-400">
              <p>+966 55 243 3880</p>
              <p>info@adcc.sa</p>
              <p>Saudi Arabia</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a 
                href="https://wa.me/+966552433880" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-green-400 transition-colors"
              >
                <i className="fab fa-whatsapp text-xl"></i>
              </a>
              <a 
                href="https://www.linkedin.com/company/adccsa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors"
              >
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a 
                href="https://www.instagram.com/adccsaudi/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors"
              >
                <i className="fab fa-instagram text-xl"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 text-center">
          <p className="text-slate-400">&copy; 2024 Advanced Design & Contracting Co. {t('allRights')}</p>
        </div>
      </div>
    </footer>
  );
}
