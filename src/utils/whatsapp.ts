export const DEFAULT_WA_NUMBER = '6285647985924';

export const buildWhatsAppUrl = (message: string, phoneNumber = DEFAULT_WA_NUMBER): string => {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
};

export const getQuickConsultationMessage = (topic = 'Umum'): string => {
  return `Halo AR Teknik Rolling Door, saya ingin konsultasi mengenai pembuatan/servis ${topic} untuk lokasi saya. Apakah ada jadwal survei gratis? Terima kasih.`;
};

export const getSurveyRequestMessage = (name = '', location = '', product = ''): string => {
  return `Halo AR Teknik, saya ingin mengajukan JADWAL SURVEY GRATIS ke lokasi:
- Nama: ${name || '[Nama Anda]'}
- Alamat/Lokasi: ${location || '[Lokasi Anda di Batang/Pekalongan/Jateng]'}
- Rencana Pemasangan: ${product || 'Rolling Door / Folding Gate / Kaca'}

Mohon konfirmasi waktu teknisi bisa datang ke lokasi. Terima kasih!`;
};

export const getCalculatorEstimateMessage = (details: {
  productName: string;
  category: string;
  width: number;
  height: number;
  area: number;
  totalEstimate: number;
  optionsText?: string;
  location?: string;
}): string => {
  const formattedTotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(details.totalEstimate);

  return `Halo AR Teknik Rolling Door, saya telah menghitung estimasi biaya melalui website:
------------------------------------------
📦 Produk: ${details.productName}
📐 Ukuran: ${details.width}m (Lebar) x ${details.height}m (Tinggi) = ${details.area.toFixed(2)} m²
💰 Estimasi Biaya: ± ${formattedTotal}
${details.optionsText ? `⚙️ Catatan: ${details.optionsText}\n` : ''}${details.location ? `📍 Lokasi Pemasangan: ${details.location}\n` : ''}------------------------------------------
Mohon informasi ketersediaan jadwal survei ke lokasi dan detail spesifikasinya. Terima kasih!`;
};

export const getProjectInquiryMessage = (projectTitle: string, location: string): string => {
  return `Halo AR Teknik, saya tertarik dengan pengerjaan proyek di portofolio website:
"${projectTitle}" (Lokasi: ${location}).

Apakah saya bisa pesan spesifikasi dan model seperti ini? Mohon estimasi harganya. Terima kasih.`;
};

export const getEmergencyServiceMessage = (): string => {
  return `Halo AR Teknik, saya membutuhkan BANTUAN SERVIS CEPAT / PERBAIKAN:
- Keluhan: Rolling Door / Folding Gate bermasalah (macet / per putus / anjlok)
- Lokasi: [Mohon sebutkan alamat]

Mohon bantuan teknisi secepatnya. Terima kasih!`;
};
