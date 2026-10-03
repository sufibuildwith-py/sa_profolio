import React, { useRef, useCallback } from 'react'

interface CardSpotlightProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  radius?: number
}

export const CardSpotlight: React.FC<CardSpotlightProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(124, 110, 205, 0.12)',
  radius = 360,
  ...props
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    rectRef.current = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--spot-opacity', '1')
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    const rect = rectRef.current || e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    e.currentTarget.style.setProperty('--spot-x', `${x}px`)
    e.currentTarget.style.setProperty('--spot-y', `${y}px`)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = null
    e.currentTarget.style.setProperty('--spot-opacity', '0')
  }, [])

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle Aceternity Spotlight Layer (Restrained SA Violet tint) */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity: 'var(--spot-opacity, 0)',
          background: `radial-gradient(${radius}px circle at var(--spot-x, -999px) var(--spot-y, -999px), ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}

