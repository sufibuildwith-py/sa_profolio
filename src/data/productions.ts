export interface ProductionWorld {
  id: string
  title: string
  subtitle: string
  tagline: string
  disciplines: string[]
  description: string
  image: string
  accentColor?: string
}

export interface SelectedProduction {
  id: string
  number: string
  category: string
  location: string
  headline: string
  description: string
  tags: string[]
  image: string
  aspectRatio?: string
  specs: {
    audio: string
    lighting: string
    staging: string
    visuals: string
  }
}

export const productionWorldsData: ProductionWorld[] = [
  {
    id: 'weddings',
    title: 'WEDDINGS',
    subtitle: 'HERITAGE & GRAND CELEBRATIONS',
    tagline: 'Romantic ambience, architectural illuminations, and crystal-clear acoustic intimacy.',
    disciplines: ['ARCHITECTURAL LIGHTING', 'ACOUSTIC AUDIO', 'GRAND STAGE', 'LED BACKDROP'],
    description: 'From sacred heritage ghats to grand luxury lawns, we design warm, dignified lighting schemes and balanced sound distribution that respects the sanctity and splendour of the occasion.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'corporate',
    title: 'CORPORATE CONFERENCES',
    subtitle: 'SUMMITS & KEYNOTE ENVIRONMENTS',
    tagline: 'Seamless audio speech intelligibility, multi-screen presentations, and clean staging.',
    disciplines: ['SPEECH REINFORCEMENT', 'HD LED WALLS', 'KEYNOTE LIGHTING', 'LIVE SWITCHING'],
    description: 'Executive conferences, product launches, and annual shareholder meetings where audio dropouts or visual glitches are never an option.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'live',
    title: 'LIVE CONCERTS & FESTIVALS',
    subtitle: 'HIGH-ENERGY ARENAS & OPEN AIRS',
    tagline: 'High-SPL line array punch, synchronized beam shows, and heavy-duty ground-support.',
    disciplines: ['CONCERT LINE ARRAYS', 'BEAM & SPOT RIGS', 'GROUND-SUPPORT TRUSS', 'IMAG LIVE CAMS'],
    description: 'High-impact musical performances where sound pressure levels, bass clarity, dynamic lighting cues, and rock-solid rigging create an unforgettable live atmosphere.',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'fashion',
    title: 'FASHION & RUNWAYS',
    subtitle: 'PRECISION RUNWAY PRODUCTION',
    tagline: 'High-CRI daylight balanced illumination, custom elevated catwalks, and curated beats.',
    disciplines: ['HIGH-CRI PROFILES', 'CATWALK STAGING', 'PRECISION TIMECODE', 'DIFFUSED KEYLIGHT'],
    description: 'Elevated runway staging with studio-grade color rendering index (CRI) key lighting so fabrics and textures look true to life from every seat.',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'cultural',
    title: 'CULTURAL PRODUCTIONS',
    subtitle: 'HERITAGE CELEBRATIONS & THEATRE',
    tagline: 'Immersive soundscapes, heritage architectural wash, and stage acoustics.',
    disciplines: ['HERITAGE UPLIGHTING', 'CLASSICAL SOUND MIKING', 'CUSTOM STAGE SETS', 'BROADCAST AV'],
    description: 'Celebrating the rich cultural tapestry of Varanasi with sympathetic architectural illumination of venues, pristine microphoning for classical instruments, and respectful execution.',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
  },
  {
    id: 'exhibitions',
    title: 'EXHIBITIONS & EXPOS',
    subtitle: 'TRADE SHOWS & COMMERCIAL PAVILIONS',
    tagline: 'Overhead grid lighting, continuous power drops, and digital interactive displays.',
    disciplines: ['TRUSS GRID RIGGING', 'MODULAR POWER DROPS', 'BOOTH LIGHTING', 'DISPLAY SCREENS'],
    description: 'Complete technical infrastructure for trade expos, brand pavilions, and industrial showcases requiring structural stability and continuous power management.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
  },
]

export const selectedProductionsData: SelectedProduction[] = [
  {
    id: 'heritage-wedding-varanasi',
    number: '01',
    category: 'GRAND WEDDING PRODUCTION',
    location: 'VARANASI, UP',
    headline: 'Heritage Palace Grand Stage & Acoustic Illumination',
    description: 'Full-spectrum technical execution featuring custom floral stage decking, 360-degree architectural facade uplighting, multi-zone distributed audio for seamless speech & music, and high-density backdrop visual displays.',
    tags: ['LINE ARRAY AUDIO', 'ARCHITECTURAL WASH', 'CUSTOM STAGING', 'P3 LED WALL'],
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    specs: {
      audio: 'Time-aligned dual line-array hangs with distributed fill speakers',
      lighting: 'Warm white profiles + 48 DMX wash fixtures + atmospheric haze',
      staging: '40x24ft custom load-bearing stage deck with dual carpeted ramps',
      visuals: '24x12ft ultra-high refresh rate LED video backdrop',
    },
  },
  {
    id: 'corporate-summit-up',
    number: '02',
    category: 'NATIONAL CORPORATE SUMMIT',
    location: 'VARANASI CONVENTION CENTRE',
    headline: 'Multi-Screen Keynote & Broadcast AV Setup',
    description: 'Precision technical infrastructure for a 1,200-delegate corporate leadership conclave. Featuring dual delay audio towers, redundant power distribution, low-latency live IMAG cameras, and ultra-wide LED stage canvas.',
    tags: ['DIGITAL FOH', '4K VIDEO SWITCHING', 'SPEECH INTELLIGIBILITY', 'STAGE PROFILES'],
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    specs: {
      audio: 'Digital audio network with redundant wireless microphone systems',
      lighting: 'Flicker-free broadcast lighting optimized for 4K video recording',
      staging: 'Sleek executive keynote podium with integrated confidence monitors',
      visuals: '48ft seamless curved LED display with multi-window PIP processor',
    },
  },
  {
    id: 'live-music-festival',
    number: '03',
    category: 'ARENA LIVE CONCERT',
    location: 'REGIONAL STADIUM GROUNDS',
    headline: 'Open-Air Concert Rig & Dynamic Light Show',
    description: 'Full concert-scale production featuring heavy-duty aluminium box truss roof grid, motorized chain hoists, high-SPL line arrays with ground-stacked sub-bass, and timecoded moving beam choreographies.',
    tags: ['CONCERT SOUND', 'BEAM / SPOT RIG', 'MOTORIZED TRUSS', 'MULTI-CAM IMAG'],
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    specs: {
      audio: '24-box line array system with cardioid subwoofer arrangement',
      lighting: '64 moving head fixtures, high-output strobe arrays, low-fog generators',
      staging: 'Heavy-duty certified 60x40ft ground-support roof structure',
      visuals: 'Twin side-stage IMAG screens plus central visual backdrop',
    },
  },
  {
    id: 'luxury-fashion-show',
    number: '04',
    category: 'COUTURE FASHION SHOWCASE',
    location: 'VARANASI HERITAGE ATRIUM',
    headline: 'High-CRI Runway Catwalk & Minimalist Truss',
    description: 'Architecturally integrated fashion presentation with an 80ft glossy runway, precision-aimed daylight LED profiles for true fabric color rendering, and stealth ambient audio distribution.',
    tags: ['CATWALK STAGE', 'HIGH-CRI KEYLIGHT', 'PRECISION TIMECODE', 'STEALTH AUDIO'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    specs: {
      audio: 'Distributed column line arrays hidden within venue pillars',
      lighting: 'CRI 97+ studio profile fixtures with automated follow-spots',
      staging: 'High-gloss acrylic white catwalk with reinforced sub-structure',
      visuals: 'Vertical totem LED displays introducing designer segments',
    },
  },
  {
    id: 'cultural-heritage-theatre',
    number: '05',
    category: 'HERITAGE CELEBRATIONS & THEATRE',
    location: 'VARANASI RIVERFRONT GHATS',
    headline: 'Ghatside Architectural Uplighting & Classical Soundscape',
    description: 'Celebrating the cultural tapestry of Varanasi with sympathetic architectural illumination of sacred facades, pristine microphoning for classical instruments, and multi-zone atmospheric reinforcement.',
    tags: ['HERITAGE UPLIGHTING', 'CLASSICAL SOUND', 'RIVERFRONT RIG', 'WEATHERPROOF AV'],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80',
    specs: {
      audio: 'Ultra-low-noise acoustic microphone arrays & distributed column fills',
      lighting: 'DMX-controlled architectural floodlights + riverfront amber washes',
      staging: 'Weatherproof high-tensile modular platform on heritage stone ghats',
      visuals: 'Ultra-bright high-nit outdoor LED screen visible against water reflection',
    },
  },
]

