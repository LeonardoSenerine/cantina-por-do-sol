import { EXPERIENCES, PRICE, srcSet } from '../data/site'
import { Arrow } from './Logo'

export default function Servimos({ onReserve }) {
  return (
    <section id="servimos" className="gutter py-24 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-5 md:grid-cols-12">
          <p className="text-[15px] font-medium md:col-span-4">Nossas experiências</p>
          <h2 data-split className="text-[clamp(32px,4.2vw,58px)] md:col-span-8">
            Mesa colonial no domingo, rodízio de pizzas de quinta a sábado
          </h2>
        </div>

        <div data-reveal data-stagger="120" className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 md:grid-cols-3">
          {EXPERIENCES.map((exp) => (
            <article key={exp.id} className="group flex flex-col">
              <button
                type="button"
                onClick={() => onReserve(exp.weekdays ? exp.id : undefined)}
                className="relative block aspect-[4/5] overflow-hidden bg-areia text-left"
                aria-label={exp.weekdays ? `Reservar ${exp.name}` : 'Reservar uma mesa'}
              >
                {exp.media.type === 'video' ? (
                  <video
                    src={exp.media.src}
                    poster={exp.media.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={exp.media.alt}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-osmo)] group-hover:scale-[1.04]"
                  />
                ) : (
                  <img
                    src={exp.media.src}
                    srcSet={srcSet(exp.media.src)}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    alt={exp.media.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-osmo)] group-hover:scale-[1.04]"
                  />
                )}
              </button>
              <h3 className="mt-6 text-[28px] md:text-[30px]">{exp.name}</h3>
              {exp.tag && <p className="mt-1 text-[15px] text-pinus">{exp.tag}</p>}
              {/* o essencial para decidir e reservar, legível no celular */}
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 border-y border-linha py-4 text-[16px]">
                <dt className="text-pedra">Quando</dt>
                <dd>{exp.days}</dd>
                <dt className="text-pedra">Horário</dt>
                <dd>{exp.hours}</dd>
                {exp.weekdays && (
                  <>
                    <dt className="text-pedra">Valor</dt>
                    <dd>A partir de {PRICE.from} por pessoa<span className="block text-[14px] text-pedra">{PRICE.kids}</span></dd>
                  </>
                )}
              </dl>
              <p className="mt-4 max-w-[400px] text-pedra">{exp.text}</p>
              {exp.notes && <p className="mt-3 text-[14px] text-pedra/80">{exp.notes.join(' · ')}</p>}
              <button
                type="button"
                onClick={() => onReserve(exp.weekdays ? exp.id : undefined)}
                className="btn btn-linha mt-6 self-start"
              >
                {exp.weekdays ? `Reservar o ${exp.name.toLowerCase()}` : 'Reservar uma mesa'}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
