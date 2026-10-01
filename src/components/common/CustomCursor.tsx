import { useEffect, useRef } from "react";
import { useIsTouchDevice } from "../../hooks/useMediaQuery";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export function CustomCursor() {
  const isTouch = useIsTouchDevice();
  const prefersReduced = useReducedMotion();

  const wrapperRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isTouch || prefersReduced) return;

    document.body.classList.add("has-custom-cursor");

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let animationFrameId: number;
    let isRunning = true;

    const wrapper = wrapperRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = textRef.current;

    let currentMode: "default" | "hover" | "text" = "default";
    let currentText = "";

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible && wrapper) {
        isVisible = true;
        wrapper.style.opacity = "1";
        ringX = mouseX;
        ringY = mouseY;
      }

      if (dot) {
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check element under cursor for data-cursor attributes (zero React state updates)
      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorElem = target.closest("[data-cursor]") as HTMLElement | null;
        if (cursorElem) {
          const type = cursorElem.getAttribute("data-cursor") || "";
          if (currentMode !== "text" || currentText !== type) {
            currentMode = "text";
            currentText = type;
            if (ring) {
              ring.className =
                "fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform transition-[width,height,margin,border-color,background-color] duration-150 h-20 w-20 -ml-10 -mt-10 border border-[#7C6ECD]/60 bg-[#050505]/85 backdrop-blur-xs text-[#F4F2ED]";
            }
            if (dot) dot.style.opacity = "0";
            if (label) {
              label.textContent = type;
              label.style.display = "block";
            }
          }
        } else if (target.closest("button, a, input, select, textarea, [role='button']")) {
          if (currentMode !== "hover") {
            currentMode = "hover";
            currentText = "";
            if (ring) {
              ring.className =
                "fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform transition-[width,height,margin,border-color,background-color] duration-150 h-12 w-12 -ml-6 -mt-6 border border-[#7C6ECD]/70 bg-[#7C6ECD]/15 backdrop-blur-xs";
            }
            if (dot) dot.style.opacity = "0";
            if (label) {
              label.textContent = "";
              label.style.display = "none";
            }
          }
        } else {
          if (currentMode !== "default") {
            currentMode = "default";
            currentText = "";
            if (ring) {
              ring.className =
                "fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform transition-[width,height,margin,border-color,background-color] duration-150 h-7 w-7 -ml-3.5 -mt-3.5 border border-[#F4F2ED]/30 bg-transparent";
            }
            if (dot) dot.style.opacity = "1";
            if (label) {
              label.textContent = "";
              label.style.display = "none";
            }
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (wrapper) wrapper.style.opacity = "0";
    };

    const onMouseEnter = () => {
      isVisible = true;
      if (wrapper) wrapper.style.opacity = "1";
    };

    // Smooth lerp loop for outer ring
    const render = () => {
      if (!isRunning) return;

      const dx = mouseX - ringX;
      const dy = mouseY - ringY;
      
      // Faster lerp (0.28) for zero drag latency
      ringX += dx * 0.28;
      ringY += dy * 0.28;

      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave, { passive: true });
    document.addEventListener("mouseenter", onMouseEnter, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTouch, prefersReduced]);

  if (isTouch || prefersReduced) return null;

  return (
    <div
      ref={wrapperRef}
      className="custom-cursor pointer-events-none fixed inset-0 z-[9999] opacity-0 transition-opacity duration-200"
      aria-hidden="true"
    >
      {/* Precision inner center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-[#F4F2ED] transition-opacity duration-150 will-change-transform"
      />

      {/* Outer interactive lerping ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex items-center justify-center rounded-full will-change-transform transition-[width,height,margin,border-color,background-color] duration-150 h-7 w-7 -ml-3.5 -mt-3.5 border border-[#F4F2ED]/30 bg-transparent"
      >
        <span
          ref={textRef}
          className="font-mono text-[9px] tracking-widest font-bold uppercase text-[#F4F2ED] hidden select-none"
        />
      </div>
    </div>
  );
}
