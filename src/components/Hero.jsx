import { Arrow } from './Logo'
import { scrollToId } from '../lib/motion'
import { EXPERIENCES } from '../data/site'

const [cafe, pizza] = EXPERIENCES

export default function Hero({ onReserve }) {
  return (
    <section id="inicio" className="pt-[calc(env(safe-area-inset-top,0px)+76px)] md:pt-[88px]">
      {/* no celular a foto fica ao fundo, com o texto por cima; a partir de md, lado a lado */}
      <div className="relative grid md:min-h-[calc(100svh-88px)] md:grid-cols-2">
        {/* texto */}
        <div className="gutter relative z-10 flex flex-col justify-between pb-12 pt-14 max-md:min-h-[calc(100svh-76px)] max-md:justify-end max-md:pt-40 max-md:text-cal md:pb-14 md:pt-20 md:pr-12 lg:pr-20">
          <div className="max-w-[620px]">
            <p data-hero-fade className="serif text-[17px] text-pedra max-md:text-cal/85 md:text-[18px]">Lajeado Grande, Santa Catarina</p>
            <h1 data-hero-title className="mt-5 text-[clamp(40px,5.2vw,80px)]">
              Onde o sabor encontra uma vista inesquecível
            </h1>
            <p data-hero-fade className="mt-7 max-w-[500px] text-[18px] text-pedra max-md:text-cal/85">
              Há lugares em que a paisagem, por si só, já justifica a experiência. Aqui o fim de tarde tinge o céu de cores únicas enquanto a mesa é servida.
            </p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-2.5">
              <button type="button" className="btn btn-ouro" onClick={() => onReserve()}>
                <span>Reservar pelo WhatsApp</span>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
              <a href="#servimos" className="btn btn-linha max-md:border-cal/70 max-md:text-cal" onClick={(e) => { e.preventDefault(); scrollToId('servimos') }}>
                Nossas experiências
              </a>
            </div>
          </div>

          <dl data-hero-fade className="mt-14 grid max-w-[620px] grid-cols-2 gap-6 border-t border-linha pt-6 text-[15px] max-md:mt-10 max-md:border-cal/25">
            <div>
              <dt className="text-pedra max-md:text-cal/70">{pizza.name}</dt>
              <dd className="mt-1">{pizza.days}, {pizza.hours}</dd>
            </div>
            <div>
              <dt className="text-pedra max-md:text-cal/70">{cafe.name}</dt>
              <dd className="mt-1">{cafe.days}, {cafe.hours}</dd>
            </div>
          </dl>
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
          <div className="absolute inset-0 bg-linear-to-b from-basalto/0 via-basalto/45 to-basalto/90 md:hidden" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
