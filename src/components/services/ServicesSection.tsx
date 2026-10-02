import React from 'react'
import { Check, MoveHorizontal } from 'lucide-react'
import { servicesData } from '../../data/services'
import type { ServiceItem } from '../../data/services'
import { CardSpotlight } from '../ui/CardSpotlight'
import { useDraggableInfiniteReel } from '../../hooks/useDraggableInfiniteReel'

export const ServicesSection: React.FC = () => {
  // Left-to-right autonomous glide (baseSpeed +55px/s on desktop, +44px/s on mobile)
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
    speedDesktop: 55,
    speedMobile: 44,
    gapFallback: 24,
  })

  const renderCard = (service: ServiceItem, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${service.id}`}
      className="w-[84vw] sm:w-[420px] md:w-[460px] lg:w-[480px] shrink-0 flex flex-col"
    >
      <CardSpotlight
        className="group relative w-full h-full rounded-2xl sm:rounded-3xl glass-dark-interactive glass-gloss border border-hairline-dark hover:border-[#7C6ECD]/60 p-6 sm:p-7 shadow-2xl transition-all duration-300 flex flex-col justify-between"
      >
        <div>
          {/* Card Top: Number & Category Badge */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#7C6ECD] transition-transform duration-300 group-hover:translate-x-1">
              {service.number}
            </span>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-white/50 px-2.5 py-1 rounded-full glass-dark border border-white/5">
              CORE DISCIPLINE
            </span>
          </div>

          {/* Title & Tagline */}
          <h3 className="mt-4 text-xl sm:text-2xl font-bold uppercase tracking-tight text-white group-hover:text-[#A49BE0] transition-colors leading-tight">
            {service.title}
          </h3>
          <p className="mt-1.5 font-mono text-xs sm:text-sm text-[#7C6ECD]/90">
            {service.tagline}
          </p>

          {/* Hairline Divider */}
          <div className="border-t border-hairline-dark/60 my-4" />

          {/* Description */}
          <p className="text-xs sm:text-sm leading-relaxed text-white/70 font-light">
            {service.description}
          </p>

          {/* Subsystems Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {service.subsystems.map((sub, idx) => (
              <span
                key={idx}
                className="rounded-lg glass-dark px-2.5 py-1 text-[10px] sm:text-[11px] font-mono uppercase text-white/75 border border-white/5"
              >
                {sub}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Section: Delivery & Execution Capabilities */}
        <div className="mt-5 pt-4 border-t border-hairline-dark/60 flex flex-col gap-2.5">
          <span className="font-mono text-[11px] uppercase tracking-wider text-[#7C6ECD] font-semibold">
            Delivery &amp; Execution:
          </span>
          <div className="flex flex-col gap-2">
            {service.capabilities.map((cap, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 text-xs text-white/80"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full glass-violet text-[#7C6ECD] text-[10px] shrink-0 mt-0.5">
                  <Check className="h-2.5 w-2.5 text-white" />
                </span>
                <span className="leading-snug">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </CardSpotlight>
    </div>
  )

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 lg:py-24 bg-[#09090C] text-white overflow-hidden"
      aria-label="Technical Capabilities and Services"
    >
      {/* 1. INTRODUCTORY CONTENT (Exact copy, visual styling & layout preserved) */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 mb-8 sm:mb-12">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-hairline-dark pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="text-[#7C6ECD] font-semibold">03</span>
            <span>// CAPABILITIES &amp; DISCIPLINES</span>
          </div>
          <span className="font-mono text-[11px] text-[#7C6ECD] uppercase tracking-widest hidden sm:inline-block">
            01 — 06 Core Services
          </span>
        </div>

        {/* Section Headline */}
        <div className="mt-6 sm:mt-8 max-w-3xl flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
              COMPLETE TECHNICAL <br />
              <span className="font-serif italic font-normal text-[#A49BE0] lowercase">
                event execution
              </span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/70 font-light leading-relaxed">
              From single-system rentals to complete multi-departmental show direction, we provide certified equipment, seasoned technicians, and unwavering reliability.
            </p>
          </div>

          {/* Interactive Drag Hint Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-dark text-xs font-mono tracking-wider text-white/60 shrink-0 self-start sm:self-end border border-white/10">
            <MoveHorizontal className="h-3.5 w-3.5 text-[#7C6ECD] animate-pulse" />
            <span>DRAG HORIZONTALLY</span>
          </div>
        </div>
      </div>

      {/* 2. CONTINUOUS DRAGGABLE CAPABILITIES REEL (LEFT → RIGHT FLOW) */}
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
        aria-label="Continuous Capabilities Reel. Drag left or right to explore."
      >
        {/* Subtle Dark Edge Vignette Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#09090C] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#09090C] to-transparent z-10" />

        {/* Unified Continuous Track (Tripled sequence for seamless infinite wrap) */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 md:gap-8 will-change-transform w-max items-stretch"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-5 sm:gap-6 md:gap-8 shrink-0 items-stretch" aria-hidden="true">
            {servicesData.map((service) => renderCard(service, 'set0'))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-5 sm:gap-6 md:gap-8 shrink-0 items-stretch">
            {servicesData.map((service) => renderCard(service, 'set1'))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-5 sm:gap-6 md:gap-8 shrink-0 items-stretch" aria-hidden="true">
            {servicesData.map((service) => renderCard(service, 'set2'))}
          </div>
        </div>
      </div>
    </section>
  )
}
