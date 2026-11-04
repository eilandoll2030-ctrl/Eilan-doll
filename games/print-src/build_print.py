"""Printable game PDFs — A4 landscape, double-sided (front / back), 4 cards per sheet, only 2 straight cuts.

  python3 games/print-src/build_print.py
Output: games/pdf/Eilan-Khammen-Print-AR.pdf, games/pdf/Eilan-Guess-Print-EN.pdf
Page order = sheet1 front, sheet1 back, sheet2 front, ...  Print "both sides · flip on short edge".
Back pages mirror the card columns so each back lands behind its own front.
"""
import base64, json, pathlib, re, subprocess, tempfile

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "games" / "pdf"; OUT.mkdir(parents=True, exist_ok=True)
SRC = (ROOT / "index.html").read_text(encoding="utf-8")
FONTS = ROOT / "coloring" / "fonts"
LOGO = re.search(r'const LOGO="(data:image/svg\+xml;base64,[^"]+)"', SRC).group(1)
PAT = json.loads(re.search(r"const CUBE_PAT=(\{.*?\});", SRC).group(1))
PAT.update(json.loads(re.search(r"const GZC_PAT=(\{.*?\});", SRC).group(1)))
RAMP = ["#F6E3A8", "#E8B64A", "#B9CC6A", "#6DC27A", "#1FB36B"]
AR_DIG = str.maketrans("0123456789", "٠١٢٣٤٥٦٧٨٩")


def qs(lang):
    return json.loads(re.search(lang + r":\{dir:.*?Q:(\[\[.*?\]\])\}", SRC, re.S).group(1))


def cube(key, size, bg="#1C1E16"):
    rows = PAT[key].split("|"); H, W = len(rows), len(rows[0])
    P = min(7.4, 60 / W, 60 / H); Z = P * .82; OX = (64 - P * W) / 2; OY = (64 - P * H) / 2
    h = f'<svg viewBox="0 0 64 64" width="{size}" height="{size}">' + (f'<rect width="64" height="64" rx="15" fill="{bg}"/>' if bg else "")
    for y, r in enumerate(rows):
        for x, c in enumerate(r):
            if c == "#":
                cx, cy = OX + (x + .5) * P, OY + (y + .5) * P
                h += f'<rect x="{cx-Z/2:.2f}" y="{cy-Z/2:.2f}" width="{Z:.2f}" height="{Z:.2f}" rx="{Z*.27:.2f}" fill="{RAMP[min(4,int(y/max(1,H-1)*5))]}"/>'
    return h + "</svg>"


CSS = f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
@page{{size:297mm 210mm;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Cairo,Poppins,"Noto Color Emoji",sans-serif;color:#1F3A2B}}
.pg{{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:#FBF8F0}}
.pg:last-child{{page-break-after:auto}}
.lbl{{position:absolute;top:2.6mm;right:9mm;font-size:6.6pt;color:#9C9780;font-weight:700;letter-spacing:.2px}}
.lbl b{{color:#B58A2E}}
.cutv{{position:absolute;left:148.5mm;top:0;bottom:0;border-left:.5pt dashed #C9BE9C}}
.cuth{{position:absolute;top:105mm;left:0;right:0;border-top:.5pt dashed #C9BE9C}}
.sc{{position:absolute;font-size:9pt;color:#B9AE8E}}
.slot{{position:absolute;width:148.5mm;height:105mm;padding:7mm}}
.card{{width:100%;height:100%;border-radius:6mm;position:relative;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}}
.front{{background:linear-gradient(160deg,#F6F1E3,#EAE2CB);border:.8pt solid #D9CFB4}}
.backc{{background:linear-gradient(155deg,#2E6347,#16241B 70%);color:#F3ECDA}}
.no{{position:absolute;top:4mm;right:4.5mm;width:9mm;height:9mm;border-radius:2.6mm;background:#2F5A3D;color:#F6F1E3;display:grid;place-items:center;font-weight:900;font-size:12pt;font-family:Poppins,Cairo}}
.backc .no{{background:#E8B64A;color:#14150F}}
.brand{{position:absolute;bottom:3.6mm;left:0;right:0;display:flex;align-items:center;justify-content:center;gap:1.6mm;font-family:Poppins;font-weight:800;font-size:6.4pt;letter-spacing:1.8px;color:#8E8A70}}
.brand img{{width:4.6mm;height:4.6mm}}
.backc .brand{{color:#A9BFA9}}
.tl{{width:27mm;height:27mm;border-radius:6mm;background:#fff;border:.8pt solid #D9CFB4;box-shadow:0 1.4mm 0 #DCD2B6;display:grid;place-items:center;font-weight:900}}
.cubes{{position:absolute;top:4.4mm;left:4.6mm;display:flex;gap:1.2mm}}.cubes i{{width:2.6mm;height:2.6mm;border-radius:.8mm;display:block}}
"""


def cubes():
    return '<div class="cubes">' + "".join(f'<i style="background:{c}"></i>' for c in RAMP) + "</div>"


def brand(extra):
    return f'<div class="brand"><img src="{LOGO}"><span>EILAN DOLL · {extra}</span></div>'


def sheet(cards, label, back=False, rtl=True):
    """cards: list of 4 html strings in reading order (top-right, top-left, bottom-right, bottom-left for RTL)."""
    # physical positions (left,top) in mm for reading slots 0..3 on the FRONT (RTL: slot0 top-right)
    R = [(148.5, 0), (0, 0), (148.5, 105), (0, 105)]; L = [(0, 0), (148.5, 0), (0, 105), (148.5, 105)]
    pos = (L if rtl else R) if back else (R if rtl else L)  # flip on short edge → columns mirror
    h = '<section class="pg"><div class="cutv"></div><div class="cuth"></div>'
    h += '<span class="sc" style="left:146.4mm;top:-1mm">✂</span><span class="sc" style="left:-0.6mm;top:102.6mm">✂</span>'
    h += f'<div class="lbl">{label}</div>'
    for (x, y), c in zip(pos, cards):
        h += f'<div class="slot" style="left:{x}mm;top:{y}mm">{c}</div>'
    return h + "</section>"


def guess(lang):
    ar = lang == "ar"
    Q = qs(lang); num = (lambda n: str(n).translate(AR_DIG)) if ar else str
    T = dict(
        title="خمّن؟" if ar else "Guess?", q="ما هو البلد؟" if ar else "Which country?", qq="؟؟" if ar else "??",
        sol="الحل" if ar else "Answer", win="تحدي الفوز" if ar else "Winner's reward", game="خمّن؟" if ar else "GUESS?",
        front="الوجه" if ar else "FRONT", back="القفا" if ar else "BACK", sh="ورقة" if ar else "Sheet")
    fam = "Cairo" if ar else "Poppins"

    def tile(t):
        emoji = not re.match(r"^[A-Za-z0-9؀-ۿ]+$", t)
        fs = 40 if emoji else (34 if len(t) < 3 else (24 if len(t) < 5 else 19))
        return f'<div class="tl" style="font-size:{fs}pt;font-family:{fam},\'Noto Color Emoji\'">{t}</div>'

    def front(i, q):
        return f'''<div class="card front" dir="{'rtl' if ar else 'ltr'}">{cubes()}<div class="no">{num(i+1)}</div>
<div style="font-weight:900;font-size:15pt;margin-bottom:4mm;font-family:{fam}">{T['q']}</div>
<div style="display:flex;align-items:center;gap:4mm">{tile(q[0])}<span style="font-size:22pt;font-weight:900;color:#B58A2E">+</span>{tile(q[1])}</div>
<div style="font-size:22pt;font-weight:900;color:#2F5A3D;margin-top:3mm;font-family:{fam}">= {T['qq']}</div>{brand(T['game'])}</div>'''

    def backc(i, q):
        eq = q[2] or f"{q[0]} + {q[1]}"
        return f'''<div class="card backc" dir="{'rtl' if ar else 'ltr'}"><div class="no">{num(i+1)}</div>
<div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:7.5pt;color:#E8B64A">{T['sol'].upper() if not ar else T['sol']}</div>
<div style="font-weight:900;font-size:30pt;line-height:1.2;font-family:{fam}">{q[3]}</div>
<div style="font-size:10.5pt;color:#C9D8C3;margin-bottom:3.4mm;font-family:{fam},'Noto Color Emoji'">{eq}</div>
<div style="background:rgba(243,236,218,.1);border:.6pt solid rgba(232,182,74,.45);border-radius:4mm;padding:2.6mm 5mm;max-width:105mm;font-size:9.6pt;line-height:1.55;font-family:{fam},'Noto Color Emoji'"><b style="color:#E8B64A">{T['win']}: </b>{q[4]}</div>{brand(T['game'])}</div>'''

    rules_front = f'''<div class="card front" dir="{'rtl' if ar else 'ltr'}">{cubes()}<div style="font-weight:900;font-size:15pt;font-family:{fam}">{'طريقة اللعب' if ar else 'How to play'}</div>
<ol style="text-align:{'right' if ar else 'left'};font-size:9.4pt;line-height:1.75;padding-inline-start:5mm;margin-top:2mm;max-width:115mm;font-family:{fam}">
{''.join(f'<li>{x}</li>' for x in (['المقدّم يمسك البطاقة: الوجه للاعبين، والقفا (الحل) له.','أسرع واحد يقول اسم البلد صح ياخذ البطاقة.','اللي جاوب صح ينفّذ «تحدي الفوز».','اللي يجمع بطاقات أكثر هو الفايز 🏆'] if ar else ['The host holds the card: front to the players, back (answer) to the host.','Fastest correct answer wins the card.','The winner does the fun reward.','Most cards wins 🏆']))}</ol>{brand(T['game'])}</div>'''
    score_front = f'''<div class="card front" dir="{'rtl' if ar else 'ltr'}">{cubes()}<div style="font-weight:900;font-size:15pt;margin-bottom:2mm;font-family:{fam}">{'لوحة النقاط' if ar else 'Scoreboard'}</div>
<div style="display:grid;grid-template-columns:1fr 1fr;gap:2.4mm 6mm;width:110mm">{''.join(f'<div style="border-bottom:.6pt solid #C9BE9C;height:8.4mm;display:flex;align-items:flex-end;justify-content:space-between;font-size:8pt;color:#9C9780;font-family:{fam}"><span>{"الاسم" if ar else "Name"}</span><span>{"النقاط" if ar else "Pts"}</span></div>' for _ in range(8))}</div>{brand(T['game'])}</div>'''
    plain_back = f'''<div class="card backc"><img src="{LOGO}" style="width:30mm;height:30mm"><div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:10pt;margin-top:2mm">EILAN DOLL</div>
<div style="font-size:9.5pt;color:#C9D8C3;margin-top:1mm;font-family:Cairo">{'العبها أونلاين بمؤقّت وموسيقى — منطقة الترفيه في إيلان دول' if ar else 'Play it online with a timer & music — Eilan Doll fun zone'}</div></div>'''

    fronts = [front(i, q) for i, q in enumerate(Q)] + [rules_front, score_front]
    backs = [backc(i, q) for i, q in enumerate(Q)] + [plain_back, plain_back]
    total = 1 + (len(fronts) + 3) // 4
    lab = lambda n, side: f"<b>{T['sh']} {num(n)}/{num(total)}</b> · {side}"

    # sheet 1: cover (front) + rules & print guide (back) — no cutting
    d = 'rtl' if ar else 'ltr'
    cover = f'''<section class="pg" dir="{d}" style="background:radial-gradient(120% 90% at 50% 120%,#2E6347 0,#16241B 55%,#14150F 100%);color:#F3ECDA">
<div class="lbl" style="color:#8FA28E">{lab(1, T['front'])}</div>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16mm;padding:0 20mm">
<div>{cube('g-guess', 300)}</div>
<div style="max-width:140mm"><div style="font-family:Poppins;font-weight:800;letter-spacing:4px;font-size:10pt;color:#E8B64A">EILAN GAMES · {'لعبة جَمعات' if ar else 'PARTY GAME'}</div>
<div style="font-weight:900;font-size:58pt;line-height:1.1;font-family:{fam}">{T['title']}</div>
<div style="font-size:15pt;color:#C9D8C3;margin:2mm 0 6mm;font-family:{fam}">{'طلّع اسم البلد من الإيموجي والحروف' if ar else 'Find the country from emojis & letters'}</div>
<div style="display:flex;gap:2.4mm;flex-wrap:wrap;font-size:10pt;font-weight:700;font-family:{fam}">
{''.join(f'<span style="padding:1.6mm 4mm;border-radius:20mm;border:.6pt solid rgba(232,182,74,.5)">{x}</span>' for x in (['١٠ بطاقات','بطاقة القوانين','لوحة النقاط','🖨️ اطبع الوجهين'] if ar else ['10 cards','Rules card','Scoreboard','🖨️ Print both sides']))}</div></div></div>
<div style="position:absolute;bottom:9mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:2.4mm;font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:#A9BFA9"><img src="{LOGO}" style="width:9mm;height:9mm">EILAN DOLL — THE DIGITAL WORLD</div></section>'''
    guide = f'''<section class="pg" dir="{d}"><div class="lbl">{lab(1, T['back'])}</div>
<div style="position:absolute;inset:14mm 18mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm;font-family:{fam}">
<div><div style="font-weight:900;font-size:20pt;margin-bottom:4mm">{'🖨️ طريقة الطباعة' if ar else '🖨️ How to print'}</div>
<ol style="font-size:11pt;line-height:1.95;padding-inline-start:6mm">{''.join(f'<li>{x}</li>' for x in (['ورق A4 — والأفضل ورق مقوّى (٢٠٠ جرام).','اختر: <b>الطباعة على الوجهين</b> · <b>القلب من الحافة القصيرة</b> (Flip on short edge).','الحجم الفعلي ١٠٠٪ — بدون «ملاءمة للصفحة».','في المكتبة؟ أعطهم الملف وقل: «وجهين، قلب من الحافة القصيرة».'] if ar else ['A4 paper — thick card (200gsm) is best.','Choose <b>Print on both sides</b> · <b>Flip on short edge</b>.','Actual size 100% — no "fit to page".','At a print shop: "double-sided, flip on short edge".']))}</ol></div>
<div><div style="font-weight:900;font-size:20pt;margin-bottom:4mm">{'✂️ القص — قصّتين بس' if ar else '✂️ Cutting — just 2 cuts'}</div>
<ol style="font-size:11pt;line-height:1.95;padding-inline-start:6mm">{''.join(f'<li>{x}</li>' for x in (['كل ورقة فيها ٤ بطاقات.','قص على الخط المنقّط بالطول، وبعدين بالعرض.','كل بطاقة رقمها مكتوب على الوجه والقفا — تأكد إنها متطابقة.','الورقة الأولى (هذي) ما تنقص — هي الغلاف.'] if ar else ['Each sheet has 4 cards.','Cut the dashed line down the middle, then across.','Each card has its number on both sides — check they match.','This first sheet is the cover — no cutting.']))}</ol>
<div style="margin-top:6mm;display:flex;gap:4mm;align-items:center">{''.join(f'<div style="width:30mm;height:21mm;border-radius:2.4mm;border:.8pt dashed #B9AE8E;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;overflow:hidden">' + ''.join(f'<i style="border:.4pt dashed #C9BE9C;background:{bg}"></i>' for bg in ['#F1EAD6']*4) + '</div>' for _ in range(1))}
<span style="font-size:10pt;color:#6E6C5A">{'١ ورقة = ٤ بطاقات · خط بالطول + خط بالعرض' if ar else '1 sheet = 4 cards · one cut each way'}</span></div></div></div>
<div style="position:absolute;bottom:9mm;left:0;right:0;text-align:center;font-size:10pt;color:#6E6C5A;font-family:{fam}">{'تبغونها على الشاشة؟ العبوها داخل موقع إيلان دول — منطقة الترفيه' if ar else 'Prefer a screen? Play it inside Eilan Doll — fun zone'}</div></section>'''
    pages = [cover, guide]
    for s in range(0, len(fronts), 4):
        n = 2 + s // 4
        pages.append(sheet(fronts[s:s + 4], lab(n, T['front']), rtl=ar))
        pages.append(sheet(backs[s:s + 4], lab(n, T['back']), back=True, rtl=ar))
    return pages


def render(name, pages, lang):
    html = f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(pages)}</body></html>'
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html); tmp = f.name
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                    f"--print-to-pdf={OUT / name}", "--virtual-time-budget=4000", f"file://{tmp}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("built", name)


if __name__ == "__main__":
    render("Eilan-Khammen-Print-AR.pdf", guess("ar"), "ar")
    render("Eilan-Guess-Print-EN.pdf", guess("en"), "en")
