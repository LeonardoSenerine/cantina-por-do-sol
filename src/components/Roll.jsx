// Texto de botão que, no :hover do .btn, sobe e dá lugar a uma cópia que entra por baixo.
// A cópia vem do data-text (::after), então leitores de tela leem o texto uma vez só.
export default function Roll({ children, className = '' }) {
  return (
    <span className={`roll ${className}`} data-text={children}>
      <span>{children}</span>
    </span>
  )
}
