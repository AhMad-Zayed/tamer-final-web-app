'use client'
import React from 'react'
import { ShoppingBag, Gift, ArrowRight } from 'lucide-react'
import Image from 'next/image'

export const StoreShowcaseBlock: React.FC<any> = ({ heading, subtitle, giftTitle, giftDesc, categories }) => {
  return (
    <section className="py-16 md:py-24 bg-[#050505] relative border-t border-white/5" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 relative">
          <ShoppingBag size={64} strokeWidth={1.5} className="text-[#c3f400] opacity-5 absolute left-1/2 -translate-x-1/2 -top-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white relative z-10 drop-shadow-md">{heading}</h2>
          {subtitle && (
            <p className="text-neutral-400 tracking-[0.2em] uppercase text-sm relative z-10 font-semibold">{subtitle}</p>
          )}
        </div>

        {categories && categories.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
            {categories.map((cat: any, i: number) => {
              const imgUrl = typeof cat.image === 'string' ? cat.image : cat.image?.url || ''
              return (
                <div
                  key={i}
                  className="group relative h-[320px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/5 shadow-lg"
                >
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-700 z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                  {imgUrl && (
                    <Image
                      src={imgUrl}
                      fill
                      className="absolute inset-0 object-cover grayscale brightness-[0.8] group-hover:scale-105 group-hover:grayscale-[20%] transition-all duration-700"
                      alt={cat.name || 'منتج تامر بيوتي'}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  )}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-end">
                    <h3 className="text-xl font-bold text-white tracking-tight">{cat.name}</h3>
                    <div className="w-10 h-10 rounded-full bg-[#c3f400] text-black flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight size={20} className="rotate-180" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        <div className="bg-gradient-to-r from-neutral-900 to-[#0a0a0a] p-[1px] rounded-[2.5rem] border border-white/5 shadow-2xl">
          <div className="bg-[#050505] rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                <Gift size={28} className="text-[#c3f400]" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{giftTitle}</h3>
                {giftDesc && (
                  <p className="text-neutral-400 text-base font-medium">{giftDesc}</p>
                )}
              </div>
            </div>
            <button className="bg-white text-black px-8 py-3.5 rounded-full font-bold text-base hover:bg-[#c3f400] transition-colors whitespace-nowrap shadow-lg">
              تسوق الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
