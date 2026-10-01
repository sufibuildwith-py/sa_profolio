import React, { useEffect, useRef } from 'react'
import { Volume2, Sparkles, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CardSpotlight } from '../ui/CardSpotlight'

export const Introduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const line4Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const asideRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const quoteLines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current]

      // Staggered 4-line editorial quote scroll reveal
      gsap.fromTo(
        quoteLines,
        {
          opacity: 0,
          y: 24,
          filter: 'blur(4px)',
        },
        {
          scrollTrigger: {
            trigger: line1Ref.current,
            start: 'top 82%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.18,
          ease: EASE.cinematic,
        }
      )

      gsap.from(descRef.current, {
        scrollTrigger: {
          trigger: descRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: EASE.cinematic,
      })

      if (asideRef.current) {
        gsap.from(asideRef.current, {
          scrollTrigger: {
            trigger: asideRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          y: 24,
          opacity: 0,
          duration: 0.8,
          delay: 0.2,
          ease: EASE.cinematic,
        })
      }

      if (cardsRef.current) {
        gsap.from(cardsRef.current.children, {
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          y: 24,
          opacity: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: EASE.cinematic,
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 overflow-hidden bg-[#F4F1E8]"
      aria-label="About and Philosophy"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Index Header */}
        <div className="flex items-center gap-3 border-b border-hairline pb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
          <span className="text-[#7C6ECD] font-semibold">02</span>
          <span>// PHYSICAL PRODUCTION PHILOSOPHY</span>
        </div>

        {/* Editorial Layout: Left Quote Hierarchy + Right Studio Execution Manifest */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: 4-Line Structured Headline + Sub-copy */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            <div className="flex flex-col gap-1 sm:gap-2">
              {/* LINE 01: smaller / normal editorial statement */}
              <div
                ref={line1Ref}
                className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-[#09090C]/80"
              >
                Events are remembered by how they felt —
              </div>

              {/* LINE 02: larger display typography */}
              <div
                ref={line2Ref}
                className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
              >
                the{' '}
                <span className="font-serif italic font-normal text-[#514691] lowercase">
                  clarity
                </span>{' '}
                of the sound,
              </div>

              {/* LINE 03: larger display typography */}
              <div
                ref={line3Ref}
                className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
              >
                the{' '}
                <span className="font-serif italic font-normal text-[#514691] lowercase">
                  atmosphere
                </span>{' '}
                of the light,
              </div>

              {/* LINE 04: larger display typography */}
              <div
                ref={line4Ref}
                className="text-[clamp(1.8rem,3.8vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
              >
                and the physical{' '}
                <span className="font-serif italic font-normal text-[#514691] lowercase">
                  presence
                </span>{' '}
                of the stage.
              </div>
            </div>

            <div className="pt-2">
              <p
                ref={descRef}
                className="text-sm sm:text-base leading-relaxed text-[#09090C]/70 font-light max-w-xl"
              >
                {siteConfig.aboutSub}
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Production Manifest Glass Card with Aceternity Spotlight */}
          <div ref={asideRef} className="lg:col-span-5 flex flex-col gap-4">
            <CardSpotlight className="p-6 sm:p-7 rounded-2xl glass-light-interactive">
              <div className="flex items-center justify-between border-b border-hairline pb-4 mb-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#09090C]/50">
                  Technical Standard
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-[#7C6ECD] font-medium">
                  <MapPin className="h-3 w-3" />
                  <span>Varanasi, UP</span>
                </div>
              </div>

              <h4 className="text-base sm:text-lg font-bold tracking-tight text-[#09090C] uppercase mb-2">
                Turnkey Physical Execution
              </h4>
              <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/60 mb-5 font-light">
                From initial venue acoustic mapping to live multi-camera broadcast switching, our crew owns every single physical cable, truss pin, and luminaire fixture on your production floor.
              </p>

              <div className="space-y-2.5 pt-2 border-t border-hairline/60 font-mono text-xs text-[#09090C]/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#7C6ECD]" />
                  <span>On-site calibrated line-array dispersion</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#7C6ECD]" />
                  <span>Synchronized DMX architectural & stage lighting</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#7C6ECD]" />
                  <span>Dual-redundant power & live signal routing</span>
                </div>
              </div>
            </CardSpotlight>
          </div>
        </div>

        {/* Three Core Execution Principles */}
        <div
          ref={cardsRef}
          className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 pt-8 border-t border-hairline"
        >
          <div className="flex flex-col gap-2.5 p-5 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <Volume2 className="h-4 w-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Acoustic Precision
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/60">
              Clean audio dispersion calculated for human speech intelligibility and concert dynamics without ear-fatiguing distortion or dead zones.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 p-5 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Atmospheric Lighting
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/60">
              Architectural, stage, and scenic illumination that flatters faces on camera, defines spatial boundaries, and intensifies live moments.
            </p>
          </div>

          <div className="flex flex-col gap-2.5 p-5 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Structural Reliability
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/60">
              Certified trussing, calculated rigging load points, and redundant power infrastructure built with uncompromising on-site safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
