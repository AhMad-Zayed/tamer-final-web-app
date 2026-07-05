'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import RichText from '@/components/RichText'
import { ArrowRight, Check, ChevronDown, Clock, HelpCircle, MessageCircle, Play, Tag } from 'lucide-react'

type Props = {
  service: any
  pkg: any
}

export const PackageLandingClient: React.FC<Props> = ({ service, pkg }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  
  const { label, price, note, fullDescription, media, faqs } = pkg

  return (
    <div
      dir="rtl"
      className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-[#c3f400] selection:text-black"
      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-[1200px]">
        
        {/* ── BREADCRUMBS ── */}
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
           <Link 
             href={`/services/${service.slug}`}
             className="text-white/40 hover:text-[#c3f400] transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
           >
              <ArrowRight size={16} />
              العودة إلى {service.title}
           </Link>
        </motion.div>

        {/* ── HERO SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
          <div className="lg:col-span-7">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] text-xs font-black uppercase tracking-widest mb-6">
                   <Tag size={12} />
                   باقة حصرية
                </div>
                <h1 className="text-white font-black text-5xl md:text-7xl leading-[1.1] mb-8 tracking-tight">
                   {label}
                </h1>
                <div className="flex items-center gap-6 mb-10">
                   <div className="flex flex-col">
                      <span className="text-[#c3f400] text-5xl font-black">{price}</span>
                      <span className="text-white/30 text-xs font-bold tracking-widest uppercase">شيكل فقط</span>
                   </div>
                   {note && (
                     <div className="h-12 w-px bg-white/10 mx-2" />
                   )}
                   {note && (
                     <p className="text-white/50 text-lg leading-relaxed max-w-xs font-light italic">
                        &quot;{note}&quot;
                     </p>
                   )}
                </div>

                <div className="flex flex-wrap gap-4">
                   <a 
                     href={`https://wa.me/972527815671?text=أرغب في حجز ${label} ضمن خدمة ${service.title}`}
                     target="_blank"
                     className="neon-button px-10 py-4 text-lg"
                   >
                     <MessageCircle size={22} className="ml-2" />
                     احجز موعدك الآن
                   </a>
                </div>
             </motion.div>
          </div>

          <div className="lg:col-span-5">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(195,244,0,0.05)] bg-neutral-900"
             >
                {media && media[0] ? (
                  <>
                    {media[0].type === 'image' && media[0].image?.url && (
                      <Image src={media[0].image.url} alt={label} fill className="object-cover" priority />
                    )}
                    {media[0].type === 'video' && media[0].video?.url && (
                      <video src={media[0].video.url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    )}
                    {media[0].type === 'videoUrl' && media[0].videoUrl && (
                      <iframe 
                        src={media[0].videoUrl.replace('watch?v=', 'embed/')} 
                        className="w-full h-full border-0" 
                        allow="autoplay; fullscreen; picture-in-picture" 
                        allowFullScreen
                      />
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/10">
                     <Play size={80} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
             </motion.div>
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        {fullDescription && (
          <div className="mb-32">
             <div className="max-w-3xl">
                <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-8 flex items-center gap-3">
                   <span className="w-8 h-px bg-[#c3f400]/30" />
                   حول هذه الباقة
                </h2>
                <div className="prose prose-invert prose-2xl text-white/80 leading-relaxed font-light">
                   <RichText data={fullDescription} enableGutter={false} />
                </div>
             </div>
          </div>
        )}

        {/* ── MEDIA GALLERY ── */}
        {media && media.length > 1 && (
          <div className="mb-32">
             <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-12 text-center">معرض الوسائط</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {media.slice(1).map((item: any, i: number) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="relative aspect-square rounded-[2rem] overflow-hidden border border-white/5 group bg-neutral-900"
                   >
                      {item.type === 'image' && item.image?.url && (
                        <Image src={item.image.url} alt={`${label} gallery ${i}`} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                      )}
                      {item.type === 'video' && item.video?.url && (
                        <video src={item.video.url} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                      )}
                      {item.type === 'videoUrl' && item.videoUrl && (
                        <iframe 
                          src={item.videoUrl.replace('watch?v=', 'embed/')} 
                          className="w-full h-full border-0" 
                          allow="autoplay; fullscreen; picture-in-picture" 
                          allowFullScreen
                        />
                      )}
                   </motion.div>
                ))}
             </div>
          </div>
        )}

        {/* ── PACKAGE FAQ ── */}
        {faqs && faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-32">
             <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[#c3f400]/10 flex items-center justify-center text-[#c3f400]">
                   <HelpCircle size={28} />
                </div>
                <h3 className="text-white font-black text-3xl md:text-4xl">الأسئلة المتكررة</h3>
             </div>

             <div className="space-y-4">
                {faqs.map((faq: any, i: number) => (
                  <div 
                    key={i}
                    className="rounded-[2.5rem] border border-white/5 overflow-hidden transition-all duration-300"
                    style={{ background: openFaq === i ? 'rgba(255,255,255,0.02)' : 'transparent' }}
                  >
                     <button 
                       onClick={() => setOpenFaq(openFaq === i ? null : i)}
                       className="w-full p-8 flex items-center justify-between text-right group"
                     >
                        <span className={`text-xl font-bold transition-colors ${openFaq === i ? 'text-[#c3f400]' : 'text-white'}`}>
                           {faq.question}
                        </span>
                        <ChevronDown className={`text-white/20 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#c3f400]' : ''}`} />
                     </button>
                     <AnimatePresence>
                        {openFaq === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                             <div className="px-8 pb-8 text-white/50 text-lg leading-relaxed border-t border-white/5 pt-4">
                                {faq.answer}
                             </div>
                          </motion.div>
                        )}
                     </AnimatePresence>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* ── BENEFITS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
           {[
             { title: 'أمان تام', desc: 'نستخدم أفضل الأجهزة المرخصة عالمياً لضمان سلامتك.' },
             { title: 'نتائج دائمة', desc: 'نهدف للوصول إلى أفضل النتائج الممكنة من الجلسات الأولى.' },
             { title: 'خصوصية قصوى', desc: 'غرف معالجة خاصة ومستقلة لكل عميل.' }
           ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-white/[0.01] border border-white/5 hover:border-[#c3f400]/20 transition-colors">
                 <div className="w-10 h-10 rounded-xl bg-[#c3f400]/10 flex items-center justify-center text-[#c3f400] mb-6">
                    <Check size={20} />
                 </div>
                 <h4 className="text-white font-bold text-xl mb-3">{item.title}</h4>
                 <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
           ))}
        </div>

        {/* ── FINAL CTA ── */}
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-[#111] to-[#050505] overflow-hidden border border-white/5 text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(195,244,0,0.03)_0%,transparent_70%)] pointer-events-none" />
           <h4 className="text-white font-black text-4xl md:text-6xl mb-8 relative z-10">ابدأ رحلة جمالك</h4>
           <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto relative z-10 font-light">
              نحن هنا لمساعدتك في الحصول على أفضل نسخة من نفسك. احجز موعدك لخدمة {label} اليوم.
           </p>
           <div className="flex justify-center relative z-10">
              <a 
                href={`https://wa.me/972527815671?text=أرغب في حجز ${label}`}
                target="_blank"
                className="neon-button px-12 py-5 text-xl"
              >
                 <MessageCircle size={24} className="ml-3" />
                 تواصل واتساب
              </a>
           </div>
        </div>

      </div>
    </div>
  )
}
