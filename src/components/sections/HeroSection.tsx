"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

type AdSlide = {
  id: string;
  imageSrc: string;
  alt?: string;
  href?: string;
  fit?: "cover" | "contain";
};

const SLIDES: AdSlide[] = [
  { id: "slide-1", imageSrc: "/images/Banner.png", alt: "Banner 1", fit: "contain" },
  { id: "slide-2", imageSrc: "/images/testing.jpg", alt: "Banner 2", fit: "contain" },
];

const AUTOPLAY_DELAY = 3000;
const HERO_HEIGHT = "h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px]";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0); 
  const startXRef = useRef(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || isHovering || isDragging) return;
    const interval = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [next, isVisible, isHovering, isDragging]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setDragX(0);
    startXRef.current = e.clientX;
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    setDragX(dx);
  };

  const endDrag = (clientX?: number) => {
    if (!isDragging) return;

    const dx = typeof clientX === "number" ? clientX - startXRef.current : dragX;

    setIsDragging(false);

    const THRESHOLD = 60;

    if (dx <= -THRESHOLD) {
      setDragX(0);
      next();
      return;
    }
    if (dx >= THRESHOLD) {
      setDragX(0);
      prev();
      return;
    }

    setDragX(0);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    endDrag(e.clientX);
  };

  const onPointerCancel = () => {
    endDrag();
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-transparent pt-6 md:pt-8 pb-10 md:pb-32 container mx-auto px-4 max-w-7xl"
    >
      <div
        className="relative"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div
          className={`
            relative overflow-hidden
            rounded-3xl md:rounded-[48px]
            ${HERO_HEIGHT}
            bg-black leading-none
            group
            touch-pan-y
          `}
        >
          <div
            className="absolute inset-0 z-10 overflow-hidden cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
          >
            <div
              className={`
                h-full w-full flex will-change-transform
                ${isDragging ? "" : "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"}
              `}
              style={{
                transform: `translate3d(calc(-${active * 100}% + ${dragX}px), 0, 0)`,
              }}
            >
              {SLIDES.map((slide) => (
                <div key={slide.id} className="relative min-w-full h-full shrink-0 select-none">
                  {slide.href ? (
                    <button
                      type="button"
                      onClick={() => window.open(slide.href!, "_blank")}
                      className="absolute inset-0 z-20"
                      aria-label="Open banner"
                    />
                  ) : null}

                  <Image
                    src={slide.imageSrc}
                    alt={slide.alt ?? "Banner"}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 1120px"
                    draggable={false}
                    className={`block ${slide.fit === "cover" ? "object-cover" : "object-contain"
                      }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActive(idx)}
                aria-label={`Go to banner ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${idx === active ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/80"
                  }`}
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous banner"
          className={`
            absolute top-1/2 -translate-y-1/2 z-40
            left-0 -translate-x-1/2
            h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12
            rounded-full bg-white/90 text-black
            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            ring-1 ring-black/10
            flex items-center justify-center
            transition-all duration-200
            opacity-0 group-hover:opacity-100
            hover:bg-white hover:scale-[1.05] active:scale-[0.98]
          `}
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Next banner"
          className={`
            absolute top-1/2 -translate-y-1/2 z-40
            right-0 translate-x-1/2
            h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12
            rounded-full bg-white/90 text-black
            shadow-[0_10px_30px_rgba(0,0,0,0.25)]
            ring-1 ring-black/10
            flex items-center justify-center
            transition-all duration-200
            opacity-0 group-hover:opacity-100
            hover:bg-white hover:scale-[1.05] active:scale-[0.98]
          `}
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
        </button>
      </div>
    </section>
  );
}