"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

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
              {/* Left Content */}
              <div
                className={`text-center lg:text-left text-white p-1 space-y-6 md:space-y-8 transform transition-all duration-1000 ${
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
                <Button
                  size="lg"
                  onClick={() =>
                    window.open("https://wa.me/6281910031000", "_blank")
                  }
                  className="
    relative cursor-pointer overflow-hidden
    bg-gradient-to-r from-orange-500 to-orange-600
    hover:from-orange-600 hover:to-orange-700
    text-white font-semibold px-6 py-3 md:px-8 md:py-4 !rounded-full
    transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
    hover:scale-105 active:scale-97
    before:content-[''] before:absolute before:inset-0 before:rounded-full
    before:shadow-[inset_0_0_8px_theme(colors.orange.400)]
    before:transition-all before:duration-500
    hover:before:shadow-[inset_0_0_20px_theme(colors.orange.400)]
    text-sm md:text-base
  "
                >
                  Bergabung Bersama Kami!
                </Button>
              </div>

              {/* Right Content - Image Container */}
              <div className="relative flex justify-center items-center h-64 md:h-[400px] overflow-hidden mt-8 lg:mt-0">
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
                    sizes="(max-width: 768px) 80vw, 50vw"
                  />
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
