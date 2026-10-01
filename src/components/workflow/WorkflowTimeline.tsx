import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowSteps, type WorkflowStep } from "../../data/workflow";
import { CheckCircle2, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineWrapperRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const beamHeadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !timelineWrapperRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Tracing beam progress line tracking scroll through workflow timeline
      if (beamRef.current && timelineWrapperRef.current) {
        gsap.fromTo(
          beamRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timelineWrapperRef.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.3,
              onUpdate: (self) => {
                if (beamHeadRef.current && timelineWrapperRef.current) {
                  const progress = self.progress;
                  const wrapperHeight = timelineWrapperRef.current.offsetHeight;
                  const currentY = progress * wrapperHeight;
                  gsap.set(beamHeadRef.current, {
                    y: currentY,
                    opacity: progress > 0.005 ? 1 : 0,
                  });
                }
              },
            },
          }
        );
      }

      // 2. Section Header entrance
      gsap.fromTo(
        ".workflow-header-anim",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 3. Step cards entrance stagger & milestone node activation
      const stepNodes = gsap.utils.toArray<HTMLElement>(".workflow-step-node");
      stepNodes.forEach((node) => {
        const milestone = node.querySelector<HTMLElement>(".step-milestone");
        const card = node.querySelector<HTMLElement>(".step-card");

        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0.35, y: 40, scale: 0.98 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: node,
                start: "top 82%",
                end: "top 48%",
                scrub: 0.5,
              },
            }
          );
        }

        if (milestone) {
          ScrollTrigger.create({
            trigger: node,
            start: "top 75%",
            end: "bottom 25%",
            toggleClass: { targets: milestone, className: "is-active-milestone" },
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="system"
      className="relative w-full bg-[#08080A] px-6 sm:px-10 md:px-20 py-20 md:py-28 border-t border-[#F4F2ED]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="workflow-header-anim flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>THE EXECUTION PROTOCOL // 09 STAGES</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,4.2rem)] uppercase tracking-tight text-[#F4F2ED] leading-tight">
              EVERY SHOW <br />
              HAS A SYSTEM.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-[#F4F2ED]/70 leading-relaxed">
              Nothing is left to chance. From CAD blueprints to timecoded show files and post-event data checksums, our protocol guarantees zero-failure execution.
            </p>
            <p className="mt-1.5 font-mono text-[10px] sm:text-xs text-[#7C6ECD] uppercase tracking-widest">
              SYSTEMATIC · AUDITED · REPEATABLE
            </p>
          </div>
        </div>

        {/* Tracing Beam Vertical Timeline */}
        <div ref={timelineWrapperRef} className="relative mt-12 md:mt-16 pl-6 sm:pl-12 md:pl-20">
          {/* Static track line */}
          <div className="absolute left-2 sm:left-4 md:left-6 top-0 bottom-0 w-[2px] bg-[#F4F2ED]/10" />

          {/* Glowing Animated Tracing Beam */}
          <div
            ref={beamRef}
            className="absolute left-2 sm:left-4 md:left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#7C6ECD] via-indigo-400 to-[#7C6ECD] shadow-[0_0_14px_rgba(124,110,205,0.7)] origin-top will-change-transform"
            style={{ transform: "scaleY(0)" }}
          />

          {/* Glowing Leading Laser Head */}
          <div
            ref={beamHeadRef}
            className="absolute left-2 sm:left-4 md:left-6 top-0 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#7C6ECD] shadow-[0_0_16px_#7C6ECD,0_0_24px_rgba(124,110,205,0.8)] pointer-events-none will-change-transform z-10"
            style={{ opacity: 0 }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-10 md:space-y-14">
            {workflowSteps.map((step: WorkflowStep) => (
              <div
                key={step.step}
                className="workflow-step-node relative group"
              >
                {/* Node Milestone Indicator */}
                <div className="step-milestone absolute -left-[30px] sm:-left-[46px] md:-left-[70px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#08080A] border-2 border-[#7C6ECD]/60 text-[#7C6ECD] transition-all duration-300 group-hover:scale-125">
                  <span className="font-mono text-[10px] font-bold">
                    {step.step}
                  </span>
                </div>

                {/* Card Container */}
                <div className="step-card rounded-xl bg-[#111114] border border-[#F4F2ED]/10 p-5 sm:p-7 md:p-8 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:bg-[#15151A] will-change-transform">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#F4F2ED]/10">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#7C6ECD]/80 mb-1">
                        <span>PHASE {step.step}</span>
                        <span className="text-[#F4F2ED]/30">/</span>
                        <span>{step.phase}</span>
                      </div>
                      <h3 className="font-display font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight text-[#F4F2ED]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#F4F2ED]/15 bg-[#08080A] px-3.5 py-1.5 font-mono text-xs text-[#F4F2ED]/70">
                      <Shield className="h-3.5 w-3.5 text-[#7C6ECD]" />
                      <span>{step.category}</span>
                    </div>
                  </div>

                  <p className="mt-4 text-xs sm:text-sm text-[#F4F2ED]/80 font-light leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  {/* Checklist & Deliverables */}
                  <div className="mt-5 pt-5 border-t border-[#F4F2ED]/10 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                    <div className="md:col-span-8">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5">
                        EXECUTION CHECKLIST
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px] text-[#F4F2ED]/75">
                        {step.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-4 rounded-lg bg-[#0A0A0C] border border-[#F4F2ED]/10 p-3.5">
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-[#7C6ECD] mb-1">
                        STAGE DELIVERABLE
                      </h4>
                      <p className="font-mono text-xs text-[#F4F2ED]/90 font-medium">
                        {step.deliverable}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
