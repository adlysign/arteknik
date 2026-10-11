import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Menu, X, Lock, Calculator, Globe } from 'lucide-react';
import { CompanyInfo } from '../types';
import { buildWhatsAppUrl, getQuickConsultationMessage } from '../utils/whatsapp';

interface NavbarProps {
  company: CompanyInfo;
  onOpenCms: () => void;
  onOpenCalculator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ company, onOpenCms, onOpenCalculator }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Produk & Harga', href: '#produk' },
    { label: 'Kalkulator Biaya', href: '#kalkulator' },
    { label: 'Galeri Proyek', href: '#galeri' },
    { label: 'Kirim Nusantara', href: '#pengiriman-nusantara' },
    { label: 'Keunggulan', href: '#keunggulan' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Kontak', href: '#kontak' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  const waUrl = buildWhatsAppUrl(getQuickConsultationMessage('Rolling Door & Folding Gate'), company.whatsapp);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-200">
      {/* Top Bar for Desktop */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              Layanan Siap Kirim & Pasang ke Seluruh Nusantara Indonesia
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              Workshop Utama: Ds. Tumbrep Bandar, Batang, Jateng
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${company.phone}`}
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-400 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{company.phone}</span>
            </a>
            <button
              onClick={onOpenCms}
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors text-[11px] bg-slate-800 px-2 py-0.5 rounded border border-slate-700 hover:border-slate-500"
              title="Kelola Konten & Portofolio (CMS)"
            >
              <Lock className="w-3 h-3 text-amber-400" />
              <span>Admin CMS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      
{/* Logo Brand */}
<a href="#beranda" className="flex items-center gap-3 group">
  <img
    src="/logo.png"
    alt="Logo AR Teknik Rolling Door"
    className="h-12 w-auto max-w-[140px] object-contain transition-transform group-hover:scale-105"
  />
  <div className="flex flex-col">
    <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
      AR TEKNIK
    </span>
    <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-amber-600 uppercase mt-0.5">
      Rolling Door • Folding Gate • Kaca
    </span>
  </div>
</a>


          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-amber-600 transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-amber-600 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all hover:border-amber-500"
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>Hitung Biaya</span>
            </button>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat WA Cepat</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleLinkClick}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCalculator();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 font-semibold text-sm hover:bg-slate-50"
              >
                <Calculator className="w-4 h-4 text-amber-600" />
                Simulasi Hitung Biaya Otomatis
              </button>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-600 text-white font-bold text-sm shadow hover:bg-emerald-700"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                Konsultasi WhatsApp Sekarang
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCms();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                <Lock className="w-3.5 h-3.5" />
                Login Admin CMS Portofolio & Harga
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
