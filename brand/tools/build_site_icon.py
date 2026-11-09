#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — أيقونة الموقع: القرص دائرة بدل مربع
=================================================
طلب المالك: «الشعار اللي في إيلان — بدل ما تخليه مربع خليه دائري،
نفس الألوان نفس الطريقة».

المصدر: assets/logo/eilan-icon.svg (لم يُلمس)
    ٩ مكعبات · ٣×٣ · الذهبي مرفوع من الخانة العليا اليمنى
    اللون الوحيد الذي تغيّر: المستطيل الخلفي (rx 22) ← دائرة

الهندسة تُستخرج من الملف الأصلي نفسه بلا تخمين:
    القرص المربع 0..100، transform="translate(50 50) scale(.84) translate(-51 -48)"
    ⇒ نحسب مركز العنقود ونصف قطره، ثم نُدخله داخل دائرة نصف قطرها 50.

python3 brand/tools/build_site_icon.py
"""
import os
import math

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
OUT = os.path.normpath(os.path.join(HERE, "..", "site-icon"))
os.makedirs(OUT, exist_ok=True)
PNG = os.path.join(OUT, "png")
os.makedirs(PNG, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE = "#0E0E0A", "#EFE8D4"

# من assets/logo/eilan-icon.svg — منسوخة حرفيًا
CUBES = [
    (6, 18, CREAM), (33, 18, SAGE),
    (6, 45, GREEN), (33, 45, PURPLE), (60, 45, DEEP),
    (6, 72, DEEP), (33, 72, GREEN), (60, 72, SAGE),
    (74, 2, GOLD),                       # المكعب الذهبي المرفوع
]
SIDE, RADIUS = 22.0, 6.0
SRC_SCALE = 0.84
SRC_CX, SRC_CY = 51.0, 48.0              # من translate(-51 -48)


def cluster_centre_and_radius():
    """مركز العنقود ونصف قطره في إحداثيات الملف الأصلي (بعد التحويل)."""
    xs = [x for x, _, _ in CUBES]
    ys = [y for _, y, _ in CUBES]
    cx = (min(xs) + max(xs) + SIDE) / 2
    cy = (min(ys) + max(ys) + SIDE) / 2
    # أبعد زاوية — نأخذ الزوايا الحادة (تحفّظ: أكبر من الزاوية المستديرة)
    rmax = 0.0
    for x, y, _ in CUBES:
        for dx, dy in ((0, 0), (SIDE, 0), (0, SIDE), (SIDE, SIDE)):
            rmax = max(rmax, math.hypot(x + dx - cx, y + dy - cy))
    return cx, cy, rmax


def icon(disc=True, plate=INK, gold_ring=False, scale=None, pad=0.94):
    """الأيقونة: قرص (دائرة أو مربع) + العنقود نفسه."""
    cx, cy, rmax = cluster_centre_and_radius()
    k = (50 * pad) / rmax if scale is None else scale
    out = []
    if plate:
        if disc:
            out.append(f'<circle cx="50" cy="50" r="50" fill="{plate}"/>')
        else:
            out.append(f'<rect width="100" height="100" rx="22" fill="{plate}"/>')
    for x, y, col in CUBES:
        # إلى إحداثيات viewBox 100: مركز كل مكعب حول (50,50)
        px = 50 + (x + SIDE / 2 - cx) * k
        py = 50 + (y + SIDE / 2 - cy) * k
        s = SIDE * k
        rr = RADIUS * k
        if col == GOLD and gold_ring:
            out.append(f'<circle cx="{px:.3f}" cy="{py:.3f}" r="{s*0.5:.3f}" '
                       f'fill="none" stroke="{GOLD}" stroke-width="{s*0.28:.3f}"/>')
        else:
            out.append(f'<rect x="{px-s/2:.3f}" y="{py-s/2:.3f}" width="{s:.3f}" '
                       f'height="{s:.3f}" rx="{rr:.3f}" fill="{col}"/>')
    return "".join(out)


def svg(body, w=100, h=100):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}">{body}</svg>')


if __name__ == "__main__":
    cx, cy, rmax = cluster_centre_and_radius()
    print(f"cluster centre ({cx:.1f},{cy:.1f}) · max radius {rmax:.2f}")

    specs = [
        ("icon-circle-dark", dict(disc=True, plate=INK)),
        ("icon-circle-light", dict(disc=True, plate=PLATE)),
        ("icon-circle-bare", dict(disc=False, plate=None)),
        ("icon-circle-ring", dict(disc=True, plate=INK, gold_ring=True)),
        ("icon-square-ref", dict(disc=False, plate=INK)),
    ]
    files = []
    for name, kw in specs:
        open(os.path.join(OUT, f"{name}.svg"), "w", encoding="utf-8").write(
            svg(icon(**kw)))
        files.append(f"{name}.svg")

    # أحادي اللون
    for nm, col in [("icon-mono-cream", CREAM), ("icon-mono-ink", INK)]:
        body = icon(disc=False, plate=None)
        body = body.replace(GREEN, col).replace(DEEP, col).replace(SAGE, col) \
                   .replace(CREAM, col).replace(SAND, col).replace(PURPLE, col) \
                   .replace(GOLD, col)
        open(os.path.join(OUT, f"{nm}.svg"), "w", encoding="utf-8").write(svg(body))
        files.append(f"{nm}.svg")

    # تحقّق هندسي: هل كل مكعب داخل القرص؟
    k = (50 * 0.94) / rmax
    worst = 0.0
    for x, y, _ in CUBES:
        for dx, dy in ((0, 0), (SIDE, 0), (0, SIDE), (SIDE, SIDE)):
            px = 50 + (x + dx - cx) * k
            py = 50 + (y + dy - cy) * k
            worst = max(worst, math.hypot(px - 50, py - 50))
    print(f"worst cube corner: {worst:.2f} / radius 50 → "
          f"{'OK' if worst <= 50 else 'OVERFLOW'}")
    print(f"wrote {len(files)} svg → {OUT}")
