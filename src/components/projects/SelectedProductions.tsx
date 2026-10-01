import { useState } from "react";
import { selectedProductions, allProductionCategories, type ProductionCaseStudy } from "../../data/productions";
import { ProjectDetailModal } from "./ProjectDetailModal";
import { ArrowUpRight, Calendar, MapPin, Radio, Wrench } from "lucide-react";

interface SelectedProductionsProps {
  onOpenProjectModal: () => void;
}

export function SelectedProductions({ onOpenProjectModal }: SelectedProductionsProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("ALL");
  const [activeProject, setActiveProject] = useState<ProductionCaseStudy | null>(null);

  const filteredProjects =
    selectedFilter === "ALL"
      ? selectedProductions
      : selectedProductions.filter((p) => p.category === selectedFilter);

  return (
    <section
      id="productions"
      className="relative min-h-screen w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-28 md:py-36 border-t border-[#F4F2ED]/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-3">
              <span className="h-2 w-2 rounded-full bg-[#E10600]" />
              <span>VERIFIED CASE STUDIES // PAN-INDIA DEPLOYMENTS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-8xl uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[0.9]">
              SELECTED <br />
              PRODUCTIONS.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-sm sm:text-base text-[#F4F2ED]/70 leading-relaxed">
              Every production is a complex orchestration of timing, power, acoustics, and optics. Review real equipment deployments and operational workflows.
            </p>
            <p className="mt-2 font-mono text-xs text-[#E10600] uppercase tracking-widest">
              50+ PRODUCTION ARCHIVE RECORDS
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {allProductionCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              data-cursor="VIEW"
              className={`shrink-0 px-5 py-2.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedFilter === cat
                  ? "bg-[#F4F2ED] text-[#050505] font-bold shadow-[0_0_20px_rgba(244,242,237,0.2)]"
                  : "bg-[#111114] text-[#F4F2ED]/60 hover:text-[#F4F2ED] hover:bg-[#1c1c22] border border-[#F4F2ED]/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Stacking / Sticky Case Study Cards Grid */}
        <div className="mt-12 space-y-12 md:space-y-16">
          {filteredProjects.map((project: ProductionCaseStudy, index: number) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor="OPEN"
              className="group relative rounded-2xl bg-[#0D0D11] border border-[#F4F2ED]/12 overflow-hidden transition-all duration-500 hover:border-[#E10600]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.8)] cursor-pointer"
              style={{
                top: `${index * 12}px`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Project Narrative & Specs */}
                <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-6">
                      <span className="text-[#E10600] font-bold">
                        {project.number} / {project.category}
                      </span>
                      <span className="flex items-center gap-2">
                        <Radio className="h-3.5 w-3.5 text-emerald-400" />
                        LIVE ARCHIVE
                      </span>
                    </div>

                    <h3 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-[#F4F2ED] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-xs text-[#F4F2ED]/60 uppercase">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#E10600]" />
                        {project.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                        {project.date}
                      </span>
                    </div>

                    <p className="mt-6 text-sm sm:text-base text-[#F4F2ED]/75 font-light leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Rig Hardware Badge & Execution Flow */}
                  <div className="mt-8 pt-6 border-t border-[#F4F2ED]/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider mb-2">
                      <Wrench className="h-3.5 w-3.5" />
                      <span>{project.equipmentSummary}</span>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <span className="font-mono text-xs text-[#F4F2ED]/50 group-hover:text-[#E10600] transition-colors">
                        VIEW FULL TECHNICAL BREAKDOWN →
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#181820] text-[#F4F2ED] group-hover:bg-[#F4F2ED] group-hover:text-black transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Cinematic Imagery Viewport */}
                <div className="lg:col-span-6 relative min-h-[340px] sm:min-h-[440px] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-transparent to-transparent opacity-80 lg:opacity-0 group-hover:opacity-40 transition-opacity" />

                  {/* Overlaid Venue Stamp */}
                  <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xs border border-white/15 text-white">
                    {project.venue.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Lightbox */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onOpenProjectModal={onOpenProjectModal}
      />
    </section>
  );
}
