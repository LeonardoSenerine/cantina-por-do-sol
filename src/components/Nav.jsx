import { useEffect, useRef } from 'react'
import { Wordmark, Arrow } from './Logo'
import { gsap, useGSAP, scrollToId, getLenis, prefersReduced } from '../lib/motion'
import { EXPERIENCES, PHONE_LABEL, ADDRESS, SOCIAL } from '../data/site'

const LINKS = [
  ['inicio', 'Início'],
  ['servimos', 'O que servimos'],
  ['casa', 'A casa'],
  ['ambientes', 'Ambientes'],
  ['onde', 'Como chegar'],
  ['duvidas', 'Dúvidas'],
  ['contato', 'Contato'],
]

export default function Nav({ onReserve, menuOpen, setMenuOpen }) {
  return (
    <header
      data-nav
      data-scrolled="false"
      className="gutter fixed inset-x-0 top-0 z-50 bg-cal transition-shadow duration-500 data-[scrolled=true]:shadow-[0_1px_0_var(--color-linha)]"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <nav className="mx-auto grid h-[76px] max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center md:h-[88px]" aria-label="Principal">
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="menu-lateral"
          className="group flex items-center gap-3 justify-self-start py-2 text-[15px] font-medium"
        >
          <span>{menuOpen ? 'Fechar' : 'Menu'}</span>
          <span className="relative block h-3 w-3" aria-hidden="true">
            <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
            <span className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[var(--ease-osmo)] ${menuOpen ? 'rotate-90 scale-y-0' : ''}`} />
          </span>
        </button>

        <a href="#inicio" onClick={(e) => { e.preventDefault(); setMenuOpen(false); scrollToId('inicio') }} aria-label="Cantina Pôr do Sol, voltar ao início">
          <Wordmark />
        </a>

        <button type="button" onClick={() => onReserve()} className="btn btn-ouro justify-self-end h-11 pl-4 text-[14px] md:h-[50px] md:pl-5 md:text-[15px]">
          <span><span className="hidden sm:inline">Reservar mesa</span><span className="sm:hidden">Reservar</span></span>
          <span className="sq" aria-hidden="true"><Arrow /></span>
        </button>
      </nav>
    </header>
  )
}

export function SideMenu({ open, onClose, onReserve }) {
  const root = useRef(null)
  const tl = useRef(null)
  const [cafe, pizza] = EXPERIENCES

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'osmo' } })
        .set(root.current, { display: 'block' })
        .fromTo('[data-menu-overlay]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 })
        .fromTo('[data-menu-panel]', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9 }, '<')
        .fromTo('[data-menu-link]', { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.05 }, '<0.25')
        .fromTo('[data-menu-fade]', { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.06 }, '<0.2')
    },
    { scope: root },
  )

  useEffect(() => {
    const t = tl.current
    if (!t) return
    const lenis = getLenis()
    if (open) {
      lenis?.stop()
      if (prefersReduced()) t.progress(1)
      else t.timeScale(1).play()
    } else if (t.progress() > 0) {
      lenis?.start()
      if (prefersReduced()) t.progress(0)
      else t.timeScale(1.5).reverse()
    }
  }, [open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && open && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const go = (e, id) => {
    e.preventDefault()
    onClose()
    setTimeout(() => scrollToId(id), 350)
  }
  const tab = open ? 0 : -1

  return (
    <div ref={root} id="menu-lateral" className="fixed inset-0 z-40 hidden" aria-hidden={!open}>
      <div data-menu-overlay className="absolute inset-0 bg-basalto/40" onClick={onClose} />
      <div
        data-menu-panel
        data-lenis-prevent
        className="gutter absolute inset-y-0 left-0 flex w-full max-w-[540px] flex-col overflow-y-auto bg-basalto pb-10 text-cal"
        style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 116px)' }}
      >
        <ul className="flex flex-col">
          {LINKS.map(([id, label]) => (
            <li key={id} className="overflow-hidden">
              <a data-menu-link href={`#${id}`} onClick={(e) => go(e, id)} tabIndex={tab} className="serif block py-1 text-[clamp(32px,5vw,44px)] leading-[1.18] transition-colors hover:text-ouro">
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div data-menu-fade className="mt-10">
          <button type="button" onClick={() => { onClose(); onReserve() }} tabIndex={tab} className="btn btn-ouro">
            <span>Reservar mesa</span>
            <span className="sq" aria-hidden="true"><Arrow /></span>
          </button>
        </div>

        <div className="mt-auto grid grid-cols-1 gap-6 border-t border-cal/15 pt-8 text-[15px] text-cal/70 sm:grid-cols-2">
          <div data-menu-fade>
            <p className="mb-2 text-cal">Horários</p>
            <p>{pizza.name}: {pizza.days.toLowerCase()}, {pizza.hours}</p>
            <p className="mt-2">{cafe.name}: {cafe.days.toLowerCase()}, {cafe.hours}</p>
          </div>
          <div data-menu-fade>
            <p className="mb-2 text-cal">Contato</p>
            <p className="tabular-nums">{PHONE_LABEL}</p>
            <p>{ADDRESS.line}, {ADDRESS.city}</p>
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" tabIndex={tab} className="ulink mt-2 inline-block text-cal">Instagram {SOCIAL.instagramLabel}</a>
          </div>
        </div>
      </div>
    </div>
  )
}
