// "Add your equation" submissions from the Eilan Equations book. Forwards to the owner's email through Web3Forms (free),
// so the owner can review each equation before it is published for everyone (books/eq/community.js).
const FIELDS = ['name', 'formula', 'how', 'subject', 'by', 'show', 'contact', 'lang'];
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.status(405).json({ error: 'POST only' }); return; }
  // Web3Forms access keys are public by design (they only send to the owner's email).
  const key = process.env.WEB3FORMS_KEY || '9931f90d-22da-4d79-a61f-ac5a98f52717';
  let b;
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); }
  catch (e) { res.status(400).json({ ok: false, error: 'bad request body' }); return; }
  if (!String(b.name || '').trim() || !String(b.formula || '').trim()) { res.status(400).json({ ok: false, error: 'missing fields' }); return; }
  const data = { access_key: key, subject: 'معادلة جديدة لكتاب إيلان — ' + String(b.name || '').slice(0, 60), from_name: 'EILAN DOLL — Equations' };
  for (const f of FIELDS) data[f] = String(b[f] || '').slice(0, 1500);
  data.review = 'للنشر: قولي للفريق «اعتمد المعادلة» وتنضاف في books/eq/community.js. الاسم يظهر فقط إذا show = yes.';
  try {
    const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
    const j = await r.json().catch(() => ({}));
    res.status(r.ok && j.success !== false ? 200 : 502).json({ ok: r.ok && j.success !== false });
  } catch (e) { res.status(502).json({ ok: false }); }
};
