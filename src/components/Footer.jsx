import { ADDRESS, EXPERIENCES, PHONE_LABEL, SOCIAL, WHATSAPP } from '../data/site'
import { Arrow, LogoMark } from './Logo'
import { scrollToId } from '../lib/motion'

const waLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo site da Cantina Pôr do Sol e gostaria de mais informações.')}`

const NAV = [
  ['inicio', 'Início'],
  ['servimos', 'O que servimos'],
  ['casa', 'A casa'],
  ['ambientes', 'Ambientes'],
  ['trabalho', 'Nosso trabalho'],
  ['equipe', 'Equipe'],
  ['onde', 'Como chegar'],
  ['duvidas', 'Dúvidas'],
]

export default function Footer({ onReserve }) {
  const [cafe, pizza] = EXPERIENCES
  const h = 'mb-4 text-[14px] font-medium text-cal'
  return (
    <footer id="contato" data-footer-parallax className="relative overflow-hidden">
      <div data-footer-parallax-inner className="gutter relative bg-basalto pt-24 text-cal/70 md:pt-32" style={{ paddingBottom: 'max(28px, env(safe-area-inset-bottom, 0px))' }}>
        <div className="mx-auto max-w-[1320px]">
          <div className="grid gap-8 md:grid-cols-12 md:items-end">
            <h2 className="text-[clamp(34px,4.4vw,64px)] text-cal md:col-span-8">Venha pelo sabor autêntico, permaneça pela vista e sinta-se em casa</h2>
            <div className="md:col-span-4 md:justify-self-end">
              <button type="button" className="btn btn-ouro" onClick={() => onReserve()}>
                <span>Reservar mesa</span>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-cal/15 pt-12 text-[15px] md:grid-cols-12">
            <div className="md:col-span-3">
              <p className={h}>Horários</p>
              <p>{pizza.name}<br />{pizza.days}, {pizza.hours}</p>
              <p className="mt-3">{cafe.name}<br />{cafe.days}, {cafe.hours}</p>
            </div>
            <div className="md:col-span-3">
              <p className={h}>Contato</p>
              <p className="select-all tabular-nums text-cal">{PHONE_LABEL}</p>
              <a href={waLink} target="_blank" rel="noopener" className="ulink mt-1 inline-block">WhatsApp</a>
              <p className="mt-4">{ADDRESS.line}<br />{ADDRESS.city}<br />CEP {ADDRESS.cep}</p>
              <a href={ADDRESS.route} target="_blank" rel="noopener" className="ulink mt-1 inline-block">Traçar rota</a>
            </div>
            <div className="md:col-span-3">
              <p className={h}>Navegue</p>
              <ul className="flex flex-col gap-1.5">
                {NAV.map(([id, label]) => (
                  <li key={id}><a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id) }} className="transition-colors hover:text-cal">{label}</a></li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-3">
              <p className={h}>Redes</p>
              <ul className="flex flex-col gap-1.5">
                <li><a href={SOCIAL.instagram} target="_blank" rel="noopener" className="transition-colors hover:text-cal">Instagram</a></li>
                <li><a href={SOCIAL.facebook} target="_blank" rel="noopener" className="transition-colors hover:text-cal">Facebook</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-24 flex flex-col items-center gap-4 text-cal md:mt-32">
            <span className="bg-cal px-6 py-5"><LogoMark className="h-20 w-auto md:h-28" /></span>
            <p className="serif text-center text-[clamp(40px,9vw,128px)] leading-none" aria-hidden="true">Cantina Pôr do Sol</p>
          </div>

          <div className="mt-14 flex flex-col justify-between gap-2 border-t border-cal/15 pt-6 text-[13px] text-cal/45 sm:flex-row">
            <p>© {new Date().getFullYear()} Cantina Pôr do Sol</p>
            <p>Site por Senerine.dev</p>
          </div>
        </div>
        <div data-footer-parallax-dark className="pointer-events-none absolute inset-0 bg-black opacity-0" />
      </div>
    </footer>
  )
}
