import React, { useState } from 'react'
import { ArrowUpRight, Eye } from 'lucide-react'
import { selectedProductionsData } from '../../data/productions'
import type { SelectedProduction } from '../../data/productions'
import { OptimizedImage } from '../media/OptimizedImage'
import { LightboxModal } from '../ui/LightboxModal'
import { CardSpotlight } from '../ui/CardSpotlight'
import { GlareCard } from '../ui/GlareCard'

export const SelectedProductions: React.FC = () => {
  const [selectedProduction, setSelectedProduction] = useState<SelectedProduction | null>(null)

  return (
    <section
      id="productions"
      className="relative w-full py-10 sm:py-16 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#F4F1E8]"
      aria-label="Selected Production Portfolio"
    >
      <div className="mx-auto max-w-7xl">
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
        <div className="mt-6 sm:mt-8 mb-6 sm:mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#09090C]">
            SELECTED LIVE <br />
            <span className="font-serif italic font-normal text-[#514691] lowercase">
              event executions
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#09090C]/70 font-light leading-relaxed">
            Real physical productions delivered across Varanasi and Uttar Pradesh. Click any frame to inspect full technical sound, lighting, and stage rigging specs.
          </p>
        </div>

        {/* Sticky Stacking Production Cards with Aceternity CardSpotlight & GlareCard */}
        <div className="flex flex-col gap-6 sm:gap-10">
          {selectedProductionsData.map((project, index) => {
            return (
              <CardSpotlight
                key={project.id}
                onClick={() => setSelectedProduction(project)}
                data-cursor="VIEW"
                className="group relative lg:sticky lg:top-24 cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl glass-light-interactive shadow-xl transition-all duration-300 hover:border-[#7C6ECD]/50"
                style={{
                  zIndex: 10 + index,
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                  {/* Left Metadata Glass Rail */}
                  <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-hairline bg-transparent">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold tracking-widest text-[#7C6ECD]">
                          PROD // {project.number}
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[#09090C]/50">
                          {project.location}
                        </span>
                      </div>

                      <span className="mt-3 inline-block font-mono text-xs tracking-wider uppercase text-[#514691]">
                        {project.category}
                      </span>

                      <h3 className="mt-1.5 text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-[#09090C] group-hover:text-[#514691] transition-colors">
                        {project.headline}
                      </h3>

                      <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#09090C]/70 font-light">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-hairline">
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="rounded-full glass-light px-2.5 py-0.5 text-[10px] font-mono tracking-wider text-[#09090C]/75"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 flex items-center gap-2 font-mono text-xs font-semibold text-[#7C6ECD] uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                        <span>Inspect Technical Blueprint</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Right Large Media Frame with Aceternity Glare Interaction */}
                  <GlareCard className="lg:col-span-7 relative min-h-[260px] sm:min-h-[320px] md:min-h-[380px] overflow-hidden bg-[#09090C]">
                    <OptimizedImage
                      src={project.image}
                      alt={project.headline}
                      aspectRatio="16/10"
                      containerClassName="h-full w-full"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Glass Inspection Pill */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-full glass-nav px-4 py-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-[#09090C] shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <Eye className="h-3.5 w-3.5 text-[#7C6ECD]" />
                      <span>Full Specs</span>
                    </div>
                  </GlareCard>
                </div>
              </CardSpotlight>
            )
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        production={selectedProduction}
        onClose={() => setSelectedProduction(null)}
      />
    </section>
  )
}
