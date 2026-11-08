#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — أفكار ثانية للشعار / round 2 concepts
ثمانية اتجاهات جديدة (غير الكرة والكتاب)، بنفس ألوان الهوية ولغة المكعبات.

    python3 brand/tools/build_ideas2.py
"""
import os
import math

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "ideas2"))
os.makedirs(OUT, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE = "#0E0E0A", "#EFE8D4"

KEY = {"C": CREAM, "S": SAND, "a": SAGE, "g": GREEN, "d": DEEP, "p": PURPLE, "x": GOLD}


def _rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i + 2], 16) for i in (0, 2, 4))


def mix(a, b, t):
    ra, ga, ba = _rgb(a)
    rb, gb, bb = _rgb(b)
    return "#%02X%02X%02X" % (round(ra + (rb - ra) * t), round(ga + (gb - ga) * t),
                              round(ba + (bb - ba) * t))


def lightc(c, t=.34):
    return mix(c, "#FFFFFF", t)


def darkc(c, t=.34):
    return mix(c, INK, t)


def sq(x, y, s, fill, rx=.27):
    return (f'<rect x="{x:.2f}" y="{y:.2f}" width="{s:.2f}" height="{s:.2f}" '
            f'rx="{s * rx:.2f}" fill="{fill}"/>')


def cube(cx, cy, a, base):
    hx, hy = a * .866, a * .5
    top = f"{cx:.2f},{cy-hy:.2f} {cx+hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx-hx:.2f},{cy:.2f}"
    lf = f"{cx-hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx:.2f},{cy+hy+a:.2f} {cx-hx:.2f},{cy+a:.2f}"
    rf = f"{cx+hx:.2f},{cy:.2f} {cx:.2f},{cy+hy:.2f} {cx:.2f},{cy+hy+a:.2f} {cx+hx:.2f},{cy+a:.2f}"
    return (f'<polygon points="{lf}" fill="{darkc(base, .26)}"/>'
            f'<polygon points="{rf}" fill="{darkc(base, .48)}"/>'
            f'<polygon points="{top}" fill="{lightc(base, .38)}"/>')


def grid(rows, cell=15.0, gap=3.4, ox=None, oy=None, op=None, margin=10.0, fit=True):
    """يرسم خريطة مكعبات مسطّحة من نص: كل حرف = مكعب، النقطة = فراغ"""
    rows = [r for r in rows if r.strip()]
    h = len(rows)
    w = max(len(r) for r in rows)
    if fit:
        cell = min(cell, (100 - 2 * margin - (w - 1) * gap) / w,
                   (100 - 2 * margin - (h - 1) * gap) / h)
    step = cell + gap
    ox = (100 - (w * step - gap)) / 2 if ox is None else ox
    oy = (100 - (h * step - gap)) / 2 if oy is None else oy
    out = [f'<g{" opacity=%s" % repr(op) if op else ""}>']
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            if ch in ". " or ch not in KEY:
                continue
            out.append(sq(ox + c * step, oy + r * step, cell, KEY[ch]))
    out.append("</g>")
    return "".join(out)


def svg(body, plate=None, label="إيلان دول | EILAN DOLL"):
    bg = {"dark": f'<rect width="100" height="100" rx="22" fill="{INK}"/>',
          "light": f'<rect width="100" height="100" rx="22" fill="{PLATE}"/>'}.get(plate, "")
    if plate == "light":
        body = body.replace(CREAM, "#DBC894")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            f'role="img" aria-label="{label}">{bg}{body}</svg>\n')


# =====================================================================
# 1 — الشروق  SUNRISE
# =====================================================================
def sun_rise():
    out = []
    # rays
    for k in range(7):
        t = math.radians(-150 + k * 20)
        x1, y1 = 50 + math.cos(t) * 33, 46 + math.sin(t) * 33
        x2, y2 = 50 + math.cos(t) * 39, 46 + math.sin(t) * 39
        out.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" '
                   f'stroke="{GOLD}" stroke-width="2.2" stroke-linecap="round" opacity=".65"/>')
    out.append(grid(["..x..",
                     ".aaa.",
                     "aCaCa"], cell=14.0, gap=3.4, oy=20.0))
    # horizon + reflection
    out.append(f'<rect x="8" y="76.5" width="84" height="2.2" rx="1.1" fill="{CREAM}" opacity=".75"/>')
    for i, w in ((-1.6, 8), (0, 11), (1.6, 8)):
        out.append(f'<rect x="{50 + i*17 - w/2:.1f}" y="82" width="{w}" height="3.2" rx="1.6" '
                   f'fill="{GOLD}" opacity=".32"/>')
    return "".join(out)


# =====================================================================
# 2 — البذرة  THE SEED  (3D)
# =====================================================================
def seed():
    return (cube(50, 48, 24, GREEN) + cube(37, 30, 10.5, SAGE) +
            cube(56, 23, 10.5, SAGE) + cube(49, 10, 8.5, GOLD))


# =====================================================================
# 3 — البوابة  THE PORTAL
# =====================================================================
def portal():
    return grid(["aaaaa",
                 ".CxCd",
                 ".ddd."], cell=15.0, gap=3.4)


# =====================================================================
# 4 — الرمز  THE CREST (E)
# =====================================================================
def crest_e():
    m = ["gx..",
         "ap..",
         "aCS.",
         "a...",
         "dCg."]
    return grid(m, cell=15.0, gap=3.4, margin=16.0)


# =====================================================================
# 5 — الدرج  THE STAIRCASE  (3D)
# =====================================================================
def stair():
    out = []
    for x, y, col in ((25, 62, DEEP), (40, 47, GREEN), (55, 33, SAGE), (70, 19, GOLD)):
        out.append(cube(x, y, 14.0, col))
    return "".join(out)


# =====================================================================
# 6 — النواة  THE CORE  (atom, 3D)
# =====================================================================
def core_atom():
    out = []
    for rot in (-24, 24, 90):
        out.append(f'<ellipse cx="50" cy="52" rx="36" ry="13" fill="none" stroke="{GOLD}" '
                   f'stroke-width="1.6" opacity=".5" transform="rotate({rot} 50 52)"/>')
    out.append(cube(50, 44, 20, GREEN))
    out.append(cube(50, 24, 8.0, PURPLE))
    return "".join(out)


# =====================================================================
# 7 — المرآة  THE MIRROR
# =====================================================================
def mirror():
    top = grid(["aCg", "dpd"], cell=19.0, gap=5.0, oy=8.0)
    bottom = (f'<g opacity=".30">{grid(["dpd"], cell=19.0, gap=5.0, oy=58.0)}</g>')
    line = f'<rect x="10" y="52" width="80" height="2.2" rx="1.1" fill="{GOLD}" opacity=".85"/>'
    return top + line + bottom


# =====================================================================
# 8 — الجسر  THE BRIDGE
# =====================================================================
def bridge():
    return grid(["..aaa..",
                 "dd.x.dd",
                 "dd...dd",
                 "dd...dd"], cell=15.0, gap=3.2, margin=9.0)


CONCEPTS = [
    ("01-sunrise", "الشروق", "SUNRISE", sun_rise,
     "قوس من مكعبات يطلع من الأفق، والمكعب الذهبي في القمة، وانعكاسه على الأرض. "
     "هذا نفس فكرة «مكعبات الشروق» اللي في موقعك — لكن مكتملة كشعار. إحساس: فجر وافتتاح وبداية."),
    ("02-seed", "البذرة", "THE SEED", seed,
     "مكعب كبير هو الأساس، ومنه يطلع مكعبان، والذهبي هو الثمرة. "
     "إحساس: مشروع صغير يصير مؤسسة — يكبر بلا ما يتغيّر شكله."),
    ("03-portal", "البوابة", "THE PORTAL", portal,
     "عتبة من مكعبات على عمودين، والذهبي واقف في وسط المدخل. "
     "إحساس: «ادخل» — بوابة قبول، ومدخل حرم، وشاشة تسجيل دخول."),
    ("04-crest", "الرمز", "THE CREST", crest_e,
     "حرف E مبني من مكعبات، والذهبي معلّق فوقه. "
     "إحساس: ختم مؤسسي رسمي — ينطبع على شهادة أو لافتة مبنى ويبقى مقروءاً."),
    ("05-stair", "الدرج", "THE STAIRCASE", stair,
     "أربع مكعبات تصعد، آخرها الذهبي. "
     "إحساس: خطوة نحو المستقبل — من غير أي شرح أو نص."),
    ("06-core", "النواة", "THE CORE", core_atom,
     "نواة مكعبة تدور حولها ثلاثة مدارات ذهبية. "
     "إحساس: علم وتقنية وعقل — «ديجيتال وورلد» بمعناها الحرفي."),
    ("07-mirror", "المرآة", "THE MIRROR", mirror,
     "نفس المكعبات فوق خط ذهبي، وانعكاسها باهت تحته. "
     "إحساس: عالم رقمي وعالم إنساني — وجهان لشي واحد، وهو شعارك الفكري بالضبط."),
    ("08-bridge", "الجسر", "THE BRIDGE", bridge,
     "مكعبات تعقد جسراً بين كتلتين، والذهبي في وسطه. "
     "إحساس: نربط — بين التقنية والإنسان، وبين أقسامك."),
]

if __name__ == "__main__":
    for slug, ar, en, fn, _ in CONCEPTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("light", "light"), ("bare", None)):
            with open(os.path.join(OUT, f"i-{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, f"إيلان دول — {ar} / {en}"))
        tiny = "".join(
            f'<g transform="translate({i*30} 0) scale({s})">'
            f'<rect width="100" height="100" rx="22" fill="{INK}"/>{body}</g>'
            for i, s in enumerate((.28, .20, .15)))
        with open(os.path.join(OUT, f"i-{slug}-icons.svg"), "w", encoding="utf-8") as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30">{tiny}</svg>')
    print("wrote", len(CONCEPTS) * 4, "files →", OUT)
