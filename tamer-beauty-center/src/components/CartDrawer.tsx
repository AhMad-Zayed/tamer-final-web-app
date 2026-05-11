'use client'
import React, { useEffect, useState } from 'react'
import { useCart } from '@/providers/CartProvider/store'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'

export const CartDrawer: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { items, removeItem, updateQuantity, getSubtotal } = useCart()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md z-[101] bg-[#131313] shadow-2xl flex flex-col"
            dir="rtl"
          >
            {/* Header */}
            <div className="p-6 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-[#c3f400]" size={24} />
                <h2 className="text-xl font-bold text-white">سلة التسوق</h2>
                <span className="bg-[#c3f400] text-[#283500] text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                    <ShoppingBag size={40} className="text-white/20" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">سلتك فارغة</h3>
                    <p className="text-white/40 text-sm">ابدأ بإضافة بعض المنتجات الرائعة!</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="px-8 py-3 bg-[#c3f400] text-[#283500] font-bold rounded-full hover:shadow-[0_0_20px_rgba(195,244,0,0.3)] transition-all"
                  >
                    تصفح المتجر
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={`${item.id}-${item.variant?.label}`} className="flex gap-4 group">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-[#1c1b1b] shrink-0">
                      <Image
                        src={item.image || '/store-serum.png'}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold text-sm leading-tight line-clamp-1">
                            {item.title}
                          </h4>
                          <button
                            onClick={() => removeItem(item.id, item.variant?.label)}
                            className="text-white/20 hover:text-red-400 transition-colors p-1"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {item.variant && (
                          <p className="text-[#c3f400] text-[10px] uppercase tracking-wider mt-1">
                            {item.variant.label}
                          </p>
                        )}
                        <p className="text-white/60 text-sm mt-1">{item.price} ₪</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center bg-white/5 rounded-full border border-white/10 px-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant?.label)}
                            className="p-1 hover:text-[#c3f400] transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant?.label)}
                            className="p-1 hover:text-[#c3f400] transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 bg-[#1c1b1b] border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/60">المجموع الفرعي</span>
                  <span className="text-2xl font-bold text-white">{getSubtotal()} ₪</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="w-full py-4 bg-[#c3f400] text-[#283500] font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-[0_0_30px_rgba(195,244,0,0.4)] transition-all"
                >
                  إتمام الطلب
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
