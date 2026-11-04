"""Render the Eilan Doll game explainer videos.

  python3 games/video-src/render.py [game ...]     (default: all games)
Needs: python playwright (chromium), ffmpeg, numpy. Output: games/video/<game>.mp4 (1280x720, 30fps)
"""
import json, pathlib, re, subprocess, sys, threading, http.server, functools, os
import numpy as np
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[2]
SRC = (ROOT / "index.html").read_text(encoding="utf-8")
OUT = ROOT / "games" / "video"; OUT.mkdir(parents=True, exist_ok=True)
BUILD = ROOT / "games" / "video-src" / ".build"; BUILD.mkdir(exist_ok=True)
GAMES = ["guess", "memory", "xo", "catch", "snake", "lahad", "family", "bahar", "mashaer", "nisf"]
FPS, W, H = 30, 1280, 720

pat = json.loads(re.search(r"const CUBE_PAT=(\{.*?\});", SRC).group(1))
pat.update(json.loads(re.search(r"const GZC_PAT=(\{.*?\});", SRC).group(1)))
logo = re.search(r'const LOGO="(data:image/svg\+xml;base64,[^"]+)"', SRC).group(1)
tpl = (ROOT / "games/video-src/explainer.html").read_text(encoding="utf-8")
(BUILD / "explainer.html").write_text(tpl.replace("/*CUBE_PAT*/{}", json.dumps(pat)).replace('/*LOGO*/""', json.dumps(logo)), encoding="utf-8")


def music(path, dur):
    """soft pad + gentle pluck, Am–F–C–G, very low in the mix"""
    sr = 44100; t = np.arange(int(sr * dur)) / sr
    n2f = lambda m: 440 * 2 ** ((m - 69) / 12)
    chords = [[57, 60, 64], [53, 57, 60], [48, 52, 55], [55, 59, 62]]
    bar = 2.4; out = np.zeros_like(t)
    for i in range(int(dur / bar) + 1):
        ch = chords[i % 4]; s, e = i * bar, (i + 1) * bar + .6
        m = (t >= s) & (t < e); tt = t[m] - s
        env = np.minimum(1, tt / .5) * np.exp(-tt * .55)
        for nt in ch:
            f = n2f(nt)
            out[m] += .05 * env * (np.sin(2 * np.pi * f * tt) + .3 * np.sin(2 * np.pi * f * 2 * tt))
        for k, nt in enumerate([ch[0] + 12, ch[1] + 12, ch[2] + 12, ch[1] + 12]):
            ps = s + k * bar / 4; pm = (t >= ps) & (t < ps + 1.2); pt = t[pm] - ps
            out[pm] += .035 * np.exp(-pt * 4) * np.sin(2 * np.pi * n2f(nt) * pt)
    fade = np.minimum(1, np.minimum(t / 1.0, (dur - t) / 2.0)); out *= np.clip(fade, 0, 1)
    out = out / (np.abs(out).max() + 1e-9) * .32
    pcm = (np.stack([out, out], 1) * 32767).astype("<i2")
    import wave
    with wave.open(str(path), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes(pcm.tobytes())


def serve():
    class Q(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    h = functools.partial(Q, directory=str(ROOT))
    s = http.server.ThreadingHTTPServer(("127.0.0.1", 0), h)
    threading.Thread(target=s.serve_forever, daemon=True).start()
    return s.server_address[1]


def render(game, port):
    with sync_playwright() as p:
        b = p.chromium.launch(); pg = b.new_page(viewport={"width": W, "height": H})
        pg.goto(f"http://127.0.0.1:{port}/games/video-src/.build/explainer.html?g={game}")
        pg.wait_for_timeout(800); pg.evaluate("document.fonts.ready")
        dur = pg.evaluate("DURATION"); n = int(dur * FPS)
        tmp = BUILD / f"{game}.v.mp4"; wav = BUILD / f"{game}.wav"; final_tmp = BUILD / f"{game}.tmp.mp4"
        ff = subprocess.Popen(["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS), "-c:v", "mjpeg", "-i", "-",
                               "-c:v", "libx264", "-preset", "veryfast", "-crf", "22", "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(tmp)],
                              stdin=subprocess.PIPE)
        for i in range(n):
            pg.evaluate(f"render({i / FPS})")
            ff.stdin.write(pg.screenshot(type="jpeg", quality=92))
        ff.stdin.close(); assert ff.wait() == 0
        b.close()
    music(wav, n / FPS)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(tmp), "-i", str(wav), "-map", "0:v", "-map", "1:a", "-c:v", "copy",
                    "-c:a", "aac", "-b:a", "96k", "-shortest", "-movflags", "+faststart", str(final_tmp)], check=True)
    os.replace(final_tmp, OUT / f"{game}.mp4"); tmp.unlink(); wav.unlink()
    print("built", game, f"{n / FPS:.1f}s")


if __name__ == "__main__":
    port = serve()
    games = sys.argv[1:] or GAMES
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(4) as ex:
        list(ex.map(lambda g: render(g, port), games))
