import React, { useRef, useCallback } from 'react'

interface GlareCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export const GlareCard: React.FC<GlareCardProps> = ({
  children,
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const rectRef = useRef<DOMRect | null>(null)

  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    rectRef.current = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--glare-opacity', '0.75')
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    const rect = rectRef.current || e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    e.currentTarget.style.setProperty('--glare-x', `${x}%`)
    e.currentTarget.style.setProperty('--glare-y', `${y}%`)
  }, [])

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    rectRef.current = null
    e.currentTarget.style.setProperty('--glare-opacity', '0')
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle Glare Sweep Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: 'var(--glare-opacity, 0)',
          background:
            'radial-gradient(450px circle at var(--glare-x, 50%) var(--glare-y, 50%), rgba(244, 241, 232, 0.14), rgba(124, 110, 205, 0.05) 45%, transparent 75%)',
        }}
      />
      {children}
    </div>
  )
}

