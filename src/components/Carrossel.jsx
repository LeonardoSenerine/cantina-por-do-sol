import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from '../lib/motion'

// mosaico de fotos ao fundo; uma moldura por vez troca de foto com um esmaecer suave
const POOL = [
  'salao-verde', 'sala-pedra', 'salao-logo', 'salames', 'fachada', 'salao-janelas', 'buffet-cuca',
  'salao-noite', 'buffet-empadas', 'fachada-2', 'buffet-geleia', 'tabua', 'pao', 'jardim', 'buffet-palmas', 'vista-tabua',
  'salao-luzes',
]
const EVERY = 900
const tileSrc = (n) => `./img/${n}-800.webp`

// carrega e decodifica a foto antes de ela entrar, para a troca nunca cair num quadro vazio
const ready = new Map()
const preload = (n) => {
  if (!ready.has(n)) {
    const img = new Image()
    img.src = tileSrc(n)
    ready.set(n, img.decode().catch(() => {}))
  }
  return ready.get(n)
}

function Tile({ name, prev }) {
  const img = (n) => (
    <img src={tileSrc(n)} alt="" draggable="false" className="absolute inset-0 h-full w-full object-cover" />
  )
  return (
    <div className="relative overflow-hidden bg-basalto-2">
      {prev && <span key={`p-${prev}`} className="absolute inset-0 block">{img(prev)}</span>}
      <span key={name} className={prev ? 'tile-in absolute inset-0 block' : 'absolute inset-0 block'}>{img(name)}</span>
    </div>
  )
}

function useTiles(count, root) {
  const [tiles, setTiles] = useState(() => Array.from({ length: count }, (_, i) => ({ cur: POOL[i % POOL.length], prev: null })))
  const state = useRef({ tiles, next: count, last: -1 })

  useEffect(() => {
    if (prefersReduced()) return
    let visible = false
    let timer = null
    let busy = false

    const step = async () => {
      if (!visible || busy || document.hidden) return
      busy = true
      const s = state.current
      let k = Math.floor(Math.random() * s.tiles.length)
      if (k === s.last) k = (k + 3) % s.tiles.length
      const showing = new Set(s.tiles.map((x) => x.cur))
      let n = s.next % POOL.length
      while (showing.has(POOL[n])) n = (n + 1) % POOL.length

      await preload(POOL[n])
      s.last = k
      s.next = n + 1
      s.tiles = s.tiles.map((x, i) => (i === k ? { cur: POOL[n], prev: x.cur } : x))
      setTiles(s.tiles)
      busy = false
    }

    // só troca fotos com o mosaico na tela
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !timer) {
        POOL.forEach(preload)
        timer = setInterval(step, EVERY)
      } else if (!visible && timer) {
        clearInterval(timer)
        timer = null
      }
    }, { rootMargin: '200px 0px' })
    io.observe(root.current)

    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [root])

  return tiles
}

// mosaico com o conteúdo (children) centralizado por cima
export default function Carrossel({ children }) {
  const root = useRef(null)
  const tiles = useTiles(12, root)

  return (
    <div ref={root} className="relative overflow-hidden bg-basalto text-cal">
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-4 gap-1 md:grid-cols-6 md:grid-rows-2" aria-hidden="true">
        {tiles.map((t, i) => <Tile key={i} name={t.cur} prev={t.prev} />)}
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
