import React, { useEffect, useRef, useState } from 'react'
import { gsap } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [cursorText, setCursorText] = useState('')
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const visibleRef = useRef(false)

  useEffect(() => {
    // Disable on coarse pointers (touchscreens) and reduced motion preference
    if (
      prefersReducedMotion ||
      typeof window === 'undefined' ||
      window.matchMedia('(hover: none) or (pointer: coarse)').matches
    ) {
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.18, ease: 'power3.out' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.18, ease: 'power3.out' })

    const setPos = (e: MouseEvent) => {
      if (!visibleRef.current) {
        visibleRef.current = true
        gsap.set(cursor, { x: e.clientX, y: e.clientY })
        setIsVisible(true)
      } else {
        xTo(e.clientX)
        yTo(e.clientY)
      }
    }

    window.addEventListener('mousemove', setPos, { passive: true })

    // Handle interactive hover targets
    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]')
      if (target) {
        const text = target.getAttribute('data-cursor') || ''
        setCursorText(text)
        setIsHovered(true)
      } else {
        const isClickable = (e.target as HTMLElement).closest('a, button, [role="button"]')
        if (isClickable) {
          setCursorText('')
          setIsHovered(true)
        } else {
          setCursorText('')
          setIsHovered(false)
        }
      }
    }

    const handleMouseLeave = () => {
      visibleRef.current = false
      setIsVisible(false)
    }

    document.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', setPos)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } hidden md:flex`}
      style={{ willChange: 'transform' }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ease-out ${
          cursorText
            ? 'h-14 w-14 bg-[#7C6ECD] text-white shadow-lg'
            : isHovered
            ? 'h-8 w-8 bg-[#111113]/20 backdrop-blur-xs border border-[#111113]/40'
            : 'h-3 w-3 bg-[#111113]'
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[10px] font-semibold tracking-widest uppercase text-white"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  )
}
