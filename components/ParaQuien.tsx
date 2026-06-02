import Reveal from "./Reveal";

const tipos = [
  {
    titulo: "Consumo masivo",
    texto: "Alimentos, bebidas, limpieza, cuidado personal.",
  },
  {
    titulo: "Repuestos y ferretería",
    texto: "Autopartes, industrial, materiales de construcción.",
  },
  {
    titulo: "Equipos y tecnología",
    texto: "Electrónica, electrodomésticos, insumos médicos.",
  },
];

const requisitos = [
  "Vendes a crédito a otros negocios, no al consumidor final.",
  "Cobras por pago móvil, Zelle, transferencia o efectivo, en Bs y USD.",
  "Tienes a alguien dedicado a cobrar, aunque sea una persona o tú mismo.",
  "Tu cartera es lo bastante grande como para que cobrar a tiempo duela cuando se escapa.",
];

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-terracota"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

export default function ParaQuien() {
  return (
    <section
      id="para-quien"
      className="scroll-mt-24 border-t border-borde/60 bg-arena/40"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Para quién es
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              Hecho para empresas que venden a crédito y ya tienen quién cobre.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tenue">
              Negocios B2B con cartera amplia y un equipo que ya se dedica a
              cobrar. Si vendes a crédito a otras empresas, hablamos tu idioma.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {tipos.map((tipo, i) => (
            <Reveal key={tipo.titulo} delay={i * 80}>
              <article className="h-full rounded-2xl border border-borde bg-crema p-6">
                <h3 className="text-lg font-bold text-carbon">{tipo.titulo}</h3>
                <p className="mt-2 leading-relaxed text-tenue">{tipo.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-6 rounded-2xl border border-borde bg-crema p-6 md:p-8">
            <h3 className="text-lg font-bold text-carbon">Encajas si...</h3>
            <ul className="mt-4 grid gap-3.5 sm:grid-cols-2">
              {requisitos.map((req) => (
                <li key={req} className="flex gap-3 leading-relaxed text-tenue">
                  <Check />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
