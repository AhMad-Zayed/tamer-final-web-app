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
              {[
                { icon: '📸', label: 'Instagram', href: '#' },
                { icon: '▶️', label: 'YouTube', href: '#' },
                { icon: '💬', label: 'WhatsApp', href: 'https://wa.me/972527815671' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-sm transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(195,244,0,0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
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
            className="text-white/25 text-xs"
            style={{ fontFamily: 'Noto Kufi Arabic' }}
          >
            © {new Date().getFullYear()} تامر بيوتي سنتر — جميع الحقوق محفوظة
          </p>
          <p
            className="text-white/15 text-xs"
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
