import { useRef } from 'react'
import { decodeOnce, useRotation } from '../lib/useRotation'

// mosaico de fotos ao fundo; uma moldura por vez troca de foto com um esmaecer suave.
// As fotos do lugar vêm primeiro, para dominarem o mosaico logo que ele aparece.
const POOL = [
  'fachada', 'salao-mesas', 'sala-pedra', 'salao-luzes', 'por-do-sol-salao', 'salao-janelas',
  'fachada-2', 'salao-verde', 'salao-noite', 'salao-logo', 'jardim', 'por-do-sol-chimarrao',
  'salames', 'vista-tabua', 'buffet-cuca', 'tabua', 'pao', 'buffet-geleia', 'buffet-palmas', 'buffet-empadas',
]
// 6×3 no computador; no celular aparecem só as 12 primeiras molduras (3×4)
const COUNT = 18
const MOBILE = 12
const EVERY = 900
const tileSrc = (n) => `./img/${n}-800.webp`
const preload = (n) => decodeOnce(tileSrc(n), (img) => { img.src = tileSrc(n) })

function Tile({ name, prev, hideOnMobile }) {
  const img = (n) => (
    <img src={tileSrc(n)} alt="" draggable="false" className="absolute inset-0 h-full w-full object-cover" />
  )
  return (
    <div className={`relative overflow-hidden bg-basalto-2 ${hideOnMobile ? 'max-md:hidden' : ''}`}>
      {prev && <span key={`p-${prev}`} className="absolute inset-0 block">{img(prev)}</span>}
      <span key={name} className={prev ? 'tile-in absolute inset-0 block' : 'absolute inset-0 block'}>{img(name)}</span>
    </div>
  )
}

// mosaico com o conteúdo (children) centralizado por cima
export default function Carrossel({ children }) {
  const root = useRef(null)
  const tiles = useRotation(root, { pool: POOL, count: COUNT, every: EVERY, preload })

  return (
    <div ref={root} className="relative overflow-hidden bg-basalto text-cal">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-1 md:grid-cols-6 md:grid-rows-3" aria-hidden="true">
        {tiles.map((t, i) => <Tile key={i} name={t.cur} prev={t.prev} hideOnMobile={i >= MOBILE} />)}
      </div>
      {/* escurece o mosaico para o texto ler bem, mais forte no centro */}
      <div className="absolute inset-0 bg-basalto/60" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(35,32,29,.75)_0%,rgba(35,32,29,0)_70%)]" aria-hidden="true" />

      <div className="gutter relative flex min-h-[86svh] items-center justify-center py-28 md:min-h-[100svh] md:py-36">
        {children}
      </div>
    </div>
  )
}
