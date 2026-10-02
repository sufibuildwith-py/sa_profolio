import React from 'react'
import { processWorkflow } from '../../data/process'

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="relative w-full py-10 sm:py-16 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24 bg-[#F4F1E8]"
      aria-label="How We Work — Production Workflow"
    >
      <div className="mx-auto w-full max-w-[1720px] 2xl:max-w-[1920px]">
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
        <div className="mt-6 sm:mt-8 mb-8 sm:mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-12 w-full">
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase tracking-tight text-[#09090C] leading-[1.05]">
              HOW WE ENGINEER <br />
              <span className="font-serif italic font-normal text-[#514691] lowercase">
                a flawless show
              </span>
            </h2>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-[#09090C]/70 font-light leading-relaxed max-w-xl lg:text-right">
            Live productions do not allow second takes. We adhere to a strict 7-phase physical engineering pipeline from the first spatial laser survey to final post-event load out.
          </p>
        </div>

        {/* 7-Phase Execution Workflow (Clean Non-interactive Editorial Layout) */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          {processWorkflow.map((step) => (
            <div
              key={step.step}
              className="rounded-xl sm:rounded-2xl glass-light border border-hairline p-4 sm:p-5 lg:p-6 transition-all duration-300 hover:border-[#7C6ECD]/40 hover:bg-[#FAF8F3]"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 lg:gap-8">
                {/* Step Meta & Title */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-5 lg:w-5/12 xl:w-4/12 shrink-0">
                  <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-[#7C6ECD]">
                    {step.step}
                  </span>
                  <div>
                    <span className="block text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-[#09090C]/50">
                      {step.stageName}
                    </span>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold uppercase tracking-tight text-[#09090C]">
                      {step.title}
                    </h3>
                  </div>
                </div>

                {/* 2-Line Description */}
                <div className="lg:w-7/12 xl:w-8/12">
                  <p className="text-xs sm:text-sm lg:text-[15px] text-[#09090C]/75 font-light leading-relaxed">
                    {step.action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
