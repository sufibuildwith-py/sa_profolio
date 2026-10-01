import React, { useRef } from "react";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  cursorLabel?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  variant = "primary",
  className = "",
  cursorLabel,
  onClick,
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || prefersReduced || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    buttonRef.current.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = "translate3d(0, 0, 0) scale(1)";
  };

  const baseStyles =
    "group relative inline-flex items-center justify-center font-mono text-xs uppercase tracking-widest transition-all duration-300 rounded-full select-none overflow-hidden will-change-transform";

  const variantStyles = {
    primary:
      "bg-[#F4F2ED] text-[#050505] px-7 py-3.5 font-semibold hover:bg-white hover:shadow-[0_0_24px_rgba(244,242,237,0.25)] border border-[#F4F2ED]",
    secondary:
      "bg-transparent text-[#F4F2ED] px-7 py-3.5 border border-[#F4F2ED]/25 hover:border-[#F4F2ED]/80 hover:bg-[#F4F2ED]/5",
    ghost:
      "bg-transparent text-[#F4F2ED]/75 hover:text-[#F4F2ED] px-4 py-2 border-b border-transparent hover:border-[#F4F2ED]/40 rounded-none",
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={cursorLabel}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2.5 transition-transform duration-300 group-hover:translate-x-0.5">
        {children}
      </span>
      {variant === "primary" && (
        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      )}
    </button>
  );
}
