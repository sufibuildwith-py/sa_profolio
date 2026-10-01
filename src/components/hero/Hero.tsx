import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { Hero3D } from "./Hero3D";
import { MagneticButton } from "../common/MagneticButton";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenProjectModal: () => void;
  isReady: boolean;
  onAssetProgress?: (percent: number) => void;
  onAssetLoaded?: () => void;
}

export function Hero({ onOpenProjectModal, isReady, onAssetProgress, onAssetLoaded }: HeroProps) {
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
          duration: 1.2,
          stagger: 0.08,
          ease: "power4.out",
        },
        "-=0.5"
      )
      .fromTo(
        sublineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.9 },
        "-=0.8"
      )
      .fromTo(
        [metaRef.current, ctaRef.current],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.6"
      );

      // 2. Hero Scroll Transition: As user scrolls, typography parts, shifts & fades into Section B
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
        y: -140,
        scale: 0.94,
        opacity: 0.1,
      });

      gsap.to(sublineRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
        y: -80,
        opacity: 0,
      });

      gsap.to(ctaRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "50% top",
          scrub: 1,
        },
        y: -50,
        opacity: 0,
      });
    }, heroRef);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#050505] px-6 sm:px-10 md:px-16 pt-32 pb-12 select-none"
    >
      {/* 3D Stage Hardware Canvas */}
      <Hero3D onProgress={onAssetProgress} onLoaded={onAssetLoaded} />

      {/* Atmospheric Stage Vignette and Lighting Gradients */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(234,179,8,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_85%_65%,rgba(56,189,248,0.07),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-transparent pointer-events-none z-1" />

      {/* Top Status & Technical Metadata */}
      <div
        ref={badgeRef}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-[#F4F2ED]/60"
      >
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#F4F2ED]/15 bg-[#111111]/70 px-3.5 py-1.5 backdrop-blur-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>STAGE / LIGHT / SOUND / RIG // DISPATCH READY</span>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span>{siteConfig.headquarters.coordinates}</span>
          <span className="text-[#F4F2ED]/25">/</span>
          <span>{siteConfig.established}</span>
        </div>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-10 my-auto max-w-6xl py-12 md:py-16">
        <h1
          ref={headlineRef}
          className="font-display font-black uppercase text-left tracking-[-0.04em] text-[#F4F2ED] leading-[0.88]"
        >
          <div className="overflow-hidden">
            <span className="hero-word inline-block text-[clamp(3.8rem,13vw,12.5rem)] font-extrabold mr-4 md:mr-8">
              SA
            </span>
            <span className="hero-word inline-block text-[clamp(3.8rem,13vw,12.5rem)] font-extrabold text-[#F4F2ED]">
              PRODUCTION
            </span>
          </div>
          <div className="overflow-hidden mt-1 md:mt-2">
            <span className="hero-word inline-block font-serif italic font-normal text-[clamp(2.4rem,8.5vw,8.5rem)] tracking-tight text-[#F4F2ED]/85">
              We Build
            </span>
            <span className="hero-word inline-block text-[clamp(2.4rem,8.5vw,8.5rem)] font-black text-[#F4F2ED] ml-4 md:ml-6">
              The Moment.
            </span>
          </div>
        </h1>

        {/* Secondary Descriptor */}
        <div
          ref={sublineRef}
          className="mt-8 md:mt-10 max-w-2xl flex flex-wrap items-center gap-2 sm:gap-4 font-mono text-xs sm:text-sm tracking-[0.25em] text-[#F4F2ED]/70 uppercase"
        >
          {siteConfig.descriptors.map((desc, idx) => (
            <span key={desc} className="flex items-center gap-2 sm:gap-4">
              <span className="hover:text-amber-400 transition-colors">{desc}</span>
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
        className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-8 pt-8 border-t border-[#F4F2ED]/10"
      >
        <div ref={metaRef} className="max-w-md">
          <p className="font-sans text-sm sm:text-base text-[#F4F2ED]/70 leading-relaxed">
            {siteConfig.positioning}
          </p>
          <p className="mt-2 font-mono text-[11px] text-[#F4F2ED]/40 uppercase tracking-widest">
            {siteConfig.tagline}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <a href="#productions">
            <MagneticButton
              variant="primary"
              className="text-xs px-8 py-4"
              cursorLabel="ENTER"
            >
              <span>ENTER THE WORK</span>
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </MagneticButton>
          </a>

          <MagneticButton
            variant="secondary"
            onClick={onOpenProjectModal}
            className="text-xs px-8 py-4"
            cursorLabel="TALK"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
