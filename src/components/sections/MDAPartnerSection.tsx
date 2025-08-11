"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Users,
  UserCheck,
  Briefcase,
  BarChart3,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  position: "left" | "right";
  delay: number;
  isVisible: boolean;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon: Icon,
  position,
  delay,
  isVisible,
}) => {
  return (
    <div
      className={`
      relative transform transition-all duration-1000 ease-out
      ${
        isVisible
          ? "translate-x-0 opacity-100"
          : position === "left"
          ? "-translate-x-16 opacity-0"
          : "translate-x-16 opacity-0"
      }
    `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Card Container */}
      <div
        className="
        group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl
        transition-all duration-500 hover:-translate-y-2
        border border-gray-100 hover:border-orange-200
        overflow-hidden
      "
      >
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Icon */}
        <div className="relative mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

          {/* Learn More Link */}
          <div className="flex items-center text-orange-500 font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-sm">Pelajari Lebih Lanjut</span>
            <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-orange-100 to-transparent rounded-full opacity-30"></div>
      </div>

      {/* Connection Line for Desktop */}
      {position === "left" && (
        <div className="hidden lg:block absolute top-1/2 -right-8 w-16 h-px bg-gradient-to-r from-orange-300 to-transparent"></div>
      )}
    </div>
  );
};

const CenterImage: React.FC<{ isVisible: boolean }> = ({ isVisible }) => {
  return (
    <div
      className={`
      relative transform transition-all duration-1000 ease-out delay-500
      ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}
    `}
    >
      {/* Main Container */}
      <div className="relative">
        {/* Background Gradient Circle */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>

        {/* Image Container */}
        <div className="relative bg-gradient-to-br from-orange-400 to-orange-600 rounded-3xl overflow-hidden shadow-2xl">
          {/* Professional Woman Placeholder */}
          <div className="w-80 h-96 bg-gradient-to-b from-orange-100 to-orange-50 flex items-end justify-center relative">
            {/* Professional Avatar */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div
              className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-bounce"
              style={{ animationDelay: "0s" }}
            >
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>

            <div
              className="absolute top-16 right-8 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-bounce"
              style={{ animationDelay: "1s" }}
            >
              <BarChart3 className="w-6 h-6 text-blue-500" />
            </div>

            <div
              className="absolute bottom-16 left-12 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg animate-bounce"
              style={{ animationDelay: "0.5s" }}
            >
              <Briefcase className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Decorative Ring */}
        <div
          className="absolute -inset-4 rounded-full border-2 border-orange-200 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
      </div>
    </div>
  );
};

const MDAPartnerSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      title: "Layanan Rekrutmen",
      description:
        "Kami siap membantu dalam perekrutan talenta terbaik sesuai kebutuhan Anda. Proses kami mencakup seluruh tahapan rekrutmen, mulai dari pencarian kandidat, hingga tindak lanjut pasca penempatan.",
      icon: Users,
      position: "left" as const,
    },
    {
      title: "Layanan Administrasi Penggajian",
      description:
        "Kami mengelola penggajian perusahaan secara akurat, mulai dari perhitungan gaji dan pajak, pelaporan, hingga pemenuhan keputusan. Proses ini kami sederhanakan agar perusahaan dapat fokus pada bisnis utamanya.",
      icon: UserCheck,
      position: "right" as const,
    },
    {
      title: "Outsourcing Proses",
      description:
        "Perusahaan dapat menyerahkan fungsi non-inti kepada tenaga profesional berpengalaman. Kami memberikan solusi proses bisnis seperti menekan biaya operasional, hingga penempatan tenaga kerja.",
      icon: Briefcase,
      position: "left" as const,
    },
    {
      title: "Manajemen HR Digital",
      description:
        "Kami menyediakan platform HR digital untuk mengelola data karyawan, absensi, pengajuan cuti, pemantauan kinerja, dan lainnya. Sistem ini dirancang untuk efisiensi perusahaan, serta kemudahan bagi tim HR dan karyawan.",
      icon: BarChart3,
      position: "right" as const,
    },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden mt-[-10rem]"
      >
        <div className="container mx-auto px-6 relative z-20">
          {/* Background Decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-blue-100 to-transparent rounded-full blur-3xl opacity-20"></div>

          <div className="border-b border-gray-200 border-t rounded-t-3xl shadow-xs p-8">
            <div className="flex items-center space-x-6">
              {/* MDA Logo */}
              <Image
                src="/MDAP_LOGO.svg"
                alt="Logo MDAP"
                width={150}
                height={30}
                className="header-logo transition-transform duration-300 group-hover:scale-105"
              />

              {/* Description */}
              <p className="text-gray-600 flex-1 text-center leading-relaxed">
                Mitra Daksa Anarawata (MDA) adalah penyedia tenaga kerja dan
                outsourcing berkomitmen untuk menyediakan solusi ketenagakerjaan
                yang inovatif dan efisien. Kami memberikan solusi untuk
                perusahaan agar dapat fokus pada bisnis tanpa terbebani oleh
                kerumitan manajemen SDM.
              </p>
            </div>
          </div>

          {/* Header Section */}
          <div
            className={`text-center mb-20 transform transition-all duration-1000 pt-32 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <h2 className="text-4xl text-gray-700 md:text-5xl font-bold mb-6">
              Layanan dari{" "}
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
                MDA Partner
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kami menyediakan layanan terbaik untuk memenuhi kebutuhan SDM
              Anda. Penuh kebutuhan SDM Anda dengan mudah!
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-3 gap-12 items-start max-w-7xl mx-auto">
            {/* Left Column */}
            <div className="space-y-12">
              {services
                .filter((_, index) => index % 2 === 0)
                .map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    position="left"
                    delay={index * 200}
                    isVisible={isVisible}
                  />
                ))}
            </div>

            {/* Center Image */}
            <div className="flex justify-center items-center md:relative md:top-1/2 md:-translate-y-1/2">
              {/* <CenterImage isVisible={isVisible} /> */}
              <Image
                src="/images/woman-with-shirt.svg"
                alt="woman-with-shirt"
                width={300}
                height={80}
                className="header-logo transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Right Column */}
            <div className="space-y-12">
              {services
                .filter((_, index) => index % 2 === 1)
                .map((service, index) => (
                  <ServiceCard
                    key={service.title}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    position="right"
                    delay={index * 200 + 100}
                    isVisible={isVisible}
                  />
                ))}
            </div>
          </div>

          {/* Bottom CTA */}
          {/* <div
            className={`text-center mt-20 transform transition-all duration-1000 delay-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-bold mb-4">
                Siap Bergabung dengan MDA Partner?
              </h3>
              <p className="mb-6 opacity-90">
                Konsultasikan kebutuhan SDM perusahaan Anda dengan tim ahli kami
              </p>
              <button className="bg-white text-orange-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 shadow-lg">
                Hubungi Kami Sekarang
              </button>
            </div>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default MDAPartnerSection;
