import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export const EASE = {
  cinematic: 'power3.out',
  cinematicHeavy: 'power4.out',
  expo: 'expo.out',
  smooth: 'power2.out',
  customBezier: 'cubic-bezier(0.16, 1, 0.3, 1)',
}

export const DURATIONS = {
  micro: 0.25,
  hover: 0.35,
  reveal: 0.8,
  hero: 1.2,
}

export { gsap, ScrollTrigger }
