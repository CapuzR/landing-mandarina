import Logo from "./Logo";

const enlaces = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#precio", label: "Precio" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-borde/70 bg-crema/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="Mandarina, ir al inicio" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {enlaces.map((enlace) => (
            <a
              key={enlace.href}
              href={enlace.href}
              className="text-sm font-medium text-tenue transition-colors hover:text-carbon"
            >
              {enlace.label}
            </a>
          ))}
        </nav>

        <a
          href="#empresa-fundadora"
          className="shrink-0 rounded-full bg-terracota px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-terracota-oscuro"
        >
          <span className="sm:hidden">Fundadora</span>
          <span className="hidden sm:inline">Empresa fundadora</span>
        </a>
      </div>
    </header>
  );
}
