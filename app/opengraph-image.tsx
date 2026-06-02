import { ImageResponse } from "next/og";

export const alt =
  "Mandarina: cobra más rápido y concilia cada pago, sin crecer tu equipo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// La marca (mismos gajos que el logo), embebida como data URI para Satori.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#c2410c"><path d="M 44.99 35.86 L 34.98 7.58 A 45 45 0 0 1 65.02 7.58 L 55.01 35.86 A 15 15 0 0 0 44.99 35.86 Z"/><path d="M 56.46 36.46 L 69.37 9.38 A 45 45 0 0 1 90.62 30.63 L 63.54 43.54 A 15 15 0 0 0 56.46 36.46 Z"/><path d="M 64.14 44.99 L 92.42 34.98 A 45 45 0 0 1 92.42 65.02 L 64.14 55.01 A 15 15 0 0 0 64.14 44.99 Z"/><path d="M 63.54 56.46 L 90.62 69.37 A 45 45 0 0 1 69.37 90.62 L 56.46 63.54 A 15 15 0 0 0 63.54 56.46 Z"/><path d="M 55.01 64.14 L 65.02 92.42 A 45 45 0 0 1 34.98 92.42 L 44.99 64.14 A 15 15 0 0 0 55.01 64.14 Z"/><path d="M 43.54 63.54 L 30.63 90.62 A 45 45 0 0 1 9.38 69.37 L 36.46 56.46 A 15 15 0 0 0 43.54 63.54 Z"/><path d="M 35.86 55.01 L 7.58 65.02 A 45 45 0 0 1 7.58 34.98 L 35.86 44.99 A 15 15 0 0 0 35.86 55.01 Z"/><path d="M 36.46 43.54 L 9.38 30.63 A 45 45 0 0 1 30.63 9.38 L 43.54 36.46 A 15 15 0 0 0 36.46 43.54 Z"/><circle cx="50" cy="50" r="7"/></g></svg>`;

export default function Image() {
  const mark = `data:image/svg+xml;utf8,${encodeURIComponent(MARK)}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#faf6ef",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} width="64" height="64" alt="" />
          <div style={{ display: "flex", fontSize: 40, fontWeight: 700, color: "#1c1917" }}>
            Mandarina
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "72px",
              height: "8px",
              backgroundColor: "#c2410c",
              borderRadius: "9999px",
              marginBottom: "28px",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: 62,
              fontWeight: 800,
              color: "#1c1917",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              maxWidth: "1000px",
            }}
          >
            Cobra más rápido y concilia cada pago, sin crecer tu equipo.
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#574f48",
              marginTop: "24px",
            }}
          >
            Un agente de IA para tu equipo de cobranzas.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 24,
            color: "#574f48",
          }}
        >
          <div style={{ display: "flex", fontWeight: 600 }}>usamandarina.com</div>
          <div style={{ display: "flex" }}>Cobranza y conciliación de pagos</div>
        </div>
      </div>
    ),
    size
  );
}
