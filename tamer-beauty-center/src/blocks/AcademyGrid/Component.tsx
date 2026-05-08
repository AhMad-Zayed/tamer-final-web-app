'use client'
import React from 'react'
import { ArrowRight, Scissors, Wind, LayoutGrid, Palette, Sparkles, Stethoscope, Zap, ShieldCheck, Languages } from 'lucide-react'

const iconMap: Record<string, React.FC<any>> = {
  Scissors,
  Wind,
  LayoutGrid,
  Palette,
  Sparkles,
  Stethoscope,
  Zap,
  ShieldCheck,
  Languages,
}

export const AcademyGridBlock: React.FC<any> = ({ subtitle, heading, description, courses }) => {
  if (!courses || courses.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-[#050505] relative" dir="rtl">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-3xl">
            {subtitle && (
              <span className="text-[#c3f400] font-semibold tracking-[0.2em] uppercase text-sm mb-4 block">
                {subtitle}
              </span>
            )}
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight tracking-tight text-white drop-shadow-md">
              {heading}
            </h2>
            {description && (
              <p className="text-lg text-neutral-400 font-medium border-r-2 border-[#c3f400] pr-6 leading-relaxed">
                {description}
              </p>
            )}
          </div>
          <button className="bg-white text-black px-8 py-4 rounded-full font-bold text-base hover:bg-[#c3f400] transition-colors shrink-0 flex items-center gap-3 shadow-lg">
            استكشف الأكاديمية <ArrowRight size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course: any, i: number) => {
            const IconComponent = iconMap[course.icon] || LayoutGrid
            return (
              <div
                key={i}
                className={`group p-8 rounded-[2rem] border transition-all duration-500 hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[320px] shadow-lg
                  ${
                    course.special
                      ? 'bg-[#c3f400] border-[#c3f400] shadow-[0_0_40px_rgba(195,244,0,0.2)]'
                      : 'bg-[#0a0a0a]/80 backdrop-blur-md border-white/5 hover:border-white/20 hover:shadow-white/5'
                  }`}
              >
                <div className="flex justify-between items-start mb-10">
                  <div
                    className={`p-3.5 rounded-[1rem] ${
                      course.special ? 'bg-black text-[#c3f400]' : 'bg-white/5 text-[#c3f400]'
                    }`}
                  >
                    <IconComponent size={28} strokeWidth={2} />
                  </div>
                  <div
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      course.special ? 'bg-black/10 text-black' : 'bg-white/5 text-white/50'
                    }`}
                  >
                    {course.category}
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-2xl font-bold mb-4 tracking-tight ${
                      course.special ? 'text-black' : 'text-white'
                    }`}
                  >
                    {course.title}
                  </h3>
                  <div
                    className={`flex items-center gap-2 font-semibold text-base transition-transform group-hover:translate-x-[-8px] ${
                      course.special ? 'text-black/70' : 'text-white/50'
                    }`}
                  >
                    التفاصيل <ArrowRight size={18} className="rotate-180" strokeWidth={2.5} />
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
