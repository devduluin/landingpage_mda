"use client";

import React, { useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";

export interface TwoColumnFooterProps {
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
}

const TwoColumnFooter: React.FC<TwoColumnFooterProps> = ({
  scrollContainerRef,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0.1,
    triggerOnce: false,
  });

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 text-white py-12 md:py-16 relative overflow-hidden"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 text-center lg:text-left">
          {/* Left Side - Logo */}
          <div
            onClick={scrollToTop}
            className={`transition-all duration-700 cursor-pointer mx-auto lg:mx-0 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/MDA PARTNER_WHITE.svg"
              alt="Logo MDAP"
              width={150}
              height={60}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Side - Contact Info */}
          <div
            className={`transition-all duration-700 delay-150 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Kontak Kami
            </h3>

            <div className="space-y-2">
              {/* Address */}
              <div className="flex items-start justify-center lg:justify-start space-x-3 text-gray-300 hover:text-orange-500 transition-colors">
                <MapPin className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/g7boXXt8f2tZ8NNt6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed md:max-w-xl"
                >
                  Menara Batavia, Lantai 8, Jl. K.H. Mas Mansyur No.Kav. 126, Karet Tengsin, Kecamatan Tanah Abang,
                  Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10250
                </a>
              </div>

              {/* Phone (WhatsApp) */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="https://wa.me/6281914710001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  0819 1471 0001
                </a>
              </div>

              {/* Email (Gmail compose) */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300 hover:text-orange-500 transition-colors">
                <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=business@mitradaksa.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  business@mitradaksa.com
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-center lg:justify-start space-x-3 text-gray-300 hover:text-orange-500 transition-colors">
                <BsInstagram className="w-5 h-5 text-orange-500 flex-shrink-0" />
                <a
                  href="https://instagram.com/mdapartner.id"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  @mdapartner.id
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright - Bottom Section */}
        <div
          className={`border-t border-gray-700 mt-12 pt-8 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-gray-500 text-sm text-center">
            © 2025 MDA Partner - PT. Mitra Daksa Anarawata. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default TwoColumnFooter;
