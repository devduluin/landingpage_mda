"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const CoverageAreaSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
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
    <section ref={sectionRef} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          ></div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div
              className={`lg:w-1/2 w-full transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative bg-gray-100 p-4 sm:p-8 rounded-2xl shadow-xs border border-gray-200">
                <div className="relative w-full h-72 sm:h-72 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl overflow-hidden">
                  <Image
                    src="/images/map.svg"
                    alt="Map"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

            <div
              className={`lg:w-1/2 w-full transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="grid grid-rows-2 gap-4">
                <h2 className="text-3xl text-gray-700 font-bold">
                  Jangkauan Area{" "}
                  <span className="text-orange-500">MDA Partner</span>
                </h2>
                <p className="text-gray-600">
                  Kami hadir untuk memenuhi kebutuhan SDM Anda di seluruh
                  wilayah Jabodetabek. Percayakan pencarian tenaga kerja terbaik
                  kepada MDA Partner!
                </p>
              </div>

              <div
                className={`mt-8 p-5 bg-orange-50 rounded-lg border border-orange-200 transition-all duration-500 delay-300 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-orange-800 text-sm font-medium text-center">
                  💼 Melayani lebih dari 6 kota besar di Indonesia dan terus
                  berkembang!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoverageAreaSection;
