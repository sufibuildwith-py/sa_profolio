import { useState } from "react";
import { useLenis } from "./hooks/useLenis";
import { CustomCursor } from "./components/common/CustomCursor";
import { Preloader } from "./components/common/Preloader";
import { Navbar } from "./components/navigation/Navbar";
import { Hero } from "./components/hero/Hero";
import { IntroStatement } from "./components/intro/IntroStatement";
import { ProductionWorlds } from "./components/worlds/ProductionWorlds";
import { ServicesSection } from "./components/services/ServicesSection";
import { WorkflowTimeline } from "./components/workflow/WorkflowTimeline";
import { ToolkitArchive } from "./components/archive/ToolkitArchive";
import { SelectedProductions } from "./components/projects/SelectedProductions";
import { ProductionMarquee } from "./components/marquee/ProductionMarquee";
import { OperationalScale } from "./components/scale/OperationalScale";
import { ContactSection } from "./components/contact/ContactSection";
import { ProjectInquiryModal } from "./components/contact/ProjectInquiryModal";
import { Footer } from "./components/footer/Footer";

export function App() {
  const [assetProgress, setAssetProgress] = useState(15);
  const [isAssetLoaded, setIsAssetLoaded] = useState(false);
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [projectModalOpen, setProjectModalOpen] = useState(false);

  // Initialize smooth scrolling with Lenis + GSAP ScrollTrigger sync
  useLenis(true);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-[#F4F2ED] antialiased overflow-x-hidden selection:bg-[#F4F2ED] selection:text-[#050505]">
      {/* Subtle Cinematic Film Grain Texture */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Desktop Custom Lerping Cursor */}
      <CustomCursor />

      {/* Preloader with genuine 3D asset progress */}
      {!isIntroComplete && (
        <Preloader
          progress={assetProgress}
          isReady={isAssetLoaded}
          onComplete={() => setIsIntroComplete(true)}
        />
      )}

      {/* Floating Dynamic Navbar */}
      <Navbar onOpenProjectModal={() => setProjectModalOpen(true)} />

      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section with Real 3D Production Asset & Cinematic Camera Choreography */}
        <Hero
          onOpenProjectModal={() => setProjectModalOpen(true)}
          isReady={isIntroComplete}
          onAssetProgress={(p) => setAssetProgress(p)}
          onAssetLoaded={() => setIsAssetLoaded(true)}
        />

        {/* Intro Statement: "We don't just show up. We set the whole thing in motion." */}
        <IntroStatement />

        {/* Production Worlds: 8 Disciplines */}
        <ProductionWorlds />

        {/* Services Section with Micro-Interactions */}
        <ServicesSection />

        {/* Execution Workflow with Tracing Beam */}
        <WorkflowTimeline />

        {/* The Toolkit: Hardware Archive & Inspection Console */}
        <ToolkitArchive />

        {/* Selected Work: Stacking Case Studies */}
        <SelectedProductions
          onOpenProjectModal={() => setProjectModalOpen(true)}
        />

        {/* Kinetic Production Marquee */}
        <ProductionMarquee />

        {/* Operational Scale & Verified Metrics */}
        <OperationalScale />

        {/* Contact & Final CTA */}
        <ContactSection onOpenProjectModal={() => setProjectModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Inquiry Modal */}
      <ProjectInquiryModal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </div>
  );
}

export default App;
