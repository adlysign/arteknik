import React from 'react';
import { ShieldCheck, Ruler, Clock, Banknote, Wrench, Globe, CheckCircle, PackageCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: Globe,
      title: 'Layanan Pengiriman ke Seluruh Nusantara',
      description: 'Menjangkau seluruh wilayah Indonesia (Sumatera, Jawa, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Papua). Pengiriman via kargo darat & kapal kontainer laut resmi.'
    },
    {
      icon: PackageCheck,
      title: 'Packing Kayu Solid Standar Ekspor',
      description: 'Setiap pengiriman luar kota atau luar pulau dibungkus plastik stretch, bubble wrap tebal, dan peti kayu kokoh sehingga tiba di lokasi tanpa resiko penyok atau lecet.'
    },
    {
      icon: Banknote,
      title: 'Harga Langsung dari Pabrik / Bengkel',
      description: 'Tanpa perantara atau calo! Anda bertransaksi langsung dengan workshop fabrikasi AR Teknik, sehingga harga jauh lebih hemat dan bersaing.'
    },
    {
      icon: ShieldCheck,
      title: 'Material SNI & Ketebalan Asli',
      description: 'Kami menjamin ketebalan plat galvalum, silangan folding gate, dan kaca tempered sesuai spesifikasi kontrak kerja (tanpa downgrade bahan).'
    },
    {
      icon: Ruler,
      title: 'Presisi & Sistem Knock-Down Mudah Pasang',
      description: 'Setiap bagian dipotong presisi menggunakan mesin modern dan diberi tanda nomor pemasangan, dilengkapi buku petunjuk dan video panduan teknisi.'
    },
    {
      icon: Wrench,
      title: 'Garansi Resmi Konstruksi 1 Tahun',
      description: 'Setiap pemasangan baru dilindungi garansi resmi. Jika per pegas, roda bearing, atau komponen mekanis bermasalah, kami sediakan solusi dan suku cadang pengganti.'
    }
  ];

  return (
    <section id="keunggulan" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
            Mengapa Memilih AR Teknik Rolling Door?
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
            Standar Kualitas Industri Terpercaya di Indonesia
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Berpengalaman lebih dari 10 tahun melayani ratusan pemilik ruko, toko, kontraktor pergudangan, dan pabrik di seluruh pelosok Indonesia.
          </p>
        </div>

        {/* 6 Grid points */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:bg-white hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2">
                  {pt.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Quality commitment strip */}
        <div className="mt-12 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-base sm:text-lg text-white">Komitmen Mutu & Keamanan Pengiriman</h4>
              <p className="text-xs sm:text-sm text-slate-300">
                Pintu diuji coba buka-tutup di bengkel sebelum di-packing kayu dan diserahkan ke pihak ekspedisi untuk memastikan tarikan enteng dan presisi.
              </p>
            </div>
          </div>
          <div className="text-amber-400 text-xs sm:text-sm font-mono font-bold bg-slate-800 px-4 py-2 rounded-xl border border-slate-700 shrink-0">
            ✓ Jaminan Uji QC & Video Call Pengecekan
          </div>
        </div>

      </div>
    </section>
  );
};
