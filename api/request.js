// "Add your business" requests on Vercel. Forwards to the owner's email through Web3Forms (free).
// Accepts only the known form fields.
const FIELDS = ['order', 'name', 'cat', 'city', 'location', 'whatsapp', 'ig', 'desc', 'plan', 'account'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }
  // Web3Forms access keys are public by design (they only send to the owner's email).
  const key = process.env.WEB3FORMS_KEY || '9931f90d-22da-4d79-a61f-ac5a98f52717';
  if (!key) { res.status(503).json({ off: true }); return; }
  let b;
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); }
  catch (e) { res.status(400).json({ ok: false, error: 'bad request body' }); return; }
  const data = { access_key: key, subject: 'طلب إضافة مشروع — إيلان دول ' + String(b.order || '').slice(0, 40), from_name: 'EILAN DOLL' };
  for (const f of FIELDS) data[f] = String(b[f] || '').slice(0, 1000);
  try {
    const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
    const j = await r.json().catch(() => ({}));
    res.status(r.ok && j.success !== false ? 200 : 502).json({ ok: r.ok && j.success !== false });
  } catch (e) { res.status(502).json({ ok: false }); }
};
