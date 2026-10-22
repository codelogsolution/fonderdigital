import { ImageResponse } from "next/og";

export const alt = "FonderDigital — Digital Marketing & Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "76px",
          color: "#fdfcfa",
          background: "linear-gradient(135deg, #17130f 0%, #302117 60%, #713b20 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 700 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "#c2410c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, fontWeight: 800 }}>F</div>
          <div style={{ display: "flex" }}>FonderDigital</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 70, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>
            Digital marketing<br />&amp; development
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#ead9cc" }}>
            Websites · Apps · SEO · Branding
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#dfb99e" }}>www.fonderdigital.com</div>
      </div>
    ),
    { ...size },
  );
}
