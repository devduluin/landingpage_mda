"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Briefcase, Star } from "lucide-react";

const WorkerIllustration = ({ isVisible }: { isVisible: boolean }) => {
  return (
    <div
      className={`relative w-72 h-96 mx-auto transition-all duration-1000 delay-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {/* Floating Icons */}
      <div
        className={`absolute top-10 -left-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 ${
          isVisible ? "animate-float" : ""
        }`}
        style={{ animationDelay: "0.5s" }}
      >
        <Briefcase className="w-6 h-6 text-orange-400" />
      </div>
      <div
        className={`absolute top-20 -right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center transition-all duration-500 ${
          isVisible ? "animate-float" : ""
        }`}
        style={{ animationDelay: "1s" }}
      >
        <Star className="w-6 h-6 text-yellow-400" />
      </div>

      {/* Main Character */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-60 h-80">
        {/* Head */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-28 bg-orange-200 rounded-full">
          {/* Hair */}
          <div className="absolute -top-2 left-0 w-full h-12 bg-gray-800 rounded-t-full"></div>
          {/* Eyes */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
            <div className="w-3 h-3 bg-gray-800 rounded-full"></div>
          </div>
          {/* Smile */}
          <div className="absolute top-16 left-1/2 -translate-x-1/2 w-10 h-5 border-b-2 border-gray-800 rounded-b-full"></div>
        </div>

        {/* Body */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-60 bg-orange-500 rounded-t-3xl">
          {/* Collar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-white rounded-b-2xl"></div>
          {/* Tie */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 w-4 h-16 bg-gray-800"></div>
        </div>

        {/* Arms */}
        <div className="absolute top-32 -left-4 w-12 h-24 bg-orange-600 rounded-full -rotate-45"></div>
        <div className="absolute top-32 -right-4 w-12 h-24 bg-orange-600 rounded-full rotate-45"></div>
      </div>
    </div>
  );
};

const CTASection = () => {
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
      className="py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12">
            <div
              className={`lg:w-2/3 text-center lg:text-left transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Butuh solusi cepat untuk kebutuhan SDM?
              </h2>
              <p className="text-2xl lg:text-3xl font-bold mb-8 text-gray-300">
                <span className="text-orange-500">MDA Partner</span>{" "}
                <span>Jawabannya!</span>
              </p>

              <Button
                size="lg"
                className="
                  bg-gradient-to-r from-orange-500 to-yellow-500 
                  hover:from-orange-600 hover:to-yellow-600 
                  text-white font-semibold px-8 py-4 rounded-xl
                  shadow-lg hover:shadow-xl hover:shadow-orange-500/20
                  transform hover:scale-105 hover:-translate-y-1
                  transition-all duration-300 group
                "
              >
                <span>Bergabung Bersama Kami!</span>
                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="lg:w-1/3 relative">
              <WorkerIllustration isVisible={isVisible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
