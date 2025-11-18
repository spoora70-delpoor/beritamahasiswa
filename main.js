// main.js - Portal Berita Terkini
const API_URL = 'http://localhost:3000/api';

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta'
    };
    return date.toLocaleDateString('id-ID', options) + ' WIB';
}

function formatTime(date) {
    return date.toLocaleTimeString('id-ID', { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        timeZone: 'Asia/Jakarta' 
    }) + ' WIB';
}

// Update Tanggal dan Waktu
function updateTanggalWaktu() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZone: 'Asia/Jakarta' 
    };
    const formatted = now.toLocaleString('id-ID', options) + ' WIB';
    document.getElementById('tanggal-waktu').textContent = formatted;
}
setInterval(updateTanggalWaktu, 1000);
updateTanggalWaktu();

// Update Live Time
function updateLiveTime() {
    const now = new Date();
    document.getElementById('last-update').textContent = formatTime(now);
}
setInterval(updateLiveTime, 1000);
updateLiveTime();

// Loading State
function showLoading() {
    document.getElementById('loading-spinner').style.display = 'block';
    document.getElementById('news-grid').innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
    `;
}

function hideLoading() {
    document.getElementById('loading-spinner').style.display = 'none';
}

// Fetch Berita Utama
async function loadHeadline() {
    try {
        const res = await fetch(`${API_URL}/berita`);
        if (!res.ok) throw new Error('Failed to fetch');
        const beritaList = await res.json();
        const headline = beritaList[0];
        
        if (headline) {
            document.getElementById('headline-title').textContent = headline.title;
            document.getElementById('headline-summary').textContent = headline.summary;
            const headlineImg = document.getElementById('headline-img');
            const placeholder = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
            headlineImg.src = headline.img || placeholder;
            headlineImg.referrerPolicy = 'no-referrer';
            headlineImg.onerror = () => { headlineImg.src = placeholder; headlineImg.onerror = null; };
            document.getElementById('headline-kategori').textContent = headline.kategori || 'Berita';
            document.getElementById('headline-date').textContent = formatDate(headline.date || new Date().toISOString());
            document.getElementById('headline-detail').onclick = (e) => {
                e.preventDefault();
                showModal(headline);
            };
        }
    } catch (error) {
        console.error('Error loading headline:', error);
        document.getElementById('headline-title').textContent = 'Gagal memuat berita utama';
    }
}

// Fetch Berita Terbaru
async function loadBerita(kategori = 'all', search = '') {
    showLoading();
    try {
        const params = new URLSearchParams({ kategori, search });
        const res = await fetch(`${API_URL}/berita?${params}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const beritaList = await res.json();
        
        hideLoading();
        const grid = document.getElementById('news-grid');
        grid.innerHTML = '';
        
        if (beritaList.length === 0) {
            document.getElementById('no-results').style.display = 'block';
            document.getElementById('news-count').textContent = '';
        } else {
            document.getElementById('no-results').style.display = 'none';
            document.getElementById('news-count').textContent = `Menampilkan ${beritaList.length} berita`;
            
            beritaList.forEach(berita => {
                const article = document.createElement('article');
                article.innerHTML = `
                    <img class="news-img" src="${berita.img || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'}" alt="${berita.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'">
                    <div>
                        <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                            <span class="kategori-badge">${berita.kategori || 'Berita'}</span>
                            <span class="date-badge">${formatDate(berita.date || new Date().toISOString())}</span>
                        </div>
                        <h3 class="news-title">${berita.title}</h3>
                        <p>${berita.summary}</p>
                        <a href="#" class="detail-link">Baca Selengkapnya →</a>
                    </div>
                `;
                // Jadikan seluruh kartu dapat diklik dan aksesibel
                article.classList.add('news-card');
                article.setAttribute('role', 'button');
                article.setAttribute('tabindex', '0');
                article.setAttribute('aria-label', `Buka detail: ${berita.title}`);

                article.onclick = () => showModal(berita);
                article.onkeydown = (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        showModal(berita);
                    }
                };

                // Tautan detail tetap berfungsi dan tidak menggandakan event
                const detailLink = article.querySelector('.detail-link');
                detailLink.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showModal(berita);
                };

                // Klik gambar dan judul tetap membuka modal
                const imgEl = article.querySelector('.news-img');
                const titleEl = article.querySelector('.news-title');
                imgEl.style.cursor = 'pointer';
                titleEl.style.cursor = 'pointer';
                imgEl.onclick = (e) => { e.stopPropagation(); showModal(berita); };
                titleEl.onclick = (e) => { e.stopPropagation(); showModal(berita); };

                grid.appendChild(article);
            });
        }
    } catch (error) {
        hideLoading();
        console.error('Error loading berita:', error);
        document.getElementById('news-grid').innerHTML = `
            <div class="no-results">
                <p>❌ Gagal memuat berita. Pastikan server backend berjalan.</p>
            </div>
        `;
    }
}

// Fetch Berita Populer
async function loadPopuler() {
    try {
        const res = await fetch(`${API_URL}/populer`);
        if (!res.ok) throw new Error('Failed to fetch');
        const populerList = await res.json();
        const list = document.getElementById('populer-list');
        list.innerHTML = '';
        
        if (populerList.length === 0) {
            list.innerHTML = '<li style="color: var(--text-light);">Belum ada berita populer</li>';
        } else {
            populerList.forEach((b, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="#">${index + 1}. ${b.title}</a>`;
                li.querySelector('a').onclick = (e) => {
                    e.preventDefault();
                    showModal(b);
                };
                list.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Error loading populer:', error);
        document.getElementById('populer-list').innerHTML = '<li style="color: var(--text-light);">Gagal memuat</li>';
    }
}

// Load Kategori Stats
async function loadKategoriStats() {
    try {
        const res = await fetch(`${API_URL}/berita`);
        if (!res.ok) throw new Error('Failed to fetch');
        const beritaList = await res.json();
        
        const stats = {};
        beritaList.forEach(berita => {
            const kat = berita.kategori || 'lainnya';
            stats[kat] = (stats[kat] || 0) + 1;
        });
        
        const statsContainer = document.getElementById('kategori-stats');
        statsContainer.innerHTML = '';
        
        Object.entries(stats).sort((a, b) => b[1] - a[1]).forEach(([kategori, count]) => {
            const item = document.createElement('div');
            item.className = 'kategori-stat-item';
            item.innerHTML = `
                <span>${kategori.charAt(0).toUpperCase() + kategori.slice(1)}</span>
                <span style="font-weight: 700;">${count}</span>
            `;
            item.onclick = () => {
                document.querySelectorAll('.kategori-link').forEach(l => l.classList.remove('active'));
                const link = document.querySelector(`[data-kategori="${kategori}"]`);
                if (link) {
                    link.classList.add('active');
                    loadBerita(kategori, searchInput.value);
                }
            };
            statsContainer.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Trending
async function loadTrending() {
    try {
        const res = await fetch(`${API_URL}/trending`);
        if (!res.ok) throw new Error('Failed to fetch');
        const trendingList = await res.json();
        const container = document.getElementById('trending-list');
        container.innerHTML = '';
        
        if (trendingList.length === 0) {
            container.innerHTML = '<p style="color: var(--text-light);">Belum ada trending</p>';
        } else {
            trendingList.forEach((berita, index) => {
                const item = document.createElement('div');
                item.className = 'trending-item';
                item.innerHTML = `
                    <span class="trending-number">#${index + 1}</span>
                    <span style="flex: 1;">${berita.title}</span>
                `;
                item.onclick = () => showModal(berita);
                container.appendChild(item);
            });
        }
    } catch (error) {
        console.error('Error loading trending:', error);
        container.innerHTML = '<p style="color: var(--text-light);">Gagal memuat</p>';
    }
}

// Search Functionality
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');

let searchTimeout;
searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        loadBerita(getKategori(), this.value);
    }, 500);
});

searchBtn.addEventListener('click', () => {
    loadBerita(getKategori(), searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loadBerita(getKategori(), searchInput.value);
    }
});

// Kategori Navigation
function getKategori() {
    const active = document.querySelector('.kategori-link.active');
    return active ? active.getAttribute('data-kategori') : 'all';
}

document.querySelectorAll('.kategori-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.kategori-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        loadBerita(getKategori(), searchInput.value);
    });
});

// Footer kategori links
document.querySelectorAll('footer .kategori-link, footer [data-kategori]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const kategori = this.getAttribute('data-kategori');
        if (kategori) {
            document.querySelectorAll('.kategori-link').forEach(l => l.classList.remove('active'));
            const mainLink = document.querySelector(`.main-nav [data-kategori="${kategori}"]`);
            if (mainLink) {
                mainLink.classList.add('active');
                loadBerita(kategori, searchInput.value);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    });
});

// Modal Detail
function showModal(berita) {
    document.getElementById('modal-title').textContent = berita.title;
    const modalImg = document.getElementById('modal-img');
    const placeholder = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
    modalImg.src = berita.img || placeholder;
    modalImg.referrerPolicy = 'no-referrer';
    modalImg.onerror = () => { modalImg.src = placeholder; modalImg.onerror = null; };
    document.getElementById('modal-summary').textContent = berita.summary;
    document.getElementById('modal-kategori').textContent = berita.kategori || 'Berita';
    document.getElementById('modal-date').textContent = formatDate(berita.date || new Date().toISOString());
    const contentEl = document.getElementById('modal-content-text');
    const htmlContent = berita.body || berita.summary || '';
    contentEl.innerHTML = sanitizeHTML(htmlContent);
    // Source button
    const sourceBtn = document.getElementById('source-btn');
    if (berita.link) {
        sourceBtn.style.display = 'inline-block';
        sourceBtn.onclick = (e) => {
            e.preventDefault();
            window.open(berita.link, '_blank', 'noopener');
        };
    } else {
        sourceBtn.style.display = 'none';
        sourceBtn.onclick = null;
    }
    document.getElementById('modal-detail').classList.add('active');
    document.body.style.overflow = 'hidden';
}

document.querySelector('.close-modal').addEventListener('click', function() {
    closeModal();
});

window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('modal-detail')) {
        closeModal();
    }
});

function closeModal() {
    document.getElementById('modal-detail').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Share Button
document.getElementById('share-btn').addEventListener('click', function() {
    const title = document.getElementById('modal-title').textContent;
    const url = window.location.href;
    
    if (navigator.share) {
        navigator.share({
            title: title,
            text: document.getElementById('modal-summary').textContent,
            url: url
        }).catch(err => console.log('Error sharing:', err));
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(`${title}\n${url}`).then(() => {
            alert('Link berita berhasil disalin!');
        });
    }
});

// Dark Mode Toggle
const darkToggle = document.getElementById('darkmode-toggle');
darkToggle.addEventListener('click', function() {
    document.body.classList.toggle('darkmode');
    const isDark = document.body.classList.contains('darkmode');
    localStorage.setItem('darkmode', isDark);
});

// Load dark mode preference
if (localStorage.getItem('darkmode') === 'true') {
    document.body.classList.add('darkmode');
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Realtime Update System
let lastUpdateTime = null;
let realtimeInterval;
let isUpdating = false;

async function checkRealtimeUpdates() {
    if (isUpdating) return;
    
    try {
        isUpdating = true;
        const res = await fetch(`${API_URL}/latest-update`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        if (lastUpdateTime) {
            // Bandingkan timestamp
            const lastUpdate = new Date(lastUpdateTime);
            const newUpdate = new Date(data.lastUpdate);
            
            if (newUpdate > lastUpdate) {
                // Ada update baru
                showRealtimeIndicator();
                document.getElementById('notif-update').style.display = 'flex';
                lastUpdateTime = data.lastUpdate;
            }
        } else {
            // Inisialisasi pertama kali
            lastUpdateTime = data.lastUpdate;
        }
    } catch (error) {
        console.error('Error checking updates:', error);
        // Fallback: tetap update lastUpdateTime untuk menghindari error berulang
        if (!lastUpdateTime) {
            lastUpdateTime = new Date().toISOString();
        }
    } finally {
        isUpdating = false;
    }
}

function showRealtimeIndicator() {
    const indicator = document.getElementById('realtime-indicator');
    indicator.classList.add('show');
    setTimeout(() => {
        indicator.classList.remove('show');
    }, 3000);
}

function startRealtimeUpdates() {
    // Check setiap 15 detik untuk mengurangi beban server
    realtimeInterval = setInterval(checkRealtimeUpdates, 15000);
    // Check pertama kali setelah 8 detik (setelah page load)
    setTimeout(checkRealtimeUpdates, 8000);
}

// Notifikasi Update
document.getElementById('refresh-btn').addEventListener('click', function() {
    document.getElementById('notif-update').style.display = 'none';
    showRealtimeIndicator();
    loadBerita(getKategori(), searchInput.value);
    loadHeadline();
    loadPopuler();
    loadTrending();
    checkRealtimeUpdates();
});

// Popup Iklan Management
const adPopup = document.getElementById('ad-popup');
const adClose = document.getElementById('ad-close');
const dontShowAds = document.getElementById('dont-show-ads');
let adShownToday = false;

const ads = [
    {
        title: 'Penawaran Spesial Hari Ini!',
        description: 'Dapatkan diskon hingga 50% untuk semua produk pilihan. Jangan lewatkan kesempatan emas ini!',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400',
        link: '#',
        badge: '✨ Spesial'
    },
    {
        title: 'Promo Akhir Tahun!',
        description: 'Nikmati penawaran terbaik dengan cashback hingga 30%. Berlaku untuk semua produk!',
        image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400',
        link: '#',
        badge: '🎉 Promo'
    },
    {
        title: 'Event Spesial Minggu Ini',
        description: 'Ikuti event eksklusif dan dapatkan hadiah menarik. Daftar sekarang dan raih kesempatan menang!',
        image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400',
        link: '#',
        badge: '🎁 Event'
    }
];

function showAdPopup() {
    // Cek apakah user sudah memilih "jangan tampilkan lagi hari ini"
    const dontShowUntil = localStorage.getItem('dontShowAdsUntil');
    if (dontShowUntil && new Date() < new Date(dontShowUntil)) {
        return;
    }
    
    // Cek apakah sudah ditampilkan hari ini
    const lastAdShown = localStorage.getItem('lastAdShown');
    const today = new Date().toDateString();
    if (lastAdShown === today) {
        return;
    }
    
    // Tampilkan popup setelah 3 detik
    setTimeout(() => {
        const randomAd = ads[Math.floor(Math.random() * ads.length)];
        document.getElementById('ad-title').textContent = randomAd.title;
        document.getElementById('ad-description').textContent = randomAd.description;
        document.getElementById('ad-image').src = randomAd.image;
        document.getElementById('ad-link').href = randomAd.link;
        document.querySelector('.ad-badge').textContent = randomAd.badge;
        
        adPopup.classList.add('show');
        document.body.style.overflow = 'hidden';
        adShownToday = true;
        localStorage.setItem('lastAdShown', today);
    }, 3000);
}

adClose.addEventListener('click', function() {
    closeAdPopup();
});

dontShowAds.addEventListener('change', function() {
    if (this.checked) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        localStorage.setItem('dontShowAdsUntil', tomorrow.toISOString());
    }
});

function closeAdPopup() {
    adPopup.classList.remove('show');
    document.body.style.overflow = 'auto';
}

adPopup.addEventListener('click', function(e) {
    if (e.target === adPopup) {
        closeAdPopup();
    }
});

// Floating Ad Banner
const floatingAd = document.getElementById('floating-ad');
const floatingAdClose = document.getElementById('floating-ad-close');

function showFloatingAd() {
    const dontShowUntil = localStorage.getItem('dontShowFloatingAdUntil');
    if (dontShowUntil && new Date() < new Date(dontShowUntil)) {
        return;
    }
    
    // Tampilkan setelah scroll 500px atau setelah 8 detik
    let scrollShown = false;
    let timeShown = false;
    
    window.addEventListener('scroll', function() {
        if (!scrollShown && window.pageYOffset > 500) {
            floatingAd.classList.add('show');
            scrollShown = true;
        }
    });
    
    setTimeout(() => {
        if (!timeShown && !scrollShown) {
            floatingAd.classList.add('show');
            timeShown = true;
        }
    }, 8000);
}

floatingAdClose.addEventListener('click', function() {
    floatingAd.classList.remove('show');
    // Jangan tampilkan lagi hari ini
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    localStorage.setItem('dontShowFloatingAdUntil', tomorrow.toISOString());
});

floatingAd.querySelector('.floating-ad-content').addEventListener('click', function() {
    window.open('#', '_blank');
});

// Initialize
async function init() {
    await Promise.all([
        loadHeadline(),
        loadBerita(),
        loadPopuler(),
        loadKategoriStats(),
        loadTrending()
    ]);
    
    // Start realtime updates
    startRealtimeUpdates();
    
    // Show ads
    showAdPopup();
    showFloatingAd();
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
// Simple sanitizer to prevent script injection while allowing basic markup
function sanitizeHTML(html) {
    if (!html) return '';
    let safe = String(html);
    // Remove script/style tags
    safe = safe.replace(/<\/(?:script|style)>/gi, '')
               .replace(/<(?:script|style)[^>]*>/gi, '');
    // Remove on* attributes
    safe = safe.replace(/ on[a-z]+="[^"]*"/gi, '')
               .replace(/ on[a-z]+='[^']*'/gi, '')
               .replace(/ on[a-z]+=\s*[^\s>]+/gi, '');
    return safe;
}
