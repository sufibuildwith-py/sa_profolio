import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { productionWorlds, type ProductionWorld } from "../../data/productions";
import { ArrowRight, CheckCircle2, Layers } from "lucide-react";

export function ProductionWorlds() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const activeWorld: ProductionWorld = productionWorlds[activeIndex];

  // Animate world change
  const handleSelectWorld = (index: number) => {
    if (index === activeIndex) return;

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0.2, y: 15, scale: 0.99 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out" }
      );
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    // Keyboard navigation between worlds
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % productionWorlds.length);
      } else if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => (prev - 1 + productionWorlds.length) % productionWorlds.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      ref={containerRef}
      id="worlds"
      className="relative min-h-screen w-full bg-[#070708] px-6 sm:px-10 md:px-16 py-28 md:py-36 border-t border-[#F4F2ED]/10 select-none overflow-hidden"
    >
      {/* Background ambient lighting linked to active world */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${activeWorld.bgGradient} opacity-50 transition-all duration-1000 pointer-events-none`}
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#E10600]" />
              <span>THE PRODUCTION WORLDS // 08 DISCIPLINES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#F4F2ED]">
              ENGINEERED ENVIRONMENTS.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs text-[#F4F2ED]/60 uppercase tracking-widest leading-relaxed">
            Each event type possesses distinct acoustic reflections, visual dynamics, and safety parameters. We tailor every millimeter of the rig.
          </p>
        </div>

        {/* Category Horizontal World Selector */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-[#F4F2ED]/10">
          {productionWorlds.map((world, idx) => (
            <button
              key={world.id}
              onClick={() => handleSelectWorld(idx)}
              data-cursor="VIEW"
              className={`shrink-0 flex items-center gap-2.5 px-4 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                idx === activeIndex
                  ? "bg-[#F4F2ED] text-[#050505] font-bold shadow-[0_0_20px_rgba(244,242,237,0.2)]"
                  : "bg-[#141416] text-[#F4F2ED]/60 hover:text-[#F4F2ED] hover:bg-[#1f1f24] border border-[#F4F2ED]/10"
              }`}
            >
              <span className="text-[10px] opacity-60 font-normal">{world.number}</span>
              <span>{world.category}</span>
            </button>
          ))}
        </div>

        {/* Main Immersive Production World Stage Viewport */}
        <div
          ref={contentRef}
          className="mt-10 rounded-2xl bg-[#0F0F12] border border-[#F4F2ED]/12 p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl transition-all duration-500"
        >
          {/* Subtle world watermark */}
          <div className="absolute right-4 bottom-4 font-display font-black text-7xl sm:text-9xl md:text-[14rem] text-[#F4F2ED]/[0.03] pointer-events-none select-none">
            {activeWorld.number}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: World Narrative & Scale */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 font-mono text-xs tracking-widest text-[#F4F2ED]/50 uppercase mb-4">
                  <span className="text-[#E10600] font-bold">{activeWorld.number} / 08</span>
                  <span className="text-[#F4F2ED]/25">·</span>
                  <span>{activeWorld.category}</span>
                </div>

                <h3 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-[#F4F2ED] uppercase tracking-tight leading-tight">
                  {activeWorld.headline}
                </h3>

                <p className="mt-6 text-lg sm:text-xl text-[#F4F2ED]/85 font-light leading-relaxed">
                  {activeWorld.tagline}
                </p>

                <p className="mt-4 text-sm sm:text-base text-[#F4F2ED]/60 leading-relaxed max-w-xl">
                  {activeWorld.scaleDescription}
                </p>
              </div>

              {/* Technical Specifications Pills */}
              <div className="mt-8 pt-8 border-t border-[#F4F2ED]/10 flex flex-wrap items-center gap-3">
                <span className="font-mono text-[10px] uppercase text-[#F4F2ED]/40 tracking-widest">
                  RIG PARAMETERS:
                </span>
                {activeWorld.keySpecs.map((spec) => (
                  <span
                    key={spec}
                    className="inline-flex items-center gap-1.5 font-mono text-xs px-3 py-1 rounded-md bg-[#1a1a20] border border-[#F4F2ED]/10 text-red-400"
                  >
                    <CheckCircle2 className="h-3 w-3 text-[#E10600]" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Typical Production Rig Card */}
            <div className="lg:col-span-5 rounded-xl bg-[#09090C] border border-[#F4F2ED]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between pb-4 border-b border-[#F4F2ED]/10 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/60">
                <span className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-[#E10600]" />
                  TYPICAL DEPLOYMENT RIG
                </span>
                <span className="text-[#E10600] font-semibold">SA CERTIFIED</span>
              </div>

              <div className="mt-6 flex flex-col gap-3.5">
                {activeWorld.typicalRig.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#141418] border border-[#F4F2ED]/5 font-mono text-xs text-[#F4F2ED]/90"
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-[10px] text-[#F4F2ED]/40">0{idx + 1}</span>
                      <span>{item}</span>
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/80" />
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-[#F4F2ED]/10 flex items-center justify-between font-mono text-xs text-[#F4F2ED]/50">
                <span>WARMUP: 4 HOURS MIN</span>
                <a
                  href="#contact"
                  className="flex items-center gap-1.5 text-[#E10600] hover:text-white transition-colors"
                >
                  <span>REQUEST SPEC</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
