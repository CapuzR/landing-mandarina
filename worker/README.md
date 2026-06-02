# Worker de la calculadora — Mandarina

Cloudflare Worker que recibe el POST de `/calculadora` y envía dos correos vía
Resend: el **reporte al prospecto** y la **notificación de lead** a
`ricardo@usamandarina.com`. Es independiente del sitio (no toca el deploy del
landing).

## 1. Cuenta en Resend y dominio verificado

1. Crea una cuenta gratis en [resend.com](https://resend.com) (sin SMS; entras
   con email o GitHub).
2. Ve a **Domains → Add Domain** y agrega `usamandarina.com`.
3. Resend te da unos registros DNS (normalmente **1 MX** en un subdominio de
   envío y **2 TXT**: SPF y DKIM). Pégalos en **Cloudflare → DNS → Records**,
   en modo **DNS only** (nube gris). Espera a que Resend marque el dominio como
   **Verified**.
4. Esto habilita el envío desde `reportes@usamandarina.com` (el `from` del
   Worker). No choca con el correo de recepción: para **recibir** el lead en
   `ricardo@usamandarina.com`, monta **Cloudflare Email Routing** aparte (los
   MX de recepción van en la raíz; Resend usa su subdominio de envío).
5. Crea una **API key** en Resend (**API Keys → Create**). Cópiala.

## 2. Secret y deploy

Desde esta carpeta (`worker/`):

```bash
npm install -g wrangler        # si no lo tienes
wrangler login                 # autentica con tu cuenta de Cloudflare

wrangler secret put RESEND_API_KEY   # pega la API key de Resend cuando lo pida

wrangler deploy
```

Al terminar, `wrangler deploy` imprime la **URL del Worker**, algo como:
`https://mandarina-calculadora.TU-SUBDOMINIO.workers.dev`

## 3. Conectar el frontend

**Copia esa URL y pégala** en la constante `WORKER_URL` de
`app/calculadora/Calculadora.tsx` (reemplaza el placeholder
`mandarina-calculadora.TU-SUBDOMINIO.workers.dev`). Luego recompila y
redespliega el sitio (`npm run build` + push/deploy).

Mientras `WORKER_URL` tenga el placeholder, la calculadora funciona igual
(muestra resultados), solo que no intenta enviar el correo.

## CORS

El Worker permite el origen `https://usamandarina.com` (constante
`ALLOWED_ORIGIN` en `src/index.js`, fácil de editar; hay un fallback `"*"`
comentado para pruebas locales).

## Prueba rápida

```bash
curl -X POST https://mandarina-calculadora.TU-SUBDOMINIO.workers.dev \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Prueba","empresa":"Test","email":"tucorreo@ejemplo.com","heroe_mensual":320,"heroe_anual":3840,"costo_mensual":640,"fte_liberado":0.4,"cash_bajo":10000,"cash_alto":15000,"nivel_autonomia":50,"inputs":{"personas":2,"costo_persona":800,"pct_manual":40,"cartera":50000,"dias_hoy":60,"dias_objetivo":45}}'
```

Respuesta esperada: `{"ok":true}` y dos correos enviados.
