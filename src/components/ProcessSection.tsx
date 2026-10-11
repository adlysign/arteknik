import React from 'react';
import { MessageSquare, Ruler, Factory, CheckCircle2, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, getSurveyRequestMessage } from '../utils/whatsapp';

interface ProcessSectionProps {
  whatsappNumber: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ whatsappNumber }) => {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Konsultasi WhatsApp',
      desc: 'Hubungi admin kami untuk menanyakan jenis pintu, kisaran harga, atau estimasi ukuran awal Anda.'
    },
    {
      num: '02',
      icon: Ruler,
      title: 'Survei & Ukur Gratis',
      desc: 'Teknisi kami meluncur ke lokasi Anda di Batang/Pekalongan untuk pengukuran presisi & cek opening tembok.'
    },
    {
      num: '03',
      icon: Factory,
      title: 'Fabrikasi Bengkel',
      desc: 'Proses perakitan slat, silangan, per pegas, atau pemotongan aluminium & kaca dilakukan di bengkel kami.'
    },
    {
      num: '04',
      icon: CheckCircle2,
      title: 'Pasang & Garansi',
      desc: 'Pemasangan rapi di lokasi, pengujian tarikan enteng, serah terima kunci dan sertifikat garansi pengerjaan.'
    }
  ];

  const waSurveyUrl = buildWhatsAppUrl(
    getSurveyRequestMessage('', 'Batang / Pekalongan / Sekitarnya', 'Rolling Door / Folding Gate'),
    whatsappNumber
  );

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-400 font-bold text-xs sm:text-sm uppercase tracking-wider">
            Alur Pemesanan Mudah & Cepat
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2">
            4 Langkah Mudah Pasang Pintu Impian Anda
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Kami buat proses pengadaan pintu bisnis dan hunian Anda praktis, aman, dan tanpa repot.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((st, i) => {
            const Icon = st.icon;
            return (
              <div
                key={i}
                className="bg-slate-800/80 rounded-2xl p-6 border border-slate-700 relative flex flex-col justify-between hover:border-amber-400/50 transition-all hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-amber-500/30 font-mono">
                      {st.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-white mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-700/60 flex items-center text-xs text-amber-400 font-semibold">
                  <span>Tahap {i + 1} Selesai</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Fast CTA */}
        <div className="mt-12 text-center">
          <a
            href={waSurveyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
          >
            <span>Mulai Langkah 1: Ajukan Survei Gratis Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
