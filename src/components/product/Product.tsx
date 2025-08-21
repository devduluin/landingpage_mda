import React, { useState } from 'react';
import { ChevronDown, User, Truck, Building2, Shield, Wrench, Users, MapPin, Phone, Scissors, TreePine, Bug, Check } from 'lucide-react';

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  icon?: string;
}

interface ProductCategory {
  id: string;
  title: string;
  description: string;
  isFullWidth?: boolean;
  services: ServiceItem[];
}

const Product: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const productCategories: ProductCategory[] = [
    {
      id: 'driver',
      title: 'Driver',
      description: 'Layanan penyedia driver profesional untuk kebutuhan transportasi perusahaan dan personal.',
      isFullWidth: true,
      services: [
        {
          title: 'Ride-Hailing Driver',
          icon: '/cardLists/image 1.svg',
          description: 'Pengemudi profesional untuk layanan ride-hailing',
          features: [
            'Antar jemput penumpang tepat waktu',
            'Menjaga kenyamanan dan keselamatan perjalanan',
            'Merawat kendaraan agar tetap layak jalan',
            'Mengikuti standar pelayanan pelanggan yang baik',
          ]
        },
        {
          title: 'Trucking Driver',
          icon: '/cardLists/image 2.svg',
          description: 'Pengemudi untuk kendaraan berat dan logistik',
          features: [
            'Mengangkut barang sesuai jadwal dan rute',
            'Memastikan barang aman selama perjalanan',
            'Melakukan pengecekan kendaraan sebelum berangkat',
            'Melaporkan kondisi rute dan kendaraan'
          ]
        },
        {
          title: 'Driver Kantoran',
          icon: '/cardLists/image 3.svg',
          description: 'Pengemudi untuk berbagai jenis kendaraan',
          features: [
            'Pengemudi untuk direksi dan manajemen',
            'Pengemudi logistik kantor dan operasional lapangan',
            'Pengemudi kendaraan dinas harian atau tetap',
            'Layanan antar-jemput pegawai atau tamu'
          ]
        }
      ]
    },
    {
      id: 'manufacture',
      title: 'Manufacture',
      description: 'Tenaga kerja terampil untuk industri manufaktur dan produksi.',
      services: [
        {
          title: 'Manufacture (Pabrik/Garmen)',
          icon: '/cardLists/image 3.svg',
          description: 'Tenaga kerja untuk industri manufaktur',
          features: [
            'Mengoperasikan mesin produksi',
            'Melakukan pengecekan kualitas produk',
            'Membantu proses pengemasan dan distribusi',
            'Menjaga kebersihan dan keselamatan kerja'
          ]
        }
      ]
    },
    {
      id: 'courier-admin',
      title: 'Courier & Admin',
      description: 'Layanan kurir dan administrasi untuk mendukung operasional bisnis.',
      services: [
        {
          title: 'Courier',
          icon: '/cardLists/image 4.svg',
          description: 'Layanan pengiriman dan kurir profesional',
          features: [
            'Mengambil dan mengirimkan paket tepat waktu',
            'Menjaga kondisi barang selama pengiriman',
            'Melakukan pencatatan pengiriman',
            'Berkoordinasi dengan pelanggan'
          ]
        }
      ]
    },
    {
      id: 'commercial-services',
      title: 'Commercial Services',
      description: 'Layanan komersial lengkap untuk mendukung aktivitas bisnis perusahaan.',
      isFullWidth: true,
      services: [
        {
          title: 'Front Office',
          description: 'Layanan front office profesional',
          features: [
            'Resepsionis dan petugas penerima tamu',
            'Pengelolaan buku tamu dan sistem kunjungan',
            'Penanganan telepon dan korespondensi',
            'Pengelolaan dokumen dan informasi umum',
          ]
        },
        {
          title: 'Cleaning Service',
          description: 'Layanan kebersihan dan maintenance',
          icon: '/cardLists/image 6.svg',
          features: [
            'Pembersihan harian (lantai, meja, toilet, kaca, area umum)',
            'Penyediaan dan pengelolaan alat kebersihan serta chemical',
            'Deep cleaning berkala',
            'Pengelolaan sampah dan sanitasi',
          ]
        },
        {
          title: 'Gondola',
          description: 'Layanan penataan dan display produk',
          icon: '/cardLists/image 7.svg',
          features: [
            'Penyediaan operator gondola bersertifikasi K3',
            'Pembersihan kaca dan eksterior gedung bertingkat',
            'Inspeksi dan pemeliharaan unit gondola',
            'Pelaksanaan prosedur keselamatan kerja yang ketat',
          ]
        },
        {
          title: 'Gardener (Layanan Pertamanan)',
          description: 'Layanan perawatan taman dan landscape',
          icon: '/cardLists/image 8.svg',
          features: [
            'Perawatan rutin taman dan tanaman hias',
            'Pemangkasan, penyiraman, dan pemupukan',
            'Penanggulangan hama tanaman',
            'Perancangan dan pemeliharaan lanskap'
          ]
        },
        {
          title: 'Pest Control',
          description: 'Layanan pengendalian hama',
          icon: '/cardLists/image 9.svg',
          features: [
            'Penyediaan tenaga pest control bersertifikasi',
            'Penanganan hama seperti tikus, serangga, rayap, dll.',
            'Metode fogging, spraying, dan fumigasi',
            'Pemantauan dan inspeksi berkala'
          ]
        }
      ]
    },
    {
      id: 'security-services',
      title: 'Security Services',
      description: 'Layanan keamanan profesional untuk menjaga aset dan keselamatan.',
      services: [
        {
          title: 'Security & Building Management',
          description: 'Layanan keamanan dan manajemen gedung',
          icon: '/cardLists/image 10.svg',
          features: [
            'Menjaga keamanan area gedung',
            'Melakukan patroli dan pencatatan aktivitas',
            'Membantu tamu dan penghuni gedung',
            'Memastikan fasilitas berfungsi optimal'
          ]
        }
      ]
    },
    {
      id: 'technician',
      title: 'Technician',
      description: 'Teknisi ahli untuk berbagai kebutuhan teknis dan maintenance.',
      services: [
        {
          title: 'Technician',
          description: 'Teknisi untuk berbagai kebutuhan teknis',
          icon: '/cardLists/image 11.svg',
          features: [
            'Pemeriksaan dan perbaikan sistem teknis',
            'Membersihkan dan merawat komponen alat',
            'Memastikan sistem berjalan dengan baik',
            'Melaporkan hasil perawatan secara rutin'
          ]
        }
      ]
    }
  ];

  const getServiceIcon = (serviceTitle: string) => {
    const iconProps = { size: 20, className: "text-orange-500" };
    if (serviceTitle.includes('Ride-Hailing')) return <User {...iconProps} />;
    if (serviceTitle.includes('Trucking')) return <Truck {...iconProps} />;
    if (serviceTitle.includes('Driver')) return <Truck {...iconProps} />;
    if (serviceTitle.includes('Manufacture')) return <Building2 {...iconProps} />;
    if (serviceTitle.includes('Courier')) return <MapPin {...iconProps} />;
    if (serviceTitle.includes('Front Office')) return <Phone {...iconProps} />;
    if (serviceTitle.includes('Cleaning')) return <Scissors {...iconProps} />;
    if (serviceTitle.includes('Gondola')) return <Building2 {...iconProps} />;
    if (serviceTitle.includes('Gardener')) return <TreePine {...iconProps} />;
    if (serviceTitle.includes('Pest Control')) return <Bug {...iconProps} />;
    if (serviceTitle.includes('Security')) return <Shield {...iconProps} />;
    if (serviceTitle.includes('Technician')) return <Wrench {...iconProps} />;
    return <User {...iconProps} />;
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId) 
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const isExpanded = (categoryId: string) => expandedCategories.includes(categoryId);

  // Organize categories in the specific layout pattern
  const layoutStructure = [
    // Row 1: Driver (full width)
    [productCategories[0]], // Driver
    // Row 2: Manufacture and Courier & Admin (side by side)
    [productCategories[1], productCategories[2]], // Manufacture, Courier & Admin
    // Row 3: Commercial Services (full width)
    [productCategories[3]], // Commercial Services
    // Row 4: Security Services and Technician (side by side)
    [productCategories[4], productCategories[5]] // Security Services, Technician
  ];

  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Produk</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Kami menawarkan berbagai jasa dengan beberapa fokus industri untuk memenuhi kebutuhan SDM Anda. 
            Temukan solusi yang Anda butuhkan dan maksimalkan potensi perusahaan Anda!
          </p>
        </div>

        {/* Product Grid - Custom Layout */}
        <div className="space-y-6 lg:space-y-6">
          {layoutStructure.map((row, rowIndex) => (
            <div key={rowIndex} className={`grid gap-4 lg:gap-6 ${row.length === 1 ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
              {row.map((category) => (
                <div
                  key={category.id}
                  className=" rounded-t-lg overflow-hidden transition-all duration-300"
                >
                  {/* White Header */}
                  <div className="bg-white border-b border-blue-300 text-center py-3 lg:py-4">
                    <h3 className="text-orange-600 font-semibold text-sm lg:text-base">
                      {category.title}
                    </h3>
                  </div>

                  {/* Orange Button */}
                  <button
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 lg:py-3 rounded-b-lg flex justify-center items-center gap-2 transition-all duration-300"
                    onClick={() => toggleCategory(category.id)}
                  >
                    <span className="text-xs lg:text-sm font-medium">Lihat Layanan</span>
                    <ChevronDown 
                      className={`w-4 h-4 transition-all duration-500 ease-in-out transform ${
                        isExpanded(category.id) ? 'rotate-180' : 'rotate-0'
                      }`} 
                    />
                  </button>

                  {/* Expanded Content */}
                  <div 
                    className={`transition-all duration-700 ease-in-out overflow-hidden bg-white ${
                      isExpanded(category.id) 
                        ? 'max-h-screen opacity-100 transform translate-y-0 border-t border-blue-300' 
                        : 'max-h-0 opacity-0 transform -translate-y-4'
                    }`}
                  >
                    <div className={`p-4 lg:p-6 transition-all duration-500 delay-100 ${
                      isExpanded(category.id) ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className={`grid gap-4 lg:gap-6 ${
                        category.isFullWidth && category.services.length > 2
                          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                          : category.services.length > 1
                          ? 'grid-cols-1 lg:grid-cols-2'
                          : 'grid-cols-1'
                      }`}>
                        {category.services.map((service, index) => (
                          <div 
                            key={index} 
                            className="border border-gray-200 rounded-xl p-4 lg:p-6 hover:shadow-lg hover:border-orange-200 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] bg-gray-50 hover:bg-white"
                            style={{
                              animationDelay: `${index * 100}ms`,
                              animation: isExpanded(category.id) ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                            }}
                          >
                            <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-orange-100 rounded-lg lg:rounded-xl flex items-center justify-center flex-shrink-0 transform transition-transform duration-300 hover:scale-110">
                                {getServiceIcon(service.title)}
                              </div>
                              <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-gray-900 text-sm lg:text-base mb-1 lg:mb-2 leading-tight">
                                  {service.title}
                                </h4>
                                <p className="text-gray-600 text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed">
                                  {service.description}
                                </p>
                              </div>
                            </div>
                            
                            <ul className="space-y-1.5 lg:space-y-2 list-none">
                              {service.features.map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-start gap-2 lg:gap-3 text-xs lg:text-sm text-gray-700"
                                >
                                  <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                                  <span className="leading-relaxed">{feature}</span>
                                </li>
                              ))}
                            </ul>

                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">Butuh Konsultasi?</h3>
            <p className="text-base lg:text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Tim ahli kami siap membantu Anda menemukan solusi SDM yang tepat untuk kebutuhan bisnis Anda. 
              Hubungi kami untuk konsultasi gratis.
            </p>
            <button 
              onClick={() => window.open("https://wa.me/6281914710001", "_blank")} 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 lg:px-12 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 text-base lg:text-lg"
            >
              Hubungi Kami Sekarang
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Product;