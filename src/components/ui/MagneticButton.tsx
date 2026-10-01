import React, { useRef } from 'react'
import { gsap, EASE } from '../../lib/motion'

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
  strength?: number
  href?: string
  target?: string
  rel?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.25,
  href,
  target,
  rel,
  onClick,
  ...props
}) => {
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    // Only apply magnetic effect on fine desktop pointers
    if (window.matchMedia('(hover: none) or (pointer: coarse)').matches) return
    const el = btnRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()
    const x = (e.clientX - (rect.left + rect.width / 2)) * strength
    const y = (e.clientY - (rect.top + rect.height / 2)) * strength

    gsap.to(el, {
      x,
      y,
      duration: 0.35,
      ease: EASE.smooth,
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = () => {
    const el = btnRef.current
    if (!el) return

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: EASE.cinematic,
      overwrite: 'auto',
    })
  }

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center justify-center transition-colors ${className}`}
        onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-flex items-center justify-center transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
