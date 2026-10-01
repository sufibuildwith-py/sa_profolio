# SA PRODUCTION — Premium Cinematic Portfolio

A dark luxury cinematic portfolio website built from scratch for **SA Production**, an Indian event and production house based in Varanasi, Uttar Pradesh, with pan-India mobilization.

Designed to communicate scale, technical discipline, hardware custody, and flawless live execution.

---

## Technical Stack

- **Framework**: React 19 + TypeScript + Vite 8
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **Motion & Choreography**: GSAP 3.15 + ScrollTrigger
- **Smooth Scroll**: Lenis 1.3 (synchronized with GSAP ticker loop)
- **3D & WebGL**: Three.js (procedural stage spotlight & box truss assembly)
- **Icons**: Lucide React
- **Typography**: Syne, Inter Tight, Instrument Serif, JetBrains Mono

---

## Architectural Highlights

1. **Cinematic Preloader**
   - Minimalist black screen with precision percentage counter (07% → 43% → 81% → 100%) and expanding line reveal.
2. **Hero Environment with Procedural 3D Stage Fixture**
   - Procedural Three.js moving head spotlight and aluminum box truss with optical lens and volumetric light cone.
   - Mouse-reactive rotation and scroll-driven camera dolly.
   - Word-level pull-up typography animation with negative tracking and mixed display serif accents.
   - GSAP ScrollTrigger transition where hero typography parts and camera pushes into the narrative.
3. **Intro Editorial Statement**
   - "WE DON'T JUST SHOW UP. WE SET THE WHOLE THING IN MOTION."
   - Scroll-scrubbed character and word opacity progressive reveal.
4. **Production Worlds (8 Disciplines)**
   - Luxury Weddings, Corporate Summits, Live Music, Conferences, Fashion Runways, Trade Expos, Cultural Events, Commercial Production.
   - Immersive viewport transitions with typical deployment rigs, hardware manifests, and acoustic parameters.
5. **Services Section with Editorial Micro-Interactions**
   - 01 Professional Sound (interactive RTA 96kHz frequency spectrum)
   - 02 Lighting Design (moving DMX beams and stage focus)
   - 03 Stage & Truss (certified 400mm alloy box truss vectors)
   - 04 LED & Visuals (7680Hz pixel grid mapping)
   - 05 Camera & Live Coverage (4K 10-bit viewfinder with REC indicator)
   - 06 Complete Event Production (synchronized show control clock & comms)
6. **Execution System Timeline**
   - 9-stage verified production protocol with vertical glowing tracing beam synced to scroll progress.
7. **The Toolkit — Central Depot Archive**
   - Hardware inspection console with real serial specs for audio line arrays, DiGiCo consoles, Shure Axient RF, Robe moving heads, Sony cinema packages, and Camlock distros.
8. **Selected Productions Case Studies**
   - Stacking card choreography with category filtering.
   - Full-screen case study lightbox detailing hardware manifests, operational checklists, and on-site crew supervision rosters.
9. **Kinetic Production Marquee**
   - Dual-row opposing speed marquee visual punctuation synced to scroll velocity.
10. **Operational Scale & Numbers**
    - Grounded in real data: 50 Production Scenarios, 8 Categories, 14+ City Dispatch Hubs, 1 Connected System.
11. **Central Dispatch Desk Modal & CTA**
    - Direct inquiry sheet collecting technical parameters, venue specifications, and WhatsApp direct routing.

---

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## Content Customization

All public contact information, warehouse addresses, coordinates, and social handles are centralized in:
`src/data/siteConfig.ts`
