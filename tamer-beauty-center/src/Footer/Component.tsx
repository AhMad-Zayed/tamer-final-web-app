'use client'
import React from 'react'
import Link from 'next/link'

const NAV_LINKS = [
  { label: 'الرئيسية', href: '/' },
  { label: 'الخدمات', href: '#services' },
  { label: 'العروض', href: '#offers' },
  { label: 'الأكاديمية', href: '#academy' },
  { label: 'المتجر', href: '#store' },
]

export function Footer() {
  return (
    <footer
      className="relative mt-auto overflow-hidden"
      dir="rtl"
      style={{
        background: 'linear-gradient(180deg, #050505 0%, #070707 100%)',
      }}
    >
      {/* Top neon divider */}
      <div
        className="w-full"
        style={{
          height: '1px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(195,244,0,0.3) 30%, rgba(195,244,0,0.3) 70%, transparent 100%)',
        }}
      />

      {/* Atmospheric glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '200px',
          background: 'radial-gradient(ellipse, rgba(195,244,0,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 py-16">

        {/* ── Main footer grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* Col 1: Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5 mb-5">
              <span
                className="text-2xl font-bold text-white"
                style={{ fontFamily: 'Inter, monospace', letterSpacing: '-0.03em' }}
              >
                TAMER<span style={{ color: '#c3f400' }}> BEAUTY</span>
              </span>
            </Link>
            <p
              className="text-white/40 text-sm leading-relaxed mb-6"
              style={{ fontFamily: 'Noto Kufi Arabic', maxWidth: '260px' }}
            >
              مركز تامر للتجميل — حيث يلتقي الفن بالعلم لصناعة تجربة تجميلية فاخرة لا مثيل لها.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 text-white/50 hover:text-[#c3f400]"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195,244,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 text-white/50 hover:text-[#c3f400]"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195,244,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/972527815671"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 text-white/50 hover:text-[#c3f400]"
                style={{ background: 'rgba(255,255,255,0.05)', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195,244,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Location & Map */}
          <div>
            <h4
              className="text-white font-bold text-base mb-5"
              style={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              الموقع والأوقات
            </h4>

            {/* Map placeholder — high contrast styled */}
            <div
              className="rounded-xl overflow-hidden mb-4"
              style={{
                height: '140px',
                background: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                position: 'relative',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54272.445!2d35.2!3d32.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDI0JzAwLjAiTiAzNcKwMTInMDAuMCJF!5e0!3m2!1sar!2sil!4v1234567890"
                width="100%"
                height="140"
                style={{ filter: 'grayscale(100%) contrast(1.2) brightness(0.6)', border: 'none' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع تامر بيوتي"
              />
            </div>

            {/* Hours */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span style={{ color: '#c3f400', fontSize: '0.8rem' }}>⏰</span>
                <span
                  className="text-white/60 text-sm"
                  style={{ fontFamily: 'Noto Kufi Arabic' }}
                >
                  السبت — الخميس: 10 ص – 9 م
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: 'rgba(255,68,68,0.7)', fontSize: '0.8rem' }}>✕</span>
                <span
                  className="text-white/35 text-sm"
                  style={{ fontFamily: 'Noto Kufi Arabic' }}
                >
                  الجمعة: مغلق
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Contact */}
          <div>
            <h4
              className="text-white font-bold text-base mb-5"
              style={{ fontFamily: 'Noto Kufi Arabic' }}
            >
              تواصل معنا
            </h4>

            <div className="space-y-4 mb-8">
              <a
                href="tel:0527815671"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 text-sm"
                  style={{ background: 'rgba(195,244,0,0.08)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(195,244,0,0.15)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(195,244,0,0.08)' }}
                >
                  📞
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: 'Inter, monospace', direction: 'ltr', textAlign: 'left' }}
                  >
                    052-7815671
                  </p>
                  <p
                    className="text-white/35 text-xs"
                    style={{ fontFamily: 'Noto Kufi Arabic' }}
                  >
                    الرئيسي
                  </p>
                </div>
              </a>

              <a
                href="tel:0598067672"
                className="flex items-center gap-3 group"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm"
                  style={{ background: 'rgba(195,244,0,0.08)' }}
                >
                  📞
                </div>
                <div>
                  <p
                    className="text-white font-semibold text-sm"
                    style={{ fontFamily: 'Inter, monospace', direction: 'ltr', textAlign: 'left' }}
                  >
                    059-8067672
                  </p>
                  <p
                    className="text-white/35 text-xs"
                    style={{ fontFamily: 'Noto Kufi Arabic' }}
                  >
                    الثانوي
                  </p>
                </div>
              </a>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/972527815671?text=أرغب في حجز موعد"
              target="_blank"
              rel="noopener noreferrer"
              className="neon-button w-full text-sm"
            >
              <span style={{ fontSize: '1rem' }}>💬</span>
              احجز عبر واتساب
            </a>

            {/* Nav links */}
            <nav className="mt-8">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-white/35 text-xs hover:text-white/70 transition-colors"
                    style={{ fontFamily: 'Noto Kufi Arabic' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p
            className="text-white/50 text-xs"
            style={{ fontFamily: 'Noto Kufi Arabic' }}
          >
            © {new Date().getFullYear()} تامر بيوتي سنتر — جميع الحقوق محفوظة
          </p>
          <p
            className="text-white/40 text-xs"
            style={{ fontFamily: 'Inter, monospace', letterSpacing: '0.05em' }}
          >
            Powered by Tamer Beauty ×{' '}
            <span style={{ color: 'rgba(195,244,0,0.3)' }}>AtlaHub</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
