import { gsap, ScrollTrigger, SplitText, useGSAP, initLenis, getLenis, prefersReduced } from './motion'

/*
  Animações globais, no espírito do boilerplate da Osmo usado no Studenterkilden:
  marque o HTML com data-atributos e este hook anima tudo.

  [data-load-*]          loader: o sol do logo nasce atrás das montanhas, a barra enche e a cortina sobe
  [data-hero-*]          entrada do topo logo depois do loader
  [data-split]           texto revelado linha por linha ao entrar na tela
  [data-reveal]          filhos sobem e aparecem em sequência (100ms entre eles, 2em)
  [data-parallax]        moldura cuja imagem ou vídeo interno anda -8% → 8%
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

        // ---------- loader: o sol do logo nasce atrás do telhado e das montanhas
        const logo = wrap.querySelector('[data-load-logo]')
        const sun = logo.querySelectorAll('[data-logo-sun]')
        const land = logo.querySelectorAll('[data-logo-land]')
        const text = logo.querySelectorAll('[data-logo-text]')
        const bar = wrap.querySelector('[data-load-progress]')
        const box = wrap.querySelector('[data-load-container]')
        const bg = wrap.querySelector('[data-load-bg]')
        gsap.set(sun, { y: 160, autoAlpha: 0 })
        gsap.set(land, { autoAlpha: 0 })
        gsap.set(text, { autoAlpha: 0, y: 40 })

        gsap
          .timeline({ defaults: { ease: 'loader' } })
          .to(bar, { scaleX: 1, duration: 2.4 })
          .to(land, { autoAlpha: 1, duration: 0.8, ease: 'power2.out', stagger: 0.02 }, '<')
          .to(sun, { y: 0, autoAlpha: 1, duration: 1.7, ease: 'osmo' }, '<0.3')
          .to(text, { autoAlpha: 1, y: 0, duration: 1, ease: 'osmo', stagger: 0.03 }, '<0.5')
          .to(box, { autoAlpha: 0, duration: 0.5 })
          .to(bar, { scaleX: 0, transformOrigin: 'right center', duration: 0.5 }, '<')
          .add('hide', '<')
          .to(bg, { yPercent: -101, duration: 1.1 }, 'hide')
          .set(wrap, { display: 'none' })
          .add(() => lenis?.start(), 'hide+=0.6')
          // ---------- topo entra junto com a cortina
          .to(split.lines, { yPercent: 0, duration: 1.1, ease: 'osmo', stagger: 0.09 }, 'hide+=0.35')
          .to(q('[data-hero-fade]'), { autoAlpha: 1, y: 0, duration: 0.9, ease: 'osmo', stagger: 0.08 }, 'hide+=0.55')
          .to(q('[data-hero-img]'), { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'osmo', stagger: 0.1 }, 'hide+=0.7')
          .to(q('[data-hero-img] img, [data-hero-img] video'), { scale: 1, duration: 1.8, ease: 'osmo', stagger: 0.1 }, 'hide+=0.7')

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
