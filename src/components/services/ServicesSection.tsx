import React, { useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'
import { servicesData } from '../../data/services'

export const ServicesSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('sound')

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section
      id="services"
      className="relative w-full py-10 sm:py-16 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#F4F1E8]"
      aria-label="Technical Capabilities and Services"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Index Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
            <span className="text-[#7C6ECD] font-semibold">04</span>
            <span>// CAPABILITIES & DISCIPLINES</span>
          </div>
          <span className="font-mono text-[11px] text-[#09090C]/40 uppercase tracking-widest hidden sm:inline-block">
            01 — 06 Core Services
          </span>
        </div>

        {/* Section Headline */}
        <div className="mt-6 sm:mt-8 mb-6 sm:mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#09090C]">
            COMPLETE TECHNICAL <br />
            <span className="font-serif italic font-normal text-[#514691] lowercase">
              event execution
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#09090C]/70 font-light leading-relaxed">
            From single-system rentals to complete multi-departmental show direction, we provide certified equipment, seasoned technicians, and unwavering reliability.
          </p>
        </div>

        {/* Luxury Glass Specification Rows */}
        <div className="flex flex-col gap-3.5">
          {servicesData.map((service) => {
            const isExpanded = expandedId === service.id

            return (
              <div
                key={service.id}
                className={`group rounded-2xl transition-all duration-300 ${
                  isExpanded
                    ? 'glass-light-interactive shadow-md'
                    : 'glass-light hover:border-[#7C6ECD]/30'
                }`}
              >
                <div
                  onClick={() => toggleExpand(service.id)}
                  className="flex cursor-pointer items-start justify-between gap-6 p-5 sm:p-6"
                >
                  <div className="flex items-baseline gap-5 sm:gap-10">
                    <span className="font-mono text-lg sm:text-xl font-bold text-[#7C6ECD] transition-transform duration-300 group-hover:translate-x-1">
                      {service.number}
                    </span>
                    <div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-tight text-[#09090C] group-hover:text-[#514691] transition-colors">
                        {service.title}
                      </h3>
                      <p className="mt-0.5 text-xs sm:text-sm font-mono text-[#09090C]/50">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <span className="hidden md:inline-flex text-xs font-mono tracking-widest uppercase text-[#7C6ECD] opacity-0 group-hover:opacity-100 transition-opacity">
                      {isExpanded ? 'Collapse' : 'Inspect'}
                    </span>
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                        isExpanded
                          ? 'glass-violet text-white rotate-180'
                          : 'glass-light text-[#09090C] group-hover:border-[#7C6ECD]'
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Capabilities Details */}
                <div
                  className={`grid transition-all duration-400 ease-out ${
                    isExpanded
                      ? 'grid-rows-[1fr] opacity-100 px-5 sm:px-6 pb-6'
                      : 'grid-rows-[0fr] opacity-0 overflow-hidden px-5 sm:px-6 pb-0'
                  }`}
                >
                  <div className="overflow-hidden border-t border-hairline/60 pt-5">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start pl-0 sm:pl-14">
                      <div className="md:col-span-6">
                        <p className="text-sm sm:text-base leading-relaxed text-[#09090C]/80">
                          {service.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {service.subsystems.map((sub, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg glass-light px-3 py-1 text-[11px] font-mono uppercase text-[#09090C]/75"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="md:col-span-6 flex flex-col gap-2.5">
                        <span className="font-mono text-xs uppercase tracking-widest text-[#7C6ECD]">
                          Delivery & Execution:
                        </span>
                        {service.capabilities.map((cap, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[#09090C]/75"
                          >
                            <span className="flex h-4 w-4 items-center justify-center rounded-full glass-violet text-[#7C6ECD] text-[10px] shrink-0 mt-0.5">
                              <Check className="h-2.5 w-2.5 text-white" />
                            </span>
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
