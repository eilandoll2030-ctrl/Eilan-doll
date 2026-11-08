#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
EILAN DOLL — brand page builder.
Builds brand/preview/index.html (self-contained, iPad friendly, RTL).

    python3 brand/tools/build_page.py
"""
import os
import importlib.util

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, "..", ".."))
OUT = os.path.normpath(os.path.join(HERE, "..", "preview"))
os.makedirs(OUT, exist_ok=True)

spec = importlib.util.spec_from_file_location("bm", os.path.join(HERE, "build_marks.py"))
bm = importlib.util.module_from_spec(spec)
spec.loader.exec_module(bm)

INK, PLATE = bm.INK, bm.PLATE
CREAM, SAND, SAGE, GREEN, DEEP, PURPLE, GOLD = (bm.CREAM, bm.SAND, bm.SAGE, bm.GREEN,
                                               bm.DEEP, bm.PURPLE, bm.GOLD)

FONT_DIR = os.path.join(ROOT, "coloring", "fonts")

# --------------------------------------------------------------------- content
DIRS = {
    "a-cubes": dict(
        ar="مكعبات", en="Cubes",
        claim="نفس الشعار… بس صار له عمق",
        feel=("أقرب اتجاه لشعارك الحالي: نفس التوزيع، نفس المكعب الذهبي المرفوع، "
              "ونفس الألوان — لكن كل مربع صار مكعباً له وجه وضلع وسقف. "
              "الإحساس اللي يعطيه: الشي اللي كان مرسوماً على ورق صار موجوداً في العالم."),
        when="الشعار الرسمي: الموقع، السوشال، الأوراق، ولافتة المبنى — ويشتغل حتى بحجم ٢٠ بكسل.",
        watch="لا يزال دافئاً وإنسانياً؛ ما فيه «برودة تقنية». هذا مقصود.",
    ),
    "b-gate": dict(
        ar="البوابة", en="The Gate",
        claim="مدخل تمشي منه",
        feel=("نفس الشبكة، لكن العمود الأوسط ينفتح من تحت: مدخل. "
              "والمكعب الذهبي معلّق فوقه مثل حجر الأساس أو ضوء في نهاية الممر. "
              "إحساس «وصلت»، «ادخل» — وهو الإحساس اللي تحتاجينه للجامعة والمعهد."),
        when="بوابة الدخول: شاشة تسجيل الدخول، غلاف قسم القبول، لوحة الحرم، وبطاقة الطالب.",
        watch="الفتحة الوسطى تخفّ تفاصيلها تحت ٢٤ بكسل؛ يحتاج نسخة أيقونة مبسّطة.",
    ),
    "c-build": dict(
        ar="البناء", en="The Build",
        claim="يكبُر من مشروع إلى مؤسسة",
        feel=("مكعبات تصعد درجة درجة: مدرسة، ثم معهد، ثم جامعة — والمكعب الذهبي فوق القمة. "
              "أنت مو بس تصفين الشكل، أنت تصفين الرحلة: مشروع صغير اليوم، حرم جامعي بكرة. "
              "أكثر اتجاه يلمس فكرة «خطوة نحو المستقبل» حرفياً."),
        when="قصص النمو والرؤية: صفحة «من نحن»، خطة التوسّع، وكل عرض تقديمي للمستثمرين.",
        watch="الشكل قد يُقرأ كرسم بياني (نمو مالي) أكثر من شعار — يحتاج ضبطاً بالسياق.",
    ),
    "d-network": dict(
        ar="الشبكة", en="The Network",
        claim="كل مكعب عقدة، وكل خط طريق",
        feel=("نفس المربعات، لكن موصولة بخطوط ذهبية. كل مكعب عقدة، وكل خط طريق تنتقل فيه المعرفة. "
              "هذا أقرب إحساس لـ«العالم الرقمي»: ما فيه شي واقف لحاله، كله متصل. "
              "وجميل إن الشبكة تتحول بسهولة لخريطة أقسام: مكعب لكل كلية أو مسار."),
        when="الخريطة الكبرى: صفحة المسارات، خريطة الحرم، بنية الأقسام، وجوائز التقدّم.",
        watch="أضعف الاتجاهات كأيقونة صغيرة — الخطوط تختفي. يُستخدم للشروحات لا للأيقونة.",
    ),
    "e-campus": dict(
        ar="الحرم", en="The Campus",
        claim="مكعبات صارت مبانٍ",
        feel=("المكعبات تقف على أرض واحدة، والمكعب الذهبي يتوّج أعلاها. "
              "لو شفت الشعار على لافتة مبنى أو على قاعة graduation، ما تحتاج أحد يشرح لك وش هو. "
              "هذا الإحساس المؤسسي اللي يطلع من الشكل نفسه."),
        when="النسخة الكبيرة: لافتة المبنى، حاجز القاعة، خلفية المؤتمر، ودروع التخرّج.",
        watch="يتحوّل لمنظر ثلاثي الأبعاد بسهولة إذا كبر؛ ما يشتغل جيداً أقل من ٣٢ بكسل.",
    ),
    "f-seal": dict(
        ar="الختم", en="The Seal",
        claim="يُنطبع على شهادة",
        feel=("شبكة مسطّحة، لكن مرتّبة ترتيب ختم مؤسسي: عمود عنوان، صفوف نظيفة، وفراغ محسوب. "
              "هذا الشكل ينطبع على شهادة أو ختم ورق أو غلاف كتاب — ويعطي إحساس «رسمي ومعتمد» "
              "بدون ما يصير باردة."),
        when="الشهادات، الأختام، أغلفة الكتب، وبطاقات التخرّج.",
        watch="أقلها حركة؛ خليه للشهادات والمطبوعات، والشعار الأساسي يبقى للمنتجات.",
    ),
}

FAMILY = [
    ("company",  "الشركة / المشروع", "EILAN DOLL", "المكعب الذهبي أعلى اليمين — الشعار المعتمد اليوم"),
    ("academy",  "الجامعة",          "EILAN UNIVERSITY", "المكعب الذهبي في القلب — لأن الجامعة قلب عالمك"),
    ("institute", "المعهد",           "EILAN INSTITUTE", "المكعب الذهبي أسفل اليسار — التعلّم المستمر"),
    ("school",   "المدرسة",           "EILAN SCHOOL", "المكعب الذهبي أعلى اليسار — البداية"),
    ("studio",   "الاستوديو / الألعاب", "EILAN LAB", "المكعب الذهبي أسفل اليمين — التجربة والترفيه"),
]


def inline(fn, plate=None):
    """nested-ready mark: explicit 100x100 box so it scales predictably inside mock-ups"""
    return (bm.svg(fn(), plate)
            .replace("\n", "")
            .replace('xmlns="http://www.w3.org/2000/svg" ', "")
            .replace('<svg viewBox="0 0 100 100"',
                     '<svg viewBox="0 0 100 100" width="100" height="100"')
            .replace(' role="img" aria-label=', ' aria-label='))


# ------------------------------------------------------------------ mockups
def business_card(mark, name, role, ltr=False):
    """85x54 mm card, front: bg + mark + name"""
    W, H = 500, 300
    return f'''<svg viewBox="0 0 {W} {H}" class="mock">
  <rect width="{W}" height="{H}" rx="14" fill="#15170F"/>
  <g transform="translate(28 26) scale(1.00)">{mark}</g>
  <text x="{W-28}" y="52" text-anchor="end" font-family="Cairo" font-weight="900"
        font-size="30" fill="{CREAM}">{name}</text>
  <text x="{W-28}" y="84" text-anchor="end" font-family="Cairo" font-weight="700"
        font-size="17" fill="{SAGE}">{role}</text>
  <line x1="{W-28}" y1="104" x2="300" y2="104" stroke="{GOLD}" stroke-opacity=".5" stroke-width="1.5"/>
  <text x="{W-28}" y="140" text-anchor="end" font-family="Orbitron" font-size="13"
        letter-spacing="2" fill="{GOLD}">EILAN-DOLL.VERCEL.APP</text>
  <text x="{W-28}" y="170" text-anchor="end" font-family="Cairo" font-weight="700"
        font-size="15" fill="{CREAM}" opacity=".7">جدة · المملكة العربية السعودية</text>
  <text x="28" y="{H-26}" font-family="Cairo" font-weight="700" font-size="15"
        fill="{CREAM}" opacity=".45">THE DIGITAL WORLD — WORLD OF CUBES</text>
</svg>'''


def certificate(mark):
    W, H = 520, 380
    return f'''<svg viewBox="0 0 {W} {H}" class="mock">
  <rect width="{W}" height="{H}" rx="14" fill="{PLATE}"/>
  <rect x="14" y="14" width="{W-28}" height="{H-28}" rx="8" fill="none" stroke="{GOLD}" stroke-width="2"/>
  <rect x="22" y="22" width="{W-44}" height="{H-44}" rx="6" fill="none" stroke="{GREEN}" stroke-opacity=".35"/>
  <g transform="translate({W/2-46} 46) scale(0.92)">{mark}</g>
  <text x="{W/2}" y="200" text-anchor="middle" font-family="Cairo" font-weight="700"
        font-size="17" fill="{DEEP}">شهادة إتمام</text>
  <text x="{W/2}" y="238" text-anchor="middle" font-family="Cairo" font-weight="900"
        font-size="26" fill="{GREEN}">إيلان دول — الجامعة الرقمية</text>
  <text x="{W/2}" y="272" text-anchor="middle" font-family="Cairo" font-weight="700"
        font-size="15" fill="{DEEP}" opacity=".75">تُمنح هذه الشهادة تقديراً لإتمام المسار التدريبي</text>
  <line x1="120" y1="316" x2="400" y2="316" stroke="{DEEP}" stroke-opacity=".35"/>
  <text x="{W/2}" y="342" text-anchor="middle" font-family="Cairo" font-weight="700"
        font-size="13" fill="{DEEP}" opacity=".6">EILAN DOLL · THE DIGITAL WORLD</text>
</svg>'''


def building_sign(mark):
    W, H = 520, 240
    return f'''<svg viewBox="0 0 {W} {H}" class="mock">
  <defs><linearGradient id="sc" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#20231A"/><stop offset="1" stop-color="#101109"/>
  </linearGradient></defs>
  <rect width="{W}" height="{H}" rx="14" fill="url(#sc)"/>
  <g opacity=".10" stroke="{CREAM}">
    {''.join(f'<line x1="0" y1="{y}" x2="{W}" y2="{y}"/>' for y in range(20, H, 34))}
  </g>
  <g transform="translate(40 52) scale(1.30)">{mark}</g>
  <text x="{W-40}" y="112" text-anchor="end" font-family="Cairo" font-weight="900"
        font-size="34" fill="{CREAM}">إيلان دول</text>
  <text x="{W-40}" y="146" text-anchor="end" font-family="Orbitron" font-size="15"
        letter-spacing="4" fill="{GOLD}">EILAN DOLL</text>
  <text x="{W-40}" y="180" text-anchor="end" font-family="Cairo" font-weight="700"
        font-size="16" fill="{SAGE}">العالم الرقمي · مكعبات تبني عالم</text>
</svg>'''


def app_icon(mark):
    return f'''<svg viewBox="0 0 160 160" class="mock-ico">
  <rect width="160" height="160" rx="34" fill="{INK}"/>
  <g transform="translate(6 6) scale(1.48)">{mark}</g>
</svg>'''


# ------------------------------------------------------------------ page
def _font(name):
    """inline the font as a data URI so the page renders correctly anywhere"""
    import base64
    with open(os.path.join(FONT_DIR, name), "rb") as f:
        return "data:font/ttf;base64," + base64.b64encode(f.read()).decode()


def build():
    f900, f700, forB = _font("Cairo_900Black.ttf"), _font("Cairo_700Bold.ttf"), _font("Orbitron_800ExtraBold.ttf")
    css = f'''
@font-face{{font-family:Cairo;src:url({f900}) format('truetype');font-weight:900;font-display:swap}}
@font-face{{font-family:Cairo;src:url({f700}) format('truetype');font-weight:700;font-display:swap}}
@font-face{{font-family:Orbitron;src:url({forB}) format('truetype');font-weight:800;font-display:swap}}
:root{{
  --ink:{INK}; --cream:{CREAM}; --sage:{SAGE}; --green:{GREEN}; --deep:{DEEP};
  --gold:{GOLD}; --purple:{PURPLE}; --card:#171811; --line:rgba(235,221,176,.13);
}}
*{{box-sizing:border-box}}
html,body{{margin:0;background:var(--ink);color:var(--cream);
  font-family:Cairo,system-ui,sans-serif;-webkit-text-size-adjust:100%}}
body{{background-image:linear-gradient(rgba(235,221,176,.045) 1px,transparent 1px),
  linear-gradient(90deg,rgba(235,221,176,.045) 1px,transparent 1px);
  background-size:64px 64px;line-height:1.9}}
.wrap{{max-width:1180px;margin:0 auto;padding:0 22px 90px}}
header.hero{{padding:64px 0 30px;position:relative}}
.kick{{font-family:Orbitron;font-weight:800;font-size:12px;letter-spacing:.32em;
  color:var(--gold);opacity:.85;margin-bottom:18px}}
h1{{font-size:clamp(38px,7vw,76px);line-height:1.12;margin:0 0 18px;font-weight:900}}
h1 em{{font-style:normal;color:var(--gold)}}
.lead{{font-size:clamp(16px,2.1vw,21px);max-width:62ch;color:#E9E3CE;opacity:.92;margin:0 0 22px}}
.chips{{display:flex;flex-wrap:wrap;gap:9px;margin:6px 0 26px}}
.chip{{font-size:13px;font-weight:700;padding:7px 14px;border-radius:999px;
  border:1px solid var(--line);background:rgba(235,221,176,.05);color:var(--sage)}}
.hero-grid{{display:flex;gap:14px;align-items:center;flex-wrap:wrap;margin-top:8px}}
.hero-grid .tile{{flex:0 0 auto}}

h2{{font-size:clamp(24px,4vw,38px);margin:74px 0 8px;font-weight:900}}
h2 span{{color:var(--gold)}}
.sub{{color:var(--sage);font-weight:700;margin:0 0 26px;font-size:15.5px}}

.grid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:20px}}
.card{{background:var(--card);border:1px solid var(--line);border-radius:26px;padding:22px;
  display:flex;flex-direction:column;gap:14px}}
.card-top{{display:flex;gap:14px;align-items:center}}
.tile{{border-radius:18px;display:grid;place-items:center;overflow:hidden}}
.tile.dark{{background:var(--ink);border:1px solid var(--line)}}
.tile.cream{{background:{PLATE}}}
.tile svg{{display:block;width:100%;height:100%}}
.tile-lg{{width:132px;height:132px}}
.tile-sm{{width:64px;height:64px}}
.names{{flex:1;min-width:0}}
.names b{{display:block;font-size:23px;font-weight:900;line-height:1.3}}
.names small{{display:block;font-family:Orbitron;font-size:11px;letter-spacing:.28em;
  color:var(--gold);margin-bottom:4px}}
.claim{{font-weight:900;font-size:16px;color:var(--gold);margin:0}}
.feel{{margin:0;font-size:15px;color:#E6E0CB;opacity:.9}}
.row{{font-size:13.5px;margin:0;padding-top:10px;border-top:1px dashed var(--line)}}
.row b{{color:var(--sage)}}
.row.warn b{{color:#E0A15A}}
.ladder{{display:flex;gap:12px;align-items:flex-end;padding-top:8px}}
.ladder i{{display:block;background:var(--PLATE);border-radius:8px;overflow:hidden}}
.ladder i svg{{display:block;width:100%;height:100%}}
.ladder span{{font-size:11px;color:var(--sage);opacity:.7;font-family:Orbitron;letter-spacing:.1em}}

.fam{{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:14px}}
.fam .card{{align-items:center;text-align:center;gap:10px;padding:18px 12px}}
.fam .tile{{width:96px;height:96px}}
.fam b{{font-size:15px}}
.fam small{{font-family:Orbitron;font-size:9.5px;letter-spacing:.18em;color:var(--gold)}}
.fam p{{font-size:12px;color:var(--sage);margin:0;opacity:.85;line-height:1.6}}

.mockgrid{{display:grid;grid-template-columns:repeat(auto-fit,minmax(360px,1fr));gap:22px}}
.mock{{width:100%;height:auto;display:block;border-radius:20px;border:1px solid var(--line)}}
.mock-ico{{width:104px;height:104px;display:block;border-radius:22px;box-shadow:0 12px 30px -12px #000}}
.cap{{font-size:13px;color:var(--sage);margin:8px 0 0;font-weight:700}}

.two{{display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:18px}}
.box{{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:22px}}
.box h3{{margin:0 0 12px;font-size:19px}}
.box ul{{margin:0;padding-inline-start:20px}}
.box li{{margin:7px 0;font-size:14.6px;color:#E6E0CB;opacity:.92}}
.box li b{{color:var(--gold)}}
.rec{{background:linear-gradient(160deg,#1B2417,#14150F 60%);border:1px solid rgba(224,180,84,.35)}}
.rec ol{{margin:0;padding-inline-start:22px}}
.rec li{{margin:12px 0;font-size:15.4px}}
.pick{{display:flex;gap:16px;align-items:center;flex-wrap:wrap;margin:6px 0 18px}}
.pick .tile{{width:110px;height:110px}}
footer{{border-top:1px solid var(--line);margin-top:70px;padding-top:22px;
  display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;
  font-size:12.5px;color:var(--sage);opacity:.75}}
nav.pill{{position:sticky;top:0;z-index:9;backdrop-filter:blur(14px);
  background:rgba(14,14,10,.82);border-bottom:1px solid var(--line)}}
nav.pill .in{{max-width:1180px;margin:0 auto;padding:11px 22px;display:flex;gap:8px;overflow-x:auto}}
nav.pill a{{color:var(--sage);text-decoration:none;font-size:13px;font-weight:700;
  padding:6px 12px;border-radius:999px;border:1px solid transparent;white-space:nowrap}}
nav.pill a:hover{{border-color:var(--line);color:var(--cream)}}
@media(max-width:520px){{
  .tile-lg{{width:104px;height:104px}}
  .card{{padding:18px;border-radius:20px}}
}}
'''
    # ---- build sections
    cards = []
    for slug, ar, en, fn in bm.MARKS:
        d = DIRS[slug]
        tiles = (f'<div class="tile tile-lg dark">{inline(fn, "dark")}</div>'
                 f'<div class="tile tile-sm cream">{inline(fn, "light")}</div>')
        ladders = "".join(
            f'<i style="width:{px}px;height:{px}px">{inline(fn)}</i>' for px in (72, 48, 32, 20))
        cards.append(f'''<article class="card">
  <div class="card-top">{tiles}
    <div class="names"><small>{en.upper()}</small><b>{ar}</b></div>
  </div>
  <p class="claim">«{d['claim']}»</p>
  <p class="feel">{d['feel']}</p>
  <p class="row"><b>يصلح لمتى:</b> {d['when']}</p>
  <p class="row warn"><b>خلّي بالك:</b> {d['watch']}</p>
  <div class="ladder">{ladders}<span>72 · 48 · 32 · 20px</span></div>
</article>''')

    fam_cards = []
    fam_by_slug = {}
    for slug, ar, en, lit in bm.FAMILY:
        fam_by_slug[slug] = bm.mark_family(lit)
        note = dict((f[0], f[3]) for f in FAMILY)[slug]
        fam_cards.append(f'''<div class="card">
  <div class="tile dark">{inline(lambda lit=lit: bm.mark_family(lit), "dark")}</div>
  <b>{ar}</b><small>{en}</small><p>{note}</p>
</div>''')

    primary = dict((s, f) for s, a, e, f in bm.MARKS)["a-cubes"]
    campus = dict((s, f) for s, a, e, f in bm.MARKS)["e-campus"]

    html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>إيلان دول — مكعبات تبني عالم · ستة اتجاهات للشعار</title>
<meta name="robots" content="noindex,nofollow">
<style>{css}</style>
</head>
<body>
<nav class="pill"><div class="in">
  <a href="#dirs">الاتجاهات الستة</a>
  <a href="#family">عائلة العلامة</a>
  <a href="#mock">على الورق والبناء</a>
  <a href="#rules">القواعد</a>
  <a href="#rec">توصيتي</a>
</div></nav>

<div class="wrap">
<header class="hero">
  <div class="kick">EILAN DOLL · BRAND STUDY 01 · 2026</div>
  <h1>مكعبات <em>تبني</em> عالم<br>وديجيتال وورلد في نفس الوقت</h1>
  <p class="lead">شعارك الحالي عاجبك، وقلبه صح: شبكة مكعبات ومكعب ذهبي مرفوع.
  المشكلة مو في الشكل — المشكلة إنه مسطّح: ما يقول «عالم رقمي»، وما يقول «مؤسسة».
  اللي تحتاجينه مو شعار جديد من الصفر، بل نفس الشعار يُعطى <b>عُمق</b> و<b>منطق</b>
  يكبُر معك: شركة اليوم، وجامعة ومعهد ومدرسة بكرة.</p>
  <div class="chips">
    <span class="chip">نفس الشبكة</span>
    <span class="chip">نفس الألوان المعتمدة</span>
    <span class="chip">مكعب ذهبي واحد فقط</span>
    <span class="chip">كريمي · مو أبيض صافي</span>
    <span class="chip">بنفسجي كلمسة خفيفة</span>
  </div>
  <div class="hero-grid">
    <div class="tile tile-lg dark">{inline(primary, "dark")}</div>
    <div class="tile tile-lg cream">{inline(primary, "light")}</div>
    <div class="tile tile-lg dark">{inline(campus, "dark")}</div>
  </div>
</header>

<h2 id="dirs">ستة اتجاهات، <span>نفس الهوية</span></h2>
<p class="sub">كل اتجاه: نسخة على الغامق، ونسخة على الكريمي، والقدرة على الصمود بحجم أيقونة صغير.</p>
<div class="grid">
{''.join(cards)}
</div>

<h2 id="family">عائلة العلامة — <span>مكعب واحد يتوهّج لكل قسم</span></h2>
<p class="sub">هذا الحل للنمو: ما تحتاجين شعاراً جديداً لكل جهة. نفس الشبكة، ويتغيّر المكعب الذهبي.
القاعدة الذهبية: <b>مكعب ذهبي واحد في كل شعار — لا أكثر.</b></p>
<div class="fam">
{''.join(fam_cards)}
</div>

<h2 id="mock">الشعار <span>على الورق وعلى المبنى</span></h2>
<p class="sub">هذا الاختبار الحقيقي: مو «حلو في الشاشة»، بل «يشتغل في الشهادة واللافتة والبطاقة».</p>
<div class="mockgrid">
  <div>{business_card(inline(primary), "إيلان دول", "الشريك المؤسس")}
    <p class="cap">بطاقة عمل ٨٥×٥٤ مم — الشعار بحجم صغير ويبقى واضح</p></div>
  <div>{certificate(inline(primary))}
    <p class="cap">شهادة إتمام — نسخة الختم للشهادات والأوراق الرسمية</p></div>
  <div>{building_sign(inline(campus))}
    <p class="cap">لافتة مبنى — النسخة الثلاثية (الحرم) تعطي إحساس الجامعة</p></div>
  <div>
    <div style="display:flex;gap:18px;align-items:center;flex-wrap:wrap">
      {app_icon(inline(primary))}
      {app_icon(inline(dict((s,f) for s,a,e,f in bm.MARKS)["f-seal"]))}
    </div>
    <p class="cap">أيقونة التطبيق والبروفايل — المكعبات تبقى مميّزة حتى في ٢٠ بكسل</p>
  </div>
</div>

<h2 id="rules">القواعد الثابتة <span>والجديد</span></h2>
<div class="two">
  <div class="box">
    <h3>يبقى كما هو (الهوية المعتمدة)</h3>
    <ul>
      <li><b>الألوان:</b> أخضر غامق ← نصف فاتح · ذهبي · أسود · كريمي/بيج · بنفسجي غامق كلمسة خفيفة فقط.</li>
      <li><b>بدون</b> تيفاني، نعناعي، أو تدرّج أخضر–بنفسجي.</li>
      <li><b>مكعب ذهبي واحد</b> في كل شعار: هو «النور» اللي يبني عليه العالم.</li>
      <li>الكريمي بدل الأبيض الصافي في كل خلفية فاتحة.</li>
      <li>الاسم: <b>إيلان دول · EILAN DOLL</b> — و«العالم الرقمي / THE DIGITAL WORLD» سطر تحت الاسم.</li>
    </ul>
  </div>
  <div class="box">
    <h3>الجديد: كيف صار «عالم رقمي»</h3>
    <ul>
      <li><b>عُمق:</b> كل مربع صار مكعباً (وجه · ضلع · سقف) — من ورق إلى عالم له مساحة.</li>
      <li><b>قاعدة الظل والضوء:</b> السقف أفتح ٣٤٪ والضلع أغمق ٣٤٪ — نمط واحد في كل الشعارات والموقع.</li>
      <li><b>نظام قابل للتكبير:</b> نفس المكعب يصير كلية، مساراً، أو أيقونة — بدون رسم جديد.</li>
      <li><b>الخط:</b> كايرو أسود للعربي (نفس الموقع) + Orbitron للاتيني = صوت تقني مع دفء عربي.</li>
    </ul>
  </div>
</div>

<h2 id="rec">توصيتي <span>لو أنا مكانك</span></h2>
<div class="box rec">
  <div class="pick">
    <div class="tile tile-lg dark">{inline(primary, "dark")}</div>
    <div><b style="font-size:20px">الشعار الأساسي: «مكعبات»</b>
    <p style="margin:6px 0 0;color:var(--sage);font-size:14.5px">
    لأنه أقرب للي عاجبك، وأكثر واحد يشتغل بكل المقاسات — من أيقونة ٢٠ بكسل إلى لافتة مبنى.</p></div>
  </div>
  <ol>
    <li><b>الأساسي</b> = «مكعبات» (عمق ٣D على نفس الشبكة). ياخذ مكان الشعار الحالي في الموقع والسوشال.</li>
    <li><b>الثاني</b> = «الحرم» للنسخة الكبيرة فقط: اللافتة، الحاجز، خلفية المؤتمر، ودروع التخرّج.</li>
    <li><b>الثالث</b> = «الختم» للشهادات والأوراق الرسمية — يعطي إحساس معتمد.</li>
    <li><b>النظام</b> = عائلة العلامة: شركة · جامعة · معهد · مدرسة · استوديو — كل واحدة بمكعب ذهبي في خانة مختلفة.</li>
    <li><b>ما أنصح به الآن:</b> الشبكة والبوابة والبناء تبقى في الملف كأفكار للحملات والشرح، لأنها تخسر كأيقونة صغيرة.</li>
  </ol>
</div>

<footer>
  <span>إيلان دول — مكعبات تبني عالم · دراسة اتجاهات الشعار · نوفمبر ٢٠٢٦</span>
  <span>EILAN DOLL · THE DIGITAL WORLD</span>
</footer>
</div>
</body>
</html>
'''
    p = os.path.join(OUT, "index.html")
    with open(p, "w", encoding="utf-8") as f:
        f.write(html)
    print("page →", p, f"({len(html)//1024} KB)")


if __name__ == "__main__":
    build()
