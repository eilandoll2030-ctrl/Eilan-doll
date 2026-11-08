#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — الشعار المربع يصير دائرة / THE SQUARE, ROUNDED
============================================================
طلب المالك: «أبغى نفس المربع يكون دائرة بنفس التصميم».

التصميم يُحفظ حرفيًا: نفس الـ٩ مكعبات، نفس الألوان، نفس ترتيب ٣×٣،
المكعب الذهبي مرفوع من الخانة العليا اليمنى (الخانة العليا اليمنى فارغة).

المشكلة الهندسية: في المربع، المكعب الذهبي عند (٧٤،٢) — أي خارج أي دائرة
نصف قطرها ٥٠. لذلك الدائرة تحتاج تحجيمًا للعنقود كله حول مركزه.

ثلاثة حلول (كلها بنفس الألوان والتصميم):
    A  «دائرة ممتلئة»  قرص غامق + العنقود محجَّم ليدخل كاملًا
    B  «دائرة بإطار»   بلا قرص ممتلئ، حلقة ذهبية رقيقة (أخفّ في الأيقونة)
    C  «مكعبات دائرية» ٨ مكعبات على محيط + القلب البنفسجي في المنتصف

python3 brand/tools/build_circle.py
"""
import os
import math

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "circle"))
os.makedirs(OUT, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE, SKY = "#0E0E0A", "#EFE8D4", "#0B2F22"

# ---- الهندسة الأصلية من assets/logo/eilan-icon.svg (لا تُغيَّر)
X0, Y0, STEP, CUBE, R = 6.0, 18.0, 27.0, 22.0, 6.0
GOLD_X, GOLD_Y = 74.0, 2.0
CELLS = [
    (X0, Y0, CREAM), (X0 + STEP, Y0, SAGE),
    (X0, Y0 + STEP, GREEN), (X0 + STEP, Y0 + STEP, PURPLE),
    (X0 + 2 * STEP, Y0 + STEP, DEEP),
    (X0, Y0 + 2 * STEP, DEEP), (X0 + STEP, Y0 + 2 * STEP, GREEN),
    (X0 + 2 * STEP, Y0 + 2 * STEP, SAGE),
]

# مركز العنقود ونصف قطره الأقصى — نحسب زوايا كل مكعب لا مركزه فقط
_BX = [c[0] for c in CELLS] + [GOLD_X]
_BY = [c[1] for c in CELLS] + [GOLD_Y]
CX0 = (min(_BX) + max(_BX) + CUBE) / 2
CY0 = (min(_BY) + max(_BY) + CUBE) / 2
from itertools import product as _prod


def _rounded_outline(x, y, w, h, rx, n=9):
    """نقاط على محيط مستطيل مستدير — الزوايا الحادة ليست هي الحدّ الحقيقي."""
    pts = []
    for i in range(n + 1):
        t = i / n
        # الأضلاع
        pts.append((x + rx + (w - 2 * rx) * t, y))
        pts.append((x + rx + (w - 2 * rx) * t, y + h))
        pts.append((x, y + rx + (h - 2 * rx) * t))
        pts.append((x + w, y + rx + (h - 2 * rx) * t))
    for cx_, cy_, a0 in ((x + rx, y + rx, 180), (x + w - rx, y + rx, 270),
                         (x + w - rx, y + h - rx, 0), (x + rx, y + h - rx, 90)):
        for i in range(n + 1):
            a = math.radians(a0 + 90 * i / n)
            pts.append((cx_ + math.cos(a) * rx, cy_ + math.sin(a) * rx))
    return pts


RMAX = 0.0
for _x, _y, _c in CELLS + [(GOLD_X, GOLD_Y, GOLD)]:
    _rx = CUBE * (6 / 22)
    for _px, _py in _rounded_outline(_x, _y, CUBE, CUBE, _rx):
        RMAX = max(RMAX, math.hypot(_px - CX0, _py - CY0))


def cluster_scale(r=50.0, margin=.95):
    return (r * margin) / RMAX


def cluster(cx, cy, r=50.0, k=None, rx_ratio=6 / 22):
    """العنقود كما هو، محجَّمًا ليدخل كاملًا في دائرة (cx,cy,r)."""
    if k is None:
        k = cluster_scale(r)
    cube, rr = CUBE * k, CUBE * k * rx_ratio
    out = []
    for x, y, col in CELLS:
        px = cx + (x + CUBE / 2 - CX0) * k
        py = cy + (y + CUBE / 2 - CY0) * k
        out.append(f'<rect x="{px-cube/2:.2f}" y="{py-cube/2:.2f}" width="{cube:.2f}" '
                   f'height="{cube:.2f}" rx="{rr:.2f}" fill="{col}"/>')
    gx = cx + (GOLD_X + CUBE / 2 - CX0) * k
    gy = cy + (GOLD_Y + CUBE / 2 - CY0) * k
    out.append(f'<rect x="{gx-cube/2:.2f}" y="{gy-cube/2:.2f}" width="{cube:.2f}" '
               f'height="{cube:.2f}" rx="{rr:.2f}" fill="{GOLD}"/>')
    return "".join(out)


def variant_a(cx=50, cy=50, r=50, plate=INK):
    """A — دائرة ممتلئة، التصميم كما هو."""
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{plate}"/>'
            + cluster(cx, cy, r))


def variant_b(cx=50, cy=50, r=49, ring=GOLD, w=1.5):
    """B — بلا قرص: حلقة ذهبية رقيقة تحدد الدائرة."""
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{ring}" '
            f'stroke-width="{w}" opacity=".85"/>' + cluster(cx, cy, r - 2.4))


def variant_c(cx=50, cy=50, r=50, plate=INK):
    """C — ترتيب دائري: ٨ مكعبات على المحيط، الذهبي في خانته العليا اليمنى.

    بديل مختلف عن «نفس التصميم» — معروض للمقارنة فقط.
    """
    n = 8
    cube = 15.0
    ring_r = r * .615
    order = [GOLD, SAGE, CREAM, GREEN, SAGE, DEEP, GREEN, SAND]
    out = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{plate}"/>']
    for i, col in enumerate(order):
        a = -math.pi / 4 - i * (2 * math.pi / n)     # نبدأ أعلى اليمين
        px = cx + math.cos(a) * ring_r
        py = cy + math.sin(a) * ring_r
        sz = cube * (1.06 if col == GOLD else 1.0)   # الذهبي أكبر قليلًا
        out.append(f'<rect x="{px-sz/2:.2f}" y="{py-sz/2:.2f}" width="{sz:.2f}" '
                   f'height="{sz:.2f}" rx="{sz*.27:.2f}" fill="{col}"/>')
    core = cube * 1.10
    out.append(f'<rect x="{cx-core/2:.2f}" y="{cy-core/2:.2f}" width="{core:.2f}" '
               f'height="{core:.2f}" rx="{core*.27:.2f}" fill="{PURPLE}"/>')
    return "".join(out)


def svg(body, w=100, h=100):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}">{body}</svg>')


def check_fit(cx, cy, r):
    """يتأكد أن كل مكعب (قمة/زوايا) داخل الدائرة."""
    k = cluster_scale(r)
    worst = 0.0
    for x, y, _ in CELLS + [(GOLD_X, GOLD_Y, GOLD)]:
        for dx, dy in _prod((0, CUBE), (0, CUBE)):
            px = cx + (x + dx - CX0) * k
            py = cy + (y + dy - CY0) * k
            worst = max(worst, math.hypot(px - cx, py - cy))
    return worst, r


if __name__ == "__main__":
    specs = [
        ("a-dark", variant_a(plate=INK)),
        ("a-light", variant_a(plate=PLATE)),
        ("a-sky", variant_a(plate=SKY)),
        ("a-bare", variant_a(plate="none")),
        ("b-dark", variant_b()),
        ("b-dark-onlight", variant_b(plate=None, ring=GREEN) if False else variant_b()),
        ("c-dark", variant_c(plate=INK)),
        ("c-light", variant_c(plate=PLATE)),
    ]
    files = []
    for name, body in specs:
        body = body.replace('fill="none"/>', 'fill="none"/>', 1)
        open(os.path.join(OUT, f"circle-{name}.svg"), "w", encoding="utf-8").write(
            svg(body))
        files.append(f"circle-{name}.svg")

    # أحادي اللون (للختم والطباعة)
    for nm, col in [("mono-cream", CREAM), ("mono-ink", INK)]:
        k = cluster_scale(50.0)
        cube, rr = CUBE * k, CUBE * k * (6 / 22)
        parts = []
        for x, y, _ in CELLS:
            px = 50 + (x + CUBE / 2 - CX0) * k
            py = 50 + (y + CUBE / 2 - CY0) * k
            parts.append(f'<rect x="{px-cube/2:.2f}" y="{py-cube/2:.2f}" '
                         f'width="{cube:.2f}" height="{cube:.2f}" rx="{rr:.2f}" '
                         f'fill="{col}"/>')
        gx = 50 + (GOLD_X + CUBE / 2 - CX0) * k
        gy = 50 + (GOLD_Y + CUBE / 2 - CY0) * k
        parts.append(f'<rect x="{gx-cube/2:.2f}" y="{gy-cube/2:.2f}" width="{cube:.2f}" '
                     f'height="{cube:.2f}" rx="{rr:.2f}" fill="{col}"/>')
        open(os.path.join(OUT, f"circle-{nm}.svg"), "w", encoding="utf-8").write(
            svg("".join(parts)))
        files.append(f"circle-{nm}.svg")

    w, r = check_fit(50, 50, 50)
    print(f"wrote {len(files)} files → {OUT}")
    print(f"  fit check: farthest rounded corner = {w:.2f} · radius = {r} "
          f"· {'OK' if w <= r else 'OVERFLOW'}")
    print(f"  cluster scale k = {cluster_scale(50.0):.4f}")
