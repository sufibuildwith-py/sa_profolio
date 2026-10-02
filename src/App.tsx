import { useState } from 'react'
import { Navbar } from './components/navigation/Navbar'
import { Hero } from './components/hero/Hero'
import { Introduction } from './components/intro/Introduction'
import { ServicesSection } from './components/services/ServicesSection'
import { SelectedProductions } from './components/productions/SelectedProductions'
import { ProductionMarquee } from './components/marquee/ProductionMarquee'
import { ProcessSection } from './components/process/ProcessSection'
import { TechnicalCapability } from './components/technical/TechnicalCapability'
import { ContactSection } from './components/contact/ContactSection'
import { Footer } from './components/footer/Footer'
import { CustomCursor } from './components/ui/CustomCursor'
import { Preloader } from './components/ui/Preloader'
import { LayoutDebug } from './components/ui/LayoutDebug'
import { useLenis } from './hooks/useLenis'

export function App() {
  const [preloaderDone, setPreloaderDone] = useState(false)

  // Initialize unified Lenis smooth scrolling synchronized with GSAP
  useLenis()

  return (
    <div className="relative min-h-screen bg-[#F4F1E8] text-[#09090C] overflow-x-hidden selection:bg-[#7C6ECD] selection:text-white">
      {/* Real Media Readiness Preloader */}
      {!preloaderDone && <Preloader onComplete={() => setPreloaderDone(true)} />}

      {/* Temporary Layout Forensics Debug Overlay (activated via ?layoutDebug=1) */}
      <LayoutDebug />

      {/* Custom Desktop Cursor */}
      <CustomCursor />

      {/* Fixed Editorial Navigation */}
      <Navbar />

      {/* Main Continuous Visual Narrative */}
      <main id="main-content">
        {/* 01 — Hero Section (100svh inset container) */}
        <Hero />

        {/* 02 — Introduction Section (Asymmetric Philosophy) */}
        <Introduction />

        {/* 03 — Services & Capabilities (Numbered Technical List) */}
        <ServicesSection />

        {/* 05 — Selected Productions (Stacking Editorial Cards & Lightbox) */}
        <SelectedProductions />

        {/* 06 — Production Marquee (Dual Direction Scroll Ribbons) */}
        <ProductionMarquee />

        {/* 07 — Process & Delivery Workflow (7-Stage Physical Pipeline) */}
        <ProcessSection />

        {/* 08 — Technical Capability (Engineering Matrix & 3D Hardware) */}
        <TechnicalCapability />

        {/* 09 — Contact Section (Cinematic Conclusion & Inquiry Form) */}
        <ContactSection />
      </main>

      {/* 10 — Footer */}
      <Footer />
    </div>
  )
}

export default App
