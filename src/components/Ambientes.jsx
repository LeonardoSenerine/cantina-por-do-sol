import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReduced } from '../lib/motion'
import { Arrow } from './Logo'

// Fotos do lugar, na ordem de quem chega: fachada, salões e o fim de tarde.
// `w` é a largura do arquivo original (as -800 são a versão menor).
const FOTOS = [
  { n: 'fachada-2', w: 1440, t: 'A fachada', d: 'Pedra basalto, madeira e o salão de cima', alt: 'Fachada da cantina, de pedra basalto e madeira, com janelas de ponta a ponta no andar de cima' },
  { n: 'jardim', w: 1440, t: 'O jardim', d: 'Bromélias e palmeiras na chegada', alt: 'Jardim com bromélias e palmeiras diante da fachada de pedra' },
  { n: 'salao-mesas', w: 960, t: 'Salão de madeira', d: 'Mesas postas para receber', alt: 'Salão de madeira com mesas e bancos estofados, luminárias acesas' },
  { n: 'salao-logo', w: 1440, t: 'Salão principal', d: 'O sol da casa na parede', alt: 'Salão com mesas de madeira e o logo da Cantina Pôr do Sol na parede' },
  { n: 'salao-luzes', w: 1440, t: 'Sob as luzinhas', d: 'Mesas reservadas entre vigas de madeira', alt: 'Mesas com bancos estofados sob uma estrutura de madeira com fios de luz' },
  { n: 'sala-pedra', w: 1440, t: 'Sala de pedra', d: 'Sofá, cristaleira e parede de basalto', alt: 'Sala com sofá, mesa de centro e cristaleira diante de parede de pedra' },
  { n: 'salao-janelas', w: 1440, t: 'Junto às janelas', d: 'Luminárias de cobre e madeira clara', alt: 'Mesas de madeira com bancos estofados junto a janelas, sob luminárias de cobre' },
  { n: 'salao-verde', w: 1440, t: 'Mesas para grupos', d: 'Bancos longos e parede verde', alt: 'Mesas longas de madeira com bancos, parede verde e lâmpadas penduradas' },
  { n: 'salao-noite', w: 1440, t: 'À noite', d: 'Luz baixa para o rodízio', alt: 'Salão de madeira à noite, com mesas postas e lâmpadas acesas' },
  { n: 'por-do-sol-salao', w: 960, t: 'O fim de tarde', d: 'O sol se pondo ao lado do salão', alt: 'O sol se pondo no horizonte ao lado do salão de madeira, visto entre folhagens' },
]

export default function Ambientes() {
  const viewport = useRef(null)
  const track = useRef(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  pausedRef.current = paused
  // esteira: anda sozinha da direita para a esquerda e recomeça sem emenda (as fotos vêm duas
  // vezes seguidas e a posição volta uma volta inteira quando passa do fim da primeira série)
  const state = useRef({ pos: 0, speed: 0, hover: false, drag: null, visible: false })

  useEffect(() => {
    const el = track.current
    const s = state.current
    const BASE = 40 // px por segundo
    const lap = () => el.scrollWidth / 2
    const wrap = (v) => {
      const w = lap()
      return w ? (((v % w) + w) % w) - w : 0
    }

    const tick = () => {
      if (!s.visible) return
      const moving = !prefersReduced() && !pausedRef.current && !s.hover && !s.drag && !document.hidden
      s.speed += ((moving ? 1 : 0) - s.speed) * 0.05 // acelera e freia suave
      s.pos = wrap(s.pos - BASE * s.speed * (gsap.ticker.deltaRatio() / 60))
      el.style.transform = `translate3d(${s.pos}px,0,0)`
    }
    gsap.ticker.add(tick)

    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting }, { rootMargin: '100px 0px' })
    io.observe(viewport.current)
    return () => {
      gsap.ticker.remove(tick)
      io.disconnect()
    }
  }, [])

  // setas: desliza uma foto para o lado, com a mesma curva do resto do site
  const go = (dir) => {
    const s = state.current
    const item = track.current.querySelector('li')
    const step = item.offsetWidth + parseFloat(getComputedStyle(item).marginRight)
    const proxy = { v: 0 }
    let last = 0
    gsap.to(proxy, {
      v: -dir * step,
      duration: prefersReduced() ? 0 : 0.9,
      ease: 'osmo',
      onUpdate: () => {
        s.pos += proxy.v - last
        last = proxy.v
      },
    })
  }

  // arrastar com mouse ou dedo; a rolagem vertical da página continua normal (touch-action: pan-y)
  const onPointerDown = (e) => {
    state.current.drag = { x: e.clientX }
    viewport.current.setPointerCapture?.(e.pointerId)
    viewport.current.dataset.dragging = 'true'
  }
  const onPointerMove = (e) => {
    const d = state.current.drag
    if (!d) return
    state.current.pos += e.clientX - d.x
    d.x = e.clientX
  }
  const endDrag = () => {
    if (!state.current.drag) return
    state.current.drag = null
    delete viewport.current.dataset.dragging
  }

  const item = (f, copy) => (
    <li key={`${copy ? 'b' : 'a'}-${f.n}`} aria-hidden={copy || undefined} className="group mr-4 w-[78vw] max-w-[420px] shrink-0 sm:w-[46vw] md:mr-6 md:w-[31vw] lg:w-[26vw]">
      <figure>
        <div className="relative aspect-[4/5] overflow-hidden bg-areia">
          <img
            src={`./img/${f.n}.webp`}
            srcSet={`./img/${f.n}-800.webp 800w, ./img/${f.n}.webp ${f.w}w`}
            sizes="(min-width: 1024px) 26vw, (min-width: 768px) 31vw, (min-width: 640px) 46vw, 78vw"
            alt={copy ? '' : f.alt}
            loading="lazy"
            draggable="false"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-osmo)] group-hover:scale-[1.04]"
          />
        </div>
        <figcaption className="mt-4">
          <span className="serif block text-[22px]">{f.t}</span>
          <span className="mt-1 block text-[15px] text-pedra">{f.d}</span>
        </figcaption>
      </figure>
    </li>
  )

  const btn = 'grid h-12 w-12 place-items-center border border-basalto transition-colors duration-300 hover:bg-basalto hover:text-cal'

  return (
    <section id="ambientes" className="py-24 md:py-32">
      <div className="gutter">
        <div className="mx-auto grid max-w-[1320px] gap-5 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[15px] font-medium">Ambientes</p>
            <p className="serif mt-3 text-[22px] text-pinus">Pode chegar com calma</p>
          </div>
          <div className="md:col-span-8">
            <p data-split className="serif text-[clamp(24px,2.5vw,34px)] leading-[1.3]">
              Salão de madeira com lâmpadas de filamento, uma sala de pedra com sofá e cristaleira, e o andar de cima com janelas de ponta a ponta.
            </p>
            <div className="mt-8 flex items-center justify-between gap-4">
              <p className="text-[14px] text-pedra">Arraste para o lado ou use as setas</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => go(-1)} aria-label="Foto anterior" className={btn}>
                  <Arrow className="h-3.5 w-3.5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setPaused((p) => !p)}
                  aria-pressed={paused}
                  aria-label={paused ? 'Continuar o carrossel' : 'Pausar o carrossel'}
                  className={btn}
                >
                  <svg viewBox="0 0 12 12" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                    {paused ? <path d="M3 1.5v9l7-4.5z" /> : <path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" />}
                  </svg>
                </button>
                <button type="button" onClick={() => go(1)} aria-label="Próxima foto" className={btn}>
                  <Arrow className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* esteira de ponta a ponta da tela; para com o mouse por cima (no toque, só enquanto arrasta) */}
      <div
        ref={viewport}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Fotos dos ambientes"
        onPointerEnter={(e) => { if (e.pointerType === 'mouse') state.current.hover = true }}
        onPointerLeave={(e) => { if (e.pointerType === 'mouse') { state.current.hover = false; endDrag() } }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="mt-12 cursor-grab touch-pan-y select-none overflow-hidden data-[dragging=true]:cursor-grabbing md:mt-16"
      >
        <ul ref={track} className="flex w-max will-change-transform">
          {FOTOS.map((f) => item(f, false))}
          {FOTOS.map((f) => item(f, true))}
        </ul>
      </div>
    </section>
  )
}
