import { useState } from "react";
import { equipmentArchive, equipmentCategories, type EquipmentItem } from "../../data/capabilities";
import { Cpu, HardDrive, ShieldAlert, Sparkles, Terminal } from "lucide-react";

export function ToolkitArchive() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeItemId, setActiveItemId] = useState<string>(equipmentArchive[0].id);

  const filteredItems =
    selectedCategory === "ALL"
      ? equipmentArchive
      : equipmentArchive.filter((item) => item.category === selectedCategory);

  const activeItem: EquipmentItem =
    equipmentArchive.find((item) => item.id === activeItemId) || equipmentArchive[0];

  return (
    <section
      id="toolkit"
      className="relative w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-20 md:py-28 border-t border-[#F4F2ED]/10 select-none"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#F4F2ED]/12">
          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              <span>CENTRAL DEPOT INVENTORY // SERIALIZED ASSETS</span>
            </div>
            <h2 className="font-display font-black text-[clamp(2rem,4.5vw,4.2rem)] uppercase tracking-tight text-[#F4F2ED] leading-tight">
              THE TOOLKIT.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="font-sans text-xs sm:text-sm text-[#F4F2ED]/70 leading-relaxed">
              Every asset is owned, serialized, firmware-locked, and flight-cased in our central Varanasi tech warehouse.
            </p>
            <p className="mt-1.5 font-mono text-[10px] sm:text-xs text-cyan-400 uppercase tracking-widest">
              ZERO SUB-RENTAL UNCERTAINTY
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
          {equipmentCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              data-cursor="VIEW"
              className={`shrink-0 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#F4F2ED] text-[#050505] font-bold shadow-[0_0_18px_rgba(244,242,237,0.25)]"
                  : "bg-[#111114] text-[#F4F2ED]/60 hover:text-[#F4F2ED] hover:bg-[#1a1a20] border border-[#F4F2ED]/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* 2-Column Hardware Inspector & Archive Deck */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Asset Selection Grid */}
          <div className="lg:col-span-7 space-y-2.5 max-h-[580px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredItems.map((item) => {
              const isSelected = item.id === activeItem.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  data-cursor="OPEN"
                  className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "bg-[#15151B] border-[#7C6ECD]/80 shadow-[0_0_20px_rgba(124,110,205,0.2)]"
                      : "bg-[#0B0B0D] border-[#F4F2ED]/8 hover:border-[#F4F2ED]/30 hover:bg-[#111114]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest mb-1.5">
                    <span className="text-[#7C6ECD] font-bold">{item.category}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#1a1a20] border border-[#F4F2ED]/10 text-[#F4F2ED]/70">
                      {item.tier}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-lg sm:text-xl text-[#F4F2ED] uppercase tracking-tight">
                    {item.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-[#F4F2ED]/60 line-clamp-1">
                    {item.spec}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Hardware Inspection Console */}
          <div className="lg:col-span-5 rounded-2xl bg-[#0E0E12] border border-[#F4F2ED]/15 p-5 sm:p-7 relative overflow-hidden shadow-2xl">
            {/* Ambient violet glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#7C6ECD]/8 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-[#F4F2ED]/10 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/60">
              <span className="flex items-center gap-2 text-emerald-400 text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                STATUS: {activeItem.operationalStatus}
              </span>
              <span className="font-mono text-[#F4F2ED]/40 text-[11px]">{activeItem.id.toUpperCase()}</span>
            </div>

            <div className="mt-5">
              <span className="font-mono text-[10px] text-[#7C6ECD] font-bold uppercase tracking-widest">
                [ SPECIFICATION REPORT ]
              </span>
              <h3 className="font-display font-black text-xl sm:text-2xl text-[#F4F2ED] uppercase tracking-tight mt-1">
                {activeItem.name}
              </h3>
            </div>

            {/* Technical Parameters */}
            <div className="mt-5 space-y-3 font-mono text-xs">
              <div className="rounded-lg bg-[#070709] border border-[#F4F2ED]/8 p-3">
                <div className="flex items-center gap-2 text-cyan-300 text-[10px] uppercase tracking-wider mb-1">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>CORE SPECIFICATIONS</span>
                </div>
                <p className="text-[#F4F2ED]/90 leading-relaxed text-xs">{activeItem.spec}</p>
              </div>

              <div className="rounded-lg bg-[#070709] border border-[#F4F2ED]/8 p-3">
                <div className="flex items-center gap-2 text-[#7C6ECD] text-[10px] uppercase tracking-wider mb-1">
                  <Terminal className="h-3.5 w-3.5" />
                  <span>OPERATIONAL APPLICATION</span>
                </div>
                <p className="text-[#F4F2ED]/80 leading-relaxed text-xs">{activeItem.application}</p>
              </div>
            </div>

            {/* Hardware Engineering Highlights */}
            <div className="mt-5 pt-5 border-t border-[#F4F2ED]/10">
              <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/50 mb-2.5 flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-[#7C6ECD]" />
                ENGINEERING HIGHLIGHTS
              </h4>
              <ul className="space-y-1.5 font-mono text-xs text-[#F4F2ED]/80">
                {activeItem.highlights.map((hl, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#7C6ECD]" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F4F2ED]/10 flex items-center justify-between font-mono text-[11px] text-[#F4F2ED]/50">
              <span className="flex items-center gap-1.5">
                <HardDrive className="h-3.5 w-3.5" />
                DEPOT VARANASI · BAY 04
              </span>
              <span className="flex items-center gap-1.5 text-indigo-300">
                <ShieldAlert className="h-3.5 w-3.5" />
                ANNUAL LOAD PASS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
