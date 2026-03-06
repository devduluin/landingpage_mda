import Content from "@/components/Content";
import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Kami - MDA Partner | Profil Perusahaan Outsourcing Terpercaya",
  description: "Kenali lebih dekat MDA Partner (PT Rasa Aksata Nusantara), penyedia solusi tenaga kerja dan outsourcing profesional sejak 2020. Partner terpercaya untuk kebutuhan SDM bisnis Anda di Indonesia.",
  keywords: [
    "tentang mda partner",
    "profil perusahaan outsourcing",
    "pt rasa aksata nusantara",
    "sejarah mda partner",
    "visi misi mda",
    "perusahaan outsourcing terpercaya",
    "tentang kami outsourcing",
  ],
  alternates: {
    canonical: "/tentang-kami",
  },
  openGraph: {
    title: "Tentang Kami - MDA Partner | Profil Perusahaan Outsourcing",
    description: "Kenali lebih dekat MDA Partner, penyedia solusi tenaga kerja dan outsourcing profesional sejak 2020.",
    url: "https://mitradaksa.com/tentang-kami",
    type: "website",
    images: [
      {
        url: "/MDAP_LOGO_WHITE.svg",
        width: 1200,
        height: 630,
        alt: "MDA Partner - Tentang Kami",
      },
    ],
  },
};

const page = () => {
  return <Content />;
};

export default page;
