import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Layers, Shield, Sliders, Activity, Zap } from 'lucide-react'
import { gsap, EASE } from '../../lib/motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type LayerId = 'all' | 'rigging' | 'lighting' | 'audio' | 'power'

interface LayerConfig {
  id: LayerId
  label: string
  shortTitle: string
  badge: string
  headline: string
  subhead: string
  Icon: React.ElementType
  specs: { label: string; value: string }[]
}

const LAYERS: LayerConfig[] = [
  {
    id: 'all',
    label: 'ALL SYSTEMS',
    shortTitle: 'System Overview',
    badge: 'SYSTEM OVERVIEW',
    headline: 'Unified Show Engineering',
    subhead: 'Master architectural coordination across all technical disciplines',
    Icon: Layers,
    specs: [
      { label: 'Engineering Governance', value: 'Single-Source Technical Direction' },
      { label: 'Network Integration', value: 'Dante / Art-Net / 3-Phase Bus' },
      { label: 'Redundancy Matrix', value: 'Dual-Path Hardware Protection' },
    ],
  },
  {
    id: 'rigging',
    label: '01 RIGGING GRID',
    shortTitle: 'Rigging Grid',
    badge: '01 RIGGING GRID',
    headline: 'Structural Rigging & Box Truss',
    subhead: 'Certified load-bearing points and structural deflection modeling',
    Icon: Shield,
    specs: [
      { label: 'Structural Safety Factor', value: '10:1 Certified Load Rating' },
      { label: 'Hoist Infrastructure', value: 'Variable-Speed Chain Hoists' },
      { label: 'Tolerances & Safety', value: 'Calculated WLL Distribution' },
    ],
  },
  {
    id: 'lighting',
    label: '02 LIGHTING DMX',
    shortTitle: 'Lighting DMX',
    badge: '02 LIGHTING DMX',
    headline: 'Networked Lighting & Control',
    subhead: 'Opto-isolated universe distribution and timecode synchronization',
    Icon: Sliders,
    specs: [
      { label: 'Data Protocol', value: 'Art-Net & sACN / DMX512 Optical' },
      { label: 'Show Cue Alignment', value: 'SMPTE / MTC Timecode Clock' },
      { label: 'Protection Protocol', value: 'Galvanic Optical Splitter Isolation' },
    ],
  },
  {
    id: 'audio',
    label: '03 AUDIO SPL',
    shortTitle: 'Audio SPL',
    badge: '03 AUDIO SPL',
    headline: 'Acoustic SPL & Vector Coverage',
    subhead: 'Acoustically aligned line-array dispersion and boundary tuning',
    Icon: Activity,
    specs: [
      { label: 'Array Splay Tuning', value: 'Inter-Cabinet Mechanical Angles' },
      { label: 'Sub-Bass Topology', value: 'Cardioid Stage-Bleed Cancellation' },
      { label: 'Calibration Standard', value: 'Real-Time Multi-Zone Analysis' },
    ],
  },
  {
    id: 'power',
    label: '04 POWER & RF',
    shortTitle: 'Power & RF',
    badge: '04 POWER & RF',
    headline: 'Power Topology & RF Spectrum',
    subhead: 'Dual-redundant 3-phase feeds and coordinated wireless channels',
    Icon: Zap,
    specs: [
      { label: 'Power Redundancy', value: 'System A & System B Failover' },
      { label: 'Audio Ground Isolation', value: 'Clean Technical Earth Trunk' },
      { label: 'Spectrum Management', value: 'Drop-Out Free Wireless Coordination' },
    ],
  },
]

export const TechnicalCapability: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<LayerId>('all')
  const sectionRef = useRef<HTMLElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const schematicRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const prefersReducedMotion = useReducedMotion()

  // 1. First-Entry Blueprint Construction Animation (GSAP ScrollTrigger once)
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        svgRef.current,
        { opacity: 0, scale: 0.97 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: EASE.cinematic,
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [prefersReducedMotion])

  // 2. Magnetic 3D Perspective Tilt (Direct GPU transform refs for 60fps/120fps performance)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!viewportRef.current || !schematicRef.current) return

    const rect = viewportRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalized coordinates [-0.5, 0.5]
    const normX = x / rect.width - 0.5
    const normY = y / rect.height - 0.5

    // Restrained to max ±4 degrees per requirements
    const rotateY = normX * 8
    const rotateX = -normY * 8

    schematicRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`

    // Subtle technical inspection light spotlight
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, rgba(124, 110, 205, 0.14), transparent 75%)`
      spotlightRef.current.style.opacity = '1'
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (!schematicRef.current) return
    schematicRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)'
    if (spotlightRef.current) {
      spotlightRef.current.style.opacity = '0'
    }
  }, [])

  const currentConfig = LAYERS.find((l) => l.id === activeLayer) || LAYERS[0]

  return (
    <section
      id="technical"
      ref={sectionRef}
      className="relative w-full py-12 sm:py-16 lg:py-20 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 bg-[#F4F1E8]"
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
            Engineering &amp; Infrastructure
          </span>
        </div>

        {/* Section Layout Grid: Left Context (34%) + Right CAD Inspector (66%) */}
        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ================= LEFT COLUMN: NARRATIVE & TELEMETRY ================= */}
          <div className="lg:col-span-4 xl:col-span-4 flex flex-col justify-between">
            <div>
              {/* Category Eyebrow & Title */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-[#09090C] leading-[1.05]">
                ARCHITECTURAL RIGGING &amp; <br />
                <span className="font-serif italic font-normal text-[#514691] lowercase">
                  production engineering
                </span>
              </h2>

              {/* Exact Unaltered Body Copy */}
              <p className="mt-4 text-sm sm:text-base text-[#09090C]/70 font-light leading-relaxed">
                We operate like an engineering firm on site. Certified load calculations, frequency coordination, power phase balancing, and hardware redundancy protocols are built into every production.
              </p>

              {/* Active Layer Dynamic Specifications Panel */}
              <div className="mt-6 sm:mt-8 rounded-2xl glass-light-interactive p-5 sm:p-6 border border-hairline transition-all duration-500">
                <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-[#7C6ECD]">
                    <currentConfig.Icon className="h-4 w-4 text-[#7C6ECD]" />
                    <span>{currentConfig.badge}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] text-[#09090C]/50 uppercase">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD] animate-pulse" />
                    <span>Active Telemetry</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#09090C]">
                  {currentConfig.headline}
                </h3>
                <p className="mt-1 text-xs text-[#09090C]/70 font-light leading-relaxed">
                  {currentConfig.subhead}
                </p>

                {/* Subsystem Key Parameters */}
                <div className="mt-4 pt-3 border-t border-hairline/60 flex flex-col gap-2.5 font-mono text-xs">
                  {currentConfig.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3">
                      <span className="text-[11px] text-[#09090C]/50 uppercase">{spec.label}</span>
                      <span className="text-[11px] font-semibold text-[#09090C] text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Requested Section Statement & Exit Marker */}
            <div className="mt-8 pt-4 border-t border-hairline flex items-center justify-between font-mono text-xs text-[#09090C]/60">
              <span className="font-bold tracking-widest text-[#7C6ECD] uppercase">
                ENGINEERED BEFORE IT IS BUILT.
              </span>
              <span className="text-[10px] uppercase tracking-wider text-[#09090C]/40">
                Varanasi Production Hub
              </span>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: INTERACTIVE CAD INSPECTOR ================= */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col">
            {/* Viewport Frame with 3D Perspective Container */}
            <div
              ref={viewportRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] rounded-3xl overflow-hidden bg-[#09090C] border border-[#7C6ECD]/20 shadow-2xl flex flex-col"
              style={{ perspective: '1200px' }}
            >
              {/* Subtle Cursor Inspection Spotlight (Restrained Violet Torch) */}
              <div
                ref={spotlightRef}
                className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300"
              />

              {/* Floating Glass Layer Control (Aceternity Animated Tabs Pattern) */}
              <div className="relative z-30 pt-4 sm:pt-5 px-4 flex justify-center w-full">
                <nav
                  role="tablist"
                  aria-label="Engineering Schematic Layers"
                  className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full glass-dark border border-white/10 shadow-2xl backdrop-blur-md max-w-full overflow-x-auto no-scrollbar"
                >
                  {LAYERS.map((layer) => {
                    const isActive = activeLayer === layer.id
                    return (
                      <button
                        key={layer.id}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveLayer(layer.id)}
                        className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-[10px] sm:text-[11px] uppercase tracking-wider transition-all duration-300 whitespace-nowrap shrink-0 ${
                          isActive
                            ? 'bg-[#7C6ECD] text-white shadow-md font-semibold'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {layer.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Persistent 3D Magnetic Blueprint Schematic */}
              <div
                ref={schematicRef}
                className="relative flex-1 w-full h-full p-4 sm:p-6 transition-transform duration-200 ease-out will-change-transform flex items-center justify-center"
              >
                {/* SVG Blueprint Canvas */}
                <svg
                  ref={svgRef}
                  viewBox="0 0 900 580"
                  className="w-full h-full max-h-full select-none"
                  style={{ overflow: 'visible' }}
                >
                  <defs>
                    {/* Architectural Coordinate Grid */}
                    <pattern id="cadGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="rgba(244, 241, 232, 0.04)"
                        strokeWidth="1"
                      />
                      <circle cx="0" cy="0" r="1" fill="rgba(124, 110, 205, 0.25)" />
                    </pattern>

                    {/* Violet Glow Filters for Active Nodes */}
                    <filter id="violetGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* 1. Background Grid & Technical Coordinate Markings */}
                  <rect width="900" height="580" fill="url(#cadGrid)" />

                  {/* Corner Precision Crosshairs */}
                  <g stroke="rgba(244, 241, 232, 0.3)" strokeWidth="1">
                    <path d="M 35 40 L 45 40 M 40 35 L 40 45" />
                    <path d="M 855 40 L 865 40 M 860 35 L 860 45" />
                    <path d="M 35 540 L 45 540 M 40 535 L 40 545" />
                    <path d="M 855 540 L 865 540 M 860 535 L 860 545" />
                  </g>

                  {/* Stage Centerline Datum (CL) */}
                  <line
                    x1="450"
                    y1="35"
                    x2="450"
                    y2="550"
                    stroke="rgba(124, 110, 205, 0.25)"
                    strokeWidth="1"
                    strokeDasharray="6 4"
                  />
                  <text
                    x="456"
                    y="50"
                    fill="rgba(124, 110, 205, 0.6)"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    CL 0.00M
                  </text>

                  {/* Stage Front Datum Axis */}
                  <line
                    x1="180"
                    y1="360"
                    x2="720"
                    y2="360"
                    stroke="rgba(244, 241, 232, 0.15)"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <text
                    x="728"
                    y="363"
                    fill="rgba(244, 241, 232, 0.4)"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    DATUM 0.00M
                  </text>

                  {/* 2. Physical Stage Deck Platform (Isometric Ground Support) */}
                  <polygon
                    points="240,360 660,360 610,220 290,220"
                    fill="rgba(244, 241, 232, 0.02)"
                    stroke="rgba(244, 241, 232, 0.22)"
                    strokeWidth="1.2"
                  />
                  {/* Deck Module Divisions */}
                  <line
                    x1="450"
                    y1="220"
                    x2="450"
                    y2="360"
                    stroke="rgba(244, 241, 232, 0.08)"
                    strokeWidth="1"
                  />
                  <line
                    x1="345"
                    y1="290"
                    x2="555"
                    y2="290"
                    stroke="rgba(244, 241, 232, 0.08)"
                    strokeWidth="1"
                  />

                  {/* ================= LAYER 01: RIGGING GRID ================= */}
                  <g
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity:
                        activeLayer === 'rigging' ? 1 : activeLayer === 'all' ? 0.85 : 0.18,
                    }}
                  >
                    {/* Vertical Upright Box Towers (FL, FR, RL, RR) */}
                    {/* Front-Left Tower */}
                    <line
                      x1="220"
                      y1="380"
                      x2="220"
                      y2="100"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth={activeLayer === 'rigging' ? '2.5' : '1.5'}
                    />
                    {/* Front-Right Tower */}
                    <line
                      x1="680"
                      y1="380"
                      x2="680"
                      y2="100"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth={activeLayer === 'rigging' ? '2.5' : '1.5'}
                    />
                    {/* Rear-Left Tower */}
                    <line
                      x1="270"
                      y1="240"
                      x2="270"
                      y2="70"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.4)'}
                      strokeWidth="1.5"
                    />
                    {/* Rear-Right Tower */}
                    <line
                      x1="630"
                      y1="240"
                      x2="630"
                      y2="70"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.4)'}
                      strokeWidth="1.5"
                    />

                    {/* Overhead Perimeter Box Truss Grid */}
                    {/* Front Main Truss Span */}
                    <line
                      x1="220"
                      y1="100"
                      x2="680"
                      y2="100"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.8)'}
                      strokeWidth={activeLayer === 'rigging' ? '2.5' : '1.8'}
                    />
                    <line
                      x1="220"
                      y1="114"
                      x2="680"
                      y2="114"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.5)'}
                      strokeWidth="1"
                    />
                    {/* Rear Main Truss Span */}
                    <line
                      x1="270"
                      y1="70"
                      x2="630"
                      y2="70"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="1.5"
                    />
                    {/* Side Truss Connections */}
                    <line
                      x1="270"
                      y1="70"
                      x2="220"
                      y2="100"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="1.5"
                    />
                    <line
                      x1="630"
                      y1="70"
                      x2="680"
                      y2="100"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="1.5"
                    />
                    {/* Mid-Stage Bridle Truss */}
                    <line
                      x1="245"
                      y1="85"
                      x2="655"
                      y2="85"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.4)'}
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />

                    {/* Audio Cantilever Outriggers */}
                    <line
                      x1="220"
                      y1="100"
                      x2="160"
                      y2="110"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="2"
                    />
                    <line
                      x1="680"
                      y1="100"
                      x2="740"
                      y2="110"
                      stroke={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="2"
                    />

                    {/* 6 Certified Load Points & Chain Hoists */}
                    {[
                      { x: 220, y: 100, label: 'FL' },
                      { x: 680, y: 100, label: 'FR' },
                      { x: 270, y: 70, label: 'RL' },
                      { x: 630, y: 70, label: 'RR' },
                      { x: 380, y: 85, label: 'C1' },
                      { x: 520, y: 85, label: 'C2' },
                    ].map((pt, idx) => (
                      <g key={idx}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={activeLayer === 'rigging' ? '6' : '4'}
                          fill={activeLayer === 'rigging' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.8)'}
                          filter={activeLayer === 'rigging' ? 'url(#violetGlow)' : undefined}
                        />
                        {activeLayer === 'rigging' && (
                          <circle
                            cx={pt.x}
                            cy={pt.y}
                            r="11"
                            fill="none"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                            opacity="0.6"
                            className="animate-ping"
                          />
                        )}
                      </g>
                    ))}

                    {/* Rigging Technical Dimension Annotations */}
                    <line
                      x1="220"
                      y1="50"
                      x2="680"
                      y2="50"
                      stroke="rgba(244, 241, 232, 0.4)"
                      strokeWidth="1"
                    />
                    <path
                      d="M 220 46 L 220 54 M 680 46 L 680 54"
                      stroke="rgba(244, 241, 232, 0.4)"
                      strokeWidth="1"
                    />
                    <text
                      x="450"
                      y="44"
                      textAnchor="middle"
                      fill="rgba(244, 241, 232, 0.7)"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      SPAN: 18.00M
                    </text>

                    {/* Rigging Callout Badges */}
                    {activeLayer === 'rigging' && (
                      <g className="transition-opacity duration-500">
                        {/* 10:1 Safety Factor Label */}
                        <g transform="translate(140, 68)">
                          <rect
                            width="140"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="70"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            10:1 SAFETY FACTOR
                          </text>
                        </g>

                        {/* Chain Hoist Label */}
                        <g transform="translate(685, 68)">
                          <rect
                            width="100"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="50"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            CHAIN HOIST
                          </text>
                        </g>

                        {/* Load Point Callout */}
                        <g transform="translate(450, 130)">
                          <rect
                            x="-80"
                            y="0"
                            width="160"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            LOAD POINT: 1.0T WLL
                          </text>
                        </g>
                      </g>
                    )}
                  </g>

                  {/* ================= LAYER 02: LIGHTING DMX ================= */}
                  <g
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity:
                        activeLayer === 'lighting' ? 1 : activeLayer === 'all' ? 0.75 : 0.12,
                    }}
                  >
                    {/* FOH Lighting Console Node */}
                    <rect
                      x="430"
                      y="515"
                      width="40"
                      height="22"
                      rx="4"
                      fill="rgba(9, 9, 12, 0.9)"
                      stroke={activeLayer === 'lighting' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="1.5"
                    />
                    <text
                      x="450"
                      y="530"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="8"
                      fontFamily="monospace"
                    >
                      FOH
                    </text>

                    {/* DMX Optical Trunk Lines */}
                    <path
                      d="M 450 515 L 450 460 L 190 460 L 190 320 L 220 100"
                      fill="none"
                      stroke={activeLayer === 'lighting' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.4)'}
                      strokeWidth={activeLayer === 'lighting' ? '1.8' : '1'}
                      strokeDasharray={activeLayer === 'lighting' ? 'none' : '4 3'}
                    />

                    {/* Stage Left Opto Splitter Hub */}
                    <circle
                      cx="190"
                      cy="320"
                      r="5"
                      fill={activeLayer === 'lighting' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                    />

                    {/* Fixture Arrays on Front, Mid & Rear Truss */}
                    {/* Front Truss Profiles */}
                    {[280, 350, 420, 480, 550, 620].map((xPos, idx) => (
                      <g key={`front-fix-${idx}`}>
                        <circle
                          cx={xPos}
                          cy="107"
                          r={activeLayer === 'lighting' ? '5.5' : '4'}
                          fill={
                            activeLayer === 'lighting' ? '#A49BE0' : 'rgba(244, 241, 232, 0.7)'
                          }
                          filter={activeLayer === 'lighting' ? 'url(#violetGlow)' : undefined}
                        />
                        {/* Downward Light Throw Vectors */}
                        {activeLayer === 'lighting' && (
                          <line
                            x1={xPos}
                            y1="113"
                            x2={xPos + (xPos < 450 ? -25 : 25)}
                            y2="280"
                            stroke="rgba(124, 110, 205, 0.28)"
                            strokeWidth="1.5"
                            strokeDasharray="4 2"
                          />
                        )}
                      </g>
                    ))}

                    {/* Mid Truss Beams */}
                    {[310, 400, 500, 590].map((xPos, idx) => (
                      <rect
                        key={`mid-fix-${idx}`}
                        x={xPos - 4}
                        y="81"
                        width="8"
                        height="8"
                        rx="2"
                        fill={activeLayer === 'lighting' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      />
                    ))}

                    {/* Lighting Callout Badges */}
                    {activeLayer === 'lighting' && (
                      <g className="transition-opacity duration-500">
                        {/* Universe Label */}
                        <g transform="translate(120, 290)">
                          <rect
                            width="145"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="72"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            DMX UNIVERSE 01 &amp; 02
                          </text>
                        </g>

                        {/* Fixture Group Label */}
                        <g transform="translate(450, 160)">
                          <rect
                            x="-70"
                            y="0"
                            width="140"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            FIXTURE GROUP A
                          </text>
                        </g>

                        {/* Signal Path Callout */}
                        <g transform="translate(480, 450)">
                          <text
                            x="0"
                            y="0"
                            fill="#A49BE0"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            SIGNAL PATH // OPTO-ISOLATED
                          </text>
                        </g>
                      </g>
                    )}
                  </g>

                  {/* ================= LAYER 03: AUDIO SPL ================= */}
                  <g
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: activeLayer === 'audio' ? 1 : activeLayer === 'all' ? 0.7 : 0.12,
                    }}
                  >
                    {/* Left Suspended Line Array Cluster */}
                    <g transform="translate(150, 115)">
                      {[0, 14, 28, 42, 56, 70].map((yOffset, idx) => (
                        <rect
                          key={`l-box-${idx}`}
                          x={idx * 1.5}
                          y={yOffset}
                          width="18"
                          height="10"
                          rx="2"
                          fill={activeLayer === 'audio' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.7)'}
                          stroke="#09090C"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Right Suspended Line Array Cluster */}
                    <g transform="translate(732, 115)">
                      {[0, 14, 28, 42, 56, 70].map((yOffset, idx) => (
                        <rect
                          key={`r-box-${idx}`}
                          x={-idx * 1.5}
                          y={yOffset}
                          width="18"
                          height="10"
                          rx="2"
                          fill={activeLayer === 'audio' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.7)'}
                          stroke="#09090C"
                          strokeWidth="1"
                        />
                      ))}
                    </g>

                    {/* Subwoofer Ground Array in front of Stage Deck */}
                    {[360, 420, 480, 540].map((xPos, idx) => (
                      <rect
                        key={`sub-${idx}`}
                        x={xPos - 14}
                        y="370"
                        width="28"
                        height="16"
                        rx="2"
                        fill={activeLayer === 'audio' ? '#514691' : 'rgba(244, 241, 232, 0.5)'}
                        stroke="#7C6ECD"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Acoustic Dispersion Wavefront Vectors */}
                    {/* Left Array Coverage Cone */}
                    <path
                      d="M 160 180 L 100 520 L 460 520 Z"
                      fill={activeLayer === 'audio' ? 'rgba(124, 110, 205, 0.12)' : 'none'}
                      stroke={activeLayer === 'audio' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.25)'}
                      strokeWidth="1.2"
                      strokeDasharray={activeLayer === 'audio' ? 'none' : '4 3'}
                    />

                    {/* Right Array Coverage Cone */}
                    <path
                      d="M 740 180 L 440 520 L 800 520 Z"
                      fill={activeLayer === 'audio' ? 'rgba(124, 110, 205, 0.12)' : 'none'}
                      stroke={activeLayer === 'audio' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.25)'}
                      strokeWidth="1.2"
                      strokeDasharray={activeLayer === 'audio' ? 'none' : '4 3'}
                    />

                    {/* Isobar Wavefront Arcs */}
                    <path
                      d="M 240 430 Q 450 460 660 430"
                      fill="none"
                      stroke={activeLayer === 'audio' ? '#A49BE0' : 'rgba(244, 241, 232, 0.3)'}
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />
                    <path
                      d="M 180 490 Q 450 530 720 490"
                      fill="none"
                      stroke={activeLayer === 'audio' ? '#A49BE0' : 'rgba(244, 241, 232, 0.2)'}
                      strokeWidth="1.2"
                      strokeDasharray="4 2"
                    />

                    {/* Measurement Points P1, P2 (FOH), P3 */}
                    {[
                      { x: 310, y: 470, label: 'P1' },
                      { x: 450, y: 490, label: 'FOH' },
                      { x: 590, y: 470, label: 'P3' },
                    ].map((mPt, idx) => (
                      <g key={`mpt-${idx}`}>
                        <circle
                          cx={mPt.x}
                          cy={mPt.y}
                          r="4"
                          fill={activeLayer === 'audio' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                        />
                        <text
                          x={mPt.x}
                          y={mPt.y - 8}
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {mPt.label}
                        </text>
                      </g>
                    ))}

                    {/* Audio Callout Badges */}
                    {activeLayer === 'audio' && (
                      <g className="transition-opacity duration-500">
                        {/* Line Array Badge */}
                        <g transform="translate(60, 140)">
                          <rect
                            width="115"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="57"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            LINE ARRAY L/R
                          </text>
                        </g>

                        {/* SPL Coverage Badge */}
                        <g transform="translate(450, 420)">
                          <rect
                            x="-85"
                            y="0"
                            width="170"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="0"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            SPL COVERAGE: 110°
                          </text>
                        </g>
                      </g>
                    )}
                  </g>

                  {/* ================= LAYER 04: POWER & RF ================= */}
                  <g
                    className="transition-all duration-700 ease-out"
                    style={{
                      opacity: activeLayer === 'power' ? 1 : activeLayer === 'all' ? 0.7 : 0.1,
                    }}
                  >
                    {/* Primary Generator Feed (SYSTEM A) */}
                    <path
                      d="M 80 470 L 160 470 L 160 340 L 220 340"
                      fill="none"
                      stroke={activeLayer === 'power' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.5)'}
                      strokeWidth={activeLayer === 'power' ? '2.5' : '1.5'}
                    />

                    {/* Redundant Generator Feed (SYSTEM B) */}
                    <path
                      d="M 80 500 L 140 500 L 140 360 L 220 360"
                      fill="none"
                      stroke={activeLayer === 'power' ? '#A49BE0' : 'rgba(244, 241, 232, 0.3)'}
                      strokeWidth="1.8"
                      strokeDasharray="4 2"
                    />

                    {/* Stage Left Main PDU Distribution Matrix */}
                    <rect
                      x="160"
                      y="330"
                      width="60"
                      height="40"
                      rx="6"
                      fill="rgba(9, 9, 12, 0.9)"
                      stroke={activeLayer === 'power' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.6)'}
                      strokeWidth="1.8"
                    />
                    <text
                      x="190"
                      y="354"
                      textAnchor="middle"
                      fill="#FFFFFF"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      3-PHASE
                    </text>

                    {/* Isolated Clean Sound Ground Line across Stage */}
                    <line
                      x1="220"
                      y1="345"
                      x2="680"
                      y2="345"
                      stroke={activeLayer === 'power' ? '#7C6ECD' : 'rgba(244, 241, 232, 0.4)'}
                      strokeWidth="1.2"
                      strokeDasharray="6 3"
                    />

                    {/* Directional RF Paddle Antennas at Stage Wings */}
                    <g transform="translate(160, 230)">
                      <line x1="0" y1="0" x2="0" y2="25" stroke="#7C6ECD" strokeWidth="2" />
                      <polygon points="-8,-4 0,-12 8,-4" fill="#7C6ECD" />
                    </g>
                    <g transform="translate(740, 230)">
                      <line x1="0" y1="0" x2="0" y2="25" stroke="#7C6ECD" strokeWidth="2" />
                      <polygon points="-8,-4 0,-12 8,-4" fill="#7C6ECD" />
                    </g>

                    {/* RF Wireless Stage Coverage Radiation Ellipse */}
                    <ellipse
                      cx="450"
                      cy="280"
                      rx="260"
                      ry="80"
                      fill={activeLayer === 'power' ? 'rgba(124, 110, 205, 0.08)' : 'none'}
                      stroke={activeLayer === 'power' ? '#7C6ECD' : 'none'}
                      strokeWidth="1.2"
                      strokeDasharray="5 3"
                    />

                    {/* Power & RF Callout Badges */}
                    {activeLayer === 'power' && (
                      <g className="transition-opacity duration-500">
                        {/* Feed Labels */}
                        <g transform="translate(30, 455)">
                          <text
                            x="0"
                            y="0"
                            fill="#FFFFFF"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            SYSTEM A (MAIN)
                          </text>
                          <text
                            x="0"
                            y="35"
                            fill="#A49BE0"
                            fontSize="8"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            SYSTEM B (REDUNDANT)
                          </text>
                        </g>

                        {/* Phase Balance Telemetry */}
                        <g transform="translate(230, 310)">
                          <rect
                            width="160"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="80"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            PHASE BALANCE: L1/L2/L3
                          </text>
                        </g>

                        {/* RF Coordination Badge */}
                        <g transform="translate(680, 210)">
                          <rect
                            width="140"
                            height="24"
                            rx="12"
                            fill="rgba(9, 9, 12, 0.85)"
                            stroke="#7C6ECD"
                            strokeWidth="1"
                          />
                          <text
                            x="70"
                            y="16"
                            textAnchor="middle"
                            fill="#FFFFFF"
                            fontSize="9"
                            fontFamily="monospace"
                            fontWeight="bold"
                          >
                            RF COORDINATION
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                </svg>

                {/* Viewport Bottom Status Bar */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-white/45 border-t border-white/5 pt-2 pointer-events-none">
                  <div className="flex items-center gap-3">
                    <span>CAD LAYER: {currentConfig.shortTitle.toUpperCase()}</span>
                    <span className="hidden sm:inline">SCALE: 1:50 METRIC</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7C6ECD]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" />
                    <span>PRECISION VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
