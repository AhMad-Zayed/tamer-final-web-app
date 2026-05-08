'use client'
import React from 'react'
import { Activity, Smile, Scissors, Gem, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const iconMap: Record<string, React.FC<any>> = {
  Activity,
  Smile,
  Scissors,
  Gem,
}

export const ServicesCatalogBlock: React.FC<any> = ({ heading, subheading, services }) => {
  return (
    <section className="py-16 md:py-24 bg-[#050505] border-t border-white/5 relative" dir="rtl">
      <div className="absolute left-0 top-1/4 w-96 h-96 bg-[#c3f400]/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-white drop-shadow-md">
            {heading}
          </h2>
          {subheading && (
            <p className="text-[#c3f400] font-semibold tracking-[0.2em] uppercase text-sm">
              {subheading}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services &&
            services.map((relationData: any, i: number) => {
              const service = relationData.value || relationData
              if (!service?.title) return null
              
              const IconComponent = iconMap[service.icon || 'Activity'] || Activity
              
              return (
                <Link
                  href={`/services/${service.slug || ''}`}
                  key={i}
                  className="group relative bg-[#0a0a0a]/80 backdrop-blur-sm p-8 rounded-3xl border border-white/5 overflow-hidden block shadow-lg hover:shadow-[#c3f400]/5 transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  
                  {/* Sliding hover effect background */}
                  <div className="absolute inset-0 bg-[#c3f400] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                  
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-center mb-6 text-[#c3f400] group-hover:bg-black/10 group-hover:border-black/10 group-hover:text-black transition-colors duration-500">
                      <IconComponent size={28} strokeWidth={2} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-black transition-colors duration-500 tracking-tight">
                      {service.title}
                    </h3>
                    
                    <p className="text-sm font-medium text-neutral-400 group-hover:text-black/70 transition-colors duration-500 mb-6 flex-grow leading-relaxed">
                      {service.shortDescription}
                    </p>
                    
                    <div className="flex items-center gap-2 text-[#c3f400] font-bold text-sm group-hover:text-black transition-colors duration-500 mt-auto">
                      <span>اكتشف المزيد</span>
                      <ArrowRight size={16} className="transform group-hover:-translate-x-1 transition-transform duration-300" strokeWidth={2.5} />
                    </div>
                  </div>
                </Link>
              )
            })}
        </div>
      </div>
    </section>
  )
}
