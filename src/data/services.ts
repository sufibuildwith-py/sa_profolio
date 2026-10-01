export interface ServiceItem {
  id: string
  number: string
  title: string
  tagline: string
  description: string
  capabilities: string[]
  subsystems: string[]
}

export const servicesData: ServiceItem[] = [
  {
    id: 'sound',
    number: '01',
    title: 'SOUND REINFORCEMENT',
    tagline: 'Acoustic power and precision coverage',
    description:
      'Professional audio systems, line arrays, stage monitoring, and digital mixing engineered specifically for the acoustic geometry of indoor ballrooms, open-air lawns, and stadium grounds.',
    capabilities: [
      'Line Array Speaker Systems & Subwoofers',
      'Digital FOH & Monitor Mixing Consoles',
      'Wireless Microphone & In-Ear Monitoring Racks',
      'Multi-Zone Time-Aligned Audio Distribution',
      'Acoustic Calibration & Real-Time Frequency Analysis',
    ],
    subsystems: ['Line Array', 'FOH Console', 'RF Wireless', 'Stage Monitors', 'Sub-Bass Arrays'],
  },
  {
    id: 'lighting',
    number: '02',
    title: 'INTELLIGENT LIGHTING',
    tagline: 'Atmospheric design and dynamic show cues',
    description:
      'Architectural, stage, and show lighting designed to evoke mood, enhance physical presence, and deliver breathtaking live cue synchronization for ceremonies, keynotes, and live performances.',
    capabilities: [
      'Moving Heads (Beam, Spot, Wash, Hybrid)',
      'Warm White LED Profiles & Stage Key Lights',
      'Architectural Wash & Uplighting for Heritage & Lawns',
      'DMX Programming & Grand Console Control',
      'Haze, Low-Fog & Atmospheric Special Effects',
    ],
    subsystems: ['Moving Beams', 'Warm Keylight', 'DMX Control', 'Architectural Wash', 'Haze FX'],
  },
  {
    id: 'stage',
    number: '03',
    title: 'STAGE & TRUSS RIGGING',
    tagline: 'Engineered structural integrity and spatial presence',
    description:
      'Heavy-duty aluminium trussing, goalpost structures, ground-support box grids, and modular staging constructed to exacting load ratings and architectural aesthetics.',
    capabilities: [
      'Engineered Box Truss & Circular Rigging Grids',
      'Certified Chain Hoists & Motorized Rigging Points',
      'Custom Multi-Tier Stage Decks & Ramps',
      'Structural Load & Wind-Resistance Safety Calculations',
      'Seamless Stage Skirting & Premium Carpeting',
    ],
    subsystems: ['Aluminium Box Truss', 'Chain Hoists', 'Modular Decks', 'Ground Support', 'Rigging Safety'],
  },
  {
    id: 'led',
    number: '04',
    title: 'LED & VISUAL DISPLAY',
    tagline: 'High-density display systems and stage backdrops',
    description:
      'Ultra-crisp modular LED video walls, curved display configurations, and low-latency video switching providing immersive backdrops and high-impact visual canvases.',
    capabilities: [
      'High-Refresh-Rate Indoor & Outdoor LED Panels',
      'Seamless Curved & Multi-Screen Stage Configurations',
      'Ultra-Low-Latency 4K Video Processors & Scalers',
      'Live Media Playback & Motion Graphics Server Feeds',
      'Daylight-Visible High-Nit Outdoor Screens',
    ],
    subsystems: ['Modular LED Tiles', '4K Video Processors', 'Curved Display Rigs', 'Media Servers', 'Switchers'],
  },
  {
    id: 'camera',
    number: '05',
    title: 'CAMERA & VISUAL PRODUCTION',
    tagline: 'Live event IMAG and broadcast-grade coverage',
    description:
      'Multi-camera setups, jib cranes, and live visual switching to broadcast dynamic stage action onto large-format displays with zero noticeable delay.',
    capabilities: [
      'Multi-Camera HD/4K Production Chains',
      'Motorized Jib Cranes & Gimbal Operators',
      'Live IMAG (Image Magnification) Switching',
      'Stage Viewfinders & Teleprompter Systems',
      'Direct Multi-Track Recording & Feeds',
    ],
    subsystems: ['Broadcast Cameras', 'Jib Crane', 'Vision Switcher', 'Low Latency IMAG', 'Recording Racks'],
  },
  {
    id: 'complete',
    number: '06',
    title: 'COMPLETE PRODUCTION DIRECTION',
    tagline: 'Unified technical coordination and live show execution',
    description:
      'Turnkey management across sound, light, stage, visual, power distribution, and crew coordination so that every technical element runs in complete harmony.',
    capabilities: [
      'Single-Point Technical Director & Show Callers',
      'Three-Phase Redundant Generator & Power Distribution',
      'Intercom Comms Racks for Backstage & Crew',
      'On-Site Sound & Lighting Technicians',
      'Pre-Event Rehearsal & Timeline Management',
    ],
    subsystems: ['Technical Direction', 'Power Distribution', 'Intercom Comms', 'Safety Ops', 'Live Show Calling'],
  },
]
