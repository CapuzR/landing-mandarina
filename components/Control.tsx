import Reveal from "./Reveal";
import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    />
  );
}

const IconAprueba = () => (
  <IconBase>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </IconBase>
);

const IconPersonas = () => (
  <IconBase>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="m16 11 2 2 4-4" />
  </IconBase>
);

const IconRastro = () => (
  <IconBase>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </IconBase>
);

const IconNivel = () => (
  <IconBase>
    <line x1="21" x2="14" y1="4" y2="4" />
    <line x1="10" x2="3" y1="4" y2="4" />
    <line x1="21" x2="12" y1="12" y2="12" />
    <line x1="8" x2="3" y1="12" y2="12" />
    <line x1="21" x2="16" y1="20" y2="20" />
    <line x1="12" x2="3" y1="20" y2="20" />
    <line x1="14" x2="14" y1="2" y2="6" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="16" x2="16" y1="18" y2="22" />
  </IconBase>
);

const puntos = [
  {
    titulo: "El agente propone, tu equipo aprueba",
    texto: "Nada se cobra ni se da por cuadrado sin que alguien lo confirme.",
    Icono: IconAprueba,
  },
  {
    titulo: "Le quita lo pesado, no el control",
    texto:
      "Se lleva lo repetitivo. Tu equipo se queda con las decisiones y la relación con el cliente.",
    Icono: IconPersonas,
  },
  {
    titulo: "Todo queda con su rastro",
    texto: "Cada cobro, captura y conciliación queda registrado y listo para auditar.",
    Icono: IconRastro,
  },
  {
    titulo: "Tú pones el nivel de control",
    texto:
      "Arranca con todo supervisado y le das más cancha cuando ya lo viste funcionar. Unas empresas dejan que resuelva lo rutinario solo; otras revisan cada paso. Tú mandas.",
    Icono: IconNivel,
  },
];

export default function Control() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="max-w-lg lg:sticky lg:top-28">
              <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
                <span className="h-px w-6 bg-terracota" aria-hidden="true" />
                Tú tienes el control
              </p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
                Tu equipo mantiene la última palabra.
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-tenue">
                Con el dinero nadie quiere soltar el control. Por eso tú decides
                cuánto resuelve el agente solo y cuánto pasa por tu equipo.
              </p>
            </div>
          </Reveal>

          <div className="space-y-4">
            {puntos.map((punto, i) => {
              const { Icono } = punto;
              return (
                <Reveal key={punto.titulo} delay={i * 90}>
                  <article className="flex gap-4 rounded-2xl border border-borde bg-arena/40 p-6">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-crema text-terracota">
                      <Icono />
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-carbon">
                        {punto.titulo}
                      </h3>
                      <p className="mt-1.5 leading-relaxed text-tenue">
                        {punto.texto}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
