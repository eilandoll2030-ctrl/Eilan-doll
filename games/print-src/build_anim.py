"""Animated PowerPoint version of «خمّن؟» / «Guess?» — real slide transitions + element animations.

  python3 games/print-src/build_anim.py
Output (games/pdf/): Eilan-Khammen-Animated-AR.pptx · Eilan-Guess-Animated-EN.pptx

How it works: every slide is drawn in HTML (same look as build_show.py), then each piece
(background, number, title, tiles, "+", "= ??", badge, cubes…) is captured as its own transparent
picture, so Arabic fonts and emoji look identical on any computer. The pictures are placed in a
pptx with pptxgenjs, then native PowerPoint transitions and animations are written into each slide.
Works in PowerPoint and Keynote (Google Slides keeps transitions, ignores most animations).
"""
import json, pathlib, re, subprocess, sys, tempfile, zipfile, shutil

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import build_print as bp  # noqa: E402
from build_show import CSS as SHOW_CSS  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402

OUT = bp.OUT
W, H = 1920, 1080
PX_IN = 192  # LAYOUT_16x9 = 10in wide → 1920px / 10

CSS = SHOW_CSS + """
html,body{margin:0;background:transparent}
.sl{display:none}.sl.on{display:flex}
.badge{position:absolute;bottom:170px;right:250px;width:330px;height:90px;border-radius:45px;color:#fff;font-weight:900;font-size:38px;display:grid;place-items:center;box-shadow:0 8px 0 rgba(0,0,0,.15)}
.deco{position:absolute;opacity:.92}
"""
BADGES_AR = ['⏱️ أسرع واحد يرد!', '🤔 فكّروا زين!', '👀 ركّزوا!', '💡 فكّر بالصوت!', '⚡ بسرعة!',
             '🧠 شغّلوا مخكم!', '😏 متأكدين؟', '🔥 قرّبتوا!', '🎯 مين أسرع؟', '🏆 آخر سؤال!']
BADGES_EN = ['⏱️ Fastest wins!', '🤔 Think hard!', '👀 Focus!', '💡 Say it out loud!', '⚡ Quick!',
             '🧠 Brains on!', '😏 Sure?', '🔥 So close!', '🎯 Who’s fastest?', '🏆 Last one!']
BADGE_COL = ['#1E44C8', '#E5487A', '#7B4FE0', '#2F6BE8', '#13A86B', '#E0A100']
QTRANS = ['<p:push dir="u"/>', '<p:cover dir="l"/>', '<p:push dir="r"/>', '<p:wipe dir="d"/>']


def deco(name, top, left, size, rot):
    return f'<img data-el="{name}" class="deco" src="{bp.LOGO}" style="top:{top}px;left:{left}px;width:{size}px;height:{size}px;transform:rotate({rot}deg)">'


def slides(lang):
    """Returns [(html, transition_xml, steps)]. steps = [(trigger, [(el, effect, dur, delay)])]."""
    ar = lang == "ar"
    Q = bp.qs(lang); d = "rtl" if ar else "ltr"; fam = "Cairo" if ar else "Poppins"
    num = (lambda n: str(n).translate(bp.AR_DIG)) if ar else str
    brand = f'<div class="brand" data-el="brand"><img src="{bp.LOGO}"><span>EILAN DOLL · {"خمّن؟" if ar else "GUESS?"}</span></div>'

    def tile(t, el, rt):
        emoji = not re.match(r"^[A-Za-z0-9؀-ۿ]+$", t)
        fs = 150 if emoji else (128 if len(t) < 3 else (90 if len(t) < 5 else 70))
        return f'<div data-el="{el}" style="--rt:{rt}deg"><div class="tl" style="font-size:{fs}px;font-family:{fam},\'Noto Color Emoji\'">{t}</div></div>'

    S = []
    S.append((f'''<section class="sl" dir="{d}" style="background:radial-gradient(60% 70% at 85% 10%,rgba(255,143,177,.35),transparent 60%),radial-gradient(60% 70% at 10% 100%,rgba(61,220,151,.3),transparent 60%),radial-gradient(70% 80% at 50% 50%,#1E44C8 0,#251147 60%,#07080C 100%);color:#FFF8EA;flex-direction:row;gap:120px">
<div data-el="cube" style="transform:rotate(-6deg);filter:drop-shadow(0 40px 50px rgba(0,0,0,.45))">{bp.cube('g-guess', 520, '#FFF8EA')}</div>
<div style="text-align:{'right' if ar else 'left'}"><div data-el="kick" style="font-family:Poppins;font-weight:800;letter-spacing:8px;font-size:26px;color:#FFD97A">EILAN GAMES</div>
<div data-el="title" style="font-weight:900;font-size:190px;line-height:1.1;font-family:{fam}">{'خمّن؟' if ar else 'Guess?'}</div>
<div data-el="sub" style="font-size:44px;opacity:.85;font-family:{fam}">{'طلّع اسم البلد من الإيموجي والحروف' if ar else 'Find the country from emojis & letters'}</div></div>{brand}</section>''',
              '<p:fade thruBlk="1"/>',
              [('auto', [('cube', 'pop', 900, 0), ('kick', 'fade', 600, 300)]),
               ('after', [('title', 'zoom', 700, 0)]),
               ('after', [('sub', 'rise', 600, 0), ('brand', 'fade', 600, 200)]),
               ('after', [('cube', 'spin', 1600, 0)])]))
    steps = (['اعرضوا الملف على الشاشة', 'أسرع واحد يقول اسم البلد صح ياخذ النقطة', 'اضغطوا عشان يطلع الحل وتحدي الفوز 🏆'] if ar
             else ['Show this file on a screen', 'Fastest correct answer wins the point', 'Tap to reveal the answer & the winner’s reward 🏆'])
    cards = ''.join(f'<div data-el="c{k}" style="width:470px;height:330px;border-radius:48px;background:linear-gradient(160deg,{c[0]},{c[1]});border:3px solid {c[2]};color:{c[3]};display:flex;flex-direction:column;align-items:center;justify-content:center;padding:36px;gap:22px;font-family:{fam}"><div style="width:96px;height:96px;border-radius:28px;background:{c[2]};color:#fff;display:grid;place-items:center;font-size:52px;font-weight:900">{num(k+1)}</div><div style="font-size:40px;font-weight:900;line-height:1.4">{s}</div></div>'
                    for k, (s, c) in enumerate(zip(steps, bp.FUN[:3])))
    S.append((f'''<section class="sl" dir="{d}" style="background:#FFFFFF;color:#0B1F5E"><div data-el="title" style="font-weight:900;font-size:96px;font-family:{fam};margin-bottom:60px">{'طريقة اللعب' if ar else 'How to play'}</div>
<div style="display:flex;gap:48px">{cards}</div>{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''',
              '<p:cover dir="l"/>',
              [('auto', [('title', 'rise', 600, 0), ('d1', 'pop', 700, 100), ('d2', 'pop', 700, 250)]),
               ('after', [('c0', 'rise', 550, 0), ('c1', 'rise', 550, 250), ('c2', 'rise', 550, 500)]),
               ('after', [('brand', 'fade', 500, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)])]))
    badges = BADGES_AR if ar else BADGES_EN
    for i, q in enumerate(Q):
        b1, b2, ac, ink = bp.FUN[i % len(bp.FUN)]
        n1, n2 = bp.NIGHT[i % len(bp.NIGHT)]
        bc = BADGE_COL[i % len(BADGE_COL)]
        first, second = ('tA', 'tB')
        S.append((f'''<section class="sl front" dir="{d}" style="--b1:{b1};--b2:{b2};--ac:{ac};--ink:{ink};color:{ink};background:linear-gradient(160deg,{b1},{b2});border:0"><div class="dots"></div><div class="no" data-el="no">{num(i+1)}</div>
<div data-el="title" style="font-weight:900;font-size:84px;margin-bottom:56px;font-family:{fam}">{'ما هو البلد؟' if ar else 'Which country?'}</div>
<div style="display:flex;align-items:center;gap:56px">{tile(q[0], first, -4)}<span data-el="plus" style="font-size:130px;font-weight:900;color:{ac}">+</span>{tile(q[1], second, 4)}</div>
<div data-el="eq" style="font-size:120px;font-weight:900;color:{ac};margin-top:30px;font-family:{fam}">= {'؟؟' if ar else '??'}</div>
<div data-el="badge" class="badge" style="background:{bc};font-family:{fam},'Noto Color Emoji'">{badges[i % len(badges)]}</div>
{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''',
                  QTRANS[i % len(QTRANS)],
                  [('auto', [('no', 'pop', 600, 0), ('title', 'rise', 600, 150), ('d1', 'pop', 600, 200), ('d2', 'pop', 600, 300)]),
                   ('after', [(first, 'flyS', 650, 0)]),
                   ('after', [('plus', 'pop', 450, 0)]),
                   ('after', [(second, 'flyE', 650, 0)]),
                   ('after', [('eq', 'zoom', 500, 0), ('brand', 'fade', 500, 0)]),
                   ('after', [('badge', 'pop', 600, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)]),
                   ('after', [('eq', 'pulse', 600, 0)])]))
        eq = q[2] or f"{q[0]} + {q[1]}"
        S.append((f'''<section class="sl backc" dir="{d}" style="--n1:{n1};--n2:{n2}"><div class="stars"></div><div class="no" data-el="no">{num(i+1)}</div>
<div data-el="lbl" style="font-family:Poppins;font-weight:800;letter-spacing:10px;font-size:34px;color:#FFD97A">{'الحل' if ar else 'ANSWER'}</div>
<div data-el="ans" style="font-weight:900;font-size:220px;line-height:1.15;font-family:{fam}">{q[3]}</div>
<div data-el="eqs" style="font-size:52px;opacity:.75;margin-bottom:46px;font-family:{fam},'Noto Color Emoji'">{eq}</div>
<div data-el="win" style="background:rgba(255,248,234,.1);border:2px solid rgba(255,217,122,.6);border-radius:36px;padding:26px 52px;max-width:1300px;font-size:44px;line-height:1.5;font-family:{fam},'Noto Color Emoji'"><b style="color:#FFD97A">{'تحدي الفوز' if ar else 'Winner’s reward'}: </b>{q[4]}</div>
<div data-el="tap" style="position:absolute;bottom:110px;font-size:30px;color:#FFD97A;font-weight:700;font-family:{fam},'Noto Color Emoji'">{'👆 اضغط عشان يطلع الحل' if ar else '👆 Tap to reveal'}</div>{brand}</section>''',
                  '<p:fade/>',
                  [('auto', [('no', 'pop', 500, 0), ('lbl', 'fade', 500, 100), ('brand', 'fade', 500, 100), ('tap', 'fade', 500, 400)]),
                   ('after', [('tap', 'pulse', 700, 0)]),
                   ('click', [('tap', 'out', 300, 0), ('ans', 'pop', 800, 0)]),
                   ('after', [('eqs', 'fade', 500, 0)]),
                   ('after', [('win', 'rise', 600, 0)])]))
    S.append((f'''<section class="sl" dir="{d}" style="background:radial-gradient(70% 80% at 50% 40%,#4A2A8F,#0B1F5E 60%,#07080C);color:#FFF8EA">
<div data-el="cup" style="font-size:170px">🏆</div><div data-el="title" style="font-weight:900;font-size:120px;font-family:{fam}">{'مين الفايز؟' if ar else 'Who won?'}</div>
<div data-el="sub" style="font-size:44px;opacity:.85;margin-top:20px;font-family:{fam}">{'العبوها أونلاين بمؤقّت وموسيقى — منطقة الترفيه في إيلان دول' if ar else 'Play online with a timer & music — Eilan Doll fun zone'}</div>
{deco('d1', 60, 80, 120, -12)}{deco('d2', 830, 1690, 140, 14)}{brand}</section>''',
              '<p:zoom/>',
              [('auto', [('cup', 'pop', 900, 0), ('d1', 'pop', 600, 200), ('d2', 'pop', 600, 300)]),
               ('after', [('title', 'zoom', 600, 0)]),
               ('after', [('sub', 'rise', 600, 0), ('brand', 'fade', 500, 0)]),
               ('after', [('cup', 'pulse', 600, 0), ('d1', 'wiggle', 900, 0), ('d2', 'wiggle', 900, 0)])]))
    return S


def shrink(f):
    """Palette PNG with alpha (≈4× smaller, looks the same)."""
    from PIL import Image
    im = Image.open(f).convert("RGBA")
    im.quantize(colors=256, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(f, optimize=True)


# ---------- 1) capture layers ----------
def capture(S, lang, td):
    page = td / f"page-{lang}.html"
    page.write_text(f'<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(s[0] for s in S)}</body></html>', encoding="utf-8")
    man = []
    with sync_playwright() as p:
        b = p.chromium.launch(args=["--allow-file-access-from-files"])
        pg = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
        pg.goto(f"file://{page}"); pg.wait_for_timeout(1200)
        for si in range(len(S)):
            pg.evaluate("i=>{document.querySelectorAll('.sl').forEach((s,k)=>s.classList.toggle('on',k===i))}", si)
            pg.evaluate("()=>document.fonts.ready")
            sec = f".sl.on"
            # background: hide every animated piece
            pg.evaluate("()=>document.querySelectorAll('.sl.on [data-el]').forEach(e=>e.style.visibility='hidden')")
            bg = td / f"{lang}-{si:02d}-bg.jpg"; pg.screenshot(path=str(bg), type="jpeg", quality=88)
            names = pg.evaluate("()=>[...document.querySelectorAll('.sl.on [data-el]')].map(e=>e.dataset.el)")
            els = []
            # transparent stage
            pg.evaluate("""()=>{const s=document.querySelector('.sl.on');s.dataset.bgs=s.getAttribute('style');
              s.style.background='transparent';s.querySelectorAll('.dots,.stars').forEach(e=>e.style.display='none')}""")
            for n in names:
                box = pg.evaluate("""n=>{const s=document.querySelector('.sl.on');s.querySelectorAll('[data-el]').forEach(e=>e.style.visibility='hidden');
                  const e=s.querySelector(`[data-el="${n}"]`);e.style.visibility='visible';const r=e.getBoundingClientRect();return [r.x,r.y,r.width,r.height]}""", n)
                pad = 40
                x = max(0, box[0] - pad); y = max(0, box[1] - pad)
                w = min(W, box[0] + box[2] + pad) - x; h = min(H, box[1] + box[3] + pad) - y
                f = td / f"{lang}-{si:02d}-{n}.png"
                pg.screenshot(path=str(f), clip={"x": x, "y": y, "width": w, "height": h}, omit_background=True)
                shrink(f)
                els.append({"name": n, "file": str(f), "x": x / PX_IN, "y": y / PX_IN, "w": w / PX_IN, "h": h / PX_IN})
            pg.evaluate("""()=>{const s=document.querySelector('.sl.on');s.setAttribute('style',s.dataset.bgs);
              s.querySelectorAll('.dots,.stars').forEach(e=>e.style.display='');s.querySelectorAll('[data-el]').forEach(e=>e.style.visibility='')}""")
            man.append({"bg": str(bg), "els": els})
        b.close()
    return man


# ---------- 2) place pictures ----------
def place(man, stem, td):
    out = td / f"{stem}.pptx"
    js = td / f"{stem}.js"
    js.write_text("""const P=require('pptxgenjs');const fs=require('fs');const p=new P();p.layout='LAYOUT_16x9';
p.title=%s;p.author='EILAN DOLL';p.company='EILAN DOLL';const man=%s;
const img=f=>(f.endsWith('.jpg')?'image/jpeg':'image/png')+';base64,'+fs.readFileSync(f).toString('base64');
for(const s of man){const sl=p.addSlide();sl.addImage({data:img(s.bg),x:0,y:0,w:10,h:5.625,objectName:'bg',altText:'background'});
 for(const e of s.els){sl.addImage({data:img(e.file),x:e.x,y:e.y,w:e.w,h:e.h,objectName:'el_'+e.name,altText:e.name});}}
p.writeFile({fileName:%s}).then(()=>console.log('placed'));""" % (json.dumps(stem), json.dumps(man), json.dumps(str(out))), encoding="utf-8")
    subprocess.run(["node", str(js)], check=True, cwd="/tmp/fonts")
    return out


# ---------- 3) transitions + animations ----------
class Anim:
    def __init__(self):
        self.id = 2

    def nid(self):
        self.id += 1
        return self.id

    def _vis(self, sp):
        return (f'<p:set><p:cBhvr><p:cTn id="{self.nid()}" dur="1" fill="hold"><p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>'
                f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr>'
                f'<p:to><p:strVal val="visible"/></p:to></p:set>')

    def _fade(self, sp, dur, direction="in"):
        return (f'<p:animEffect transition="{direction}" filter="fade"><p:cBhvr><p:cTn id="{self.nid()}" dur="{dur}"/>'
                f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl></p:cBhvr></p:animEffect>')

    def _anim(self, sp, dur, attr, vals, extra=""):
        tav = ''.join(f'<p:tav tm="{tm}"><p:val><p:strVal val="{v}"/></p:val></p:tav>' for tm, v in vals)
        return (f'<p:anim calcmode="lin" valueType="num"><p:cBhvr additive="base"><p:cTn id="{self.nid()}" dur="{dur}" fill="hold"{extra}/>'
                f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl><p:attrNameLst><p:attrName>{attr}</p:attrName></p:attrNameLst></p:cBhvr>'
                f'<p:tavLst>{tav}</p:tavLst></p:anim>')

    def effect(self, sp, kind, dur, delay, node):
        dec = ' decel="100000"'
        if kind == 'fade':
            pid, cls, sub, body = 10, 'entr', 0, self._vis(sp) + self._fade(sp, dur)
        elif kind == 'zoom':
            pid, cls, sub, body = 53, 'entr', 16, (self._vis(sp) + self._anim(sp, dur, 'ppt_w', [(0, '0'), (100000, '#ppt_w')], dec)
                                                    + self._anim(sp, dur, 'ppt_h', [(0, '0'), (100000, '#ppt_h')], dec) + self._fade(sp, dur))
        elif kind == 'pop':
            pid, cls, sub, body = 53, 'entr', 16, (self._vis(sp) + self._anim(sp, dur, 'ppt_w', [(0, '0'), (65000, '#ppt_w*1.18'), (100000, '#ppt_w')])
                                                    + self._anim(sp, dur, 'ppt_h', [(0, '0'), (65000, '#ppt_h*1.18'), (100000, '#ppt_h')]) + self._fade(sp, dur // 2))
        elif kind == 'rise':
            pid, cls, sub, body = 42, 'entr', 0, (self._vis(sp) + self._anim(sp, dur, 'ppt_y', [(0, '#ppt_y+0.12'), (100000, '#ppt_y')], dec) + self._fade(sp, dur))
        elif kind in ('flyS', 'flyE'):  # fly in from the reading start side / end side
            from_right = (kind == 'flyS') == self.rtl
            start = '1+#ppt_w/2' if from_right else '0-#ppt_w/2'
            pid, cls, sub, body = 2, 'entr', (2 if from_right else 8), (self._vis(sp) + self._anim(sp, dur, 'ppt_x', [(0, start), (100000, '#ppt_x')], dec)
                                                                         + self._anim(sp, dur, 'ppt_y', [(0, '#ppt_y'), (100000, '#ppt_y')]))
        elif kind == 'out':
            pid, cls, sub = 10, 'exit', 0
            body = (self._fade(sp, dur, "out") +
                    f'<p:set><p:cBhvr><p:cTn id="{self.nid()}" dur="1" fill="hold"><p:stCondLst><p:cond delay="{dur - 1}"/></p:stCondLst></p:cTn>'
                    f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl><p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst></p:cBhvr>'
                    f'<p:to><p:strVal val="hidden"/></p:to></p:set>')
        elif kind == 'pulse':
            pid, cls, sub = 6, 'emph', 0
            body = (f'<p:animScale><p:cBhvr><p:cTn id="{self.nid()}" dur="{dur}" autoRev="1" repeatCount="indefinite" fill="hold"/>'
                    f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl></p:cBhvr><p:by x="112000" y="112000"/></p:animScale>')
        elif kind == 'wiggle':
            pid, cls, sub = 8, 'emph', 0
            body = (f'<p:animRot by="1200000"><p:cBhvr><p:cTn id="{self.nid()}" dur="{dur}" autoRev="1" repeatCount="indefinite" fill="hold"/>'
                    f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl><p:attrNameLst><p:attrName>r</p:attrName></p:attrNameLst></p:cBhvr></p:animRot>')
        elif kind == 'spin':
            pid, cls, sub = 8, 'emph', 0
            body = (f'<p:animRot by="21600000"><p:cBhvr><p:cTn id="{self.nid()}" dur="{dur}" fill="hold"/>'
                    f'<p:tgtEl><p:spTgt spid="{sp}"/></p:tgtEl><p:attrNameLst><p:attrName>r</p:attrName></p:attrNameLst></p:cBhvr></p:animRot>')
        else:
            raise ValueError(kind)
        cid = self.nid()
        return (f'<p:par><p:cTn id="{cid}" presetID="{pid}" presetClass="{cls}" presetSubtype="{sub}" fill="hold" grpId="0" nodeType="{node}">'
                f'<p:stCondLst><p:cond delay="{delay}"/></p:stCondLst><p:childTnLst>{body}</p:childTnLst></p:cTn></p:par>')

    def timing(self, steps, ids, rtl):
        """Groups: a 'click' step opens a new click group; 'auto'/'after' chain after the previous step."""
        self.id, self.rtl = 2, rtl
        groups, cur = [], None
        for trig, effs in steps:
            if trig == 'click' or cur is None:
                cur = {"trig": trig, "steps": []}; groups.append(cur)
            cur["steps"].append(effs)
        gx = []
        for g in groups:
            gid = self.nid()
            t, inner = 0, []
            for k, effs in enumerate(g["steps"]):
                pid = self.nid()
                parts, end = [], 0
                for j, (el, kind, dur, delay) in enumerate(effs):
                    node = ('clickEffect' if g["trig"] == 'click' else 'afterEffect') if (k == 0 and j == 0) else ('afterEffect' if j == 0 else 'withEffect')
                    parts.append(self.effect(ids[el], kind, dur, delay, node))
                    if kind not in ('pulse', 'wiggle'):
                        end = max(end, delay + dur)
                inner.append(f'<p:par><p:cTn id="{pid}" fill="hold"><p:stCondLst><p:cond delay="{t}"/></p:stCondLst><p:childTnLst>{"".join(parts)}</p:childTnLst></p:cTn></p:par>')
                t += end
            cond = '<p:cond delay="indefinite"/>' + ('<p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond>' if g["trig"] != 'click' else '')
            gx.append(f'<p:par><p:cTn id="{gid}" fill="hold"><p:stCondLst>{cond}</p:stCondLst><p:childTnLst>{"".join(inner)}</p:childTnLst></p:cTn></p:par>')
        return ('<p:timing><p:tnLst><p:par><p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
                '<p:seq concurrent="1" nextAc="seek"><p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
                + ''.join(gx) +
                '</p:childTnLst></p:cTn><p:prevCondLst><p:cond evt="onPrev" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
                '<p:nextCondLst><p:cond evt="onNext" delay="0"><p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst></p:seq>'
                '</p:childTnLst></p:cTn></p:par></p:tnLst></p:timing>')


def animate(pptx, S, final, rtl):
    td = pptx.parent / (pptx.stem + "_x"); shutil.rmtree(td, ignore_errors=True)
    zipfile.ZipFile(pptx).extractall(td)
    A = Anim()
    for i, (_, trans, steps) in enumerate(S):
        f = td / "ppt" / "slides" / f"slide{i+1}.xml"
        x = f.read_text(encoding="utf-8")
        ids = {m.group(2)[3:]: m.group(1) for m in re.finditer(r'<p:cNvPr id="(\d+)" name="(el_[^"]+)"', x)}
        x = re.sub(r'<p:transition[^>]*/>|<p:transition.*?</p:transition>|<p:timing>.*?</p:timing>', '', x, flags=re.S)
        add = f'<p:transition spd="med">{trans}</p:transition>' + A.timing(steps, ids, rtl)
        x = x.replace('</p:clrMapOvr>', '</p:clrMapOvr>' + add, 1) if '</p:clrMapOvr>' in x else x.replace('</p:cSld>', '</p:cSld>' + add, 1)
        f.write_text(x, encoding="utf-8")
    final.unlink(missing_ok=True)
    with zipfile.ZipFile(final, "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(td.rglob("*")):
            if p.is_file():
                z.write(p, p.relative_to(td).as_posix())
    shutil.rmtree(td)
    print("built", final.name, f"{final.stat().st_size/1e6:.1f} MB")


def build(stem, lang):
    S = slides(lang)
    with tempfile.TemporaryDirectory() as td:
        td = pathlib.Path(td)
        man = capture(S, lang, td)
        raw = place(man, stem, td)
        animate(raw, S, OUT / f"{stem}.pptx", rtl=(lang == "ar"))


if __name__ == "__main__":
    langs = sys.argv[1:] or ["ar", "en"]
    if "ar" in langs:
        build("Eilan-Khammen-Animated-AR", "ar")
    if "en" in langs:
        build("Eilan-Guess-Animated-EN", "en")
