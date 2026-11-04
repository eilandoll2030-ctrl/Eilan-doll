// "Add your business" requests on Vercel. Forwards to the owner's email through Web3Forms (free).
// OFF until the owner adds WEB3FORMS_KEY in Vercel. Accepts only the known form fields.
const FIELDS = ['order', 'name', 'cat', 'city', 'location', 'whatsapp', 'ig', 'desc', 'plan', 'account'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }
  const key = process.env.WEB3FORMS_KEY;
  if (!key) { res.status(503).json({ off: true }); return; }
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const data = { access_key: key, subject: 'طلب إضافة مشروع — إيلان دول ' + String(b.order || '').slice(0, 40), from_name: 'EILAN DOLL' };
  for (const f of FIELDS) data[f] = String(b[f] || '').slice(0, 1000);
  try {
    const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
    const j = await r.json().catch(() => ({}));
    res.status(r.ok && j.success !== false ? 200 : 502).json({ ok: r.ok && j.success !== false });
  } catch (e) { res.status(502).json({ ok: false }); }
};
