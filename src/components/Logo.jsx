import { PATHS, MARK_BOX, FULL_BOX } from './logoPaths'

// Logo oficial (vetorizado a partir do arquivo do cliente).
// `paper` é a cor do branco do logo (casa e neve) e `ink` a do telhado e das janelas,
// para poder usar a versão invertida sobre fundo escuro.
const COLORS = { sun: '#F5BD1E', green: '#54783E', text: '#8C1E23' }

function Logo({ box, withText, className = '', title, paper = '#FBF9F5', ink = '#1F1C19', ...props }) {
  const [x0, y0, x1, y1] = box
  const pad = 8
  return (
    <svg
      viewBox={`${x0 - pad} ${y0 - pad} ${x1 - x0 + pad * 2} ${y1 - y0 + pad * 2}`}
      className={className}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : 'true'}
      {...props}
    >
      {title && <title>{title}</title>}
      {PATHS.map(([c, d], i) => {
        if (c === 'text' && !withText) return null
        const fill = c === 'paper' ? paper : c === 'ink' ? ink : COLORS[c]
        const role = c === 'sun' ? { 'data-logo-sun': '' } : c === 'text' ? { 'data-logo-text': '' } : { 'data-logo-land': '' }
        return <path key={i} d={d} fill={fill} {...role} />
      })}
    </svg>
  )
}

export const LogoMark = (props) => <Logo box={MARK_BOX} withText={false} {...props} />
export const LogoFull = (props) => <Logo box={FULL_BOX} withText {...props} />

export function Wordmark({ className = '' }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-10 w-auto md:h-11" title="Cantina Pôr do Sol" />
      <span className="serif hidden text-[16px] leading-[1.05] sm:inline md:text-[18px]">
        Cantina<br />Pôr do Sol
      </span>
    </span>
  )
}

export function Arrow({ className = 'h-3 w-3' }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M1 6h9M6.5 2.5 10 6l-3.5 3.5" strokeLinecap="square" />
    </svg>
  )
}
