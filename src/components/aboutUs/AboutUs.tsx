"use client";

import React from 'react';
import Image from 'next/image';

interface ClientLogo {
  name: string;
  logo: string;
}

const AboutUs: React.FC = () => {
  const clientLogos: ClientLogo[] = [
    { name: 'GoTo', logo: '/ourClients/colorVersion/goto.svg' },
    { name: 'Trevo', logo: '/ourClients/colorVersion/trevo.svg' },
    { name: 'Pokphand', logo: '/ourClients/colorVersion/pokphand.svg' },
    { name: 'Nabati', logo: '/ourClients/colorVersion/nabati.svg' },
    { name: 'Summarecon', logo: '/ourClients/colorVersion/summarecon.svg' }
  ];

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between text-justify items-center mb-12">
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Tentang Kami</h2>
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              Mitra Dalas Akarswasta (MDA) adalah penyedia tenaga kerja dan outsourcing yang 
              didirikan pada tahun 2025 di Bandung. Tujuan kami adalah menjadi mitra strategis dalam 
              membantu kebutuhan perusahaan akan SDM yang berkualitas dan kompeten.
            </p>
            <p className="text-gray-600 leading-relaxed max-w-2xl mt-4">
              Kami berkomitmen untuk menyediakan solusi ketenagakerjaan yang inovatif dan efisien, 
              membantu perusahaan agar dapat fokus pada bisnis inti sehingga menghasilkan 
              produktivitas dan efisiensi yang maksimal. Dengan dukungan tim profesional yang 
              kompeten dan standar industri, kami siap mendukung pertumbuhan dan keberlangsungan 
              bisnis dengan menyediakan tenaga kerja yang tepat.
            </p>
          </div>
          <div className="ml-8">
            <Image 
              src="/MDA PARTNER_.svg" 
              alt="MDA Partner Logo" 
              width={350} 
              height={80}
              className="object-contain"
            />
          </div>
        </div>

        {/* Vision and Mission Section */}
        <div className="grid gap-12 mb-16">
          {/* Vision */}
          <div className="flex items-center justify-between gap-6">
              <Image 
                src="/images/woman-shirt-1.svg" 
                alt="Professional Woman" 
                width={200} 
                height={80}
              />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Visi <span className="text-orange-500">MDA Partner</span>
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi partner strategis yang memberikan solusi tenaga kerja profesional dan 
                inovatif untuk mendukung pertumbuhan serta keberlangsungan bisnis di berbagai industri.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Misi <span className="text-orange-500">MDA Partner</span>
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">1. Menyediakan SDM berkualitas dan kompeten sesuai kebutuhan industri.</p>
                <p className="text-gray-600">2. Memberikan layanan ketenagakerjaan yang efisien, inovatif, dan berorientasi pada klien.</p>
                <p className="text-gray-600">3. Mendukung pertumbuhan karir fokus pada tim bisnis melalui pengelolaan SDM yang profesional.</p>
              </div>
            </div>
              <Image 
                src="/images/woman-shirt-2.svg" 
                alt="Professional Man" 
                width={200} 
                height={80}
              />
          </div>
        </div>

        {/* Clients Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Klien Kami</h3>
          <div className="flex justify-center items-center flex-wrap">
            {clientLogos.map((client, index) => (
                <Image 
                  key={index}
                  src={client.logo} 
                  alt={client.name} 
                  width={230} 
                  height={60}
                  className="object-contain scale-125 hover:scale-110 transition-all"
                />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;