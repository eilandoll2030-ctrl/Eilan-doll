#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — شعار مستوحى من رسالة الرؤية / VISION-INSPIRED MARKS
ستة اتجاهات مكعبات تحمل معاني: طموح يصعد · حلم يتحقق · السعودية الخضراء ·
التحول الرقمي · جودة الحياة · المحتوى المحلي.

⚠ كلها أفكار أصلية — لا تحاكي أي شعار رسمي محمي.

    python3 brand/tools/build_vision.py
"""
import os
import math

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "vision"))
os.makedirs(OUT, exist_ok=True)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (
    "#EBDDB0", "#F6E3A8", "#7FAA8A", "#3E7A55", "#2F5E42", "#4A2682", "#E0B454")
INK, PLATE = "#0E0E0A", "#EFE8D4"
SKY = "#0B2F22"          # أخضر ليلي للخلفية
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


def grid(rows, cell=15.0, gap=3.4, ox=None, oy=None, margin=9.0, cells=None):
    rows = [r for r in rows if r.strip()]
    h, w = len(rows), max(len(r) for r in rows)
    cell = min(cell, (100 - 2 * margin - (w - 1) * gap) / w,
               (100 - 2 * margin - (h - 1) * gap) / h)
    step = cell + gap
    ox = (100 - (w * step - gap)) / 2 if ox is None else ox
    oy = (100 - (h * step - gap)) / 2 if oy is None else oy
    out = []
    for r, row in enumerate(rows):
        for c, ch in enumerate(row):
            if ch in ". " or ch not in KEY:
                continue
            out.append(sq(ox + c * step, oy + r * step, cell, KEY[ch]))
    return "".join(out), (ox, oy, cell, step, w, h)


def svg(body, plate=None, label="إيلان دول | EILAN DOLL"):
    bg = {"dark": f'<rect width="100" height="100" rx="22" fill="{INK}"/>',
          "sky": f'<rect width="100" height="100" rx="22" fill="{SKY}"/>',
          "light": f'<rect width="100" height="100" rx="22" fill="{PLATE}"/>'}.get(plate, "")
    if plate == "light":
        body = body.replace(CREAM, "#DBC894")
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" '
            f'role="img" aria-label="{label}">{bg}{body}</svg>\n')


# =====================================================================
# 1 — عنان السماء  /  SKY ASCENT
#     cubes climbing into an open sky, a single arrow of light rising:
#     «طموحنا عنان السماء».
# =====================================================================
def sky_ascent():
    out = []
    # sky puffs made of small cubes (left/right, low contrast)
    for x, y, s in ((17, 24, 6), (25, 19, 4.5), (78, 30, 5.5), (85, 24, 4)):
        out.append(sq(x, y, s, SAGE))
    # terraces of cubes climbing to the right
    base = 76.0
    terraces = [(12, 3, DEEP), (27, 4, GREEN), (42, 5, SAGE), (57, 6, SAGE)]
    for x, rows_, col in terraces:
        for k in range(rows_):
            out.append(sq(x, base - k * 9.4 - 9.4, 8.6, col if k < rows_ - 1 else lightc(col, .10)))
    # the gold arrow: 3 cubes rising out of the last terrace
    out.append(sq(72.0, 40.0, 9.0, GOLD))
    out.append(sq(76.5, 27.0, 7.6, GOLD))
    out.append(sq(80.0, 15.5, 6.6, SAND))
    out.append(f'<line x1="76" y1="52" x2="87" y2="14" stroke="{GOLD}" stroke-width="2.2" '
               f'stroke-linecap="round" opacity=".8"/>')
    out.append(f'<polygon points="88,10 83,20 92,19" fill="{GOLD}"/>')
    return "".join(out)


# =====================================================================
# 2 — نحلم ونحقق  /  DREAM → REALITY
#     the same cube twice: one dashed/hollow (the dream) and one solid
#     (the achievement), joined by a rising path.
# =====================================================================
def dream_real():
    """مكعب متقطّع (الحلم) → درج من مكعبات → مكعب صلب (الواقع)"""
    out = []
    # the dream: hollow dashed cube, upper right
    out.append(f'<g opacity=".6" stroke="{SAGE}" stroke-width="1.5" stroke-dasharray="3.4 3.4" '
               f'fill="none"><rect x="59" y="10" width="26" height="26" rx="7"/></g>')
    # rising steps from the dream down to the real cube
    steps = [(48, 34, 11, SAGE), (34, 44, 11, SAGE), (21, 54, 11, GOLD)]
    for x, y, sz, c in steps:
        out.append(sq(x, y, sz, c))
    # the real cube: solid, grounded
    out.append(sq(14, 70, 26, GREEN))
    out.append(f'<rect x="20" y="76" width="14" height="14" rx="3.8" fill="{SAGE}"/>')
    # dashed path showing the journey
    out.append(f'<path d="M72 40 L56 40 L42 50 L28 60 L27 70" fill="none" stroke="{GOLD}" '
               f'stroke-width="1.4" stroke-dasharray="2.5 4" opacity=".55"/>')
    return "".join(out)


# =====================================================================
# 3 — السعودية الخضراء  /  GREEN LAND
#     a green cube field growing a sapling of cubes; one gold cube = sun.
# =====================================================================
def green_land():
    """أرض من مكعبات + شتلة من مكعبات + مكعب ذهبي شمساً"""
    out = []
    ground = [(4, 74, 15, DEEP), (19, 78, 15, GREEN), (34, 74, 15, DEEP),
              (49, 78, 15, GREEN), (64, 74, 15, DEEP), (79, 78, 15, GREEN)]
    for x, y, sz, c in ground:
        out.append(sq(x, y, sz, c))
    # sapling
    out.append(sq(43, 60, 12, GREEN))
    out.append(sq(36, 47, 11, SAGE))
    out.append(sq(51, 47, 11, SAGE))
    out.append(sq(43.5, 33, 12, SAGE))
    out.append(sq(43.5, 22, 9, GOLD))
    return "".join(out)


# =====================================================================
# 4 — التحول الرقمي  /  DIGITAL SHIFT
#     a 3x3 cube grid where one row detaches and turns into arrows /
#     data — «خالية من الأوراق».
# =====================================================================
def digital_shift():
    out = []
    cell, gap = 15.0, 4.2
    step = cell + gap
    x0, y0 = 12.0, 26.0
    cells = [("a", 0, 0), ("C", 1, 0), ("g", 2, 0),
             ("d", 0, 1), ("p", 1, 1), ("d", 2, 1),
             ("d", 0, 2), ("g", 1, 2), ("a", 2, 2)]
    for k, c, r in cells:
        out.append(sq(x0 + c * step, y0 + r * step, cell, KEY[k]))
    # data stream: cubes leaving the grid to the top-right
    for i, (x, y, s, c) in enumerate(((62, 16, 10, SAGE), (73, 10, 8, GOLD))):
        out.append(sq(x, y, s, c))
    out.append(f'<path d="M60 30 L74 20" stroke="{GOLD}" stroke-width="1.8" stroke-linecap="round" opacity=".7"/>')
    out.append(f'<polygon points="78,16 70,20 76,25" fill="{GOLD}" opacity=".85"/>')
    return "".join(out)


# =====================================================================
# 5 — جودة الحياة  /  QUALITY OF LIFE
#     a calm cube landscape: three cubes + a crescent + a rising dot —
#     balance between work and life.
# =====================================================================
def quality():
    """تلال من مكعبات + هلال + نجمة ذهبية: توازن وهدوء"""
    out = []
    out.append(f'<path d="M64 12 a14 14 0 1 0 10 24 a11 11 0 1 1 -10 -24Z" fill="{CREAM}" opacity=".92"/>')
    for x, y, sz, c in ((10, 62, 22, DEEP), (33, 54, 22, GREEN), (56, 46, 22, SAGE)):
        out.append(sq(x, y, sz, c))
    out.append(sq(44, 30, 12, GOLD))
    return "".join(out)


# =====================================================================
# 6 — المحتوى المحلي  /  MADE HERE
#     an outline of the Kingdom drawn with cubes + a gold cube at its
#     heart: local content, rooted.
# =====================================================================
def made_here():
    """٣×٣ مكعبات = بلوك مبني محليًا، والذهبي مرفوع من أعلاه (نفس لغة شعارك المعتمد)"""
    out = []
    cell, gap = 20.0, 5.0
    step = cell + gap
    ox = (100 - (3 * step - gap)) / 2
    oy = 22.0
    grid_ = [[CREAM, SAGE, None],
             [GREEN, PURPLE, DEEP],
             [DEEP, GREEN, SAGE]]
    for r in range(3):
        for c in range(3):
            if grid_[r][c] is None:
                continue
            out.append(sq(ox + c * step, oy + r * step, cell, grid_[r][c]))
    out.append(sq(ox + 2 * step, oy - step, cell, GOLD))
    # a base line: rooted locally
    out.append(f'<rect x="12" y="92" width="76" height="2.4" rx="1.2" fill="{GOLD}" opacity=".5"/>')
    return "".join(out)


CONCEPTS = [
    ("01-sky", "عنان السماء", "SKY ASCENT", sky_ascent,
     "مكعبات تتسلّق وتطلع، وسهم من ذهب يشقّ السماء — «طموحنا عنان السماء». "
     "إحساس: صعود بلا سقف، وثقة.", "الطموح"),
    ("02-dream", "نحلم ونحقق", "DREAM → REALITY", dream_real,
     "مكعبٌ متقطّع (الحلم) ومكعبٌ صلب (الواقع) بينهما درج من مكعبات. "
     "إحساس: الحلم ما يبقى حلم — يتحول لبنة على الأرض.", "الحلم"),
    ("03-green", "السعودية الخضراء", "GREEN LAND", green_land,
     "أرضٌ من مكعبات، تنبت منها شتلة مكعبات، ومكعب ذهبي هو الشمس. "
     "إحساس: نماء وأرض وطاقة نظيفة.", "الاستدامة"),
    ("04-digital", "التحول الرقمي", "DIGITAL SHIFT", digital_shift,
     "شبكة مكعبات تنفصل منها مكعبات وتطير كبيانات نحو الأعلى. "
     "إحساس: من الورق إلى الفضاء الرقمي — حركة وخفة.", "التحول"),
    ("05-life", "جودة الحياة", "QUALITY OF LIFE", quality,
     "مكعبات كأنها تلال هادئة، فوقها هلال ومكعب ذهبي كنجمة. "
     "إحساس: توازن، هدوء، وبيئة إنسانية.", "الإنسان"),
    ("06-local", "المحتوى المحلي", "MADE HERE", made_here,
     "كتلة أرض من مكعبات، وفي قلبها مكعب ذهبي. "
     "إحساس: جذور، أصالة، وصناعة تبدأ من هنا.", "الأصالة"),
]

if __name__ == "__main__":
    for slug, ar, en, fn, desc, tag in CONCEPTS:
        body = fn()
        for kind, plate in (("dark", "dark"), ("sky", "sky"), ("light", "light"), ("bare", None)):
            with open(os.path.join(OUT, f"v-{slug}-{kind}.svg"), "w", encoding="utf-8") as f:
                f.write(svg(body, plate, f"إيلان دول — {ar} / {en}"))
        tiny = "".join(
            f'<g transform="translate({i*30} 0) scale({s})">'
            f'<rect width="100" height="100" rx="22" fill="{INK}"/>{body}</g>'
            for i, s in enumerate((.28, .20, .15)))
        with open(os.path.join(OUT, f"v-{slug}-icons.svg"), "w", encoding="utf-8") as f:
            f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 30">{tiny}</svg>')
    print("wrote", len(CONCEPTS) * 5, "files →", OUT)
