'use client'
import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, Check, Plus } from 'lucide-react'
import { WrappingPreviewModal } from './WrappingPreviewModal'

export interface WrappingOption {
  id: string
  name: string
  description?: string | null
  price: number
  emoji?: string | null
  mediaType: 'image_gallery' | 'external_video'
  gallery?: Array<{
    image: { url?: string | null; alt?: string | null } | null
    caption?: string | null
  }> | null
  externalUrl?: string | null
}

interface Props {
  options: WrappingOption[]
  selectedId: string | null
  onSelect: (id: string | null) => void
}

export const WrappingSelector: React.FC<Props> = ({ options, selectedId, onSelect }) => {
  const [previewOption, setPreviewOption] = useState<WrappingOption | null>(null)

  const handlePreview = useCallback((e: React.MouseEvent, option: WrappingOption) => {
    e.stopPropagation()
    setPreviewOption(option)
  }, [])

  if (options.length === 0) {
    return (
      <p className="text-white/30 text-sm text-center py-6">
        لا تتوفر خيارات تغليف حالياً
      </p>
    )
  }

  return (
    <>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
      >
        {/* None option */}
        <motion.button
          type="button"
          onClick={() => onSelect(null)}
          whileTap={{ scale: 0.98 }}
          className="relative flex items-center gap-4 p-5 rounded-2xl border-2 text-right transition-all duration-300"
          style={{
            borderColor: selectedId === null ? 'rgba(195,244,0,0.4)' : 'rgba(255,255,255,0.07)',
            background: selectedId === null
              ? 'rgba(195,244,0,0.06)'
              : 'rgba(255,255,255,0.02)',
          }}
        >
          <span className="text-3xl">🚫</span>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm">بدون تغليف</p>
            <p className="text-white/40 text-xs mt-0.5">توصيل عادي</p>
          </div>
          {selectedId === null && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: '#c3f400' }}
            >
              <Check size={12} strokeWidth={3} style={{ color: '#283500' }} />
            </div>
          )}
        </motion.button>

        {/* Wrapping option cards */}
        {options.map((option) => {
          const isSelected = selectedId === option.id
          const hasMedia =
            (option.mediaType === 'external_video' && !!option.externalUrl) ||
            (option.mediaType === 'image_gallery' &&
              option.gallery &&
              option.gallery.length > 0)

          return (
            <motion.div
              key={option.id}
              whileTap={{ scale: 0.98 }}
              className="relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-300 cursor-pointer"
              style={{
                borderColor: isSelected ? '#c3f400' : 'rgba(255,255,255,0.07)',
                background: isSelected
                  ? 'linear-gradient(135deg, rgba(195,244,0,0.07), rgba(195,244,0,0.02))'
                  : 'rgba(255,255,255,0.02)',
                boxShadow: isSelected
                  ? '0 0 28px rgba(195,244,0,0.12), inset 0 0 0 1px rgba(195,244,0,0.15)'
                  : 'none',
              }}
              onClick={() => onSelect(isSelected ? null : option.id)}
            >
              {/* Card body */}
              <div className="flex items-start gap-4 p-5">
                <span className="text-3xl shrink-0">{option.emoji || '🎁'}</span>

                <div className="flex-1 min-w-0 text-right">
                  <p
                    className="text-white font-bold text-sm leading-snug"
                    style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                  >
                    {option.name}
                  </p>
                  {option.description && (
                    <p
                      className="text-white/40 text-xs mt-1 leading-relaxed line-clamp-2"
                      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                    >
                      {option.description}
                    </p>
                  )}
                  {option.price > 0 && (
                    <span
                      className="inline-block mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold"
                      style={{ background: 'rgba(195,244,0,0.12)', color: '#c3f400' }}
                    >
                      +{option.price} ₪
                    </span>
                  )}
                  {option.price === 0 && (
                    <span
                      className="inline-block mt-2 text-[10px] font-bold"
                      style={{ color: '#c3f400' }}
                    >
                      مجاناً ✨
                    </span>
                  )}
                </div>

                {/* Selection indicator */}
                <div
                  className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all"
                  style={{
                    borderColor: isSelected ? '#c3f400' : 'rgba(255,255,255,0.2)',
                    background: isSelected ? '#c3f400' : 'transparent',
                  }}
                >
                  {isSelected && (
                    <Check size={11} strokeWidth={3} style={{ color: '#283500' }} />
                  )}
                </div>
              </div>

              {/* Preview button — only if there's media */}
              {hasMedia && (
                <div
                  className="px-5 pb-4 pt-0 flex justify-end"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={(e) => handlePreview(e, option)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all"
                    style={{
                      background: 'rgba(195,244,0,0.08)',
                      border: '1px solid rgba(195,244,0,0.2)',
                      color: '#c3f400',
                      fontFamily: "'Noto Kufi Arabic', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(195,244,0,0.16)'
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(195,244,0,0.2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(195,244,0,0.08)'
                      e.currentTarget.style.boxShadow = 'none'
                    }}
                  >
                    <Eye size={13} />
                    معاينة التغليف
                  </button>
                </div>
              )}

              {/* Selected neon top accent */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    exit={{ scaleX: 0 }}
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ background: '#c3f400', transformOrigin: 'left' }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewOption && (
          <WrappingPreviewModal
            option={previewOption}
            onClose={() => setPreviewOption(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
