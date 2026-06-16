// Worker de Mandarina: recibe los datos de la calculadora (/calculadora) y
// envía dos correos vía Resend (reporte al prospecto + notificación de lead).
// La API key se lee del secret RESEND_API_KEY (nunca hardcodeada).

// Origen permitido para CORS. Edita esto si sirves la página desde otro dominio.
const ALLOWED_ORIGIN = "https://usamandarina.com";
// const ALLOWED_ORIGIN = "*"; // fallback para pruebas locales

const FROM = "Mandarina <reportes@usamandarina.com>";
const LEAD_TO = "ricardo@usamandarina.com";
const WHATSAPP = "https://wa.me/584143201028";
const AGENDA = "https://calendar.app.google/UEFQFLVuHaeTod357";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders() },
  });
}

// Formato USD con separador de miles (punto, estilo Venezuela), sin decimales.
function usd(n) {
  const x = Number.isFinite(+n) ? Math.round(+n) : 0;
  return "$" + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function fte(n) {
  const x = Number.isFinite(+n) ? +n : 0;
  return x.toFixed(1).replace(".", ",");
}
function esc(s) {
  return String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders() });
    }
    if (request.method !== "POST") {
      return json({ ok: false, error: "Método no permitido" }, 405);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: "JSON inválido" }, 400);
    }

    // Formulario "Empresa fundadora" (contacto del landing): un solo correo de lead.
    if (data && data.tipo === "empresa_fundadora") {
      return handleEmpresaFundadora(data, env);
    }

    const nombre = (data && data.nombre) || "";
    const email = (data && data.email) || "";
    const empresa = (data && data.empresa) || "";
    if (!nombre || !email) {
      return json({ ok: false, error: "Faltan nombre o email" }, 400);
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      console.log("Falta el secret RESEND_API_KEY");
      return json({ ok: false, error: "Servidor sin configurar" }, 500);
    }

    try {
      const [r1, r2] = await Promise.all([
        sendResend(apiKey, {
          from: FROM,
          to: email,
          subject: "Tu reporte de cobranza · Mandarina",
          html: emailProspecto(data),
        }),
        sendResend(apiKey, {
          from: FROM,
          to: LEAD_TO,
          reply_to: email,
          subject: `Nuevo lead calculadora · ${empresa || "sin empresa"}`,
          html: emailLead(data),
        }),
      ]);

      if (r1.ok && r2.ok) return json({ ok: true }, 200);

      console.log("Resend falló:", JSON.stringify({ prospecto: r1, lead: r2 }));
      return json({ ok: false, error: "No se pudieron enviar los correos" }, 502);
    } catch (e) {
      console.log("Error del Worker:", e && e.message ? e.message : String(e));
      return json({ ok: false, error: "Error al enviar" }, 502);
    }
  },
};

async function handleEmpresaFundadora(d, env) {
  const nombre = String((d && d.nombre) || "").trim();
  const empresa = String((d && d.empresa) || "").trim();
  const contacto = String((d && d.contacto) || "").trim();
  if (!nombre && !empresa && !contacto) {
    return json({ ok: false, error: "Faltan datos" }, 400);
  }

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("Falta el secret RESEND_API_KEY");
    return json({ ok: false, error: "Servidor sin configurar" }, 500);
  }

  const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto);
  const r = await sendResend(apiKey, {
    from: FROM,
    to: LEAD_TO,
    ...(esEmail ? { reply_to: contacto } : {}),
    subject: `Nueva empresa fundadora: ${empresa || nombre || "sin nombre"}`,
    html: emailEmpresaFundadora(d),
  });

  if (r.ok) return json({ ok: true }, 200);
  console.log("Resend (empresa fundadora) falló:", JSON.stringify(r));
  return json({ ok: false, error: "No se pudo enviar" }, 502);
}

async function sendResend(apiKey, payload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  let info = null;
  try {
    info = await res.json();
  } catch {
    /* sin cuerpo */
  }
  return { ok: res.ok, status: res.status, info };
}

// ---------- Plantillas de correo ----------
// Alineadas al sistema de diseño de los correos del dashboard
// (packages/db/src/auth/mailer.ts): fondo crema, tarjeta blanca con borde,
// cabecera terracota con la marca, tipografía Plus Jakarta Sans y pie con
// hairline. Solo tablas + estilos en línea para sobrevivir Gmail/Outlook/Apple Mail.

const EMAIL_FONT =
  "'Plus Jakarta Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";
// La marca, servida desde el dashboard (igual que packages/db/src/auth/mailer.ts).
// alt="" la deja decorativa: si un cliente la bloquea —o el asset aún no resuelve—
// el wordmark de al lado sostiene la marca.
const BRAND_MARK_URL = "https://app.usamandarina.com/brand/mandarina-mark-white.png";

// Envoltorio común: cabecera de marca + título + cuerpo + pie. `body`, `subtitle`
// y `footnote` se inyectan como HTML ya saneado por quien llama.
function emailShell({ preheader, title, subtitle, body, footnote, width = 560 }) {
  return `<!doctype html><html lang="es"><head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="color-scheme" content="light only">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background:#faf6ef;-webkit-text-size-adjust:100%">
  ${preheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#faf6ef">${preheader}</div>` : ""}
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6ef">
    <tr><td align="center" style="padding:36px 16px">
      <table role="presentation" width="${width}" cellpadding="0" cellspacing="0" style="width:${width}px;max-width:100%;background:#ffffff;border:1px solid #e7dbc9;border-radius:18px;overflow:hidden">
        <tr><td bgcolor="#c2410c" style="background:#c2410c;background:linear-gradient(135deg,#c2410c,#9a3412);padding:24px 32px;border-radius:18px 18px 0 0">
          <table role="presentation" cellpadding="0" cellspacing="0"><tr>
            <td style="padding-right:13px;vertical-align:middle">
              <img src="${BRAND_MARK_URL}" width="40" height="40" alt="" style="display:block;border:0;outline:none;width:40px;height:40px">
            </td>
            <td style="vertical-align:middle">
              <div style="font-family:${EMAIL_FONT};font-size:19px;font-weight:700;color:#ffffff;letter-spacing:-0.2px;line-height:1.2">Mandarina</div>
              <div style="font-family:${EMAIL_FONT};font-size:12px;font-weight:500;color:#fdf4ee;padding-top:2px;line-height:1.2">Cobranza y conciliación</div>
            </td>
          </tr></table>
        </td></tr>
        <tr><td style="padding:30px 32px 0">
          <div style="font-family:${EMAIL_FONT};font-size:21px;font-weight:700;color:#1c1917;letter-spacing:-0.3px;line-height:1.3">${title}</div>
          ${subtitle ? `<div style="font-family:${EMAIL_FONT};font-size:14px;color:#574f48;padding-top:8px;line-height:1.6">${subtitle}</div>` : ""}
        </td></tr>
        <tr><td style="padding:22px 32px 6px">${body}</td></tr>
        <tr><td style="padding:18px 32px;border-top:1px solid #e7dbc9;background:#faf6ef;border-radius:0 0 18px 18px">
          <div style="font-family:${EMAIL_FONT};font-size:12px;color:#574f48;line-height:1.6">${footnote ? `${footnote}<br>` : ""}Mandarina · <a href="https://usamandarina.com" style="color:#c2410c;text-decoration:none;font-weight:600">usamandarina.com</a></div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

// Tabla de datos para los correos internos (lead). `pairs` = [[clave, valor], ...].
// Una clave con valor "" se vuelve subtítulo de sección. Los valores deben venir
// ya escapados/formateados por quien llama.
function infoTable(pairs) {
  const rows = pairs
    .map(([k, v]) => {
      if (v === "") {
        return `<tr><td colspan="2" style="font-family:${EMAIL_FONT};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#9a3412;padding:18px 0 4px">${k}</td></tr>`;
      }
      return `<tr>
        <td style="font-family:${EMAIL_FONT};font-size:13px;color:#574f48;padding:8px 0;border-bottom:1px solid #f0e7d8;vertical-align:top;width:44%">${k}</td>
        <td style="font-family:${EMAIL_FONT};font-size:13px;font-weight:600;color:#1c1917;padding:8px 0 8px 14px;border-bottom:1px solid #f0e7d8;vertical-align:top">${v || "—"}</td>
      </tr>`;
    })
    .join("");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">${rows}</table>`;
}

function emailProspecto(d) {
  const nivel = Number.isFinite(+d.nivel_autonomia) ? Math.round(+d.nivel_autonomia) : 0;
  const body = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
    <tr><td>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4ece0;border:1px solid #e7dbc9;border-radius:14px"><tr><td style="padding:22px 24px">
        <div style="font-family:${EMAIL_FONT};font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#574f48;line-height:1.45">Costo del trabajo que el agente operaría, al ${nivel}% de autonomía</div>
        <div style="font-family:${EMAIL_FONT};font-size:40px;font-weight:800;color:#c2410c;line-height:1.1;padding-top:10px">${usd(d.heroe_mensual)}<span style="font-size:17px;color:#574f48;font-weight:700"> /mes</span></div>
        <div style="font-family:${EMAIL_FONT};font-size:15px;font-weight:600;color:#1c1917;padding-top:6px">≈ ${usd(d.heroe_anual)} al año</div>
      </td></tr></table>
    </td></tr>
    <tr><td style="font-family:${EMAIL_FONT};font-size:15px;color:#1c1917;line-height:1.6;padding-top:18px">
      <strong style="font-weight:700">Capacidad liberada:</strong> equivale a ~${fte(d.fte_liberado)} persona de vuelta a vender y a relaciones.
    </td></tr>
    <tr><td style="padding-top:16px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e7dbc9;border-radius:12px"><tr><td style="padding:16px 18px">
        <div style="font-family:${EMAIL_FONT};font-size:14px;color:#1c1917;line-height:1.6"><strong style="font-weight:700">Capital de trabajo:</strong> cobrar antes podría liberarte entre <strong style="color:#c2410c">${usd(d.cash_bajo)}</strong> y <strong style="color:#c2410c">${usd(d.cash_alto)}</strong>.</div>
        <div style="font-family:${EMAIL_FONT};font-size:12px;color:#574f48;line-height:1.55;padding-top:8px">Estimado. Es una hipótesis, no una promesa; se vuelve sólida con el aprendizaje de las Empresas Fundadoras.</div>
      </td></tr></table>
    </td></tr>
    <tr><td style="padding-top:24px">
      <table role="presentation" cellpadding="0" cellspacing="0"><tr>
        <td style="padding-right:10px"><a href="${WHATSAPP}" style="display:inline-block;background:#c2410c;color:#ffffff;text-decoration:none;font-family:${EMAIL_FONT};font-weight:700;font-size:14px;line-height:1;padding:13px 22px;border-radius:999px">Hablemos por WhatsApp</a></td>
        <td><a href="${AGENDA}" style="display:inline-block;border:1px solid #a78a57;color:#1c1917;text-decoration:none;font-family:${EMAIL_FONT};font-weight:700;font-size:14px;line-height:1;padding:12px 22px;border-radius:999px">Agenda 45 min</a></td>
      </tr></table>
    </td></tr>
  </table>`;
  return emailShell({
    preheader: `Tu reporte: ${usd(d.heroe_mensual)}/mes en trabajo de cobranza que el agente operaría.`,
    title: `Hola ${esc(d.nombre)},`,
    subtitle: `Gracias por explorar lo que Mandarina puede hacer por la cobranza de <strong style="color:#1c1917;font-weight:700">${esc(d.empresa) || "tu empresa"}</strong>. Acá está tu reporte.`,
    body,
    footnote:
      "Los números son estimados y se solidifican con el aprendizaje de las Empresas Fundadoras.",
  });
}

function emailLead(d) {
  const i = (d && d.inputs) || {};
  const body = infoTable([
    ["Nombre", esc(d.nombre)],
    ["Empresa", esc(d.empresa)],
    ["Email", esc(d.email)],
    ["Inputs", ""],
    ["Personas en cobranza", esc(i.personas)],
    ["Costo por persona", usd(i.costo_persona)],
    ["% tareas manuales", (Number(i.pct_manual) || 0) + "%"],
    ["Nivel de autonomía", (Number(d.nivel_autonomia) || 0) + "%"],
    ["Cartera por cobrar", usd(i.cartera)],
    ["Días de cobro hoy", esc(i.dias_hoy)],
    ["Días objetivo", esc(i.dias_objetivo)],
    ["Resultados", ""],
    ["Costo trabajo manual/mes", usd(d.costo_mensual)],
    ["Héroe mensual", usd(d.heroe_mensual)],
    ["Héroe anual", usd(d.heroe_anual)],
    ["Capacidad liberada (FTE)", fte(d.fte_liberado)],
    ["Cash estimado", usd(d.cash_bajo) + " a " + usd(d.cash_alto)],
  ]);
  return emailShell({
    preheader: `Nuevo lead de la calculadora: ${esc(d.empresa) || "sin empresa"}.`,
    title: "Nuevo lead — calculadora",
    subtitle: esc(d.empresa) || "sin empresa",
    body,
    width: 600,
  });
}

function emailEmpresaFundadora(d) {
  const body = infoTable([
    ["Nombre", esc(d.nombre)],
    ["Empresa", esc(d.empresa)],
    ["Contacto", esc(d.contacto)],
    ["Reto", esc(d.reto)],
  ]);
  return emailShell({
    preheader: `Nueva empresa fundadora: ${esc(d.empresa) || esc(d.nombre) || "sin nombre"}.`,
    title: "Nueva empresa fundadora",
    subtitle: esc(d.empresa) || "sin empresa",
    body,
    width: 600,
  });
}
