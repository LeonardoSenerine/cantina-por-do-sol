import { ALMOCO, CAFE, KIDS, MESA, PIZZA, SUNDAY, VISITA, WHATSAPP, srcSet } from '../data/site'
import { Arrow } from './Logo'
import Roll from './Roll'
import Price from './Price'

const visitLink = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Vim pelo site e gostaria de combinar uma visitação à Cantina Pôr do Sol.')}`

// cabeçalho comum às três seções: número, rótulo e título
function Head({ n, label, title, dark }) {
  return (
    <div className="grid gap-5 md:grid-cols-12">
      <p data-fade className="flex items-baseline gap-3 text-[15px] font-medium md:col-span-4">
        <span className={`tabular-nums ${dark ? 'text-ouro' : 'text-pinus'}`}>{n} / 03</span>
        <span>{label}</span>
      </p>
      <h2 data-split className="text-[clamp(34px,4.4vw,62px)] md:col-span-8">{title}</h2>
    </div>
  )
}

function Domingo({ onReserve }) {
  return (
    <section id="cafe" className="gutter py-24 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Head n="01" label="Aos domingos" title="Café colonial e almoço, do começo da manhã ao fim da tarde" />

        <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* fotos: a mesa do café e, por cima, um detalhe da cuca */}
          <div className="md:col-span-5">
            <div data-img-reveal className="frame aspect-[4/5]">
              <img
                src="./img/buffet-palmas.webp"
                srcSet={srcSet('./img/buffet-palmas.webp')}
                sizes="(min-width: 768px) 40vw, 100vw"
                alt="Mesa do café colonial com folhagens, palmas douradas, cucas, pães e empadas"
                loading="lazy"
              />
            </div>
            <div data-img-reveal className="frame relative -mt-20 ml-auto aspect-square w-[46%] border-8 border-cal md:-mr-10 md:-mt-28">
              <img src="./img/buffet-cuca-800.webp" alt="Cuca da casa servida no café colonial" loading="lazy" />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p data-reveal className="serif text-[clamp(22px,2vw,28px)] leading-[1.35]">
              <span>Domingo é dia de mesa farta. A casa abre cedo e o dia se divide em três momentos, cada um com o seu tempo.</span>
            </p>

            {/* o programa do domingo, na ordem do dia */}
            <ol data-reveal data-stagger="90" className="mt-10 border-b border-linha">
              {SUNDAY.map((m) => (
                <li key={m.name} className="border-t border-linha py-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-[15px] font-medium tabular-nums text-pinus">{m.from} às {m.to}</p>
                    <Price value={m.exp.prices[0].price} className="text-[30px] leading-none" />
                  </div>
                  <h3 className="mt-3 text-[26px] md:text-[30px]">{m.name}</h3>
                  <p className="mt-2 max-w-[480px] text-pedra">{m.text}</p>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[14px] text-pedra">Valores por pessoa. {KIDS}.</p>

            <div data-reveal className="mt-12">
              <p className="text-[15px] font-medium">Na mesa, feito na casa</p>
              <ul className="serif mt-4 flex flex-wrap gap-x-2 gap-y-1 text-[clamp(20px,1.8vw,24px)] leading-snug">
                {MESA.map((item, i) => (
                  <li key={item}>
                    {item}
                    {i < MESA.length - 1 && <span className="ml-2 text-ouro" aria-hidden="true">·</span>}
                  </li>
                ))}
              </ul>
              <p className="mt-4 max-w-[480px] text-pedra">Receitas de família, preparadas na cozinha da casa. Cerca de 95% do que vai à mesa é de fabricação própria.</p>
            </div>

            <div data-reveal className="mt-10 flex flex-wrap gap-2.5">
              <button type="button" onClick={() => onReserve(CAFE.id)} className="btn btn-ouro">
                <Roll>Reservar o café colonial</Roll>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
              <button type="button" onClick={() => onReserve(ALMOCO.id)} className="btn btn-linha">
                <Roll>Reservar o almoço</Roll>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const PIZZA_NOTES = [
  ['Massa', 'artesanal, maturada por 24 horas'],
  ['Forno', 'a lenha'],
  ['Sabores', 'ampla variedade passando à vontade, da clássica marguerita em diante'],
  ['Para acompanhar', 'uma taça de vinho tinto'],
]

function Rodizio({ onReserve }) {
  return (
    <section id="pizza" className="gutter bg-basalto py-24 text-cal md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Head n="02" label="Quinta, sexta e sábado" title="Rodízio de pizzas, com massa de 24 horas e forno a lenha" dark />

        <div className="mt-14 grid gap-14 md:mt-24 md:grid-cols-12 md:gap-8">
          {/* fotos: a marguerita de perto e, por cima, a mesa com o vinho */}
          <div className="md:col-span-7">
            <div data-img-reveal className="frame aspect-[4/3] md:w-[88%]">
              <img
                src="./img/pizza-marguerita.webp"
                srcSet="./img/pizza-marguerita-800.webp 800w, ./img/pizza-marguerita.webp 1280w"
                sizes="(min-width: 768px) 50vw, 100vw"
                alt="Duas fatias de pizza marguerita com rodelas de tomate, muçarela derretida, manjericão e azeitona preta"
                loading="lazy"
              />
            </div>
            <div data-img-reveal className="frame relative -mt-16 ml-auto aspect-[4/3] w-[62%] border-8 border-basalto md:-mt-32 md:w-[52%]">
              <img
                src="./img/pizza-vinho-800.webp"
                alt="Fatia de pizza no prato ao lado de uma garrafa e uma taça de vinho tinto, na mesa de madeira do salão"
                loading="lazy"
              />
            </div>
          </div>

          <div className="md:col-span-5">
            <p data-reveal className="serif text-[clamp(22px,2vw,28px)] leading-[1.35]">
              <span>A noite na cantina tem cheiro de lenha. As pizzas saem do forno e passam pela mesa, uma atrás da outra, até a última fatia.</span>
            </p>

            {/* o valor muda conforme o dia */}
            <dl data-reveal className="mt-10 grid grid-cols-2 border-y border-cal/15">
              {PIZZA.prices.map((p, i) => (
                <div key={p.label} className={`py-6 ${i === 0 ? 'border-r border-cal/15 pr-4' : 'pl-6'}`}>
                  <dt className="text-[15px] text-cal/65">{p.label}</dt>
                  <dd className="mt-2"><Price value={p.price} className="text-[clamp(40px,4.4vw,58px)] leading-none text-ouro" /></dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-[14px] text-cal/60">Por pessoa, das 18h30 à meia-noite. {KIDS}.</p>

            <ul data-reveal data-stagger="80" className="mt-10 text-[17px]">
              {PIZZA_NOTES.map(([k, v]) => (
                <li key={k} className="grid grid-cols-[108px_1fr] gap-4 md:grid-cols-[132px_1fr] border-t border-cal/15 py-3.5 first:border-t-0">
                  <span className="text-cal/55">{k}</span>
                  <span>{v}</span>
                </li>
              ))}
            </ul>

            <div data-reveal className="mt-10">
              <button type="button" onClick={() => onReserve(PIZZA.id)} className="btn btn-ouro">
                <Roll>Reservar o rodízio</Roll>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PorDoSol({ onReserve }) {
  return (
    <section id="por-do-sol" className="gutter py-24 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Head n="03" label="Todo fim de tarde" title="O pôr do sol que dá nome à casa" />

        <div data-parallax data-img-reveal className="frame mt-14 aspect-[4/5] md:mt-24 md:aspect-[21/9]">
          <img
            src="./img/por-do-sol-salao.webp"
            srcSet={srcSet('./img/por-do-sol-salao.webp')}
            sizes="(min-width: 1320px) 1320px, 100vw"
            alt="O sol se pondo no horizonte ao lado do salão de madeira da cantina, visto entre folhagens"
            loading="lazy"
          />
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-6">
            <p data-split className="serif text-[clamp(22px,2vw,28px)] leading-[1.35]">
              Do salão de cima, o horizonte se contempla em sua plenitude. Um cenário espetacular que inspira brindes, registros marcantes e momentos especiais em boa companhia.
            </p>
            <p data-fade className="mt-6 text-pedra">Dica da casa: chegue cedo e garanta a mesa perto da janela para a hora dourada.</p>
          </div>

          {/* visitação: para quem quer só conhecer */}
          <div data-reveal className="border-t border-basalto pt-6 md:col-span-5 md:col-start-8">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-[30px]">{VISITA.name}</h3>
              <Price value={VISITA.price} className="text-[clamp(40px,4vw,52px)] leading-none" />
            </div>
            <p className="mt-4 text-pedra">{VISITA.text}</p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              <a href={visitLink} target="_blank" rel="noopener" className="btn btn-ouro">
                <Roll>Combinar visita</Roll>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </a>
              <button type="button" onClick={() => onReserve()} className="btn btn-linha">
                <Roll>Reservar uma mesa</Roll>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// "O que servimos": antes eram três cartões, agora são três seções inteiras
export default function Servimos({ onReserve }) {
  return (
    <div id="servimos">
      <Domingo onReserve={onReserve} />
      <Rodizio onReserve={onReserve} />
      <PorDoSol onReserve={onReserve} />
    </div>
  )
}
