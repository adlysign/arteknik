import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Search } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FaqSectionProps {
  whatsappNumber: string;
}

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'pengiriman' | 'produk' | 'pemesanan' | 'garansi';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ whatsappNumber }) => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      category: 'pengiriman',
      question: 'Apakah AR Teknik melayani pengiriman dan pemasangan ke luar Pulau Jawa (seluruh Nusantara)?',
      answer: 'Ya! AR Teknik melayani pemesanan ke seluruh Indonesia mulai dari Sumatera, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Maluku, hingga Papua. Kami menyediakan sistem packing kayu pallet ekstra tebal tahan benturan, sistem knock-down presisi (siap rakit mandiri dengan video tutorial), atau opsi tim teknisi kami berangkat langsung ke lokasi proyek Anda untuk volume besar.'
    },
    {
      id: 'faq-2',
      category: 'pemesanan',
      question: 'Bagaimana cara memesan jika lokasi saya berada di luar kota atau luar pulau?',
      answer: 'Sangat mudah! Anda cukup mengukur lebar dan tinggi opening pintu serta mengirimkan foto lokasi melalui WhatsApp di 0856-4798-5924. Tim teknisi kami akan memandu cara pengukuran yang benar via video call jika diperlukan, lalu membuatkan rincian estimasi biaya bahan, ongkir kargo, dan jadwal fabrikasinya.'
    },
    {
      id: 'faq-3',
      category: 'pengiriman',
      question: 'Bagaimana keamanan barang selama proses pengiriman kargo jarak jauh / laut?',
      answer: 'Setiap produk yang dikirim ke luar kota atau antarpulau selalu dilapisi plastik stretch kedap air, bubble wrap pelindung gores, dan dikurung dalam peti kayu solid (wooden crate). Kami bermitra dengan ekspedisi kargo spesialis barang berat (Indah Logistik, Dakota, Baraka, ekspedisi kontainer kapal) yang terbukti aman dan memiliki nomor resi pelacakan online.'
    },
    {
      id: 'faq-4',
      category: 'produk',
      question: 'Apa keunggulan Rolling Door Galvalum dibandingkan Rolling Door Besi biasa?',
      answer: 'Rolling Door Galvalum terbuat dari paduan seng-aluminium (zinc-aluminium) yang memiliki ketahanan karat sangat tinggi, sangat cocok untuk iklim tropis dan wilayah pesisir pantai. Selain itu, bobotnya lebih ringan sehingga tarikan saat buka-tutup jauh lebih enteng dan awet pada per pegas baja.'
    },
    {
      id: 'faq-5',
      category: 'produk',
      question: 'Berapa lama waktu fabrikasi pembuatan di bengkel AR Teknik?',
      answer: 'Waktu produksi standar di bengkel kami berkisar antara 3 hingga 7 hari kerja tergantung volume pesanan dan spesifikasi khusus (misal warna khusus powder coating oven atau pesanan motorized otomatis). Untuk pesanan ekspres/urgent dapat dikonsultasikan terlebih dahulu.'
    },
    {
      id: 'faq-6',
      category: 'pemesanan',
      question: 'Apakah bisa menerbitkan Surat Penawaran Harga (RAB) & Invoice resmi untuk perusahaan?',
      answer: 'Bisa. Kami rutin bermitra dengan perusahaan kontraktor, pengembang ruko, dan pengelola gudang industri. Kami dapat menyediakan Surat Penawaran Resmi (SPH), Rencana Anggaran Biaya (RAB), kwitansi bermaterai, dan invoice resmi atas nama AR Teknik.'
    },
    {
      id: 'faq-7',
      category: 'garansi',
      question: 'Bagaimana sistem garansi yang diberikan oleh AR Teknik?',
      answer: 'Semua produk baru kami berikan Garansi Resmi hingga 12 bulan untuk per pegas, silangan, dan sistem mekanis. Untuk pelanggan di wilayah Jateng kami sediakan servis gratis di tempat. Untuk pelanggan luar pulau, kami sediakan garansi penggantian suku cadang dan pendampingan teknis seumur hidup.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-3 border border-amber-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Tanya Jawab Seputar Pemesanan & Pengiriman
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Informasi lengkap seputar pemesanan rolling door, folding gate, pengiriman ke seluruh Nusantara, dan garansi.
          </p>
        </div>

        {/* Search Input for FAQs */}
        <div className="relative mb-8">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari pertanyaan (misal: pengiriman luar pulau, garansi, galvalum)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 bg-slate-50/50"
          />
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-amber-500 bg-amber-50/20 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-slate-900"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                    <span>{faq.question}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-amber-100/60 mt-1 pt-3 animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-10 p-5 rounded-2xl bg-slate-100 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Punya pertanyaan lain yang belum terjawab?</h4>
            <p className="text-xs text-slate-600">Teknisi kami siap menjawab pertanyaan teknis Anda via WhatsApp.</p>
          </div>
          <a
            href={buildWhatsAppUrl('Halo AR Teknik, saya ingin menanyakan hal lain seputar pemesanan pintu.', whatsappNumber)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shrink-0 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chat CS Teknisi via WA</span>
          </a>
        </div>

      </div>
    </section>
  );
};
