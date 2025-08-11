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
  Check,
} from "lucide-react";

const services = [
  {
    icon: Car,
    title: "Ride-Hailing Driver",
    description: "Driver profesional untuk layanan ride-hailing",
    details: [
      "Antar jemput penumpang tepat waktu",
      "Menjaga kenyamanan dan keselamatan perjalanan",
      "Merawat kendaraan agar tetap layak jalan",
      "Mengikuti standar pelayanan pelanggan yang baik",
    ],
  },
  {
    icon: HardHat,
    title: "Manufacture (Pabrikasi/Garmen)",
    description: "Tenaga kerja manufaktur berpengalaman",
    details: [
      "Mengoperasikan mesin produksi",
      "Melakukan pengecekan kualitas produk",
      "Membantu proses pengemasan dan distribusi",
      "Menjaga kebersihan dan keselamatan kerja",
    ],
  },
  {
    icon: Shield,
    title: "Security & Building Management",
    description: "Keamanan dan pengelolaan gedung",
    details: [
      "Menjaga keamanan area gedung",
      "Melakukan patroli dan pencatatan aktivitas",
      "Membantu tamu dan penghuni gedung",
      "Memastikan fasilitas berfungsi optimal",
    ],
  },
  {
    icon: User,
    title: "Courier",
    description: "Layanan kurir terpercaya",
    details: [
      "Mengambil dan mengirimkan paket tepat waktu",
      "Menjaga kondisi barang selama pengiriman",
      "Melakukan pencatatan pengiriman",
      "Berkoordinasi dengan pelanggan",
    ],
  },
  {
    icon: Truck,
    title: "Trucking Driver",
    description: "Driver truk profesional",
    details: [
      "Mengangkut barang sesuai jadwal dan rute",
      "Memastikan barang aman selama perjalanan",
      "Melakukan pengecekan kendaraan sebelum berangkat",
      "Melaporkan kondisi rute dan kendaraan",
    ],
  },
  {
    icon: Wrench,
    title: "Technician",
    description: "Teknisi ahli berbagai bidang",
    details: [
      "Pemeriksaan dan perbaikan sistem teknis",
      "Membersihkan dan merawat komponen alat",
      "Memastikan sistem berjalan dengan baik",
      "Melaporkan hasil perawatan secara rutin",
    ],
  },
  {
    icon: Users,
    title: "Gardener (Layanan Pertamanan)",
    description: "Layanan taman profesional",
    details: [
      "Perawatan rutin taman dan tanaman hias",
      "Pemangkasan, penyiraman, dan pemupukan",
      "Penanggulangan hama tanaman",
      "Perancangan dan pemeliharaan lanskap",
    ],
  },
  {
    icon: Eye,
    title: "Pest Control",
    description: "Pengendalian hama terpadu",
    details: [
      "Penyediaan tenaga pest control bersertifikasi",
      "Penanganan hama seperti tikus, serangga, rayap, dll",
      "Metode fogging, spraying, dan fumigasi",
      "Pemantauan dan inspeksi berkala",
    ],
  },
  {
    icon: Building,
    title: "Gondola",
    description: "Operator gondola berpengalaman",
    details: [
      "Penyediaan operator gondola bersertifikasi K3",
      "Pembersihan kaca dan eksterior gedung bertingkat",
      "Inspeksi dan pemeliharaan unit gondola",
      "Pelaksanaan prosedur keselamatan kerja yang ketat",
    ],
  },
  {
    icon: UserCheck,
    title: "Cleaning Service",
    description: "Layanan kebersihan menyeluruh",
    details: [
      "Pembersihan harian (lantai, meja, toilet, kaca, area umum)",
      "Deep cleaning berkala",
      "Pengelolaan sampah dan sanitasi",
      "Penyediaan dan pengelolaan alat kebersihan serta chemical",
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
      "Resepsionis dan petugas penerima tamu",
      "Pengelolaan buku tamu dan sistem kunjungan",
      "Penanganan telepon dan korespondensi",
      "Pengelolaan dokumen dan informasi umum",
    ],
  },
];

export default function ServicesSection() {
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [isVisible, setIsVisible] = useState(false);
  const [animatedCards, setAnimatedCards] = useState(new Set());
  const sectionRef = useRef(null);

  const toggleCard = (index: number) => {
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {services.map((service, index) => {
            const isExpanded = expandedCards.has(index);
            const isAnimated = animatedCards.has(index);
            const Icon = service.icon;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100 flex flex-col ${
                  isAnimated
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-8 scale-95"
                }`}
                style={{
                  transitionDelay: isAnimated ? `${index * 50}ms` : "0ms",
                }}
              >
                {/* Header */}
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

                {/* Expandable Content */}
                <div
                  className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                    isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-4 pt-0 space-y-2">
                      {service.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className={`flex items-start space-x-2 transition-all duration-500 ${
                            isExpanded
                              ? "opacity-100 translate-x-0"
                              : "opacity-0 -translate-x-4"
                          }`}
                          style={{
                            transitionDelay: isExpanded
                              ? `${100 + detailIndex * 50}ms`
                              : "0ms",
                          }}
                        >
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Button */}
                <div className="mt-auto rounded-b-2xl bg-orange-500 hover:bg-orange-600 transition-colors duration-200">
                  <button
                    onClick={() => toggleCard(index)}
                    className="w-full text-white py-3 px-6 font-medium flex items-center justify-center space-x-2"
                  >
                    <span>{isExpanded ? "Tutup" : "Lihat Layanan"}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
