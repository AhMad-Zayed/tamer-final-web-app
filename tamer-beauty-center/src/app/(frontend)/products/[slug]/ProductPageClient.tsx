'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/providers/CartProvider/store'
import type { Product, Media } from '@/payload-types'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Props {
  product: Product
}

export const ProductPageClient: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants && product.variants.length > 0 ? product.variants[0] : null
  )
  const addItem = useCart((state) => state.addItem)

  const handleAddToCart = () => {
    const mainImage = product.imageGallery?.[0]?.image as Media
    addItem({
      id: product.id.toString(),
      title: product.title,
      price: product.salePrice || product.price,
      quantity,
      image: mainImage?.url || '',
      variant: selectedVariant ? {
        label: selectedVariant.label,
        type: selectedVariant.type,
        additionalPrice: selectedVariant.additionalPrice || 0
      } : undefined
    })
  }

  const images = product.imageGallery?.map(item => item.image as Media) || []
  const currentPrice = (product.salePrice || product.price) + (selectedVariant?.additionalPrice || 0)

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20" dir="rtl">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <Link 
          href="/store" 
          className="inline-flex items-center gap-2 text-white/40 hover:text-[#c3f400] transition-colors mb-12 group"
        >
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          <span>العودة للمتجر</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Visuals Column */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#131313] border border-white/5 shadow-2xl"
            >
              <Image
                src={images[activeImage]?.url || '/store-serum.png'}
                alt={product.title}
                fill
                className="object-cover"
              />
            </motion.div>
            
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-[#c3f400] scale-95' : 'border-transparent opacity-40 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url || ''} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="text-[#c3f400] text-sm font-bold tracking-widest uppercase mb-4 block">
                {product.category}
              </span>
              <h1 className="text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Epilogue', sans-serif" }}>
                {product.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-bold text-white">{currentPrice} ₪</span>
                {product.salePrice && (
                   <span className="text-xl text-white/20 line-through">{product.price} ₪</span>
                )}
              </div>

              <div className="h-px w-full bg-white/10 mb-8" />

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-white/60 text-sm mb-4">اختر الخيار المناسب:</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-6 py-3 rounded-xl border font-bold transition-all ${
                          selectedVariant?.label === v.label
                            ? 'bg-[#c3f400] border-[#c3f400] text-[#283500]'
                            : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <div className="flex items-center justify-between bg-[#1c1b1b] rounded-2xl border border-white/10 p-2 sm:w-40">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="text-xl font-bold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                
                <button
                  onClick={handleAddToCart}
                  className="flex-grow py-5 bg-[#c3f400] text-[#283500] font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(195,244,0,0.4)] transition-all transform active:scale-[0.98]"
                >
                  <ShoppingBag size={24} />
                  إضافة إلى السلة
                </button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-3 mb-10">
                <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-[#c3f400] animate-pulse' : 'bg-red-500'}`} />
                <span className="text-white/60 text-sm">
                  {product.stock > 0 ? `متوفر في المخزون (${product.stock} قطعة)` : 'نفدت الكمية'}
                </span>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-white font-bold">وصف المنتج</h3>
                <div className="text-white/60 leading-relaxed text-lg prose prose-invert max-w-none">
                  {/* Rich Text should be rendered here, for now a placeholder text */}
                  {product.title} - صُمم خصيصاً في تامر بيوتي سنتر لتقديم تجربة عناية استثنائية تفوق التوقعات.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
