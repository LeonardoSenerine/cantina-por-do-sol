import { useEffect, useState } from 'react'
import { ADDRESS } from '../data/site'
import { Arrow } from './Logo'

export default function Mapa() {
  // se o mapa for bloqueado (ex.: prévia sem permissão para embutir sites), mostra um cartão no lugar
  const [blocked, setBlocked] = useState(false)
  // o mapa só recebe toque e rolagem depois de um clique, para nunca prender a rolagem da página
  // nem mostrar o aviso "use Ctrl + rolar" do Google
  const [active, setActive] = useState(false)
  useEffect(() => {
    const onViolation = (e) => { if (/google/.test(e.blockedURI || '')) setBlocked(true) }
    document.addEventListener('securitypolicyviolation', onViolation)
    return () => document.removeEventListener('securitypolicyviolation', onViolation)
  }, [])

  return (
    <section id="onde" className="gutter border-t border-linha py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] gap-10 md:grid-cols-12 md:gap-6">
        <div className="flex flex-col md:col-span-4">
          <p className="text-[15px] font-medium">Como chegar</p>
          <h2 data-split className="mt-5 text-[clamp(32px,3.6vw,50px)]">Linha Santin, interior de Lajeado Grande</h2>
          <p className="mt-6 text-pedra">
            {ADDRESS.line}<br />{ADDRESS.city}, CEP {ADDRESS.cep}
          </p>
          <div className="mt-8 flex flex-wrap gap-2.5">
            <a href={ADDRESS.route} target="_blank" rel="noopener" className="btn btn-ouro">
              <span>Traçar rota</span>
              <span className="sq" aria-hidden="true"><Arrow /></span>
            </a>
            <a href={ADDRESS.maps} target="_blank" rel="noopener" className="btn btn-linha">Abrir no Google Maps</a>
          </div>
        </div>

        <div className="relative h-[420px] overflow-hidden bg-areia md:col-span-8 md:h-[560px]" onMouseLeave={() => setActive(false)}>
          {blocked ? (
            <a href={ADDRESS.maps} target="_blank" rel="noopener" className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
              <span className="serif text-[26px]">Ver no Google Maps</span>
              <span className="text-[14px] tabular-nums text-pedra">{ADDRESS.lat}, {ADDRESS.lng}</span>
            </a>
          ) : (
            <iframe
              title="Mapa com a localização da Cantina Pôr do Sol"
              src={ADDRESS.embed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 [filter:grayscale(.35)_contrast(1.05)]"
              allowFullScreen
            />
          )}
          {!blocked && !active && (
            <button
              type="button"
              onClick={() => setActive(true)}
              className="group absolute inset-0 flex items-end justify-center pb-6"
              aria-label="Usar o mapa: arrastar e dar zoom"
            >
              <span className="inline-flex items-center gap-2 bg-cal/95 px-4 py-2.5 text-[14px] font-medium shadow-[0_8px_24px_-8px_rgba(0,0,0,.35)] transition-colors group-hover:bg-cal">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M6 9V3.5a1.25 1.25 0 0 1 2.5 0V8m0-1.5a1.25 1.25 0 0 1 2.5 0V8m0-.5a1.25 1.25 0 0 1 2.5 0v3a4.5 4.5 0 0 1-4.5 4.5h-.6a4 4 0 0 1-3.2-1.6L2.6 10.4a1.2 1.2 0 0 1 1.8-1.6L6 10.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Clique para usar o mapa
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
