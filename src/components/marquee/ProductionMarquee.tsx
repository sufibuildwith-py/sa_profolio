import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ProductionMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current) return;

    const ctx = gsap.context(() => {
      // Row 1 moves left
      gsap.to(row1Ref.current, {
        x: -400,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Row 2 moves right
      gsap.to(row2Ref.current, {
        x: 400,
        ease: "none",
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  const keywordsRow1 = [
    "SOUND ARCHITECTURE",
    "MOVING HEAD BEAMS",
    "LINE ARRAY ACOUSTICS",
    "4K CINEMA CHAINS",
    "BOX TRUSS RIGGING",
    "DANTE AUDIO BACKBONE",
    "P2.6 LED WALLS",
    "LIVE TIMECODE",
    "3-PHASE DISTRO"
  ];

  const keywordsRow2 = [
    "WEDDING PRODUCTIONS",
    "CORPORATE SUMMITS",
    "MUSIC FESTIVALS",
    "FASHION RUNWAYS",
    "TRADE EXHIBITIONS",
    "PRODUCT LAUNCHES",
    "GLOBAL CONFERENCES",
    "COMMERCIAL SETS"
  ];

  return (
    <div
      ref={marqueeRef}
      className="relative w-full py-10 md:py-14 bg-[#070709] border-y border-[#F4F2ED]/10 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Row 1 */}
      <div
        ref={row1Ref}
        className="flex whitespace-nowrap will-change-transform font-display font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tighter text-[#F4F2ED]/15 hover:text-[#F4F2ED]/30 transition-colors"
      >
        {Array.from({ length: 4 }).flatMap((_, i) =>
          keywordsRow1.map((kw, idx) => (
            <span key={`${i}-${idx}`} className="inline-flex items-center gap-4 md:gap-8 mr-4 md:mr-8">
              <span>{kw}</span>
              <span className="text-[#7C6ECD]/40 text-xl sm:text-3xl">·</span>
            </span>
          ))
        )}
      </div>

      {/* Row 2 (Alternating direction & styling) */}
      <div
        ref={row2Ref}
        className="flex whitespace-nowrap will-change-transform font-serif italic text-xl sm:text-3xl md:text-4xl text-[#F4F2ED]/10 mt-2 md:mt-3"
      >
        {Array.from({ length: 4 }).flatMap((_, i) =>
          keywordsRow2.map((kw, idx) => (
            <span key={`${i}-${idx}`} className="inline-flex items-center gap-4 md:gap-8 mr-4 md:mr-8">
              <span className="tracking-tight">{kw}</span>
              <span className="text-cyan-400/30 text-lg sm:text-2xl font-sans not-italic">/</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
