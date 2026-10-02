import React, { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const plaqueRef = useRef<HTMLDivElement>(null)
  const plaqueBadgeRef = useRef<HTMLDivElement>(null)
  const quoteLine1Ref = useRef<HTMLSpanElement>(null)
  const quoteLine2Ref = useRef<HTMLSpanElement>(null)
  const plaqueSubRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)

  // Codrops Diagonal Multi-Layer Curtain Reveal Refs
  const curtainContainerRef = useRef<HTMLDivElement>(null)
  const curtainAccentRef = useRef<HTMLDivElement>(null)
  const curtainMainRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()

  // Aceternity Glare Card: Subtle interactive specular highlight following pointer
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`)
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`)
    e.currentTarget.style.setProperty('--glare-opacity', '1')
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--glare-opacity', '0')
  }

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return

    const isEntranceDone =
      new URLSearchParams(window.location.search).get('entranceDone') === '1'

    // Reduced motion or test bypass: present settled state immediately
    if (prefersReducedMotion || isEntranceDone) {
      if (curtainContainerRef.current) {
        curtainContainerRef.current.style.display = 'none'
      }
      gsap.set(
        [
          eyebrowRef.current,
          plaqueRef.current,
          plaqueBadgeRef.current,
          quoteLine1Ref.current,
          quoteLine2Ref.current,
          plaqueSubRef.current,
          ctaRef.current,
          bottomBarRef.current,
        ],
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
        }
      )
      return
    }

    // =========================================================================
    // CINEMATIC ENTRANCE CHOREOGRAPHY
    // Stage 1: Diagonal Curtain Reveal unveils background
    // Stage 2: Background collage settles
    // Stage 3: Glass plaque fades & rises
    // Stage 4: Line 1 focus resolve (blur -> sharp)
    // Stage 5: Line 2 focus resolve (+120ms stagger)
    // Stage 6: Plaque subtitle, CTAs & bottom metadata appear
    // After that: STOP (Zero looping animations, zero CPU waste)
    // =========================================================================
    const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } })

    // 1. Codrops Diagonal Multi-Layer Curtain Reveal (700-1000ms)
    if (curtainAccentRef.current) {
      tl.fromTo(
        curtainAccentRef.current,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, -35% 100%)' },
        {
          clipPath: 'polygon(155% 0%, 155% 0%, 155% 100%, 155% 100%)',
          duration: 0.85,
          ease: 'power3.inOut',
        },
        0
      )
    }

    if (curtainMainRef.current) {
      tl.fromTo(
        curtainMainRef.current,
        { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, -25% 100%)' },
        {
          clipPath: 'polygon(150% 0%, 150% 0%, 150% 100%, 150% 100%)',
          duration: 0.95,
          ease: 'power3.inOut',
          onComplete: () => {
            if (curtainContainerRef.current) {
              curtainContainerRef.current.style.display = 'none'
            }
          },
        },
        0.04
      )
    }

    // 2. Background image micro settle
    if (bgImageRef.current) {
      tl.fromTo(
        bgImageRef.current,
        { scale: 1.04 },
        { scale: 1.0, duration: 1.1, ease: 'power2.out' },
        0.08
      )
    }

    // 3. Header Eyebrow appears
    if (eyebrowRef.current) {
      tl.fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.32
      )
    }

    // 4. Glass Plaque subtle entrance: rises and comes into focus
    if (plaqueRef.current) {
      tl.fromTo(
        plaqueRef.current,
        { opacity: 0, y: 20, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1.0, duration: 0.75, ease: 'power3.out' },
        0.38
      )
    }

    // Plaque internal badge
    if (plaqueBadgeRef.current) {
      tl.fromTo(
        plaqueBadgeRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.48
      )
    }

    // 5. Line 1: Hum sirf mehfil nahin sanwaarte (React Bits Text Blur / Motion Primitives)
    if (quoteLine1Ref.current) {
      tl.fromTo(
        quoteLine1Ref.current,
        { opacity: 0, y: 16, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.54
      )
    }

    // 6. Line 2: lamhon ko yaadgaar banate hain (+120ms stagger)
    if (quoteLine2Ref.current) {
      tl.fromTo(
        quoteLine2Ref.current,
        { opacity: 0, y: 16, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
        0.66
      )
    }

    // 7. Plaque Subtitle / English Descriptor
    if (plaqueSubRef.current) {
      tl.fromTo(
        plaqueSubRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.78
      )
    }

    // 8. Action CTAs
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.84
      )
    }

    // 9. Bottom Service Bar
    if (bottomBarRef.current) {
      tl.fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.65 },
        0.9
      )
    }

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[640px] bg-[#09090C] text-white overflow-hidden select-none"
      aria-label="Hero Section"
    >
      {/* =====================================================================
          1. CODROPS DIAGONAL MULTI-LAYER CURTAIN REVEAL OVERLAY
          Sweeps diagonally away on load, then display: none
          ===================================================================== */}
      <div
        ref={curtainContainerRef}
        className="absolute inset-0 z-40 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {/* Leading Violet Accent Veil */}
        <div
          ref={curtainAccentRef}
          className="absolute inset-0 bg-[#7C6ECD]/25 will-change-[clip-path]"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, -35% 100%)' }}
        />
        {/* Deep Charcoal Main Shutter Curtain */}
        <div
          ref={curtainMainRef}
          className="absolute inset-0 bg-[#09090C] will-change-[clip-path]"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, -25% 100%)' }}
        />
      </div>

      {/* =====================================================================
          2. CINEMATIC PRODUCTION COLLAGE BACKGROUND
          Varanasi live production photography (unblurred, unzoomed, full bleed)
          ===================================================================== */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <img
          ref={bgImageRef}
          src="/hero-varanasi-bg.jpg"
          alt="SA Production live event collage"
          className="w-full h-full object-cover object-center pointer-events-none select-none will-change-transform"
          aria-hidden="true"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Restrained Localized Contrast Support Behind Typography */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 75% 65% at 30% 50%, rgba(9, 9, 12, 0.40) 0%, rgba(9, 9, 12, 0.12) 55%, transparent 80%)',
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/35 pointer-events-none z-[1]"
        aria-hidden="true"
      />
      <div
        className="grain-overlay-dark pointer-events-none absolute inset-0 opacity-12 mix-blend-overlay z-[2]"
        aria-hidden="true"
      />

      {/* =====================================================================
          3. FULL VIEWPORT CONTENT CONTAINER
          Natural flex layout prevents any overlap across desktop, tablet & phone
          ===================================================================== */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-hidden">
        {/* TOP: Location Eyebrow (Placed comfortably below Dynamic Island) */}
        <div className="pt-16 sm:pt-20 md:pt-22 px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6ECD] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C6ECD]" />
            </span>
            <span className="text-white">EVENT PRODUCTION // VARANASI, INDIA</span>
          </div>
        </div>

        {/* CENTER / EDITORIAL HERO CONTENT: Plaque & CTAs */}
        <div className="my-auto py-3 sm:py-5 px-6 sm:px-10 lg:px-16 flex flex-col justify-center gap-5 sm:gap-6">
          {/* =================================================================
              ACETERNITY-INSPIRED CURVED GLASS QUOTE PLAQUE
              - Smoked translucent charcoal glass with 24px backdrop blur
              - Large rounded radius (36px desktop / 24px phone)
              - Restrained lavender edge lighting & top specular gloss highlight
              - Subtle pointer-following specular flare (Aceternity Glare Card)
              ================================================================= */}
          <div
            ref={plaqueRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative group w-fit max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-[1020px] rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-6 sm:p-8 md:p-10 lg:p-11 overflow-hidden transition-all duration-300 glass-hero-plaque glass-gloss"
          >
            {/* Top Specular Gloss Highlight (Glass-Gloss Treatment) */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-1/3 rounded-t-[inherit] bg-gradient-to-b from-white/[0.08] to-transparent"
              aria-hidden="true"
            />

            {/* Restrained Violet Corner Ambient Sheen */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[#7C6ECD]/15 blur-3xl"
              aria-hidden="true"
            />

            {/* Aceternity Glare Card: Pointer-Following Specular Flare */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-400 ease-out"
              style={{
                opacity: 'var(--glare-opacity, 0)',
                background:
                  'radial-gradient(circle 420px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255, 255, 255, 0.08), transparent 70%)',
              }}
              aria-hidden="true"
            />

            {/* Plaque Header Badge */}
            <div
              ref={plaqueBadgeRef}
              className="relative z-10 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] mb-3.5 sm:mb-4.5 backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6ECD] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7C6ECD]" />
              </span>
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] uppercase text-white/85">
                SA PRODUCTION // LIVE ARCHITECTURE
              </span>
            </div>

            {/* Editorial Romanized Urdu/Hindi Quote Typography */}
            <h1 className="relative z-10 font-serif italic tracking-[-0.015em] select-none text-[26px] sm:text-[38px] md:text-[46px] lg:text-[52px] xl:text-[58px] leading-[1.14]">
              <span
                ref={quoteLine1Ref}
                className="block text-[#FFFFFF] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
              >
                Hum sirf mehfil nahin sanwaarte,
              </span>
              <span
                ref={quoteLine2Ref}
                className="block text-[#A49BE0] mt-1 sm:mt-1.5 drop-shadow-[0_2px_18px_rgba(124,110,205,0.4)]"
              >
                lamhon ko yaadgaar banate hain.
              </span>
            </h1>

            {/* Supporting English Technical & Editorial Payoff */}
            <div
              ref={plaqueSubRef}
              className="relative z-10 mt-4.5 sm:mt-5 pt-3.5 sm:pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-[13px] text-white/75 font-normal tracking-wide"
            >
              <p className="max-w-xl leading-relaxed">
                Concert-grade sound reinforcement, intelligent lighting design, precision staging,
                large-format LED visuals & live cinematography engineered in Varanasi.
              </p>
            </div>
          </div>

          {/* Action CTAs: Preserved Studio Control Structure */}
          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3.5 pt-0.5 pointer-events-auto w-full sm:w-auto"
          >
            <MagneticButton
              href="#contact"
              className="h-11 sm:h-12.5 rounded-full glass-violet px-6 sm:px-8 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:scale-102 transition-all shadow-md group justify-center"
            >
              <span className="text-white">Start a Project</span>
              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <MagneticButton
              href="#productions"
              className="h-11 sm:h-12.5 rounded-full glass-dark-interactive px-5 sm:px-7 text-xs sm:text-sm font-medium uppercase tracking-wider text-white hover:border-white/40 transition-all justify-center"
            >
              <span className="text-white">View Selected Work</span>
              <ArrowDown className="ml-2 h-4 w-4 text-[#7C6ECD]" />
            </MagneticButton>
          </div>
        </div>

        {/* BOTTOM: Preserved Bottom Service Strip */}
        <div
          ref={bottomBarRef}
          className="relative z-10 glass-dark border-t border-white/10 px-6 sm:px-10 lg:px-14 py-3 sm:py-3.5 flex flex-wrap items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono tracking-widest text-white"
        >
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-8 text-white">
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> SOUND
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> LIGHTING
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> STAGE
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> LED / VISUALS
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" /> CAMERA & CREW
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#7C6ECD]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6ECD] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C6ECD]" />
            </span>
            <span className="text-white text-[10px] sm:text-[11px]">VARANASI PRODUCTION DESK</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
