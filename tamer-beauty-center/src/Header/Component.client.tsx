'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { ShoppingBag } from 'lucide-react'
import { useCart } from '@/providers/CartProvider/store'
import { CartDrawer } from '@/components/CartDrawer'

import type { Header } from '@/payload-types'

interface HeaderClientProps {
  data: Header
  experts?: any[]
  services?: any[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, experts = [], services = [] }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null)
  const { setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()
  const cartItems = useCart((state) => state.items)

  useEffect(() => {
    setHeaderTheme('dark')
  }, [pathname, setHeaderTheme])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open or cart is open
  useEffect(() => {
    document.body.style.overflow = (menuOpen || cartOpen) ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen, cartOpen])

  // DYNAMIC FALLBACK NAV — always live from database
  const SERVICE_CATEGORIES = [
    { label: 'إزالة الشعر بالليزر', value: 'laser',    slug: 'laser-hair-removal' },
    { label: 'علاجات البشرة السريرية', value: 'skin',  slug: 'clinical-skin-care' },
    { label: 'خدمات الشعر 3D',       value: 'hair',    slug: '3d-hair-design' },
    { label: 'الحجامة والعلاجات',    value: 'wellness', slug: 'wellness-cupping' },
    { label: 'خدمة العريس VIP',      value: 'vip',     slug: 'vip-groom' },
  ]

  // Build services sub-items from DB or fallback to static slugs
  const serviceSubItems = SERVICE_CATEGORIES.map(cat => {
    const dbSvc = services.find(s => s.category === cat.value)
    return { label: cat.label, href: `/services/${dbSvc?.slug || cat.slug}` }
  })

  const dynamicNavItems = [
    { label: 'الرئيسية', href: '/' },
    { label: 'من نحن', href: '/about' },
    { label: 'الخدمات', href: '/services', subItems: serviceSubItems },
    { label: 'الأكاديمية', href: '/academy' },
    { label: 'المتجر', href: '/store' },
    { label: 'اتصل بنا', href: '/contact' },
    { 
      label: 'الموظفون', 
      href: '#',
      subItems: experts.map(exp => ({
        label: exp.name,
        href: `/experts/${exp.slug}`
      }))
    },
  ]

  const navItemsToUse = dynamicNavItems.map(item => ({ 
    link: { type: 'custom', label: item.label, url: item.href }, 
    subItems: item.subItems ? item.subItems.map((sub: any) => ({ link: { type: 'custom', label: sub.label, url: sub.href } })) : [] 
  }))

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? 'rgba(5,5,5,0.88)'
            : 'rgba(5,5,5,0.55)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          boxShadow: scrolled
            ? '0 1px 0 rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.7)'
            : '0 1px 0 rgba(255,255,255,0.03)',
        }}
        data-theme="dark"
      >
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: '72px' }}
        >
          {/* ── CTA — احجز موعدك & Cart ── */}
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/972527815671?text=أرغب في حجز موعد"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button text-sm hidden md:inline-flex"
              aria-label="احجز موعدك"
            >
              احجز موعدك
            </a>

            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-[#c3f400] transition-all hover:bg-white/10 group"
              aria-label="سلة التسوق"
            >
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#c3f400] text-[#283500] text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#131313] group-hover:scale-110 transition-transform">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-8" dir="rtl" aria-label="القائمة الرئيسية">
            {navItemsToUse.map((item: any, index: number) => {
              const hasSubItems = item.subItems && item.subItems.length > 0
              
              return (
                <div 
                  key={index} 
                  className="relative group h-full flex items-center"
                  onMouseEnter={() => hasSubItems && setActiveDropdown(index)}
                  onMouseLeave={() => hasSubItems && setActiveDropdown(null)}
                >
                  <Link
                    href={item.link?.url || item.link?.reference?.value?.slug || '#'}
                    className="relative text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 py-4 flex items-center gap-1"
                  >
                    {item.link?.label}
                    {hasSubItems && (
                      <span className={`text-[10px] transition-transform duration-300 ${activeDropdown === index ? 'rotate-180' : ''}`}>▼</span>
                    )}
                    <span
                      className="absolute -bottom-1 right-0 w-0 h-[1.5px] bg-[#c3f400] group-hover:w-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {hasSubItems && activeDropdown === index && (
                    <div className="absolute top-[80%] right-0 mt-2 w-56 pt-2 z-50">
                       <div className="bg-[#121212] border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl">
                          {item.subItems.map((sub: any, i: number) => (
                            <Link
                              key={i}
                              href={sub.link?.url || sub.link?.reference?.value?.slug || '#'}
                              className="block px-6 py-4 text-xs font-bold text-white/60 hover:text-[#c3f400] hover:bg-white/5 transition-all border-b border-white/5 last:border-0"
                            >
                              {sub.link?.label}
                            </Link>
                          ))}
                       </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* ── Logotype ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span
              className="text-xl font-bold text-white leading-none"
              style={{ fontFamily: 'Inter, monospace', letterSpacing: '-0.03em' }}
            >
              TAMER
              <span style={{ color: '#c3f400' }}> BEAUTY</span>
            </span>
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
              style={{ backgroundColor: '#c3f400' }}
              aria-hidden="true"
            />
          </Link>

          {/* ── Mobile: Hamburger ── */}
          <button
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.06)' }}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(45deg) translateY(6px)' : 'none' }}
            />
            <span
              className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-0.5 bg-white rounded-full transition-all duration-300"
              style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-6px)' : 'none' }}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className="fixed inset-0 z-40 md:hidden transition-all duration-500"
        style={{
          pointerEvents: menuOpen ? 'all' : 'none',
          opacity: menuOpen ? 1 : 0,
        }}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{ background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(20px)' }}
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <div
          className="absolute inset-y-0 right-0 w-full max-w-xs flex flex-col pt-24 pb-8 px-8 overflow-y-auto"
          style={{
            background: 'rgba(10,10,10,0.98)',
            boxShadow: '-8px 0 32px rgba(0,0,0,0.8)',
            transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
            transition: 'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <nav className="flex flex-col gap-1" dir="rtl">
            {navItemsToUse.map((item: any, i: number) => {
               const hasSubItems = item.subItems && item.subItems.length > 0
               return (
                <div key={i} className="flex flex-col">
                  <Link
                    href={item.link?.url || item.link?.reference?.value?.slug || '#'}
                    className="flex items-center justify-between py-4 text-xl font-bold text-white/80 hover:text-white transition-colors"
                    onClick={() => !hasSubItems && setMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#c3f400' }} />
                      {item.link?.label}
                    </div>
                  </Link>
                  {hasSubItems && (
                    <div className="mr-6 mb-4 flex flex-col gap-2 border-r border-white/5 pr-4">
                      {item.subItems.map((sub: any, j: number) => (
                        <Link
                          key={j}
                          href={sub.link?.url || sub.link?.reference?.value?.slug || '#'}
                          className="text-sm font-medium text-white/40 hover:text-[#c3f400] py-2"
                          onClick={() => setMenuOpen(false)}
                        >
                          {sub.link?.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
               )
            })}
          </nav>

          <div className="mt-auto">
            <a
              href="https://wa.me/972527815671?text=أرغب في حجز موعد"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button w-full text-base"
              onClick={() => setMenuOpen(false)}
            >
              احجز موعدك
            </a>
          </div>
        </div>
      </div>
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
