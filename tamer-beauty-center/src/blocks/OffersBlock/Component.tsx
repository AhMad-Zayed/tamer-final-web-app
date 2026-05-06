'use client'
import React, { useRef, useState } from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

// Local type — superseded after `payload generate:types`
export type OfferCard = {
  title: string
  description?: string | null
  image?: number | MediaType | null
  oldPrice?: number | null
  newPrice: number
  currency?: string | null
  limitedTag?: string | null
  expiryDate?: string | null
  link?: string | null
  id?: string | null
}

export type OffersBlockProps = {
  heading?: string | null
  subheading?: string | null
  offers?: OfferCard[] | null
  blockType: 'offersBlock'
  blockName?: string | null
  id?: string | null
}

function formatPrice(price: number, currency = 'ر.س') {
  return `${price.toLocaleString('ar-SA')} ${currency}`
}

export const OffersBlockComponent: React.FC<OffersBlockProps> = ({
  heading,
  subheading,
  offers,
}) => {
  const cards = offers ?? []
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (index: number) => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[index] as HTMLElement
    if (!card) return
    el.scrollTo({ left: card.offsetLeft - 24, behavior: 'smooth' })
    setActiveIndex(index)
  }

  return (
    <section className="py-24 overflow-hidden">
      <div className="container">
        {/* ── Section header ── */}
        {(heading || subheading) && (
          <div className="flex items-end justify-between mb-10" dir="rtl">
            <div>
              {heading && (
                <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-white mb-2">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="text-white/60 text-lg">{subheading}</p>
              )}
            </div>

            {/* Dot navigation */}
            {cards.length > 1 && (
              <div className="flex items-center gap-2 pb-1">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollTo(i)}
                    aria-label={`الانتقال إلى العرض ${i + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-6 h-2 bg-primary-neon'
                        : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Horizontally scrollable card track ── */}
      {/* Padding-x is applied on the container but the scroll area bleeds out */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth pb-4 px-[max(1rem,calc((100vw-1280px)/2+1.5rem))] snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none' }}
        onScroll={(e) => {
          const el = e.currentTarget
          const cardWidth = (el.children[0] as HTMLElement)?.offsetWidth ?? 340
          setActiveIndex(Math.round(el.scrollLeft / (cardWidth + 20)))
        }}
      >
        {cards.map((offer, index) => {
          const hasImage = offer.image && typeof offer.image === 'object'
          const currency = offer.currency ?? 'ر.س'

          return (
            <div
              key={offer.id ?? index}
              className="relative flex-none w-[300px] md:w-[340px] rounded-2xl overflow-hidden glass-card border border-white/[0.06] snap-start group"
              dir="rtl"
            >
              {/* ── LIMITED TIME tag (top-left / RTL: top-right visually) ── */}
              {offer.limitedTag && (
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary-neon text-[#283500] shadow-neon-glow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#283500] animate-pulse" />
                    {offer.limitedTag}
                  </span>
                </div>
              )}

              {/* ── Card image ── */}
              <div className="relative h-48 w-full overflow-hidden">
                {hasImage ? (
                  <>
                    <Media
                      fill
                      imgClassName="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      resource={offer.image as MediaType}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] to-transparent" />
                  </>
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-surface-container-low to-[#252525]" />
                )}
              </div>

              {/* ── Card body ── */}
              <div className="p-5">
                <h3 className="font-display text-lg text-white tracking-tight leading-snug mb-2">
                  {offer.title}
                </h3>

                {offer.description && (
                  <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
                    {offer.description}
                  </p>
                )}

                {/* ── Pricing ── */}
                <div className="flex items-baseline gap-3 mb-1">
                  {/* New price — bold neon yellow (secondary color) */}
                  <span className="text-2xl font-bold text-secondary">
                    {formatPrice(offer.newPrice, currency)}
                  </span>

                  {/* Old price — struck-through */}
                  {offer.oldPrice != null && (
                    <span className="text-sm text-white/40 line-through decoration-white/40">
                      {formatPrice(offer.oldPrice, currency)}
                    </span>
                  )}
                </div>

                {/* Expiry label */}
                {offer.expiryDate && (
                  <p className="text-white/40 text-xs mb-4">{offer.expiryDate}</p>
                )}

                {/* CTA */}
                {offer.link ? (
                  <a
                    href={offer.link}
                    className="neon-button w-full flex items-center justify-center text-sm mt-3"
                  >
                    احجز الآن
                  </a>
                ) : (
                  <button className="neon-button w-full flex items-center justify-center text-sm mt-3">
                    احجز الآن
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
