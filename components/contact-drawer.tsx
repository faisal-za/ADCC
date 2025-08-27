'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { 
  Drawer, 
  DrawerClose, 
  DrawerContent, 
  DrawerHeader, 
  DrawerTitle 
} from "./ui/drawer";
import { useTranslation } from "../hooks/use-translation";
import { submitContactForm } from "../lib/actions/contact";
import { X } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  phone_number: z.string().min(1, "Phone number is required"),
  service_type: z.string().optional(),
  description: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone_number: "",
      service_type: "",
      description: "",
    },
  });

  // Reset state when drawer is reopened
  const handleDrawerChange = (open: boolean) => {
    if (!open) {
      setMessage(null);
      setIsSubmitted(false);
      form.reset();
    }
    onClose();
  };

  const onSubmit = async (values: ContactFormValues) => {
    setMessage(null);
    
    // Get user identifier (email or phone number)
    const userKey = values.email || values.phone_number;
    
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
        return;
      }
    }
    
    // Convert form values to FormData for the server action
    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });
    
    const result = await submitContactForm(formData);
    
    if (result.success) {
      // Store submission timestamp in localStorage
      localStorage.setItem(lastSubmissionKey, Date.now().toString());
      
      setMessage({ type: 'success', text: t('messageSuccess') || 'Message sent successfully!' });
      setIsSubmitted(true);
      form.reset();
    } else {
      setMessage({ type: 'error', text: result.error || 'Failed to send message' });
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={handleDrawerChange}>
      <DrawerContent className="max-h-[85vh]">
        <DrawerHeader className="pb-2">
          <DrawerTitle className="text-xl font-bold text-slate-900">
            {t('getInTouch')}
          </DrawerTitle>
          <DrawerClose asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 rounded-full"
            >
              <X className="h-5 w-5" />
            </Button>
          </DrawerClose>
        </DrawerHeader>
        
        <div className="px-4 pb-6 overflow-y-auto flex-1">
          <div className="bg-white rounded-lg border shadow-sm">
            <div className="p-4 pb-6">
              {isSubmitted && message ? (
                // Success state - show only message and continue button
                <div className="text-center space-y-4">
                  <div className={`p-4 rounded-lg text-base ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message.text}
                  </div>
                  <Button 
                    onClick={() => handleDrawerChange(false)}
                    className="w-full bg-primary-600 hover:bg-primary-700 h-10 text-sm"
                  >
                    {t('continue') || 'Continue'}
                  </Button>
                </div>
              ) : (
                // Form state - show form with optional error message
                <>
                  {message && message.type === 'error' && (
                    <div className="p-3 rounded-lg mb-4 text-sm bg-red-100 text-red-800">
                      {message.text}
                    </div>
                  )}
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-xs font-medium text-slate-700">
                                {t('name') || 'Name'} <span className="text-red-500">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder={t('enterName') || 'Enter your name'}
                                  className="h-9 text-xs placeholder:text-xs"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem className="space-y-1">
                              <FormLabel className="text-xs font-medium text-slate-700">
                                {t('email') || 'Email'}
                              </FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder={t('enterEmail') || 'Enter your email'}
                                  className="h-9 text-xs placeholder:text-xs"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage className="text-xs" />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium text-slate-700">
                              {t('phoneNumber') || 'Phone Number'} <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input 
                                type="tel"
                                placeholder={t('enterPhone') || 'Enter your phone number'}
                                className="h-9 text-xs placeholder:text-xs"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="service_type"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium text-slate-700">
                              {t('serviceInterested') || 'Service Interested'}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="rtl:text-right h-9 text-xs" style={{ direction: 'inherit' }}>
                                  <SelectValue placeholder={t('selectService') || 'Select a service'} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="rtl:text-right">
                                <SelectItem value="construction" className="rtl:text-right text-xs">{t('constructionService') || 'Construction'}</SelectItem>
                                <SelectItem value="finishing" className="rtl:text-right text-xs">{t('finishingService') || 'Finishing'}</SelectItem>
                                <SelectItem value="renovation" className="rtl:text-right text-xs">{t('renovationService') || 'Renovation'}</SelectItem>
                                <SelectItem value="interior-exterior" className="rtl:text-right text-xs">{t('interiorService') || 'Interior Design'}</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="space-y-1">
                            <FormLabel className="text-xs font-medium text-slate-700">
                              {t('message') || 'Message'}
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                placeholder={t('messagePlaceholder') || 'Tell us about your project...'}
                                className="rtl:text-right text-xs placeholder:text-xs resize-none"
                                style={{ direction: 'inherit' }}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-primary-600 hover:bg-primary-700 h-9 text-xs"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? (t('sending') || 'Sending...') : (t('submit') || 'Submit')}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}