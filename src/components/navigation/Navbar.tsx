import { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "../../data/siteConfig";
import { MagneticButton } from "../common/MagneticButton";

interface NavbarProps {
  onOpenProjectModal: () => void;
}

export function Navbar({ onOpenProjectModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "WORK", href: "#productions" },
    { label: "WORLDS", href: "#worlds" },
    { label: "SERVICES", href: "#services" },
    { label: "SYSTEM", href: "#system" },
    { label: "TOOLKIT", href: "#toolkit" },
    { label: "ABOUT", href: "#about" },
    { label: "CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 flex justify-center px-4 sm:px-6 md:px-8 ${
          scrolled ? "pt-4" : "pt-6 md:pt-8"
        }`}
      >
        <nav
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "w-full max-w-5xl rounded-full bg-[#0A0A0A]/80 backdrop-blur-md border border-[#F4F2ED]/12 px-6 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
              : "w-full max-w-7xl px-2 py-2 bg-transparent border-transparent"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-[#F4F2ED] group select-none"
            data-cursor="TOP"
          >
            <span className="flex h-3 w-3 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-amber-400 group-hover:scale-125 transition-transform" />
            </span>
            <span className="font-display font-black tracking-tight text-lg md:text-xl uppercase">
              SA PRODUCTION
            </span>
            <span className="hidden lg:inline-block font-mono text-[9px] uppercase tracking-widest text-[#F4F2ED]/40 border-l border-[#F4F2ED]/15 pl-2.5">
              EST. KANPUR
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 font-mono text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#F4F2ED]/70 hover:text-[#F4F2ED] transition-colors relative py-1 hover:border-b border-[#F4F2ED]/60"
                data-cursor="VIEW"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Action Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <MagneticButton
              variant="primary"
              onClick={onOpenProjectModal}
              className="hidden sm:inline-flex text-[11px] px-5 py-2.5"
              cursorLabel="START"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-[#171717] border border-[#F4F2ED]/15 text-[#F4F2ED] hover:bg-[#222]"
              aria-label="Open Navigation Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1000] flex flex-col justify-between bg-[#050505] p-8 md:hidden select-none animate-in fade-in duration-300">
          <div className="flex items-center justify-between border-b border-[#F4F2ED]/10 pb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="font-display font-black tracking-tight text-xl text-[#F4F2ED]">
                SA PRODUCTION
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[#F4F2ED]/20 text-[#F4F2ED] hover:bg-[#171717]"
              aria-label="Close Navigation Menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Large Staggered Links */}
          <div className="my-auto flex flex-col gap-6 py-8">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-baseline justify-between border-b border-[#F4F2ED]/10 pb-4 text-3xl font-display font-black tracking-tight text-[#F4F2ED]/85 hover:text-white"
              >
                <span>{link.label}</span>
                <span className="font-mono text-xs text-[#F4F2ED]/40">
                  0{idx + 1}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-5 pt-6 border-t border-[#F4F2ED]/10">
            <MagneticButton
              variant="primary"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectModal();
              }}
              className="w-full py-4 text-center justify-center"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="h-4 w-4" />
            </MagneticButton>
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[#F4F2ED]/40">
              <span>{siteConfig.established}</span>
              <span>{siteConfig.contact.phone}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
