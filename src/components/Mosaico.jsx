import { useRef } from 'react'
import { decodeOnce, useRotation } from '../lib/useRotation'

// Mosaico de fotos ao fundo com o conteúdo (children) centralizado por cima.
// Uma moldura por vez troca de foto com um esmaecer suave, só com o mosaico na tela.
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

// `grid` define colunas e linhas do mosaico; no celular aparecem só as `mobile` primeiras molduras
export default function Mosaico({ pool, count, mobile = count, grid, every = 900, children }) {
  const root = useRef(null)
  const tiles = useRotation(root, { pool, count, every, preload })

  return (
    <div ref={root} className="relative overflow-hidden bg-basalto text-cal">
      <div className={`absolute inset-0 grid gap-1 ${grid}`} aria-hidden="true">
        {tiles.map((t, i) => <Tile key={i} name={t.cur} prev={t.prev} hideOnMobile={i >= mobile} />)}
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
