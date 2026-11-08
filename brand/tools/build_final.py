#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «عالم يُبنى» / THE WORLD, BUILT
الشعار النهائي: كوكب من مكعبات + كتاب مفتوح + مكعب بنفسجي في القلب + مكعب ذهبي يطلع + مدار.

يولّد:
    brand/final/mark-*.svg        النسخ الأساسية (شفاف/غامق/فاتح)
    brand/final/compact-*.svg     نسخة الأيقونة
    brand/final/mono-*.svg        نسخة لون واحد (للختم والطباعة)
    brand/final/lockup-*.svg      الشعار مع الاسم
    brand/final/png/*.png         تصديرات PNG
    brand/final/manifest.webmanifest

    python3 brand/tools/build_final.py
"""
import os
import math
import base64

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
OUT = os.path.normpath(os.path.join(HERE, "..", "final"))
PNG = os.path.join(OUT, "png")
os.makedirs(PNG, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE = "#0E0E0A", "#EFE8D4"
CREAM_LIGHT = "#DBC894"     # كريمي أغمق للخلفيات الفاتحة


def _rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    ra, ga, ba = _rgb(a)
    rb, gb, bb = _rgb(b)
    return "#%02X%02X%02X" % (round(ra + (rb - ra) * t), round(ga + (gb - ga) * t),
                              round(ba + (bb - ba) * t))


def lightc(c, t=.34):
    return mix(c, "#FFFFFF", t)


def darkc(c, t=.34):
    return mix(c, INK, t)


# ---------------------------------------------------------------- primitives
def cube(cx, cy, a, base, seam=0.9, op=None):
    hx, hy = a * .866, a * .5
    t = seam
    p = lambda s: (f' opacity="{s}"' if op else "")
    top = (f"{cx:.2f},{cy-hy+t:.2f} {cx+hx-t:.2f},{cy:.2f} "
           f"{cx:.2f},{cy+hy-t:.2f} {cx-hx+t:.2f},{cy:.2f}")
    lf = (f"{cx-hx+t:.2f},{cy:.2f} {cx:.2f},{cy+hy-t:.2f} "
          f"{cx:.2f},{cy+hy+a-t:.2f} {cx-hx+t:.2f},{cy+a:.2f}")
    rf = (f"{cx+hx-t:.2f},{cy:.2f} {cx:.2f},{cy+hy-t:.2f} "
          f"{cx:.2f},{cy+hy+a-t:.2f} {cx+hx-t:.2f},{cy+a:.2f}")
    if op:
        return (f'<g{p(op)}><polygon points="{lf}" fill="{INK}" opacity=".30"/>'
                f'<polygon points="{rf}" fill="{INK}" opacity=".46"/>'
                f'<polygon points="{top}" fill="{base}"/></g>')
    return (f'<polygon points="{lf}" fill="{darkc(base, .26)}"/>'
            f'<polygon points="{rf}" fill="{darkc(base, .52)}"/>'
            f'<polygon points="{top}" fill="{lightc(base, .40)}"/>')


def globe(cx, cy, r, uid, core=PURPLE, mono=None, cell=13.2, gap=3.0):
    """كرة من مكعبات مستديرة (لغة الشعار المعتمدة) + قلب بنفسجي (العقل)"""
    step = cell + gap
    n = int(r / (step * .5)) + 2
    parts = [f'<clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
             f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{mono["base"] if mono else DEEP}"/>',
             f'<g clip-path="url(#{uid})">']
    cells = [(i, j) for i in range(-n, n + 1) for j in range(-n, n + 1)
             if abs(i + j) <= 2]
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    for i, j in cells:
        px = cx + (i - j) * step * .5
        py = cy + (i + j) * step * .46
        h = (i * 73856093 ^ j * 19349663) & 0xffff
        if mono:
            col = mono["base"]
            op = mono["op"] * (0.55 if h % 3 == 0 else 1.0)
            parts.append(f'<rect x="{px-cell/2:.2f}" y="{py-cell/2:.2f}" width="{cell}" '
                         f'height="{cell}" rx="{cell*.27:.2f}" fill="{col}" opacity="{op:.2f}"/>')
            continue
        d = math.hypot((i - j) * .5 + .35, (i + j) * .46 + .30) / 1.5
        col = SAGE if d < .50 else (GREEN if d < 1.0 else DEEP)
        if h % 5 == 0:
            col = lightc(col, .16)
        elif h % 7 == 0:
            col = darkc(col, .12)
        if h % 17 == 0:
            col = mix(col, SAND, .22)
        parts.append(f'<rect x="{px-cell/2:.2f}" y="{py-cell/2:.2f}" width="{cell}" '
                     f'height="{cell}" rx="{cell*.27:.2f}" fill="{col}"/>')
    # the mind — one purple cube at the heart
    if core and not mono:
        cs = r * .60
        parts.append(f'<rect x="{cx-cs/2:.2f}" y="{cy-cs/2:.2f}" width="{cs:.2f}" height="{cs:.2f}" '
                     f'rx="{cs*.27:.2f}" fill="{core}"/>')
    if not mono:
        parts.append(f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="url(#{uid}L)"/>')
    parts.append("</g>")
    if not mono:
        parts.append(f'<defs><radialGradient id="{uid}L" cx="30%" cy="22%" r="88%">'
                     f'<stop offset="0" stop-color="#FFFFFF" stop-opacity=".13"/>'
                     f'<stop offset=".42" stop-color="#FFFFFF" stop-opacity="0"/>'
                     f'<stop offset="1" stop-color="{INK}" stop-opacity=".36"/></radialGradient></defs>')
    return "".join(parts)


def book(y=72.0, half=43.0, mono=None):
    """كتاب مفتوح: غلاف غامق + صفحات كريمي + كعب ذهبي"""
    L, R = 50 - half, 50 + half
    top, h = y, 13.0
    cover = mono["base"] if mono else DEEP
    gl = mono["base"] if mono else CREAM
    gr = mono["base"] if mono else SAND
    op = f' opacity="{mono["op"]}"' if mono else ""
    p = [f'<g{op}>']
    p.append(f'<path d="M{L-1},{top+3} C{L+16},{top-8} 40,{top-11} 50,{top-2} '
             f'C60,{top-11} {R-16},{top-8} {R+1},{top+3} L{R+1},{top+10} '
             f'C{R-16},{top-1} 60,{top-4} 50,{top+5} C40,{top-4} {L+16},{top-1} {L-1},{top+10} Z" '
             f'fill="{cover}"/>')
    p.append(f'<path d="M{L},{top} C{L+16},{top-11} 40,{top-14} 50,{top-5} '
             f'C60,{top-14} {R-16},{top-11} {R},{top} L{R},{top+8} '
             f'C{R-16},{top-3} 60,{top-6} 50,{top+3} C40,{top-6} {L+16},{top-3} {L},{top+8} Z" '
             f'fill="{gl}"/>')
    p.append(f'<path d="M50,{top-5} C60,{top-14} {R-16},{top-11} {R},{top} L{R},{top+8} '
             f'C{R-16},{top-3} 60,{top-6} 50,{top+3} Z" fill="{gr}"/>')
    if not mono:
        p.append(f'<path d="M{L+9},{top+1} C{L+22},{top-8} 42,{top-10} 48,{top-3}" fill="none" '
                 f'stroke="{DEEP}" stroke-opacity=".22" stroke-width="1.3"/>')
        p.append(f'<path d="M52,{top-3} C58,{top-10} {R-22},{top-8} {R-9},{top+1}" fill="none" '
                 f'stroke="{DEEP}" stroke-opacity=".22" stroke-width="1.3"/>')
    p.append(f'<rect x="48.4" y="{top-6.5}" width="3.2" height="13" rx="1.5" '
             f'fill="{mono["base"] if mono else GOLD}"/>')
    p.append("</g>")
    return "".join(p)


def escape(cx, cy, r, mono=None, ang=41, sizes=(9.6, 6.8, 9.6), gaps=(5.5, 12.5, 21.5)):
    """مكعبات تنفصل من الكرة وتطلع لفوق — آخرها المكعب الذهبي (النور)"""
    out = []
    for k, (a, gp) in enumerate(zip(sizes, gaps)):
        x = cx + math.cos(math.radians(ang)) * (r + gp)
        y = cy - math.sin(math.radians(ang)) * (r + gp)
        if mono:
            out.append(cube(x, y, a, mono["base"], op=mono["op"]))
            continue
        col = DEEP if k == 1 else GREEN
        if k == len(sizes) - 1:
            col = GOLD
        out.append(cube(x, y, a, col, seam=.35))
    return "".join(out)


def orbit(cx, cy, rx, ry, mono=None, op=.45):
    col = mono["base"] if mono else GOLD
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" '
            f'stroke="{col}" stroke-width="1.4" opacity="{op}" '
            f'transform="rotate(-18 {cx} {cy})"/>')




def mark_mono(color=CREAM, uid="mm"):
    """نسخة لون واحد للختم والطباعة: ظل الشعار كامل + فواصل المكعبات وقلب العقل مفرّغة"""
    cx, cy, r, cell = 50, 40, 27.0, 13.2
    gap, step = 3.0, 13.2
    n = int(r / (step * .5)) + 2
    cells = [(i, j) for i in range(-n, n + 1) for j in range(-n, n + 1) if abs(i + j) <= 2]

    # --- white part: the silhouette
    sil = [f'<circle cx="{cx}" cy="{cy}" r="{r}"/>']
    L, R, top = 7, 93, 72
    sil.append(f'<path d="M{L-1},{top+3} C{L+16},{top-8} 40,{top-11} 50,{top-2} '
               f'C60,{top-11} {R-16},{top-8} {R+1},{top+3} L{R+1},{top+10} '
               f'C{R-16},{top-1} 60,{top-4} 50,{top+5} C40,{top-4} {L+16},{top-1} {L-1},{top+10} Z"/>')
    for a, gp in zip((8.2, 5.6, 8.2), (7.0, 15.0, 24.5)):
        x = cx + math.cos(math.radians(41)) * (r + gp)
        y = cy - math.sin(math.radians(41)) * (r + gp)
        hx, hy = a * .866, a * .5
        sil.append(f'<polygon points="{x:.2f},{y-hy:.2f} {x+hx:.2f},{y:.2f} '
                   f'{x:.2f},{y+hy+a:.2f} {x-hx:.2f},{y:.2f}"/>')

    # --- black part: cube seams inside the globe + the mind + spine notch
    cut = []
    cs = r * .60
    cut.append(f'<rect x="{cx-cs/2:.2f}" y="{cy-cs/2:.2f}" width="{cs:.2f}" height="{cs:.2f}" '
               f'rx="{cs*.27:.2f}"/>')

    return (f'<defs><clipPath id="{uid}c"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>'
            f'<mask id="{uid}">'
            f'<rect width="100" height="100" fill="#000"/>'
            f'<g fill="#fff">{"".join(sil)}</g>'
            f'<g fill="#000" clip-path="url(#{uid}c)">{"".join(cut)}</g>'
            f'</mask></defs>'
            f'<rect width="100" height="100" fill="{color}" mask="url(#{uid})"/>')


# ---------------------------------------------------------------- the mark
def mark(mono=None, compact=False, core=True, book_on=True, orbit_on=False, uid="m"):
    if compact:
        cx, cy, r, cell = 47.5, 45, 29.5, 14.8
    else:
        cx, cy, r, cell = 50, 40, 27.0, 13.2
    out = []
    if orbit_on and not mono:
        out.append(orbit(cx, cy + 1, r * 1.34, r * .34))
    out.append(globe(cx, cy, r, uid, core=PURPLE if core else None, mono=mono,
                     cell=cell, gap=3.0 if not compact else 3.4))
    if compact:
        out.append(escape(cx, cy, r, mono, ang=46, sizes=(7.6, 5.6, 7.6), gaps=(3.5, 8.5, 14.0)))
    else:
        out.append(escape(cx, cy, r, mono))
        if book_on:
            out.append(book(y=72, half=43, mono=mono))
    return "".join(out)


def svg_wrap(body, plate=None, w=100, h=100, label="إيلان دول — العالم يُبنى | EILAN DOLL"):
    bg = {"dark": f'<rect width="{w}" height="{h}" rx="22" fill="{INK}"/>',
          "light": f'<rect width="{w}" height="{h}" rx="22" fill="{PLATE}"/>'}.get(plate, "")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'role="img" aria-label="{label}">{bg}{body}</svg>\n')


FONT = {k: os.path.join(ROOT, "coloring", "fonts", v) for k, v in {
    "cairo900": "Cairo_900Black.ttf", "cairo700": "Cairo_700Bold.ttf",
    "orb": "Orbitron_800ExtraBold.ttf"}.items()}
FONT_FILES = [FONT["cairo900"], FONT["cairo700"], FONT["orb"]]


# ---------------------------------------------------------------- lockups
def lockup(horizontal=True, dark=True):
    """الشعار + الاسم. النص يُصدَّر كـ PNG (الخطوط لا تُدمج في SVG)."""
    W, H = (760, 220) if horizontal else (420, 470)
    fg = CREAM if dark else INK
    sub = SAGE if dark else DEEP
    m = mark()
    if horizontal:
        # mark on the right (RTL), text to its left
        mx, my, ms = 566, 22, 1.66
        return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" direction="rtl">
  <g transform="translate({mx} {my}) scale({ms})">{m}</g>
  <text x="{560}" y="98" text-anchor="end" font-family="Cairo" font-weight="900"
        font-size="62" fill="{fg}">إيلان دول</text>
  <text x="{560}" y="150" text-anchor="end" font-family="Orbitron" font-size="27"
        letter-spacing="9" fill="{GOLD if dark else "#B98F35"}">EILAN DOLL</text>
  <text x="{560}" y="188" text-anchor="end" font-family="Cairo" font-weight="700"
        font-size="22" fill="{sub}">العالم الرقمي — مكعبات تبني عالم</text>
</svg>'''
    mx, my, ms = 104, 10, 1.98
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" direction="rtl">
  <g transform="translate({mx} {my}) scale({ms})">{m}</g>
  <text x="{W/2}" y="330" text-anchor="middle" font-family="Cairo" font-weight="900"
        font-size="58" fill="{fg}">إيلان دول</text>
  <text x="{W/2}" y="382" text-anchor="middle" font-family="Orbitron" font-size="24"
        letter-spacing="8" fill="{GOLD if dark else "#B98F35"}">EILAN DOLL</text>
  <text x="{W/2}" y="424" text-anchor="middle" font-family="Cairo" font-weight="700"
        font-size="20" fill="{sub}">THE DIGITAL WORLD</text>
</svg>'''


# ---------------------------------------------------------------- writing
def write(name, content):
    p = os.path.join(OUT, name)
    with open(p, "w", encoding="utf-8") as f:
        f.write(content)
    return p


SVGS = {}


def main():
    # --- the mark, three plates + mono
    base = mark()
    SVGS["mark.svg"] = svg_wrap(base)
    SVGS["mark-dark.svg"] = svg_wrap(base, "dark")
    SVGS["mark-light.svg"] = svg_wrap(base.replace(CREAM, CREAM_LIGHT).replace(SAND, CREAM_LIGHT), "light")
    SVGS["compact.svg"] = svg_wrap(mark(compact=True, book_on=False, orbit_on=False, uid="c"))
    SVGS["compact-dark.svg"] = svg_wrap(mark(compact=True, book_on=False, orbit_on=False, uid="c2"), "dark")
    SVGS["compact-light.svg"] = svg_wrap(
        mark(compact=True, book_on=False, orbit_on=False, uid="c3").replace(CREAM, CREAM_LIGHT), "light")
    SVGS["mono-cream.svg"] = svg_wrap(mark_mono(CREAM, "m1"))
    SVGS["mono-ink.svg"] = svg_wrap(mark_mono(INK, "m2"))
    SVGS["mono-white.svg"] = svg_wrap(mark_mono("#FFFFFF", "m3"))
    SVGS["mark-orbit-dark.svg"] = svg_wrap(mark(orbit_on=True, uid="mo"), "dark")
    SVGS["lockup-h-dark.svg"] = lockup(True, True)
    SVGS["lockup-h-light.svg"] = lockup(True, False)
    SVGS["lockup-v-dark.svg"] = lockup(False, True)
    SVGS["lockup-v-light.svg"] = lockup(False, False)

    for name, svg in SVGS.items():
        write(name, svg)
    print("svg:", len(SVGS))

    # --- manifest
    write("manifest.webmanifest", """{
  "name": "إيلان دول — العالم الرقمي | EILAN DOLL",
  "short_name": "إيلان دول",
  "description": "عالم رقمي: منتجات رقمية، أكاديمية، ألعاب، استوديو، ومساعد ذكي.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0E0E0A",
  "theme_color": "#0E0E0A",
  "lang": "ar",
  "dir": "rtl",
  "icons": [
    {"src": "/favicon-48.png",  "sizes": "48x48",   "type": "image/png"},
    {"src": "/favicon-96.png",  "sizes": "96x96",   "type": "image/png"},
    {"src": "/favicon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/favicon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any"},
    {"src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"}
  ]
}
""")
    print("manifest ok")


if __name__ == "__main__":
    main()
