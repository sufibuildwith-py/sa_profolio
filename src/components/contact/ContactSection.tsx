import React, { useState } from 'react'
import { ArrowUpRight, MessageSquare, Mail, MapPin, Check } from 'lucide-react'
import { siteConfig } from '../../data/site'
import { MagneticButton } from '../ui/MagneticButton'
import { CardSpotlight } from '../ui/CardSpotlight'

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    eventType: 'Wedding & Heritage Celebration',
    date: '',
    venue: '',
    requirements: [] as string[],
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleRequirementToggle = (req: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements.includes(req)
        ? prev.requirements.filter((r) => r !== req)
        : [...prev.requirements, req],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Prepare formatted WhatsApp message
    const message = `*New Event Production Inquiry (SA Production)*%0A%0A*Name:* ${encodeURIComponent(
      formData.name
    )}%0A*Contact:* ${encodeURIComponent(formData.contact)}%0A*Event Type:* ${encodeURIComponent(
      formData.eventType
    )}%0A*Date / Timeline:* ${encodeURIComponent(formData.date || 'TBD')}%0A*Venue / Location:* ${encodeURIComponent(
      formData.venue || 'Varanasi'
    )}%0A*Requirements:* ${encodeURIComponent(
      formData.requirements.join(', ') || 'Complete Technical Production'
    )}%0A*Notes:* ${encodeURIComponent(formData.notes || 'None')}`

    if (siteConfig.contact.whatsappUrl) {
      const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${message}`
      window.open(whatsappUrl, '_blank')
    }
    setSubmitted(true)
  }

  return (
    <section
      id="contact"
      className="relative w-full py-14 sm:py-20 lg:py-24 px-5 sm:px-8 md:px-12 lg:px-16 bg-[#09090C] text-white"
      aria-label="Contact and Production Booking"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-hairline-dark pb-3">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
            <span className="text-[#7C6ECD] font-semibold">09</span>
            <span>// START A PRODUCTION</span>
          </div>
          <span className="font-mono text-[11px] text-[#7C6ECD] uppercase tracking-widest">
            Varanasi Production Desk
          </span>
        </div>

        {/* Cinematic Closing Statement */}
        <div className="mt-6 sm:mt-8 max-w-4xl">
          <h2 className="text-[clamp(2.2rem,5vw,4.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em] text-white">
            LET&apos;S BUILD <br />
            <span className="font-serif italic font-normal text-[#A49BE0] lowercase">
              the next
            </span>{' '}
            EXPERIENCE.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 font-light leading-relaxed max-w-2xl">
            Whether you are planning a high-profile corporate summit, an open-air live concert, or a luxury wedding celebration in Varanasi, let&apos;s engineer the physical environment together.
          </p>
        </div>

        {/* Contact Grid: Smoked Glass Direct Info + Glass Project Brief Form */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Direct Verified Contact Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <CardSpotlight className="rounded-2xl sm:rounded-3xl glass-dark-interactive p-5 sm:p-7 flex flex-col gap-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#7C6ECD]">
                Direct Contacts // Varanasi Desk
              </h3>

              <div className="flex flex-col gap-3.5">
                <a
                  href={siteConfig.contact.whatsappUrl || '#'}
                  target={siteConfig.contact.whatsappUrl ? '_blank' : undefined}
                  rel={siteConfig.contact.whatsappUrl ? 'noopener noreferrer' : undefined}
                  onClick={(e) => {
                    if (!siteConfig.contact.whatsappUrl) {
                      e.preventDefault()
                    }
                  }}
                  className="flex items-center justify-between group p-3.5 rounded-xl glass-dark hover:border-[#7C6ECD]/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                      <MessageSquare className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-white/50">
                        WhatsApp Production Desk
                      </span>
                      <span className="text-sm font-semibold text-white">
                        Chat on WhatsApp
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="flex items-center justify-between group p-3.5 rounded-xl glass-dark hover:border-[#7C6ECD]/60 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD]">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-white/50">
                        Official Inquiry Email
                      </span>
                      <span className="text-sm font-semibold text-white">
                        {siteConfig.contact.email}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <div className="flex items-start gap-3 p-3.5 rounded-xl glass-dark">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg glass-violet text-[#7C6ECD] shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-white/50">
                      Operations Base & Warehouse
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {siteConfig.contact.locationLabel}
                    </span>
                    <p className="mt-1 text-xs text-white/60 font-light">
                      Serving Varanasi, Prayagraj, Lucknow, and throughout Uttar Pradesh.
                    </p>
                  </div>
                </div>
              </div>
            </CardSpotlight>
          </div>

          {/* Right Column: Smoked Glass Project Brief Form */}
          <div className="lg:col-span-7">
            <CardSpotlight className="rounded-2xl sm:rounded-3xl glass-dark-interactive p-5 sm:p-8 shadow-2xl">
              <h3 className="text-lg sm:text-xl font-bold uppercase tracking-tight text-white">
                Submit a Project Brief
              </h3>
              <p className="mt-0.5 text-xs text-white/60 font-mono">
                Direct dispatch to our Varanasi technical director.
              </p>

              {submitted ? (
                <div className="mt-6 rounded-2xl glass-violet p-6 text-center">
                  <Check className="mx-auto h-7 w-7 text-white" />
                  <h4 className="mt-2 text-base font-bold text-white">Brief Dispatched</h4>
                  <p className="mt-1 text-xs text-white/80">
                    Your inquiry has been formatted and forwarded to our production desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                        Your Name / Organization *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Name or agency"
                        className="w-full rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7C6ECD] focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7C6ECD] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                        Event Category
                      </label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="w-full rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white focus:border-[#7C6ECD] focus:outline-none transition-colors"
                      >
                        <option value="Wedding & Heritage Celebration" className="bg-[#09090C] text-white">Wedding & Heritage Celebration</option>
                        <option value="Corporate Summit / Conference" className="bg-[#09090C] text-white">Corporate Summit / Conference</option>
                        <option value="Live Concert / Musical Festival" className="bg-[#09090C] text-white">Live Concert / Musical Festival</option>
                        <option value="Fashion Show / Catwalk" className="bg-[#09090C] text-white">Fashion Show / Catwalk</option>
                        <option value="Exhibition / Brand Expo" className="bg-[#09090C] text-white">Exhibition / Brand Expo</option>
                        <option value="Cultural / Traditional Production" className="bg-[#09090C] text-white">Cultural / Traditional Production</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                        Target Date & Venue (if known)
                      </label>
                      <input
                        type="text"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        placeholder="e.g. Nov 2026, Varanasi"
                        className="w-full rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7C6ECD] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Required Disciplines Multi-select */}
                  <div>
                    <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                      Required Technical Services:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['Sound / Line Array', 'Intelligent Lighting', 'Stage & Truss', 'LED Video Wall', 'Camera / IMAG', 'Complete Direction'].map(
                        (service) => {
                          const isSel = formData.requirements.includes(service)
                          return (
                            <button
                              key={service}
                              type="button"
                              onClick={() => handleRequirementToggle(service)}
                              className={`rounded-xl p-2.5 text-left text-xs font-mono transition-all ${
                                isSel
                                  ? 'glass-violet text-white'
                                  : 'glass-dark text-white/70 hover:border-white/30'
                              }`}
                            >
                              {isSel ? '✓ ' : '+ '}
                              {service}
                            </button>
                          )
                        }
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-white/60 uppercase tracking-wider mb-1.5">
                      Additional Notes or Spatial Details
                    </label>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Estimated audience size, indoor vs outdoor, special technical requirements..."
                      className="w-full rounded-xl glass-dark px-3.5 py-2.5 text-sm text-white placeholder-white/30 focus:border-[#7C6ECD] focus:outline-none transition-colors"
                    />
                  </div>

                  <MagneticButton
                    type="submit"
                    className="mt-1 h-12 w-full rounded-full glass-violet text-xs sm:text-sm font-semibold uppercase tracking-wider text-white hover:scale-101 transition-all shadow-lg"
                  >
                    <span>Send Brief to WhatsApp Desk</span>
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </MagneticButton>
                </form>
              )}
            </CardSpotlight>
          </div>
        </div>
      </div>
    </section>
  )
}
