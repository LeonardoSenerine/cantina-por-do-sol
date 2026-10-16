// "R$ 59,90" com o "R$" e os centavos menores, como num cardápio
export default function Price({ value, className = '' }) {
  const [, int, cents] = value.match(/R\$\s*([\d.]+),(\d+)/)
  return (
    <span className={`serif whitespace-nowrap ${className}`}>
      <span className="mr-[0.15em] align-[0.35em] text-[0.42em]">R$</span>
      {int}
      <span className="align-[0.35em] text-[0.42em]">,{cents}</span>
    </span>
  )
}
