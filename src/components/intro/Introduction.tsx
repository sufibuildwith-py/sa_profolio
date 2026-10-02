import React, { useEffect, useRef } from 'react'
import { siteConfig } from '../../data/site'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CardSpotlight } from '../ui/CardSpotlight'
import { useDraggableInfiniteReel } from '../../hooks/useDraggableInfiniteReel'

// Exact technical/engineering card copy (zero paraphrasing or shortening)
const technicalCardsData = [
  {
    number: '01',
    title: 'Acoustic Precision',
    description:
      'Clean audio dispersion calculated for human speech intelligibility and concert dynamics without ear-fatiguing distortion or dead zones.',
  },
  {
    number: '02',
    title: 'Atmospheric Lighting',
    description:
      'Architectural, stage, and scenic illumination that flatters faces on camera, defines spatial boundaries, and intensifies live moments.',
  },
  {
    number: '03',
    title: 'Structural Reliability',
    description:
      'Certified trussing, calculated rigging load points, and redundant power infrastructure built with uncompromising on-site safety.',
  },
]

// Duplicate sequence internally so 1 set is ~3000px, exceeding any screen width for gapless wrapping
const reelItems = [...technicalCardsData, ...technicalCardsData]

export const Introduction: React.FC = () => {
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const line4Ref = useRef<HTMLDivElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Continuous autonomous Right-to-Left reel (direction: 'left')
  const {
    sectionRef,
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  } = useDraggableInfiniteReel({
    direction: 'left',
    speedDesktop: 52,
    speedMobile: 42,
    gapFallback: 24,
  })

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
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion, sectionRef])

  const renderCard = (
    item: { number: string; title: string; description: string },
    keyPrefix: string
  ) => (
    <div
      key={`${keyPrefix}-${item.number}`}
      className="w-[84vw] sm:w-[440px] md:w-[480px] lg:w-[500px] shrink-0"
    >
      <CardSpotlight
        className="group relative w-full h-[155px] sm:h-[160px] lg:h-[168px] rounded-xl sm:rounded-2xl glass-light-interactive p-4 sm:p-5 lg:p-5.5 border border-hairline hover:border-[#7C6ECD]/50 shadow-sm flex flex-col justify-between transition-all duration-300"
      >
        <div>
          <span className="font-mono text-[11px] sm:text-xs font-semibold tracking-widest text-[#7C6ECD]">
            {item.number}
          </span>
          <h3 className="mt-1 sm:mt-1.5 text-sm sm:text-base font-bold uppercase tracking-tight text-[#09090C] group-hover:text-[#514691] transition-colors leading-tight">
            {item.title}
          </h3>
        </div>
        <p className="text-xs sm:text-[13px] leading-relaxed text-[#09090C]/75 font-light line-clamp-3">
          {item.description}
        </p>
      </CardSpotlight>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-10 sm:py-16 lg:py-20 overflow-hidden bg-[#F4F1E8]"
      aria-label="About and Philosophy"
    >
      <div className="mx-auto w-full max-w-[1720px] 2xl:max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
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

        {/* Subtle Hairline Divider */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-hairline" />
      </div>

      {/* CONTINUOUS DRAGGABLE TECHNICAL/ENGINEERING REEL (RIGHT → LEFT FLOW) */}
      <div
        ref={viewportRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
        className={`relative w-full overflow-hidden select-none py-2 ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        aria-label="Continuous Technical Specification Reel. Drag left or right to explore."
      >
        {/* Subtle Edge Vignette Fade (matching #F4F1E8 canvas) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#F4F1E8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#F4F1E8] to-transparent z-10" />

        {/* Unified Continuous Track (Tripled sequence for seamless infinite wrap) */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform w-max items-center"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0" aria-hidden="true">
            {reelItems.map((item, idx) => renderCard(item, `set0-${idx}`))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0">
            {reelItems.map((item, idx) => renderCard(item, `set1-${idx}`))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0" aria-hidden="true">
            {reelItems.map((item, idx) => renderCard(item, `set2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  )
}
