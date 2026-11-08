#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""صفحة عرض «كوكب يتركّب» — brand/globe/index.html"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "globe"))
spec = importlib.util.spec_from_file_location("gb", os.path.join(HERE, "build_globe.py"))
gb = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gb)

CREAM, SAGE, GOLD, INK, SKY = gb.CREAM, gb.SAGE, gb.GOLD, gb.INK, gb.SKY

SHORT = {"00-empty": "فضاء", "01-seed": "الفكرة", "02-second": "أول الطبقات",
         "03-third": "يتّسع", "04-two-thirds": "الطبقة الأخيرة", "05-done": "كوكبٌ كامل"}
NOTE = {"00-empty": "لا شيء بعد", "01-seed": "مكعبٌ واحد — العقل",
        "02-second": "لبناتٌ حوله", "03-third": "الكرة تتشكّل",
        "04-two-thirds": "الحدّ يقترب", "05-done": "يطلع الذهبي"}


def inline(path):
    """يدمج SVG في الصفحة (لا <img>) حتى ترى الأنيميشن."""
    with open(os.path.join(OUT, path), encoding="utf-8") as f:
        s = f.read()
    s = s.replace('width="100" height="100"', 'width="100%" height="100%"', 1)
    return s


steps = []
for slug, rv in gb.SNAPS:
    steps.append(f'''
    <figure class="step">
      <div class="sticker">{inline(f"g-{slug}.svg")}</div>
      <figcaption>
        <b class="pct">{int(rv*100):02d}%</b>
        <span class="nm">{SHORT[slug]}</span>
        <em>{NOTE[slug]}</em>
      </figcaption>
    </figure>''')

sizes = []
for size, label in [(120, "120"), (96, "96"), (64, "64"), (40, "40"), (28, "28")]:
    sizes.append(f'<div class="sz"><div class="szbox" style="--s:{size}px">'
                 f'{inline("planet-icon.svg")}</div><span>{label}px</span></div>')

plates = []
for name, lab, cls in [("planet-dark", "غامق", "d"), ("planet-light", "فاتح", "l"),
                       ("planet-sky", "ليلي", "s"), ("planet-bare", "شفاف", "b"),
                       ("planet-mono-cream", "أحادي كريمي", "m"),
                       ("planet-mono-ink", "أحادي حِبري", "m2")]:
    plates.append(f'<figure class="plate {cls}"><div class="pv">{inline(name + ".svg")}</div>'
                  f'<figcaption>{lab}</figcaption></figure>')

html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>إيلان دول — كوكب المكعبات يتركّب</title>
<style>
  :root{{--cream:{CREAM};--sage:{SAGE};--gold:{GOLD};--ink:{INK};--sky:{SKY};--p:3F2270}}
  *{{box-sizing:border-box;margin:0;padding:0}}
  body{{background:var(--ink);color:var(--cream);font-family:"Cairo","Segoe UI",system-ui,sans-serif;
       line-height:1.7;padding:30px 20px 70px;-webkit-text-size-adjust:100%}}
  .wrap{{max-width:1080px;margin:0 auto}}
  header{{text-align:center;margin-bottom:34px;padding-bottom:26px;border-bottom:1px solid rgba(224,180,84,.35)}}
  h1{{font-size:clamp(28px,5vw,46px);font-weight:900;line-height:1.25}}
  .sub{{color:var(--sage);font-size:clamp(15px,2.4vw,19px);margin-top:10px}}
  .en{{color:var(--gold);font-family:ui-monospace,monospace;letter-spacing:.42em;
      font-size:12px;margin-top:12px;direction:ltr}}
  h2{{font-size:clamp(20px,3.4vw,27px);margin:44px 0 6px;font-weight:900}}
  h2 .n{{color:var(--gold);font-family:ui-monospace,monospace;font-size:15px;
        letter-spacing:.1em;margin-inline-end:10px}}
  .hint{{color:var(--sage);font-size:15px;margin-bottom:18px}}
  .grid{{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(210px,1fr))}}
  .step{{background:#16180F;border:1px solid rgba(127,170,138,.18);border-radius:18px;
        padding:14px;text-align:center}}
  .sticker{{width:100%;aspect-ratio:1;margin-bottom:6px}}
  .sticker svg{{width:100%;height:100%;display:block}}
  figcaption{{display:flex;flex-direction:column;gap:2px;align-items:center}}
  .pct{{color:var(--gold);font-family:ui-monospace,monospace;font-size:14px}}
  .nm{{font-size:19px;font-weight:900}}
  figcaption em{{color:var(--sage);font-size:14px;font-style:normal}}
  .anim{{background:#16180F;border:1px solid rgba(224,180,84,.28);border-radius:20px;
        padding:12px;max-width:420px;margin:0 auto}}
  .anim svg{{width:100%;height:auto;display:block;border-radius:12px}}
  .replay{{display:block;margin:14px auto 0;background:var(--gold);color:#1A1607;
          border:0;border-radius:10px;padding:10px 22px;font-size:16px;font-weight:700;
          cursor:pointer;font-family:inherit}}
  .sizes{{display:flex;flex-wrap:wrap;gap:24px;align-items:flex-end;justify-content:center;
         background:#16180F;border:1px solid rgba(127,170,138,.18);border-radius:18px;padding:22px}}
  .sz{{display:flex;flex-direction:column;align-items:center;gap:8px}}
  .szbox{{width:var(--s);height:var(--s)}}
  .szbox svg{{width:100%;height:100%;display:block}}
  .sz span{{color:var(--gold);font-family:ui-monospace,monospace;font-size:13px}}
  .plates{{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}}
  .plate{{border-radius:18px;overflow:hidden;border:1px solid rgba(127,170,138,.18)}}
  .pv{{aspect-ratio:1;display:grid;place-items:center;padding:10px}}
  .pv svg{{width:100%;height:100%;display:block}}
  .plate figcaption{{padding:9px;font-size:14px;background:#16180F}}
  .d .pv{{background:var(--ink)}} .l .pv{{background:#EFE8D4}}
  .s .pv{{background:var(--sky)}} .b .pv{{background:
      repeating-conic-gradient(#20221A 0% 25%,#2A2C22 0% 50%) 50%/16px 16px}}
  .m .pv{{background:var(--ink)}} .m2 .pv{{background:#EFE8D4}}
  .note{{background:rgba(63,34,112,.20);border:1px solid rgba(90,50,150,.5);
        border-radius:16px;padding:18px 20px;margin-top:40px;font-size:15px;color:#D9D4C4}}
  .note b{{color:var(--gold)}}
  footer{{text-align:center;color:var(--sage);font-size:13px;margin-top:44px;
         padding-top:22px;border-top:1px solid rgba(224,180,84,.25)}}
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>كوكب المكعبات — يتركّب</h1>
    <p class="sub">لا كوكبٌ جاهز… كوكبٌ يُبنى أمامك، لبنةً فوق لبنة</p>
    <p class="en">EILAN DOLL · THE PLANET ASSEMBLING</p>
  </header>

  <h2><span class="n">01</span>التركيب</h2>
  <p class="hint">ستّ لقطات: من مكعبٍ واحد إلى كوكبٍ كامل. القلب البنفسجي أول ما يظهر — الفكرة تسبق البناء.</p>
  <div class="grid">{''.join(steps)}</div>

  <h2><span class="n">02</span>متحرّك</h2>
  <p class="hint">نفس التركيب حيًّا — ملف SVG واحد بلا JavaScript، يعمل على iPad وفي أي متصفح.</p>
  <div class="anim" id="anim">{inline("planet-anim.svg")}</div>
  <button class="replay" id="replay">أعد التركيب</button>

  <h2><span class="n">03</span>هل يُقرأ صغيرًا؟</h2>
  <p class="hint">نفس الشعار بمقاسات الأيقونة والتطبيق. الأصغر بلا مكعبات طالعة ليبقى نظيفًا.</p>
  <div class="sizes">{''.join(sizes)}</div>

  <h2><span class="n">04</span>على الخلفيات</h2>
  <p class="hint">غامق · فاتح · ليلي · شفاف · أحادي اللون للختم والطباعة.</p>
  <div class="plates">{''.join(plates)}</div>

  <div class="note">
    <b>ملاحظة صراحة:</b> هذه ليست بديلًا عن الشعار المعتمد — بل <b>نفس هندسته</b>
    (كرة مكعبات مستديرة، قلب بنفسجي للعقل، مكعب ذهبي يطلع) لكن <b>بلا كتاب</b>،
    لأن الكتاب يثقل الكوكب في مقاسات الأيقونة وفي إعلان الافتتاح.
    الكتاب يبقى للشعار الكامل في الأوراق الرسمية، والكرة وحدها للأيقونة والإعلان.
  </div>

  <footer>2026 · EILAN DOLL · BRAND STUDY — PLANET<br>مصدر الفكرة: «كوكب قاعد ينبني على شكل مكعبات»</footer>
</div>
<script>
document.getElementById('replay').addEventListener('click', function(){{
  var box = document.getElementById('anim');
  var svg = box.querySelector('svg');
  var copy = svg.cloneNode(true);
  box.replaceChild(copy, svg);
}});
</script>
</body>
</html>'''

open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
print("brand/globe/index.html written", len(html), "bytes")
