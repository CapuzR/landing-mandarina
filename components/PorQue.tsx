import Reveal from "./Reveal";

const hoy = [
  {
    titulo: "Consistencia, sin excepción",
    texto:
      "Un equipo se cansa, se enferma, se va de vacaciones. El agente cubre lo que una persona no puede sostener: le escribe a todos, el día exacto, siempre.",
  },
  {
    titulo: "Conciliación al día",
    texto:
      "Lee las capturas y cuadra al instante. Sabes hoy quién pagó, así mañana nadie le cobra a quien ya pagó.",
  },
];

const futuro = [
  {
    titulo: "Memoria y aprendizaje",
    texto:
      "Con el tiempo, el agente recordará cómo paga cada deudor y avisará temprano cuando alguien empiece a atrasarse. Hacia allá vamos, no es lo de hoy.",
  },
  {
    titulo: "Pregúntale a tu cobranza",
    texto:
      "Tu equipo podrá preguntarle al agente en lenguaje natural: quién debe, cuánto, desde cuándo, sin abrir un solo Excel. Hacia allá vamos, no es lo de hoy.",
  },
];

export default function PorQue() {
  return (
    <section className="border-t border-borde/60 bg-arena/40">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Por qué funciona
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              Lo que tu mejor cobrador haría con tiempo infinito.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tenue">
              Consistencia que ninguna persona puede sostener, día tras día.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {hoy.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 80}>
              <article className="h-full rounded-2xl border border-borde bg-crema p-6">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  Disponible hoy
                </span>
                <h3 className="mt-4 text-lg font-bold text-carbon">{item.titulo}</h3>
                <p className="mt-2 leading-relaxed text-tenue">{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {futuro.map((item, i) => (
            <Reveal key={item.titulo} delay={i * 80}>
              <article className="h-full rounded-2xl border border-dashed border-borde p-6">
                <span className="inline-flex items-center rounded-full bg-arena px-2.5 py-1 text-xs font-semibold text-tenue">
                  Más adelante
                </span>
                <h3 className="mt-4 text-lg font-bold text-carbon">
                  {item.titulo}
                </h3>
                <p className="mt-2 leading-relaxed text-tenue">{item.texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
