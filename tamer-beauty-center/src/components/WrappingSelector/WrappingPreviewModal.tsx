'use client'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Play } from 'lucide-react'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import type { WrappingOption } from './index'

// Dynamically import ReactPlayer to avoid SSR issues
const ReactPlayer: any = dynamic(() => import('react-player'), { ssr: false })

interface Props {
  option: WrappingOption
  onClose: () => void
}

export const WrappingPreviewModal: React.FC<Props> = ({ option, onClose }) => {
  const [slideIndex, setSlideIndex] = useState(0)
  const [playerReady, setPlayerReady] = useState(false)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)

  const images = option.gallery?.filter((g) => g.image?.url) ?? []
  const totalSlides = images.length
  const isVideo = option.mediaType === 'external_video'

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (!isVideo && e.key === 'ArrowRight') prev()
      if (!isVideo && e.key === 'ArrowLeft') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [slideIndex, isVideo])

  const next = useCallback(() => {
    setSlideIndex((i) => (i + 1) % totalSlides)
  }, [totalSlides])

  const prev = useCallback(() => {
    setSlideIndex((i) => (i - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      if (info.offset.x < -60) next()
      else if (info.offset.x > 60) prev()
    },
    [next, prev]
  )

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="fixed inset-x-4 bottom-0 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[201] w-full sm:max-w-2xl flex flex-col rounded-t-3xl sm:rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #111 0%, #0a0a0a 100%)',
          border: '1px solid rgba(195,244,0,0.12)',
          boxShadow: '0 0 80px rgba(0,0,0,0.9), 0 0 40px rgba(195,244,0,0.06)',
          maxHeight: '90vh',
          fontFamily: "'Noto Kufi Arabic', sans-serif",
        }}
        dir="rtl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Neon top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[1.5px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #c3f400 50%, transparent 100%)',
          }}
        />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{option.emoji || '🎁'}</span>
            <div>
              <h2 className="text-white font-bold text-lg leading-tight">{option.name}</h2>
              <p className="text-white/40 text-xs mt-0.5">
                {isVideo ? 'معاينة الفيديو' : `${totalSlides} صورة`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-all"
            style={{ background: 'rgba(255,255,255,0.05)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
            aria-label="إغلاق"
          >
            <X size={18} className="text-white/60" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden" ref={constraintsRef}>
          {/* ── VIDEO MODE ─────────────────────────────────────────── */}
          {isVideo && option.externalUrl && (
            <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
              <div className="absolute inset-0 bg-[#0a0a0a]">
                {!playerReady && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                      className="w-8 h-8 rounded-full border-2 border-t-transparent"
                      style={{ borderColor: 'rgba(195,244,0,0.4)', borderTopColor: 'transparent' }}
                    />
                    <p className="text-white/40 text-xs">جاري تحميل الفيديو...</p>
                  </div>
                )}
                {/* @ts-ignore - react-player types are incomplete when using next/dynamic */}
                <ReactPlayer
                  url={option.externalUrl}
                  width="100%"
                  height="100%"
                  controls
                  playing={false}
                  onReady={() => setPlayerReady(true)}
                  config={({
                    facebook: { appId: '966242223397117' }, // public FB app ID
                    youtube: { playerVars: { hl: 'ar', cc_lang_pref: 'ar' } },
                  }) as any}
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
              </div>
            </div>
          )}

          {/* ── GALLERY MODE ────────────────────────────────────────── */}
          {!isVideo && totalSlides > 0 && (
            <div className="relative overflow-hidden select-none" style={{ minHeight: '320px' }}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={slideIndex}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  drag="x"
                  dragConstraints={constraintsRef}
                  dragElastic={0.15}
                  onDragEnd={handleDragEnd}
                  className="relative w-full"
                  style={{ minHeight: '320px' }}
                >
                  <Image
                    src={images[slideIndex]?.image?.url || '/store-serum.png'}
                    alt={images[slideIndex]?.caption || option.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 672px"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption */}
              {images[slideIndex]?.caption && (
                <motion.div
                  key={`cap-${slideIndex}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs font-bold text-white/70"
                  style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(12px)' }}
                >
                  {images[slideIndex].caption}
                </motion.div>
              )}

              {/* Navigation arrows */}
              {totalSlides > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(195,244,0,0.4)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    aria-label="السابق"
                  >
                    <ChevronRight size={20} className="text-white/70" />
                  </button>
                  <button
                    onClick={next}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all"
                    style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(195,244,0,0.4)')}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                    aria-label="التالي"
                  >
                    <ChevronLeft size={20} className="text-white/70" />
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer — dot pagination for gallery */}
        {!isVideo && totalSlides > 1 && (
          <div className="flex items-center justify-center gap-2 py-4 border-t border-white/[0.06]">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIndex(i)}
                className="transition-all rounded-full"
                style={{
                  width: i === slideIndex ? '20px' : '6px',
                  height: '6px',
                  background: i === slideIndex ? '#c3f400' : 'rgba(255,255,255,0.2)',
                }}
                aria-label={`الصورة ${i + 1}`}
              />
            ))}
            <span className="text-white/30 text-xs mr-2">
              {slideIndex + 1} / {totalSlides}
            </span>
          </div>
        )}

        {/* Description footer */}
        {option.description && (
          <div
            className="px-6 py-4 text-sm text-white/50 border-t border-white/[0.06] leading-relaxed"
            style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
          >
            {option.description}
          </div>
        )}
      </motion.div>
    </>
  )
}
