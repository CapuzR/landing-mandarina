import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://usamandarina.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Mandarina · Cobra más rápido y concilia cada pago, sin crecer tu equipo",
    template: "%s · Mandarina",
  },
  description:
    "Mandarina es un agente de IA que potencia a tu equipo de cobranzas: persigue los vencidos por WhatsApp, lee las capturas de pago y concilia las cuentas, sin crecer la nómina. Para empresas que venden a crédito en Venezuela.",
  applicationName: "Mandarina",
  keywords: [
    "cobranza",
    "conciliación de pagos",
    "agente de IA",
    "agente de cobranza",
    "automatización de cobranza",
    "cuentas por cobrar",
    "pago móvil",
    "Zelle",
    "PyME",
    "Venezuela",
  ],
  authors: [{ name: "Mandarina" }],
  creator: "Mandarina",
  publisher: "Mandarina",
  category: "business",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_VE",
    url: SITE_URL,
    siteName: "Mandarina",
    title:
      "Mandarina · Cobra más rápido y concilia cada pago, sin crecer tu equipo",
    description:
      "Un agente de IA que potencia a tu equipo de cobranzas: persigue los vencidos, lee las capturas de pago y concilia las cuentas, sin crecer la nómina.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mandarina · Cobra más rápido y concilia cada pago",
    description:
      "Un agente de IA que potencia a tu equipo de cobranzas: cobra los vencidos, lee las capturas de pago y concilia las cuentas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={jakarta.variable} suppressHydrationWarning>
      <body className="antialiased">
        {/* Marca que JS está activo antes de pintar, para animar sin parpadeos */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js');",
          }}
        />
        {children}
      </body>
    </html>
  );
}
