import { useCallback, useEffect, useRef, useState } from 'react'
import { useSiteAnimations } from './lib/animations'
import Loader from './components/Loader'
import Nav, { SideMenu } from './components/Nav'
import Hero from './components/Hero'
import Servimos from './components/Servimos'
import Inauguracao from './components/Inauguracao'
import Casa from './components/Casa'
import Ambientes from './components/Ambientes'
import Trabalho from './components/Trabalho'
import Mapa from './components/Mapa'
import Faq from './components/Faq'
import Footer from './components/Footer'
import ReserveDrawer from './components/ReserveDrawer'

export default function App() {
  const root = useRef(null)
  const [reserve, setReserve] = useState({ open: false, exp: undefined })
  const [menuOpen, setMenuOpen] = useState(false)
  const openReserve = useCallback((exp) => { setMenuOpen(false); setReserve({ open: true, exp }) }, [])
  const closeReserve = useCallback(() => setReserve((r) => ({ ...r, open: false })), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  useEffect(() => {
    if (menuOpen) document.documentElement.dataset.menu = '1'
    else delete document.documentElement.dataset.menu
  }, [menuOpen])

  useSiteAnimations(root)

  return (
    <div ref={root}>
      <Loader />
      <Nav onReserve={openReserve} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <SideMenu open={menuOpen} onClose={closeMenu} onReserve={openReserve} />
      <main>
        <Hero onReserve={openReserve} />
        <Casa />
        <Ambientes />
        <Trabalho />
        <Inauguracao onReserve={openReserve} />
        <Servimos onReserve={openReserve} />
        <Mapa />
        <Faq />
      </main>
      <Footer onReserve={openReserve} />
      <ReserveDrawer state={reserve} onClose={closeReserve} />
    </div>
  )
}
