import { SOCIAL } from '../data/site'
import { Arrow } from './Logo'
import Mosaico from './Mosaico'

// só comida: o que sai da cozinha da casa
const POOL = [
  'buffet-palmas', 'tabua', 'buffet-cuca', 'pao', 'buffet-empadas', 'salames', 'buffet-geleia', 'vista-tabua',
  'buffet-mesa', 'vista-tabua-2',
]

export default function Trabalho() {
  return (
    <section id="trabalho" aria-label="Nosso trabalho">
      {/* 4×2 no computador; 2×3 no celular */}
      <Mosaico pool={POOL} count={8} mobile={6} grid="grid-cols-2 grid-rows-3 md:grid-cols-4 md:grid-rows-2" every={1400}>
        <div className="mx-auto max-w-[820px] text-center">
          <p data-fade className="text-[15px] font-medium text-ouro">Nosso trabalho</p>
          <h2 data-split className="mt-6 text-[clamp(36px,5vw,72px)]">Conheça mais nosso trabalho</h2>
          <p data-reveal className="mx-auto mt-6 max-w-[560px] text-[18px] text-cal/85">
            <span>Cucas, pães, empadas, geleias, frios e tábuas montadas na hora: quase tudo o que vai à mesa sai da nossa cozinha.</span>
          </p>
          <div data-reveal className="mt-10">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-[15px]">
              <span className="ulink">Mais no Instagram {SOCIAL.instagramLabel}</span>
              <Arrow />
            </a>
          </div>
        </div>
      </Mosaico>
    </section>
  )
}
