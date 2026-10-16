# Cantina Pôr do Sol — site institucional

One-page em React + Vite + Tailwind 4, com animações no estilo do studenterkilden.dk (GSAP + ScrollTrigger + SplitText + CustomEase + Lenis).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ para publicar (Vercel, Netlify, Hostinger…)
```

## Onde mexer

- `src/data/site.js` — horários e preços de cada experiência (`CAFE`, `ALMOCO`, `PIZZA`, `VISITA`), o programa do domingo (`SUNDAY`), o que vai à mesa (`MESA`), WhatsApp, endereço, redes e perguntas frequentes. Se mudar horário de reserva, mude também `server/src/experiences/experiences.data.ts`.
- `src/lib/animations.js` — todas as animações globais, ligadas por data-atributos (`data-split`, `data-split-chars`, `data-reveal`, `data-fade`, `data-img-reveal`, `data-parallax`, `data-footer-parallax`, `data-nav`). A lista do que cada um faz está no topo do arquivo.
- `src/components/Price.jsx` — preço em estilo de cardápio ("R$" e centavos menores), usado no topo e nas experiências.
- `src/components/Roll.jsx` — texto de botão que rola para cima no hover; use dentro de `.btn`.
- `src/lib/motion.js` — registra os plugins, as curvas `osmo` e `loader` e o Lenis.
- `src/lib/useRotation.js` — revezamento de fotos entre molduras, usado no mosaico de Nosso trabalho.
- `src/components/` — Nav (com o menu lateral), Hero (em clima de inauguração: os três momentos do domingo com horário e valor logo na entrada, e o rodízio com o valor de cada noite), Casa, Ambientes, Trabalho, Inauguracao (o novo espaço do café colonial, com a reportagem do Canal Ideal em `public/video/inauguracao.mp4` e a capa `img/inauguracao-capa.webp`; o vídeo só carrega no play), Servimos (no lugar da antiga Equipe; três seções: 01 Domingo com café colonial e almoço, 02 Rodízio de pizzas no bloco escuro com as fotos `pizza-*`, 03 Pôr do sol com a visitação), Mapa, Faq, Footer e ReserveDrawer. Detalhes: Casa (bloco escuro da essência com a foto da tábua ao lado), Ambientes (carrossel infinito de fotos do lugar com legenda: anda sozinho, para com o mouse por cima, tem setas, botão de pausa e dá para arrastar; as fotos e legendas ficam no topo do arquivo), Trabalho ("Conheça mais nosso trabalho": mosaico só com fotos de comida que trocam sozinhas, em `Mosaico.jsx`), Mapa (Google Maps embutido) e ReserveDrawer (painel que monta a mensagem e abre `wa.me`).
- `src/components/Logo.jsx` + `logoPaths.js` — logo oficial vetorizado (SVG) a partir do arquivo do cliente, sem a marca d'água. `LogoMark` é só o desenho; `LogoFull` inclui o texto. Usado no topo, no loader (o sol sobe) e no rodapé.
- `public/img` — fotos em webp em duas larguras (1440px e `-800`). As de WhatsApp foram ampliadas 2x antes de exportar. o site não usa vídeos (os antigos foram removidos; continuam no histórico do Git e no zip original); o cartão "O pôr do sol" usa a foto `por-do-sol-salao`, o topo é a foto `por-do-sol-chimarrao` (o pôr do sol sobre o vale, com o banco da cantina) e o bloco da essência usa `tabua` (exportada do original de 960px sem ampliar; fotos de WhatsApp não aguentam a largura inteira da tela).

Direção visual: "Madeira e pedra" — Young Serif nos títulos, Hanken Grotesk no texto, cantos retos, botão dourado, estrutura inspirada no studenterkilden.dk.

## SEO e publicação

O endereço do site fica no `.env` (já configurado para a Vercel; se mudar de domínio, troque aqui):

```bash
VITE_SITE_URL=https://cantina-por-do-sol.vercel.app
```

Com ele, o build gera a URL completa nas meta tags de compartilhamento (a imagem do link no WhatsApp e no Facebook só aparece com URL completa), o `canonical`, o `robots.txt` com o `Sitemap` e o `sitemap.xml`. Sem ele, o site funciona, mas sem esses itens.

- `index.html`: título, descrição, Open Graph e Twitter, ícones e dados estruturados do restaurante (endereço, horários, telefone, redes) para a busca do Google. Se mudar horário ou telefone em `src/data/site.js`, mude aqui também.
- `public/og-cantina-v1.jpg`: capa do link (1200×630) com a foto da mesa diante do vale, o logo, o nome e os horários. Se mudar horário, refaça a capa e troque o número da versão no nome (v2, v3...) para o WhatsApp não mostrar a antiga.
- `src/404.html`: página de erro, gerada como `dist/404.html` com tudo embutido, para funcionar em qualquer caminho.
- `robots.txt` e `sitemap.xml` são gerados no build por `vite.config.js`.

## Backend

A pasta `server/` tem a API em NestJS (reservas, experiências, saúde). Veja `server/README.md`.

## Pendências com o cliente

- Se existir, pedir o arquivo original do logo (AI, PDF ou SVG) para substituir a vetorização.
- Mais fotos de pizza (já temos `pizza-marguerita` e `pizza-vinho`) e do pôr do sol de verdade.
- Confirmar: horários de reserva por experiência, regra de crianças até 5 anos, se os salames são da casa, e se podem citar "Leonir e Maristela · Família Geroldi".
- Confirmar o "cerca de 95% dos produtos de fabricação própria" (bloco da essência e perguntas frequentes): é um número forte e precisa ser exato.
- Confirmar: se "crianças de 6 a 9 anos pagam metade" vale para os novos valores (café R$ 59,90, almoço R$ 69,90, rodízio R$ 90,00 / R$ 100,00); em que dias e horários vale a visitação de R$ 20,00; o que é servido no almoço; se servem vinho no rodízio.

## Divulgação

A pasta `divulgacao/` guarda as artes para o Instagram (fica fora de `public/`, então não vai para o site):

- `inauguracao-post-1080x1350.png` e `inauguracao-stories-1080x1920.png`: o domingo com café da manhã, almoço e café da tarde, horários e valores, sobre a foto da tábua de frios (`tabua`), com a mesa do café com flores (`buffet-mesa`) em destaque.
- `novo-espaco-post-1080x1350.png` e `novo-espaco-stories-1080x1920.png`: o anúncio do novo espaço, com o pôr do sol sobre o vale (`por-do-sol-chimarrao`) ao fundo e a tábua de frios em destaque.
