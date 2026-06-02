import { LogoMark } from "@/components/Logo";

const deudas = [
  { cliente: "Distribuidora Andina", usd: "$1.240", bs: "Bs 45.260", estado: "Al día", tono: "ok" },
  { cliente: "Comercial El Trébol", usd: "$860", bs: "Bs 31.390", estado: "Vencido 6 d", tono: "warn" },
  { cliente: "Inversiones Caroní", usd: "$2.100", bs: "Bs 76.650", estado: "Vencido 12 d", tono: "late" },
];

const chipEstado: Record<string, string> = {
  ok: "bg-emerald-50 text-emerald-700",
  warn: "bg-amber-50 text-amber-700",
  late: "bg-terracota/10 text-terracota-oscuro",
};

function CardTitulo({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-tenue/80">
      {children}
    </p>
  );
}

export default function PhoneMockup() {
  return (
    <div className="flex justify-center lg:sticky lg:top-10">
      <div className="w-full max-w-[330px] rounded-[2.6rem] border border-borde bg-carbon p-2.5 shadow-[0_30px_60px_-25px_rgba(28,25,23,0.45)]">
        <div className="overflow-hidden rounded-[2.1rem] bg-crema">
          {/* Barra de app */}
          <div className="flex items-center justify-between border-b border-borde px-4 py-3">
            <span className="inline-flex items-center gap-2">
              <LogoMark size={20} />
              <span className="text-sm font-extrabold tracking-tight text-carbon">
                Mandarina
              </span>
            </span>
            <span className="rounded-full bg-arena px-2 py-0.5 text-[10px] font-semibold text-tenue">
              Cobranza
            </span>
          </div>

          <div className="space-y-3 p-4">
            {/* Card: Libro de deudas */}
            <div className="rounded-2xl border border-borde bg-white p-3.5">
              <CardTitulo>Libro de deudas</CardTitulo>
              <ul className="divide-y divide-borde">
                {deudas.map((d) => (
                  <li key={d.cliente} className="flex items-center justify-between gap-2 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-carbon">{d.cliente}</p>
                      <p className="text-[11px] text-tenue">
                        {d.usd} · {d.bs}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${chipEstado[d.tono]}`}>
                      {d.estado}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card: WhatsApp */}
            <div className="rounded-2xl border border-borde bg-white p-3.5">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                <CardTitulo>WhatsApp · El Trébol</CardTitulo>
              </div>
              <div className="space-y-2">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-terracota/10 px-3 py-2">
                  <p className="text-[11px] leading-snug text-carbon">
                    Hola, le recordamos el saldo de la factura 0987 por $860, vencida hace 6 días. ¿Coordinamos el pago esta semana?
                  </p>
                  <p className="mt-1 text-right text-[9px] text-tenue">
                    9:14 a. m. <span className="text-emerald-500">✓✓</span>
                  </p>
                </div>
                <div className="mr-auto max-w-[85%] rounded-2xl rounded-tl-sm bg-arena px-3 py-2">
                  <p className="text-[11px] leading-snug text-carbon">
                    Mañana le paso la captura del pago móvil.
                  </p>
                </div>
              </div>
            </div>

            {/* Card: Conciliación */}
            <div className="rounded-2xl border border-borde bg-white p-3.5">
              <CardTitulo>Conciliación</CardTitulo>
              <p className="text-[11px] font-medium text-carbon">Captura de pago leída</p>
              <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1.5">
                {[
                  ["Monto", "$860 · Bs 31.390"],
                  ["Banco", "Banesco"],
                  ["Referencia", "004471"],
                  ["Fecha", "02/06"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <p className="text-[9px] uppercase tracking-wide text-tenue/70">{k}</p>
                    <p className="text-[11px] font-semibold text-carbon">{v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 border-t border-borde pt-2 text-[11px] text-tenue">
                Cruzado con <span className="font-semibold text-carbon">Factura 0987</span>
              </p>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="rounded-full bg-terracota/10 px-2 py-0.5 text-[10px] font-semibold text-terracota-oscuro">
                  Conciliado · pendiente de tu aprobación
                </span>
              </div>
              <div className="mt-2.5 flex gap-2">
                <span className="flex-1 rounded-lg bg-terracota px-2 py-1.5 text-center text-[11px] font-semibold text-white">
                  Aprobar
                </span>
                <span className="rounded-lg border border-borde px-2 py-1.5 text-center text-[11px] font-semibold text-tenue">
                  Revisar
                </span>
              </div>
            </div>

            <p className="px-1 pb-1 text-center text-[10px] text-tenue">
              El agente propone, tú apruebas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
