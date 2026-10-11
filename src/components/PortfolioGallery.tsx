import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { MapPin, Calendar, Maximize2, MessageCircle, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { buildWhatsAppUrl, getProjectInquiryMessage } from '../utils/whatsapp';

interface PortfolioGalleryProps {
  projects: ProjectItem[];
  whatsappNumber: string;
}

export const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ projects, whatsappNumber }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filters = [
    { id: 'all', label: 'Semua Proyek' },
    { id: 'rolling-door', label: 'Rolling Door' },
    { id: 'folding-gate', label: 'Folding Gate' },
    { id: 'kaca-aluminium', label: 'Kaca & Aluminium' },
    { id: 'servis', label: 'Servis / Renovasi' },
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="galeri" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-amber-600 font-bold text-xs sm:text-sm uppercase tracking-wider">
            Galeri Portofolio Nyata
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 mt-2">
            Dokumentasi Pemasangan AR Teknik
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Bukti pengerjaan rapi dan kokoh di berbagai ruko, pasar, pabrik industri, perumahan, dan cafe di wilayah Batang, Pekalongan, hingga Jawa Tengah.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                selectedFilter === f.id
                  ? 'bg-slate-900 text-amber-400 shadow-md scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image with zoom overlay */}
              <div
                className="relative h-52 bg-slate-900 overflow-hidden cursor-pointer"
                onClick={() => setActiveModalProject(item)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/90 backdrop-blur text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Perbesar Foto
                  </span>
                </div>

                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur text-amber-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                  {item.category.replace('-', ' ')}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-600" />
                      {item.location}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {item.year}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                    {item.title}
                  </h3>

                  {item.dimensions && (
                    <p className="text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded inline-block font-mono mb-2">
                      📐 {item.dimensions}
                    </p>
                  )}

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setActiveModalProject(item)}
                    className="text-xs font-semibold text-slate-700 hover:text-slate-900 flex items-center gap-1"
                  >
                    <span>Detail Spesifikasi</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <a
                    href={buildWhatsAppUrl(getProjectInquiryMessage(item.title, item.location), whatsappNumber)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center gap-1 transition-colors"
                    title="Pesan Model Ini via WhatsApp"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-emerald-700" />
                    <span>Pesan Model Ini</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative h-72 sm:h-96 bg-slate-950">
              <img
                src={activeModalProject.imageUrl}
                alt={activeModalProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur text-amber-400 text-xs font-bold px-3 py-1 rounded">
                Kategori: {activeModalProject.category.toUpperCase().replace('-', ' ')}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8">
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mb-3">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  {activeModalProject.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  Tahun {activeModalProject.year}
                </span>
                {activeModalProject.dimensions && (
                  <>
                    <span>•</span>
                    <span className="font-mono bg-slate-100 text-slate-800 px-2 py-0.5 rounded">
                      Dimensi: {activeModalProject.dimensions}
                    </span>
                  </>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
                {activeModalProject.title}
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed mb-6">
                {activeModalProject.description}
              </p>

              {/* Guarantees Box */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900">
                  <strong>Pemasangan Standar AR Teknik:</strong> Menggunakan rel presisi, per pegas baja teruji, roda bearing ganda, dan diselesaikan oleh teknisi berpengalaman langsung dari bengkel Ds. Tumbrep Bandar.
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={buildWhatsAppUrl(
                    getProjectInquiryMessage(activeModalProject.title, activeModalProject.location),
                    whatsappNumber
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Pesan Model Seperti Ini via WhatsApp</span>
                </a>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
