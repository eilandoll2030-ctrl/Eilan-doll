#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «كرة المكعبات» / voxel globe  (study 3)
Clear volume: coarse voxel sphere + light gradient, sitting on an open book.
planet (world) + book (knowledge) + light (gold) + mind (purple core).

    python3 brand/tools/exp_globe.py
"""
import os
import math
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


def voxel_globe(cx, cy, r, pitch=10.5, uid="g"):
    """circle filled with isometric cubes + volumetric light overlay"""
    a = pitch
    hx, hy = a * .866, a * .5
    n = int(r / a) + 2
    cells = [(i, j) for i in range(-n, n + 1) for j in range(-n, n + 1)]
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    out = [f'<clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
           f'<g clip-path="url(#{uid})">',
           f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="{DEEP}"/>']
    for i, j in cells:
        px = 50 + (i - j) * hx
        py = cy + (i + j) * hy
        # normalised position on the disc (light from top-left)
        dx, dy = (i - j) * .866, (i + j) * .5
        d = math.hypot(dx + .55, dy + .55) / 1.75
        if d < .45:
            col = light(SAGE, .22)
        elif d < .9:
            col = SAGE
        elif d < 1.3:
            col = GREEN
        else:
            col = DEEP
        out.append(iso(px, py, a, col))
    # volumetric light
    out.append(f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="url(#{uid}L)"/>')
    out.append("</g>")
    defs = (f'<defs><radialGradient id="{uid}L" cx="32%" cy="26%" r="78%">'
            f'<stop offset="0" stop-color="#FFFFFF" stop-opacity=".30"/>'
            f'<stop offset=".45" stop-color="#FFFFFF" stop-opacity="0"/>'
            f'<stop offset="1" stop-color="{INK}" stop-opacity=".45"/></radialGradient></defs>')
    return defs + "".join(out)


def book(cx=50, y=72.0, half=34.0, thick=9.0, spine=3.2):
    L, R = cx - half, cx + half
    return (
        f'<polygon points="{L},{y-thick*.45} {cx-spine},{y-thick*.95} {cx-spine},{y+thick*.05} {L},{y+thick*.45}" fill="{CREAM}"/>'
        f'<polygon points="{R},{y-thick*.45} {cx+spine},{y-thick*.95} {cx+spine},{y+thick*.05} {R},{y+thick*.45}" fill="{SAND}"/>'
        f'<polygon points="{L},{y+thick*.45} {cx-spine},{y+thick*.05} {cx+spine},{y+thick*.05} {R},{y+thick*.45} '
        f'{R},{y+thick*.45+3.2} {cx+spine},{y+thick*.05+3.2} {cx-spine},{y+thick*.05+3.2} {L},{y+thick*.45+3.2}" fill="{DEEP}"/>'
        f'<rect x="{cx-spine}" y="{y-thick*.95}" width="{2*spine}" height="{thick*1.0+3.4}" rx="1.4" fill="{GOLD}"/>'
    )


def rays(cx, cy, r, n=5, spread=(-64, 64), w=2.4, op=.75):
    out = []
    for k in range(n):
        t = spread[0] + (spread[1] - spread[0]) * k / max(1, n - 1)
        rad = math.radians(t - 90)
        x1, y1 = cx + math.cos(rad) * (r + 2.5), cy + math.sin(rad) * (r + 2.5)
        x2, y2 = cx + math.cos(rad) * (r + 8.5), cy + math.sin(rad) * (r + 8.5)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{GOLD}" '
                   f'stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')
    return "".join(out)


# ----------------------------------------------------------------- variants
def g1_globe_book():
    """كرة مكعبات + كتاب مفتوح + مكعب ذهبي يطلع منها"""
    return (rays(50, 36, 27, 5) + voxel_globe(50, 36, 26, 9.4, "a")
            + book(50, y=72, half=35) + iso(84, 10, 7.6, GOLD))


def g2_globe_book_core():
    """نفسها + مكعب بنفسجي في قلب الكرة (العقل)"""
    core = iso(50, 40, 9.4, PURPLE)
    return (rays(50, 36, 27, 5) + voxel_globe(50, 36, 26, 9.4, "b") + core
            + book(50, y=72, half=35) + iso(84, 10, 7.6, GOLD))


def g3_globe_only():
    """الكرة لحالها — النسخة المضغوطة (أيقونة/بروفايل)"""
    return rays(50, 47, 33, 7, (-70, 70)) + voxel_globe(50, 47, 32, 11.2, "c") + iso(86, 14, 7.4, GOLD)


def g4_halfglobe_book():
    """نصف كوكب (قبة) على كتاب — أكثر إحساس «بناء» و«حرم»"""
    body = voxel_globe(50, 46, 27, 9.6, "d")
    cut = f'<rect x="0" y="50" width="100" height="50" fill="{INK}"/>'
    if True:
        return (rays(50, 40, 26, 5) + f'<g>{body}</g>' + book(50, y=64, half=34) + iso(82, 8, 7.2, GOLD))


def g5_book_cubes_planet():
    """كتاب والمكعبات تطلع منه على شكل قوسة كوكب"""
    out = [book(50, y=74, half=34)]
    cells = [(-2, 0), (-1, -1), (0, -2), (1, -1), (2, 0), (-1, 1), (0, 0), (1, 1)]
    cells.sort(key=lambda c: c[0] + c[1])
    for i, j in cells:
        cx = 50 + (i - j) * 9.4 * .866
        cy = 52 + (i + j) * 9.4 * .5
        out.append(iso(cx, cy, 9.4, SAGE if (i + j) < 0 else GREEN))
    out.append(iso(50, 24, 8.4, GOLD))
    return "".join(out)


VARIANTS = [
    ("g1", g1_globe_book), ("g2", g2_globe_book_core), ("g3", g3_globe_only),
    ("g4", g4_halfglobe_book), ("g5", g5_book_cubes_planet),
]

if __name__ == "__main__":
    for slug, fn in VARIANTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light")):
            with open(os.path.join(OUT, f"{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, slug))
    print("wrote", len(VARIANTS) * 2)
