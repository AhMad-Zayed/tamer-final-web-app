'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/providers/CartProvider/store'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react'

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isMounted) return null

  const subtotal = getSubtotal()
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-[420px] z-[101] flex flex-col"
            dir="rtl"
            style={{
              background: 'linear-gradient(180deg, #0f0f0f 0%, #131313 100%)',
              boxShadow: '-8px 0 60px rgba(0,0,0,0.8), -1px 0 0 rgba(195,244,0,0.08)',
            }}
          >
            {/* Neon top accent line */}
            <div
              className="absolute top-0 right-0 left-0 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, #c3f400, transparent)',
                opacity: 0.6,
              }}
            />

            {/* Header */}
            <div className="relative p-6 flex items-center justify-between border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(195,244,0,0.1)', border: '1px solid rgba(195,244,0,0.2)' }}
                >
                  <ShoppingBag size={20} style={{ color: '#c3f400' }} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white leading-none">سلة التسوق</h2>
                  <p className="text-white/40 text-xs mt-0.5">
                    {itemCount > 0 ? `${itemCount} ${itemCount === 1 ? 'منتج' : 'منتجات'}` : 'فارغة'}
                  </p>
                </div>
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mr-1 px-2 py-0.5 rounded-full text-xs font-black"
                    style={{ background: '#c3f400', color: '#283500' }}
                  >
                    {itemCount}
                  </motion.span>
                )}
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              >
                <X size={18} className="text-white/60" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto px-4 py-4 space-y-3"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(195,244,0,0.15) transparent' }}
            >
              <AnimatePresence initial={false}>
                {items.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center gap-6 px-8"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                      transition={{ repeat: Infinity, duration: 3 }}
                      className="w-24 h-24 rounded-full flex items-center justify-center"
                      style={{ background: 'rgba(195,244,0,0.05)', border: '1px solid rgba(195,244,0,0.1)' }}
                    >
                      <ShoppingBag size={40} className="text-white/20" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">سلتك فارغة</h3>
                      <p className="text-white/40 text-sm leading-relaxed">
                        ابدأ رحلتك مع منتجات تامر للعناية الفاخرة
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="px-8 py-3 font-bold rounded-full text-sm transition-all"
                      style={{
                        background: '#c3f400',
                        color: '#283500',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 24px rgba(195,244,0,0.35)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                    >
                      تصفح المتجر
                    </button>
                  </motion.div>
                ) : (
                  items.map((item, index) => (
                    <motion.div
                      key={`${item.id}-${item.variant?.label}`}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative flex gap-4 p-4 rounded-2xl transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                      onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(195,244,0,0.15)')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
                    >
                      {/* Product Image */}
                      <div
                        className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0"
                        style={{ background: '#1c1b1b' }}
                      >
                        <Image
                          src={item.image || '/store-serum.png'}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-grow flex flex-col justify-between py-0.5 min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="text-white font-bold text-sm leading-snug line-clamp-2 flex-1">
                              {item.title}
                            </h4>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeItem(item.id, item.variant?.label)}
                              className="shrink-0 p-1.5 rounded-lg transition-colors text-white/20 hover:text-red-400"
                              style={{ background: 'rgba(255,255,255,0.03)' }}
                            >
                              <Trash2 size={14} />
                            </motion.button>
                          </div>
                          {item.variant && (
                            <span
                              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold mt-1.5 uppercase tracking-wider"
                              style={{ background: 'rgba(195,244,0,0.1)', color: '#c3f400' }}
                            >
                              {item.variant.label}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          {/* Quantity Controls */}
                          <div
                            className="flex items-center gap-0 rounded-full overflow-hidden"
                            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
                          >
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.label)}
                              className="w-8 h-8 flex items-center justify-center transition-colors text-white/40 hover:text-white hover:bg-white/5"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.label)}
                              className="w-8 h-8 flex items-center justify-center transition-colors text-white/40 hover:text-[#c3f400] hover:bg-white/5"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Price */}
                          <span className="text-white font-bold text-sm">
                            {((item.price + (item.variant?.additionalPrice || 0)) * item.quantity).toFixed(0)} ₪
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 space-y-4"
                style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.4)' }}
              >
                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-white/50">
                    <span>المجموع الفرعي</span>
                    <span>{subtotal} ₪</span>
                  </div>
                  <div className="flex justify-between text-sm text-white/50">
                    <span>الشحن</span>
                    <span className="text-[#c3f400]/80 text-xs font-bold">يُحسب عند الطلب</span>
                  </div>
                  <div
                    className="flex justify-between items-center pt-3"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
                  >
                    <span className="text-white font-bold">الإجمالي</span>
                    <span className="text-2xl font-black text-white">{subtotal} ₪</span>
                  </div>
                </div>

                {/* COD Badge */}
                <div
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs"
                  style={{ background: 'rgba(195,244,0,0.05)', border: '1px solid rgba(195,244,0,0.1)' }}
                >
                  <Sparkles size={14} style={{ color: '#c3f400' }} />
                  <span className="text-white/60">الدفع عند الاستلام أو في المركز</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-bold text-sm transition-all"
                  style={{ background: '#c3f400', color: '#283500' }}
                  onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 0 40px rgba(195,244,0,0.4)')}
                  onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
                >
                  <span>إتمام الطلب</span>
                  <ArrowLeft size={18} />
                </Link>

                <p className="text-center text-white/20 text-[10px]">
                  🔒 تسوق آمن — بدون بطاقة ائتمان
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
