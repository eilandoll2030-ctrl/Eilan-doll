"""
artext.py - Arabic / Latin text rendering.

Arabic goes through HarfBuzz with native RTL shaping, which handles
contextual forms, ligatures, marks and glyph ordering in a single pass.
Latin goes through ordinary LTR shaping.
"""
import uharfbuzz as hb
import freetype
import numpy as np
from PIL import Image

AR_RANGE = ('\u0600', '\u06FF')


def is_arabic(text):
    return any(AR_RANGE[0] <= ch <= AR_RANGE[1] for ch in text)


class Font:
    def __init__(self, path, size):
        self.path = path
        self.size = size
        with open(path, 'rb') as f:
            data = f.read()
        self.face = hb.Face(data)
        self.hbfont = hb.Font(self.face)
        self.hbfont.scale = (self.face.upem, self.face.upem)
        self.ftface = freetype.Face(path)
        self.ftface.set_char_size(int(round(size * 64)))
        self.hhea_asc = self.ftface.size.ascender / 64.0
        # Cairo ships a very large default ascent; measure real ink instead.
        self._ink_asc = None
        self._ink_desc = None

    # ---------------------------------------------------------------- metrics
    def ink_ascent(self):
        if self._ink_asc is None:
            self._ink_asc, self._ink_desc = self._measure('Hb\u0623\u0644\u0637\u0631\u0641 H')
        return self._ink_asc

    def ink_descent(self):
        if self._ink_desc is None:
            self._ink_asc, self._ink_desc = self._measure('Hb\u0623\u0644\u0637\u0631\u0641 H')
        return self._ink_desc

    def _measure(self, sample):
        infos, poss = shape(self, sample)
        top = bottom = 0
        for info in infos:
            self.ftface.load_glyph(info.codepoint,
                                   freetype.FT_LOAD_RENDER | freetype.FT_LOAD_TARGET_NORMAL)
            g = self.ftface.glyph
            if g.bitmap.rows:
                top = max(top, g.bitmap_top)
                bottom = max(bottom, g.bitmap.rows - g.bitmap_top)
        return float(top) or self.hhea_asc, float(bottom)


# -------------------------------------------------------------------- shaping
def _is_ltr_char(ch):
    return ch.isdigit() or ('a' <= ch.lower() <= 'z')


def _is_ltr_char(ch):
    return ch.isdigit() or ('a' <= ch.lower() <= 'z')


def shape(font, text):
    """Shape one line for a left-to-right drawing pen.

    Arabic is shaped with a native RTL HarfBuzz buffer (correct joining,
    ligatures, marks and glyph order). HarfBuzz mirrors embedded European
    digits in that mode, so each run of digit/latin glyphs is flipped back
    to natural reading order.
    """
    arabic = is_arabic(text)

    buf = hb.Buffer()
    buf.add_str(text)
    if arabic:
        buf.direction = 'rtl'
        buf.script = 'Arab'
        buf.language = 'ar'
    else:
        buf.direction = 'ltr'
        buf.script = 'Latn'
        buf.language = 'en'
    hb.shape(font.hbfont, buf, {'kern': True, 'liga': True, 'rlig': True, 'calt': True})

    infos, poss = list(buf.glyph_infos), list(buf.glyph_positions)

    if arabic:
        def is_num(cl):
            return cl < len(text) and (text[cl].isdigit() or
                                       ('a' <= text[cl].lower() <= 'z'))

        n = len(infos)
        i = 0
        while i < n:
            if is_num(infos[i].cluster):
                j = i
                while j < n and is_num(infos[j].cluster):
                    j += 1
                infos[i:j] = infos[i:j][::-1]
                poss[i:j] = poss[i:j][::-1]
                i = j
            else:
                i += 1
    return infos, poss


def direction_of(text):
    return 'rtl' if is_arabic(text) else 'ltr'


def measure(font, text):
    infos, poss = shape(font, text)
    unit = font.size / font.face.upem
    return sum(p.x_advance for p in poss) * unit


# ------------------------------------------------------------------- drawing
def render_text(img, xy, text, font, fill=0, rtl=None, anchor='lt', tracking=0.0):
    """Draw a single line of text.

    anchor is two chars: horizontal l / m / r  +  vertical t / m / b.
    """
    infos, poss = shape(font, text)
    unit = font.size / font.face.upem
    total_w = sum(p.x_advance for p in poss) * unit

    x0, y0 = float(xy[0]), float(xy[1])
    if anchor[0] == 'm':
        x0 -= total_w / 2.0
    elif anchor[0] == 'r':
        x0 -= total_w

    asc = font.ink_ascent()
    desc = font.ink_descent()
    if anchor[1] == 't':
        y0 += asc
    elif anchor[1] == 'm':
        y0 += (asc - desc) / 2.0

    pen_x, pen_y = x0, y0
    layer = Image.new('L', img.size, 0)
    for info, pos in zip(infos, poss):
        font.ftface.load_glyph(info.codepoint,
                               freetype.FT_LOAD_RENDER | freetype.FT_LOAD_TARGET_NORMAL)
        bmp = font.ftface.glyph.bitmap
        if bmp.width > 0 and bmp.rows > 0:
            arr = np.array(bmp.buffer, np.uint8).reshape(bmp.rows, bmp.pitch)[:, :bmp.width]
            glyph = Image.fromarray(arr.copy(), 'L')
            px = int(round(pen_x + font.ftface.glyph.bitmap_left))
            py = int(round(pen_y - font.ftface.glyph.bitmap_top))
            tmp = Image.new('L', img.size, 0)
            tmp.paste(glyph, (px, py))
            layer.paste(Image.new('L', img.size, 255), (0, 0), tmp)
        pen_x += pos.x_advance * unit + tracking
        pen_y -= pos.y_advance * unit

    img.paste(Image.new(img.mode, img.size, fill), (0, 0), layer)
    return img


# --------------------------------------------------------------------- cache
_cache = {}
FONT_DIR = 'fonts'


def load(name, size, font_dir=FONT_DIR):
    key = (name, size, font_dir)
    if key not in _cache:
        _cache[key] = Font(f'{font_dir}/{name}', size)
    return _cache[key]
