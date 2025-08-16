"use client";

import React, { useRef } from "react";
import Header from "@/components/layout/Header";
import dynamic from "next/dynamic";

import { TwoColumnFooterProps } from "@/components/layout/Footer";

const HeroSection = dynamic(() => import("@/components/sections/HeroSection"));
const MDAPartnerSection = dynamic(
  () => import("@/components/sections/MDAPartnerSection")
);
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection")
);
const ClientsSection = dynamic(
  () => import("@/components/sections/ClientsSection")
);
const CoverageAreaSection = dynamic(
  () => import("@/components/sections/CoverageAreaSection")
);
const CTASection = dynamic(() => import("@/components/sections/CTASection"));
const TwoColumnFooter = dynamic<TwoColumnFooterProps>(
  () => import("@/components/layout/Footer")
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
        <TwoColumnFooter scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
  );
};

export default MDAPartnerWebsite;
