export interface WorkflowStep {
  step: string;
  phase: string;
  title: string;
  category: string;
  description: string;
  checklist: string[];
  deliverable: string;
}

export const workflowSteps: WorkflowStep[] = [
  {
    step: "01",
    phase: "DISCOVERY & SPEC",
    title: "BRIEF & TECHNICAL SCOPE",
    category: "FOUNDATION",
    description: "Every production begins with exact technical parameters. We analyze rider specifications, artist acoustic requirements, venue architecture, and audience line-of-sight.",
    checklist: [
      "Review artist & client technical riders",
      "Analyze venue structural limits & access points",
      "Determine target decibel (SPL) and lux thresholds"
    ],
    deliverable: "Preliminary Technical Scope Document"
  },
  {
    step: "02",
    phase: "ENGINEERING",
    title: "PLANNING & SCHEMATICS",
    category: "ENGINEERING",
    description: "CAD blueprints, acoustic room simulations, 3D lighting visualization, and 3-phase electrical load balancing to ensure zero surprises on site.",
    checklist: [
      "AutoCAD stage & truss rigging schematics",
      "EASE / ArrayCalc acoustic room modeling",
      "3-Phase power load calculation & cable loom mapping",
      "Wireless RF frequency coordination scans"
    ],
    deliverable: "Master Rigging & Electrical Schematics"
  },
  {
    step: "03",
    phase: "PERSONNEL",
    title: "CREW ALLOCATION",
    category: "PEOPLE",
    description: "Deploying certified department heads: technical directors, FOH audio engineers, lighting programmers, camera operators, and riggers chosen for the specific format.",
    checklist: [
      "Assign senior department supervisors",
      "Brief crew leads on minute-by-minute timeline",
      "Establish multi-channel digital comms channels"
    ],
    deliverable: "Crew Roster & Radio Call Assignments"
  },
  {
    step: "04",
    phase: "DISPATCH",
    title: "EQUIPMENT PREPARATION",
    category: "HARDWARE",
    description: "Inside our central tech depot in Kanpur, assets are pulled, tested, serialized, firmware-checked, and packed into shockproof road flight cases.",
    checklist: [
      "Firmware updates & master console testing",
      "Cable continuity & RF antenna bench tests",
      "Serialized asset tracking & flight case manifesting"
    ],
    deliverable: "Manifested & Quality-Cleared Gear Load"
  },
  {
    step: "05",
    phase: "ON-SITE RIG",
    title: "VENUE SETUP & RIGGING",
    category: "RIGGING",
    description: "Load-in commences with laser-guided truss alignment, stage deck leveling, LED screen stacking, optical fiber routing, and power distribution tie-in.",
    checklist: [
      "Ground support tower & hoist motor certification",
      "LED panel planar leveling & seam alignment",
      "Clean cable runs with industrial rubber ramp protection",
      "3-Phase main voltage and ground resistance verify"
    ],
    deliverable: "Fully Erected Physical & Electrical Rig"
  },
  {
    step: "06",
    phase: "CALIBRATION",
    title: "AUDIO LINE CHECK & ACOUSTICS",
    category: "ACOUSTICS",
    description: "Rigorous signal validation. Every microphone channel, snake input, speaker line, and wireless frequency is swept, time-aligned, and phase-matched.",
    checklist: [
      "Point-to-point line check from stagebox to FOH",
      "Smaart RTA acoustic phase and delay alignment",
      "Wireless mic walk-test across entire venue footprint",
      "Feedback notch filtering and monitor mix setup"
    ],
    deliverable: "Calibrated Sound System & Clean Line Status"
  },
  {
    step: "07",
    phase: "RUN-THROUGH",
    title: "REHEARSAL & CUE PROGRAMMING",
    category: "CHOREOGRAPHY",
    description: "Lighting scenes are locked, presentation decks tested with clickers, camera operators block their movement marks, and stage managers rehearse live transitions.",
    checklist: [
      "Lighting cue-to-cue timecode synchronization",
      "Presenter slide & video playback rehearsal",
      "Director camera blocking & zoom framing passes",
      "Emergency protocol & failover drill execution"
    ],
    deliverable: "Locked Showfile & Verified Cue Sheet"
  },
  {
    step: "08",
    phase: "SHOWTIME",
    title: "LIVE EXECUTION & CALLING",
    category: "SHOWCALL",
    description: "Doors open. The control room takes command. Constant monitoring of decibel levels, electrical currents, camera feeds, and real-time show calling.",
    checklist: [
      "Active show caller directing all departments",
      "Continuous voltage and heat monitoring on distro racks",
      "Instant redundant switchover readiness",
      "Live IMAG and broadcast capture recording"
    ],
    deliverable: "Flawless Zero-Failure Event Delivery"
  },
  {
    step: "09",
    phase: "STRIKE & RECOVERY",
    title: "SYSTEMATIC WRAP & ARCHIVE",
    category: "CLOSEOUT",
    description: "Orderly de-rigging, immediate on-site data ingestion and checksum verification for client footage, and return transit to the central warehouse.",
    checklist: [
      "Structured department de-rig & cable coiling",
      "Dual-backup verified ingestion of all video/audio masters",
      "Hardware inspection for wear and maintenance logging",
      "Post-event technical debrief and client signoff"
    ],
    deliverable: "Master Media Deliverable & Completed Strike"
  }
];
