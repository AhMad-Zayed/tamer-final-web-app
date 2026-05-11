'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Zap, Sparkles, Scissors, Droplets, Crown, ChevronLeft } from 'lucide-react'

const CATEGORY_CONFIG: Record<string, { label: string; icon: React.FC<any>; accent: string; gridClass: string; style: 'large' | 'medium' | 'tall' | 'minimal' | 'wide' | 'vip' }> = {
  laser:    { label: 'ليزر', icon: Zap,        accent: '#c3f400', gridClass: 'md:col-span-2 md:row-span-2', style: 'large' },
  skin:     { label: 'بشرة',  icon: Sparkles,   accent: '#c3f400', gridClass: 'md:col-span-2',              style: 'medium' },
  hair:     { label: 'شعر',   icon: Scissors,   accent: '#c3f400', gridClass: 'md:col-span-1 md:row-span-2', style: 'tall' },
  wellness: { label: 'علاج',  icon: Droplets,   accent: '#c3f400', gridClass: 'md:col-span-1',              style: 'minimal' },
  vip:      { label: 'VIP',   icon: Crown,      accent: '#e9c349', gridClass: 'md:col-span-4',              style: 'vip' },
}

// Static fallback data
const STATIC_SERVICES = [
  {
    id: 'static-laser', slug: 'laser-hair-removal', category: 'laser',
    title: 'إزالة الشعر بالليزر',
    shortDescription: 'تقنيات ليزر متقدمة لنتائج دائمة وبشرة ناعمة كالحرير.',
    coverImage: null,
    packages: [
      { label: 'الصدر والبطن', price: '200' }, { label: 'الظهر', price: '200' },
      { label: 'الأكتاف', price: '150' },       { label: 'الإبط', price: '100' },
    ],
  },
  {
    id: 'static-skin', slug: 'clinical-skin-care', category: 'skin',
    title: 'علاجات البشرة السريرية',
    shortDescription: 'نجمع بين العلم والجمال لتقديم حلول مخصصة لصحة بشرتك.',
    coverImage: null,
    packages: [{ label: 'هايدروفيشل', price: '250' }, { label: 'علاج حب الشباب', price: '300' }],
  },
  {
    id: 'static-hair', slug: '3d-hair-design', category: 'hair',
    title: 'خدمات الشعر 3D',
    shortDescription: 'قصات وعلاجات شعر احترافية بأحدث التقنيات.',
    coverImage: null,
    packages: [{ label: 'قص 3D', price: '50' }, { label: 'بروتين', price: '250 - 800' }],
  },
  {
    id: 'static-tattoo', slug: 'tattoo-removal', category: 'wellness',
    title: 'إزالة الوشم بالليزر',
    shortDescription: 'إزالة الوشم بأحدث تقنيات الليزر بأمان وفاعلية.',
    coverImage: null,
    packages: [{ label: 'إزالة وشم', price: 'تبدأ من 50' }],
  },
  {
    id: 'static-wellness', slug: 'wellness-cupping', category: 'wellness',
    title: 'الحجامة والتدريب العلاجي',
    shortDescription: 'حجامة طبية ومساج علاجي لاسترخاء الجسم والتعافي.',
    coverImage: null,
    packages: [{ label: 'حجامة طبية', price: '100' }, { label: 'مساج ساعة', price: '100' }],
  },
  {
    id: 'static-vip', slug: 'vip-groom', category: 'vip',
    title: 'خدمة العريس VIP',
    shortDescription: 'باقة حصرية متكاملة للعريس العصري في خصوصية وفخامة تامة.',
    coverImage: null,
    packages: [{ label: 'تجهيز شهر كامل', price: 'حسب الطلب' }],
  },
]

type Props = { services: any[] }

export const ServicesHubClient: React.FC<Props> = ({ services }) => {
  const displayServices = services && services.length > 0 ? services : STATIC_SERVICES

  const categoryMap: Record<string, any> = {}
  for (const svc of displayServices) {
    if (!categoryMap[svc.category]) categoryMap[svc.category] = svc
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#050505] pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto w-full"
      style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
    >
      <header className="mb-16 text-right">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="text-[#c3f400] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">
            CLINICAL EXCELLENCE
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-[1.05]">
            بوابات الخدمات{' '}
            <span className="text-[#c3f400]">السريرية</span>
          </h1>
          <p className="text-white/50 text-xl max-w-2xl leading-relaxed">
            استكشف مسارات العلاج التخصصية لدينا. جودة سريرية متفوقة في بيئة فاخرة.
          </p>
        </motion.div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[280px]">
        {/* 1. LASER — Large 2×2 */}
        <BentoCard
          service={categoryMap['laser']}
          gridClass="md:col-span-2 md:row-span-2"
          style="large"
        />

        {/* 2. SKIN CARE — Medium 2×1 */}
        <BentoCard
          service={categoryMap['skin']}
          gridClass="md:col-span-2"
          style="medium"
        />

        {/* 3. HAIR — Tall 1×2 */}
        <BentoCard
          service={categoryMap['hair']}
          gridClass="md:col-span-1 md:row-span-2"
          style="tall"
        />

        {/* 4. TATTOO small */}
        <BentoCard
          service={displayServices.find((s: any) => s.slug?.includes('tattoo') || s.title?.includes('وشم')) || categoryMap['wellness']}
          gridClass="md:col-span-1"
          style="minimal"
          label="إزالة الوشم بالليزر"
        />

        {/* 5. WELLNESS small */}
        <BentoCard
          service={categoryMap['wellness']}
          gridClass="md:col-span-1"
          style="minimal"
        />

        {/* 6. VIP — Full Width Black Card */}
        <BentoCard
          service={categoryMap['vip']}
          gridClass="md:col-span-4"
          style="vip"
        />
      </div>

      {services && services.length > 0 && (
        <div className="mt-32">
          <h2 className="text-white text-3xl font-black mb-12">جميع الخدمات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc: any) => (
              <Link key={svc.id} href={`/services/${svc.slug}`}>
                <motion.div
                  whileHover={{ y: -8 }}
                  className="p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.04] transition-all group shadow-obsidian-deep"
                >
                  <span className="text-[#c3f400] text-[10px] tracking-widest uppercase font-bold mb-3 block">
                    {CATEGORY_CONFIG[svc.category]?.label || svc.category}
                  </span>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#c3f400] transition-colors">
                    {svc.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6">{svc.shortDescription}</p>
                  {svc.packages?.[0] && (
                    <p className="text-white/30 text-xs">
                      تبدأ من{' '}
                      <span className="text-[#c3f400] font-bold">{svc.packages[0].price} ₪</span>
                    </p>
                  )}
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function BentoCard({
  service,
  gridClass,
  style,
  label,
}: {
  service: any
  gridClass: string
  style: string
  label?: string
}) {
  if (!service) return null
  const title = label || service.title
  const slug = service.slug
  const imgUrl = typeof service.coverImage === 'object' ? service.coverImage?.url : null
  const isVip = style === 'vip'
  const isLaser = style === 'large'

  const content = (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      className={`group relative ${gridClass} rounded-[2rem] overflow-hidden cursor-pointer shadow-obsidian-deep`}
      style={{
        background: isVip
          ? 'linear-gradient(135deg, #0e0e0e 0%, #1a1a1a 100%)'
          : 'rgba(255,255,255,0.02)',
      }}
    >
      {/* Neon Glow Effect on Hover */}
      <div
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10"
        style={{
          background: isVip
            ? 'radial-gradient(circle at center, rgba(233,195,73,0.2), transparent 70%)'
            : isLaser
            ? 'radial-gradient(circle at center, rgba(195,244,0,0.3), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(195,244,0,0.15), transparent 70%)',
        }}
      />

      {/* Background Image */}
      {imgUrl ? (
        <div className="absolute inset-0">
          <Image
            src={imgUrl}
            alt={title}
            fill
            className={`object-cover transition-transform duration-700 group-hover:scale-110`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: isVip
              ? 'linear-gradient(135deg, #050505 0%, #1a1a1a 100%)'
              : 'linear-gradient(135deg, #111 0%, #050505 100%)',
          }}
        />
      )}

      {/* VIP: Gold subtle glow */}
      {isVip && (
        <div className="absolute inset-0 border border-secondary/10 rounded-[2rem] pointer-events-none z-20" />
      )}

      {/* CONTENT */}
      <div className="relative z-30 h-full p-8 flex flex-col justify-end">
        {style === 'large' && (
          <>
            <span className="text-[#c3f400] text-xs tracking-[0.3em] uppercase font-bold mb-3 block">
              Laser Technology
            </span>
            <h2 className="text-4xl font-black text-white mb-3 leading-tight">{title}</h2>
            <p className="text-white/50 text-base mb-8 max-w-xs">{service.shortDescription}</p>
          </>
        )}

        {style === 'medium' && (
          <div className="flex flex-col h-full justify-between">
            <div>
              <span className="text-[#c3f400] text-xs tracking-[0.3em] uppercase font-bold mb-4 block">
                Clinical Care
              </span>
              <h2 className="text-3xl font-black text-white mb-3">{title}</h2>
              <p className="text-white/50 text-sm leading-relaxed">{service.shortDescription}</p>
            </div>
          </div>
        )}

        {style === 'tall' && (
          <>
            <h2 className="text-2xl font-black text-white mb-3">{title}</h2>
            <p className="text-white/40 text-sm mb-6 leading-relaxed">{service.shortDescription}</p>
          </>
        )}

        {style === 'minimal' && (
          <>
            <h2 className="text-xl font-black text-white mb-2">{title}</h2>
          </>
        )}

        {style === 'vip' && (
          <div className="flex flex-col justify-center py-4">
            <div className="flex items-center gap-3 mb-6">
              <Crown size={24} className="text-[#e9c349]" />
              <span className="text-[#e9c349] text-xs tracking-[0.4em] uppercase font-bold">
                Elite Experience — Black Card
              </span>
            </div>
            <h2 className="text-5xl font-black text-white mb-4 leading-none">{title}</h2>
            <p className="text-white/50 text-lg max-w-lg mb-8">{service.shortDescription}</p>
            <div className="flex items-center gap-6">
              <span className="px-8 py-3 bg-[#e9c349] text-black font-bold rounded-2xl shadow-[0_0_30px_rgba(233,195,73,0.3)]">
                Book Exclusive
              </span>
            </div>
          </div>
        )}

        {/* Price & Action */}
        {!isVip && (
          <div className="flex items-center justify-between mt-4">
            {service.packages?.[0] && (
              <span className="text-white/40 text-sm">
                تبدأ من <span className="text-[#c3f400] font-bold text-lg">{service.packages[0].price} ₪</span>
              </span>
            )}
            <div className="w-10 h-10 rounded-2xl bg-[#c3f400] flex items-center justify-center group-hover:scale-110 transition-transform">
              <ChevronLeft size={20} className="text-black" />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )

  return slug ? <Link href={`/services/${slug}`}>{content}</Link> : content
}
