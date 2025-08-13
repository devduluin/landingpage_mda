import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        url: "/images/woman-with-shirt.svg",
        width: 800,
        height: 600,
        alt: "Tenaga Kerja Profesional dari MDA Partner",
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
    images: ["/images/woman-with-shirt.svg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
