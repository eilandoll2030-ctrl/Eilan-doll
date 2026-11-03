"""Build the printable / on-screen PDFs for the Eilan Doll games zone.

Run:  python3 games/src/build_pdfs.py      (needs google-chrome for HTML -> PDF)
Output goes to games/pdf/*.pdf
Every page carries the Eilan Doll logo + name (brand rule).
"""
import base64, json, pathlib, re, subprocess, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "games" / "pdf"
OUT.mkdir(parents=True, exist_ok=True)
SRC = (ROOT / "index.html").read_text(encoding="utf-8")
FONTS = ROOT / "coloring" / "fonts"

LOGO_SVG = base64.b64decode(re.search(r'const LOGO="data:image/svg\+xml;base64,([^"]+)"', SRC).group(1)).decode()
LOGO_URI = "data:image/svg+xml;base64," + base64.b64encode(LOGO_SVG.encode()).decode()
CUBE_PAT = json.loads(re.search(r"const CUBE_PAT=(\{.*?\});", SRC).group(1))
GAME_PAT = json.loads(re.search(r"const GZC_PAT=(\{.*?\});", SRC).group(1))
CUBE_PAT.update(GAME_PAT)
RAMP = ["#F6E3A8", "#E8B64A", "#B9CC6A", "#6DC27A", "#1FB36B"]

# guess-game questions straight from the site so PDF and site always match
def _arr(lang):
    blk = re.search(lang + r":\{dir:.*?Q:(\[\[.*?\]\])\}", SRC, re.S).group(1)
    return json.loads(blk)
Q_AR, Q_EN = _arr("ar"), _arr("en")


def cube_svg(key, size=64, bg="#1C1E16", ramp=RAMP, radius=15):
    rows = CUBE_PAT.get(key, CUBE_PAT["spark"]).split("|")
    H, W = len(rows), len(rows[0])
    P = min(7.4, 60 / W, 60 / H); Z = P * .82; OX = (64 - P * W) / 2; OY = (64 - P * H) / 2
    h = [f'<svg viewBox="0 0 64 64" width="{size}" height="{size}" xmlns="http://www.w3.org/2000/svg">']
    if bg:
        h.append(f'<rect width="64" height="64" rx="{radius}" fill="{bg}"/>')
    for y, row in enumerate(rows):
        for x, ch in enumerate(row):
            if ch != "#":
                continue
            ny = y / max(1, H - 1)
            cx, cy = OX + (x + .5) * P, OY + (y + .5) * P
            f = ramp[min(4, int(ny * 5))]
            h.append(f'<rect x="{cx-Z/2:.2f}" y="{cy-Z/2:.2f}" width="{Z:.2f}" height="{Z:.2f}" rx="{Z*.27:.2f}" fill="{f}"/>')
    h.append("</svg>")
    return "".join(h)


CSS = f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
@page{{size:A4;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Cairo,Poppins,"Noto Color Emoji",sans-serif;color:#1F3A2B;background:#F6F1E3}}
.pg{{width:210mm;height:297mm;position:relative;overflow:hidden;page-break-after:always;padding:20mm 16mm 22mm;background:#F6F1E3}}
.pg:last-child{{page-break-after:auto}}
.pg::before{{content:"";position:absolute;inset:7mm;border:1.4px solid #D9CFB4;border-radius:8mm;pointer-events:none}}
.hd{{position:absolute;top:11mm;inset-inline:14mm;display:flex;align-items:center;justify-content:space-between;font-family:Poppins;font-weight:800;font-size:9pt;letter-spacing:2.4px;color:#2F5A3D}}
.hd .b{{display:flex;align-items:center;gap:6px}}.hd img{{width:9mm;height:9mm}}
.hd .ar{{font-family:Cairo;letter-spacing:0;font-size:10pt}}
.ft{{position:absolute;bottom:11mm;inset-inline:14mm;display:flex;justify-content:space-between;font-size:8pt;color:#7C7A66;font-family:Poppins;letter-spacing:1.4px}}
.ft .ar{{font-family:Cairo;letter-spacing:0}}
.cubes{{position:absolute;display:flex;gap:2.4mm}}.cubes i{{width:4.2mm;height:4.2mm;border-radius:1.2mm;display:block}}
h1{{font-weight:900;font-size:40pt;line-height:1.15;color:#1F3A2B}}
h2{{font-weight:900;font-size:22pt;color:#1F3A2B;margin-bottom:5mm}}
.eb{{font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:#B58A2E}}
.mu{{color:#6E6C5A}}
.pill{{display:inline-flex;align-items:center;gap:5px;padding:2mm 4.5mm;border-radius:20mm;font-size:10pt;font-weight:700;background:#fff;border:1.2px solid #D9CFB4;margin:1mm}}
.pill.g{{background:#2F5A3D;color:#F6F1E3;border-color:#2F5A3D}}.pill.o{{background:#E8B64A;color:#1F3A2B;border-color:#E8B64A}}
.cover{{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:6mm;height:100%}}
.box{{background:#fff;border:1.2px solid #E2D9C0;border-radius:6mm;padding:7mm 8mm;margin-bottom:6mm}}
.box ol,.box ul{{padding-inline-start:6mm;line-height:1.9;font-size:12pt}}
.cut{{border:1.4px dashed #B9AE8E}}
"""

def page(inner, title_ar="", title_en="", extra_cls=""):
    return f"""<section class="pg {extra_cls}">
<div class="hd"><span class="b"><img src="{LOGO_URI}"><span>EILAN DOLL</span></span><span class="ar">إيلان دول</span></div>
{inner}
<div class="ft"><span>EILAN DOLL — THE DIGITAL WORLD</span><span class="ar">{title_ar}{' · ' if title_ar and title_en else ''}{title_en}</span></div>
</section>"""

def corner_cubes(pos="top:24mm;left:16mm"):
    return f'<div class="cubes" style="{pos}">' + "".join(f'<i style="background:{c}"></i>' for c in RAMP) + "</div>"

def render(name, pages_html, lang="ar"):
    html = f'<!doctype html><html lang="{lang}" dir="{"rtl" if lang=="ar" else "ltr"}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(pages_html)}</body></html>'
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html); tmp = f.name
    out = OUT / name
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
                    "--allow-file-access-from-files", f"--print-to-pdf={out}", "--virtual-time-budget=4000", f"file://{tmp}"],
                   check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("built", out.relative_to(ROOT))


def badges():
    return ('<div><span class="pill g">🖨️ تنطبع A4 · Printable</span><span class="pill o">📱 تنعرض على الآيباد والجوال</span>'
            '<span class="pill">🌐 وتنلعب داخل موقع إيلان دول</span></div>')

# ---------------------------------------------------------------- خمّن؟ / Guess?
def guess():
    P = []
    P.append(page(f"""{corner_cubes()}<div class="cover">
<div>{cube_svg('g-guess', 230)}</div><div class="eb">EILAN GAMES · لعبة جماعية</div>
<h1>خمّن؟ <bdi dir="ltr" style="font-family:Poppins;font-weight:800;color:#B58A2E">Guess?</bdi></h1>
<p style="font-size:15pt" class="mu">طلّع اسم البلد من الإيموجي والحروف<br><span style="font-family:Poppins;font-size:12pt">Find the country from emojis &amp; letters</span></p>
{badges()}
<p class="mu" style="font-size:11pt">١٠ أسئلة عربي + ١٠ English · الحلول والتحديات في آخر كل قسم</p></div>""", "خمّن؟", "Guess?"))
    P.append(page(f"""<div style="padding-top:12mm">{corner_cubes("top:24mm;right:16mm")}<h2>طريقة اللعب <span class="mu" style="font-family:Poppins;font-size:14pt">· How to play</span></h2>
<div class="box"><b>على الشاشة (آيباد / جوال / تلفزيون)</b><ol><li>افتح الملف واعرضه بالشاشة الكاملة، وكل صفحة = سؤال.</li><li>المقدّم يقلب الصفحة، وأسرع واحد يقول اسم البلد صح ياخذ النقطة.</li><li>صفحة الحلول في آخر القسم — المقدّم يطالعها بروحه 👀</li></ol></div>
<div class="box"><b>مطبوعة (كشتة · رحلة · جَمعة)</b><ol><li>اطبع صفحات الأسئلة على ورق A4 وقصّها أو خلّها كاملة.</li><li>المقدّم يرفع الورقة قدّام الكل، ومعه صفحة الحلول.</li><li>اللي يجاوب صح ينفّذ «تحدي الفوز» المكتوب بجانب الحل 😄</li></ol></div>
<div class="box" dir="ltr" style="text-align:left;font-family:Poppins"><b>English</b><ol><li>Show one page per question on a screen — or print the pages.</li><li>Fastest correct answer wins the point.</li><li>The host keeps the answer page with the fun rewards.</li></ol></div>
<div class="box" style="text-align:center"><b>تبغون نسخة متحركة بمؤقّت وموسيقى ونقاط؟</b><br><span class="mu">العبوها داخل موقع إيلان دول — منطقة الترفيه</span></div></div>""", "طريقة اللعب", "How to play"))

    def qpage(q, i, lang):
        a, b = q[0], q[1]
        tile = lambda t: f'<div style="width:62mm;height:62mm;border-radius:10mm;background:#fff;border:1.6px solid #D9CFB4;display:grid;place-items:center;font-size:{78 if not re.match(r"^[A-Za-z0-9؀-ۿ]+$", t) else (58 if len(t)<3 else 40)}pt;font-weight:900;box-shadow:0 3mm 0 #E8DFC6;font-family:{"Poppins" if lang=="en" else "Cairo"},\'Noto Color Emoji\'">{t}</div>'
        ordn = (f"السؤال {i+1}" if lang == "ar" else f"Question {i+1}")
        qq = "ما هو البلد؟" if lang == "ar" else "Which country?"
        return page(f"""{corner_cubes("top:24mm;" + ("left" if lang=="ar" else "right") + ":16mm")}
<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10mm;text-align:center" dir="{'rtl' if lang=='ar' else 'ltr'}">
<div class="eb" style="font-size:12pt">{ordn} / 10</div><h1 style="font-size:34pt">{qq}</h1>
<div style="display:flex;align-items:center;gap:6mm" dir="{'rtl' if lang=='ar' else 'ltr'}">{tile(a)}<span style="font-size:40pt;font-weight:900;color:#B58A2E">+</span>{tile(b)}</div>
<div style="font-size:44pt;font-weight:900;color:#2F5A3D;letter-spacing:4px">= {'؟؟' if lang=='ar' else '??'}</div></div>""",
                    "خمّن؟" if lang == "ar" else "", "Guess?" if lang == "en" else "")

    def answers(Q, lang):
        rows = "".join(f'<tr><td style="font-weight:900;color:#B58A2E">{i+1}</td><td style="font-size:11pt">{q[0]} + {q[1]}</td><td style="font-weight:900;font-size:13pt">{q[3]}</td><td class="mu" style="font-size:10pt">{q[4]}</td></tr>' for i, q in enumerate(Q))
        t = "الحلول وتحديات الفوز" if lang == "ar" else "Answers & winner rewards"
        return page(f"""<div style="padding-top:12mm" dir="{'rtl' if lang=='ar' else 'ltr'}"><h2>{t}</h2><p class="mu" style="margin-bottom:4mm">{'للمقدّم فقط — اطوِ الصفحة 🤫' if lang=='ar' else 'Host only — fold this page 🤫'}</p>
<table style="width:100%;border-collapse:separate;border-spacing:0 2.4mm;font-family:{'Cairo' if lang=='ar' else 'Poppins'},'Noto Color Emoji'">{rows}</table></div>
<style>td{{background:#fff;padding:3mm 4mm;border-top:1px solid #E2D9C0;border-bottom:1px solid #E2D9C0}}td:first-child{{border-radius:0 4mm 4mm 0}}td:last-child{{border-radius:4mm 0 0 4mm}}[dir=ltr] td:first-child{{border-radius:4mm 0 0 4mm}}[dir=ltr] td:last-child{{border-radius:0 4mm 4mm 0}}</style>""",
                    "الحلول" if lang == "ar" else "", "Answers" if lang == "en" else "")

    P += [qpage(q, i, "ar") for i, q in enumerate(Q_AR)] + [answers(Q_AR, "ar")]
    P += [qpage(q, i, "en") for i, q in enumerate(Q_EN)] + [answers(Q_EN, "en")]
    render("Eilan-Guess-Khammen.pdf", P)

# ---------------------------------------------------------------- ذاكرة إيلان
MEM_KEYS = ["love", "love2", "night", "avatar", "entertainment", "experiences", "home", "bolt",
            "brain", "rocket", "crown", "star", "palm", "crescent", "pyramid", "wave"]

def memory():
    P = []
    P.append(page(f"""{corner_cubes()}<div class="cover" style="height:auto;padding-top:14mm">
<div>{cube_svg('brain', 170)}</div><div class="eb">EILAN GAMES · لعبة ذاكرة</div>
<h1>ذاكرة إيلان <bdi dir="ltr" style="font-family:Poppins;font-weight:800;color:#B58A2E;font-size:26pt">Eilan Memory</bdi></h1>{badges()}</div>
<div class="box" style="margin-top:8mm"><b>طريقة اللعب</b><ol><li>اطبع صفحتي البطاقات (٣٢ بطاقة = ١٦ زوج). لو تبغى ظهر موحّد اطبع صفحتي الظهر على الوجه الثاني.</li>
<li>قصّ على الخط المنقّط، واقلب البطاقات على الطاولة وخلطها.</li><li>كل لاعب يقلب بطاقتين: إذا تطابقت ياخذها ويلعب مرة ثانية، وإذا لا يرجّعها.</li><li>اللي يجمع أزواج أكثر هو الفايز 🏆 — وعلى الجهاز؟ العبها داخل موقع إيلان دول.</li></ol></div>
<p class="mu" style="text-align:center;font-size:10pt">نصيحة: ورق مقوّى (200 جرام) يخلّي البطاقات أقوى للكشتات والرحلات</p>""", "ذاكرة إيلان", "Memory"))

    def sheet(keys, back=False):
        cells = ""
        for k in keys:
            if back:
                inner = f'<img src="{LOGO_URI}" style="width:24mm;height:24mm"><div style="font-family:Poppins;font-weight:800;font-size:6.5pt;letter-spacing:1.6px;color:#E9E2CC">EILAN DOLL</div>'
                bg = "background:linear-gradient(160deg,#24412F,#14150F)"
            else:
                inner = cube_svg(k, 150, bg="#1C1E16", radius=12)
                bg = "background:#fff"
            cells += f'<div class="cut" style="{bg};border-radius:4mm;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1.5mm;padding:2mm">{inner}</div>'
        return f'<div style="display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:57mm;gap:3mm;margin-top:6mm">{cells}</div>'

    # each page: 8 icons twice = 16 cards
    for half in (MEM_KEYS[:8], MEM_KEYS[8:]):
        P.append(page(sheet(half + half), "بطاقات — الوجه", "Card fronts"))
    for _ in range(2):
        P.append(page(sheet(["x"] * 16, back=True), "بطاقات — الظهر", "Card backs"))
    render("Eilan-Memory-Cards.pdf", P)

# ---------------------------------------------------------------- إكس أو
def xo():
    def grid(n=3, s=52):
        c = s / n
        lines = "".join(f'<line x1="{i*c}" y1="2" x2="{i*c}" y2="{s-2}"/><line x1="2" y1="{i*c}" x2="{s-2}" y2="{i*c}"/>' for i in range(1, n))
        return f'<svg viewBox="0 0 {s} {s}" width="100%" height="100%" style="stroke:#2F5A3D;stroke-width:1.6;stroke-linecap:round">{lines}</svg>'
    def board(i, n=3):
        return f'''<div class="box" style="margin:0;padding:4mm;display:flex;flex-direction:column;gap:2mm">
<div style="display:flex;justify-content:space-between;font-size:9.5pt"><b style="color:#B58A2E">جولة {i}</b><span class="mu">الفايز: ............</span></div>
<div style="height:{56 if n==3 else 72}mm;width:{56 if n==3 else 72}mm;margin:0 auto">{grid(n)}</div></div>'''
    P = []
    P.append(page(f"""{corner_cubes()}<div class="cover" style="height:auto;padding-top:14mm">
<div>{cube_svg('g-xo', 170)}</div><div class="eb">EILAN GAMES · لعبة لشخصين</div>
<h1>إكس أو إيلان <bdi dir="ltr" style="font-family:Poppins;font-weight:800;color:#B58A2E;font-size:26pt">Eilan XO</bdi></h1>{badges()}</div>
<div class="box" style="margin-top:8mm"><b>طريقة اللعب</b><ol><li>لاعب يرسم ✕ ولاعب يرسم ◯ بالتناوب.</li><li>أول واحد يكمّل ٣ بخط (أفقي، عمودي، أو مائل) يفوز بالجولة.</li>
<li>جرّبوا «تحدي المكعبات» ٤×٤: لازم ٤ بخط!</li><li>سجّلوا الفايز تحت كل جولة، واللي يجمع أكثر يختار عقاب الخاسر 😄</li></ol></div>
<div class="box" style="display:flex;justify-content:space-around;text-align:center"><div><b>اللاعب ✕</b><br><span class="mu">..................</span></div><div><b>اللاعب ◯</b><br><span class="mu">..................</span></div></div>""", "إكس أو", "XO"))
    P.append(page(f'<div style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:77mm;gap:4mm;margin-top:2mm">{"".join(board(i) for i in range(1,7))}</div>', "إكس أو — جولات ١-٦", "Rounds 1-6"))
    P.append(page(f'<div style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:77mm;gap:4mm;margin-top:2mm">{"".join(board(i) for i in range(7,13))}</div>', "إكس أو — جولات ٧-١٢", "Rounds 7-12"))
    P.append(page(f'<h2 style="margin-top:6mm">تحدي المكعبات ٤×٤ <span class="mu" style="font-size:13pt">— لازم ٤ بخط</span></h2><div style="display:grid;grid-template-columns:1fr 1fr;gap:5mm">{"".join(board(i,4) for i in range(1,5))}</div>', "تحدي المكعبات", "4×4 challenge"))
    render("Eilan-XO.pdf", P)


if __name__ == "__main__":
    guess(); memory(); xo()
