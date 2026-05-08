'use client'
import React from 'react'
import { ShieldCheck, Sparkles, UserCheck, Zap, Star, Activity, CheckCircle2 } from 'lucide-react'

const iconMap: Record<string, React.FC<any>> = {
  ShieldCheck,
  Sparkles,
  UserCheck,
  Zap,
  Star,
  Activity,
  CheckCircle2,
}

export const WhyChooseUsBlock: React.FC<any> = ({ heading, description, features }) => {
  return (
    <section className="py-16 md:py-24 bg-[#050505] relative border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white drop-shadow-md">
            {heading}
          </h2>
          {description && (
            <p className="text-lg text-neutral-400 leading-relaxed font-medium">
              {description}
            </p>
          )}
        </div>

        {features && features.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature: any, i: number) => {
              const IconComponent = iconMap[feature.icon] || CheckCircle2
              return (
                <div
                  key={i}
                  className="bg-[#0a0a0a]/80 backdrop-blur-sm p-8 rounded-3xl border border-white/5 hover:border-[#c3f400]/30 transition-all duration-500 group hover:-translate-y-1 shadow-lg"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#c3f400]/5 border border-[#c3f400]/10 flex items-center justify-center mb-6 group-hover:bg-[#c3f400] transition-colors duration-500 text-[#c3f400] group-hover:text-black">
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                  <p className="text-neutral-400 leading-relaxed text-sm font-medium">{feature.text}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
