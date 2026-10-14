import { useEffect, useRef, useState } from 'react'
import { prefersReduced } from './motion'

// Carrega e decodifica uma imagem uma vez só (por chave), para a troca nunca cair num quadro vazio.
const cache = new Map()
export function decodeOnce(key, setup) {
  if (!cache.has(key)) {
    const img = new Image()
    setup(img)
    cache.set(key, img.decode().catch(() => {}))
  }
  return cache.get(key)
}

/*
  Fotos que se revezam entre molduras: a cada `every` ms, uma moldura sorteada recebe uma foto
  do `pool` que não está à mostra. Só roda com `root` na tela e a aba visível.
  Devolve [{ cur, prev }] por moldura; `prev` é a foto anterior, para o esmaecer por cima dela.
  `preload(nome, moldura)` deve devolver uma Promise que resolve quando a foto estiver pronta.
*/
export function useRotation(root, { pool, count, every, preload }) {
  const [tiles, setTiles] = useState(() => Array.from({ length: count }, (_, i) => ({ cur: pool[i % pool.length], prev: null })))
  const state = useRef({ tiles, next: count, last: -1 })
  const load = useRef(preload)
  load.current = preload

  useEffect(() => {
    if (prefersReduced() || pool.length <= count) return
    let visible = false
    let timer = null
    let busy = false

    const step = async () => {
      if (!visible || busy || document.hidden) return
      busy = true
      const s = state.current
      let k = Math.floor(Math.random() * s.tiles.length)
      if (k === s.last) k = (k + 1 + Math.floor(Math.random() * (s.tiles.length - 1))) % s.tiles.length
      const showing = new Set(s.tiles.map((x) => x.cur))
      let n = s.next % pool.length
      while (showing.has(pool[n])) n = (n + 1) % pool.length

      await load.current(pool[n], k)
      s.last = k
      s.next = n + 1
      s.tiles = s.tiles.map((x, i) => (i === k ? { cur: pool[n], prev: x.cur } : x))
      setTiles(s.tiles)
      busy = false
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible && !timer) timer = setInterval(step, every)
      else if (!visible && timer) {
        clearInterval(timer)
        timer = null
      }
    }, { rootMargin: '200px 0px' })
    io.observe(root.current)

    return () => {
      io.disconnect()
      clearInterval(timer)
    }
  }, [root, pool, count, every])

  return tiles
}
