// Official Google Places API (New) Text Search. OFF until the owner adds GOOGLE_PLACES_KEY in Vercel.
// Only "Pro" fields are requested (name, address, location, Maps link) to stay in the cheaper tier.
// Results are not cached, per Google's terms. The page must show Google attribution.
const CITY = { riyadh: 'الرياض', jeddah: 'جدة', makkah: 'مكة', madinah: 'المدينة المنورة', dammam: 'الدمام', khobar: 'الخبر', abha: 'أبها', taif: 'الطائف', alula: 'العلا', tabuk: 'تبوك' };
const CAT = { cafe: 'كافيه', restaurant: 'مطعم', park: 'حديقة', mall: 'مول', hotel: 'فندق' };
module.exports = async (req, res) => {
  const key = process.env.GOOGLE_PLACES_KEY;
  res.setHeader('Cache-Control', 'no-store');
  if (!key) { res.status(200).json({ off: true }); return; }
  const q = req.query || {};
  if (q.probe) { res.status(200).json({ on: true }); return; } // availability check, no Google call
  if (!CITY[q.city] || !CAT[q.cat]) { res.status(400).json({ error: 'bad city or cat' }); return; }
  try {
    const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress,places.location,places.googleMapsUri' },
      body: JSON.stringify({ textQuery: CAT[q.cat] + ' في ' + CITY[q.city], languageCode: 'ar', regionCode: 'SA', pageSize: 20 })
    });
    if (!r.ok) { res.status(502).json({ error: 'google ' + r.status }); return; }
    const j = await r.json();
    const places = (j.places || []).map(p => ({ id: 'g' + p.id, name: p.displayName && p.displayName.text, lat: p.location && p.location.latitude, lng: p.location && p.location.longitude, addr: p.formattedAddress || '', gmaps: p.googleMapsUri || '' })).filter(p => p.name);
    res.status(200).json({ places });
  } catch (err) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
