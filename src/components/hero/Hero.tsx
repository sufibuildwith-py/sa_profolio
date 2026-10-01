import React, { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, Radio } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinFrameRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const quoteWrapperRef = useRef<HTMLDivElement>(null)
  const brandWrapperRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const wavefrontRef = useRef<HTMLDivElement>(null)
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null)
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current || !pinFrameRef.current) return

    // 1. Initial entrance animation for top eyebrow, CTA buttons, and bottom bar
    const entranceTl = gsap.timeline({ defaults: { ease: EASE.cinematic } })

    entranceTl
      .fromTo(
        eyebrowRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.15 }
      )
      .fromTo(
        quoteWrapperRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.6'
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )

    // 2. Reduced-motion fallback: immediate settle without scroll pinning / displacement
    if (prefersReducedMotion) {
      if (brandWrapperRef.current) gsap.set(brandWrapperRef.current, { opacity: 1 })
      if (quoteWrapperRef.current) gsap.set(quoteWrapperRef.current, { opacity: 0, display: 'none' })
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 1 })
      return () => {
        entranceTl.kill()
      }
    }

    // 3. Continuous Scroll-Controlled Cinematic Hero Sequence
    // Stages: Quote -> Water Ripple Displacement -> SA PRODUCTION -> Tagline -> Pinned Release
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 769px)',
        isMobile: '(max-width: 768px)',
      },
      (context) => {
        const { isMobile } = context.conditions as { isMobile: boolean; isDesktop: boolean }
        const pinDistance = isMobile ? '+=140%' : '+=170%'

        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: pinDistance,
            pin: pinFrameRef.current,
            scrub: isMobile ? 0.8 : 1.1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

        // Initial setup for morph layers
        gsap.set(quoteWrapperRef.current, { opacity: 1, scale: 1, y: 0 })
        gsap.set(brandWrapperRef.current, { opacity: 0, scale: 0.94, y: 24, pointerEvents: 'none' })
        gsap.set(taglineRef.current, { opacity: 0, y: 12 })
        gsap.set(wavefrontRef.current, { opacity: 0, y: '-80%' })
        if (displacementRef.current) {
          gsap.set(displacementRef.current, { attr: { scale: 0 } })
        }

        // STAGE 1: Initial Hold (Progress 0.00 -> 0.15)
        // Quote is crisp and fully legible

        // STAGE 2 & 3: Organic Water Ripple & Wavefront Progression (Progress 0.15 -> 0.55)
        if (displacementRef.current) {
          scrollTl.to(
            displacementRef.current,
            {
              attr: { scale: isMobile ? 28 : 42 },
              duration: 0.35,
              ease: 'power2.inOut',
            },
            0.15
          )
        }

        // Wavefront refractive light sheen sweeps across
        scrollTl
          .fromTo(
            wavefrontRef.current,
            { opacity: 0, y: '-70%' },
            { opacity: 0.65, y: '0%', duration: 0.25, ease: 'power2.out' },
            0.15
          )
          .to(
            wavefrontRef.current,
            { opacity: 0, y: '70%', duration: 0.25, ease: 'power2.in' },
            0.4
          )

        // Quote dissolves & distorts as wave travels through
        scrollTl.to(
          quoteWrapperRef.current,
          {
            opacity: 0,
            y: -18,
            scale: 1.04,
            filter: 'blur(6px)',
            duration: 0.32,
            ease: 'power2.inOut',
          },
          0.22
        )

        // STAGE 4: Brand Emerges through Water Wave (Progress 0.42 -> 0.78)
        scrollTl
          .set(
            brandWrapperRef.current,
            { pointerEvents: 'auto' },
            0.45
          )
          .fromTo(
            brandWrapperRef.current,
            { opacity: 0, scale: 0.94, y: 22, filter: 'blur(5px)' },
            {
              opacity: 1,
              scale: 1.0,
              y: 0,
              filter: 'blur(0px)',
              duration: 0.35,
              ease: 'power2.out',
            },
            0.42
          )

        // Settle displacement filter back to 0 for razor-sharp typography
        if (displacementRef.current) {
          scrollTl.to(
            displacementRef.current,
            {
              attr: { scale: 0 },
              duration: 0.3,
              ease: 'power2.out',
            },
            0.55
          )
        }

        // STAGE 5: Tagline Reveal (Progress 0.72 -> 0.88)
        scrollTl.to(
          taglineRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.72
        )

        // STAGE 6: Final Composition Hold (Progress 0.88 -> 1.00)
        // Static hold ensuring the visitor comfortably absorbs SA PRODUCTION before release
        scrollTl.to(
          {},
          { duration: 0.12 },
          0.88
        )
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
      {/* SVG Water Ripple Displacement Filter Definition (0 Extra WebGL contexts) */}
      <svg
        className="pointer-events-none absolute h-0 w-0 overflow-hidden"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="hero-water-ripple"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            filterUnits="objectBoundingBox"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              ref={turbulenceRef}
              type="fractalNoise"
              baseFrequency="0.015 0.035"
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              ref={displacementRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      {/* Pinned Viewport Container (Frame held during scrub) */}
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

            <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/70 glass-dark-interactive px-3.5 py-1.5 rounded-full">
              <Radio className="h-3 w-3 text-[#7C6ECD]" />
              <span>ON-SITE TECHNICAL DIRECTION</span>
            </div>
          </div>

          {/* Middle Transformative Typographic Stage */}
          <div className="relative z-10 my-auto px-6 sm:px-10 lg:px-14 py-4 sm:py-6 max-w-5xl w-full">
            <div className="relative min-h-[160px] sm:min-h-[190px] md:min-h-[220px] flex flex-col justify-center">
              {/* Traveling Refractive Wavefront Sheen */}
              <div
                ref={wavefrontRef}
                className="pointer-events-none absolute -inset-x-10 h-32 opacity-0 bg-gradient-to-b from-transparent via-[#7C6ECD]/30 to-transparent blur-lg mix-blend-screen z-20"
              />

              {/* Initial Stage: Romanized Hindi/Urdu Editorial Quote */}
              <div
                ref={quoteWrapperRef}
                style={{ filter: 'url(#hero-water-ripple)' }}
                className="will-change-transform max-w-4xl"
              >
                <p className="font-serif italic font-normal text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] text-[#A49BE0] leading-[1.22] tracking-tight text-balance">
                  Hum sirf mehfil nahin sanwārte, <br className="hidden sm:inline" />
                  lamhon ko yaadgaar banate hain.
                </p>
                <span className="mt-2.5 inline-block font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-white/40">
                  // Editorial Philosophy
                </span>
              </div>

              {/* Final Stage: SA PRODUCTION Wordmark & Tagline */}
              <div
                ref={brandWrapperRef}
                style={{ filter: 'url(#hero-water-ripple)' }}
                className="absolute inset-0 flex flex-col justify-center will-change-transform"
              >
                <h1 className="text-[clamp(2.4rem,6.2vw,5.5rem)] font-extrabold uppercase leading-[0.92] tracking-[-0.035em] text-white">
                  SA PRODUCTION
                </h1>
                <p
                  ref={taglineRef}
                  className="mt-2.5 sm:mt-3 text-xs sm:text-base md:text-lg font-serif italic text-white/80 tracking-wide"
                >
                  Bring Life to Your Event
                </p>
              </div>
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
