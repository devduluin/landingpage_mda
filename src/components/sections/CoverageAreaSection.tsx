"use client";

import React, { useRef } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { GrDocumentPdf } from "react-icons/gr";
import { Button } from "@/components/ui/Button";

const CoverageAreaSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <section ref={sectionRef} className="py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            {/* Add your header content here if needed */}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
            
            {/* Map Image */}
            <div
              className={`order-1 lg:order-1 transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <div className="relative">
                <Image
                  src="/images/map.svg"
                  alt="Peta Jangkauan Area MDA Partner"
                  className="
                    w-full h-auto
                    hover:shadow-xl shadow-md 
                    rounded-2xl md:rounded-[50px] 
                    transition-all duration-300
                  "
                  width={800}
                  height={600}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`
                order-2 lg:order-2 
                text-center lg:text-left 
                space-y-6 md:space-y-8
                transition-all duration-1000 delay-200 
                ${isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
                }
              `}
            >
              {/* Text Content */}
              <div className="space-y-4 md:space-y-6">
                <h2 className="
                  text-2xl md:text-3xl lg:text-4xl 
                  text-gray-700 font-bold 
                  leading-tight
                ">
                  Jangkauan Area{" "}
                  <span className="text-orange-500">MDA Partner</span>
                </h2>
                
                <p className="
                  text-base md:text-lg lg:text-xl 
                  text-gray-600 
                  leading-relaxed
                  max-w-2xl mx-auto lg:mx-0
                ">
                  Kami hadir untuk memenuhi kebutuhan SDM Anda di seluruh
                  wilayah Jabodetabek. Percayakan pencarian tenaga kerja terbaik
                  kepada MDA Partner!
                </p>
              </div>

              {/* CTA Button */}
              {/* <div className="pt-4">
                <Button
                  size="lg"
                  onClick={() =>
                    window.open("/mda-compro/MDA Partner Company Profile.pdf", "_blank")
                  }
                  className="
                    relative cursor-pointer overflow-hidden
                    w-full sm:w-auto
                    border-2 border-orange-500/30
                    text-orange-500
                    font-semibold 
                    px-6 py-3 md:px-8 md:py-4 
                    !rounded-full
                    text-sm md:text-base
                    z-10
                    group
                    
                    transition-colors duration-300 ease-out
                    transform-gpu
                    
                    hover:text-white
                    hover:border-orange-200
                    
                    active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.5),inset_-4px_-4px_10px_rgba(255,255,255,0.05)]
                    active:scale-[0.98]
                    active:transition-all active:duration-100
                    
                    before:content-[''] before:absolute before:top-0 before:left-0 
                    before:w-0 before:h-full before:rounded-full
                    before:bg-gradient-to-r before:from-orange-400 before:to-yellow-400
                    before:transition-all before:duration-500 before:ease-in-out
                    before:z-[-1]
                    hover:before:w-full
                  "
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <div className="relative w-4 h-4 overflow-hidden flex-shrink-0">
                      <svg 
                        className="
                          absolute top-0 left-0 w-4 h-4 
                          transition-all duration-500 ease-in-out 
                          transform translate-x-0 opacity-100
                          group-hover:translate-x-6 group-hover:opacity-0
                        " 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5,20H19V18H5M19,9H15V3H9V9H5L12,16L19,9Z" />
                      </svg>

                      <div className="
                        absolute top-0 left-0 w-4 h-4
                        transition-all duration-500 ease-in-out 
                        transform -translate-x-6 opacity-0
                        group-hover:translate-x-0 group-hover:opacity-100
                      ">
                        <GrDocumentPdf 
                          className="w-4 h-4" 
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                    
                    <span className="whitespace-nowrap">
                      Lihat Company Profile
                    </span>
                  </span>
                </Button>
              </div> */}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageAreaSection;