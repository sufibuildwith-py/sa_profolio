import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { workflowSteps, type WorkflowStep } from "../../data/workflow";
import { CheckCircle2, Shield } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function WorkflowTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Tracing beam progress line tracking scroll through workflow
      if (beamRef.current) {
        gsap.fromTo(
          beamRef.current,
          { height: "0%" },
          {
            height: "100%",
            ease: "none",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              end: "bottom 80%",
              scrub: true,
            },
          }
        );
      }

      // Step cards entrance stagger
      const steps = gsap.utils.toArray<HTMLElement>(".workflow-step-node");
      steps.forEach((step) => {
        gsap.fromTo(
          step,
          { opacity: 0.25, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 78%",
              end: "top 45%",
              scrub: 0.5,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="system"
      className="relative min-h-screen w-full bg-[#08080A] px-6 sm:px-10 md:px-20 py-28 md:py-36 border-t border-[#F4F2ED]/10 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>THE EXECUTION PROTOCOL // 09 STAGES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[0.9]">
              EVERY SHOW <br />
              HAS A SYSTEM.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-[#F4F2ED]/70 leading-relaxed">
              Nothing is left to chance. From CAD blueprints to timecoded show files and post-event data checksums, our protocol guarantees zero-failure execution.
            </p>
            <p className="mt-2 font-mono text-xs text-amber-400 uppercase tracking-widest">
              SYSTEMATIC · AUDITED · REPEATABLE
            </p>
          </div>
        </div>

        {/* Tracing Beam Vertical Timeline */}
        <div className="relative mt-16 md:mt-24 pl-6 sm:pl-12 md:pl-20">
          {/* Static track line */}
          <div className="absolute left-2 sm:left-4 md:left-6 top-0 bottom-0 w-[2px] bg-[#F4F2ED]/10" />

          {/* Glowing Animated Tracing Beam */}
          <div
            ref={beamRef}
            className="absolute left-2 sm:left-4 md:left-6 top-0 w-[2px] bg-gradient-to-b from-amber-400 via-yellow-200 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] origin-top will-change-transform"
          />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24">
            {workflowSteps.map((step: WorkflowStep) => (
              <div
                key={step.step}
                className="workflow-step-node relative group"
              >
                {/* Node Milestone Indicator */}
                <div className="absolute -left-[30px] sm:-left-[46px] md:-left-[70px] top-1.5 flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#08080A] border-2 border-amber-400/80 shadow-[0_0_14px_rgba(245,158,11,0.4)] group-hover:scale-125 transition-transform duration-300">
                  <span className="font-mono text-[10px] font-bold text-amber-400">
                    {step.step}
                  </span>
                </div>

                {/* Card Container */}
                <div className="rounded-xl bg-[#111114] border border-[#F4F2ED]/10 p-6 sm:p-8 md:p-10 transition-all duration-300 hover:border-amber-400/40 hover:bg-[#15151A]">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F4F2ED]/10">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400/80 mb-1">
                        <span>PHASE {step.step}</span>
                        <span className="text-[#F4F2ED]/30">/</span>
                        <span>{step.phase}</span>
                      </div>
                      <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#F4F2ED]">
                        {step.title}
                      </h3>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#F4F2ED]/15 bg-[#08080A] px-4 py-1.5 font-mono text-xs text-[#F4F2ED]/70">
                      <Shield className="h-3.5 w-3.5 text-amber-400" />
                      <span>{step.category}</span>
                    </div>
                  </div>

                  <p className="mt-6 text-sm sm:text-base text-[#F4F2ED]/80 font-light leading-relaxed max-w-3xl">
                    {step.description}
                  </p>

                  {/* Checklist & Deliverables */}
                  <div className="mt-6 pt-6 border-t border-[#F4F2ED]/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    <div className="md:col-span-8">
                      <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/50 mb-3">
                        EXECUTION CHECKLIST
                      </h4>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs text-[#F4F2ED]/75">
                        {step.checklist.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="md:col-span-4 rounded-lg bg-[#0A0A0C] border border-[#F4F2ED]/10 p-4">
                      <h4 className="font-mono text-[9px] uppercase tracking-widest text-amber-400 mb-1">
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
