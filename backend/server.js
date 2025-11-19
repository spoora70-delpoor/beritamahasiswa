// backend/server.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Database berita (dalam produksi, gunakan database sesungguhnya)
const beritaList = [
    {
        id: 1,
        img: 'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=800',
        title: 'Gempa Bumi Guncang Jawa Barat, Warga Diimbau Waspada',
        summary: 'Gempa berkekuatan 6.2 SR terjadi di wilayah Jawa Barat pada pagi hari. BMKG mengimbau masyarakat tetap tenang dan waspada terhadap gempa susulan yang mungkin terjadi.',
        body: 'Gempa bumi dengan kekuatan 6.2 Skala Richter mengguncang wilayah Jawa Barat pada pukul 10.15 WIB pagi ini. Pusat gempa terletak di kedalaman 10 kilometer di bawah permukaan laut, sekitar 50 kilometer dari pantai selatan Jawa Barat.\n\nBadan Meteorologi, Klimatologi, dan Geofisika (BMKG) melaporkan bahwa gempa dirasakan di beberapa kota besar seperti Bandung, Bogor, dan Jakarta. Meskipun tidak ada laporan korban jiwa, beberapa bangunan mengalami kerusakan ringan.\n\nKepala BMKG mengimbau masyarakat untuk tetap tenang namun waspada. "Kami terus memantau aktivitas seismik di wilayah tersebut. Masyarakat diharapkan mengikuti prosedur evakuasi jika terjadi gempa susulan," ujarnya.\n\nTim SAR telah dikerahkan ke lokasi untuk memastikan tidak ada korban yang terperangkap. Pemerintah setempat juga telah membuka posko darurat untuk membantu warga yang terdampak.',
        kategori: 'nasional',
        date: new Date().toISOString(),
        populer: true,
        views: 12500
    },
    {
        id: 2,
        img: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800',
        title: 'Timnas Indonesia Lolos ke Final Piala Asia 2025',
        summary: 'Timnas sepak bola Indonesia berhasil lolos ke final Piala Asia setelah menang dramatis 2-1 atas Thailand di semifinal. Pertandingan berlangsung sengit hingga menit akhir.',
        body: 'Timnas Indonesia menciptakan sejarah baru dengan lolos ke final Piala Asia 2025 setelah mengalahkan Thailand dengan skor 2-1 di semifinal yang digelar di Stadion Gelora Bung Karno, Jakarta.\n\nGol pertama dicetak oleh striker muda Indonesia pada menit ke-35. Thailand sempat menyamakan kedudukan di menit ke-67, namun gol kemenangan Indonesia tercipta di menit ke-89 melalui tendangan bebas yang spektakuler.\n\nPelatih Timnas Indonesia mengungkapkan kebanggaannya atas prestasi tim. "Ini adalah momen bersejarah untuk sepak bola Indonesia. Para pemain telah menunjukkan dedikasi dan semangat juang yang luar biasa," katanya dalam konferensi pers setelah pertandingan.\n\nFinal akan digelar minggu depan melawan juara bertahan Jepang. Dukungan dari seluruh rakyat Indonesia sangat diharapkan untuk mendorong tim meraih gelar juara.',
        kategori: 'olahraga',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        populer: true,
        views: 18900
    },
    {
        id: 3,
        img: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
        title: 'Teknologi AI Mulai Diterapkan di Sekolah-sekolah Indonesia',
        summary: 'Kementerian Pendidikan meluncurkan program penerapan teknologi Artificial Intelligence (AI) di 100 sekolah percontohan. Program ini bertujuan meningkatkan kualitas pembelajaran dan membantu guru dalam proses mengajar.',
        body: 'Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi (Kemendikbudristek) resmi meluncurkan program penerapan teknologi Artificial Intelligence (AI) di 100 sekolah percontohan di seluruh Indonesia.\n\nProgram ini merupakan bagian dari transformasi digital pendidikan yang telah direncanakan sejak tahun lalu. AI akan digunakan untuk berbagai keperluan, mulai dari sistem penilaian otomatis, rekomendasi pembelajaran personal, hingga asisten virtual untuk menjawab pertanyaan siswa.\n\n"Teknologi AI bukan untuk menggantikan peran guru, melainkan untuk membantu guru dalam memberikan pendidikan yang lebih baik dan personal kepada setiap siswa," jelas Menteri Pendidikan dalam peluncuran program.\n\nSekolah-sekolah yang terpilih akan mendapatkan pelatihan khusus untuk guru dan infrastruktur yang diperlukan. Program ini diharapkan dapat diperluas ke lebih banyak sekolah dalam dua tahun ke depan.',
        kategori: 'teknologi',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 8500
    },
    {
        id: 4,
        img: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
        title: 'Festival Musik Jakarta 2025: Konser Terbesar dengan Bintang Internasional',
        summary: 'Festival musik terbesar di Jakarta akan digelar bulan depan dengan menghadirkan bintang tamu internasional seperti Coldplay, Ed Sheeran, dan artis lokal ternama. Tiket mulai dijual hari ini.',
        body: 'Jakarta akan menjadi tuan rumah festival musik terbesar se-Asia Tenggara pada bulan depan. Festival Musik Jakarta 2025 akan menghadirkan lebih dari 50 artis dari dalam dan luar negeri.\n\nBeberapa nama besar yang telah dikonfirmasi hadir antara lain Coldplay, Ed Sheeran, Blackpink, dan dari Indonesia sendiri akan tampil Raisa, Tulus, dan banyak lagi. Festival akan digelar selama tiga hari berturut-turut di area Gelora Bung Karno.\n\n"Kami ingin menjadikan Jakarta sebagai destinasi musik internasional. Festival ini tidak hanya tentang konser, tapi juga tentang budaya, kuliner, dan seni," ujar ketua panitia festival.\n\nTiket mulai dijual hari ini melalui berbagai platform online. Harga tiket bervariasi mulai dari Rp 500.000 untuk single day pass hingga Rp 1.500.000 untuk full pass tiga hari. Diharapkan festival ini dapat menarik lebih dari 100.000 pengunjung.',
        kategori: 'hiburan',
        date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        populer: true,
        views: 15200
    },
    {
        id: 5,
        img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
        title: 'Ekonomi Indonesia Tumbuh 5.2% di Kuartal Pertama 2025',
        summary: 'Pertumbuhan ekonomi Indonesia di kuartal pertama 2025 mencapai 5.2%, melampaui target pemerintah. Pertumbuhan didorong oleh sektor industri, ekspor, dan konsumsi domestik yang kuat.',
        body: 'Badan Pusat Statistik (BPS) mengumumkan pertumbuhan ekonomi Indonesia di kuartal pertama 2025 mencapai 5.2%, lebih tinggi dari proyeksi awal sebesar 5.0%.\n\nPertumbuhan ini didorong oleh beberapa faktor utama. Sektor industri manufaktur tumbuh 6.1%, sementara ekspor meningkat 8.5% dibandingkan periode yang sama tahun lalu. Konsumsi domestik juga menunjukkan tren positif dengan pertumbuhan 4.8%.\n\nMenteri Keuangan menyatakan optimisme terhadap stabilitas ekonomi nasional. "Pertumbuhan ini menunjukkan bahwa ekonomi Indonesia terus pulih dan berkembang dengan baik. Kami akan terus menjaga momentum ini dengan kebijakan fiskal yang tepat," ujarnya.\n\nBank Indonesia juga mengapresiasi pertumbuhan ini dan menyatakan akan terus menjaga stabilitas nilai tukar rupiah. Inflasi tetap terkendali di level 2.8%, berada dalam target pemerintah.',
        kategori: 'ekonomi',
        date: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 7200
    },
    {
        id: 6,
        img: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
        title: 'Presiden AS Kunjungi Indonesia untuk KTT ASEAN',
        summary: 'Presiden Amerika Serikat akan melakukan kunjungan resmi ke Indonesia dalam rangka KTT ASEAN yang akan digelar di Bali. Kunjungan ini membahas kerja sama ekonomi dan keamanan regional.',
        body: 'Presiden Amerika Serikat dijadwalkan melakukan kunjungan resmi ke Indonesia pada minggu depan dalam rangka menghadiri KTT ASEAN yang akan digelar di Nusa Dua, Bali.\n\nKunjungan ini merupakan yang pertama kali dilakukan presiden AS ke Indonesia dalam lima tahun terakhir. Agenda utama kunjungan adalah membahas kerja sama ekonomi, investasi, dan keamanan regional di kawasan Asia Pasifik.\n\n"Kunjungan ini menunjukkan komitmen AS untuk memperkuat hubungan dengan negara-negara ASEAN, termasuk Indonesia sebagai negara terbesar di kawasan," ujar juru bicara Gedung Putih.\n\nPresiden Indonesia menyambut baik kunjungan ini dan menyatakan bahwa pertemuan akan membahas berbagai isu strategis, termasuk perubahan iklim, keamanan maritim, dan peningkatan perdagangan bilateral. Diharapkan kunjungan ini dapat menghasilkan kesepakatan-kesepakatan baru yang menguntungkan kedua negara.',
        kategori: 'internasional',
        date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        populer: true,
        views: 11200
    },
    {
        id: 7,
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        title: 'Startup Fintech Indonesia Raih Pendanaan $50 Juta',
        summary: 'Startup fintech asal Indonesia berhasil meraih pendanaan Series B senilai $50 juta dari investor internasional. Pendanaan ini akan digunakan untuk ekspansi ke pasar Asia Tenggara.',
        body: 'Startup fintech Indonesia yang fokus pada layanan pembayaran digital berhasil meraih pendanaan Series B senilai $50 juta dari konsorsium investor internasional yang dipimpin oleh venture capital terkemuka.\n\nPendanaan ini merupakan yang terbesar untuk startup fintech Indonesia tahun ini. CEO perusahaan mengungkapkan bahwa dana ini akan digunakan untuk ekspansi ke pasar Asia Tenggara, pengembangan teknologi, dan rekrutmen talenta.\n\n"Kami sangat senang dengan kepercayaan yang diberikan investor. Ini membuktikan bahwa ekosistem startup Indonesia memiliki potensi besar," ujar CEO dalam pernyataan resmi.\n\nPerusahaan ini telah melayani lebih dari 5 juta pengguna di Indonesia dan berencana untuk masuk ke pasar Malaysia, Thailand, dan Filipina dalam tahun ini. Dengan pendanaan ini, perusahaan menargetkan dapat melayani 20 juta pengguna di seluruh Asia Tenggara dalam dua tahun ke depan.',
        kategori: 'teknologi',
        date: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 6800
    },
    {
        id: 8,
        img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
        title: 'Atlet Indonesia Raih Medali Emas di Kejuaraan Dunia',
        summary: 'Atlet bulu tangkis Indonesia berhasil meraih medali emas di Kejuaraan Dunia yang digelar di Denmark. Ini adalah medali emas pertama Indonesia di kejuaraan dunia dalam tiga tahun terakhir.',
        body: 'Atlet bulu tangkis Indonesia menciptakan sejarah dengan meraih medali emas di Kejuaraan Dunia Bulu Tangkis yang digelar di Odense, Denmark. Kemenangan ini diraih setelah mengalahkan atlet dari China di final dengan skor 21-19, 19-21, 21-17.\n\nPertandingan final berlangsung sangat sengit dan berlangsung selama 75 menit. Atlet Indonesia menunjukkan mental yang kuat dan teknik yang sempurna untuk mengalahkan lawan yang lebih tinggi peringkatnya.\n\n"Kemenangan ini adalah hasil dari kerja keras dan dedikasi selama bertahun-tahun. Saya berterima kasih kepada pelatih, keluarga, dan seluruh rakyat Indonesia yang selalu mendukung," ujar atlet setelah pertandingan.\n\nIni adalah medali emas pertama Indonesia di kejuaraan dunia dalam tiga tahun terakhir. Presiden Indonesia mengucapkan selamat melalui media sosial dan menyatakan bahwa prestasi ini membanggakan seluruh bangsa.',
        kategori: 'olahraga',
        date: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        populer: true,
        views: 14500
    },
    {
        id: 9,
        img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
        title: 'Indonesia Luncurkan Satelit Komunikasi Baru',
        summary: 'Indonesia berhasil meluncurkan satelit komunikasi baru yang akan meningkatkan konektivitas internet di seluruh wilayah nusantara, terutama di daerah terpencil dan kepulauan.',
        body: 'Indonesia berhasil meluncurkan satelit komunikasi baru dari fasilitas peluncuran di luar negeri. Satelit yang diberi nama "Satelit Nusantara 2" ini akan meningkatkan konektivitas internet di seluruh wilayah Indonesia.\n\nSatelit ini memiliki kapasitas yang lebih besar dibandingkan satelit sebelumnya dan dilengkapi dengan teknologi terbaru. Satelit akan mengorbit di ketinggian 36.000 kilometer di atas khatulistiwa.\n\n"Peluncuran satelit ini merupakan langkah penting dalam upaya pemerintah untuk meningkatkan konektivitas digital di seluruh Indonesia, terutama di daerah terpencil dan kepulauan," ujar Menteri Komunikasi dan Informatika.\n\nSatelit ini diharapkan dapat menjangkau seluruh wilayah Indonesia dan meningkatkan kecepatan internet di daerah-daerah yang selama ini mengalami kesulitan akses. Proyek ini merupakan bagian dari program "Indonesia Digital" yang dicanangkan pemerintah.',
        kategori: 'teknologi',
        date: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 5600
    },
    {
        id: 10,
        img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
        title: 'Film Indonesia Masuk Nominasi Festival Film Internasional',
        summary: 'Film Indonesia berhasil masuk nominasi di Festival Film Internasional yang bergengsi. Ini adalah pencapaian besar untuk industri perfilman Indonesia di kancah internasional.',
        body: 'Film Indonesia berhasil menorehkan prestasi gemilang dengan masuk nominasi di Festival Film Internasional yang bergengsi. Film yang disutradarai oleh sineas muda Indonesia ini masuk dalam kategori Film Terbaik dan Aktor Terbaik.\n\nFilm ini mengangkat cerita tentang kehidupan masyarakat Indonesia dengan pendekatan yang unik dan artistik. Kritikus film internasional memuji sinematografi dan penceritaan yang kuat dalam film ini.\n\n"Ini adalah momen bersejarah untuk perfilman Indonesia. Film kita mampu bersaing di level internasional dan mendapatkan pengakuan dari para kritikus dunia," ujar sutradara film dalam konferensi pers.\n\nFestival akan digelar bulan depan dan film Indonesia akan bersaing dengan film-film dari berbagai negara. Industri perfilman Indonesia berharap prestasi ini dapat membuka jalan bagi lebih banyak film Indonesia untuk dikenal di dunia internasional.',
        kategori: 'hiburan',
        date: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        populer: true,
        views: 9800
    },
    {
        id: 11,
        img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
        title: 'Perubahan Iklim: Indonesia Komitmen Kurangi Emisi 30%',
        summary: 'Indonesia memperkuat komitmennya dalam mengatasi perubahan iklim dengan target mengurangi emisi karbon sebesar 30% pada tahun 2030. Program reboisasi dan energi terbarukan akan dipercepat.',
        body: 'Pemerintah Indonesia memperkuat komitmennya dalam mengatasi perubahan iklim dengan mengumumkan target baru untuk mengurangi emisi karbon sebesar 30% pada tahun 2030. Komitmen ini lebih ambisius dari target sebelumnya sebesar 26%.\n\nUntuk mencapai target ini, pemerintah akan mempercepat beberapa program utama, termasuk reboisasi hutan, transisi ke energi terbarukan, dan pengurangan penggunaan bahan bakar fosil. Program reboisasi akan menargetkan penanaman 1 miliar pohon dalam lima tahun ke depan.\n\n"Komitmen ini menunjukkan keseriusan Indonesia dalam menghadapi tantangan perubahan iklim. Kami akan bekerja sama dengan semua pihak untuk mencapai target ini," ujar Menteri Lingkungan Hidup dan Kehutanan.\n\nIndonesia juga akan meningkatkan penggunaan energi terbarukan dari 11% menjadi 23% dari total energi nasional pada tahun 2025. Program ini didukung oleh pendanaan dari berbagai lembaga internasional.',
        kategori: 'nasional',
        date: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 6400
    },
    {
        id: 12,
        img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
        title: 'Pertumbuhan Ekspor Indonesia Meningkat 12%',
        summary: 'Ekspor Indonesia mengalami pertumbuhan signifikan sebesar 12% dibandingkan tahun lalu. Komoditas utama yang mengalami peningkatan adalah produk manufaktur, minyak sawit, dan produk digital.',
        body: 'Badan Pusat Statistik melaporkan bahwa ekspor Indonesia mengalami pertumbuhan signifikan sebesar 12% dibandingkan periode yang sama tahun lalu. Pertumbuhan ini didorong oleh peningkatan permintaan dari pasar global.\n\nKomoditas utama yang mengalami peningkatan ekspor antara lain produk manufaktur (naik 15%), minyak sawit (naik 8%), produk digital dan teknologi (naik 25%), serta produk pertanian (naik 10%).\n\n"Pertumbuhan ekspor ini menunjukkan bahwa produk Indonesia semakin kompetitif di pasar global. Kami akan terus mendorong diversifikasi produk ekspor untuk mengurangi ketergantungan pada komoditas tertentu," ujar Menteri Perdagangan.\n\nNegara tujuan ekspor utama Indonesia adalah China, Amerika Serikat, Jepang, dan negara-negara ASEAN. Pemerintah berencana untuk memperluas pasar ekspor ke Afrika dan Amerika Latin dalam tahun-tahun mendatang.',
        kategori: 'ekonomi',
        date: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        populer: false,
        views: 5200
    }
];

// Routes
app.get('/api/berita', (req, res) => {
    const { kategori, search } = req.query;
    let filtered = [...beritaList];
    
    // Filter by kategori
    if (kategori && kategori !== 'all') {
        filtered = filtered.filter(b => b.kategori === kategori);
    }
    
    // Filter by search
    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(b => 
            b.title.toLowerCase().includes(searchLower) || 
            b.summary.toLowerCase().includes(searchLower) ||
            b.body.toLowerCase().includes(searchLower)
        );
    }
    
    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    res.json(filtered);
});

app.get('/api/berita/:id', (req, res) => {
    const berita = beritaList.find(b => b.id === parseInt(req.params.id));
    if (berita) {
        // Increment views
        berita.views = (berita.views || 0) + 1;
        res.json(berita);
    } else {
        res.status(404).json({ error: 'Berita tidak ditemukan' });
    }
});

app.get('/api/kategori', (req, res) => {
    const kategori = [...new Set(beritaList.map(b => b.kategori))];
    res.json(kategori);
});

app.get('/api/populer', (req, res) => {
    const populer = beritaList
        .filter(b => b.populer)
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5);
    res.json(populer);
});

app.get('/api/trending', (req, res) => {
    // Trending berdasarkan views dan recency
    const trending = beritaList
        .map(b => ({
            ...b,
            trendingScore: (b.views || 0) * 0.7 + (new Date() - new Date(b.date)) / (1000 * 60 * 60) * 0.3
        }))
        .sort((a, b) => b.trendingScore - a.trendingScore)
        .slice(0, 5)
        .map(({ trendingScore, ...rest }) => rest);
    res.json(trending);
});

app.get('/api/stats', (req, res) => {
    const stats = {
        totalBerita: beritaList.length,
        totalViews: beritaList.reduce((sum, b) => sum + (b.views || 0), 0),
        kategori: {}
    };
    
    beritaList.forEach(berita => {
        const kat = berita.kategori || 'lainnya';
        stats.kategori[kat] = (stats.kategori[kat] || 0) + 1;
    });
    
    res.json(stats);
});

// Latest Update Endpoint untuk Realtime
let lastUpdateTime = new Date().toISOString();

// Simulasi update berita secara berkala (untuk demo)
setInterval(() => {
    // Update waktu terakhir setiap 30 detik (simulasi)
    lastUpdateTime = new Date().toISOString();
}, 30000);

app.get('/api/latest-update', (req, res) => {
    res.json({ 
        lastUpdate: lastUpdateTime,
        timestamp: new Date().toISOString()
    });
});

// Endpoint untuk menambahkan berita baru (simulasi realtime)
app.post('/api/berita', (req, res) => {
    const newBerita = {
        id: beritaList.length + 1,
        ...req.body,
        date: new Date().toISOString(),
        views: 0,
        populer: false
    };
    beritaList.unshift(newBerita); // Tambahkan di awal
    lastUpdateTime = new Date().toISOString();
    res.status(201).json(newBerita);
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📰 Total berita: ${beritaList.length}`);
    console.log(`✅ API siap digunakan!`);
    console.log(`🔄 Realtime updates aktif!`);
});
