import { useEffect, useRef, useState } from 'react'
import { gsap, useGSAP, getLenis, prefersReduced } from '../lib/motion'
import { EXPERIENCES, PRICE, WHATSAPP } from '../data/site'
import { Arrow } from './Logo'

const BOOKABLE = EXPERIENCES.filter((e) => e.weekdays)
const DAY_NAMES = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado']

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}
const parseISO = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
// próxima data válida para a experiência, a partir de hoje
const nextDateFor = (exp) => {
  const d = parseISO(todayISO())
  for (let i = 0; i < 8; i++) {
    if (exp.weekdays.includes(d.getDay())) break
    d.setDate(d.getDate() + 1)
  }
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
const prettyDate = (s) => {
  const d = parseISO(s)
  return `${DAY_NAMES[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`
}

function buildMessage(f, exp) {
  const people = [`${f.adults} ${f.adults === 1 ? 'adulto' : 'adultos'}`]
  if (f.kids69 > 0) people.push(`${f.kids69} ${f.kids69 === 1 ? 'criança' : 'crianças'} de 6 a 9 anos`)
  if (f.kids05 > 0) people.push(`${f.kids05} ${f.kids05 === 1 ? 'criança' : 'crianças'} até 5 anos`)
  const lines = [
    `Olá! Gostaria de reservar o *${exp.name.toLowerCase()}* para *${prettyDate(f.date)}*, às *${f.time.replace(':', 'h')}*.`,
    `Seremos ${people.join(', ')}.`,
    `Nome: ${f.name.trim()}`,
  ]
  if (f.notes.trim()) lines.push(`Observação: ${f.notes.trim()}`)
  lines.push('(Mensagem enviada pelo site)')
  return lines.join('\n')
}

export default function ReserveDrawer({ state, onClose }) {
  const root = useRef(null)
  const panel = useRef(null)
  const tl = useRef(null)
  const lastFocus = useRef(null)

  const initialExp = BOOKABLE[1]
  const [form, setForm] = useState({
    exp: initialExp.id, date: nextDateFor(initialExp), time: initialExp.slots[2],
    adults: 2, kids69: 0, kids05: 0, name: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  const [sentUrl, setSentUrl] = useState(null)
  const exp = BOOKABLE.find((e) => e.id === form.exp)

  const set = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }))
    setErrors((e) => ({ ...e, [k]: undefined }))
  }
  const chooseExp = (id) => {
    const e = BOOKABLE.find((x) => x.id === id)
    setForm((f) => ({ ...f, exp: id, date: nextDateFor(e), time: e.slots[id === 'pizza' ? 2 : 1] }))
    setErrors({})
  }

  // abre já com a experiência que a pessoa clicou
  useEffect(() => {
    if (state.open && state.exp && state.exp !== form.exp) chooseExp(state.exp)
    if (state.open) setSentUrl(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.open, state.exp])

  useGSAP(
    () => {
      const items = panel.current.querySelectorAll('[data-drawer-item]')
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'osmo' } })
        .set(root.current, { display: 'block' })
        .fromTo('[data-drawer-overlay]', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6 })
        .fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.9 }, '<')
        .fromTo(items, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.05 }, '<0.3')
    },
    { scope: root },
  )

  useEffect(() => {
    const t = tl.current
    if (!t) return
    const lenis = getLenis()
    if (state.open) {
      lastFocus.current = document.activeElement
      lenis?.stop()
      document.documentElement.style.overflow = 'hidden'
      if (prefersReduced()) t.progress(1)
      else t.timeScale(1).play()
      setTimeout(() => panel.current?.querySelector('[data-autofocus]')?.focus({ preventScroll: true }), 350)
    } else if (t.progress() > 0) {
      lenis?.start()
      document.documentElement.style.overflow = ''
      if (prefersReduced()) t.progress(0)
      else t.timeScale(1.6).reverse()
      lastFocus.current?.focus?.({ preventScroll: true })
    }
  }, [state.open])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && state.open && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.open, onClose])

  const submit = (e) => {
    e.preventDefault()
    const err = {}
    if (!form.date) err.date = 'Escolha a data.'
    else if (form.date < todayISO()) err.date = 'Escolha uma data a partir de hoje.'
    else if (!exp.weekdays.includes(parseISO(form.date).getDay()))
      err.date = `O ${exp.name.toLowerCase()} acontece ${exp.days.toLowerCase()}. Escolha outro dia.`
    if (!(form.adults >= 1)) err.adults = 'Informe pelo menos 1 adulto.'
    if (form.name.trim().length < 2) err.name = 'Escreva seu nome para a reserva.'
    setErrors(err)
    if (Object.keys(err).length) {
      panel.current.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(buildMessage(form, exp))}`
    setSentUrl(url)
    window.open(url, '_blank', 'noopener')
  }

  const num = (k, min, max) => (
    <div className="field" data-drawer-item>
      <label htmlFor={`r-${k}`}>{{ adults: 'Adultos', kids69: 'Crianças 6 a 9', kids05: 'Crianças até 5' }[k]}</label>
      <div className="flex h-12 items-center border border-[#D9D0C2] bg-cal" aria-invalid={errors[k] ? 'true' : undefined}>
        <button type="button" className="grid h-full w-11 place-items-center text-[20px]" onClick={() => set(k, Math.max(min, form[k] - 1))} aria-label="Diminuir">−</button>
        <input id={`r-${k}`} type="number" inputMode="numeric" min={min} max={max} value={form[k]}
          onChange={(e) => set(k, Math.min(max, Math.max(min, parseInt(e.target.value || '0', 10))))}
          className="h-full! w-full border-0! bg-transparent! p-0! text-center tabular-nums outline-none!" />
        <button type="button" className="grid h-full w-11 place-items-center text-[20px]" onClick={() => set(k, Math.min(max, form[k] + 1))} aria-label="Aumentar">+</button>
      </div>
      {errors[k] && <p className="mt-1.5 text-[13px] text-[#A8321F]">{errors[k]}</p>}
    </div>
  )

  return (
    <div ref={root} className="fixed inset-0 z-[80] hidden" role="dialog" aria-modal="true" aria-labelledby="reserve-title" aria-hidden={!state.open}>
      <div data-drawer-overlay className="absolute inset-0 bg-basalto/45" onClick={onClose} />
      <div ref={panel} data-lenis-prevent className="absolute inset-y-0 right-0 flex w-full max-w-[520px] flex-col overflow-y-auto bg-cal" style={{ paddingTop: 'env(safe-area-inset-top, 0px)', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
        <div className="flex items-center justify-between px-6 pt-6 md:px-9" data-drawer-item>
          <p className="text-[15px] font-medium">Reserva</p>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center border border-basalto/20 hover:bg-basalto hover:text-cal" aria-label="Fechar reserva">
            <svg viewBox="0 0 12 12" className="h-3 w-3" stroke="currentColor" strokeWidth="1.5"><path d="M1 1l10 10M11 1L1 11" /></svg>
          </button>
        </div>

        {sentUrl ? (
          <div className="flex flex-1 flex-col px-6 pb-10 pt-8 md:px-9">
            <h2 id="reserve-title" className="text-[38px]">Mensagem pronta</h2>
            <p className="mt-4 text-pedra">Abrimos o WhatsApp com o pedido preenchido. Envie a mensagem por lá e a cantina confirma a sua reserva.</p>
            <pre className="mt-6 whitespace-pre-wrap bg-cal p-5 font-sans text-[15px] leading-relaxed">{buildMessage(form, exp).replace(/\*/g, '')}</pre>
            <a href={sentUrl} target="_blank" rel="noopener" className="btn btn-ouro mt-6 self-start">
              <span>Abrir o WhatsApp de novo</span>
              <span className="sq" aria-hidden="true"><Arrow /></span>
            </a>
            <button type="button" onClick={() => setSentUrl(null)} className="mt-4 self-start text-[15px] underline underline-offset-4">Editar pedido</button>
          </div>
        ) : (
          <form noValidate onSubmit={submit} className="flex flex-1 flex-col gap-6 px-6 pb-10 pt-6 md:px-9">
            <div data-drawer-item>
              <h2 id="reserve-title" className="text-[clamp(34px,5vw,44px)]">Reserve sua mesa</h2>
              <p className="mt-3 text-[15px] text-pedra">Preencha e a gente monta a mensagem no WhatsApp. A reserva é confirmada por lá.</p>
            </div>

            <fieldset data-drawer-item>
              <legend className="mb-2 text-[13px] font-medium text-pedra">Experiência</legend>
              <div className="grid grid-cols-2 gap-2">
                {BOOKABLE.map((e, i) => (
                  <label key={e.id} className={`cursor-pointer border p-4 transition-colors ${form.exp === e.id ? 'border-basalto bg-basalto text-cal' : 'border-[#D9D0C2] bg-cal hover:border-basalto/50'}`}>
                    <input type="radio" name="exp" value={e.id} checked={form.exp === e.id} onChange={() => chooseExp(e.id)} className="sr-only" data-autofocus={i === 0 ? true : undefined} />
                    <span className="serif block text-[21px] leading-tight">{e.name}</span>
                    <span className={`mt-1 block text-[13px] ${form.exp === e.id ? 'text-cal/70' : 'text-pedra'}`}>{e.days} · {e.hours}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="grid grid-cols-2 gap-3" data-drawer-item>
              <div className="field">
                <label htmlFor="r-date">Data</label>
                <input id="r-date" type="date" min={todayISO()} value={form.date} onChange={(e) => set('date', e.target.value)} aria-invalid={errors.date ? 'true' : undefined} aria-describedby="r-date-hint" />
              </div>
              <div className="field">
                <label htmlFor="r-time">Horário</label>
                <select id="r-time" value={form.time} onChange={(e) => set('time', e.target.value)}>
                  {exp.slots.map((s) => <option key={s} value={s}>{s.replace(':', 'h')}</option>)}
                </select>
              </div>
              <p id="r-date-hint" className={`col-span-2 -mt-1 text-[13px] ${errors.date ? 'text-[#A8321F]' : 'text-pedra'}`}>
                {errors.date || (form.date ? `${prettyDate(form.date)} · ${exp.days.toLowerCase()}` : '')}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {num('adults', 1, 40)}
              {num('kids69', 0, 20)}
              {num('kids05', 0, 20)}
            </div>
            <p className="-mt-3 text-[13px] text-pedra" data-drawer-item>A partir de {PRICE.from} por pessoa. {PRICE.kids}.</p>

            <div className="field" data-drawer-item>
              <label htmlFor="r-name">Nome</label>
              <input id="r-name" type="text" autoComplete="name" value={form.name} onChange={(e) => set('name', e.target.value)} aria-invalid={errors.name ? 'true' : undefined} placeholder="Como devemos chamar você" />
              {errors.name && <p className="mt-1.5 text-[13px] text-[#A8321F]">{errors.name}</p>}
            </div>

            <div className="field" data-drawer-item>
              <label htmlFor="r-notes">Observação <span className="font-normal">(opcional)</span></label>
              <textarea id="r-notes" value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Aniversário, cadeirinha, mesa perto da janela…" />
            </div>

            <div className="mt-auto pt-2" data-drawer-item>
              <button type="submit" className="btn btn-ouro w-full justify-between">
                <span>Enviar pedido pelo WhatsApp</span>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
