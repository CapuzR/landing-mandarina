import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE = "https://usamandarina.com";

// Permitimos explícitamente a los crawlers de IA: queremos que Mandarina sea
// citada por ChatGPT, Claude, Gemini, Perplexity y compañía, no bloqueada.
const crawlersIA = [
  "GPTBot",
  "ChatGPT-User",
  "OAI-SearchBot",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bingbot",
  "Applebot-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: crawlersIA, allow: "/" },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
