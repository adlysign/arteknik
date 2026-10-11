# Panduan Deploy Website AR Teknik Rolling Door ke Cloudflare Pages via GitHub

Website ini dirancang secara optimal sebagai aplikasi web statis modern (Vite + React + Tailwind CSS) yang siap dipasang secara **100% GRATIS dan Berkecepatan Tinggi** di **Cloudflare Pages**.

---

## 🚀 Langkah 1: Simpan & Push ke Repositori GitHub

1. Buka terminal komputer Anda pada folder proyek ini.
2. Inisialisasi dan kirim kode ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Website AR Teknik Rolling Door"
   git branch -M main
   git remote add origin https://github.com/USERNAME-ANDA/ar-teknik-rollingdoor.git
   git push -u origin main
   ```

*(Pastikan ganti `USERNAME-ANDA` dengan nama akun GitHub Anda)*

---

## ⚡ Langkah 2: Hubungkan Repositori ke Cloudflare Pages

1. Masuk ke dashboard Cloudflare: [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. Di menu sebelah kiri, klik **Workers & Pages**.
3. Klik tombol **Create application** > Pilih tab **Pages**.
4. Klik tombol **Connect to Git**.
5. Pilih akun GitHub Anda dan pilih repositori `ar-teknik-rollingdoor`.
6. Klik **Begin setup**.

---

## 🛠️ Langkah 3: Pengaturan Build (Build Settings - PENTING AGAR TIDAK GAGAL)

Pada halaman konfigurasi deployment Cloudflare, pastikan nilai berikut diisi dengan tepat:

| Parameter Pengaturan | Nilai yang Wajib Diisi | Catatan Penting |
|---|---|---|
| **Framework preset** | `Vite` | Pilih Vite dari dropdown |
| **Build command** | `npm run build` | Jangan diubah |
| **Build output directory** | `dist` | **Wajib `dist`** (Bukan `build` atau `public`) |
| **Root directory** | `/` (Kosongkan) | Biarkan kosong jika file berada di root repo |

### ⚠️ Wajib Tambahkan Environment Variable:
Cloudflare Pages secara default menggunakan Node.js versi lama (Node 12/16/18) jika tidak diatur, yang akan menyebabkan build gagal karena Vite & Tailwind v4 membutuhkan Node 20+.

Buka bagian **Environment variables (advanced)** > Tambahkan:
* **Variable name**: `NODE_VERSION`
* **Value**: `20`

*(File `.nvmrc` dan `.node-version` sudah kami buatkan otomatis di repositori ini untuk mengunci versi ke Node.js 20)*

7. Klik tombol **Save and Deploy**.
8. Tunggu proses build sekitar 30 - 60 detik hingga status menjadi centang hijau **Success**.

---

## 🔍 Solusi Jika Build di Cloudflare Masih Gagal (Troubleshooting):

1. **Error: "vite requires Node.js version >= 18" atau error syntax**:
   * **Penyebab**: Versi Node.js di Cloudflare masih default (lama).
   * **Solusi**: Masuk ke project Cloudflare Pages Anda > **Settings** > **Environment Variables** > Tambahkan `NODE_VERSION` = `20`. Lalu klik **Retry deployment**.

2. **Error: "Output directory 'build' not found"**:
   * **Penyebab**: Build output directory salah diisi `build`.
   * **Solusi**: Ubah ke **`dist`** di menu **Settings** > **Builds & deployments** > **Build output directory**.

3. **Error: "__dirname is not defined in ES module scope"**:
   * **Sudah kami perbaiki**: File `vite.config.ts` sudah kami perbarui menggunakan standar ESM `node:url` sehingga tidak akan error lagi.

---

## 🌐 Langkah 4: Menghubungkan Domain Custom (Opsional)
Jika Anda memiliki domain sendiri seperti `arteknikrollingdoor.id`:
1. Masuk ke halaman proyek Anda di Cloudflare Pages.
2. Klik tab **Custom Domains**.
3. Klik **Set up a custom domain**.
4. Masukkan nama domain Anda (misal `arteknikrollingdoor.id`).
5. Cloudflare akan otomatis mengaktifkan SSL HTTPS gratis dan CDN global.

---

## 📂 Mengelola Konten & Database (CMS)
- Masuk ke panel admin dengan menekan tombol **"Admin CMS"** di pojok kanan atas website atau di footer.
- Masukkan PIN: **`729467`**.
- Anda dapat menambah/edit/hapus foto portofolio, merubah harga per meter, mengunggah foto lokal, serta mengunduh atau menyalin kode `defaultData.ts` untuk di-sync ke GitHub.
