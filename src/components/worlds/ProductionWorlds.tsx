import React, { useState } from 'react'
import { productionWorldsData } from '../../data/productions'
import { OptimizedImage } from '../media/OptimizedImage'
import { ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react'
import { CardSpotlight } from '../ui/CardSpotlight'

export const ProductionWorlds: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  const currentWorld = productionWorldsData[activeIndex] || productionWorldsData[0]

  return (
    <section
      id="worlds"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-[#09090C] text-white"
      aria-label="Production Worlds & Event Categories"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-hairline-dark pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="text-[#7C6ECD] font-semibold">03</span>
            <span>// PRODUCTION WORLDS & SPATIAL ENVIRONMENTS</span>
          </div>
          <span className="font-mono text-[11px] text-[#7C6ECD] uppercase tracking-widest hidden sm:inline-block">
            6 Core Categories
          </span>
        </div>

        {/* Section Title */}
        <div className="mt-6 mb-8 sm:mb-10 max-w-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-white">
            SPACES & ENVIRONMENTS <br />
            <span className="font-serif italic font-normal text-white/80 lowercase">
              we engineer
            </span>
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
            Every category demands a tailored balance of acoustics, illumination, and structural presence. Select a world to explore its physical stage execution and atmosphere.
          </p>
        </div>

        {/* Main Unified Composition: Production Stage Photography (7 cols) + Smoked Glass Category Rail (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Live Event Stage Photography with Smoked Glass Frames */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl glass-dark shadow-2xl overflow-hidden min-h-[420px] sm:min-h-[480px] lg:min-h-[520px]">
            {/* Stage Top Bar in Smoked Translucent Glass */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-hairline-dark bg-black/40 backdrop-blur-md z-20">
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[#7C6ECD] tracking-widest uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD] animate-pulse" />
                <span>STAGE PRODUCTION // {currentWorld.title}</span>
              </div>

              <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-white/50 uppercase">
                <ImageIcon className="h-3 w-3 text-[#7C6ECD]" />
                <span>Live Archive</span>
              </div>
            </div>

            {/* Stage Photographic Canvas Area */}
            <div className="relative flex-1 w-full overflow-hidden min-h-[300px] sm:min-h-[360px]">
              {productionWorldsData.map((world, idx) => (
                <div
                  key={world.id}
                  className={`absolute inset-0 h-full w-full transition-all duration-700 ease-out ${
                    activeIndex === idx
                      ? 'opacity-100 scale-100 pointer-events-auto'
                      : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                >
                  <OptimizedImage
                    src={world.image}
                    alt={world.title}
                    aspectRatio="16/10"
                    containerClassName="h-full w-full"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090C] via-black/20 to-transparent" />
                </div>
              ))}
            </div>

            {/* Inset Disciplines Tag Bar at Bottom */}
            <div className="p-4 sm:p-5 bg-black/40 backdrop-blur-md border-t border-hairline-dark z-20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#7C6ECD] tracking-widest uppercase">
                  Engineered Disciplines:
                </span>
                <span className="font-mono text-[10px] text-white/40">
                  World 0{activeIndex + 1} of 06
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {currentWorld.disciplines.map((item, idx) => (
                  <span
                    key={idx}
                    className="rounded-full glass-dark px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-white/90"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Smoked Glass Category Rail & Active Details */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            {/* 6-Category Quick Switcher List */}
            <div className="flex flex-col gap-1.5 glass-dark p-3 sm:p-4 rounded-2xl">
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/50 px-2 pt-1 pb-1">
                Select Production Category:
              </span>
              <div className="grid grid-cols-1 gap-1">
                {productionWorldsData.map((world, index) => {
                  const isActive = activeIndex === index
                  return (
                    <button
                      key={world.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? 'glass-violet text-white font-bold shadow-md translate-x-1'
                          : 'bg-transparent text-white/70 hover:bg-white/[0.04] hover:text-white border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-mono text-xs ${isActive ? 'text-white' : 'text-[#7C6ECD]'}`}>
                          0{index + 1}
                        </span>
                        <span className="text-xs sm:text-sm uppercase tracking-tight">
                          {world.title}
                        </span>
                      </div>
                      <ArrowRight className={`h-3.5 w-3.5 transition-transform ${isActive ? 'opacity-100 translate-x-0.5 text-white' : 'opacity-0 -translate-x-1 text-[#7C6ECD]'}`} />
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Active World Overview Card with Aceternity CardSpotlight */}
            <CardSpotlight className="flex-1 flex flex-col justify-between rounded-2xl glass-dark-interactive p-5 sm:p-6">
              <div>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#7C6ECD] font-semibold">0{activeIndex + 1} // ACTIVE FOCUS</span>
                  <span className="text-white/40 uppercase">{currentWorld.subtitle}</span>
                </div>

                <h3 className="mt-2 text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                  {currentWorld.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/70 font-light">
                  {currentWorld.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-hairline-dark/60 flex items-center gap-2 text-xs font-mono text-[#A49BE0]">
                <Sparkles className="h-3.5 w-3.5 text-[#7C6ECD] shrink-0" />
                <span className="text-[11px] leading-tight">{currentWorld.tagline}</span>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  )
}
