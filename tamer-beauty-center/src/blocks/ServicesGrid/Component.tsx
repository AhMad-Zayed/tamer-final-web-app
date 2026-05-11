'use client'
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronLeft, Zap } from 'lucide-react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

export type ServiceCard = {
  title: string
  description?: string | null
  image?: number | MediaType | null
  size?: 'wide' | 'small' | 'full' | null
  tag?: string | null
  link?: string | null
  id?: string | null
}

export type ServicesGridBlockProps = {
  heading?: string | null
  subheading?: string | null
  services?: ServiceCard[] | null
  blockType: 'servicesGrid'
}

const colSpanMap: Record<string, string> = {
  wide: 'col-span-12 md:col-span-8',
  small: 'col-span-12 md:col-span-4',
  full: 'col-span-12',
}

export const ServicesGridBlock: React.FC<ServicesGridBlockProps> = ({
  heading,
  subheading,
  services,
}) => {
  const cards = services ?? []

  return (
    <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto w-full">
      {(heading || subheading) && (
        <div className="mb-16 text-right" dir="rtl">
          {heading && (
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-white/50 text-lg max-w-xl leading-relaxed">{subheading}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-12 gap-6">
        {cards.map((card, index) => {
          const size = card.size ?? 'small'
          const colSpan = colSpanMap[size]
          const isLaser = card.tag?.includes('ليزر') || card.title.includes('ليزر')

          return (
            <motion.div
              key={card.id ?? index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`${colSpan} relative min-h-[380px] group overflow-hidden rounded-[2rem] bg-white/[0.02] shadow-obsidian-deep cursor-pointer border-none`}
            >
              {/* Neon Glow Hover */}
              <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
                style={{
                  background: isLaser 
                    ? 'radial-gradient(circle at center, rgba(195,244,0,0.25), transparent 70%)'
                    : 'radial-gradient(circle at center, rgba(195,244,0,0.1), transparent 70%)',
                }}
              />

              {/* Background image */}
              {card.image && typeof card.image === 'object' && (
                <div className="absolute inset-0 z-0">
                  <Media
                    fill
                    imgClassName="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    resource={card.image as MediaType}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
                </div>
              )}

              {/* Content overlay */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-right" dir="rtl">
                {card.tag && (
                  <span className="inline-flex self-start mb-4 px-4 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#c3f400]/10 text-[#c3f400] border border-[#c3f400]/20">
                    {card.tag}
                  </span>
                )}

                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">
                  {card.title}
                </h3>

                {card.description && (
                  <p className="text-white/50 text-sm leading-relaxed line-clamp-2 mb-6">
                    {card.description}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto">
                  {card.link && (
                    <Link
                      href={card.link}
                      className="inline-flex items-center gap-2 text-[#c3f400] text-xs font-bold"
                    >
                      اكتشف المزيد
                      <ChevronLeft size={14} />
                    </Link>
                  )}
                  <div className="w-10 h-10 rounded-2xl bg-[#c3f400] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <Zap size={18} className="text-black" />
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
