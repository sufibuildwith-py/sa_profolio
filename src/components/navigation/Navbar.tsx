import React, { useState, useEffect, useRef } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(() => (typeof window !== 'undefined' ? window.scrollY > 40 : false))
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([])
  const islandRef = useRef<HTMLDivElement>(null)

  const isScrolledRef = useRef(typeof window !== 'undefined' ? window.scrollY > 40 : false)
  const activeSectionRef = useRef('')

  // 1. Scroll listener for compaction (RAF throttled, deduped) and IntersectionObserver for active section spy
  useEffect(() => {
    const sectionIds = ['productions', 'services', 'technical', 'process', 'contact']

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 40
          if (scrolled !== isScrolledRef.current) {
            isScrolledRef.current = scrolled
            setIsScrolled(scrolled)
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // Zero-reflow Active Section Spy via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (activeSectionRef.current !== `#${id}`) {
              activeSectionRef.current = `#${id}`
              setActiveSection(`#${id}`)
            }
          }
        }
      },
      { rootMargin: '-15% 0px -70% 0px' }
    )

    for (const id of sectionIds) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      observer.disconnect()
    }
  }, [])

  // 2. Sliding Pill Highlight Interpolation (Aceternity Navbar Pill pattern)
  useEffect(() => {
    const targetIdx =
      hoveredIdx !== null
        ? hoveredIdx
        : siteConfig.navigation.findIndex((item) => item.href === activeSection)

    if (targetIdx !== -1 && linkRefs.current[targetIdx]) {
      const el = linkRefs.current[targetIdx]
      if (el) {
        setIndicatorStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          opacity: 1,
        })
      }
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [hoveredIdx, activeSection])

  // 3. Mobile menu scroll lock and keyboard accessibility
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen])

  return (
    <>
      {/* Click-away backdrop overlay when mobile island is expanded */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Dynamic Island Centered Positioning Container */}
      <header className="fixed top-3.5 sm:top-5 inset-x-0 z-50 flex justify-center pointer-events-none px-4">
        {/* iPhone-Style Dynamic Island Floating Surface */}
        <div
          ref={islandRef}
          className={`relative transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
            isMobileMenuOpen
              ? 'w-[calc(100vw-2rem)] max-w-sm rounded-[28px] p-5 glass-island glass-gloss shadow-2xl flex flex-col gap-5'
              : `rounded-full glass-island glass-gloss flex items-center justify-between ${
                  isScrolled
                    ? 'glass-island-scrolled h-11 px-3 sm:px-4 gap-2.5 sm:gap-4.5'
                    : 'h-12 sm:h-12.5 px-3.5 sm:px-5 gap-3 sm:gap-5'
                }`
          }`}
          style={!isMobileMenuOpen ? { maxWidth: '640px' } : undefined}
          role="navigation"
          aria-label="Main Island Navigation"
        >
          {/* ========================================================
              STATE A: EXPANDED MOBILE DYNAMIC ISLAND
             ======================================================== */}
          {isMobileMenuOpen ? (
            <div className="flex flex-col w-full animate-in fade-in zoom-in-95 duration-200">
              {/* Expanded Header Row */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <a
                  href="#"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 group select-none"
                  aria-label="SA Production Home"
                >
                  <span className="font-extrabold text-sm tracking-tight text-white">SA PRODUCTION</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" />
                  <span className="font-mono text-[9px] tracking-widest text-[#7C6ECD] uppercase">
                    VARANASI
                  </span>
                </a>

                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="flex flex-col gap-1.5 py-3.5">
                {siteConfig.navigation.map((item, idx) => {
                  const isActive = activeSection === item.href
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                        isActive
                          ? 'bg-white/12 text-white font-semibold'
                          : 'text-white/70 hover:bg-white/6 hover:text-white'
                      }`}
                    >
                      <span className="text-sm uppercase tracking-wider">{item.label}</span>
                      <span className="font-mono text-[10px] text-[#7C6ECD]">0{idx + 1}</span>
                    </a>
                  )
                })}
              </nav>

              {/* Mobile Action CTA */}
              <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
                <a
                  href="#contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-11 w-full items-center justify-center rounded-full glass-violet text-xs font-semibold uppercase tracking-wider text-white shadow-md active:scale-98 transition-transform"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          ) : (
            /* ========================================================
               STATE B: COLLAPSED COMPACT DYNAMIC ISLAND (Desktop & Mobile)
               ======================================================== */
            <>
              {/* LEFT: SA Brand Wordmark */}
              <a
                href="#"
                className="flex items-center gap-1.5 pl-1 pr-1.5 py-1 text-white hover:text-[#7C6ECD] transition-colors group select-none shrink-0"
                aria-label="SA Production Home"
              >
                <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white group-hover:text-[#7C6ECD] transition-colors">
                  SA
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD] transition-transform duration-300 group-hover:scale-125" />
                <span className="hidden lg:inline-block font-mono text-[9px] tracking-widest text-white/50 uppercase ml-0.5">
                  PROD
                </span>
              </a>

              {/* CENTER: Desktop Nav Links with Sliding Pill Highlight */}
              <nav
                aria-label="Desktop Navigation"
                className="hidden md:flex items-center relative py-1"
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {/* Sliding Pill Indicator (Aceternity Navbar Pill pattern) */}
                <div
                  className="absolute top-1 bottom-1 rounded-full bg-white/12 border border-white/10 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: `translateX(${indicatorStyle.left}px)`,
                    width: `${indicatorStyle.width}px`,
                    opacity: indicatorStyle.opacity,
                  }}
                  aria-hidden="true"
                />

                {siteConfig.navigation.map((item, idx) => {
                  const isActive = activeSection === item.href
                  return (
                    <a
                      key={item.label}
                      ref={(el) => {
                        linkRefs.current[idx] = el
                      }}
                      href={item.href}
                      onMouseEnter={() => setHoveredIdx(idx)}
                      className={`relative z-10 px-2.5 lg:px-3 py-1 text-[11px] lg:text-xs uppercase tracking-wider font-medium transition-colors duration-200 select-none ${
                        isActive ? 'text-white font-semibold' : 'text-white/65 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  )
                })}
              </nav>

              {/* RIGHT: Action CTA & Mobile Island Control */}
              <div className="flex items-center gap-2 shrink-0">
                <MagneticButton
                  href="#contact"
                  className="h-7 sm:h-7.5 rounded-full glass-violet px-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-white shadow-sm hover:scale-105 transition-all flex items-center gap-1 group"
                >
                  <span>Start</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </MagneticButton>

                {/* Mobile Menu Island Toggle Trigger */}
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-expanded="false"
                  aria-label="Open mobile navigation island"
                  className="flex md:hidden h-7 w-7 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                  <Menu className="h-3.5 w-3.5" />
                </button>
              </div>
            </>
          )}
        </div>
      </header>
    </>
  )
}

export default Navbar
