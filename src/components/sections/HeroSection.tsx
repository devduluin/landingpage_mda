"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { GrDocumentPdf } from "react-icons/gr";

const HeroSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={heroRef}
        className="relative pt-8 md:pt-10 pb-20 md:pb-40 container mx-auto px-4 max-w-7xl"
      >
        <div className=" rounded-3xl md:rounded-[100px] bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 relative overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute rounded-3xl md:rounded-[100px] inset-0 bg-black/30"></div>

          {/* Parallax Dots */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.3}px) rotate(${
                scrollY * 0.05
              }deg)`,
            }}
          />

          {/* Gradient Orbs */}
          <div className="absolute top-10 md:top-20 left-10 md:left-20 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 md:bottom-20 right-10 md:right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-[32px] blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          <div className="flex items-center px-4 md:px-12 py-8 md:py-0 relative z-10 rounded-4xl md:rounded-[90px]">
            <div className="grid lg:grid-cols-2 gap-6 items-center">
              {/* Image Container (Appears first on mobile) */}
              <div className="relative flex justify-center items-center h-52 sm:h-64 md:h-80 lg:h-[400px] overflow-hidden lg:order-last">
                <div
                  className={`relative pointer-events-none h-full md:h-[105%] w-full transform transition duration-1000 ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-20 opacity-0"
                  }`}
                  style={{ transitionDelay: "300ms" }}
                >
                  <Image
                    src="/images/employees.svg"
                    alt="Employees"
                    fill
                    className="object-contain"
                    sizes="(max-width: 1023px) 80vw, 50vw"
                  />
                </div>
              </div>

              {/* Text Content (Appears second on mobile) */}
              <div
                className={`text-center lg:text-left text-white space-y-4 md:space-y-8 transform transition-all duration-1000 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-12 opacity-0"
                }`}
              >
                {/* Main Heading with Typewriter Effect */}
                <div className="space-y-2 mb-4">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight">
                    <span className="block">
                      Mudahkan Kebutuhan SDM Anda dengan
                    </span>
                    <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                      MDA Partner
                    </span>
                    !
                  </h1>
                </div>

                {/* Description */}
                <p className="mb-4 text-gray-300 leading-relaxed max-w-2xl text-sm sm:text-base">
                  Optimalkan potensi perusahaan Anda dengan tenaga kerja
                  profesional di bidangnya. Kami siap menjadi solusi untuk
                  kebutuhan SDM Anda dengan berbagai layanan dan jasa yang
                  sesuai!
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                 {/* Button WhatsApp - 3D Neumorphism dengan Transisi Halus */}
{/* WhatsApp Button - Improved smooth transitions */}
<Button
  size="lg"
  onClick={() =>
    window.open("https://wa.me/6281910031000", "_blank")
  }
  className="
    relative cursor-pointer overflow-hidden
    w-full sm:w-auto
    bg-gradient-to-r from-orange-500 to-orange-600
    text-white font-semibold px-6 py-3 md:px-8 md:py-4 !rounded-full
    text-sm md:text-base
    z-10
    
    transition-all duration-300 ease-out
    transform-gpu
    
    shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.15)]
    
    hover:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.25),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]
    
    active:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.05)]
    active:scale-[0.99]
    active:transition-all active:duration-100
    
    before:content-[''] before:absolute before:top-0 before:left-0 
    before:w-0 before:h-full before:rounded-full
    before:bg-gradient-to-r before:fill-orange-600 before:to-orange-300
    before:transition-all before:duration-500 before:ease-in-out
    before:z-[-1]
    hover:before:w-full
  "
>
  <span className="relative z-10 flex items-center gap-2">
    Bergabung Bersama Kami!
  </span>
</Button>

{/* PDF Company Profile Button - Improved with React PDF icon and smooth animations */}
<Button
  size="lg"
  onClick={() =>
    window.open("/view-profile", "_blank")
  }
  className="
    relative cursor-pointer overflow-hidden
    w-full sm:w-auto
    border md:border-0
    bg-[#1a1a1a]
    text-orange-300
    font-semibold px-6 py-3 md:px-8 md:py-4 !rounded-full
    text-sm md:text-base
    z-10
    group
    
    transition-all duration-300 ease-out
    transform-gpu
    
    md:shadow-[6px_6px_12px_rgba(0,0,0,0.4),-6px_-6px_12px_rgba(255,255,255,0.05)]
    
    hover:md:shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.1)]
    hover:text-white
    hover:border-transparent
    
    active:md:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.05)]
    active:bg-orange-500
    active:md:bg-inherit
    active:text-white
    active:scale-[0.99]
    active:transition-all active:duration-100
    active:border-transparent
    
    before:content-[''] before:absolute before:top-0 before:left-0 
    before:w-0 before:h-full before:rounded-full
    before:bg-gradient-to-r before:fill-orange-400/90 before:to-orange-500/90
    before:transition-all before:duration-500 before:ease-in-out
    before:z-[-1]
    hover:before:w-full
  "
>
  <span className="relative z-10 flex items-center gap-2">
    {/* Icon Container dengan animasi slide */}
    <div className="relative w-4 h-4 overflow-hidden">
      {/* Download Arrow - Default State (visible) */}
      <svg 
        className="
          absolute top-0 left-0 w-4 h-4 
          transition-transform duration-500 ease-in-out 
          transform translate-x-0 
          group-hover:translate-x-6 group-hover:opacity-0
        " 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
      </svg>

      {/* PDF Icon - Hidden initially, slides in from left on hover */}
      <div className="
        absolute top-0 left-0 w-4 h-4
        transition-transform duration-500 ease-in-out 
        transform -translate-x-6 opacity-0
        group-hover:translate-x-0 group-hover:opacity-100
      ">
        <GrDocumentPdf className="w-4 h-4" />
      </div>
    </div>
    
    Lihat Company Profile
  </span>
</Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
