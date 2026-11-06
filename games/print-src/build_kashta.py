"""«الكشتة المجنونة» — Crazy Kashta. Builds every file of the paid PDF game (30 SAR) from kashta_data.py.

  python3 games/print-src/build_kashta.py
Paid files  → games/pdf-out/   (NOT committed, NOT deployed — upload to the store only after the owner approves)
  Eilan-Kashta-Screen-AR.pdf / -EN.pdf   260×195 mm landscape (4:3, iPad), tappable index + nav on every page
  Eilan-Kashta-Print-AR.pdf  / -EN.pdf   A4 landscape, 4 cards per sheet, 3 mm bleed + crop marks, front/back
Free files  → games/pdf/
  Eilan-Kashta-Sample-AR.pdf / -EN.pdf   cover + rules + first 3 cards + "want more? buy the game"
  Eilan-Kashta-Cover.png                 1600×1200 store cover
Print setting: both sides · flip on short edge · actual size 100%.  Backs mirror the columns.
"""
import pathlib, re, subprocess, tempfile, sys

sys.path.insert(0, str(pathlib.Path(__file__).parent))
from kashta_data import CATS, deck, RULES, rules_for, HOWTO, HOWTO_RIDDLE_SCREEN, SAFETY, PRICE  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parents[2]
PAID = ROOT / "games" / "pdf-out"; PAID.mkdir(parents=True, exist_ok=True)
FREE = ROOT / "games" / "pdf"; FREE.mkdir(parents=True, exist_ok=True)
FONTS = ROOT / "coloring" / "fonts"
LOGO_SVG = (ROOT / "assets" / "logo" / "eilan-icon.svg").read_text(encoding="utf-8")
LOGO = "data:image/svg+xml;utf8," + LOGO_SVG.replace("#", "%23").replace('"', "'").replace("\n", "")
AR_DIG = str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩")
STORE_URL = "https://eilan-doll.vercel.app/store/"   # real route: index.html SEO_PAGES "store" → eilan://store
CREAM = "#EFE9DA"   # approved cream token --w in index.html
# font stacks: Poppins/Cairo first, then the system's DejaVu Sans for any glyph they lack (Arabic digits in Poppins, arrows)
FE = "Poppins,Cairo,'DejaVu Sans',sans-serif"
FA = "Cairo,Poppins,'DejaVu Sans',sans-serif"
# «·» reads like the Arabic zero «٠» in Cairo, so Arabic text uses «|» (or «،» inside sentences)
SEP = " | "


def fam(ar):
    return FA if ar else FE


def arrow(ar, size="3.2mm"):
    """Drawn arrow (no font glyph needed), pointing in the reading direction."""
    d = "M14 5 7 12l7 7M7 12h13" if ar else "M10 5l7 7-7 7M17 12H4"
    return (f'<svg viewBox="0 0 24 24" width="{size}" height="{size}" style="display:inline-block;vertical-align:-.12em" '
            f'fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="{d}"/></svg>')


def swatch(k, size="3.4mm"):
    """One colour chip per kind, the same as its card back (bg + edge), used in nav, index legend and cover."""
    bg = CATS[k][3]
    edge = {"riddle": "inset 0 0 0 .45mm #E0B454", "wild": "inset 0 0 0 .7mm #4A2682"}.get(k, "none")
    return f'<i style="width:{size};height:{size};border-radius:1mm;flex:none;display:block;background:{bg};box-shadow:{edge}"></i>'

# original cube icons, drawn in the site's one icon style (rounded cubes on a grid)
ICON = {
    "fire": "....#....|...##..#.|..####.#.|..######.|.########|.########|..######.|...####..",
    "talk": ".#######.|#########|##.#.#.##|#########|.#######.|...##....|..#......",
    "riddle": "..###..|.##.##.|....##.|...##..|..##...|.......|..##...",
    "team": ".........|.###.....|.#.##.##.|.#######.|..##..#..|.#######.|#...##.##|#....#..#",
    "star": "...#...|...#...|#######|.#####.|..###..|.##.##.|##...##",
}
BIGFIRE = [".....o.....", "....oo.....", "....ooo..o.", "...oooo..o.", "..ooooooo..", "..oooiooo..", ".oooiiiooo.",
           ".ooiiiiioo.", ".ooiiiiioo.", "..ooiiioo..", "...ooooo...", "ll.lllll.ll", ".lllllllll."]
FIRE_COL = {"o": "#E0B454", "i": "#F6E3A8", "l": "#2F5E42"}


def cube(key, size, cols):
    rows = ICON[key].split("|"); H, W = len(rows), len(rows[0])
    P = min(60 / W, 60 / H); Z = P * .82; OX = (64 - P * W) / 2; OY = (64 - P * H) / 2
    h = f'<svg viewBox="0 0 64 64" width="{size}" height="{size}" style="display:block">'
    for y, r in enumerate(rows):
        for x, c in enumerate(r):
            if c == "#":
                cx, cy = OX + (x + .5) * P, OY + (y + .5) * P
                col = cols[min(len(cols) - 1, int(y / max(1, H - 1) * len(cols)))]
                h += f'<rect x="{cx-Z/2:.2f}" y="{cy-Z/2:.2f}" width="{Z:.2f}" height="{Z:.2f}" rx="{Z*.27:.2f}" fill="{col}"/>'
    return h + "</svg>"


def fire_art(size):
    H, W = len(BIGFIRE), len(BIGFIRE[0]); P = 64 / max(W, H); Z = P * .84; OX = (64 - P * W) / 2; OY = (64 - P * H) / 2
    h = f'<svg viewBox="0 0 64 64" width="{size}" height="{size}" style="display:block">'
    for y, r in enumerate(BIGFIRE):
        for x, c in enumerate(r):
            if c != ".":
                col = FIRE_COL[c] if not (c == "o" and y < 4) else "#EBC66A"
                h += f'<rect x="{OX+x*P+(P-Z)/2:.2f}" y="{OY+y*P+(P-Z)/2:.2f}" width="{Z:.2f}" height="{Z:.2f}" rx="{Z*.27:.2f}" fill="{col}"/>'
    return h + "</svg>"


ICOLS = {"fire": ["#F6E3A8", "#E0B454", "#E0B454", "#B58A2E"], "talk": ["#1F3A2B", "#2F5A3D"], "riddle": ["#F6E3A8", "#E0B454"],
         "team": ["#14150F", "#1F3A2B", "#2F5A3D"], "star": ["#E0B454", "#EBDDB0"]}

CSS_BASE = f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:{FE};src:url('file://{FONTS}/Poppins_700Bold.ttf');font-weight:700}}
@font-face{{font-family:{FE};src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:{FA};color:#1F3A2B;background:#F6F1E3}}
a{{color:inherit;text-decoration:none}}
[dir=rtl] ol{{list-style:arabic-indic}}
.en{{font-family:{FE}}}
/* card = bleed box (128×88 trim + b on every side) */
.card{{position:relative;overflow:hidden}}
.trim{{position:absolute;width:128mm;height:88mm}}
.f-bg{{background:#F6F1E3}}
.band{{position:absolute;top:0;left:0;right:0;height:17mm;display:flex;align-items:center;gap:2.6mm;padding:0 6mm}}
.band .nm{{font-weight:900;font-size:13pt}}
.en .band .nm{{font-weight:800;font-size:11.5pt;letter-spacing:.3px}}
.pts{{margin-inline-start:auto;display:flex;align-items:center;gap:1.6mm;font-weight:900;font-size:8.5pt}}
.pts b{{width:9mm;height:9mm;border-radius:2.6mm;display:grid;place-items:center;font-size:13pt;background:#F6F1E3;color:#14150F}}
.no{{font-family:{FE};font-weight:800;font-size:7pt;opacity:.75}}
.body{{position:absolute;top:21mm;bottom:15mm;left:9mm;right:9mm;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}}
.body h3{{font-weight:900;font-size:16pt;margin-bottom:2mm;color:#14150F}}
.en .body h3{{font-weight:800;font-size:14pt}}
.body p{{font-weight:700;font-size:14.5pt;line-height:1.6;color:#1F3A2B}}
.en .body p{{font-size:12.5pt;line-height:1.5}}
.ans{{position:absolute;bottom:8.6mm;left:20mm;right:20mm;transform:rotate(180deg);text-align:center;font-size:8.5pt;font-weight:700;color:#5E5A44;border-top:.5pt dashed #B9AE8E;padding-top:.6mm}}
.ans b{{color:#B58A2E}}
.sig{{position:absolute;bottom:3.4mm;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:1.4mm;font-family:{FE};font-weight:800;font-size:5.8pt;letter-spacing:1.6px;color:#8E8A70}}
.sig img{{width:4.2mm;height:4.2mm}}
.cubes{{display:flex;gap:1mm}}.cubes i{{width:2.2mm;height:2.2mm;border-radius:.7mm;display:block}}
"""


def num(n, lang):
    return str(n).translate(AR_DIG) if lang == "ar" else str(n)


def sig(lang, color=None):
    st = f' style="color:{color}"' if color else ""
    return f'<div class="sig"{st}><img src="{LOGO}"><span>EILAN DOLL | {"الكشتة المجنونة" if lang == "ar" else "CRAZY KASHTA"}</span></div>'


def pts_word(p, lang):
    if lang == "en":
        return "point" if p == 1 else "points"
    return {1: "نقطة", 2: "نقطتين", 3: "نقاط"}[p]


def card_front(n, key, c, lang, b=0, upside_ans=True):
    """Front of card n. b = bleed in mm (3 for print, 0 for screen). upside_ans: riddle answer upside-down (print only)."""
    nm_ar, nm_en, p, bg, fg, ac, ic = CATS[key]
    ar = lang == "ar"
    title, text = (c[0], c[1]) if ar else (c[2], c[3])
    h = f'<div class="card f-bg {"" if ar else "en"}" dir="{"rtl" if ar else "ltr"}" style="width:{128+2*b}mm;height:{88+2*b}mm">'
    # band extends into bleed on top / sides
    h += f'<div style="position:absolute;top:0;left:0;right:0;height:{17+b}mm;background:{bg}"></div>'
    if key == "wild":
        h += f'<div style="position:absolute;top:{17+b}mm;left:0;right:0;height:1.2mm;background:#4A2682"></div>'
    h += f'<div class="trim" style="top:{b}mm;left:{b}mm">'
    h += f'<div class="band" style="color:{fg}">{cube(ic, "11mm", ICOLS[ic])}<span class="nm">{nm_ar if ar else nm_en}</span>'
    if p:
        h += f'<span class="pts"><b style="{"background:#14150F;color:#E0B454" if key == "group" else ""}">{num(p, lang)}</b>{pts_word(p, lang)}</span>'
    else:
        h += f'<span class="pts" style="color:#E0B454">{"بطاقة قوة" if ar else "power card"}</span>'
    h += f'<span class="no" style="margin-inline-start:3mm">#{num(n, lang)}</span></div>'
    h += '<div class="body">' + (f"<h3>{title}</h3>" if title else "") + f"<p>{text}</p></div>"
    if key == "riddle" and upside_ans:
        h += f'<div class="ans"><b>{"الحل" if ar else "Answer"}:</b> {c[4] if ar else c[5]}</div>'
    h += sig(lang) + "</div></div>"
    return h


def card_back(key, lang, b=0):
    ar = lang == "ar"
    if key is None:  # generic back (rules / scoreboard / blank)
        bg, fg, ac, name = "#14150F", "#EBDDB0", "#E0B454", "EILAN DOLL"
        icon = f'<img src="{LOGO}" style="width:26mm;height:26mm">'
    else:
        nm_ar, nm_en, p, bg, fg, ac, ic = CATS[key]; name = nm_ar if ar else nm_en
        icon = cube(ic, "30mm", ICOLS[ic] if key not in ("talk", "group") else ["#14150F", "#1F3A2B"])
    W, H = 128 + 2 * b, 88 + 2 * b
    h = f'<div class="card" dir="{"rtl" if ar else "ltr"}" style="width:{W}mm;height:{H}mm;background:{bg};color:{fg}">'
    # cube rows in the corners (identity pattern)
    for side in ("left", "right"):
        h += f'<div style="position:absolute;top:{b+5}mm;{side}:{b+5}mm;display:grid;grid-template-columns:repeat(3,3mm);gap:1mm;opacity:.35">' + "".join(
            f'<i style="width:3mm;height:3mm;border-radius:.9mm;background:{fg if i != 2 else "#E0B454"}"></i>' for i in range(9)) + "</div>"
    if key == "wild":
        h += f'<div style="position:absolute;inset:{b+3}mm;border:1.2mm solid #4A2682;border-radius:5mm"></div>'
    h += f'<div style="position:absolute;top:{b}mm;left:{b}mm;width:128mm;height:88mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2mm">'
    h += icon + f'<div style="font-weight:900;font-size:{"20pt" if ar else "17pt"};font-family:{fam(ar)}">{name}</div>'
    h += f'<div style="font-family:{FE};font-weight:800;font-size:7pt;letter-spacing:2.4px;opacity:.8">{"الكشتة المجنونة | CRAZY KASHTA" if True else ""}</div></div>'
    h += sig(lang, fg) + "</div>"
    return h


def rules_card(lang, b=0):
    ar = lang == "ar"
    h = f'<div class="card f-bg {"" if ar else "en"}" dir="{"rtl" if ar else "ltr"}" style="width:{128+2*b}mm;height:{88+2*b}mm">'
    h += f'<div class="trim" style="top:{b}mm;left:{b}mm;padding:6mm 8mm">'
    h += f'<div style="font-weight:900;font-size:14pt;color:#14150F">{"طريقة اللعب" if ar else "How to play"}</div>'
    h += f'<ol style="font-size:8.6pt;line-height:1.6;padding-inline-start:4.5mm;margin-top:1mm">' + "".join(f"<li>{x}</li>" for x in RULES[lang]) + "</ol>"
    h += f'<div style="font-size:7.4pt;line-height:1.5;margin-top:1.6mm;color:#5E5A44;border-inline-start:1mm solid #E0B454;padding-inline-start:2mm">{SAFETY[lang]}</div>'
    h += "</div>" + sig(lang) + "</div>"
    return h


def score_card(lang, b=0):
    ar = lang == "ar"
    h = f'<div class="card f-bg {"" if ar else "en"}" dir="{"rtl" if ar else "ltr"}" style="width:{128+2*b}mm;height:{88+2*b}mm">'
    h += f'<div class="trim" style="top:{b}mm;left:{b}mm;padding:6mm 9mm">'
    h += f'<div style="font-weight:900;font-size:14pt;color:#14150F;margin-bottom:1mm">{"لوحة النقاط" if ar else "Scoreboard"}</div>'
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:1.6mm 6mm">' + "".join(
        f'<div style="border-bottom:.6pt solid #B9AE8E;height:9mm;display:flex;align-items:flex-end;justify-content:space-between;font-size:7.4pt;color:#8E8A70"><span>{"الاسم" if ar else "Name"}</span><span>{"النقاط" if ar else "Points"}</span></div>' for _ in range(10)) + "</div>"
    h += "</div>" + sig(lang) + "</div>"
    return h


def blank_card(lang, b=0):
    ar = lang == "ar"
    h = f'<div class="card f-bg {"" if ar else "en"}" dir="{"rtl" if ar else "ltr"}" style="width:{128+2*b}mm;height:{88+2*b}mm">'
    h += f'<div style="position:absolute;top:0;left:0;right:0;height:{17+b}mm;background:#1F3A2B"></div>'
    h += f'<div class="trim" style="top:{b}mm;left:{b}mm"><div class="band" style="color:#F6F1E3">{cube("star", "11mm", ICOLS["star"])}<span class="nm">{"بطاقتكم" if ar else "Your card"}</span>'
    h += f'<span class="pts" style="color:#E0B454">{"اكتبوا تحديكم" if ar else "write your own"}</span></div>'
    h += '<div style="position:absolute;top:26mm;left:12mm;right:12mm">' + "".join('<div style="border-bottom:.6pt dashed #B9AE8E;height:11mm"></div>' for _ in range(4)) + "</div>"
    h += "</div>" + sig(lang) + "</div>"
    return h


def to_pdf(html_body, css, out, page_w, page_h, lang):
    html = f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>@page{{size:{page_w}mm {page_h}mm;margin:0}}{CSS_BASE}{css}</style></head><body>{html_body}</body></html>'
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html); tmp = f.name
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                    f"--print-to-pdf={out}", "--virtual-time-budget=5000", f"file://{tmp}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pathlib.Path(tmp).unlink()
    print("built", out.relative_to(ROOT))


# ───────────────────────────── PRINT (A4 landscape, 4 cards / sheet, 3 mm bleed) ─────────────────────────────
B = 3
CW, CH = 128 + 2 * B, 88 + 2 * B          # 134 × 94 bleed box
GX, GY = 8, 8                              # gutter between bleed boxes
X0 = (297 - 2 * CW - GX) / 2               # 10.5
Y0 = (210 - 2 * CH - GY) / 2               # 7
COLS = [X0, X0 + CW + GX]; ROWS = [Y0, Y0 + CH + GY]
PCSS = """.pg{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:#FFFFFF}
.pg:last-child{page-break-after:auto}.slot{position:absolute}
.cm{position:absolute;background:#14150F}.plbl{position:absolute;top:1.4mm;left:0;right:0;text-align:center;font-family:Poppins,Cairo,'DejaVu Sans',sans-serif;font-weight:700;font-size:5.6pt;color:#8E8A70}"""


def crop_marks():
    h = ""
    for cx in COLS:
        for cy in ROWS:
            tx = [cx + B, cx + B + 128]; ty = [cy + B, cy + B + 88]
            for x in tx:  # vertical marks above & below the bleed box
                h += f'<i class="cm" style="left:{x-.1:.2f}mm;top:{cy-3.5:.2f}mm;width:.2mm;height:3mm"></i>'
                h += f'<i class="cm" style="left:{x-.1:.2f}mm;top:{cy+CH+.5:.2f}mm;width:.2mm;height:3mm"></i>'
            for y in ty:  # horizontal marks left & right of the bleed box
                h += f'<i class="cm" style="top:{y-.1:.2f}mm;left:{cx-3.5:.2f}mm;height:.2mm;width:3mm"></i>'
                h += f'<i class="cm" style="top:{y-.1:.2f}mm;left:{cx+CW+.5:.2f}mm;height:.2mm;width:3mm"></i>'
    return h


def print_sheet(cards, label, back, rtl):
    # reading order slot0..3; RTL starts top-right. Backs (flip on short edge) mirror columns.
    order = [(1, 0), (0, 0), (1, 1), (0, 1)] if rtl else [(0, 0), (1, 0), (0, 1), (1, 1)]
    h = f'<section class="pg">{crop_marks()}<span class="plbl">{label}</span>'
    for (ci, ri), c in zip(order, cards):
        if back:
            ci = 1 - ci
        h += f'<div class="slot" style="left:{COLS[ci]}mm;top:{ROWS[ri]}mm">{c}</div>'
    return h + "</section>"


def print_cover(lang):
    ar = lang == "ar"
    d = "rtl" if ar else "ltr"
    t = ["٥٢ بطاقة لعب", "بطاقة القوانين", "لوحة النقاط", "بطاقتين فاضية لتحدياتكم"] if ar else ["52 game cards", "Rules card", "Scoreboard", "2 blank cards for your own"]
    return f'''<section class="pg" dir="{d}" style="background:#0E0E0A;color:#F6F1E3">
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16mm">
<div>{fire_art("80mm")}</div>
<div style="max-width:140mm"><div style="font-family:{FE};font-weight:800;letter-spacing:4px;font-size:9pt;color:#E0B454">EILAN DOLL — {"PRINT EDITION" if not ar else "نسخة الطباعة"}</div>
<div style="font-weight:900;font-size:{"44pt" if ar else "40pt"};line-height:1.15;margin:2mm 0;font-family:{fam(ar)}">{"الكشتة المجنونة" if ar else "Crazy Kashta"}</div>
<div style="font-size:13pt;color:#C9D8C3;font-family:{fam(ar)}">{"لعبة بطاقات للطلعات والكشتات حول النار" if ar else "A card game for desert trips and campfire nights"}</div>
<div style="display:flex;flex-wrap:wrap;gap:2.4mm;margin-top:6mm;font-family:{fam(ar)}">{"".join(f'<span style="border:.6pt solid #E0B454;border-radius:3mm;padding:1mm 3.4mm;font-size:10pt">{x}</span>' for x in t)}</div></div></div>
<div style="position:absolute;bottom:9mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:2.4mm;font-family:{FE};font-weight:800;letter-spacing:3px;font-size:9pt;color:#A9BFA9"><img src="{LOGO}" style="width:9mm;height:9mm">EILAN DOLL — THE DIGITAL WORLD</div></section>'''


def print_guide(lang):
    ar = lang == "ar"; ff = fam(ar)
    p1 = (["ورق A4 مقوّى (٢٠٠–٣٠٠ جرام) يعطي أحلى نتيجة.", "اختيار: <b>الطباعة على الوجهين</b>، و<b>القلب من الحافة القصيرة</b> <bdi dir=\"ltr\" style=\"font-family:Poppins,Cairo,sans-serif;font-size:.9em;white-space:nowrap\">(Flip on short edge)</bdi>.",
           "الحجم الفعلي ١٠٠٪ — بدون «ملاءمة للصفحة».", "في المطبعة: «وجهين، قلب من الحافة القصيرة، قص على علامات القص»."]
          if ar else ["Thick A4 card (200–300 gsm) gives the best result.", "Choose <b>Print on both sides</b> and <b>Flip on short edge</b>.",
                      "Actual size 100% — no \"fit to page\".", "At a print shop: \"double-sided, flip on short edge, cut on the crop marks\"."])
    p2 = (["كل ورقة فيها ٤ بطاقات، مقاس البطاقة ١٢٨×٨٨ مم.", "القص على الخطوط السوداء الصغيرة في الأطراف (علامات القص). اللون زايد ٣ مم عشان ما يطلع حد أبيض.",
           "رقم كل بطاقة مكتوب على وجهها — والقفا لونه حسب النوع.", "أول ورقتين (الغلاف وهذي) ما تحتاج قص."]
          if ar else ["Each sheet holds 4 cards, 128 × 88 mm each.", "Cut on the small black lines at the edges (crop marks). Colour runs 3 mm past the cut, so no white edges.",
                      "Every card shows its number on the front — the back colour shows its kind.", "The first two pages (cover and this one) are not cut."])
    return f'''<section class="pg" dir="{"rtl" if ar else "ltr"}" style="background:#F6F1E3">
<div style="position:absolute;inset:14mm 18mm 22mm;display:grid;grid-template-columns:1fr 1fr;gap:12mm;font-family:{ff}">
<div><div style="font-weight:900;font-size:19pt;margin-bottom:3mm;color:#14150F">{"طريقة الطباعة" if ar else "How to print"}</div>
<ol style="font-size:10.5pt;line-height:1.9;padding-inline-start:6mm">{"".join(f"<li>{x}</li>" for x in p1)}</ol></div>
<div><div style="font-weight:900;font-size:19pt;margin-bottom:3mm;color:#14150F">{"القص" if ar else "Cutting"}</div>
<ol style="font-size:10.5pt;line-height:1.9;padding-inline-start:6mm">{"".join(f"<li>{x}</li>" for x in p2)}</ol></div></div>
{sig(lang)}</section>'''


def build_print(lang):
    ar = lang == "ar"
    D = deck()
    fronts = [card_front(i + 1, k, c, lang, B) for i, (k, c) in enumerate(D)] + [rules_card(lang, B), score_card(lang, B), blank_card(lang, B), blank_card(lang, B)]
    backs = [card_back(k, lang, B) for k, _ in D] + [card_back(None, lang, B)] * 4
    pages = [print_cover(lang), print_guide(lang)]
    for s in range(0, len(fronts), 4):
        n = s // 4 + 1
        lab = (f"ورقة {num(n, lang)} | الوجه" if ar else f"Sheet {n} | FRONT"), (f"ورقة {num(n, lang)} | القفا" if ar else f"Sheet {n} | BACK")
        pages.append(print_sheet(fronts[s:s + 4], lab[0], False, ar))
        pages.append(print_sheet(backs[s:s + 4], lab[1], True, ar))
    to_pdf("".join(pages), PCSS, PAID / f"Eilan-Kashta-Print-{lang.upper()}.pdf", 297, 210, lang)


# ───────────────────────────── SCREEN (260×195 mm = 4:3 for iPad) ─────────────────────────────
SW, SH = 260, 195
SCALE = 1.45
SCSS = f""".sp{{width:{SW}mm;height:{SH}mm;position:relative;overflow:hidden;page-break-after:always;background:#F6F1E3}}
.sp:last-child{{page-break-after:auto}}
.nav{{position:absolute;top:0;bottom:0;width:44mm;background:#14150F;color:#EBDDB0;padding:7mm 4mm;display:flex;flex-direction:column;gap:1.8mm}}
.nav .lg{{display:flex;align-items:center;gap:2mm;font-weight:900;font-size:11pt;color:#F6F1E3;margin-bottom:3mm}}
.nav a{{display:flex;align-items:center;gap:2mm;padding:1.6mm 2mm;border-radius:2.4mm;font-weight:700;font-size:9pt;background:rgba(235,221,176,.06)}}
.nav a.on{{background:#2F5A3D;color:#F6F1E3}}
.nav .dot{{width:3.2mm;height:3.2mm;border-radius:1mm;flex:none}}
.main{{position:absolute;top:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center}}

.cardwrap{{position:relative;width:{128*SCALE}mm;height:{88*SCALE}mm;border-radius:6mm;overflow:hidden;box-shadow:0 2mm 0 #D9CFB4}}
.cardwrap>.card{{position:absolute;left:0;top:0;transform:scale({SCALE});transform-origin:0 0}}
.meta{{margin-top:5mm;font-size:9.5pt;color:#6E6C5A;font-weight:700;display:flex;gap:6mm;align-items:center}}
.meta a{{color:#2F5A3D;border-bottom:.5pt solid #B58A2E}}
.ssig{{position:absolute;bottom:4mm;display:flex;align-items:center;gap:1.6mm;font-family:{FE};font-weight:800;font-size:6.4pt;letter-spacing:1.8px;color:#8E8A70}}
.ssig img{{width:5mm;height:5mm}}"""


def nav(lang, active):
    ar = lang == "ar"
    side = "right" if ar else "left"
    D = deck(); first = {}
    for i, (k, _) in enumerate(D):
        first.setdefault(k, i + 1)
    items = [("index", "الفهرس" if ar else "Index", "#E0B454", "#index"), ("rules", "طريقة اللعب" if ar else "How to play", "#EBDDB0", "#rules")]
    for k in ("fire", "talk", "riddle", "group", "wild"):
        items.append((k, CATS[k][0] if ar else CATS[k][1], k, f"#c{first[k]}"))
    items.append(("score", "لوحة النقاط" if ar else "Scoreboard", "#7FAA8A", "#score"))
    h = f'<nav class="nav" style="{side}:0"><div class="lg"><img src="{LOGO}" style="width:9mm;height:9mm"><span>{"الكشتة المجنونة" if ar else "Crazy Kashta"}</span></div>'
    for key, label, col, href in items:
        # kinds: the same swatch as their back; other pages: a small round cream dot so no kind colour is reused
        dot = swatch(col, "3.2mm") if col in CATS else '<i class="dot" style="border-radius:50%;transform:scale(.7);background:#EBDDB0"></i>'
        h += f'<a href="{href}" class="{"on" if key == active else ""}">{dot}{label}</a>'
    h += f'<div style="margin-top:auto;font-family:{FE};font-weight:800;font-size:6pt;letter-spacing:1.6px;color:#8E8A70">EILAN DOLL<br>THE DIGITAL WORLD</div></nav>'
    return h


def main_box(lang):
    ar = lang == "ar"
    return f'class="main" style="{"left" if ar else "right"}:0;{"right" if ar else "left"}:44mm"'


def ssig(lang):
    return f'<div class="ssig"><img src="{LOGO}">EILAN DOLL | {"الكشتة المجنونة" if lang == "ar" else "CRAZY KASHTA"}</div>'


def screen_cover(lang, sample=False):
    ar = lang == "ar"; ff = fam(ar)
    tag = ("نسخة تجربة مجانية — أول ٣ بطاقات" if ar else "Free sample — first 3 cards") if sample else ("نسخة الشاشة | iPad والكمبيوتر" if ar else "Screen edition | iPad & computer")
    return f'''<section class="sp" id="cover" dir="{"rtl" if ar else "ltr"}" style="background:#0E0E0A;color:#F6F1E3">
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:14mm;padding:0 16mm">
<div>{fire_art("78mm")}</div>
<div style="max-width:130mm;font-family:{ff}"><div style="font-family:{FE};font-weight:800;letter-spacing:4px;font-size:9pt;color:#E0B454">EILAN DOLL</div>
<div style="font-weight:900;font-size:{"42pt" if ar else "38pt"};line-height:1.15;margin:2mm 0">{"الكشتة المجنونة" if ar else "Crazy Kashta"}</div>
<div style="font-size:13pt;color:#C9D8C3">{"لعبة بطاقات للطلعات والكشتات حول النار" if ar else "A card game for desert trips and campfire nights"}</div>
<div style="margin-top:6mm;display:inline-block;border:.6pt solid #E0B454;border-radius:3mm;padding:1.2mm 4mm;font-size:10.5pt">{tag}</div>
<div style="margin-top:5mm;display:flex;gap:2mm">{"".join(swatch(k, "5mm") for k in ("fire", "talk", "riddle", "group", "wild"))}</div>
{'' if sample else f'<a href="#index" style="display:inline-block;margin-top:6mm;background:#E0B454;color:#14150F;font-weight:900;border-radius:3mm;padding:2mm 6mm;font-size:12pt">{"ابدأوا" if ar else "Start"} {arrow(ar)}</a>'}</div></div>
<div style="position:absolute;bottom:8mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:2.4mm;font-family:{FE};font-weight:800;letter-spacing:3px;font-size:8.5pt;color:#A9BFA9"><img src="{LOGO}" style="width:8mm;height:8mm">EILAN DOLL — THE DIGITAL WORLD</div></section>'''


def screen_rules(lang, with_nav=True):
    ar = lang == "ar"; ff = fam(ar)
    kinds = "".join(
        f'<div style="display:flex;gap:3mm;align-items:center;background:{CREAM};border:.5pt solid #D9CFB4;border-radius:3mm;padding:2mm 3mm">'
        f'<div style="background:{CATS[k][3]};border-radius:2.4mm;padding:1.2mm;flex:none;box-shadow:{ {"riddle": "inset 0 0 0 .45mm #E0B454", "wild": "inset 0 0 0 .7mm #4A2682"}.get(k, "none") }">{cube(CATS[k][6], "9mm", ICOLS[CATS[k][6]])}</div>'
        f'<div><b style="font-size:10pt;color:#14150F">{CATS[k][0] if ar else CATS[k][1]}</b><div style="font-size:8.6pt;color:#5E5A44;line-height:1.45">{(HOWTO_RIDDLE_SCREEN if k == "riddle" else HOWTO[k])[0 if ar else 1]}</div></div></div>'
        for k in ("fire", "talk", "riddle", "group", "wild"))
    inner = f'''<div style="width:{(SW-44-24) if with_nav else SW-40}mm;font-family:{ff}">
<div style="font-weight:900;font-size:20pt;color:#14150F;margin-bottom:2mm">{"طريقة اللعب" if ar else "How to play"}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:7mm">
<div><ol style="font-size:10.5pt;line-height:1.85;padding-inline-start:5mm">{"".join(f"<li>{x}</li>" for x in rules_for(lang, True, with_nav))}</ol>
<div style="font-size:9pt;line-height:1.6;margin-top:3mm;color:#5E5A44;border-inline-start:1.2mm solid #E0B454;padding-inline-start:3mm">{SAFETY[lang]}</div></div>
<div style="display:flex;flex-direction:column;gap:2mm">{kinds}</div></div></div>'''
    if with_nav:
        return f'<section class="sp" id="rules" dir="{"rtl" if ar else "ltr"}">{nav(lang, "rules")}<div {main_box(lang)}>{inner}{ssig(lang)}</div></section>'
    return f'<section class="sp" id="rules" dir="{"rtl" if ar else "ltr"}"><div class="main" style="left:0;right:0">{inner}{ssig(lang)}</div></section>'


def screen_index(lang):
    ar = lang == "ar"; D = deck()
    chips = ""
    for i, (k, _) in enumerate(D):
        bg, fg = CATS[k][3], CATS[k][4]
        extra = {"riddle": "box-shadow:inset 0 0 0 .45mm #E0B454;", "wild": "box-shadow:inset 0 0 0 .7mm #4A2682;"}.get(k, "")
        chips += f'<a href="#c{i+1}" style="display:grid;place-items:center;height:12mm;border-radius:2.6mm;background:{bg};color:{fg};font-family:{FE};font-weight:800;font-size:11pt;{extra}">{num(i+1, lang)}</a>'
    legend = "".join(f'<span style="display:flex;align-items:center;gap:1.4mm">{swatch(k)}{CATS[k][0] if ar else CATS[k][1]}</span>' for k in CATS)
    return f'''<section class="sp" id="index" dir="{"rtl" if ar else "ltr"}">{nav(lang, "index")}<div {main_box(lang)}>
<div style="width:{SW-44-24}mm;font-family:{fam(ar)}">
<div style="display:flex;align-items:baseline;gap:4mm;margin-bottom:3mm"><div style="font-weight:900;font-size:20pt;color:#14150F">{"الفهرس" if ar else "Index"}</div>
<div style="font-size:9.5pt;color:#6E6C5A">{"اضغطوا على أي رقم للانتقال للبطاقة" if ar else "Tap any number to jump to that card"}</div></div>
<div style="display:grid;grid-template-columns:repeat(13,1fr);gap:1.8mm">{chips}</div>
<div style="display:flex;flex-wrap:wrap;gap:5mm;margin-top:5mm;font-size:9.5pt;font-weight:700">{legend}</div>
<div style="margin-top:4mm;font-size:9.5pt;color:#6E6C5A"><a href="#rules" style="color:#2F5A3D;border-bottom:.5pt solid #B58A2E">{"طريقة اللعب" if ar else "How to play"}</a> | <a href="#score" style="color:#2F5A3D;border-bottom:.5pt solid #B58A2E">{"لوحة النقاط" if ar else "Scoreboard"}</a></div>
</div>{ssig(lang)}</div></section>'''


def screen_card(n, k, c, lang, total, with_nav=True):
    ar = lang == "ar"
    meta = f'{"بطاقة" if ar else "Card"} {num(n, lang)} {"من" if ar else "of"} {num(total, lang)}'
    links = ""
    if with_nav:
        links = f' | <a href="#index">{"الفهرس" if ar else "Index"}</a>'
    if k == "riddle":
        links += f' | <span>{"الحل في الصفحة الجاية" if ar else "The answer is on the next page"}</span>'
    inner = f'<div class="cardwrap">{card_front(n, k, c, lang, 0, upside_ans=False)}</div><div class="meta"><span>{meta}{links}</span></div>'
    if with_nav:
        h = f'<section class="sp" id="c{n}" dir="{"rtl" if ar else "ltr"}">{nav(lang, k)}<div {main_box(lang)}>{inner}{ssig(lang)}</div></section>'
    else:
        h = f'<section class="sp" id="c{n}" dir="{"rtl" if ar else "ltr"}"><div class="main" style="left:0;right:0">{inner}{ssig(lang)}</div></section>'
    if k == "riddle":
        ans = c[4] if ar else c[5]
        panel = f'''<div style="width:{128*SCALE}mm;height:{88*SCALE}mm;border-radius:6mm;background:#14150F;color:#F6F1E3;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3mm;text-align:center;padding:0 14mm;font-family:{fam(ar)}">
{cube("riddle", "18mm", ICOLS["riddle"])}<div style="font-family:{FE};font-weight:800;letter-spacing:3px;font-size:9pt;color:#E0B454">{"الحل" if ar else "ANSWER"} | #{num(n, lang)}</div>
<div style="font-weight:900;font-size:28pt;line-height:1.3">{ans}</div></div>
<div class="meta"><a href="#c{n}">{"رجوع للغز" if ar else "Back to the riddle"}</a>{f' | <a href="#index">{"الفهرس" if ar else "Index"}</a>' if with_nav else ""}</div>'''
        if with_nav:
            h += f'<section class="sp" dir="{"rtl" if ar else "ltr"}">{nav(lang, k)}<div {main_box(lang)}>{panel}{ssig(lang)}</div></section>'
        else:
            h += f'<section class="sp" dir="{"rtl" if ar else "ltr"}"><div class="main" style="left:0;right:0">{panel}{ssig(lang)}</div></section>'
    return h


def screen_score(lang):
    ar = lang == "ar"
    rows = "".join(f'<tr>{"".join(f"<td></td>" for _ in range(7))}</tr>' for _ in range(8))
    head = "".join(f"<th>{x}</th>" for x in ((["الاسم / الفريق"] + [f"جولة {num(i, lang)}" for i in range(1, 6)] + ["المجموع"]) if ar else (["Name / team"] + [f"Round {i}" for i in range(1, 6)] + ["Total"])))
    return f'''<section class="sp" id="score" dir="{"rtl" if ar else "ltr"}">{nav(lang, "score")}<div {main_box(lang)}>
<div style="width:{SW-44-24}mm;font-family:{fam(ar)}"><div style="font-weight:900;font-size:20pt;color:#14150F;margin-bottom:3mm">{"لوحة النقاط" if ar else "Scoreboard"}</div>
<style>.st{{width:100%;border-collapse:collapse;font-size:9.5pt}}.st th{{background:#2F5A3D;color:#F6F1E3;padding:2mm;font-weight:700}}.st td{{border:.5pt solid #C9BE9C;height:11mm;background:{CREAM}}}.st th:first-child,.st td:first-child{{width:30%}}</style>
<table class="st"><tr>{head}</tr>{rows}</table>
<div style="font-size:9pt;color:#6E6C5A;margin-top:3mm">{"على iPad: تقدرون تكتبون على هذي الصفحة بالقلم في تطبيق الملفات أو أي قارئ PDF." if ar else "On iPad you can write on this page with Markup in the Files app or any PDF reader."}</div>
</div>{ssig(lang)}</div></section>'''


def store_btn(ar):
    """Tappable link to the real store page of the site (sample -> buy)."""
    label = "افتحوا متجر إيلان دول" if ar else "Open the Eilan Doll store"
    shown = STORE_URL.replace("https://", "").rstrip("/")
    return (f'<a href="{STORE_URL}" style="margin-top:4mm;display:inline-flex;align-items:center;gap:2mm;background:#E0B454;color:#14150F;font-weight:900;'
            f'border-radius:3mm;padding:2.4mm 7mm;font-size:13pt">{label} {arrow(ar, "3.6mm")}</a>'
            f'<a href="{STORE_URL}" dir="ltr" style="font-family:{FE};font-weight:700;font-size:9.5pt;color:#C9D8C3;border-bottom:.5pt solid #7FAA8A">{shown}</a>')


def screen_end(lang, sample=False):
    ar = lang == "ar"; ff = fam(ar)
    if sample:
        t1 = "تبي تكمل؟ اشترِ اللعبة" if ar else "Want to keep playing? Get the game"
        t2 = (f"اللعبة الكاملة: ٥٢ بطاقة + نسخة طباعة وجه وقفا + لوحة نقاط — {PRICE['ar']}، من متجر إيلان دول." if ar
              else f"The full game: 52 cards + print-ready double-sided version + scoreboard — {PRICE['en']}, from the Eilan Doll store.")
    else:
        t1 = "كشتة سعيدة!" if ar else "Happy kashta!"
        t2 = "شكرًا إنكم لعبتوا «الكشتة المجنونة» من إيلان دول." if ar else "Thank you for playing Crazy Kashta by Eilan Doll."
    return f'''<section class="sp" id="end" dir="{"rtl" if ar else "ltr"}" style="background:#0E0E0A;color:#F6F1E3">
<div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4mm;text-align:center;font-family:{ff};padding:0 30mm">
{fire_art("44mm")}<div style="font-weight:900;font-size:28pt">{t1}</div><div style="font-size:12.5pt;color:#C9D8C3;line-height:1.7;max-width:170mm">{t2}</div>
{store_btn(ar) if sample else f'<a href="#index" style="margin-top:3mm;color:#E0B454;border-bottom:.5pt solid #E0B454;font-size:11pt">{"رجوع للفهرس" if ar else "Back to the index"}</a>'}</div>
<div style="position:absolute;bottom:8mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:2.4mm;font-family:{FE};font-weight:800;letter-spacing:3px;font-size:8.5pt;color:#A9BFA9"><img src="{LOGO}" style="width:8mm;height:8mm">EILAN DOLL — THE DIGITAL WORLD</div></section>'''


def build_screen(lang):
    D = deck()
    pages = [screen_cover(lang), screen_rules(lang), screen_index(lang)]
    pages += [screen_card(i + 1, k, c, lang, len(D)) for i, (k, c) in enumerate(D)]
    pages += [screen_score(lang), screen_end(lang)]
    to_pdf("".join(pages), SCSS, PAID / f"Eilan-Kashta-Screen-{lang.upper()}.pdf", SW, SH, lang)


def build_sample(lang):
    D = deck()[:3]
    pages = [screen_cover(lang, True), screen_rules(lang, False)]
    pages += [screen_card(i + 1, k, c, lang, 52, False) for i, (k, c) in enumerate(D)]
    pages += [screen_end(lang, True)]
    to_pdf("".join(pages), SCSS, FREE / f"Eilan-Kashta-Sample-{lang.upper()}.pdf", SW, SH, lang)


def build_cover():
    """Store cover 1600×1200 (4:3). Bilingual, three sample card backs fanned beside the cube fire."""
    fan = "".join(f'<div style="position:absolute;{pos};transform:rotate({rot}deg) scale(.62);transform-origin:center;box-shadow:0 3mm 6mm rgba(0,0,0,.45);border-radius:5mm;overflow:hidden">{card_back(k, "ar")}</div>'
                  for k, pos, rot in (("group", "left:0;top:70px", -12), ("riddle", "left:170px;top:30px", -3), ("fire", "left:340px;top:45px", 8)))
    body = f'''<div dir="rtl" style="width:1600px;height:1200px;position:relative;overflow:hidden;background:#0E0E0A;color:#F6F1E3">
<div style="position:absolute;inset:0;background:radial-gradient(circle at 74% 62%,rgba(224,180,84,.20),transparent 46%)"></div>
<div style="position:absolute;right:120px;top:150px;width:720px;text-align:right">
<div style="font-family:{FE};font-weight:800;letter-spacing:8px;font-size:26px;color:#E0B454">EILAN DOLL</div>
<div style="font-weight:900;font-size:120px;line-height:1.1;margin:14px 0">الكشتة المجنونة</div>
<div style="font-family:{FE};font-weight:800;font-size:40px;letter-spacing:3px;color:#C9D8C3">CRAZY KASHTA</div>
<div style="font-size:34px;color:#EBDDB0;margin-top:26px;line-height:1.5">لعبة بطاقات للطلعات والكشتات حول النار</div>
<div style="display:flex;gap:14px;margin-top:36px;flex-wrap:wrap">{"".join(f'<span style="border:2px solid #E0B454;border-radius:16px;padding:6px 22px;font-size:30px">{x}</span>' for x in ["٥٢ بطاقة", "للشاشة والطباعة", "عربي | English"])}</div></div>
<div style="position:absolute;left:150px;top:120px">{fire_art("560px")}</div>
<div style="position:absolute;left:110px;top:730px;width:900px;height:420px">{fan}</div>
<div style="position:absolute;bottom:46px;right:120px;display:flex;align-items:center;gap:14px;font-family:{FE};font-weight:800;letter-spacing:5px;font-size:22px;color:#A9BFA9"><img src="{LOGO}" style="width:52px;height:52px">EILAN DOLL — THE DIGITAL WORLD</div></div>'''
    html = f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{CSS_BASE}body{{background:#0E0E0A}}</style></head><body>{body}</body></html>'
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html); tmp = f.name
    out = FREE / "Eilan-Kashta-Cover.png"
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files",
                    f"--screenshot={out}", "--window-size=1600,1200", "--virtual-time-budget=5000", f"file://{tmp}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    pathlib.Path(tmp).unlink(); print("built", out.relative_to(ROOT))


if __name__ == "__main__":
    only = sys.argv[1:] or ["cover", "sample", "screen", "print"]
    for lang in ("ar", "en"):
        if "screen" in only: build_screen(lang)
        if "print" in only: build_print(lang)
        if "sample" in only: build_sample(lang)
    if "cover" in only: build_cover()
