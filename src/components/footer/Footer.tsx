import React from 'react'
import { ArrowUp } from 'lucide-react'

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      className="w-full border-t border-hairline-dark bg-[#09090C] py-12 px-5 sm:px-8 md:px-12 lg:px-16 text-white"
      aria-label="Site Footer"
    >
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Brand */}
        <div className="flex flex-col">
          <span className="text-xl font-extrabold tracking-tight text-white">
            SA PRODUCTION
          </span>
          <span className="font-mono text-xs text-white/50 tracking-widest uppercase mt-1">
            Physical & Technical Event Production · Varanasi, UP, India
          </span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-wider text-white/60">
          <a href="#productions" className="hover:text-white transition-colors">
            Work
          </a>
          <a href="#services" className="hover:text-white transition-colors">
            Capabilities
          </a>
          <a href="#technical" className="hover:text-white transition-colors">
            Engineering
          </a>
          <a href="#process" className="hover:text-white transition-colors">
            Process
          </a>
          <a href="#contact" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>

        {/* Scroll to Top in Smoked Glass */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top"
          className="flex h-10 w-10 items-center justify-center rounded-full glass-dark-interactive text-white hover:border-[#7C6ECD]/50 hover:text-[#A49BE0] transition-colors"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>

      <div className="mx-auto max-w-7xl mt-8 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/40">
        <span>&copy; {new Date().getFullYear()} SA PRODUCTION. All rights reserved.</span>
        <span>Engineered with Precision in Varanasi, India</span>
      </div>
    </footer>
  )
}
