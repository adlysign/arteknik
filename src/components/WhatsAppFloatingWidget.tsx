import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, CheckCheck, Clock, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, getQuickConsultationMessage, getSurveyRequestMessage, getEmergencyServiceMessage } from '../utils/whatsapp';

interface WhatsAppFloatingWidgetProps {
  whatsappNumber: string;
  phoneNumber: string;
}

export const WhatsAppFloatingWidget: React.FC<WhatsAppFloatingWidgetProps> = ({
  whatsappNumber,
  phoneNumber,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickPrompts = [
    {
      title: 'Jadwalkan Survei Gratis',
      desc: 'Teknisi datang ke lokasi Anda di Batang/Pekalongan',
      text: getSurveyRequestMessage('', 'Batang / Pekalongan / Sekitarnya', 'Rolling Door / Folding Gate'),
    },
    {
      title: 'Tanya Harga & Estimasi',
      desc: 'Konsultasi ukuran & pilihan bahan',
      text: getQuickConsultationMessage('Rolling Door & Folding Gate'),
    },
    {
      title: 'Panggilan Servis Darurat',
      desc: 'Pintu macet / per putus / roda anjlok',
      text: getEmergencyServiceMessage(),
    },
  ];

  const handleSendPrompt = (text: string) => {
    const url = buildWhatsAppUrl(text, whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) return;
    const url = buildWhatsAppUrl(customMsg, whatsappNumber);
    window.open(url, '_blank', 'noopener,noreferrer');
    setCustomMsg('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center font-black text-sm shadow">
                  AR
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-300 border-2 border-emerald-600 rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm leading-tight">AR Teknik Rolling Door</h4>
                <div className="flex items-center gap-1 text-[11px] text-emerald-100">
                  <Clock className="w-3 h-3" />
                  <span>Online • Balas &lt; 10 Menit</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-emerald-700 text-emerald-100 hover:text-white transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Bubble Body */}
          <div className="p-4 bg-slate-50 space-y-3 max-h-80 overflow-y-auto">
            {/* Greeting */}
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-200/80 shadow-sm text-xs text-slate-800 space-y-1">
              <p className="font-medium">
                Halo! Selamat datang di <strong>AR Teknik Rolling Door</strong>.
              </p>
              <p className="text-slate-600">
                Ada yang bisa kami bantu? Pilih kebutuhan Anda atau tulis pesan langsung di bawah:
              </p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 pt-1">
                <span>08.00</span>
                <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
              </div>
            </div>

            {/* Quick Prompts Options */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                Pilih Topik Konsultasi Cepat:
              </span>
              {quickPrompts.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(q.text)}
                  className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-400 text-xs text-slate-800 transition-all flex flex-col shadow-xs"
                >
                  <span className="font-bold text-emerald-800">{q.title}</span>
                  <span className="text-[11px] text-slate-500">{q.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              placeholder="Tulis pesan Anda..."
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
              title="Kirim ke WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Call fallback */}
          <div className="bg-slate-100 py-1.5 px-3 text-center text-[11px] text-slate-500 border-t border-slate-200">
            Atau telepon langsung:{' '}
            <a href={`tel:${phoneNumber}`} className="font-bold text-slate-800 hover:underline">
              {phoneNumber}
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
        aria-label="Konsultasi WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-emerald-600 rounded-full animate-ping"></span>
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-wide hidden sm:inline">
          Konsultasi WhatsApp
        </span>
        <span className="text-xs font-bold tracking-wide sm:hidden">
          Chat WA
        </span>
      </button>
    </div>
  );
};
