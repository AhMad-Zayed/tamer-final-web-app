'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import RichText from '@/components/RichText'
import { ArrowRight, Check, ChevronDown, Clock, HelpCircle, MessageCircle, Tag } from 'lucide-react'

type Props = {
  service: any
}

export const ServiceLandingClient: React.FC<Props> = ({ service }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const { title, fullDescription, shortDescription, coverImage, packages, faqs, beforeAfterGallery, expiryDate } = service

  const coverImg = typeof coverImage === 'object' ? coverImage?.url : ''

  return (
    <div
      dir="rtl"
      className="bg-[#050505] min-h-screen pt-32 pb-24 selection:bg-[#c3f400] selection:text-black"
      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        
        {/* ── HERO SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center mb-32">
          
          <div className="lg:col-span-7">
             <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
             >
                <h1 className="text-white font-black text-5xl md:text-8xl leading-[1.1] mb-8 tracking-tight">
                   {title}
                </h1>
                <p className="text-white/60 text-xl md:text-2xl leading-relaxed mb-10 max-w-2xl font-light">
                   {shortDescription}
                </p>
                
                {expiryDate && (
                  <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#c3f400]/10 border border-[#c3f400]/20 text-[#c3f400] text-sm font-bold mb-8">
                    <Clock size={18} />
                    عرض محدود ينتهي قريباً
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                   <a 
                     href={`https://wa.me/972527815671?text=أرغب في حجز خدمة ${title}`}
                     target="_blank"
                     className="neon-button px-10 py-4 text-lg"
                   >
                     <MessageCircle size={22} className="ml-2" />
                     حجز موعد فوري
                   </a>
                </div>
             </motion.div>
          </div>

          <div className="lg:col-span-5">
             <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(195,244,0,0.05)]"
             >
                {coverImg ? (
                  <Image src={coverImg} alt={title} fill className="object-cover" priority />
                ) : (
                  <div className="w-full h-full bg-neutral-900" />
                )}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
             </motion.div>
          </div>
        </div>

        {/* ── DESCRIPTION ── */}
        {fullDescription && (
           <div className="max-w-4xl mb-32">
              <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-6 flex items-center gap-3">
                 <span className="w-8 h-px bg-[#c3f400]/30" />
                 عن الخدمة
              </h2>
              <div className="prose prose-invert prose-2xl text-white/80 leading-relaxed font-light">
                 <RichText data={fullDescription} enableGutter={false} />
              </div>
           </div>
        )}

        {/* ── PRICING & PACKAGES ── */}
        {packages && packages.length > 0 && (
          <div className="mb-32">
             <div className="mb-12">
                <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-4">قائمة الأسعار</h2>
                <h3 className="text-white font-black text-4xl md:text-5xl">الباقات والخدمات</h3>
             </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {packages.map((pkg: any, i: number) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                   >
                      <Link 
                        href={`/services/${service.slug}/${pkg.slug}`}
                        className="block h-full p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[#c3f400]/30 transition-all duration-500 group relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 w-24 h-24 bg-[#c3f400]/5 blur-[40px] rounded-full group-hover:bg-[#c3f400]/10 transition-colors" />
                         
                         <div className="flex justify-between items-start mb-6">
                            <div className="p-3 rounded-2xl bg-[#c3f400]/10 text-[#c3f400]">
                               <Tag size={24} />
                            </div>
                            <div className="text-left">
                               <p className="text-[#c3f400] font-black text-3xl">{pkg.price}</p>
                               <p className="text-white/30 text-xs uppercase font-bold">شيكل</p>
                            </div>
                         </div>
    
                         <h4 className="text-white font-bold text-xl mb-4">{pkg.label}</h4>
                         {pkg.note && (
                            <p className="text-white/50 text-sm mb-6 leading-relaxed">
                               {pkg.note}
                            </p>
                         )}
    
                         <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                            <ul className="space-y-3">
                               <li className="flex items-center gap-3 text-white/40 text-sm">
                                  <Check size={16} className="text-[#c3f400]" />
                                  عرض التفاصيل
                               </li>
                            </ul>
                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/20 group-hover:border-[#c3f400]/30 group-hover:text-[#c3f400] transition-all">
                               <ArrowRight size={20} className="rotate-180" />
                            </div>
                         </div>
                      </Link>
                   </motion.div>
                 ))}
              </div>
          </div>
        )}

        {/* ── BEFORE & AFTER ── */}
        {beforeAfterGallery && beforeAfterGallery.length > 0 && (
          <div className="mb-32">
             <div className="text-center mb-16">
                <h2 className="text-[#c3f400] font-bold text-sm tracking-widest uppercase mb-4">النتائج</h2>
                <h3 className="text-white font-black text-4xl md:text-6xl">التحول الملموس</h3>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {beforeAfterGallery.map((item: any, i: number) => (
                  <div key={i} className="group relative rounded-[3rem] overflow-hidden aspect-video border border-white/10">
                     {typeof item.image === 'object' && item.image?.url && (
                        <Image src={item.image.url} alt={item.caption || 'Before After'} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                     )}
                     <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="text-white font-medium text-center">{item.caption}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* ── FAQ ── */}
        {faqs && faqs.length > 0 && (
          <div className="max-w-4xl mx-auto mb-32">
             <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 rounded-2xl bg-[#c3f400]/10 flex items-center justify-center text-[#c3f400]">
                   <HelpCircle size={28} />
                </div>
                <h3 className="text-white font-black text-3xl md:text-4xl">الأسئلة الشائعة</h3>
             </div>

             <div className="space-y-4">
                {faqs.map((faq: any, i: number) => (
                  <div 
                    key={i}
                    className="rounded-[2rem] border border-white/5 overflow-hidden transition-all duration-300"
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

        {/* ── FINAL CTA ── */}
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-[#111] to-[#050505] overflow-hidden border border-white/5 text-center">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(195,244,0,0.03)_0%,transparent_70%)] pointer-events-none" />
           <h4 className="text-white font-black text-4xl md:text-6xl mb-8 relative z-10">هل أنت مستعد للتغيير؟</h4>
           <p className="text-white/40 text-xl mb-12 max-w-2xl mx-auto relative z-10 font-light">
              انضم إلى قائمة عملائنا المميزين واحصل على أفضل تجربة تجميلية في المنطقة مع تامر بيوتي سنتر.
           </p>
           <div className="flex justify-center relative z-10">
              <a 
                href="https://wa.me/972527815671?text=أرغب في حجز موعد"
                target="_blank"
                className="neon-button px-12 py-5 text-xl"
              >
                 <MessageCircle size={24} className="ml-3" />
                 تواصل معنا الآن
              </a>
           </div>
        </div>

      </div>
    </div>
  )
}
