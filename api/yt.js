// Latest videos of a YouTube channel, from YouTube's public RSS feed (no API key, free).
// GET /api/yt?ch=UCxxxxxxxxxxxxxxxxxxxxxx  ->  {ch,name,videos:[{id,title,published,short?}]}
// GET /api/yt?u=<channel link, @handle or video link>  ->  same, plus {v} when a video link was given
// Handled failures answer 200 with {error:'not_found'|'unavailable'} so the visitor's console stays quiet;
// the page shows a friendly message instead.
const UA = { 'User-Agent': 'Mozilla/5.0 (EilanWatch/1.0)', 'Accept-Language': 'en-US,en;q=0.8', Cookie: 'CONSENT=YES+1; SOCS=CAI' };
const CH_RE = /^UC[\w-]{22}$/;
const TIMEOUT_MS = 8000; // one YouTube request never waits longer than this
const BUDGET_MS = 9000;  // all YouTube requests of one call together
const dec = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

class Unavailable extends Error {}

// fetch with a hard time limit (and within the call's overall budget)
async function get(url, headers, deadline) {
  const left = Math.min(TIMEOUT_MS, deadline - Date.now());
  if (left < 500) throw new Unavailable('timeout');
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), left);
  try {
    const r = await fetch(url, { headers, redirect: 'follow', signal: ctl.signal });
    const text = await r.text();
    return { ok: r.ok, status: r.status, url: r.url || url, text };
  } catch (e) {
    throw new Unavailable('fetch');
  } finally {
    clearTimeout(t);
  }
}

// YouTube sometimes answers with a cookie-consent page ("Before you continue") instead of the content
const isConsent = (res) => /(^|\/\/)consent\.(youtube|google)\.com/.test(res.url) || /consent\.(youtube|google)\.com/.test(res.text.slice(0, 50000));

// Only ever fetches pages on https://www.youtube.com (fixed host) to find the channel id.
async function idFromPage(path, deadline) {
  const r = await get('https://www.youtube.com' + path, UA, deadline);
  if (r.status === 404) return null;
  const h = r.text;
  const m = h.match(/"externalId":"(UC[\w-]{22})"/) || h.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/)
    || h.match(/<meta itemprop="(?:channelId|identifier)" content="(UC[\w-]{22})"/) || h.match(/"channelId":"(UC[\w-]{22})"/);
  if (m) return m[1];
  if (!r.ok || isConsent(r)) throw new Unavailable('page ' + r.status);
  return null;
}

// Only real YouTube input: a UC… id, an @handle, or a youtube.com / youtu.be link. Plain words are refused.
const looksYt = s => /^@[^\s/?#@]{1,100}$/.test(s) || CH_RE.test(s) || /^(?:https?:\/\/)?(?:(?:www|m|music)\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)(?:[/?#]|$)/i.test(s);
const safeDec = x => { try { return decodeURIComponent(x); } catch (e) { return x; } };

// Turn whatever the visitor pasted into {ch, v}
async function resolve(raw, deadline) {
  const s = String(raw || '').trim().slice(0, 300);
  if (!s || !looksYt(s)) return {};
  let m = s.match(/(?:^|\/channel\/)(UC[\w-]{22})(?:$|[/?#])/);
  if (m) return { ch: m[1] };
  m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|embed|live|v)\/)([\w-]{11})(?![\w-])/);
  if (m) {
    const v = m[1];
    try { return { ch: await idFromPage('/watch?v=' + v, deadline), v }; } catch (e) { return { v, err: e }; }
  }
  m = s.match(/(?:^|youtube\.com\/)@([^/?#\s]{1,100})/i);
  if (m) return { ch: await idFromPage('/@' + encodeURIComponent(safeDec(m[1])), deadline) };
  m = s.match(/youtube\.com\/(c|user)\/([^/?#\s]{1,100})/i);
  if (m) return { ch: await idFromPage('/' + m[1].toLowerCase() + '/' + encodeURIComponent(safeDec(m[2])), deadline) };
  m = s.match(/youtube\.com\/([^/?#\s]{1,100})\/?$/i);
  if (m && !/^(watch|results|feed|playlist|channel|shorts|embed)$/i.test(m[1])) return { ch: await idFromPage('/' + encodeURIComponent(safeDec(m[1])), deadline) };
  return {};
}

function fail(res, error, extra) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(Object.assign({ error }, extra || {}));
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const deadline = Date.now() + BUDGET_MS;
  let ch = String(q.ch || '').trim(), v;
  try {
    if (!ch && q.u) {
      const r = await resolve(q.u, deadline);
      ch = r.ch || ''; v = r.v;
      if (!CH_RE.test(ch)) { fail(res, r.err ? 'unavailable' : 'not_found', v ? { v } : null); return; }
    }
    if (!CH_RE.test(ch)) { res.status(400).json({ error: 'bad channel id' }); return; }
    const r = await get('https://www.youtube.com/feeds/videos.xml?channel_id=' + ch, { 'User-Agent': 'EilanWatch/1.0' }, deadline);
    if (r.status === 404) { fail(res, 'not_found', v ? { v } : null); return; }
    const xml = r.text;
    // anything that is not an Atom feed (consent page, error page, HTML) is treated as "YouTube unavailable"
    if (!r.ok || !/<feed[\s>]/.test(xml.slice(0, 2000))) { fail(res, 'unavailable', v ? { ch, v } : { ch }); return; }
    const parts = xml.split('<entry>');
    const name = dec((parts[0].match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]).trim();
    const videos = [];
    for (const e of parts.slice(1)) {
      const id = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
      if (!id) continue;
      const title = dec((e.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
      const published = (e.match(/<published>([^<]+)<\/published>/) || [, ''])[1];
      const item = { id, title, published };
      if (/youtube\.com\/shorts\//.test(e)) item.short = true; // kept (some channels are mostly Shorts); the page lists long videos first
      videos.push(item);
    }
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json(v ? { ch, name, v, videos } : { ch, name, videos });
  } catch (err) {
    fail(res, 'unavailable', v ? { v } : null);
  }
};
