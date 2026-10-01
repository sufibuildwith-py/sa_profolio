import { useEffect, useRef, useState } from "react";

export function HeroVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      video.pause();
      return;
    }

    // Ensure muted & autoplay policy compliance
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Auto-play was prevented by browser policy / power save mode; poster remains visible
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
      {/* Native Cinematic Background Video */}
      {!hasError ? (
        <video
          ref={videoRef}
          src="/herovid.mp4"
          poster="/herovid-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover object-center will-change-transform scale-[1.01]"
        />
      ) : (
        <img
          src="/herovid-poster.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
      )}

      {/* Layer 1: Dark Cinematic Contrast Tint */}
      <div className="absolute inset-0 bg-[#050505]/55" />

      {/* Layer 2: Stage Light Radial Vignette (Emphasizes center typography while letting real production lighting show through) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(5,5,5,0.25)_0%,rgba(5,5,5,0.75)_80%,#050505_100%)]" />

      {/* Layer 3: Restrained Stage Violet Glow Accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_45%_at_50%_-10%,rgba(124,110,205,0.12),transparent_70%)]" />

      {/* Layer 4: Top Navbar Shadow Gradient & Bottom Seamless Blend into Next Section */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
    </div>
  );
}
