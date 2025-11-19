const RSSParser = require('rss-parser');
const axios = require('axios');
const cheerio = require('cheerio');

const rssParser = new RSSParser();
const PLACEHOLDER_IMG = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';

function googleNewsFeed(domain) {
  return `https://news.google.com/rss/search?q=site:${domain}&hl=id&gl=ID&ceid=ID:id`;
}

const feedSources = [
  { name: 'Google News - Indonesia', url: 'https://news.google.com/rss?hl=id&gl=ID&ceid=ID:id', kategori: 'nasional' },
  { name: 'Detik', url: googleNewsFeed('detik.com'), kategori: 'nasional' },
  { name: 'Kompas', url: googleNewsFeed('kompas.com'), kategori: 'nasional' },
  { name: 'Tribunnews', url: googleNewsFeed('tribunnews.com'), kategori: 'nasional' },
  { name: 'Okezone', url: googleNewsFeed('okezone.com'), kategori: 'nasional' },
  { name: 'Liputan6', url: googleNewsFeed('liputan6.com'), kategori: 'nasional' },
  { name: 'Suara', url: googleNewsFeed('suara.com'), kategori: 'nasional' },
  { name: 'Kumparan', url: googleNewsFeed('kumparan.com'), kategori: 'nasional' },
  { name: 'Tempo', url: googleNewsFeed('tempo.co'), kategori: 'nasional' },
  { name: 'SINDOnews', url: googleNewsFeed('sindonews.com'), kategori: 'nasional' },
  { name: 'Viva', url: googleNewsFeed('viva.co.id'), kategori: 'nasional' },
  { name: 'CNN Indonesia', url: googleNewsFeed('cnnindonesia.com'), kategori: 'nasional' },
  { name: 'TV One News', url: googleNewsFeed('tvonenews.com'), kategori: 'nasional' },
  { name: 'Republika', url: googleNewsFeed('republika.co.id'), kategori: 'nasional' },
  { name: 'Medcom', url: googleNewsFeed('medcom.id'), kategori: 'nasional' },
  { name: 'BeritaSatu', url: googleNewsFeed('beritasatu.com'), kategori: 'nasional' },
  { name: 'Pikiran Rakyat', url: googleNewsFeed('pikiran-rakyat.com'), kategori: 'nasional' },
  { name: 'The Jakarta Post', url: googleNewsFeed('thejakartapost.com'), kategori: 'internasional' },
  { name: 'Bisnis', url: googleNewsFeed('bisnis.com'), kategori: 'ekonomi' },
  { name: 'Kontan', url: googleNewsFeed('kontan.co.id'), kategori: 'ekonomi' },
  { name: 'IDN Times', url: googleNewsFeed('idntimes.com'), kategori: 'nasional' },
  { name: 'Grid', url: googleNewsFeed('grid.id'), kategori: 'nasional' },
  { name: 'Merdeka', url: googleNewsFeed('merdeka.com'), kategori: 'nasional' },
  { name: 'Alinea', url: googleNewsFeed('alinea.id'), kategori: 'nasional' },
  { name: 'Katadata', url: googleNewsFeed('katadata.co.id'), kategori: 'ekonomi' },
  { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', kategori: 'internasional' }
];

function resolveUrl(base, url) {
  try {
    return new URL(url, base).href;
  } catch {
    return url;
  }
}

async function fetchImageFromPage(pageUrl) {
  try {
    const { data } = await axios.get(pageUrl, { timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0' } });
    const $ = cheerio.load(data);
    let img = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content');
    if (!img) {
      const firstImg = $('img').attr('src');
      if (firstImg) img = resolveUrl(pageUrl, firstImg);
    }
    return img || PLACEHOLDER_IMG;
  } catch {
    return PLACEHOLDER_IMG;
  }
}

let cache = { items: [], lastUpdate: null, ts: 0 };
const CACHE_TTL_MS = 60 * 1000; // 60 detik

async function fetchFeeds(limitPageFetch = 5) {
  const now = Date.now();
  if (cache.ts && (now - cache.ts) < CACHE_TTL_MS && cache.items.length > 0) {
    return cache;
  }
  const items = [];
  let pageFetchCount = 0;

  for (const source of feedSources) {
    try {
      const feed = await rssParser.parseURL(source.url);
      for (const item of (feed.items || [])) {
        const link = item.link || item.guid || '';
        const date = item.isoDate || item.pubDate || new Date().toISOString();
        const summary = item.contentSnippet || item.content || item.summary || '';
        let img = (item.enclosure && item.enclosure.url) || (item.image && item.image.url) || item.itunes?.image || null;

        if (!img && link && pageFetchCount < limitPageFetch) {
          img = await fetchImageFromPage(link);
          pageFetchCount++;
        }

        items.push({
          id: Buffer.from(`${source.name}:${link}`).toString('base64'),
          title: item.title || 'Tanpa judul',
          summary: summary || 'Baca selengkapnya di sumber terkait.',
          img: img || PLACEHOLDER_IMG,
          kategori: source.kategori,
          source: source.name,
          link,
          date,
        });
      }
    } catch (e) {
      // Abaikan error per-sumber
      continue;
    }
  }

  // Urutkan terbaru
  items.sort((a, b) => new Date(b.date) - new Date(a.date));

  cache = { items, lastUpdate: new Date().toISOString(), ts: Date.now() };
  return cache;
}

module.exports = {
  fetchFeeds,
  PLACEHOLDER_IMG,
};