import React, { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUpRight, Radio, Compass } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { WebGLRippleTransition } from './WebGLRippleTransition'

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinFrameRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const rightTelemetryRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const [rippleProgress, setRippleProgress] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !pinFrameRef.current) return

    // 1. Initial entrance animation for header, buttons, and bottom bar
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
      .fromTo(
        rightTelemetryRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )

    // 2. Reduced motion fallback: settle immediately
    if (prefersReducedMotion) {
      setRippleProgress(1.0)
      return () => {
        entranceTl.kill()
      }
    }

    // 3. Scroll-controlled WebGL Ripple Transition Scrub
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
              setRippleProgress(self.progress)
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
  }, [prefersReducedMotion])

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

          {/* Top Header Eyebrow & Live Production Badge */}
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

            <div className="hidden lg:flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-white/70">
              <div className="flex items-center gap-2 glass-dark-interactive px-3.5 py-1.5 rounded-full">
                <Radio className="h-3 w-3 text-[#7C6ECD]" />
                <span>ON-SITE TECHNICAL DIRECTION</span>
              </div>
              <div className="flex items-center gap-2 glass-dark-interactive px-3.5 py-1.5 rounded-full text-white/50">
                <Compass className="h-3 w-3 text-[#7C6ECD]" />
                <span>25.3176° N, 82.9739° E</span>
              </div>
            </div>
          </div>

          {/* Rebalanced Middle Composition: Wide 12-Column Grid with WebGL Typographic Canvas & Camera Space */}
          <div className="relative z-10 my-auto px-6 sm:px-10 lg:px-14 py-2 sm:py-4 max-w-7xl w-full mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left & Center Column (8 cols): High-Resolution WebGL Refractive Ripple Typography */}
              <div className="lg:col-span-8 flex flex-col justify-center">
                <div className="relative w-full h-[240px] sm:h-[300px] md:h-[360px] lg:h-[400px] overflow-hidden rounded-2xl">
                  <WebGLRippleTransition
                    progress={rippleProgress}
                    className="w-full h-full"
                  />
                </div>

                {/* Preserved Action CTAs with Aceternity Magnetic Button pattern */}
                <div
                  ref={ctaRef}
                  className="mt-4 sm:mt-6 flex flex-wrap items-center gap-3.5"
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

              {/* Right Column (4 cols): Art-directed negative space for floating 3D Canon Camera */}
              <div
                ref={rightTelemetryRef}
                className="hidden lg:flex flex-col justify-between h-[360px] lg:h-[400px] p-6 rounded-2xl glass-dark border border-hairline-dark/60 text-white/50 font-mono text-[10px] tracking-wider uppercase"
              >
                <div className="flex items-center justify-between border-b border-hairline-dark pb-3">
                  <span className="text-[#7C6ECD] font-bold">PHYSICAL CAMERA LAYER</span>
                  <span>CANON AT-1 3D</span>
                </div>

                <div className="space-y-2 py-4">
                  <div className="flex justify-between">
                    <span>Acoustic Grid</span>
                    <span className="text-white/80">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Illumination Rig</span>
                    <span className="text-white/80">Synchronized</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zero-G Motion</span>
                    <span className="text-[#7C6ECD] font-bold">Continuous</span>
                  </div>
                </div>

                <div className="border-t border-hairline-dark pt-3 flex items-center justify-between text-white/40">
                  <span>SCROLL TO PROCEED</span>
                  <span>↓</span>
                </div>
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
    </section>
  )
}
