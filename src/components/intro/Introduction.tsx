import React, { useEffect, useRef } from 'react'
import { Volume2, Sparkles, ShieldCheck } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const Introduction: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const line4Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
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
          opacity: 0.15,
          y: 18,
        },
        {
          scrollTrigger: {
            trigger: line1Ref.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.14,
          ease: EASE.cinematic,
        }
      )

      gsap.fromTo(
        descRef.current,
        { opacity: 0.2, y: 16 },
        {
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: EASE.cinematic,
        }
      )

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0.2, y: 16 },
          {
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 95%',
              toggleActions: 'play none none reverse',
            },
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE.cinematic,
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-16 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 overflow-hidden bg-[#F4F1E8]"
      aria-label="About and Philosophy"
    >
      <div className="mx-auto w-full max-w-[1720px] 2xl:max-w-[1920px]">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
          <div className="flex items-center gap-3">
            <span className="text-[#7C6ECD] font-semibold">02</span>
            <span>// PHYSICAL PRODUCTION PHILOSOPHY</span>
          </div>
          <span className="font-mono text-[11px] text-[#7C6ECD] uppercase tracking-widest hidden sm:inline-block">
            Foundational Ethos
          </span>
        </div>

        {/* Editorial Layout: Left Quote Hierarchy + Right Context */}
        <div className="mt-6 sm:mt-10 lg:mt-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 w-full">
          <div className="flex flex-col gap-1 sm:gap-2 max-w-5xl">
            {/* LINE 01: smaller / normal editorial statement */}
            <div
              ref={line1Ref}
              className="text-base sm:text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-[#09090C]/80"
            >
              Events are remembered by how they felt —
            </div>

            {/* LINE 02: larger display typography */}
            <div
              ref={line2Ref}
              className="text-[clamp(1.6rem,3.8vw,3.4rem)] lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
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
              className="text-[clamp(1.6rem,3.8vw,3.4rem)] lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
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
              className="text-[clamp(1.6rem,3.8vw,3.4rem)] lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold uppercase leading-[1.05] tracking-[-0.03em] text-[#09090C]"
            >
              and the physical{' '}
              <span className="font-serif italic font-normal text-[#514691] lowercase">
                presence
              </span>{' '}
              of the stage.
            </div>
          </div>

          <div className="max-w-xl pb-1 sm:pb-2">
            <p
              ref={descRef}
              className="text-xs sm:text-base lg:text-lg leading-relaxed text-[#09090C]/75 font-light lg:text-right"
            >
              {siteConfig.aboutSub}
            </p>
          </div>
        </div>

        {/* Three Core Execution Principles */}
        <div
          ref={cardsRef}
          className="mt-6 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 lg:gap-6 pt-6 sm:pt-8 border-t border-hairline"
        >
          <div className="flex flex-col gap-2 p-4 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <Volume2 className="h-4 w-4" />
            </div>
            <h3 className="text-xs sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Acoustic Precision
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/75 font-light">
              Clean audio dispersion calculated for human speech intelligibility and concert dynamics without ear-fatiguing distortion or dead zones.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <Sparkles className="h-4 w-4" />
            </div>
            <h3 className="text-xs sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Atmospheric Lighting
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/75 font-light">
              Architectural, stage, and scenic illumination that flatters faces on camera, defines spatial boundaries, and intensifies live moments.
            </p>
          </div>

          <div className="flex flex-col gap-2 p-4 sm:p-6 rounded-xl glass-light transition-all duration-300 hover:border-[#7C6ECD]/40">
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="text-xs sm:text-base font-bold uppercase tracking-tight text-[#09090C]">
              Structural Reliability
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed text-[#09090C]/75 font-light">
              Certified trussing, calculated rigging load points, and redundant power infrastructure built with uncompromising on-site safety.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
