import React, { useEffect, useState } from 'react'

interface PreloaderProps {
  onComplete: () => void
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [isReady, setIsReady] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 25 + 15
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setProgress(100)
        setTimeout(() => {
          setIsReady(true)
          setTimeout(onComplete, 600)
        }, 300)
      } else {
        setProgress(Math.round(current))
      }
    }, 80)

    // Hard fallback timeout: never strand the user
    const safetyTimer = setTimeout(() => {
      clearInterval(interval)
      setProgress(100)
      setIsReady(true)
      setTimeout(onComplete, 400)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(safetyTimer)
    }
  }, [onComplete])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F5F3EE] transition-all duration-700 ease-out ${
        isReady ? 'opacity-0 pointer-events-none -translate-y-4' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Wordmark */}
        <div className="flex flex-col items-center">
          <span className="font-mono text-[11px] tracking-[0.3em] uppercase text-[#111113]/50">
            TECHNICAL & PHYSICAL PRODUCTION
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold tracking-[-0.03em] text-[#111113]">
            SA PRODUCTION
          </h1>
          <span className="mt-1 font-mono text-[10px] tracking-[0.25em] uppercase text-[#7C6ECD]">
            VARANASI, INDIA
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="relative mt-4 h-[2px] w-48 overflow-hidden rounded-full bg-[#111113]/10">
          <div
            className="h-full bg-[#7C6ECD] transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-[10px] tracking-widest text-[#111113]/40">
          {progress}%
        </span>
      </div>
    </div>
  )
}
