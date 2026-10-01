export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  operationalCapabilities: string[];
  equipmentHighlights: string[];
  interactionType: "sound" | "lighting" | "stage" | "led" | "camera" | "production";
}

export const servicesData: ServiceItem[] = [
  {
    id: "sound",
    number: "01",
    title: "PROFESSIONAL SOUND",
    tagline: "Acoustic control engineered for zero distortion and uniform pressure.",
    description: "From intimate keynote clarity to high-impact festival sound pressure levels. We deploy calibrated line-array architectures, digital mixing consoles, wireless spectrum scanning, and pristine multi-track stage recording.",
    operationalCapabilities: [
      "FOH & Monitor Sound Engineering",
      "Wireless RF Spectrum Coordination",
      "Acoustic Room Tuning & Smaart Analysis",
      "Dante Digital Audio Over IP Routing",
      "Multi-Track 64-Channel Master Recording"
    ],
    equipmentHighlights: [
      "d&b audiotechnik / L-Acoustics spec Line Arrays",
      "DiGiCo & Yamaha Digital Consoles",
      "Shure Axient Digital Wireless Mics",
      "Sennheiser G4 / IEM Monitoring Systems"
    ],
    interactionType: "sound"
  },
  {
    id: "lighting",
    number: "02",
    title: "LIGHTING DESIGN",
    tagline: "Atmospheric stage sculpting, beam choreography, and portrait illumination.",
    description: "Lighting is architecture in motion. We design and program synchronized moving profiles, sharp beam arrays, warm tungsten washes, and haze textures that frame every key moment with photographic fidelity.",
    operationalCapabilities: [
      "Timecoded DMX & Art-Net Programming",
      "Keylight Balancing for 4K Broadcast",
      "Architectural Venue & Facade Illumination",
      "Moving Head Choreography & Gobo Design",
      "Atmospheric Low-Fog & Tour-Grade Haze"
    ],
    equipmentHighlights: [
      "Robe & Claypaky Hybrid Moving Spot/Beam",
      "GrandMA3 Lighting Control Surfaces",
      "Astera Titan Wireless Pixel Tubes",
      "High-CRI 96+ Warm Profile Fixtures"
    ],
    interactionType: "lighting"
  },
  {
    id: "stage-truss",
    number: "03",
    title: "STAGE & TRUSS",
    tagline: "Certified structural engineering and load-rated ground support.",
    description: "Every safe spectacle rests on certified rigging. We engineer heavy-duty aluminum box truss roofs, load-bearing ground support towers, modular heavy risers, and secure overhead equipment grids.",
    operationalCapabilities: [
      "Structural Load Calculation & Sign-off",
      "Outdoor Roof Canopies & Weather Rigging",
      "Ground Support Towers & Ballast Anchoring",
      "Modular Carpeted & Acrylic Stage Risers",
      "Motorized Electric Chain Hoist Systems"
    ],
    equipmentHighlights: [
      "Eurotruss 400x400 Heavy Duty Box Truss",
      "CM Lodestar D8+ Electric Chain Motors",
      "Prolyte Stage Deck Systems & Handrails",
      "Engineered Outrigger Ground Support"
    ],
    interactionType: "stage"
  },
  {
    id: "led-visuals",
    number: "04",
    title: "LED & VISUALS",
    tagline: "High-refresh video surfaces, pixel-mapped backdrops, and media engines.",
    description: "High-contrast visual experiences that captivate live audiences and camera sensors alike. Ultra-black P2.6 indoor and weather-sealed P3.9 outdoor LED screens with zero flicker at high shutter speeds.",
    operationalCapabilities: [
      "Pixel-Accurate Screen Mapping & Calibration",
      "Real-Time Live IMAG Video Feed Switching",
      "Media Server Content Playback (Resolume / Watchout)",
      "Redundant 4K Fiber Optical Signal Runs",
      "Curved, Split, & Architectural LED Configs"
    ],
    equipmentHighlights: [
      "Ultra-Fine Pitch P2.6mm High-Contrast Tiles",
      "P3.9mm High-Brightness Outdoor Panels",
      "NovaStar H-Series Flagship Video Processors",
      "Datapath & Barco Presentation Switchers"
    ],
    interactionType: "led"
  },
  {
    id: "camera-coverage",
    number: "05",
    title: "CAMERA & LIVE COVERAGE",
    tagline: "Cinema-grade optics, broadcast fiber chains, and live vision mixing.",
    description: "Capturing the emotion and scale with broadcast-level precision. Full cinema camera packages, robotic PTZ systems, wireless zero-delay video links, and dedicated director-switched live production units.",
    operationalCapabilities: [
      "Multi-Camera Live Vision Mixing (PPU)",
      "Zero-Delay Wireless Camera Transmissions",
      "Robotic Remote PTZ for Discreet Placement",
      "Uncompressed 4K 10-Bit Master Recording",
      "Direct Fiber Live Uplink for Broadcast / Stream"
    ],
    equipmentHighlights: [
      "Sony FX9 & FX6 Cinema Camera Chains",
      "Fujinon Broadcast Optical Zoom Packages",
      "Blackmagic ATEM Constellation 8K PPU",
      "Teradek Bolt 4K Zero-Latency Links"
    ],
    interactionType: "camera"
  },
  {
    id: "complete-production",
    number: "06",
    title: "COMPLETE EVENT PRODUCTION",
    tagline: "People, equipment, power, and timing — moving as one synchronized system.",
    description: "We don't merely drop off gear. We provide technical directors, show callers, stage managers, master electricians, and synchronized crew deployment from load-in to post-event strike.",
    operationalCapabilities: [
      "End-to-End Technical Show Direction",
      "Run-of-Show Minute-by-Minute Cue Calling",
      "Venue Power Load Audits & 3-Phase Distro",
      "Multi-Department Intercom Comms Systems",
      "Strict Contingency & Redundancy Protocols"
    ],
    equipmentHighlights: [
      "3-Phase Distro Panels with Camlock Racks",
      "Riedel / Green-GO Digital Intercom Networks",
      "True Online Double-Conversion UPS Banks",
      "Heavy Duty Cable Ramps & Safety Systems"
    ],
    interactionType: "production"
  }
];
