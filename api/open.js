// «نوافذ إيلان» — one safe gateway to free public APIs (from the public-apis list).
// GET /api/open?src=<name>&...   The target URL is always built here from a fixed list;
// visitor text is only ever passed as an encoded query value, never as a host or path.
// No keys, no secrets. Each source's licence/credit is shown on /open.html.

const clip = (v, n = 80) => String(v == null ? '' : v).replace(/[\u0000-\u001f]/g, ' ').trim().slice(0, n);
const e = encodeURIComponent;
const num = (v, lo, hi, d) => { const n = parseInt(v, 10); return Number.isFinite(n) ? Math.min(hi, Math.max(lo, n)) : d; };
const cc = v => (/^[A-Za-z]{2}$/.test(v || '') ? v.toUpperCase() : '');
const cur = v => (/^[A-Za-z]{3}$/.test(v || '') ? v.toUpperCase() : '');

const SOURCES = {
  // Academy & library
  books: q => q.q && `https://openlibrary.org/search.json?q=${e(clip(q.q))}&limit=12&fields=key,title,author_name,first_publish_year,cover_i,language`,
  gutenberg: q => `https://gutendex.com/books/?search=${e(clip(q.q))}${/^(en|ar|fr|es|de)$/.test(q.lang || '') ? '&languages=' + q.lang : ''}`,
  dict: q => /^[A-Za-z][A-Za-z' -]{0,39}$/.test(q.word || '') && `https://api.dictionaryapi.dev/api/v2/entries/en/${e(q.word.trim().toLowerCase())}`,
  math: q => ['simplify', 'factor', 'derive', 'integrate', 'zeroes'].includes(q.op) && q.x &&
    `https://newton.vercel.app/api/v2/${q.op}/${e(clip(q.x, 120))}`,
  // Encyclopedia
  wiki: q => {
    const lang = q.lang === 'en' ? 'en' : 'ar';
    if (q.title) return `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${e(clip(q.title, 120).replace(/ /g, '_'))}`;
    return q.q && `https://${lang}.wikipedia.org/w/api.php?action=query&list=search&format=json&srlimit=8&srsearch=${e(clip(q.q))}`;
  },
  // Games
  trivia: q => `https://opentdb.com/api.php?amount=${num(q.n, 1, 20, 10)}&type=multiple${q.cat ? '&category=' + num(q.cat, 9, 32, 9) : ''}${/^(easy|medium|hard)$/.test(q.d || '') ? '&difficulty=' + q.d : ''}`,
  // Destinations
  countries: () => 'https://restcountries.com/v3.1/all?fields=name,cca2,capital,flags,region,subregion,population,currencies,languages,translations,timezones,latlng',
  holidays: q => cc(q.cc) && `https://date.nager.at/api/v3/PublicHolidays/${num(q.y, 2000, 2100, new Date().getFullYear())}/${cc(q.cc)}`,
  fx: q => `https://api.frankfurter.dev/v1/latest?base=${cur(q.base) || 'SAR'}`,
  fx2: q => `https://api.frankfurter.dev/v2/rates?base=${cur(q.base) || 'SAR'}`,
  // Studio (public-domain art only — filtered on the page and below)
  artic: q => `https://api.artic.edu/api/v1/artworks/search?q=${e(clip(q.q) || 'landscape')}&query[term][is_public_domain]=true&limit=12&fields=id,title,artist_title,date_display,image_id,is_public_domain`,
  met: q => `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${e(clip(q.q) || 'landscape')}`,
  metobj: q => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${num(q.id, 1, 99999999, 1)}`
};

// How long the edge may keep each answer (seconds)
const TTL = { countries: 604800, holidays: 604800, fx: 21600, fx2: 21600, trivia: 0, math: 86400 };

module.exports = async (req, res) => {
  const q = req.query || {};
  const make = SOURCES[q.src];
  const url = make && make(q);
  if (!url) { res.status(400).json({ error: 'bad request' }); return; }
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'EilanDoll/1.0 (eilan-doll.vercel.app)', Accept: 'application/json' } });
    if (!r.ok) { res.status(r.status === 404 ? 404 : 502).json({ error: 'source ' + r.status }); return; }
    const data = await r.json();
    const ttl = TTL[q.src] ?? 86400;
    res.setHeader('Cache-Control', ttl ? `s-maxage=${ttl}, stale-while-revalidate=${ttl * 4}` : 'no-store');
    res.status(200).json(data);
  } catch (err) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
