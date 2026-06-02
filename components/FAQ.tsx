import Reveal from "./Reveal";

export const preguntas = [
  {
    q: "¿Qué es Mandarina?",
    a: "Mandarina es un agente de IA que potencia a tu equipo de cobranzas. Persigue los vencidos por WhatsApp, lee las capturas de pago y concilia las cuentas, para que tu equipo dedique su tiempo a las decisiones, no al trabajo repetitivo.",
  },
  {
    q: "¿Mandarina reemplaza a mi equipo de cobranza?",
    a: "No, lo potencia. El agente hace el trabajo repetitivo y propone; tu equipo aprueba y mantiene la última palabra. Tú decides cuánto resuelve el agente solo y cuánto pasa por tu equipo.",
  },
  {
    q: "¿Con qué medios de pago funciona?",
    a: "Lee capturas de pago móvil, Zelle, transferencias y dólares, y extrae monto, banco, referencia y fecha. Maneja pagos parciales, varios bancos, la tasa Bs/USD y las retenciones.",
  },
  {
    q: "¿Para qué empresas es?",
    a: "Para negocios B2B en Venezuela que venden a crédito a otros negocios y ya tienen quién cobre. Rubros típicos: consumo masivo, repuestos y ferretería, y equipos y tecnología.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Una tarifa estable y predecible: una parte fija y otra que crece con tu operación, sin saltos por la inflación ni el dólar. Estamos afinando los números con las empresas fundadoras.",
  },
  {
    q: "¿Cómo empiezo?",
    a: "Postúlate como empresa fundadora en el formulario, escríbenos por WhatsApp al +58 414 320 1028 o agenda una conversación. Buscamos un grupo pequeño de empresas para construir el agente sobre su proceso real.",
  },
];

export default function FAQ() {
  return (
    <section
      id="preguntas"
      className="scroll-mt-24 border-t border-borde/60 bg-arena/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Preguntas frecuentes
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              Lo que más nos preguntan.
            </h2>
          </div>
        </Reveal>

        <dl className="mx-auto mt-12 grid max-w-3xl gap-5">
          {preguntas.map((item, i) => (
            <Reveal key={item.q} delay={(i % 2) * 80}>
              <div className="rounded-2xl border border-borde bg-crema p-6">
                <dt className="text-lg font-bold text-carbon">{item.q}</dt>
                <dd className="mt-2 leading-relaxed text-tenue">{item.a}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
