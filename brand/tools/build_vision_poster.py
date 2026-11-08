#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""لوح شعارات الرؤية — PNG + SVG"""
import os, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "vision"))
spec = importlib.util.spec_from_file_location("vi", os.path.join(HERE, "build_vision.py"))
vi = importlib.util.module_from_spec(spec); spec.loader.exec_module(vi)
CREAM, SAGE, GOLD, INK, PLATE, SKY = vi.CREAM, vi.SAGE, vi.GOLD, vi.INK, vi.PLATE, vi.SKY

SHORT = {
 "01-sky": "طموحٌ بلا سقف",
 "02-dream": "حلمٌ يصير لبنة",
 "03-green": "نَماءٌ وأرض",
 "04-digital": "من الورق إلى الرقمي",
 "05-life": "توازنٌ وهدوء",
 "06-local": "جذورٌ في الأرض",
}
W, H, PAD, GAP = 1500, 1900, 66, 32
TW, TH = (W - PAD*2 - GAP)/2, 430
p = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" font-family="Cairo">',
     f'<rect width="{W}" height="{H}" fill="{INK}"/>',
     f'<g stroke="{CREAM}" stroke-width="1" opacity=".045">']
for x in range(0, W, 76): p.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>')
for y in range(0, H, 76): p.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>')
p.append('</g>')
p.append(f'<text x="{W-PAD}" y="112" text-anchor="end" direction="rtl" font-size="56" font-weight="900" fill="{CREAM}">مكعبات تحمل رسالة الرؤية</text>')
p.append(f'<text x="{W-PAD}" y="166" text-anchor="end" direction="rtl" font-size="27" font-weight="700" fill="{SAGE}">طموح · حلم يتحقق · أخضر · تحول رقمي · جودة حياة · محتوى محلي</text>')
p.append(f'<text x="{W-PAD}" y="218" text-anchor="end" font-family="Orbitron" font-size="21" letter-spacing="6" fill="{GOLD}">EILAN DOLL · VISION MARKS</text>')
p.append(f'<line x1="{PAD}" y1="258" x2="{W-PAD}" y2="258" stroke="{GOLD}" stroke-width="2" opacity=".45"/>')
for i, (slug, ar, en, fn, desc, tag) in enumerate(vi.CONCEPTS):
    col, row = i % 2, i // 2
    x = PAD + col*(TW+GAP); y = 300 + row*(TH+GAP)
    body = fn()
    p.append(f'<g transform="translate({x:.1f} {y:.1f})">')
    p.append(f'<rect width="{TW:.1f}" height="{TH}" rx="30" fill="#171811" stroke="{CREAM}" stroke-opacity=".10"/>')
    p.append(f'<g transform="translate({TW/2-128:.1f} 14) scale(2.56)">{body}</g>')
    p.append(f'<text x="{TW-32}" y="340" text-anchor="end" font-family="Orbitron" font-size="16" letter-spacing="3" fill="{GOLD}">{en}</text>')
    p.append(f'<text x="{TW-32}" y="386" text-anchor="end" direction="rtl" font-size="36" font-weight="900" fill="{CREAM}">{ar}</text>')
    p.append(f'<text x="{TW-32}" y="420" text-anchor="end" direction="rtl" font-size="19" font-weight="700" fill="{SAGE}">{SHORT[slug]}</text>')
    p.append(f'<text x="32" y="392" direction="rtl" font-size="16" font-weight="700" fill="{GOLD}" opacity=".8">{tag}</text>')
    p.append('</g>')
fy = 300 + 3*(TH+GAP) - 4
p.append(f'<text x="{PAD}" y="{fy}" font-family="Orbitron" font-size="18" letter-spacing="3" fill="{CREAM}" opacity=".5">2026 · VISION STUDY 01</text>')
p.append(f'<text x="{W-PAD}" y="{fy}" text-anchor="end" direction="rtl" font-size="21" font-weight="700" fill="{SAGE}">أفكار أصلية — لا تحاكي أي شعار رسمي</text>')
p.append('</svg>')
sp = os.path.join(OUT, "vision-poster.svg")
open(sp, "w", encoding="utf-8").write("".join(p))
fonts = ["/home/user/Eilan-doll/coloring/fonts/Cairo_900Black.ttf",
         "/home/user/Eilan-doll/coloring/fonts/Cairo_700Bold.ttf",
         "/home/user/Eilan-doll/coloring/fonts/Orbitron_800ExtraBold.ttf"]
open("/tmp/_vp.js","w").write('''
const {Resvg}=require('/tmp/node_modules/@resvg/resvg-js');const fs=require('fs');
const r=new Resvg(fs.readFileSync(process.argv[2]),{font:{fontFiles:process.argv.slice(4),loadSystemFonts:true,defaultFontFamily:'Cairo'},fitTo:{mode:'width',value:1500}});
fs.writeFileSync(process.argv[2].replace('.svg','.png'),r.render().asPng());
''')
os.system(f"node /tmp/_vp.js {sp} 1500 {' '.join(fonts)}")
print("poster ok")
