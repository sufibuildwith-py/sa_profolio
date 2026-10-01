/**
 * Performance and hardware capability utilities
 */

export function getOptimalDPR(): number {
  if (typeof window === 'undefined') return 1
  const dpr = window.devicePixelRatio || 1
  // Cap DPR at 1.5 - 2 to prevent excessive GPU strain on high-DPI displays
  const isMobile = window.innerWidth <= 768
  return isMobile ? Math.min(dpr, 1.5) : Math.min(dpr, 2.0)
}

export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false
  const hardwareConcurrency = navigator.hardwareConcurrency || 4
  return hardwareConcurrency <= 4
}
