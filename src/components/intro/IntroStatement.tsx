import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Radio, ShieldCheck, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function IntroStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Progressive character / word opacity scrub on scroll
      const words = gsap.utils.toArray<HTMLElement>(".intro-word");

      gsap.fromTo(
        words,
        { opacity: 0.15, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center 45%",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0.2, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 80%",
            end: "top 55%",
            scrub: 1,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const statementLines = [
    ["WE", "DON'T", "JUST", "SHOW", "UP."],
    ["WE", "SET", "THE", "WHOLE"],
    ["THING", "IN", "MOTION."]
  ];

  return (
    <section
      ref={containerRef}
      id="intro"
      className="relative min-h-[90vh] w-full flex flex-col justify-center bg-[#050505] px-6 sm:px-10 md:px-20 py-28 md:py-40 select-none overflow-hidden"
    >
      {/* Subtle vertical hairline grid markers */}
      <div className="absolute inset-0 pointer-events-none flex justify-between px-8 md:px-16 opacity-10">
        <div className="w-[1px] h-full bg-[#F4F2ED]" />
        <div className="hidden md:block w-[1px] h-full bg-[#F4F2ED]" />
        <div className="w-[1px] h-full bg-[#F4F2ED]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Section Pill Label */}
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-10 md:mb-14">
          <span className="h-px w-8 bg-[#F4F2ED]/40" />
          <span>PHILOSOPHY // ZERO DRIFT EXECUTION</span>
        </div>

        {/* Giant Centered Editorial Typography */}
        <h2
          ref={textRef}
          className="font-display font-black text-[clamp(2.4rem,6.8vw,6.5rem)] uppercase leading-[0.92] tracking-[-0.03em] text-[#F4F2ED]"
        >
          {statementLines.map((line, lIdx) => (
            <div key={lIdx} className="mb-2 md:mb-3 flex flex-wrap gap-x-3 sm:gap-x-5">
              {line.map((word, wIdx) => (
                <span
                  key={wIdx}
                  className={`intro-word inline-block will-change-transform ${
                    word === "MOTION." ? "font-serif italic font-normal text-[#E10600]" : ""
                  }`}
                >
                  {word}
                </span>
              ))}
            </div>
          ))}
        </h2>

        {/* Supporting Editorial Paragraph */}
        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-10 border-t border-[#F4F2ED]/12">
          <div className="md:col-span-4 font-mono text-xs text-[#F4F2ED]/45 uppercase tracking-widest leading-relaxed">
            [ COORDINATED TECHNICAL ARCHITECTURE ]
            <div className="mt-4 flex flex-col gap-2.5 text-[11px] text-[#F4F2ED]/70">
              <span className="flex items-center gap-2">
                <Zap className="h-3.5 w-3.5 text-[#E10600]" />
                3-Phase Isolated Power Grids
              </span>
              <span className="flex items-center gap-2">
                <Radio className="h-3.5 w-3.5 text-cyan-400" />
                Dante Audio Over IP Transmission
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                N+1 Hot-Standby System Failover
              </span>
            </div>
          </div>

          <div className="md:col-span-8">
            <p
              ref={paragraphRef}
              className="text-lg sm:text-2xl md:text-3xl font-sans font-light text-[#F4F2ED]/85 leading-snug tracking-tight"
            >
              From sound and lighting to cameras, LED walls, stage systems, crew and live
              execution — SA Production coordinates the moving parts behind the moments people remember.
              <span className="block mt-4 text-base sm:text-lg text-[#F4F2ED]/50 font-normal">
                No rented confusion. No fragmented suppliers. One unified team in technical command.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
