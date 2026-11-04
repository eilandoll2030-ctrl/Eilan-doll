// Latest videos of a YouTube channel, from YouTube's public RSS feed (no API key, free).
// GET /api/yt?ch=UCxxxxxxxxxxxxxxxxxxxxxx  ->  {videos:[{id,title,published}]}
module.exports = async (req, res) => {
  const ch = String((req.query && req.query.ch) || '').trim();
  if (!/^UC[\w-]{22}$/.test(ch)) { res.status(400).json({ error: 'bad channel id' }); return; }
  try {
    const r = await fetch('https://www.youtube.com/feeds/videos.xml?channel_id=' + ch, { headers: { 'User-Agent': 'EilanWatch/1.0' } });
    if (!r.ok) { res.status(502).json({ error: 'feed ' + r.status }); return; }
    const xml = await r.text();
    const dec = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
    const videos = [];
    for (const e of xml.split('<entry>').slice(1)) {
      const id = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
      if (!id) continue;
      if (/youtube\.com\/shorts\//.test(e)) continue; // skip Shorts
      const title = dec((e.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
      const published = (e.match(/<published>([^<]+)<\/published>/) || [, ''])[1];
      videos.push({ id, title, published });
    }
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json({ videos });
  } catch (err) {
    res.status(502).json({ error: 'fetch failed' });
  }
};
