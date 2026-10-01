interface MicroInteractionProps {
  type: "sound" | "lighting" | "stage" | "led" | "camera" | "production";
}

export function ServiceMicroInteractions({ type }: MicroInteractionProps) {
  if (type === "sound") {
    // Waveform motion and frequency spectrum lines
    return (
      <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-3 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between font-mono text-[9px] text-amber-400">
          <span>RTA 96kHz</span>
          <span className="animate-pulse">0.0 dB</span>
        </div>
        <div className="flex items-end justify-between h-14 gap-1 px-1">
          {[40, 65, 85, 95, 70, 50, 80, 100, 60, 45, 90, 75, 55, 30].map((h, i) => (
            <div
              key={i}
              className="w-1.5 bg-gradient-to-t from-amber-500/30 to-amber-400 rounded-t-xs animate-pulse"
              style={{
                height: `${h}%`,
                animationDelay: `${(i % 5) * 0.15}s`,
                animationDuration: "0.8s",
              }}
            />
          ))}
        </div>
        <div className="font-mono text-[8px] text-[#F4F2ED]/40 flex justify-between">
          <span>20Hz</span>
          <span>1kHz</span>
          <span>20kHz</span>
        </div>
      </div>
    );
  }

  if (type === "lighting") {
    // Moving light beams & stage illumination
    return (
      <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-3 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between font-mono text-[9px] text-amber-300">
          <span>DMX 512</span>
          <span>CH 1–64</span>
        </div>
        <div className="relative h-14 w-full flex items-center justify-center overflow-hidden">
          <div className="absolute top-0 w-12 h-16 bg-gradient-to-b from-amber-400/80 via-amber-300/20 to-transparent rotate-[-22deg] origin-top blur-xs animate-pulse" />
          <div className="absolute top-0 w-12 h-16 bg-gradient-to-b from-cyan-400/80 via-cyan-300/20 to-transparent rotate-[22deg] origin-top blur-xs animate-pulse" />
          <div className="absolute bottom-1 h-1.5 w-20 rounded-full bg-amber-400/40 blur-xs" />
        </div>
        <div className="font-mono text-[8px] text-[#F4F2ED]/40 text-center">
          BEAM ANGLE: 2.2° // TIME-SYNC
        </div>
      </div>
    );
  }

  if (type === "stage") {
    // Heavy aluminum truss geometry & load-rated structural lines
    return (
      <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-3 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between font-mono text-[9px] text-slate-300">
          <span>TRUSS 400MM</span>
          <span className="text-emerald-400">12 kN SAFE</span>
        </div>
        <div className="relative h-14 w-full flex items-center justify-center">
          <svg className="w-36 h-12 stroke-[#F4F2ED]/70 fill-none" viewBox="0 0 144 48">
            <line x1="0" y1="8" x2="144" y2="8" strokeWidth="2" />
            <line x1="0" y1="40" x2="144" y2="40" strokeWidth="2" />
            <line x1="0" y1="8" x2="24" y2="40" strokeWidth="1.2" />
            <line x1="24" y1="40" x2="48" y2="8" strokeWidth="1.2" />
            <line x1="48" y1="8" x2="72" y2="40" strokeWidth="1.2" />
            <line x1="72" y1="40" x2="96" y2="8" strokeWidth="1.2" />
            <line x1="96" y1="8" x2="120" y2="40" strokeWidth="1.2" />
            <line x1="120" y1="40" x2="144" y2="8" strokeWidth="1.2" />
          </svg>
        </div>
        <div className="font-mono text-[8px] text-[#F4F2ED]/40 text-center">
          EN AW 6082 T6 ALLOY
        </div>
      </div>
    );
  }

  if (type === "led") {
    // Pixel grid and LED panel test pattern
    return (
      <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-3 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between font-mono text-[9px] text-cyan-400">
          <span>P2.6 LED</span>
          <span>7680Hz</span>
        </div>
        <div className="grid grid-cols-8 gap-1 h-12 w-full p-1 bg-black/40 border border-[#F4F2ED]/10 rounded-xs">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className={`rounded-[1px] transition-colors duration-500 ${
                i % 3 === 0
                  ? "bg-cyan-400/90"
                  : i % 4 === 0
                  ? "bg-amber-400/90"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>
        <div className="font-mono text-[8px] text-[#F4F2ED]/40 text-center">
          NOVASIGNAL 4K // 60P
        </div>
      </div>
    );
  }

  if (type === "camera") {
    // Viewfinder overlay with REC indicator
    return (
      <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-2.5 flex flex-col justify-between overflow-hidden font-mono">
        <div className="flex items-center justify-between text-[9px]">
          <span className="flex items-center gap-1.5 text-red-500 font-bold">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
            REC
          </span>
          <span className="text-[#F4F2ED]/70">01:24:59:18</span>
        </div>
        <div className="relative flex items-center justify-center h-12">
          {/* Viewfinder crosshairs */}
          <div className="h-4 w-4 border-t border-l border-white/70 absolute -top-0 -left-0" />
          <div className="h-4 w-4 border-t border-r border-white/70 absolute -top-0 -right-0" />
          <div className="h-4 w-4 border-b border-l border-white/70 absolute -bottom-0 -left-0" />
          <div className="h-4 w-4 border-b border-r border-white/70 absolute -bottom-0 -right-0" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/60" />
        </div>
        <div className="flex items-center justify-between text-[8px] text-[#F4F2ED]/50">
          <span>4K 10-BIT</span>
          <span>ISO 800</span>
          <span>5600K</span>
        </div>
      </div>
    );
  }

  // Complete Production
  return (
    <div className="relative h-28 w-44 rounded-lg bg-black/60 border border-[#F4F2ED]/15 p-2.5 flex flex-col justify-between overflow-hidden font-mono text-[9px]">
      <div className="flex items-center justify-between text-emerald-400">
        <span>SHOW CONTROL</span>
        <span className="animate-pulse">LOCK</span>
      </div>
      <div className="flex flex-col gap-1 text-[8px] text-[#F4F2ED]/70">
        <div className="flex justify-between">
          <span>AUDIO CHANNELS:</span>
          <span className="text-white">64 ACTIVE</span>
        </div>
        <div className="flex justify-between">
          <span>LIGHTING CUE:</span>
          <span className="text-amber-300">CUE 48.2</span>
        </div>
        <div className="flex justify-between">
          <span>COMMS INTERCOM:</span>
          <span className="text-cyan-300">DIR // STAGE</span>
        </div>
      </div>
      <div className="text-[8px] text-[#F4F2ED]/40 text-center">
        MASTER CLOCK // 00:00:00:00
      </div>
    </div>
  );
}
