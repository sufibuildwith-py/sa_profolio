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
      className="relative w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-20 md:py-28 border-t border-[#F4F2ED]/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-[#7C6ECD]" />
              <span>VERIFIED CASE STUDIES // PAN-INDIA DEPLOYMENTS</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,4.2rem)] uppercase tracking-tight text-[#F4F2ED] leading-tight">
              SELECTED <br />
              PRODUCTIONS.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-[#F4F2ED]/70 leading-relaxed">
              Every production is a complex orchestration of timing, power, acoustics, and optics. Review real equipment deployments and operational workflows.
            </p>
            <p className="mt-1.5 font-mono text-[10px] sm:text-xs text-[#7C6ECD] uppercase tracking-widest">
              50+ PRODUCTION ARCHIVE RECORDS
            </p>
          </div>
        </div>

        {/* Filter Navigation */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {allProductionCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              data-cursor="VIEW"
              className={`shrink-0 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
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
        <div className="mt-10 space-y-8 md:space-y-12">
          {filteredProjects.map((project: ProductionCaseStudy, index: number) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              data-cursor="OPEN"
              className="group relative rounded-2xl bg-[#0D0D11] border border-[#F4F2ED]/12 overflow-hidden transition-all duration-300 hover:border-[#7C6ECD]/50 hover:shadow-[0_16px_36px_rgba(0,0,0,0.8)] cursor-pointer"
              style={{
                top: `${index * 8}px`,
              }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                {/* Left: Project Narrative & Specs */}
                <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-4">
                      <span className="text-[#7C6ECD] font-bold">
                        {project.number} / {project.category}
                      </span>
                      <span className="flex items-center gap-2">
                        <Radio className="h-3.5 w-3.5 text-emerald-400" />
                        LIVE ARCHIVE
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#F4F2ED] group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-[#F4F2ED]/60 uppercase">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#7C6ECD]" />
                        {project.location}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-cyan-400" />
                        {project.date}
                      </span>
                    </div>

                    <p className="mt-4 text-xs sm:text-sm text-[#F4F2ED]/75 font-light leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Rig Hardware Badge & Execution Flow */}
                  <div className="mt-6 pt-5 border-t border-[#F4F2ED]/10">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#7C6ECD] uppercase tracking-wider mb-2">
                      <Wrench className="h-3.5 w-3.5" />
                      <span>{project.equipmentSummary}</span>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-mono text-xs text-[#F4F2ED]/50 group-hover:text-[#7C6ECD] transition-colors">
                        VIEW FULL TECHNICAL BREAKDOWN →
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#181820] text-[#F4F2ED] group-hover:bg-[#F4F2ED] group-hover:text-black transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Cinematic Imagery Viewport */}
                <div className="lg:col-span-6 relative min-h-[260px] sm:min-h-[340px] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    className="h-full w-full object-cover grayscale-30 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D11] via-transparent to-transparent opacity-80 lg:opacity-0 group-hover:opacity-40 transition-opacity" />

                  {/* Overlaid Venue Stamp */}
                  <div className="absolute top-4 right-4 font-mono text-[9px] uppercase tracking-widest px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs border border-white/15 text-white">
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
