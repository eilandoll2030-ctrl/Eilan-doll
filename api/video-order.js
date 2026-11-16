// Launch-video orders on Vercel. Forwards to the owner's email through Web3Forms (free).
// Accepts only the known form fields. The subject always starts with «طلب فيديو إيلان» so the
// video-orders routine can find new orders in the inbox.
const FIELDS = ['order', 'name', 'email', 'whatsapp', 'project', 'url', 'style', 'colors', 'notes'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }
  // Web3Forms access keys are public by design (they only send to the owner's email).
  const key = process.env.WEB3FORMS_KEY || '9931f90d-22da-4d79-a61f-ac5a98f52717';
  let b;
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); }
  catch (e) { res.status(400).json({ ok: false, error: 'bad request body' }); return; }
  if (!String(b.url || '').trim() || !String(b.email || '').trim()) { res.status(400).json({ ok: false, error: 'missing fields' }); return; }
  const data = {
    access_key: key,
    subject: 'طلب فيديو إيلان — ' + String(b.project || '').slice(0, 60) + ' — ' + String(b.order || '').slice(0, 20),
    from_name: 'EILAN DOLL — Video orders'
  };
  for (const f of FIELDS) data[f] = String(b[f] || '').slice(0, 1000);
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) data.replyto = data.email;
  try {
    const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
    const j = await r.json().catch(() => ({}));
    res.status(r.ok && j.success !== false ? 200 : 502).json({ ok: r.ok && j.success !== false });
  } catch (e) { res.status(502).json({ ok: false }); }
};
