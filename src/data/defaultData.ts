import { AppDataState } from '../types';

export const INITIAL_DATA: AppDataState = {
  company: {
    name: 'AR Teknik Rolling Door',
    tagline: 'Pabrikasi & Servis Rolling Door, Folding Gate & Kaca Tempered — Melayani Seluruh Nusantara',
    phone: '+6285647985924',
    whatsapp: '6285647985924',
    email: 'info@arteknikrollingdoor.id',
    address: 'Jl. Beringin RT/RW 04/06 Ds. Tumbrep Kec. Bandar',
    city: 'Kab. Batang',
    province: 'Jawa Tengah',
    postalCode: '51254',
    workingHours: 'Setiap Hari: 07.30 - 21.00 WIB (Konsultasi & Pengiriman Seluruh Indonesia)',
    serviceAreas: [
      'Seluruh Nusantara (Pengiriman Kargo & Pasang)',
      'Pulau Jawa & Jabodetabek',
      'Sumatera & Kepulauan (Medan, Palembang, Lampung, Riau)',
      'Kalimantan (IKN, Balikpapan, Samarinda, Pontianak)',
      'Sulawesi (Makassar, Manado, Palu, Kendari)',
      'Bali & Nusa Tenggara (Denpasar, Mataram, Kupang)',
      'Papua & Maluku',
      'Jawa Tengah (Workshop Utama Batang & Pekalongan)'
    ],
    googleMapsQuery: 'Jl. Beringin Tumbrep Bandar Batang Jawa Tengah 51254'
  },
  pricing: [
    {
      id: 'price-rd-1',
      name: 'Rolling Door Besi Slat 0.4mm',
      category: 'rolling-door',
      thickness: '0.4 mm',
      pricePerUnit: 350000,
      unit: 'm²',
      description: 'Pilihan hemat untuk toko, ruko, kios pasar, dan garasi rumah sederhana. Siap kirim siap pasang ke seluruh Nusantara.',
      features: [
        'Slat besi finishing cat primer anti-karat',
        'Rel samping kokoh & per pegas baja fleksibel',
        'Grendel slot dalam & kupingan gembok luar',
        'Packing aman untuk pengiriman kargo laut/darat',
        'Garansi instalasi & teknis 6 bulan'
      ],
      popular: false
    },
    {
      id: 'price-rd-2',
      name: 'Rolling Door Galvalum Anti Karat 0.45mm',
      category: 'rolling-door',
      thickness: '0.45 mm',
      pricePerUnit: 420000,
      unit: 'm²',
      description: 'Paling favorit se-Indonesia! Tahan karat, ringan saat dioperasikan, cocok untuk daerah pesisir, kepulauan & ruko modern.',
      features: [
        'Bahan galvalum zinc-aluminium tahan korosi cuaca tropis',
        'Tarikan enteng tanpa tenaga berlebih',
        'Per baja khusus Jepang tahan 10.000+ siklus',
        'Kunci silinder berkualitas + garansi 1 tahun',
        'Sistem knock-down presisi mudah dirakit di lokasi tujuan'
      ],
      popular: true
    },
    {
      id: 'price-rd-3',
      name: 'Rolling Door One Sheet (Perforated / Polos)',
      category: 'rolling-door',
      thickness: '0.55 mm',
      pricePerUnit: 650000,
      unit: 'm²',
      description: 'Tampilan modern rapi tanpa sambungan bilah, peredam suara karet nylon di rel. Cocok untuk mall & outlet modern.',
      features: [
        'Dilengkapi karet nilon di kanan & kiri (operasi senyap)',
        'Opsi lubang ventilasi (perforated) untuk sirkulasi & etalase malam',
        'Finishing powder coating oven anti gores & anti pudar',
        'Garansi teknis 1 tahun'
      ],
      popular: false
    },
    {
      id: 'price-rd-4',
      name: 'Rolling Door Industri Otomatis Motorized',
      category: 'rolling-door',
      thickness: '0.8 - 1.2 mm',
      pricePerUnit: 1250000,
      unit: 'm²',
      description: 'Khusus gudang logistik, pabrik industri, warehouse IKN & KIT Batang, pelabuhan, mall & garasi besar.',
      features: [
        'Motor penggerak Shinsei / Somfy dengan remote kontrol nirkabel',
        'Chain block manual darurat jika listrik padam',
        'Slat tebal tahan terpaan angin kencang (wind lock)',
        'Sensor keamanan anti-terjepit otomatis'
      ],
      popular: false
    },
    {
      id: 'price-fg-1',
      name: 'Folding Gate Standar 0.4 mm',
      category: 'folding-gate',
      thickness: '0.4 mm',
      pricePerUnit: 480000,
      unit: 'm²',
      description: 'Pintu lipat harmonika besi standar ekonomis untuk toko & garasi dengan sistem silangan ganda.',
      features: [
        'Plat daun 0.4mm dengan silangan strip 2.8mm solid',
        'Roda bearing presisi dan rel bawah UNP kokoh',
        'Kupingan gembok baja tebal tahan gergaji',
        'Pengecatan dasar tahan cuaca'
      ],
      popular: false
    },
    {
      id: 'price-fg-2',
      name: 'Folding Gate Super Galvalum 0.5 mm',
      category: 'folding-gate',
      thickness: '0.5 mm',
      pricePerUnit: 580000,
      unit: 'm²',
      description: 'Pilihan paling laris! Plat galvalum anti karat dengan silangan lebih rapat, kuat, dan awet di segala iklim pulau.',
      features: [
        'Plat galvalum 0.5mm anti korosi',
        'Rangka silangan baja 3.2mm rapat & kokoh anti congkel',
        'Roda bearing double heavy duty anti anjlok',
        'Garansi 1 tahun & bonus packing kayu pengiriman'
      ],
      popular: true
    },
    {
      id: 'price-fg-3',
      name: 'Folding Gate Extra Super 0.8 mm',
      category: 'folding-gate',
      thickness: '0.8 mm',
      pricePerUnit: 750000,
      unit: 'm²',
      description: 'Tingkat keamanan maksimal anti jebol untuk ruko perhiasan, konter gadget, & gudang aset vital di seluruh Nusantara.',
      features: [
        'Plat daun super tebal 0.8mm',
        'Jari-jari silangan ekstra kokoh tahan cungkil linggis',
        'Sistem bosh kuningan awet belasan tahun',
        'Finishing cat warna sesuai permintaan'
      ],
      popular: false
    },
    {
      id: 'price-kc-1',
      name: 'Partisi & Kusen Aluminium 3" / 4"',
      category: 'kaca-aluminium',
      thickness: 'Kaca 5-8 mm',
      pricePerUnit: 380000,
      unit: 'm²',
      description: 'Kusen aluminium Alexindo / Dacon / Inkalum untuk etalase ruko, perkantoran, dan fasad toko modern.',
      features: [
        'Pilihan warna: Hitam Matte, Putih, Cokelat Anodize, Silver',
        'Kaca polos / ryben / es 5mm atau 8mm',
        'Sealant kedap air & anti rembes',
        'Hasil potongan presisi 45 derajat rapi'
      ],
      popular: false
    },
    {
      id: 'price-kc-2',
      name: 'Pintu Kaca Tempered Frameless 10-12mm',
      category: 'kaca-aluminium',
      thickness: '10 mm / 12 mm',
      pricePerUnit: 1450000,
      unit: 'm²',
      description: 'Pintu kaca tanpa bingkai (frameless) mewah dengan standar SNI untuk pintu masuk toko, cafe, bank, dan kantor.',
      features: [
        'Kaca tempered bersertifikasi SNI (tahan benturan kuat)',
        'Engsel tanam lantai (Floor Hinge) Dekson / Dorma',
        'Handle pipa stainless steel 304 elegan 60-120cm',
        'Kunci patch lock bawah aman'
      ],
      popular: true
    },
    {
      id: 'price-sv-1',
      name: 'Layanan Servis & Perbaikan Cepat',
      category: 'servis',
      thickness: 'Semua Tipe',
      pricePerUnit: 150000,
      unit: 'unit',
      description: 'Layanan perbaikan rolling door macet, per patah, roda anjlok, atau ganti slat (Jateng & panggilan proyek luar pulau).',
      features: [
        'Teknisi berpengalaman >10 tahun siap meluncur',
        'Penggantian per baja kualitas unggul standar pabrik',
        'Pelumasan rel & balancing beban presisi',
        'Garansi pengerjaan servis'
      ],
      popular: false
    }
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Pemasangan Rolling Door Industri Otomatis Gudang Logistik KIT Batang',
      category: 'rolling-door',
      location: 'Kawasan Industri Terpadu Batang (KITB), Jawa Tengah',
      year: '2026',
      dimensions: 'Lebar 6.5m x Tinggi 5.2m (2 Unit)',
      description: 'Pemasangan rolling door motorized tebal 1.2mm dengan motor penggerak Shinsei 1000kg dan remote control di kawasan industri KIT Batang.',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'proj-2',
      title: 'Pengiriman & Pasang Folding Gate Super Ruko Balikpapan Kalimantan',
      category: 'folding-gate',
      location: 'Balikpapan, Kalimantan Timur',
      year: '2026',
      dimensions: 'Lebar 4.5m x Tinggi 3.8m (3 Unit)',
      description: 'Pengiriman via kargo laut dengan palet kayu standar ekspor dilanjutkan instalasi presisi folding gate galvalum anti karat untuk komplek ruko baru.',
      imageUrl: 'https://images.unsplash.com/photo-1541888946425-d0fbb1861593?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'proj-3',
      title: 'Fasad & Pintu Kaca Tempered 12mm Resto & Kafe Denpasar Bali',
      category: 'kaca-aluminium',
      location: 'Sanur, Denpasar, Bali',
      year: '2026',
      dimensions: 'Lebar 9.0m x Tinggi 3.2m',
      description: 'Instalasi kaca tempered 12mm frameless dengan engsel tanam Dorma dan partisi aluminium modern untuk restoran bergaya tropis minimalis.',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'proj-4',
      title: 'Supply Rolling Door One Sheet Perforated Distro Palembang Sumatera',
      category: 'rolling-door',
      location: 'Palembang, Sumatera Selatan',
      year: '2025',
      dimensions: 'Lebar 3.8m x Tinggi 3.0m',
      description: 'Unit knock-down lengkap dengan perakitan mudah dan rel berperedam nilon dikirim melalui ekspedisi darat-laut ke Sumatera Selatan.',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    {
      id: 'proj-5',
      title: 'Folding Gate Extra Super 0.8mm Toko Grosir Subah Batang',
      category: 'folding-gate',
      location: 'Subah, Kab. Batang, Jawa Tengah',
      year: '2025',
      dimensions: 'Lebar 4.2m x Tinggi 3.8m',
      description: 'Konstruksi silangan ganda heavy duty dengan plat daun 0.8mm tebal untuk proteksi anti maling tingkat tinggi pada toko sembako grosir.',
      imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    {
      id: 'proj-6',
      title: 'Partisi Kaca & Pintu Henderson Showroom Mobil Makassar Sulawesi',
      category: 'kaca-aluminium',
      location: 'Makassar, Sulawesi Selatan',
      year: '2026',
      dimensions: 'Partisi 14m Lari + Pintu Sliding Kaca 12mm',
      description: 'Desain elegan fasad kaca tempered dan kusen aluminium tebal untuk showroom kendaraan, dikirim dengan kemasan peti kayu kedap guncangan.',
      imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1000&q=80',
      featured: true
    },
    {
      id: 'proj-7',
      title: 'Servis Penggantian Per & Balancing Rolling Door Pabrik Pekalongan',
      category: 'servis',
      location: 'Pekalongan, Jawa Tengah',
      year: '2026',
      dimensions: 'Lebar 4.5m x Tinggi 4.0m',
      description: 'Perbaikan rolling door macet karena per baja patah. Diganti dengan per baru standar Jepang dalam waktu 3 jam selesai tanpa mengganggu jam operasional.',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      featured: false
    },
    {
      id: 'proj-8',
      title: 'Pemasangan Deretan Folding Gate Ruko Pasar Bandar Batang',
      category: 'folding-gate',
      location: 'Bandar, Kab. Batang, Jawa Tengah',
      year: '2025',
      dimensions: 'Lebar 4.0m x Tinggi 3.5m (4 Unit)',
      description: 'Fabrikasi dan instalasi 4 unit folding gate plat galvalum 0.5mm anti karat dengan silangan rapat warna abu-abu granit elegan.',
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      featured: false
    }
  ],
  testimonials: [
    {
      id: 'test-1',
      name: 'H. Sudrajat',
      role: 'Pemilik Toko Grosir Sembako',
      location: 'Pasar Bandar, Batang',
      rating: 5,
      comment: 'Pelayanan Mas AR Teknik luar biasa cepat! Pesan folding gate untuk toko baru saya di Bandar, disurvey hari itu juga dan seminggu langsung pasang rapi. Buka tutup enteng sekali.',
      projectType: 'Folding Gate Super Galvalum'
    },
    {
      id: 'test-2',
      name: 'Bpk. Ir. Hendra Wicaksono',
      role: 'Project Manager Kontraktor Warehouse',
      location: 'Kawasan Industri Terpadu Batang (KITB)',
      rating: 5,
      comment: 'Bekerja sama dengan AR Teknik untuk pintu gudang motorized sangat memuaskan. Spesifikasi material tebal sesuai kontrak, motor Shinsei berjalan halus, dan tim safety pengerjaannya disiplin.',
      projectType: 'Rolling Door Otomatis Mesin'
    },
    {
      id: 'test-3',
      name: 'Bpk. Andre Gunawan',
      role: 'Kontraktor Ruko & Gudang',
      location: 'Balikpapan, Kalimantan Timur',
      rating: 5,
      comment: 'Pesan dari Kalimantan awalnya ragu, tapi AR Teknik memberikan tracking pengiriman kargo laut yang jelas dan packing kayunya sangat kokoh. Barang tiba tanpa cacat sedikitpun dan perakitan sangat presisi.',
      projectType: 'Pengiriman Folding Gate Antarpulau'
    },
    {
      id: 'test-4',
      name: 'Ibu Ratna Dewi',
      role: 'Owner Cafe & Resto',
      location: 'Denpasar, Bali',
      rating: 5,
      comment: 'Kaca tempered dan kusen aluminiumnya rapi sekali silikonnya. Hasilnya persis seperti gambar desain arsitek kami. Harganya jauh lebih hemat langsung dari bengkel AR Teknik.',
      projectType: 'Partisi Kaca Tempered 12mm'
    }
  ]
};
