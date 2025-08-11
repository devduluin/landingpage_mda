"use client";

import React, { useRef } from "react";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection"),
  { ssr: false }
);
const MDAPartnerSection = dynamic(
  () => import("@/components/sections/MDAPartnerSection"),
  { ssr: false }
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection"),
  { ssr: false }
);
const ClientsSection = dynamic(
  () => import("@/components/sections/ClientsSection"),
  { ssr: false }
);
const CoverageAreaSection = dynamic(
  () => import("@/components/sections/CoverageAreaSection"),
  { ssr: false }
);
const CTASection = dynamic(
  () => import("@/components/sections/CTASection"),
  { ssr: false }
);
const TwoColumnFooter = dynamic(
  () => import("@/components/layout/Footer").then((mod) => mod.TwoColumnFooter),
  { ssr: false }
);

const MDAPartnerWebsite: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col h-screen bg-white">
      <Header scrollContainerRef={scrollContainerRef} />
      <div
        ref={scrollContainerRef}
        className="flex-grow overflow-y-auto overflow-x-hidden custom-scrollbar"
      >
        <main>
          <HeroSection />
          <MDAPartnerSection />
          <ServicesSection />
          <ClientsSection />
          <CoverageAreaSection />
          <CTASection />
        </main>
        <TwoColumnFooter />
      </div>
    </div>
  );
};

export default MDAPartnerWebsite;
