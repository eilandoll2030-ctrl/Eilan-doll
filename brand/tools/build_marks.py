#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «مكعبات تبني عالم» / institutional cube marks  (v4)

Six directions that keep the approved identity (3x3 cube rhythm, one lifted gold
cube, green / cream / one purple accent) and read as an institution:
شركة اليوم → جامعة ومعهد ومدرسة غداً.

Each direction is written as: dark plate, cream plate, bare (transparent).

    python3 brand/tools/build_marks.py
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "marks"))
os.makedirs(OUT, exist_ok=True)

# ---- approved palette (CLAUDE.md: no mint, no tiffany, no green→purple gradient)
CREAM  = "#EBDDB0"
SAND   = "#F6E3A8"
SAGE   = "#7FAA8A"
GREEN  = "#3E7A55"
DEEP   = "#2F5E42"
PURPLE = "#4A2682"
GOLD   = "#E0B454"
INK    = "#0E0E0A"
PLATE  = "#EFE8D4"      # cream plate, never pure white


def _rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    ra, ga, ba = _rgb(a)
    rb, gb, bb = _rgb(b)
    return "#%02X%02X%02X" % (round(ra + (rb - ra) * t),
                              round(ga + (gb - ga) * t),
                              round(ba + (bb - ba) * t))


def light(c, t=.30):
    return mix(c, "#FFFFFF", t)


def dark(c, t=.34):
    return mix(c, INK, t)


# ------------------------------------------------------------------ primitives
def sq(x, y, s, fill, rx=.27):
    edge = (f' stroke="{GREEN}" stroke-opacity=".20" stroke-width=".7"'
            if fill in (CREAM, SAND) else "")
    return (f'<rect x="{x:.2f}" y="{y:.2f}" width="{s:.2f}" height="{s:.2f}" '
            f'rx="{s * rx:.2f}" fill="{fill}"{edge}/>')


def iso(cx, cy, a, base):
    """isometric cube — (cx,cy) = centre of the top rhombus, a = edge."""
    hx, hy = a * .866, a * .5
    top = (f"{cx:.2f},{cy - hy:.2f} {cx + hx:.2f},{cy:.2f} "
           f"{cx:.2f},{cy + hy:.2f} {cx - hx:.2f},{cy:.2f}")
    lf = (f"{cx - hx:.2f},{cy:.2f} {cx:.2f},{cy + hy:.2f} "
          f"{cx:.2f},{cy + hy + a:.2f} {cx - hx:.2f},{cy + a:.2f}")
    rf = (f"{cx + hx:.2f},{cy:.2f} {cx:.2f},{cy + hy:.2f} "
          f"{cx:.2f},{cy + hy + a:.2f} {cx + hx:.2f},{cy + a:.2f}")
    edge = (f' stroke="{GREEN}" stroke-opacity=".20" stroke-width=".7"'
            if base in (CREAM, SAND) else "")
    return (f'<polygon points="{lf}" fill="{base}"/>'
            f'<polygon points="{rf}" fill="{dark(base)}"/>'
            f'<polygon points="{top}" fill="{light(base, .34)}"{edge}/>')


CREAM_ON_LIGHT = "#DBC894"      # colour separation: the cream cube must not vanish on cream paper


def svg(body, plate=None, label="إيلان دول | EILAN DOLL"):
    bg = {"dark": f'<rect width="100" height="100" rx="22" fill="{INK}"/>',
          "light": f'<rect width="100" height="100" rx="22" fill="{PLATE}"/>'}.get(plate, "")
    if plate == "light":
        body = body.replace(CREAM, CREAM_ON_LIGHT)
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            f'role="img" aria-label="{label}">{bg}{body}</svg>\n')


# =====================================================================
# 1 — «مكعبات»  AL-MUKA'ABAT / Cubes
#     the mark we already have, one step into the third dimension:
#     the same 3x3 rhythm and the same lifted gold cube — now real cubes.
# =====================================================================
def mark_cubes():
    a = 9.4
    dx = a * 1.732 + 2.0          # column pitch
    dy = a * 1.5 + 2.2            # row pitch
    cx0 = 50 - dx                 # left column
    cy0 = 32.0                    # top row (centre of top face)
    cells = [[CREAM, SAGE, None],
             [GREEN, PURPLE, DEEP],
             [DEEP, GREEN, SAGE]]
    out = []
    for r in range(3):
        for c in range(3):
            if cells[r][c] is None:
                continue
            out.append(iso(cx0 + c * dx, cy0 + r * dy, a, cells[r][c]))
    out.append(iso(cx0 + 2 * dx + 1.2, cy0 - dy - 6.0, a, GOLD))
    return "".join(out)


# =====================================================================
# 2 — «البوابة»  AL-BAWABA / The Gate
#     the grid opens at the bottom centre: a door. The gold cube is lifted
#     above it like a keystone / a light you walk toward.
# =====================================================================
def mark_gate():
    s, gap = 19.0, 6.5
    step = s + gap
    x0, y0 = 8.5, 24.5
    cells = [[CREAM, SAGE, SAGE],
             [GREEN, None, DEEP],
             [DEEP, None, GREEN]]
    out = []
    for r in range(3):
        for c in range(3):
            if cells[r][c] is None:
                continue
            out.append(sq(x0 + c * step, y0 + r * step, s, cells[r][c]))
    out.append(sq(x0 + step, 2.5, s, GOLD))
    return "".join(out)


# =====================================================================
# 3 — «البناء»  AL-BINA' / The Build
#     cubes stack 1 → 2 → 3: a school that grows into a university.
# =====================================================================
def mark_build():
    s, gap = 17.0, 4.5
    step = s + gap
    x0 = 50 - (3 * s + 2 * gap) / 2
    base_y = 76.0
    cols = [[DEEP], [PURPLE, SAGE], [DEEP, GREEN, GOLD]]
    out = []
    for i, col in enumerate(cols):
        for j, colour in enumerate(col):
            out.append(sq(x0 + i * step, base_y - j * step, s, colour))
    return "".join(out)


# =====================================================================
# 4 — «الشبكة»  AL-SHABAKA / The Network
#     the same 3x3, cubes wired: every cube a node, every wire a road.
# =====================================================================
def mark_network():
    s, gap = 18.5, 6.5
    step = s + gap
    x0, y0 = 8.5, 25.0
    cells = [[CREAM, SAGE, None],
             [GREEN, PURPLE, DEEP],
             [DEEP, GREEN, SAGE]]
    cen = lambda c, r: (x0 + c * step + s / 2, y0 + r * step + s / 2)
    wires = [(0, 0, 1, 0), (0, 0, 0, 1), (1, 0, 1, 1), (1, 1, 2, 1),
             (1, 1, 1, 2), (0, 1, 0, 2), (2, 1, 2, 2), (0, 2, 1, 2), (1, 2, 2, 2)]
    out = [f'<g stroke="{GOLD}" stroke-width="2.4" stroke-linecap="round" opacity=".85">']
    for c1, r1, c2, r2 in wires:
        (ax, ay), (bx, by) = cen(c1, r1), cen(c2, r2)
        out.append(f'<line x1="{ax:.1f}" y1="{ay:.1f}" x2="{bx:.1f}" y2="{by:.1f}"/>')
    out.append("</g>")
    for r in range(3):
        for c in range(3):
            if cells[r][c] is None:
                continue
            out.append(sq(x0 + c * step, y0 + r * step, s, cells[r][c]))
    out.append(sq(x0 + 2 * step, 2.5, s, GOLD))
    return "".join(out)


# =====================================================================
# 5 — «الحرم»  AL-HARAM / The Campus
#     the cubes become buildings on one ground line; gold crowns the tallest.
# =====================================================================
def mark_campus():
    a = 11.4
    dx = 21.4
    base = 64.0
    out = []
    towers = [(50 - dx, 2, GREEN), (50, 3, SAGE), (50 + dx, 1, DEEP)]
    for cx, height, colour in towers:
        for i in range(height):
            cy = base - i * a
            top = (i == height - 1)
            col = GOLD if (top and colour == SAGE) else (light(colour, .16) if top else colour)
            out.append(iso(cx, cy, a, col))
    out.append(iso(50 - dx / 2, base + a * 1.02, a, PURPLE))     # low wing
    out.append(iso(50 + dx / 2, base + a * 1.02, a, DEEP))        # low wing
    return "".join(out)


# =====================================================================
# 6 — «الختم»  AL-KHATM / The Seal
#     flat 3x3, but the left column is dressed as a crest bar: the mark a
#     university stamps on a certificate or a gate sign.
# =====================================================================
def mark_seal():
    s, gap = 19.0, 6.5
    step = s + gap
    x0, y0 = 8.5, 24.5
    cells = [[SAGE, CREAM, GREEN],
             [DEEP, PURPLE, None],
             [DEEP, GREEN, SAGE]]
    out = []
    for r in range(3):
        for c in range(3):
            if cells[r][c] is None:
                continue
            out.append(sq(x0 + c * step, y0 + r * step, s, cells[r][c]))
    out.append(sq(x0 + 2 * step, 2.5, s, GOLD))
    return "".join(out)




# =====================================================================
# عائلة العلامة — AL-AA'ILA / Brand family
#     one grid, one lit cube. Same mark for the company today and for the
#     university / institute / school it grows into.
# =====================================================================
FAMILY = [
    ("company",  "الشركة",   "EILAN DOLL",  (0, 2)),   # top-right, the classic
    ("academy",  "الجامعة",  "EILAN UNI",   (1, 1)),   # centre
    ("institute", "المعهد",  "EILAN INST",  (2, 0)),   # bottom-left
    ("school",   "المدرسة",  "EILAN SCH",   (0, 0)),   # top-left
    ("studio",   "الاستوديو", "EILAN LAB",  (2, 2)),   # bottom-right
]


def mark_family(lit):
    s, gap = 19.0, 6.5
    step = s + gap
    x0, y0 = 8.5, 26.0
    grid = [[CREAM, SAGE, GREEN],
            [GREEN, PURPLE, DEEP],
            [DEEP, GREEN, SAGE]]
    out = []
    for r in range(3):
        for c in range(3):
            col = GOLD if lit == (r, c) else grid[r][c]
            out.append(sq(x0 + c * step, y0 + r * step, s, col))
    return "".join(out)

MARKS = [
    ("a-cubes",   "مكعبات",  "Cubes",       mark_cubes),
    ("b-gate",    "البوابة", "The Gate",    mark_gate),
    ("c-build",   "البناء",  "The Build",   mark_build),
    ("d-network", "الشبكة",  "The Network", mark_network),
    ("e-campus",  "الحرم",   "The Campus",  mark_campus),
    ("f-seal",    "الختم",   "The Seal",    mark_seal),
]

if __name__ == "__main__":
    for slug, ar, en, fn in MARKS:
        body = fn()
        label = f"إيلان دول — {ar} / {en}"
        for kind, plate in (("dark", "dark"), ("light", "light"), ("bare", None)):
            with open(os.path.join(OUT, f"eilan-{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, label))
    for slug, ar, en, lit in FAMILY:
        body = mark_family(lit)
        label = f"إيلان دول — {ar} / {en}"
        for kind, plate in (("dark", "dark"), ("light", "light"), ("bare", None)):
            with open(os.path.join(OUT, f"family-{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, label))
    print("wrote", (len(MARKS) + len(FAMILY)) * 3, "files →", OUT)
