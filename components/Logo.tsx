type LogoProps = {
  className?: string;
  markSize?: number;
  showWordmark?: boolean;
  /** "dark" usa texto carbón (fondos claros); "light" usa texto crema (fondos oscuros). */
  tone?: "dark" | "light";
};

/**
 * Calcula el contorno de un gajo (cuña) entre un radio interno y uno externo.
 * Lados rectos radiales y borde exterior curvo, como un gajo de mandarina visto
 * desde arriba.
 */
function wedgePath(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  startDeg: number,
  endDeg: number
): string {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const point = (r: number, deg: number): [number, number] => [
    cx + r * Math.cos(toRad(deg)),
    cy + r * Math.sin(toRad(deg)),
  ];
  const f = (n: number) => n.toFixed(2);
  const [x1, y1] = point(rIn, startDeg);
  const [x2, y2] = point(rOut, startDeg);
  const [x3, y3] = point(rOut, endDeg);
  const [x4, y4] = point(rIn, endDeg);
  return [
    `M ${f(x1)} ${f(y1)}`,
    `L ${f(x2)} ${f(y2)}`,
    `A ${rOut} ${rOut} 0 0 1 ${f(x3)} ${f(y3)}`,
    `L ${f(x4)} ${f(y4)}`,
    `A ${rIn} ${rIn} 0 0 0 ${f(x1)} ${f(y1)}`,
    "Z",
  ].join(" ");
}

/**
 * La marca: una mandarina geométrica vista desde arriba. Ocho gajos sólidos
 * tipo cuña, separados por finas líneas, con un punto sólido en el centro.
 * Sin aro exterior. Para ajustar el look, cambia GAJOS, GAP, R_INTERNO,
 * R_EXTERNO o R_PUNTO.
 */
export function LogoMark({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  const cx = 50;
  const cy = 50;
  const GAJOS = 8;
  const GAP = 6; // separación angular entre gajos, en grados
  const R_INTERNO = 15;
  const R_EXTERNO = 45;
  const R_PUNTO = 7;

  const paso = 360 / GAJOS;
  const medioAncho = (paso - GAP) / 2;

  const gajos = Array.from({ length: GAJOS }, (_, i) => {
    const centro = i * paso - 90; // el primer gajo apunta hacia arriba
    return wedgePath(
      cx,
      cy,
      R_INTERNO,
      R_EXTERNO,
      centro - medioAncho,
      centro + medioAncho
    );
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Mandarina"
      className={className}
    >
      {gajos.map((d, i) => (
        <path key={i} d={d} className="fill-terracota" />
      ))}
      <circle cx={cx} cy={cy} r={R_PUNTO} className="fill-terracota" />
    </svg>
  );
}

export default function Logo({
  className = "",
  markSize = 30,
  showWordmark = true,
  tone = "dark",
}: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={markSize} />
      {showWordmark && (
        <span
          className={`text-xl font-extrabold tracking-tight ${
            tone === "light" ? "text-crema" : "text-carbon"
          }`}
        >
          Mandarina
        </span>
      )}
    </span>
  );
}
