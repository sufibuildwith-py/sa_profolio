import React, { useEffect, useRef } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { methodologyPhases, type MethodologyPhase } from '../../data/process'
import { CardSpotlight } from '../ui/CardSpotlight'
import { useDraggableInfiniteReel } from '../../hooks/useDraggableInfiniteReel'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { gsap, EASE } from '../../lib/motion'

export const ProcessSection: React.FC = () => {
  const introRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  // Continuous autonomous Left-to-Right reel (direction: 'right')
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
    direction: 'right',
    speedDesktop: 52,
    speedMobile: 42,
    gapFallback: 24,
  })

  // Subtle header entrance reveal on scroll
  useEffect(() => {
    if (prefersReducedMotion || !introRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0.2, y: 12 },
        {
          scrollTrigger: {
            trigger: introRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: EASE.cinematic,
        }
      )
    }, introRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  const renderCard = (phase: MethodologyPhase, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${phase.number}`}
      className="w-[84vw] sm:w-[440px] md:w-[480px] lg:w-[500px] shrink-0"
    >
      <CardSpotlight
        className="group relative w-full h-[155px] sm:h-[160px] lg:h-[168px] rounded-xl sm:rounded-2xl glass-dark-interactive p-4 sm:p-5 lg:p-5.5 border border-white/10 hover:border-[#7C6ECD]/60 shadow-xl flex flex-col justify-between transition-all duration-300 hover:scale-[1.02]"
      >
        {/* Top Metadata: Phase Number, Category & Phase Tag */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="font-mono text-base sm:text-lg font-bold tracking-widest text-[#7C6ECD] transition-transform duration-300 group-hover:translate-x-0.5">
              {phase.number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-widest text-[#A49BE0]">
              {phase.category}
            </span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 px-2.5 py-0.5 rounded-full border border-white/10 glass-dark">
            PHASE {phase.number}
          </span>
        </div>

        {/* Main Action Title */}
        <h3 className="mt-1 sm:mt-1.5 text-sm sm:text-base font-bold uppercase tracking-tight text-white group-hover:text-[#A49BE0] transition-colors leading-tight">
          {phase.title}
        </h3>

        {/* 2-Line Action Description */}
        <p className="mt-1 text-xs sm:text-[13px] leading-relaxed text-white/70 font-light line-clamp-2">
          {phase.description}
        </p>
      </CardSpotlight>
    </div>
  )

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative w-full py-10 sm:py-14 lg:py-16 bg-[#F4F1E8] overflow-hidden"
      aria-label="07 Execution Methodology — 7-Phase Physical Pipeline"
    >
      {/* 1. INTRODUCTORY CONTENT (Compact Section Header & Description) */}
      <div
        ref={introRef}
        className="mx-auto w-full max-w-[1720px] 2xl:max-w-[1920px] px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 mb-6 sm:mb-8"
      >
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
            <span className="text-[#7C6ECD] font-semibold">07</span>
            <span>// EXECUTION METHODOLOGY</span>
          </div>
          <span className="font-mono text-[11px] text-[#7C6ECD] uppercase tracking-widest hidden sm:inline-block">
            7-Phase Physical Pipeline
          </span>
        </div>

        {/* Section Headline & Description */}
        <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 w-full">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-[#09090C] leading-[1.05]">
              HOW WE ENGINEER <br />
              <span className="font-serif italic font-normal text-[#514691] lowercase">
                a flawless show
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 max-w-xl">
            <p className="text-sm sm:text-base lg:text-lg text-[#09090C]/70 font-light leading-relaxed lg:text-right">
              Live productions do not allow second takes. We adhere to a strict 7-phase physical engineering pipeline from the first spatial laser survey to final post-event load out.
            </p>
            {/* Interactive Drag Hint Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-light border border-hairline text-xs font-mono tracking-wider text-[#09090C]/60 shrink-0">
              <MoveHorizontal className="h-3.5 w-3.5 text-[#7C6ECD] animate-pulse" />
              <span>DRAG HORIZONTALLY</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CONTINUOUS DRAGGABLE METHODOLOGY REEL (LEFT → RIGHT FLOW) */}
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
        aria-label="Continuous Methodology Reel. Drag left or right to explore."
      >
        {/* Subtle Edge Vignette Fade matching #F4F1E8 canvas */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#F4F1E8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#F4F1E8] to-transparent z-10" />

        {/* Unified Continuous Track (Tripled sequence for seamless infinite wrap) */}
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-6 lg:gap-8 will-change-transform w-max items-center"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0" aria-hidden="true">
            {methodologyPhases.map((phase, idx) => renderCard(phase, `set0-${idx}`))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0">
            {methodologyPhases.map((phase, idx) => renderCard(phase, `set1-${idx}`))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-4 sm:gap-6 lg:gap-8 shrink-0" aria-hidden="true">
            {methodologyPhases.map((phase, idx) => renderCard(phase, `set2-${idx}`))}
          </div>
        </div>
      </div>
    </section>
  )
}
