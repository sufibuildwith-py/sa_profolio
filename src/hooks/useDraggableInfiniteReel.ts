import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from '../lib/motion'
import { useReducedMotion } from './useReducedMotion'

export interface UseDraggableInfiniteReelOptions {
  /**
   * Direction of autonomous infinite movement:
   * - 'right': Left-to-right flow (positive velocity) e.g. Capabilities
   * - 'left': Right-to-left flow (negative velocity) e.g. Selected Productions
   */
  direction?: 'left' | 'right'
  /** Desktop autonomous base speed in pixels per second. Default: 55 */
  speedDesktop?: number
  /** Mobile autonomous base speed in pixels per second. Default: 44 */
  speedMobile?: number
  /** Fallback column gap if computed style fails. Default: 24 */
  gapFallback?: number
}

export function useDraggableInfiniteReel({
  direction = 'right',
  speedDesktop = 55,
  speedMobile = 44,
  gapFallback = 24,
}: UseDraggableInfiniteReelOptions = {}) {
  const [isDragging, setIsDragging] = useState<boolean>(false)

  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const singleSetRef = useRef<HTMLDivElement>(null)

  const prefersReducedMotion = useReducedMotion()

  // High performance animation loop refs (zero React re-renders during 60/120fps glide)
  const xRef = useRef<number>(0)
  const baseSpeedRef = useRef<number>(direction === 'right' ? speedDesktop : -speedDesktop)
  const velocityRef = useRef<number>(baseSpeedRef.current)
  const isDraggingRef = useRef<boolean>(false)
  const isIntersectingRef = useRef<boolean>(true)
  const singleSetWidthRef = useRef<number>(0)
  const lastPointerXRef = useRef<number>(0)
  const lastPointerTimeRef = useRef<number>(0)
  const pointerDeltaHistoryRef = useRef<{ dx: number; dt: number }[]>([])
  const hasDraggedRef = useRef<boolean>(false)
  const justDraggedRef = useRef<boolean>(false)

  // 1. MEASURE SINGLE SET STRIDE (Width of 1 complete set + gap)
  const measureStride = useCallback(() => {
    if (!singleSetRef.current || !trackRef.current) return
    const computedStyle = window.getComputedStyle(trackRef.current)
    const gap = parseFloat(computedStyle.columnGap || computedStyle.gap) || gapFallback
    const setWidth = singleSetRef.current.offsetWidth
    const stride = setWidth + gap
    singleSetWidthRef.current = stride

    // Position initial set so Set 1 aligns at screen origin, with Set 0 left buffer
    if (xRef.current === 0 && stride > 0) {
      xRef.current = -stride
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${xRef.current}px, 0, 0)`
      }
    }
  }, [gapFallback])

  // 2. RESIZE & INTERSECTION OBSERVERS
  useEffect(() => {
    if (typeof window === 'undefined') return

    const isMobile = window.innerWidth < 768
    const targetSpeed = isMobile ? speedMobile : speedDesktop
    const signedSpeed = direction === 'right' ? targetSpeed : -targetSpeed
    baseSpeedRef.current = prefersReducedMotion ? 0 : signedSpeed
    velocityRef.current = baseSpeedRef.current

    measureStride()

    const resizeObserver = new ResizeObserver(() => {
      measureStride()
    })
    if (singleSetRef.current) {
      resizeObserver.observe(singleSetRef.current)
    }

    // Suspend ticker when section is off-screen to preserve GPU & battery
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
  }, [direction, gapFallback, measureStride, prefersReducedMotion, speedDesktop, speedMobile])

  // 3. CONTINUOUS AUTOPLAY & MOMENTUM PHYSICS (Unified GSAP Ticker)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateTicker = (_time: number, deltaTime: number) => {
      if (!isIntersectingRef.current) return
      const stride = singleSetWidthRef.current
      if (stride <= 0) return

      const dt = Math.min(deltaTime / 1000, 0.1) // clamp delta time to avoid frame jumps

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

      // Wrap during active drag as well
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

    // Weighted release velocity from recent history for natural inertia
    if (pointerDeltaHistoryRef.current.length > 0) {
      const totalDx = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dx, 0)
      const totalDt = pointerDeltaHistoryRef.current.reduce((sum, item) => sum + item.dt, 0)
      if (totalDt > 0.005) {
        const avgVelocity = totalDx / totalDt
        velocityRef.current = Math.max(-1200, Math.min(1200, avgVelocity))
      }
    }

    // Suppress child clicks if pointer moved significantly
    if (hasDraggedRef.current) {
      justDraggedRef.current = true
      setTimeout(() => {
        justDraggedRef.current = false
      }, 70)
    }
  }

  return {
    sectionRef,
    viewportRef,
    trackRef,
    singleSetRef,
    isDragging,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    justDraggedRef,
  }
}
