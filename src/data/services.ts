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
    description: "From intimate keynote speech clarity to high-impact festival sound pressure levels. We deploy calibrated line-array architectures, digital mixing consoles, wireless spectrum scanning, and pristine multi-track stage recording.",
    operationalCapabilities: [
      "FOH & Monitor Sound Engineering",
      "Wireless RF Spectrum Coordination",
      "Acoustic Room Tuning & Smaart Analysis",
      "Digital Audio Over IP Routing",
      "Multi-Track Master Recording"
    ],
    equipmentHighlights: [
      "High-Output Modular Line Array Systems",
      "High-Resolution 96kHz Digital Consoles",
      "Digital Wireless Microphone Systems",
      "Multi-Channel In-Ear Stage Monitoring"
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
      "Moving Head Choreography & Pattern Design",
      "Atmospheric Low-Fog & Tour-Grade Haze"
    ],
    equipmentHighlights: [
      "Hybrid Moving Spot & Beam Fixtures",
      "Digital Lighting Control Surfaces",
      "Wireless Linear Pixel Tubes",
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
      "Heavy-Duty Aluminum Box Truss Grids",
      "Load-Rated Electric Chain Hoist Motors",
      "Modular Stage Decks & Safety Handrails",
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
      "Media Server Content Playback & Synchronization",
      "Redundant 4K Fiber Optical Signal Runs",
      "Curved, Split, & Architectural LED Configs"
    ],
    equipmentHighlights: [
      "Ultra-Fine Pitch P2.6mm High-Contrast Tiles",
      "P3.9mm High-Brightness Outdoor Panels",
      "Flagship 4K Video Splicers & Processors",
      "Seamless Multi-Screen Presentation Switchers"
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
      "Multi-Camera Live Vision Mixing",
      "Zero-Delay Wireless Camera Transmissions",
      "Robotic Remote PTZ for Discreet Placement",
      "Uncompressed 4K 10-Bit Master Recording",
      "Direct Fiber Live Uplink for Broadcast"
    ],
    equipmentHighlights: [
      "4K Cinema Camera System Packages",
      "Broadcast Optical Zoom Lens Packages",
      "Multi-Camera Live Switcher Units",
      "Zero-Latency Wireless Video Links"
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
      "3-Phase Power Distribution Panels",
      "Digital Multi-Channel Intercom Systems",
      "Online Double-Conversion Power Backup",
      "Heavy-Duty Cable Protection Ramps"
    ],
    interactionType: "production"
  }
];
