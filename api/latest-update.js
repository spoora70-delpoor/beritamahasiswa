const { fetchFeeds } = require('./_lib');

module.exports = async (req, res) => {
  try {
    const { items } = await fetchFeeds();
    const maxDate = items.reduce((acc, b) => {
      const t = new Date(b.date).getTime();
      return t > acc ? t : acc;
    }, 0);
    const lastUpdate = maxDate ? new Date(maxDate).toISOString() : new Date().toISOString();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ lastUpdate });
  } catch (e) {
    res.status(200).json({ lastUpdate: new Date().toISOString() });
  }
};