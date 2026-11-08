#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — الشروق / The Sunrise — merging planet + mind + book + light.
Study 2.

    python3 brand/tools/exp_sunrise.py
"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "explore"))
os.makedirs(OUT, exist_ok=True)

spec = importlib.util.spec_from_file_location("bm", os.path.join(HERE, "build_marks.py"))
bm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD, INK, PLATE = (
    bm.CREAM, bm.SAND, bm.SAGE, bm.GREEN, bm.DEEP, bm.PURPLE, bm.GOLD, bm.INK, bm.PLATE)
iso, sq, svg, light, dark = bm.iso, bm.sq, bm.svg, bm.light, bm.dark


# ------------------------------------------------------------------ pieces
def cube_sphere(cx, cy, r, a=6.8, shades=(SAGE, GREEN, DEEP), uid="s1"):
    """a sphere/planet whose surface is made of isometric cubes"""
    clips = []
    out = [f'<clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>']
    g = [f'<g clip-path="url(#{uid})">',
         f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="{DEEP}"/>']
    hx, hy = a * .866, a * .5
    n = int(r / a) + 2
    cells = []
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            cells.append((i, j))
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    for i, j in cells:
        px = cx + (i - j) * hx
        py = cy + (i + j) * hy
        # distance from the light point (top-left of the sphere)
        d = (((px - cx) + (py - cy) * .5) ** 2 + ((py - cy) * 1.1) ** 2) ** .5 / r
        col = shades[0] if d < .55 else (shades[1] if d < 1.0 else shades[2])
        if (i % 5 == 2 and j % 5 == 1):
            col = shades[1]
        g.append(iso(px, py, a, col))
    g.append("</g>")
    return "".join(out + g)


def open_book(y=70.0, w=40.0):
    """flat isometric open book: two pages + spine"""
    cx = 50
    L, R = cx - w, cx + w
    top, bot, mid = y, y + 13.0, y + 6.0
    return (
        # page faces
        f'<polygon points="{L},{top} {cx},{top+bot-top-7} {cx},{(bot-7)+7} {L},{bot-7}" fill="{CREAM}"/>'
    )


def book_flat(cy=76.0, half=36.0, depth=13.0, spine=4.0):
    """clean open-book silhouette in the flat-iso style (no perspective tricks)"""
    L, R = 50 - half, 50 + half
    return (
        # pages (two quadrilaterals meeting at the spine)
        f'<polygon points="{L},{cy} {50-spine},{cy-depth*0.45} {50-spine},{cy+depth*0.55} {L},{cy+depth}" '
        f'fill="{CREAM}"/>'
        f'<polygon points="{R},{cy} {50+spine},{cy-depth*0.45} {50+spine},{cy+depth*0.55} {R},{cy+depth}" '
        f'fill="{SAND}"/>'
        # page thickness / shadow under
        f'<polygon points="{L},{cy+depth} {50-spine},{cy+depth*0.55} {50+spine},{cy+depth*0.55} {R},{cy+depth} '
        f'{R},{cy+depth+3.4} {50+spine},{cy+depth*0.55+3.4} {50-spine},{cy+depth*0.55+3.4} {L},{cy+depth+3.4}" '
        f'fill="{DEEP}"/>'
        # spine
        f'<rect x="{50-spine}" y="{cy-depth*0.45}" width="{2*spine}" height="{depth*1.0+3.4}" rx="1.6" '
        f'fill="{GOLD}"/>'
    )


def rays(cy=44.0, r=30.0, n=5, spread=(-62, 62)):
    out = []
    for k in range(n):
        t = spread[0] + (spread[1] - spread[0]) * k / (n - 1)
        rad = __import__("math").radians(t - 90)
        x1, y1 = 50 + __import__("math").cos(rad) * (r + 3), cy + __import__("math").sin(rad) * (r + 3)
        x2, y2 = 50 + __import__("math").cos(rad) * (r + 11), cy + __import__("math").sin(rad) * (r + 11)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{GOLD}" '
                   f'stroke-width="2.6" stroke-linecap="round" opacity=".8"/>')
    return "".join(out)


# ------------------------------------------------------------------ variants
def v_sunrise():
    """S1 — الشروق: cube sun rising over an open book, one gold cube as the light"""
    return (rays(cy=44, r=31) + cube_sphere(50, 44, 30, 6.6, (SAGE, GREEN, DEEP), "sun")
            + book_flat(cy=78, half=37) + iso(80, 12, 8.4, GOLD))


def v_sunrise_nobook():
    """S2 — الكوكب: the cube planet alone, gold cube as its star"""
    return rays(cy=50, r=34, n=7, spread=(-70, 70)) + cube_sphere(50, 50, 33, 7.4, (SAGE, GREEN, DEEP), "pl") \
        + iso(84, 16, 8.2, GOLD)


def v_book_build():
    """S3 — الكتاب يبني عالماً: cubes stacking out of an open book"""
    out = [book_flat(cy=74, half=36)]
    # a small pyramid of cubes rising from the pages
    for row, (y, xs) in enumerate([(56, 1), (44, 3), (32, 1)]):
        pass
    out.append(iso(50, 56, 9.0, GREEN))
    out.append(iso(39, 60, 7.4, DEEP))
    out.append(iso(61, 60, 7.4, DEEP))
    out.append(iso(50, 36, 7.6, GOLD))
    return "".join(out)


def v_mind():
    """S4 — العقل: cube planet with a purple core and gold thought leaving it"""
    body = cube_sphere(50, 52, 31, 6.8, (SAGE, GREEN, DEEP), "mind")
    core = (f'<circle cx="50" cy="54" r="10" fill="{PURPLE}"/>'
            f'<circle cx="50" cy="54" r="6.2" fill="{light(PURPLE,.18)}"/>')
    orbit = (f'<ellipse cx="50" cy="52" rx="42" ry="12" fill="none" stroke="{GOLD}" '
             f'stroke-width="1.4" opacity=".45" transform="rotate(-16 50 52)"/>')
    return body + core + orbit + iso(84, 14, 8.0, GOLD)


VARIANTS = [
    ("s1-sunrise", v_sunrise),
    ("s2-planet", v_sunrise_nobook),
    ("s3-book-build", v_book_build),
    ("s4-mind", v_mind),
]

if __name__ == "__main__":
    for slug, fn in VARIANTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light")):
            with open(os.path.join(OUT, f"{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, slug))
    print("wrote", len(VARIANTS) * 2)
