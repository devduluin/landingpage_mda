"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { IoLogoGooglePlaystore, IoLogoApple } from "react-icons/io5";
import LogoDuluinAnimation from "../animations/LogoDuluinAnimation";

const socialLinks = [
  {
    href: "#",
    icon: FaFacebookF,
    name: "Facebook",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  {
    href: "#",
    icon: FaTwitter,
    name: "Twitter",
    color: "bg-sky-500 hover:bg-sky-600",
  },
  {
    href: "#",
    icon: FaInstagram,
    name: "Instagram",
    color: "bg-pink-500 hover:bg-pink-600",
  },
  {
    href: "#",
    icon: FaLinkedinIn,
    name: "LinkedIn",
    color: "bg-blue-700 hover:bg-blue-800",
  },
];

const Footer = () => {
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
      { threshold: 0.1 }
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

  const renderColumn = (delay: number, children: React.ReactNode) => (
    <div
      className={`transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  return (
    <footer
      ref={sectionRef}
      className="bg-gray-900 text-white py-16 overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          {renderColumn(
            0,
            <div className="space-y-4">
              <LogoDuluinAnimation width={150} height={30} />
              <p className="text-gray-400 text-sm">
                Jl. Batununggal Mulia X No.9, Mengger, Kec. Bandung Kidul, Kota
                Bandung, Jawa Barat 40267
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href="tel:087700231000"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>087700231000</span>
                </a>
                <a
                  href="mailto:hello@duluin.com"
                  className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>hello@duluin.com</span>
                </a>
              </div>
            </div>
          )}

          {/* Products & KOMINFO */}
          {renderColumn(
            150,
            <div>
              <h3 className="font-bold mb-4 text-lg">Produk</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                {[
                  "Duluin Gajian",
                  "Duluin HRMS",
                  "Satu Creative",
                  "MDA Partner",
                ].map((product) => (
                  <a
                    key={product}
                    href="#"
                    className="block hover:text-orange-400 hover:translate-x-1 transition-all"
                  >
                    {product}
                  </a>
                ))}
              </div>
              <div className="mt-8">
                <h3 className="font-bold mb-4 text-lg">Legalitas</h3>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://pse.kominfo.go.id/static/v2/images/logo-pse-terdaftar.png"
                    alt="PSE Kominfo"
                    className="w-16 h-16 bg-white p-1 rounded-md"
                  />
                  <div className="text-gray-400 text-xs">
                    <p>
                      PT Rasa Aksata Nusantara Terdaftar di Penyelenggara Sistem
                      Elektronik
                    </p>
                    <p className="font-mono mt-1">013789.01/DJAI.PSE/04/2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Pages */}
          {renderColumn(
            300,
            <div>
              <h3 className="font-bold mb-4 text-lg">Halaman</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                {[
                  "Beranda",
                  "Produk",
                  "Blog & Berita",
                  "Karir",
                  "Tentang Kami",
                  "FAQ",
                  "Kebijakan Privasi",
                ].map((page) => (
                  <a
                    key={page}
                    href="#"
                    className="block hover:text-orange-400 hover:translate-x-1 transition-all"
                  >
                    {page}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Social & Downloads */}
          {renderColumn(
            450,
            <div>
              <h3 className="font-bold mb-4 text-lg">Ikuti Kami</h3>
              <div className="flex space-x-3 mb-8">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    aria-label={link.name}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-white transition-all transform hover:scale-110 hover:-translate-y-1 ${link.color}`}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <h3 className="font-bold mb-4 text-lg">Download Sekarang!</h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="bg-black rounded-lg px-4 py-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-all transform hover:scale-105"
                >
                  <IoLogoGooglePlaystore className="w-7 h-7 text-white" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">GET IT ON</div>
                    <div className="text-sm text-white font-semibold">
                      Google Play
                    </div>
                  </div>
                </a>
                <a
                  href="#"
                  className="bg-black rounded-lg px-4 py-2 flex items-center space-x-3 cursor-pointer hover:bg-gray-800 transition-all transform hover:scale-105"
                >
                  <IoLogoApple className="w-7 h-7 text-white" />
                  <div className="text-left">
                    <div className="text-xs text-gray-300">Download on the</div>
                    <div className="text-sm text-white font-semibold">
                      App Store
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-500">
          <p className="text-sm">
            Copyright © {new Date().getFullYear()} PT. Rosa Aksata Nusantara.
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
