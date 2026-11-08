#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — تصدير الشعار النهائي + حزمة إعلان الافتتاح.

    python3 brand/tools/build_export.py     # PNG لكل المنصّات
    python3 brand/tools/build_launch.py     # قوالب الإعلان (SVG + PNG)
"""
import os
import base64
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
FINAL = os.path.normpath(os.path.join(HERE, "..", "final"))
PNG = os.path.join(FINAL, "png")
LAUNCH = os.path.normpath(os.path.join(HERE, "..", "launch"))
os.makedirs(PNG, exist_ok=True)
os.makedirs(LAUNCH, exist_ok=True)

spec = importlib.util.spec_from_file_location("bf", os.path.join(HERE, "build_final.py"))
bf = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bf)

CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD, INK, PLATE = (
    bf.CREAM, bf.SAND, bf.SAGE, bf.GREEN, bf.DEEP, bf.PURPLE, bf.GOLD, bf.INK, bf.PLATE)
FONTS = bf.FONT_FILES

NODE = r'''
const {Resvg} = require('/tmp/node_modules/@resvg/resvg-js');
const fs = require('fs');
const [, , svgPath, outPath, width, fmt, ...fonts] = process.argv;
const svg = fs.readFileSync(svgPath);
const r = new Resvg(svg, {
  font: {fontFiles: fonts, loadSystemFonts: true, defaultFontFamily: 'Cairo'},
  fitTo: {mode: 'width', value: Number(width)},
  background: fmt === 'jpg' ? '#0E0E0A' : undefined,
});
const png = r.render();
fs.writeFileSync(outPath, fmt === 'jpg' ? png.asPng() : png.asPng());
'''


def render(svg_text, name, width, jpg=False):
    src = "/tmp/_x.svg"
    with open(src, "w", encoding="utf-8") as f:
        f.write(svg_text)
    out = os.path.join(PNG, name)
    with open("/tmp/_r.js", "w") as f:
        f.write(NODE)
    cmd = f"node /tmp/_r.js {src} {out} {width} {'jpg' if jpg else 'png'} {' '.join(FONTS)}"
    if os.system(cmd) != 0:
        raise SystemExit("render failed: " + name)
    return out


# ------------------------------------------------------------------ the mark
def svg_mark(plate=None, compact=False, uid="x"):
    return bf.svg_wrap(bf.mark(compact=compact, book_on=not compact, uid=uid), plate)


def main():
    # --- icons: what the browser and the phone use
    for px in (48, 96, 192, 512):
        body = bf.mark(compact=True, book_on=False, uid=f"i{px}")
        # full-bleed square for icons (the OS applies its own corner mask)
        svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
               f'<rect width="100" height="100" fill="{INK}"/>{body}</svg>')
        render(svg, f"favicon-{px}.png", px)
    # apple touch: square, padded
    body = bf.mark(compact=True, book_on=False, uid="at")
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">'
           f'<rect width="100" height="100" fill="{INK}"/>'
           f'<g transform="translate(50 50) scale(.86) translate(-50 -50)">{body}</g></svg>')
    render(svg, "apple-touch-icon.png", 180)

    # --- transparent marks
    render(svg_mark(None, False, "m1"), "mark.png", 1024)
    render(svg_mark(None, True, "m2"), "mark-compact.png", 512)
    render(bf.svg_wrap(bf.mark_mono(CREAM, "mo1")), "mark-mono-cream.png", 1024)
    render(bf.svg_wrap(bf.mark_mono(INK, "mo2")), "mark-mono-ink.png", 1024)

    # --- lockups (transparent + plate)
    for name, svg, w in (
            ("lockup-h-dark.png", bf.lockup(True, True), 1600),
            ("lockup-v-dark.png", bf.lockup(False, True), 900),
            ("lockup-h-light.png", bf.lockup(True, False), 1600)):
        render(svg, name, w)

    # --- OG / social share image 1200x630
    og = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" direction="rtl">
  <rect width="1200" height="630" fill="{INK}"/>
  <g stroke="{CREAM}" stroke-opacity=".05">
    {''.join(f'<line x1="{x}" y1="0" x2="{x}" y2="630"/>' for x in range(0, 1200, 60))}
    {''.join(f'<line x1="0" y1="{y}" x2="1200" y2="{y}"/>' for y in range(0, 630, 60))}
  </g>
  <circle cx="300" cy="315" r="290" fill="{GREEN}" opacity=".07"/>
  <g transform="translate(70 150) scale(3.3)">{bf.mark(book_on=True, uid="og")}</g>
  <text x="1100" y="250" text-anchor="end" font-family="Cairo" font-weight="900" font-size="88" fill="{CREAM}">إيلان دول</text>
  <text x="1100" y="330" text-anchor="end" font-family="Orbitron" font-size="28" letter-spacing="10" fill="{GOLD}">EILAN DOLL</text>
  <text x="1100" y="380" text-anchor="end" font-family="Cairo" font-weight="700" font-size="28" fill="{SAGE}">العالم الرقمي · THE DIGITAL WORLD</text>
  <line x1="{1100}" y1="412" x2="700" y2="412" stroke="{GOLD}" stroke-opacity=".45" stroke-width="2"/>
  <text x="1100" y="470" text-anchor="end" font-family="Cairo" font-weight="900" font-size="40" fill="{CREAM}">مكعبات تبني عالماً</text>
  <text x="1100" y="526" text-anchor="end" font-family="Cairo" font-weight="900" font-size="40" fill="{GOLD}">وعالم يبني إنساناً</text>
</svg>'''
    render(og, "og.png", 1200)
    print("png ok →", PNG)


if __name__ == "__main__":
    main()
