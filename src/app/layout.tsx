import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mitradaksa.com"),
  title: "MDA Partner | Solusi Tenaga Kerja & Outsourcing Profesional",
  description:
    "MDA Partner menyediakan solusi tenaga kerja profesional dan layanan outsourcing terpercaya di Indonesia. Tingkatkan efisiensi bisnis Anda dengan jasa rekrutmen, manajemen HR, dan alih daya kami. Hubungi sekarang!",
  keywords: [
    "tenaga kerja",
    "outsourcing",
    "alih daya",
    "manajemen sdm",
    "rekrutmen",
    "payroll",
    "jasa keamanan",
    "cleaning service",
    "driver",
    "jabodetabek",
    "indonesia",
    "mda partner",
    "pt rasa aksata nusantara",
    "duluin",
    "partner",
    "jasa outsourcing",
    "job hunter",
    "job fair",
  ],
  authors: [{ name: "MDA Partner", url: "https://mitradaksa.com" }],
  creator: "MDA Partner",
  publisher: "MDA Partner",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MDA Partner | Solusi Tenaga Kerja & Outsourcing Profesional",
    description:
      "Tingkatkan efisiensi bisnis Anda dengan solusi tenaga kerja profesional dan layanan outsourcing terpercaya dari MDA Partner.",
    url: "https://mitradaksa.com",
    siteName: "MDA Partner",
    images: [
      {
        url: "/MDAP_LOGO_WHITE.svg",
        width: 1200,
        height: 630,
        alt: "MDA Partner - Solusi Tenaga Kerja & Outsourcing Profesional",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MDA Partner | Solusi Tenaga Kerja & Outsourcing Profesional",
    description:
      "Tingkatkan efisiensi bisnis Anda dengan solusi tenaga kerja profesional dan layanan outsourcing terpercaya dari MDA Partner.",
    images: ["/MDAP_LOGO_WHITE.svg"],
  },
  icons: {
    icon: "/logo-mda.svg",
    shortcut: "/logo-mda.svg",
    apple: "/logo-mda.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION || "",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-16659653153"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-16659653153');
            `,
          }}
        />
        {/* Enhanced JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://mitradaksa.com/#organization",
              name: "MDA Partner",
              legalName: "PT Rasa Aksata Nusantara",
              url: "https://mitradaksa.com",
              logo: {
                "@type": "ImageObject",
                url: "https://mitradaksa.com/logo-mda.svg",
                width: 250,
                height: 60,
              },
              foundingDate: "2020",
              description: "MDA Partner menyediakan solusi tenaga kerja profesional dan layanan outsourcing terpercaya di Indonesia.",
              address: {
                "@type": "PostalAddress",
                addressCountry: "ID",
                addressLocality: "Jakarta",
                addressRegion: "DKI Jakarta",
              },
              areaServed: {
                "@type": "GeoCircle",
                name: "Jabodetabek",
              },
            }),
          }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://mitradaksa.com/#business",
              name: "MDA Partner",
              image: "https://mitradaksa.com/MDAP_LOGO_WHITE.svg",
              description: "Penyedia solusi tenaga kerja profesional, outsourcing, rekrutmen, dan manajemen SDM terpercaya di Indonesia",
              url: "https://mitradaksa.com",
              telephone: "+62-819-1471-0001",
              priceRange: "$$",
              areaServed: {
                "@type": "GeoCircle",
                name: "Jabodetabek dan Indonesia",
              },
              serviceType: [
                "Outsourcing",
                "Recruitment",
                "HR Management",
                "Payroll Services",
                "Security Services",
                "Cleaning Services",
                "Driver Services",
              ],
            }),
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://mitradaksa.com/#website",
              url: "https://mitradaksa.com",
              name: "MDA Partner",
              description: "Solusi Tenaga Kerja & Outsourcing Profesional",
              publisher: {
                "@id": "https://mitradaksa.com/#organization",
              },
              inLanguage: "id-ID",
            }),
          }}
        />
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://mitradaksa.com",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Tentang Kami",
                  item: "https://mitradaksa.com/tentang-kami",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Produk & Layanan",
                  item: "https://mitradaksa.com/produk",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Pendaftaran Mitra",
                  item: "https://mitradaksa.com/pendaftaran-mitra",
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
