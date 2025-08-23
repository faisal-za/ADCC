'use client'

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useTranslation } from "../hooks/use-translation";
import { submitContactForm } from "../lib/actions/contact";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Instagram } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setMessage(null);
    
    // Get user identifier (email or phone number)
    const email = formData.get('email') as string;
    const phoneNumber = formData.get('phone_number') as string;
    const userKey = email || phoneNumber;
    
    // Check if user has submitted recently (within 24 hours)
    const lastSubmissionKey = `contact_submission_${userKey}`;
    const lastSubmission = localStorage.getItem(lastSubmissionKey);
    
    if (lastSubmission) {
      const lastSubmissionTime = parseInt(lastSubmission);
      const hoursSinceSubmission = (Date.now() - lastSubmissionTime) / (1000 * 60 * 60);
      
      if (hoursSinceSubmission < 24) {
        setMessage({ 
          type: 'error', 
          text: t('duplicateSubmissionError') || 'You have already submitted a message recently. Please wait 24 hours before submitting again.'
        });
        setIsSubmitting(false);
        return;
      }
    }
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      // Store submission timestamp in localStorage
      localStorage.setItem(lastSubmissionKey, Date.now().toString());
      
      setMessage({ type: 'success', text: t('messageSuccess') || 'Message sent successfully!' });
      // Reset form
      const form = document.getElementById('contact-form') as HTMLFormElement;
      if (form) form.reset();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to send message' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">{t('getInTouch')}</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            {t('contactDescription')}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="order-2 lg:order-1">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {message && (
                  <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                  </div>
                )}
                <form id="contact-form" action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                        {t('name') || 'Name'} <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t('enterName') || 'Enter your name'}
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                        {t('email') || 'Email'}
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder={t('enterEmail') || 'Enter your email'}
                        className="w-full"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone_number" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('phoneNumber') || 'Phone Number'} <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="phone_number"
                      name="phone_number"
                      type="tel"
                      required
                      placeholder={t('enterPhone') || 'Enter your phone number'}
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="service_type" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('serviceInterested') || 'Service Interested'}
                    </label>
                    <Select name="service_type">
                      <SelectTrigger className="rtl:text-right" style={{ direction: 'inherit' }}>
                        <SelectValue placeholder={t('selectService') || 'Select a service'} />
                      </SelectTrigger>
                      <SelectContent className="rtl:text-right">
                        <SelectItem value="construction" className="rtl:text-right">{t('constructionService') || 'Construction'}</SelectItem>
                        <SelectItem value="finishing" className="rtl:text-right">{t('finishingService') || 'Finishing'}</SelectItem>
                        <SelectItem value="renovation" className="rtl:text-right">{t('renovationService') || 'Renovation'}</SelectItem>
                        <SelectItem value="interior-exterior" className="rtl:text-right">{t('interiorService') || 'Interior Design'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                      {t('message') || 'Message'}
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      rows={4}
                      placeholder={t('messagePlaceholder') || 'Tell us about your project...'}
                      className="w-full rtl:text-right"
                      style={{ direction: 'inherit' }}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-primary-600 hover:bg-primary-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (t('sending') || 'Sending...') : (t('submit') || 'Submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">{t('contactInformation')}</h3>
            <div className="space-y-10 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-secondary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('phone')}</h4>
                  <p className="text-slate-600" dir="ltr" style={{ direction: 'ltr', unicodeBidi: 'bidi-override' }}>+966 55 243 3880</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-accent-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('email')}</h4>
                  <p className="text-slate-600">info@adcc.sa</p>
                </div>
              </div>
              <div className="flex items-center gap-3 cursor-pointer" onClick={()=> window.open("https://www.google.com/maps/place/24%C2%B045'07.8%22N+46%C2%B040'22.1%22E/@24.752192,46.672832,21z/data=!4m4!3m3!8m2!3d24.752177!4d46.672803?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDgxOS4wIKXMDSoASAFQAw%3D%3D")}>
                <div className="p-3 bg-green-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('location')}</h4>
                  <p className="text-slate-600">{t('saudiArabia')}</p>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                  <div className="flex gap-x-4 items-center">
                    <a 
                      href="https://wa.me/+966552433880" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all btn-hover"
                    >
                      <MessageCircle className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.linkedin.com/company/adccsa/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all btn-hover"
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a 
                      href="https://www.instagram.com/adccsaudi/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-3 bg-pink-500 text-white rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all btn-hover"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
