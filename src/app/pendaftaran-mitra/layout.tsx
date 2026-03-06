import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pendaftaran Mitra Driver - MDA Partner | Bergabung Bersama Kami",
  description: "Daftar sebagai mitra driver profesional MDA Partner. Dapatkan kesempatan kerja yang lebih baik dengan benefit menarik. Syarat mudah, proses cepat. Daftar sekarang!",
  keywords: [
    "pendaftaran mitra driver",
    "lowongan driver",
    "daftar driver mda",
    "mitra driver profesional",
    "kerja driver",
    "recruitment driver",
    "pendaftaran driver",
    "lowongan mitra",
    "join mda partner",
  ],
  alternates: {
    canonical: "/pendaftaran-mitra",
  },
  openGraph: {
    title: "Pendaftaran Mitra Driver - MDA Partner | Bergabung Bersama Kami",
    description: "Daftar sebagai mitra driver profesional MDA Partner. Dapatkan kesempatan kerja yang lebih baik dengan benefit menarik.",
    url: "https://mitradaksa.com/pendaftaran-mitra",
    type: "website",
    images: [
      {
        url: "/MDAP_LOGO_WHITE.svg",
        width: 1200,
        height: 630,
        alt: "MDA Partner - Pendaftaran Mitra",
      },
    ],
  },
};

export default function PendaftaranMitraLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
