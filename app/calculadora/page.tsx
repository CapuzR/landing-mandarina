import type { Metadata } from "next";
import Calculadora from "./Calculadora";

// Página privada de exploración de alianza: no se indexa ni se enlaza desde el
// landing. Accesible solo por URL directa.
export const metadata: Metadata = {
  title: "Calculadora de cobranza · Mandarina",
  description:
    "Mockup interactivo de exploración de alianza: el valor de operar la cobranza con un agente.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Calculadora />;
}
