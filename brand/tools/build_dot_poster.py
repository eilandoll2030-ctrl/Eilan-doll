#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""لوح «الشبكة المتراصة + الدائرة الذهبية» — PNG + SVG"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "dot"))
spec = importlib.util.spec_from_file_location("bd", os.path.join(HERE, "build_dot.py"))
bd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bd)

CREAM, GOLD, INK, SAGE, PLATE, SKY = bd.CREAM, bd.GOLD, bd.INK, bd.SAGE, bd.PLATE, bd.SKY

W, H, PAD = 1500, 1560, 66
p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
     f'width="{W}" height="{H}" font-family="Cairo">',
     f'<rect width="{W}" height="{H}" fill="{INK}"/>',
     f'<g stroke="{CREAM}" stroke-width="1" opacity=".045">']
for x in range(0, W, 76):
    p.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>')
for y in range(0, H, 76):
    p.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>')
p.append('</g>')

p.append(f'<text x="{W-PAD}" y="112" text-anchor="end" direction="rtl" font-size="54" '
         f'font-weight="900" fill="{CREAM}">متراصة · والدائرة الذهبية فوق</text>')
p.append(f'<text x="{W-PAD}" y="164" text-anchor="end" direction="rtl" font-size="26" '
         f'font-weight="700" fill="{SAGE}">نفس الشعار — والمربع الذهبي صار دائرة، مرفوعة وبعيدة</text>')
p.append(f'<text x="{W-PAD}" y="210" text-anchor="end" font-family="Orbitron" '
         f'font-size="20" letter-spacing="6" fill="{GOLD}">EILAN DOLL · THE TIGHT GRID</text>')
p.append(f'<line x1="{PAD}" y1="248" x2="{W-PAD}" y2="248" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".45"/>')

# ------------------------------------------------------------------ 4 cards
CW = (W - PAD * 2 - 24 * 3) / 4
cards = [
    (bd.svg_grid(plate=INK)[0], "دائرة ذهبية ممتلئة", "الشكل الأساسي", INK),
    (bd.svg_grid(plate=INK, gold_ring=True)[0], "دائرة ذهبية مُفرّغة", "أخفّ بصريًا", INK),
    (bd.svg_grid(plate=INK, gold_shape="square")[0], "المربع الأصلي", "للمقارنة", INK),
    (bd.svg_grid(plate=PLATE)[0], "على خلفية كريمية", "للطباعة", PLATE),
]
for i, (body, title, sub, bg) in enumerate(cards):
    x = W - PAD - CW - i * (CW + 24)
    y = 290
    p.append(f'<g transform="translate({x:.1f} {y})">')
    p.append(f'<rect width="{CW:.1f}" height="{CW+118:.0f}" rx="24" fill="#16180F" '
             f'stroke="{SAGE}" stroke-opacity=".18"/>')
    p.append(f'<g transform="translate({CW/2-125:.1f} 26) scale(2.5)">{body}</g>')
    p.append(f'<text x="{CW/2:.1f}" y="{CW+56:.0f}" text-anchor="middle" direction="rtl" '
             f'font-size="24" font-weight="900" fill="{CREAM}">{title}</text>')
    p.append(f'<text x="{CW/2:.1f}" y="{CW+92:.0f}" text-anchor="middle" direction="rtl" '
             f'font-size="17" fill="{SAGE}">{sub}</text>')
    p.append('</g>')

# ------------------------------------------------------------------ sizes
sy = 290 + CW + 168
p.append(f'<text x="{W-PAD}" y="{sy+34}" text-anchor="end" direction="rtl" font-size="30" '
         f'font-weight="900" fill="{CREAM}">هل تبقى مقروءة صغيرة؟</text>')
p.append(f'<text x="{W-PAD}" y="{sy+70}" text-anchor="end" direction="rtl" font-size="18" '
         f'fill="{SAGE}">٢٠٠ · ١٢٨ · ٦٤ · ٤٠ بكسل — الرقم اللي يظهر على شاشة iPad</text>')
szbody = bd.svg_grid(plate=INK)[0]
BASE = sy + 96 + 200          # خط القاعدة: كل المكعبات تُحاذى من الأسفل
sizes = [(200, "٢٠٠"), (128, "١٢٨"), (64, "٦٤"), (40, "٤٠")]
bx = W - PAD - 40            # نبدأ من أقصى اليمين ونمشي يسارًا
for size, lab in sizes:
    bx -= size
    ty = BASE - size
    p.append(f'<g transform="translate({bx} {ty}) scale({size/100:.2f})">{szbody}</g>')
    p.append(f'<text x="{bx+size/2:.1f}" y="{BASE+30}" text-anchor="middle" '
             f'font-family="Orbitron" font-size="15" fill="{GOLD}">{lab}</text>')
    bx -= 46

# ------------------------------------------------------------------ lockup
p.append(f'<text x="{PAD}" y="{sy+34}" text-anchor="start" direction="rtl" font-size="30" '
         f'font-weight="900" fill="{CREAM}">الشعار مع الاسم</text>')
lk = bd.lockup(plate=None).split(">", 1)[1].rsplit("</svg>", 1)[0]
p.append(f'<g transform="translate({PAD} {sy+52}) scale(0.72)">{lk}</g>')

# ------------------------------------------------------------------ footer
p.append(f'<line x1="{PAD}" y1="{H-112}" x2="{W-PAD}" y2="{H-112}" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".35"/>')
p.append(f'<text x="{PAD}" y="{H-64}" font-family="Orbitron" font-size="19" '
         f'letter-spacing="4" fill="{SAGE}">2026 · BRAND STUDY · TIGHT GRID</text>')
p.append(f'<text x="{W-PAD}" y="{H-64}" text-anchor="end" direction="rtl" font-size="20" '
         f'fill="{SAGE}">«جنب بعض ومتراصة، والدائرة الذهبية فوق وبعيدة»</text>')
p.append('</svg>')

open(os.path.join(OUT, "dot-poster.svg"), "w", encoding="utf-8").write("".join(p))
print("dot-poster.svg written")
