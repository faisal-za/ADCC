'use client'

import { Languages } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useLanguage } from "../contexts/language-context";

export default function LanguageSwitch() {
  const { language, switchLanguage } = useLanguage();

  const handleLanguageChange = (newLanguage: string) => {
    switchLanguage(newLanguage as 'en' | 'ar');
  };

  return (
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="h-9 w-[100px] text-sm">
        <div className="flex items-center gap-2">
          <Languages className="h-4 w-4" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en" className="text-sm">
          English
        </SelectItem>
        <SelectItem value="ar" className="text-sm">
          العربية
        </SelectItem>
      </SelectContent>
    </Select>
  );
}