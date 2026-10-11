import React, { useState, useId } from 'react';
import { ProductPriceItem } from '../types';
import { Calculator, MessageCircle, RefreshCw, CheckCircle, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';
import { buildWhatsAppUrl, getCalculatorEstimateMessage } from '../utils/whatsapp';

interface PriceCalculatorProps {
  pricing: ProductPriceItem[];
  whatsappNumber: string;
  initialProductId?: string;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({
  pricing,
  whatsappNumber,
  initialProductId,
}) => {
  const widthInputId = useId();
  const heightInputId = useId();
  const productSelectId = useId();
  const locationInputId = useId();

  // Filter only items that are priced per m²
  const availableProducts = pricing.filter((p) => p.unit === 'm²');

  const [selectedProductId, setSelectedProductId] = useState<string>(() => {
    if (initialProductId && availableProducts.some((p) => p.id === initialProductId)) {
      return initialProductId;
    }
    // Default to Galvalum
    const defaultItem = availableProducts.find((p) => p.name.includes('Galvalum')) || availableProducts[0];
    return defaultItem ? defaultItem.id : '';
  });

  const [width, setWidth] = useState<number>(3.0);
  const [height, setHeight] = useState<number>(2.8);
  const [userLocation, setUserLocation] = useState<string>('');
  
  // Options
  const [includeMotor, setIncludeMotor] = useState<boolean>(false);
  const [includePowderCoat, setIncludePowderCoat] = useState<boolean>(false);

  const selectedProduct = availableProducts.find((p) => p.id === selectedProductId) || availableProducts[0];

  // Minimum calculation area rule in rolling door/folding gate industry (standard 6 m²)
  const rawArea = Math.max(0.5, width * height);
  const effectiveArea = rawArea < 6.0 ? 6.0 : rawArea; // Standard industry min charge is 6 m²
  const isMinimumApplied = rawArea < 6.0;

  // Base price
  const baseCost = selectedProduct ? selectedProduct.pricePerUnit * effectiveArea : 0;
  
  // Extra options
  const motorCost = includeMotor ? 3500000 : 0;
  const powderCoatCost = includePowderCoat ? effectiveArea * 50000 : 0;
  const totalCost = baseCost + motorCost + powderCoatCost;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleSendToWhatsApp = () => {
    if (!selectedProduct) return;

    const optionsList: string[] = [];
    if (includeMotor) optionsList.push('Mesin Motorized Otomatis Shinsei');
    if (includePowderCoat) optionsList.push('Finishing Powder Coating');
    if (isMinimumApplied) optionsList.push(`Perhitungan min. 6 m² (Luas aktual: ${rawArea.toFixed(2)} m²)`);

    const msg = getCalculatorEstimateMessage({
      productName: selectedProduct.name,
      category: selectedProduct.category,
      width,
      height,
      area: effectiveArea,
      totalEstimate: totalCost,
      optionsText: optionsList.join(', '),
      location: userLocation.trim() || undefined,
    });

    const waUrl = buildWhatsAppUrl(msg, whatsappNumber);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="kalkulator" className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5 text-amber-400" />
            Simulasi Biaya Transparan
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
            Kalkulator Estimasi Biaya Pembuatan
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Masukkan dimensi opening pintu Anda untuk menghitung perkiraan biaya material & instalasi secara instan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Input Controls Column */}
          <div className="lg:col-span-7 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700/80 shadow-xl backdrop-blur">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Langkah 1: Masukkan Ukuran & Pilihan Material
            </h3>

            {/* Product Select */}
            <div className="mb-6">
              <label htmlFor={productSelectId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Pilih Jenis Pintu / Material
              </label>
              <select
                id={productSelectId}
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
              >
                {availableProducts.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatCurrency(p.pricePerUnit)} / {p.unit}
                  </option>
                ))}
              </select>
              {selectedProduct && (
                <p className="text-xs text-amber-300/80 mt-1.5 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span>{selectedProduct.description}</span>
                </p>
              )}
            </div>

            {/* Dimensions (Lebar & Tinggi) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor={widthInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Lebar Bukaan (Meter)
                </label>
                <div className="relative">
                  <input
                    id={widthInputId}
                    type="number"
                    step="0.1"
                    min="1.0"
                    max="20.0"
                    value={width}
                    onChange={(e) => setWidth(parseFloat(e.target.value) || 1)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                    meter
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[2.5, 3.0, 4.0, 5.0].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setWidth(preset)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {preset}m
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor={heightInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Tinggi Bukaan (Meter)
                </label>
                <div className="relative">
                  <input
                    id={heightInputId}
                    type="number"
                    step="0.1"
                    min="1.5"
                    max="10.0"
                    value={height}
                    onChange={(e) => setHeight(parseFloat(e.target.value) || 1.5)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
                    meter
                  </span>
                </div>
                <div className="flex gap-2 mt-2">
                  {[2.4, 2.8, 3.2, 4.0].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setHeight(preset)}
                      className="text-[11px] px-2 py-0.5 rounded bg-slate-700/60 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      {preset}m
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Add-ons */}
            <div className="mb-6 pt-4 border-t border-slate-700/60">
              <span className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                Opsi Tambahan (Opsional)
              </span>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeMotor}
                    onChange={(e) => setIncludeMotor(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-white block">Mesin Motorized Otomatis (+ Rp 3.500.000)</span>
                    <span className="text-slate-400">Motor penggerak dengan 2 remote kontrol + rantai manual chain block saat listrik mati.</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/60 cursor-pointer hover:border-slate-600 transition-colors">
                  <input
                    type="checkbox"
                    checked={includePowderCoat}
                    onChange={(e) => setIncludePowderCoat(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 focus:ring-offset-slate-900"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-white block">Cat Oven Powder Coating (+ Rp 50.000/m²)</span>
                    <span className="text-slate-400">Pilihan warna custom tahan gores & tidak mudah terkelupas oleh cuaca.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* User Location */}
            <div>
              <label htmlFor={locationInputId} className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                Rencana Lokasi Pemasangan (Opsional)
              </label>
              <input
                id={locationInputId}
                type="text"
                placeholder="Misal: Bandar, Subah, Kota Pekalongan, Kendal..."
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
              />
            </div>
          </div>

          {/* Result Summary & CTA Column */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 border border-amber-500/40 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                Estimasi Awal
              </div>

              <h3 className="text-base font-bold text-slate-200 mb-6 flex items-center gap-2">
                Ringkasan Perhitungan
              </h3>

              {/* Area metric */}
              <div className="space-y-3 pb-6 border-b border-slate-700/80 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span>Ukuran Dimensi:</span>
                  <span className="font-mono font-bold text-white">{width}m × {height}m</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Luas Aktual:</span>
                  <span className="font-mono text-white">{rawArea.toFixed(2)} m²</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Luas Terhitung (Vol):</span>
                  <span className="font-mono font-bold text-amber-400">
                    {effectiveArea.toFixed(2)} m² {isMinimumApplied && '(min. 6 m²)'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span>Harga Bahan per m²:</span>
                  <span className="font-mono text-white">
                    {selectedProduct ? formatCurrency(selectedProduct.pricePerUnit) : '-'}
                  </span>
                </div>

                {includeMotor && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>+ Mesin Motorized:</span>
                    <span className="font-mono">{formatCurrency(motorCost)}</span>
                  </div>
                )}
                {includePowderCoat && (
                  <div className="flex justify-between items-center text-amber-300">
                    <span>+ Powder Coating:</span>
                    <span className="font-mono">{formatCurrency(powderCoatCost)}</span>
                  </div>
                )}
              </div>

              {/* Total Price Display */}
              <div className="pt-6 mb-6">
                <span className="text-xs text-slate-400 block mb-1">Perkiraan Total Biaya:</span>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                  {formatCurrency(totalCost)}
                </div>
                <span className="text-[11px] text-emerald-400 block mt-1.5">
                  ✓ Sudah termasuk rel samping, pipa as, pegas & garansi
                </span>
                {isMinimumApplied && (
                  <p className="text-[10px] text-slate-400 mt-2 bg-slate-900/60 p-2 rounded">
                    * Catatan: Standar bengkel industri rolling door memberlakukan batas minimum perhitungan 6 m² untuk pintu berukuran kecil.
                  </p>
                )}
              </div>

              {/* High-conversion CTA to WhatsApp */}
              <button
                onClick={handleSendToWhatsApp}
                className="w-full py-4 px-5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-950/50 hover:shadow-emerald-600/30 transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Kirim Rincian ke WhatsApp Kami</span>
              </button>

              <p className="text-[11px] text-slate-400 text-center mt-3">
                Kirim detail ukuran ini ke WA teknisi AR Teknik untuk survei lokasi gratis dan negosiasi harga terbaik.
              </p>
            </div>

            {/* Quick Guarantees Box */}
            <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <strong>Tanpa Risiko:</strong> Survei lokasi tidak dipungut biaya apapun di wilayah Kab. Batang & Pekalongan.
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
