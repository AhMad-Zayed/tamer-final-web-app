'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/providers/CartProvider/store'
import type { Product, ShippingZone, Media, ProductCategory } from '@/payload-types'

interface Props {
  initialProducts: Product[]
  initialShippingZones: ShippingZone[]
  initialCategories: ProductCategory[]
}

export const StorePageClient: React.FC<Props> = ({ 
  initialProducts, 
  initialShippingZones,
  initialCategories 
}) => {
  const [activeCategory, setActiveCategory] = useState('all')
  const addItem = useCart((state) => state.addItem)

  const categories = [
    { label: 'جميع المنتجات', value: 'all' },
    ...initialCategories.map(cat => ({ label: cat.title, value: cat.id.toString() }))
  ]

  const filteredProducts = initialProducts.filter((product) => {
    if (activeCategory === 'all') return true
    // product.category is now a relationship (ID or Object)
    const categoryId = typeof product.category === 'object' ? product.category.id : product.category
    return categoryId?.toString() === activeCategory
  })

  const handleAddToCart = (product: Product) => {
    const mainImage = product.imageGallery?.[0]?.image as Media
    addItem({
      id: product.id.toString(),
      title: product.title,
      price: product.salePrice || product.price,
      quantity: 1,
      image: mainImage?.url || '',
    })
    // Optional: Show a toast or feedback
  }

  return (
    <div
      dir="rtl"
      className="bg-surface text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary-fixed selection:text-on-primary"
      style={{
        background: '#131313', // surface color from the html
        fontFamily: "'Noto Kufi Arabic', 'Manrope', sans-serif",
      }}
    >
      {/* Main Content */}
      <main className="flex-grow pt-[160px] pb-24 flex flex-col space-y-24">
        {/* Header / Category Scroller */}
        <section className="w-full px-6 md:px-12 max-w-[1920px] mx-auto">
          <h1
            className="text-5xl md:text-7xl font-black tracking-tight mb-12"
            style={{ fontFamily: "'Epilogue', 'Noto Kufi Arabic', sans-serif", color: '#ffffff' }}
          >
            متجر منتجات تامر للعناية بالرجال
          </h1>

          {/* Categories Horizontal List */}
          <div
            className="flex overflow-x-auto pb-6 space-x-reverse space-x-4 snap-x"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`snap-start shrink-0 px-8 py-4 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat.value
                    ? 'bg-[#2a2a2a] text-[#ffffff]'
                    : 'bg-[#1c1b1b] text-[#c4c9ac] hover:bg-[#353535]'
                }`}
                style={{ fontFamily: 'Inter, Noto Kufi Arabic, sans-serif' }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="w-full px-6 md:px-12 max-w-[1920px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 auto-rows-[450px]">
            {filteredProducts.map((product) => {
              const mainImage = product.imageGallery?.[0]?.image as Media
              const categoryLabel = typeof product.category === 'object' 
                ? product.category.title 
                : (categories.find(c => c.value === product.category?.toString())?.label || 'منتج')

              // Logic for "Featured" can be a flag in CMS, for now let's assume if it has salePrice it's prominent or just use first 2
              // But the user didn't specify a featured flag in backend yet. I'll use index for visual variety.
              const isProminent = product.stock > 10 // Example logic

              if (isProminent) {
                return (
                  <article
                    key={product.id}
                    className="col-span-1 md:col-span-2 lg:col-span-2 row-span-1 relative group rounded-xl overflow-hidden cursor-pointer flex flex-col justify-end p-8"
                    style={{ background: '#353535' }}
                  >
                    <Image
                      src={mainImage?.url || '/store-serum.png'}
                      alt={product.title}
                      fill
                      className="absolute inset-0 object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(to top, #131313 0%, transparent 50%)',
                      }}
                    />
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end w-full gap-4">
                      <div>
                        <span
                          className="inline-block px-3 py-1 text-xs font-bold rounded-full mb-4"
                          style={{
                            fontFamily: 'Inter, Noto Kufi Arabic',
                            background: 'rgba(233, 195, 73, 0.2)',
                            color: '#e9c349',
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          {categoryLabel}
                        </span>
                        <h2
                          className="text-3xl font-bold tracking-tight mb-2"
                          style={{
                            fontFamily: "'Epilogue', 'Noto Kufi Arabic', sans-serif",
                            color: '#ffffff',
                          }}
                        >
                          {product.title}
                        </h2>
                        <div
                          className="text-sm max-w-md line-clamp-2"
                          style={{ color: '#c4c9ac', fontFamily: 'Noto Kufi Arabic' }}
                        >
                           {/* Add description if needed, or excerpt */}
                           {product.title} - تجربة تامر الفاخرة للعناية.
                        </div>
                      </div>
                      <div className="text-left flex flex-row md:flex-col items-center md:items-start justify-between w-full md:w-auto">
                        <span
                          className="text-xl font-medium mb-0 md:mb-4"
                          style={{ fontFamily: 'Inter, Noto Kufi Arabic', color: '#ffffff' }}
                        >
                          {product.salePrice ? (
                            <>
                              <span className="line-through opacity-50 ml-2 text-sm">{product.price} ₪</span>
                              <span>{product.salePrice} ₪</span>
                            </>
                          ) : (
                            <span>{product.price} ₪</span>
                          )}
                        </span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
                          style={{
                            background: '#c3f400',
                            color: '#283500',
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M6.5 22C5.67157 22 5 21.3284 5 20.5V6.5C5 5.67157 5.67157 5 6.5 5H8.25C8.25 2.92893 9.92893 1.25 12 1.25C14.0711 1.25 15.75 2.92893 15.75 5H17.5C18.3284 5 19 5.67157 19 6.5V20.5C19 21.3284 18.3284 22 17.5 22H6.5ZM12 2.75C10.7574 2.75 9.75 3.75736 9.75 5H14.25C14.25 3.75736 13.2426 2.75 12 2.75ZM6.5 6.5V20.5H17.5V6.5H15.75V8.5C15.75 8.91421 15.4142 9.25 15 9.25C14.5858 9.25 14.25 8.91421 14.25 8.5V6.5H9.75V8.5C9.75 8.91421 9.41421 9.25 9 9.25C8.58579 9.25 8.25 8.91421 8.25 8.5V6.5H6.5Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </article>
                )
              }

              return (
                <article
                  key={product.id}
                  className="col-span-1 row-span-1 relative group rounded-xl overflow-hidden flex flex-col p-6"
                  style={{
                    background: '#1c1b1b',
                    border: '1px solid rgba(68, 73, 51, 0.15)',
                  }}
                >
                  <Link href={`/products/${product.slug}`} className="relative h-[60%] w-full rounded-lg overflow-hidden mb-6 flex items-center justify-center" style={{ background: '#0e0e0e' }}>
                    <Image
                      src={mainImage?.url || '/store-serum.png'}
                      alt={product.title}
                      fill
                      className="object-cover mix-blend-luminosity opacity-80 group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <h3
                        className="text-xl font-bold tracking-tight mb-1"
                        style={{
                          fontFamily: "'Epilogue', 'Noto Kufi Arabic', sans-serif",
                          color: '#ffffff',
                        }}
                      >
                        {product.title}
                      </h3>
                      <p
                        className="text-xs uppercase tracking-widest"
                        style={{ fontFamily: 'Inter, Noto Kufi Arabic', color: '#c4c9ac' }}
                      >
                        {categoryLabel}
                      </p>
                    </div>
                    <div
                      className="flex justify-between items-center mt-4 pt-4"
                      style={{ borderTop: '1px solid rgba(68, 73, 51, 0.15)' }}
                    >
                      <span
                        className="text-lg"
                        style={{ fontFamily: 'Inter, Noto Kufi Arabic', color: '#ffffff' }}
                      >
                        {product.salePrice || product.price} ₪
                      </span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="text-sm font-bold transition-all duration-300"
                        style={{ fontFamily: 'Inter, Noto Kufi Arabic', color: '#c3f400' }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.textShadow = '0 0 15px rgba(195, 244, 0, 0.5)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.textShadow = 'none'
                        }}
                      >
                        أضف للسلة
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Gift Wrapping Section */}
        <section
          className="w-full py-24 px-6 md:px-12 relative overflow-hidden"
          style={{ background: '#2a2a2a' }} // surface-container-high
        >
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay"
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjMTMxMzEzIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDBMOCA4Wk04IDBMMCA4WiIgc3Ryb2tlPSIjMWMxYjFiIiBzdHJva2Utd2lkdGg9IjEiPjwvcGF0aD4KPC9zdmc+')",
            }}
          />
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <span
                className="text-sm font-bold tracking-widest flex items-center gap-3"
                style={{ fontFamily: 'Inter, Noto Kufi Arabic', color: '#e9c349' }} // secondary
              >
                <span className="w-8 h-[1px]" style={{ background: '#e9c349' }}></span>
                خدمات كبار العملاء
              </span>
              <h2
                className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
                style={{ fontFamily: "'Epilogue', 'Noto Kufi Arabic', sans-serif", color: '#ffffff' }}
              >
                فلسفة <br />
                <span style={{ color: '#c4c9ac' }}>الإهداء الراقي</span>
              </h2>
              <p
                className="text-lg leading-relaxed max-w-md"
                style={{ fontFamily: 'Noto Kufi Arabic', color: '#c4c9ac' }}
              >
                اجعل من هديتك ذكرى لا تُنسى مع تجربة الإهداء الحصرية لدينا. نوفر لك تغليفاً فاخراً بلمسات يدوية، بطاقات إهداء بكلمات من اختيارك، وتنسيقات زهور طبيعية تضفي مزيداً من الجمال.
              </p>
              <button
                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold rounded-xl transition-all duration-300"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(195,244,0,0.2)', // primary-fixed/20
                  color: '#c3f400', // primary-fixed
                  fontFamily: "'Epilogue', 'Noto Kufi Arabic', sans-serif",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(195,244,0,0.1)'
                  e.currentTarget.style.boxShadow = '0 0 15px rgba(195,244,0,0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                اكتشف باقات الهدايا
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div
              className="relative h-[500px] w-full rounded-xl overflow-hidden p-4"
              style={{ background: 'rgba(53, 53, 53, 0.4)', backdropFilter: 'blur(20px)' }} // glass-panel
            >
              <Image
                src="/store-gift-wrap.png"
                alt="مجموعة هدايا فاخرة مغلفة"
                fill
                className="object-cover rounded-lg mix-blend-luminosity opacity-90 p-4"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
