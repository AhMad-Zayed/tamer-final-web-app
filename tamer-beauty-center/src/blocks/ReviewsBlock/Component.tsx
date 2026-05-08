'use client'
import React from 'react'
import { Star, MessageCircle } from 'lucide-react'

export const ReviewsBlockComponent: React.FC<any> = ({ heading, reviews }) => {
  if (!reviews || reviews.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-[#0a0a0a]" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16 relative">
          <MessageCircle size={64} strokeWidth={1.5} className="text-white/5 absolute left-1/2 -translate-x-1/2 -top-6" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white relative z-10">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((relationData: any, i: number) => {
            const review = relationData.value || relationData
            if (!review?.name) return null
            
            return (
              <div
                key={i}
                className="bg-[#050505]/80 backdrop-blur-md p-8 rounded-[2rem] border border-white/5 hover:border-[#c3f400]/20 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(review.rating || 5)].map((_, idx) => (
                    <Star key={idx} size={18} className="text-[#c3f400] fill-[#c3f400]" />
                  ))}
                </div>
                <p className="text-lg text-neutral-300 leading-relaxed font-medium mb-8">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center font-bold text-xl text-white border border-white/10">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white tracking-tight">{review.name}</h4>
                    {review.service && (
                      <span className="text-xs text-[#c3f400] font-medium tracking-wide">
                        {review.service}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
