'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/providers/CartProvider/store'
import type { ShippingZone } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ShoppingBag, MapPin, Truck, Store, ChevronLeft, Loader2, Crown, Shield } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { validateOrder } from '@/app/actions/validateOrder'
import { WrappingSelector, type WrappingOption } from '@/components/WrappingSelector'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Props {
  shippingZones: ShippingZone[]
  wrappingOptions: WrappingOption[]
}

export const CheckoutPageClient: React.FC<Props> = ({ shippingZones, wrappingOptions }) => {
  const { items, getSubtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [orderComplete, setOrderComplete] = useState<string | null>(null)
  const [serverError, setServerError] = useState('')
  const [selectedWrappingId, setSelectedWrappingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '', phone: '', shippingAddress: '',
    shippingZone: shippingZones[0]?.id || '',
    isGift: false, recipientName: '', giftMessage: '',
    couponCode: '',
  })

  const [couponInput, setCouponInput] = useState('')
  const [appliedCouponCode, setAppliedCouponCode] = useState('')
  const [couponError, setCouponError] = useState('')
  const [couponSuccess, setCouponSuccess] = useState('')

  // Server-verified totals
  const [serverTotals, setServerTotals] = useState<{
    subtotal: number; discount: number; shipping: number; total: number
  } | null>(null)

  useEffect(() => { setIsMounted(true) }, [])
  if (!isMounted) return null

  const clientSubtotal = getSubtotal()
  const selectedZone = shippingZones.find(z => z.id === formData.shippingZone)
  const displayShipping = selectedZone?.deliveryPrice || 0
  const displayTotal = serverTotals
    ? serverTotals.total
    : clientSubtotal + displayShipping

  const handleApplyCoupon = async () => {
    if (!couponInput.trim()) return
    setCouponError('')
    setCouponSuccess('')
    setIsValidating(true)
    try {
      const result = await validateOrder({
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          variantAdditionalPrice: i.variant?.additionalPrice || 0,
        })),
        couponCode: couponInput.trim().toUpperCase(),
        shippingZoneId: String(formData.shippingZone),
        incrementUsage: false,
      })
      if (!result.success) {
        setCouponError(result.error || 'كود الخصم غير صحيح')
      } else {
        setServerTotals({
          subtotal: result.serverSubtotal,
          discount: result.serverDiscount,
          shipping: result.serverShippingCost,
          total: result.serverTotal,
        })
        setAppliedCouponCode(result.couponCode || couponInput)
        setCouponSuccess(`تم تطبيق الخصم: ${result.serverDiscount} ₪`)
      }
    } catch {
      setCouponError('حدث خطأ أثناء التحقق من الكوبون')
    } finally {
      setIsValidating(false)
    }
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    setServerError('')
    try {
      // Always re-verify prices server-side before submitting
      const validation = await validateOrder({
        items: items.map(i => ({
          productId: i.id,
          quantity: i.quantity,
          variantAdditionalPrice: i.variant?.additionalPrice || 0,
        })),
        couponCode: appliedCouponCode || undefined,
        shippingZoneId: String(formData.shippingZone),
        incrementUsage: true,
      })

      if (!validation.success) {
        setServerError(validation.error || 'حدث خطأ في التحقق من الطلب')
        setIsSubmitting(false)
        return
      }

      const orderData = {
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          shippingAddress: formData.shippingAddress,
          shippingZone: isNaN(Number(formData.shippingZone)) ? formData.shippingZone : Number(formData.shippingZone),
        },
        items: items.map(item => ({
          product: isNaN(Number(item.id)) ? item.id : Number(item.id),
          quantity: item.quantity,
          priceAtPurchase: item.price + (item.variant?.additionalPrice || 0),
        })),
        totals: {
          subtotal: validation.serverSubtotal,
          shippingCost: validation.serverShippingCost,
          discount: validation.serverDiscount,
          total: validation.serverTotal,
        },
        couponApplied: validation.couponCode || null,
        gifting: {
          isGift: formData.isGift,
          recipientName: formData.recipientName,
          giftMessage: formData.giftMessage,
          luxuryWrapping: selectedWrappingId 
            ? (isNaN(Number(selectedWrappingId)) ? selectedWrappingId : Number(selectedWrappingId))
            : null,
        },
        payment: 'cod',
        status: 'pending',
      }

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      })
      const result = await res.json()
      if (result.doc) {
        setOrderComplete(result.doc.orderNumber)
        clearCart()
        setStep(3)
      } else {
        setServerError(result.errors?.[0]?.message || 'فشل إرسال الطلب. يرجى المحاولة مجدداً.')
      }
    } catch (err: any) {
      console.error('[Checkout] Submission Error:', err)
      setServerError(err.message || 'حدث خطأ غير متوقع أثناء إرسال الطلب')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (step === 3) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] pt-32 flex items-center justify-center p-6" dir="rtl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full bg-[#131313] rounded-3xl p-12 text-center border border-[#c3f400]/20 shadow-[0_0_50px_rgba(195,244,0,0.1)]"
        >
          <div className="w-24 h-24 bg-[#c3f400] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(195,244,0,0.3)]">
            <CheckCircle2 size={48} className="text-[#283500]" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">شكراً لطلبك!</h1>
          <p className="text-white/60 text-lg mb-8">
            تم استلام طلبك بنجاح. رقم الطلب: <span className="text-[#c3f400] font-black">{orderComplete}</span>
            <br />سنتواصل معك قريباً لتأكيد التوصيل.
          </p>
          <div className="space-y-4">
            <a
              href={`https://wa.me/972527815671?text=مرحباً، أرغب في الاستفسار عن طلبي رقم ${orderComplete}`}
              target="_blank" rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
            >
              تتبع الطلب عبر واتساب
            </a>
            <Link href="/" className="block w-full py-4 bg-white/5 text-white/60 font-bold rounded-2xl hover:bg-white/10 transition-all">
              العودة للرئيسية
            </Link>
          </div>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-32 pb-20" dir="rtl">
      <div className="max-w-5xl mx-auto px-6">
        {/* Progress */}
        <div className="flex items-center justify-center mb-16 gap-4">
          {[{ n: 1, label: 'ملخص الطلب' }, { n: 2, label: 'بيانات الشحن' }].map(({ n, label }) => (
            <React.Fragment key={n}>
              {n > 1 && <div className="w-12 h-px bg-white/10" />}
              <div className={`flex items-center gap-3 transition-colors ${step >= n ? 'text-[#c3f400]' : 'text-white/20'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= n ? 'border-[#c3f400] bg-[#c3f400]/10' : 'border-white/10'}`}>{n}</div>
                <span className="font-bold">{label}</span>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  {/* Cart Items */}
                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <ShoppingBag className="text-[#c3f400]" /> مراجعة سلة التسوق
                    </h2>
                    <div className="space-y-4">
                      {items.map(item => (
                        <div key={`${item.id}-${item.variant?.label}`} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0">
                            <Image src={item.image || '/store-serum.png'} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-white font-bold">{item.title}</h4>
                            {item.variant && <span className="text-[#c3f400] text-xs font-bold block mt-1">{item.variant.label}</span>}
                            <div className="flex justify-between items-end mt-4">
                              <span className="text-white/40 text-sm">الكمية: {item.quantity}</span>
                              <span className="text-white font-bold">{(item.price + (item.variant?.additionalPrice || 0)) * item.quantity} ₪</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {items.length === 0 && <div className="text-center py-10 text-white/40">سلتك فارغة حالياً.</div>}
                    </div>
                  </div>

                  {/* Coupon */}
                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-white font-bold mb-4">كود الخصم (إن وجد)</h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="أدخل الكود هنا..."
                        value={couponInput}
                        onChange={e => { setCouponInput(e.target.value); setCouponError(''); setCouponSuccess('') }}
                        disabled={!!appliedCouponCode}
                        className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all disabled:opacity-50"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={isValidating || !!appliedCouponCode}
                        className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all disabled:opacity-50"
                      >
                        {isValidating ? <Loader2 className="animate-spin" size={18} /> : 'تطبيق'}
                      </button>
                    </div>
                    {couponSuccess && <p className="text-[#c3f400] text-sm mt-3 font-bold">{couponSuccess}</p>}
                    {couponError && <p className="text-red-400 text-sm mt-3 font-bold">{couponError}</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                  {/* Shipping Info */}
                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <MapPin className="text-[#c3f400]" /> بيانات العميل والشحن
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">الاسم الكامل</label>
                        <input type="text" required value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all" />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">رقم الهاتف (واتساب)</label>
                        <input type="tel" required dir="ltr" value={formData.phone}
                          onChange={e => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-right focus:outline-none focus:border-[#c3f400]/50 transition-all"
                          placeholder="+972" />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">منطقة التوصيل</label>
                        <Select
                          value={String(formData.shippingZone)}
                          onValueChange={(val) => setFormData({ ...formData, shippingZone: val })}
                          dir="rtl"
                        >
                          <SelectTrigger className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 h-auto text-white focus:ring-[#c3f400]/50 focus:border-[#c3f400]/50 focus-visible:ring-[#c3f400]/50">
                            <SelectValue placeholder="اختر منطقة التوصيل" />
                          </SelectTrigger>
                          <SelectContent dir="rtl" className="bg-[#131313] border border-white/10 text-white">
                            {shippingZones.map((zone) => (
                              <SelectItem
                                key={zone.id}
                                value={String(zone.id)}
                                className="text-white focus:bg-white/10 focus:text-white cursor-pointer"
                              >
                                {zone.name} ({zone.deliveryPrice} ₪)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block">العنوان بالتفصيل</label>
                        <textarea required rows={3} value={formData.shippingAddress}
                          onChange={e => setFormData({ ...formData, shippingAddress: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all"
                          placeholder="المدينة، الشارع، رقم المنزل..." />
                      </div>
                    </div>
                  </div>

                  {/* Luxury Gift Section */}
                  <motion.div
                    className="rounded-3xl p-8 border transition-all duration-500"
                    style={{
                      background: formData.isGift
                        ? 'linear-gradient(135deg, #131313 0%, rgba(195,244,0,0.04) 100%)'
                        : '#131313',
                      borderColor: formData.isGift ? 'rgba(195,244,0,0.25)' : 'rgba(255,255,255,0.05)',
                      boxShadow: formData.isGift ? '0 0 40px rgba(195,244,0,0.06)' : 'none',
                    }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: formData.isGift ? 'rgba(195,244,0,0.15)' : 'rgba(255,255,255,0.05)' }}>
                          <Crown size={20} style={{ color: formData.isGift ? '#c3f400' : 'rgba(255,255,255,0.3)' }} />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-white">تجربة الإهداء الملكية</h2>
                          <p className="text-white/40 text-xs mt-0.5">تغليف فاخر مع رسالة شخصية</p>
                        </div>
                      </div>
                      {/* Premium Toggle */}
                      <button
                        onClick={() => setFormData({ ...formData, isGift: !formData.isGift })}
                        className="relative w-14 h-7 rounded-full transition-all duration-300 focus:outline-none"
                        style={{ background: formData.isGift ? '#c3f400' : 'rgba(255,255,255,0.1)' }}
                        aria-label="تفعيل خيار الهدية"
                      >
                        <motion.div
                          layout
                          className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                          style={{ left: formData.isGift ? '4px' : '25px' }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {formData.isGift && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-6 mt-6 space-y-4 border-t border-white/10">
                            <div>
                              <label className="text-white/60 text-sm mb-2 block">إسم المستلم</label>
                              <input type="text" value={formData.recipientName}
                                onChange={e => setFormData({ ...formData, recipientName: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all"
                                placeholder="من سيتلقى هذه الهدية الثمينة؟" />
                            </div>
                            <div>
                              <label className="text-white/60 text-sm mb-2 block">رسالة الهدية</label>
                              <textarea rows={3} value={formData.giftMessage}
                                onChange={e => setFormData({ ...formData, giftMessage: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all"
                                placeholder="اكتب رسالتك الخاصة هنا..." />
                            </div>
                            {/* Luxury Wrapping Selector Grid */}
                            <div>
                              <label
                                className="text-white/60 text-sm mb-3 block"
                                style={{ fontFamily: "'Noto Kufi Arabic', sans-serif" }}
                              >
                                اختر نوع التغليف الملكي
                              </label>
                              <WrappingSelector
                                options={wrappingOptions}
                                selectedId={selectedWrappingId}
                                onSelect={setSelectedWrappingId}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Server Error */}
                  {serverError && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 font-bold text-sm">
                      {serverError}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-5">
            <div className="bg-[#131313] rounded-3xl p-8 border border-white/5 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-8">ملخص الحساب</h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between text-white/60">
                  <span>المجموع الفرعي</span>
                  <span>{serverTotals ? serverTotals.subtotal : clientSubtotal} ₪</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>تكلفة التوصيل</span>
                  <span>{serverTotals ? serverTotals.shipping : displayShipping} ₪</span>
                </div>
                {(serverTotals?.discount ?? 0) > 0 && (
                  <div className="flex justify-between text-[#c3f400] font-bold">
                    <span>خصم الكوبون</span>
                    <span>-{serverTotals!.discount} ₪</span>
                  </div>
                )}
                <div className="h-px bg-white/10 pt-2" />
                <div className="flex justify-between text-2xl font-bold text-white pt-1">
                  <span>المجموع الكلي</span>
                  <span>{displayTotal} ₪</span>
                </div>
              </div>

              {/* COD Card */}
              <div className="p-4 rounded-2xl mb-6 border" style={{ background: 'rgba(195,244,0,0.03)', borderColor: 'rgba(195,244,0,0.12)' }}>
                <p className="text-xs text-white/40 mb-3 font-bold uppercase tracking-wider">طريقة الدفع</p>
                <div className="flex items-center gap-3 mb-2">
                  <Truck size={18} className="text-[#c3f400]" />
                  <span className="text-white text-sm font-bold">الدفع عند الاستلام</span>
                </div>
                <div className="flex items-center gap-3">
                  <Store size={18} className="text-[#c3f400]" />
                  <span className="text-white text-sm font-bold">أو الدفع في المركز</span>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                  <Shield size={14} className="text-white/40" />
                  <span className="text-white/40 text-xs">بدون بطاقة ائتمان — آمن وموثوق</span>
                </div>
              </div>

              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={items.length === 0}
                  className="w-full py-5 bg-[#c3f400] text-[#283500] font-black rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:pointer-events-none hover:shadow-[0_0_40px_rgba(195,244,0,0.4)]"
                >
                  المتابعة لبيانات الشحن
                  <ChevronLeft size={20} />
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.shippingAddress}
                    className="w-full py-5 bg-[#c3f400] text-[#283500] font-black rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 hover:shadow-[0_0_40px_rgba(195,244,0,0.4)]"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'تأكيد الطلب الآن'}
                  </button>
                  <button onClick={() => setStep(1)} className="w-full py-4 text-white/40 hover:text-white transition-colors">
                    العودة للملخص
                  </button>
                </div>
              )}

              <p className="text-center text-white/20 text-[10px] mt-6">
                بإتمامك للطلب، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بتامر بيوتي سنتر.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
