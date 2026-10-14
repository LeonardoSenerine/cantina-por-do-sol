import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { CustomEase } from 'gsap/CustomEase'
import { useGSAP } from '@gsap/react'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, useGSAP)

// As duas curvas que dão o "jeito" do Studenterkilden (boilerplate da Osmo)
CustomEase.create('osmo', '0.625, 0.05, 0, 1')
CustomEase.create('loader', '0.65, 0.01, 0.05, 0.99')

export const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

let lenis = null
export const getLenis = () => lenis

export function initLenis() {
  if (lenis || prefersReduced()) return lenis
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -20, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) })
  else el.scrollIntoView({ behavior: prefersReduced() ? 'auto' : 'smooth' })
}

export { gsap, ScrollTrigger, SplitText, useGSAP }
