#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""صفحة عرض «المربع يصير دائرة» — brand/circle/index.html"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "circle"))
spec = importlib.util.spec_from_file_location("bc", os.path.join(HERE, "build_circle.py"))
bc = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bc)

CREAM, SAGE, GOLD, INK, PLATE, SKY = bc.CREAM, bc.SAGE, bc.GOLD, bc.INK, bc.PLATE, bc.SKY


def inline(path):
    with open(os.path.join(OUT, path), encoding="utf-8") as f:
        s = f.read()
    return s.replace('width="100" height="100"', 'width="100%" height="100%"', 1)


cards = [
    ("circle-a-dark.svg", "A", "دائرة ممتلئة",
     "نفس القرص الغامق. العنقود محجَّم ليدخل كاملًا — أقرب نسخة للتصميم الأصلي.", "bg-ink"),
    ("circle-a-light.svg", "A", "على خلفية فاتحة",
     "نفس الشعار على كريمي — للطباعة والأوراق الرسمية.", "bg-plate"),
    ("circle-b-dark.svg", "B", "بإطار ذهبي",
     "بلا قرص ممتلئ. حلقة ذهبية رقيقة تحدد الدائرة — أخفّ وأذكى في الأيقونة.", "bg-ink"),
    ("circle-c-dark.svg", "C", "ترتيب دائري",
     "مكعبات موزّعة على المحيط والقلب في المنتصف. احتمال مختلف تمامًا.", "bg-ink"),
]
card_html = []
for fn, tag, name, desc, cls in cards:
    card_html.append(f'''
    <figure class="card">
      <div class="plate {cls}"><div class="mark">{inline(fn)}</div></div>
      <figcaption>
        <b class="tag">{tag}</b>
        <span class="nm">{name}</span>
        <em>{desc}</em>
      </figcaption>
    </figure>''')

rows = []
for label, fn in [("A", "circle-a-dark.svg"), ("B", "circle-b-dark.svg"),
                  ("C", "circle-c-dark.svg")]:
    cells = []
    for size, lab in [(120, "120"), (64, "64"), (40, "40"), (24, "24")]:
        cells.append(f'<div class="sz"><div class="box" style="--s:{size}px">'
                     f'{inline(fn)}</div><span>{lab}</span></div>')
    rows.append(f'<div class="srow"><b class="rowtag">{label}</b>'
                f'<div class="sizes">{"".join(cells)}</div></div>')

plates = []
for fn, lab, cls in [("circle-a-light.svg", "كريمي", "bg-plate"),
                     ("circle-a-sky.svg", "ليلي", "bg-sky"),
                     ("circle-a-bare.svg", "شفاف", "bg-check"),
                     ("circle-mono-cream.svg", "أحادي كريمي", "bg-ink"),
                     ("circle-mono-ink.svg", "أحادي حِبري", "bg-plate")]:
    plates.append(f'<figure class="card"><div class="plate {cls}">'
                  f'<div class="mark">{inline(fn)}</div></div>'
                  f'<figcaption><span class="nm sm">{lab}</span></figcaption></figure>')

html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>إيلان دول — المربع يصير دائرة</title>
<style>
  :root{{--cream:{CREAM};--sage:{SAGE};--gold:{GOLD};--ink:{INK};--plate:{PLATE};--sky:{SKY}}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{background:var(--ink);color:var(--cream);font-family:"Cairo","Segoe UI",system-ui,sans-serif;
       line-height:1.75;padding:30px 18px 70px;-webkit-text-size-adjust:100%}}
  .wrap{{max-width:1060px;margin:0 auto}}
  header{{text-align:center;margin-bottom:32px;padding-bottom:26px;
         border-bottom:1px solid rgba(224,180,84,.35)}}
  h1{{font-size:clamp(27px,5vw,44px);font-weight:900;line-height:1.25}}
  .sub{{color:var(--sage);font-size:clamp(15px,2.4vw,19px);margin-top:10px}}
  .en{{color:var(--gold);font-family:ui-monospace,monospace;letter-spacing:.4em;font-size:12px;
      margin-top:12px;direction:ltr}}
  h2{{font-size:clamp(19px,3.2vw,26px);margin:44px 0 6px;font-weight:900}}
  h2 .n{{color:var(--gold);font-family:ui-monospace,monospace;font-size:14px;
        letter-spacing:.1em;margin-inline-end:9px}}
  .hint{{color:var(--sage);font-size:15px;margin-bottom:16px}}
  .grid{{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(220px,1fr))}}
  .card{{border-radius:18px;overflow:hidden;border:1px solid rgba(127,170,138,.2);
        background:#16180F}}
  .plate{{aspect-ratio:1;display:grid;place-items:center;padding:14px}}
  .mark{{width:100%;height:100%}}
  .mark svg{{width:100%;height:100%;display:block}}
  .bg-ink{{background:var(--ink)}} .bg-plate{{background:var(--plate)}}
  .bg-sky{{background:var(--sky)}}
  .bg-check{{background:repeating-conic-gradient(#20221A 0% 25%,#2A2C22 0% 50%) 50%/16px 16px}}
  figcaption{{padding:14px 16px 16px;display:flex;flex-direction:column;gap:3px}}
  .tag{{color:var(--gold);font-family:ui-monospace,monospace;font-size:13px;letter-spacing:.16em}}
  .nm{{font-size:20px;font-weight:900}}
  .nm.sm{{font-size:16px}}
  figcaption em{{color:var(--sage);font-size:14px;font-style:normal;line-height:1.65}}
  .srow{{display:flex;align-items:center;gap:18px;background:#16180F;border-radius:16px;
        padding:14px 20px;margin-bottom:12px;border:1px solid rgba(127,170,138,.16)}}
  .rowtag{{color:var(--gold);font-family:ui-monospace,monospace;font-size:18px;min-width:20px}}
  .sizes{{display:flex;align-items:flex-end;gap:26px;flex-wrap:wrap}}
  .sz{{display:flex;flex-direction:column;align-items:center;gap:7px}}
  .box{{width:var(--s);height:var(--s)}}
  .box svg{{width:100%;height:100%;display:block}}
  .sz span{{color:var(--sage);font-family:ui-monospace,monospace;font-size:12px}}
  .note{{background:rgba(63,34,112,.20);border:1px solid rgba(90,50,150,.5);border-radius:16px;
        padding:18px 20px;margin-top:38px;font-size:15px;color:#D9D4C4}}
  .note b{{color:var(--gold)}}
  footer{{text-align:center;color:var(--sage);font-size:13px;margin-top:40px;padding-top:20px;
         border-top:1px solid rgba(224,180,84,.25)}}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>المربع يصير دائرة</h1>
    <p class="sub">نفس التصميم · نفس الألوان · نفس المكعبات التسعة</p>
    <p class="en">EILAN DOLL · THE SQUARE, ROUNDED</p>
  </header>

  <h2><span class="n">01</span>ثلاثة حلول</h2>
  <p class="hint">التصميم لم يتغيّر. المشكلة الهندسية فقط: المكعب الذهبي كان في زاوية المربع — خارج أي دائرة.</p>
  <div class="grid">{''.join(card_html)}</div>

  <h2><span class="n">02</span>اختبار الحجم</h2>
  <p class="hint">أهم فحص: هل تبقى مقروءة في ٤٠ و٢٤ بكسل؟</p>
  {''.join(rows)}

  <h2><span class="n">03</span>على الخلفيات</h2>
  <p class="hint">كريمي · ليلي · شفاف · أحادي اللون للختم والطباعة.</p>
  <div class="grid">{''.join(plates)}</div>

  <div class="note">
    <b>ما الذي تغيّر بالضبط؟</b> لا شيء في التصميم — نفس الـ٩ مكعبات، نفس الألوان،
    نفس ترتيب ٣×٣، والمكعب الذهبي مازال مرفوعًا من الخانة العليا اليمنى.
    الشيء الوحيد: <b>حُجّم العنقود ليقع داخل القرص الدائري</b> بدل الزاوية المربعة.
  </div>

  <footer>2026 · EILAN DOLL · BRAND STUDY — CIRCLE<br>«أبغى نفس المربع يكون دائرة بنفس التصميم»</footer>
</div>
</body>
</html>'''

open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
print("brand/circle/index.html written", len(html), "bytes")
