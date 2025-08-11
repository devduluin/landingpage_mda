"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

const areas = [
  {
    id: "JAKARTA",
    name: "JAKARTA",
    path: "M150 120 L180 110 L220 125 L240 140 L235 170 L210 180 L180 175 L155 165 Z",
    pinPosition: { top: "45%", left: "50%" },
  },
  {
    id: "TANGERANG",
    name: "TANGERANG",
    path: "M80 100 L150 120 L155 165 L140 190 L120 200 L90 195 L70 180 L65 150 L75 125 Z",
    pinPosition: { top: "35%", left: "20%" },
  },
  {
    id: "BEKASI",
    name: "BEKASI",
    path: "M240 140 L280 135 L300 150 L295 180 L275 190 L250 185 L235 170 Z",
    pinPosition: { top: "40%", left: "75%" },
  },
  {
    id: "DEPOK",
    name: "DEPOK",
    path: "M140 190 L210 180 L235 170 L250 185 L245 220 L220 235 L190 240 L160 235 L135 220 Z",
    pinPosition: { top: "70%", left: "50%" },
  },
  {
    id: "BOGOR",
    name: "BOGOR",
    path: "M135 220 L160 235 L190 240 L160 280 L120 260 Z",
    pinPosition: { top: "85%", left: "35%" },
  },
  {
    id: "BANDUNG",
    name: "BANDUNG",
    path: "M245 220 L275 215 L300 230 L320 250 L315 280 L290 290 L260 285 L240 270 Z",
    pinPosition: { top: "80%", left: "78%" },
  },
];

const CoverageAreaSection = () => {
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);
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
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl text-gray-700 lg:text-4xl font-bold mb-4">
              Jangkauan Area{" "}
              <span className="text-orange-500">MDA Partner</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Kami hadir untuk memberikan kebutuhan SDM Anda di seluruh wilayah
              Jabodetabek & Bandung. Percayakan pencarian tenaga kerja terbaik
              kepada MDA Partner!
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div
              className={`lg:w-1/2 w-full transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <div className="relative bg-gray-100 p-4 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl overflow-hidden">
                  <svg
                    viewBox="0 0 400 320"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    {areas.map((area, index) => (
                      <path
                        key={area.id}
                        d={area.path}
                        className={`transition-all duration-300 ${
                          isVisible ? "animate-draw" : ""
                        } ${
                          hoveredArea === area.id
                            ? "fill-orange-500/80 stroke-orange-700"
                            : area.id === "JAKARTA"
                            ? "fill-orange-500/50 stroke-orange-600"
                            : "fill-gray-300/50 stroke-gray-400"
                        }`}
                        strokeWidth="2"
                        style={{ animationDelay: `${index * 150}ms` }}
                        onMouseEnter={() => setHoveredArea(area.id)}
                        onMouseLeave={() => setHoveredArea(null)}
                      />
                    ))}
                    {/* Highlighted Jakarta path for pulse effect */}
                    <path
                      d={areas.find((a) => a.id === "JAKARTA")?.path}
                      className={`fill-transparent stroke-transparent ${
                        isVisible ? "animate-pulse-glow" : ""
                      }`}
                    />
                  </svg>

                  {areas.map((area, index) => (
                    <div
                      key={area.id}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer ${
                        isVisible ? "animate-pop-in" : "opacity-0"
                      } ${hoveredArea === area.id ? "scale-110" : "scale-100"}`}
                      style={{
                        ...area.pinPosition,
                        animationDelay: `${500 + index * 100}ms`,
                      }}
                      onMouseEnter={() => setHoveredArea(area.id)}
                      onMouseLeave={() => setHoveredArea(null)}
                    >
                      <div className="bg-gray-800 text-white text-xs font-bold py-1.5 px-3 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1">
                        <MapPin
                          className={`w-3 h-3 ${
                            hoveredArea === area.id ? "text-orange-400" : ""
                          }`}
                        />
                        {area.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className={`lg:w-1/2 w-full transition-all duration-1000 delay-400 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-10"
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                {areas.map((area) => (
                  <div
                    key={area.id}
                    className={`py-4 px-5 rounded-lg font-semibold text-center text-sm transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                      hoveredArea === area.id
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    onMouseEnter={() => setHoveredArea(area.id)}
                    onMouseLeave={() => setHoveredArea(null)}
                  >
                    {area.name}
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-orange-50 rounded-lg border border-orange-200">
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
