export interface ProcessStep {
  step: string
  title: string
  stageName: string
  action: string
  details: string[]
  deliverable: string
}

export const processWorkflow: ProcessStep[] = [
  {
    step: '01',
    title: 'BRIEF & SPATIAL SURVEY',
    stageName: 'DISCOVERY',
    action: 'We inspect the venue physical dimensions, power distribution access, ceiling rigging load points, and acoustic resonance.',
    details: [
      'Laser measurement of room geometry and throw distances',
      'Power panel audit (three-phase availability, voltage stability)',
      'Acoustic reverberation and boundary reflection assessment',
      'Ingress/egress logistics and staging access paths',
    ],
    deliverable: 'Technical Site Report & Spatial Footprint Blueprint',
  },
  {
    step: '02',
    title: 'ENGINEERING & SIMULATION',
    stageName: 'PLANNING',
    action: 'We draft CAD rigging plots, calculate acoustic coverage maps, and design lighting fixture matrices before touching a single flight case.',
    details: [
      '3D Truss & Staging structural load calculations',
      'Direct-to-reverberant audio SPL prediction simulations',
      'DMX universe allocation and lighting cue storyboard',
      'LED raster resolution and pixel-pitch mapping',
    ],
    deliverable: 'Comprehensive Rigging & Circuit Plot Schematics',
  },
  {
    step: '03',
    title: 'PRE-PREP & BENCH TESTING',
    stageName: 'PREPARATION',
    action: 'Every cable loom, amplifier rack, wireless RF channel, and moving head is bench-tested in our workshop prior to dispatch.',
    details: [
      'Wireless RF spectrum scan to prevent local interference',
      'Firmware verification across digital mixing and video switchers',
      'Clean loom preparation and labeled patch panels',
      'Safety harness, cable jacket, and safety bond inspections',
    ],
    deliverable: 'Pre-Flight Verified Equipment Manifest',
  },
  {
    step: '04',
    title: 'RIGGING & INSTALLATION',
    stageName: 'ON-SITE RIG',
    action: 'Our trained crew executes the physical build with disciplined safety protocols, certified hoists, and clean cable management.',
    details: [
      'Heavy truss ground-support assembly and vertical hoist',
      'Line-array speaker array suspension with calibrated tilt angles',
      'Seamless LED tile framing and structural backing',
      'Redundant three-phase power distribution cabling',
    ],
    deliverable: 'Fully Constructed Physical Production Rig',
  },
  {
    step: '05',
    title: 'SYSTEM INTEGRATION & REHEARSAL',
    stageName: 'CALIBRATION',
    action: 'We time-align the sound system, balance white-point lighting on stage, and run technical rehearsals with performers and presenters.',
    details: [
      'RTA pink noise measurement and multi-zone time alignment',
      'Color temperature matching between cameras and stage spots',
      'Full dry-run of live video switching and slide triggers',
      'Intercom comms check with show director and stage managers',
    ],
    deliverable: 'Calibrated Systems & Rehearsal Sign-off',
  },
  {
    step: '06',
    title: 'LIVE SHOW EXECUTION',
    stageName: 'SHOWTIME',
    action: 'Our dedicated engineers manage FOH mixing, lighting desks, video playback, and power monitors with calm precision throughout the event.',
    details: [
      'Live dynamic audio mixing and feedback suppression',
      'Real-time lighting cue triggers mapped to event tempo',
      'Continuous thermal and voltage monitoring on power racks',
      'Instant failover redundancy for critical signal paths',
    ],
    deliverable: 'Flawless Live Event Experience',
  },
  {
    step: '07',
    title: 'SAFE DE-RIG & WRAP',
    stageName: 'LOAD-OUT',
    action: 'Orderly disassembly, structural de-rigging, venue cleaning, and equipment pack-down respecting venue handover schedules.',
    details: [
      'Systematic de-hoisting of flown trusses and arrays',
      'Floor protection removal and venue surface inspection',
      'Final inventory tally and flight-case pack-down',
      'Post-show technical debrief and archive backup',
    ],
    deliverable: 'Clean Handover & Complete Post-Event Archival',
  },
]
