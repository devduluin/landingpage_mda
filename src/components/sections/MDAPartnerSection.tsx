"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { AiFillDatabase } from "react-icons/ai";
import { IoBriefcase } from "react-icons/io5";

// 1. Move the intersection observer logic *inside* the card component.
interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  position: "left" | "right";
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  position,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, {
    threshold: 0.3,
    triggerOnce: false,
  });
  const randomDelay = Math.floor(Math.random() * 500) + 100; // 100–600ms

  return (
    <div
      ref={cardRef}
      className={`
        group relative transform transition-all duration-1000 ease-out
        ${
          isVisible // Corrected this line
            ? "translate-x-0 opacity-100"
            : position === "left"
            ? "-translate-x-16 opacity-0"
            : "translate-x-16 opacity-0"
        }
      `}
      style={{ transitionDelay: `${randomDelay}ms` }}
    >
      <div className="relative p-6 md:p-8 rounded-[30px] bg-white shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Moving Border Animation (Non-hover only) */}
        <div className="absolute inset-0 rounded-[30px] group-hover:opacity-0 transition-opacity duration-500 flex justify-center items-center overflow-hidden">
          <div className="absolute w-100 h-[200%] bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-spin-slow"></div>
          <div className="absolute inset-[2px] bg-white rounded-[28px] z-10"></div>
        </div>

        {/* Animated Blob Background (Non-hover) */}
        <div className="absolute inset-0 rounded-[30px] group-hover:opacity-0 transition-opacity duration-500 overflow-hidden">
          {/* Background layer */}
          <div className="absolute top-1 left-1 right-1 bottom-1 bg-white/95 backdrop-blur-sm rounded-[26px] border-2 border-white z-10"></div>
        </div>

        {/* Animated Border Gradient (Hover) - Rotating around perimeter */}
        <div className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute inset-0 rounded-[30px] animate-border-rotate-fast opacity-60 overflow-hidden">
            <div className="absolute inset-0 rounded-[30px] border-4 border-transparent bg-gradient-conic from-transparent from-0% via-yellow-300 via-25% to-transparent to-50% bg-origin-border"></div>
          </div>
          <div className="absolute inset-[2px] rounded-[28px] bg-white"></div>
        </div>

        {/* Elegant Yellow Overlay (Hover) */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-yellow-25 to-orange-25 opacity-0 group-hover:opacity-30 transition-all duration-700 rounded-[30px]"></div>

        {/* Moving Border Animation (Hover) */}
        <div className="absolute inset-0 rounded-[30px] group-hover:animate-pulse">
          <div className="absolute inset-0 rounded-[30px] border-2 border-transparent bg-gradient-to-r from-transparent via-yellow-300 to-transparent bg-[length:200%_100%] animate-border-move opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
        </div>

        <div className="relative z-20">
          <div className="mb-6">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:from-yellow-400 group-hover:to-orange-400 transition-all duration-300">
              <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="bg-gradient-to-br from-orange-500 to-orange-600 bg-clip-text text-transparent text-lg md:text-xl font-bold group-hover:from-yellow-500 group-hover:to-orange-500 transition-all duration-300">
              {title}
            </h3>
            <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-20 group-hover:scale-150 group-hover:from-yellow-200 group-hover:to-orange-200 transition-all duration-700"></div>
        <div className="absolute -bottom-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tl from-yellow-100 to-transparent rounded-full opacity-30 group-hover:opacity-50 transition-all duration-500"></div>
      </div>

      {position === "left" && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-px bg-gradient-to-r from-orange-300 to-transparent group-hover:from-yellow-300 transition-colors duration-300"></div>
      )}
    </div>
  );
};

const MDAPartnerSection: React.FC = () => {
  // Ref for the entire section, for elements that need to stay visible longer
  const sectionRef = useRef<HTMLElement>(null);
  const isVisible = useIntersectionObserver(sectionRef, {
    threshold: 0, // Animate as soon as a single pixel is visible
    triggerOnce: false,
    rootMargin: "0px 0px -150px 0px", // Start animation 150px before it's fully in view from the bottom
  });

  // A separate ref and observer specifically for the header text section
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderVisible = useIntersectionObserver(headerRef, {
    threshold: 0.4, // Triggers when 40% of the header is visible
    triggerOnce: false,
  });

  // A separate ref and observer for the central image
  const imageRef = useRef<HTMLDivElement>(null);
  const isImageVisible = useIntersectionObserver(imageRef, {
    threshold: 0.3, // Animate when 30% of the image is visible
    triggerOnce: false,
    rootMargin: "0px 0px -50px 0px", // Start animation a bit before it's fully in view
  });

  const logoBoxRef = useRef<HTMLDivElement>(null);
  const isLogoBoxVisible = useIntersectionObserver(logoBoxRef, {
    threshold: 0.2,
    triggerOnce: false,
  });

  const services = [
    {
      title: "Layanan Rekrutmen",
      description:
        "Kami siap membantu dalam perekrutan talenta terbaik sesuai kebutuhan Anda. Proses kami mencakup seluruh tahapan rekrutmen, mulai dari pencarian kandidat, hingga tindak lanjut pasca penempatan.",
      icon: FaUsers,
      position: "left" as const,
    },
    {
      title: "Layanan Administrasi Penggajian",
      description:
        "Kami mengelola penggajian perusahaan secara akurat, mulai dari perhitungan gaji dan pajak, pelaporan, hingga pemenuhan kepatuhan. Proses ini kami sederhanakan agar perusahaan dapat fokus pada bisnis utamanya.",
      icon: FaMoneyBillTransfer,
      position: "right" as const,
    },
    {
      title: "Outsourcing Proses",
      description:
        "Perusahaan dapat menyerahkan fungsi non-inti kepada tenaga profesional berpengalaman. Kami meningkatkan efisiensi proses bisnis seperti menekan biaya operasional, hingga penempatan tenaga kerja.",
      icon: IoBriefcase,
      position: "left" as const,
    },
    {
      title: "Manajemen HR Digital",
      description:
        "Kami menyediakan platform HR digital untuk mengelola data karyawan, absensi, pengajuan cuti, pemantauan kinerja, dan lainnya. Sistem ini dirancang untuk efisiensi perusahaan, serta kemudahan bagi tim HR dan karyawan.",
      icon: AiFillDatabase,
      position: "right" as const,
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden mt-[-10rem]"
      >
        <div className="container mx-auto px-4 max-w-7xl relative z-20">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-tl from-blue-100 to-transparent rounded-full blur-3xl opacity-20"></div>

          <div
            ref={logoBoxRef}
            className={`border-b border-t border-gray-200 shadow-xs p-6 md:p-8 transition-all duration-700 ease-out ${
              isLogoBoxVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Image
                src="/MDA PARTNER_.svg"
                alt="Logo MDAP"
                width={150}
                height={30}
                className="header-logo transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
              />

              {/* Description */}
              <p className="text-gray-600 flex-1 text-justify md:text-left leading-relaxed text-sm md:text-base">
                Mitra Daksa Anarawata (MDA) adalah penyedia tenaga kerja dan
                outsourcing berkomitmen untuk menyediakan solusi ketenagakerjaan
                yang inovatif dan efisien. Kami memberikan solusi untuk
                perusahaan agar dapat fokus pada bisnis tanpa terbebani oleh
                kerumitan manajemen SDM.
              </p>
            </div>
          </div>

          {/* Header Section - Now with its own ref and visibility state */}
          <div
            ref={headerRef}
            className={`text-center mb-12 md:mb-20 transform transition-all duration-1000 pt-20 md:pt-32 ${
              isHeaderVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-2xl md:text-3xl text-gray-700 font-bold mb-4 md:mb-6">
              Layanan dari{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                MDA Partner
              </span>
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan layanan terbaik untuk memenuhi kebutuhan SDM
              Anda. Penuh kebutuhan SDM Anda dengan mudah!
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-8 md:gap-12 items-start max-w-7xl mx-auto">
            {/* Left Column (or single column on mobile) */}
            <div className="space-y-8 md:space-y-12 lg:col-span-1">
              {services
                .filter((_, index) => index % 2 === 0)
                .map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    position="left"
                  />
                ))}
            </div>

            {/* Center Image */}
            <div
              ref={imageRef}
              className={`flex justify-center items-center my-8 lg:my-0 lg:col-span-1 md:relative md:top-1/2
    transform transition-all duration-1000 ease-out
    ${
      isImageVisible
        ? "translate-y-0 md:-translate-y-1/2 opacity-100"
        : "translate-y-1 opacity-0"
    }`}
            >
              <Image
                src="/images/woman-with-shirt.svg"
                alt="woman-with-shirt"
                width={300}
                height={80}
                className="header-logo transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Right Column (or single column on mobile) */}
            <div className="space-y-8 md:space-y-12 lg:col-span-1">
              {services
                .filter((_, index) => index % 2 === 1)
                .map((service) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    position="right"
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MDAPartnerSection;
