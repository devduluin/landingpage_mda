import React, { useState, useEffect, useRef } from "react";
import {
  Car,
  HardHat,
  Shield,
  User,
  Truck,
  Wrench,
  Users,
  Eye,
  Building,
  UserCheck,
  Headphones,
  ChevronDown,
  ChevronUp,
  Check,
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Ride-Hailing Driver",
    description: "Driver profesional untuk layanan ride-hailing",
    details: [
      "Ahli dalam penggunaan navigasi",
      "Menguasai rute-rute alternatif",
      "Berpengalaman mengendarai mobil",
      "Memiliki ketrampilan apps ridehailing",
      "Sopan dan ramah kepada penumpang",
      "Menguasai aplikasi yang ada",
    ],
  },
  {
    icon: HardHat,
    title: "Manufacture (Fabrikasi/Garment)",
    description: "Tenaga kerja manufaktur berpengalaman",
    details: [
      "Management mesin produksi",
      "Menguasai prosedural kualitas",
      "Memiliki proses pengendalian dari SIN PM",
      "Mengerti prosedur keselamatan kerja",
    ],
  },
  {
    icon: Shield,
    title: "Security & Building Management",
    description: "Keamanan dan pengelolaan gedung",
    details: [
      "Menguasai keamanan area gedung",
      "Memiliki perilaku responsif terhadap situasi darurat",
      "Memahami teknis dan prosedur keamanan",
      "Menguasai dalam hal laporan harian",
    ],
  },
  {
    icon: User,
    title: "Courier",
    description: "Layanan kurir terpercaya",
    details: [
      "Menguassi dan menggunakan sistem rute terbaik",
      "Menguasai navigasi terpadu dengan sistem",
      "Memiliki ketrampilan survey alam",
      "Sopan dan bersiskap kepada customer",
    ],
  },
  {
    icon: Truck,
    title: "Trucking Driver",
    description: "Driver truk profesional",
    details: [
      "Menguasai kemitraan travel birasal distribusi",
      "Berpengalaman dengan truck",
      "Memiliki ahli menguasai ketrampilan SIM A/B terhadap kendaraan",
    ],
  },
  {
    icon: Wrench,
    title: "Technician",
    description: "Teknisi ahli berbagai bidang",
    details: [
      "Menguasai teknis perbaikan elektronik",
      "Bisa alat peralatan penunjang",
      "Menguasai dalam service manual",
      "Memiliki ketrampilan teori dan keahlian tahap lain",
    ],
  },
  {
    icon: Users,
    title: "Gardener (Layanan Pertamanan)",
    description: "Layanan taman profesional",
    details: [
      "Pengendalian rumput tanaman dan pembasuhan",
      "Pemangkasan pohon tanaman dan housework",
      "Pengetahuan keahlian tanaman",
    ],
  },
  {
    icon: Eye,
    title: "Pest Control",
    description: "Pengendalian hama terpadu",
    details: [
      "Pengendalian terhadap pest control",
      "Penggunaan dan hama expert untuk menguasai step-by-step",
      "Pemahaman terhadap survey dan mengatasi",
    ],
  },
  {
    icon: Building,
    title: "Gondola",
    description: "Operator gondola berpengalaman",
    details: [
      "Menguasai operasi gondola",
      "Pembersihan kerja ahli dinamis dengan optimal",
      "Menguasai operasi menggalur sisi rutin gondola",
    ],
  },
  {
    icon: UserCheck,
    title: "Cleaning Service",
    description: "Layanan kebersihan menyeluruh",
    details: [
      "Pembersihan kantor toilet, mess, toilet karyawan aula",
      "Deep cleaning gedung",
      "Pengelolaan sampah dan limbah",
      "Pembersihan dan pengoperasian area inventaris",
    ],
  },
  {
    icon: Car,
    title: "Driver Kantoran",
    description: "Driver untuk kebutuhan kantor",
    details: [
      "Pengemudi untuk direksi dan manajemen",
      "Pengemudi logistik kantor dan operasional lapangan",
      "Pengemudi kendaraan dinas harian atau tetap",
      "Layanan antar-jemput pegawai atau tamu",
    ],
  },
  {
    icon: Headphones,
    title: "Front Office",
    description: "Resepsionis dan customer service",
    details: [
      "Resepsionis dan administrasi kantor",
      "Pengelolaan tamu dari operasi tamu bangunan",
      "Komunikasi dan koperasi administrasi dan pelayanan",
    ],
  },
];

export default function ServicesSection() {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const sectionRef = useRef(null);

  const toggleCard = (index: any) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(index)) {
      newExpandedCards.delete(index);
    } else {
      newExpandedCards.add(index);
    }
    setExpandedCards(newExpandedCards);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Reset dan trigger animasi cards
            setAnimatedCards(new Set());
            // Stagger animation untuk setiap card
            services.forEach((_, index) => {
              setTimeout(() => {
                setAnimatedCards((prev) => new Set(prev).add(index));
              }, index * 100); // Delay 100ms per card
            });
          } else {
            setIsVisible(false);
            setAnimatedCards(new Set()); // Reset saat keluar dari view
          }
        });
      },
      {
        threshold: 0.1, // Trigger saat 10% dari section terlihat
        rootMargin: "-50px 0px -50px 0px", // Offset agar trigger lebih presisi
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div
          className={`text-center mb-16 transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold text-gray-700 mb-4">
            <span className="text-orange-500">MDA Partner</span> Menyediakan
            Aneka Jasa
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Kami menawarkan berbagai jasa untuk memenuhi kebutuhan SDM Anda.
            Tentukan solusi yang Anda butuhkan dan maksimalkan potensi
            perusahaan Anda!
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const isExpanded = expandedCards.has(index);
            const isAnimated = animatedCards.has(index);
            const Icon = service.icon;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-500 overflow-hidden border border-gray-100 ${
                  isAnimated
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: isAnimated ? `${index * 50}ms` : "0ms",
                }}
              >
                {/* Default Collapsed Card */}
                {!isExpanded && (
                  <>
                    {/* Icon and Title - Single Row */}
                    <div className="flex items-center space-x-4 p-6">
                      <div
                        className={`w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isAnimated ? "rotate-0" : "rotate-12"
                        }`}
                      >
                        <Icon className="w-6 h-6 text-gray-800" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-orange-500">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
                      <button
                        onClick={() => toggleCard(index)}
                        className="w-full text-white py-3 px-6 font-medium flex items-center justify-center space-x-2"
                      >
                        <span>Lihat Layanan</span>
                        <ChevronDown className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}

                {/* Expanded Content */}
                {isExpanded && (
                  <>
                    {/* Header with Icon and Title */}
                    <div className="flex items-center space-x-4 p-6 pb-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-gray-800" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-orange-500">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    {/* Details List */}
                    <div className="px-6 pb-4">
                      <div className="space-y-2">
                        {service.details.map((detail, detailIndex) => (
                          <div
                            key={detailIndex}
                            className="flex items-start space-x-2"
                          >
                            <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Close Button */}
                    <div className="bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
                      <button
                        onClick={() => toggleCard(index)}
                        className="w-full text-white py-3 px-6 font-medium flex items-center justify-center space-x-2"
                      >
                        <span>Tutup</span>
                        <ChevronUp className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
