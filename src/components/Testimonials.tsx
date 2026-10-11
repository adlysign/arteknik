import React from 'react';
import { TestimonialItem } from '../types';
import { Star, Quote, CheckCircle, MapPin } from 'lucide-react';

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimoni" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
            Ulasan Kepuasan Klien
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
            Apa Kata Pelanggan AR Teknik?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Kepuasan hasil akhir, ketepatan waktu, dan kerapian pemasangan adalah prioritas tertinggi bengkel kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & Quote Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-5 h-5 text-slate-300" />
                </div>

                {/* Comment */}
                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{t.comment}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-100">
                <h4 className="font-bold text-sm text-slate-900">{t.name}</h4>
                <p className="text-[11px] text-slate-500">{t.role}</p>
                <div className="flex items-center gap-1 text-[11px] text-amber-700 font-medium mt-1">
                  <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>{t.location}</span>
                </div>
                <div className="mt-2 text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded inline-block">
                  📦 {t.projectType}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
