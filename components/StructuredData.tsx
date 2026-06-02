import { preguntas } from "./FAQ";

const SITE = "https://usamandarina.com";

/**
 * Datos estructurados (JSON-LD) para SEO y GEO. Ayudan a buscadores y a
 * herramientas de IA a entender qué es Mandarina, qué hace y a quién atiende.
 */
export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Mandarina",
        url: SITE,
        logo: `${SITE}/icon.svg`,
        description:
          "Agente de IA que potencia a los equipos de cobranza de empresas que venden a crédito en Venezuela.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+584143201028",
          contactType: "ventas",
          areaServed: "VE",
          availableLanguage: ["Spanish"],
        },
        areaServed: { "@type": "Country", name: "Venezuela" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        url: SITE,
        name: "Mandarina",
        inLanguage: "es-VE",
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@type": "Service",
        "@id": `${SITE}/#service`,
        name: "Cobranza y conciliación de pagos con un agente de IA",
        serviceType: "Automatización de cobranza y conciliación de pagos",
        provider: { "@id": `${SITE}/#organization` },
        areaServed: { "@type": "Country", name: "Venezuela" },
        description:
          "Un agente de IA persigue los vencidos por WhatsApp, lee las capturas de pago (pago móvil, Zelle, transferencia, dólares) y concilia cada pago contra su factura, manejando pagos parciales, varios bancos, tasa Bs/USD y retenciones. Potencia al equipo de cobranza; no lo reemplaza.",
        audience: {
          "@type": "BusinessAudience",
          name: "Empresas B2B que venden a crédito: consumo masivo, repuestos y ferretería, equipos y tecnología",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        mainEntity: preguntas.map((p) => ({
          "@type": "Question",
          name: p.q,
          acceptedAnswer: { "@type": "Answer", text: p.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
