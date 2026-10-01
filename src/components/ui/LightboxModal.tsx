import React, { useEffect } from 'react'
import { X, Volume2, Lightbulb, Box, Tv } from 'lucide-react'
import type { SelectedProduction } from '../../data/productions'
import { OptimizedImage } from '../media/OptimizedImage'

interface LightboxModalProps {
  production: SelectedProduction | null
  onClose: () => void
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ production, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (production) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [production, onClose])

  if (!production) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#09090C]/80 backdrop-blur-md transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl glass-light-interactive text-[#09090C] shadow-2xl p-6 md:p-10 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close details"
          className="absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full glass-light text-[#09090C] hover:bg-black/10 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex flex-col gap-2 border-b border-hairline pb-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-widest text-[#7C6ECD]">
              PROD // {production.number}
            </span>
            <span className="font-mono text-xs text-[#09090C]/50">
              {production.location}
            </span>
          </div>
          <h2 id="modal-title" className="text-2xl md:text-3xl font-bold tracking-tight text-[#09090C]">
            {production.headline}
          </h2>
          <span className="text-xs font-mono tracking-widest uppercase text-[#09090C]/60">
            {production.category}
          </span>
        </div>

        {/* Image */}
        <div className="mt-6 overflow-hidden rounded-2xl glass-dark">
          <OptimizedImage
            src={production.image}
            alt={production.headline}
            aspectRatio="16/9"
            priority
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#09090C]/50">
            Execution Overview
          </h3>
          <p className="mt-2 text-base leading-relaxed text-[#09090C]/80 font-light">
            {production.description}
          </p>
        </div>

        {/* Technical Subsystem Specifications */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 rounded-2xl glass-light p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD] shrink-0 mt-0.5">
              <Volume2 className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C]">
                Audio Reinforcement
              </span>
              <p className="text-xs text-[#09090C]/70 mt-1 font-light">{production.specs.audio}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl glass-light p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD] shrink-0 mt-0.5">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C]">
                Intelligent Lighting
              </span>
              <p className="text-xs text-[#09090C]/70 mt-1 font-light">{production.specs.lighting}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl glass-light p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD] shrink-0 mt-0.5">
              <Box className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C]">
                Staging & Truss
              </span>
              <p className="text-xs text-[#09090C]/70 mt-1 font-light">{production.specs.staging}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl glass-light p-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD] shrink-0 mt-0.5">
              <Tv className="h-4 w-4" />
            </div>
            <div>
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C]">
                LED & Video Displays
              </span>
              <p className="text-xs text-[#09090C]/70 mt-1 font-light">{production.specs.visuals}</p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-hairline">
          {production.tags.map((tag, idx) => (
            <span
              key={idx}
              className="rounded-full glass-light px-3 py-1 text-[11px] font-mono tracking-wider text-[#09090C]/75"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
