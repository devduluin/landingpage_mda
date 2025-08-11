"use client";

import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef } from "react";

const faqs = [
  {
    question: "Apa itu MDA Partner?",
    answer:
      "MDA Partner adalah layanan dari PT. Mitra Duluin Asesmen yang menyediakan solusi ketenagakerjaan, termasuk rekrutmen, administrasi penggajian, dan proses outsourcing untuk membantu perusahaan fokus pada bisnis utama mereka.",
  },
  {
    question: "Layanan apa saja yang ditawarkan oleh MDA Partner?",
    answer:
      "Kami menawarkan berbagai layanan, termasuk Layanan Rekrutmen, Layanan Administrasi Penggajian, Proses Outsourcing, dan Manajemen Karyawan HR Digital untuk berbagai sektor industri.",
  },
  {
    question: "Di area mana saja MDA Partner beroperasi?",
    answer:
      "Saat ini, kami fokus melayani perusahaan di wilayah Jabodetabek, termasuk Jakarta, Bogor, Depok, Tangerang, dan Bekasi, serta Bandung.",
  },
  {
    question: "Bagaimana cara kerja layanan rekrutmen di MDA Partner?",
    answer:
      "Tim kami akan bekerja sama dengan Anda untuk memahami kebutuhan spesifik perusahaan, kemudian melakukan proses seleksi ketat untuk menemukan talenta terbaik yang sesuai dengan kriteria Anda.",
  },
  {
    question:
      "Apakah MDA Partner menyediakan tenaga kerja untuk semua industri?",
    answer:
      "Kami menyediakan tenaga kerja untuk berbagai sektor, termasuk ride-hailing, manufaktur, keamanan, logistik, perhotelan, dan banyak lagi. Hubungi kami untuk mendiskusikan kebutuhan spesifik Anda.",
  },
];

export default function FaqSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <div
      ref={sectionRef}
      className="w-full px-4 py-20 bg-gradient-to-b from-gray-50 to-white"
    >
      <div
        className={`mx-auto w-full max-w-3xl transition-all duration-1000 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-4 text-gray-800">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Tidak menemukan jawaban yang Anda cari? Hubungi tim kami.
        </p>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Disclosure key={index} as="div">
              {({ open }) => (
                <div className="rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200/80">
                  <Disclosure.Button className="flex w-full items-center justify-between rounded-2xl px-6 py-5 text-left text-base font-medium text-gray-800 hover:bg-orange-50/50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500/75">
                    <span className="flex-1 pr-4">{faq.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "rotate-180" : ""
                      } h-6 w-6 text-orange-500 transition-transform duration-300 ease-in-out`}
                    />
                  </Disclosure.Button>
                  <Transition
                    enter="transition-all duration-300 ease-in-out"
                    enterFrom="max-h-0 opacity-0"
                    enterTo="max-h-96 opacity-100"
                    leave="transition-all duration-200 ease-in-out"
                    leaveFrom="max-h-96 opacity-100"
                    leaveTo="max-h-0 opacity-0"
                  >
                    <Disclosure.Panel
                      className="px-6 pb-5 pt-2 text-sm text-gray-600 leading-relaxed overflow-hidden"
                      static
                    >
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}
