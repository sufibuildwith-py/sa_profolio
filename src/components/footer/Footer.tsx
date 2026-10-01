import { ArrowUp } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#030304] px-6 sm:px-10 md:px-20 pt-20 pb-12 border-t border-[#F4F2ED]/10 select-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Animated Accent Line */}
        <div className="relative h-px w-full bg-[#F4F2ED]/10 overflow-hidden mb-16">
          <div className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-[pulse_3s_ease-in-out_infinite]" />
        </div>

        {/* Top: Massive Brand Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-[#F4F2ED]/10">
          <div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-9xl tracking-tighter text-[#F4F2ED] uppercase leading-[0.85]">
              SA PRODUCTION
            </h2>
            <p className="mt-4 font-mono text-xs sm:text-sm tracking-[0.3em] text-[#F4F2ED]/50 uppercase">
              SOUND · LIGHT · STAGE · VISUALS · PRODUCTION
            </p>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="TOP"
            className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#F4F2ED]/60 hover:text-white transition-colors group"
          >
            <span>BACK TO TOP</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F4F2ED]/20 group-hover:border-[#F4F2ED] group-hover:bg-[#F4F2ED] group-hover:text-black transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Middle Navigation & Socials */}
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs uppercase tracking-widest">
          <div>
            <span className="text-[10px] text-[#F4F2ED]/40 block mb-4">DIRECT ACCESS</span>
            <ul className="space-y-3 text-[#F4F2ED]/75">
              <li>
                <a href="#productions" className="hover:text-amber-400 transition-colors">
                  01 // SELECTED WORK
                </a>
              </li>
              <li>
                <a href="#worlds" className="hover:text-amber-400 transition-colors">
                  02 // PRODUCTION WORLDS
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors">
                  03 // CORE CAPABILITIES
                </a>
              </li>
              <li>
                <a href="#system" className="hover:text-amber-400 transition-colors">
                  04 // EXECUTION SYSTEM
                </a>
              </li>
              <li>
                <a href="#toolkit" className="hover:text-amber-400 transition-colors">
                  05 // DEPOT TOOLKIT
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-[#F4F2ED]/40 block mb-4">HEADQUARTERS</span>
            <p className="text-[#F4F2ED]/80 leading-relaxed normal-case">
              {siteConfig.headquarters.hub}
              <br />
              {siteConfig.headquarters.address}
              <br />
              <span className="font-mono text-[10px] text-amber-400 uppercase">
                {siteConfig.headquarters.coordinates}
              </span>
            </p>
          </div>

          <div>
            <span className="text-[10px] text-[#F4F2ED]/40 block mb-4">COMMUNICATIONS</span>
            <ul className="space-y-2.5 text-[#F4F2ED]/75 normal-case">
              <li>{siteConfig.contact.phone}</li>
              <li>{siteConfig.contact.email}</li>
              <li>{siteConfig.contact.dispatchDesk}</li>
            </ul>
          </div>

          <div>
            <span className="text-[10px] text-[#F4F2ED]/40 block mb-4">CHANNELS</span>
            <ul className="space-y-3 text-[#F4F2ED]/75">
              <li>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WHATSAPP DIRECT ↗
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  YOUTUBE REEL ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 border-t border-[#F4F2ED]/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/40">
          <span>
            © {new Date().getFullYear()} SA PRODUCTION. ALL RIGHTS RESERVED.
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            ZERO-FAILURE EVENT PRODUCTION ARCHITECTURE
          </span>
        </div>
      </div>
    </footer>
  );
}
