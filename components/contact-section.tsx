import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { useToast } from "../hooks/use-toast";
import { insertContactSchema, type InsertContact } from "../shared/schema";
import { apiRequest } from "../lib/queryClient";
import { useTranslation } from "../hooks/use-translation";
import { Mail, Phone, MapPin, MessageCircle, Linkedin, Instagram } from "lucide-react";

export default function ContactSection() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "",
      message: ""
    }
  });

  const contactMutation = useMutation({
    mutationFn: async (data: InsertContact) => {
      const response = await apiRequest("POST", "/api/contacts", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('messageSent'),
        description: t('messageSuccess'),
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/contacts"] });
    },
    onError: (error) => {
      toast({
        title: t('error'),
        description: t('messageFailed'),
        variant: "destructive",
      });
      console.error("Contact form error:", error);
    }
  });

  const onSubmit = (data: InsertContact) => {
    contactMutation.mutate(data);
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
          {/* Contact Form - Mobile First */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"
                    style={{ direction: 'inherit' }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('firstName')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('enterFirstName')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t('lastName')}</FormLabel>
                            <FormControl>
                              <Input placeholder={t('enterLastName')} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('email')}</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder={t('enterEmail')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('phoneNumber')}</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder={t('enterPhone')} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="service"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('serviceInterested')}</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="rtl:text-right" style={{ direction: 'inherit' }}>
                                <SelectValue placeholder={t('selectService')} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rtl:text-right">
                              <SelectItem value="construction" className="rtl:text-right">{t('constructionService')}</SelectItem>
                              <SelectItem value="finishing" className="rtl:text-right">{t('finishingService')}</SelectItem>
                              <SelectItem value="renovation" className="rtl:text-right">{t('renovationService')}</SelectItem>
                              <SelectItem value="interior-exterior" className="rtl:text-right">{t('interiorService')}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('message')}</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder={t('messagePlaceholder')} 
                              className="min-h-[120px] rtl:text-right"
                              style={{ direction: 'inherit' }}
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary-600 hover:bg-primary-700"
                      disabled={contactMutation.isPending}
                    >
                      {contactMutation.isPending ? t('sending') : t('sendMessage')}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="order-1 lg:order-2">
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">{t('contactInformation')}</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('phone')}</h4>
                  <p className="text-slate-600">+966 55 243 3880</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mr-4">
                  <Mail className="h-6 w-6 text-accent-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('email')}</h4>
                  <p className="text-slate-600">info@adcc.sa</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{t('location')}</h4>
                  <p className="text-slate-600">{t('saudiArabia')}</p>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="space-y-4">
              <h4 className="font-semibold text-slate-900">{t('connectWith')}</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://wa.me/+966552433880" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-green-500 text-white rounded-lg flex items-center justify-center hover:bg-green-600 transition-all btn-hover"
                >
                  <MessageCircle className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.linkedin.com/company/adccsa/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition-all btn-hover"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a 
                  href="https://www.instagram.com/adccsaudi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-pink-500 text-white rounded-lg flex items-center justify-center hover:bg-pink-600 transition-all btn-hover"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
