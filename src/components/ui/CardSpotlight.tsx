import React, { useRef, useState, useCallback } from 'react'

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
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setOpacity(1)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setOpacity(0)
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
          opacity,
          background: `radial-gradient(${radius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
