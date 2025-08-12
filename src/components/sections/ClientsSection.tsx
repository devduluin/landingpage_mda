"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

const ClientsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

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

  const clients = [
    { name: "ourClients/goto.svg", alt: "Goto" },
    { name: "ourClients/trevo.svg", alt: "Trevo" },
    { name: "ourClients/pokphand.svg", alt: "Pokphand" },
    { name: "ourClients/nabati.svg", alt: "Nabati" },
    { name: "ourClients/summarecon-mall.svg", alt: "Summarecon Mall" },
  ];

  return (
    <section ref={sectionRef} className="py-12 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="linePattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            >
              <path
                d="M 0 100 Q 50 0 100 100"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="2"
                fill="transparent"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#linePattern)" />
        </svg>
      </div>

      <div
        className={`container mx-auto px-4 py-12 rounded-[90px] relative z-10 max-w-7xl overflow-hidden shadow-2xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{
          background:
            "linear-gradient(135deg, #FF6B35 0%, #FF6B35 50%, #D94115 100%)",
        }}
      >
        {/* 3 curved lines inside container background */}
        <div className="absolute inset-0 overflow-hidden rounded-[90px]">
          <svg
            className="absolute top-0 left-0 w-[400px] h-[120px] z-0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 40 
       Q 0 0 40 0 
       Q 700 0 400 0 
       Q 380 120 0 100 
       Z"
              fill="#e35424"
            />
          </svg>

          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            viewBox="0 0 800 400"
          >
            {[...Array(7)].map((_, i) => {
              const startY = 150;
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

          {/* 3/4 circle decorations */}
          <div className="absolute top-8 right-16">
            <svg width="60" height="60" className="animate-spin-slow">
              <circle
                cx="30"
                cy="30"
                r="25"
                fill="none"
                stroke="rgba(139,69,19,0.3)"
                strokeWidth="2"
                strokeDasharray="118"
                strokeDashoffset="30"
              />
            </svg>
          </div>

          <div className="absolute bottom-12 left-12">
            <svg width="80" height="80" className="animate-rotate-reverse">
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="rgba(139,69,19,0.2)"
                strokeWidth="3"
                strokeDasharray="141"
                strokeDashoffset="35"
              />
            </svg>
          </div>
        </div>

        {/* Text Section */}
        <div
          className={`transition-all duration-1000 relative z-10 px-4 sm:px-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          } mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-24`}
        >
          <h2 className="text-3xl font-bold text-white whitespace-nowrap">
            Klien Kami
          </h2>
          <p className="text-white/90 text-lg">
            MDA Partner telah bekerja sama dengan klien untuk hasil yang
            terbaik. Sekarang giliran Anda!
          </p>
        </div>

        {/* Logos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 place-items-center relative z-10">
          {clients.map((client, index) => (
            <Image
              key={index}
              src={`/${client.name}`}
              alt={client.alt}
              width={150}
              height={50}
              className="object-contain transition-transform duration-300 hover:scale-110 hover:drop-shadow-lg"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
