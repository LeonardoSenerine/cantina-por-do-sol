import { useEffect, useRef, useState } from 'react'
import { CAFE } from '../data/site'
import { scrollToId } from '../lib/motion'
import { Arrow } from './Logo'
import Roll from './Roll'

// Inauguração do novo espaço do café colonial, com a reportagem do Canal Ideal.
// O vídeo (11 MB, com som) só carrega quando a pessoa aperta o play.
export default function Inauguracao({ onReserve }) {
  const video = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    setPlaying(true)
    video.current?.play()?.catch(() => {})
  }

  // pausa sozinho quando sai da tela
  useEffect(() => {
    const v = video.current
    if (!v) return
    const io = new IntersectionObserver(([e]) => { if (!e.isIntersecting && !v.paused) v.pause() }, { threshold: 0.2 })
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <section id="inauguracao" className="gutter bg-areia py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 md:grid-cols-12 md:items-center md:gap-8">
        <div className="md:col-span-6">
          <p data-fade className="flex items-baseline gap-3 text-[15px] font-medium">
            <span className="text-pinus">Inauguração</span>
            <span>Novo espaço</span>
          </p>
          <h2 data-split className="mt-6 text-[clamp(36px,4.6vw,66px)]">Inauguramos o novo espaço do café colonial</h2>
          <p data-reveal className="serif mt-8 max-w-[560px] text-[clamp(21px,1.9vw,26px)] leading-[1.35]">
            <span>O café colonial ganhou casa nova: um salão amplo de madeira, com luminárias de palha, janelas de ponta a ponta para o vale e a mesa colonial montada entre flores e folhagens.</span>
          </p>
          <p data-fade className="mt-5 max-w-[520px] text-pedra">
            Lá fora, o balanço no gramado e a vista do vale completam a manhã. É o mesmo café de sempre, agora com mais espaço e ainda mais conforto.
          </p>

          {/* a manchete da reportagem, como recorte de jornal */}
          <figure data-reveal className="mt-10 max-w-[520px] border-l-2 border-ouro pl-5">
            <blockquote className="serif text-[20px] leading-snug">“Cantina Pôr do Sol inaugura espaço sofisticado em Lajeado Grande”</blockquote>
            <figcaption className="mt-2 text-[14px] text-pedra">Reportagem do Canal Ideal sobre a inauguração</figcaption>
          </figure>

          <div data-reveal className="mt-10 flex flex-wrap gap-2.5">
            <button type="button" onClick={() => onReserve(CAFE.id)} className="btn btn-ouro">
              <Roll>Reservar o café colonial</Roll>
              <span className="sq" aria-hidden="true"><Arrow /></span>
            </button>
            <a href="#cafe" onClick={(e) => { e.preventDefault(); scrollToId('cafe') }} className="btn btn-linha">
              <Roll>Horários e valores</Roll>
            </a>
          </div>
        </div>

        {/* vídeo em pé, como foi gravado; tamanho fixo para não pular ao carregar */}
        <div className="md:col-span-5 md:col-start-8">
          <div data-img-reveal className="relative mx-auto aspect-[9/16] w-full max-w-[420px] overflow-hidden bg-basalto">
            <video
              ref={video}
              src="./video/inauguracao.mp4"
              poster="./img/inauguracao-capa.webp"
              preload="none"
              playsInline
              controls={playing}
              onPlay={() => setPlaying(true)}
              className="absolute inset-0 h-full w-full object-cover"
              aria-label="Reportagem do Canal Ideal sobre a inauguração do novo espaço da Cantina Pôr do Sol"
            />
            {!playing && (
              <button
                type="button"
                onClick={play}
                className="group absolute inset-0 flex items-end justify-start bg-linear-to-t from-basalto/70 via-basalto/0 to-basalto/0 p-5 text-left text-cal"
                aria-label="Assistir à reportagem da inauguração, com som"
              >
                <span className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center bg-ouro text-basalto transition-transform duration-500 ease-[var(--ease-osmo)] group-hover:scale-110">
                    <svg viewBox="0 0 12 14" className="ml-0.5 h-4 w-4" fill="currentColor" aria-hidden="true"><path d="M0 0l12 7-12 7z" /></svg>
                  </span>
                  <span>
                    <span className="serif block text-[22px] leading-tight">Assista à inauguração</span>
                    <span className="mt-0.5 block text-[14px] text-cal/75">Reportagem · 1min35 · com som</span>
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
