import React, { useState } from 'react';
import { 
  Truck, Ship, PackageCheck, Wrench, ShieldCheck, MapPin, 
  ArrowRight, MessageCircle, CheckCircle2, Globe2 
} from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface NationwideShippingSectionProps {
  whatsappNumber: string;
}

export const NationwideShippingSection: React.FC<NationwideShippingSectionProps> = ({ whatsappNumber }) => {
  const [selectedIsland, setSelectedIsland] = useState<string>('kalimantan');

  const islands = [
    {
      id: 'jawa',
      name: 'Pulau Jawa & Jabodetabek',
      estTime: '1 - 3 Hari',
      expedition: 'Truk Box / Armada Langsung AR Teknik',
      note: 'Tersedia layanan survei & instalasi langsung oleh teknisi bengkel.'
    },
    {
      id: 'sumatera',
      name: 'Sumatera & Kepulauan',
      estTime: '3 - 5 Hari',
      expedition: 'Kargo Darat / Kapal Ro-Ro Penyeberangan',
      note: 'Melayani Lampung, Palembang, Jambi, Padang, Pekanbaru, Medan, hingga Aceh.'
    },
    {
      id: 'kalimantan',
      name: 'Kalimantan & Kawasan IKN',
      estTime: '4 - 7 Hari',
      expedition: 'Kargo Kontainer Pelabuhan Tanjung Mas / Perak',
      note: 'Sering melayani proyek warehouse Balikpapan, Samarinda, Banjarmasin, & Pontianak.'
    },
    {
      id: 'sulawesi',
      name: 'Sulawesi',
      estTime: '5 - 8 Hari',
      expedition: 'Kargo Laut Reguler & Cepat',
      note: 'Tujuan Makassar, Manado, Palu, Kendari, Gorontalo dengan kemasan peti kayu solid.'
    },
    {
      id: 'bali',
      name: 'Bali & Nusa Tenggara',
      estTime: '2 - 5 Hari',
      expedition: 'Truk Kargo Penyeberangan Ferry',
      note: 'Melayani villa, cafe, ruko di Denpasar, Badung, Lombok Mataram, hingga NTT.'
    },
    {
      id: 'papua',
      name: 'Maluku & Papua',
      estTime: '7 - 14 Hari',
      expedition: 'Kontainer Kapal Pelni / Kargo Laut Khusus',
      note: 'Melayani Ambon, Ternate, Jayapura, Sorong, Timika dengan pengemasan anti lembab.'
    }
  ];

  const currentIslandData = islands.find((i) => i.id === selectedIsland) || islands[0];

  const handleConsultShipping = (islandName: string) => {
    const text = `Halo AR Teknik Rolling Door, saya ingin berkonsultasi mengenai pemesanan & estimasi ongkos kirim kargo ke wilayah *${islandName}*. Mohon informasi prosedur dan biaya ekspedisinya. Terima kasih.`;
    const url = buildWhatsAppUrl(text, whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="pengiriman-nusantara" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-800 border border-amber-500/40 text-amber-300 text-xs font-bold mb-3 shadow">
            <Globe2 className="w-3.5 h-3.5 text-amber-400" />
            Jangkauan Layanan Seluruh Nusantara
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Pengiriman & Pemasangan ke Seluruh Indonesia
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3">
            Bukan hanya Jawa Tengah, bengkel kami rutin menyuplai pintu <strong className="text-white">Rolling Door</strong>, <strong className="text-white">Folding Gate</strong>, dan <strong className="text-white">Kaca Tempered</strong> ke berbagai pulau di Nusantara dengan proteksi kemasan maksimal dan tarif kargo termurah.
          </p>
        </div>

        {/* 4 Guarantees Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-2">Packing Kayu Ekspor Solid</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Setiap unit dilapisi bubble wrap, stretch film kedap air, dan dibingkai peti kayu tebal agar slat pintu tidak bengkok saat pengiriman laut/darat.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Anti Lecet & Anti Penyok</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Ship className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-2">Rekanan Kargo Tarif Grosir</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bekerja sama dengan ekspedisi kargo terpercaya (Indah Logistik, Dakota, Baraka, & Kontainer Pelni) dengan harga khusus bengkel yang sangat hemat.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Nomor Resi Pelacakan Real-time</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-2">Sistem Knock-Down Presisi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Komponen telah dipotong presisi dan diberi nomor kode. Disertai video tutorial panduan perakitan langkah demi langkah yang mudah diikuti tukang lokal Anda.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Konsultasi Teknis Video Call</span>
            </div>
          </div>

          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between hover:border-amber-400/50 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base text-white mb-2">Opsi Kirim Sekaligus Teknisi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Untuk pemesanan volume banyak (komplek ruko, mall, pabrik atau warehouse di luar pulau), tim teknisi AR Teknik siap diterbangkan langsung ke lokasi Anda.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Pemasangan Bergaransi Penuh</span>
            </div>
          </div>
        </div>

        {/* Interactive Island Selector Box */}
        <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-400" />
                Cek Estimasi Waktu Pengiriman Berdasarkan Wilayah
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Pilih pulau tujuan Anda untuk melihat estimasi jalur kargo dan waktu pengiriman dari workshop AR Teknik Batang.
              </p>
            </div>
            <button
              onClick={() => handleConsultShipping(currentIslandData.name)}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 transition-all shrink-0 shadow"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Tanya Ongkir {currentIslandData.name}</span>
            </button>
          </div>

          {/* Island Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
            {islands.map((isle) => (
              <button
                key={isle.id}
                onClick={() => setSelectedIsland(isle.id)}
                className={`p-3 rounded-xl text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-1 border ${
                  selectedIsland === isle.id
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg scale-102'
                    : 'bg-slate-900/90 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
                }`}
              >
                <span>{isle.name.split(' ')[0]}</span>
                <span className="text-[10px] font-normal opacity-90">{isle.name.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>

          {/* Selected Island Detail Info Card */}
          <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-700/80 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Wilayah Tujuan Terpilih:</span>
              <strong className="text-base text-amber-300 font-bold block">{currentIslandData.name}</strong>
              <span className="text-xs text-slate-400 mt-1 block">{currentIslandData.note}</span>
            </div>

            <div>
              <span className="text-[11px] text-slate-400 block mb-0.5">Estimasi Durasi Pengiriman:</span>
              <div className="text-xl font-mono font-black text-white">{currentIslandData.estTime}</div>
              <span className="text-[11px] text-emerald-400 block mt-0.5">Via {currentIslandData.expedition}</span>
            </div>

            <div className="flex md:justify-end">
              <button
                onClick={() => handleConsultShipping(currentIslandData.name)}
                className="w-full md:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 hover:border-amber-400 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Konsultasikan Ongkir & Rincian via WA</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
