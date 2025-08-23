"use client";

import { useTranslation } from "../hooks/use-translation";

export default function ServicesSectionHeader() {
  const { t } = useTranslation();

  return (
    <header className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
        {t('servicesTitle')}
      </h2>
      <p className="text-xl text-slate-600 max-w-3xl mx-auto">
        {t('servicesDescription')}
      </p>
    </header>
  );
}