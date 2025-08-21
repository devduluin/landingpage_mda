import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Profile - MDA Partner",
  description: "Lihat Company Profile resmi dari MDA Partner.",
};

export default function CompanyProfileViewer() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        border: "none",
        overflow: "hidden",
      }}
    >
      <iframe
        src="/mda-compro/MDA Partner Company Profile_New Update.pdf"
        style={{ width: "100%", height: "100%", border: "none" }}
        title="MDA Partner Company Profile"
      />
    </div>
  );
}
