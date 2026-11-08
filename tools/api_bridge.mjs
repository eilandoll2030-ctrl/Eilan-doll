// جسر تشغيل دوال Vercel (api/*.js) داخل سيرفر المعاينة المحلي.
// يقرأ طلبًا واحدًا من stdin (JSON) ويكتب الرد على stdout (JSON) — عملية منفصلة لكل طلب.
//
//   echo '{"method":"GET","url":"/api/yt?ch=UC...","headers":{},"body":""}' \
//     | node tools/api_bridge.mjs yt
//
// الغرض: المعاينة تتصرّف مثل الإنتاج (نفس الملفات، نفس الردود) بدون Vercel.
import path from 'node:path';

const name = process.argv[2] || '';
const OUT = (status, headers, body) => {
  process.stdout.write(JSON.stringify({ status, headers, body: String(body ?? '') }));
};

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (d) => { raw += d; });
process.stdin.on('end', async () => {
  let req;
  try { req = JSON.parse(raw || '{}'); } catch { return OUT(400, {}, JSON.stringify({ error: 'bad bridge payload' })); }

  let fn;
  try {
    const mod = await import(path.join(process.cwd(), 'api', `${name}.js`));
    fn = mod.default || mod;
    if (typeof fn !== 'function') throw new Error('not a function');
  } catch (e) {
    return OUT(500, { 'Content-Type': 'application/json' }, JSON.stringify({ error: 'function load failed', detail: String(e.message) }));
  }

  // بناء كائنات req/res بأقل قدر يكفي دوالنا (query / body / headers / status / json / send / end).
  const u = new URL(req.url || '/', 'http://localhost');
  const query = Object.fromEntries(u.searchParams.entries());

  const headers = {};
  const res = {
    statusCode: 200,
    headersSent: false,
    setHeader(k, v) { headers[k.toLowerCase()] = String(v); return res; },
    getHeader(k) { return headers[k.toLowerCase()]; },
    status(code) { res.statusCode = code; return res; },
    json(obj) { headers['content-type'] = 'application/json; charset=utf-8'; finish(JSON.stringify(obj)); },
    send(v) { finish(typeof v === 'string' ? v : JSON.stringify(v)); },
    end(v) { finish(v === undefined ? '' : typeof v === 'string' ? v : JSON.stringify(v)); },
  };

  let sent = false;
  function finish(body) {
    if (sent) return;
    sent = true;
    OUT(res.statusCode, headers, body);
  }

  // حماية: لا نعلّق الطلب للأبد إن تأخّر مصدر خارجي.
  const timer = setTimeout(() => finish(JSON.stringify({ error: 'timeout in preview' })), 12000);
  const done = () => clearTimeout(timer);
  res.json = ((orig) => (o) => { done(); return orig(o); })(res.json);
  res.send = ((orig) => (v) => { done(); return orig(v); })(res.send);
  res.end = ((orig) => (v) => { done(); return orig(v); })(res.end);

  const request = {
    method: (req.method || 'GET').toUpperCase(),
    url: req.url,
    query,
    headers: req.headers || {},
    body: req.body ?? '',
  };

  try {
    await fn(request, res);
    setTimeout(() => finish(''), 50); // لو الدالة لم تُنهِ الرد
  } catch (e) {
    finish(JSON.stringify({ error: 'function threw', detail: String(e.message) }));
  }
});
