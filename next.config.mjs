/** @type {import('next').NextConfig} */
const nextConfig = {
  // Sitio 100% estático: genera HTML/CSS/JS en `out/` para servir desde CDN
  // (Cloudflare Pages o Workers static assets). Sin servidor ni OpenNext.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
