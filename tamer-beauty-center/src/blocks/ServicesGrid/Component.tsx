import React from 'react'
import Image from 'next/image'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

// Local type — superseded after `payload generate:types`
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
  blockName?: string | null
  id?: string | null
}

const colSpanMap: Record<string, string> = {
  wide: 'col-span-12 md:col-span-8',
  small: 'col-span-12 md:col-span-4',
  full: 'col-span-12',
}

const heightMap: Record<string, string> = {
  wide: 'min-h-[380px]',
  small: 'min-h-[380px]',
  full: 'min-h-[300px]',
}

export const ServicesGridBlock: React.FC<ServicesGridBlockProps> = ({
  heading,
  subheading,
  services,
}) => {
  const cards = services ?? []

  return (
    <section className="container py-16 md:py-24">
      {/* ── Section header ── */}
      {(heading || subheading) && (
        <div className="mb-12" dir="rtl">
          {heading && (
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white mb-3 drop-shadow-md">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-white/60 text-lg max-w-xl font-medium">{subheading}</p>
          )}
        </div>
      )}

      {/* ── Bento grid ── */}
      <div className="grid grid-cols-12 gap-4">
        {cards.map((card, index) => {
          const size = card.size ?? 'small'
          const colSpan = colSpanMap[size]
          const height = heightMap[size]
          const hasImage = card.image && typeof card.image === 'object'

          return (
            <div
              key={card.id ?? index}
              className={`${colSpan} ${height} relative group overflow-hidden rounded-2xl glass-card border border-white/[0.06] cursor-pointer`}
            >
              {/* Background image */}
              {hasImage && (
                <div className="absolute inset-0 z-0">
                  <Media
                    fill
                    imgClassName="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    resource={card.image as MediaType}
                  />
                  {/* gradient scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/90 via-[#131313]/30 to-transparent" />
                </div>
              )}

              {/* No-image fallback gradient */}
              {!hasImage && (
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-surface-container-low to-[#1a1a1a]" />
              )}

              {/* Content overlay */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6" dir="rtl">
                {/* Tag badge */}
                {card.tag && (
                  <span className="inline-block self-start mb-3 px-3 py-1 rounded-full text-xs font-semibold bg-primary-neon/20 text-primary-neon border border-primary-neon/30">
                    {card.tag}
                  </span>
                )}

                <h3 className="font-display text-xl md:text-2xl text-white tracking-tight mb-2">
                  {card.title}
                </h3>

                {card.description && (
                  <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
                    {card.description}
                  </p>
                )}

                {card.link && (
                  <a
                    href={card.link}
                    className="mt-4 inline-flex items-center gap-2 text-primary-neon text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    اكتشف المزيد
                    <span className="text-base">←</span>
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
