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

    const nombre = (data && data.nombre) || "";
    const empresa = (data && data.empresa) || "";
    const email = (data && data.email) || "";
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

function emailProspecto(d) {
  const nivel = Number.isFinite(+d.nivel_autonomia) ? Math.round(+d.nivel_autonomia) : 0;
  return `<!doctype html><html lang="es"><body style="margin:0;background:#faf6ef;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#1c1917;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <p style="font-size:20px;font-weight:800;letter-spacing:-0.02em;color:#1c1917;margin:0 0 24px;">Mandarina</p>

    <p style="font-size:16px;line-height:1.6;margin:0 0 4px;">Hola ${esc(d.nombre)},</p>
    <p style="font-size:15px;line-height:1.6;color:#574f48;margin:0 0 24px;">
      Gracias por explorar lo que Mandarina puede hacer por la cobranza de <strong style="color:#1c1917;">${esc(d.empresa) || "tu empresa"}</strong>. Acá está tu reporte.
    </p>

    <div style="background:#f4ece0;border:1px solid #e7dbc9;border-radius:16px;padding:24px;margin:0 0 20px;">
      <p style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#574f48;margin:0 0 8px;">
        Costo del trabajo que el agente operaría, al ${nivel}% de autonomía
      </p>
      <p style="font-size:40px;font-weight:800;color:#c2410c;margin:0;line-height:1.1;">${usd(d.heroe_mensual)}<span style="font-size:18px;color:#574f48;font-weight:700;"> /mes</span></p>
      <p style="font-size:16px;font-weight:600;color:#1c1917;margin:6px 0 0;">≈ ${usd(d.heroe_anual)} al año</p>
    </div>

    <p style="font-size:15px;line-height:1.6;margin:0 0 16px;">
      <strong>Capacidad liberada:</strong> equivale a ~${fte(d.fte_liberado)} persona de vuelta a vender y a relaciones.
    </p>

    <div style="border:1px solid #e7dbc9;border-radius:12px;padding:16px 18px;margin:0 0 20px;">
      <p style="font-size:14px;line-height:1.6;margin:0;">
        <strong>Capital de trabajo:</strong> cobrar antes podría liberarte entre
        <strong style="color:#c2410c;">${usd(d.cash_bajo)}</strong> y
        <strong style="color:#c2410c;">${usd(d.cash_alto)}</strong>.
      </p>
      <p style="font-size:12px;line-height:1.5;color:#574f48;margin:8px 0 0;">
        Estimado. Es una hipótesis, no una promesa; se vuelve sólida con el aprendizaje de las Empresas Fundadoras.
      </p>
    </div>

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr>
      <td style="padding-right:10px;">
        <a href="${WHATSAPP}" style="display:inline-block;background:#c2410c;color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:999px;">Hablemos por WhatsApp</a>
      </td>
      <td>
        <a href="${AGENDA}" style="display:inline-block;border:1px solid #e7dbc9;color:#1c1917;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:999px;">Agenda 45 min</a>
      </td>
    </tr></table>

    <p style="font-size:12px;line-height:1.6;color:#574f48;border-top:1px solid #e7dbc9;padding-top:16px;margin:0;">
      Los números son estimados y se solidifican con el aprendizaje de las Empresas Fundadoras.<br>
      Mandarina · <a href="https://usamandarina.com" style="color:#9a3412;text-decoration:none;">usamandarina.com</a>
    </p>
  </div></body></html>`;
}

function emailLead(d) {
  const i = (d && d.inputs) || {};
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#574f48;font-size:13px;">${esc(k)}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-size:13px;font-weight:600;color:#1c1917;">${v}</td></tr>`;
  return `<!doctype html><html lang="es"><body style="margin:0;font-family:Segoe UI,Helvetica,Arial,sans-serif;color:#1c1917;background:#ffffff;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <h2 style="font-size:18px;margin:0 0 4px;">Nuevo lead — calculadora</h2>
    <p style="font-size:13px;color:#574f48;margin:0 0 16px;">${esc(d.empresa) || "sin empresa"}</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
      ${row("Nombre", esc(d.nombre))}
      ${row("Empresa", esc(d.empresa))}
      ${row("Email", esc(d.email))}
      ${row("— Inputs —", "")}
      ${row("Personas en cobranza", esc(i.personas))}
      ${row("Costo por persona", usd(i.costo_persona))}
      ${row("% tareas manuales", (Number(i.pct_manual) || 0) + "%")}
      ${row("Nivel de autonomía", (Number(d.nivel_autonomia) || 0) + "%")}
      ${row("Cartera por cobrar", usd(i.cartera))}
      ${row("Días de cobro hoy", esc(i.dias_hoy))}
      ${row("Días objetivo", esc(i.dias_objetivo))}
      ${row("— Resultados —", "")}
      ${row("Costo trabajo manual/mes", usd(d.costo_mensual))}
      ${row("Héroe mensual", usd(d.heroe_mensual))}
      ${row("Héroe anual", usd(d.heroe_anual))}
      ${row("Capacidad liberada (FTE)", fte(d.fte_liberado))}
      ${row("Cash estimado", usd(d.cash_bajo) + " a " + usd(d.cash_alto))}
    </table>
  </div></body></html>`;
}
