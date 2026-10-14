import { useEffect, useState } from 'react'
import { ADDRESS } from '../data/site'
import { Arrow } from './Logo'

export default function Mapa() {
  // se o mapa for bloqueado (ex.: prévia sem permissão para embutir sites), mostra um cartão no lugar
  const [blocked, setBlocked] = useState(false)
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

        <div className="relative h-[420px] overflow-hidden bg-areia md:col-span-8 md:h-[560px]">
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
        </div>
      </div>
    </section>
  )
}
