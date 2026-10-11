import React, { useState } from 'react';
import { ProductPriceItem, ProductCategory } from '../types';
import { MessageCircle, Check, Search, Sparkles, Filter, Calculator } from 'lucide-react';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface PriceCatalogProps {
  pricing: ProductPriceItem[];
  whatsappNumber: string;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  onOpenCalculatorWithProduct?: (product: ProductPriceItem) => void;
}

export const PriceCatalog: React.FC<PriceCatalogProps> = ({
  pricing,
  whatsappNumber,
  selectedCategory,
  onCategoryChange,
  onOpenCalculatorWithProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'rolling-door', label: 'Rolling Door' },
    { id: 'folding-gate', label: 'Folding Gate' },
    { id: 'kaca-aluminium', label: 'Kaca & Aluminium' },
    { id: 'servis', label: 'Servis / Perbaikan' },
  ];

  const filteredPricing = pricing.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.thickness.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="produk" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
              Daftar Harga & Spesifikasi
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-1">
              Transparan, Tanpa Biaya Tersembunyi
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Harga langsung dari bengkel AR Teknik Bandar Batang. Termasuk konsultasi, survey, dan garansi resmi. Harga dapat disesuaikan untuk volume proyek skala besar.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari produk (contoh: galvalum)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 border-b border-slate-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {filteredPricing.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">Tidak ada produk yang cocok dengan pencarian "{searchTerm}".</p>
            <button
              onClick={() => {
                setSearchTerm('');
                onCategoryChange('all');
              }}
              className="mt-3 text-xs font-semibold text-amber-600 hover:underline"
            >
              Reset Filter Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPricing.map((item) => {
              const waOrderText = `Halo AR Teknik, saya ingin tanya harga dan spesifikasi untuk produk: *${item.name}* (Harga tertera: ${formatCurrency(item.pricePerUnit)}/${item.unit}). Apakah ada diskon untuk ukuran saya? Terima kasih.`;
              const waUrl = buildWhatsAppUrl(waOrderText, whatsappNumber);

              return (
                <div
                  key={item.id}
                  className={`relative rounded-2xl border bg-white flex flex-col justify-between transition-all duration-300 hover:shadow-lg ${
                    item.popular
                      ? 'border-amber-500 shadow-md ring-1 ring-amber-500/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Popular Tag */}
                  {item.popular && (
                    <div className="absolute -top-3 right-6 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-[11px] px-3 py-1 rounded-full shadow flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      Pilihan Favorit Pelanggan
                    </div>
                  )}

                  <div className="p-6">
                    {/* Category & Thickness */}
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="uppercase font-semibold tracking-wider text-amber-600">
                        {item.category.replace('-', ' ')}
                      </span>
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded font-mono text-[11px] font-medium">
                        Tebal: {item.thickness}
                      </span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-slate-600 leading-relaxed mb-5">
                      {item.description}
                    </p>

                    {/* Price Block */}
                    <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                      <span className="text-[11px] text-slate-500 block mb-0.5">Mulai dari</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-slate-950">
                          {formatCurrency(item.pricePerUnit)}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ {item.unit}</span>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-medium mt-1 block">
                        ✓ Termasuk Rangka, Rel & Garansi Servis
                      </span>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2 mb-6">
                      <span className="text-xs font-bold text-slate-900 block uppercase tracking-wide">
                        Spesifikasi & Keunggulan:
                      </span>
                      {item.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-auto flex flex-col gap-2">
                    {onOpenCalculatorWithProduct && item.unit === 'm²' && (
                      <button
                        onClick={() => onOpenCalculatorWithProduct(item)}
                        className="w-full py-2.5 px-3 rounded-xl border border-slate-200 hover:border-amber-400 text-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors bg-white hover:bg-amber-50/50"
                      >
                        <Calculator className="w-3.5 h-3.5 text-amber-600" />
                        Hitung Total Ukuran Saya
                      </button>
                    )}
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        item.popular
                          ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Tanya & Pesan via WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pricing Note */}
        <div className="mt-12 text-center text-xs text-slate-500 max-w-3xl mx-auto">
          * Catatan: Harga di atas merupakan estimasi standar bengkel AR Teknik. Harga akhir dapat menyesuaikan kondisi lapangan (seperti penambahan balok gantung, opening khusus, atau lokasi bertingkat). Untuk kepastian biaya, kami sediakan <strong>Survei Lokasi 100% Gratis</strong> tanpa biaya sepeser pun.
        </div>

      </div>
    </section>
  );
};
