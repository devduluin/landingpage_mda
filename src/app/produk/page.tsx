import Content from "@/components/Content";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produk & Layanan - MDA Partner | Solusi Outsourcing Lengkap",
  description: "Jelajahi berbagai produk dan layanan outsourcing MDA Partner: Penyediaan Tenaga Kerja, Security, Cleaning Service, Driver, Rekrutmen, Payroll, dan Manajemen HR. Solusi SDM terlengkap untuk bisnis Anda.",
  keywords: [
    "produk mda partner",
    "layanan outsourcing",
    "jasa security",
    "cleaning service",
    "jasa driver",
    "rekrutmen karyawan",
    "payroll outsourcing",
    "manajemen hr",
    "penyediaan tenaga kerja",
    "layanan sdm",
  ],
  alternates: {
    canonical: "/produk",
  },
  openGraph: {
    title: "Produk & Layanan - MDA Partner | Solusi Outsourcing Lengkap",
    description: "Jelajahi berbagai produk dan layanan outsourcing MDA Partner untuk kebutuhan SDM bisnis Anda.",
    url: "https://mitradaksa.com/produk",
    type: "website",
    images: [
      {
        url: "/MDAP_LOGO_WHITE.svg",
        width: 1200,
        height: 630,
        alt: "MDA Partner - Produk & Layanan",
      },
    ],
  },
};

const page = () => {
  return <Content />;
};

export default page;
