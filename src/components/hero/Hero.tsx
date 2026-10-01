import React, { useEffect, useRef } from 'react'
import { ArrowDown, ArrowUpRight, Radio } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { VideoBackground } from '../media/VideoBackground'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const bottomBarRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return

    const tl = gsap.timeline({ defaults: { ease: EASE.cinematic } })

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
    )
      .fromTo(
        headlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.5'
      )
      .fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.5'
      )
      .fromTo(
        bottomBarRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.4'
      )

    return () => {
      tl.kill()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between p-3 sm:p-5 md:p-6 lg:p-7"
      aria-label="Hero Section"
    >
      {/* Inset Main Visual Frame */}
      <div className="relative flex min-h-[calc(100svh-1.5rem)] sm:min-h-[calc(100svh-2.5rem)] md:min-h-[calc(100svh-3rem)] lg:min-h-[calc(100svh-3.5rem)] w-full flex-col justify-between overflow-hidden rounded-2xl sm:rounded-3xl border border-hairline-dark bg-[#09090C] text-white shadow-2xl">
        {/* Background Real Event Video */}
        <div className="absolute inset-0 z-0">
          <VideoBackground
            src="/herovid.mp4?v=2"
            poster="/herovid-poster.jpg"
            overlayOpacity={0.45}
          />
          {/* Subtle noise grain texture */}
          <div className="grain-overlay-dark pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay" />
        </div>

        {/* Top Header Placeholder spacing */}
        <div className="relative z-10 pt-16 sm:pt-20 md:pt-22 px-6 sm:px-10 lg:px-14 flex items-center justify-between">
          <div
            ref={eyebrowRef}
            className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-white/75"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7C6ECD] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C6ECD]"></span>
            </span>
            <span>EVENT PRODUCTION // VARANASI, INDIA</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/70 glass-dark-interactive px-3.5 py-1.5 rounded-full">
            <Radio className="h-3 w-3 text-[#7C6ECD]" />
            <span>ON-SITE TECHNICAL DIRECTION</span>
          </div>
        </div>

        {/* Hero Middle Content */}
        <div className="relative z-10 my-auto px-6 sm:px-10 lg:px-14 py-6 sm:py-8 max-w-5xl">
          <h1
            ref={headlineRef}
            className="text-[clamp(2.2rem,5vw,5.2rem)] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] text-white text-balance"
          >
            WE BRING LIFE <br />
            <span className="font-serif font-normal italic lowercase tracking-normal text-white/90">
              to every
            </span>{' '}
            EVENT.
          </h1>

          <p
            ref={subRef}
            className="mt-4 sm:mt-5 max-w-2xl text-xs sm:text-sm md:text-base font-light leading-relaxed text-white/80 text-pretty"
          >
            {siteConfig.heroSub}
          </p>

          {/* Action CTAs with Aceternity Magnetic Button pattern */}
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

        {/* Bottom Hero Ribbon Bar */}
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
    </section>
  )
}
