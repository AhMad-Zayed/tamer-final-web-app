import React from 'react'
import { Media } from '@/components/Media'
import type { Media as MediaType } from '@/payload-types'

// Local type — will be superseded once `payload generate:types` is run
// after registering the block in the Pages collection.
export type ExpertsOrbitBlockProps = {
  heading?: string | null
  subheading?: string | null
  centerImage: number | MediaType
  experts?:
    | {
        name: string
        title?: string | null
        image: number | MediaType
        id?: string | null
      }[]
    | null
  blockType: 'expertsOrbit'
  blockName?: string | null
  id?: string | null
}

// Orbit positions for up to 6 items.
// Each entry is [top%, left%] relative to the orbit container.
const ORBIT_POSITIONS = [
  { top: '0%',   left: '50%',  transform: 'translate(-50%, -50%)' },  // 12 o'clock
  { top: '25%',  left: '93%',  transform: 'translate(-50%, -50%)' },  // 2 o'clock
  { top: '75%',  left: '93%',  transform: 'translate(-50%, -50%)' },  // 4 o'clock
  { top: '100%', left: '50%',  transform: 'translate(-50%, -50%)' },  // 6 o'clock
  { top: '75%',  left: '7%',   transform: 'translate(-50%, -50%)' },  // 8 o'clock
  { top: '25%',  left: '7%',   transform: 'translate(-50%, -50%)' },  // 10 o'clock
]

export const ExpertsOrbitBlock: React.FC<ExpertsOrbitBlockProps> = ({
  heading,
  subheading,
  centerImage,
  experts,
}) => {
  const expertList = experts ?? []

  return (
    <section className="container py-24">
      {/* ── Section header ── */}
      {(heading || subheading) && (
        <div className="text-center mb-16">
          {heading && (
            <h2 className="font-display text-4xl md:text-5xl tracking-tighter text-white mb-3">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-white/60 text-lg max-w-xl mx-auto">{subheading}</p>
          )}
        </div>
      )}

      {/* ── Orbit container ── */}
      {/* We use a fixed aspect-ratio square so absolute positioning is consistent */}
      <div className="relative mx-auto" style={{ width: '100%', maxWidth: '640px' }}>
        {/* Invisible square to anchor aspect ratio */}
        <div className="w-full" style={{ paddingBottom: '100%' }} />

        {/* Dashed orbit ring */}
        <div
          className="absolute inset-[12%] rounded-full border border-dashed border-white/10"
          aria-hidden="true"
        />

        {/* ── Center image ── */}
        <div className="absolute inset-[22%] rounded-full overflow-hidden ring-2 ring-primary-neon/30 shadow-neon-glow">
          {centerImage && typeof centerImage === 'object' && (
            <Media
              fill
              imgClassName="object-cover object-center"
              resource={centerImage}
            />
          )}
        </div>

        {/* ── Orbiting expert profiles ── */}
        {expertList.slice(0, 6).map((expert, index) => {
          const pos = ORBIT_POSITIONS[index]
          return (
            <div
              key={expert.id ?? index}
              className="absolute flex flex-col items-center gap-1.5"
              style={{
                top: pos.top,
                left: pos.left,
                transform: pos.transform,
                width: '88px',
              }}
            >
              {/* Profile circle */}
              <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-white/20 shadow-lg flex-shrink-0">
                {expert.image && typeof expert.image === 'object' && (
                  <Media
                    fill
                    imgClassName="object-cover object-center"
                    resource={expert.image}
                  />
                )}
              </div>

              {/* Name + title */}
              <div className="text-center">
                <p className="text-white text-xs font-semibold leading-tight">{expert.name}</p>
                {expert.title && (
                  <p className="text-white/50 text-[10px] leading-tight mt-0.5">{expert.title}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
