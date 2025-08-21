export function OrganizationStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ADCC - Advanced Design & Contracting Company",
    "alternateName": "ADCC",
    "description": "Leading construction company in UAE offering professional building, renovation, interior design, and finishing services.",
    "url": "https://adcc-website.com",
    "logo": "https://adcc-website.com/logo.png",
    "sameAs": [
      "https://www.linkedin.com/company/adcc",
      "https://www.facebook.com/adcc",
      "https://www.instagram.com/adcc"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+971-XX-XXX-XXXX",
      "contactType": "customer service",
      "availableLanguage": ["English", "Arabic"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Business District",
      "addressLocality": "Dubai",
      "addressCountry": "UAE"
    },
    "foundingDate": "2020",
    "numberOfEmployees": "50-100",
    "knowsAbout": [
      "Construction",
      "Interior Design",
      "Renovation",
      "Building Finishing",
      "Project Management",
      "Architecture"
    ],
    "serviceArea": {
      "@type": "Place",
      "name": "United Arab Emirates"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function ServicesStructuredData() {
  const services = [
    {
      "@type": "Service",
      "name": "Construction & Building Works",
      "description": "Complete construction solutions from foundation to completion, ensuring structural integrity and quality craftsmanship.",
      "provider": {
        "@type": "Organization",
        "name": "ADCC"
      },
      "serviceType": "Construction"
    },
    {
      "@type": "Service", 
      "name": "High-End Finishing Projects",
      "description": "Premium finishing services with attention to detail, using the finest materials and advanced techniques.",
      "provider": {
        "@type": "Organization",
        "name": "ADCC"
      },
      "serviceType": "Finishing"
    },
    {
      "@type": "Service",
      "name": "Building Renovation Projects", 
      "description": "Transform existing spaces with comprehensive renovation services that breathe new life into buildings.",
      "provider": {
        "@type": "Organization",
        "name": "ADCC"
      },
      "serviceType": "Renovation"
    },
    {
      "@type": "Service",
      "name": "Creative Interior & Exterior Solutions",
      "description": "Innovative design solutions that blend functionality with aesthetic appeal for both interior and exterior spaces.",
      "provider": {
        "@type": "Organization",
        "name": "ADCC"
      },
      "serviceType": "Interior Design"
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": service
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ locale }: { locale: string }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": locale === 'ar' ? 'الرئيسية' : 'Home',
        "item": `https://adcc-website.com/${locale}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}