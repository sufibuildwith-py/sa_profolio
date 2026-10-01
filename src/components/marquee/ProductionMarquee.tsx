import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const marqueeImagesRow1 = [
  {
    url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    title: 'Concert Lighting Rig',
  },
  {
    url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    title: 'Stage Pyrotechnics & Atmosphere',
  },
  {
    url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
    title: 'Line Array Suspension',
  },
  {
    url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    title: 'Corporate LED Backdrop',
  },
  {
    url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    title: 'Heritage Palace Illumination',
  },
]

const marqueeImagesRow2 = [
  {
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    title: 'Fashion Runway Catwalk',
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    title: 'Expo Ground Support Grid',
  },
  {
    url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
    title: 'Stadium Festival Stage',
  },
  {
    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
    title: 'Live Band Audio Mixing',
  },
  {
    url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
    title: 'Show Cues & Laser Beams',
  },
]

export const ProductionMarquee: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    let isTicking = false

    const handleScroll = () => {
      if (!isTicking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return
          const rect = sectionRef.current.getBoundingClientRect()
          const inView = rect.top < window.innerHeight && rect.bottom > 0

          if (inView) {
            const scrollDelta = (window.innerHeight - rect.top) * 0.12
            if (row1Ref.current) {
              row1Ref.current.style.transform = `translate3d(${-scrollDelta}px, 0, 0)`
            }
            if (row2Ref.current) {
              row2Ref.current.style.transform = `translate3d(${scrollDelta - 160}px, 0, 0)`
            }
          }
          isTicking = false
        })
        isTicking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [prefersReducedMotion])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-12 sm:py-16 bg-[#09090C] text-white"
      aria-label="Atmospheric Production Gallery"
    >
      <div className="mb-6 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
          <span className="text-[#7C6ECD] font-semibold">06</span>
          <span>// ATMOSPHERIC ARCHIVE</span>
        </div>
        <span className="font-mono text-[10px] text-[#7C6ECD] uppercase tracking-widest">
          Continuous Live Presence
        </span>
      </div>

      {/* Row 1 — Moving Left */}
      <div className="flex gap-3 sm:gap-5 whitespace-nowrap overflow-hidden">
        <div
          ref={row1Ref}
          className="flex gap-3 sm:gap-5 will-change-transform transition-transform duration-75 ease-out"
        >
          {[...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1].map(
            (item, index) => (
              <div
                key={index}
                className="relative h-40 sm:h-52 md:h-60 w-64 sm:w-80 md:w-96 flex-shrink-0 overflow-hidden rounded-2xl glass-dark shadow-xl"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-wider text-white/90 glass-dark px-2.5 py-1 rounded-md">
                  {item.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>

      {/* Row 2 — Moving Right */}
      <div className="mt-3 sm:mt-5 flex gap-3 sm:gap-5 whitespace-nowrap overflow-hidden">
        <div
          ref={row2Ref}
          className="flex gap-3 sm:gap-5 will-change-transform transition-transform duration-75 ease-out"
        >
          {[...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2].map(
            (item, index) => (
              <div
                key={index}
                className="relative h-40 sm:h-52 md:h-60 w-64 sm:w-80 md:w-96 flex-shrink-0 overflow-hidden rounded-2xl glass-dark shadow-xl"
              >
                <img
                  src={item.url}
                  alt={item.title}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-20 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                <span className="absolute bottom-3 left-3 font-mono text-[11px] uppercase tracking-wider text-white/90 glass-dark px-2.5 py-1 rounded-md">
                  {item.title}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
