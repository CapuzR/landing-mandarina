"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";

// Worker propio (Resend) que envía el correo del formulario. Es el mismo Worker
// que usa la calculadora; ver landing/worker/. Sin esta URL no se puede enviar.
const WORKER_URL = process.env.NEXT_PUBLIC_FORMS_WORKER_URL ?? "";

type Formulario = {
  nombre: string;
  empresa: string;
  contacto: string;
  reto: string;
};

type Estado = "idle" | "enviando" | "ok" | "error";

const inicial: Formulario = { nombre: "", empresa: "", contacto: "", reto: "" };

const recibes = [
  "Uso gratis mientras lo construimos y validamos contigo.",
  "Después, precio simbólico y, al abrir, precio preferencial de fundador.",
  "El agente ajustado a tu forma de cobrar.",
  "Línea directa con quien lo construye y prioridad.",
];

const pedimos = [
  "Usarlo de verdad y decirnos qué sirve y qué no.",
  "Compartir tus casos reales.",
  "Retarnos: si algo se puede hacer mejor, lo construimos contigo.",
];

export default function EmpresaFundadora() {
  const [form, setForm] = useState<Formulario>(inicial);
  const [estado, setEstado] = useState<Estado>("idle");

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (estado === "enviando") return;

    // Honeypot anti-spam: si el campo oculto viene lleno es un bot. Fingimos
    // éxito y no enviamos nada.
    const formData = new FormData(e.currentTarget);
    if (formData.get("botcheck")) {
      setEstado("ok");
      return;
    }

    if (!WORKER_URL) {
      setEstado("error");
      return;
    }

    setEstado("enviando");
    try {
      const res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "empresa_fundadora", ...form }),
      });
      const data = await res.json().catch(() => ({}));
      setEstado(res.ok && data.ok ? "ok" : "error");
    } catch {
      setEstado("error");
    }
  }

  return (
    <section id="empresa-fundadora" className="scroll-mt-24 bg-carbon">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Argumento */}
          <div className="max-w-xl">
            <p className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-crema/60">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Empresa fundadora
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-crema sm:text-4xl">
              Estamos eligiendo a las primeras empresas.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-crema/70">
              Un grupo pequeño para construir Mandarina juntos. Trato de fundador
              a cambio de construirlo con nosotros.
            </p>

            <div className="mt-8 space-y-8">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-crema/50">
                  Lo que recibes
                </h3>
                <ul className="mt-4 space-y-3">
                  {recibes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-crema/85">
                      <Check />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-crema/50">
                  Lo que pedimos
                </h3>
                <ul className="mt-4 space-y-3">
                  {pedimos.map((item) => (
                    <li key={item} className="flex gap-2.5 text-crema/85">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300"
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="rounded-2xl border border-borde bg-crema p-6 md:p-8">
            {estado === "ok" ? (
              <div
                role="status"
                aria-live="polite"
                className="flex h-full flex-col items-center justify-center py-8 text-center"
              >
                <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-terracota/10 text-terracota">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                </span>
                <h3 className="mt-5 text-xl font-bold text-carbon">
                  ¡Gracias por tu interés!
                </h3>
                <p className="mt-2 max-w-sm leading-relaxed text-tenue">
                  Recibimos tus datos. Te escribimos pronto para conversar.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-carbon">
                  Déjanos tus datos
                </h3>
                <p className="mt-1.5 text-sm text-tenue">
                  Te contactamos por WhatsApp o correo. No compartimos tus datos.
                </p>

                {/* Honeypot anti-spam: oculto para humanos, lo llenan los bots */}
                <input
                  type="checkbox"
                  name="botcheck"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: "none" }}
                />

                <div className="mt-6 space-y-4">
                  <Campo
                    id="nombre"
                    name="nombre"
                    label="Nombre y apellido"
                    value={form.nombre}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                  <Campo
                    id="empresa"
                    name="empresa"
                    label="Empresa"
                    value={form.empresa}
                    onChange={handleChange}
                    autoComplete="organization"
                    required
                  />
                  <Campo
                    id="contacto"
                    name="contacto"
                    label="WhatsApp o correo"
                    value={form.contacto}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />

                  <div>
                    <label
                      htmlFor="reto"
                      className="block text-sm font-semibold text-carbon"
                    >
                      ¿Qué te quita más tiempo hoy al cobrar y cuadrar pagos?
                    </label>
                    <textarea
                      id="reto"
                      name="reto"
                      value={form.reto}
                      onChange={handleChange}
                      rows={3}
                      className="mt-1.5 w-full rounded-lg border border-borde-fuerte bg-white px-4 py-3 text-carbon outline-none transition-colors placeholder:text-tenue/80 focus:border-terracota focus:ring-2 focus:ring-terracota/30"
                      placeholder="En una o dos frases."
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={estado === "enviando"}
                  className="mt-6 w-full rounded-full bg-terracota px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-terracota-oscuro disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {estado === "enviando"
                    ? "Enviando..."
                    : "Quiero ser empresa fundadora"}
                </button>

                {estado === "error" && (
                  <p
                    role="alert"
                    className="mt-3 text-center text-sm font-medium text-terracota-oscuro"
                  >
                    No se pudo enviar. Intenta de nuevo o escríbenos por WhatsApp.
                  </p>
                )}

                <p className="mt-3 text-center text-sm text-tenue">
                  ¿Prefieres directo?{" "}
                  <a
                    href="https://wa.me/584143201028?text=Hola%2C%20me%20interesa%20Mandarina%20para%20mi%20cobranza."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-terracota underline decoration-terracota/40 underline-offset-2 transition-colors hover:decoration-terracota"
                  >
                    Escríbenos por WhatsApp
                  </a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

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
      className="mt-0.5 shrink-0 text-orange-300"
    >
      <path d="m5 12 5 5L20 7" />
    </svg>
  );
}

type CampoProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  required?: boolean;
};

function Campo({
  id,
  name,
  label,
  value,
  onChange,
  autoComplete,
  required,
}: CampoProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-carbon">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        className="mt-1.5 w-full rounded-lg border border-borde-fuerte bg-white px-4 py-3 text-carbon outline-none transition-colors placeholder:text-tenue/80 focus:border-terracota focus:ring-2 focus:ring-terracota/30"
      />
    </div>
  );
}
