"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle } from "lucide-react";

const clients = [
  { name: "goto", style: "font-black text-2xl text-blue-400" },
  { name: "TREVO", style: "font-bold text-2xl text-green-400 tracking-wider" },
  { name: "Akulaku", style: "font-bold text-2xl text-yellow-400" },
  { name: "rahati", style: "font-serif italic text-2xl text-purple-400" },
  {
    name: "Jasa Raharja",
    style: "text-center leading-tight",
    custom: (
      <>
        <div className="text-xs font-bold text-cyan-400">ASURANSI SOSIAL</div>
        <div className="text-lg font-black text-cyan-300">JASA RAHARJA</div>
      </>
    ),
  },
  { name: "SiCepat", style: "font-sans font-extrabold text-2xl text-red-400" },
];

const ClientsSection = () => {
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
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div
              className={`lg:w-1/3 text-center lg:text-left transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-10"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Dipercaya oleh Perusahaan Ternama
              </h2>
              <p className="text-gray-300 text-base leading-relaxed">
                MDA Partner telah bekerja sama dengan berbagai klien untuk
                memberikan hasil terbaik. Bersama klien, kami menjadi unggul!
              </p>
            </div>

            <div className="lg:w-2/3 w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                {clients.map((client, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer transition-all duration-500 ${
                      isVisible
                        ? "animate-card-fade-in-up"
                        : "opacity-0 translate-y-10"
                    }`}
                    style={{ animationDelay: `${100 + index * 100}ms` }}
                  >
                    <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 h-24 flex items-center justify-center transition-all duration-300 transform hover:bg-white/10 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-2 border border-white/10">
                      <div
                        className={`text-white font-semibold text-center transition-transform duration-300 group-hover:scale-105 ${
                          client.style || ""
                        }`}
                      >
                        {client.custom || client.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes bg-grid-pattern {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 40px 40px;
          }
        }
        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(255, 255, 255, 0.05) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
          animation: bg-grid-pattern 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientsSection;
