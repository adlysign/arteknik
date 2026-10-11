import React from 'react';
import { Phone, MessageCircle, Calculator, Image } from 'lucide-react';
import { buildWhatsAppUrl, getQuickConsultationMessage } from '../utils/whatsapp';

interface MobileQuickBarProps {
  phone: string;
  whatsapp: string;
  onOpenCalculator: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  phone,
  whatsapp,
  onOpenCalculator,
}) => {
  const waUrl = buildWhatsAppUrl(getQuickConsultationMessage('Rolling Door & Folding Gate'), whatsapp);

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 shadow-2xl flex items-center justify-around gap-2">
      {/* Call Button */}
      <a
        href={`tel:${phone}`}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors"
      >
        <Phone className="w-4 h-4 text-slate-700 mb-0.5" />
        <span>Telepon</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-[1.5] flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-md shadow-emerald-600/30 transition-transform active:scale-95"
      >
        <MessageCircle className="w-4 h-4 fill-white" />
        <span>Chat WhatsApp</span>
      </a>

      {/* Calculator Button */}
      <button
        onClick={onOpenCalculator}
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-[11px] font-bold border border-amber-200 transition-colors"
      >
        <Calculator className="w-4 h-4 text-amber-700 mb-0.5" />
        <span>Hitung Biaya</span>
      </button>

      {/* Portfolio Gallery Link */}
      <a
        href="#galeri"
        className="flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold transition-colors"
      >
        <Image className="w-4 h-4 text-slate-700 mb-0.5" />
        <span>Portofolio</span>
      </a>
    </div>
  );
};
