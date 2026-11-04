// Places from OpenStreetMap (free, ODbL — the page must show "© OpenStreetMap contributors").
// GET /api/osm?city=riyadh&cat=cafe  ->  {places:[{id,name,lat,lng,addr,hours,web}]}
// The query is built only from fixed lists below, never from raw user text.
const CITIES = {
  riyadh: [24.55, 46.50, 24.95, 46.90], jeddah: [21.40, 39.10, 21.75, 39.30],
  makkah: [21.33, 39.75, 21.48, 39.92], madinah: [24.40, 39.50, 24.55, 39.70],
  dammam: [26.35, 49.95, 26.50, 50.20], khobar: [26.20, 50.15, 26.33, 50.25],
  abha: [18.17, 42.45, 18.27, 42.55], taif: [21.22, 40.35, 21.33, 40.48],
  alula: [26.55, 37.85, 26.68, 37.98], tabuk: [28.33, 36.50, 28.45, 36.63]
};
const CATS = {
  cafe: '["amenity"="cafe"]', restaurant: '["amenity"="restaurant"]',
  park: '["leisure"="park"]', mall: '["shop"="mall"]', hotel: '["tourism"="hotel"]'
};
module.exports = async (req, res) => {
  const q = req.query || {};
  const box = CITIES[q.city], tag = CATS[q.cat];
  if (!box || !tag) { res.status(400).json({ error: 'bad city or cat' }); return; }
  const bb = box.join(',');
  const ql = `[out:json][timeout:25];(node${tag}["name"](${bb});way${tag}["name"](${bb}););out center 80;`;
  try {
    const r = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'EilanDoll/1.0 (eilan doll website)' },
      body: 'data=' + encodeURIComponent(ql)
    });
    if (!r.ok) { res.status(502).json({ error: 'osm ' + r.status }); return; }
    const j = await r.json();
    const places = (j.elements || []).map(e => {
      const t = e.tags || {}, lat = e.lat ?? (e.center && e.center.lat), lng = e.lon ?? (e.center && e.center.lon);
      const addr = [t['addr:street'], t['addr:district'] || t['addr:suburb']].filter(Boolean).join('، ');
      const web = /^https?:\/\//i.test(t.website || '') ? t.website : '';
      return { id: e.type[0] + e.id, name: t['name:ar'] || t.name, en: t['name:en'] || '', lat, lng, addr, hours: t.opening_hours || '', web };
    }).filter(p => p.name && p.lat != null);
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=604800');
    res.status(200).json({ places });
  } catch (err) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
