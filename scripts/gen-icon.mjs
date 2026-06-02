// Genera app/icon.svg (el favicon) con la misma geometría que el logo:
// 8 gajos tipo cuña + punto central, en terracota. Para regenerarlo:
//   node scripts/gen-icon.mjs
import { writeFileSync } from "node:fs";

const cx = 50;
const cy = 50;
const GAJOS = 8;
const GAP = 6;
const R_INTERNO = 15;
const R_EXTERNO = 45;
const R_PUNTO = 7;

const paso = 360 / GAJOS;
const medioAncho = (paso - GAP) / 2;
const rad = (d) => (d * Math.PI) / 180;
const punto = (r, d) => [cx + r * Math.cos(rad(d)), cy + r * Math.sin(rad(d))];
const f = (n) => n.toFixed(2);

function gajo(start, end) {
  const [x1, y1] = punto(R_INTERNO, start);
  const [x2, y2] = punto(R_EXTERNO, start);
  const [x3, y3] = punto(R_EXTERNO, end);
  const [x4, y4] = punto(R_INTERNO, end);
  return `M ${f(x1)} ${f(y1)} L ${f(x2)} ${f(y2)} A ${R_EXTERNO} ${R_EXTERNO} 0 0 1 ${f(x3)} ${f(y3)} L ${f(x4)} ${f(y4)} A ${R_INTERNO} ${R_INTERNO} 0 0 0 ${f(x1)} ${f(y1)} Z`;
}

let paths = "";
for (let i = 0; i < GAJOS; i++) {
  const centro = i * paso - 90;
  paths += `<path d="${gajo(centro - medioAncho, centro + medioAncho)}"/>`;
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g fill="#c2410c">${paths}<circle cx="${cx}" cy="${cy}" r="${R_PUNTO}"/></g></svg>`;

writeFileSync("app/icon.svg", svg);
console.log("app/icon.svg generado");
