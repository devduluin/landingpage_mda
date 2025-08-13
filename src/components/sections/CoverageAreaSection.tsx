"use client";

import React, { useRef } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

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
          <div
            className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          ></div>

          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div
              className={`w-full lg:w-1/2 transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-90"
              }`}
            >
              <Image
                src="/images/map.svg"
                alt="Map"
                className="hover:shadow-xl shadow-md rounded-2xl md:rounded-[50px] transition-all duration-300"
                width={800}
                height={600}
                style={{ objectFit: "contain" }}
              />
            </div>

            <div
              className={`lg:w-1/2 w-full text-center lg:text-left transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <div className="grid grid-rows-2 gap-4 text-center md:text-left">
                <h2 className="text-2xl md:text-3xl text-gray-700 font-bold">
                  Jangkauan Area{" "}
                  <span className="text-orange-500">MDA Partner</span>
                </h2>
                <p className="text-base md:text-lg text-gray-600">
                  Kami hadir untuk memenuhi kebutuhan SDM Anda di seluruh
                  wilayah Jabodetabek. Percayakan pencarian tenaga kerja terbaik
                  kepada MDA Partner!
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
