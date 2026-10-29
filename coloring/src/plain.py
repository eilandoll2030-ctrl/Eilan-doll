"""plain.py - clean coloring page: just the line art and a name underneath.

No logo, no watermark, no frame, no spine. A4 300 dpi, pure black on white.
The brush-lettering name stays part of the artwork itself.
"""
import os
import cv2
import numpy as np
from PIL import Image

import artext as T

W, H = 2480, 3508            # A4 @ 300 dpi
MARGIN = 120                 # blank paper margin
NAME_BLOCK = 470             # reserved strip at the bottom for the name

INK = 0
GREY = 105

CHARACTERS = [
    dict(no='01', key='yuji',   art='art_01_yuji',   latin='YUJI',   full='YUJI ITADORI',    ar='يوجي إيتادوري'),
    dict(no='02', key='sukuna', art='art_02_sukuna', latin='SUKUNA', full='RYOMEN SUKUNA',   ar='ريومين سوكونا'),
    dict(no='03', key='gojo',   art='art_03_gojo',   latin='GOJO',   full='SATORU GOJO',     ar='ساتورو غوجو'),
    dict(no='04', key='megumi', art='art_04_megumi', latin='MEGUMI', full='MEGUMI FUSHIGURO', ar='ميغومي فوشيغورو'),
    dict(no='05', key='nobara', art='art_05_nobara', latin='NOBARA', full='NOBARA KUGISAKI', ar='نوبارا كوغيساكي'),
    dict(no='06', key='geto',   art='art_06_geto',   latin='GETO',   full='SUGURU GETO',     ar='سوغورو غيتو'),
]


def despeckle(g, min_area=45):
    """Drop isolated colouring-book specks so every sheet has the same clean
    line quality. Applied identically to all six drawings."""
    ink = (g < 200).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(ink, 8)
    keep = np.zeros(n, np.uint8)
    for i in range(1, n):
        if st[i, cv2.CC_STAT_AREA] >= min_area:
            keep[i] = 1
    out = np.where(keep[lab] > 0, g, 255).astype(np.uint8)
    return out


def lineart(path, max_w, max_h, thr=200, pad=8):
    """Crop to the ink, upscale, and hard-threshold to pure black on white."""
    g = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    if g is None:
        raise FileNotFoundError(path)
    g = cv2.normalize(g, None, 0, 255, cv2.NORM_MINMAX)
    g = despeckle(g)
    ys, xs = np.where(g < thr)
    if len(ys) == 0:
        raise ValueError(f'no ink found in {path}')
    g = g[max(0, ys.min() - pad):ys.max() + pad, max(0, xs.min() - pad):xs.max() + pad]

    h, w = g.shape
    scale = min(max_w / w, max_h / h)
    g = cv2.resize(g, (int(round(w * scale)), int(round(h * scale))),
                   interpolation=cv2.INTER_LANCZOS4)
    g = cv2.GaussianBlur(g, (0, 0), 0.8)
    return Image.fromarray(np.where(g < thr, 0, 255).astype(np.uint8), 'L')


def spaced(text, gap=' '):
    return gap.join(list(text))


def build(ch, art_path, out_path, latin=None, arabic=None):
    latin = latin if latin is not None else ch['latin']
    arabic = arabic if arabic is not None else ch['ar']

    img = Image.new('L', (W, H), 255)

    art_h = H - 2 * MARGIN - NAME_BLOCK
    art = lineart(art_path, W - 2 * MARGIN, art_h)
    aw, ah = art.size
    ax = (W - aw) // 2
    ay = MARGIN + (art_h - ah) // 2
    img.paste(art, (ax, ay))

    # ---- simple name under the drawing, with breathing room above it
    base_y = H - MARGIN - 150
    T.render_text(img, (W / 2, base_y), spaced(latin),
                  T.load('Poppins_800ExtraBold.ttf', 96), fill=INK, anchor='mb')

    if arabic:
        T.render_text(img, (W / 2, base_y + 52), arabic,
                      T.load('Cairo_700Bold.ttf', 62), fill=GREY, anchor='mt')

    img.save(out_path, optimize=True)
    return out_path


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.join(here, '..'))
    out = 'pages'
    os.makedirs(out, exist_ok=True)
    for ch in CHARACTERS:
        p = f"{out}/EilanDoll_{ch['no']}_{ch['key'].upper()}_coloring-page.png"
        build(ch, f"assets/{ch['art']}.png", p)
        print('wrote', p)
