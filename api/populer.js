const { fetchFeeds } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const { items } = await fetchFeeds();
    // Sederhana: anggap populer = terbaru 10 item
    const populer = items.slice(0, 10).map(b => ({ id: b.id, title: b.title, link: b.link }));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(populer);
  } catch (e) {
    res.status(500).json({ error: 'Gagal memuat populer' });
  }
};