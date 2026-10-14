import { useRef } from 'react'
import { decodeOnce, useRotation } from '../lib/useRotation'

// Fotos da equipe: originais de 1280px (as -800 são a versão menor); chef-mesa tem 853px.
// `pos` é o enquadramento, para os rostos não ficarem cortados em molduras de outro formato.
const FOTOS = {
  'chef-mesa': { w: 853, pos: '50% 42%', alt: 'Chef da cantina sorrindo diante de uma mesa farta de canapés, frios, queijos e frutas, com o vale ao fundo' },
  'equipe-salao': { w: 1280, pos: '55% 35%', alt: 'Dois da equipe abraçados diante da parede de madeira com o logo da Cantina Pôr do Sol' },
  'equipe-chef': { w: 1280, pos: '50% 35%', alt: 'Cozinheiro de dólmã preto com o logo da cantina bordado, de braços cruzados e sorrindo no salão' },
  'equipe-dupla': { w: 1280, pos: '45% 35%', alt: 'Dois cozinheiros de dólmã preto sorrindo na área da churrasqueira, um deles fazendo joinha' },
  'equipe-brasa': { w: 1280, pos: '45% 35%', alt: 'Dois da equipe de avental preto ao lado da churrasqueira acesa' },
  'equipe-sorriso': { w: 1280, pos: '45% 40%', alt: 'Uma cozinheira e o chef abraçados, sorrindo, no quintal iluminado da cantina' },
  'equipe-abraco': { w: 1280, pos: '45% 40%', alt: 'Dois da equipe brincando, um abraçando o outro por trás' },
}
const POOL = Object.keys(FOTOS)
const srcSet = (n) => `./img/${n}-800.webp 800w, ./img/${n}.webp ${FOTOS[n].w}w`

// molduras: duas grandes desalinhadas como num álbum e uma faixa com quatro menores
const SLOTS = [
  { box: 'aspect-[4/5]', sizes: '(min-width: 768px) 40vw, 100vw' },
  { box: 'aspect-[3/2]', sizes: '(min-width: 768px) 56vw, 100vw' },
  ...Array.from({ length: 4 }, () => ({ box: 'aspect-[3/2]', sizes: '(min-width: 768px) 25vw, 50vw' })),
]
const EVERY = 2200

// pré-carrega a foto no tamanho que aquela moldura vai pedir
const preload = (n, k) =>
  decodeOnce(`${n}|${SLOTS[k].sizes}`, (img) => {
    img.sizes = SLOTS[k].sizes
    img.srcset = srcSet(n)
  })

function Foto({ name, prev, slot }) {
  const img = (n, alt) => (
    <img
      src={`./img/${n}.webp`}
      srcSet={srcSet(n)}
      sizes={slot.sizes}
      alt={alt}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ objectPosition: FOTOS[n].pos }}
    />
  )
  return (
    <div className={`relative overflow-hidden bg-areia ${slot.box}`}>
      {prev && <span key={`p-${prev}`} className="absolute inset-0 block" aria-hidden="true">{img(prev, '')}</span>}
      <span key={name} className={prev ? 'tile-in absolute inset-0 block' : 'absolute inset-0 block'}>{img(name, FOTOS[name].alt)}</span>
    </div>
  )
}

export default function Equipe() {
  const root = useRef(null)
  const tiles = useRotation(root, { pool: POOL, count: SLOTS.length, every: EVERY, preload })
  const foto = (k) => <Foto name={tiles[k].cur} prev={tiles[k].prev} slot={SLOTS[k]} />

  return (
    <section id="equipe" className="gutter pb-16 pt-24 md:pb-24 md:pt-32">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-5 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-[15px] font-medium">Nossa equipe</p>
            <p className="serif mt-3 text-[22px] text-pinus">Por trás de cada mesa</p>
          </div>
          <div className="md:col-span-8">
            <h2 data-split className="text-[clamp(32px,4.2vw,58px)]">Sempre preparada para atender</h2>
            <p data-reveal className="mt-6 max-w-[560px] text-[18px] text-pedra">
              <span>Da brasa ao salão, é gente da casa que prepara cada prato e recebe cada mesa como quem recebe a família.</span>
            </p>
          </div>
        </div>

        {/* as fotos se revezam entre as molduras, uma por vez */}
        <div ref={root}>
          <div className="mt-16 grid gap-6 md:mt-24 md:grid-cols-12 md:items-end">
            <figure className="md:col-span-5">{foto(0)}</figure>
            <figure className="md:col-span-7">{foto(1)}</figure>
          </div>
          <div data-reveal data-stagger="90" className="mt-6 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[2, 3, 4, 5].map((k) => <div key={k}>{foto(k)}</div>)}
          </div>
        </div>
      </div>
    </section>
  )
}
