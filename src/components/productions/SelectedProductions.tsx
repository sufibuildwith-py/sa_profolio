import React, { useState, useRef, useEffect, useCallback } from 'react'
import { ArrowUpRight, Eye, MoveHorizontal } from 'lucide-react'
import { selectedProductionsData } from '../../data/productions'
import type { SelectedProduction } from '../../data/productions'
import { OptimizedImage } from '../media/OptimizedImage'
import { LightboxModal } from '../ui/LightboxModal'
import { CardSpotlight } from '../ui/CardSpotlight'
import { GlareCard } from '../ui/GlareCard'
import { gsap } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const SelectedProductions: React.FC = () => {
  const [selectedProduction, setSelectedProduction] = useState<SelectedProduction | null>(null)
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()

  // State refs for 60fps/120fps animation loop (zero React state triggers during continuous scroll)
  const xRef = useRef<number>(0)
  const baseSpeedRef = useRef<number>(-58) // ~48-52s per complete cycle
  const velocityRef = useRef<number>(-58)
  const isDraggingRef = useRef<boolean>(false)
  const isIntersectingRef = useRef<boolean>(true)
  const singleSetWidthRef = useRef<number>(0)
  const lastPointerXRef = useRef<number>(0)
  const lastPointerTimeRef = useRef<number>(0)
  const pointerDeltaHistoryRef = useRef<{ dx: number; dt: number }[]>([])
  const hasDraggedRef = useRef<boolean>(false)
  const justDraggedRef = useRef<boolean>(false)

  // 1. MEASURE SINGLE SET STRIDE (Width of 5 cards + gap)
  const measureStride = useCallback(() => {
    if (!singleSetRef.current || !trackRef.current) return
    const computedStyle = window.getComputedStyle(trackRef.current)
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap) || 24
    const setWidth = singleSetRef.current.offsetWidth
    const stride = setWidth + gap
    singleSetWidthRef.current = stride

    // Initialize position so that Set 1 is visible in viewport with Set 0 buffer on left
    if (xRef.current === 0 && stride > 0) {
      xRef.current = -stride
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }
  }, [])

  // 2. RESIZE & INTERSECTION OBSERVERS
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Base speed calibration: ~58px/s on desktop, ~46px/s on mobile
    const isMobile = window.innerWidth < 768
    baseSpeedRef.current = prefersReducedMotion ? 0 : isMobile ? -46 : -58
    velocityRef.current = baseSpeedRef.current

    measureStride()

    const resizeObserver = new ResizeObserver(() => {
      measureStride()
    })
    if (singleSetRef.current) {
      resizeObserver.observe(singleSetRef.current)
    }

    // Suspend ticker when section is outside viewport to conserve GPU & battery
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting
      },
      { rootMargin: '250px 0px' }
    )
    if (sectionRef.current) {
      intersectionObserver.observe(sectionRef.current)
    }

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [measureStride, prefersReducedMotion])

  // 3. CONTINUOUS AUTOPLAY & MOMENTUM PHYSICS (Unified GSAP Ticker)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateTicker = (_time: number, deltaTime: number) => {
      if (!isIntersectingRef.current) return
      const stride = singleSetWidthRef.current
      if (stride <= 0) return

      const dt = Math.min(deltaTime / 1000, 0.1) // clamp delta time for stability

      if (!isDraggingRef.current) {
        const baseSpeed = prefersReducedMotion ? 0 : baseSpeedRef.current

        // Smooth exponential relaxation of release momentum back to base continuous velocity
        velocityRef.current += (baseSpeed - velocityRef.current) * (1 - Math.exp(-3.5 * dt))
        xRef.current += velocityRef.current * dt
      }

      // Mathematical Modulo Infinite Wrapping: zero teleport, zero gaps, perfectly seamless
      while (xRef.current <= -2 * stride) {
        xRef.current += stride
      }
      while (xRef.current >= 0) {
        xRef.current -= stride
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }

    gsap.ticker.add(updateTicker)

    return () => {
      gsap.ticker.remove(updateTicker)
    }
  }, [prefersReducedMotion])

  // 4. DIRECT MANIPULATION POINTER & TOUCH DRAG SYSTEM
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary click or touch initiates drag
    if (e.button !== 0 && e.pointerType === 'mouse') return

    isDraggingRef.current = true
    setIsDragging(true)
    hasDraggedRef.current = false
    lastPointerXRef.current = e.clientX
    lastPointerTimeRef.current = performance.now()
    pointerDeltaHistoryRef.current = []

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Browser fallback
    }
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return

    const now = performance.now()
    const dx = e.clientX - lastPointerXRef.current
    const dt = (now - lastPointerTimeRef.current) / 1000

    if (Math.abs(dx) > 0) {
      xRef.current += dx

      if (Math.abs(dx) > 4 || Math.abs(e.movementX) > 4) {
        hasDraggedRef.current = true
      }

      if (dt > 0.001) {
        const instantaneousVelocity = dx / dt
        pointerDeltaHistoryRef.current.push({ dx, dt })
        if (pointerDeltaHistoryRef.current.length > 5) {
          pointerDeltaHistoryRef.current.shift()
        }
        velocityRef.current = instantaneousVelocity
      }

      lastPointerXRef.current = e.clientX
      lastPointerTimeRef.current = now

      // Wrap during drag as well
      const stride = singleSetWidthRef.current
      if (stride > 0) {
        while (xRef.current <= -2 * stride) {
          xRef.current += stride
        }
        while (xRef.current >= 0) {
          xRef.current -= stride
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      // Browser fallback
    }

    // Calculate weighted release velocity from recent history for natural inertia
    if (pointerDeltaHistoryRef.current.length > 0) {
      const totalDx = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dx, 0)
      const totalDt = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dt, 0)
      if (totalDt > 0.005) {
        const avgVelocity = totalDx / totalDt
        // Clamp maximum release inertia to prevent chaotic over-speed
        velocityRef.current = Math.max(-1200, Math.min(1200, avgVelocity))
      }
    }

    // Suppress card click modal if pointer moved beyond drag threshold
    if (hasDraggedRef.current) {
      justDraggedRef.current = true
      setTimeout(() => {
        justDraggedRef.current = false
      }, 70)
    }
  }

  // 3 Identical Sets of the 5 production cards for infinite seamless wrapping
  const renderCard = (project: SelectedProduction, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${project.id}`}
      className="w-[82vw] sm:w-[480px] md:w-[540px] lg:w-[600px] shrink-0"
    >
      <CardSpotlight
        onClick={() => {
          if (justDraggedRef.current) return
          setSelectedProduction(project)
        }}
        data-cursor="VIEW"
        className="group relative w-full cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl glass-light-interactive shadow-xl border border-hairline hover:border-[#7C6ECD]/60 transition-all duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
          {/* Left Metadata Glass Rail */}
          <div className="lg:col-span-5 p-4 sm:p-5 md:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-hairline bg-transparent">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold tracking-widest text-[#7C6ECD]">
                  PROD // {project.number}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#09090C]/50">
                  {project.location}
                </span>
              </div>

              <span className="mt-2 inline-block font-mono text-[11px] sm:text-xs tracking-wider uppercase text-[#514691]">
                {project.category}
              </span>

              <h3 className="mt-1 text-base sm:text-lg md:text-xl font-bold uppercase tracking-tight text-[#09090C] group-hover:text-[#514691] transition-colors line-clamp-2">
                {project.headline}
              </h3>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-[#09090C]/70 font-light line-clamp-2 sm:line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-hairline">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="rounded-full glass-light px-2 py-0.5 text-[9px] sm:text-[10px] font-mono tracking-wider text-[#09090C]/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-semibold text-[#7C6ECD] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                <span>Inspect Technical Blueprint</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          {/* Right Large Media Frame with Aceternity Glare Interaction */}
          <GlareCard className="lg:col-span-7 relative h-[180px] sm:h-[220px] md:h-[240px] lg:h-[390px] overflow-hidden bg-[#09090C]">
            <OptimizedImage
              src={project.image}
              alt={project.headline}
              aspectRatio="16/10"
              containerClassName="h-full w-full"
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Floating Glass Inspection Pill */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full glass-nav px-3 py-1 text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C] shadow-lg opacity-90 group-hover:opacity-100 transition-all duration-300">
              <Eye className="h-3.5 w-3.5 text-[#7C6ECD]" />
              <span>Full Specs</span>
            </div>
          </GlareCard>
        </div>
      </CardSpotlight>
    </div>
  )

  return (
    <section
      id="productions"
      ref={sectionRef}
      className="relative w-full bg-[#F4F1E8] py-12 sm:py-16 lg:py-20 overflow-hidden"
      aria-label="Selected Production Portfolio"
    >
      {/* 1. INTRODUCTORY CONTENT (Exact copy & layout preserved) */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 mb-6 sm:mb-8">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
            <span className="text-[#7C6ECD] font-semibold">05</span>
            <span>// SELECTED PRODUCTIONS</span>
          </div>
          <span className="font-mono text-[11px] text-[#09090C]/40 uppercase tracking-widest hidden sm:inline-block">
            Layered Project Archive
          </span>
        </div>

        {/* Section Title */}
        <div className="mt-4 sm:mt-6 max-w-3xl flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#09090C]">
              SELECTED LIVE <br />
              <span className="font-serif italic font-normal text-[#514691] lowercase">
                event executions
              </span>
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#09090C]/70 font-light leading-relaxed">
              Real physical productions delivered across Varanasi and Uttar Pradesh. Click any frame to inspect full technical sound, lighting, and stage rigging specs.
            </p>
          </div>

          {/* Interactive Drag Hint Pill */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-light text-xs font-mono tracking-wider text-[#09090C]/60 shrink-0 self-start sm:self-end">
            <MoveHorizontal className="h-3.5 w-3.5 text-[#7C6ECD] animate-pulse" />
            <span>DRAG HORIZONTALLY</span>
          </div>
        </div>
      </div>

      {/* 2. CONTINUOUS DRAGGABLE PRODUCTION REEL */}
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
        aria-label="Continuous Production Reel. Drag left or right to explore."
      >
        {/* Subtle Edge Vignette Fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-16 md:w-24 bg-gradient-to-r from-[#F4F1E8] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-16 md:w-24 bg-gradient-to-l from-[#F4F1E8] to-transparent z-10" />

        {/* Unified Continuous Track (Tripled sequence for seamless infinite wrap) */}
        <div
          ref={trackRef}
          className="flex gap-5 sm:gap-6 md:gap-8 will-change-transform w-max items-center"
        >
          {/* Set 0 (Buffer Set on left) */}
          <div className="flex gap-5 sm:gap-6 md:gap-8 shrink-0" aria-hidden="true">
            {selectedProductionsData.map((project) => renderCard(project, 'set0'))}
          </div>

          {/* Set 1 (Primary Measured Set) */}
          <div ref={singleSetRef} className="flex gap-5 sm:gap-6 md:gap-8 shrink-0">
            {selectedProductionsData.map((project) => renderCard(project, 'set1'))}
          </div>

          {/* Set 2 (Buffer Set on right) */}
          <div className="flex gap-5 sm:gap-6 md:gap-8 shrink-0" aria-hidden="true">
            {selectedProductionsData.map((project) => renderCard(project, 'set2'))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal (Retained exactly as designed) */}
      <LightboxModal
        production={selectedProduction}
        onClose={() => setSelectedProduction(null)}
      />
    </section>
  )
}
