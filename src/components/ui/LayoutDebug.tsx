import React, { useEffect, useState } from 'react'

interface SectionMetric {
  id: string
  name: string
  height: number
  top: number
  hasExcess: boolean
}

export const LayoutDebug: React.FC = () => {
  const [isDebug, setIsDebug] = useState(false)
  const [metrics, setMetrics] = useState<SectionMetric[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const params = new URLSearchParams(window.location.search)
    if (params.get('layoutDebug') === '1') {
      setIsDebug(true)

      const measure = () => {
        const sections = Array.from(document.querySelectorAll('main > section, header, footer'))
        const list: SectionMetric[] = sections.map((sec, idx) => {
          const rect = sec.getBoundingClientRect()
          const name = sec.getAttribute('aria-label') || sec.id || `Section ${idx + 1}`
          const height = Math.round(rect.height)
          const top = Math.round(rect.top + window.scrollY)
          return {
            id: sec.id || `sec-${idx}`,
            name,
            height,
            top,
            hasExcess: height > window.innerHeight * 1.5,
          }
        })
        setMetrics(list)
      }

      measure()
      window.addEventListener('resize', measure)
      window.addEventListener('scroll', measure, { passive: true })
      return () => {
        window.removeEventListener('resize', measure)
        window.removeEventListener('scroll', measure)
      }
    }
  }, [])

  if (!isDebug) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 max-h-[80vh] w-80 overflow-y-auto rounded-xl bg-black/95 p-4 font-mono text-[11px] text-white shadow-2xl border border-white/20 backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/20 pb-2 mb-2">
        <span className="font-bold text-[#7C6ECD]">LAYOUT FORENSICS DEBUG</span>
        <span className="text-[10px] text-white/50">{window.innerWidth}×{window.innerHeight}</span>
      </div>
      <div className="flex flex-col gap-1.5">
        {metrics.map((m) => (
          <div
            key={m.id}
            className={`flex items-center justify-between p-1.5 rounded ${
              m.hasExcess ? 'bg-red-500/20 text-red-200 border border-red-500/40' : 'bg-white/5'
            }`}
          >
            <span className="truncate max-w-[170px]" title={m.name}>{m.name}</span>
            <span className="font-bold">{m.height}px</span>
          </div>
        ))}
      </div>
    </div>
  )
}
