# SA PRODUCTION — Reference & Component Inventory

This inventory documents the component patterns cherry-picked from the engineering prompts, open-source component systems (Aceternity, Componentry, MotionSites, UI Guideline, Design Spells), and 3D assets, along with licensing, source status, and attribution notes.

| Source | Component | Exact behavior reused | Where adapted | License/source status | Classification | Why it was selected |
|---|---|---|---|---|---|---|
| Aceternity UI | Infinite Moving Cards (`https://ui.aceternity.com/components/infinite-moving-cards`) | Continuous horizontal movement, seamless wrapping modulo calculation, and slow auto-glide without hard loop resets | Section 02: Philosophy (`Introduction.tsx`) [RIGHT → LEFT], Section 03: Capabilities (`ServicesSection.tsx`) [LEFT → RIGHT], Section 05: Selected Productions (`SelectedProductions.tsx`) [RIGHT → LEFT], Section 07: Execution Methodology (`ProcessSection.tsx`) [LEFT → RIGHT] | MIT / Permissive | SOURCE ADAPTATION | Architectural reference for seamless infinite horizontal card flow using transform wrapping rather than DOM mutations |
| Aceternity UI | Draggable Card (`https://ui.aceternity.com/components/draggable-card`) | Pointer and touch direct manipulation, pointer capture, and physical release inertia | Sections 02, 03, 05 & 07 via `useDraggableInfiniteReel.ts` | MIT / Permissive | SOURCE ADAPTATION | Provides physical-feeling grab/drag interaction that seamlessly pauses and resumes continuous motion |
| Aceternity | Apple Cards Carousel (`https://ui.aceternity.com/components/apple-cards-carousel`) | Horizontal card proportions, responsive padding, and adjacent card peeking | Sections 02, 03, 05 & 07 card sizing & mobile adaptation | MIT / Permissive | CONCEPTUAL REFERENCE | Balanced editorial proportion between technical metadata and large architectural photography |
| Componentry | Interactive Collection / Drag Patterns (`https://componentry.dev/docs`) | Horizontal card rail orchestration, smooth velocity relaxation, touch-action: pan-y | Sections 02, 03, 05 & 07 via `useDraggableInfiniteReel.ts` | MIT / Permissive | SOURCE ADAPTATION | Coexistence of horizontal reel dragging with vertical window scrolling on touch devices |
| Aceternity | Card Spotlight (`https://ui.aceternity.com/components/card-spotlight`) | Pointer radial spotlight following cursor over card surface | Section 03: Capabilities, Section 05: Selected Productions, Process, Tech, Contact | MIT / Permissive | DIRECT COMPONENT | Preserved existing glossy card surface interaction with restrained violet radial lighting |
| Aceternity | Glare Card (`https://ui.aceternity.com/components/glare-card`) | Tilt/hover surface glare sweep across photography | Section 05: Selected Productions media frames | MIT / Permissive | DIRECT COMPONENT | Preserved existing glossy photographic material sheen |
| Aceternity | Magnetic Button | Cursor spring displacement | CTA buttons (Hero, Nav, Contact) | MIT / Permissive | DIRECT COMPONENT | 5–8px cursor attraction on action elements |
| Aceternity | Dynamic Island & Navbar Pill | Floating centered pill, sliding highlight, mobile morph | Navbar | MIT / Permissive | SOURCE ADAPTATION | Liquid glass floating island with active section spy |
| Componentry | Ripple Transition | Wave displacement & refraction | Hero Typography Transformation | MIT / Permissive | SOURCE ADAPTATION | SVG feTurbulence + feDisplacementMap + traveling wavefront sheen |
| Componentry | Text Morph | Character blend & typographic continuity | Hero Quote → SA PRODUCTION | MIT / Permissive | SOURCE ADAPTATION | Scroll-driven GSAP Scrub with typographic continuity |
| GSAP | Animation Engine & Ticker | Frame ticker synchronization, delta timing, velocity damping | Section 03 & Section 05 reel ticker & global animations | Greensock Standard | DIRECT COMPONENT | Unified single ticker engine synchronized with Lenis without additional requestAnimationFrame loops |
| Lenis (Darkroom) | Virtual Scroll Engine | Momentum smooth scrolling synchronized with GSAP ticker | Global root document scrolling (`useLenis.ts`) | MIT / Permissive | DIRECT COMPONENT | Single unified smooth scroll instance eliminating scroll contention |
| Aceternity UI | Animated Tabs (`https://ui.aceternity.com/components/animated-tabs`) | Floating pill segmented control, sliding active state, keyboard accessibility | Section 08: Technical Capability Matrix (`TechnicalCapability.tsx`) | MIT / Permissive | SOURCE ADAPTATION | Architectural CAD layer switcher switching smoothly between the 4 engineering disciplines |
| Aceternity UI | 3D Card Effect (`https://ui.aceternity.com/components/3d-card-effect`) | Perspective hover tilt, spring-damped pointer interpolation, max ±4° restraint | Section 08: CAD Engineering Viewport (`TechnicalCapability.tsx`) | MIT / Permissive | SOURCE ADAPTATION | Architectural drafting board perspective response to cursor movement without exaggerated gimmicks |

## Design System & Material Palette
1. **Strict Three-Colour System**:
   - `--sa-black: #09090C;` (Cinematic sections & deep ink)
   - `--sa-violet: #7C6ECD;` (Restrained interaction accents, active states, spotlights)
   - `--sa-offwhite: #F4F1E8;` (Primary editorial paper canvas)
2. **Glass Hierarchy**:
   - `glass-light`: Translucent off-white glass with top gloss highlight and subtle violet hairline border (0 blur overhead).
   - `glass-light-interactive`: Translucent light glass with 12px backdrop blur for interactive document cards.
   - `glass-dark`: Smoked translucent glass for dark sections (0 blur overhead).
   - `glass-dark-interactive`: Smoked translucent glass with 14px backdrop blur for modal/form panels.
   - `glass-violet`: Active states, selected categories, primary CTAs.
   - `glass-nav`: Smoked translucent floating sheet with 16px blur.
3. **Continuous Flow & Drag Architecture (Sections 02, 03, 05 & 07)**:
   - **Rhythmic Directional Flow**:
     - **Section 02 (Physical Production Philosophy / Technical Cards)**: Off-white canvas (`#F4F1E8`), slim specification panels moving continuously from **RIGHT → LEFT** (`baseSpeed = -52px/s`, mobile `-42px/s`).
     - **Section 03 (Capabilities & Disciplines)**: Dark smoked glass surface (`#09090C`), moving continuously from **LEFT → RIGHT** (`baseSpeed = +55px/s`, mobile `+44px/s`).
     - **Section 05 (Selected Productions)**: Off-white editorial canvas (`#F4F1E8`), moving continuously from **RIGHT → LEFT** (`baseSpeed = -58px/s`, mobile `-46px/s`).
     - **Section 07 (Execution Methodology)**: Off-white canvas (`#F4F1E8`), slim 3:1 engineering workflow strips moving continuously from **LEFT → RIGHT** (`baseSpeed = +52px/s`, mobile `+42px/s`).
   - **Continuous Autonomous Flow**: The reels travel smoothly across the viewport without requiring vertical page scrolling (~48–55s per cycle).
   - **Direct Physical Manipulation**: The user can grab and drag the entire horizontal strip in either direction (left or right) using mouse or touch. Pointer events utilize `setPointerCapture` and native browser cursor states (`grab` / `grabbing`).
   - **Inertia & Smooth Settling**: Upon release, recent pointer velocity is preserved and smoothly relaxed back to the base continuous flow using exponential damping (`Math.exp(-3.5 * dt)`), avoiding jarring snaps.
   - **Infinite Mathematical Modulo Wrapping**: Tripled card sequences wrap seamlessly whenever horizontal translation passes the set stride width, with zero visible loop boundary, zero gaps, and zero DOM re-rendering.
   - **Compact Editorial Spacing**: All sections sit in natural document flow without giant pinned multi-viewport scroll spacers.
   - **Vertical Scroll Independence**: Employs `touch-action: pan-y` so touch users can scroll vertically past the section normally without getting trapped.
   - **Off-Screen Throttling**: An `IntersectionObserver` automatically suspends the GSAP ticker when the section is out of the viewport.
   - **Preserved Design Integrity**: All glossy glass materials, typography, `CardSpotlight`, tags, and data specifications are retained with 100% fidelity.
   - **Unified Shared Architecture**: All four reels leverage `useDraggableInfiniteReel.ts` for uniform mathematical precision and 60fps/120fps GPU performance.
4. **Multi-Layer CAD Rigging Inspector (Section 08)**:
   - **Compact Single-Viewport Architecture**: Replaced multiple explanatory cards and tall vertical blocks with one persistent engineering inspection viewport (~100vh–120vh), dramatically reducing total website scroll length while elevating technical perception.
   - **Unified Coordinate System**: All four disciplines (`01 RIGGING GRID`, `02 LIGHTING DMX`, `03 AUDIO SPL`, `04 POWER & RF`) inhabit the exact same isometric stage production geometry ($900 \times 580$ SVG canvas). Switching layers morphs the active engineering lens rather than swapping slides.
   - **Aceternity Animated Tabs Control**: Floating pill segmented control at top center (`glass-dark` with sliding `#7C6ECD` active state and keyboard accessibility).
   - **Aceternity 3D Card Magnetic Tilt**: Direct GPU CSS transform ref (`perspective(1200px) rotateX(±4°) rotateY(±4°)`) following cursor coordinates with spring relaxation, operating at 60fps/120fps with zero React state updates on mouse move. Tilt is gracefully disabled on touch devices.
   - **Architectural Inspection Spotlight**: Restrained cursor-following radial torch (`rgba(124, 110, 205, 0.14)`) revealing schematic details under pointer.
   - **Single-Trigger Construction Animation**: GSAP ScrollTrigger executes a single entry scale/fade animation on first scroll, avoiding continuous redrawing or global RAF loops.
   - **Section Exit Statement**: Concludes with `ENGINEERED BEFORE IT IS BUILT.` transitioning directly into the Contact section.


