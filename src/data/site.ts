export interface NavItem {
  label: string
  href: string
}

export interface SiteConfig {
  name: string
  shortName: string
  location: string
  region: string
  country: string
  tagline: string
  descriptor: string
  heroStatement: string
  heroSub: string
  aboutEditorial: string
  aboutSub: string
  contact: {
    locationLabel: string
    addressLine: string
    email: string
    phone: string
    phoneDisplay: string
    whatsappUrl: string
  }
  navigation: NavItem[]
}

export const siteConfig: SiteConfig = {
  name: 'SA PRODUCTION',
  shortName: 'SA',
  location: 'Varanasi',
  region: 'Uttar Pradesh',
  country: 'India',
  tagline: 'Physical Event & Technical Production',
  descriptor: 'We engineer and execute the physical experience of an event.',
  heroStatement: 'WE BRING LIFE TO EVERY EVENT.',
  heroSub: 'Complete technical event execution across concert sound, intelligent lighting, structural staging, large-format LED displays, and on-site production management.',
  aboutEditorial: 'Events are remembered by how they felt — the clarity of the sound, the atmosphere of the light, the scale of the stage.',
  aboutSub: 'SA Production is a dedicated technical production partner based in Varanasi. We turn event concepts into physical, reliable, and sensory reality with disciplined engineering and on-site execution.',
  contact: {
    locationLabel: 'Varanasi, Uttar Pradesh, India',
    addressLine: 'Varanasi, UP, India',
    email: 'contact@saproduction.in',
    phone: '+919876543210',
    phoneDisplay: '+91 (0) Varanasi Production Desk',
    whatsappUrl: 'https://wa.me/919876543210?text=Hello%20SA%20Production,%20I%20would%20like%20to%20discuss%20an%20event%20production%20requirement.',
  },
  navigation: [
    { label: 'Work', href: '#productions' },
    { label: 'Capabilities', href: '#services' },
    { label: 'Worlds', href: '#worlds' },
    { label: 'Engineering', href: '#technical' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
  ],
}
