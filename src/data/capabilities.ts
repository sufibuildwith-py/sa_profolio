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
    name: "Precision Line Array Modular System",
    category: "AUDIO",
    spec: "Dual 10\" Neodymium LF · 1.4\" Compression Driver · 138 dB Peak SPL",
    application: "Concert Touring, Large Arenas, Outdoor Festivals, Luxury Ballrooms",
    operationalStatus: "Calibrated · Tour-Ready",
    tier: "FLAGSHIP",
    highlights: ["Symmetrical 110° horizontal dispersion", "Integrated rigging hardware", "Linear phase response"]
  },
  {
    id: "eq-aud-02",
    name: "DiGiCo Quantum Digital Audio Console",
    category: "AUDIO",
    spec: "128 Input Channels · 64 Aux/Sub-Group Busses · 96kHz Native Processing",
    application: "FOH Master Mixing, Complex Live Music, Multi-Stage Routing",
    operationalStatus: "Optocore Networked",
    tier: "FLAGSHIP",
    highlights: ["Mustard processing & dynamic EQ", "Dual power supplies", "Redundant engine support"]
  },
  {
    id: "eq-aud-03",
    name: "Shure Axient Digital Wireless System",
    category: "AUDIO",
    spec: "Quad Receiver · Quadversity Antenna Diversity · Frequency Diversity",
    application: "VIP Keynotes, High-Density RF Environments, Festival Vocals",
    operationalStatus: "Spectrum Coordinated",
    tier: "FLAGSHIP",
    highlights: ["Interference detection & avoidance", "2ms ultra-low latency", "Encrypted transmission"]
  },

  // LIGHTING
  {
    id: "eq-lt-01",
    name: "Hybrid Moving Spot / Beam 470W Fixtures",
    category: "LIGHTING",
    spec: "470W Discharge Lamp · 2°–44° Linear Zoom · CMY Color Mixing + CTO",
    application: "Aerial Beams, Stage Key Lighting, Dynamic Concert Textures",
    operationalStatus: "DMX / RDM Active",
    tier: "FLAGSHIP",
    highlights: ["Razor-sharp parallel beam", "Dual rotating gobo wheels", "High-speed pan/tilt"]
  },
  {
    id: "eq-lt-02",
    name: "High-CRI Warm LED Profile Framing Spots",
    category: "LIGHTING",
    spec: "600W White LED Engine · CRI > 96 · 4-Blade Framing Shutter System",
    application: "Fashion Runway Keylight, Wedding Mandap Portraits, Broadcast Lecterns",
    operationalStatus: "Calibrated 3200K / 5600K",
    tier: "WORKHORSE",
    highlights: ["Flicker-free up to 25,000Hz", "Precise geometric framing", "Ultra-quiet whisper fan mode"]
  },
  {
    id: "eq-lt-03",
    name: "GrandMA3 Full-Size Lighting Control Console",
    category: "LIGHTING",
    spec: "20,480 Parameters Native · 8 DMX Outputs · 3 Internal Multi-Touch Screens",
    application: "Master Show Programming, Synchronized Timecode Shows, Festival Control",
    operationalStatus: "Showfile Sync Ready",
    tier: "FLAGSHIP",
    highlights: ["Motorized playback faders", "Built-in visualizer preview", "MA-Net3 gigabit backbone"]
  },

  // CAMERA
  {
    id: "eq-cam-01",
    name: "Sony FX9 Full-Frame 6K Cinema Package",
    category: "CAMERA",
    spec: "6K Full-Frame Exmor R Sensor · 15+ Stops Dynamic Range · Electronic Variable ND",
    application: "Cinematic Event Coverage, High-End Commercials, Live Multi-Cam",
    operationalStatus: "Rigged & Checked",
    tier: "FLAGSHIP",
    highlights: ["Dual base ISO 800/4000", "Fast hybrid autofocus", "10-bit 4:2:2 DCI 4K internal"]
  },
  {
    id: "eq-cam-02",
    name: "Teradek Bolt 4K MAX Wireless Video System",
    category: "CAMERA",
    spec: "Zero-Delay (<0.001 sec) · 4K HDR 10-bit Transmission · Up to 5,000 ft Range",
    application: "Steadicam, Mobile Handheld Shooters, VIP Monitor Feeds",
    operationalStatus: "Paired & Frequency-Clean",
    tier: "WORKHORSE",
    highlights: ["Zero perceptible latency", "AES-256 encryption", "Robust line-of-sight tracking"]
  },
  {
    id: "eq-cam-03",
    name: "Blackmagic ATEM Constellation 8K Live Switcher",
    category: "CAMERA",
    spec: "40x 12G-SDI Inputs · 24x Aux Outputs · 4 DVEs · Fairlight Audio Mixing",
    application: "Large PPU Multi-Cam Vision Mixing, IMAG Feeds, Live Broadcasting",
    operationalStatus: "Redundant PSU Active",
    tier: "FLAGSHIP",
    highlights: ["Standards converter on all inputs", "Multi-viewer outputs", "Integrated talkback comms"]
  },

  // LED
  {
    id: "eq-led-01",
    name: "Ultra-Fine Pitch P2.6mm High-Contrast LED Screen",
    category: "LED",
    spec: "P2.6mm Pitch · 7,680Hz Refresh Rate · 16-Bit Grayscale · 1,200 Nits",
    application: "Corporate Keynotes, Indoor Luxury Galas, High-Resolution Video Backdrops",
    operationalStatus: "Seamless Flat / Curved",
    tier: "FLAGSHIP",
    highlights: ["Deep black SMD packaging", "High shutter-speed camera safe", "Magnetic module service"]
  },
  {
    id: "eq-led-02",
    name: "Outdoor High-Brightness P3.9mm LED Panels",
    category: "LED",
    spec: "P3.9mm Pitch · IP65 Weather-Sealed · 5,500 Nits Sunlight Visible",
    application: "Concert Stage Backwalls, Outdoor Day Festivals, Sports Arenas",
    operationalStatus: "Weather Certified",
    tier: "WORKHORSE",
    highlights: ["Direct sunlight readability", "Wind-rated structural locking", "Fast toolless rigging"]
  },
  {
    id: "eq-led-03",
    name: "NovaStar H9 Flagship Video Splicer & Processor",
    category: "LED",
    spec: "Modular Slot Architecture · 16x 4K Inputs · True 4K 60Hz 4:4:4 Processing",
    application: "Multi-Screen Presentation Mapping, Ultra-Wide Video Canvas Routing",
    operationalStatus: "Fiber Linked",
    tier: "FLAGSHIP",
    highlights: ["Zero frame drop", "Smooth multi-window layering", "Hardware edge-blending"]
  },

  // STAGE & RIGGING
  {
    id: "eq-stg-01",
    name: "Eurotruss 400mm Heavy-Duty Box Truss",
    category: "STAGE",
    spec: "EN AW 6082 T6 Alloy · 50x4mm Main Chords · 25x3mm Diagonals · TUV Certified",
    application: "Main Roof Grids, Audio Array Hangs, Heavy Lighting Trusses",
    operationalStatus: "Certified Load Tested",
    tier: "FLAGSHIP",
    highlights: ["Fast conical coupling", "High bending moment tolerance", "Anti-corrosion anodized"]
  },
  {
    id: "eq-stg-02",
    name: "CM Lodestar D8+ Electric Chain Hoist Motors",
    category: "STAGE",
    spec: "1-Ton Capacity · Double Brake System · 8:1 Safety Factor · 4m/min Speed",
    application: "Overhead Truss Lifting, Safe Rigging Over Performers and Crowds",
    operationalStatus: "Annual Load Certified",
    tier: "FLAGSHIP",
    highlights: ["Direct control low-voltage", "Overload clutch protection", "Heavy grade zinc-plated chain"]
  },

  // CONTROL & POWER
  {
    id: "eq-pwr-01",
    name: "3-Phase 125A Camlock Power Distro Racks",
    category: "CONTROL",
    spec: "125A 3-Phase Input · Individual RCD/MCB Breakers · Digital Voltage & Current Metering",
    application: "Master Stage Power Distribution, Audio/Lighting Power Isolation",
    operationalStatus: "Inspected & Ground Verified",
    tier: "WORKHORSE",
    highlights: ["Isolated audio ground circuitry", "Phase imbalance warning alerts", "Rugged shock-mount rack"]
  },
  {
    id: "eq-pwr-02",
    name: "Luminex GigaCore Dante & Art-Net Network Switch",
    category: "CONTROL",
    spec: "Gigabit Ethernet · Rugged Neutrik EtherCON & OpticalCON Ports · Zero-Config Groups",
    application: "Consolidated Digital Backbone for Stage Audio, Lighting, and Video Feeds",
    operationalStatus: "Redundant Fiber Ring",
    tier: "FLAGSHIP",
    highlights: ["PTP clock precision for Dante", "Redundant fiber fallback", "Tour-grade shock casing"]
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
