import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { MapPin, Phone, Mail, Clock, Send, Navigation, ShieldCheck, Globe, Truck } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface ContactSectionProps {
  company: CompanyInfo;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ company }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    product: 'Rolling Door Galvalum Anti Karat',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMsg = `Halo AR Teknik Rolling Door, saya ingin berkonsultasi mengenai pemesanan & pengiriman:
- Nama: ${formData.name || '-'}
- Nomor HP: ${formData.phone || '-'}
- Kota / Pulau Tujuan: ${formData.location || '-'}
- Pilihan Produk: ${formData.product}
- Catatan / Estimasi Ukuran: ${formData.message || 'Mohon informasi estimasi biaya bahan, ongkir kargo, dan waktu pengiriman.'}`;

    const waUrl = buildWhatsAppUrl(formattedMsg, company.whatsapp);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kontak" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-3 border border-amber-200">
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            Layanan Pelanggan Seluruh Nusantara
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
            Konsultasi Pemesanan & Cek Ongkos Kirim Kargo
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Kunjungi workshop utama kami di Bandar Batang atau hubungi via WhatsApp untuk konsultasi pengiriman ke kota Anda di seluruh Indonesia.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Workshop Info & Badges */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col justify-between h-full">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-amber-400 text-xs font-semibold mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Workshop Utama & Kantor Pemasaran
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                AR Teknik Rolling Door
              </h3>

              <div className="space-y-5 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-0.5">Alamat Workshop Utama:</strong>
                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {company.address}, {company.city}, {company.province}, {company.postalCode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-0.5">Telepon & WhatsApp Layanan Nusantara:</strong>
                    <a
                      href={`tel:${company.phone}`}
                      className="text-amber-400 hover:underline font-mono text-sm block"
                    >
                      {company.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-0.5">Email Resmi:</strong>
                    <a
                      href={`mailto:${company.email}`}
                      className="text-slate-300 hover:text-amber-400 transition-colors text-xs sm:text-sm block"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>

                {/* Working hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-200 mb-0.5">Jam Operasional:</strong>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      {company.workingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Coverage Badges */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2 mb-2.5">
                <Truck className="w-4 h-4 text-amber-400" />
                <span className="text-xs uppercase font-bold text-slate-300 tracking-wider">
                  Wilayah Jangkauan Pengiriman Ekspedisi:
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {company.serviceAreas.map((area, i) => (
                  <span
                    key={i}
                    className="text-[11px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700"
                  >
                    📍 {area}
                  </span>
                ))}
              </div>

              {/* Direct Maps button */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address + ' ' + company.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Buka Petunjuk Arah di Google Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Direct Consultation Form to WhatsApp */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">
              Formulir Permintaan Estimasi & Cek Ongkos Kargo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mb-6">
              Isi data di bawah ini untuk mendapatkan simulasi biaya bahan dan rekomendasi kargo termurah ke lokasi Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nama Lengkap / Perusahaan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Bpk. Gunawan / PT Logistik Nusantara"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nomor WhatsApp Aktif
                  </label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Kota / Kabupaten & Pulau Tujuan
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Balikpapan Kaltim / Denpasar Bali / Batang"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Pilihan Produk / Kebutuhan
                  </label>
                  <select
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                  >
                    <option value="Rolling Door Galvalum Anti Karat">Rolling Door Galvalum Anti Karat</option>
                    <option value="Rolling Door Industri Otomatis Motorized">Rolling Door Mesin Otomatis (Gudang/Pabrik)</option>
                    <option value="Rolling Door One Sheet (Perforated/Polos)">Rolling Door One Sheet (Senyap)</option>
                    <option value="Folding Gate Super Galvalum 0.5mm">Folding Gate Super Galvalum</option>
                    <option value="Folding Gate Extra Super 0.8mm">Folding Gate Extra Super 0.8mm (Heavy Duty)</option>
                    <option value="Pintu Kaca Tempered Frameless 12mm">Pintu Kaca Tempered 10/12mm</option>
                    <option value="Partisi Kusen Aluminium & Etalase Kaca">Partisi Kusen Aluminium</option>
                    <option value="Layanan Servis & Suku Cadang">Servis / Beli Per Pegas Pengganti</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Rencana Ukuran, Jumlah Pintu atau Keterangan Tambahan
                </label>
                <textarea
                  rows={3}
                  placeholder="Misal: Butuh 3 unit Rolling door ukuran Lebar 4m x Tinggi 3.5m untuk ruko di Samarinda, mohon estimasi harga dan kargo laut..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>Kirim Permintaan ke WhatsApp Teknisi AR Teknik</span>
              </button>

              <div className="flex items-center gap-2 justify-center text-xs text-slate-500 mt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Respon cepat teknisi dalam &lt; 10 menit • Diberikan opsi kargo termurah & teraman.</span>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
