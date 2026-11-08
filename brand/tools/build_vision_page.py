#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""صفحة شعارات الرؤية"""
import os, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "vision"))
spec = importlib.util.spec_from_file_location("vi", os.path.join(HERE, "build_vision.py"))
vi = importlib.util.module_from_spec(spec); spec.loader.exec_module(vi)
CREAM, SAGE, GOLD, INK, PLATE, SKY = vi.CREAM, vi.SAGE, vi.GOLD, vi.INK, vi.PLATE, vi.SKY

def tile(body, bg, cream_fix=False):
    b = body.replace(CREAM, "#DBC894") if cream_fix else body
    return f'<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="{bg}"/>{b}</svg>'

cards = []
for slug, ar, en, fn, desc, tag in vi.CONCEPTS:
    body = fn()
    cards.append(f'''<article class="card">
  <div class="arts">
    <div class="tile">{tile(body, "#0b0b08")}</div>
    <div class="tile">{tile(body, SKY)}</div>
    <div class="tile">{tile(body, PLATE, True)}</div>
  </div>
  <div class="meta">
    <span class="tag">{tag}</span>
    <small>{en}</small><b>{ar}</b>
    <p>{desc}</p>
    <div class="icons"><img src="v-{slug}-icons.svg" alt=""><span>٢٨ · ٢٠ · ١٥ بكسل</span></div>
  </div>
</article>''')

html = f'''<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>إيلان دول — شعارات رسالة الرؤية</title>
<meta name="robots" content="noindex,nofollow"><style>
:root{{--ink:{INK};--cream:{CREAM};--sage:{SAGE};--gold:{GOLD};--plate:{PLATE};
--sky:{SKY};--line:rgba(235,221,176,.14);--card:#171811}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--ink);color:var(--cream);line-height:1.9;
font-family:"Segoe UI",Tahoma,system-ui,sans-serif;
background-image:linear-gradient(rgba(235,221,176,.045) 1px,transparent 1px),
linear-gradient(90deg,rgba(235,221,176,.045) 1px,transparent 1px);background-size:64px 64px}}
.wrap{{max-width:1200px;margin:0 auto;padding:46px 20px 80px}}
.kick{{font-size:11px;letter-spacing:.34em;color:var(--gold);margin-bottom:12px}}
h1{{font-size:clamp(27px,5.2vw,48px);margin:0 0 12px;line-height:1.3}}
h1 em{{font-style:normal;color:var(--gold)}}
p.lead{{max-width:64ch;font-size:clamp(14.5px,1.9vw,18px);opacity:.92;margin:0 0 20px}}
.note{{background:rgba(224,180,84,.10);border:1px solid rgba(224,180,84,.3);border-radius:16px;
padding:14px 16px;font-size:14px;margin:0 0 28px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:16px}}
.arts{{display:flex;gap:9px;margin-bottom:14px}}
.tile{{flex:1;aspect-ratio:1;border-radius:16px;overflow:hidden;border:1px solid rgba(235,221,176,.08)}}
.tile svg{{width:100%;height:100%;display:block}}
.meta .tag{{display:inline-block;font-size:11.5px;padding:3px 10px;border-radius:999px;
border:1px solid rgba(224,180,84,.4);color:var(--gold);margin-bottom:6px}}
.meta small{{display:block;font-size:10.5px;letter-spacing:.22em;color:var(--gold);opacity:.8}}
.meta b{{display:block;font-size:22px;margin:2px 0 6px}}
.meta p{{margin:0 0 12px;font-size:14px;color:#e7e1cd;opacity:.9}}
.icons{{display:flex;align-items:center;gap:12px;border-top:1px dashed var(--line);padding-top:10px}}
.icons img{{width:150px}}
.icons span{{font-size:11.5px;color:var(--sage);opacity:.85}}
footer{{border-top:1px solid var(--line);margin-top:56px;padding-top:18px;font-size:12.5px;
color:var(--sage);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}}
</style></head><body><div class="wrap">
<div class="kick">EILAN DOLL · VISION MARKS</div>
<h1>مكعبات تحمل <em>رسالة الرؤية</em></h1>
<p class="lead">ستة اتجاهات مبنية على المعاني اللي كتبتيها: الطموح اللي بلا سقف، الحلم اللي يصير
لبنة على الأرض، الأخضر والنماء، التحول الرقمي، جودة الحياة، والمحتوى المحلي. كلها بألوان
إيلان ونفس لغة المكعبات.</p>
<div class="note"><b>ملاحظة مهمة:</b> هذي <b>أفكار أصلية</b> مستوحاة من المعاني — ما تحاكي
شعار «رؤية 2030» الرسمي ولا أي شعار حكومي محمي، لأن الشعارات الرسمية لها استخدامات منظمة. إيلان دول علامة خاصة، وهذي الأشكال تخدم رسالتها.</div>
<div class="grid">{"".join(cards)}</div>
<footer><span>إيلان دول — شعارات رسالة الرؤية · نوفمبر ٢٠٢٦</span>
<span>EILAN DOLL · THE DIGITAL WORLD</span></footer>
</div></body></html>'''
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
print("page ok", len(html)//1024, "KB")
