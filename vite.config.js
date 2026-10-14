import { readFileSync } from 'node:fs'
import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Endereço público do site (sem barra no fim), definido em VITE_SITE_URL no .env.
// É usado nas meta tags de compartilhamento, que exigem URL completa, no robots.txt, no sitemap
// e nos links da 404. Sem ele, o build funciona, mas sai sem canonical/og:url/sitemap e com a
// imagem de compartilhamento em caminho relativo, que o WhatsApp e o Facebook não mostram.
function seo(siteUrl) {
  return {
    name: 'cantina-seo',
    // antes da troca de %VARIÁVEL% do próprio Vite, que avisaria que SITE_URL não existe
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        if (siteUrl) return html.replaceAll('%SITE_URL%', siteUrl)
        return html
          .replace(/^\s*<link rel="canonical"[^>]*>\n/m, '')
          .replace(/^\s*<meta property="og:url"[^>]*>\n/m, '')
          .replaceAll('%SITE_URL%/', './')
      },
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /', 'Disallow: /404.html']
      if (siteUrl) robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots.join('\n') + '\n' })

      if (siteUrl) {
        const today = new Date().toISOString().slice(0, 10)
        this.emitFile({
          type: 'asset',
          fileName: 'sitemap.xml',
          source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`,
        })
      }

      // 404 sem arquivos do build: é servida em qualquer caminho, onde os caminhos
      // relativos (base './') quebrariam. Vercel, Netlify, GitHub Pages e Hostinger
      // usam o 404.html da raiz sozinhos.
      const notFound = readFileSync(new URL('./src/404.html', import.meta.url), 'utf8')
      this.emitFile({
        type: 'asset',
        fileName: '404.html',
        source: notFound.replaceAll('%HOME%', siteUrl ? `${siteUrl}/` : '/'),
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const siteUrl = (loadEnv(mode, process.cwd(), 'VITE_').VITE_SITE_URL || '').trim().replace(/\/+$/, '')
  return {
    base: './',
    plugins: [react(), tailwindcss(), seo(siteUrl)],
  }
})
