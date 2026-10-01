import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, ShieldCheck, MapPin, Activity } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

gsap.registerPlugin(ScrollTrigger);

export function OperationalScale() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".scale-stat-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "center 50%",
            scrub: 0.5,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      number: "50",
      label: "PRODUCTION SCENARIOS",
      detail: "Planned, staged, and coordinated with complete hardware and crew manifesting.",
      icon: Activity,
    },
    {
      number: "08",
      label: "PRODUCTION CATEGORIES",
      detail: "Weddings, summits, concerts, fashion runways, trade expos, and commercial sets.",
      icon: ShieldCheck,
    },
    {
      number: "INDIA",
      label: "MULTI-CITY OPERATIONS",
      detail: "Central logistics depot in Kanpur with mobile production crews deployed nationwide.",
      icon: MapPin,
    },
    {
      number: "01",
      label: "CONNECTED PRODUCTION SYSTEM",
      detail: "Hardware custody, technical direction, power distribution, and crew under single command.",
      icon: Check,
    },
  ];

  const deploymentDisciplines = [
    "LUXURY WEDDINGS & SANGEET",
    "CORPORATE LEADERSHIP SUMMITS",
    "LIVE CONCERTS & MUSIC FESTIVALS",
    "FASHION RUNWAYS & REVEALS",
    "INDUSTRY EXPOS & TRADE PAVILIONS",
    "GLOBAL CONFERENCES & CONVOCATIONS",
    "HERITAGE & CULTURAL PRODUCTIONS",
    "COMMERCIAL STUDIO PRODUCTIONS"
  ];

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative min-h-screen w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-28 md:py-36 border-t border-[#F4F2ED]/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-4xl pb-16 border-b border-[#F4F2ED]/12">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-3">
            <span className="h-2 w-2 rounded-full bg-[#E10600]" />
            <span>OPERATIONAL SCALE // GROUNDED DATA MODEL</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[0.9]">
            BUILT AROUND <br />
            EXECUTION.
          </h2>
          <p className="mt-8 text-lg sm:text-2xl text-[#F4F2ED]/85 font-light leading-relaxed max-w-3xl">
            SA Production brings together the people, equipment and technical workflows behind live events and production environments. From the first site check to the final cue, the work is in the details.
          </p>
        </div>

        {/* Minimalist Data Metric Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="scale-stat-card rounded-2xl bg-[#0C0C0F] border border-[#F4F2ED]/10 p-8 flex flex-col justify-between hover:border-[#E10600]/40 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between pb-6 border-b border-[#F4F2ED]/10">
                    <span className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#F4F2ED]">
                      {stat.number}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#16161D] text-[#E10600]">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <h3 className="mt-6 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F4F2ED]">
                    {stat.label}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#F4F2ED]/60 font-light leading-relaxed">
                    {stat.detail}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#F4F2ED]/5 font-mono text-[10px] text-emerald-400 uppercase tracking-widest">
                  OPERATIONAL DISCIPLINE
                </div>
              </div>
            );
          })}
        </div>

        {/* Operational Categories Footprint */}
        <div className="mt-16 rounded-2xl bg-[#09090C] border border-[#F4F2ED]/10 p-8 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#F4F2ED]/10 font-mono text-xs uppercase tracking-widest">
            <span className="text-[#E10600] font-bold flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              CENTRAL DEPOT LOGISTICS & DEPLOYMENT SCOPE
            </span>
            <span className="text-[#F4F2ED]/40">
              KANPUR HEADQUARTERS // {siteConfig.headquarters.coordinates}
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-3">
            {deploymentDisciplines.map((item, idx) => (
              <span
                key={idx}
                className="font-mono text-xs px-4 py-2 rounded-full border bg-[#141418] text-[#F4F2ED]/75 border-[#F4F2ED]/10 hover:border-[#F4F2ED]/30 hover:text-white transition-colors"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
