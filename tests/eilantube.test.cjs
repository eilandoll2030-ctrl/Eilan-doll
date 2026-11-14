const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const yt = require(path.join(ROOT, 'api', 'yt.js'));
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

function mockRes() {
  return {
    code: 200,
    headers: {},
    body: null,
    setHeader(k, v) { this.headers[k] = v; },
    status(c) { this.code = c; return this; },
    json(b) { this.body = b; return this; },
  };
}

const SAMPLE_FEED = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns:yt="http://www.youtube.com/xml/schemas/2015" xmlns="http://www.w3.org/2005/Atom">
 <title>ثمانية · Thmanyah</title>
 <entry>
  <yt:videoId>dQw4w9WgXcQ</yt:videoId>
  <title>وثائقي القهوة &amp; الحجاز</title>
  <link rel="alternate" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"/>
  <published>2026-10-01T12:00:00+00:00</published>
 </entry>
 <entry>
  <yt:videoId>abcDEF12345</yt:videoId>
  <title>مقطع قصير</title>
  <link rel="alternate" href="https://www.youtube.com/shorts/abcDEF12345"/>
  <published>2026-10-02T12:00:00+00:00</published>
 </entry>
</feed>`;

const SAMPLE_SEARCH_HTML = `<html><body><script>var ytInitialData = {"contents":{"itemSectionRenderer":{"contents":[{"channelRenderer":{"channelId":"UCQPalfEYxVLs8nEB4LutApQ","title":{"simpleText":"ثمانية"},"navigationEndpoint":{"browseEndpoint":{"canonicalBaseUrl":"/@thmanyah"}}}},{"channelRenderer":{"channelId":"UCj-2hfXdYPPNcLqcBeW3y8g","title":{"runs":[{"text":"رياضة ثمانية"}]},"navigationEndpoint":{"browseEndpoint":{"canonicalBaseUrl":"/@thmanyahsports"}}}}]}}};</script></body></html>`;

(async () => {
  // 1. Verify SEED.channels in index.html
  const seedStart = html.indexOf('/*SEED*/') + '/*SEED*/'.length;
  const seedEnd = html.indexOf('/*SEED_END*/', seedStart);
  const seed = JSON.parse(html.slice(seedStart, seedEnd));
  assert(Array.isArray(seed.channels) && seed.channels.length >= 22, 'Expected >= 22 verified channels in SEED');
  const seenCh = new Set();
  for (const c of seed.channels) {
    assert(/^UC[\w-]{22}$/.test(c.ch), 'Invalid UC ID: ' + c.ch);
    assert(!seenCh.has(c.ch), 'Duplicate UC ID: ' + c.ch);
    seenCh.add(c.ch);
  }
  console.log('PASS index.html: 22 unique verified UC channels + open launcher markup');

  // 2. Verify api/yt.js endpoints & SSRF lock
  const origFetch = global.fetch;
  const calledUrls = [];
  global.fetch = async (url) => {
    calledUrls.push(url);
    assert(url.startsWith('https://www.youtube.com/'), 'SSRF violation: ' + url);
    if (url.includes('/feeds/videos.xml')) {
      return { ok: true, status: 200, url, text: async () => SAMPLE_FEED };
    }
    if (url.includes('/@thmanyah')) {
      return { ok: true, status: 200, url, text: async () => '<meta itemprop="channelId" content="UCQPalfEYxVLs8nEB4LutApQ">' };
    }
    if (url.includes('/watch?v=vid12345678')) {
      return { ok: true, status: 200, url, text: async () => '"externalId":"UCQPalfEYxVLs8nEB4LutApQ"' };
    }
    if (url.includes('/results?search_query=')) {
      return { ok: true, status: 200, url, text: async () => SAMPLE_SEARCH_HTML };
    }
    return { ok: false, status: 404, url, text: async () => 'Not found' };
  };

  try {
    let res = mockRes();
    await yt({ query: { ch: 'UCQPalfEYxVLs8nEB4LutApQ' } }, res);
    assert.strictEqual(res.code, 200);
    assert.strictEqual(res.body.videos.length, 2);
    assert.strictEqual(res.body.videos[0].short, undefined);
    assert.strictEqual(res.body.videos[1].short, true);

    res = mockRes();
    await yt({ query: { u: '@thmanyah' } }, res);
    assert.strictEqual(res.body.ch, 'UCQPalfEYxVLs8nEB4LutApQ');

    res = mockRes();
    await yt({ query: { u: 'https://youtu.be/vid12345678' } }, res);
    assert.strictEqual(res.body.ch, 'UCQPalfEYxVLs8nEB4LutApQ');
    assert.strictEqual(res.body.v, 'vid12345678');

    res = mockRes();
    await yt({ query: { u: 'ثمانية' } }, res);
    assert.strictEqual(res.body.ch, 'UCQPalfEYxVLs8nEB4LutApQ');
    assert.strictEqual(res.body.matches.length, 2);

    res = mockRes();
    await yt({ query: { q: 'ثمانية' } }, res);
    assert.strictEqual(res.body.matches.length, 2);

    res = mockRes();
    await yt({ query: { u: 'https://evil.example.com/@attack' } }, res);
    assert(calledUrls.every(u => u.startsWith('https://www.youtube.com/')));
    console.log('PASS api/yt.js: ch, @handle, video link, plain channel name search, and SSRF protection');
  } finally {
    global.fetch = origFetch;
  }
})();
