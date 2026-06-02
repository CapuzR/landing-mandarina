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

const IconTarifa = () => (
  <IconBase>
    <path d="M12.59 2.59A2 2 0 0 0 11.17 2H4a2 2 0 0 0-2 2v7.17a2 2 0 0 0 .59 1.42l8.7 8.7a2.43 2.43 0 0 0 3.42 0l6.58-6.58a2.43 2.43 0 0 0 0-3.42z" />
    <circle cx="7.5" cy="7.5" r="1.25" />
  </IconBase>
);

const IconEstable = () => (
  <IconBase>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </IconBase>
);

const IconRinde = () => (
  <IconBase>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="5" />
    <circle cx="12" cy="12" r="1.25" />
  </IconBase>
);

const principios = [
  {
    titulo: "Sin sorpresas",
    texto:
      "Una parte fija y otra que crece con tu operación. Todo calculable de antemano, nunca un salto que no viste venir.",
    Icono: IconTarifa,
  },
  {
    titulo: "Predecible aunque todo se mueva",
    texto:
      "En un país donde todo sube, tu costo no se dispara con la inflación ni con el dólar. Lo puedes planificar.",
    Icono: IconEstable,
  },
  {
    titulo: "Pensado para que rinda",
    texto: "Que tener la cobranza al día cueste menos de lo que te hace ganar.",
    Icono: IconRinde,
  },
];

export default function Precio() {
  return (
    <section id="precio" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Precio
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              Un precio estable y predecible.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tenue">
              Estamos afinando los números con las empresas fundadoras. La
              lógica no cambia:
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principios.map((principio, i) => {
            const { Icono } = principio;
            return (
              <Reveal key={principio.titulo} delay={i * 80}>
                <article className="h-full rounded-2xl border border-borde bg-arena/50 p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crema text-terracota">
                    <Icono />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-carbon">
                    {principio.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-tenue">
                    {principio.texto}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
