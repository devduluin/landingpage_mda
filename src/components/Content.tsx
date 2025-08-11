"use client";

import React, { useRef } from "react";
import Header from "@/components/layout/Header";
import HeroSection from "@/components/sections/HeroSection";
import MDAPartnerSection from "@/components/sections/MDAPartnerSection";
import ServicesSection from "@/components/sections/ServicesSection";
import ClientsSection from "@/components/sections/ClientsSection";
import CoverageAreaSection from "@/components/sections/CoverageAreaSection";
import CTASection from "@/components/sections/CTASection";
import {
  MinimalistFooter,
  TwoColumnFooter,
  CardStyleFooter,
} from "@/components/layout/Footer";
import FaqSection from "./sections/FaqSection";

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
          <FaqSection />
          <CTASection />
        </main>
        <TwoColumnFooter />
      </div>
    </div>
  );
};

export default MDAPartnerWebsite;
