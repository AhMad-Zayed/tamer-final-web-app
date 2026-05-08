'use client'
import React from 'react'
import { Percent, Clock } from 'lucide-react'
import Link from 'next/link'

export const OffersBlockComponent: React.FC<any> = ({ heading, subheading, offers }) => {
  const calculateDaysLeft = (dateString: string) => {
    if (!dateString) return 0
    const diff = new Date(dateString).getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  return (
    <section className="py-16 md:py-24 bg-[#050505] relative" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-end justify-between mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-md">{heading}</h2>
            {subheading && (
              <p className="text-[#c3f400] font-semibold tracking-[0.2em] uppercase text-sm">
                {subheading}
              </p>
            )}
          </div>
          <Percent size={64} strokeWidth={1.5} className="text-[#c3f400] opacity-10 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers &&
            offers.map((relationData: any, i: number) => {
              const offer = relationData.value || relationData
              if (!offer?.title) return null
              
              const imgUrl = typeof offer.image === 'string' ? offer.image : offer.image?.url || ''
              const daysLeft = calculateDaysLeft(offer.expirationDate)
              
              return (
                <Link
                  href={`/offers/${offer.slug || ''}`}
                  key={i}
                  className="group relative bg-[#0a0a0a]/90 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#c3f400]/30 transition-all duration-500 hover:-translate-y-2 block shadow-lg hover:shadow-xl hover:shadow-[#c3f400]/5"
                >
                  <div className="absolute top-5 left-5 z-20 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                    <Clock size={14} className="text-[#c3f400]" />
                    <span className="text-white font-semibold text-[11px] md:text-xs">
                      {daysLeft > 0 ? `ينتهي خلال ${daysLeft} يوم` : 'ينتهي قريباً'}
                    </span>
                  </div>
                  {offer.limitedTag && (
                    <div className="absolute top-5 right-5 z-20 bg-[#c3f400] text-black px-4 py-2 rounded-full font-bold text-[11px] md:text-xs uppercase tracking-tight shadow-md">
                      {offer.limitedTag}
                    </div>
                  )}
                  <div className="h-64 overflow-hidden relative border-b border-white/5">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent z-10" />
                    {imgUrl && (
                      <img
                        src={imgUrl}
                        alt={offer.title}
                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-[30%] group-hover:brightness-100 transition-all duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="p-8 relative z-20">
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-[#c3f400] transition-colors tracking-tight">{offer.title}</h3>
                    {offer.description && (
                      <p className="text-neutral-400 text-sm md:text-base font-medium mb-6 leading-relaxed line-clamp-2">{offer.description}</p>
                    )}
                    <div className="flex items-end gap-4">
                      <div className="text-4xl font-bold text-[#c3f400]">
                        {offer.newPrice}
                        <span className="text-xl ml-1 text-[#c3f400]/70">{offer.currency}</span>
                      </div>
                      {offer.oldPrice && (
                        <div className="text-xl text-neutral-500 line-through font-semibold mb-1">
                          {offer.oldPrice}
                        </div>
                      )}
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
