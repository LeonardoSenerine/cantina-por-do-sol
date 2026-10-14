import { Arrow } from './Logo'
import { scrollToId } from '../lib/motion'
import { EXPERIENCES, srcSet } from '../data/site'

const [cafe, pizza] = EXPERIENCES

export default function Hero({ onReserve }) {
  return (
    <section id="inicio" className="pt-[calc(env(safe-area-inset-top,0px)+76px)] md:pt-[88px]">
      <div className="grid md:min-h-[calc(100svh-88px)] md:grid-cols-2">
        {/* texto */}
        <div className="gutter flex flex-col justify-between pb-12 pt-14 md:pb-14 md:pt-20 md:pr-12 lg:pr-20">
          <div className="max-w-[620px]">
            <p data-hero-fade className="serif text-[17px] text-pedra md:text-[18px]">Lajeado Grande, Santa Catarina</p>
            <h1 data-hero-title className="mt-5 text-[clamp(40px,5.2vw,80px)]">
              Onde o sabor encontra uma vista inesquecível
            </h1>
            <p data-hero-fade className="mt-7 max-w-[500px] text-[18px] text-pedra">
              Há lugares em que a paisagem, por si só, já justifica a experiência. Aqui o fim de tarde tinge o céu de cores únicas enquanto a mesa é servida.
            </p>
            <div data-hero-fade className="mt-9 flex flex-wrap gap-2.5">
              <button type="button" className="btn btn-ouro" onClick={() => onReserve()}>
                <span>Reservar pelo WhatsApp</span>
                <span className="sq" aria-hidden="true"><Arrow /></span>
              </button>
              <a href="#servimos" className="btn btn-linha" onClick={(e) => { e.preventDefault(); scrollToId('servimos') }}>
                Nossas experiências
              </a>
            </div>
          </div>

          <dl data-hero-fade className="mt-14 grid max-w-[620px] grid-cols-2 gap-6 border-t border-linha pt-6 text-[15px]">
            <div>
              <dt className="text-pedra">{pizza.name}</dt>
              <dd className="mt-1">{pizza.days}, {pizza.hours}</dd>
            </div>
            <div>
              <dt className="text-pedra">{cafe.name}</dt>
              <dd className="mt-1">{cafe.days}, {cafe.hours}</dd>
            </div>
          </dl>
        </div>

        {/* a mesa posta com o vale pela janela */}
        <div data-hero-img data-parallax className="frame h-[78svh] min-h-[460px] md:h-auto md:min-h-0">
          <img
            src="./img/vista-tabua-2.webp"
            srcSet={srcSet('./img/vista-tabua-2.webp')}
            sizes="(min-width: 768px) 50vw, 100vw"
            alt="Tábua de frios e bruschettas sobre a mesa, com o vale verde visto pela janela do salão de cima"
            fetchPriority="high"
            style={{ objectPosition: '50% 85%' }}
          />
        </div>
      </div>
    </section>
  )
}
