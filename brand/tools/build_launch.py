#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — حزمة إعلان الافتتاح والنداء.
قوالب جاهزة للمقاسات اللي تحتاجينها للإعلان + النداء الافتتاحي.

    python3 brand/tools/build_launch.py
"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
LAUNCH = os.path.normpath(os.path.join(HERE, "..", "launch"))
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
const [, , svgPath, outPath, width, ...fonts] = process.argv;
const r = new Resvg(fs.readFileSync(svgPath), {
  font: {fontFiles: fonts, loadSystemFonts: true, defaultFontFamily: 'Cairo'},
  fitTo: {mode: 'width', value: Number(width)},
});
fs.writeFileSync(outPath, r.render().asPng());
'''


def render(svg, name, width):
    src = "/tmp/_l.svg"
    open(src, "w", encoding="utf-8").write(svg)
    open("/tmp/_lr.js", "w").write(NODE)
    out = os.path.join(LAUNCH, name)
    if os.system(f"node /tmp/_lr.js {src} {out} {width} {' '.join(FONTS)}") != 0:
        raise SystemExit("render failed " + name)
    return out


# ------------------------------------------------------------------ helpers
def grid(w, h, step=60, op=".05"):
    return (f'<g stroke="{CREAM}" stroke-opacity="{op}" stroke-width="1">'
            + "".join(f'<line x1="{x}" y1="0" x2="{x}" y2="{h}"/>' for x in range(0, w, step))
            + "".join(f'<line x1="0" y1="{y}" x2="{w}" y2="{y}"/>' for y in range(0, h, step))
            + "</g>")


def glow(cx, cy, r, color=GREEN, op=".10"):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{color}" opacity="{op}"/>')


def wrap(w, h, body, bg=INK):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" '
            f'direction="rtl"><rect width="{w}" height="{h}" fill="{bg}"/>{body}</svg>')


AR = "Cairo"
EN = "Orbitron"


# ------------------------------------------------------------------ pieces
def announcement(w, h, mark_scale, title, sub, lines, kicker, cta=None, date=None,
                 uid="a", center=False):
    """إعلان واحد بأي مقاس — مربع أو طولي أو عرضي"""
    m = bf.mark(book_on=True, uid=uid)
    if center:
        cx = w / 2
        y0 = h * .10
        ms = mark_scale
        body = [grid(w, h), glow(cx, h * .42, min(w, h) * .52),
                f'<text x="{cx}" y="{y0+18}" text-anchor="middle" font-family="{EN}" font-size="{h*.017}" '
                f'letter-spacing="{h*.006}" fill="{GOLD}">{kicker}</text>',
                f'<g transform="translate({cx-100*ms} {y0+h*.035}) scale({ms})">{m}</g>']
        ty = y0 + h * .035 + 100 * ms + h * .075
        body.append(f'<text x="{cx}" y="{ty}" text-anchor="middle" font-family="{AR}" font-weight="900" '
                    f'font-size="{h*.085}" fill="{CREAM}">{title}</text>')
        body.append(f'<text x="{cx}" y="{ty+h*.062}" text-anchor="middle" font-family="{AR}" font-weight="700" '
                    f'font-size="{h*.036}" fill="{SAGE}">{sub}</text>')
        yy = ty + h * .125
        for ln, col in lines:
            body.append(f'<text x="{cx}" y="{yy}" text-anchor="middle" font-family="{AR}" font-weight="900" '
                        f'font-size="{h*.048}" fill="{col}">{ln}</text>')
            yy += h * .062
        if date:
            body.append(f'<line x1="{cx-w*.18}" y1="{yy+h*.02}" x2="{cx+w*.18}" y2="{yy+h*.02}" '
                        f'stroke="{GOLD}" stroke-opacity=".5" stroke-width="{h*.003}"/>')
            body.append(f'<text x="{cx}" y="{yy+h*.075}" text-anchor="middle" font-family="{AR}" '
                        f'font-weight="900" font-size="{h*.04}" fill="{GOLD}">{date}</text>')
        if cta:
            body.append(f'<text x="{cx}" y="{h-h*.055}" text-anchor="middle" font-family="{EN}" '
                        f'font-size="{h*.022}" letter-spacing="{h*.006}" fill="{CREAM}" opacity=".65">{cta}</text>')
    else:
        # horizontal, RTL: mark on the left, text block on the right
        ms = mark_scale
        body = [grid(w, h), glow(w * .22, h * .5, h * .58),
                f'<g transform="translate({w*.07} {h*.5-100*ms}) scale({ms})">{m}</g>']
        tx = w * .93
        body.append(f'<text x="{tx}" y="{h*.20}" text-anchor="end" font-family="{EN}" font-size="{h*.028}" '
                    f'letter-spacing="{h*.010}" fill="{GOLD}">{kicker}</text>')
        body.append(f'<text x="{tx}" y="{h*.40}" text-anchor="end" font-family="{AR}" font-weight="900" '
                    f'font-size="{h*.115}" fill="{CREAM}">{title}</text>')
        body.append(f'<text x="{tx}" y="{h*.50}" text-anchor="end" font-family="{AR}" font-weight="700" '
                    f'font-size="{h*.045}" fill="{SAGE}">{sub}</text>')
        yy = h * .645
        for ln, col in lines:
            body.append(f'<text x="{tx}" y="{yy}" text-anchor="end" font-family="{AR}" font-weight="900" '
                        f'font-size="{h*.058}" fill="{col}">{ln}</text>')
            yy += h * .082
        if date:
            body.append(f'<text x="{tx}" y="{h*.94}" text-anchor="end" font-family="{AR}" font-weight="900" '
                        f'font-size="{h*.05}" fill="{GOLD}">{date}</text>')
        if cta:
            body.append(f'<text x="{w*.07}" y="{h*.94}" font-family="{EN}" font-size="{h*.026}" '
                        f'letter-spacing="{h*.008}" fill="{CREAM}" opacity=".6">{cta}</text>')
    return wrap(w, h, "".join(body))


def story(w, h, uid="s"):
    """ستوري/ريلز — عمودي: الشعار فوق، والنداء تحت"""
    m = bf.mark(book_on=True, uid=uid)
    cx = w / 2
    body = [grid(w, h, 70), glow(cx, h * .40, w * .78),
            f'<g transform="translate({cx-100*3.4} {h*.055}) scale(3.4)">{m}</g>',
            f'<text x="{cx}" y="{h*.30}" text-anchor="middle" font-family="{EN}" font-size="{w*.032}" '
            f'letter-spacing="{w*.012}" fill="{GOLD}">THE DIGITAL WORLD</text>',
            f'<text x="{cx}" y="{h*.375}" text-anchor="middle" font-family="{AR}" font-weight="900" '
            f'font-size="{w*.105}" fill="{CREAM}">إيلان دول</text>',
            f'<text x="{cx}" y="{h*.47}" text-anchor="middle" font-family="{AR}" font-weight="900" '
            f'font-size="{w*.062}" fill="{CREAM}">مكعبات تبني عالماً</text>',
            f'<text x="{cx}" y="{h*.535}" text-anchor="middle" font-family="{AR}" font-weight="900" '
            f'font-size="{w*.062}" fill="{GOLD}">وعالم يبني إنساناً</text>',
            f'<line x1="{cx-w*.26}" y1="{h*.60}" x2="{cx+w*.26}" y2="{h*.60}" stroke="{GOLD}" '
            f'stroke-opacity=".5" stroke-width="{w*.004}"/>',
            f'<text x="{cx}" y="{h*.68}" text-anchor="middle" font-family="{AR}" font-weight="900" '
            f'font-size="{w*.05}" fill="{SAGE}">الافتتاح الرسمي</text>',
            f'<text x="{cx}" y="{h*.755}" text-anchor="middle" font-family="{AR}" font-weight="900" '
            f'font-size="{w*.075}" fill="{CREAM}">الجمعة ١ يناير ٢٠٢٧</text>',
            f'<text x="{cx}" y="{h*.865}" text-anchor="middle" font-family="{EN}" font-size="{w*.030}" '
            f'letter-spacing="{w*.010}" fill="{CREAM}" opacity=".55">EILAN-DOLL.VERCEL.APP</text>']
    return wrap(w, h, "".join(body))


def banner(w, h):
    """غلاف الحسابات — أسود هادئ مع الشعار يسار والاسم يمين"""
    m = bf.mark(book_on=True, uid="b")
    ms = 2.1
    return wrap(w, h, grid(w, h, 48) + glow(w * .80, h * .5, h * .7) +
                f'<g transform="translate({w*.055} {h*.5-100*ms/2}) scale({ms})">{m}</g>'
                f'<text x="{w*.95}" y="{h*.40}" text-anchor="end" font-family="{EN}" font-size="{h*.13}" '
                f'letter-spacing="{h*.055}" fill="{GOLD}">EILAN DOLL</text>'
                f'<text x="{w*.95}" y="{h*.58}" text-anchor="end" font-family="{AR}" font-weight="900" '
                f'font-size="{h*.15}" fill="{CREAM}">العالم الرقمي</text>'
                f'<text x="{w*.95}" y="{h*.78}" text-anchor="end" font-family="{AR}" font-weight="700" '
                f'font-size="{h*.075}" fill="{SAGE}">مكعبات تبني عالماً وعالم يبني إنساناً</text>')


def press_card(w=1080, h=1080):
    """كرت صحافة: الشعار + الألوان + معنى المكعبات"""
    m = bf.mark(book_on=True, uid="p")
    sw = (w - 120) / 8
    swatches = [(CREAM, "كريمي"), (SAGE, "نصف فاتح"), (GREEN, "أخضر"),
                (DEEP, "غامق"), (PURPLE, "بنفسجي"), (GOLD, "ذهبي"), (INK, "أسود")]
    sw_html = "".join(
        f'<rect x="{60+i*(sw+8)}" y="{h-250}" width="{sw}" height="{sw*.62}" rx="12" fill="{c}"/>'
        f'<text x="{60+i*(sw+8)+sw/2}" y="{h-186}" text-anchor="middle" font-family="{AR}" '
        f'font-weight="700" font-size="20" fill="{SAGE}">{n}</text>'
        for i, (c, n) in enumerate(swatches))
    return wrap(w, h, grid(w, h, 60) + glow(w * .5, h * .38, w * .5) +
                f'<g transform="translate({w/2-100*2.9} {h*.075}) scale(2.9)">{m}</g>'
                f'<text x="{w/2}" y="{h*.40}" text-anchor="middle" font-family="{AR}" font-weight="900" '
                f'font-size="86" fill="{CREAM}">إيلان دول</text>'
                f'<text x="{w/2}" y="{h*.455}" text-anchor="middle" font-family="{EN}" font-size="30" '
                f'letter-spacing="12" fill="{GOLD}">EILAN DOLL</text>'
                f'<text x="{w/2}" y="{h*.53}" text-anchor="middle" font-family="{AR}" font-weight="700" '
                f'font-size="30" fill="{SAGE}">كرة من مكعبات · كتاب · عقل · نور</text>'
                f'<text x="{w/2}" y="{h*.60}" text-anchor="middle" font-family="{AR}" font-weight="900" '
                f'font-size="34" fill="{CREAM}">الشعار: عالمٌ يُبنى — كل مكعب لبنة، والذهبي هو النور</text>'
                + sw_html)


# ------------------------------------------------------------------ build
FILES = {}


def build():
    FILES["launch-post-1080x1080.png"] = announcement(
        1080, 1080, 3.35, "إيلان دول", "العالم الرقمي — THE DIGITAL WORLD",
        [("مكعبات تبني عالماً", CREAM), ("وعالم يبني إنساناً", GOLD)],
        "EILAN DOLL · OPENING", cta="EILAN-DOLL.VERCEL.APP",
        date="الافتتاح الرسمي — الجمعة ١ يناير ٢٠٢٧", uid="p1", center=True)

    FILES["launch-story-1080x1920.png"] = story(1080, 1920, "p2")

    FILES["launch-banner-1500x500.png"] = banner(1500, 500)

    FILES["launch-wide-1200x630.png"] = announcement(
        1200, 630, 1.9, "إيلان دول", "مكعبات تبني عالماً — وعالم يبني إنساناً",
        [("الافتتاح الرسمي ١ يناير ٢٠٢٧", GOLD)],
        "EILAN DOLL · THE DIGITAL WORLD", cta="EILAN-DOLL.VERCEL.APP", uid="p3")

    FILES["launch-presscard-1080.png"] = press_card()

    for name, svg in FILES.items():
        base = name.replace(".png", "")
        open(os.path.join(LAUNCH, base + ".svg"), "w", encoding="utf-8").write(svg)
        w = int(base.split("-")[-1].split("x")[0])
        render(svg, name, w)
    print("launch ok →", LAUNCH, len(FILES), "files")


if __name__ == "__main__":
    build()
