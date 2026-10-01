# SA PRODUCTION — Reference & Component Inventory

This inventory documents the component patterns cherry-picked from the engineering prompts, open-source component systems (Aceternity, Componentry, MotionSites, UI Guideline, Design Spells), and 3D assets, along with licensing and attribution notes.

| Source | Component | Exact behavior | SA destination | Adaptation | License | Performance risk |
|---|---|---|---|---|---|---|
| Aceternity | Card Spotlight | pointer spotlight | Selected Live / Process / Tech / Contact | violet glass radial light | MIT / Permissive | low |
| Aceternity | Glare Card | hover glare | Selected Live imagery | restrained light sweep (4-8px) | MIT / Permissive | low |
| Aceternity | Magnetic Button | cursor spring | CTA buttons (Hero, Nav, Contact) | 5–8px displacement | MIT / Permissive | low |
| Aceternity | Floating Navbar | hide/reveal | Navbar | glass-nav translucent sheet | MIT / Permissive | low |
| Componentry | Ripple Transition | wave displacement & refraction | Hero Typography Transformation | SVG feTurbulence + feDisplacementMap + traveling wavefront sheen (zero extra WebGL overhead) | MIT / Permissive | low |
| Componentry | Text Morph | character blend & alignment | Hero Quote → SA PRODUCTION | scroll-driven GSAP Scrub with typographic continuity | MIT / Permissive | low |
| Componentry | Scroll Choreography | scroll-linked staging | Hero Pinned Sequence | single GSAP pinned scrub timeline | MIT / Permissive | low |
| Componentry | Magnetic Dock | magnetic glass | Contact utility & controls | reduced scale minimal pill | MIT / Permissive | medium |
| Componentry | Layered Stack | layered cards | Selected Live | glass photographic sheets | MIT / Permissive | medium |
| Motion | Scroll APIs | scroll-linked values | existing motion orchestration | mapped via GSAP ScrollTrigger | MIT / Permissive | low |
| MotionSites | Liquid Glass | glass material | global material system | 3-colour palette (#09090C, #7C6ECD, #F4F1E8) | Reference Pattern | medium |
| UI Guideline | component anatomy | compositional patterns | global UI primitives | surface, border, highlight, content | Reference Architecture | low |
| Design Spells | microinteraction | tactile detail | buttons/links/interactive states | subtle scale & spring response | Reference Pattern | low |
| Sketchfab / AleixoAlonso | Canon AT-1 Camera | 3D retro camera model | Global Floating Camera Experience | centered origin, normalized scale | CC-BY-4.0 | low |
| GSAP & ScrollTrigger | Animation engine | timeline choreography & scrubbing | entire page scroll journey & Hero pin | unified single scroll timeline | Greensock Standard | low |
| Lenis (Darkroom) | Smooth scrolling | momentum virtual scrolling | root document scrolling | synced to GSAP ticker | MIT | low |
| Three.js | WebGL renderer | 3D scene rendering | GlobalCameraExperience | single canvas, single renderer, capped DPR | MIT | low |

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
3. **Performance Safeguards**:
   - Single Three.js canvas & WebGL renderer on entire application.
   - Single Lenis instance synced to GSAP ticker.
   - No continuous per-frame React state triggers.
   - Strategic backdrop-filter usage avoiding GPU overdraw.
