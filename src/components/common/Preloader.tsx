import { useEffect, useState, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  progress?: number;
  isReady?: boolean;
  onComplete: () => void;
}

export function Preloader({ progress = 0, isReady = false, onComplete }: PreloaderProps) {
  const [displayProgress, setDisplayProgress] = useState(15);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasExitedRef = useRef(false);

  // Smoothly increment visual display progress
  useEffect(() => {
    if (progress > displayProgress) {
      setDisplayProgress(progress);
    }
  }, [progress, displayProgress]);

  // Execute exit animation safely when ready
  const triggerExit = () => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;
    setDisplayProgress(100);

    if (!containerRef.current) {
      onComplete();
      return;
    }

    // Make transparent to clicks immediately during exit transition
    containerRef.current.style.pointerEvents = "none";

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(".preloader-text-wrap", {
      opacity: 0,
      y: -15,
      duration: 0.35,
      ease: "power3.in",
    })
    .to(
      containerRef.current,
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        opacity: 0,
        duration: 0.75,
        ease: "power4.inOut",
      },
      "-=0.1"
    );
  };

  useEffect(() => {
    if (isReady && !hasExitedRef.current) {
      const timer = setTimeout(() => {
        triggerExit();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  // Safety fallback so visitor is NEVER stuck on loading screen
  useEffect(() => {
    const safetyFallback = setTimeout(() => {
      if (!hasExitedRef.current) {
        triggerExit();
      }
    }, 2800);

    return () => clearTimeout(safetyFallback);
  }, []);

  return (
    <div
      ref={containerRef}
      className="preloader-overlay fixed inset-0 z-[10000] flex flex-col justify-between bg-[#050505] p-8 md:p-16 select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
    >
      {/* Top Metadata */}
      <div className="preloader-text-wrap flex items-center justify-between font-mono text-[11px] tracking-widest text-[#F4F2ED]/50 uppercase">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          SYSTEM BOOT // ASSET STREAM
        </span>
        <span>KANPUR · INDIA</span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="preloader-text-wrap my-auto flex flex-col items-center justify-center text-center">
        <div className="overflow-hidden">
          <h1 className="font-display text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter text-[#F4F2ED] uppercase">
            SA PRODUCTION
          </h1>
        </div>
        <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.3em] text-[#F4F2ED]/60 uppercase">
          SOUND · LIGHT · STAGE · VISUALS · PRODUCTION
        </p>

        {/* Real asset loading progress line */}
        <div className="mt-10 h-[1px] w-48 sm:w-72 md:w-96 bg-[#F4F2ED]/10 overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-200 to-[#F4F2ED] transition-all duration-300 ease-out"
            style={{ width: `${displayProgress}%` }}
          />
        </div>
      </div>

      {/* Bottom Percentage Counter */}
      <div className="preloader-text-wrap flex items-end justify-between font-mono text-[11px] tracking-widest text-[#F4F2ED]/50 uppercase">
        <span className="text-amber-400 font-medium">STREAMING 3D ASSETS</span>
        <span className="text-[#F4F2ED] text-sm tabular-nums font-bold">
          {displayProgress.toString().padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}
