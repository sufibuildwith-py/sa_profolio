import { useState } from "react";
import { servicesData, type ServiceItem } from "../../data/services";
import { ServiceMicroInteractions } from "./ServiceMicroInteractions";
import { ArrowUpRight } from "lucide-react";

export function ServicesSection() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="relative w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-20 md:py-28 border-t border-[#F4F2ED]/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#F4F2ED]/15">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-[#7C6ECD]" />
              <span>CORE CAPABILITIES // DOMAIN EXPERTISE</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,4.2rem)] uppercase tracking-tight text-[#F4F2ED] leading-tight">
              WHAT <br className="hidden sm:inline" />
              WE HANDLE.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-[#F4F2ED]/70 leading-relaxed">
              We own, maintain, transport, and operate the entire technical stack. Zero reliance on third-party guesswork.
            </p>
            <p className="mt-1.5 font-mono text-[10px] sm:text-xs text-[#F4F2ED]/40 uppercase tracking-widest">
              6 CORE PILLARS · 1 COORDINATED TEAM
            </p>
          </div>
        </div>

        {/* Editorial Service Rows */}
        <div className="divide-y divide-[#F4F2ED]/12 border-b border-[#F4F2ED]/12">
          {servicesData.map((service: ServiceItem) => {
            const isHovered = hoveredId === service.id;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-cursor="EXPAND"
                className={`group relative transition-all duration-300 py-6 md:py-10 px-2 sm:px-4 ${
                  isHovered ? "bg-[#0E0E11]" : "bg-transparent"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                  {/* Left: Number & Title */}
                  <div className="flex items-baseline gap-5 sm:gap-8">
                    <span
                      className={`font-mono text-xs sm:text-sm transition-all duration-300 ${
                        isHovered ? "text-[#7C6ECD] translate-x-1" : "text-[#F4F2ED]/40"
                      }`}
                    >
                      {service.number}
                    </span>
                    <h3
                      className={`font-display font-black text-xl sm:text-3xl md:text-4xl uppercase tracking-tight transition-all duration-300 ${
                        isHovered
                          ? "text-[#F4F2ED] translate-x-2"
                          : "text-[#F4F2ED]/85"
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>

                  {/* Right: Tagline / Micro-Interaction Widget / Expand Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-5 sm:gap-8">
                    {/* Micro-Interaction Module on Desktop Hover */}
                    <div
                      className={`hidden lg:block transition-all duration-300 transform ${
                        isHovered
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                      }`}
                    >
                      <ServiceMicroInteractions type={service.interactionType} />
                    </div>

                    <div className="max-w-xs text-right hidden sm:block">
                      <p className="font-mono text-[11px] text-[#F4F2ED]/50 uppercase tracking-wider">
                        {service.tagline}
                      </p>
                    </div>

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 ${
                        isHovered
                          ? "border-[#F4F2ED] bg-[#F4F2ED] text-[#050505] rotate-45"
                          : "border-[#F4F2ED]/20 text-[#F4F2ED]/60"
                      }`}
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details when hovered or focused */}
                <div
                  className={`grid transition-all duration-400 overflow-hidden ${
                    isHovered
                      ? "grid-rows-[1fr] opacity-100 mt-6 pt-5 border-t border-[#F4F2ED]/10"
                      : "grid-rows-[0fr] opacity-0 mt-0"
                  }`}
                >
                  <div className="min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-6">
                      <p className="text-xs sm:text-sm text-[#F4F2ED]/80 font-light leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <div className="md:col-span-3">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#7C6ECD] mb-2">
                        OPERATIONAL CAPABILITIES
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[11px] text-[#F4F2ED]/70">
                        {service.operationalCapabilities.map((cap, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-[#7C6ECD]" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-3">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/50 mb-2">
                        CORE HARDWARE
                      </h4>
                      <ul className="space-y-1.5 font-mono text-[11px] text-[#F4F2ED]/60">
                        {service.equipmentHighlights.map((eq, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="h-1 w-1 rounded-full bg-cyan-400/80" />
                            <span>{eq}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
