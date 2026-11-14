// Universal YouTube channel & video resolver + public RSS feed reader (no API key, free).
// GET /api/yt?ch=UCxxxxxxxxxxxxxxxxxxxxxx  ->  {ch, name, videos:[{id,title,published,short?}]}
// GET /api/yt?u=<channel link, @handle, video link, or channel name> -> {ch, name, handle?, v?, videos, matches?}
// GET /api/yt?q=<channel search query>     ->  {matches:[{ch, name, handle}]}
// Handled lookup misses answer 200 with {error:'not_found'|'unavailable'} to keep the browser console clean.

const UA = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
  Cookie: 'CONSENT=YES+1; SOCS=CAI',
};
const CH_RE = /^UC[\w-]{22}$/;
const VID_RE = /^[\w-]{11}$/;
const TIMEOUT_MS = 8000;
const BUDGET_MS = 9500;

const dec = s => String(s || '')
  .replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'");

class Unavailable extends Error {}

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

const isConsent = res =>
  /(^|\/\/)consent\.(youtube|google)\.com/.test(res.url) ||
  /consent\.(youtube|google)\.com/.test(res.text.slice(0, 50000));

const safeDec = x => {
  try { return decodeURIComponent(x); } catch (e) { return x; }
};

// Fixed host https://www.youtube.com ONLY to prevent any SSRF.
async function idFromPage(ytPath, deadline) {
  const r = await get('https://www.youtube.com' + ytPath, UA, deadline);
  if (r.status === 404) return null;
  const h = r.text;
  const m =
    h.match(/"externalId":"(UC[\w-]{22})"/) ||
    h.match(/<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[\w-]{22})"/) ||
    h.match(/<meta itemprop="(?:channelId|identifier)" content="(UC[\w-]{22})"/) ||
    h.match(/"browseId":"(UC[\w-]{22})"/) ||
    h.match(/"channelId":"(UC[\w-]{22})"/);
  if (m) return m[1];
  if (!r.ok || isConsent(r)) throw new Unavailable('page ' + r.status);
  return null;
}

function extractChannelsFromSearchHtml(html) {
  const out = [];
  const seen = new Set();
  const add = (ch, name, handle) => {
    if (!CH_RE.test(ch) || seen.has(ch)) return;
    seen.add(ch);
    out.push({
      ch,
      name: String(name || '').trim() || ch,
      handle: String(handle || '').trim(),
    });
  };

  const m = html.match(/var ytInitialData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
  if (m) {
    try {
      const walk = node => {
        if (!node || typeof node !== 'object' || out.length >= 8) return;
        if (node.channelRenderer && node.channelRenderer.channelId) {
          const cr = node.channelRenderer;
          const title =
            (cr.title && (cr.title.simpleText || (Array.isArray(cr.title.runs) && cr.title.runs.map(x => x.text).join('')))) || '';
          const base =
            (cr.navigationEndpoint && cr.navigationEndpoint.browseEndpoint && cr.navigationEndpoint.browseEndpoint.canonicalBaseUrl) || '';
          const handle = base.startsWith('/@') ? safeDec(base.slice(1)) : '';
          add(cr.channelId, title, handle);
          return;
        }
        if (Array.isArray(node)) {
          for (const item of node) {
            if (out.length >= 8) break;
            walk(item);
          }
        } else {
          for (const k of Object.keys(node)) {
            if (out.length >= 8) break;
            walk(node[k]);
          }
        }
      };
      walk(JSON.parse(m[1]));
    } catch (e) {}
  }

  if (!out.length) {
    const re = /"channelRenderer":\{"channelId":"(UC[\w-]{22})"[\s\S]{0,600}?"title":\{(?:"simpleText":"([^"]+)"|"runs":\[\{"text":"([^"]+)")/g;
    let rm;
    while ((rm = re.exec(html)) && out.length < 8) {
      add(rm[1], rm[2] || rm[3], '');
    }
  }
  return out;
}

// Search YouTube Channels filter (sp=EgIQAg%3D%3D) on fixed host www.youtube.com
async function searchChannels(query, deadline) {
  const clean = String(query || '').trim().slice(0, 120);
  if (!clean) return [];
  const r = await get(
    'https://www.youtube.com/results?search_query=' + encodeURIComponent(clean) + '&sp=EgIQAg%253D%253D',
    UA,
    deadline
  );
  if (!r.ok || isConsent(r)) throw new Unavailable('search ' + r.status);
  return extractChannelsFromSearchHtml(r.text);
}

const looksYtUrlOrHandle = s =>
  /^@[^\s/?#@]{1,100}$/.test(s) ||
  CH_RE.test(s) ||
  /^(?:https?:\/\/)?(?:(?:www|m|music)\.)?(?:youtube\.com|youtu\.be|youtube-nocookie\.com)(?:[/?#]|$)/i.test(s);

async function resolveInput(raw, deadline) {
  const s = String(raw || '').trim().slice(0, 300);
  if (!s) return {};

  let m = s.match(/(?:^|\/channel\/)(UC[\w-]{22})(?:$|[/?#])/);
  if (m) return { ch: m[1] };

  m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|embed|live|v)\/)([\w-]{11})(?![\w-])/);
  if (m) {
    const v = m[1];
    try {
      return { ch: await idFromPage('/watch?v=' + v, deadline), v };
    } catch (e) {
      return { v, err: e };
    }
  }

  m = s.match(/(?:^|youtube\.com\/)@([^/?#\s]{1,100})/i);
  if (m) {
    const handle = safeDec(m[1]);
    const ch = await idFromPage('/@' + encodeURIComponent(handle), deadline);
    if (ch) return { ch, handle: '@' + handle };
    const matches = await searchChannels(handle, deadline);
    if (matches.length) return { ch: matches[0].ch, handle: matches[0].handle, matches };
    return {};
  }

  m = s.match(/youtube\.com\/(c|user)\/([^/?#\s]{1,100})/i);
  if (m) {
    const ch = await idFromPage('/' + m[1].toLowerCase() + '/' + encodeURIComponent(safeDec(m[2])), deadline);
    return ch ? { ch } : {};
  }

  if (looksYtUrlOrHandle(s)) {
    m = s.match(/youtube\.com\/([^/?#\s]{1,100})\/?$/i);
    if (m && !/^(watch|results|feed|playlist|channel|shorts|embed)$/i.test(m[1])) {
      const ch = await idFromPage('/' + encodeURIComponent(safeDec(m[1])), deadline);
      if (ch) return { ch };
    }
    return {};
  }

  // Plain channel name (Arabic or English) -> search YouTube Channels!
  const matches = await searchChannels(s, deadline);
  if (matches.length) {
    return { ch: matches[0].ch, handle: matches[0].handle, matches };
  }
  return {};
}

async function fetchFeed(ch, deadline) {
  const r = await get(
    'https://www.youtube.com/feeds/videos.xml?channel_id=' + ch,
    { 'User-Agent': 'EilanWatch/1.0' },
    deadline
  );
  if (r.status === 404) return { error: 'not_found' };
  const xml = r.text;
  if (!r.ok || !/<feed[\s>]/.test(xml.slice(0, 2000))) return { error: 'unavailable' };
  const parts = xml.split('<entry>');
  const name = dec((parts[0].match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]).trim();
  const videos = [];
  for (const e of parts.slice(1)) {
    const id = (e.match(/<yt:videoId>([\w-]{11})<\/yt:videoId>/) || [])[1];
    if (!id) continue;
    const title = dec((e.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1]);
    const published = (e.match(/<published>([^<]+)<\/published>/) || [, ''])[1];
    const item = { id, title, published };
    if (/youtube\.com\/shorts\//.test(e)) item.short = true;
    videos.push(item);
  }
  return { name, videos };
}

function fail(res, error, extra) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json(Object.assign({ error }, extra || {}));
}

module.exports = async (req, res) => {
  const q = req.query || {};
  const deadline = Date.now() + BUDGET_MS;
  let ch = String(q.ch || '').trim();
  let v;
  let handle = '';
  let matches = null;

  try {
    if (q.q && !ch && !q.u) {
      const found = await searchChannels(q.q, deadline);
      res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=3600');
      res.status(200).json({ matches: found });
      return;
    }

    if (!ch && q.u) {
      const r = await resolveInput(q.u, deadline);
      ch = r.ch || '';
      v = VID_RE.test(r.v || '') ? r.v : undefined;
      handle = r.handle || '';
      matches = Array.isArray(r.matches) && r.matches.length > 1 ? r.matches : null;
      if (!CH_RE.test(ch)) {
        fail(res, r.err ? 'unavailable' : 'not_found', v ? { v } : null);
        return;
      }
    }

    if (!CH_RE.test(ch)) {
      res.status(400).json({ error: 'bad channel id' });
      return;
    }

    const feed = await fetchFeed(ch, deadline);
    if (feed.error) {
      // Even if the RSS feed failed temporarily, if we resolved `ch` from search/page, return its metadata so the embed playlist still plays!
      const fallbackName = (matches && matches[0] && matches[0].name) || '';
      if (fallbackName || v) {
        res.setHeader('Cache-Control', 'no-store');
        res.status(200).json(Object.assign(
          { ch, name: fallbackName, videos: [] },
          handle ? { handle } : null,
          v ? { v } : null,
          matches ? { matches } : null
        ));
        return;
      }
      fail(res, feed.error, Object.assign({ ch }, v ? { v } : null));
      return;
    }

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');
    res.status(200).json(Object.assign(
      { ch, name: feed.name, videos: feed.videos },
      handle ? { handle } : null,
      v ? { v } : null,
      matches ? { matches } : null
    ));
  } catch (err) {
    fail(res, 'unavailable', v ? { v } : null);
  }
};
