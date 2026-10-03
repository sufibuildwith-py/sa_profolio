import React, { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinFrameRef = useRef<HTMLDivElement>(null)
  const bgImageRef = useRef<HTMLImageElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const plaqueRef = useRef<HTMLDivElement>(null)
  const plaqueBadgeRef = useRef<HTMLDivElement>(null)
  const quoteContainerRef = useRef<HTMLDivElement>(null)
  const quoteLine1Ref = useRef<HTMLSpanElement>(null)
  const quoteLine2Ref = useRef<HTMLSpanElement>(null)
  const brandContainerRef = useRef<HTMLDivElement>(null)
  const brandTitleRef = useRef<HTMLHeadingElement>(null)
  const brandWord1Ref = useRef<HTMLSpanElement>(null)
  const brandWord2Ref = useRef<HTMLSpanElement>(null)
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
    if (typeof window === 'undefined' || !sectionRef.current || !pinFrameRef.current) return

    const isEntranceDone =
      new URLSearchParams(window.location.search).get('entranceDone') === '1'
    const heroProgressParam =
      new URLSearchParams(window.location.search).get('heroProgress')

    // Immediate brand hold preview for visual inspection
    if (heroProgressParam === 'brand') {
      if (curtainContainerRef.current) {
        curtainContainerRef.current.style.display = 'none'
      }
      gsap.set(
        [
          eyebrowRef.current,
          plaqueRef.current,
          plaqueBadgeRef.current,
          plaqueSubRef.current,
          ctaRef.current,
          bottomBarRef.current,
        ],
        { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }
      )
      gsap.set([quoteLine1Ref.current, quoteLine2Ref.current], {
        opacity: 0,
        y: -14,
        filter: 'blur(12px)',
      })
      gsap.set(brandContainerRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      })
      gsap.set([brandWord1Ref.current, brandWord2Ref.current], {
        opacity: 1,
        y: 0,
      })
      return
    }

    // Reduced motion or test bypass: present settled state immediately
    if (prefersReducedMotion) {
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
    // 1. CINEMATIC ENTRANCE CHOREOGRAPHY (Page Load)
    // Stage 1: Diagonal Curtain Reveal unveils background
    // Stage 2: Background collage micro-settles
    // Stage 3: Glass plaque fades & rises
    // Stage 4: Quote resolves into focus (blur -> sharp)
    // Stage 5: Plaque subtitle, CTAs & bottom metadata appear
    // =========================================================================
    const entranceTl = gsap.timeline({ defaults: { ease: EASE.cinematic } })

    if (!isEntranceDone) {
      // Codrops Diagonal Multi-Layer Curtain Reveal (700-1000ms)
      if (curtainAccentRef.current) {
        entranceTl.fromTo(
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
        entranceTl.fromTo(
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

      // Background image micro settle
      if (bgImageRef.current) {
        entranceTl.fromTo(
          bgImageRef.current,
          { scale: 1.04 },
          { scale: 1.0, duration: 1.1, ease: 'power2.out' },
          0.08
        )
      }

      // Header Eyebrow appears
      if (eyebrowRef.current) {
        entranceTl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.32
        )
      }

      // Glass Plaque subtle entrance: rises and comes into focus
      if (plaqueRef.current) {
        entranceTl.fromTo(
          plaqueRef.current,
          { opacity: 0, y: 20, scale: 0.985 },
          { opacity: 1, y: 0, scale: 1.0, duration: 0.75, ease: 'power3.out' },
          0.38
        )
      }

      // Plaque internal badge
      if (plaqueBadgeRef.current) {
        entranceTl.fromTo(
          plaqueBadgeRef.current,
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5 },
          0.48
        )
      }

      // Quote Line 1: Hum sirf mehfil nahin sanwaarte
      if (quoteLine1Ref.current) {
        entranceTl.fromTo(
          quoteLine1Ref.current,
          { opacity: 0, y: 16, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
          0.54
        )
      }

      // Quote Line 2: lamhon ko yaadgaar banate hain (+120ms stagger)
      if (quoteLine2Ref.current) {
        entranceTl.fromTo(
          quoteLine2Ref.current,
          { opacity: 0, y: 16, filter: 'blur(10px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7, ease: 'power3.out' },
          0.66
        )
      }

      // Plaque Subtitle / English Descriptor
      if (plaqueSubRef.current) {
        entranceTl.fromTo(
          plaqueSubRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.78
        )
      }

      // Action CTAs
      if (ctaRef.current) {
        entranceTl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6 },
          0.84
        )
      }

      // Bottom Service Bar
      if (bottomBarRef.current) {
        entranceTl.fromTo(
          bottomBarRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.65 },
          0.9
        )
      }
    } else {
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
    }

    // =========================================================================
    // 2. SCROLL-DRIVEN CINEMATIC HERO SCENE (Componentry Text Morph)
    // Phase 1 (0.00 – 0.25): Current hero held stable at rest
    // Phase 2 (0.25 – 0.75): Fluid typography morph: Quote -> SA PRODUCTIONS
    // Phase 3 (0.75 – 0.90): Brand hold in crystalline focus
    // Phase 4 (0.90 – 1.00): Pinned hero releases smoothly to Section 02
    // =========================================================================
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean }
        // Compact pin distance: 165vh mobile, 180vh desktop
        const pinDistance = isMobile ? '+=65%' : '+=80%'

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: pinDistance,
            pin: pinFrameRef.current,
            scrub: isMobile ? 0.5 : 0.75,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Phase 2: Quote Loosens, Drifts & Softens into Blur (0.25 -> 0.58)
        if (quoteLine1Ref.current) {
          scrollTl.to(
            quoteLine1Ref.current,
            {
              y: -14,
              scale: 1.02,
              opacity: 0,
              filter: 'blur(12px)',
              duration: 0.32,
              ease: 'power2.inOut',
            },
            0.25
          )
        }

        if (quoteLine2Ref.current) {
          scrollTl.to(
            quoteLine2Ref.current,
            {
              y: 12,
              scale: 0.98,
              opacity: 0,
              filter: 'blur(12px)',
              duration: 0.32,
              ease: 'power2.inOut',
            },
            0.28
          )
        }

        // Phase 2 -> 3: SA PRODUCTIONS Crystallizes Inward from Soft Focus (0.38 -> 0.75)
        if (brandContainerRef.current) {
          scrollTl.fromTo(
            brandContainerRef.current,
            {
              opacity: 0,
              y: 16,
              scale: 0.96,
              filter: 'blur(14px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1.0,
              filter: 'blur(0px)',
              duration: 0.37,
              ease: 'power2.out',
            },
            0.38
          )
        }

        // Subtly stagger the two words: "SA" and "PRODUCTIONS" (Codrops Typography Principle)
        if (brandWord1Ref.current) {
          scrollTl.fromTo(
            brandWord1Ref.current,
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 0.28, ease: 'power2.out' },
            0.42
          )
        }

        if (brandWord2Ref.current) {
          scrollTl.fromTo(
            brandWord2Ref.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.32, ease: 'power2.out' },
            0.45
          )
        }

        // Subtle Plaque Reaction (Option A): Border & blur subtly relax as brand identity holds
        if (plaqueRef.current) {
          scrollTl.to(
            plaqueRef.current,
            {
              boxShadow:
                '0 32px 80px -16px rgba(0, 0, 0, 0.92), 0 0 65px -8px rgba(124, 110, 205, 0.28), inset 0 1px 0 rgba(255, 255, 255, 0.28), inset 0 -1px 0 rgba(9, 9, 12, 0.6)',
              duration: 0.4,
              ease: 'power1.out',
            },
            0.35
          )
        }

        // Background Collage Subtle Parallax & Zoom (0.00 -> 1.00)
        if (bgImageRef.current) {
          scrollTl.fromTo(
            bgImageRef.current,
            { scale: 1.0, y: 0 },
            { scale: 1.06, y: -16, ease: 'none', duration: 1.0 },
            0
          )
        }
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
      className="relative w-full bg-[#09090C] text-white"
      aria-label="Hero Section"
    >
      {/* Pinned Viewport Container */}
      <div
        ref={pinFrameRef}
        className="relative flex h-[100svh] min-h-[640px] w-full flex-col justify-between overflow-hidden select-none"
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

              {/* =============================================================
                  TYPOGRAPHY TRANSFORMATION ZONE (Componentry Text Morph)
                  Shared coordinate box enables fluid, centered in-place morph
                  between Quote and SA PRODUCTIONS on scroll
                  ============================================================= */}
              <div className="relative min-h-[64px] sm:min-h-[92px] md:min-h-[110px] lg:min-h-[125px] flex items-center">
                {/* 1. STATE A: Editorial Romanized Urdu/Hindi Quote */}
                <div ref={quoteContainerRef} className="w-full">
                  <h1 className="relative z-10 font-serif italic tracking-[-0.015em] select-none text-[26px] sm:text-[38px] md:text-[46px] lg:text-[52px] xl:text-[58px] leading-[1.14]">
                    <span
                      ref={quoteLine1Ref}
                      className="block text-[#FFFFFF] drop-shadow-[0_2px_14px_rgba(0,0,0,0.6)] will-change-[transform,opacity,filter]"
                    >
                      Hum sirf mehfil nahin sanwaarte,
                    </span>
                    <span
                      ref={quoteLine2Ref}
                      className="block text-[#A49BE0] mt-1 sm:mt-1.5 drop-shadow-[0_2px_18px_rgba(124,110,205,0.4)] will-change-[transform,opacity,filter]"
                    >
                      lamhon ko yaadgaar banate hain.
                    </span>
                  </h1>
                </div>

                {/* 2. STATE B: Master Brand Title (SA PRODUCTIONS) */}
                <div
                  ref={brandContainerRef}
                  className="absolute inset-0 flex items-center pointer-events-none opacity-0"
                  style={{ filter: 'blur(14px)', transform: 'translateY(16px)' }}
                  aria-hidden="true"
                >
                  <div className="w-full">
                    <h2
                      ref={brandTitleRef}
                      className="font-sans font-extrabold tracking-[-0.025em] uppercase select-none text-[30px] xs:text-[36px] sm:text-[48px] md:text-[58px] lg:text-[66px] xl:text-[74px] leading-[1.05] text-[#FFFFFF] drop-shadow-[0_4px_24px_rgba(0,0,0,0.75)] flex flex-wrap items-center gap-x-2.5 sm:gap-x-4 will-change-[transform,opacity,filter]"
                    >
                      <span ref={brandWord1Ref} className="inline-block text-[#FFFFFF]">
                        SA
                      </span>
                      <span ref={brandWord2Ref} className="inline-block text-[#FFFFFF]">
                        PRODUCTIONS
                      </span>
                    </h2>
                  </div>
                </div>
              </div>

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
      </div>
    </section>
  )
}

export default Hero
