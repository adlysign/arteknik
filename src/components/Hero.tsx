import React from 'react';
import { MessageCircle, Calculator, ShieldCheck, CheckCircle2, Award, Globe, ArrowRight, Truck } from 'lucide-react';
import { CompanyInfo } from '../types';
import { buildWhatsAppUrl, getSurveyRequestMessage } from '../utils/whatsapp';

interface HeroProps {
  company: CompanyInfo;
  onOpenCalculator: () => void;
}

export const Hero: React.FC<HeroProps> = ({ company, onOpenCalculator }) => {
  const waSurveyUrl = buildWhatsAppUrl(
    getSurveyRequestMessage('', 'Seluruh Indonesia / Luar Kota / Luar Pulau', 'Rolling Door / Folding Gate / Kaca'),
    company.whatsapp
  );

  return (
    <section id="beranda" className="relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900 text-white overflow-hidden pt-8 pb-16 lg:py-20">
      {/* Background Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      
      {/* Industrial ambient accent light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & High-Conversion CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Trust Tag with Nationwide Presence */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/90 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>Fabrikasi Spesialis • Siap Kirim & Pasang ke Seluruh Nusantara</span>
            </div>

            {/* Main Headline (H1 for SEO) */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-5">
              Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">Rolling Door</span>, Folding Gate & Kaca Nusantara.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-8">
              Pusat pembuatan dan servis <strong className="text-white">Rolling Door Manual & Otomatis</strong>, <strong className="text-white">Folding Gate Galvalum Anti Karat</strong>, serta <strong className="text-white">Pintu & Partisi Kaca Tempered</strong>. Melayani pemesanan untuk seluruh wilayah Indonesia (Jawa, Sumatera, Kalimantan, Sulawesi, Bali, Papua) dengan sistem packing kayu ekspor aman dan harga bengkel langsung.
            </p>

            {/* Key Value Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-8 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Siap Kirim se-Nusantara</strong> Packing Kayu Ekspor</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Harga Langsung Bengkel</strong> Tanpa Makelar</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Garansi Resmi</strong> Hingga 12 Bulan</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span><strong>Sistem Knock-Down</strong> Presisi & Video Tutorial</span>
              </div>
            </div>

            {/* Conversion CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a
                href={waSurveyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-base shadow-xl shadow-emerald-950/50 hover:shadow-emerald-600/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Konsultasi & Cek Ongkir via WhatsApp</span>
              </a>

              <button
                onClick={onOpenCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-slate-100 font-semibold text-base hover:border-amber-400/50 transition-all"
              >
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>Simulasi Estimasi Biaya</span>
              </button>
            </div>

            {/* Contact Micro-proof */}
            <div className="mt-5 text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Fast response teknisi: <strong>{company.phone}</strong> • Siap kirim surat penawaran (RAB/Invoice)</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 bg-slate-800 group">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
                  alt="Instalasi Rolling Door Industri dan Ekspedisi Nusantara AR Teknik"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

                {/* Floating Tag inside card */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-4 rounded-xl border border-slate-700/80">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-bold text-amber-400">
                      Ekspedisi Kargo Seluruh Nusantara
                    </span>
                    <span className="text-[11px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
                      Packing Kayu Pallet
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    Pintu Toko, Ruko, Gudang Logistik & Fasad Kaca
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Jawa, Sumatera, Kalimantan, Sulawesi, Bali, NTB, NTT hingga Papua.
                  </p>
                </div>
              </div>

              {/* Decorative Floating Trust Badge */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-amber-500 text-slate-950 p-4 rounded-xl shadow-xl flex items-center gap-3 border-2 border-white">
                <Award className="w-8 h-8 text-slate-950" />
                <div>
                  <div className="text-base font-black leading-tight">GARANSI 1 TAHUN</div>
                  <div className="text-xs font-semibold text-slate-900">Konstruksi & Per Pegas Baja</div>
                </div>
              </div>

              {/* Decorative Cargo Badge */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-slate-800/95 backdrop-blur border border-slate-600 text-white px-3.5 py-2 rounded-lg shadow-lg text-xs font-medium flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>Kargo Darat & Kontainer Kapal Laut</span>
              </div>
            </div>
          </div>

        </div>

        {/* Stats Strip */}
        <div className="mt-14 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">38+ Kota</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Pengiriman se-Indonesia</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">100% Aman</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Peti Kayu Pallet Ekspor</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">500+ Unit</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Terpasang & Terkirim</div>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/40 border border-slate-800">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">12 Bulan</div>
            <div className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">Garansi Resmi Teknisi</div>
          </div>
        </div>

      </div>
    </section>
  );
};
