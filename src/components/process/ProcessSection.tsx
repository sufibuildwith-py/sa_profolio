import React, { useState } from 'react'
import { processWorkflow } from '../../data/process'
import { CheckCircle, ChevronRight } from 'lucide-react'
import { CardSpotlight } from '../ui/CardSpotlight'

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="process"
      className="relative w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#F4F1E8]"
      aria-label="How We Work — Production Workflow"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-[#09090C]/50">
            <span className="text-[#7C6ECD] font-semibold">07</span>
            <span>// EXECUTION METHODOLOGY</span>
          </div>
          <span className="font-mono text-[11px] text-[#09090C]/40 uppercase tracking-widest hidden sm:inline-block">
            7-Phase Delivery Architecture
          </span>
        </div>

        {/* Section Headline */}
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#09090C]">
            HOW WE ENGINEER <br />
            <span className="font-serif italic font-normal text-[#514691] lowercase">
              a flawless show
            </span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#09090C]/70 font-light leading-relaxed">
            Live productions do not allow second takes. We adhere to a strict 7-phase physical engineering pipeline from the first spatial laser survey to final post-event load out.
          </p>
        </div>

        {/* Interactive Step Navigator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* Step Selector List in Frosted Glass */}
          <div className="lg:col-span-5 flex flex-col gap-2">
            {processWorkflow.map((step, idx) => {
              const isSelected = activeStep === idx

              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStep(idx)}
                  className={`flex w-full items-center justify-between rounded-xl p-3.5 sm:p-4 text-left transition-all duration-300 ${
                    isSelected
                      ? 'glass-light-interactive border-[#7C6ECD]/50 shadow-md translate-x-1'
                      : 'glass-light hover:border-[#7C6ECD]/30'
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <span
                      className={`font-mono text-xs font-bold tracking-widest ${
                        isSelected ? 'text-[#7C6ECD]' : 'text-[#09090C]/40'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div>
                      <span className="block text-[11px] font-mono tracking-wider uppercase text-[#09090C]/50">
                        {step.stageName}
                      </span>
                      <span
                        className={`text-sm sm:text-base font-bold uppercase tracking-tight ${
                          isSelected ? 'text-[#09090C]' : 'text-[#09090C]/70'
                        }`}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>

                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${
                      isSelected ? 'text-[#7C6ECD] translate-x-1' : 'text-[#09090C]/20'
                    }`}
                  />
                </button>
              )
            })}
          </div>

          {/* Active Step Detailed Card — Frosted Production Document Glass Card with CardSpotlight */}
          <div className="lg:col-span-7">
            <CardSpotlight className="relative overflow-hidden rounded-2xl sm:rounded-3xl glass-light-interactive p-6 sm:p-8 md:p-10 shadow-xl">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <span className="font-mono text-xs font-bold tracking-widest text-[#7C6ECD]">
                  PHASE // {processWorkflow[activeStep].step}
                </span>
                <span className="rounded-full glass-violet px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#7C6ECD]">
                  {processWorkflow[activeStep].stageName}
                </span>
              </div>

              <h3 className="mt-5 text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-tight text-[#09090C]">
                {processWorkflow[activeStep].title}
              </h3>

              <p className="mt-3 text-xs sm:text-sm md:text-base leading-relaxed text-[#09090C]/80 font-light">
                {processWorkflow[activeStep].action}
              </p>

              {/* Execution Checklist */}
              <div className="mt-6 flex flex-col gap-2.5">
                <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#7C6ECD]">
                  Key Technical Milestones:
                </span>
                {processWorkflow[activeStep].details.map((detail, dIdx) => (
                  <div
                    key={dIdx}
                    className="flex items-start gap-2.5 rounded-xl glass-light p-3 border border-hairline"
                  >
                    <CheckCircle className="h-4 w-4 text-[#7C6ECD] shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-[#09090C]/85 font-light">{detail}</span>
                  </div>
                ))}
              </div>

              {/* Verified Deliverable */}
              <div className="mt-6 rounded-xl glass-dark p-3.5 sm:p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/60">
                  Target Deliverable:
                </span>
                <span className="font-mono text-xs font-semibold text-[#A49BE0]">
                  {processWorkflow[activeStep].deliverable}
                </span>
              </div>
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  )
}
