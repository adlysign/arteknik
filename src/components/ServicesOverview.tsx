import React from 'react';
import { DoorClosed, Shield, Sparkles, Wrench, ArrowRight, CheckCircle2, MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, getQuickConsultationMessage } from '../utils/whatsapp';

interface ServicesOverviewProps {
  whatsappNumber: string;
  onSelectCategory: (category: string) => void;
}

export const ServicesOverview: React.FC<ServicesOverviewProps> = ({ whatsappNumber, onSelectCategory }) => {
  const services = [
    {
      id: 'rolling-door',
      title: 'Pintu Rolling Door',
      badge: 'Paling Populer',
      icon: DoorClosed,
      description: 'Pilihan utama keamanan ruko, toko pasar, kios, warehouse, dan garasi hunian.',
      highlights: [
        'Rolling Door Besi Slat (Ekonomis & Kuat)',
        'Rolling Door Galvalum (Tahan Karat & Ringan)',
        'One Sheet Solid / Perforated (Senyap berperedam nilon)',
        'Motorized Otomatis (Heavy Duty mesin remote)'
      ],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=700&q=80',
      actionText: 'Lihat Tipe Rolling Door'
    },
    {
      id: 'folding-gate',
      title: 'Folding Gate Harmonika',
      badge: 'Proteksi Maksimal',
      icon: Shield,
      description: 'Pintu lipat baja kokoh dengan sistem silangan rapat anti congkel untuk perlindungan aset toko.',
      highlights: [
        'Plat Daun Standar 0.4mm s/d Extra Super 0.8mm',
        'Bahan Plat Galvalum & Besi Berkualitas',
        'Roda Bearing Ganda anti anjlok & rel UNP kokoh',
        'Kupingan gembok tebal baja tahan gergaji'
      ],
      image: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=700&q=80',
      actionText: 'Lihat Tipe Folding Gate'
    },
    {
      id: 'kaca-aluminium',
      title: 'Pintu Kaca & Kusen Aluminium',
      badge: 'Estetika Modern',
      icon: Sparkles,
      description: 'Fasad toko mewah, showroom, cafe modern, dan partisi kantor berstandar arsitektur.',
      highlights: [
        'Pintu Kaca Tempered Frameless 10mm & 12mm',
        'Engsel Tanam Floor Hinge berkualitas (Dorma/Dekson)',
        'Partisi Kusen Aluminium Alexindo / Dacon 3" & 4"',
        'Pintu Sliding & Pintu Henderson Kaca'
      ],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=700&q=80',
      actionText: 'Lihat Katalog Kaca'
    },
    {
      id: 'servis',
      title: 'Servis & Perbaikan Cepat',
      badge: 'Siap Datang ke Lokasi',
      icon: Wrench,
      description: 'Layanan panggilan perbaikan darurat untuk rolling door macet, per putus, atau roda anjlok.',
      highlights: [
        'Penggantian Per Pegas Baja Baru (Awet Bertahun-tahun)',
        'Perbaikan Slat miring, anjlok, atau macet',
        'Ganti roda bearing & pelumasan rel jalur',
        'Perbaikan mesin dinamo otomatis & remote'
      ],
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=700&q=80',
      actionText: 'Panggil Teknisi Servis'
    }
  ];

  return (
    <section id="layanan" className="py-16 sm:py-20 bg-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
            Lini Produk & Layanan Kami
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
            Solusi Pintu Besi & Kaca Terlengkap di Batang
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Diproduksi dengan mesin presisi di bengkel AR Teknik Bandar. Material terjamin ketebalannya, rapi, dan tahan lama untuk segala kebutuhan komersial maupun hunian.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((item) => {
            const Icon = item.icon;
            const waUrl = buildWhatsAppUrl(getQuickConsultationMessage(item.title), whatsappNumber);

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Card Image */}
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                  <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-bold text-[11px] px-2.5 py-1 rounded-md shadow">
                    {item.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-lg text-slate-900 group-hover:text-amber-600 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                    <button
                      onClick={() => onSelectCategory(item.id)}
                      className="w-full text-center py-2 px-3 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                    >
                      <span>Lihat Harga & Model</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full text-center py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white" />
                      <span>Tanya via WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Local Area Alert */}
        <div className="mt-12 bg-white rounded-xl p-5 border border-amber-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600 shrink-0">
              <DoorClosed className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Butuh Pengukuran Ukuran Khusus / Custom?</h4>
              <p className="text-xs text-slate-600">
                Kami siap datang langsung ke lokasi ruko, proyek, atau rumah Anda di wilayah Bandar, Batang, Pekalongan, hingga Semarang untuk pengukuran akurat dan konsultasi gratis.
              </p>
            </div>
          </div>
          <a
            href={buildWhatsAppUrl('Halo AR Teknik, saya ingin minta survey pengukuran lokasi ke tempat saya.', whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <span>Jadwalkan Survei Lokasi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
};
