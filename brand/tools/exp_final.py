#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «عالم يُبنى» / world being built  (study 5)
voxel globe (world) + open book (knowledge) + purple core (mind) + gold cube (light).

    python3 brand/tools/exp_final.py
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
light, dark = bm.light, bm.dark


# ------------------------------------------------------------------ cube
def cube(cx, cy, a, base, seam=True):
    """crisp isometric cube; `seam` insets the top face so cubes read as separate blocks"""
    hx, hy = a * .866, a * .5
    t = 0.9 if seam else 0.0                    # seam inset
    top = (f"{cx:.2f},{cy-hy+t:.2f} {cx+hx-t:.2f},{cy:.2f} "
           f"{cx:.2f},{cy+hy-t:.2f} {cx-hx+t:.2f},{cy:.2f}")
    lf = (f"{cx-hx+t:.2f},{cy:.2f} {cx:.2f},{cy+hy-t:.2f} "
          f"{cx:.2f},{cy+hy+a-t:.2f} {cx-hx+t:.2f},{cy+a:.2f}")
    rf = (f"{cx+hx-t:.2f},{cy:.2f} {cx:.2f},{cy+hy-t:.2f} "
          f"{cx:.2f},{cy+hy+a-t:.2f} {cx+hx-t:.2f},{cy+a:.2f}")
    return (f'<polygon points="{lf}" fill="{dark(base, .30)}"/>'
            f'<polygon points="{rf}" fill="{dark(base, .46)}"/>'
            f'<polygon points="{top}" fill="{light(base, .34)}"/>')


# ------------------------------------------------------------------ globe
def globe(cx, cy, r, pitch=12.0, uid="g", core=None):
    hx, hy = pitch * .866, pitch * .5
    n = int(r / pitch) + 2
    cells = [(i, j) for i in range(-n, n + 1) for j in range(-n, n + 1)]
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    parts = [f'<clipPath id="{uid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
             f'<g clip-path="url(#{uid})">',
             f'<rect x="{cx-r-2}" y="{cy-r-2}" width="{2*r+4}" height="{2*r+4}" fill="{DEEP}"/>']
    for i, j in cells:
        px = cx + (i - j) * hx
        py = cy + (i + j) * hy
        dxx, dyy = (i - j) * .866, (i + j) * .5
        d = math.hypot(dxx + .42, dyy + .38) / 1.72
        col = SAGE if d < .46 else (GREEN if d < 1.02 else DEEP)
        parts.append(cube(px, py, pitch, col))
    if core:
        parts.append(cube(cx, cy + 2, pitch, core))     # the mind, at the heart
    # soft volume: top-left glow + bottom-right shade (kept low so cubes stay crisp)
    parts.append(f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" fill="url(#{uid}L)"/>')
    parts.append("</g>")
    defs = (f'<defs><radialGradient id="{uid}L" cx="30%" cy="22%" r="86%">'
            f'<stop offset="0" stop-color="#FFFFFF" stop-opacity=".16"/>'
            f'<stop offset=".40" stop-color="#FFFFFF" stop-opacity="0"/>'
            f'<stop offset="1" stop-color="{INK}" stop-opacity=".42"/></radialGradient></defs>')
    return defs + "".join(parts)


# ------------------------------------------------------------------ book
def book(y=64.0, half=40.0):
    """classic open book glyph (curved pages) + gold spine"""
    L, R = 50 - half, 50 + half
    top = y
    depth = 14.0
    return (
        # shadow / cover under the pages
        f'<path d="M{L},{top+4} C{L+14},{top-7} {42},{top-9} 50,{top-1} '
        f'C58,{top-9} {R-14},{top-7} {R},{top+4} L{R},{top+13} '
        f'C{R-14},{top+2} {58},{top-1} 50,{top+7} C42,{top-1} {L+14},{top+2} {L},{top+13} Z" '
        f'fill="{DEEP}"/>'
        # pages
        f'<path d="M{L},{top} C{L+14},{top-11} {42},{top-13} 50,{top-5} '
        f'C58,{top-13} {R-14},{top-11} {R},{top} L{R},{top+9} '
        f'C{R-14},{top-2} {58},{top-5} 50,{top+3} C42,{top-5} {L+14},{top-2} {L},{top+9} Z" '
        f'fill="{CREAM}"/>'
        # right page slightly sand + page lines
        f'<path d="M50,{top-5} C58,{top-13} {R-14},{top-11} {R},{top} L{R},{top+9} '
        f'C{R-14},{top-2} 58,{top-5} 50,{top+3} Z" fill="{SAND}"/>'
        f'<path d="M{L+7},{top-1.5} C{L+18},{top-10} 42,{top-11} 48,{top-4}" fill="none" '
        f'stroke="{DEEP}" stroke-opacity=".22" stroke-width="1.3"/>'
        f'<path d="M52,{top-4} C58,{top-11} {R-18},{top-10} {R-7},{top-1.5}" fill="none" '
        f'stroke="{DEEP}" stroke-opacity=".22" stroke-width="1.3"/>'
        # spine
        f'<rect x="48.2" y="{top-6}" width="3.6" height="11" rx="1.6" fill="{GOLD}"/>'
    )


# ------------------------------------------------------------------ light
def rays(cx, cy, r, n=4, spread=(-56, -2), w=2.6, op=.75):
    out = []
    for k in range(n):
        t = spread[0] + (spread[1] - spread[0]) * k / max(1, n - 1)
        rad = math.radians(t - 90)
        x1, y1 = cx + math.cos(rad) * (r + 3), cy + math.sin(rad) * (r + 3)
        x2, y2 = cx + math.cos(rad) * (r + 8.5), cy + math.sin(rad) * (r + 8.5)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{GOLD}" '
                   f'stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')
    return "".join(out)


def escape(cx, cy, r, sizes=(8.4, 6.4, 8.0)):
    """two green cubes leaving the globe, then the gold one — the world growing"""
    a1, a2, a3 = sizes
    p1 = (cx + r * .66, cy - r * .62)
    p2 = (cx + r * .88, cy - r * .93)
    p3 = (cx + r * 1.06, cy - r * 1.22)
    return (cube(p1[0], p1[1], a1, GREEN) +
            cube(p2[0], p2[1], a2, DEEP) +
            cube(p3[0], p3[1], a3, GOLD))


# ------------------------------------------------------------------ variants
def c1():
    """كرة + كتاب + شروق (بلا انفصال)"""
    return rays(49, 33, 23, 4, (-62, -8)) + globe(50, 37, 24.5, 11.6, "c1") + book(y=67, half=40)


def c2():
    """كرة + مكعبات تنفصل + كتاب + قلب بنفسجي"""
    return (rays(49, 31, 21, 3, (-70, -20)) + globe(47, 36, 24.0, 11.6, "c2", core=PURPLE)
            + escape(47, 36, 24.0) + book(y=68, half=40))


def c3():
    """نفس c2 بدون قلب بنفسجي — للتقييس"""
    return (rays(49, 31, 21, 3, (-70, -20)) + globe(47, 36, 24.0, 11.6, "c3")
            + escape(47, 36, 24.0) + book(y=68, half=40))


def c4():
    """الكرة لحالها + انفصال (نسخة أيقونة مستقلة)"""
    return rays(48, 44, 26, 3, (-74, -22)) + globe(48, 50, 30.0, 13.4, "c4") + escape(48, 50, 30.0)



def orbit(cx, cy, rx, ry, op=.5):
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{GOLD}" '
            f'stroke-width="1.5" opacity="{op}" transform="rotate(-16 {cx} {cy})"/>')


def sun_rays(cx, cy, r, n=8, w=2.2, op=.55):
    out = []
    for k in range(n):
        rad = math.radians(k * 360 / n)
        x1, y1 = cx + math.cos(rad) * (r + 1.6), cy + math.sin(rad) * (r + 1.6)
        x2, y2 = cx + math.cos(rad) * (r + 5.4), cy + math.sin(rad) * (r + 5.4)
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{GOLD}" '
                   f'stroke-width="{w}" stroke-linecap="round" opacity="{op}"/>')
    return "".join(out)


def c5():
    """كرة + كتاب + مدار ذهبي + قلب بنفسجي (بلا أشعة)"""
    return (orbit(49, 38, 33, 9) + globe(49, 37, 25.0, 11.8, "c5", core=PURPLE)
            + escape(49, 37, 25.0) + book(y=68, half=40))


def c6():
    """نفس c5 + شروق صغير حول المكعب الذهبي فقط"""
    return (orbit(49, 38, 33, 9) + globe(49, 37, 25.0, 11.8, "c6", core=PURPLE)
            + escape(49, 37, 25.0)
            + sun_rays(49 + 25 * 1.06, 37 - 25 * 1.22, 8.0) + book(y=68, half=40))


def c7():
    """c5 لكن الكرة أعمق في الكتاب + لمسة كريمي داخل الكرة"""
    g = globe(49, 40, 25.0, 11.8, "c7", core=PURPLE)
    return (orbit(49, 41, 33, 9) + g + escape(49, 40, 25.0) + book(y=66, half=41))


VARIANTS = [("c1", c1), ("c2", c2), ("c3", c3), ("c4", c4), ("c5", c5), ("c6", c6), ("c7", c7)]

if __name__ == "__main__":
    for slug, fn in VARIANTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light")):
            with open(os.path.join(OUT, f"{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(bm.svg(body, plate, slug))
        tiny = "".join(
            f'<g transform="translate({i*28} 0) scale({s})">'
            f'<rect width="100" height="100" rx="22" fill="{INK}"/>{body}</g>'
            for i, s in enumerate((.26, .20, .16, .12)))
        with open(os.path.join(OUT, f"{slug}-icons.svg"), "w", encoding="utf-8") as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 26">{tiny}</svg>')
    print("wrote", len(VARIANTS))
