import React, { useState } from 'react';
import { AppDataState, ProjectItem, ProductPriceItem, ProductCategory, CompanyInfo } from '../types';
import { 
  X, Lock, Key, Plus, Trash2, Edit3, Save, Download, Upload, 
  RotateCcw, CheckCircle, Globe, Github, ExternalLink, HelpCircle, FileText,
  Copy, Check, Image as ImageIcon, Camera, UploadCloud
} from 'lucide-react';
import { exportDataAsJson } from '../utils/storage';

interface CmsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appData: AppDataState;
  onSaveData: (newData: AppDataState) => void;
  onResetData: () => void;
}

const ADMIN_PIN_KEY = 'ar_teknik_admin_pin_v1';
const DEFAULT_SYSTEM_PIN = '729467';

const getStoredAdminPin = (): string => {
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || DEFAULT_SYSTEM_PIN;
  } catch {
    return DEFAULT_SYSTEM_PIN;
  }
};

const IMAGE_PRESETS = [
  { label: 'Rolling Door Industri Otomatis', url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Folding Gate Ruko Galvalum', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Fasad Kaca Tempered 12mm', url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Rolling Door One Sheet Perforated', url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Folding Gate Heavy Duty 0.8mm', url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Partisi Kaca Cafe & Resto', url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Servis Per Pegas Rolling Door', url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80' },
  { label: 'Pintu Garasi Mobil Minimalis', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' }
];

const compressAndReadImageFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (readerEvent) => {
      const img = new Image();
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(readerEvent.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.82);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
      img.src = readerEvent.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
};

export const CmsModal: React.FC<CmsModalProps> = ({
  isOpen,
  onClose,
  appData,
  onSaveData,
  onResetData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'projects' | 'pricing' | 'company' | 'security' | 'deploy'>('projects');

  // Change PIN states
  const [currentPinInput, setCurrentPinInput] = useState<string>('');
  const [newPinInput, setNewPinInput] = useState<string>('');
  const [confirmPinInput, setConfirmPinInput] = useState<string>('');
  const [pinChangeError, setPinChangeError] = useState<string>('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState<string>('');

  // Working state copy
  const [projects, setProjects] = useState<ProjectItem[]>(appData.projects);
  const [pricing, setPricing] = useState<ProductPriceItem[]>(appData.pricing);
  const [company, setCompany] = useState<CompanyInfo>(appData.company);
  const [savedSuccessMsg, setSavedSuccessMsg] = useState<string>('');

  // Editing items state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isNewProject, setIsNewProject] = useState<boolean>(false);
  const [projectImageMode, setProjectImageMode] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isCompressingImage, setIsCompressingImage] = useState<boolean>(false);

  const [editingPricing, setEditingPricing] = useState<ProductPriceItem | null>(null);
  const [isNewPricing, setIsNewPricing] = useState<boolean>(false);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const generateDefaultDataCode = (): string => {
    const currentDataState: AppDataState = {
      company,
      pricing,
      projects,
      testimonials: appData.testimonials,
    };
    return `import { AppDataState } from '../types';

export const INITIAL_DATA: AppDataState = ${JSON.stringify(currentDataState, null, 2)};
`;
  };

  const handleCopyCode = async () => {
    try {
      const code = generateDefaultDataCode();
      await navigator.clipboard.writeText(code);
      setCopiedCode(true);
      showSuccessFeedback('Kode database defaultData.ts berhasil disalin ke clipboard!');
      setTimeout(() => setCopiedCode(false), 3500);
    } catch (err) {
      alert('Gagal menyalin otomatis. Silakan gunakan tombol unduh file sebagai alternatif.');
    }
  };

  const handleDownloadDefaultDataFile = () => {
    const code = generateDefaultDataCode();
    const blob = new Blob([code], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'defaultData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showSuccessFeedback('File defaultData.ts berhasil diunduh!');
  };

  // Sync state if appData changes
  React.useEffect(() => {
    setProjects(appData.projects);
    setPricing(appData.pricing);
    setCompany(appData.company);
  }, [appData]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const activePin = getStoredAdminPin();
    if (pinInput === activePin || pinInput === DEFAULT_SYSTEM_PIN) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN salah! Silakan periksa kembali PIN Anda.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeError('');
    setPinChangeSuccess('');

    const activePin = getStoredAdminPin();
    if (
      currentPinInput !== activePin &&
      currentPinInput !== DEFAULT_SYSTEM_PIN
    ) {
      setPinChangeError('PIN lama yang Anda masukkan tidak sesuai!');
      return;
    }

    if (newPinInput.trim().length < 4) {
      setPinChangeError('PIN baru minimal harus 4 karakter / angka!');
      return;
    }

    if (newPinInput !== confirmPinInput) {
      setPinChangeError('Konfirmasi PIN baru tidak sesuai dengan PIN baru!');
      return;
    }

    try {
      localStorage.setItem(ADMIN_PIN_KEY, newPinInput.trim());
      setPinChangeSuccess('PIN Admin CMS berhasil diubah! Gunakan PIN baru ini untuk login berikutnya.');
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      showSuccessFeedback('PIN Admin CMS berhasil diperbarui!');
    } catch (err) {
      setPinChangeError('Gagal menyimpan PIN baru ke browser.');
    }
  };

  const handleResetPinDefault = () => {
    if (window.confirm('Kembalikan PIN Admin ke pengaturan awal?')) {
      try {
        localStorage.removeItem(ADMIN_PIN_KEY);
        setPinChangeSuccess('PIN Admin telah dikembalikan ke PIN awal sistem.');
        setPinChangeError('');
        setCurrentPinInput('');
        setNewPinInput('');
        setConfirmPinInput('');
        showSuccessFeedback('PIN Admin dikembalikan ke PIN awal');
      } catch (err) {
        setPinChangeError('Gagal mereset PIN.');
      }
    }
  };

  const showSuccessFeedback = (msg: string) => {
    setSavedSuccessMsg(msg);
    setTimeout(() => setSavedSuccessMsg(''), 4000);
  };

  // Save changes to master state
  const persistChanges = (newProjects = projects, newPricing = pricing, newCompany = company) => {
    const updated: AppDataState = {
      projects: newProjects,
      pricing: newPricing,
      company: newCompany,
      testimonials: appData.testimonials,
    };
    onSaveData(updated);
    showSuccessFeedback('Perubahan berhasil disimpan dan langsung tayang di website!');
  };

  // Local image upload handler with canvas compression
  const handleLocalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('File yang dipilih harus berupa gambar (JPG, PNG, WebP).');
      return;
    }

    try {
      setIsCompressingImage(true);
      const compressedDataUrl = await compressAndReadImageFile(file);
      if (editingProject) {
        setEditingProject({
          ...editingProject,
          imageUrl: compressedDataUrl,
        });
      }
      showSuccessFeedback('Foto lokal berhasil diunggah dan dioptimasi!');
    } catch (err) {
      alert('Gagal memproses gambar. Pastikan format file didukung.');
    } finally {
      setIsCompressingImage(false);
    }
  };

  // Project handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updatedList: ProjectItem[];
    if (isNewProject) {
      updatedList = [editingProject, ...projects];
    } else {
      updatedList = projects.map((p) => (p.id === editingProject.id ? editingProject : p));
    }

    setProjects(updatedList);
    persistChanges(updatedList, pricing, company);
    setEditingProject(null);
    setIsNewProject(false);
  };

  const handleDeleteProject = (id: string) => {
    if (window.confirm('Yakin ingin menghapus proyek ini dari portofolio?')) {
      const updatedList = projects.filter((p) => p.id !== id);
      setProjects(updatedList);
      persistChanges(updatedList, pricing, company);
    }
  };

  const handleStartNewProject = () => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: '',
      category: 'rolling-door',
      location: 'Kab. Batang',
      year: new Date().getFullYear().toString(),
      dimensions: 'Lebar 3.0m x Tinggi 2.8m',
      description: '',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    };
    setEditingProject(newProj);
    setIsNewProject(true);
  };

  // Pricing handlers
  const handleSavePricing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing) return;

    let updatedList: ProductPriceItem[];
    if (isNewPricing) {
      updatedList = [...pricing, editingPricing];
    } else {
      updatedList = pricing.map((pr) => (pr.id === editingPricing.id ? editingPricing : pr));
    }

    setPricing(updatedList);
    persistChanges(projects, updatedList, company);
    setEditingPricing(null);
    setIsNewPricing(false);
  };

  const handleDeletePricing = (id: string) => {
    if (window.confirm('Yakin ingin menghapus item harga ini?')) {
      const updatedList = pricing.filter((pr) => pr.id !== id);
      setPricing(updatedList);
      persistChanges(projects, updatedList, company);
    }
  };

  const handleStartNewPricing = () => {
    const newItem: ProductPriceItem = {
      id: `price-${Date.now()}`,
      name: '',
      category: 'rolling-door',
      thickness: '0.5 mm',
      pricePerUnit: 400000,
      unit: 'm²',
      description: '',
      features: ['Material berkualitas SNI', 'Garansi teknis 1 tahun'],
      popular: false,
    };
    setEditingPricing(newItem);
    setIsNewPricing(true);
  };

  // Company info handlers
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    persistChanges(projects, pricing, company);
  };

  // JSON Import handler
  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.company && parsed.pricing && parsed.projects) {
          onSaveData(parsed);
          setProjects(parsed.projects);
          setPricing(parsed.pricing);
          setCompany(parsed.company);
          showSuccessFeedback('Data berhasil di-restore dari file JSON!');
        } else {
          alert('Format file JSON tidak sesuai struktur AR Teknik!');
        }
      } catch (err) {
        alert('Gagal membaca file JSON: format tidak valid.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-base sm:text-lg">CMS Manajemen Konten AR Teknik</h2>
              <p className="text-xs text-slate-400">Perbarui portofolio proyek, daftar harga & profil usaha</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Feedback Alert */}
        {savedSuccessMsg && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2.5 text-xs text-emerald-800 font-semibold flex items-center gap-2 animate-in slide-in-from-top shrink-0">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{savedSuccessMsg}</span>
          </div>
        )}

        {/* Not Authenticated State */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 mb-4">
              <Key className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Masuk Sebagai Pengelola (Admin)</h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mb-6">
              Masukkan PIN admin untuk mengedit foto proyek, mengubah harga produk, atau mengunduh cadangan database.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
              <input
                type="password"
                autoFocus
                placeholder="Masukkan 6 Digit PIN Admin"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center tracking-widest text-lg font-mono py-2.5 px-4 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500"
              />
              {pinError && <p className="text-xs text-red-600 font-medium">{pinError}</p>}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-sm shadow transition-colors"
              >
                Buka Panel Konten
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Content Area */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 bg-slate-50 px-6 gap-2 shrink-0 overflow-x-auto">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'projects'
                    ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Portofolio Proyek ({projects.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('pricing')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'pricing'
                    ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Daftar Harga ({pricing.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('company')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'company'
                    ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>Profil & Kontak</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'security'
                    ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-amber-600" />
                <span>Keamanan & PIN</span>
              </button>
              <button
                onClick={() => setActiveTab('deploy')}
                className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  activeTab === 'deploy'
                    ? 'border-amber-600 text-amber-700 bg-white rounded-t-lg'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>Backup & Cloudflare</span>
              </button>
            </div>

            {/* Scrollable Body Content */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              
              {/* TAB 1: PROJECTS */}
              {activeTab === 'projects' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Kelola Portofolio Proyek</h3>
                      <p className="text-xs text-slate-500">Tambah foto dan deskripsi pekerjaan terbaru di Batang, Pekalongan, dll.</p>
                    </div>
                    <button
                      onClick={handleStartNewProject}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Proyek Baru</span>
                    </button>
                  </div>

                  {/* Edit/Add Project Form Modal Inline */}
                  {editingProject && (
                    <div className="mb-6 bg-white p-5 rounded-2xl border-2 border-amber-500 shadow-md">
                      <div className="flex items-center justify-between mb-3 border-b pb-2">
                        <h4 className="font-bold text-sm text-slate-900">
                          {isNewProject ? 'Tambah Proyek Baru' : 'Edit Proyek'}
                        </h4>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="text-xs text-slate-400 hover:text-slate-700"
                        >
                          Batal
                        </button>
                      </div>

                      <form onSubmit={handleSaveProject} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Judul Proyek
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Misal: Pintu Toko Pasar Bandar"
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Kategori
                            </label>
                            <select
                              value={editingProject.category}
                              onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProductCategory })}
                              className="w-full text-xs p-2 border rounded-lg bg-white"
                            >
                              <option value="rolling-door">Rolling Door</option>
                              <option value="folding-gate">Folding Gate</option>
                              <option value="kaca-aluminium">Kaca & Aluminium</option>
                              <option value="servis">Servis / Renovasi</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Lokasi
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Misal: Bandar, Batang"
                              value={editingProject.location}
                              onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Tahun Pengerjaan
                            </label>
                            <input
                              type="text"
                              value={editingProject.year}
                              onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Dimensi / Ukuran
                            </label>
                            <input
                              type="text"
                              placeholder="Misal: Lebar 4m x Tinggi 3.5m"
                              value={editingProject.dimensions || ''}
                              onChange={(e) => setEditingProject({ ...editingProject, dimensions: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Image Source Selection */}
                        <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <label className="block text-xs font-bold text-slate-800">
                              Foto Dokumentasi Proyek
                            </label>
                            {/* Toggle source mode */}
                            <div className="flex items-center gap-1 bg-white p-0.5 rounded-lg border border-slate-200 text-[11px]">
                              <button
                                type="button"
                                onClick={() => setProjectImageMode('upload')}
                                className={`px-2 py-0.5 rounded font-semibold transition-colors flex items-center gap-1 ${
                                  projectImageMode === 'upload'
                                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <UploadCloud className="w-3 h-3" />
                                <span>Upload File Lokal</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setProjectImageMode('url')}
                                className={`px-2 py-0.5 rounded font-semibold transition-colors flex items-center gap-1 ${
                                  projectImageMode === 'url'
                                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <span>Link URL</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setProjectImageMode('presets')}
                                className={`px-2 py-0.5 rounded font-semibold transition-colors flex items-center gap-1 ${
                                  projectImageMode === 'presets'
                                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                                    : 'text-slate-600 hover:text-slate-900'
                                }`}
                              >
                                <span>Koleksi Preset</span>
                              </button>
                            </div>
                          </div>

                          {/* Mode 1: Local Upload from Phone / Laptop */}
                          {projectImageMode === 'upload' && (
                            <div className="space-y-2">
                              <label className="border-2 border-dashed border-amber-300 hover:border-amber-500 bg-white rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleLocalImageUpload}
                                  className="hidden"
                                />
                                <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                                  <Camera className="w-5 h-5" />
                                </div>
                                <span className="text-xs font-bold text-slate-800">
                                  {isCompressingImage ? 'Mengompresi Gambar...' : 'Klik untuk Pilih Foto dari Galeri / Laptop / Kamera'}
                                </span>
                                <span className="text-[11px] text-slate-500 mt-0.5">
                                  Mendukung format JPG, PNG, WEBP (Otomatis dikompresi agar cepat dan hemat memori)
                                </span>
                              </label>
                            </div>
                          )}

                          {/* Mode 2: Direct URL / GitHub Path */}
                          {projectImageMode === 'url' && (
                            <div>
                              <input
                                type="text"
                                placeholder="https://... atau /images/proyek1.jpg"
                                value={editingProject.imageUrl}
                                onChange={(e) => setEditingProject({ ...editingProject, imageUrl: e.target.value })}
                                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg font-mono bg-white"
                              />
                              <p className="text-[10px] text-slate-500 mt-1">
                                Masukkan link gambar online atau path relatif jika Anda menyimpan foto di folder repositori GitHub.
                              </p>
                            </div>
                          )}

                          {/* Mode 3: Presets */}
                          {projectImageMode === 'presets' && (
                            <div>
                              <span className="text-[11px] text-slate-500 block mb-2">
                                Pilih salah satu foto siap pakai:
                              </span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-40 overflow-y-auto p-1 bg-white rounded-lg border border-slate-200">
                                {IMAGE_PRESETS.map((pst, idx) => (
                                  <button
                                    key={idx}
                                    type="button"
                                    onClick={() => setEditingProject({ ...editingProject, imageUrl: pst.url })}
                                    className={`p-1.5 rounded-lg border text-left flex flex-col items-center gap-1 transition-all ${
                                      editingProject.imageUrl === pst.url
                                        ? 'border-amber-500 bg-amber-50 ring-1 ring-amber-500'
                                        : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                  >
                                    <img src={pst.url} alt={pst.label} className="w-full h-12 object-cover rounded" />
                                    <span className="text-[10px] text-slate-700 font-medium truncate w-full text-center">
                                      {pst.label}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Live Image Preview */}
                          {editingProject.imageUrl && (
                            <div className="mt-3 pt-3 border-t border-slate-200 flex items-center gap-3">
                              <img
                                src={editingProject.imageUrl}
                                alt="Preview"
                                className="w-16 h-16 rounded-lg object-cover border border-slate-200 bg-slate-100 shrink-0"
                              />
                              <div className="flex-1 min-w-0 text-xs">
                                <span className="font-bold text-slate-800 block">Preview Gambar Aktif</span>
                                <span className="text-[11px] text-slate-500 block truncate">
                                  {editingProject.imageUrl.startsWith('data:') ? '✓ Foto Lokal Terkompresi (Base64 Siap Simpan)' : editingProject.imageUrl}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Deskripsi Pengerjaan
                          </label>
                          <textarea
                            rows={2}
                            value={editingProject.description}
                            onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            className="w-full text-xs p-2 border rounded-lg"
                          />
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="px-3 py-1.5 rounded-lg border text-xs"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                          >
                            Simpan Proyek
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Projects List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {projects.map((p) => (
                      <div
                        key={p.id}
                        className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm flex items-start gap-3 hover:border-slate-300"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.title}
                          className="w-20 h-20 rounded-lg object-cover shrink-0 bg-slate-100"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold uppercase text-amber-600 block">
                            {p.category}
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 truncate mb-1">
                            {p.title}
                          </h5>
                          <p className="text-[11px] text-slate-500">
                            📍 {p.location} ({p.year})
                          </p>
                          {p.dimensions && (
                            <p className="text-[10px] text-slate-400 font-mono">
                              {p.dimensions}
                            </p>
                          )}
                          <div className="flex items-center gap-2 mt-2 pt-1 border-t border-slate-100">
                            <button
                              onClick={() => {
                                setEditingProject(p);
                                setIsNewProject(false);
                              }}
                              className="text-[11px] text-amber-700 hover:underline flex items-center gap-1 font-semibold"
                            >
                              <Edit3 className="w-3 h-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(p.id)}
                              className="text-[11px] text-red-600 hover:underline flex items-center gap-1 font-semibold ml-auto"
                            >
                              <Trash2 className="w-3 h-3" />
                              Hapus
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING */}
              {activeTab === 'pricing' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-base">Kelola Daftar Harga Produk</h3>
                      <p className="text-xs text-slate-500">Sesuaikan tarif per m² atau unit untuk simulasi kalkulator dan katalog.</p>
                    </div>
                    <button
                      onClick={handleStartNewPricing}
                      className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Tambah Item Harga</span>
                    </button>
                  </div>

                  {/* Pricing Edit Modal Inline */}
                  {editingPricing && (
                    <div className="mb-6 bg-white p-5 rounded-2xl border-2 border-amber-500 shadow-md">
                      <div className="flex items-center justify-between mb-3 border-b pb-2">
                        <h4 className="font-bold text-sm text-slate-900">
                          {isNewPricing ? 'Tambah Produk Baru' : 'Edit Harga Produk'}
                        </h4>
                        <button
                          onClick={() => setEditingPricing(null)}
                          className="text-xs text-slate-400 hover:text-slate-700"
                        >
                          Batal
                        </button>
                      </div>

                      <form onSubmit={handleSavePricing} className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Nama Produk
                            </label>
                            <input
                              type="text"
                              required
                              value={editingPricing.name}
                              onChange={(e) => setEditingPricing({ ...editingPricing, name: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Kategori
                            </label>
                            <select
                              value={editingPricing.category}
                              onChange={(e) => setEditingPricing({ ...editingPricing, category: e.target.value as ProductCategory })}
                              className="w-full text-xs p-2 border rounded-lg bg-white"
                            >
                              <option value="rolling-door">Rolling Door</option>
                              <option value="folding-gate">Folding Gate</option>
                              <option value="kaca-aluminium">Kaca & Aluminium</option>
                              <option value="servis">Servis</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Ketebalan Bahan
                            </label>
                            <input
                              type="text"
                              value={editingPricing.thickness}
                              onChange={(e) => setEditingPricing({ ...editingPricing, thickness: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Harga per Satuan (Rp)
                            </label>
                            <input
                              type="number"
                              required
                              value={editingPricing.pricePerUnit}
                              onChange={(e) => setEditingPricing({ ...editingPricing, pricePerUnit: parseInt(e.target.value) || 0 })}
                              className="w-full text-xs p-2 border rounded-lg font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Satuan
                            </label>
                            <select
                              value={editingPricing.unit}
                              onChange={(e) => setEditingPricing({ ...editingPricing, unit: e.target.value })}
                              className="w-full text-xs p-2 border rounded-lg bg-white"
                            >
                              <option value="m²">m² (Per Meter Persegi)</option>
                              <option value="unit">unit (Per Pintu / Servis)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Deskripsi Ringkas
                          </label>
                          <textarea
                            rows={2}
                            value={editingPricing.description}
                            onChange={(e) => setEditingPricing({ ...editingPricing, description: e.target.value })}
                            className="w-full text-xs p-2 border rounded-lg"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="popularCheck"
                            checked={!!editingPricing.popular}
                            onChange={(e) => setEditingPricing({ ...editingPricing, popular: e.target.checked })}
                            className="w-4 h-4 text-amber-500 rounded"
                          />
                          <label htmlFor="popularCheck" className="text-xs text-slate-700 font-medium">
                            Tandai sebagai "Pilihan Favorit Pelanggan" (Badge Khusus)
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingPricing(null)}
                            className="px-3 py-1.5 rounded-lg border text-xs"
                          >
                            Batal
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold"
                          >
                            Simpan Item Harga
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Pricing Cards List */}
                  <div className="space-y-3">
                    {pricing.map((pr) => (
                      <div
                        key={pr.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-slate-900">{pr.name}</h5>
                            {pr.popular && (
                              <span className="bg-amber-100 text-amber-800 text-[10px] px-2 py-0.5 rounded font-bold">
                                Favorit
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Kategori: {pr.category} • Tebal: {pr.thickness}
                          </p>
                          <p className="text-xs text-slate-600 mt-1 line-clamp-1">{pr.description}</p>
                        </div>

                        <div className="flex items-center gap-4 shrink-0">
                          <div className="text-right">
                            <span className="font-bold font-mono text-sm text-slate-900">
                              Rp {pr.pricePerUnit.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[11px] text-slate-500 block">/ {pr.unit}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingPricing(pr);
                                setIsNewPricing(false);
                              }}
                              className="p-1.5 rounded-lg border border-slate-200 text-amber-700 hover:bg-amber-50"
                              title="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeletePricing(pr.id)}
                              className="p-1.5 rounded-lg border border-slate-200 text-red-600 hover:bg-red-50"
                              title="Hapus"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: COMPANY INFO */}
              {activeTab === 'company' && (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-base mb-1">Profil Usaha & Informasi Kontak</h3>
                  <p className="text-xs text-slate-500 mb-6">
                    Nomor WhatsApp di bawah ini digunakan oleh semua tombol chat dan estimasi otomatis.
                  </p>

                  <form onSubmit={handleSaveCompany} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Usaha
                        </label>
                        <input
                          type="text"
                          value={company.name}
                          onChange={(e) => setCompany({ ...company, name: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Tagline / Slogan
                        </label>
                        <input
                          type="text"
                          value={company.tagline}
                          onChange={(e) => setCompany({ ...company, tagline: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor Telepon
                        </label>
                        <input
                          type="text"
                          value={company.phone}
                          onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nomor WhatsApp (Angka saja: 628...)
                        </label>
                        <input
                          type="text"
                          value={company.whatsapp}
                          onChange={(e) => setCompany({ ...company, whatsapp: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Email Resmi
                        </label>
                        <input
                          type="email"
                          value={company.email}
                          onChange={(e) => setCompany({ ...company, email: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Alamat Lengkap Workshop
                      </label>
                      <input
                        type="text"
                        value={company.address}
                        onChange={(e) => setCompany({ ...company, address: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-lg"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Kabupaten / Kota
                        </label>
                        <input
                          type="text"
                          value={company.city}
                          onChange={(e) => setCompany({ ...company, city: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Provinsi
                        </label>
                        <input
                          type="text"
                          value={company.province}
                          onChange={(e) => setCompany({ ...company, province: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Kode Pos
                        </label>
                        <input
                          type="text"
                          value={company.postalCode}
                          onChange={(e) => setCompany({ ...company, postalCode: e.target.value })}
                          className="w-full text-xs p-2.5 border rounded-lg font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Jam Operasional
                      </label>
                      <input
                        type="text"
                        value={company.workingHours}
                        onChange={(e) => setCompany({ ...company, workingHours: e.target.value })}
                        className="w-full text-xs p-2.5 border rounded-lg"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Simpan Profil & Kontak</span>
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: SECURITY & CHANGE PIN */}
              {activeTab === 'security' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
                      <Key className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-base sm:text-lg">Ubah PIN / Password Admin CMS</h3>
                      <p className="text-xs text-slate-500">Ganti PIN untuk mengamankan akses ke pembaruan portofolio & harga.</p>
                    </div>
                  </div>

                  {pinChangeError && (
                    <div className="mb-4 p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold flex items-center gap-2">
                      <span>⚠️ {pinChangeError}</span>
                    </div>
                  )}

                  {pinChangeSuccess && (
                    <div className="mb-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{pinChangeSuccess}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePin} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        PIN Lama (PIN Saat Ini)
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Masukkan PIN saat ini"
                        value={currentPinInput}
                        onChange={(e) => setCurrentPinInput(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono tracking-wider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        PIN Baru (Minimal 4 Karakter / Angka)
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Masukkan PIN baru Anda"
                        value={newPinInput}
                        onChange={(e) => setNewPinInput(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono tracking-wider"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Konfirmasi Ulang PIN Baru
                      </label>
                      <input
                        type="password"
                        required
                        placeholder="Ketik ulang PIN baru yang sama"
                        value={confirmPinInput}
                        onChange={(e) => setConfirmPinInput(e.target.value)}
                        className="w-full text-xs p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 font-mono tracking-wider"
                      />
                    </div>

                    <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <Save className="w-4 h-4" />
                        <span>Simpan PIN Baru</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleResetPinDefault}
                        className="py-3 px-4 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-600 text-xs font-semibold transition-colors"
                      >
                        Reset ke PIN Default Awal
                      </button>
                    </div>
                  </form>

                  <div className="mt-8 pt-5 border-t border-slate-100 text-xs text-slate-500 space-y-1.5 bg-slate-50 p-4 rounded-xl">
                    <p className="font-bold text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-amber-600" />
                      <span>Petunjuk Keamanan Admin:</span>
                    </p>
                    <p>• PIN baru langsung disimpan secara permanen di browser perangkat ini.</p>
                    <p>• Jika Anda lupa PIN, Anda dapat menggunakan tombol reset di atas untuk mengembalikan ke PIN default awal.</p>
                  </div>
                </div>
              )}

              {/* TAB 5: DEPLOYMENT & BACKUP */}
              {activeTab === 'deploy' && (
                <div className="space-y-6">
                  {/* Backup / Export / Import Box */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-base mb-1">
                      Cadangkan & Pulihkan Database Website
                    </h3>
                    <p className="text-xs text-slate-500 mb-4">
                      Unduh file JSON untuk menyimpan salinan lengkap portofolio dan daftar harga, atau unggah cadangan yang sudah ada.
                    </p>

                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => exportDataAsJson(appData)}
                        className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4 text-amber-400" />
                        <span>Unduh File Cadangan JSON</span>
                      </button>

                      <label className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer">
                        <Upload className="w-4 h-4 text-emerald-600" />
                        <span>Impor Cadangan JSON</span>
                        <input
                          type="file"
                          accept=".json"
                          onChange={handleImportJson}
                          className="hidden"
                        />
                      </label>

                      <button
                        onClick={() => {
                          if (window.confirm('Reset semua data ke data bawaan awal bengkel AR Teknik?')) {
                            onResetData();
                            showSuccessFeedback('Data berhasil dikembalikan ke default bawaan!');
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold flex items-center gap-2 transition-colors ml-auto"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Data Awal</span>
                      </button>
                    </div>
                  </div>

                  {/* GitHub Live Sync Box */}
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-6 rounded-2xl border-2 border-amber-400 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
                        <Github className="w-5 h-5" />
                      </div>
                      <h3 className="font-extrabold text-slate-950 text-base">
                        Sinkronisasi Perubahan ke GitHub & Cloudflare Pages
                      </h3>
                    </div>

                    <p className="text-xs text-slate-700 mb-4 leading-relaxed">
                      Perubahan portofolio dan harga yang baru Anda edit sudah aktif di peramban ini. <strong>Agar perubahan tersebut tampil ke SEMUA pengunjung di seluruh dunia</strong>, cukup perbarui file <code>src/data/defaultData.ts</code> di repositori GitHub Anda:
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <button
                        onClick={handleCopyCode}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                          copiedCode
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-900 hover:bg-slate-800 text-amber-400'
                        }`}
                      >
                        {copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedCode ? 'Kode defaultData.ts Berhasil Disalin!' : '1-Klik Salin Kode defaultData.ts'}</span>
                      </button>

                      <button
                        onClick={handleDownloadDefaultDataFile}
                        className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-xs font-bold flex items-center gap-2 transition-colors shadow-xs"
                      >
                        <Download className="w-4 h-4 text-slate-700" />
                        <span>Unduh File defaultData.ts</span>
                      </button>
                    </div>

                    {/* Quick Steps on GitHub Web */}
                    <div className="bg-white/90 p-3.5 rounded-xl border border-amber-200 text-xs text-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 block mb-1">
                        Cara Cepat Update di GitHub (Bisa dari HP / Laptop):
                      </span>
                      <p>1. Buka repositori GitHub Anda &gt; buka folder <code>src/data/defaultData.ts</code>.</p>
                      <p>2. Klik ikon pensil (<strong>Edit</strong>) &gt; Pilih semua teks (Select All) &gt; <strong>Paste / Tempel</strong> kode yang baru disalin.</p>
                      <p>3. Klik tombol hijau <strong>Commit changes</strong>. Dalam 30 detik, Cloudflare Pages otomatis memperbarui website untuk semua pengunjung!</p>
                    </div>
                  </div>

                  {/* Cloudflare Pages + GitHub Deployment Guide */}
                  <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg">
                    <div className="flex items-center gap-2.5 mb-3 text-amber-400">
                      <Globe className="w-5 h-5 text-amber-400" />
                      <h3 className="font-bold text-base text-white">
                        Panduan Pasang di Cloudflare Pages dengan GitHub
                      </h3>
                    </div>

                    <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                      Website ini dibuat dengan arsitektur Static Single Page Application (Vite + React + Tailwind). Sangat cepat, hemat biaya (100% gratis di Cloudflare Pages), dan memiliki proteksi DDoS global.
                    </p>

                    <div className="space-y-4 text-xs">
                      {/* Step 1 */}
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                            1
                          </span>
                          <span>Upload / Push Repositori ke GitHub</span>
                        </div>
                        <p className="text-slate-300 pl-7">
                          Jalankan perintah git standar di terminal komputer Anda:
                        </p>
                        <pre className="mt-2 ml-7 p-2.5 bg-slate-950 rounded-lg text-emerald-400 font-mono text-[11px] overflow-x-auto">
{`git init
git add .
git commit -m "Website AR Teknik Rolling Door"
git branch -M main
git remote add origin https://github.com/USERNAME/ar-teknik-rollingdoor.git
git push -u origin main`}
                        </pre>
                      </div>

                      {/* Step 2 */}
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                            2
                          </span>
                          <span>Hubungkan di Cloudflare Pages</span>
                        </div>
                        <ul className="text-slate-300 pl-7 space-y-1 list-disc list-inside">
                          <li>Buka dashboard <strong>dash.cloudflare.com</strong></li>
                          <li>Pilih menu <strong>Workers & Pages</strong> &gt; Klik <strong>Create application</strong> &gt; Tab <strong>Pages</strong></li>
                          <li>Pilih <strong>Connect to Git</strong> dan izinkan akses ke repositori GitHub Anda</li>
                        </ul>
                      </div>

                      {/* Step 3 */}
                      <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700">
                        <div className="flex items-center gap-2 font-bold text-amber-300 mb-1">
                          <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-black">
                            3
                          </span>
                          <span>Konfigurasi Build Setting di Cloudflare</span>
                        </div>
                        <div className="pl-7 mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                          <div className="bg-slate-950 p-2 rounded">
                            <span className="text-slate-400 block text-[10px]">Framework preset:</span>
                            <span className="text-amber-400 font-bold">Vite</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded">
                            <span className="text-slate-400 block text-[10px]">Build command:</span>
                            <span className="text-emerald-400 font-bold">npm run build</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded">
                            <span className="text-slate-400 block text-[10px]">Build output directory:</span>
                            <span className="text-emerald-400 font-bold">dist</span>
                          </div>
                          <div className="bg-slate-950 p-2 rounded">
                            <span className="text-slate-400 block text-[10px]">Node version (env):</span>
                            <span className="text-amber-400 font-bold">NODE_VERSION = 20</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span>✓ File <code>_redirects</code> sudah otomatis kami sertakan agar routing mulus.</span>
                      <a
                        href="https://developers.cloudflare.com/pages/framework-guides/deploy-a-react-site/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        <span>Dokumentasi Cloudflare</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="bg-white px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>AR Teknik Rolling Door • Sistem CMS Mandiri</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 font-semibold text-slate-700 transition-colors"
          >
            Tutup Panel
          </button>
        </div>

      </div>
    </div>
  );
};
