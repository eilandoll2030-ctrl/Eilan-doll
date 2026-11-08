#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «كرة المكعبات» / voxel globe  (study 4 — sharper cubes, escaping cubes, clearer book)
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


def cube(cx, cy, a, base, hi=.44, lo=.42):
    """isometric cube with stronger face contrast so it reads as a cube, not a tile"""
    hx, hy = a * .866, a * .5
    top = f"{cx:.2f},{cy-hy:.2f} {cx+hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx-hx:.2f},{cy:.2f}"
    lf = f"{cx-hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx:.2f},{cy+hy+a:.2f} {cx-hx:.2f},{cy+a:.2f}"
    rf = f"{cx+hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx:.2f},{cy+hy+a:.2f} {cx+hx:.2f},{cy+a:.2f}"
    return (f'<polygon points="{lf}" fill="{bm.dark(base, lo*.62)}"/>'
            f'<polygon points="{rf}" fill="{bm.dark(base, lo)}"/>'
            f'<polygon points="{top}" fill="{bm.light(base, hi)}"/>')


def voxel_globe(cx, cy, r, pitch=13.0, uid="g"):
    a = pitch
    hx, hy = a * .866, a * .5
    n = int(r / a) + 2
    cells = [(i, j) for i in range(-n, n + 1) for j in range(-n, n + 1)]
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    out = [f'<clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
           f'<g clip-path="url(#{uid})">',
           f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="{DEEP}"/>']
    for i, j in cells:
        px = cx + (i - j) * hx
        py = cy + (i + j) * hy
        dx, dy = (i - j) * .866, (i + j) * .5
        d = math.hypot(dx + .5, dy + .45) / 1.7
        col = SAGE if d < .5 else (GREEN if d < 1.05 else DEEP)
        out.append(cube(px, py, a, col))
    out.append(f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="url(#{uid}L)"/>')
    out.append("</g>")
    defs = (f'<defs><radialGradient id="{uid}L" cx="30%" cy="24%" r="82%">'
            f'<stop offset="0" stop-color="#FFFFFF" stop-opacity=".26"/>'
            f'<stop offset=".42" stop-color="#FFFFFF" stop-opacity="0"/>'
            f'<stop offset="1" stop-color="{INK}" stop-opacity=".55"/></radialGradient></defs>')
    return defs + "".join(out)


def book(y=72.0, half=34.0, uid="bk"):
    """open book: two page slabs + dark cover + page lines"""
    L, R = 50 - half, 50 + half
    lift, thick = 7.0, 10.0
    pages = (
        f'<polygon points="{L},{y} {50},{y-lift} {50},{y-lift+thick} {L},{y+thick}" fill="{CREAM}"/>'
        f'<polygon points="{R},{y} {50},{y-lift} {50},{y-lift+thick} {R},{y+thick}" fill="{SAND}"/>'
    )
    cover = (
        f'<polygon points="{L},{y+thick} {50},{y-lift+thick} {50},{y-lift+thick+4.2} {L},{y+thick+4.2}" fill="{DEEP}"/>'
        f'<polygon points="{R},{y+thick} {50},{y-lift+thick} {50},{y-lift+thick+4.2} {R},{y+thick+4.2}" fill="{bm.dark(DEEP,.3)}"/>'
    )
    lines = []
    for k in (0.35, 0.62, 0.86):
        lx = L + (50 - L) * k
        lines.append(f'<line x1="{lx:.1f}" y1="{y + (thick+lift*0)*k - lift*k*0.0:.1f}" '
                     f'x2="{lx:.1f}" y2="{y + thick*k:.1f}" stroke="{DEEP}" stroke-opacity=".22" stroke-width="1.4"/>')
    return cover + pages + "".join(lines)


def rays(cx, cy, r, n=5, spread=(-62, 62), w=2.6, op=.8):
    out = []
    for k in range(n):
        t = spread[0] + (spread[1] - spread[0]) * k / max(1, n - 1)
        rad = math.radians(t - 90)
        x1, y1 = cx + math.cos(rad) * (r + 3), cy + math.sin(rad) * (r + 3)
        x2, y2 = cx + math.cos(rad) * (r + 9), cy + math.sin(rad) * (r + 9)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{GOLD}" '
                   f'stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')
    return "".join(out)


def escaping(cx, cy, r, base=GREEN):
    """cubes detaching from the globe and floating up-right — «العالم يُبنى»"""
    return "".join([
        cube(cx + r * .74, cy - r * .60, 8.6, base),
        cube(cx + r * .95, cy - r * .95, 6.6, DEEP),
        cube(cx + r * 1.12, cy - r * 1.20, 8.0, GOLD),
    ])


# ----------------------------------------------------------------- variants
def h1():
    """كرة + كتاب + شروق"""
    return rays(50, 37, 27) + voxel_globe(50, 37, 27, 13.0, "a") + book(y=74, half=36)


def h2():
    """كرة + كتاب + مكعبات تنفصل، والذهبي هو آخرها"""
    return (rays(50, 37, 24, 4, (-58, -6)) + voxel_globe(50, 37, 27, 13.0, "b")
            + escaping(50, 37, 27) + book(y=74, half=34))


def h3():
    """الكرة لحالها + مكعبات تنفصل (نسخة الأيقونة)"""
    return (rays(50, 46, 30, 4, (-70, -18)) + voxel_globe(50, 46, 32, 14.6, "c")
            + escaping(50, 46, 32))


def h4():
    """نصف كوكب يطلع من كتاب — «الحرم/البناء»"""
    body = voxel_globe(50, 52, 30, 13.4, "d")
    return (rays(50, 44, 24, 5) + body + book(y=62, half=37)
            + cube(80, 16, 8.4, GOLD))


VARIANTS = [("h1", h1), ("h2", h2), ("h3", h3), ("h4", h4)]

if __name__ == "__main__":
    for slug, fn in VARIANTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light")):
            with open(os.path.join(OUT, f"{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(bm.svg(body, plate, slug))
        # tiny-icon test strip
        tiny = "".join(
            f'<g transform="translate({i*30} 0) scale({s})">'
            f'<rect width="100" height="100" rx="22" fill="{INK}"/>{body}</g>'
            for i, s in enumerate((.26, .20, .16)))
        with open(os.path.join(OUT, f"{slug}-icons.svg"), "w", encoding="utf-8") as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 26">{tiny}</svg>')
    print("wrote", len(VARIANTS))
