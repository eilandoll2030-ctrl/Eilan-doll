// Latest videos of a YouTube channel, from YouTube's public RSS feed (no API key, free).
// GET /api/yt?ch=UCxxxxxxxxxxxxxxxxxxxxxx  ->  {ch,name,videos:[{id,title,published}]}
// GET /api/yt?u=<any channel link, @handle or video link>  ->  same, plus {v} when a video link was given
const UA = { 'User-Agent': 'Mozilla/5.0 (EilanWatch/1.0)', 'Accept-Language': 'en-US,en;q=0.8', Cookie: 'CONSENT=YES+1; SOCS=CAI' };
const CH_RE = /^UC[\w-]{22}$/;
const dec = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");

// Only ever fetches pages on https://www.youtube.com (fixed host) to find the channel id.
async function idFromPage(path) {
  const r = await fetch('https://www.youtube.com' + path, { headers: UA, redirect: 'follow' });
  if (!r.ok) return null;
  const h = await r.text();
  const m = h.match(/"externalId":"(UC[\w-]{22})"/) || h.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/)
    || h.match(/<meta itemprop="(?:channelId|identifier)" content="(UC[\w-]{22})"/) || h.match(/"channelId":"(UC[\w-]{22})"/);
  return m ? m[1] : null;
}

// Turn whatever the visitor pasted into {ch, v}
async function resolve(raw) {
  let s = String(raw || '').trim().slice(0, 300);
  if (!s) return {};
  let m = s.match(/(?:^|\/channel\/)(UC[\w-]{22})(?:$|[/?#])/);
  if (m) return { ch: m[1] };
  m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|embed|live|v)\/)([\w-]{11})(?![\w-])/);
  if (m) return { ch: await idFromPage('/watch?v=' + m[1]), v: m[1] };
  m = s.match(/(?:^|youtube\.com\/)@([^/?#\s]{1,100})/i);
  if (m) return { ch: await idFromPage('/@' + encodeURIComponent(decodeURIComponent(m[1]))) };
  m = s.match(/youtube\.com\/(c|user)\/([^/?#\s]{1,100})/i);
  if (m) return { ch: await idFromPage('/' + m[1].toLowerCase() + '/' + encodeURIComponent(decodeURIComponent(m[2]))) };
  m = s.match(/youtube\.com\/([^/?#\s]{1,100})\/?$/i);
  if (m && !/^(watch|results|feed|playlist|channel|shorts|embed)$/i.test(m[1])) return { ch: await idFromPage('/' + encodeURIComponent(decodeURIComponent(m[1]))) };
  if (/^[\w.\-؀-ۿ]{3,100}$/.test(s)) return { ch: await idFromPage('/@' + encodeURIComponent(s)) }; // bare handle without @
  return {};
}

module.exports = async (req, res) => {
  const q = req.query || {};
  let ch = String(q.ch || '').trim(), v;
  try {
    if (!ch && q.u) {
      const r = await resolve(q.u);
      ch = r.ch || ''; v = r.v;
      if (!CH_RE.test(ch)) { res.status(404).json({ error: 'channel not found', v: v || undefined }); return; }
    }
    if (!CH_RE.test(ch)) { res.status(400).json({ error: 'bad channel id' }); return; }
    const r = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + ch, { headers: { 'User-Agent': 'EilanWatch/1.0' } });
    if (!r.ok) { res.status(502).json({ error: 'feed ' + r.status }); return; }
    const xml = await r.text();
    const parts = xml.split('<entry>');
    const name = dec((parts[0].match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]).trim();
    const videos = [];
    for (const e of parts.slice(1)) {
      const id = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
      if (!id) continue;
      if (/youtube\.com\/shorts\//.test(e)) continue; // skip Shorts
      const title = dec((e.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
      const published = (e.match(/<published>([^<]+)<\/published>/) || [, ''])[1];
      videos.push({ id, title, published });
    }
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json(v ? { ch, name, v, videos } : { ch, name, videos });
  } catch (err) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
