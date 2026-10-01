import React, { useState, useEffect } from "react";
import { siteConfig } from "../../data/siteConfig";
import { X, Send, CheckCircle2 } from "lucide-react";
import { MagneticButton } from "../common/MagneticButton";

interface ProjectInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectInquiryModal({ isOpen, onClose }: ProjectInquiryModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    clientOrCompany: "",
    email: "",
    phone: "",
    eventType: "WEDDINGS",
    city: "Varanasi",
    date: "",
    estimatedScope: "FULL_PRODUCTION",
    notes: "",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 md:p-10 select-none animate-in fade-in duration-300"
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#0D0D11] border border-[#F4F2ED]/20 shadow-2xl p-6 sm:p-10 md:p-12 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#18181E] border border-[#F4F2ED]/20 text-[#F4F2ED] hover:bg-white hover:text-black transition-colors"
          aria-label="Close Inquiry Form"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-400/10 border border-emerald-400/40 text-emerald-400 mb-6">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="font-display font-black text-3xl uppercase tracking-tight text-[#F4F2ED]">
              DISPATCH BRIEF RECEIVED
            </h3>
            <p className="mt-3 text-sm text-[#F4F2ED]/70 max-w-md font-sans">
              Our technical direction desk in Varanasi will review venue parameters and power requirements, and contact you directly via phone / WhatsApp.
            </p>
            <div className="mt-8">
              <MagneticButton
                variant="primary"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="text-xs px-8 py-3.5"
              >
                CLOSE CONFIRMATION
              </MagneticButton>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#7C6ECD] mb-2">
              <span className="h-2 w-2 rounded-full bg-[#7C6ECD] animate-pulse" />
              <span>DIRECT DISPATCH DESK // PROJECT BRIEF</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#F4F2ED]">
              INITIATE PRODUCTION
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#F4F2ED]/60 font-sans">
              Provide technical scope parameters. We respond with initial gear manifest and technical feasibility within hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    CONTACT NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rohan Sharma"
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    CLIENT / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={formData.clientOrCompany}
                    onChange={(e) => setFormData({ ...formData, clientOrCompany: e.target.value })}
                    placeholder="e.g. Sharma Family / Acme Tech"
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    PHONE / WHATSAPP *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 90000 00000"
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    EMAIL ADDRESS *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@example.com"
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    PRODUCTION CATEGORY
                  </label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] focus:border-[#7C6ECD] focus:outline-none"
                  >
                    <option value="WEDDINGS">Weddings & Sangeet</option>
                    <option value="CORPORATE">Corporate Summit</option>
                    <option value="LIVE_MUSIC">Live Music / Festival</option>
                    <option value="CONFERENCE">Global Conference</option>
                    <option value="FASHION">Fashion Runway</option>
                    <option value="EXPO">Exhibition / Pavilion</option>
                    <option value="COMMERCIAL">Commercial Studio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    EVENT CITY / VENUE
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Bengaluru, Mumbai"
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                    TARGET DATE
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] focus:border-[#7C6ECD] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase tracking-wider text-[#F4F2ED]/50 mb-1.5">
                  TECHNICAL SCOPE & NOTES
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Mention required cameras, LED screen sizes, audio channel count, venue specs..."
                  className="w-full rounded-lg bg-[#14141A] border border-[#F4F2ED]/12 px-4 py-2.5 text-[#F4F2ED] placeholder:text-[#F4F2ED]/25 focus:border-[#7C6ECD] focus:outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-between">
                <span className="text-[10px] text-[#F4F2ED]/40">
                  DIRECT LINE: {siteConfig.contact.phone}
                </span>
                <MagneticButton
                  type="submit"
                  variant="primary"
                  className="text-xs px-7 py-3"
                >
                  <span>SUBMIT DISPATCH BRIEF</span>
                  <Send className="h-3.5 w-3.5" />
                </MagneticButton>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
