'use client'
import React from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export const GroomJourneyBlock: React.FC<any> = ({ subtitle, heading, description, checklist, ctaText, image }) => {
  const imgUrl = typeof image === 'string' ? image : image?.url || ''

  return (
    <section className="py-16 md:py-24 bg-[#050505] relative overflow-hidden" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            {subtitle && (
              <span className="text-[#c3f400] font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
              {heading}
            </h2>
            {description && (
              <p className="text-lg text-neutral-400 mb-10 leading-relaxed font-medium">
                {description}
              </p>
            )}

            <div className="space-y-5 mb-12">
              {checklist && checklist.map((item: any, i: number) => (
                <div key={i} className="flex gap-4 items-start bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                  <div className="mt-1 bg-[#c3f400]/10 p-2 rounded-xl">
                    <CheckCircle2 className="text-[#c3f400]" size={24} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{item.title}</h3>
                    {item.description && (
                      <p className="text-neutral-400 text-sm font-medium">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {ctaText && (
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-lg hover:bg-[#c3f400] transition-colors flex items-center gap-3 shadow-lg">
                {ctaText} <ArrowRight size={20} />
              </button>
            )}
          </div>

          <div className="lg:w-1/2 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#c3f400] to-transparent opacity-10 blur-[80px] rounded-full" />
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] max-h-[600px]">
              {imgUrl && (
                <img
                  src={imgUrl}
                  alt={heading}
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-[20%] transition-all duration-1000"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
