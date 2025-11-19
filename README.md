# 📰 Portal Berita Terkini

Struktur proyek telah dipisahkan antara frontend dan backend agar rapi dan mudah dikembangkan.

## Struktur Proyek
- `backend/` — API server Express (port `3000`)
- `frontend/` — Aset UI (HTML, CSS, JS)

## Menjalankan Backend
- Buka terminal di folder `backend`
- Jalankan:
  - `npm install`
  - `npm start`
- Cek kesehatan API: `http://localhost:3000/api/health`

## Menjalankan Frontend (Dev)
- Buka terminal di folder `frontend`
- Jalankan server statis (pilih salah satu):
  - `npx serve -s -l 5173` (disarankan)
  - atau buka langsung `index.html` di browser (untuk uji cepat)
- Akses UI: `http://localhost:5173/`

Frontend akan melakukan fetch ke API backend di `http://localhost:3000/api` (sudah diaktifkan CORS di backend).

## Catatan
- Pastikan backend berjalan sebelum membuka frontend agar data berita dapat dimuat.
- Untuk pengembangan cepat, gunakan `npm run dev` di backend (dengan `nodemon`).

Website berita modern dan lengkap dengan desain menarik, fitur lengkap, dan responsif untuk semua perangkat.

## ✨ Fitur Utama

- 🎨 **Desain Modern & Menarik** - UI/UX yang elegan dengan animasi halus
- 🌙 **Dark Mode** - Toggle dark/light mode untuk kenyamanan membaca
- 🔍 **Pencarian Berita** - Cari berita berdasarkan kata kunci
- 📱 **Responsif** - Tampilan optimal di desktop, tablet, dan mobile
- 🏷️ **Kategori Berita** - Nasional, Internasional, Olahraga, Teknologi, Hiburan, Ekonomi
- 🔥 **Berita Populer** - Daftar berita yang sedang trending
- 📊 **Statistik Kategori** - Lihat jumlah berita per kategori
- 📅 **Trending Hari Ini** - Berita yang sedang viral
- ⚡ **Live Update** - Notifikasi update berita baru
- 📤 **Share Berita** - Bagikan berita ke media sosial
- 🎯 **Modal Detail** - Baca berita lengkap dalam modal yang menarik
- ⬆️ **Scroll to Top** - Tombol kembali ke atas

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js (v14 atau lebih baru)
- npm atau yarn

### Instalasi Backend

1. Masuk ke folder backend:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Jalankan server:
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

### Menjalankan Frontend

1. Buka file `index.html` di browser, atau
2. Gunakan live server (jika menggunakan VS Code dengan extension Live Server)

## 📁 Struktur Project

```
web berita/
├── backend/
│   ├── server.js          # Backend API server
│   └── package.json       # Dependencies backend
├── index.html             # Halaman utama
├── main.js                # JavaScript utama
├── style.css              # Styling CSS
└── README.md              # Dokumentasi
```

## 🔌 API Endpoints

- `GET /api/berita` - Mendapatkan semua berita (dengan filter kategori dan search)
- `GET /api/berita/:id` - Mendapatkan detail berita berdasarkan ID
- `GET /api/populer` - Mendapatkan berita populer
- `GET /api/trending` - Mendapatkan berita trending
- `GET /api/kategori` - Mendapatkan daftar kategori
- `GET /api/stats` - Mendapatkan statistik berita
- `GET /api/health` - Health check endpoint

## 🎨 Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Font**: Google Fonts (Poppins)
- **Icons**: Emoji (native)
- **Images**: Unsplash (placeholder)

## 📱 Responsive Design

Website ini fully responsive dan akan menyesuaikan tampilan untuk:
- 📱 Mobile (320px - 480px)
- 📱 Tablet (481px - 768px)
- 💻 Desktop (769px+)

## 🌟 Fitur Khusus

### Dark Mode
Toggle dark mode tersimpan di localStorage, sehingga preferensi pengguna akan tetap tersimpan.

### Live Update
Sistem akan secara otomatis mengecek update berita baru setiap 30 detik dan menampilkan notifikasi.

### Skeleton Loading
Animasi loading yang menarik saat data sedang dimuat.

### Smooth Scrolling
Semua navigasi menggunakan smooth scroll untuk pengalaman yang lebih baik.

## 📝 Catatan

- Pastikan backend server berjalan sebelum menggunakan website
- Jika menggunakan CORS, pastikan konfigurasi sudah benar
- Untuk produksi, disarankan menggunakan database sesungguhnya

## 🔧 Development

Untuk development dengan auto-reload:

```bash
cd backend
npm run dev
```

Ini akan menggunakan nodemon untuk auto-restart server saat ada perubahan.

## 📄 License

MIT License - Bebas digunakan untuk keperluan apapun.

---

**Dibuat dengan ❤️ untuk menyajikan berita terkini dan terpercaya**

# beritamahasiswa
