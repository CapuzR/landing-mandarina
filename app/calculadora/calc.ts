// Lógica de cálculo de la calculadora. Pura y a prueba de NaN: todo entra
// saneado, divisiones protegidas y porcentajes acotados a 0-100.

export type Inputs = {
  personas: number; // # de personas que tocan cobranza / back office
  costoPersona: number; // costo mensual aprox. por persona, USD
  pctManual: number; // % de la semana en tareas manuales (0-100)
  autonomia: number; // nivel de autonomía del agente (0-100)
  cartera: number; // cartera por cobrar actual, USD
  diasHoy: number; // días de cobro promedio hoy
  diasObjetivo: number; // días de cobro objetivo
};

export type Resultados = {
  costoMensual: number; // costo del trabajo manual de cobranza / mes
  heroeMensual: number; // costo manual * autonomía (lo que el agente opera)
  heroeAnual: number;
  fteLiberado: number; // capacidad recuperada, en personas-equivalente
  cashBajo: number;
  cashAlto: number;
};

const num = (v: number) => (Number.isFinite(v) ? v : 0);
const clamp = (v: number, min: number, max: number) =>
  Math.min(Math.max(num(v), min), max);

export function calcular(i: Inputs): Resultados {
  const personas = Math.max(0, num(i.personas));
  const costoPersona = Math.max(0, num(i.costoPersona));
  const pct = clamp(i.pctManual, 0, 100) / 100;
  const auto = clamp(i.autonomia, 0, 100) / 100;
  const cartera = Math.max(0, num(i.cartera));
  const diasHoy = Math.max(1, num(i.diasHoy)); // evita división por cero
  const diasObjetivo = Math.max(0, num(i.diasObjetivo));

  const costoMensual = personas * costoPersona * pct;
  const heroeMensual = costoMensual * auto;
  const heroeAnual = heroeMensual * 12;
  const fteLiberado = personas * pct * auto;

  const ventasDiarias = cartera / diasHoy;
  const diasGanados = Math.max(0, diasHoy - diasObjetivo);
  const cashBase = ventasDiarias * diasGanados;
  const cashBajo = cashBase * 0.8;
  const cashAlto = cashBase * 1.2;

  return { costoMensual, heroeMensual, heroeAnual, fteLiberado, cashBajo, cashAlto };
}

// Formato USD con separador de miles (estilo Venezuela: punto), sin decimales.
export function fmtUSD(v: number): string {
  const x = Number.isFinite(v) ? Math.round(v) : 0;
  return "$" + x.toLocaleString("es-VE");
}

// FTE con un decimal: "0.8"
export function fmtFTE(v: number): string {
  const x = Number.isFinite(v) ? v : 0;
  return x.toLocaleString("es-VE", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}
