'use client'
import React, { useState, useEffect } from 'react'
import { useCart } from '@/providers/CartProvider/store'
import type { ShippingZone, Coupon } from '@/payload-types'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, ShoppingBag, MapPin, Gift, CreditCard, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  shippingZones: ShippingZone[]
}

export const CheckoutPageClient: React.FC<Props> = ({ shippingZones }) => {
  const { items, getSubtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [isMounted, setIsMounted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState<string | null>(null)

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    shippingAddress: '',
    shippingZone: shippingZones[0]?.id || '',
    isGift: false,
    recipientName: '',
    giftMessage: '',
    luxuryWrapping: false,
    couponCode: '',
  })

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponError, setCouponError] = useState('')

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  const subtotal = getSubtotal()
  const selectedZone = shippingZones.find(z => z.id === formData.shippingZone)
  const shippingCost = selectedZone?.deliveryPrice || 0
  
  let discountAmount = 0
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = (subtotal * appliedCoupon.value) / 100
    } else {
      discountAmount = appliedCoupon.value
    }
  }

  const total = subtotal + shippingCost - discountAmount

  const handleApplyCoupon = async () => {
    setCouponError('')
    try {
      const res = await fetch(`/api/coupons?where[code][equals]=${formData.couponCode}&where[active][equals]=true`)
      const data = await res.json()
      
      if (data.docs && data.docs.length > 0) {
        const coupon = data.docs[0]
        // Basic check for expiry
        if (coupon.expiryDate && new Date(coupon.expiryDate) < new Date()) {
          setCouponError('هذا الكوبون منتهي الصلاحية')
          return
        }
        setAppliedCoupon(coupon)
      } else {
        setCouponError('كود الخصم غير صحيح أو غير نشط')
      }
    } catch (err) {
      setCouponError('حدث خطأ أثناء التحقق من الكوبون')
    }
  }

  const handleSubmitOrder = async () => {
    setIsSubmitting(true)
    try {
      const orderData = {
        customerInfo: {
          name: formData.name,
          phone: formData.phone,
          shippingAddress: formData.shippingAddress,
          shippingZone: formData.shippingZone,
        },
        items: items.map(item => ({
          product: item.id,
          quantity: item.quantity,
          priceAtPurchase: item.price + (item.variant?.additionalPrice || 0),
        })),
        totals: {
          subtotal,
          shippingCost,
          discount: discountAmount,
          total,
        },
        gifting: {
          isGift: formData.isGift,
          recipientName: formData.recipientName,
          giftMessage: formData.giftMessage,
          luxuryWrapping: formData.luxuryWrapping,
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
      }
    } catch (err) {
      console.error('Order submission failed', err)
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
            تم استلام طلبك بنجاح. رقم الطلب الخاص بك هو <span className="text-[#c3f400] font-black">{orderComplete}</span>. سنتواصل معك قريباً لتأكيد التوصيل.
          </p>
          <div className="space-y-4">
            <a
              href={`https://wa.me/972527815671?text=مرحباً، أرغب في الاستفسار عن طلبي رقم ${orderComplete}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:scale-[1.02] transition-all"
            >
              تتبع الطلب عبر واتساب
            </a>
            <Link
              href="/"
              className="block w-full py-4 bg-white/5 text-white/60 font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
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
        {/* Progress Bar */}
        <div className="flex items-center justify-center mb-16 gap-4">
          <div className={`flex items-center gap-3 transition-colors ${step >= 1 ? 'text-[#c3f400]' : 'text-white/20'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-[#c3f400] bg-[#c3f400]/10' : 'border-white/10'}`}>1</div>
            <span className="font-bold">ملخص الطلب</span>
          </div>
          <div className="w-12 h-px bg-white/10" />
          <div className={`flex items-center gap-3 transition-colors ${step >= 2 ? 'text-[#c3f400]' : 'text-white/20'}`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-[#c3f400] bg-[#c3f400]/10' : 'border-white/10'}`}>2</div>
            <span className="font-bold">بيانات الشحن</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <ShoppingBag className="text-[#c3f400]" />
                      مراجعة سلة التسوق
                    </h2>
                    <div className="space-y-6">
                      {items.map((item) => (
                        <div key={`${item.id}-${item.variant?.label}`} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="relative w-20 h-24 rounded-xl overflow-hidden shrink-0">
                            <Image src={item.image || '/store-serum.png'} alt={item.title} fill className="object-cover" />
                          </div>
                          <div className="flex-grow">
                            <h4 className="text-white font-bold">{item.title}</h4>
                            {item.variant && <span className="text-[#c3f400] text-xs font-bold block mt-1">{item.variant.label}</span>}
                            <div className="flex justify-between items-end mt-4">
                              <span className="text-white/40 text-sm">الكمية: {item.quantity}</span>
                              <span className="text-white font-bold">{item.price} ₪</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      {items.length === 0 && (
                        <div className="text-center py-10 text-white/40">سلتك فارغة حالياً.</div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h3 className="text-white font-bold mb-4">كود الخصم (إن وجد)</h3>
                    <div className="flex gap-3">
                      <input
                        type="text"
                        placeholder="أدخل الكود هنا..."
                        value={formData.couponCode}
                        onChange={(e) => setFormData({ ...formData, couponCode: e.target.value })}
                        className="flex-grow bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 transition-all"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
                      >
                        تطبيق
                      </button>
                    </div>
                    {appliedCoupon && <p className="text-[#c3f400] text-sm mt-3 font-bold">تم تطبيق الخصم بنجاح: {appliedCoupon.code}</p>}
                    {couponError && <p className="text-red-400 text-sm mt-3 font-bold">{couponError}</p>}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                      <MapPin className="text-[#c3f400]" />
                      بيانات العميل والشحن
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white/60 text-sm mb-2 block mr-1">الاسم الكامل</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block mr-1">رقم الهاتف (واتساب)</label>
                        <input
                          type="tel"
                          required
                          dir="ltr"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white text-right focus:outline-none focus:border-[#c3f400]/50"
                          placeholder="+972"
                        />
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block mr-1">منطقة التوصيل</label>
                        <select
                          value={formData.shippingZone}
                          onChange={(e) => setFormData({ ...formData, shippingZone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50 appearance-none"
                        >
                          {shippingZones.map(zone => (
                            <option key={zone.id} value={zone.id} className="bg-[#131313]">
                              {zone.name} ({zone.deliveryPrice} ₪)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-white/60 text-sm mb-2 block mr-1">العنوان بالتفصيل</label>
                        <textarea
                          required
                          rows={3}
                          value={formData.shippingAddress}
                          onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50"
                          placeholder="المدينة، الشارع، رقم المنزل..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#131313] rounded-3xl p-8 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Gift className="text-[#c3f400]" />
                        خيار الهدايا الفاخرة
                      </h2>
                      <button
                        onClick={() => setFormData({ ...formData, isGift: !formData.isGift })}
                        className={`w-14 h-8 rounded-full transition-all relative ${formData.isGift ? 'bg-[#c3f400]' : 'bg-white/10'}`}
                      >
                        <div className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${formData.isGift ? 'left-1' : 'left-7'}`} />
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {formData.isGift && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden space-y-4"
                        >
                          <div className="h-px bg-white/10 mb-6" />
                          <div>
                            <label className="text-white/60 text-sm mb-2 block mr-1">اسم المستلم</label>
                            <input
                              type="text"
                              value={formData.recipientName}
                              onChange={(e) => setFormData({ ...formData, recipientName: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50"
                            />
                          </div>
                          <div>
                            <label className="text-white/60 text-sm mb-2 block mr-1">رسالة الهدية</label>
                            <textarea
                              rows={3}
                              value={formData.giftMessage}
                              onChange={(e) => setFormData({ ...formData, giftMessage: e.target.value })}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#c3f400]/50"
                              placeholder="اكتب رسالتك الخاصة هنا..."
                            />
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-[#c3f400]/5 rounded-2xl border border-[#c3f400]/10">
                             <input 
                               type="checkbox" 
                               id="wrapping" 
                               checked={formData.luxuryWrapping}
                               onChange={(e) => setFormData({ ...formData, luxuryWrapping: e.target.checked })}
                               className="w-5 h-5 accent-[#c3f400]"
                             />
                             <label htmlFor="wrapping" className="text-[#c3f400] font-bold cursor-pointer">إضافة تغليف فاخر للمنتجات</label>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5">
            <div className="bg-[#131313] rounded-3xl p-8 border border-white/5 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-8">ملخص الحساب</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ₪</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>تكلفة التوصيل</span>
                  <span>{shippingCost} ₪</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#c3f400]">
                    <span>الخصم</span>
                    <span>-{discountAmount} ₪</span>
                  </div>
                )}
                <div className="h-px bg-white/10 pt-4" />
                <div className="flex justify-between text-2xl font-bold text-white">
                  <span>المجموع الكلي</span>
                  <span>{total} ₪</span>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mb-8">
                 <div className="flex items-center gap-3 text-white/60 text-sm">
                   <CreditCard size={18} className="text-[#c3f400]" />
                   <span>الدفع نقداً عند الاستلام</span>
                 </div>
              </div>

              {step === 1 ? (
                <button
                  onClick={() => setStep(2)}
                  disabled={items.length === 0}
                  className="w-full py-5 bg-[#c3f400] text-[#283500] font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(195,244,0,0.4)] transition-all disabled:opacity-50 disabled:pointer-events-none"
                >
                  المتابعة لبيانات الشحن
                  <ChevronLeft size={20} />
                </button>
              ) : (
                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleSubmitOrder}
                    disabled={isSubmitting || !formData.name || !formData.phone || !formData.shippingAddress}
                    className="w-full py-5 bg-[#c3f400] text-[#283500] font-black rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(195,244,0,0.4)] transition-all disabled:opacity-50"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'تأكيد الطلب الآن'}
                  </button>
                  <button
                    onClick={() => setStep(1)}
                    className="w-full py-4 text-white/40 hover:text-white transition-colors"
                  >
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
