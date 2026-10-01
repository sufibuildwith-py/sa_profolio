import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { WebGLRippleTransition } from './WebGLRippleTransition'
import type { WebGLRippleTransitionHandle } from './WebGLRippleTransition'

interface HeroDebugState {
  progress: number
  stage: string
  canvasSize: string
  textureSize: string
  dpr: number
}

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinFrameRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<WebGLRippleTransitionHandle>(null)
  const prefersReducedMotion = useReducedMotion()

  const isDebug =
    typeof window !== 'undefined' &&
    new URLSearchParams(window.location.search).get('heroDebug') === '1'
  const [debugState, setDebugState] = useState<HeroDebugState | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !pinFrameRef.current) return

    // 1. Initial subtle entrance animation
    const entranceTl = gsap.timeline({ defaults: { ease: EASE.cinematic } })

    entranceTl
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )

    // 2. Reduced motion fallback: settle immediately to brand state
    if (prefersReducedMotion) {
      if (rippleRef.current) rippleRef.current.setProgress(1.0)
      return () => {
        entranceTl.kill()
      }
    }

    // 3. Scroll-controlled Cinematic Hero Sequence
    // Stages: Quote -> Water Wave Distortion -> SA PRODUCTION -> Tagline -> Pinned Release
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean }
        const pinDistance = isMobile ? '+=140%' : '+=175%'

        const progressProxy = { val: 0 }

        const getStageName = (p: number) => {
          if (p < 0.15) return '01 REST (Quote Visible)'
          if (p < 0.45) return '02 RIPPLE START (Water Wave Traversing)'
          if (p < 0.70) return '03 TRANSFORMATION (Glyph Refraction & Morph)'
          if (p < 0.82) return '04 BRAND RESOLUTION (SA PRODUCTION Settling)'
          return '05 HOLD (Brand Stable)'
        }

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: pinDistance,
            pin: pinFrameRef.current,
            scrub: isMobile ? 0.6 : 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress
              if (rippleRef.current) {
                rippleRef.current.setProgress(p)
              }
              if (isDebug && rippleRef.current) {
                const info = rippleRef.current.getDebugInfo()
                setDebugState({
                  progress: Number(p.toFixed(3)),
                  stage: getStageName(p),
                  canvasSize: info.canvasSize,
                  textureSize: info.textureSize,
                  dpr: info.dpr,
                })
              }
            },
          },
        })

        scrollTl.to(progressProxy, {
          val: 1,
          duration: 1,
          ease: 'none',
        })
      }
    )

    return () => {
      entranceTl.kill()
      mm.revert()
    }
  }, [prefersReducedMotion, isDebug])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full bg-[#F4F1E8]"
      aria-label="Hero Section"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinFrameRef}
        className="relative flex h-[100svh] w-full flex-col justify-between p-3 sm:p-5 md:p-6 lg:p-7 overflow-hidden"
      >
        {/* Inset Main Editorial Frame with Gloss & Dark Smoked Glass Styling */}
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-hairline-dark bg-[#09090C] text-white shadow-2xl">
          {/* Subtle noise grain texture overlay */}
          <div className="grain-overlay-dark pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay z-0" />

          {/* Top Header Location Eyebrow */}
          <div className="relative z-10 pt-16 sm:pt-20 md:pt-22 px-6 sm:px-10 lg:px-14 flex items-center justify-between">
            <div
              ref={eyebrowRef}
              className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/75"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6ECD] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C6ECD]" />
              </span>
              <span>EVENT PRODUCTION // VARANASI, INDIA</span>
            </div>
          </div>

          {/* Middle Unified Cinematic Scene: Transparent WebGL Typographic Canvas + Floating Camera Space */}
          <div className="relative z-10 my-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 max-w-7xl w-full mx-auto">
            <div className="max-w-5xl w-full">
              {/* Invisible Transparent WebGL Ripple Layer (Zero Box, Zero Border, Pure Glyph Distortion) */}
              <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[420px]">
                <WebGLRippleTransition
                  ref={rippleRef}
                  className="w-full h-full"
                />
              </div>

              {/* Preserved Action CTAs with Aceternity Magnetic Button pattern */}
              <div
                ref={ctaRef}
                className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3.5"
              >
                <MagneticButton
                  href="#contact"
                  className="h-11 sm:h-13 rounded-full glass-violet px-6 sm:px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:scale-102 transition-all shadow-md group"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                <MagneticButton
                  href="#productions"
                  className="h-11 sm:h-13 rounded-full glass-dark-interactive px-5 sm:px-7 text-xs sm:text-sm font-medium uppercase tracking-wider text-white hover:border-white/40 transition-all"
                >
                  <span>View Selected Work</span>
                  <ArrowDown className="ml-2 h-4 w-4 text-[#7C6ECD]" />
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* Preserved Bottom Hero Ribbon Bar */}
          <div
            ref={bottomBarRef}
            className="relative z-10 glass-dark border-t border-hairline-dark px-6 sm:px-10 lg:px-14 py-3.5 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono tracking-widest text-white/65"
          >
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> SOUND
              </span>
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> LIGHTING
              </span>
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> STAGE
              </span>
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> LED / VISUALS
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> CAMERA & CREW
              </span>
            </div>

            <div className="flex items-center gap-2 text-[#7C6ECD]">
              <span>●</span>
              <span className="text-white/80">VARANASI PRODUCTION DESK</span>
            </div>
          </div>
        </div>
      </div>

      {/* Development Hero Debug Diagnostic Overlay (?heroDebug=1) */}
      {isDebug && debugState && (
        <div className="fixed top-4 left-4 z-50 rounded-xl bg-black/95 p-4 font-mono text-[11px] text-white/90 backdrop-blur-md border border-[#7C6ECD]/40 max-w-xs pointer-events-none shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2 font-bold text-[#7C6ECD]">
            <span>HERO SCROLL DEBUG</span>
            <span>{Math.round(debugState.progress * 100)}%</span>
          </div>
          <div className="space-y-1 text-white/80">
            <div>
              <span className="text-white/40">Stage: </span>
              <span className="text-amber-300 font-semibold">{debugState.stage}</span>
            </div>
            <div>
              <span className="text-white/40">Progress: </span>
              <span className="text-emerald-300 font-semibold">{debugState.progress}</span>
            </div>
            <div>
              <span className="text-white/40">Canvas Size: </span>
              <span>{debugState.canvasSize}</span>
            </div>
            <div>
              <span className="text-white/40">Texture Size: </span>
              <span>{debugState.textureSize}</span>
            </div>
            <div>
              <span className="text-white/40">DPR: </span>
              <span>{debugState.dpr}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
