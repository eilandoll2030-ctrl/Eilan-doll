#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — «كوكب مكعبات يتركّب» / THE PLANET ASSEMBLING
=========================================================
فكرة المالك: «كوكب مكعبات — كوكب يتركّب».

هندسة شعارك المعتمد تُعاد استخدامها حرفيًا (نفس globe من build_final.py):
بلاطات مستديرة **بحجم ثابت**، لونها حسب بعدها من المركز
(المركز ساطع SAGE ← الحافة غامق DEEP) ⇒ لذلك تُقرأ كرة لا قرصًا.
الخطأ الذي وقعت فيه سابقًا: تصغير البلاطات على الحواف ⇒ بقع باهتة.

الجديد هنا هو **التركيب**: كل بلاطة لها دور (t) من المركز للخارج،
فتبدأ الفكرة كمكعب بنفسجي واحد (العقل) ثم تتراكم المكعبات حوله
حتى يكتمل الكوكب — ثم يطلع المكعب الذهبي.

يولّد:
    brand/globe/g-*.svg           لقطات التركيب (٠ → ١٠٠٪)
    brand/globe/planet-*.svg      الشعار النهائي (غامق/فاتح/ليلي/شفاف/أيقونة/أحادي)
    brand/globe/planet-anim.svg   نسخة متحركة (SMIL — بلا JS)
    brand/globe/globe-poster.{svg,png}

    python3 brand/tools/build_globe.py
"""
import os
import math
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "globe"))
os.makedirs(OUT, exist_ok=True)

_spec = importlib.util.spec_from_file_location("bf", os.path.join(HERE, "build_final.py"))
bf = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bf)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    bf.CREAM, bf.SAND, bf.SAGE, bf.GREEN, bf.DEEP, bf.PURPLE, bf.GOLD)
INK, PLATE = bf.INK, bf.PLATE
SKY = "#0B2F22"
darkc, lightc, mix = bf.darkc, bf.lightc, bf.mix
FONTS = bf.FONT_FILES


# ------------------------------------------------------------------ geometry
def planet_cells(r=27.0, cell=13.2, gap=3.0):
    """نفس خلايا globe() في الشعار المعتمد + t (دور التركيب: المركز أولًا)."""
    step = cell + gap
    n = int(r / (step * .5)) + 2
    cells = []
    for i in range(-n, n + 1):
        for j in range(-n, n + 1):
            if abs(i + j) > 2:
                continue
            px = (i - j) * step * .5
            py = (i + j) * step * .46
            h = (i * 73856093 ^ j * 19349663) & 0xffff
            d = math.hypot((i - j) * .5 + .35, (i + j) * .46 + .30) / 1.5
            col = SAGE if d < .50 else (GREEN if d < 1.0 else DEEP)
            if h % 5 == 0:
                col = lightc(col, .16)
            elif h % 7 == 0:
                col = darkc(col, .12)
            if h % 17 == 0:
                col = mix(col, SAND, .22)
            cells.append({"i": i, "j": j, "x": px, "y": py,
                          "d": d, "col": col, "h": h})
    cells.sort(key=lambda c: (c["d"], c["x"]))
    total = len(cells)
    for k, c in enumerate(cells):
        c["t"] = k / max(1, total - 1)      # 0 = المركز … 1 = الحافة
    return cells


def planet(r=27.0, cx=50.0, cy=45.0, cell=13.2, gap=3.0,
           reveal=1.0, core=True, uid="pl", base_ball=True):
    """
    الكوكب بلقطات تركيب. reveal=1 ⇒ الشعار النهائي تمامًا كما هو معتمد.
    """
    step = cell + gap
    cells = planet_cells(r, cell, gap)
    p = []

    # القصّ داخل الدائرة هو ما يجعل الحدّ كرويًا. بدونه تنسكب البلاطات
    # خارج الكرة وتصير الشكل مستطيلًا (خطأ وقعت فيه أول مرة).
    p.append(f'<clipPath id="{uid}c"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>')

    # الخلفية كروية غامقة — لا تظهر إلا وقد تراكم ثلث الكوكب،
    # وإلا بدت كرة جاهزة من أول لحظة.
    if base_ball and reveal >= .33:
        p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{DEEP}" '
                 f'opacity="{min(1.0, (reveal-.33)/.25):.2f}"/>')

    # سقالة البناء: دائرة إرشاد خفيفة قبل الاكتمال
    if reveal < .999:
        p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{SAGE}" '
                 f'stroke-width=".45" stroke-dasharray="2.2 2.6" opacity=".30"/>')

    # البلاطات بترتيب التركيب — مقصوصة داخل الكرة
    p.append(f'<g clip-path="url(#{uid}c)">')
    for c in cells:
        if c["t"] > reveal + 1e-9:
            continue
        px, py = cx + c["x"], cy + c["y"]
        p.append(f'<rect x="{px-cell/2:.2f}" y="{py-cell/2:.2f}" width="{cell}" '
                 f'height="{cell}" rx="{cell*.27:.2f}" fill="{c["col"]}"/>')

    # إضاءة كروية (نفس الشعار المعتمد) — داخل القصّ
    if reveal >= .33:
        grad_op = min(1.0, (reveal - .33) / .25)
        p.append(f'<defs><radialGradient id="{uid}L" cx="30%" cy="22%" r="88%">'
                 f'<stop offset="0" stop-color="#FFFFFF" stop-opacity=".13"/>'
                 f'<stop offset=".42" stop-color="#FFFFFF" stop-opacity="0"/>'
                 f'<stop offset="1" stop-color="{INK}" stop-opacity=".36"/>'
                 f'</radialGradient></defs>')
        p.append(f'<rect x="{cx-r}" y="{cy-r}" width="{2*r}" height="{2*r}" '
                 f'fill="url(#{uid}L)" opacity="{grad_op:.2f}"/>')
    p.append("</g>")

    # القلب البنفسجي: أول ما يظهر (الفكرة) — فوق الكل، غير مقصوص
    if core:
        grow = min(1.0, reveal / .18)
        if grow > 0:
            cs = r * .60 * grow
            p.append(f'<rect x="{cx-cs/2:.2f}" y="{cy-cs/2:.2f}" width="{cs:.2f}" '
                     f'height="{cs:.2f}" rx="{cs*.27:.2f}" fill="{PURPLE}"/>')
    return "".join(p)


def hero(reveal=1.0, uid="h", core=True, escape_on=True):
    """الكوكب بلا كتاب، كبيرًا في وسط الإطار (للكوكب/الإعلان)."""
    r, cx, cy, cell = 34.0, 50.0, 50.0, 13.2
    out = planet(r=r, cx=cx, cy=cy, cell=cell, gap=3.0,
                 reveal=reveal, core=core, uid=uid)
    if reveal >= .999 and escape_on:
        out += bf.escape(cx, cy, r, None, ang=44,
                         sizes=(9.0, 6.4, 9.0), gaps=(4.5, 11.0, 18.5))
    return out


def svg(body, w=100, h=100, plate=None, rx=0):
    bg = ""
    if plate:
        bg = (f'<rect width="{w}" height="{h}" rx="{rx}" fill="{plate}"/>' if rx
              else f'<rect width="{w}" height="{h}" fill="{plate}"/>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'width="{w}" height="{h}">{bg}{body}</svg>')


# ------------------------------------------------------------------ exports
SNAPS = [
    ("00-empty", 0.000),
    ("01-seed", 0.020),
    ("02-second", 0.170),
    ("03-third", 0.360),
    ("04-two-thirds", 0.640),
    ("05-done", 1.000),
]
SNAP_AR = {
    "00-empty": "فضاء",
    "01-seed": "الفكرة",
    "02-second": "أول الطبقات",
    "03-third": "يتّسع",
    "04-two-thirds": "الطبقة الأخيرة",
    "05-done": "كوكبٌ كامل",
}


def build():
    files = []

    for slug, rv in SNAPS:
        open(os.path.join(OUT, f"g-{slug}.svg"), "w", encoding="utf-8").write(
            svg(hero(reveal=rv, uid="s" + slug.replace("-", ""))))
        files.append(f"g-{slug}.svg")

    for name, plate in [("planet-dark", INK), ("planet-light", PLATE),
                        ("planet-sky", SKY), ("planet-bare", None)]:
        open(os.path.join(OUT, f"{name}.svg"), "w", encoding="utf-8").write(
            svg(hero(uid=name.replace("-", "")), plate=plate))
        files.append(f"{name}.svg")

    # أيقونة: أنظف قراءة صغيرة (بلا مكعبات طالعة)
    open(os.path.join(OUT, "planet-icon.svg"), "w", encoding="utf-8").write(
        svg(hero(uid="ic", escape_on=False, core=True)))
    files.append("planet-icon.svg")

    # أحادي اللون
    for nm, col in [("planet-mono-cream", CREAM), ("planet-mono-ink", INK)]:
        body = bf.mark(mono={"base": col, "op": 1.0}, compact=True,
                       core=False, book_on=False, uid=nm[-4:])
        open(os.path.join(OUT, f"{nm}.svg"), "w", encoding="utf-8").write(
            svg(body))
        files.append(f"{nm}.svg")

    # ------------------------------------------------ متحرك (SMIL, بلا JS)
    r, cx, cy, cell, gap = 34.0, 50.0, 50.0, 13.2, 3.0
    cells = planet_cells(r, cell, gap)
    DUR, STAG = .42, 2.2
    a = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{DEEP}" opacity="0">'
         f'<animate attributeName="opacity" to="1" begin=".55s" dur=".5s" fill="freeze"/>'
         f'</circle>']
    for c in cells:
        px, py = cx + c["x"], cy + c["y"]
        begin = c["t"] * STAG
        # ملاحظة: SMIL يمركز scale عند (0,0) — فيقفز المكعب للزاوية.
        # لذلك نستخدم opacity + translate فقط (translate لا يعتمد على المركز).
        a.append(
            f'<rect x="{px-cell/2:.2f}" y="{py-cell/2:.2f}" width="{cell}" '
            f'height="{cell}" rx="{cell*.27:.2f}" fill="{c["col"]}" opacity="0">'
            f'<animate attributeName="opacity" from="0" to="1" begin="{begin:.2f}s" '
            f'dur="{DUR}s" fill="freeze"/>'
            f'<animateTransform attributeName="transform" type="translate" '
            f'from="0 -7" to="0 0" begin="{begin:.2f}s" dur="{DUR}s" fill="freeze"/>'
            f'</rect>')
    a.append(f'<rect x="{cx-r*.30:.2f}" y="{cy-r*.30:.2f}" width="{r*.60:.2f}" '
             f'height="{r*.60:.2f}" rx="{r*.60*.27:.2f}" fill="{PURPLE}" opacity="0">'
             f'<animate attributeName="opacity" to="1" begin="0s" dur=".5s" fill="freeze"/>'
             f'</rect>')
    a.append(f'<g opacity="0"><animate attributeName="opacity" to="1" '
             f'begin="{STAG+.45:.2f}s" dur=".6s" fill="freeze"/>'
             + bf.escape(cx, cy, r, None, ang=44,
                         sizes=(9.0, 6.4, 9.0), gaps=(4.5, 11.0, 18.5))
             + "</g>")
    open(os.path.join(OUT, "planet-anim.svg"), "w", encoding="utf-8").write(
        svg("".join(a), plate=INK))
    files.append("planet-anim.svg")
    return files


if __name__ == "__main__":
    fs = build()
    print(f"wrote {len(fs)} files → {OUT}")
