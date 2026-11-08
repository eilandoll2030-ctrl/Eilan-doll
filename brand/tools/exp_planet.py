#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «كوكب ينبني» / planet-built-from-cubes study
Experiments for the final one-logo concept:
    planet + mind + book + light — all in the cube language of the identity.

    python3 brand/tools/exp_planet.py
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


# ---------------------------------------------------------------- helpers
def hex_disc(R=2, a=9.0, shade=True):
    """isometric cube disc — a planet made of cubes. returns (svg, gold_slot)"""
    hx, hy = a * .866, a * .5
    cells = []
    for i in range(-R, R + 1):
        for j in range(-R, R + 1):
            k = i + j
            if abs(k) > R:
                continue
            cells.append((i, j))
    # sort back-to-front (far first)
    cells.sort(key=lambda c: (c[0] + c[1], c[0]))
    out = []
    mx = max(abs(i - j) for i, j in cells)
    for i, j in cells:
        cx = 50 + (i - j) * hx
        cy = 45 + (i + j) * hy
        d = ((i - j) ** 2 * 1.0 + (i + j) ** 2 * 0.55) ** .5 / (2 * 1.6)
        # shading: light from top-left, darker toward bottom-right
        base = GREEN if d < .55 else DEEP
        if (i - j) + (i + j) < -1:
            base = SAGE if d > .35 else GREEN
        if shade and (i + j) >= 2:
            base = dark(DEEP, .18)
        out.append(iso(cx, cy, a, base))
    return "".join(out)


def hex_disc_R3(a=6.6):
    return hex_disc(3, a)


def planet_gold(R=2, a=9.0):
    hx, hy = a * .866, a * .5
    body = hex_disc(R, a)
    # gold cube hovering above the top-right of the disc
    cx = 50 + (R - 0) * hx * 0.92
    cy = 45 + (-R) * hy - a * 1.6
    return body + iso(cx, cy, a, GOLD)


# ---------------------------------------------------------------- variants
def v_planet():
    """1 — planet built of cubes, one gold cube still flying in"""
    return planet_gold(2, 9.4)


def v_planet_orbit():
    """2 — same planet + a thin orbital arc (digital world)"""
    a = 9.4
    body = hex_disc(2, a)
    arc = (f'<path d="M12 62 A44 44 0 0 0 88 40" fill="none" stroke="{GOLD}" '
           f'stroke-width="1.6" stroke-linecap="round" opacity=".55"/>')
    cx = 50 + 2 * a * .866 * 0.92
    cy = 45 - 2 * a * .5 - a * 1.6
    return arc + body + iso(cx, cy, a, GOLD)


def v_dome():
    """3 — half-built planet: a dome of cubes on an open book"""
    a = 7.6
    hx, hy = a * .866, a * .5
    # book: two isometric page slabs
    W, H = 34, 15
    book = (f'<polygon points="48,88 14,76 30,68 48,78" fill="{CREAM}"/>'
            f'<polygon points="52,88 86,76 70,68 52,78" fill="{SAND}"/>'
            f'<polygon points="48,78 14,76 47,72 48,78" fill="{light(CREAM,.3)}"/>')
    cells = []
    for i in range(-2, 3):
        for j in range(-2, 3):
            if i + j > 0 or (i + j) == 0:
                cells.append((i, j))
    cells.sort(key=lambda c: c[0] + c[1])
    out = [book]
    for i, j in cells:
        cx = 50 + (i - j) * hx
        cy = 58 + (i + j) * hy
        out.append(iso(cx, cy, a, GREEN if (i + j) < 0 else DEEP))
    return "".join(out)


def v_book():
    """4 — book whose pages are cube grids, gold cube = the light of knowledge"""
    a = 6.8
    g = []
    # left page grid 3x2
    for c in range(3):
        for r in range(2):
            g.append(sq(12 + c * 13.5, 40 + r * 13.5, 11.5, CREAM if r == 0 else SAND))
    for c in range(3):
        for r in range(2):
            g.append(sq(53 + c * 13.5, 40 + r * 13.5, 11.5, CREAM if r == 0 else SAND))
    out = [f'<polygon points="49,34 6,34 6,74 49,74" fill="none"/>']
    out += g
    out.append(f'<rect x="47.5" y="32" width="5" height="44" rx="2.5" fill="{DEEP}"/>')
    out.append(sq(44, 8, 13, GOLD))
    # light rays
    for dx, dy in ((-13, -6), (13, -6), (0, -8)):
        out.append(f'<line x1="{44+6.5}" y1="8" x2="{44+6.5+dx}" y2="{8+dy}" '
                   f'stroke="{GOLD}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>')
    return "".join(out)


def v_brain():
    """5 — mind: a cube cluster in a brain-ish silhouette + gold idea"""
    a = 7.4
    hx, hy = a * .866, a * .5
    pat = [  # (i,j) cells of a brain-ish blob
        (-2, -1), (-1, -2), (0, -2), (1, -2), (2, -1),
        (-3, 0), (-2, 0), (-1, -1), (0, -1), (1, -1), (2, 0), (3, 0),
        (-2, 1), (-1, 0), (0, 0), (1, 0), (2, 1),
        (-1, 1), (0, 1), (1, 1),
        (0, 2),
    ]
    pat.sort(key=lambda c: c[0] + c[1])
    out = []
    for i, j in pat:
        cx = 50 + (i - j) * hx
        cy = 44 + (i + j) * hy
        col = SAGE if (i - j) < -2 else (PURPLE if (i, j) == (0, 0) else GREEN)
        if (i + j) >= 1:
            col = DEEP
        out.append(iso(cx, cy, a, col))
    out.append(iso(50 + 2 * hx, 44 - 2 * hy - a * 1.7, a, GOLD))
    return "".join(out)


def v_cube_world():
    """6 — one big cube that holds a world: orbit + gold edge"""
    a = 26
    out = [f'<ellipse cx="50" cy="52" rx="44" ry="15" fill="none" stroke="{GOLD}" '
           f'stroke-width="1.5" opacity=".45" transform="rotate(-18 50 52)"/>']
    out.append(iso(50, 26, a, GREEN))
    return "".join(out)


VARIANTS = [
    ("p1-planet", v_planet),
    ("p2-planet-orbit", v_planet_orbit),
    ("p3-dome-book", v_dome),
    ("p4-book", v_book),
    ("p5-brain", v_brain),
    ("p6-cube-world", v_cube_world),
]

if __name__ == "__main__":
    for slug, fn in VARIANTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light")):
            with open(os.path.join(OUT, f"{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, slug))
    print("wrote", len(VARIANTS) * 2, "→", OUT)
