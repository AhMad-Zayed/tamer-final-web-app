'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Award } from 'lucide-react'

export const ExpertsOrbitBlock: React.FC<any> = ({ heading, subheading, centerImage, experts }) => {
  const [isMobile, setIsMobile] = useState(false)
  const [activeExpertIndex, setActiveExpertIndex] = useState(0)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const centerImgUrl = typeof centerImage === 'string' ? centerImage : centerImage?.url || ''
  
  if (!experts || experts.length === 0) return null

  const activeExpertRelation = experts[activeExpertIndex]
  const activeExpert = activeExpertRelation?.value || activeExpertRelation

  return (
    <section className="py-24 md:py-40 relative flex flex-col items-center bg-[#050505] overflow-hidden" dir="rtl">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-[#c3f400]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="text-center mb-16 md:mb-24 px-6 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md"
        >
          {heading}
        </motion.h2>
        {subheading && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#c3f400] tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs md:text-sm font-semibold"
          >
            {subheading}
          </motion.p>
        )}
      </div>

      {/* Orbit Visualization */}
      <div className="relative w-[320px] h-[320px] md:w-[600px] md:h-[600px] flex items-center justify-center mb-16 md:mb-24">
        {/* Core rings */}
        <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-[-30px] md:inset-[-60px] rounded-full border border-[#c3f400]/10 border-dashed animate-[spin_60s_linear_infinite_reverse]" />
        
        {/* Center Image */}
        <div className="relative z-20 w-36 h-36 md:w-56 md:h-56 rounded-full overflow-hidden border-[3px] md:border-4 border-[#c3f400] shadow-[0_0_80px_rgba(195,244,0,0.2)] bg-neutral-900">
          {centerImgUrl && (
            <img src={centerImgUrl} className="w-full h-full object-cover scale-110" alt="Brand Visual" />
          )}
        </div>

        {/* Orbiting Experts */}
        {experts.map((relationData: any, i: number) => {
          const expert = relationData.value || relationData
          if (!expert?.name) return null
          
          const angle = (360 / experts.length) * i
          const isActive = i === activeExpertIndex
          const imgUrl = typeof expert.image === 'string' ? expert.image : expert.image?.url || ''
          const radius = isMobile ? 160 : 300
          
          return (
            <div
              key={i}
              className="absolute flex flex-col items-center justify-center z-30"
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
              }}
            >
              <button 
                onClick={() => setActiveExpertIndex(i)}
                onMouseEnter={() => setActiveExpertIndex(i)}
                className={`relative group flex flex-col items-center justify-center outline-none transition-all duration-500 ${isActive ? 'scale-125 z-50' : 'scale-100 hover:scale-110 z-40'}`}
              >
                <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full bg-neutral-950 border-2 p-1.5 overflow-hidden shadow-2xl transition-all duration-500 ${isActive ? 'border-[#c3f400] shadow-[0_0_30px_rgba(195,244,0,0.5)]' : 'border-white/10 group-hover:border-white/40'}`}>
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      className={`w-full h-full rounded-full object-cover transition-all duration-500 ${isActive ? 'grayscale-0 opacity-100' : 'grayscale opacity-60 group-hover:grayscale-[20%] group-hover:opacity-90'}`}
                      alt={expert.name}
                    />
                  )}
                </div>
                
                {/* Always show name subtly, or brightly if active */}
                <div className={`absolute top-[110%] whitespace-nowrap transition-all duration-300 pointer-events-none ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                   <div className="bg-black/90 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/10 shadow-xl">
                     <span className={`text-xs md:text-sm font-bold ${isActive ? 'text-[#c3f400]' : 'text-white'}`}>{expert.name}</span>
                   </div>
                </div>
              </button>
            </div>
          )
        })}
      </div>

      {/* Selected Expert Details & Gallery Panel */}
      <div className="w-full max-w-7xl px-4 md:px-8 relative z-40">
        <AnimatePresence mode="wait">
          {activeExpert && (
            <motion.div 
              key={activeExpert.id || activeExpertIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <div className="bg-neutral-900/40 backdrop-blur-3xl border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl relative overflow-hidden">
                {/* Glow effect inside panel */}
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#c3f400]/10 blur-[100px] rounded-full pointer-events-none" />
                
                {/* Expert Header */}
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 border-b border-white/5 pb-8 md:pb-12 relative z-10">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-[2rem] overflow-hidden shrink-0 border border-white/10 shadow-2xl bg-neutral-950">
                    {activeExpert.image && (
                      <img 
                        src={typeof activeExpert.image === 'string' ? activeExpert.image : activeExpert.image?.url || ''} 
                        alt={activeExpert.name} 
                        className="w-full h-full object-cover" 
                      />
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-right w-full">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                      <Sparkles className="w-6 h-6 text-[#c3f400]" />
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{activeExpert.name}</h3>
                    </div>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-[#c3f400]/10 px-4 py-1.5 rounded-full border border-[#c3f400]/20">
                        <Award className="w-4 h-4 text-[#c3f400]" />
                        <span className="text-sm md:text-base text-[#c3f400] font-bold tracking-wide">{activeExpert.title}</span>
                      </div>
                      {activeExpert.experienceYears && (
                        <div className="flex items-center gap-2 bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
                          <span className="text-sm md:text-base text-neutral-300 font-medium">{activeExpert.experienceYears} سنوات خبرة</span>
                        </div>
                      )}
                    </div>
                    <p className="text-neutral-400 text-sm md:text-lg leading-relaxed max-w-3xl mx-auto md:mx-0 font-medium">
                      {activeExpert.bio}
                    </p>
                  </div>
                </div>

                {/* Gallery Section */}
                {activeExpert.gallery && activeExpert.gallery.length > 0 && (
                  <div className="pt-8 md:pt-12 relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-8">
                      <h4 className="text-2xl md:text-3xl font-bold text-white">معرض الأعمال</h4>
                      <div className="h-px bg-gradient-to-l from-[#c3f400]/50 to-transparent flex-1 max-w-[200px]" />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                      {activeExpert.gallery.map((item: any, idx: number) => {
                        const imgUrl = typeof item.image === 'string' ? item.image : item.image?.url || ''
                        return (
                          <div key={idx} className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-950 border border-white/5 cursor-pointer shadow-lg">
                            {imgUrl && (
                              <img 
                                src={imgUrl} 
                                alt={item.caption || 'Gallery image'} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                              {item.caption && (
                                <span className="text-white text-sm font-medium drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-all duration-300">{item.caption}</span>
                              )}
                            </div>
                            <div className="absolute inset-0 border-2 border-[#c3f400] opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none mix-blend-overlay" />
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
