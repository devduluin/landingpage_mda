"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const CTASection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-100 relative"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 left-1/4 w-24 h-24 bg-pink-300/20 rounded-full blur-lg"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-pink-200/25 rounded-full blur-md"></div>
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
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2 leading-tight">
              Butuh solusi cepat untuk kebutuhan SDM?
            </h2>

            <p className="text-3xl lg:text-4xl font-bold mb-8 leading-tight">
              <span className="text-orange-500">MDA Partner</span>{" "}
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
    text-white font-semibold px-8 py-4 !rounded-full
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

          {/* Right Image */}
          <div
            className={`lg:w-1/2 relative flex justify-center items-end transition-all duration-700 delay-200 min-h-[450px] ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src="images/finance-employment-female.svg"
                alt="Woman with shirt"
                fill
                className="object-contain object-bottom animate-float"
                sizes="(max-width: 1024px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default CTASection;
