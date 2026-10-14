import { gsap, ScrollTrigger, SplitText, useGSAP, initLenis, getLenis, prefersReduced } from './motion'

/*
  Animações globais, no espírito do boilerplate da Osmo usado no Studenterkilden:
  marque o HTML com data-atributos e este hook anima tudo.

  [data-load-*]          loader: o logo sobe, o sol nasce atrás do telhado, a barra enche e a cortina sobe
  [data-hero-*]          entrada do topo logo depois do loader
  [data-split]           texto revelado linha por linha ao entrar na tela
  [data-reveal]          filhos sobem e aparecem em sequência (100ms entre eles, 2em)
  [data-parallax]        moldura cuja imagem ou vídeo interno anda -8% → 8%
  [data-img-reveal]      moldura que abre de baixo para cima ao entrar, com a foto assentando o zoom
  [data-fade]            elemento pequeno (rótulo) que sobe com um esmaecer
  [data-split-chars]     texto revelado letra por letra
  [data-footer-parallax] rodapé "sobe por baixo" do conteúdo
  [data-nav]             barra do topo some ao rolar para baixo e volta ao subir
*/
export function useSiteAnimations(scope) {
  useGSAP(
    (_, contextSafe) => {
      const root = scope.current
      const q = (s) => gsap.utils.toArray(s, root)
      const wrap = root.querySelector('[data-load-wrap]')

      if (prefersReduced()) {
        gsap.set(wrap, { display: 'none' })
        return
      }

      const lenis = initLenis()
      lenis?.stop()

      // run() espera as fontes carregarem; se o efeito for desfeito antes disso (o React em
      // modo de desenvolvimento monta tudo duas vezes), ele não pode rodar, senão cada animação
      // nasce em dobro e a segunda congela os elementos no estado escondido
      let alive = true

      const run = contextSafe(() => {
        if (!alive) return
        // ---------- topo: estados iniciais (escondidos atrás do loader)
        const title = root.querySelector('[data-hero-title]')
        const split = SplitText.create(title, { type: 'lines', mask: 'lines' })
        gsap.set(split.lines, { yPercent: 110 })
        gsap.set(q('[data-hero-fade]'), { autoAlpha: 0, y: '1.2em' })
        gsap.set(q('[data-hero-img]'), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(q('[data-hero-img] img, [data-hero-img] video'), { scale: 1.25 })

        // ---------- loader: o logo sobe inteiro de baixo para cima (como uma cortina), o sol
        // abre girando atrás do telhado, o nome aparece e a barra enche. Na volta à
        // página na mesma sessão, tudo corre quase duas vezes mais rápido.
        const logo = wrap.querySelector('[data-load-logo]')
        const sun = logo.querySelectorAll('[data-logo-sun]')
        const text = logo.querySelectorAll('[data-logo-text]')
        const bar = wrap.querySelector('[data-load-progress]')
        const box = wrap.querySelector('[data-load-container]')
        const bg = wrap.querySelector('[data-load-bg]')
        gsap.set(logo, { clipPath: 'inset(100% 0% 0% 0%)' })
        // o sol cresce girando no próprio lugar; subir de baixo o fazia aparecer por dentro da casa
        gsap.set(sun, { scale: 0.6, rotation: -40, transformOrigin: '50% 60%' })
        gsap.set(text, { autoAlpha: 0, yPercent: 40 })
        gsap.set(bar, { scaleX: 0 })

        let seen = false
        try {
          seen = sessionStorage.getItem('cantina-intro') === '1'
          sessionStorage.setItem('cantina-intro', '1')
        } catch {
          // sem sessionStorage (aba anônima bloqueada): mostra a entrada inteira
        }

        gsap
          .timeline({ defaults: { ease: 'osmo' } })
          .timeScale(seen ? 1.8 : 1)
          .to(logo, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1 }, 0)
          .to(sun, { scale: 1, rotation: 0, duration: 1.5 }, 0.15)
          .to(text, { autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.015 }, 0.45)
          .to(bar, { scaleX: 1, duration: 1.5, ease: 'loader' }, 0)
          .add('hide', 1.55)
          .to(box, { y: -24, autoAlpha: 0, duration: 0.45, ease: 'power2.in' }, 'hide')
          .to(bg, { yPercent: -101, duration: 1 }, 'hide+=0.15')
          .set(wrap, { display: 'none' })
          .add(() => lenis?.start(), 'hide+=0.5')
          // ---------- topo entra junto com a cortina
          .to(split.lines, { yPercent: 0, duration: 1.1, stagger: 0.08 }, 'hide+=0.4')
          .to(q('[data-hero-fade]'), { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.07 }, 'hide+=0.6')
          .to(q('[data-hero-img]'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3 }, 'hide+=0.5')
          .to(q('[data-hero-img] img, [data-hero-img] video'), { scale: 1, duration: 1.7 }, 'hide+=0.5')

        // ---------- textos linha a linha
        q('[data-split]').forEach((el) => {
          SplitText.create(el, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(self.lines, { yPercent: 110 }, {
                yPercent: 0,
                duration: 1,
                ease: 'osmo',
                stagger: 0.07,
                scrollTrigger: { trigger: el, start: 'top 88%', once: true },
              }),
          })
        })

        // ---------- grupos que sobem em sequência
        q('[data-reveal]').forEach((group) => {
          gsap.fromTo(group.querySelectorAll(':scope > *'), { y: group.dataset.distance || '2em', autoAlpha: 0 }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.8,
            ease: 'osmo',
            stagger: (parseFloat(group.dataset.stagger) || 100) / 1000,
            scrollTrigger: { trigger: group, start: group.dataset.start || 'top 85%', once: true },
          })
        })

        // ---------- parallax dentro das molduras
        q('[data-parallax]').forEach((frame) => {
          const img = frame.querySelector('img, video')
          if (!img) return
          gsap.fromTo(
            img,
            { yPercent: -8 },
            { yPercent: 8, ease: 'none', scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true } },
          )
        })

        // ---------- fotos que se abrem de baixo para cima ao entrar na tela, com o zoom assentando.
        // Em molduras com parallax a foto já se move, então só a moldura abre.
        q('[data-img-reveal]').forEach((frame) => {
          const img = frame.querySelector('img')
          const tl = gsap.timeline({ scrollTrigger: { trigger: frame, start: 'top 88%', once: true } })
          tl.fromTo(frame, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'osmo', clearProps: 'clipPath' })
          if (img && !frame.hasAttribute('data-parallax') && !frame.closest('[data-parallax]')) {
            // clearProps devolve o zoom do :hover ao CSS depois da entrada
            tl.fromTo(img, { scale: 1.18 }, { scale: 1, duration: 1.6, ease: 'osmo', clearProps: 'transform' }, 0)
          }
        })

        // ---------- rótulos pequenos das seções sobem com um esmaecer
        q('[data-fade]').forEach((el) => {
          gsap.fromTo(
            el,
            { y: 14, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 0.9, ease: 'osmo', scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
          )
        })

        // ---------- letra por letra (o nome grande do rodapé)
        q('[data-split-chars]').forEach((el) => {
          SplitText.create(el, {
            type: 'chars',
            mask: 'chars',
            autoSplit: true,
            onSplit: (self) =>
              gsap.fromTo(
                self.chars,
                { yPercent: 110 },
                {
                  yPercent: 0,
                  duration: 1.1,
                  ease: 'osmo',
                  stagger: 0.025,
                  scrollTrigger: { trigger: el, start: 'top 95%', once: true },
                },
              ),
          })
        })

        // ---------- rodapé
        q('[data-footer-parallax]').forEach((el) => {
          gsap
            .timeline({ scrollTrigger: { trigger: el, start: 'clamp(top bottom)', end: 'clamp(top 30%)', scrub: true } })
            .fromTo(el.querySelector('[data-footer-parallax-inner]'), { yPercent: -25 }, { yPercent: 0, ease: 'linear' })
            .fromTo(el.querySelector('[data-footer-parallax-dark]'), { opacity: 0.6 }, { opacity: 0, ease: 'linear' }, '<')
        })

        // ---------- barra do topo some/volta
        const nav = root.querySelector('[data-nav]')
        let hidden = false
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const y = self.scroll()
            nav.dataset.scrolled = y > 10 ? 'true' : 'false'
            const shouldHide = self.direction === 1 && y > 360 && !document.documentElement.dataset.menu
            if (shouldHide !== hidden) {
              hidden = shouldHide
              gsap.to(nav, { yPercent: hidden ? -110 : 0, duration: 0.6, ease: 'osmo', overwrite: true })
            }
          },
        })

        ScrollTrigger.refresh()
      })

      if (document.fonts?.ready) document.fonts.ready.then(run)
      else run()

      return () => {
        alive = false
        getLenis()?.start()
      }
    },
    { scope },
  )
}
