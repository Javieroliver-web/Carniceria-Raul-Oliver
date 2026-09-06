import { defineConfig } from 'vite'
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

/** Sustituye %SITE_URL% en index.html y genera robots.txt + sitemap.xml. */
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
    },
  }
}

export default defineConfig({
  // Subcarpeta en GitHub Pages, raíz en local o con dominio propio.
  base: process.env.GITHUB_ACTIONS ? '/Carniceria-Raul-Oliver/' : '/',
  plugins: [
    siteUrlPlugin(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
})
