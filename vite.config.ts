import { defineConfig } from 'vite'
import { readFileSync } from 'fs'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// ─────────────────────────────────────────────────────────────────────────────
// URL pública del sitio. Es la ÚNICA fuente de verdad: alimenta el canonical,
// las etiquetas Open Graph, el JSON-LD y el sitemap.
//
// El día que el dominio propio esté activo en GitHub Pages:
//   1. SITE_URL      → 'https://carniceriarauloliver.es'
//   2. base          → '/'  (borrar la condición de GITHUB_ACTIONS de abajo)
//   3. añadir un fichero `public/CNAME` con el contenido: carniceriarauloliver.es
//
// robots.txt y sitemap.xml se generan solos a partir de este valor.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = process.env.SITE_URL ?? 'https://javieroliver-web.github.io/Carniceria-Raul-Oliver'

// Teléfono de la página 404. Se mantiene aquí a mano, en sintonía con
// src/app/data/business.ts (importarlo desde la config mezclaría el código
// de la web con el de Node en la comprobación de tipos).
// ─────────────────────────────────────────────────────────────────────────────
// Analítica de Cloudflare (Web Analytics: sin cookies, no hace falta banner).
// Para activarla: Cloudflare → Analytics & Logs → Web Analytics → Add a site
// con el dominio de la web, copiar el token del fragmento que da y pegarlo
// aquí. Vacío = desactivada: no se inyecta el script ni se abre la CSP.
// El token no es secreto: acaba publicado en el HTML de todas formas.
// ─────────────────────────────────────────────────────────────────────────────
const CF_ANALYTICS_TOKEN = ''

const PHONE = '+34625468165'
const PHONE_DISPLAY = '+34 625 468 165'

/** Sustituye %SITE_URL% en index.html y genera robots.txt, sitemap.xml y 404.html. */
function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml(html: string) {
      return html.replaceAll('%SITE_URL%', SITE_URL)
    },
    generateBundle(this: { emitFile: (f: { type: 'asset'; fileName: string; source: string }) => void }) {
      const today = new Date().toISOString().slice(0, 10)
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n` +
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${today}</lastmod>\n` +
          `    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>\n` +
          `</urlset>\n`,
      })
      // GitHub Pages sirve 404.html para cualquier ruta inexistente.
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: readFileSync(path.resolve(__dirname, 'src/404.html'), 'utf-8')
          .replaceAll('%SITE_URL%', SITE_URL)
          .replaceAll('%CSP%', CSP)
          .replaceAll('%PHONE_DISPLAY%', PHONE_DISPLAY)
          .replaceAll('%PHONE%', PHONE),
      })
    },
  }
}

/**
 * Content-Security-Policy como <meta> en el HTML compilado. Solo en build: en
 * `npm run dev` Vite y el plugin de React inyectan scripts en línea que esta
 * política bloquearía.
 *
 * - style-src necesita 'unsafe-inline': toda la web usa estilos en línea.
 * - img-src: Unsplash es la foto del hero; data: es el icono de ImageWithFallback.
 * - frame-src: el mapa de Google, que solo se carga al pulsar "Ver mapa".
 * - connect-src: receptor de errores del portfolio (src/errorReporter.ts) y,
 *   si está activa, la analítica de Cloudflare.
 * - frame-ancestors no funciona en <meta>; necesitaría una cabecera HTTP, que
 *   GitHub Pages no permite (ver TAREAS-PENDIENTES.txt, punto 2.4).
 */
const CSP = [
  "default-src 'self'",
  `script-src 'self'${CF_ANALYTICS_TOKEN ? ' https://static.cloudflareinsights.com' : ''}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https://images.unsplash.com",
  "font-src 'self'",
  `connect-src 'self' https://portfolio-javieroliver-web.vercel.app${CF_ANALYTICS_TOKEN ? ' https://cloudflareinsights.com' : ''}`,
  "frame-src https://maps.google.com https://www.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

function cspPlugin() {
  return {
    name: 'csp',
    apply: 'build' as const,
    transformIndexHtml(html: string) {
      const withCsp = html.replace(
        '<meta charset="UTF-8" />',
        `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`,
      )
      if (!CF_ANALYTICS_TOKEN) return withCsp
      return withCsp.replace(
        '</body>',
        `  <script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${JSON.stringify({ token: CF_ANALYTICS_TOKEN })}'></script>\n  </body>`,
      )
    },
  }
}

export default defineConfig({
  // Subcarpeta en GitHub Pages, raíz en local o con dominio propio.
  base: process.env.GITHUB_ACTIONS ? '/Carniceria-Raul-Oliver/' : '/',
  plugins: [
    siteUrlPlugin(),
    cspPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  // La política de privacidad (Footer.tsx) menciona Cloudflare solo si está activa.
  define: {
    __CF_ANALYTICS__: JSON.stringify(Boolean(CF_ANALYTICS_TOKEN)),
  },
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
