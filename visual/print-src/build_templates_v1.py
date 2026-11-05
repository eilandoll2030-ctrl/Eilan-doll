"""Build «قوالب إيلان البصرية — الأربعة الأساسية» v1 (tree · iceberg · roadmap · cycle).
Standalone: needs only Python + Playwright and the repo fonts in coloring/fonts (no local server).
  python3 visual/print-src/build_templates_v1.py [--preview DIR]
Output (NOT committed — paid files, visual/pdf-out/ is git-ignored and visual/print-src/ is deploy-excluded):
  visual/pdf-out/templates-v1/Eilan-Visual-Templates-AR.pdf        screen edition (iPad, A4 landscape, tappable contents)
  visual/pdf-out/templates-v1/Eilan-Visual-Templates-EN.pdf
  visual/pdf-out/templates-v1/Eilan-Visual-Templates-AR-print.pdf  print edition (light ink, A4 landscape)
  visual/pdf-out/templates-v1/Eilan-Visual-Templates-EN-print.pdf
  visual/pdf-out/templates-v1/png/*.png                            filled examples + store cover (1600 px / 1200 px)
--preview DIR also writes one combined review PDF + the PNGs into DIR.
Layout is drawn in millimetres on an A4 landscape page (297 x 210). Geometry is defined right-to-left for Arabic
and mirrored for English, so the flow (roadmap, cycle) always runs in the reading direction.
Style follows the Visual Lab / workbook (visual/src/visual-lab.html, build_pdfs.py): paper theme, cube ramp, Cairo + Poppins.
"""
import math, pathlib, shutil, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from templates_v1_data import ORDER, UI, T, STORE

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'visual' / 'pdf-out' / 'templates-v1'
PNG = OUT / 'png'
FONTS = ROOT / 'coloring' / 'fonts'
W, H = 297, 210

# approved logo «مكعبات تبني عالم» (assets/logo/eilan-icon.svg without the black tile)
LOGO_G = ('<rect x="6" y="18" width="22" height="22" rx="6" fill="#EBDDB0"/><rect x="33" y="18" width="22" height="22" rx="6" fill="#7FAA8A"/>'
          '<rect x="6" y="45" width="22" height="22" rx="6" fill="#3E7A55"/><rect x="33" y="45" width="22" height="22" rx="6" fill="#4A2682"/>'
          '<rect x="60" y="45" width="22" height="22" rx="6" fill="#2F5E42"/><rect x="6" y="72" width="22" height="22" rx="6" fill="#2F5E42"/>'
          '<rect x="33" y="72" width="22" height="22" rx="6" fill="#3E7A55"/><rect x="60" y="72" width="22" height="22" rx="6" fill="#7FAA8A"/>'
          '<rect x="74" y="2" width="22" height="22" rx="6" fill="#E0B454"/>')
def logo(size='9mm', tile=None):
    bg = f'<rect width="100" height="100" rx="22" fill="{tile}"/>' if tile else ''
    inner = f'<g transform="translate(50 50) scale(.84) translate(-51 -48)">{LOGO_G}</g>' if tile else LOGO_G
    return f'<svg viewBox="0 0 100 100" style="width:{size};height:{size};flex:none">{bg}{inner}</svg>'

THEMES = {
 'screen': dict(bg='#F7F1E3', card='#FFFBF1', ink='#1F3A2B', mu='#6E6C5A', gold='#B58A2E', gold2='#E0B454', g1='#1F5A3B', g2='#2F7A52', g3='#6FA37C',
                pu='#4A2682', line='#D9CFB4', rule='#CDBF9C', canopy='#6FA37C', canopy_op=.16, trunk='#1F3A2B',
                water1='#2F6B4A', water2='#173826', water3='#0F1A12', ice='#F6EFDD', ice2='#E7DCC0', zone='#F6E3A8', road='#24261D', roadedge='#E7DCC0'),
 'print': dict(bg='#FFFDF8', card='#FFFDF8', ink='#1F3A2B', mu='#6E6C5A', gold='#B58A2E', gold2='#E0B454', g1='#1F5A3B', g2='#2F7A52', g3='#6FA37C',
               pu='#4A2682', line='#C9BE9F', rule='#C9BE9F', canopy='#6FA37C', canopy_op=.10, trunk='#2F5E42',
               water1='#E6EFE3', water2='#D3E2CF', water3='#C2D6BE', ice='#FFFDF8', ice2='#FFFDF8', zone='#1F5A3B', road='#FFFDF8', roadedge='#2F5E42'),
}


# print edition: outlines instead of solid fills (saves ink)
PRINT_CSS = """
.bx.gold{background:#FDF6E3;border:.6mm solid #E0B454}.bx.gold .lb{color:#8A6516}
.bx.gold .ln{background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 6.2mm,#C9BE9F 6.2mm,#C9BE9F 6.5mm)}
.bx.center{background:#FFFDF8;border:.6mm solid #1F5A3B;color:#1F3A2B}.bx.center .lb{color:#B58A2E}
.bx.center .ln{background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 6.2mm,#C9BE9F 6.2mm,#C9BE9F 6.5mm)}
.tag.ex{background:#FFFDF8;color:#1F5A3B;border-color:#2F7A52}
"""


def css(th):
    return f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
@page{{size:297mm 210mm;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Cairo,sans-serif;color:{th['ink']};font-weight:700}}
html[lang=en] body{{font-family:Cairo,Poppins,sans-serif}}
.pg{{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:{th['bg']}}}
.pg:last-child{{page-break-after:auto}}
.art{{position:absolute;left:0;top:0;width:297mm;height:210mm}}
.eb{{font-family:Poppins;font-weight:800;letter-spacing:.9mm;font-size:8pt;color:{th['gold']}}}
.hd{{position:absolute;top:7mm;left:12mm;right:12mm;display:flex;align-items:flex-start;gap:6mm;z-index:3}}
.hd .t{{flex:1;min-width:0}}
.hd h1{{font-weight:900;font-size:21pt;line-height:1.25}}
.hd h1 small{{font-size:12pt;color:{th['mu']};font-weight:700}}
.hd .topic{{display:flex;align-items:flex-end;gap:2mm;font-size:13pt;font-weight:900;margin-top:1mm}}
.hd .topic i{{display:block;width:120mm;border-bottom:.5mm dotted {th['gold']};height:7mm}}
.hd .side{{display:flex;align-items:center;gap:2.4mm}}
.tag{{font-size:8.5pt;font-weight:900;padding:.8mm 3.2mm;border-radius:10mm;border:.3mm solid {th['g3']};color:{th['g1']};background:{th['card']}}}
.tag.ex{{background:{th['g2']};color:#FBF8F0;border-color:{th['g2']}}}
.ft{{position:absolute;left:12mm;right:12mm;bottom:3.6mm;height:6mm;display:flex;align-items:center;justify-content:space-between;font-size:7.5pt;color:{th['mu']};z-index:3}}
.ft .sg{{position:absolute;left:50%;transform:translateX(-50%);display:flex;align-items:center;gap:1.6mm;font-family:Poppins,Cairo;font-weight:800;letter-spacing:.35mm;font-size:7.6pt;color:{th['ink']};white-space:nowrap}}
.ft a{{color:{th['g2']};text-decoration:none;font-weight:900;border:.3mm solid {th['g3']};border-radius:10mm;padding:.3mm 3mm;background:{th['card']}}}
.ft.dk,.ft.dk .sg{{color:#EFE9DA}}
.tip{{position:absolute;left:14mm;right:14mm;bottom:10.6mm;text-align:center;font-size:8pt;color:{th['mu']};z-index:3}}
.bx{{position:absolute;background:{th['card']};border:.35mm solid {th['line']};border-radius:3mm;padding:1.8mm 2.6mm 1.6mm;display:flex;flex-direction:column;z-index:2;overflow:hidden}}
.bx .lb{{font-size:7pt;font-weight:900;color:{th['gold']};line-height:1.3;display:flex;align-items:center;gap:1.4mm;white-space:nowrap}}
.bx .lb b{{display:inline-grid;place-items:center;min-width:4.2mm;height:4.2mm;border-radius:1.2mm;background:{th['g2']};color:#FBF8F0;font-family:Poppins;font-size:6.6pt;padding:0 .8mm}}
.fc{{flex:1;display:flex;flex-direction:column;justify-content:center;padding-bottom:1.5mm}}
.bx .tt{{font-size:12.5pt;font-weight:900;line-height:1.35;margin-top:.4mm}}
.bx .ds{{font-size:9.8pt;color:{th['mu']};line-height:1.4}}
.bx ul{{list-style:none;margin-top:.6mm}}
.bx li{{font-size:10.6pt;font-weight:900;line-height:1.55;display:flex;gap:1.6mm;align-items:baseline}}
.bx li:before{{content:'';flex:none;width:1.6mm;height:1.6mm;border-radius:.4mm;background:{th['gold2']};transform:translateY(-.3mm)}}
.bx .ln{{flex:1;margin-top:.6mm;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 6.2mm,{th['rule']} 6.2mm,{th['rule']} 6.5mm)}}
.bx .hint{{font-size:6.8pt;color:{th['mu']};opacity:.8;line-height:1.3}}
.bx.gold{{background:{th['gold2']};border-color:{th['gold2']}}}.bx.gold .lb{{color:#3B2A06}}.bx.gold .tt{{color:#14150F}}
.bx.gold .ln{{background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 6.2mm,rgba(20,21,15,.35) 6.2mm,rgba(20,21,15,.35) 6.5mm)}}
.bx.core{{border-color:{th['pu']};border-width:.5mm}}.bx.core .lb{{color:{th['pu']}}}
.bx.ice{{background:transparent;border:none;padding:2mm 3mm}}
.bx.center{{text-align:center;align-items:center;justify-content:center;background:{th['g1']};border-color:{th['g1']};color:#FBF8F0;border-radius:50%}}
.bx.center .lb{{color:{th['gold2']}}}.bx.center .tt{{font-size:10.5pt}}.bx.center .fc{{padding-bottom:0}}
.bx.center .ln{{width:100%;background-image:repeating-linear-gradient(to bottom,transparent 0,transparent 6.2mm,rgba(246,227,168,.55) 6.2mm,rgba(246,227,168,.55) 6.5mm)}}
.zone{{position:absolute;z-index:2;font-size:9.5pt;font-weight:900;color:{th['zone']};line-height:1.3}}
.zone small{{display:block;font-size:7.4pt;opacity:.85;font-weight:700}}
.badge{{position:absolute;z-index:3;width:8mm;height:8mm;margin:-4mm 0 0 -4mm;border-radius:50%;display:grid;place-items:center;font-family:Poppins;font-weight:800;font-size:9.5pt;border:.6mm solid {th['bg']}}}
.pill{{position:absolute;z-index:3;font-size:8.5pt;font-weight:900;padding:.6mm 3mm;border-radius:10mm;background:{th['card']};border:.3mm solid {th['line']};color:{th['mu']};transform:translate(-50%,-50%);white-space:nowrap}}
.dark{{background:radial-gradient(120% 100% at 50% 120%,#2E5C43 0,#1A2A20 50%,#14150F 100%);color:#EFE9DA}}
.chips{{display:flex;gap:2.2mm;flex-wrap:wrap;font-size:10pt;font-weight:900}}
.chips span{{padding:1.2mm 4mm;border-radius:20mm;border:.3mm solid rgba(232,182,74,.6)}}
.card{{background:{th['card']};border:.35mm solid {th['line']};border-radius:4mm}}
""" + (PRINT_CSS if th is THEMES['print'] else '')


# ------------------------------------------------------------------ helpers
class Pg:
    """Collects art (svg, AR geometry) and html boxes; mirrors x for LTR."""
    def __init__(s, rtl): s.rtl, s.svg, s.html = rtl, [], []
    def X(s, x, w=0): return x if s.rtl else W - x - w
    def box(s, x, y, w, h, label, body, cls='', num=None):
        n = f'<b>{num}</b>' if num is not None else ''
        s.html.append(f'<div class="bx {cls}" style="left:{s.X(x, w):.1f}mm;top:{y:.1f}mm;width:{w}mm;height:{h}mm"><div class="lb">{n}{label}</div>{body}</div>')
    def raw(s, x, y, w, inner, cls='zone', h=None):
        hh = f'height:{h}mm;' if h else ''
        s.html.append(f'<div class="{cls}" style="left:{s.X(x, w):.1f}mm;top:{y:.1f}mm;width:{w}mm;{hh}">{inner}</div>')
    def badge(s, x, y, txt, bg, fg):
        s.html.append(f'<div class="badge" style="left:{s.X(x):.1f}mm;top:{y:.1f}mm;background:{bg};color:{fg}">{txt}</div>')
    def pill(s, x, y, txt):
        s.html.append(f'<div class="pill" style="left:{s.X(x):.1f}mm;top:{y:.1f}mm">{txt}</div>')
    def art(s):
        g = ''.join(s.svg)
        if not s.rtl: g = f'<g transform="matrix(-1 0 0 1 {W} 0)">{g}</g>'
        return f'<svg class="art" viewBox="0 0 {W} {H}">{g}</svg>'


def filled(title=None, desc=None, items=None):
    h = ''
    if title: h += f'<div class="tt">{title}</div>'
    if desc: h += f'<div class="ds">{desc}</div>'
    if items: h += '<ul>' + ''.join(f'<li>{i}</li>' for i in items) + '</ul>'
    return f'<div class="fc">{h}</div>'

def lines(hint=None):
    return (f'<div class="hint">{hint}</div>' if hint else '') + '<div class="ln"></div>'


# ------------------------------------------------------------------ the four templates
def draw_tree(p, th, c, ex):
    L = c['lab']; cx = 148.5
    p.svg.append(f'<ellipse cx="{cx}" cy="70" rx="128" ry="44" fill="{th["canopy"]}" opacity="{th["canopy_op"]}"/>'
                 f'<ellipse cx="{cx - 70}" cy="84" rx="70" ry="34" fill="{th["canopy"]}" opacity="{th["canopy_op"]}"/>'
                 f'<ellipse cx="{cx + 70}" cy="84" rx="70" ry="34" fill="{th["canopy"]}" opacity="{th["canopy_op"]}"/>')
    # branches (drawn first so the trunk sits on top)
    bpos = [(198, 44), (205, 88), (119, 55), (27, 44), (20, 88)]  # x,y of 72x34 boxes (centre one 59x30)
    for i, (x, y) in enumerate(bpos):
        bw = 59 if i == 2 else 72
        ax, ay = (x + bw / 2, y + 30) if i == 2 else ((x if x > cx else x + bw), y + 17)
        p.svg.append(f'<path d="M{cx} 104 Q{(cx + ax) / 2:.1f} {min(ay, 100) - 6:.1f} {ax:.1f} {ay:.1f}" stroke="{th["trunk"]}" stroke-width="2.6" fill="none" stroke-linecap="round"/>')
    p.svg.append(f'<path d="M{cx - 13} 152 C{cx - 8} 132 {cx - 9} 118 {cx - 6} 98 L{cx + 6} 98 C{cx + 9} 118 {cx + 8} 132 {cx + 13} 152Z" fill="{th["trunk"]}"/>')
    p.svg.append(f'<line x1="16" y1="152" x2="281" y2="152" stroke="{th["g1"]}" stroke-width=".7"/>')
    p.svg.append(''.join(f'<rect x="{18 + i * 10}" y="153.5" width="5" height="1.4" rx=".5" fill="{th["gold2"]}" opacity=".5"/>' for i in range(27)))
    rpos = [(197, 162), (113.5, 162), (30, 162)]
    for x, y in rpos:
        p.svg.append(f'<path d="M{cx} 152 Q{(cx + x + 35) / 2:.1f} 158 {x + 35:.1f} {y:.1f}" stroke="{th["trunk"]}" stroke-width="1.6" fill="none" opacity=".75"/>')
    p.svg.append(f'<circle cx="{cx}" cy="45" r="3" fill="{th["gold2"]}"/>')
    # boxes
    p.box(110, 28, 77, 20, L['fruit'], filled(ex['fruit']) if ex else lines(), 'gold')
    for i, (x, y) in enumerate(bpos):
        bw, bh = (59, 30) if i == 2 else (72, 34)
        p.box(x, y, bw, bh, L['branch'], filled(*ex['branches'][i]) if ex else lines(), num=i + 1)
    p.box(116, 108, 65, 34, L['trunk'], filled(*ex['trunk']) if ex else lines(), 'core')
    for i, (x, y) in enumerate(rpos):
        p.box(x, y, 70, 26, L['root'], filled(*ex['roots'][i]) if ex else lines(), num=i + 1)


def draw_iceberg(p, th, c, ex):
    L = c['lab']; sea = 80
    p.svg.append(f'<defs><linearGradient id="wt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{th["water1"]}"/><stop offset=".55" stop-color="{th["water2"]}"/>'
                 f'<stop offset="1" stop-color="{th["water3"]}"/></linearGradient>'
                 f'<linearGradient id="ic" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{th["ice"]}"/><stop offset="1" stop-color="{th["ice2"]}"/></linearGradient></defs>')
    p.svg.append(f'<rect x="0" y="{sea}" width="{W}" height="{196 - sea}" fill="url(#wt)"/>')
    p.svg.append(f'<path d="M0 {sea} Q20 {sea - 2.4} 40 {sea} T80 {sea} T120 {sea} T160 {sea} T200 {sea} T240 {sea} T280 {sea} T320 {sea}" stroke="{th["gold2"]}" stroke-width=".8" fill="none"/>')
    st = f'stroke="{th["g1"]}" stroke-width=".6"' if th is THEMES['print'] else 'stroke="#CFC3A2" stroke-width=".5"'
    p.svg.append(f'<path d="M106 {sea} L124 54 L136 60 L150 33 L170 56 L178 50 L192 {sea}Z" fill="{th["ice"]}" {st}/>')
    p.svg.append(f'<path d="M106 {sea} L80 108 L70 148 L90 184 L150 192 L208 182 L228 146 L216 106 L192 {sea}Z" fill="url(#ic)" opacity=".94" {st}/>')
    p.svg.append(f'<line x1="106" y1="{sea}" x2="192" y2="{sea}" stroke="{th["gold2"]}" stroke-width=".5" opacity=".7"/>')
    p.box(200, 30, 82, 44, L['top'], filled(items=ex['top']) if ex else lines())
    p.box(15, 30, 82, 44, L['insight'], filled(ex['insight']) if ex else lines(), 'gold')
    p.box(104, 88, 90, 40, L['mid'], filled(items=ex['mid']) if ex else lines(), 'ice')
    p.box(94, 134, 110, 46, L['deep'], filled(items=ex['deep']) if ex else lines(), 'ice')
    p.raw(236, 96, 48, f'{L["z_mid"]} ▾')
    p.raw(236, 146, 48, f'{L["z_deep"]} ▾')


def draw_roadmap(p, th, c, ex):
    L = c['lab']
    pt = lambda t: (277 - 219 * t, 116 + 11 * math.sin(2 * math.pi * t))
    d = 'M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in (pt(i / 80) for i in range(81)))
    p.svg.append(f'<path d="{d}" stroke="{th["roadedge"]}" stroke-width="15" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
                 f'<path d="{d}" stroke="{th["road"]}" stroke-width="12.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
                 f'<path d="{d}" stroke="{th["gold2"]}" stroke-width=".8" stroke-dasharray="4 3" fill="none"/>')
    ramp = [('#F6E3A8', '#14150F'), ('#E0B454', '#14150F'), ('#6FA37C', '#14150F'), ('#2F7A52', '#FBF8F0'), ('#1F5A3B', '#FBF8F0')]
    for k in range(5):
        t = (k + 1) / 6; x, y = pt(t); up = k % 2 == 0
        bx, bw, bh = x - 32, 64, 38
        by = 38 if up else 148
        p.svg.append(f'<line x1="{x:.1f}" y1="{(by + bh) if up else by:.1f}" x2="{x:.1f}" y2="{y + (-6 if up else 6):.1f}" stroke="{th["g3"]}" stroke-width=".5" stroke-dasharray="1.2 1"/>')
        p.box(bx, by, bw, bh, f'{L["stage"]}', filled(*ex['stages'][k]) if ex else lines(L['hint']), num=k + 1)
        p.badge(x, y, k + 1, *ramp[k])
    # obstacle marker on the road between stage 3 and 4
    ox, oy = pt(0.585)
    p.svg.append(f'<path d="M{ox - 3.6:.1f} {oy + 3:.1f} L{ox:.1f} {oy - 3.6:.1f} L{ox + 3.6:.1f} {oy + 3:.1f}Z" fill="#C2452F" stroke="{th["bg"]}" stroke-width=".5"/>')
    p.box(12, 38, 48, 38, '⚠ ' + L['block'], filled(*ex['block']) if ex else lines(), 'core')
    # goal flag
    gx, gy = pt(1)
    p.svg.append(f'<line x1="{gx:.1f}" y1="{gy:.1f}" x2="{gx:.1f}" y2="{gy + 22:.1f}" stroke="{th["ink"]}" stroke-width="1"/>'
                 f'<path d="M{gx:.1f} {gy + 22:.1f} L{gx - 11:.1f} {gy + 26:.1f} L{gx:.1f} {gy + 30:.1f}Z" fill="{th["gold2"]}"/>'
                 f'<line x1="{gx:.1f}" y1="{gy + 22:.1f}" x2="{gx:.1f}" y2="{gy + 40:.1f}" stroke="{th["ink"]}" stroke-width="1"/>')
    p.box(12, 158, 84, 28, L['goal'], filled(ex['goal']) if ex else lines(), 'gold')
    sx, sy = pt(0); p.pill(sx - 3, sy + 14, L['start'])


def draw_cycle(p, th, c, ex):
    L = c['lab']; cx, cy, rx, ry = 148.5, 114, 82, 55
    p.svg.append(f'<defs><marker id="ar" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto"><path d="M0 0L10 5L0 10z" fill="{th["gold"]}"/></marker></defs>')
    p.svg.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{th["g3"]}" stroke-width=".6" stroke-dasharray="1.5 1.5"/>')
    p.svg.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx - 22}" ry="{ry - 15}" fill="{th["canopy"]}" opacity="{th["canopy_op"]}"/>')
    pts = []
    for k in range(6):  # counter-clockwise on screen for RTL; mirrored to clockwise for LTR
        a = math.radians(-90 - 60 * k); pts.append((cx + rx * math.cos(a), cy + ry * math.sin(a)))
    for k in range(6):  # arrow arcs between consecutive stages
        a0, a1 = math.radians(-90 - 60 * k - 24), math.radians(-90 - 60 * k - 36)
        x0, y0 = cx + rx * math.cos(a0), cy + ry * math.sin(a0); x1, y1 = cx + rx * math.cos(a1), cy + ry * math.sin(a1)
        p.svg.append(f'<path d="M{x0:.1f} {y0:.1f} A{rx} {ry} 0 0 0 {x1:.1f} {y1:.1f}" stroke="{th["gold"]}" stroke-width="1.6" fill="none" marker-end="url(#ar)"/>')
    for k, (x, y) in enumerate(pts):
        p.box(x - 31, y - 15, 62, 30, L['stage'], filled(*ex['stages'][k]) if ex else lines(), num=k + 1)
    p.box(cx - 36, cy - 17, 72, 34, L['center'], filled(ex['center']) if ex else lines(), 'center')


DRAW = {'tree': draw_tree, 'iceberg': draw_iceberg, 'roadmap': draw_roadmap, 'cycle': draw_cycle}


# ------------------------------------------------------------------ pages
def header(u, c, i, kind, ex):
    tag = f'<span class="tag ex">{u["example"]}</span>' if kind == 'ex' else f'<span class="tag">{u["blank"]}</span>'
    if kind == 'ex':
        t = f'<div class="eb">{i + 1:02d} · {c["en"]}</div><h1>{c["n"]} <small>— {ex["title"]}</small></h1>'
    else:
        t = f'<div class="eb">{i + 1:02d} · {c["en"]}</div><div style="display:flex;align-items:flex-end;gap:5mm"><h1>{c["n"]}</h1><div class="topic">{u["topic"]}<i></i></div></div>'
    return f'<div class="hd"><div class="t">{t}</div><div class="side">{tag}{logo("11mm")}</div></div>'


def footer(u, pno, edition, dark=False, link=True):
    a = f'<a href="#index">{u["index"]} {"←" if u["dir"] == "rtl" else "→"}</a>' if link else '<span></span>'
    return (f'<div class="ft{" dk" if dark else ""}"><span>{u["product"]} · {u["product_sub"]}{edition} · {u["page"]} {pno}</span>'
            f'<span class="sg">{logo("4.6mm")}{u["sign"]}</span>{a}</div>')


def template_page(lang, theme, k, i, kind, pno, anchor=True, link=True):
    u, c, th = UI[lang], T[k][lang], THEMES[theme]
    ex = c['ex'] if kind == 'ex' else None
    p = Pg(u['dir'] == 'rtl'); DRAW[k](p, th, c, ex)
    dark = (k == 'iceberg' and theme == 'screen')
    tip = f'<div class="tip" style="{"color:#C9D8C3" if dark else ""}">{c["tips"]}</div>' if kind == 'ex' and k != 'iceberg' else ''
    ed = ' · ' + u['print_t'] if theme == 'print' else ''
    aid = f' id="{lang}-{theme}-{k}"' if (anchor and kind == 'ex') else ''
    return (f'<section class="pg" dir="{u["dir"]}"{aid} data-k="{k}" data-kind="{kind}">{p.art()}{header(u, c, i, kind, ex)}'
            f'{"".join(p.html)}{tip}{footer(u, pno, ed, dark=False, link=link)}</section>')


def cover(lang, thumbs):
    u = UI[lang]
    th = ''.join(f'<img src="file://{thumbs[k]}" style="width:100%;border-radius:2.4mm;display:block;border:.3mm solid rgba(232,182,74,.45)">' for k in ORDER) if thumbs else ''
    return f'''<section class="pg dark" dir="{u["dir"]}">
<div style="position:absolute;inset:0;display:grid;grid-template-columns:1.05fr 1fr;gap:12mm;align-items:center;padding:0 18mm">
<div style="display:flex;flex-direction:column;gap:5mm">{logo("22mm")}
<div class="eb" style="color:#E0B454">EILAN VISUAL TEMPLATES · قوالب إيلان البصرية</div>
<div style="font-weight:900;font-size:33pt;line-height:1.2">{u["product"]}<br><span style="color:#E0B454">{u["product_sub"]}</span></div>
<div style="font-size:12.5pt;color:#C9D8C3;line-height:1.7">{u["cover_lead"]}</div>
<div class="chips">{"".join(f"<span>{x}</span>" for x in u["chips"])}</div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:4mm">{th}</div></div>
<div class="ft dk" style="justify-content:center"><span class="sg" style="position:static;transform:none">{logo("4.6mm")}{u["sign"]} · THE DIGITAL WORLD</span></div></section>'''


def index_page(lang, theme='screen', pages=None):
    u = UI[lang]; th = THEMES[theme]
    rows = ''.join(f'''<a href="#{lang}-{theme}-{k}" class="card" style="display:flex;align-items:center;gap:4mm;padding:3.4mm 5mm;text-decoration:none;color:{th["ink"]}">
<b style="font-family:Poppins;color:{th["gold"]};font-size:15pt;width:10mm">{i + 1:02d}</b><span style="flex:1"><b style="font-size:14pt;font-weight:900">{T[k][lang]["n"]}</b>
<span class="eb" style="margin-inline-start:2mm">{T[k][lang]["en"]}</span><br><span style="font-size:9.5pt;color:{th["mu"]}">{T[k][lang]["best"]}</span></span>
<span style="font-size:9pt;color:{th["g2"]};font-weight:900;white-space:nowrap">{u["page"]} {pages[k]}</span></a>''' for i, k in enumerate(ORDER))
    how = ''.join(f'<li style="margin-bottom:1.6mm">{x}</li>' for x in u['howto'])
    return f'''<section class="pg" dir="{u["dir"]}" id="index">
<div class="hd"><div class="t"><div class="eb">{u["product"]} · {u["product_sub"]}</div><h1>{u["which_t"]}</h1></div><div class="side">{logo("11mm")}</div></div>
<div style="position:absolute;top:32mm;left:14mm;right:14mm;bottom:16mm;display:grid;grid-template-columns:1.35fr 1fr;gap:9mm">
<div style="display:grid;grid-auto-rows:1fr;gap:3.4mm">{rows}</div>
<div class="card" style="padding:6mm 7mm"><div style="font-weight:900;font-size:15pt;margin-bottom:3mm">{u["howto_t"]}</div>
<ol style="font-size:10.5pt;line-height:1.75;padding-inline-start:5mm">{how}</ol></div></div>{footer(u, 2, "", link=False)}</section>'''


def end_page(lang):
    u = UI[lang]
    return f'''<section class="pg dark" dir="{u["dir"]}"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5mm;text-align:center;padding:0 40mm">
{logo("26mm")}<div style="font-weight:900;font-size:26pt">{u["end_t"]}</div>
<div style="font-size:12pt;color:#C9D8C3;line-height:1.8">{u["end_s"]}</div></div>
<div class="ft dk" style="justify-content:center"><span class="sg" style="position:static;transform:none">{logo("4.6mm")}{u["sign"]} · THE DIGITAL WORLD</span></div></section>'''


def print_cover(lang):
    u = UI[lang]; th = THEMES['print']
    li = ''.join(f'<div class="card" style="padding:4mm 5mm"><b style="font-family:Poppins;color:{th["gold"]}">{i + 1:02d}</b> <b style="font-size:13pt;font-weight:900">{T[k][lang]["n"]}</b><div style="font-size:9.5pt;color:{th["mu"]}">{T[k][lang]["best"]}</div></div>' for i, k in enumerate(ORDER))
    return f'''<section class="pg" dir="{u["dir"]}"><div style="position:absolute;inset:18mm 22mm;display:flex;flex-direction:column;gap:5mm">
<div style="display:flex;align-items:center;gap:5mm">{logo("20mm")}<div><div class="eb">EILAN VISUAL TEMPLATES · {u["print_t"]}</div>
<div style="font-weight:900;font-size:30pt;line-height:1.2">{u["product"]} — <span style="color:{th["g2"]}">{u["product_sub"]}</span></div></div></div>
<div style="font-size:12pt;color:{th["mu"]}">{u["print_s"]}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:4mm;margin-top:3mm">{li}</div>
<div class="card" style="padding:5mm 6mm;margin-top:2mm"><div style="font-weight:900;font-size:14pt;margin-bottom:2mm">{u["howto_t"]}</div>
<ol style="font-size:10.5pt;line-height:1.75;padding-inline-start:5mm">{"".join(f"<li>{x}</li>" for x in u["howto"][1:3] + u["print_how"])}</ol></div></div>{footer(u, 1, " · " + u["print_t"], link=False)}</section>'''


def doc(lang, sections):
    return f'<!doctype html><html lang="{UI[lang]["lang"]}"><head><meta charset="utf-8"><style>{css(THEMES["screen"])}</style></head><body>{"".join(sections)}</body></html>'


def screen_sections(lang, thumbs):
    pages = {k: 3 + 2 * i for i, k in enumerate(ORDER)}
    S = [cover(lang, thumbs), index_page(lang, pages=pages)]
    for i, k in enumerate(ORDER):
        S += [template_page(lang, 'screen', k, i, 'ex', pages[k]), template_page(lang, 'screen', k, i, 'blank', pages[k] + 1)]
    return S + [end_page(lang)]


def print_sections(lang):
    S = [print_cover(lang)]
    for i, k in enumerate(ORDER):
        S += [template_page(lang, 'print', k, i, 'ex', 2 + 2 * i, anchor=False, link=False),
              template_page(lang, 'print', k, i, 'blank', 3 + 2 * i, anchor=False, link=False)]
    return S


def print_doc(lang, sections):
    # print edition uses the print theme for page chrome too
    return f'<!doctype html><html lang="{UI[lang]["lang"]}"><head><meta charset="utf-8"><style>{css(THEMES["print"])}</style></head><body>{"".join(sections)}</body></html>'


def render_pdf(br, html, out):
    tmp = OUT / f'_{out.stem}.html'; tmp.write_text(html, encoding='utf-8')
    pg = br.new_page(); pg.goto(f'file://{tmp}'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(600)
    pg.pdf(path=str(out), width='297mm', height='210mm', print_background=True, prefer_css_page_size=True)
    pg.close(); tmp.unlink(); print('built', out.relative_to(ROOT) if ROOT in out.parents else out)


def shoot_pages(br, html, prefix, scale=1.4):
    """Screenshot every <section> (297mm ≈ 1123 css px → ×1.4 ≈ 1572 px wide)."""
    tmp = OUT / '_shot.html'; tmp.write_text(html, encoding='utf-8')
    pg = br.new_page(viewport={'width': 1200, 'height': 900}, device_scale_factor=scale)
    pg.goto(f'file://{tmp}'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(600)
    files = []
    for n, el in enumerate(pg.locator('section').all()):
        f = PNG / f'{prefix}-{n + 1:02d}.png'; el.screenshot(path=str(f)); files.append(f)
    pg.close(); tmp.unlink(); return files


def store_cover(br, thumbs):
    th = THEMES['screen']
    imgs = ''.join(f'<img src="file://{thumbs[k]}" style="width:100%;border-radius:14px;display:block;border:2px solid rgba(232,182,74,.5)">' for k in ORDER)
    html = f'''<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{css(th)}
body{{margin:0}}.sc{{width:1200px;height:1200px;position:relative;overflow:hidden}}</style></head><body>
<div class="sc dark" dir="rtl"><div style="position:absolute;inset:70px 70px 0;display:flex;flex-direction:column;gap:26px">
<div style="display:flex;align-items:center;gap:26px">{logo("118px")}<div><div class="eb" style="font-size:20px;letter-spacing:5px;color:#E0B454">EILAN VISUAL TEMPLATES</div>
<div style="font-weight:900;font-size:68px;line-height:1.15">قوالب إيلان البصرية</div>
<div style="font-weight:900;font-size:36px;color:#E0B454">الأربعة الأساسية · The Core Four</div></div></div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:22px">{imgs}</div>
<div class="chips" style="font-size:24px;gap:14px;justify-content:center">{"".join(f"<span style='padding:8px 22px'>{x}</span>" for x in ["شجرة · جبل جليد · طريق · دورة", "مثال + صفحة فارغة", "عربي · English", "آيباد + طباعة"])}</div></div>
<div style="position:absolute;bottom:38px;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:12px;font-family:Poppins,Cairo;font-weight:800;letter-spacing:2px;font-size:22px;color:#EFE9DA">{logo("34px")}إيلان دول — EILAN DOLL</div></div></body></html>'''
    tmp = OUT / '_store.html'; tmp.write_text(html, encoding='utf-8')
    pg = br.new_page(viewport={'width': 1200, 'height': 1200}); pg.goto(f'file://{tmp}'); pg.evaluate('document.fonts.ready'); pg.wait_for_timeout(600)
    f = PNG / 'store-cover-1200.png'; pg.locator('.sc').screenshot(path=str(f)); pg.close(); tmp.unlink(); return f


if __name__ == '__main__':
    preview = pathlib.Path(sys.argv[sys.argv.index('--preview') + 1]) if '--preview' in sys.argv else None
    PNG.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as pw:
        br = pw.chromium.launch()
        # 1) filled-example PNGs (also used as thumbnails on the covers)
        ex = {}
        for lang in ('ar', 'en'):
            html = doc(lang, [template_page(lang, 'screen', k, i, 'ex', 3 + 2 * i) for i, k in enumerate(ORDER)])
            for k, f in zip(ORDER, shoot_pages(br, html, f'example-{lang}')):
                ex[(lang, k)] = f.rename(PNG / f'example-{lang}-{ORDER.index(k) + 1}-{k}.png')
        thumbs = {lang: {k: ex[(lang, k)] for k in ORDER} for lang in ('ar', 'en')}
        cov = store_cover(br, thumbs['ar'])
        # 2) the four sellable PDFs
        for lang in ('ar', 'en'):
            L = lang.upper()
            render_pdf(br, doc(lang, screen_sections(lang, thumbs[lang])), OUT / f'Eilan-Visual-Templates-{L}.pdf')
            render_pdf(br, print_doc(lang, print_sections(lang)), OUT / f'Eilan-Visual-Templates-{L}-print.pdf')
        # 3) review copies: every page as PNG (for visual QA) + optional combined preview
        if '--qa' in sys.argv:
            for lang in ('ar', 'en'):
                shoot_pages(br, doc(lang, screen_sections(lang, thumbs[lang])), f'qa-{lang}-screen', scale=1)
                shoot_pages(br, print_doc(lang, print_sections(lang)), f'qa-{lang}-print', scale=1)
        if preview:
            preview.mkdir(parents=True, exist_ok=True)
            for f in list(ex.values()) + [cov]: shutil.copy(f, preview / f.name)
        br.close()
    if preview:  # combined review PDF: AR screen → EN screen → AR print → EN print (pypdf, if present)
        from pypdf import PdfWriter
        wr = PdfWriter()
        for n in ('AR', 'EN', 'AR-print', 'EN-print'): wr.append(str(OUT / f'Eilan-Visual-Templates-{n}.pdf'))
        wr.write(str(preview / 'visual-templates-v1.pdf')); print('preview', preview / 'visual-templates-v1.pdf')
    print('done')
