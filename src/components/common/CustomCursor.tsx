import { useEffect, useRef, useState } from "react";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const [cursorText, setCursorText] = useState<string>("");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check element under cursor for data-cursor attributes
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorElem = target.closest("[data-cursor]") as HTMLElement | null;
        if (cursorElem) {
          const type = cursorElem.getAttribute("data-cursor") || "";
          setCursorText(type);
          setIsHovered(true);
        } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
          setCursorText("");
          setIsHovered(true);
        } else {
          setCursorText("");
          setIsHovered(false);
        }
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    // Smooth lerp loop for outer ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch, prefersReduced, isVisible]);

  if (isTouch || prefersReduced) return null;

  return (
    <div
      className={`custom-cursor pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#F4F2ED] transition-transform duration-75 will-change-transform ${
          isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      />

      {/* Outer interactive lerping ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 flex items-center justify-center rounded-full border will-change-transform transition-all duration-200 ${
          cursorText
            ? "h-20 w-20 -ml-10 -mt-10 border-[#F4F2ED]/40 bg-[#050505]/75 backdrop-blur-xs text-[#F4F2ED]"
            : isHovered
            ? "h-14 w-14 -ml-7 -mt-7 border-[#F4F2ED]/60 bg-[#F4F2ED]/10 backdrop-blur-xs"
            : "h-8 w-8 -ml-4 -mt-4 border-[#F4F2ED]/30 bg-transparent"
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[10px] tracking-widest font-semibold uppercase text-[#F4F2ED]">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
