import Reveal from "./Reveal";

const dolores = [
  {
    titulo: "Perseguir uno por uno",
    texto:
      "Los mismos clientes y las mismas excusas, mes tras mes. Todo a mano, cliente por cliente.",
  },
  {
    titulo: "Descifrar capturas",
    texto:
      "Capturas que llegan por WhatsApp, de varios bancos y a cualquier hora. Alguien las abre y transcribe.",
  },
  {
    titulo: "Cuadrar a mano",
    texto:
      "Pagos parciales, bolívares y dólares, tasas que cambian. Cada pago, cruzado a mano contra su factura.",
  },
  {
    titulo: "Cabos sueltos",
    texto:
      "Retenciones que faltan, referencias repetidas y un Excel que nunca termina de estar al día.",
  },
];

const consecuencias = [
  {
    titulo: "Ventas vendiendo menos",
    texto:
      "Tus vendedores terminan persiguiendo pagos en vez de cerrar ventas. Cada hora en cobranza es una hora que no factura.",
  },
  {
    titulo: "Tu mejor gente en lo mecánico",
    texto:
      "El equipo de cobranza gasta el día en transcribir y cuadrar, cuando deberían estar sobre los casos que de verdad necesitan mano firme.",
  },
  {
    titulo: "El dinero entra tarde",
    texto:
      "Mientras un pago no se concilia, no es tuyo de verdad. Cada día de demora es flujo de caja que no tienes.",
  },
];

export default function Problema() {
  return (
    <section className="border-t border-borde/60 bg-arena/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              El problema
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              El día de tu equipo se va en lo repetitivo.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tenue">
              Cobrar a crédito es trabajo de hormiga. Antes de lo importante, tu
              equipo repite cada día lo mismo:
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {dolores.map((dolor, i) => (
            <Reveal key={dolor.titulo} delay={i * 80}>
              <article className="h-full rounded-2xl border border-borde bg-crema p-6">
                <h3 className="text-lg font-bold text-carbon">{dolor.titulo}</h3>
                <p className="mt-2 leading-relaxed text-tenue">{dolor.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-16 text-xl font-bold tracking-tight text-carbon sm:text-2xl">
            Y mientras tanto, esto te cuesta dinero:
          </p>
        </Reveal>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
          {consecuencias.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 80}>
              <div className="border-t border-borde pt-5">
                <h3 className="text-base font-bold text-terracota">
                  {item.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-carbon">{item.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
