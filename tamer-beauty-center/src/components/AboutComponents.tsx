'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Play, User, Star, Sparkles, Award } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

// --- About Hero Component ---
export const AboutHero: React.FC<{
  title: string
  tamerPhoto: any
  tamerBio: any
  video?: any
}> = ({ title, tamerPhoto, tamerBio, video }) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c3f400]/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Tamer Photo Area */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative group"
          >
            <div className="relative aspect-[4/5] rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
              <Media resource={tamerPhoto} fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-8 right-8 bg-black/60 backdrop-blur-xl border border-[#c3f400]/30 px-6 py-4 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#c3f400] flex items-center justify-center text-black shadow-[0_0_20px_rgba(195,244,0,0.4)]">
                    <Star fill="currentColor" size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">Tamer</div>
                    <div className="text-[#c3f400] text-xs font-semibold uppercase tracking-widest">Founder & Lead Expert</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Rings */}
            <div className="absolute -inset-4 border border-white/5 rounded-[3rem] md:rounded-[5rem] -z-10 animate-pulse" />
          </motion.div>

          {/* Tamer Bio Area */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col text-right"
          >
            <div className="flex items-center gap-3 mb-6 justify-end">
              <span className="h-px w-12 bg-[#c3f400]" />
              <span className="text-[#c3f400] font-bold tracking-[0.3em] uppercase text-sm">Visionary Artist</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              {title}
            </h1>
            <div className="prose prose-invert prose-lg max-w-none text-neutral-400 font-medium leading-relaxed">
              <RichText data={tamerBio} enableGutter={false} />
            </div>

            {video && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-10 flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-bold w-fit mr-auto lg:mr-0 self-end lg:self-start"
              >
                <Play fill="currentColor" size={20} />
                <span>شاهد القصة</span>
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// --- Luxury Section Component ---
export const LuxurySection: React.FC<{
  children: React.ReactNode
  heading?: string
}> = ({ children, heading }) => {
  return (
    <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {heading && (
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black text-white tracking-tight"
            >
              {heading}
            </motion.h2>
            <div className="w-24 h-1 bg-[#c3f400] mx-auto mt-6 rounded-full" />
          </div>
        )}
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
      
      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none z-0 uppercase">
        Tamer Beauty
      </div>
    </section>
  )
}

// --- Expert Card Component ---
export const ExpertCard: React.FC<{
  expert: any
  index: number
}> = ({ expert, index }) => {
  const imgUrl = typeof expert.image === 'object' ? expert.image?.url : expert.image
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-neutral-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden hover:border-[#c3f400]/30 transition-all duration-500"
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Media resource={expert.image} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-end text-right">
          <div className="bg-[#c3f400] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded-sm mb-2">
            {expert.title}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
          <div className="flex items-center gap-2 text-neutral-400 text-xs">
            <span>{expert.experienceYears} سنوات خبرة</span>
            <Award size={12} className="text-[#c3f400]" />
          </div>
        </div>
      </div>
      
      {/* Bio / Detail on Hover */}
      <div className="absolute inset-0 bg-black/95 p-8 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 text-right">
        <h3 className="text-2xl font-bold text-white mb-2">{expert.name}</h3>
        <div className="text-[#c3f400] text-sm font-bold mb-4">{expert.title}</div>
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 line-clamp-4">
          {expert.bio}
        </p>
        <div className="mt-auto">
          <div className="h-px bg-white/10 w-full mb-4" />
          <div className="flex justify-end gap-3">
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#c3f400] hover:text-black transition-colors cursor-pointer">
                <Sparkles size={14} />
             </div>
             <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#c3f400] hover:text-black transition-colors cursor-pointer">
                <User size={14} />
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
