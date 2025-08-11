"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import { BsInstagram } from "react-icons/bs";

const TwoColumnFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={sectionRef}
      //     className="
      //   bg-gradient-to-r
      //   from-gray-900
      //   via-gray-700
      //   to-gray-900
      //   text-white
      //   py-12
      //   relative
      //   overflow-hidden
      // "
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-zinc-900 text-white py-12 relative overflow-hidden"
    >
      {/* Background subtle pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/10 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-content gap-8">
          {/* Left Side - Logo */}
          <div
            onClick={scrollToTop}
            className={`transition-all duration-700 cursor-pointer ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <Image
              src="/MDAP_LOGO_WHITE.svg"
              alt="Logo MDAP"
              width={150}
              height={60}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Right Side - Contact Info */}
          <div
            className={`transition-all md:ml-28 duration-700 delay-150 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Kontak Kami
            </h3>

            <div className="space-y-1">
              {/* Address */}
              <div className="flex items-start space-x-3 text-gray-300 hover:text-[#158576] transition-colors">
                <MapPin className="w-5 h-5 text-[#158576] mt-1 flex-shrink-0" />
                <a
                  href="https://www.google.com/maps/place/Duluin+Head+Office/@-6.9627161,107.6282733,1149m/data=!3m2!1e3!4b1!4m6!3m5!1s0x2e68e99345c05791:0xa2d8b531d46ce9a!8m2!3d-6.9627161!4d107.6308482!16s%2Fg%2F11lmrll7d8?entry=ttu&g_ep=EgoyMDI1MDgwNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm leading-relaxed"
                >
                  Jl. Batununggal Mulia X No.9, Mengger, Kec. Bandung Kidul,
                  Kota Bandung, Jawa Barat 40267
                </a>
              </div>

              {/* Phone (WhatsApp) */}
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#158576] transition-colors">
                <Phone className="w-5 h-5 text-[#158576] flex-shrink-0" />
                <a
                  href="https://wa.me/6281910031000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  0819 1003 1000
                </a>
              </div>

              {/* Email (Gmail compose) */}
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#158576] transition-colors">
                <Mail className="w-5 h-5 text-[#158576] flex-shrink-0" />
                <a
                  href="https://mail.google.com/mail/?view=cm&to=mdapartner.id@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm"
                >
                  mdapartner.id@gmail.com
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center space-x-3 text-gray-300 hover:text-[#158576] transition-colors">
                <BsInstagram className="w-5 h-5 text-[#158576] flex-shrink-0" />
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
            © 2025 MDA Partner - PT. Rosa Aksata Nusantara. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export { TwoColumnFooter };
