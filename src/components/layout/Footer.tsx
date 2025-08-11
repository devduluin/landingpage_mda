"use client";

import React, { useState, useEffect, useRef } from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import LogoDuluinAnimation from "../animations/LogoDuluinAnimation";
import Image from "next/image";

// Option 1: Minimalist Single Column
const MinimalistFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const socialLinks = [
    { href: "#", icon: FaFacebookF, name: "Facebook" },
    { href: "#", icon: FaTwitter, name: "Twitter" },
    { href: "#", icon: FaInstagram, name: "Instagram" },
    { href: "#", icon: FaLinkedinIn, name: "LinkedIn" },
  ];

  return (
    <footer
      ref={sectionRef}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 text-white py-12"
    >
      <div className="container mx-auto px-4">
        {/* Main Content */}
        <div
          className={`text-center space-y-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Logo/Brand */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
              MDA Partner
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Mudahkan kebutuhan SDM Anda dengan solusi profesional dari MDA
              Partner
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
            <a
              href="tel:087700231000"
              className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors group"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>081910031000</span>
            </a>
            <a
              href="mailto:hello@mdapartner.com"
              className="flex items-center space-x-2 text-gray-300 hover:text-orange-400 transition-colors group"
            >
              <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>mdapartner.id@gmail.com</span>
            </a>
            <div className="flex items-center space-x-2 text-gray-300">
              <MapPin className="w-4 h-4" />
              <span>Bandung, Indonesia</span>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <link.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700/50 mt-12 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MDA Partner. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Option 2: Two Column Layout
const TwoColumnFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      href: "#",
      icon: FaFacebookF,
      name: "Facebook",
      color: "hover:bg-blue-600",
    },
    { href: "#", icon: FaTwitter, name: "Twitter", color: "hover:bg-sky-500" },
    {
      href: "https://www.mdapartner.id",
      icon: FaInstagram,
      name: "Instagram",
      color: "hover:bg-pink-500",
    },
    {
      href: "#",
      icon: FaLinkedinIn,
      name: "LinkedIn",
      color: "hover:bg-blue-700",
    },
  ];

  return (
    <footer
      ref={sectionRef}
      className="bg-gray-900 text-white py-16 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-500/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column - Company Info */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div>
              <Image
                src="/MDAP_LOGO.svg"
                alt="Logo MDAP"
                width={150}
                height={30}
                className="header-logo transition-transform duration-300 group-hover:scale-105"
              />
              <p className="text-gray-400 leading-relaxed">
                Optimalkan potensi perusahaan Anda dengan tenaga kerja
                profesional di bidangnya. Kami siap menjadi solusi untuk
                kebutuhan SDM Anda.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-5 h-5 text-orange-400" />
                <span className="text-sm">
                  Jl. Batununggal Mulia X No.9, Mengger, Kec. Bandung Kidul,
                  Kota Bandung, Jawa Barat 40267
                </span>
              </div>
              <a
                href="https://wa.me/6287700231000"
                target="_blank"
                className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-orange-400" />
                <span>087700231000</span>
              </a>
              <a
                href="mailto:hello@mdapartner.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-orange-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-orange-400" />
                <span>hello@mdapartner.com</span>
              </a>
            </div>
          </div>

          {/* Right Column - Social & CTA */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-6">
                Terhubung Dengan Kami
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    className={`w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${link.color}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 backdrop-blur-sm border border-orange-500/30 rounded-2xl p-6">
              <h4 className="text-lg font-semibold mb-2">Siap Bergabung?</h4>
              <p className="text-gray-300 text-sm mb-4">
                Hubungi kami sekarang untuk konsultasi gratis tentang kebutuhan
                SDM Anda
              </p>
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                Hubungi Sekarang
              </button>
            </div> */}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 text-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} MDA Partner - PT. Rosa Aksata
            Nusantara. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Option 3: Card Style Footer
const CardStyleFooter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    { href: "#", icon: FaFacebookF, name: "Facebook" },
    { href: "#", icon: FaTwitter, name: "Twitter" },
    { href: "https://www.mdapartner.id", icon: FaInstagram, name: "Instagram" },
    { href: "#", icon: FaLinkedinIn, name: "LinkedIn" },
  ];

  return (
    <footer ref={sectionRef} className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <div
          className={`bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 rounded-3xl p-12 text-white transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center space-y-8">
            {/* Header */}
            <div>
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                MDA Partner
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Solusi terpercaya untuk kebutuhan SDM profesional di Indonesia
              </p>
            </div>

            {/* Contact Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Phone className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Telepon</h4>
                <a
                  href="tel:087700231000"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  087700231000
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Mail className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Email</h4>
                <a
                  href="mailto:hello@mdapartner.com"
                  className="text-gray-300 hover:text-orange-400 transition-colors"
                >
                  hello@mdapartner.com
                </a>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <MapPin className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Lokasi</h4>
                <p className="text-gray-300 text-sm">Bandung, Jawa Barat</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center hover:scale-110 hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700/50 pt-8">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} MDA Partner. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Export all components
export { MinimalistFooter, TwoColumnFooter, CardStyleFooter };
