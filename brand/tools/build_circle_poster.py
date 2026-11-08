#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""لوح «المربع يصير دائرة» — PNG + SVG"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "circle"))
spec = importlib.util.spec_from_file_location("bc", os.path.join(HERE, "build_circle.py"))
bc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bc)

CREAM, GOLD, INK, SAGE, PLATE = bc.CREAM, bc.GOLD, bc.INK, bc.SAGE, bc.PLATE
GREEN, PURPLE = bc.GREEN, bc.PURPLE

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

p.append(f'<text x="{W-PAD}" y="112" text-anchor="end" direction="rtl" font-size="56" '
         f'font-weight="900" fill="{CREAM}">المربع يصير دائرة</text>')
p.append(f'<text x="{W-PAD}" y="164" text-anchor="end" direction="rtl" font-size="27" '
         f'font-weight="700" fill="{SAGE}">نفس التصميم · نفس الألوان · نفس المكعبات التسعة</text>')
p.append(f'<text x="{W-PAD}" y="212" text-anchor="end" font-family="Orbitron" '
         f'font-size="20" letter-spacing="6" fill="{GOLD}">EILAN DOLL · THE SQUARE, ROUNDED</text>')
p.append(f'<line x1="{PAD}" y1="250" x2="{W-PAD}" y2="250" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".45"/>')

# ---------------------------------------------------------------- row: 4 big
items = [(bc.variant_a(plate=INK), "A · دائرة ممتلئة", "القرص الغامق نفسه، والعنقود محجَّم ليدخل كاملًا"),
         (bc.variant_a(plate=PLATE), "A · على فاتح", "نفس الشعار على خلفية كريمية"),
         (bc.variant_b(), "B · بإطار ذهبي", "بلا قرص — حلقة ذهبية تحدد الدائرة"),
         (bc.variant_c(plate=INK), "C · ترتيب دائري", "٨ مكعبات على المحيط + القلب في المنتصف")]
CW = (W - PAD * 2 - 24 * 3) / 4
for i, (body, title, desc) in enumerate(items):
    x = W - PAD - CW - i * (CW + 24)
    y = 292
    p.append(f'<g transform="translate({x:.1f} {y})">')
    p.append(f'<rect width="{CW:.1f}" height="{CW+120:.0f}" rx="24" fill="#16180F" '
             f'stroke="{SAGE}" stroke-opacity=".18"/>')
    p.append(f'<g transform="translate({CW/2-125:.1f} 22) scale(2.5)">' + body)
    p.append('</g>')
    p.append(f'<text x="{CW/2:.1f}" y="{CW+52:.0f}" text-anchor="middle" direction="rtl" '
             f'font-size="26" font-weight="900" fill="{CREAM}">{title}</text>')
    p.append(f'<text x="{CW/2:.1f}" y="{CW+90:.0f}" text-anchor="middle" direction="rtl" '
             f'font-size="16" fill="{SAGE}">{desc}</text>')
    p.append('</g>')

# ---------------------------------------------------------------- sizes row
sy = 292 + CW + 168
p.append(f'<text x="{W-PAD}" y="{sy+30}" text-anchor="end" direction="rtl" font-size="32" '
         f'font-weight="900" fill="{CREAM}">اختبار الحجم</text>')
p.append(f'<text x="{W-PAD}" y="{sy+68}" text-anchor="end" direction="rtl" font-size="19" '
         f'fill="{SAGE}">١٢٠ · ٦٤ · ٤٠ · ٢٤ بكسل — أي نسخة تبقى مقروءة؟</text>')

ROW_H = 128
for j, (label, body, bgfill) in enumerate([("A", bc.variant_a(plate=INK), INK),
                                          ("B", bc.variant_b(), INK),
                                          ("C", bc.variant_c(plate=INK), INK)]):
    by = sy + 96 + j * (ROW_H + 14)
    p.append(f'<rect x="{PAD}" y="{by}" width="{W-PAD*2}" height="{ROW_H}" rx="18" '
             f'fill="#16180F" stroke="{SAGE}" stroke-opacity=".16"/>')
    p.append(f'<text x="{W-PAD-26}" y="{by+ROW_H/2+8:.0f}" text-anchor="end" '
             f'font-family="Orbitron" font-size="19" fill="{GOLD}">{label}</text>')
    # المقاسات من الأكبر لليسار: 120، 64، 40، 24
    xs = [PAD + 40, PAD + 210, PAD + 330, PAD + 420]
    for k, (size, bx) in enumerate(zip([120, 64, 40, 24], xs)):
        ty = by + (ROW_H - size) / 2
        p.append(f'<g transform="translate({bx} {ty:.1f}) scale({size/100:.2f})">'
                 + body + '</g>')

# ---------------------------------------------------------------- footer
fy = sy + 96 + 3 * (ROW_H + 14) + 40
p.append(f'<line x1="{PAD}" y1="{fy}" x2="{W-PAD}" y2="{fy}" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".35"/>')
p.append(f'<text x="{PAD}" y="{fy+52}" font-family="Orbitron" font-size="19" '
         f'letter-spacing="4" fill="{SAGE}">2026 · BRAND STUDY · CIRCLE</text>')
p.append(f'<text x="{W-PAD}" y="{fy+52}" text-anchor="end" direction="rtl" font-size="20" '
         f'fill="{SAGE}">طلب المالك: «أبغى نفس المربع يكون دائرة بنفس التصميم»</text>')
p.append('</svg>')

# crop the canvas to the real content height
H = int(fy + 95)
p[0] = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
        f'width="{W}" height="{H}" font-family="Cairo">')
p[1] = f'<rect width="{W}" height="{H}" fill="{INK}"/>'
p[2] = (f'<clipPath id="bg"><rect width="{W}" height="{H}"/></clipPath>'
        f'<g stroke="{CREAM}" stroke-width="1" opacity=".045" clip-path="url(#bg)">')
# grid lines were generated up-front for the old height; regenerate
grid_at = [i for i, s2 in enumerate(p) if isinstance(s2, str) and s2.startswith('<line x1="0" y1=')]
if grid_at:
    p[grid_at[0]] = f'<line x1="0" y1="0" x2="0" y2="{H}"/>'
    p[grid_at[0] + 1] = f'<line x1="{W}" y1="0" x2="{W}" y2="{H}"/>'
    p[grid_at[0] + 2] = f'<line x1="0" y1="{H}" x2="{W}" y2="{H}"/>'

open(os.path.join(OUT, "circle-poster.svg"), "w", encoding="utf-8").write("".join(p))
print(f"circle-poster.svg written (H={H})")
