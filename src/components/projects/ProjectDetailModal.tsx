import { useEffect } from "react";
import type { ProductionCaseStudy } from "../../data/productions";
import { X, Calendar, MapPin, Users, Wrench, Clock, CheckSquare } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

interface ProjectDetailModalProps {
  project: ProductionCaseStudy | null;
  onClose: () => void;
  onOpenProjectModal: () => void;
}

export function ProjectDetailModal({
  project,
  onClose,
  onOpenProjectModal,
}: ProjectDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0C0C0F] border border-[#F4F2ED]/20 shadow-2xl p-6 sm:p-10 md:p-12 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#171717] border border-[#F4F2ED]/20 text-[#F4F2ED] hover:bg-white hover:text-black transition-colors"
          aria-label="Close Project Modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Top Metadata */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-amber-400 uppercase tracking-widest mb-3">
          <span className="font-bold">PROD-{project.number}</span>
          <span className="text-[#F4F2ED]/20">/</span>
          <span>{project.category}</span>
          <span className="text-[#F4F2ED]/20">/</span>
          <span className="text-emerald-400">PRIORITY: {project.priority}</span>
        </div>

        <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl uppercase tracking-tight text-[#F4F2ED]">
          {project.title}
        </h2>

        {/* Location & Time Info */}
        <div className="mt-4 flex flex-wrap items-center gap-6 font-mono text-xs text-[#F4F2ED]/60 uppercase tracking-wider pb-6 border-b border-[#F4F2ED]/10">
          <span className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-amber-400" />
            {project.venue}, {project.location}
          </span>
          <span className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-cyan-400" />
            {project.date}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-slate-300" />
            {project.timeWindow}
          </span>
        </div>

        {/* Hero Cinematic Media Image */}
        <div className="relative mt-8 h-64 sm:h-96 w-full rounded-xl overflow-hidden border border-[#F4F2ED]/10">
          <img
            src={project.image}
            alt={project.imageAlt}
            className="h-full w-full object-cover grayscale-25 hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/90">
            <span>CLIENT: {project.client.toUpperCase()}</span>
            <span>SA EXECUTION ARCHIVE</span>
          </div>
        </div>

        {/* Production Narrative Summary */}
        <div className="mt-8">
          <h3 className="font-mono text-xs uppercase tracking-widest text-amber-400 mb-2">
            [ TECHNICAL SHOW DIRECTIVE ]
          </h3>
          <p className="text-base sm:text-lg text-[#F4F2ED]/90 font-light leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Hardware Breakdown & Operational Checklist */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-[#F4F2ED]/10">
          {/* Hardware Manifest */}
          <div className="rounded-xl bg-[#141418] border border-[#F4F2ED]/10 p-6">
            <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 mb-4">
              <Wrench className="h-4 w-4" />
              DEPLOYED HARDWARE RIG
            </h4>
            <div className="space-y-3 font-mono text-xs text-[#F4F2ED]/85">
              {Object.entries(project.equipmentBreakdown).map(([key, val]) => (
                <div key={key} className="flex flex-col gap-1 pb-2 border-b border-[#F4F2ED]/5">
                  <span className="text-[10px] uppercase text-[#F4F2ED]/40">{key}</span>
                  <span className="text-[#F4F2ED]/95">{val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Protocol Checklist */}
          <div className="rounded-xl bg-[#141418] border border-[#F4F2ED]/10 p-6">
            <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-emerald-400 mb-4">
              <CheckSquare className="h-4 w-4" />
              OPERATIONAL EXECUTION CHECKLIST
            </h4>
            <ul className="space-y-2.5 font-mono text-xs text-[#F4F2ED]/80">
              {project.operationalChecklist.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Crew Leads Roster */}
        <div className="mt-8 rounded-xl bg-[#101014] border border-[#F4F2ED]/10 p-6">
          <h4 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-amber-400 mb-4">
            <Users className="h-4 w-4" />
            ON-SITE CREW SUPERVISION
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {project.crewLeads.map((crew, idx) => (
              <div key={idx} className="rounded-lg bg-[#191920] p-3 border border-[#F4F2ED]/5 font-mono">
                <p className="text-xs text-[#F4F2ED] font-bold">{crew.name}</p>
                <p className="text-[10px] text-[#F4F2ED]/50 uppercase mt-0.5">{crew.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Footer */}
        <div className="mt-10 pt-6 border-t border-[#F4F2ED]/10 flex flex-wrap items-center justify-between gap-4">
          <span className="font-mono text-xs text-[#F4F2ED]/40 uppercase tracking-widest">
            PLANNING A SIMILAR PRODUCTION?
          </span>
          <div className="flex items-center gap-3">
            <MagneticButton
              variant="secondary"
              onClick={onClose}
              className="text-xs px-6 py-3"
            >
              CLOSE CASE STUDY
            </MagneticButton>
            <MagneticButton
              variant="primary"
              onClick={() => {
                onClose();
                onOpenProjectModal();
              }}
              className="text-xs px-6 py-3"
            >
              START THIS SPEC →
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}
