const { fetchFeeds } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const { kategori = 'all', search = '' } = req.query || {};
    const { items, lastUpdate } = await fetchFeeds();

    let filtered = items;
    if (kategori && kategori !== 'all') {
      filtered = filtered.filter(b => (b.kategori || '').toLowerCase() === kategori.toLowerCase());
    }
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(b => (b.title || '').toLowerCase().includes(q) || (b.summary || '').toLowerCase().includes(q));
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(filtered);
  } catch (e) {
    res.status(500).json({ error: 'Gagal memuat berita' });
  }
};