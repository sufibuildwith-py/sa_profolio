import { ArrowUpRight, MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { MagneticButton } from "../common/MagneticButton";

interface ContactSectionProps {
  onOpenProjectModal: () => void;
}

export function ContactSection({ onOpenProjectModal }: ContactSectionProps) {
  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}?text=Hello%20SA%20Production,%20we%20have%20an%20upcoming%20event%20and%20would%20like%20to%20discuss%20technical%20production.`;

  return (
    <section
      id="contact"
      className="relative w-full bg-[#050505] px-6 sm:px-10 md:px-20 py-20 md:py-28 border-t border-[#F4F2ED]/10 select-none flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full my-auto">
        <div className="flex items-center gap-3 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-[#F4F2ED]/50 mb-6">
          <span className="h-2 w-2 rounded-full bg-[#7C6ECD]" />
          <span>PRODUCTION COMMISSIONS // INITIATE DIRECT</span>
        </div>

        {/* Editorial Headline */}
        <h2 className="font-display font-black text-[clamp(2.2rem,5.5vw,5.5rem)] uppercase tracking-[-0.03em] text-[#F4F2ED] leading-[0.92]">
          HAVE A SHOW <br />
          IN MIND? <br />
          <span className="font-serif italic font-normal text-[#7C6ECD]">
            Let's Build It.
          </span>
        </h2>

        {/* Primary Action Buttons */}
        <div className="mt-8 md:mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton
            variant="primary"
            onClick={onOpenProjectModal}
            className="text-xs sm:text-sm px-8 sm:px-10 py-4 sm:py-4.5"
            cursorLabel="START"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="h-4 w-4" />
          </MagneticButton>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="CHAT"
          >
            <MagneticButton
              variant="secondary"
              className="text-xs sm:text-sm px-8 sm:px-10 py-4 sm:py-4.5"
            >
              <MessageSquare className="h-4 w-4 text-emerald-400" />
              <span>WHATSAPP DISPATCH</span>
            </MagneticButton>
          </a>
        </div>

        {/* Centralized Contact Information Grid */}
        <div className="mt-14 pt-10 border-t border-[#F4F2ED]/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#F4F2ED]/40 block mb-1.5">
              CENTRAL DISPATCH
            </span>
            <a
              href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
              className="text-sm sm:text-base text-[#F4F2ED] hover:text-[#7C6ECD] transition-colors flex items-center gap-2"
            >
              <Phone className="h-4 w-4 text-[#7C6ECD]" />
              {siteConfig.contact.phone}
            </a>
            <span className="text-[10px] text-[#F4F2ED]/40 mt-1 block">
              24/7 Production Lead Desk
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#F4F2ED]/40 block mb-1.5">
              PRODUCTION INQUIRIES
            </span>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="text-sm sm:text-base text-[#F4F2ED] hover:text-cyan-400 transition-colors flex items-center gap-2"
            >
              <Mail className="h-4 w-4 text-cyan-400" />
              {siteConfig.contact.email}
            </a>
            <span className="text-[10px] text-[#F4F2ED]/40 mt-1 block">
              Riders, RFPs & Schematics
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#F4F2ED]/40 block mb-1.5">
              HEADQUARTERS & DEPOT
            </span>
            <div className="text-xs sm:text-sm text-[#F4F2ED]/85 flex items-start gap-2">
              <MapPin className="h-4 w-4 text-[#7C6ECD] shrink-0 mt-0.5" />
              <span>{siteConfig.headquarters.hub}, {siteConfig.headquarters.city}</span>
            </div>
            <span className="text-[10px] text-[#F4F2ED]/40 mt-1 block">
              {siteConfig.headquarters.coordinates}
            </span>
          </div>

          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#F4F2ED]/40 block mb-1.5">
              TERRITORY
            </span>
            <span className="text-xs sm:text-sm text-[#F4F2ED]/90 block">
              PAN-INDIA MOBILIZATION
            </span>
            <span className="text-[10px] text-[#F4F2ED]/40 mt-1 block">
              Fleet Transport & Air Freight Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
