import React, { useRef, useState, useCallback } from 'react'

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
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlarePosition({ x, y })
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      {...props}
    >
      {/* Subtle Glare Sweep Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 0.75 : 0,
          background: `radial-gradient(450px circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(244, 241, 232, 0.14), rgba(124, 110, 205, 0.05) 45%, transparent 75%)`,
        }}
      />
      {children}
    </div>
  )
}
