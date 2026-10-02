import React from 'react'
import { Activity, Zap, Radio, Sliders, Shield, Cpu, Gauge, Layers } from 'lucide-react'
import { CardSpotlight } from '../ui/CardSpotlight'

export const TechnicalCapability: React.FC = () => {
  return (
    <section
      id="technical"
      className="relative w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 bg-[#F4F1E8]"
      aria-label="Technical Capability & Engineering Systems"
    >
      <div className="mx-auto w-full max-w-[1720px] 2xl:max-w-[1920px]">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
            <span className="text-[#7C6ECD] font-semibold">08</span>
            <span>// TECHNICAL CAPABILITY MATRIX</span>
          </div>
          <span className="font-mono text-[11px] text-[#09090C]/40 uppercase tracking-widest hidden sm:inline-block">
            Engineering & Infrastructure
          </span>
        </div>

        {/* Section Headline */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 w-full">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-[#09090C] leading-[1.05]">
              ARCHITECTURAL RIGGING & <br />
              <span className="font-serif italic font-normal text-[#514691] lowercase">
                production engineering
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-[#09090C]/70 font-light leading-relaxed max-w-xl lg:text-right">
            We operate like an engineering firm on site. Certified load calculations, frequency coordination, power phase balancing, and hardware redundancy protocols are built into every production.
          </p>
        </div>

        {/* Top Grid: Rigging Load Engineering Glass Card + Technical Subsystem Glass Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-stretch">
          {/* Left Column: Physical Rigging & Power Topology Glass Blueprint Card */}
          <CardSpotlight className="lg:col-span-6 flex flex-col justify-between rounded-2xl sm:rounded-3xl glass-light-interactive p-6 sm:p-8 shadow-xl">
            <div>
              <div className="flex items-center justify-between border-b border-hairline pb-4 mb-5">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#7C6ECD]">
                  <Shield className="h-4 w-4" />
                  <span>Physical Infrastructure Specs</span>
                </div>
                <span className="font-mono text-[10px] text-[#09090C]/40 uppercase">
                  Safety Factor 10:1
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#09090C]">
                Structural Safety & Precision Distribution
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#09090C]/70 leading-relaxed font-light">
                Every truss line, motor hoist, and power cable is physically mapped against venue structural blueprints prior to rigging load in.
              </p>

              {/* Engineering Metrics Matrix in Glass Tiles */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-xl glass-light">
                  <div className="flex items-center gap-1.5 text-[#09090C]/50 text-[10px] uppercase">
                    <Gauge className="h-3 w-3 text-[#7C6ECD]" />
                    <span>Rigging Load</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-[#09090C]">Certified Points</div>
                  <div className="text-[11px] text-[#09090C]/60 mt-0.5 font-light">Calculated WLL distribution</div>
                </div>

                <div className="p-3.5 rounded-xl glass-light">
                  <div className="flex items-center gap-1.5 text-[#09090C]/50 text-[10px] uppercase">
                    <Zap className="h-3 w-3 text-[#7C6ECD]" />
                    <span>Power Phase</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-[#09090C]">3-Phase Balanced</div>
                  <div className="text-[11px] text-[#09090C]/60 mt-0.5 font-light">Dual-redundant generator lines</div>
                </div>

                <div className="p-3.5 rounded-xl glass-light">
                  <div className="flex items-center gap-1.5 text-[#09090C]/50 text-[10px] uppercase">
                    <Cpu className="h-3 w-3 text-[#7C6ECD]" />
                    <span>Signal Routing</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-[#09090C]">Optical Fiber / Dante</div>
                  <div className="text-[11px] text-[#09090C]/60 mt-0.5 font-light">Zero-loss digital multicore</div>
                </div>

                <div className="p-3.5 rounded-xl glass-light">
                  <div className="flex items-center gap-1.5 text-[#09090C]/50 text-[10px] uppercase">
                    <Layers className="h-3 w-3 text-[#7C6ECD]" />
                    <span>Optical Capture</span>
                  </div>
                  <div className="mt-1 text-base font-bold text-[#09090C]">Multi-Cam 4K SDI</div>
                  <div className="text-[11px] text-[#09090C]/60 mt-0.5 font-light">Low-latency live IMAG switching</div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline flex items-center justify-between font-mono text-[11px] text-[#09090C]/50">
              <span>● Complete Engineering Governance</span>
              <span className="text-[#7C6ECD] font-medium">Varanasi, UP Production Hub</span>
            </div>
          </CardSpotlight>

          {/* Right Column: Architectural Engineering Glass Subsystems */}
          <div className="lg:col-span-6 flex flex-col gap-3.5">
            <div className="rounded-2xl glass-light p-4 sm:p-5 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                  <Activity className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-[#09090C]">
                    Acoustic SPL Calibration
                  </h4>
                  <p className="text-xs text-[#09090C]/60 mt-0.5 font-mono">
                    Time-aligned multi-zone line array prediction software
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#09090C]/70 font-light">
                Direct-to-reverberant ratio optimization, delay tower calculation, cardioid sub arrays to eliminate stage bleed.
              </p>
            </div>

            <div className="rounded-2xl glass-light p-4 sm:p-5 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                  <Sliders className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-[#09090C]">
                    DMX 512 & Art-Net Universes
                  </h4>
                  <p className="text-xs text-[#09090C]/60 mt-0.5 font-mono">
                    Multi-universe lighting console networks
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#09090C]/70 font-light">
                Timecode cue synchronization (SMPTE/MTC), pixel-mapped LED battens, and optical DMX splitters with isolated galvanic protection.
              </p>
            </div>

            <div className="rounded-2xl glass-light p-4 sm:p-5 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-[#09090C]">
                    3-Phase Power Distribution
                  </h4>
                  <p className="text-xs text-[#09090C]/60 mt-0.5 font-mono">
                    Phase-balanced distribution units (PDU) & redundancy
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#09090C]/70 font-light">
                Isolated sound power lines to eliminate ground hum, active voltage regulators, and automatic generator failover switches.
              </p>
            </div>

            <div className="rounded-2xl glass-light p-4 sm:p-5 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:-translate-y-0.5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                  <Radio className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-tight text-[#09090C]">
                    RF Frequency Management
                  </h4>
                  <p className="text-xs text-[#09090C]/60 mt-0.5 font-mono">
                    Active spectrum scanning for drop-out free wireless
                  </p>
                </div>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-[#09090C]/70 font-light">
                Directional antenna distribution arrays, intermodulation calculation, and multi-channel in-ear monitor (IEM) synchronization.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
