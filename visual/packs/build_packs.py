"""Build the «رسمات إيلان» pack PDFs (A4 landscape, iPad + print) with the Visual Lab renderer.
Needs a local server on :8765 at the repo root.
  python3 visual/packs/build_packs.py [--review DIR]
Output: visual/pdf-out/packs/*.pdf (not committed — sold via Salla) and visual/packs/samples.json (free samples for the site).
"""
import json, pathlib, sys
from playwright.sync_api import sync_playwright
sys.path.insert(0, str(pathlib.Path(__file__).parent))
from packs_data import PACKS

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / 'visual' / 'pdf-out' / 'packs'; OUT.mkdir(parents=True, exist_ok=True)
FONTS = ROOT / 'coloring' / 'fonts'
RAMP = ['#F6E3A8', '#E8B64A', '#4B2A7B', '#6FA37C', '#2F7A52']
CSS = f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
@page{{size:297mm 210mm;margin:0}}*{{box-sizing:border-box;margin:0;padding:0}}html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Cairo,"Noto Color Emoji",sans-serif;color:#1F3A2B}}
.pg{{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:#FBF8F0}}.pg:last-child{{page-break-after:auto}}
.dark{{background:radial-gradient(120% 100% at 50% 120%,#2E5C43 0,#1A2A20 50%,#14150F 100%);color:#EFE9DA}}
.eb{{font-family:Poppins;font-weight:800;letter-spacing:4px;font-size:9pt;color:#E8B64A}}
.cubes{{display:flex;gap:2mm}}.cubes i{{width:4mm;height:4mm;border-radius:1.2mm;display:block}}
.bar{{position:absolute;top:5mm;left:10mm;right:10mm;display:flex;justify-content:space-between;align-items:center;font-size:8.5pt;font-weight:700;color:#8E8A70;z-index:2}}
.bar a{{color:#2F7A52;text-decoration:none;font-weight:900;border:.6pt solid #C9D8C3;border-radius:10mm;padding:.6mm 3.4mm;background:#fff}}
.svgwrap{{position:absolute;left:0;right:0;top:11mm;bottom:0;display:flex;align-items:center;justify-content:center}}.svgwrap svg{{width:100%;height:100%}}
"""
cubes = '<div class="cubes">' + ''.join(f'<i style="background:{c}"></i>' for c in RAMP) + '</div>'


def build(pw, pack, svgs, names, logo, cube):
    n = len(pack['items'])
    P = [f'''<section class="pg dark" dir="rtl"><div style="position:absolute;top:16mm;left:16mm">{cubes}</div>
<div style="position:absolute;inset:0;display:flex;align-items:center;gap:14mm;padding:0 22mm">
<div style="flex:1;display:flex;flex-direction:column;gap:5mm"><div class="eb">رسمات إيلان · EILAN VISUALS</div>
<div style="font-weight:900;font-size:44pt;line-height:1.15">{pack['name']}</div>
<div style="font-size:15pt;color:#C9D8C3;max-width:170mm">{pack['desc']}</div>
<div style="display:flex;gap:2.4mm;flex-wrap:wrap;font-size:10.5pt;font-weight:700">{''.join(f'<span style="padding:1.6mm 4.4mm;border-radius:20mm;border:.6pt solid rgba(232,182,74,.55)">{x}</span>' for x in [f'{n} رسمة جاهزة','للآيباد والكمبيوتر','تنطبع A4 بالعرض','فهرس بروابط'])}</div></div>
<div>{cube}</div></div>
<div style="position:absolute;bottom:12mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:3mm;font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:#A9BFA9"><img src="{logo}" style="width:10mm;height:10mm">EILAN DOLL — THE DIGITAL WORLD</div></section>''']
    rows = ''.join(f'<a href="#v{i}" style="display:flex;align-items:center;gap:3mm;padding:2.4mm 4mm;border-radius:4mm;background:#fff;border:.6pt solid #E2D9C0;text-decoration:none;color:#1F3A2B"><b style="font-family:Poppins;color:#B58A2E;font-size:12pt;width:8mm">{i+1:02d}</b><span style="flex:1"><b style="font-size:12.5pt">{d["title"]}</b><br><span style="font-size:9pt;color:#6E6C5A">{names[k]}</span></span><span style="font-size:9pt;color:#2F7A52;font-weight:900">ص {i+3}</span></a>' for i, (k, d, _) in enumerate(pack['items']))
    P.append(f'''<section class="pg" dir="rtl" id="index"><div class="bar"><span>الفهرس — اضغط على أي رسمة</span><span>{pack['name']}</span></div>
<div style="position:absolute;inset:14mm 14mm 12mm;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:2.4mm">{rows}</div></section>''')
    for i, (k, d, _) in enumerate(pack['items']):
        P.append(f'''<section class="pg" dir="rtl" id="v{i}"><div class="bar"><span><b style="color:#B58A2E;font-family:Poppins">{i+1:02d}</b> · {names[k]} · {pack['name']}</span><a href="#index">الفهرس ←</a></div>
<div class="svgwrap">{svgs[i]}</div></section>''')
    P.append(f'''<section class="pg dark" dir="rtl"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5mm;text-align:center">
<img src="{logo}" style="width:26mm;height:26mm"><div style="font-weight:900;font-size:28pt">تبغى ترسم موضوعك أنت؟</div>
<div style="font-size:13pt;color:#C9D8C3">افتح «مختبر إيلان البصري» في الموقع: نفس الأشكال، وتكتب موضوعك، وتحمّلها صورة أو PDF.</div>
<div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:10pt;color:#A9BFA9;margin-top:6mm">EILAN DOLL — THE DIGITAL WORLD</div></div></section>''')
    html = f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(P)}</body></html>'
    tmp = OUT / '_tmp.html'; tmp.write_text(html, encoding='utf-8')
    b = pw.chromium.launch(); pg = b.new_page(); pg.goto(f'file://{tmp}'); pg.wait_for_timeout(1200)
    out = OUT / f"Eilan-Visuals-{pack['id']}.pdf"
    pg.pdf(path=str(out), width='297mm', height='210mm', print_background=True, prefer_css_page_size=True); b.close(); tmp.unlink()
    print('built', out.name, n, 'designs')


if __name__ == '__main__':
    review = sys.argv[sys.argv.index('--review') + 1] if '--review' in sys.argv else None
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 1700, 'height': 1100})
        pg.goto('http://localhost:8765/'); pg.wait_for_timeout(4300)
        pg.evaluate("go('eilan://visual')"); pg.wait_for_timeout(600); pg.evaluate("vlLoadFont()"); pg.wait_for_timeout(1500)
        pg.evaluate("document.fonts.load('700 30px \"Marhey\"')"); pg.wait_for_timeout(500)
        names = pg.evaluate("Object.fromEntries(VL_ORDER.map(k=>[k,VL_T[k].n]))"); logo = pg.evaluate("LOGO")
        samples = []
        for pack in PACKS:
            svgs = [pg.evaluate("([k,d])=>vlSvg(k,d,'paper',true)", [k, d]) for k, d, _ in pack['items']]
            cube = pg.evaluate(f"`<svg viewBox='0 0 64 64' width='220' height='220'>`+eiSvgCube('{pack['icon']}').replace(/^<svg[^>]*>/,'')")
            if review:
                rd = pathlib.Path(review); rd.mkdir(exist_ok=True)
                for i, (k, d, _) in enumerate(pack['items']):
                    pg.evaluate("s=>{let d=document.getElementById('vlshot');if(!d){d=document.createElement('div');d.id='vlshot';d.style.cssText='position:fixed;inset:0;z-index:99999;background:#000';document.body.appendChild(d)}d.innerHTML=s;d.firstElementChild.style.width='100%';d.firstElementChild.style.height='100%'}", pg.evaluate("([k,d])=>vlSvg(k,d,'paper')", [k, d]))
                    pg.wait_for_timeout(120); pg.locator('#vlshot svg').screenshot(path=str(rd / f"{pack['id']}_{i:02d}.png"))
            samples.append({'id': pack['id'], 'pid': pack['pid'], 'name': pack['name'], 'en': pack['en'], 'icon': pack['icon'], 'desc': pack['desc'],
                            'titles': [[k, d['title']] for k, d, _ in pack['items']],
                            'samples': [[k, d] for k, d, s in pack['items'] if s]})
            build(pw, pack, svgs, names, logo, cube)
        b.close()
    (ROOT / 'visual' / 'packs' / 'samples.json').write_text(json.dumps(samples, ensure_ascii=False), encoding='utf-8')
    print('samples.json written')
