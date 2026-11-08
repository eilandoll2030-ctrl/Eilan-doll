#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""صفحة عرض أفكار الجولة الثانية"""
import os, importlib.util
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.normpath(os.path.join(HERE, "..", "ideas2"))
spec = importlib.util.spec_from_file_location("i2", os.path.join(HERE, "build_ideas2.py"))
i2 = importlib.util.module_from_spec(spec); spec.loader.exec_module(i2)

CREAM, SAGE, GOLD, INK, PLATE, GREEN, PURPLE = (i2.CREAM, i2.SAGE, i2.GOLD, i2.INK,
                                                i2.PLATE, i2.GREEN, i2.PURPLE)

cards = []
for slug, ar, en, fn, desc in i2.CONCEPTS:
    body = fn()
    dark = f'<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="#0b0b08"/>{body}</svg>'
    lightb = body.replace(CREAM, "#DBC894")
    light = f'<svg viewBox="0 0 100 100"><rect width="100" height="100" fill="{PLATE}"/>{lightb}</svg>'
    cards.append(f'''<article class="card">
  <div class="arts">
    <div class="tile dark">{dark}</div>
    <div class="tile plate">{light}</div>
  </div>
  <div class="meta">
    <small>{en}</small><b>{ar}</b>
    <p>{desc}</p>
    <div class="icons">
      <img src="i-{slug}-icons.svg" alt="">
      <span>حجم الأيقونة: ٢٨ / ٢٠ / ١٥ بكسل</span>
    </div>
  </div>
</article>''')

html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>إيلان دول — أفكار ثانية للشعار</title>
<meta name="robots" content="noindex,nofollow">
<style>
:root{{--ink:{INK};--cream:{CREAM};--sage:{SAGE};--gold:{GOLD};--plate:{PLATE};
 --line:rgba(235,221,176,.14);--card:#171811}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--ink);color:var(--cream);line-height:1.9;
 font-family:"Segoe UI",Tahoma,system-ui,sans-serif;
 background-image:linear-gradient(rgba(235,221,176,.045) 1px,transparent 1px),
 linear-gradient(90deg,rgba(235,221,176,.045) 1px,transparent 1px);background-size:64px 64px}}
.wrap{{max-width:1180px;margin:0 auto;padding:46px 20px 80px}}
.kick{{font-size:11px;letter-spacing:.34em;color:var(--gold);opacity:.85;margin-bottom:12px}}
h1{{font-size:clamp(28px,5.6vw,50px);margin:0 0 10px;line-height:1.25}}
h1 em{{font-style:normal;color:var(--gold)}}
p.lead{{max-width:62ch;font-size:clamp(14.5px,1.9vw,18px);opacity:.92;margin:0 0 26px}}
.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:20px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:24px;padding:16px}}
.arts{{display:flex;gap:10px;margin-bottom:14px}}
.tile{{flex:1;aspect-ratio:1;border-radius:18px;display:grid;place-items:center;overflow:hidden}}
.tile svg{{width:100%;height:100%;display:block}}
.tile.dark{{background:#0b0b08;border:1px solid var(--line)}}
.tile.plate{{background:var(--plate)}}
.meta small{{display:block;font-size:10.5px;letter-spacing:.22em;color:var(--gold)}}
.meta b{{display:block;font-size:22px;margin:2px 0 6px}}
.meta p{{margin:0 0 12px;font-size:14px;color:#e7e1cd;opacity:.9}}
.icons{{display:flex;align-items:center;gap:12px;border-top:1px dashed var(--line);padding-top:10px}}
.icons img{{width:150px;display:block}}
.icons span{{font-size:11.5px;color:var(--sage);opacity:.85}}
.note{{background:rgba(224,180,84,.10);border:1px solid rgba(224,180,84,.3);border-radius:16px;
 padding:14px 16px;font-size:14px;margin:0 0 26px}}
footer{{border-top:1px solid var(--line);margin-top:56px;padding-top:18px;font-size:12.5px;
 color:var(--sage);display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px}}
</style></head><body><div class="wrap">
<div class="kick">EILAN DOLL · CONCEPT ROUND 2</div>
<h1>ثمانية اتجاهات <em>أخرى</em> — غير الكرة والكتاب</h1>
<p class="lead">كلها بنفس ألوان الهوية ولغة المكعبات، وكل واحدة تجيب إحساسًا مختلفًا:
فجر، نمو، باب، ختم، صعود، علم، مرآة، جسر. كل اتجاه تحت له نسخة على الغامق ونسخة على
الكريمي، وتحقّق حجم الأيقونة.</p>
<div class="note">الشعار المعتمد (الكرة + الكتاب) باقي في <code>brand/final</code> وما تغيّر.
هذي أفكار بديلة/إضافية — اختاري وحدة نستبدلها، أو نخلّي المعتمد ونستخدم وحدة منها
كرمز لقسم معيّن (مثلاً «الرمز» للشهادات و«البوابة» للقبول).</div>
<div class="grid">{"".join(cards)}</div>
<footer><span>إيلان دول — أفكار الجولة الثانية · نوفمبر ٢٠٢٦</span>
<span>EILAN DOLL · THE DIGITAL WORLD</span></footer>
</div></body></html>'''
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
print("page ok", len(html)//1024, "KB")
