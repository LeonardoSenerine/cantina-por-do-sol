import { LogoFull } from './Logo'

export default function Loader() {
  return (
    <div data-load-wrap className="fixed inset-0 z-[100]" aria-hidden="true">
      <div data-load-bg className="absolute inset-0 bg-cal" />
      <div data-load-container className="absolute inset-0 grid place-items-center">
        <div className="flex flex-col items-center gap-5">
          <LogoFull data-load-logo className="h-44 w-auto md:h-56" />
          <div className="mt-2 h-[2px] w-44 overflow-hidden bg-linha">
            <div data-load-progress className="h-full w-full origin-left scale-x-0 bg-basalto" />
          </div>
        </div>
      </div>
    </div>
  )
}
