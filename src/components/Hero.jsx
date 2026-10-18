import { Arrow } from './Logo'
import Roll from './Roll'
import Price from './Price'
import { scrollToId } from '../lib/motion'
import { CAFE, KIDS, PIZZA, SATURDAY, SUNDAY } from '../data/site'

// o café da tarde acontece no sábado e no domingo, com horários diferentes
const ROWS = SUNDAY.map((m) =>
  m.short === SATURDAY.short
    ? { ...m, when: [`${SATURDAY.day}, ${SATURDAY.from} às ${SATURDAY.to}`, `${m.day}, ${m.from} às ${m.to}`] }
    : { ...m, when: [`${m.day}, ${m.from} às ${m.to}`] },
)

// Topo em clima de inauguração: quem entra já vê os momentos do fim de semana,
// como funcionam e quanto custam. O título fica como está (é o LCP).
export default function Hero({ onReserve }) {
  return (
    <section id="inicio" className="pt-[calc(env(safe-area-inset-top,0px)+76px)] md:pt-[88px]">
      {/* no celular a foto fica ao fundo, com o texto por cima; a partir de md, lado a lado */}
      <div className="relative grid md:min-h-[calc(100svh-88px)] md:grid-cols-2">
        {/* texto */}
        <div className="gutter relative z-10 flex flex-col justify-center pb-10 pt-14 max-md:min-h-[calc(100svh-76px)] max-md:justify-end max-md:pt-28 max-md:text-cal md:pb-14 md:pt-16 md:pr-12 lg:pr-20">
          <div className="max-w-[620px]">
            <p data-hero-fade className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[15px] font-medium">
              <span className="flex items-center gap-2 text-pinus max-md:text-ouro">
                <span className="block h-2 w-2 rounded-full bg-current" aria-hidden="true" />
                Inauguração do novo espaço
              </span>
              <span className="text-pedra max-md:text-cal/75">Sábado e domingo</span>
            </p>
            <h1 data-hero-title className="mt-5 text-[clamp(38px,4.4vw,70px)]">
              Onde o sabor encontra uma vista inesquecível
            </h1>
            <p data-hero-fade className="mt-6 max-w-[500px] text-[18px] text-pedra max-md:hidden">
              O café colonial ganhou casa nova. No domingo, o dia tem três momentos, e o café da tarde agora também é servido no sábado:
            </p>

            {/* os momentos do fim de semana, com dia, horário e valor */}
            <ol data-hero-fade className="mt-7 border-y border-linha max-md:border-cal/25" aria-label="Fim de semana na cantina">
              {ROWS.map((m) => (
                <li key={m.name} className="flex items-center justify-between gap-4 border-t border-linha py-3 first:border-t-0 max-md:border-cal/20 md:py-3.5">
                  <span>
                    <span className="serif block text-[22px] leading-tight md:text-[24px]">{m.short}</span>
                    {m.when.map((w) => (
                      <span key={w} className="mt-0.5 block text-[14px] tabular-nums text-pedra max-md:text-cal/75">{w}</span>
                    ))}
                  </span>
                  <Price value={m.exp.prices[0].price} className="text-[30px] leading-none md:text-[34px]" />
                </li>
              ))}
            </ol>
            <p data-hero-fade className="mt-3 text-[14px] text-pedra max-md:text-cal/75">
              Valor por pessoa, com reserva pelo WhatsApp. {KIDS}.
            </p>

            <div data-hero-fade className="mt-7 flex flex-wrap gap-2.5">
              <button type="button" className="btn btn-ouro" onClick={() => onReserve(CAFE.id)}>
                <Roll>Reservar o café ou almoço</Roll>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
              <a href="#inauguracao" className="btn btn-linha max-md:border-cal/70 max-md:text-cal" onClick={(e) => { e.preventDefault(); scrollToId('inauguracao') }}>
                <Roll>Conheça o novo espaço</Roll>
              </a>
            </div>

            {/* o rodízio, com o valor de cada noite */}
            <div data-hero-fade className="mt-8 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-linha pt-5 max-md:border-cal/25">
              <p>
                <span className="serif block text-[22px] leading-tight md:text-[24px]">{PIZZA.name}</span>
                <span className="mt-0.5 block text-[14px] text-pedra max-md:text-cal/75">{PIZZA.days}, {PIZZA.hours}</span>
              </p>
              <dl className="flex gap-6">
                {PIZZA.prices.map((p) => (
                  <div key={p.label}>
                    <dt className="text-[13px] text-pedra max-md:text-cal/75">{p.label}</dt>
                    <dd><Price value={p.price} className="text-[28px] leading-none md:text-[30px]" /></dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* o pôr do sol sobre o vale, visto do banco da cantina */}
        <div data-hero-img data-parallax className="frame max-md:absolute max-md:inset-0">
          <img
            src="./img/por-do-sol-chimarrao.webp"
            srcSet="./img/por-do-sol-chimarrao-800.webp 800w, ./img/por-do-sol-chimarrao.webp 1440w"
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Pôr do sol sobre o vale verde, com uma cuia de chimarrão na mão e o banco de madeira da Cantina Pôr do Sol ao lado"
            fetchPriority="high"
            style={{ objectPosition: '50% 45%' }}
          />
          {/* só no celular: escurece de cima para baixo para o texto ler bem */}
          <div className="absolute inset-0 bg-linear-to-b from-basalto/45 via-basalto/65 to-basalto/95 md:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
