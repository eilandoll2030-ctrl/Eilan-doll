#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""لوح «كوكب يتركّب» — PNG + SVG"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "globe"))
spec = importlib.util.spec_from_file_location("gb", os.path.join(HERE, "build_globe.py"))
gb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gb)

CREAM, SAGE, GOLD, INK, SKY = gb.CREAM, gb.SAGE, gb.GOLD, gb.INK, gb.SKY
PURPLE = gb.PURPLE

SHORT = {
    "00-empty": "فضاء",
    "01-seed": "الفكرة",
    "02-second": "أول الطبقات",
    "03-third": "يتّسع",
    "04-two-thirds": "الطبقة الأخيرة",
    "05-done": "كوكبٌ كامل",
}
NOTE = {
    "00-empty": "لا شيء بعد",
    "01-seed": "مكعبٌ واحد — العقل",
    "02-second": "لبناتٌ حوله",
    "03-third": "الكرة تتشكّل",
    "04-two-thirds": "الحدّ يقترب",
    "05-done": "يطلع الذهبي",
}

W, H, PAD = 1500, 1980, 66
GAP = 30
TW, TH = (W - PAD * 2 - GAP * 2) / 3, 470

p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
     f'width="{W}" height="{H}" font-family="Cairo">',
     f'<rect width="{W}" height="{H}" fill="{INK}"/>',
     f'<g stroke="{CREAM}" stroke-width="1" opacity=".045">']
for x in range(0, W, 76):
    p.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>')
for y in range(0, H, 76):
    p.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>')
p.append('</g>')

p.append(f'<text x="{W-PAD}" y="118" text-anchor="end" direction="rtl" font-size="58" '
         f'font-weight="900" fill="{CREAM}">كوكب المكعبات — يتركّب</text>')
p.append(f'<text x="{W-PAD}" y="172" text-anchor="end" direction="rtl" font-size="28" '
         f'font-weight="700" fill="{SAGE}">لا كوكبٌ جاهز… كوكبٌ يُبنى أمامك، لبنةً فوق لبنة</text>')
p.append(f'<text x="{W-PAD}" y="222" text-anchor="end" font-family="Orbitron" '
         f'font-size="21" letter-spacing="6" fill="{GOLD}">EILAN DOLL · THE PLANET ASSEMBLING</text>')
p.append(f'<line x1="{PAD}" y1="262" x2="{W-PAD}" y2="262" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".45"/>')

# ---------------------------------------------------------------- snapshots
for idx, (slug, rv) in enumerate(gb.SNAPS):
    col, row = idx % 3, idx // 3
    x = PAD + col * (TW + GAP)
    y = 300 + row * (TH + GAP)
    p.append(f'<g transform="translate({x:.1f} {y:.1f})">')
    p.append(f'<rect width="{TW:.1f}" height="{TH}" rx="26" fill="#16180F" '
             f'stroke="{SAGE}" stroke-opacity=".18"/>')
    # مقياس الشعار داخل البلاطة
    p.append(f'<g transform="translate({TW/2-150:.1f} 34) scale(3.0)">'
             + gb.hero(reveal=rv, uid=f"p{idx}") + '</g>')
    p.append(f'<text x="{TW/2:.1f}" y="{TH-96}" text-anchor="middle" direction="rtl" '
             f'font-size="17" letter-spacing="3" fill="{GOLD}" font-weight="700">'
             f'{int(rv*100):02d}%</text>')
    p.append(f'<text x="{TW/2:.1f}" y="{TH-56}" text-anchor="middle" direction="rtl" '
             f'font-size="31" font-weight="900" fill="{CREAM}">{SHORT[slug]}</text>')
    p.append(f'<text x="{TW/2:.1f}" y="{TH-24}" text-anchor="middle" direction="rtl" '
             f'font-size="19" fill="{SAGE}">{NOTE[slug]}</text>')
    p.append('</g>')

# ---------------------------------------------------------------- final mark
fy = 300 + 2 * (TH + GAP) + 26
# ---- نصف أيمن: الشعار الكبير
p.append(f'<text x="{W-PAD}" y="{fy+30}" text-anchor="end" direction="rtl" '
         f'font-size="34" font-weight="900" fill="{CREAM}">الكوكب مكتملًا</text>')
p.append(f'<text x="{W-PAD}" y="{fy+80}" text-anchor="end" direction="rtl" '
         f'font-size="20" fill="{SAGE}">بلاطات ثابتة الحجم تُقرأ كرة</text>')
p.append(f'<text x="{W-PAD}" y="{fy+110}" text-anchor="end" direction="rtl" '
         f'font-size="20" fill="{SAGE}">قلبٌ بنفسجي للعقل</text>')
p.append(f'<text x="{W-PAD}" y="{fy+140}" text-anchor="end" direction="rtl" '
         f'font-size="20" fill="{SAGE}">مكعبٌ ذهبي يطلع</text>')
MK = 3.0
MX, MY = W - PAD - 300 - 100 * MK / 2, fy + 160
p.append(f'<g transform="translate({MX:.1f} {MY:.1f}) scale({MK})">'
         + gb.hero(uid="fin") + '</g>')

# ---- نصف أيسر: اختبار الحجم الصغير عبر المقاسات
p.append(f'<text x="{PAD}" y="{fy+30}" text-anchor="start" direction="rtl" '
         f'font-size="30" font-weight="900" fill="{CREAM}">وهل يُقرأ صغيرًا؟</text>')
p.append(f'<text x="{PAD}" y="{fy+72}" text-anchor="start" direction="rtl" '
         f'font-size="19" fill="{SAGE}">نفس الشعار بمقاسات الأيقونة والتطبيق</text>')
for k, (size, lab) in enumerate([(150, "150px"), (96, "96px"), (56, "56px"), (32, "32px")]):
    bx = PAD + [0, 210, 400, 545][k]
    by = fy + 100
    p.append(f'<g transform="translate({bx} {by}) scale({size/100:.2f})">'
             + gb.hero(uid=f"sz{k}", escape_on=(size >= 96)) + '</g>')
    p.append(f'<text x="{bx+size/2:.1f}" y="{by+180}" text-anchor="middle" '
             f'font-family="Orbitron" font-size="17" fill="{GOLD}">{lab}</text>')

# ---------------------------------------------------------------- footer
p.append(f'<line x1="{PAD}" y1="{H-120}" x2="{W-PAD}" y2="{H-120}" stroke="{GOLD}" '
         f'stroke-width="2" opacity=".35"/>')
p.append(f'<text x="{PAD}" y="{H-74}" font-family="Orbitron" font-size="20" '
         f'letter-spacing="4" fill="{SAGE}">2026 · BRAND STUDY · PLANET</text>')
p.append(f'<text x="{W-PAD}" y="{H-74}" text-anchor="end" direction="rtl" font-size="21" '
         f'fill="{SAGE}">مصدر الفكرة: «كوكب قاعد ينبني على شكل مكعبات»</text>')
p.append('</svg>')

svg_text = "".join(p)
open(os.path.join(OUT, "globe-poster.svg"), "w", encoding="utf-8").write(svg_text)
print("globe-poster.svg written")
