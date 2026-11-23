"""Card games (paid) — print PDF + slideshow PDF + animated PowerPoint, Eilan style.

  python3 games/print-src/build_cards.py lawkunt jawib qulha couples
Output goes to a PRIVATE folder outside the repo (paid products — never commit or deploy these files):
  /home/claude/private/products/<game>/Eilan-<Name>-Print-AR.pdf · -Show-AR.pdf · -Animated-AR.pptx
Questions are read from games/<game>/index.html (the live game), so the files always match the game.
"""
import json, pathlib, subprocess, sys, tempfile

HERE = pathlib.Path(__file__).parent
sys.path.insert(0, str(HERE))
import build_print as bp  # noqa: E402
import build_anim as ba  # noqa: E402

PRIV = pathlib.Path("/home/claude/private/products")
LOGO = bp.LOGO
num = lambda n: str(n).translate(bp.AR_DIG)
E = "'Noto Color Emoji'"


def data(game, *names):
    out = subprocess.run(["node", str(HERE / "game_data.cjs"), str(bp.ROOT / "games" / game / "index.html"), *names],
                         check=True, capture_output=True, text=True).stdout
    return json.loads(out)


def chip(t, ac):
    return f'<span style="display:inline-block;padding:1.2mm 4mm;border-radius:20mm;background:#fff;border:.8pt solid {ac};color:{ac};font-weight:900;font-size:9pt;font-family:Cairo,{E}">{t}</span>'


def schip(t, ac, el="lv"):
    return f'<div data-el="{el}" style="padding:12px 34px;border-radius:60px;background:#fff;border:3px solid {ac};color:{ac};font-weight:900;font-size:38px;font-family:Cairo,{E}">{t}</div>'


# ---------------------------------------------------------------- game configs
def cfg_lawkunt():
    d = data("lawkunt", "Q", "TW"); Q, TW = d["Q"], d["TW"]

    def pf(i, q, c):
        return (f'<div class="tl" style="--rt:-4deg;font-size:42pt;font-family:{E}">{q[0]}</div>'
                f'<div style="font-weight:900;font-size:19pt;margin-top:5mm;font-family:Cairo">لو كنت {q[1]}…</div>'
                f'<div style="font-weight:900;font-size:13pt;color:{c[2]};font-family:Cairo">وش بتكون؟ وليش؟</div>')

    def pb(i, q):
        return ('<div style="font-weight:800;font-size:8pt;color:#FFD97A;font-family:Cairo">مفاجأة البطاقة</div>'
                f'<div style="font-weight:900;font-size:16pt;line-height:1.55;max-width:112mm;margin-top:2mm;font-family:Cairo,{E}">{TW[i % len(TW)]}</div>'
                '<div style="font-size:8.6pt;color:rgba(255,248,234,.7);margin-top:4mm;font-family:Cairo">(المقدّم يقرر: يستخدم المفاجأة أو لا)</div>')

    def sl(i, q, c):
        tw = TW[i % len(TW)] if i % 3 == 2 else ""
        body = (f'<div data-el="emo" class="tl" style="font-size:170px;font-family:{E}">{q[0]}</div>'
                f'<div data-el="q" style="font-weight:900;font-size:110px;margin-top:56px;font-family:Cairo">لو كنت {q[1]}…</div>'
                f'<div data-el="why" style="font-weight:900;font-size:64px;color:{c[2]};font-family:Cairo">وش بتكون؟ وليش؟</div>')
        st = [('after', [('emo', 'pop', 800, 0)]), ('after', [('q', 'rise', 650, 0)]), ('after', [('why', 'zoom', 500, 0), ('brand', 'fade', 500, 0)])]
        if tw:
            body += f'<div data-el="tw" style="margin-top:34px;padding:18px 40px;border-radius:30px;background:rgba(255,255,255,.65);border:3px dashed {c[2]};font-size:40px;font-weight:900;font-family:Cairo,{E}">{tw}</div>'
            st.append(('click', [('tw', 'pop', 700, 0)]))
        return body, st, 'emo'

    return dict(file="LawKunt", title="لو كنت", items=Q, kick="لعبة تعارف وضحك",
                sub="«لو كنت لون… وش بتكون؟» — جاوب وقول ليش!",
                chips=[f"{num(len(Q))} بطاقة", "مفاجأة ورا كل بطاقة", "بطاقة القوانين"],
                rules=["اخلطوا البطاقات وحطوها مقلوبة.", "كل واحد بدوره يسحب بطاقة ويقرأ: «لو كنت… وش بتكون؟»",
                       "يجاوب ويقول <b>ليش</b> — هنا الضحك!", "المقدّم يقلب البطاقة ويقرر: نطبّق المفاجأة اللي ورا أو لا."],
                steps=["كل واحد بدوره يطلع له سؤال «لو كنت…»", "يجاوب ويقول ليش — هنا الضحك!", "أحيانًا تطلع مفاجأة 🎲 تخلي غيره يجاوب"],
                end=("🎉", "مين أضحك جواب؟", "العبوها أونلاين بمكعب يتدحرج — منطقة الترفيه في إيلان دول"),
                pf=pf, pb=pb, sl=sl, bg="#4A2A8F")


def cfg_jawib():
    Q = data("jawib", "Q")["Q"]
    LV = {1: "سهل", 2: "متوسط", 3: "صعب", 4: "صعب جدًا 🔥"}

    def pf(i, q, c):
        return (f'{chip(LV[q[2]], c[2])}<div style="font-weight:900;font-size:21pt;line-height:1.45;margin-top:4mm;max-width:118mm;font-family:Cairo,{E}">{q[0]}</div>'
                f'<div style="font-weight:900;font-size:11.5pt;color:{c[2]};margin-top:3mm;font-family:Cairo">جاوب غلط خلال ٧ ثواني! ⏱️</div>')

    def pb(i, q):
        return ('<div style="font-weight:800;font-size:8.6pt;color:#FFD97A;font-family:Cairo">الجواب الصح… اللي ممنوع تقوله 🙊</div>'
                f'<div style="font-weight:900;font-size:26pt;line-height:1.3;margin-top:2mm;font-family:Cairo,{E}">{q[1]}</div>'
                '<div style="font-size:8.6pt;color:rgba(255,248,234,.7);margin-top:4mm;font-family:Cairo">قالها؟ يخسر النقطة 😅</div>')

    def sl(i, q, c):
        body = (f'{schip(LV[q[2]], c[2])}'
                f'<div data-el="q" style="font-weight:900;font-size:100px;line-height:1.4;margin-top:40px;max-width:1500px;font-family:Cairo,{E}">{q[0]}</div>'
                f'<div data-el="why" style="font-weight:900;font-size:56px;color:{c[2]};margin-top:20px;font-family:Cairo">⏱️ جاوب غلط خلال ٧ ثواني!</div>'
                f'<div data-el="ans" style="margin-top:34px;padding:18px 44px;border-radius:30px;background:#fff;border:3px dashed {c[2]};font-size:46px;font-weight:900;font-family:Cairo,{E}">الجواب الصح كان: {q[1]}</div>')
        st = [('after', [('lv', 'pop', 600, 0)]), ('after', [('q', 'rise', 650, 0)]), ('after', [('why', 'zoom', 500, 0), ('brand', 'fade', 500, 0)]),
              ('click', [('ans', 'pop', 700, 0)])]
        return body, st, 'why'

    return dict(file="JawibGhalat", title="جاوب غلط", items=Q, kick="لعبة جَمعات سريعة",
                sub="سؤال سهل جدًا… والمطلوب جواب غلط!",
                chips=[f"{num(len(Q))} سؤال", "٤ مستويات", "بطاقة القوانين"],
                rules=["انقسموا لفريقين.", "المقدّم يقرأ السؤال، والفريق لازم يجاوب <b>جواب غلط</b> خلال ٧ ثواني.",
                       "اللي يقول الجواب الصح أو يتأخر يخسر النقطة 😅", "الجواب الصح مكتوب ورا البطاقة عشان المقدّم يتأكد."],
                steps=["يطلع سؤال سهل جدًا", "جاوب غلط خلال ٧ ثواني!", "قلت الصح؟ تخسر النقطة 😅"],
                end=("🏆", "مين الفريق الفايز؟", "العبوها أونلاين بعدّاد ونقاط — منطقة الترفيه في إيلان دول"),
                pf=pf, pb=pb, sl=sl, bg="#1E44C8")


def cfg_qulha():
    d = data("qulha", "W", "DIA"); W, DIA = d["W"], d["DIA"]

    def ex(w):
        return " · ".join(x.strip() for x in w[1].split("·")) if w[1] else ""

    def pf(i, w, c):
        return (f'{chip("🎙️ قولها بلهجتك", c[2])}<div style="font-weight:900;font-size:22pt;line-height:1.45;margin-top:4mm;max-width:118mm;font-family:Cairo,{E}">«{w[0]}»</div>'
                f'<div style="font-weight:900;font-size:11.5pt;color:{c[2]};margin-top:3mm;font-family:Cairo">كيف تقولها بلهجتك؟</div>')

    def pb(i, w):
        e = ex(w)
        top = (f'<div style="font-weight:800;font-size:8.4pt;color:#FFD97A;font-family:Cairo">أمثلة من اللهجات</div>'
               f'<div style="font-weight:700;font-size:10.4pt;line-height:1.75;max-width:120mm;margin-top:1.5mm;font-family:Cairo,{E}">{e}</div>') if e else ""
        return (top + f'<div style="margin-top:4mm;padding:2mm 5mm;border-radius:4mm;border:.6pt solid rgba(255,217,122,.6);font-weight:900;font-size:12pt;font-family:Cairo,{E}">'
                f'🎲 تحدّي: قولها {DIA[i % len(DIA)]}</div>')

    def sl(i, w, c):
        e = ex(w)
        body = (f'{schip("🎙️ قولها بلهجتك", c[2])}'
                f'<div data-el="q" style="font-weight:900;font-size:120px;line-height:1.35;margin-top:40px;max-width:1500px;font-family:Cairo,{E}">«{w[0]}»</div>'
                f'<div data-el="why" style="font-weight:900;font-size:56px;color:{c[2]};margin-top:16px;font-family:Cairo">كيف تقولها بلهجتك؟</div>')
        st = [('after', [('lv', 'pop', 600, 0)]), ('after', [('q', 'rise', 650, 0)]), ('after', [('why', 'zoom', 500, 0), ('brand', 'fade', 500, 0)])]
        if e:
            body += f'<div data-el="ans" style="margin-top:30px;padding:16px 40px;border-radius:30px;background:#fff;border:3px dashed {c[2]};font-size:34px;font-weight:800;line-height:1.6;max-width:1600px;font-family:Cairo,{E}">{e}</div>'
            st.append(('click', [('ans', 'pop', 700, 0)]))
        else:
            body += f'<div data-el="ans" style="margin-top:30px;padding:16px 40px;border-radius:30px;background:#fff;border:3px dashed {c[2]};font-size:44px;font-weight:900;font-family:Cairo,{E}">🎲 قولها {DIA[i % len(DIA)]}</div>'
            st.append(('click', [('ans', 'pop', 700, 0)]))
        return body, st, 'q'

    return dict(file="QulhaBilahjatak", title="قولها بلهجتك", items=W, kick="لعبة لهجات وضحك",
                sub="كلمات وجمل بالفصحى… قولها بلهجتك!",
                chips=[f"{num(len(W))} بطاقة", "أمثلة من ٦ لهجات", "تحدّيات لهجات"],
                rules=["الدور يمشي عليكم واحد ورا الثاني.", "اقرأ الجملة بالفصحى وقولها <b>بلهجتك</b>.",
                       "ورا البطاقة أمثلة من لهجات ثانية وتحدّي: قولها بلهجة غيرك!", "ما فيه صح وغلط — المهم الضحك 😄"],
                steps=["تطلع جملة بالفصحى", "قولها بلهجتك", "وجرب تحدّي اللهجات 🎲"],
                end=("🎙️", "مين أحلى لهجة؟", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                pf=pf, pb=pb, sl=sl, bg="#0F6B44")


def cfg_couples():
    Q = data("couples", "Q")["Q"]
    LV = {1: "دافي", 2: "رومانسي", 3: "جريء 🔥", 4: "جريء جدًا 🔥🔥"}

    def pf(i, q, c):
        return (f'<div style="display:flex;gap:2mm">{chip(LV[q[0]], c[2])}{chip(q[1], c[2])}</div>'
                f'<div style="font-weight:900;font-size:19pt;line-height:1.55;margin-top:4mm;max-width:118mm;font-family:Cairo,{E}">{q[2]}</div>')

    def pb(i, q):
        return (f'<div style="font-size:30pt;font-family:{E}">💍</div><div style="font-size:14pt;font-family:{E}">💜 💛</div><div style="font-weight:900;font-size:16pt;margin-top:1mm;font-family:Cairo">بيني وبينك</div>'
                f'<div style="font-weight:800;font-size:10pt;color:#FFD97A;margin-top:1mm;font-family:Cairo,{E}">المستوى: {LV[q[0]]}</div>')

    def sl(i, q, c):
        body = (f'<div style="display:flex;gap:20px">{schip(LV[q[0]], c[2])}{schip(q[1], c[2], "ty")}</div>'
                f'<div data-el="q" style="font-weight:900;font-size:92px;line-height:1.5;margin-top:44px;max-width:1500px;font-family:Cairo,{E}">{q[2]}</div>')
        st = [('after', [('lv', 'pop', 600, 0), ('ty', 'pop', 600, 200)]), ('after', [('q', 'rise', 700, 0), ('brand', 'fade', 500, 0)])]
        return body, st, 'q'

    return dict(file="BeniWbenak", title="بيني وبينك", items=Q, kick="للمتزوجين فقط 💍",
                sub="أسئلة وتحدّيات تبدأ دافية… وتصير جريئة 🔥",
                chips=[f"{num(len(Q))} سؤال وتحدّي", "٤ مستويات", "جوكرين لكل واحد"],
                rules=["طفّوا الجوالات وولّعوا شمعة 🕯️", "تبادلوا الدور: 💜 مرة و💛 مرة.",
                       "لكل واحد <b>جوكرين</b> يتخطى فيهم سؤال ما يبي يجاوبه.", "ابدأوا من «دافي» وكملوا لين «جريء جدًا»."],
                steps=["تبادلوا الدور 💜💛", "جاوب أو نفّذ التحدّي", "لكل واحد جوكرين 🃏"],
                end=("💞", "بيني وبينك… وبس", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                pf=pf, pb=pb, sl=sl, **ROMANCE)


# ---- romantic theme («بيني وبينك»): blush/rose/burgundy + hearts and rings instead of cubes
_HE = ["💕", "💍", "❤️", "🌹", "💞", "🤍"]


def _hearts():
    spots = [(3, 4, 12, -14), (88, 6, 10, 12), (5, 82, 9, 10), (90, 80, 11, -8)]
    return "".join(f'<span style="position:absolute;left:{x}%;top:{y}%;font-size:{z}pt;transform:rotate({r}deg);opacity:.75;font-family:{E}">{_HE[k % len(_HE)]}</span>'
                   for k, (x, y, z, r) in enumerate(spots))


def _rdeco(name, top, left, size, rot):
    em = "💍" if name == "d1" else "💕"
    return f'<div data-el="{name}" class="deco" style="top:{top}px;left:{left}px;width:{size}px;height:{size}px;font-size:{int(size*.82)}px;line-height:1;transform:rotate({rot}deg);font-family:{E}">{em}</div>'


def _float(scale):
    pts = [(6, 10, 1.0, -12, "💕"), (14, 70, .7, 8, "🌹"), (82, 14, .8, 14, "💍"), (90, 62, .9, -6, "❤️"), (48, 88, .6, 0, "🤍"), (70, 6, .55, 10, "💞")]
    return "".join(f'<span style="position:absolute;left:{x}%;top:{y}%;font-size:{s*scale:.0f}px;transform:rotate({r}deg);opacity:.55;font-family:{E}">{e}</span>' for x, y, s, r, e in pts)


ROMANCE = dict(
    bg="#C2185B", bg2="#5A0F2E", bg3="#1E0610",
    fun=[("#FFE4EC", "#FFC2D4", "#C2185B", "#5A0F2E"), ("#FDE8E4", "#F8C9C1", "#B23A48", "#4A1020"),
         ("#F9E3F1", "#EEC3E2", "#9C2A7E", "#45103A"), ("#FFF1EA", "#FBD3C6", "#C2410C", "#4D1F12")],
    night=[("#9C1E4A", "#3A0718"), ("#7A1F5C", "#2B0722"), ("#A3243B", "#36070F"), ("#6E1A3F", "#22050F")],
    rulesc=("#FFE4EC", "#FFC2D4", "#C2185B", "#5A0F2E"), plainc=("#9C1E4A", "#3A0718"),
    cubes=_hearts, deco=_rdeco, coverdeco=_float(48).replace("px", "pt"), slidedeco=_float(110),
    howbg="linear-gradient(160deg,#FFF5F8,#FFE4EC)", howink="#5A0F2E")


# ---- the five older card games: questions live in a PRIVATE file (paid content, never in the repo)
def old(name):
    sys.path.insert(0, "/home/claude/private/oldgames")
    import content  # noqa: E402
    return getattr(content, name)


def _txt(pt=19):
    return lambda x: f'<div style="font-weight:900;font-size:{pt}pt;line-height:1.55;margin-top:4mm;max-width:118mm;font-family:Cairo,{E}">{x}</div>'


def _old_cfg(file, title, items, lab, kick, sub, chips, rules, steps, end, back, extra=None, slide_extra=None, **kw):
    T = _txt(19 if max(len(q["x"]) for q in items) < 70 else 17)

    def pf(i, q, c):
        return chip(lab(q), c[2]) + T(q["x"]) + (extra(q, c) if extra else "")

    def pb(i, q):
        return back(q)

    def sl(i, q, c):
        body = (f'<div style="display:flex;gap:20px">{schip(lab(q), c[2])}</div>'
                f'<div data-el="q" style="font-weight:900;font-size:{84 if len(q["x"]) < 60 else 70}px;line-height:1.5;margin-top:44px;max-width:1550px;font-family:Cairo,{E}">{q["x"]}</div>')
        st = [('after', [('lv', 'pop', 600, 0)]), ('after', [('q', 'rise', 700, 0), ('brand', 'fade', 500, 0)])]
        if slide_extra and slide_extra(q, c):
            body += slide_extra(q, c)
            st.append(('click', [('tw', 'pop', 700, 0)]))
        return body, st, 'q'

    return dict(file=file, title=title, items=items, kick=kick, sub=sub, chips=chips, rules=rules, steps=steps, end=end,
                pf=pf, pb=pb, sl=sl, **kw)


def _tw(t, c):
    return f'<div data-el="tw" style="margin-top:34px;padding:18px 40px;border-radius:30px;background:rgba(255,255,255,.65);border:3px dashed {c[2]};font-size:42px;font-weight:900;font-family:Cairo,{E}">{t}</div>'


def _bk(icon, line1, line2=""):
    return (f'<div style="font-size:30pt;font-family:{E}">{icon}</div><div style="font-weight:900;font-size:15pt;margin-top:1mm;font-family:Cairo,{E}">{line1}</div>'
            + (f'<div style="font-weight:800;font-size:9.6pt;color:#FFD97A;margin-top:2mm;max-width:110mm;font-family:Cairo,{E}">{line2}</div>' if line2 else ""))


def cfg_lahad():
    Q = old("LAHAD"); TY = {"q": "💬 سؤال صراحة", "c": "⚡ تحدّي", "r": "🏁 أول واحد…", "j": "🃏 جوكر"}
    return _old_cfg("LahadYeshidha", "لحد يشدها", Q, lambda q: TY[q["t"]], "لعبة جَمعات وصراحة",
                    "صراحة وتحديات وسباقات «أول واحد…» — مين يشدها؟",
                    [f"{num(len(Q))} بطاقة", "أسئلة · تحديات · سباقات · جوكر", "٣ لاعبين أو أكثر"],
                    ["اخلطوا البطاقات وحطوها مقلوبة.", "كل واحد بدوره يسحب بطاقة ويقرأها بصوت عالي.",
                     "💬 سؤال صراحة: جاوب بصراحة · ⚡ تحدّي: نفّذه · 🏁 أول واحد: سباق للكل!", "🃏 الجوكر: نفّذ اللي مكتوب فيه — وكالعادة الصراااحة ثم الصراحة."],
                    ["اسحب بطاقة واقرأها", "جاوب بصراحة أو نفّذ التحدي", "في «أول واحد…» الكل يتسابق 🏁"],
                    ("🏆", "مين شدّها اليوم؟", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                    lambda q: _bk({"q": "💬", "c": "⚡", "r": "🏁", "j": "🃏"}[q["t"]], "لحد يشدها",
                                  ("🏆 " + q["w"]) if q.get("w") else ("⏳ تحدٍّ مستمر حتى نهاية اللعبة" if q.get("p") else "")),
                    slide_extra=lambda q, c: _tw("🏆 " + q["w"], c) if q.get("w") else "", bg="#0B1F5E")


def cfg_family():
    Q = old("FAMILY")
    return _old_cfg("AsilaAailiya", "أسئلة عائلية", Q, lambda q: "⚡ " + q["tag"] if q.get("tag") else "❓ سؤال", "لعبة عائلية سريعة",
                    "أسرع واحد يجاوب صح… ياخذ النقطة!",
                    [f"{num(len(Q))} سؤال", "أسئلة سريعة وألغاز", "لاعبين أو أكثر"],
                    ["واحد يقرأ السؤال بصوت عالي.", "لكل شخص محاولة وحدة فقط.", "أسرع واحد يجاوب صح هو اللي ياخذ النقطة.", "احسبوا النقاط — وصفّقوا للفايز 👏"],
                    ["واحد يقرأ السؤال", "أسرع جواب صح = نقطة", "احسبوا النقاط 👏"],
                    ("👏", "مين الفايز؟", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                    lambda q: _bk("👨‍👩‍👧‍👦", "أسئلة عائلية", "أسرع جواب صح ياخذ النقطة!"), bg="#07341F", bg2="#0B1F5E")


def cfg_bahar():
    Q = old("BAHAR")
    TW = {"dbl": ("🌶️🌶️ دبل بهارات", "هالجولة فيها كذابين اثنين! (إذا الفريق ٤ أو أكثر)"), "zero": ("🤔 يمكن ما فيه كذاب!", "هالجولة ممكن يكون الكل صادقين… فكّروا زين"),
          "rev": ("🙃 الكذب بالعكس", "الكل يكذب إلا واحد! طلّعوا الصادق"), "ask": ("🕵️ جولة المحقق", "الفريق الثاني يسأل كل واحد سؤال واحد قبل التصويت"),
          "fast": ("⏱️ جولة السرعة", "كل قصة ٣٠ ثانية بس!"), "style": ("🎭 بأسلوب خاص", "")}
    lab = lambda q: TW[q["t"]][0] if q.get("t") else "🌶️ موضوع القصة"
    desc = lambda q: (q.get("s") or TW[q["t"]][1]) if q.get("t") else ""
    return _old_cfg("KatharBaharat", "كثّر بهارات", Q, lab, "لعبة فريقين وقصص",
                    "واحد بس قصته كذب 🌶️ — تقدرون تطلّعونه؟",
                    [f"{num(len(Q))} موضوع قصة", "جولات خاصة 🌶️", "فريقين · ٤ أو أكثر"],
                    ["انقسموا لفريقين متساويين.", "الفريق الأول يتفق بالسر: مين اللي بيكثّر بهارات ويألّف قصة كذب.",
                     "كل واحد يحكي قصة عن الموضوع — والفريق الثاني يطلّع الكذاب.", "كشفتوه؟ النقطة لكم. ما كشفتوه؟ النقطة للفريق الثاني 😏"],
                    ["اسحبوا موضوع القصة", "كل واحد يحكي قصته", "طلّعوا مين كثّر بهارات 🌶️"],
                    ("🌶️", "مين أشطر كذاب؟", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                    lambda q: _bk("🌶️", "كثّر بهارات", desc(q)),
                    extra=lambda q, c: f'<div style="font-weight:800;font-size:10.5pt;color:{c[2]};margin-top:3mm;font-family:Cairo,{E}">{desc(q)}</div>' if desc(q) else "",
                    slide_extra=lambda q, c: _tw(desc(q), c) if desc(q) else "", bg="#4A2A8F")


def cfg_mashaer():
    Q = old("MASHAER"); PEN = old("MASHAER_PEN")
    TY = {"moment": "💞 لحظة", "letter": "✍️ رسالة", "pick": "🎯 سؤالك أنت"}
    return _old_cfg("Mashaer", "مشاعر", Q, lambda q: TY.get(q.get("t"), "💬 سؤال"), "لعبة لشخصين عزيزين",
                    "أسئلة من القلب… ولحظات مع بعض 💞",
                    [f"{num(len(Q))} بطاقة", "أسئلة · لحظات · رسايل", "لشخصين"],
                    ["اختار شخص عزيز عليك وتبادلوا الدور.", "كونوا صريحين — واللي يجاوب جواب مختصر ياخذ حكم 😏",
                     "ما فيه «ما عندي إجابة» في هاللعبة!", "أحكام: " + " · ".join(PEN[:4])],
                    ["تبادلوا الدور", "جاوب من قلبك", "اللحظات والرسايل تسوونها مع بعض 💞"],
                    ("📸", "وثّقوا جلستكم بصورة", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                    lambda q: _bk("💞", "مشاعر", "تحذير: بتعرفون بعض أكثر 💞"), **ROMANCE)


def cfg_nisf():
    Q = old("NISF"); LV = {1: "🌙 أول الليل", 2: "🌌 نص الليل", 3: "🌅 قبل الفجر"}; TY = {"all": "🔄 الكل يجاوب", "pick": "🎯 اختار شخص"}
    lab = lambda q: LV[q["lv"]] + (" · " + TY[q["t"]] if q.get("t") else "")
    return _old_cfg("NisfAllail", "نص الليل", Q, lab, "أسئلة صراحة للسهرة",
                    "كل ما تعمّق الليل… تعمّقت الأسئلة 🌙",
                    [f"{num(len(Q))} سؤال", "٣ مراحل", "شخصين أو أكثر"],
                    ["ابدأوا بـ«أول الليل» وكمّلوا لين «قبل الفجر».", "الجواب بكل صدق وصراحة.",
                     "لكل شخص محاولتين تخطّي بس — استخدمها بحكمة.", "تقدر تخلّي السؤال يدور على الكل 🔄"],
                    ["ابدأوا من «أول الليل» 🌙", "جاوب بصدق وصراحة", "كل ما تعمّق الليل تعمّقت الأسئلة 🌅"],
                    ("🌙", "ولا تنسون توثّقون سهرتكم 📸", "العبوها أونلاين — منطقة الترفيه في إيلان دول"),
                    lambda q: _bk({1: "🌙", 2: "🌌", 3: "🌅"}[q["lv"]], "نص الليل", LV[q["lv"]]), bg="#0B1F5E", bg2="#07080C")


GAMES = {"lawkunt": cfg_lawkunt, "jawib": cfg_jawib, "qulha": cfg_qulha, "couples": cfg_couples,
         "lahad": cfg_lahad, "family": cfg_family, "bahar": cfg_bahar, "mashaer": cfg_mashaer, "nisf": cfg_nisf}


# ---------------------------------------------------------------- builders
def print_pages(C):
    T = C["title"]; items = C["items"]

    FUN, NIGHT = C.get("fun", bp.FUN), C.get("night", bp.NIGHT); cubes = C.get("cubes", bp.cubes)
    def front(i, q):
        c = FUN[i % len(FUN)]
        return f'<div class="card front" dir="rtl" style="--b1:{c[0]};--b2:{c[1]};--ac:{c[2]};--ink:{c[3]};color:{c[3]}">{cubes()}<div class="no">{num(i+1)}</div>{C["pf"](i, q, c)}{bp.brand(T)}</div>'

    def back(i, q):
        n1, n2 = NIGHT[i % len(NIGHT)]
        return f'<div class="card backc" dir="rtl" style="--n1:{n1};--n2:{n2}"><div class="no">{num(i+1)}</div>{C["pb"](i, q)}{bp.brand(T)}</div>'

    rc = C.get("rulesc", ("#FFF3C9", "#FFE08A", "#E0A100", "#5A3D00"))
    rules = (f'<div class="card front" dir="rtl" style="--b1:{rc[0]};--b2:{rc[1]};--ac:{rc[2]};--ink:{rc[3]};color:{rc[3]}">{cubes()}<div style="font-weight:900;font-size:15pt;font-family:Cairo">طريقة اللعب</div>'
             f'<ol style="text-align:right;font-size:9.6pt;line-height:1.8;padding-inline-start:5mm;margin-top:2mm;max-width:115mm;font-family:Cairo,{E}">'
             + "".join(f"<li>{r}</li>" for r in C["rules"]) + f'</ol>{bp.brand(T)}</div>')
    pn = C.get("plainc", ("#4A2A8F", "#0B1F5E"))
    plain = (f'<div class="card backc" style="--n1:{pn[0]};--n2:{pn[1]}"><img src="{LOGO}" style="width:30mm;height:30mm"><div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:10pt;margin-top:2mm">EILAN DOLL</div>'
             f'<div style="font-size:9.5pt;color:rgba(255,248,234,.75);margin-top:1mm;font-family:Cairo">{C["end"][2]}</div></div>')
    fronts = [front(i, q) for i, q in enumerate(items)] + [rules]
    backs = [back(i, q) for i, q in enumerate(items)] + [plain]
    while len(fronts) % 4:
        fronts.append(plain); backs.append(plain)
    total = 1 + len(fronts) // 4
    lab = lambda n, s: f"<b>ورقة {num(n)}/{num(total)}</b> · {s}"
    cover = f'''<section class="pg" dir="rtl" style="background:radial-gradient(60% 70% at 85% 10%,rgba(255,143,177,.35),transparent 60%),radial-gradient(60% 70% at 10% 100%,rgba(61,220,151,.3),transparent 60%),radial-gradient(70% 80% at 50% 50%,{C["bg"]} 0,{C.get("bg2","#251147")} 60%,{C.get("bg3","#07080C")} 100%);color:#FFF8EA">{C.get("coverdeco","")}
<div class="lbl" style="color:rgba(255,248,234,.6)">{lab(1, "الوجه")}</div>
<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;gap:16mm;padding:0 20mm">
<img src="{LOGO}" style="width:80mm;height:80mm;transform:rotate(-8deg);filter:drop-shadow(0 8mm 10mm rgba(0,0,0,.45))">
<div style="max-width:150mm"><div style="font-family:Cairo;font-weight:800;letter-spacing:1px;font-size:11pt;color:#FFD97A">EILAN GAMES · {C["kick"]}</div>
<div style="font-weight:900;font-size:58pt;line-height:1.15;font-family:Cairo">{T}</div>
<div style="font-size:15pt;color:rgba(255,248,234,.85);margin:2mm 0 6mm;font-family:Cairo,{E}">{C["sub"]}</div>
<div style="display:flex;gap:2.4mm;flex-wrap:wrap;font-size:10pt;font-weight:700;font-family:Cairo,{E}">
{"".join(f'<span style="padding:1.6mm 4mm;border-radius:20mm;background:rgba(255,255,255,.1);border:.6pt solid rgba(255,217,122,.6)">{x}</span>' for x in C["chips"] + ["🖨️ اطبع الوجهين"])}</div></div></div>
<div style="position:absolute;bottom:9mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:2.4mm;font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:rgba(255,248,234,.75)"><img src="{LOGO}" style="width:9mm;height:9mm">EILAN DOLL — THE DIGITAL WORLD</div></section>'''
    guide = f'''<section class="pg" dir="rtl"><div class="lbl">{lab(1, "القفا")}</div>
<div style="position:absolute;inset:14mm 18mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm;font-family:Cairo">
<div><div style="font-weight:900;font-size:20pt;margin-bottom:4mm">🖨️ طريقة الطباعة</div>
<ol style="font-size:11pt;line-height:1.95;padding-inline-start:6mm"><li>ورق A4 — والأفضل ورق مقوّى (٢٠٠ جرام).</li><li>اختر: <b>الطباعة على الوجهين</b> · <b>القلب من الحافة القصيرة</b>.</li><li>الحجم الفعلي ١٠٠٪ — بدون «ملاءمة للصفحة».</li></ol></div>
<div><div style="font-weight:900;font-size:20pt;margin-bottom:4mm">✂️ القص — قصّتين بس</div>
<ol style="font-size:11pt;line-height:1.95;padding-inline-start:6mm"><li>كل ورقة فيها ٤ بطاقات.</li><li>قص على الخط المنقّط بالطول، وبعدين بالعرض.</li><li>رقم البطاقة مكتوب على الوجهين — تأكد إنها متطابقة.</li><li>الورقة الأولى (هذي) ما تنقص — هي الغلاف.</li></ol></div></div>
<div style="position:absolute;bottom:9mm;left:0;right:0;text-align:center;font-size:10pt;color:#6E6C5A;font-family:Cairo">تبغونها على الشاشة؟ العبوها داخل موقع إيلان دول — منطقة الترفيه</div></section>'''
    pages = [cover, guide]
    for s in range(0, len(fronts), 4):
        n = 2 + s // 4
        pages.append(bp.sheet(fronts[s:s + 4], lab(n, "الوجه"), rtl=True))
        pages.append(bp.sheet(backs[s:s + 4], lab(n, "القفا"), back=True, rtl=True))
    return pages


def slides(C):
    T = C["title"]; deco = C.get("deco", ba.deco); FUN = C.get("fun", bp.FUN)
    brand = f'<div class="brand" data-el="brand"><img src="{LOGO}"><span>EILAN DOLL · {T}</span></div>'
    S = [(f'''<section class="sl" dir="rtl" style="background:radial-gradient(60% 70% at 85% 10%,rgba(255,143,177,.35),transparent 60%),radial-gradient(60% 70% at 10% 100%,rgba(61,220,151,.3),transparent 60%),radial-gradient(70% 80% at 50% 50%,{C["bg"]} 0,{C.get("bg2","#251147")} 60%,{C.get("bg3","#07080C")} 100%);color:#FFF8EA;flex-direction:row;gap:110px">{C.get("slidedeco","")}
<img data-el="cube" src="{LOGO}" style="width:440px;height:440px;transform:rotate(-8deg);filter:drop-shadow(0 40px 50px rgba(0,0,0,.45))">
<div style="text-align:right;max-width:1050px"><div data-el="kick" style="font-family:Cairo;font-weight:800;font-size:34px;color:#FFD97A">EILAN GAMES · {C["kick"]}</div>
<div data-el="title" style="font-weight:900;font-size:180px;line-height:1.15;font-family:Cairo">{T}</div>
<div data-el="sub" style="font-size:44px;opacity:.85;font-family:Cairo,{E}">{C["sub"]}</div></div>{brand}</section>''',
          '<p:fade thruBlk="1"/>',
          [('auto', [('cube', 'pop', 900, 0), ('kick', 'fade', 600, 300)]), ('after', [('title', 'zoom', 700, 0)]),
           ('after', [('sub', 'rise', 600, 0), ('brand', 'fade', 600, 200)]), ('after', [('cube', 'spin', 1600, 0)])])]
    cards = "".join(f'<div data-el="c{k}" style="width:470px;height:330px;border-radius:48px;background:linear-gradient(160deg,{c[0]},{c[1]});border:3px solid {c[2]};color:{c[3]};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;gap:22px;font-family:Cairo,{E}"><div style="width:96px;height:96px;border-radius:28px;background:{c[2]};color:#fff;display:grid;place-items:center;font-size:52px;font-weight:900">{num(k+1)}</div><div style="font-size:40px;font-weight:900;line-height:1.4">{s}</div></div>'
                    for k, (s, c) in enumerate(zip(C["steps"], FUN[:3])))
    S.append((f'''<section class="sl" dir="rtl" style="background:{C.get("howbg","#FFFFFF")};color:{C.get("howink","#0B1F5E")}"><div data-el="title" style="font-weight:900;font-size:96px;font-family:Cairo;margin-bottom:60px">طريقة اللعب</div>
<div style="display:flex;gap:48px">{cards}</div>{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''',
              '<p:cover dir="l"/>',
              [('auto', [('title', 'rise', 600, 0), ('d1', 'pop', 700, 100), ('d2', 'pop', 700, 250)]),
               ('after', [('c0', 'rise', 550, 0), ('c1', 'rise', 550, 250), ('c2', 'rise', 550, 500)]),
               ('after', [('brand', 'fade', 500, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)])]))
    for i, q in enumerate(C["items"]):
        c = FUN[i % len(FUN)]
        body, st, pul = C["sl"](i, q, c)
        steps = [('auto', [('no', 'pop', 600, 0), ('d1', 'pop', 600, 200), ('d2', 'pop', 600, 300)])] + st + \
                [('after', [(pul, 'pulse', 700, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)])]
        S.append((f'''<section class="sl front" dir="rtl" style="--b1:{c[0]};--b2:{c[1]};--ac:{c[2]};--ink:{c[3]};color:{c[3]};background:linear-gradient(160deg,{c[0]},{c[1]});border:0"><div class="dots"></div><div class="no" data-el="no">{num(i+1)}</div>
{body}{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''', ba.QTRANS[i % len(ba.QTRANS)], steps))
    ic, t1, t2 = C["end"]
    S.append((f'''<section class="sl" dir="rtl" style="background:radial-gradient(70% 80% at 50% 40%,{C["bg"]},{C.get("bg2","#0B1F5E")} 60%,{C.get("bg3","#07080C")});color:#FFF8EA">{C.get("slidedeco","")}
<div data-el="cup" style="font-size:170px">{ic}</div><div data-el="title" style="font-weight:900;font-size:120px;font-family:Cairo">{t1}</div>
<div data-el="sub" style="font-size:44px;opacity:.85;margin-top:20px;font-family:Cairo">{t2}</div>
{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''',
              '<p:zoom/>',
              [('auto', [('cup', 'pop', 900, 0), ('d1', 'pop', 600, 200), ('d2', 'pop', 600, 300)]),
               ('after', [('title', 'zoom', 600, 0)]), ('after', [('sub', 'rise', 600, 0), ('brand', 'fade', 500, 0)]),
               ('after', [('cup', 'pulse', 600, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)])]))
    return S


def render_pdf(path, html):
    with tempfile.NamedTemporaryFile("w", suffix=".html", delete=False, encoding="utf-8") as f:
        f.write(html); tmp = f.name
    subprocess.run(["google-chrome", "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer", "--allow-file-access-from-files",
                    f"--print-to-pdf={path}", "--virtual-time-budget=8000", f"file://{tmp}"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("built", path.name)


def build(game):
    C = GAMES[game](); out = PRIV / game; out.mkdir(parents=True, exist_ok=True)
    stem = f"Eilan-{C['file']}"
    render_pdf(out / f"{stem}-Print-AR.pdf",
               f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{bp.CSS}</style></head><body>{"".join(print_pages(C))}</body></html>')
    S = slides(C)
    css = ba.CSS + "@page{size:1920px 1080px;margin:0}.sl{display:flex!important;page-break-after:always}.sl:last-child{page-break-after:auto}"
    pages = []
    for h, *_ in S:  # a slide with a tap-to-reveal part becomes two pages: hidden, then revealed
        for el in ("ans", "tw"):
            if f'data-el="{el}"' in h:
                pages.append(h.replace(f'data-el="{el}" style="', f'data-el="{el}" style="visibility:hidden;', 1))
        pages.append(h)
    render_pdf(out / f"{stem}-Show-AR.pdf", f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{css}</style></head><body>{"".join(pages)}</body></html>')
    with tempfile.TemporaryDirectory() as td:
        td = pathlib.Path(td)
        man = ba.capture(S, "ar", td)
        raw = ba.place(man, f"{stem}-Animated-AR", td)
        ba.animate(raw, S, out / f"{stem}-Animated-AR.pptx", rtl=True)


if __name__ == "__main__":
    for g in sys.argv[1:] or list(GAMES):
        build(g)
