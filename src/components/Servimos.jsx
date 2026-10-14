import { EXPERIENCES, srcSet } from '../data/site'
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
              <div className="mt-6 flex items-baseline justify-between gap-4 border-b border-linha pb-4">
                <h3 className="text-[28px] md:text-[30px]">{exp.name}</h3>
                <p className="shrink-0 text-right text-[14px] text-pedra">{exp.days}<br />{exp.hours}</p>
              </div>
              <p className="mt-4 max-w-[400px] text-pedra">{exp.text}</p>
              {exp.tag && <p className="sr-only">{exp.tag}</p>}
              <button
                type="button"
                onClick={() => onReserve(exp.weekdays ? exp.id : undefined)}
                className="mt-5 inline-flex items-center gap-2 self-start text-[15px] font-medium"
              >
                <span className="ulink">{exp.weekdays ? 'Reservar' : 'Reservar uma mesa'}</span>
                <Arrow />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
