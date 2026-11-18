"""Screen versions of the printable games: a 16:9 slideshow PDF + a PowerPoint deck.

  python3 games/print-src/build_show.py
Output (games/pdf/):
  Eilan-Khammen-Show-AR.pdf / Eilan-Guess-Show-EN.pdf   — open on any screen and swipe like a presentation
  Eilan-Khammen-Show-AR.pptx / Eilan-Guess-Show-EN.pptx — open in PowerPoint / Keynote / Google Slides
Each card = a question slide, then its answer slide. Same colours as the print PDFs (build_print.py).
"""
import json, pathlib, re, subprocess, sys, tempfile

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import build_print as bp  # noqa: E402

OUT = bp.OUT
W, H = 1920, 1080
CSS = bp.CSS.replace("@page{{size:297mm 210mm;margin:0}}".replace("{{", "{").replace("}}", "}"), "") + f"""
@page{{size:{W}px {H}px;margin:0}}
.sl{{width:{W}px;height:{H}px;position:relative;overflow:hidden;page-break-after:always;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}}
.sl:last-child{{page-break-after:auto}}
.sl .no{{top:48px;right:56px;width:96px;height:96px;border-radius:28px;font-size:44px}}
.sl .tl{{width:290px;height:290px;border-radius:64px;border-width:3px;box-shadow:0 18px 0 var(--ac)}}
.sl .brand{{bottom:40px;font-size:20px;letter-spacing:5px;gap:14px}}
.sl .brand img{{width:46px;height:46px}}
.dots{{position:absolute;inset:0;background:radial-gradient(circle,rgba(255,255,255,.6) 9px,transparent 10px) 0 0/90px 90px;opacity:.45;-webkit-mask:linear-gradient(135deg,#000,transparent 55%)}}
.stars{{position:absolute;inset:0;background:radial-gradient(2px 2px at 20% 30%,#fff 98%,transparent) 0 0/160px 160px,radial-gradient(2px 2px at 70% 60%,#fff 98%,transparent) 0 0/230px 230px;opacity:.5}}
"""


def guess_slides(lang):
    ar = lang == "ar"
    Q = bp.qs(lang); d = "rtl" if ar else "ltr"; fam = "Cairo" if ar else "Poppins"
    num = (lambda n: str(n).translate(bp.AR_DIG)) if ar else str
    brand = lambda: f'<div class="brand"><img src="{bp.LOGO}"><span>EILAN DOLL · {"خمّن؟" if ar else "GUESS?"}</span></div>'

    def tile(t):
        emoji = not re.match(r"^[A-Za-z0-9؀-ۿ]+$", t)
        fs = 150 if emoji else (128 if len(t) < 3 else (90 if len(t) < 5 else 70))
        return f'<div class="tl" style="font-size:{fs}px;font-family:{fam},\'Noto Color Emoji\'">{t}</div>'

    S = []
    # cover
    S.append(f'''<section class="sl" dir="{d}" style="background:radial-gradient(60% 70% at 85% 10%,rgba(255,143,177,.35),transparent 60%),radial-gradient(60% 70% at 10% 100%,rgba(61,220,151,.3),transparent 60%),radial-gradient(70% 80% at 50% 50%,#1E44C8 0,#251147 60%,#07080C 100%);color:#FFF8EA;flex-direction:row;gap:120px">
<div style="transform:rotate(-6deg);filter:drop-shadow(0 40px 50px rgba(0,0,0,.45))">{bp.cube('g-guess', 520, '#FFF8EA')}</div>
<div style="text-align:{'right' if ar else 'left'}"><div style="font-family:Poppins;font-weight:800;letter-spacing:8px;font-size:26px;color:#FFD97A">EILAN GAMES</div>
<div style="font-weight:900;font-size:190px;line-height:1.1;font-family:{fam}">{'خمّن؟' if ar else 'Guess?'}</div>
<div style="font-size:44px;opacity:.85;font-family:{fam}">{'طلّع اسم البلد من الإيموجي والحروف' if ar else 'Find the country from emojis & letters'}</div></div>{brand()}</section>''')
    # how to play
    steps = (['اعرضوا الملف على الشاشة','أسرع واحد يقول اسم البلد صح ياخذ النقطة','الشريحة اللي بعدها فيها الحل وتحدي الفوز 🏆'] if ar
             else ['Show this file on a screen', 'Fastest correct answer wins the point', 'The next slide has the answer & a winner’s reward 🏆'])
    cols = bp.FUN[:3]
    S.append(f'''<section class="sl" dir="{d}" style="background:#FFFFFF;color:#0B1F5E"><div style="font-weight:900;font-size:96px;font-family:{fam};margin-bottom:60px">{'طريقة اللعب' if ar else 'How to play'}</div>
<div style="display:flex;gap:48px">{''.join(f'<div style="width:470px;height:330px;border-radius:48px;background:linear-gradient(160deg,{c[0]},{c[1]});border:3px solid {c[2]};color:{c[3]};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;gap:22px;font-family:{fam}"><div style="width:96px;height:96px;border-radius:28px;background:{c[2]};color:#fff;display:grid;place-items:center;font-size:52px;font-weight:900">{num(k+1)}</div><div style="font-size:40px;font-weight:900;line-height:1.4">{s}</div></div>' for k, (s, c) in enumerate(zip(steps, cols)))}</div>{brand()}</section>''')
    for i, q in enumerate(Q):
        b1, b2, ac, ink = bp.FUN[i % len(bp.FUN)]
        n1, n2 = bp.NIGHT[i % len(bp.NIGHT)]
        S.append(f'''<section class="sl front" dir="{d}" style="--b1:{b1};--b2:{b2};--ac:{ac};--ink:{ink};color:{ink};background:linear-gradient(160deg,{b1},{b2});border:0"><div class="dots"></div><div class="no">{num(i+1)}</div>
<div style="font-weight:900;font-size:84px;margin-bottom:56px;font-family:{fam}">{'ما هو البلد؟' if ar else 'Which country?'}</div>
<div style="display:flex;align-items:center;gap:56px"><div style="--rt:-4deg">{tile(q[0])}</div><span style="font-size:130px;font-weight:900;color:{ac}">+</span><div style="--rt:4deg">{tile(q[1])}</div></div>
<div style="font-size:120px;font-weight:900;color:{ac};margin-top:30px;font-family:{fam}">= {'؟؟' if ar else '??'}</div>{brand()}</section>''')
        eq = q[2] or f"{q[0]} + {q[1]}"
        S.append(f'''<section class="sl backc" dir="{d}" style="--n1:{n1};--n2:{n2}"><div class="stars"></div><div class="no">{num(i+1)}</div>
<div style="font-family:Poppins;font-weight:800;letter-spacing:10px;font-size:34px;color:#FFD97A">{'الحل' if ar else 'ANSWER'}</div>
<div style="font-weight:900;font-size:220px;line-height:1.15;font-family:{fam}">{q[3]}</div>
<div style="font-size:52px;opacity:.75;margin-bottom:46px;font-family:{fam},'Noto Color Emoji'">{eq}</div>
<div style="background:rgba(255,248,234,.1);border:2px solid rgba(255,217,122,.6);border-radius:36px;padding:26px 52px;max-width:1300px;font-size:44px;line-height:1.5;font-family:{fam},'Noto Color Emoji'"><b style="color:#FFD97A">{'تحدي الفوز' if ar else 'Winner’s reward'}: </b>{q[4]}</div>{brand()}</section>''')
    S.append(f'''<section class="sl" dir="{d}" style="background:radial-gradient(70% 80% at 50% 40%,#4A2A8F,#0B1F5E 60%,#07080C);color:#FFF8EA">
<div style="font-size:170px">🏆</div><div style="font-weight:900;font-size:120px;font-family:{fam}">{'مين الفايز؟' if ar else 'Who won?'}</div>
<div style="font-size:44px;opacity:.85;margin-top:20px;font-family:{fam}">{'العبوها أونلاين بمؤقّت وموسيقى — منطقة الترفيه في إيلان دول' if ar else 'Play online with a timer & music — Eilan Doll fun zone'}</div>{brand()}</section>''')
    return S


def html(slides, lang):
    return f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(slides)}</body></html>'


def build(stem, slides, lang):
    with tempfile.TemporaryDirectory() as td:
        td = pathlib.Path(td)
        page = td / "show.html"; page.write_text(html(slides, lang), encoding="utf-8")
        pdf = OUT / f"{stem}.pdf"
        subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                        f"--print-to-pdf={pdf}", "--virtual-time-budget=4000", f"file://{page}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        print("built", pdf.name)
        # PowerPoint: one full-slide picture per page (keeps Arabic fonts & emoji exactly as designed)
        subprocess.run(["pdftoppm", "-png", "-r", "96", "-scale-to-x", str(W), "-scale-to-y", str(H), str(pdf), str(td / "s")], check=True)
        pngs = sorted(td.glob("s-*.png"))
        js = td / "mk.js"
        js.write_text("""const P=require('pptxgenjs');const fs=require('fs');const p=new P();p.layout='LAYOUT_16x9';
p.title=%s;p.author='EILAN DOLL';const files=%s;
for(const f of files){const s=p.addSlide();s.addImage({data:'image/png;base64,'+fs.readFileSync(f).toString('base64'),x:0,y:0,w:10,h:5.625,altText:%s});}
p.writeFile({fileName:%s}).then(()=>console.log('built',%s));""" % (json.dumps(stem), json.dumps([str(x) for x in pngs]), json.dumps(stem),
                                                                     json.dumps(str(OUT / f'{stem}.pptx')), json.dumps(f'{stem}.pptx')), encoding="utf-8")
        subprocess.run(["node", str(js)], check=True)


if __name__ == "__main__":
    build("Eilan-Khammen-Show-AR", guess_slides("ar"), "ar")
    build("Eilan-Guess-Show-EN", guess_slides("en"), "en")
