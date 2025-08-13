"use client";

import React, { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.3,
    triggerOnce: false,
  });

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-0 md:max-h-[400px] bg-gradient-to-r from-[#F64816]/20 via-white to-[#F64816]/20 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 md:w-32 md:h-32 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/4 w-16 h-16 md:w-24 md:h-24 bg-pink-300/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-12 h-12 md:w-20 md:h-20 bg-pink-200/25 rounded-full blur-md"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div
            className={`lg:w-1/2 text-center lg:text-left transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-normal text-gray-800 mb-2 leading-tight">
              Butuh solusi cepat untuk kebutuhan SDM?
            </h2>

            <p className="text-2xl md:text-3xl lg:text-4xl font-normal mb-8 leading-tight">
              <span className="text-orange-500 font-bold">MDA Partner</span>{" "}
              <span className="text-gray-800">Jawabannya!</span>
            </p>

            <Button
              size="lg"
              onClick={() =>
                window.open("https://wa.me/6281910031000", "_blank")
              }
              className="cursor-pointer
    bg-gradient-to-r from-orange-500 to-orange-600 
    hover:from-orange-600 hover:to-orange-700 
    text-white font-semibold px-6 py-3 md:px-8 md:py-4 !rounded-full
    shadow-lg hover:shadow-xl hover:shadow-orange-500/30
    transform transition-transform duration-300 ease-in-out group
    text-base
    hover:translate-x-[4px] active:translate-x-[8px]
  "
            >
              <span>Bergabung Bersama Kami!</span>
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-active:translate-x-2" />
            </Button>
          </div>

          {/* Right Image - Hidden on mobile */}
          <div
            className={`hidden lg:block lg:w-1/2 relative transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 -translate-y-9"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Image container that extends beyond wrapper */}
            <div className="relative w-full pointer-events-none h-[500px] -mt-16">
              <Image
                src="/images/finance-employment-female.svg"
                alt="Professional woman in business attire"
                fill
                className="object-contain object-bottom transform translate-x-[150px] translate-y-[80px] z-30"
                sizes="(max-width: 1024px) 50vw, 33vw"
                style={{
                  transform: "translateY(-80px)", // Push image up to break through
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden rounded-none md:rounded-[90px]">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          viewBox="0 0 800 400"
        >
          {[...Array(3)].map((_, i) => {
            const startY = 270;
            const spacing = 35;
            const y = startY + i * spacing;
            const amp = 30;
            const delay = i * 0.02;
            const opacity = 0.25 - i * 0.02;

            return (
              <path
                key={i}
                d={`M 0 ${y} Q 200 ${y - amp} 400 ${y} T 800 ${y}`}
                stroke={`rgba(153, 45, 14,${opacity})`}
                strokeWidth="1.5"
                fill="none"
                style={{
                  animation: `waveMove 6s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </svg>
      </div>
    </section>
  );
};

export default CTASection;
