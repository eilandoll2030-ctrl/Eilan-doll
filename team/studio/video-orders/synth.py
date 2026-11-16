"""Original, royalty-free 120 BPM launch track + UI sound effects, synthesized from scratch."""
import numpy as np, os
from scipy.io import wavfile
from scipy.signal import butter, lfilter

SR = 44100
rng = np.random.default_rng(7)
import sys
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'

def env(n, a=0.002, d=0.2):
    t = np.arange(n) / SR
    e = np.minimum(1, t / max(a, 1e-4)) * np.exp(-t / d)
    return e

def lp(x, f, o=2):
    b, a = butter(o, f / (SR / 2), 'low'); return lfilter(b, a, x)

def hp(x, f, o=2):
    b, a = butter(o, f / (SR / 2), 'high'); return lfilter(b, a, x)

def bp(x, lo, hi):
    b, a = butter(2, [lo / (SR / 2), hi / (SR / 2)], 'band'); return lfilter(b, a, x)

def kick(n=int(0.35 * SR)):
    t = np.arange(n) / SR
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(ph) * np.exp(-t * 9) + 0.15 * rng.standard_normal(n) * np.exp(-t * 200)

def clap(n=int(0.25 * SR)):
    x = rng.standard_normal(n)
    e = np.zeros(n)
    for o in (0, 0.009, 0.018):
        i = int(o * SR); e[i:] += np.exp(-np.arange(n - i) / SR * 30)
    return bp(x * e, 900, 5000) * 0.9

def hat(n=int(0.06 * SR)):
    return hp(rng.standard_normal(n), 7000) * np.exp(-np.arange(n) / SR * 70) * 0.35

def marimba(freq, n=int(0.45 * SR)):
    t = np.arange(n) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t * 30)
    return s * env(n, 0.001, 0.13)

def bell(freq, n=int(1.0 * SR)):
    t = np.arange(n) / SR
    s = (np.sin(2 * np.pi * freq * t) + 0.5 * np.sin(2 * np.pi * freq * 2.76 * t) * np.exp(-t * 4)
         + 0.25 * np.sin(2 * np.pi * freq * 5.4 * t) * np.exp(-t * 8))
    return s * env(n, 0.001, 0.35)

def bass(freq, n):
    t = np.arange(n) / SR
    s = np.sign(np.sin(2 * np.pi * freq * t)) * 0.5 + np.sin(2 * np.pi * freq * t)
    return lp(s, 600) * env(n, 0.004, 0.18)

def note(m): return 440 * 2 ** ((m - 69) / 12)

def add(buf, x, i, g=1.0):
    i = int(i)
    if i >= len(buf): return
    m = min(len(x), len(buf) - i); buf[i:i + m] += g * x[:m]

def music():
    bpm = 120; beat = 60 / bpm; bars = 26  # 52 s of groove + final hit
    total = int((bars * 4 * beat + 4) * SR)
    L = np.zeros(total); R = np.zeros(total)
    # C major-ish playful progression: C  Am  F  G
    prog = [(48, [60, 64, 67]), (45, [57, 60, 64]), (41, [53, 57, 60]), (43, [55, 59, 62])]
    mel = [72, 76, 79, 76, 74, 72, 74, 76]
    for b in range(bars):
        root, ch = prog[b % 4]
        for q in range(4):
            t0 = (b * 4 + q) * beat * SR
            add(L, kick(), t0, 0.9); add(R, kick(), t0, 0.9)
            if q in (1, 3):
                c = clap(); add(L, c, t0, 0.45); add(R, c, t0 + 40, 0.45)
            for e in (0, 0.5):
                h = hat(); add(L, h, t0 + e * beat * SR, 0.5 if e else 0.3); add(R, h, t0 + e * beat * SR + 30, 0.3 if e else 0.5)
            # bass on 8ths
            for e in (0, 0.5):
                bn = bass(note(root if e == 0 else root + 12), int(0.22 * SR))
                add(L, bn, t0 + e * beat * SR, 0.35); add(R, bn, t0 + e * beat * SR, 0.35)
            # marimba arpeggio 8ths
            for k, e in enumerate((0, 0.5)):
                m = marimba(note(ch[(q * 2 + k) % 3] + 12))
                add(L, m, t0 + e * beat * SR, 0.22); add(R, m, t0 + e * beat * SR + 200, 0.16)
        # bell melody every other bar, toy-like
        if b % 2 == 1 and b > 1:
            for k, mm in enumerate(mel[(b // 2) % 2 * 4:(b // 2) % 2 * 4 + 4]):
                bl = bell(note(mm + 12 if b % 4 == 3 else mm))
                add(L, bl, (b * 4 + k) * beat * SR, 0.12); add(R, bl, (b * 4 + k) * beat * SR + 300, 0.16)
        # small fill every 8 bars
        if b % 8 == 7:
            for s in range(4):
                add(L, clap(), ((b * 4 + 3) * beat + s * beat / 4) * SR, 0.3)
                add(R, clap(), ((b * 4 + 3) * beat + s * beat / 4) * SR, 0.3)
    # final hit + ring out
    tf = bars * 4 * beat * SR
    for x, g in ((kick(), 1.0), (clap(), 0.6)):
        add(L, x, tf, g); add(R, x, tf, g)
    for mm in (60, 64, 67, 72, 76):
        bl = bell(note(mm), int(3.5 * SR)); add(L, bl, tf, 0.16); add(R, bl, tf + 150, 0.16)
        bs = bass(note(36), int(1.5 * SR)); add(L, bs, tf, 0.08); add(R, bs, tf, 0.08)
    st = np.stack([L, R], 1)
    st = st / np.max(np.abs(st)) * 0.89
    os.makedirs(f'{OUT}/assets', exist_ok=True)
    wavfile.write(f'{OUT}/assets/music.wav', SR, (st * 32767).astype(np.int16))

def sfx():
    d = f'{OUT}/sfx'; os.makedirs(d, exist_ok=True)
    def save(name, x):
        x = x / (np.max(np.abs(x)) + 1e-9) * 0.8
        wavfile.write(f'{d}/{name}.wav', SR, (x * 32767).astype(np.int16))
    def tone(f0, f1, dur, dec, shape='sin'):
        n = int(dur * SR); t = np.arange(n) / SR
        f = f0 * (f1 / f0) ** (t / dur); ph = 2 * np.pi * np.cumsum(f) / SR
        s = np.sin(ph) if shape == 'sin' else np.sign(np.sin(ph)) * 0.6
        return s * env(n, 0.002, dec)
    n = lambda s: int(s * SR)
    # typing: a few soft taps
    ty = np.zeros(n(0.9))
    for i in range(7):
        add(ty, bp(rng.standard_normal(n(0.03)), 1500, 6000) * env(n(0.03), 0.0005, 0.008), i * 0.12 * SR + rng.integers(0, 1500), 0.7 + 0.3 * rng.random())
    save('typing', ty)
    save('send', tone(600, 1400, 0.18, 0.07))
    save('receive', tone(880, 880, 0.12, 0.05) + np.pad(tone(1320, 1320, 0.16, 0.07), (n(0.07), 0))[:n(0.12)] if False else np.concatenate([tone(880, 880, 0.07, 0.04), tone(1320, 1320, 0.2, 0.08)]))
    save('hop', tone(300, 900, 0.12, 0.05))
    save('drop', tone(700, 200, 0.15, 0.06))
    save('tick', bp(rng.standard_normal(n(0.03)), 2000, 8000) * env(n(0.03), 0.0005, 0.006))
    save('click', bp(rng.standard_normal(n(0.05)), 800, 4000) * env(n(0.05), 0.0005, 0.01) + 0.4 * tone(1800, 1800, 0.05, 0.01))
    ch = np.zeros(n(0.4))
    for o in (0, 0.13):
        add(ch, lp(rng.standard_normal(n(0.09)), 1800) * env(n(0.09), 0.002, 0.03) + 0.6 * tone(220, 120, 0.09, 0.03)[:n(0.09)], o * SR)
    save('chomp', ch)
    wn = rng.standard_normal(n(0.45)); tt = np.linspace(0, 1, n(0.45))
    save('whoosh', bp(wn, 400, 3000) * np.sin(np.pi * tt) ** 2)
    save('slap', lp(rng.standard_normal(n(0.12)), 3000) * env(n(0.12), 0.0005, 0.025) + 0.5 * tone(160, 80, 0.12, 0.04))
    nb = n(0.5); t = np.arange(nb) / SR
    save('boing', np.sin(2 * np.pi * np.cumsum(220 + 160 * np.sin(2 * np.pi * 9 * t) * np.exp(-t * 4)) / SR) * env(nb, 0.002, 0.2))
    save('stamp', 0.9 * tone(120, 50, 0.25, 0.08) + lp(rng.standard_normal(n(0.25)), 1500) * env(n(0.25), 0.0005, 0.03))
    sc = np.zeros(n(0.6))
    for i in range(6):
        add(sc, bp(rng.standard_normal(n(0.08)), 2500, 7000) * np.sin(np.pi * np.linspace(0, 1, n(0.08))), i * 0.09 * SR)
    save('scribble', sc)
    save('poof', lp(rng.standard_normal(n(0.35)), 2500) * env(n(0.35), 0.01, 0.08))
    save('pop', tone(400, 1100, 0.09, 0.03))
    nr = n(2.0); tr = np.linspace(0, 1, nr)
    save('riser', bp(rng.standard_normal(nr), 500, 6000) * tr ** 2 + 0.3 * tone(200, 1200, 2.0, 5.0) * tr)
    save('chime', bell(note(84), n(1.4)) + 0.6 * np.pad(bell(note(91), n(1.28)), (n(0.12), 0))[:n(1.4)])

music(); sfx(); print('done')
