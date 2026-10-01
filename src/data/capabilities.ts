export interface EquipmentItem {
  id: string;
  name: string;
  category: "AUDIO" | "LIGHTING" | "CAMERA" | "LED" | "STAGE" | "CONTROL";
  spec: string;
  application: string;
  operationalStatus: string;
  tier: "FLAGSHIP" | "WORKHORSE" | "SPECIALTY";
  highlights: string[];
}

export const equipmentArchive: EquipmentItem[] = [
  // AUDIO
  {
    id: "eq-aud-01",
    name: "Professional Line Array Modular System",
    category: "AUDIO",
    spec: "Dual 10\" Neodymium LF · High-Frequency Compression Driver · 138 dB Peak SPL",
    application: "Concert Touring, Large Arenas, Outdoor Festivals, Luxury Ballrooms",
    operationalStatus: "Acoustically Calibrated · Tour-Ready",
    tier: "FLAGSHIP",
    highlights: ["Symmetrical 110° horizontal dispersion", "Integrated load-rated rigging", "Linear phase acoustic response"]
  },
  {
    id: "eq-aud-02",
    name: "Digital Mixing & Control Console",
    category: "AUDIO",
    spec: "Multi-Channel Digital I/O · 96kHz High-Resolution Native DSP Architecture",
    application: "FOH Master Mixing, Complex Live Music, Multi-Stage Matrix Routing",
    operationalStatus: "Dante / Optical Networked",
    tier: "FLAGSHIP",
    highlights: ["Multi-band dynamic EQ & bussing", "Dual redundant power supplies", "Multi-stage digital stagebox integration"]
  },
  {
    id: "eq-aud-03",
    name: "Wireless RF Microphone & IEM System",
    category: "AUDIO",
    spec: "Multi-Channel Receiver · Antenna Distribution · Spectrum Management",
    application: "Keynote Addresses, High-Density RF Venues, Live Vocalists",
    operationalStatus: "Spectrum Coordinated",
    tier: "FLAGSHIP",
    highlights: ["Active RF interference avoidance", "Ultra-low digital latency", "High-density multi-channel coordination"]
  },

  // LIGHTING
  {
    id: "eq-lt-01",
    name: "Hybrid Moving-Head Beam / Spot Fixtures",
    category: "LIGHTING",
    spec: "High-Output Discharge Engine · Motorized Linear Zoom · Full Color Mixing & Prisms",
    application: "Aerial Beams, Stage Key Lighting, Dynamic Concert Textures",
    operationalStatus: "DMX / RDM Active",
    tier: "FLAGSHIP",
    highlights: ["Parallel collimated beam profile", "Dual rotating gobo wheels", "High-speed precision pan/tilt"]
  },
  {
    id: "eq-lt-02",
    name: "High-CRI Warm LED Profile Framing Spots",
    category: "LIGHTING",
    spec: "High-Power LED Engine · CRI > 96 · 4-Blade Internal Framing Shutter System",
    application: "Fashion Runway Keylight, Wedding Ceremonial Stage, Broadcast Podiums",
    operationalStatus: "Calibrated 3200K / 5600K",
    tier: "WORKHORSE",
    highlights: ["Flicker-free high shutter speed operation", "Precise optical framing blades", "Low-noise thermal management"]
  },
  {
    id: "eq-lt-03",
    name: "DMX Lighting Control Surface",
    category: "LIGHTING",
    spec: "Multi-Universe DMX / Art-Net / sACN Output · Motorized Playback Faders",
    application: "Master Show Programming, Synchronized Timecode Cueing, Live Busking",
    operationalStatus: "Showfile Sync Ready",
    tier: "FLAGSHIP",
    highlights: ["Motorized cue fader banks", "Multi-screen visualization output", "Gigabit network synchronization"]
  },

  // CAMERA
  {
    id: "eq-cam-01",
    name: "Cinema / Event Camera Systems",
    category: "CAMERA",
    spec: "Large-Format Cinema Sensor · 15+ Stops Dynamic Range · Internal ND & 4K Recording",
    application: "Cinematic Event Coverage, Commercial Productions, Live Multi-Cam Capture",
    operationalStatus: "Rigged & Checked",
    tier: "FLAGSHIP",
    highlights: ["Dual base sensitivity for low-light", "High-speed framerate capture", "10-bit broadcast color fidelity"]
  },
  {
    id: "eq-cam-02",
    name: "Zero-Latency Wireless Video Transmitters",
    category: "CAMERA",
    spec: "Ultra-Low Latency Transmission (<0.001s) · 4K HDR Signal · Long-Range Line-of-Sight",
    application: "Steadicam & Gimbals, Handheld Mobile Operators, Director Monitors",
    operationalStatus: "Paired & Frequency Clean",
    tier: "WORKHORSE",
    highlights: ["Uncompressed wireless video stream", "Robust RF hopping", "Director client monitor feed"]
  },
  {
    id: "eq-cam-03",
    name: "Live Multi-Camera Vision Switcher",
    category: "CAMERA",
    spec: "Multi-Input SDI / HDMI Architecture · Multi-Viewer · Low-Latency Processing",
    application: "Live IMAG Video Switching, Broadcast Record, Multi-Screen Feeds",
    operationalStatus: "Redundant PSU Active",
    tier: "FLAGSHIP",
    highlights: ["Frame synchronizers on all inputs", "Downstream keyers and DVEs", "Integrated comms talkback"]
  },

  // LED
  {
    id: "eq-led-01",
    name: "Ultra-Fine Pitch P2.6 LED Display Screen",
    category: "LED",
    spec: "P2.6mm Pixel Pitch · High Refresh Rate (7,680Hz) · Deep Black Contrast Mask",
    application: "Corporate Keynotes, Indoor Luxury Galas, High-Resolution Video Backdrops",
    operationalStatus: "Seamless Flat / Curved",
    tier: "FLAGSHIP",
    highlights: ["Ultra-black SMD LED packaging", "High shutter speed broadcast safe", "Modular magnetic maintenance"]
  },
  {
    id: "eq-led-02",
    name: "Weather-Sealed P3.9 Outdoor LED Panels",
    category: "LED",
    spec: "P3.9mm Pixel Pitch · IP65 Weather-Sealed · High-Brightness Sunlight Visible",
    application: "Concert Stage Backwalls, Outdoor Day Festivals, Sports & Arena Events",
    operationalStatus: "Weather Certified",
    tier: "WORKHORSE",
    highlights: ["Direct sunlight readability", "Structural wind-lock rigging", "Rapid assembly locking system"]
  },
  {
    id: "eq-led-03",
    name: "4K Video Splicing & Mapping Processor",
    category: "LED",
    spec: "Multi-Layer 4K Video Input/Output · Low-Latency Processing · Hardware Scaling",
    application: "Ultra-Wide Stage Mapping, Multi-Screen Presentation, IMAG Layering",
    operationalStatus: "Fiber Linked",
    tier: "FLAGSHIP",
    highlights: ["Zero frame drop scaling", "Multi-window live PIP layering", "Hardware edge-blending & color calibration"]
  },

  // STAGE & RIGGING
  {
    id: "eq-stg-01",
    name: "Heavy-Duty Aluminum Box Truss Grid",
    category: "STAGE",
    spec: "Engineered High-Grade Aluminum Alloy · 50mm Main Chords · Certified Load Rating",
    application: "Main Stage Roof Grids, Audio Array Hangs, Overhead Lighting Trusses",
    operationalStatus: "Certified Load Tested",
    tier: "FLAGSHIP",
    highlights: ["High bending moment tolerance", "Precision conical connection", "Structural load certification"]
  },
  {
    id: "eq-stg-02",
    name: "Electric Chain Hoist Motors & Rigging",
    category: "STAGE",
    spec: "1-Ton Safe Working Load · Dual Brake System · Load-Rated Safety Factor",
    application: "Overhead Truss Lifting, Safe Rigging Over Performers and Production Floor",
    operationalStatus: "Load Certified",
    tier: "FLAGSHIP",
    highlights: ["Direct low-voltage control", "Overload clutch safety protection", "High-tensile zinc-plated chain"]
  },

  // CONTROL & POWER
  {
    id: "eq-pwr-01",
    name: "3-Phase Stage Power Distribution Panels",
    category: "CONTROL",
    spec: "3-Phase Input Distribution · Individual MCB/RCD Protection · Digital Voltage & Current Monitoring",
    application: "Master Stage Power Distribution, Audio/Lighting Power Isolation",
    operationalStatus: "Inspected & Ground Verified",
    tier: "WORKHORSE",
    highlights: ["Dedicated isolated audio ground circuit", "Phase load balance monitoring", "Rugged shock-mounted flight casing"]
  },
  {
    id: "eq-pwr-02",
    name: "Gigabit Stage Network Backbone Switch",
    category: "CONTROL",
    spec: "Redundant Gigabit Ethernet · Rugged Locking Connectors · Low-Jitter Clocking",
    application: "Integrated Digital Backbone for Stage Audio, Lighting DMX, and Control Networks",
    operationalStatus: "Redundant Network Ready",
    tier: "FLAGSHIP",
    highlights: ["Precision timing for audio over IP", "Failover redundancy protocol", "Tour-grade rugged construction"]
  }
];

export const equipmentCategories = [
  "ALL",
  "AUDIO",
  "LIGHTING",
  "CAMERA",
  "LED",
  "STAGE",
  "CONTROL"
] as const;
