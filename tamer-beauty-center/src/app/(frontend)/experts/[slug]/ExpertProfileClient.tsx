'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'
import { Award, Briefcase, MessageCircle, Star } from 'lucide-react'

type Props = {
  expert: any
}

export const ExpertProfileClient: React.FC<Props> = ({ expert }) => {
  const { name, title, bio, experienceYears, profileMedia, speech, gallery, reviews } = expert

  const pImg = profileMedia?.type === 'image' && typeof profileMedia.image === 'object' ? profileMedia.image?.url : ''
  const pVid = profileMedia?.type === 'video' ? (typeof profileMedia.video === 'object' ? profileMedia.video?.url : profileMedia.videoUrl) : ''

  return (
    <div
      dir="rtl"
      className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-[#c3f400] selection:text-black"
      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        
        {/* ── HEADER SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
          
          {/* Profile Media */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] group"
          >
            {profileMedia?.type === 'video' && pVid ? (
              <video src={pVid} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : pImg ? (
              <Image src={pImg} alt={name} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                 <span className="text-white/20">لا توجد وسائط</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            {/* Experience Badge */}
            <div className="absolute bottom-8 right-8 p-4 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 flex items-center gap-3">
               <div className="w-12 h-12 rounded-xl bg-[#c3f400]/10 flex items-center justify-center text-[#c3f400]">
                  <Award size={24} />
               </div>
               <div>
                  <p className="text-white font-bold text-lg leading-tight">{experienceYears}+</p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">سنوات خبرة</p>
               </div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <div className="flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-4 inline-block px-4 py-1.5 rounded-full bg-[#c3f400]/5 border border-[#c3f400]/10">
                {title}
              </span>
              <h1 className="text-white font-black text-5xl md:text-7xl mb-6">{name}</h1>
              <p className="text-white/60 text-xl leading-relaxed max-w-xl">
                {bio}
              </p>
            </motion.div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 mb-10">
               <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <Briefcase className="text-[#c3f400] mb-3" size={20} />
                  <p className="text-white font-bold mb-1">الاحترافية</p>
                  <p className="text-white/40 text-xs">معايير عالمية في التنفيذ</p>
               </div>
               <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5">
                  <Star className="text-[#c3f400] mb-3" size={20} />
                  <p className="text-white font-bold mb-1">التقييم</p>
                  <p className="text-white/40 text-xs">رضا تام من جميع العملاء</p>
               </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-4">
               <a 
                 href={`https://wa.me/972527815671?text=أرغب في حجز موعد مع ${name}`}
                 target="_blank"
                 className="neon-button px-10 py-4"
               >
                 <MessageCircle size={20} className="ml-2" />
                 احجز استشارة الآن
               </a>
            </div>
          </div>
        </div>

        {/* ── SPEECH SECTION ── */}
        {speech && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 relative"
          >
             <div className="absolute -top-10 -right-10 text-[15rem] font-serif text-white/[0.02] pointer-events-none select-none italic">
               "
             </div>
             <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[3rem] bg-white/[0.01] border border-white/5 backdrop-blur-3xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c3f400]/30 to-transparent" />
                <h3 className="text-white font-bold text-2xl mb-8 flex items-center gap-3">
                   كلمة من {name.split(' ')[0]}
                </h3>
                <div className="prose prose-invert prose-2xl text-white/80 leading-relaxed italic font-light">
                   <RichText data={speech} enableGutter={false} />
                </div>
             </div>
          </motion.div>
        )}

        {/* ── GALLERY SECTION ── */}
        {gallery && gallery.length > 0 && (
          <div className="mb-32">
             <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-4">المعرض</h2>
                  <h3 className="text-white font-black text-4xl md:text-5xl">أعمال الخبير</h3>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gallery.map((item: any, i: number) => {
                  const gImg = item.type === 'image' && typeof item.image === 'object' ? item.image?.url : ''
                  const gVid = item.type === 'video' ? (typeof item.video === 'object' ? item.video?.url : item.videoUrl) : ''
                  
                  return (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-neutral-900 border border-white/5"
                    >
                       {item.type === 'video' && gVid ? (
                         <video src={gVid} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                       ) : gImg ? (
                         <Image src={gImg} alt={item.caption || `Gallery ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                       ) : null}
                       
                       {item.caption && (
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                            <p className="text-white text-sm font-medium">{item.caption}</p>
                         </div>
                       )}
                    </motion.div>
                  )
                })}
             </div>
          </div>
        )}

        {/* ── BACK BUTTON ── */}
        <div className="flex justify-center">
           <Link 
             href="/about"
             className="text-white/40 hover:text-[#c3f400] transition-colors flex items-center gap-2 group"
           >
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180 transform group-hover:translate-x-2 transition-transform"><path d="m9 18 6-6-6-6"/></svg>
             العودة للفريق
           </Link>
        </div>

      </div>
    </div>
  )
}
