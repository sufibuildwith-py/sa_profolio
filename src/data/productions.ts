export interface ProductionWorld {
  id: string;
  number: string;
  category: string;
  headline: string;
  tagline: string;
  scaleDescription: string;
  typicalRig: string[];
  keySpecs: string[];
  backdropMood: string;
  accentColor: string;
  bgGradient: string;
}

export interface ProductionCaseStudy {
  id: string;
  number: string;
  title: string;
  client: string;
  category: string;
  date: string;
  venue: string;
  location: string;
  priority: "HIGH" | "NORMAL";
  equipmentSummary: string;
  equipmentBreakdown: {
    cameras?: string;
    lighting?: string;
    audio?: string;
    ledWall?: string;
    stage?: string;
  };
  crewLeads: {
    name: string;
    role: string;
  }[];
  operationalChecklist: string[];
  timeWindow: string;
  summary: string;
  image: string;
  imageAlt: string;
}

export const productionWorlds: ProductionWorld[] = [
  {
    id: "weddings",
    number: "01",
    category: "LUXURY WEDDINGS",
    headline: "GRAND CEREMONIAL SCALE",
    tagline: "High-output architectural illumination, pristine wireless acoustics, and cinematic multi-angle capture.",
    scaleDescription: "From intimate Sangeet stages to massive multi-acre palace courtyards, calibrated for zero acoustic feedback and flattering portrait-grade warm light.",
    typicalRig: [
      "4–6 Cinema Camera Chains",
      "Wireless RF Mic Spectrum",
      "Warm Tungsten & Profile Rig",
      "Custom Modular Stage Riser",
      "Ultra-Quiet Generator Sync"
    ],
    keySpecs: ["Zero Audio Delay", "CRI > 96 Lighting", "Multi-Zone Sound FOH"],
    backdropMood: "ambient-gold",
    accentColor: "#EAB308",
    bgGradient: "from-amber-950/30 via-neutral-950 to-black"
  },
  {
    id: "corporate",
    number: "02",
    category: "CORPORATE SUMMITS",
    headline: "ENTERPRISE-GRADE PRECISION",
    tagline: "Mission-critical presentation switching, redundant audio lines, and ultra-high resolution LED stages.",
    scaleDescription: "Engineered for Fortune leadership forums and tech keynotes where presentations, keynote sync, and broadcast live feeds cannot fail.",
    typicalRig: [
      "P2.6 Ultra-Black LED Wall",
      "Redundant Digital Audio Racks",
      "Seamless 4K Presentation Switcher",
      "Dante Audio Over IP Backbone",
      "Confidence Stage Monitors & Click"
    ],
    keySpecs: ["Fail-Safe Redundancy", "Pixel-Perfect Mapping", "Broadcast Fiber Links"],
    backdropMood: "electric-cyan",
    accentColor: "#38BDF8",
    bgGradient: "from-cyan-950/30 via-neutral-950 to-black"
  },
  {
    id: "live-music",
    number: "03",
    category: "LIVE CONCERTS & FESTIVALS",
    headline: "ACOUSTIC IMPACT & DMX DYNAMICS",
    tagline: "High-SPL line array systems, heavy-duty box truss rigging, and synchronized automated moving heads.",
    scaleDescription: "Outdoor festival arenas and multi-thousand attendee concerts requiring massive bass propagation, dynamic stage lighting timecoded to music, and multi-cam IMAG broadcast.",
    typicalRig: [
      "FOH Line Array + Subwoofer Arc",
      "30+ Beam / Spot / Wash Heads",
      "Certified 400mm Box Truss Grid",
      "P3.9 High-Brightness LED Stage",
      "Stage In-Ear Monitor (IEM) Systems"
    ],
    keySpecs: ["138dB Peak SPL", "Timecode SMPTE Sync", "Heavy Rigging Load Rated"],
    backdropMood: "concert-flame",
    accentColor: "#F97316",
    bgGradient: "from-orange-950/30 via-neutral-950 to-black"
  },
  {
    id: "conferences",
    number: "04",
    category: "GLOBAL CONFERENCES",
    headline: "INTELLIGENT HYBRID STAGING",
    tagline: "Speech intelligibility, multi-room breakout audio routing, and professional teleprompter suites.",
    scaleDescription: "Multi-day academic symposiums, national summits, and investor convocations with simultaneous recording, live transcription feeds, and strict timelines.",
    typicalRig: [
      "Speech-Tuned Line Columns",
      "Digital Wireless Microphone Banks",
      "Robotic Remote PTZ Cameras",
      "Ultra-Quiet Silent Stage Distro",
      "Dual Master Teleprompter Rigs"
    ],
    keySpecs: ["Speech STI > 0.75", "Automated PTZ Tracking", "Multi-Channel Record"],
    backdropMood: "deep-blue",
    accentColor: "#60A5FA",
    bgGradient: "from-blue-950/30 via-neutral-950 to-black"
  },
  {
    id: "fashion",
    number: "05",
    category: "FASHION RUNWAYS",
    headline: "SURGICAL RUNWAY LIGHTING",
    tagline: "Uniform edge-to-edge runway illumination, high-frequency camera-safe dimming, and pulsing spatial sound.",
    scaleDescription: "Precision runway rigs eliminating shadows on designer couture, synced with dynamic audio staging and high-speed multi-operator camera tracking.",
    typicalRig: [
      "Custom Linear Profile Truss",
      "Flicker-Free 1000Hz LED Engines",
      "Surround Spatial Sound Tuning",
      "Motorized Camera Dollies",
      "Ultra-Wide Entrance LED Portals"
    ],
    keySpecs: ["Zero Runway Shadows", "Flicker-Free 120fps Safe", "Editorial White Tuning"],
    backdropMood: "monochrome-silver",
    accentColor: "#E2E8F0",
    bgGradient: "from-neutral-800/20 via-neutral-950 to-black"
  },
  {
    id: "exhibitions",
    number: "06",
    category: "EXPOS & TRADE PAVILIONS",
    headline: "DYNAMIC ARCHITECTURAL STRUCTURES",
    tagline: "Expansive exhibition hall truss grids, distributed booth audio, and immersive multi-screen video playback.",
    scaleDescription: "Multi-day industry expos across hundreds of meters of exhibition floor space requiring safe power routing, structural load distribution, and durable continuous playback.",
    typicalRig: [
      "Ground Support Truss Towers",
      "Multi-Zone Distributed Audio",
      "Interactive Touch & LED Totems",
      "Industrial 3-Phase Power Boxes",
      "Cable Ramps & Safe Walkways"
    ],
    keySpecs: ["Continuous 72h Duty", "Certified Weight Loads", "Zero Tripping Hazards"],
    backdropMood: "emerald-glow",
    accentColor: "#34D399",
    bgGradient: "from-emerald-950/20 via-neutral-950 to-black"
  },
  {
    id: "cultural",
    number: "07",
    category: "CULTURAL PRODUCTIONS",
    headline: "TRADITION MEETS ADVANCED STAGING",
    tagline: "Natural acoustic reproduction for traditional instruments, theatrical warm spotlighting, and heritage backdrops.",
    scaleDescription: "University convocations, classical music festivals, and heritage celebrations where acoustic clarity and respectful visual presentation take center stage.",
    typicalRig: [
      "Acoustic Instrument Condenser Mics",
      "Theatrical Fresnels & Followspots",
      "Heritage Set Architectural Uplighting",
      "Multi-Channel Live Master Recording",
      "Dedicated Floor Audio Engineering"
    ],
    keySpecs: ["Pure Harmonic Resonance", "Warm 3200K Glow", "Ultra-Low Noise Floor"],
    backdropMood: "rich-amber",
    accentColor: "#F59E0B",
    bgGradient: "from-amber-950/20 via-neutral-950 to-black"
  },
  {
    id: "commercial",
    number: "08",
    category: "COMMERCIAL PRODUCTION",
    headline: "CINEMATIC SET ENGINEERING",
    tagline: "Controlled studio environments, high-CRI continuous lighting grids, and DIT data management workflows.",
    scaleDescription: "Brand commercial shoots, automotive reveals, and product launch films produced with cinema camera chains, calibrated color monitoring, and rapid onset turnaround.",
    typicalRig: [
      "4K Large-Format Cinema Packages",
      "High-Output Continuous Softlights",
      "Calibrated Master Color Monitors",
      "On-Set DIT RAID Storage Racks",
      "Precision Motorized Jib Arm"
    ],
    keySpecs: ["16-Bit RAW Pipeline", "Color Calibrated Rec.709", "Instant Checksum DIT"],
    backdropMood: "electric-slate",
    accentColor: "#94A3B8",
    bgGradient: "from-slate-900/30 via-neutral-950 to-black"
  }
];

export const selectedProductions: ProductionCaseStudy[] = [
  {
    id: "urban-beats-festival",
    number: "01",
    title: "Urban Beats Festival",
    client: "Urban Beats Collective",
    category: "LIVE MUSIC",
    date: "14-11-2026",
    venue: "Riverside Grounds",
    location: "Pune, Maharashtra",
    priority: "HIGH",
    equipmentSummary: "5 Cameras · 10 Lights · LED Wall · Audio Kit",
    equipmentBreakdown: {
      cameras: "5x Cinema 4K Chains with Long Broadcast Zooms",
      lighting: "10x High-Output Moving Beams, Strobes & Haze Generators",
      audio: "Dual Line Array Columns + 8 Subwoofers + Wireless In-Ear",
      ledWall: "P3.9 High-Brightness Outdoor Stage Backwall (12m x 5m)",
      stage: "Heavy-duty 400mm Box Truss Roof Rigging"
    },
    crewLeads: [
      { name: "Mohit Bansal", role: "Operations Manager" },
      { name: "Imran Hussain", role: "Technical Director" },
      { name: "Faisal Mirza", role: "Senior Sound Engineer" },
      { name: "Dev Kapoor", role: "Senior Gaffer" },
      { name: "Zain Ahmed", role: "Lighting Designer" }
    ],
    operationalChecklist: [
      "Stage structural inspection and ground load test",
      "FOH audio line check and spectrum RF sweep",
      "LED wall pixel calibration & video mapping test",
      "Multi-camera live switching & IMAG synchronization",
      "Live crowd safety line and power failover drill"
    ],
    timeWindow: "15:00 – 23:59 IST",
    summary: "Large-scale open air electronic and live music festival. Required acoustic tuning to prevent riverside echo while maintaining tight 30Hz sub-bass punch and high-speed moving beam sync.",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Concert stage with laser and lighting beams during live performance"
  },
  {
    id: "royal-fashion-night",
    number: "02",
    title: "Royal Fashion Night",
    client: "Royal Threads Couture",
    category: "FASHION",
    date: "25-10-2026",
    venue: "Imperial Ballroom",
    location: "Worli, Mumbai",
    priority: "HIGH",
    equipmentSummary: "4 Cameras · 8 Lights · LED Wall · Precision Audio",
    equipmentBreakdown: {
      cameras: "4x Cinema Camera Packages on Smooth Tracking Dollies",
      lighting: "8x Uniform Linear Profile Fixtures (Flicker-Free CRI 98)",
      audio: "Distributed Line Array Columns for Seamless Runway Sound",
      ledWall: "Seamless Ultra-Fine Pitch LED Entrance Portal",
      stage: "35-Meter Matte Black Raised Runway Platform"
    },
    crewLeads: [
      { name: "Priya Nair", role: "Art Director & Lighting Lead" },
      { name: "Dev Kapoor", role: "Senior Gaffer" },
      { name: "Zain Ahmed", role: "Lighting Designer" },
      { name: "Sara Khan", role: "Lead Videographer" },
      { name: "Tanya Kapoor", role: "Camera Operator" }
    ],
    operationalChecklist: [
      "Runway lux level measurement across all 35 meters",
      "Color temperature harmonization (calibrated 4200K)",
      "High-speed shutter camera sync (no LED banding)",
      "Choreographed model walk light cue programming",
      "VIP front-row sound dispersion balance"
    ],
    timeWindow: "17:00 – 23:30 IST",
    summary: "High-couture fashion presentation demanding surgical lighting. Zero shadow casting on delicate fabric textures and uncompressed 4K slow-motion camera recording.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Runway stage lit with razor-sharp lighting fixtures"
  },
  {
    id: "sharma-wedding",
    number: "03",
    title: "Sharma Grand Wedding",
    client: "Sharma Family",
    category: "WEDDINGS",
    date: "30-09-2026",
    venue: "Royal Orchid",
    location: "Bengaluru, Karnataka",
    priority: "HIGH",
    equipmentSummary: "4 Cameras · 7 Lights · Audio Kit · Wireless Rig",
    equipmentBreakdown: {
      cameras: "4x 4K Full-Frame Cinema Cameras with Prime Lenses",
      lighting: "7x Warm Tungsten & Atmospheric Profile Washers",
      audio: "Multi-Channel Digital Wireless Microphone Setup with Feedback Suppression",
      ledWall: "Warm Ambient Visual Backdrops & Stage Displays",
      stage: "Custom Floral & Architectural Stage Framing"
    },
    crewLeads: [
      { name: "Rohan Sharma", role: "Senior Camera Operator" },
      { name: "Kabir Khan", role: "Production Coordinator" },
      { name: "Zoya Siddiqui", role: "Sound Engineer" },
      { name: "Meera Iyer", role: "Lighting Technician" },
      { name: "Sana Qureshi", role: "Production Assistant" }
    ],
    operationalChecklist: [
      "Venue main power load check & dedicated sound circuit",
      "Mandap and stage audio line check & mic hide test",
      "Warm ceremonial lighting focus for ritual photography",
      "Live video feed transmission to banquet overflow halls",
      "End-to-end rehearsal with family coordinators"
    ],
    timeWindow: "14:00 – 23:30 IST",
    summary: "Monumental luxury wedding ceremony requiring delicate ceremonial sound amplification with zero visible wire clutter and flattering natural illumination.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Luxury wedding reception stage with warm golden lighting"
  },
  {
    id: "arora-corporate-summit",
    number: "04",
    title: "Arora Corporate Summit",
    client: "Arora Technologies",
    category: "CORPORATE",
    date: "05-10-2026",
    venue: "Convention Centre",
    location: "Sector 62, Noida",
    priority: "NORMAL",
    equipmentSummary: "3 Cameras · P2.6 LED Wall · Redundant Audio Kit",
    equipmentBreakdown: {
      cameras: "3x Robotic PTZ & Broadcast Camera Chains",
      lighting: "Balanced Stage Wash & Speaker Keylights",
      audio: "Dante Networked Mic Racks & Digital Stagebox",
      ledWall: "16-Meter Seamless P2.6 Curved LED Main Stage Screen",
      stage: "Clean Corporate Presentation Riser with Acrylic Lectern"
    },
    crewLeads: [
      { name: "Aarav Mehta", role: "Production Manager" },
      { name: "Imran Hussain", role: "Technical Director" },
      { name: "Aditya Rao", role: "Sound Specialist" },
      { name: "Arjun Malhotra", role: "Lighting Specialist" },
      { name: "Alina Roy", role: "Client Operations" }
    ],
    operationalChecklist: [
      "LED wall pixel-by-pixel presentation test",
      "Redundant presentation laptop failover switch test",
      "Keynote speaker wireless headset frequency scans",
      "Live international streaming uplink redundancy verify",
      "Continuous runtime power stability audit"
    ],
    timeWindow: "08:00 – 19:00 IST",
    summary: "Two-day annual technology conference hosting 1,200 enterprise delegates. Zero audio dropouts, flawless 4K slide presentation switching, and synchronized live broadcast.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Auditorium corporate stage with massive LED video wall"
  },
  {
    id: "autotech-launch",
    number: "05",
    title: "AutoTech Systems Reveal",
    client: "AutoTech Systems",
    category: "COMMERCIAL",
    date: "09-12-2026",
    venue: "Expo Arena",
    location: "Gurugram, Haryana",
    priority: "HIGH",
    equipmentSummary: "4 Cameras · LED Wall · 8 Moving Profiles · Pyro Safe",
    equipmentBreakdown: {
      cameras: "4x Cinema Camera Packages with 120fps High-Speed Capability",
      lighting: "8x Automated Spot & Reveal Silhouette Fixtures",
      audio: "Immersive 3D Spatial Audio Setup with Floor Subwoofers",
      ledWall: "Motorized Split LED Screen with Vehicle Drive-Through Gate",
      stage: "Reinforced 5-Ton Vehicle Turntable Stage"
    },
    crewLeads: [
      { name: "Imran Hussain", role: "Technical Director" },
      { name: "Ayush Saxena", role: "Video Engineer" },
      { name: "Danish Ali", role: "Chief Lighting Technician" },
      { name: "Neha Bhatia", role: "Production Supervisor" },
      { name: "Armaan Rizvi", role: "Event Coordinator" }
    ],
    operationalChecklist: [
      "Motorized split-screen synchronization test",
      "Vehicle ramp weight tolerance certification",
      "Specular highlight management on car bodywork",
      "Dramatic countdown lighting sequence programming",
      "VIP reveal audio blast timing calibration"
    ],
    timeWindow: "10:00 – 21:00 IST",
    summary: "High-stakes commercial automotive unveiling with dynamic motorized LED parting gates, dramatic key lighting on vehicle curves, and thunderous acoustic cues.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "Automotive showcase stage with dramatic spotlights"
  },
  {
    id: "educon-university-summit",
    number: "06",
    title: "EduCon University Summit",
    client: "EduCon Network",
    category: "CONFERENCES",
    date: "24-11-2026",
    venue: "University Auditorium",
    location: "Kanpur, Uttar Pradesh",
    priority: "NORMAL",
    equipmentSummary: "3 Cameras · LED Wall · Audio Kit · Multi-Cam Record",
    equipmentBreakdown: {
      cameras: "3x Broadcast Cinema Cameras covering Podiums & Audience",
      lighting: "Theatrical Stage Warm Key & Backlight Rigs",
      audio: "Acoustic Feedback Suppressed Boundary & Gooseneck Mics",
      ledWall: "Stage Center High-Contrast Presentation Display",
      stage: "Auditorium Traditional Stage Extension"
    },
    crewLeads: [
      { name: "Neha Bhatia", role: "Production Supervisor" },
      { name: "Imran Hussain", role: "Technical Director" },
      { name: "Rehan Siddiqui", role: "Media & Ingest Lead" },
      { name: "Aditya Rao", role: "Sound Assistant" },
      { name: "Riya Chawla", role: "Production Assistant" }
    ],
    operationalChecklist: [
      "Auditorium acoustic resonance and reverberation test",
      "Keynote presentation resolution and aspect check",
      "Chancellor and dignitary lapel mic soundchecks",
      "Continuous archive recording to dual NVMe drives",
      "Kanpur home-base dispatch & logistics verification"
    ],
    timeWindow: "08:00 – 18:00 IST",
    summary: "Flagship educational convocation at home base in Kanpur. Flawless acoustic reproduction across a historic 1,500-seat amphitheater hall.",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1600&q=80",
    imageAlt: "University amphitheater hall with stage and lighting"
  }
];

export const allProductionCategories = [
  "ALL",
  "LIVE MUSIC",
  "FASHION",
  "WEDDINGS",
  "CORPORATE",
  "COMMERCIAL",
  "CONFERENCES"
];
