import Logo from "./Logo";

const enlaces = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#precio", label: "Precio" },
  { href: "#empresa-fundadora", label: "Empresa fundadora" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-carbon">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-4 leading-relaxed text-crema/60">
              Un agente que potencia a tu equipo de cobranzas.
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-16">
            <nav aria-label="Secciones">
              <p className="text-sm font-semibold uppercase tracking-wider text-crema/40">
                Secciones
              </p>
              <ul className="mt-4 space-y-2.5">
                {enlaces.map((enlace) => (
                  <li key={enlace.href}>
                    <a
                      href={enlace.href}
                      className="text-crema/70 transition-colors hover:text-crema"
                    >
                      {enlace.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-crema/40">
                Contacto
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href="https://wa.me/584143201028?text=Hola%2C%20me%20interesa%20Mandarina%20para%20mi%20cobranza."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-crema/70 transition-colors hover:text-crema"
                  >
                    WhatsApp: +58 414 320 1028
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hola@usamandarina.com"
                    className="text-crema/70 transition-colors hover:text-crema"
                  >
                    hola@usamandarina.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://calendar.app.google/UEFQFLVuHaeTod357"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-crema/70 transition-colors hover:text-crema"
                  >
                    Agenda una conversación
                  </a>
                </li>
                <li className="text-crema/70">usamandarina.com</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-sm text-crema/50">
            © 2026 Mandarina. Hecho en Venezuela.
          </p>
        </div>
      </div>
    </footer>
  );
}
