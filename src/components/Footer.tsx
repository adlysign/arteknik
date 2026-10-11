import React from 'react';
import { CompanyInfo } from '../types';
import { MapPin, Phone, Mail, Clock, ShieldCheck, Lock, ArrowUp, Globe, Truck } from 'lucide-react';
import { buildWhatsAppUrl, getQuickConsultationMessage } from '../utils/whatsapp';

interface FooterProps {
  company: CompanyInfo;
  onOpenCms: () => void;
}

export const Footer: React.FC<FooterProps> = ({ company, onOpenCms }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const waUrl = buildWhatsAppUrl(getQuickConsultationMessage('Rolling Door & Folding Gate'), company.whatsapp);

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-slate-950 font-black text-xl shadow-md border border-amber-400">
                AR
              </div>
              <div>
                <span className="font-extrabold text-lg text-white tracking-tight block">
                  AR TEKNIK
                </span>
                <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wider block">
                  Rolling Door • Folding Gate • Kaca
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Pusat bengkel fabrikasi dan perakitan Rolling Door manual/otomatis, Folding Gate galvalum anti karat, dan Kusen Kaca Tempered. Melayani pengiriman dan pemasangan ke seluruh Nusantara Indonesia.
            </p>

            <div className="flex items-center gap-2 text-xs text-emerald-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garansi Resmi 1 Tahun & Packing Kayu Ekspor</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Katalog & Layanan
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#produk" className="hover:text-amber-400 transition-colors">
                  • Rolling Door Besi & Galvalum
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-amber-400 transition-colors">
                  • Rolling Door One Sheet & Motorized Otomatis
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-amber-400 transition-colors">
                  • Folding Gate Harmonika Super (0.5 - 0.8mm)
                </a>
              </li>
              <li>
                <a href="#produk" className="hover:text-amber-400 transition-colors">
                  • Pintu Kaca Tempered Frameless 10/12mm
                </a>
              </li>
              <li>
                <a href="#pengiriman-nusantara" className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-300 font-medium">
                  <Truck className="w-3.5 h-3.5" />
                  <span>• Pengiriman Seluruh Nusantara</span>
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  • Tanya Jawab Seputar Pemesanan (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2">
              Workshop Utama
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {company.address}, {company.city}, {company.province}, {company.postalCode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${company.phone}`} className="text-slate-200 hover:text-amber-400 font-mono">
                  {company.phone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${company.email}`} className="text-slate-200 hover:text-amber-400">
                  {company.email}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{company.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Nationwide Scope & Fast Actions */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-slate-800 pb-2 flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-amber-400" />
              <span>Jangkauan Nusantara</span>
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Melayani pengiriman via kargo darat & kontainer laut ke Pulau Jawa, Sumatera, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Maluku, hingga Papua.
            </p>
            <div className="space-y-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <span>Konsultasi & Cek Ongkir Kargo</span>
              </a>
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Kembali ke Atas</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright & CMS access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} <strong>{company.name}</strong>. Spesialis Pintu Besi & Kaca Nusantara.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">Pusat Workshop: Batang, Jawa Tengah • Kirim se-Indonesia</span>
            <button
              onClick={onOpenCms}
              className="flex items-center gap-1.5 text-slate-400 hover:text-amber-400 transition-colors bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 font-medium"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Kelola CMS Website</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
