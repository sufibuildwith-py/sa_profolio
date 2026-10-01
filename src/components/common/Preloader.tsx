import { useEffect, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(7);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Stage-timed progress increment
    const milestones = [
      { target: 24, delay: 250 },
      { target: 51, delay: 650 },
      { target: 83, delay: 1150 },
      { target: 100, delay: 1650 },
    ];

    const timeouts = milestones.map((m) =>
      setTimeout(() => {
        setProgress(m.target);
      }, m.delay)
    );

    // Fade out sequence once 100% reached
    const finishTimeout = setTimeout(() => {
      setIsDone(true);
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete();
        },
      });

      tl.to(".preloader-text-wrap", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        ease: "power3.in",
      })
      .to(".preloader-overlay", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.9,
        ease: "power4.inOut",
      });
    }, 2050);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  return (
    <div
      className="preloader-overlay fixed inset-0 z-[10000] flex flex-col justify-between bg-[#050505] p-8 md:p-16 select-none"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      aria-hidden={isDone}
    >
      {/* Top Metadata */}
      <div className="preloader-text-wrap flex items-center justify-between font-mono text-[11px] tracking-widest text-[#F4F2ED]/50 uppercase">
        <span className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          SYSTEM BOOT // SA EXECUTION CORE
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

        {/* Thin progress line */}
        <div className="mt-10 h-[1px] w-48 sm:w-72 md:w-96 bg-[#F4F2ED]/10 overflow-hidden relative">
          <div
            className="h-full bg-[#F4F2ED] transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom Percentage Counter */}
      <div className="preloader-text-wrap flex items-end justify-between font-mono text-[11px] tracking-widest text-[#F4F2ED]/50 uppercase">
        <span>INITIATING HARDWARE BUS</span>
        <span className="text-[#F4F2ED] text-sm tabular-nums font-bold">
          LOADING {progress.toString().padStart(2, "0")}%
        </span>
      </div>
    </div>
  );
}
