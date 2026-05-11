'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import RichText from '@/components/RichText'
import { Award, Star, Users, ShieldCheck, Play } from 'lucide-react'

type Props = {
  about: any
  experts: any[]
}

const STATS = [
  { value: '+15', label: 'سنة من التميز' },
  { value: '8', label: 'خبراء متخصصون' },
  { value: '5', label: 'أقسام متكاملة' },
  { value: '+10k', label: 'عميل سعيد' },
]

export const AboutPageClient: React.FC<Props> = ({ about, experts }) => {
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null)
  
  const tamerMedia = about?.tamerMedia
  const tImg = tamerMedia?.type === 'image' && typeof tamerMedia.image === 'object' ? tamerMedia.image?.url : ''
  const tVid = tamerMedia?.type === 'video' ? (typeof tamerMedia.video === 'object' ? tamerMedia.video?.url : tamerMedia.videoUrl) : ''

  return (
    <div
      dir="rtl"
      className="bg-[#0e0e0e] min-h-screen selection:bg-[#c3f400] selection:text-black"
      style={{ fontFamily: "'Noto Kufi Arabic', 'Manrope', sans-serif" }}
    >
      {/* ── HERO SECTION (ACADEMY STYLE) ── */}
      <section className="relative overflow-hidden flex items-center min-h-[716px] pt-[100px] pb-[80px]">
        {/* Background media */}
        <div className="absolute inset-0 z-0 opacity-35">
           {tVid ? (
             <video src={tVid} autoPlay loop muted playsInline className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]" />
           ) : tImg ? (
             <Image src={tImg} alt="Tamer Beauty" fill className="object-cover grayscale-[30%] contrast-[1.1]" priority />
           ) : null}
        </div>

        {/* RTL gradient overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: 'linear-gradient(to left, #0e0e0e 0%, rgba(14,14,14,0.92) 40%, rgba(14,14,14,0.5) 70%, transparent 100%)',
          }}
        />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl grid gap-7">
            <div className="flex items-center gap-3">
              <span className="w-12 h-px bg-[#c3f400]" />
              <span className="text-[#c3f400] font-bold text-xs uppercase tracking-[0.2em] font-mono">
                القصة والرؤية — تامر بيوتي
              </span>
            </div>

            <h1 className="text-white font-black text-5xl md:text-7xl leading-[1.1] tracking-tight">
               {about?.title || 'تامر بيوتي سنتر — الريادة في عالم التميز'}
            </h1>

            <div className="text-white/55 text-lg leading-relaxed max-w-2xl">
               {about?.tamerBio ? <RichText data={about.tamerBio} enableGutter={false} /> : <p>نحن نرسم معالم الجمال والتميز...</p>}
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
               <a href="https://wa.me/972527815671" className="neon-button text-base px-10 py-4">
                  تواصل مع المؤسس
               </a>
               <div className="p-8 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-md max-w-md">
                  <h3 className="text-white font-bold text-xl mb-3 flex items-center gap-3">
                    <ShieldCheck className="text-[#c3f400]" size={20} />
                    رؤيتنا
                  </h3>
                  <div className="text-white/60 leading-relaxed italic">
                    {about?.tamerVision ? <RichText data={about.tamerVision} enableGutter={false} /> : <p>أن نكون الوجهة الأولى للجمال.</p>}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="w-full border-t border-b border-[#c3f400]/10 bg-black/20 backdrop-blur-md relative z-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center group">
              <p className="font-mono text-3xl md:text-4xl font-black text-[#c3f400] mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(195,244,0,0.3)] group-hover:scale-110 transition-transform duration-500">
                {stat.value}
              </p>
              <p className="text-white/40 text-xs md:text-sm font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CENTER BIO ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#c3f400]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
           <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#c3f400]/50 to-transparent mx-auto mb-16" />
           <div className="prose prose-invert prose-2xl md:prose-3xl text-white/80 leading-relaxed font-light mx-auto">
              {about?.centerBio ? <RichText data={about.centerBio} enableGutter={false} /> : <p>نبذة عن المركز...</p>}
           </div>
        </div>
      </section>

      {/* ── EXPERTS SECTION (GRID STYLE) ── */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-20">
         <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
            <div>
               <p className="text-[#c3f400] font-bold text-xs uppercase tracking-[0.2em] mb-4">فريق العمل</p>
               <h2 className="text-white font-black text-4xl md:text-6xl tracking-tight">نخبة الخبراء</h2>
            </div>
            <p className="text-white/40 max-w-md text-lg leading-relaxed">
               نجمع لك أفضل الكفاءات في مجال العناية والتجميل لضمان تجربة لا تضاهى تحت سقف واحد.
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experts.map((expert, i) => {
               const pMedia = expert.profileMedia
               const pImg = pMedia?.type === 'image' && typeof pMedia.image === 'object' ? pMedia.image?.url : ''
               const pVid = pMedia?.type === 'video' ? (typeof pMedia.video === 'object' ? pMedia.video?.url : pMedia.videoUrl) : ''

               return (
                 <Link href={`/experts/${expert.slug}`} key={expert.id || i} className="group">
                   <motion.div 
                     onMouseEnter={() => setHoveredExpert(i)}
                     onMouseLeave={() => setHoveredExpert(null)}
                     className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/5 transition-all duration-500"
                     style={{
                        boxShadow: hoveredExpert === i ? '0 20px 60px rgba(0,0,0,0.8), 0 0 30px rgba(195,244,0,0.1)' : 'none',
                        transform: hoveredExpert === i ? 'translateY(-10px)' : 'translateY(0)'
                     }}
                   >
                     {/* Media */}
                     {pMedia?.type === 'video' && pVid ? (
                        <video src={pVid} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                     ) : pImg ? (
                        <Image src={pImg} alt={expert.name} fill className="object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                     ) : null}

                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

                     {/* Content */}
                     <div className="absolute inset-0 p-8 flex flex-col justify-end">
                        <span className="text-[#c3f400] font-bold text-[10px] uppercase tracking-widest mb-3 inline-block px-3 py-1 rounded-full bg-[#c3f400]/10 border border-[#c3f400]/20 backdrop-blur-md w-fit">
                          {expert.title}
                        </span>
                        <h4 className="text-white font-bold text-2xl mb-1 group-hover:text-[#c3f400] transition-colors">{expert.name}</h4>
                        <p className="text-white/40 text-sm">{expert.experienceYears} سنوات خبرة</p>
                     </div>
                     
                     <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        <Play size={16} fill="currentColor" />
                     </div>
                   </motion.div>
                 </Link>
               )
            })}
         </div>
      </section>

      {/* ── CTA SECTION ── */}
      <section className="py-24 bg-gradient-to-b from-transparent to-black/50">
         <div className="max-w-[1400px] mx-auto px-6 md:px-10">
            <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
               <div className="relative z-10 max-w-2xl">
                  <h2 className="text-white font-black text-4xl md:text-6xl mb-6 leading-tight">كن جزءاً من عائلتنا</h2>
                  <p className="text-white/40 text-xl leading-relaxed font-light">
                     سواء كنت تبحث عن التميز في مظهرك أو تطمح للانضمام لفريق الخبراء لدينا، نحن بانتظارك.
                  </p>
               </div>
               <div className="relative z-10 flex flex-col gap-4 w-full md:w-auto">
                  <a href="https://wa.me/972527815671" className="neon-button px-12 py-5 text-xl">تواصل معنا الآن</a>
                  <Link href="/services" className="text-white/40 hover:text-white transition-colors text-center font-medium">استكشف خدماتنا</Link>
               </div>
               <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(195,244,0,0.03)_0%,transparent_70%)] pointer-events-none" />
            </div>
         </div>
      </section>
    </div>
  )
}
