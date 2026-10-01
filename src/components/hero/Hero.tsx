import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { MagneticButton } from "../common/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenProjectModal: () => void;
  isReady: boolean;
}

export function Hero({ onOpenProjectModal, isReady }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isReady || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
      .fromTo(
        ".hero-word",
        { y: "115%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1.1,
          stagger: 0.07,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .fromTo(
        sublineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.7"
      )
      .fromTo(
        [metaRef.current, ctaRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
        "-=0.5"
      );

      // 2. Controlled Hero Scroll Transition
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -100,
        scale: 0.96,
        opacity: 0.2,
      });

      gsap.to(sublineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
        y: -60,
        opacity: 0,
      });

      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
        y: -40,
        opacity: 0,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#050505] px-6 sm:px-10 md:px-16 pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 select-none"
    >
      {/* Atmospheric Stage Lighting Gradients (Navy / Violet Production Tone) */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_-5%,rgba(124,110,205,0.09),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_85%_65%,rgba(56,189,248,0.04),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-1" />

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

      {/* Center Cinematic Typography (Balanced responsive clamp sizing) */}
      <div className="relative z-10 my-auto max-w-7xl mx-auto w-full py-6 sm:py-8 md:py-10">
        <h1
          ref={headlineRef}
          className="font-display font-black uppercase text-left tracking-[-0.035em] text-[#F4F2ED] leading-[0.92]"
        >
          <div className="overflow-hidden">
            <span className="hero-word inline-block text-[clamp(2.4rem,5.8vw,5.5rem)] font-extrabold mr-3 sm:mr-6">
              SA
            </span>
            <span className="hero-word inline-block text-[clamp(2.4rem,5.8vw,5.5rem)] font-extrabold text-[#F4F2ED]">
              PRODUCTION
            </span>
          </div>
          <div className="overflow-hidden mt-1 sm:mt-2">
            <span className="hero-word inline-block font-serif italic font-normal text-[clamp(1.65rem,3.8vw,3.6rem)] tracking-tight text-[#F4F2ED]/85">
              We Build
            </span>
            <span className="hero-word inline-block text-[clamp(1.65rem,3.8vw,3.6rem)] font-black text-[#F4F2ED] ml-3 sm:ml-5">
              The Moment.
            </span>
          </div>
        </h1>

        {/* Secondary Descriptors */}
        <div
          ref={sublineRef}
          className="mt-6 sm:mt-8 max-w-2xl flex flex-wrap items-center gap-2 sm:gap-3 font-mono text-[11px] sm:text-xs tracking-[0.22em] text-[#F4F2ED]/70 uppercase"
        >
          {siteConfig.descriptors.map((desc, idx) => (
            <span key={desc} className="flex items-center gap-2 sm:gap-3">
              <span className="hover:text-[#7C6ECD] transition-colors">{desc}</span>
              {idx < siteConfig.descriptors.length - 1 && (
                <span className="text-[#F4F2ED]/25 font-light">·</span>
              )}
            </span>
          ))}
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
