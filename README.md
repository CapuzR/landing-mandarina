# Mandarina

Landing page de una sola página para Mandarina, un agente que potencia al equipo
de cobranzas de empresas que venden a crédito: persigue los vencidos, lee las
capturas de pago y cuadra las cuentas, sin crecer la nómina.

Hecha con **Next.js (App Router) + TypeScript + Tailwind CSS v4**. Lista para
desplegar en Vercel.

## Requisitos

- Node.js 18.18 o superior (probado con Node 24).

## Cómo correrla

```bash
npm install
npm run dev
```

Abre http://localhost:3000

Otros comandos:

```bash
npm run build     # genera el sitio estático en out/
npm run preview   # previsualiza out/ en local
```

## Desplegar (sitio estático)

El proyecto usa export estático de Next.js (`output: "export"` en `next.config.mjs`),
así que `npm run build` genera una carpeta `out/` con HTML/CSS/JS lista para cualquier
CDN. No hay servidor ni OpenNext.

**Cloudflare Pages (lo más simple):**
- Framework preset: Next.js (Static HTML Export), o "None".
- Build command: `npm run build`
- Build output directory: `out`

**Cloudflare Workers (static assets):** usa el `wrangler.jsonc` incluido.
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`

El `name` del Worker en `wrangler.jsonc` debe coincidir con el de tu proyecto en
Cloudflare.

## Dónde tocar cada cosa

### Copy (los textos)

Cada sección es su propio archivo en `components/`. El texto está escrito dentro
de cada uno:

| Sección de la página | Archivo |
| --- | --- |
| Barra superior y menú | `components/Header.tsx` |
| 1. Hero (titular principal) | `components/Hero.tsx` |
| 2. El problema | `components/Problema.tsx` |
| 3. Cómo funciona (6 pasos) | `components/ComoFunciona.tsx` |
| 4. Por qué funciona (capas) | `components/PorQue.tsx` |
| 5. Tú tienes el control | `components/Control.tsx` |
| 6. Para quién es | `components/ParaQuien.tsx` |
| 7. Precio | `components/Precio.tsx` |
| 8. Empresa fundadora + formulario | `components/EmpresaFundadora.tsx` |
| 9. Footer | `components/Footer.tsx` |

Datos SEO (título de la pestaña, descripción, Open Graph): `app/layout.tsx`.

> Nota de estilo: el copy no usa guiones largos (em dashes). Mantén ese criterio
> al editar.

### Colores

Todos los colores de marca están en un solo lugar: el bloque `@theme` de
`app/globals.css`. Cambia el hex y se actualiza todo el sitio.

```css
--color-crema: #faf6ef;            /* fondo principal */
--color-arena: #f4ece0;            /* tarjetas y secciones alternas */
--color-borde: #e7dbc9;            /* bordes suaves */
--color-carbon: #1c1917;           /* texto principal */
--color-tenue: #574f48;            /* texto secundario */
--color-terracota: #c2410c;        /* acento, botones, logo */
--color-terracota-oscuro: #9a3412; /* hover */
```

Se usan como clases de Tailwind: `bg-terracota`, `text-carbon`, `border-borde`,
`bg-arena`, etc.

### Tipografía

Se carga en `app/layout.tsx` con `next/font` (Plus Jakarta Sans). Para cambiarla,
reemplaza el import y el nombre de la fuente ahí.

### Logo y favicon

El logo es un SVG generado en `components/Logo.tsx`. Para ajustar el look (número
de gajos, separación, tamaño del punto central) edita las constantes `GAJOS`,
`GAP`, `R_INTERNO`, `R_EXTERNO`, `R_PUNTO` dentro de `LogoMark`.

El favicon (`app/icon.svg`) se genera con la misma geometría:

```bash
node scripts/gen-icon.mjs
```

### El formulario de design partners

Está en `components/EmpresaFundadora.tsx`. Hoy no tiene backend: al enviar, hace
`console.log` de los datos y muestra el mensaje de éxito. Para conectarlo, busca
el comentario `AQUÍ SE CONECTA EL BACKEND` dentro de `handleSubmit` y reemplaza
el `console.log` por el envío a tu endpoint o servicio de formularios.

El CTA secundario "Agenda una conversación" abre un correo a
`hola@usamandarina.com`. Para usar un calendario (Calendly, cal.com), cambia ese
`href` en `components/Hero.tsx`.

## Estructura

```
app/
  layout.tsx      raíz, fuentes y metadata
  page.tsx        apila las 8 secciones
  globals.css     Tailwind + tokens de color
  icon.svg        favicon (generado)
components/        una sección por archivo + Logo y Reveal
scripts/
  gen-icon.mjs    regenera el favicon
```
