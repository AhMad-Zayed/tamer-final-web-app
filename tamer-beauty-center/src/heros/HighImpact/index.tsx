'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const HighImpactHero: React.FC<Page['hero']> = ({ links, media, richText }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className="relative -mt-[10.4rem] min-h-[100vh] flex items-center justify-center overflow-hidden"
      data-theme="dark"
    >
      {/* ── Full-bleed background image ── */}
      {media && typeof media === 'object' && (
        <div className="absolute inset-0 z-0">
          <Media
            fill
            imgClassName="object-cover object-center"
            priority
            resource={media}
          />
          {/* Dark gradient overlay so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131313]/80 via-[#131313]/40 to-transparent" />
        </div>
      )}

      {/* ── Foreground content ── */}
      <div className="container relative z-10 flex flex-col items-center text-center px-4 pt-[10.4rem] pb-24">
        {richText && (
          <RichText
            className="mb-8 max-w-[48rem] text-white [&_h1]:text-5xl [&_h1]:md:text-7xl [&_h1]:font-display [&_h1]:tracking-tighter [&_h1]:leading-[1.05] [&_p]:text-lg [&_p]:text-white/70 [&_p]:mt-4"
            data={richText}
            enableGutter={false}
          />
        )}

        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4 mt-2">
            {links.map(({ link }, i) => {
              const isPrimary = i === 0
              return (
                <li key={i}>
                  {isPrimary ? (
                    // Solid neon-green / black text primary CTA
                    <CMSLink
                      {...link}
                      className="neon-button inline-flex items-center gap-2 text-base"
                    />
                  ) : (
                    // Ghost / transparent secondary CTA with arrow
                    <CMSLink
                      {...link}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 text-white font-bold text-base backdrop-blur-sm hover:border-white/70 transition-all duration-300 after:content-['→'] after:text-xl"
                    />
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
