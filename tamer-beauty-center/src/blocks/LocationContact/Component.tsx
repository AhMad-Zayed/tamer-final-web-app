'use client'
import React from 'react'
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react'

export const LocationContactComponent: React.FC<any> = ({ 
  heading, 
  locationTitle, locationText, 
  contactTitle, contactText, 
  hoursTitle, weekdaysText, weekdaysHours, fridayText, fridayHours,
  mapEmbedUrl
}) => {
  return (
    <section className="py-16 md:py-24 bg-[#050505] border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 tracking-tight text-white text-center drop-shadow-md">
          {heading}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mx-auto">
          <div className="bg-[#0a0a0a]/80 backdrop-blur-md p-8 md:p-12 rounded-[2rem] border border-white/5 shadow-xl space-y-10">
            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <MapPin className="text-[#c3f400]" size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{locationTitle}</h3>
                <p className="text-neutral-400 text-sm md:text-base font-medium leading-relaxed">{locationText}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Phone className="text-[#c3f400]" size={24} strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">{contactTitle}</h3>
                <p className="text-neutral-400 text-sm md:text-base font-medium leading-relaxed" dir="ltr">{contactText}</p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                <Clock className="text-[#c3f400]" size={24} strokeWidth={2} />
              </div>
              <div className="w-full">
                <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{hoursTitle}</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-neutral-400 text-sm md:text-base font-medium border-b border-white/5 pb-3">
                    <span>{weekdaysText}</span>
                    <span className="font-semibold text-white">{weekdaysHours}</span>
                  </div>
                  <div className="flex justify-between items-center text-neutral-400 text-sm md:text-base font-medium">
                    <span>{fridayText}</span>
                    <span className="font-semibold text-red-400">{fridayHours}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex gap-4">
              <button className="flex-1 py-3.5 bg-white/5 hover:bg-[#c3f400] hover:text-black text-white rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold text-sm">
                <Instagram size={18} /> Instagram
              </button>
              <button className="flex-1 py-3.5 bg-white/5 hover:bg-[#c3f400] hover:text-black text-white rounded-xl flex items-center justify-center gap-2 transition-colors font-semibold text-sm">
                <Facebook size={18} /> Facebook
              </button>
            </div>
          </div>

          <div className="rounded-[2rem] overflow-hidden border border-white/5 h-[400px] lg:h-auto min-h-[500px] grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-700 shadow-xl">
            {mapEmbedUrl && (
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
