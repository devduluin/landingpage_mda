import type { Metadata } from "next";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: "website" | "article";
}

/**
 * Generate SEO-optimized metadata for pages
 * @param config - SEO configuration object
 * @returns Metadata object for Next.js
 */
export function generateSEOMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    path,
    image = "/MDAP_LOGO_WHITE.svg",
    type = "website",
  } = config;

  const baseUrl = "https://mitradaksa.com";
  const fullUrl = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: fullUrl,
      siteName: "MDA Partner",
      type,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "id_ID",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * Common SEO keywords untuk MDA Partner
 */
export const commonKeywords = {
  outsourcing: [
    "outsourcing",
    "alih daya",
    "jasa outsourcing",
    "perusahaan outsourcing",
    "outsourcing terpercaya",
  ],
  tenagaKerja: [
    "tenaga kerja",
    "penyediaan tenaga kerja",
    "jasa tenaga kerja",
    "solusi tenaga kerja",
  ],
  hr: [
    "manajemen sdm",
    "manajemen hr",
    "hr management",
    "rekrutmen",
    "payroll",
  ],
  services: [
    "jasa keamanan",
    "security",
    "cleaning service",
    "driver",
    "office boy",
  ],
  location: [
    "jabodetabek",
    "jakarta",
    "indonesia",
  ],
  company: [
    "mda partner",
    "pt rasa aksata nusantara",
    "duluin",
  ],
};

/**
 * Generate breadcrumb JSON-LD schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQ JSON-LD schema
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Service JSON-LD schema
 */
export function generateServiceSchema(service: {
  name: string;
  description: string;
  provider: string;
  areaServed?: string;
  priceRange?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.provider,
    },
    areaServed: service.areaServed || "Indonesia",
    priceRange: service.priceRange || "$$",
  };
}
