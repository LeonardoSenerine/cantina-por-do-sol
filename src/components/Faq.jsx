import { useState } from 'react'
import { FAQ } from '../data/site'

export default function Faq() {
  const [open, setOpen] = useState(-1)
  return (
    <section id="duvidas" className="gutter border-t border-linha py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <p data-fade className="text-[15px] font-medium">Dúvidas</p>
          <h2 data-split className="mt-5 text-[clamp(32px,3.8vw,52px)]">O que perguntam antes de vir</h2>
        </div>
        <ul className="md:col-span-7 md:col-start-6">
          {FAQ.map((item, i) => {
            const isOpen = open === i
            return (
              <li key={item.q} className="border-t border-linha last:border-b">
                <h3 className="font-sans text-[18px] font-medium tracking-normal">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span>{item.q}</span>
                    <span className="relative block h-3 w-3 shrink-0" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-current" />
                      <span className={`absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-current transition-transform duration-500 ease-[var(--ease-osmo)] ${isOpen ? 'scale-y-0' : ''}`} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[var(--ease-osmo)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className={`max-w-[600px] pb-7 pr-10 text-pedra transition-[opacity,translate] duration-500 ease-[var(--ease-osmo)] ${isOpen ? 'translate-y-0 opacity-100 delay-100' : '-translate-y-2 opacity-0'}`}>{item.a}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
