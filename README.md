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
- `src/components/` — Nav (com o menu lateral), Hero, Servimos, Casa (bloco escuro da essência com a foto da tábua ao lado, e ambientes), Carrossel (mosaico de 12 fotos com o texto de Ambientes por cima; uma foto por vez troca com um esmaecer suave, só com o mosaico na tela), Mapa (Google Maps embutido), Faq, Footer e ReserveDrawer (painel que monta a mensagem e abre `wa.me`).
- `src/components/Logo.jsx` + `logoPaths.js` — logo oficial vetorizado (SVG) a partir do arquivo do cliente, sem a marca d'água. `LogoMark` é só o desenho; `LogoFull` inclui o texto. Usado no topo, no loader (o sol sobe) e no rodapé.
- `public/img` — fotos em webp em duas larguras (1440px e `-800`). As de WhatsApp foram ampliadas 2x antes de exportar. `public/video`: só `salao-de-cima.mp4` está em uso (cartão "O pôr do sol"), tirado dos vídeos do Instagram da casa. `por-do-sol.mp4` e `passeio.mp4` não são mais usados: o topo agora é a foto `vista-tabua-2` e o bloco da essência usa `tabua` (exportada do original de 960px sem ampliar; fotos de WhatsApp não aguentam a largura inteira da tela).

Direção visual: "Madeira e pedra" — Young Serif nos títulos, Hanken Grotesk no texto, cantos retos, botão dourado, estrutura inspirada no studenterkilden.dk.

## Backend

A pasta `server/` tem a API em NestJS (reservas, experiências, saúde). Veja `server/README.md`.

## Pendências com o cliente

- Se existir, pedir o arquivo original do logo (AI, PDF ou SVG) para substituir a vetorização.
- Fotos de pizza e do pôr do sol de verdade.
- Confirmar: horários de reserva por experiência, regra de crianças até 5 anos, se os salames são da casa, e se podem citar "Leonir e Maristela · Família Geroldi".
