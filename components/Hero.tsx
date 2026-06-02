type Fila = {
  factura: string;
  detalle: string;
  estado: string;
  tono: "ok" | "parcial" | "revision";
};

const filas: Fila[] = [
  {
    factura: "Factura 1042",
    detalle: "Pago móvil · Bs · ref. 8841",
    estado: "Conciliado",
    tono: "ok",
  },
  {
    factura: "Factura 0987",
    detalle: "Zelle · USD · abono 2 de 3",
    estado: "Pago parcial",
    tono: "parcial",
  },
  {
    factura: "Factura 1130",
    detalle: "Transferencia · falta retención",
    estado: "Para tu revisión",
    tono: "revision",
  },
];

const estiloEstado: Record<Fila["tono"], string> = {
  ok: "bg-emerald-50 text-emerald-700",
  parcial: "bg-amber-50 text-amber-700",
  revision: "bg-terracota/10 text-terracota-oscuro",
};

function PanelConciliacion() {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-borde bg-white p-5 shadow-[0_10px_40px_-12px_rgba(28,25,23,0.12)]">
        <div className="flex items-center justify-between border-b border-borde pb-3">
          <p className="text-sm font-bold text-carbon">Conciliación de hoy</p>
          <span className="rounded-full bg-arena px-2.5 py-1 text-xs font-medium text-tenue">
            Vista de ejemplo
          </span>
        </div>

        <ul className="divide-y divide-borde">
          {filas.map((fila) => (
            <li
              key={fila.factura}
              className="flex items-center justify-between gap-3 py-3.5"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-carbon">
                  {fila.factura}
                </p>
                <p className="truncate text-xs text-tenue">{fila.detalle}</p>
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                  estiloEstado[fila.tono]
                }`}
              >
                {fila.estado}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-1 border-t border-borde pt-3 text-xs text-tenue">
          El agente resuelve lo claro. Tu equipo solo revisa lo dudoso.
        </p>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section id="inicio" className="scroll-mt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-14 md:pb-28 md:pt-20 lg:grid-cols-2 lg:gap-16">
        <div className="max-w-xl">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-borde bg-arena px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-tenue">
            <span className="h-1.5 w-1.5 rounded-full bg-terracota" aria-hidden="true" />
            Agente de IA para cobranza
          </p>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-carbon sm:text-5xl lg:text-[3.4rem]">
            Cobra más rápido y concilia cada pago,{" "}
            <span className="text-terracota">sin crecer tu equipo</span>.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-tenue">
            Un agente de IA se encarga de perseguir los vencidos, leer las capturas de
            pago y cuadrar las cuentas, para que tu equipo de cobranzas dedique
            su tiempo a lo que de verdad importa.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#empresa-fundadora"
              className="inline-flex items-center justify-center rounded-full bg-terracota px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-terracota-oscuro"
            >
              Cuéntame cómo
            </a>
            <a
              href="https://calendar.app.google/UEFQFLVuHaeTod357"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-borde px-6 py-3.5 text-base font-semibold text-carbon transition-colors hover:border-carbon/30 hover:bg-arena"
            >
              Agenda una conversación
            </a>
          </div>

          <p className="mt-6 text-sm text-tenue">
            Buscamos un grupo pequeño de{" "}
            <a
              href="#empresa-fundadora"
              className="font-medium text-terracota underline decoration-terracota/40 underline-offset-2 transition-colors hover:decoration-terracota"
            >
              empresas fundadoras
            </a>{" "}
            para ajustar el agente a tu proceso real.
          </p>
        </div>

        <PanelConciliacion />
      </div>
    </section>
  );
}
