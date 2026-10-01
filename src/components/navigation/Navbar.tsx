import React, { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-400 ease-out ${
          isScrolled
            ? 'glass-nav py-3 shadow-sm'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 md:px-12">
          {/* Logo Brand Lockup */}
          <a
            href="#"
            className="group flex flex-col items-start leading-none transition-opacity hover:opacity-85"
            aria-label="SA Production Home"
          >
            <span className="text-base sm:text-lg font-black tracking-[-0.03em] text-[#09090C]">
              SA PRODUCTION
            </span>
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#09090C]/60 mt-0.5 group-hover:text-[#7C6ECD] transition-colors">
              VARANASI · INDIA
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-7 lg:gap-9 text-xs font-medium uppercase tracking-wider text-[#09090C]/70"
          >
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative py-1 transition-colors hover:text-[#09090C] after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0 after:bg-[#7C6ECD] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <MagneticButton
              href="#contact"
              className="h-10 rounded-full glass-violet px-5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm hover:scale-102 transition-all"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
            </MagneticButton>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            aria-controls="mobile-menu"
            className="flex h-10 w-10 items-center justify-center rounded-full glass-light md:hidden text-[#09090C] hover:bg-black/[0.05] transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-menu"
        aria-hidden={!isMobileMenuOpen}
        className={`fixed inset-0 z-50 flex flex-col justify-between glass-nav p-6 sm:p-10 transition-all duration-500 ease-cinematic md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-8'
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline pb-6">
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-[#09090C]">SA PRODUCTION</span>
            <span className="font-mono text-[9px] tracking-widest text-[#7C6ECD]">VARANASI, UP</span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-10 w-10 items-center justify-center rounded-full glass-light text-[#09090C]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Links */}
        <nav className="my-auto flex flex-col gap-4">
          {siteConfig.navigation.map((item, idx) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between text-2xl font-bold tracking-tight text-[#09090C] hover:text-[#7C6ECD] transition-colors py-2 border-b border-hairline/50"
            >
              <span>{item.label}</span>
              <span className="font-mono text-xs text-[#09090C]/40">0{idx + 1}</span>
            </a>
          ))}
        </nav>

        {/* Drawer Bottom Actions */}
        <div className="flex flex-col gap-4 border-t border-hairline pt-6">
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex h-12 w-full items-center justify-center rounded-full glass-violet text-sm font-semibold uppercase tracking-wider text-white transition-transform active:scale-98"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
          <div className="flex justify-between font-mono text-[11px] text-[#09090C]/60">
            <span>Physical Event Production</span>
            <span>Varanasi, India</span>
          </div>
        </div>
      </div>
    </>
  )
}
