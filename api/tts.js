// Natural voice for the Eilan voice tour (Microsoft Azure AI Speech, free tier F0).
// The key lives ONLY in Vercel environment variables (AZURE_SPEECH_KEY, AZURE_SPEECH_REGION) — never in this public repo.
// On the free tier Azure stops at the monthly limit instead of charging; the page then falls back to the device voice.
const VOICES = new Set(['ar-SA-HamedNeural', 'ar-SA-ZariyahNeural', 'en-US-GuyNeural', 'en-US-JennyNeural']);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  const key = process.env.AZURE_SPEECH_KEY, region = process.env.AZURE_SPEECH_REGION;
  if (!key || !region) { res.status(503).json({ ok: false, error: 'voice not configured' }); return; }
  if (req.method !== 'POST') { res.status(405).json({ ok: false, error: 'POST only' }); return; }
  let b;
  try { b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}); } catch (e) { res.status(400).json({ ok: false }); return; }
  const text = String(b.text || '').trim().slice(0, 700);
  const voice = VOICES.has(b.voice) ? b.voice : 'ar-SA-HamedNeural';
  if (!text) { res.status(400).json({ ok: false, error: 'no text' }); return; }
  const lang = voice.slice(0, 5);
  const ssml = `<speak version="1.0" xml:lang="${lang}"><voice name="${voice}"><prosody rate="${lang === 'ar-SA' ? '-6%' : '0%'}">${esc(text)}</prosody></voice></speak>`;
  try {
    const r = await fetch(`https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`, {
      method: 'POST',
      headers: { 'Ocp-Apim-Subscription-Key': key, 'Content-Type': 'application/ssml+xml', 'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3', 'User-Agent': 'eilan-doll' },
      body: ssml
    });
    if (!r.ok) { res.status(r.status === 429 ? 429 : 502).json({ ok: false, status: r.status }); return; }
    const buf = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    res.status(200).send(buf);
  } catch (e) { res.status(502).json({ ok: false }); }
};
