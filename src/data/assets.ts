export interface AssetMetadata {
  name: string
  source: string
  license: string
  attribution: string
  localPath: string
  usage: string
}

export const assetsCatalog: AssetMetadata[] = [
  {
    name: 'Hero Production Video',
    source: 'Local SA Production Repository Asset',
    license: 'Proprietary / SA Production Authorized',
    attribution: 'SA Production Varanasi',
    localPath: '/herovid.mp4',
    usage: 'Cinematic hero background and interactive scrub video',
  },
  {
    name: 'Hero Video Poster Still',
    source: 'Local SA Production Repository Asset',
    license: 'Proprietary / SA Production Authorized',
    attribution: 'SA Production Varanasi',
    localPath: '/herovid-poster.jpg',
    usage: 'Fast-loading fallback poster for hero video',
  },
  {
    name: 'Canon AT-1 Retro Camera 3D Model',
    source: 'Local Repository Asset / Sketchfab (https://sketchfab.com/3d-models/canon-at-1-retro-camera-9de66868d0f240e985da00c9480bfc82)',
    license: 'Creative Commons Attribution (CC BY 4.0)',
    attribution: 'Canon AT-1 Retro Camera by AleixoAlonso on Sketchfab',
    localPath: '/camera/scene.gltf',
    usage: 'Global zero-gravity floating 3D camera traversing the entire site story via unified Three.js canvas',
  },
  {
    name: 'Editorial Event Photography',
    source: 'Unsplash Editorial Production Stills',
    license: 'Unsplash Permissive License (Free for commercial and editorial use)',
    attribution: 'Respective editorial photographers on Unsplash',
    localPath: 'Remote CDN (Unsplash optimized with auto=format)',
    usage: 'Portfolio cards, Production Worlds, Marquee ribbons',
  },
]
