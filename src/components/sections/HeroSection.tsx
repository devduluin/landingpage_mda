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

const AUTOPLAY_DELAY = 3000;

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  const [slides, setSlides] = useState<AdSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const [isDragging, setIsDragging] = useState(false);
  const [dragX, setDragX] = useState(0); 
  const startXRef = useRef(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prev = useCallback(() => {
    setActive((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/public/banners?activeOnly=true');
        const data = await res.json();

        if (data.success && data.data.length > 0) {
          const bannerSlides: AdSlide[] = data.data.map((banner: any) => ({
            id: banner.id,
            imageSrc: banner.image,
            alt: banner.name,
            fit: "contain" as const,
          }));
          setSlides(bannerSlides);
        } else {
          setSlides([
            { id: "slide-1", imageSrc: "/images/Banner.png", alt: "Banner 1", fit: "contain" },
          ]);
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        // Fallback to default banners on error
        setSlides([
          { id: "slide-1", imageSrc: "/images/Banner.png", alt: "Banner 1", fit: "contain" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
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
    if (!isVisible || isHovering || isDragging || slides.length <= 1) return;
    const interval = setInterval(next, AUTOPLAY_DELAY);
    return () => clearInterval(interval);
  }, [next, isVisible, isHovering, isDragging, slides.length]);

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

  if (loading || slides.length === 0) {
    return (
      <section className="relative bg-transparent pt-6 md:pt-8 pb-8 md:pb-16 container mx-auto px-4 max-w-7xl">
        <div className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] overflow-hidden rounded-3xl md:rounded-[48px] bg-gray-200 animate-pulse"></div>
      </section>
    );
  }

  return (
    <section
      ref={heroRef}
      className="relative bg-transparent pt-6 md:pt-8 pb-8 md:pb-16 container mx-auto px-4 max-w-7xl"
    >
      <div
        className="relative w-full h-[180px] sm:h-[240px] md:h-[320px] lg:h-[400px] overflow-hidden rounded-3xl md:rounded-[48px] bg-black leading-none group touch-pan-y"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
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
              {slides.map((slide) => (
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1120px"
                    draggable={false}
                    className="block object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {slides.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-30">
              {slides.map((_, idx) => (
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
          )}

        {slides.length > 1 && (
          <>
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
          </>
        )}
      </div>
    </section>
  );
}