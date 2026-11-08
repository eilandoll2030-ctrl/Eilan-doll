#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""لوح أفكار الجولة الثانية — PNG + SVG"""
import os, importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
OUT = os.path.normpath(os.path.join(HERE, "..", "ideas2"))
spec = importlib.util.spec_from_file_location("i2", os.path.join(HERE, "build_ideas2.py"))
i2 = importlib.util.module_from_spec(spec); spec.loader.exec_module(i2)

CREAM, SAGE, GOLD, INK, PLATE = i2.CREAM, i2.SAGE, i2.GOLD, i2.INK, i2.PLATE
W, H = 1500, 2400
PAD = 66
SHORT = {
 "01-sunrise": "فجرٌ من مكعبات — بداية وافتتاح",
 "02-seed": "مشروعٌ صغير يصير مؤسسة",
 "03-portal": "بابٌ تدخل منه: قبول وحرم",
 "04-crest": "ختمٌ مؤسسي بحرف E",
 "05-stair": "خطوة نحو المستقبل",
 "06-core": "علم وتقنية وعقل",
 "07-mirror": "عالم رقمي وعالم إنساني",
 "08-bridge": "نربط التقنية بالإنسان",
}
TW, TH = (W - PAD*2 - 34)/2, 452
GAP = 34

parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="Cairo">',
         f'<rect width="{W}" height="{H}" fill="{INK}"/>',
         f'<g stroke="{CREAM}" stroke-width="1" opacity=".045">']
for x in range(0, W, 76): parts.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>')
for y in range(0, H, 76): parts.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>')
parts.append('</g>')
parts.append(f'<text x="{W-PAD}" y="118" text-anchor="end" direction="rtl" font-size="60" font-weight="900" fill="{CREAM}">ثمانية اتجاهات أخرى</text>')
parts.append(f'<text x="{W-PAD}" y="176" text-anchor="end" direction="rtl" font-size="29" font-weight="700" fill="{SAGE}">غير الكرة والكتاب — أفكار جديدة كليًا، بنفس الألوان ونفس لغة المكعبات</text>')
parts.append(f'<text x="{W-PAD}" y="232" text-anchor="end" font-family="Orbitron" font-size="22" letter-spacing="6" fill="{GOLD}">EILAN DOLL · CONCEPT ROUND 2</text>')
parts.append(f'<line x1="{PAD}" y1="272" x2="{W-PAD}" y2="272" stroke="{GOLD}" stroke-width="2" opacity=".45"/>')

for i, (slug, ar, en, fn, desc) in enumerate(i2.CONCEPTS):
    col, row = i % 2, i // 2
    x = PAD + col*(TW+GAP); y = 320 + row*(TH+GAP)
    body = fn()
    parts.append(f'<g transform="translate({x:.1f} {y:.1f})">')
    parts.append(f'<rect width="{TW:.1f}" height="{TH}" rx="32" fill="#171811" stroke="{CREAM}" stroke-opacity=".10"/>')
    parts.append(f'<g transform="translate({TW/2-125:.1f} 18) scale(2.5)">{body}</g>')
    # tiny icon checks
    for k, s in enumerate((0.30, 0.22)):
        px = 34 + k*44
        parts.append(f'<g transform="translate({px} 330) scale({s})">'
                     f'<rect width="100" height="100" rx="22" fill="{CREAM}" opacity=".05"/>{body}</g>')
    parts.append(f'<text x="{TW-34}" y="352" text-anchor="end" font-family="Orbitron" font-size="17" letter-spacing="3" fill="{GOLD}">{en}</text>')
    parts.append(f'<text x="{TW-34}" y="400" text-anchor="end" direction="rtl" font-size="38" font-weight="900" fill="{CREAM}">{ar}</text>')
    parts.append(f'<text x="{TW-34}" y="440" text-anchor="end" direction="rtl" font-size="19" font-weight="700" fill="{SAGE}" opacity=".95">{SHORT[slug]}</text>')
    parts.append('</g>')

fy = 320 + 4*(TH+GAP) - 6
parts.append(f'<text x="{PAD}" y="{fy}" font-family="Orbitron" font-size="18" letter-spacing="3" fill="{CREAM}" opacity=".5">2026 · BRAND STUDY 02</text>')
parts.append(f'<text x="{W-PAD}" y="{fy}" text-anchor="end" direction="rtl" font-size="22" font-weight="700" fill="{SAGE}">كل اتجاه: غامق · فاتح · شفاف · وأيقونة صغيرة</text>')
parts.append('</svg>')

p = os.path.join(OUT, "ideas2-poster.svg")
open(p, "w", encoding="utf-8").write("".join(parts))
fonts = ["/home/user/Eilan-doll/coloring/fonts/Cairo_900Black.ttf",
         "/home/user/Eilan-doll/coloring/fonts/Cairo_700Bold.ttf",
         "/home/user/Eilan-doll/coloring/fonts/Orbitron_800ExtraBold.ttf"]
open("/tmp/_p.js","w").write('''
const {Resvg}=require('/tmp/node_modules/@resvg/resvg-js');const fs=require('fs');
const r=new Resvg(fs.readFileSync(process.argv[2]),{font:{fontFiles:process.argv.slice(4),loadSystemFonts:true,defaultFontFamily:'Cairo'},fitTo:{mode:'width',value:1500}});
fs.writeFileSync(process.argv[2].replace('.svg','.png'),r.render().asPng());
''')
os.system(f"node /tmp/_p.js {p} 1500 {' '.join(fonts)}")
print("poster ok")
