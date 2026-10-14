# Cantina Pôr do Sol — site institucional

One-page em React + Vite + Tailwind 4, com animações no estilo do studenterkilden.dk (GSAP + ScrollTrigger + SplitText + CustomEase + Lenis).

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/ para publicar (Vercel, Netlify, Hostinger…)
```

## Onde mexer

- `src/data/site.js` — horários, preço, WhatsApp, endereço, redes, perguntas frequentes e textos das experiências.
- `src/lib/animations.js` — todas as animações globais, ligadas por data-atributos (`data-split`, `data-reveal`, `data-parallax`, `data-speed`, `data-footer-parallax`, `data-nav`).
- `src/lib/motion.js` — registra os plugins, as curvas `osmo` e `loader` e o Lenis.
- `src/lib/useRotation.js` — revezamento de fotos entre molduras, usado no mosaico de Ambientes e na Equipe.
- `src/components/` — Nav (com o menu lateral), Hero, Servimos, Casa (bloco escuro da essência com a foto da tábua ao lado, e ambientes), Carrossel (mosaico de 18 fotos, 12 no celular, com o texto de Ambientes por cima; uma foto por vez troca com um esmaecer suave, só com o mosaico na tela), Equipe ("Sempre preparada para atender": seis molduras em que as sete fotos `chef-mesa` e `equipe-*` se revezam), Mapa (Google Maps embutido), Faq, Footer e ReserveDrawer (painel que monta a mensagem e abre `wa.me`).
- `src/components/Logo.jsx` + `logoPaths.js` — logo oficial vetorizado (SVG) a partir do arquivo do cliente, sem a marca d'água. `LogoMark` é só o desenho; `LogoFull` inclui o texto. Usado no topo, no loader (o sol sobe) e no rodapé.
- `public/img` — fotos em webp em duas larguras (1440px e `-800`). As de WhatsApp foram ampliadas 2x antes de exportar. o site não usa vídeos (os antigos foram removidos; continuam no histórico do Git e no zip original); o cartão "O pôr do sol" usa a foto `por-do-sol-salao`, o topo é a foto `por-do-sol-chimarrao` (o pôr do sol sobre o vale, com o banco da cantina) e o bloco da essência usa `tabua` (exportada do original de 960px sem ampliar; fotos de WhatsApp não aguentam a largura inteira da tela).

Direção visual: "Madeira e pedra" — Young Serif nos títulos, Hanken Grotesk no texto, cantos retos, botão dourado, estrutura inspirada no studenterkilden.dk.

## SEO e publicação

Antes do build de produção, crie um `.env` a partir do `.env.example` com o endereço do site:

```bash
VITE_SITE_URL=https://seu-dominio.com.br
```

Com ele, o build gera a URL completa nas meta tags de compartilhamento (a imagem do link no WhatsApp e no Facebook só aparece com URL completa), o `canonical`, o `robots.txt` com o `Sitemap` e o `sitemap.xml`. Sem ele, o site funciona, mas sem esses itens.

- `index.html`: título, descrição, Open Graph e Twitter, ícones e dados estruturados do restaurante (endereço, horários, telefone, redes) para a busca do Google. Se mudar horário ou telefone em `src/data/site.js`, mude aqui também.
- `public/og-image.jpg`: capa do link (1200×630) com a foto da mesa diante do vale, o logo, o nome e os horários. Se mudar horário, refaça a capa.
- `src/404.html`: página de erro, gerada como `dist/404.html` com tudo embutido, para funcionar em qualquer caminho.
- `robots.txt` e `sitemap.xml` são gerados no build por `vite.config.js`.

## Backend

A pasta `server/` tem a API em NestJS (reservas, experiências, saúde). Veja `server/README.md`.

## Pendências com o cliente

- Se existir, pedir o arquivo original do logo (AI, PDF ou SVG) para substituir a vetorização.
- Fotos de pizza e do pôr do sol de verdade.
- Confirmar: horários de reserva por experiência, regra de crianças até 5 anos, se os salames são da casa, e se podem citar "Leonir e Maristela · Família Geroldi".
- Confirmar o "cerca de 95% dos produtos de fabricação própria" (bloco da essência e perguntas frequentes): é um número forte e precisa ser exato.
- Confirmar se o valor "a partir de R$ 80 por pessoa" vale para o café colonial e para o rodízio (agora aparece nos dois cartões).
- Nomes e funções da equipe, se quiserem que apareçam nas fotos.
