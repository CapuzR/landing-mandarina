import Reveal from "./Reveal";
import type { SVGProps } from "react";

function IconBase(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
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

const IconRecibe = () => (
  <IconBase>
    <path d="M22 12h-6l-2 3h-4l-2-3H2" />
    <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
  </IconBase>
);

const IconCobra = () => (
  <IconBase>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </IconBase>
);

const IconLee = () => (
  <IconBase>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" />
    <path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
    <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <path d="M7 8h8" />
    <path d="M7 12h10" />
    <path d="M7 16h6" />
  </IconBase>
);

const IconConcilia = () => (
  <IconBase>
    <path d="M8 3 4 7l4 4" />
    <path d="M4 7h16" />
    <path d="m16 21 4-4-4-4" />
    <path d="M20 17H4" />
  </IconBase>
);

const IconActualiza = () => (
  <IconBase>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </IconBase>
);

const IconHistorial = () => (
  <IconBase>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconBase>
);

const pasos = [
  {
    n: "01",
    titulo: "Recibe",
    texto: "Arma el libro de deudas con tus facturas y sus vencimientos. Adiós al Excel a mano.",
    Icono: IconRecibe,
  },
  {
    n: "02",
    titulo: "Cobra",
    texto: "Detecta los vencidos y escribe por WhatsApp, subiendo el tono según la mora. Todos los días.",
    Icono: IconCobra,
  },
  {
    n: "03",
    titulo: "Lee",
    texto: "Lee las capturas (pago móvil, Zelle, transferencia, USD) y saca monto, banco, referencia y fecha.",
    Icono: IconLee,
  },
  {
    n: "04",
    titulo: "Concilia",
    texto: "Cruza cada pago con su factura: parciales, varios bancos, tasa Bs/USD y retenciones.",
    Icono: IconConcilia,
  },
  {
    n: "05",
    titulo: "Actualiza",
    texto: "Pone el libro al día y te escala solo las excepciones que necesitan tu decisión.",
    Icono: IconActualiza,
  },
  {
    n: "06",
    titulo: "Historial",
    texto: "Guarda el historial de pago de cada deudor, listo para consultar.",
    Icono: IconHistorial,
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="scroll-mt-24">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal>
          <div className="max-w-2xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Cómo funciona
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-carbon sm:text-4xl">
              El agente toma el trabajo pesado, de principio a fin.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-tenue">
              Tu equipo deja de hacerlo a mano: supervisa y decide.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {pasos.map((paso, i) => {
            const { Icono } = paso;
            return (
              <Reveal key={paso.n} delay={(i % 3) * 80} className="h-full">
                <article className="group h-full rounded-2xl border border-borde bg-arena/40 p-6 transition-colors hover:border-terracota/40">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-crema text-terracota">
                      <Icono />
                    </span>
                    <span className="text-sm font-bold tracking-widest text-tenue/70">
                      {paso.n}
                    </span>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-carbon">
                    {paso.titulo}
                  </h3>
                  <p className="mt-2 leading-relaxed text-tenue">{paso.texto}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
