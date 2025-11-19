const { fetchFeeds } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const { items } = await fetchFeeds();
    // Hitung skor tren berdasarkan kedekatan waktu
    const now = Date.now();
    const scored = items.map(b => ({
      id: b.id,
      title: b.title,
      link: b.link,
      trendingScore: Math.max(0, 1000 - Math.floor((now - new Date(b.date).getTime()) / 60000)),
    }));
    scored.sort((a, b) => b.trendingScore - a.trendingScore);
    const trending = scored.slice(0, 10);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(trending);
  } catch (e) {
    res.status(500).json({ error: 'Gagal memuat trending' });
  }
};