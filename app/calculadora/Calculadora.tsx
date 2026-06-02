"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import PhoneMockup from "./PhoneMockup";
import { calcular, fmtUSD, fmtFTE, type Inputs } from "./calc";

// ============================================================
// Pega aquí la URL del Worker desplegado (ver worker/README.md).
// Mientras tenga el placeholder, los resultados se muestran igual;
// solo no se intenta enviar el correo.
// ============================================================
const WORKER_URL = "https://mandarina-calculadora.TU-SUBDOMINIO.workers.dev";
const WORKER_CONFIGURADO =
  WORKER_URL.startsWith("https://") && !WORKER_URL.includes("TU-SUBDOMINIO");

const WHATSAPP = "https://wa.me/584143201028";
const AGENDA = "https://calendar.app.google/UEFQFLVuHaeTod357";

const emailValido = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim());

type Errores = { email?: string; acepta?: string; costo?: string };

export default function Calculadora() {
  // Inputs primarios
  const [personas, setPersonas] = useState(2);
  const [costoPersona, setCostoPersona] = useState(""); // vacío a propósito
  const [pctManual, setPctManual] = useState(40);
  const [autonomia, setAutonomia] = useState(50);
  // Inputs secundarios (cash)
  const [cartera, setCartera] = useState(50000);
  const [diasHoy, setDiasHoy] = useState(60);
  const [diasObjetivo, setDiasObjetivo] = useState(45);
  // Contacto
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [acepta, setAcepta] = useState(false);
  // Estado
  const [calculado, setCalculado] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [envio, setEnvio] = useState<"idle" | "ok" | "error">("idle");
  const [copiado, setCopiado] = useState(false);

  const inputs: Inputs = {
    personas,
    costoPersona: Number(costoPersona) || 0,
    pctManual,
    autonomia,
    cartera,
    diasHoy,
    diasObjetivo,
  };
  const r = calcular(inputs);

  function handleCalcular() {
    const errs: Errores = {};
    if (!emailValido(email)) errs.email = "Ingresa un correo válido.";
    if (!acepta) errs.acepta = "Marca la casilla para continuar.";
    if (!(Number(costoPersona) > 0))
      errs.costo = "Ingresa el costo aproximado por persona.";
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;

    // Resultados al instante, sin esperar la red.
    setCalculado(true);

    if (!WORKER_CONFIGURADO) return;
    setEnvio("idle");
    const body = {
      nombre,
      empresa,
      email,
      costo_mensual: r.costoMensual,
      heroe_mensual: r.heroeMensual,
      heroe_anual: r.heroeAnual,
      fte_liberado: r.fteLiberado,
      cash_bajo: r.cashBajo,
      cash_alto: r.cashAlto,
      nivel_autonomia: autonomia,
      inputs: {
        personas,
        costo_persona: Number(costoPersona) || 0,
        pct_manual: pctManual,
        cartera,
        dias_hoy: diasHoy,
        dias_objetivo: diasObjetivo,
      },
    };
    fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => setEnvio(res.ok ? "ok" : "error"))
      .catch(() => setEnvio("error"));
  }

  function handleReset() {
    setPersonas(2);
    setCostoPersona("");
    setPctManual(40);
    setAutonomia(50);
    setCartera(50000);
    setDiasHoy(60);
    setDiasObjetivo(45);
    setNombre("");
    setEmpresa("");
    setEmail("");
    setAcepta(false);
    setCalculado(false);
    setErrores({});
    setEnvio("idle");
  }

  async function handleCopiar() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="min-h-screen">
      {/* Barra superior */}
      <header className="border-b border-borde bg-crema/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" aria-label="Mandarina, inicio">
            <Logo />
          </Link>
          <span className="text-xs font-semibold uppercase tracking-wider text-tenue">
            Exploración de alianza
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Panel izquierdo: mockup (debajo en móvil) */}
          <div className="order-2 lg:order-1">
            <PhoneMockup />
          </div>

          {/* Panel derecho: calculadora */}
          <div className="order-1 lg:order-2">
            <p className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-terracota">
              <span className="h-px w-6 bg-terracota" aria-hidden="true" />
              Exploración de alianza · Empresa fundadora
            </p>
            <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-carbon sm:text-4xl">
              El trabajo de cobranza, operado por un agente.
            </h1>

            {/* Número héroe */}
            <div className="mt-6 rounded-2xl border border-borde bg-arena/50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-tenue">
                Costo del trabajo que el agente opera por ti, al nivel de
                autonomía actual
              </p>
              {calculado ? (
                <>
                  <p className="mt-2 text-5xl font-extrabold tracking-tight text-terracota">
                    {fmtUSD(r.heroeMensual)}
                    <span className="text-2xl font-bold text-tenue"> /mes</span>
                  </p>
                  <p className="mt-1 text-lg font-semibold text-carbon">
                    ≈ {fmtUSD(r.heroeAnual)} al año
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-tenue">
                    En fase 1 el equipo sigue aprobando todo; la liberación crece
                    a medida que le das más margen al agente.
                  </p>
                </>
              ) : (
                <p className="mt-3 text-xl font-bold leading-snug text-tenue/50">
                  Completa tus datos y calcula para ver tu número.
                </p>
              )}
            </div>

            {/* Inputs */}
            <div className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Personas que tocan cobranza"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={String(personas)}
                  onChange={(v) => setPersonas(Math.max(0, Math.floor(Number(v) || 0)))}
                />
                <Field
                  label="Costo mensual por persona"
                  type="number"
                  inputMode="numeric"
                  min={0}
                  prefix="$"
                  placeholder="Ej: 800"
                  value={costoPersona}
                  onChange={setCostoPersona}
                  error={errores.costo}
                />
              </div>

              <Slider
                label="% de su semana en tareas manuales de cobranza"
                value={pctManual}
                onChange={setPctManual}
                display={`${pctManual}%`}
              />

              <div>
                <Slider
                  label="Nivel de autonomía del agente"
                  value={autonomia}
                  onChange={setAutonomia}
                  display={`${autonomia}%`}
                />
                <p className="mt-2 text-xs leading-relaxed text-tenue">
                  Arrancas con todo supervisado y le das más margen al agente a
                  medida que la operación lo ve funcionar. Tú pones el nivel.
                </p>
              </div>

              {/* Secundario: cash */}
              <div className="border-t border-borde pt-5">
                <p className="text-sm font-bold text-carbon">
                  Flujo de caja{" "}
                  <span className="font-medium text-tenue">(opcional)</span>
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Cartera por cobrar"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    prefix="$"
                    value={String(cartera)}
                    onChange={(v) => setCartera(Math.max(0, Number(v) || 0))}
                  />
                  <Field
                    label="Días de cobro hoy"
                    type="number"
                    inputMode="numeric"
                    min={1}
                    value={String(diasHoy)}
                    onChange={(v) => setDiasHoy(Math.max(1, Math.floor(Number(v) || 0)))}
                  />
                  <Field
                    label="Días objetivo"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={String(diasObjetivo)}
                    onChange={(v) => setDiasObjetivo(Math.max(0, Math.floor(Number(v) || 0)))}
                  />
                </div>
              </div>
            </div>

            {/* Contacto + Calcular */}
            <div className="mt-6 rounded-2xl border border-borde bg-white p-5">
              <p className="font-bold text-carbon">Tus datos para el reporte</p>
              <div className="mt-4 space-y-4">
                <Field
                  label="Nombre"
                  value={nombre}
                  onChange={setNombre}
                  autoComplete="name"
                />
                <Field
                  label="Empresa"
                  value={empresa}
                  onChange={setEmpresa}
                  autoComplete="organization"
                />
                <Field
                  label="Email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={setEmail}
                  autoComplete="email"
                  error={errores.email}
                />
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={acepta}
                    onChange={(e) => setAcepta(e.target.checked)}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-terracota"
                  />
                  <span className="text-sm leading-snug text-carbon">
                    Quiero que Mandarina me envíe este reporte y me contacte
                    sobre esto.
                  </span>
                </label>
                {errores.acepta && (
                  <p className="text-xs font-medium text-terracota-oscuro">
                    {errores.acepta}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleCalcular}
                  className="w-full rounded-full bg-terracota px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-terracota-oscuro"
                >
                  {calculado ? "Recalcular" : "Calcular"}
                </button>
              </div>
            </div>

            {/* Resultados */}
            {calculado && (
              <div className="mt-6 space-y-4">
                <p className="text-sm leading-relaxed text-carbon">
                  El trabajo manual de cobranza hoy cuesta{" "}
                  <span className="font-bold">~{fmtUSD(r.costoMensual)}/mes</span>.
                </p>

                <div className="rounded-xl border border-borde bg-white p-4">
                  <p className="leading-relaxed text-carbon">
                    <span className="font-bold">Capacidad liberada:</span>{" "}
                    equivale a ~{fmtFTE(r.fteLiberado)} persona de vuelta a
                    vender y a relaciones.
                  </p>
                </div>

                <div className="rounded-xl border border-borde bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-tenue">
                    Capital de trabajo
                  </p>
                  <p className="mt-1.5 leading-relaxed text-carbon">
                    Cobrar antes podría liberarte entre{" "}
                    <span className="font-bold text-terracota">
                      {fmtUSD(r.cashBajo)}
                    </span>{" "}
                    y{" "}
                    <span className="font-bold text-terracota">
                      {fmtUSD(r.cashAlto)}
                    </span>{" "}
                    de capital de trabajo.
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-tenue">
                    Estimado. Es nuestra hipótesis, no una promesa; se vuelve
                    sólido con el aprendizaje de las Empresas Fundadoras.
                  </p>
                </div>

                {WORKER_CONFIGURADO && envio === "ok" && (
                  <p className="text-sm text-tenue">
                    Te enviamos el reporte a tu correo.
                  </p>
                )}
                {WORKER_CONFIGURADO && envio === "error" && (
                  <p className="text-sm text-tenue">
                    No pudimos enviar el correo, pero acá tienes tus resultados.
                  </p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-terracota px-6 py-3.5 text-base font-semibold text-white transition-colors hover:bg-terracota-oscuro"
                  >
                    Hablemos por WhatsApp
                  </a>
                  <a
                    href={AGENDA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-borde px-6 py-3.5 text-base font-semibold text-carbon transition-colors hover:border-carbon/30 hover:bg-arena"
                  >
                    Agenda 45 min
                  </a>
                </div>
              </div>
            )}

            {/* Bloque explicativo */}
            <div className="mt-8 rounded-2xl border border-borde bg-arena/40 p-5">
              <p className="leading-relaxed text-tenue">
                Cobrar a crédito es trabajo de hormiga: perseguir vencidos,
                transcribir capturas de varios bancos y cuadrar a mano los pagos
                parciales en bolívares y dólares. El costo real no es solo el
                tiempo, es gente capaz gastada en tareas mecánicas y plata que
                entra tarde al flujo de caja. El agente ejecuta ese ciclo y le
                reporta a tu equipo, que pasa a supervisar y decidir.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-borde pt-6 sm:flex-row sm:items-center">
          <p className="text-sm text-tenue">
            Mockup interactivo para exploración de alianza. Construido por
            Mandarina · usamandarina.com
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="rounded-full border border-borde px-4 py-2 text-sm font-medium text-carbon transition-colors hover:bg-arena"
            >
              ↻ Reiniciar
            </button>
            <button
              type="button"
              onClick={handleCopiar}
              className="rounded-full border border-borde px-4 py-2 text-sm font-medium text-carbon transition-colors hover:bg-arena"
            >
              {copiado ? "URL copiada" : "Copiar URL del demo"}
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  prefix,
  suffix,
  min,
  inputMode,
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  min?: number;
  inputMode?: "numeric" | "decimal" | "text" | "email";
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-carbon">{label}</label>
      <div
        className={`mt-1.5 flex items-center rounded-lg border bg-white transition-colors focus-within:ring-2 focus-within:ring-terracota/30 ${
          error ? "border-terracota" : "border-borde focus-within:border-terracota"
        }`}
      >
        {prefix && <span className="pl-3.5 text-tenue">{prefix}</span>}
        <input
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          placeholder={placeholder}
          min={min}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3.5 py-2.5 text-carbon outline-none placeholder:text-tenue/40"
        />
        {suffix && <span className="pr-3.5 text-sm text-tenue">{suffix}</span>}
      </div>
      {error && (
        <p className="mt-1 text-xs font-medium text-terracota-oscuro">{error}</p>
      )}
    </div>
  );
}

function Slider({
  label,
  value,
  onChange,
  display,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-semibold text-carbon">{label}</label>
        <span className="text-sm font-bold text-terracota">{display}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-terracota"
      />
    </div>
  );
}
