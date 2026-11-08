#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «الشبكة المتراصة + الدائرة الذهبية» / THE TIGHT GRID
==================================================================
طلب المالك: «خليها جنب بعض ومتراصة، والدائرة الذهبية فوق وبعيدة —
نفس الشعار الأساسي بس دائرة بدال المربع».

الهندسة **مقيسة من صورة الشعار الأصلية بالبكسل**، لا مخمّنة:
    شبكة ١٣×١٣ · ٤٠ مكعبًا مفردًا (المكعبات متراكبة ٥٠٪)
    جانب المكعب 42px · الميل 52px · الفراغ بين المكعبات 10px
    نصف قطر الزاوية 11px  (≈ ٠.٢٦ من جانب المكعب)
    الشبكة 665×665px · الدائرة الذهبية 42px
    الدائرة أعلى بـ٥٢px ويمين الشبكة بـ٦٣px (مرفوعة وبعيدة)

قاعدة الهوية «لا تيفاني ولا مينت» محفوظة: الأخضر #3E7A55 فقط،
والأصفر الذهبي #E0B454. الشكل الوحيد الذي تغيّر: **مربع ← دائرة**.

python3 brand/tools/build_dot.py
"""
import os

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "dot"))
os.makedirs(OUT, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE, SKY = "#0E0E0A", "#EFE8D4", "#0B2F22"

# ---- القياسات المستخرجة من الصورة (بالبكسل، ثم نُسقطها على viewBox 100)
SRC_ROW0, SRC_COL0 = 313.0, 255.0
SRC_PITCH, SRC_SIDE = 52.0, 42.0
SRC_GOLD = (1003.5, 281.5, 42.0)      # cx, cy, side
SRC_GRID_BOX = (255, 313, 666, 666)   # x, y, w, h

RADIUS_RATIO = 0.26                   # زاوية المكعب
# الخريطة المقيسة (١٣ صفًا) — الحدود اليسرى/اليمنى لكل صف
ROW_SPAN = [(5, 7), (3, 9), (2, 10), (1, 11), (1, 11), (0, 12), (0, 12),
            (0, 12), (1, 11), (1, 11), (2, 10), (3, 9), (5, 7)]


def cells():
    out = []
    for r, (a, b) in enumerate(ROW_SPAN):
        for c in range(a, b + 1):
            out.append((r, c))
    return out


def to_view(x, y, side, pad=6.0):
    """تحويل بكسل الصورة إلى viewBox 0..100 حول حدود العنقود كله."""
    gx, gy, gw, gh = SRC_GRID_BOX
    # حدود العنقود = الشبكة + الدائرة الذهبية
    minx = min(gx, SRC_GOLD[0] - SRC_GOLD[2] / 2)
    maxx = max(gx + gw, SRC_GOLD[0] + SRC_GOLD[2] / 2)
    miny = min(gy, SRC_GOLD[1] - SRC_GOLD[2] / 2)
    maxy = max(gy + gh, SRC_GOLD[1] + SRC_GOLD[2] / 2)
    w, h = maxx - minx, maxy - miny
    scale = (100 - 2 * pad) / max(w, h)
    ox = pad + ((100 - 2 * pad) - w * scale) / 2
    oy = pad + ((100 - 2 * pad) - h * scale) / 2
    return (ox + (x - minx) * scale, oy + (y - miny) * scale, side * scale)


def svg_grid(color=GREEN, gold_shape="circle", plate=None, gold_color=GOLD,
             gold_ring=False, grid_color=None):
    """الشعار: مكعبات متراصة + شكل ذهبي فوق يمين."""
    gcol = grid_color or color
    body = []
    if plate:
        body.append(f'<rect width="100" height="100" fill="{plate}"/>')
    for r, c in cells():
        x, y = SRC_COL0 + c * SRC_PITCH, SRC_ROW0 + r * SRC_PITCH
        vx, vy, vs = to_view(x, y, SRC_SIDE)
        body.append(f'<rect x="{vx:.2f}" y="{vy:.2f}" width="{vs:.2f}" height="{vs:.2f}" '
                    f'rx="{vs*RADIUS_RATIO:.2f}" fill="{gcol}"/>')
    gx, gy, gs = to_view(SRC_GOLD[0] - SRC_GOLD[2] / 2, SRC_GOLD[1] - SRC_GOLD[2] / 2,
                         SRC_GOLD[2])
    cx, cy = gx + gs / 2, gy + gs / 2
    if gold_shape == "circle":
        if gold_ring:
            body.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{gs/2:.2f}" '
                        f'fill="none" stroke="{gold_color}" stroke-width="{gs*0.15:.2f}"/>')
        else:
            body.append(f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{gs/2:.2f}" '
                        f'fill="{gold_color}"/>')
    elif gold_shape == "square":
        body.append(f'<rect x="{gx:.2f}" y="{gy:.2f}" width="{gs:.2f}" height="{gs:.2f}" '
                    f'rx="{gs*RADIUS_RATIO:.2f}" fill="{gold_color}"/>')
    return "".join(body), (cx, cy, gs)


def svg(body, w=100, h=100):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}">{body}</svg>')


def lockup(plate=INK, gold_shape="circle", name="EILAN DOLL"):
    """الشعار + الاسم — نفس ترتيب الصورة المرجعية، بمسافات مشدودة."""
    W, H = 400, 460
    body, _ = svg_grid(plate=None, gold_shape=gold_shape)
    out = [f'<rect width="{W}" height="{H}" fill="{plate}"/>']
    m = 196
    out.append(f'<g transform="translate({(W-m)/2} 24) scale({m/100:.3f})">{body}</g>')
    out.append(f'<text x="{W/2}" y="330" text-anchor="middle" font-family="Poppins" '
               f'font-weight="800" font-size="50" letter-spacing="2" fill="{CREAM}">{name}</text>')
    out.append(f'<text x="{W/2}" y="374" text-anchor="middle" font-family="Orbitron" '
               f'font-weight="800" font-size="16" letter-spacing="6.5" fill="{GOLD}">'
               f'THE DIGITAL WORLD</text>')
    out.append(f'<text x="{W/2}" y="420" text-anchor="middle" font-family="Cairo" '
               f'font-weight="700" font-size="25" fill="{CREAM}">عالم إيلان دول الرقمي</text>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'width="{W}" height="{H}">' + "".join(out) + '</svg>')


if __name__ == "__main__":
    files = []

    variants = [
        ("dot-dark", dict(plate=INK)),
        ("dot-light", dict(plate=PLATE)),
        ("dot-sky", dict(plate=SKY)),
        ("dot-bare", dict(plate=None)),
        ("dot-ring", dict(plate=INK, gold_ring=True)),
        ("dot-square-ref", dict(plate=INK, gold_shape="square")),
    ]
    for name, kw in variants:
        body, _ = svg_grid(**kw)
        open(os.path.join(OUT, f"{name}.svg"), "w", encoding="utf-8").write(svg(body))
        files.append(f"{name}.svg")

    # أحادي اللون
    for nm, col in [("dot-mono-cream", CREAM), ("dot-mono-ink", INK)]:
        body, _ = svg_grid(plate=None, grid_color=col, gold_color=col)
        open(os.path.join(OUT, f"{nm}.svg"), "w", encoding="utf-8").write(svg(body))
        files.append(f"{nm}.svg")

    # لوك-أب مع الاسم
    for nm, plate in [("dot-lockup-dark", INK), ("dot-lockup-light", PLATE)]:
        open(os.path.join(OUT, f"{nm}.svg"), "w", encoding="utf-8").write(
            lockup(plate=plate))
        files.append(f"{nm}.svg")

    # التحقق: الشكل يقع داخل الإطار ولا يخرج
    _, (cx, cy, gs) = svg_grid(plate=None)
    print(f"wrote {len(files)} files → {OUT}")
    print(f"  cubes: {len(cells())} · gold circle: r={gs/2:.2f} at ({cx:.2f},{cy:.2f})")
    print(f"  gold right edge: {cx+gs/2:.2f} · bottom: {cy+gs/2:.2f} (should be ≤ 100)")
