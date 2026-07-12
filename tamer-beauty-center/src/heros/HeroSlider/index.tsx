'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'

import type { Page } from '@/payload-types'

export const HeroSlider: React.FC<Page['hero']> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (!slides || slides.length === 0) return

    let timer: ReturnType<typeof setInterval> | null = null

    const start = () => {
      if (timer) return
      timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % slides.length), 7000)
    }

    const stop = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }

    const handleVisibilityChange = () => {
      if (document.hidden) stop()
      else start()
    }

    start()
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [slides])

  if (!slides || slides.length === 0) return null

  const activeSlide = slides[currentSlide]
  // @ts-expect-error payload media type might be string or object
  const imgUrl = typeof activeSlide.img === 'string' ? activeSlide.img : activeSlide.img?.url || ''

  return (
    <section className="relative h-[95vh] flex items-center overflow-hidden bg-black" dir="rtl">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2.5 }}
          className="absolute inset-0"
        >
          {imgUrl && (
            <Image
              src={imgUrl}
              fill
              className="object-cover grayscale brightness-[0.25]"
              alt={activeSlide.title || 'تامر بيوتي سنتر'}
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 0.4 }}
        >
          <span className="text-[#c3f400] font-semibold tracking-[0.4em] text-xs md:text-sm mb-6 block uppercase">
            — THE NEON SANCTUARY
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 tracking-tight text-white drop-shadow-xl">
            {activeSlide.title} <br />
            {activeSlide.subtitle && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic font-medium">
                {activeSlide.subtitle}
              </span>
            )}
          </h1>
          {activeSlide.desc && (
            <p className="text-neutral-300 max-w-2xl text-lg md:text-xl mb-10 leading-relaxed border-r-2 border-[#c3f400] pr-6 font-medium">
              {activeSlide.desc}
            </p>
          )}
          <button className="bg-[#c3f400] text-black px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-lg shadow-[#c3f400]/20 flex items-center gap-4">
            ابدأ رحلتك <ArrowRight size={24} />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-20 right-12 flex gap-6 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-1.5 transition-all duration-700 ${
              currentSlide === i ? 'w-32 bg-[#c3f400]' : 'w-12 bg-white/10'
            }`}
            aria-label={`انتقل إلى الشريحة ${i + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
