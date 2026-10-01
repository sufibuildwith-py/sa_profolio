import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { MagneticButton } from "../common/MagneticButton";
import { HeroVideoBackground } from "./HeroVideoBackground";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenProjectModal: () => void;
  isReady: boolean;
}

export function Hero({ onOpenProjectModal, isReady }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Single Cinematic Mask Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      )
      .fromTo(
        accentLineRef.current,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        ".statement-line",
        { y: "110%", opacity: 0, filter: "blur(4px)" },
        {
          y: "0%",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.85,
          stagger: 0.1,
          ease: "power4.out",
        },
        "-=0.35"
      )
      .fromTo(
        [metaRef.current, ctaRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        "-=0.4"
      );

      // 2. Controlled Scroll Transition
      if (statementRef.current) {
        gsap.to(statementRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "60% top",
            scrub: 1,
          },
          y: -40,
          opacity: 0,
        });
      }

      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "50% top",
            scrub: 1,
          },
          y: -30,
          opacity: 0,
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] px-6 sm:px-10 md:px-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 select-none"
    >
      {/* Real Cinematic Production Video Background */}
      <HeroVideoBackground />

      {/* Top Status & Technical Metadata */}
      <div
        ref={badgeRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-[11px] uppercase tracking-widest text-[#F4F2ED]/60"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F4F2ED]/15 bg-[#111111]/70 px-3.5 py-1.5 backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD] animate-pulse" />
          <span>STAGE / LIGHT / SOUND / RIG // DISPATCH READY</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>{siteConfig.headquarters.coordinates}</span>
          <span className="text-[#F4F2ED]/25">/</span>
          <span>{siteConfig.established}</span>
        </div>
      </div>

      {/* Upper-Left Cinematic Editorial Statement (Leaves Center Area Clear for Video's Embedded Branding) */}
      <div
        ref={statementRef}
        className="relative z-10 max-w-7xl mx-auto w-full my-auto pt-6 sm:pt-10 pb-6"
      >
        <div className="max-w-[320px] sm:max-w-[380px] md:max-w-[440px] flex items-stretch gap-3.5 sm:gap-4.5">
          {/* Vertical Accent Line */}
          <div
            ref={accentLineRef}
            className="w-[2px] bg-gradient-to-b from-[#7C6ECD] via-[#7C6ECD]/70 to-transparent rounded-full origin-top shrink-0"
          />

          {/* Masked Editorial Text */}
          <div className="flex flex-col">
            <div className="overflow-hidden">
              <h1 className="statement-line font-display font-black text-[clamp(1.45rem,2.8vw,2.5rem)] uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[1.02]">
                WE BRING{" "}
                <span className="font-serif italic font-normal text-[#7C6ECD] tracking-normal text-[1.1em] px-0.5">
                  LIFE
                </span>
              </h1>
            </div>
            <div className="overflow-hidden mt-0.5 sm:mt-1">
              <div className="statement-line font-display font-black text-[clamp(1.45rem,2.8vw,2.5rem)] uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[1.02]">
                TO EVERY EVENT.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Metadata & Primary CTAs */}
      <div
        ref={ctaRef}
        className="relative z-10 max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-[#F4F2ED]/10"
      >
        <div ref={metaRef} className="max-w-md">
          <p className="font-sans text-xs sm:text-sm text-[#F4F2ED]/70 leading-relaxed">
            {siteConfig.positioning}
          </p>
          <p className="mt-1.5 font-mono text-[10px] sm:text-[11px] text-[#F4F2ED]/40 uppercase tracking-widest">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:gap-4">
          <a href="#productions">
            <MagneticButton
              variant="primary"
              className="text-xs px-6 sm:px-7 py-3 sm:py-3.5"
              cursorLabel="ENTER"
            >
              <span>ENTER THE WORK</span>
              <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
            </MagneticButton>
          </a>

          <MagneticButton
            variant="secondary"
            onClick={onOpenProjectModal}
            className="text-xs px-6 sm:px-7 py-3 sm:py-3.5"
            cursorLabel="TALK"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
