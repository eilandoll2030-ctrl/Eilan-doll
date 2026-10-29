"""book.py - assemble the plain coloring pages into a print-ready A4 PDF book.

Structure
    cover  ->  6 coloring pages  ->  back cover

Everything is pure black on white so the book prints on any home printer
and reads page-by-page on an iPad.
"""
import os
import cv2
import numpy as np
from PIL import Image, ImageDraw

import artext as T

W, H = 2480, 3508                 # A4 @ 300 dpi
DPI = 300

INK, MID, LIGHT, FAINT = 0, 110, 176, 219

CHARACTERS = [
    dict(no='01', key='yuji',   art='art_01_yuji',   latin='YUJI',   ar='يوجي إيتادوري',   full='YUJI ITADORI'),
    dict(no='02', key='sukuna', art='art_02_sukuna', latin='SUKUNA', ar='ريومين سوكونا',   full='RYOMEN SUKUNA'),
    dict(no='03', key='gojo',   art='art_03_gojo',   latin='GOJO',   ar='ساتورو غوجو',     full='SATORU GOJO'),
    dict(no='04', key='megumi', art='art_04_megumi', latin='MEGUMI', ar='ميغومي فوشيغورو', full='MEGUMI FUSHIGURO'),
    dict(no='05', key='nobara', art='art_05_nobara', latin='NOBARA', ar='نوبارا كوغيساكي', full='NOBARA KUGISAKI'),
    dict(no='06', key='geto',   art='art_06_geto',   latin='GETO',   ar='سوغورو غيتو',     full='SUGURU GETO'),
]

TITLE_EN = 'COLORING BOOK'
TITLE_AR = 'دفتر التلوين'
SERIES = 'JUJUTSU KAISEN'


# ------------------------------------------------------------------ helpers
def spaced(text, gap=' '):
    return gap.join(list(text))


def crop_art(path, thr=200, pad=6):
    """Load line art and crop tight to the ink."""
    g = cv2.imread(path, cv2.IMREAD_GRAYSCALE)
    if g is None:
        raise FileNotFoundError(path)
    g = cv2.normalize(g, None, 0, 255, cv2.NORM_MINMAX)
    ys, xs = np.where(g < thr)
    g = g[max(0, ys.min() - pad):ys.max() + pad, max(0, xs.min() - pad):xs.max() + pad]
    return g


def crisp(g, target_w, target_h, thr=200):
    """Scale then hard-threshold so strokes stay solid black."""
    h, w = g.shape
    f = min(target_w / w, target_h / h)
    out = cv2.resize(g, (int(round(w * f)), int(round(h * f))),
                     interpolation=cv2.INTER_LANCZOS4)
    out = cv2.GaussianBlur(out, (0, 0), 0.8)
    return Image.fromarray(np.where(out < thr, 0, 255).astype(np.uint8), 'L')


def frame(img, inset=128, gap=15):
    d = ImageDraw.Draw(img)
    d.rectangle([inset, inset, W - inset, H - inset], outline=INK, width=4)
    d.rectangle([inset + gap, inset + gap, W - inset - gap, H - inset - gap],
                outline=INK, width=1)
    return img


# ------------------------------------------------------------------- cover
def cover(out_path):
    img = Image.new('L', (W, H), 255)
    d = ImageDraw.Draw(img)
    frame(img)

    mid = W // 2

    # ---- wordmark (text only, no logo)
    T.render_text(img, (mid, 430), spaced('EILAN DOLL', '  '),
                  T.load('BebasNeue_400Regular.ttf', 118), fill=INK, anchor='mt')

    d.line([mid - 300, 576, mid + 300, 576], fill=INK, width=2)

    # ---- title
    T.render_text(img, (mid, 648), TITLE_EN,
                  T.load('BebasNeue_400Regular.ttf', 200), fill=INK, anchor='mt')
    T.render_text(img, (mid, 902), TITLE_AR,
                  T.load('Cairo_900Black.ttf', 92), fill=INK, anchor='mt')
    T.render_text(img, (mid, 1070), spaced(SERIES, '   '),
                  T.load('Poppins_700Bold.ttf', 32), fill=MID, anchor='mt')

    # ---- character grid 3 x 2
    cols, rows = 3, 2
    gx0, gx1 = 236, W - 236
    gy0 = 1200
    cell_w = (gx1 - gx0) // cols
    cell_h = 830
    for i, ch in enumerate(CHARACTERS):
        r, c = divmod(i, cols)
        cx = gx0 + c * cell_w + cell_w // 2
        cy = gy0 + r * cell_h + cell_h // 2 - 40

        g = crop_art(f"assets/{ch['art']}.png")
        thumb = crisp(g, cell_w - 96, cell_h - 190)
        tw, th = thumb.size
        img.paste(thumb, (cx - tw // 2, cy - th // 2))

        T.render_text(img, (cx, gy0 + r * cell_h + cell_h - 118), ch['latin'],
                      T.load('Poppins_800ExtraBold.ttf', 34), fill=INK, anchor='mt')
        T.render_text(img, (cx, gy0 + r * cell_h + cell_h - 70), ch['ar'],
                      T.load('Cairo_700Bold.ttf', 26), fill=MID, anchor='mt')

    # ---- footer
    d = ImageDraw.Draw(img)
    d.line([mid - 300, H - 512, mid + 300, H - 512], fill=INK, width=2)
    T.render_text(img, (mid, H - 476), '6 PAGES · A4 · 300 DPI',
                  T.load('Poppins_800ExtraBold.ttf', 30), fill=INK, anchor='mt')
    T.render_text(img, (mid, H - 414), 'ست صفحات للتلوين — جاهزة للطباعة',
                  T.load('Cairo_700Bold.ttf', 32), fill=MID, anchor='mt')
    T.render_text(img, (mid, H - 322), 'eilan-doll.netlify.app',
                  T.load('Poppins_700Bold.ttf', 24), fill=LIGHT, anchor='mt')

    img.save(out_path, optimize=True)
    return out_path


# -------------------------------------------------------------- back cover
def back_cover(out_path):
    img = Image.new('L', (W, H), 255)
    d = ImageDraw.Draw(img)
    frame(img)

    mid = W // 2
    T.render_text(img, (mid, H // 2 - 250), spaced('EILAN DOLL', '  '),
                  T.load('BebasNeue_400Regular.ttf', 96), fill=INK, anchor='mt')

    d.line([mid - 260, H // 2 - 104, mid + 260, H // 2 - 104], fill=INK, width=2)

    T.render_text(img, (mid, H // 2 - 40), 'صفحات تلوين أصلية',
                  T.load('Cairo_900Black.ttf', 58), fill=INK, anchor='mt')
    T.render_text(img, (mid, H // 2 + 66), 'Original coloring pages',
                  T.load('Poppins_700Bold.ttf', 32), fill=MID, anchor='mt')

    T.render_text(img, (mid, H // 2 + 186), 'eilan-doll.netlify.app',
                  T.load('Poppins_700Bold.ttf', 26), fill=LIGHT, anchor='mt')

    img.save(out_path, optimize=True)
    return out_path


# -------------------------------------------------------------------- pdf
def build_pdf(page_paths, out_pdf):
    imgs = [Image.open(p).convert('L') for p in page_paths]
    imgs[0].save(out_pdf, save_all=True, append_images=imgs[1:],
                 resolution=DPI, optimize=True)
    return out_pdf


if __name__ == '__main__':
    here = os.path.dirname(os.path.abspath(__file__))
    os.chdir(os.path.join(here, '..'))
    os.makedirs('pages', exist_ok=True)
    os.makedirs('book', exist_ok=True)

    pages = []
    pages.append(cover('book/00_cover.png'))
    for ch in CHARACTERS:
        pages.append(f"pages/EilanDoll_{ch['no']}_{ch['key'].upper()}_coloring-page.png")
    pages.append(back_cover('book/07_back.png'))

    out = 'book/Eilan-Doll-Coloring-Book.pdf'
    build_pdf(pages, out)
    print('wrote', out)
    print('pages:', len(pages))
