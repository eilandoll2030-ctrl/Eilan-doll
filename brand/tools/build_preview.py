#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — brand preview builder.
Reads the six marks from build_marks.py and produces:
    brand/preview/eilan-mark-directions.svg   (poster, RTL, Cairo)
    brand/preview/eilan-mark-directions.png
    brand/preview/index.html                 (self-contained interactive page)

    python3 brand/tools/build_preview.py
"""
import os
import sys
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
OUT = os.path.normpath(os.path.join(HERE, "..", "preview"))
os.makedirs(OUT, exist_ok=True)

spec = importlib.util.spec_from_file_location("bm", os.path.join(HERE, "build_marks.py"))
bm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm)

INK, PLATE = bm.INK, bm.PLATE
CREAM, SAGE, GREEN, GOLD, PURPLE = bm.CREAM, bm.SAGE, bm.GREEN, bm.GOLD, bm.PURPLE

# --- the feeling each direction is going for (the actual ask: describe the feeling)
STORY = {
    "a-cubes":   ("نفس الشعار… بس صار له عمق",
                  "أقرب اتجاه للشعار الحالي: نفس التوزيع ونفس المكعب الذهبي المرفوع، لكن كل مربع صار مكعب له وجه وضلع. تحسّه موجود في العالم، مو مرسوم على ورق."),
    "b-gate":    ("مدخل تمشي منه",
                  "الشبكة تنفتح من النص: مدخل تمشي منه. المكعب الذهبي معلّق فوقه مثل حجر الأساس أو ضوء في نهاية الممر. هذا إحساس «ادخل الجامعة»."),
    "c-build":   ("يكبُر من مشروع إلى مؤسسة",
                  "مكعبات تصعد درجة درجة: مدرسة، ثم معهد، ثم جامعة. المكعب الذهبي فوق القمة. يوصّف النمو نفسه، من مشروع صغير إلى مؤسسة."),
    "d-network": ("كل مكعب عقدة، وكل خط طريق",
                  "نفس المربعات لكن موصولة بخطوط ذهبية: كل مكعب عقدة، وكل خط طريق. هذا إحساس العالم الرقمي: كل شي متصل، والمعرفة تنتقل."),
    "e-campus":  ("مكعبات صارت مبانٍ",
                  "المكعبات صارت مبانٍ واقفة على أرض واحدة، والمكعب الذهبي يتوّج أعلاها. هذا الإحساس اللي يطلع لك لوحة على باب حرم جامعي."),
    "f-seal":    ("ينطبع على شهادة",
                  "شبكة مسطّحة لكن مرتّبة ترتيب ختم مؤسسي: صفوف نظيفة وفراغ محسوب. ينطبع على شهادة أو بطاقة أو ختم رسمي وما يفقد شكله."),
}

MARKS = bm.MARKS


def inline(slug_fn, plate=None, size=None):
    body = slug_fn()
    return bm.svg(body, plate).replace("\n", "").replace('xmlns="http://www.w3.org/2000/svg" ', "")


# ------------------------------------------------------------------ poster
def build_poster():
    W, H = 1440, 2080
    pad = 70
    tiles_top = 330
    tw, th = (W - pad * 2 - 40) / 2, 500
    gap = 40
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
             f'font-family="Cairo">',
             f'<rect width="{W}" height="{H}" fill="{INK}"/>',
             # subtle grid, same as the site background
             f'<g stroke="{CREAM}" stroke-width="1" opacity="0.045">']
    for x in range(0, W, 80):
        parts.append(f'<line x1="{x}" y1="0" x2="{x}" y2="{H}"/>')
    for y in range(0, H, 80):
        parts.append(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>')
    parts.append("</g>")

    # header
    parts.append(f'<text x="{W - pad}" y="120" text-anchor="end" direction="rtl" '
                 f'font-size="58" font-weight="900" fill="{CREAM}">مكعبات تبني عالم</text>')
    parts.append(f'<text x="{W - pad}" y="180" text-anchor="end" direction="rtl" '
                 f'font-size="30" font-weight="700" fill="{SAGE}">ستة اتجاهات للشعار — من شركة اليوم إلى جامعة الغد</text>')
    parts.append(f'<text x="{W - pad}" y="240" text-anchor="end" font-family="Orbitron" '
                 f'font-size="22" letter-spacing="6" fill="{GOLD}">EILAN DOLL — THE DIGITAL WORLD</text>')
    parts.append(f'<line x1="{pad}" y1="280" x2="{W - pad}" y2="280" stroke="{GOLD}" '
                 f'stroke-width="2" opacity=".45"/>')

    for i, (slug, ar, en, fn) in enumerate(MARKS):
        col, row = i % 2, i // 2
        x = pad + col * (tw + gap)
        y = tiles_top + row * (th + gap)
        head, line = STORY[slug]
        parts.append(f'<g transform="translate({x:.1f} {y:.1f})">')
        parts.append(f'<rect width="{tw:.1f}" height="{th}" rx="34" fill="#171811" '
                     f'stroke="{CREAM}" stroke-opacity=".10"/>')
        # big render on the dark card
        parts.append(f'<g transform="translate({tw/2-145:.1f} 22) scale(2.9)">{fn()}</g>')
        # cream chip (app icon) + one tiny check
        parts.append(f'<g transform="translate(34 344)">'
                     f'<rect width="104" height="104" rx="23" fill="{PLATE}"/>'
                     f'<g transform="scale(1.04)">{fn()}</g></g>')
        parts.append(f'<g transform="translate(152 344) scale(0.52)">'
                     f'<rect width="100" height="100" rx="22" fill="{CREAM}" opacity=".06"/>'
                     f'{fn()}</g>')
        # name + feeling
        parts.append(f'<text x="{tw - 34}" y="372" text-anchor="end" font-family="Orbitron" '
                     f'font-size="18" letter-spacing="3" fill="{GOLD}">{en.upper()}</text>')
        parts.append(f'<text x="{tw - 34}" y="418" text-anchor="end" direction="rtl" '
                     f'font-size="36" font-weight="900" fill="{CREAM}">{ar}</text>')
        parts.append(f'<text x="{tw - 34}" y="458" text-anchor="end" direction="rtl" '
                     f'font-size="20" font-weight="700" fill="{SAGE}" opacity=".95">{head}</text>')
        parts.append("</g>")

    # footer
    fy = tiles_top + 3 * (th + gap) + 10
    parts.append(f'<text x="{W - pad}" y="{fy}" text-anchor="end" direction="rtl" font-size="24" '
                 f'font-weight="700" fill="{SAGE}">كل اتجاه: نسخة على غامق · على كريمي · بدون خلفية · '
                 f'وأيقونة تصلح للتطبيق والبروفايل</text>')
    parts.append(f'<text x="{pad}" y="{fy}" font-family="Orbitron" font-size="19" '
                 f'letter-spacing="3" fill="{CREAM}" opacity=".55">2026 · BRAND STUDY 01</text>')
    parts.append("</svg>")
    return "".join(parts)


FONT = [os.path.join(ROOT, "coloring", "fonts", f) for f in
        ("Cairo_900Black.ttf", "Cairo_700Bold.ttf", "Orbitron_800ExtraBold.ttf")]


def main():
    svg = build_poster()
    p = os.path.join(OUT, "eilan-mark-directions.svg")
    with open(p, "w", encoding="utf-8") as f:
        f.write(svg)
    print("poster svg →", p)

    # PNG via resvg (optional — only if node module is available)
    js = """
const {Resvg}=require('/tmp/node_modules/@resvg/resvg-js');const fs=require('fs');
const svg=fs.readFileSync(process.argv[2]);
const r=new Resvg(svg,{font:{fontFiles:process.argv.slice(4),loadSystemFonts:true,defaultFontFamily:'Cairo'},
  fitTo:{mode:'width',value:Number(process.argv[3])}});
fs.writeFileSync(process.argv[2].replace('.svg','.png'),r.render().asPng());
"""
    tmp = "/tmp/_render.js"
    with open(tmp, "w") as f:
        f.write(js)
    rc = os.system(f"node {tmp} {p} 1440 {' '.join(FONT)}")
    print("png rc =", rc)


if __name__ == "__main__":
    main()
