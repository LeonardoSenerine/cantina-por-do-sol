import { SOCIAL } from '../data/site'
import { Arrow } from './Logo'
import Carrossel from './Carrossel'

export default function Casa() {
  return (
    <>
      {/* bloco escuro, como o "About us" do Studenterkilden, com a tábua da casa ao lado */}
      <section id="casa" className="gutter bg-basalto py-24 text-cal md:py-32">
        <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-12 md:items-center md:gap-8">
          {/* foto em tamanho contido: o original tem 960px de largura e esticado na tela toda perde nitidez */}
          <div className="order-2 md:order-1 md:col-span-5">
            <div data-parallax className="frame aspect-[4/5]">
              <img
                src="./img/tabua.webp"
                srcSet="./img/tabua-800.webp 800w, ./img/tabua.webp 960w"
                sizes="(min-width: 1320px) 520px, (min-width: 768px) 40vw, 100vw"
                alt="Tábua de frios da casa: salame, copa, lombo defumado e bruschettas, com limão e geleia"
                loading="lazy"
              />
            </div>
          </div>
          <div className="order-1 md:order-2 md:col-span-6 md:col-start-7">
            <p className="text-[15px] font-medium">Nossa essência</p>
            <p className="serif mt-3 text-[22px] text-ouro">Gastronomia artesanal</p>
            <p data-split className="serif mt-8 text-[clamp(24px,2.3vw,34px)] leading-[1.3]">
              Acreditamos no valor da comida feita com alma. Cerca de 95% dos nossos produtos são de fabricação própria, preparados artesanalmente com receitas exclusivas e o rigor de quem preza pela excelência em cada detalhe.
            </p>
            <div data-reveal className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a href="#onde" className="btn btn-linha-clara">Como chegar</a>
              <p className="text-[15px] text-cal/60">Leonir e Maristela, família Geroldi</p>
            </div>
          </div>
        </div>
      </section>

      {/* ambientes: o texto por cima do mosaico de fotos */}
      <section id="ambientes" aria-label="Ambientes">
        <Carrossel>
          <div className="mx-auto max-w-[820px] text-center">
            <p className="text-[15px] font-medium text-ouro">Ambientes</p>
            <p data-split className="serif mt-6 text-[clamp(26px,3vw,42px)] leading-[1.25]">
              Salão de madeira com lâmpadas de filamento, uma sala de pedra com sofá e cristaleira, e o andar de cima com janelas de ponta a ponta. Pode chegar com calma.
            </p>
            <div data-reveal className="mt-10">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[15px]">
                <span className="ulink">Mais fotos no Instagram</span>
                <Arrow />
              </a>
            </div>
          </div>
        </Carrossel>
      </section>
    </>
  )
}
