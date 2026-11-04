"""Build the two sellable PDFs of the Eilan visual bundle (A4 landscape, iPad + print):
  1) Eilan-Visual-Workbook.pdf  — cover, how-to, tappable index, then per format: filled example + blank page to write on
  2) Eilan-Visual-Prompts-AR.pdf — original Arabic master prompt + 14 prompts with uses
Run from the repo root with a local server on :8765 (python3 -m http.server 8765):
  python3 visual/print-src/build_pdfs.py  → visual/pdf-out/ (NOT committed: these are paid files for Salla)
"""
import json, pathlib, base64, sys
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parents[2]
OUT = ROOT / "visual" / "pdf-out"; OUT.mkdir(exist_ok=True)
FONTS = ROOT / "coloring" / "fonts"
URL = "http://localhost:8765/"
ORDER = ['tree', 'iceberg', 'timeline', 'roadmap', 'cycle', 'layers', 'matrix', 'canvas', 'info', 'notes', 'blueprint', 'exploded', 'diagram', 'sketch']
D = '............................'
d = '..................'
BLANK = {
 'tree': {'title': 'الموضوع: ' + d, 'roots': f'{d}\n{d}\n{d}', 'trunk': D, 'branches': '\n'.join([f'{d} | {D}'] * 5), 'fruit': D},
 'iceberg': {'title': 'الموضوع: ' + d, 'top': f'{d}\n{d}\n{d}', 'mid': f'{D}\n{D}\n{D}', 'deep': f'{D}\n{D}\n{D}\n{D}', 'insight': D},
 'timeline': {'title': 'الموضوع: ' + d, 'events': '\n'.join(['.... | ' + d + ' | ' + d] * 7), 'next': d},
 'roadmap': {'title': 'الهدف: ' + d, 'steps': '\n'.join([f'{d} | {d}'] * 6), 'blocks': f'{d} | {d}\n{d} | {d}', 'goal': d},
 'cycle': {'title': 'الموضوع: ' + d, 'stages': '\n'.join([f'{d} | {d}'] * 5), 'center': '........'},
 'layers': {'title': 'الموضوع: ' + d, 'layers': '\n'.join([f'{d} | {D}'] * 6)},
 'matrix': {'title': 'القرار: ' + d, 'opts': '........، ........، ........', 'crit': '\n'.join([f'{d} | .. | ..، ..، ..'] * 5), 'why': ''},
 'canvas': dict({'title': 'الفكرة: ' + d, 'risk': D}, **{f'b{i}': f'{d}\n{d}\n{d}' for i in range(1, 10)}),
 'info': {'title': 'العنوان: ' + d, 'sub': D, 'big': '..', 'bigl': D, 'secs': '\n'.join([f'.... | {d}'] * 6), 'take': D},
 'notes': {'title': d, 'pts': '\n'.join([D + D] * 5), 'key': '........', 'sticky': d},
 'blueprint': {'title': 'النظام: ' + d, 'parts': '\n'.join([f'{d} | {d}'] * 5), 'notes': f'{D}{D}\n{D}{D}\n{D}{D}', 'ver': 'v1.0'},
 'exploded': {'title': 'نفكّك: ' + d, 'parts': '\n'.join([f'{d} | {D}'] * 6)},
 'diagram': {'title': 'الموضوع: ' + d, 'center': '........', 'parts': '\n'.join([f'{d} | {d}'] * 6), 'flow': d},
 'sketch': {'title': d, 'ideas': '\n'.join([f'{d} | {d}'] * 8), 'quote': D + D, 'terms': '......، ......، ......'},
}
TIPS = {
 'tree': ['ابدأ من الجذور: وش الأساسات اللي لازم تعرفها أول؟', 'الجذع جملة وحدة تلخّص الموضوع كله.', 'الفروع أقسام، والأوراق أمثلة قصيرة.'],
 'iceberg': ['فوق الماء: اللي يلاحظه أي أحد.', 'تحت السطح: تفاصيل يعرفها المهتمين.', 'القاع: السبب الحقيقي اللي محد يتكلم عنه.'],
 'timeline': ['رتّب الأحداث من الأقدم للأحدث.', 'كل حدث: تاريخ + عنوان + أثر بكلمات قليلة.', 'ظلّل أهم حدثين عشان يبرزون.'],
 'roadmap': ['اكتب الهدف عند العلم أول.', 'كل محطة لها علامة تعرف فيها إنك خلّصتها.', 'العقبات تكتبها مع طريقة تجاوزها.'],
 'cycle': ['المراحل لازم ترجع لأول مرحلة.', 'في النص: وش تطلع لك الدورة؟', 'علّم المرحلة اللي يوقف عندها أغلب الناس.'],
 'layers': ['الأساس تحت، وكل طبقة تعتمد على اللي تحتها.', 'اسم الطبقة + وظيفتها في سطر.', 'اسأل: لو شلت هالطبقة وش يطيح؟'],
 'matrix': ['اكتب الخيارات فوق والمعايير على اليمين.', 'وزن كل معيار من ١ إلى ٥، والدرجة من ١٠.', 'اضرب الدرجة بالوزن واجمع — الأعلى يفوز.'],
 'canvas': ['جملتين أو ثلاث بكل مربع، بدون فقرات.', 'ابدأ بالمشكلة والعميل قبل الحل.', 'اكتب أخطر افتراض وجرّبه أول.'],
 'info': ['رقم كبير واحد يشد العين.', '٤-٦ أقسام: رقم أو حقيقة + سطر قصير.', 'اختم بخلاصة وحدة تنحفظ.'],
 'notes': ['٥ نقاط بس — كل نقطة سطر.', 'دوّر على الكلمة الأهم بالأحمر.', 'الورقة اللاصقة: أهم فكرة لو نسيت كل شي.'],
 'blueprint': ['قسّم النظام لمكوّنات بالترتيب.', 'تحت كل مكوّن: وقت أو تكلفة أو أداة.', 'الملاحظات المرقّمة تشرح القواعد.'],
 'exploded': ['اكتب القطع بالترتيب من فوق لتحت.', 'كل قطعة: رقم + اسم + وظيفة.', 'نجمة للقطعة اللي يعتمد عليها الكل.'],
 'diagram': ['الشيء الأساسي في النص.', 'كل جزء حوله مع شرح قصير.', 'السهم المنقّط يوضّح وش اللي يتدفق.'],
 'sketch': ['عنوان في البانر فوق.', 'كل فكرة بمربع ورسمة صغيرة.', 'اقتباس واحد ومصطلحات في الأسفل.'],
}

CSS = f"""
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_700Bold.ttf');font-weight:700}}
@font-face{{font-family:Cairo;src:url('file://{FONTS}/Cairo_900Black.ttf');font-weight:900}}
@font-face{{font-family:Poppins;src:url('file://{FONTS}/Poppins_800ExtraBold.ttf');font-weight:800}}
@page{{size:297mm 210mm;margin:0}}
*{{box-sizing:border-box;margin:0;padding:0}}
html{{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
body{{font-family:Cairo,"Noto Color Emoji",sans-serif;color:#1F3A2B}}
.pg{{width:297mm;height:210mm;position:relative;overflow:hidden;page-break-after:always;background:#FBF8F0}}
.pg:last-child{{page-break-after:auto}}
.dark{{background:radial-gradient(120% 100% at 50% 120%,#2E5C43 0,#1A2A20 50%,#14150F 100%);color:#EFE9DA}}
.eb{{font-family:Poppins;font-weight:800;letter-spacing:4px;font-size:9pt;color:#B58A2E}}
.dark .eb{{color:#E8B64A}}
.cubes{{display:flex;gap:2mm}}.cubes i{{width:4mm;height:4mm;border-radius:1.2mm;display:block}}
.bar{{position:absolute;top:7mm;left:10mm;right:10mm;display:flex;justify-content:space-between;align-items:center;font-size:8.5pt;font-weight:700;color:#8E8A70;z-index:2}}
.bar a{{color:#2F7A52;text-decoration:none;font-weight:900;border:.6pt solid #C9D8C3;border-radius:10mm;padding:.8mm 3.4mm;background:#fff}}
.svgwrap{{position:absolute;left:0;right:0;top:14mm;bottom:9mm;display:flex;align-items:center;justify-content:center}}
.svgwrap svg{{width:100%;height:100%}}
.tip{{position:absolute;bottom:2.6mm;right:12mm;left:12mm;font-size:8.5pt;color:#6E6C5A;text-align:center;z-index:2}}
code,.pr{{font-family:Cairo;}}
"""
RAMP = ['#F6E3A8', '#E8B64A', '#4B2A7B', '#6FA37C', '#2F7A52']
cubes = '<div class="cubes">' + ''.join(f'<i style="background:{c}"></i>' for c in RAMP) + '</div>'


def page_pdf(pw, html, out):
    b = pw.chromium.launch(); pg = b.new_page()
    tmp = OUT / '_tmp.html'; tmp.write_text(html, encoding='utf-8')
    pg.goto(f'file://{tmp}'); pg.wait_for_timeout(1200)
    pg.pdf(path=str(out), width='297mm', height='210mm', print_background=True, prefer_css_page_size=True)
    b.close(); tmp.unlink(); print('built', out.name)


def workbook(pw, svgs, logo, names, best):
    P = []
    P.append(f'''<section class="pg dark" dir="rtl"><div style="position:absolute;top:16mm;left:16mm">{cubes}</div>
<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 24mm;gap:5mm">
<div class="eb">EILAN VISUAL WORKBOOK · دفتر إيلان البصري</div>
<div style="font-weight:900;font-size:50pt;line-height:1.15">دفتر إيلان <span style="color:#E8B64A">البصري</span></div>
<div style="font-size:16pt;color:#C9D8C3;max-width:180mm">١٤ قالب يحوّل أي درس أو فكرة أو مشروع إلى رسمة تنحفظ — مثال جاهز لكل قالب، وصفحة فاضية تعبّيها بيدك.</div>
<div style="display:flex;gap:2.4mm;flex-wrap:wrap;font-size:10.5pt;font-weight:700">{''.join(f'<span style="padding:1.6mm 4.4mm;border-radius:20mm;border:.6pt solid rgba(232,182,74,.55)">{x}</span>' for x in ['للآيباد: GoodNotes · Notability','ينطبع A4 بالعرض','فهرس بروابط تضغط عليها','للطلاب والمعلمين وأصحاب المشاريع'])}</div></div>
<div style="position:absolute;bottom:12mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:3mm;font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:#A9BFA9"><img src="{logo}" style="width:10mm;height:10mm">EILAN DOLL — THE DIGITAL WORLD</div></section>''')
    P.append(f'''<section class="pg" dir="rtl"><div class="bar"><span>دفتر إيلان البصري</span><a href="#index">الفهرس ←</a></div>
<div style="position:absolute;inset:18mm 20mm;display:grid;grid-template-columns:1fr 1fr;gap:12mm">
<div><div style="font-weight:900;font-size:22pt;margin-bottom:4mm">✍️ طريقة الاستخدام</div><ol style="font-size:12pt;line-height:2;padding-inline-start:6mm">
<li>افتح الفهرس واضغط على القالب اللي يناسب موضوعك.</li><li>شوف المثال الجاهز عشان تفهم الفكرة.</li><li>اقلب للصفحة الفاضية واكتب موضوعك عليها.</li><li>جرّب قالبين لنفس الموضوع — رسمتين تنحفظ أكثر من وحدة.</li></ol></div>
<div><div style="font-weight:900;font-size:22pt;margin-bottom:4mm">📱 على الآيباد · 🖨️ للطباعة</div><ol style="font-size:12pt;line-height:2;padding-inline-start:6mm">
<li>الآيباد: افتح الملف في GoodNotes أو Notability، والروابط تشتغل.</li><li>كرّر أي صفحة فاضية من خيار «تكرار الصفحة» وعبّها كم مرة تبي.</li><li>الطباعة: A4 بالعرض، الحجم الفعلي ١٠٠٪.</li><li>تبي ترسمها جاهزة بالكمبيوتر؟ افتح «مختبر إيلان البصري» في الموقع.</li></ol></div></div>
<div class="tip">EILAN DOLL · مختبر وأدوات إيلان البصرية</div></section>''')
    rows = ''.join(f'<a href="#t-{k}" style="display:flex;align-items:center;gap:3mm;padding:2.6mm 4mm;border-radius:4mm;background:#fff;border:.6pt solid #E2D9C0;text-decoration:none;color:#1F3A2B"><b style="font-family:Poppins;color:#B58A2E;font-size:12pt;width:8mm">{i+1:02d}</b><span style="flex:1"><b style="font-size:12.5pt">{names[k]}</b><br><span style="font-size:9pt;color:#6E6C5A">{best[k]}</span></span><span style="font-size:9pt;color:#2F7A52;font-weight:900">ص {5 + i*2}</span></a>' for i, k in enumerate(ORDER))
    P.append(f'''<section class="pg" dir="rtl" id="index"><div class="bar"><span>الفهرس — اضغط على أي قالب</span><span></span></div>
<div style="position:absolute;inset:16mm 14mm 12mm;display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:1fr;gap:2.4mm">{rows}</div></section>''')
    for i, k in enumerate(ORDER):
        tips = ' · '.join(TIPS[k])
        for kind in ('ex', 'blank'):
            label = 'مثال جاهز' if kind == 'ex' else 'صفحتك — اكتب هنا'
            anchor = f' id="t-{k}"' if kind == 'ex' else ''
            P.append(f'''<section class="pg" dir="rtl"{anchor}><div class="bar"><span><b style="color:#B58A2E;font-family:Poppins">{i+1:02d}</b> · {names[k]} · {label}</span><a href="#index">الفهرس ←</a></div>
<div class="svgwrap">{svgs[k][kind]}</div>{f'<div class="tip">💡 {tips}</div>' if kind == 'ex' else ''}</section>''')
    P.append(f'''<section class="pg dark" dir="rtl"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5mm;text-align:center">
<img src="{logo}" style="width:26mm;height:26mm"><div style="font-weight:900;font-size:30pt">لا تذاكر بالقراءة بس… <span style="color:#E8B64A">ارسمها</span></div>
<div style="font-size:13pt;color:#C9D8C3">اختر موضوع اليوم، جرّب عليه ثلاث قوالب، وشوف أي رسمة تثبت في راسك.</div>
<div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:10pt;color:#A9BFA9;margin-top:6mm">EILAN DOLL — THE DIGITAL WORLD</div></div></section>''')
    html = f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(P)}</body></html>'
    page_pdf(pw, html, OUT / 'Eilan-Visual-Workbook.pdf')


PROMPTS = [
 ('شجرة', 'الشجرة', 'التصنيفات، المهارات، أي موضوع له أساس وأقسام.', 'ارسم «[الموضوع]» على شكل شجرة:\n- الجذور: ٣ أساسات يقوم عليها الموضوع\n- الجذع: الفكرة الأساسية في سطر واحد\n- من ٤ إلى ٥ فروع، على كل فرع ورقتين أو ثلاث فيها أمثلة\n- الثمرة فوق: النتيجة اللي يوصل لها اللي يتقن الموضوع\n- خلفية فاتحة وخط عربي واضح', ['التمثيل الضوئي', 'أقسام الكلمة في النحو', 'خدمات متجري']),
 ('جليد', 'جبل الجليد', 'الأسباب الخفية، قصص النجاح، المشاكل المتكررة.', 'ارسم «[الموضوع]» على شكل جبل جليد في البحر:\n- فوق الماء: ٣ أشياء يشوفها الكل\n- تحت السطح: ٣ أشياء ينتبه لها القليل\n- في القاع: ٣ إلى ٤ أسباب حقيقية\n- كل ما نزلنا تحت يصير الأزرق أغمق\n- اختم تحت بخلاصة في سطر', ['ليش ننسى اللي ذاكرناه؟', 'غياب الطلاب', 'ليش العملاء ما يرجعون؟']),
 ('زمن', 'الخط الزمني', 'التاريخ، قصة شركة، مراحل مشروع.', 'سوّ خط زمني لـ «[الموضوع]»:\n- خط أفقي من اليمين لليسار، فيه من ٦ إلى ١٠ أحداث\n- كل حدث: التاريخ، العنوان، وأثره في سطر قصير\n- كبّر أهم حدثين\n- لوّن كل حقبة بلون خفيف مختلف\n- في النهاية: وش المتوقّع بعدها؟', ['تاريخ المملكة', 'تطور الهواتف الذكية', 'قصة مشروعي']),
 ('طريق', 'خريطة الطريق', 'الأهداف، مسار تعلّم، إطلاق منتج.', 'ارسم خريطة طريق لـ «[الهدف]» خلال [المدة]:\n- طريق متعرّج من «البداية» إلى علم الوصول\n- من ٥ إلى ٧ محطات على الطريق\n- كل محطة: وش أسوي + كيف أعرف إني خلّصتها\n- عقبة أو عقبتين، وتحت كل وحدة طريقة تجاوزها\n- عند العلم: شكل النتيجة النهائية', ['أحفظ جزء عمّ في شهرين', 'أتعلم التصميم من الصفر', 'أطلق متجري الرقمي']),
 ('دورة', 'الدورة', 'العادات، دورات الحياة، أي شيء يتكرر.', 'ارسم «[الموضوع]» على شكل دورة:\n- من ٤ إلى ٦ مراحل على دائرة، وبينها أسهم\n- كل مرحلة: اسم قصير + سطر شرح\n- في وسط الدائرة: وش تنتج هالدورة\n- علّم بلون مختلف المرحلة اللي يوقف عندها أغلب الناس', ['دورة الماء', 'دورة العادة', 'دورة حياة العميل']),
 ('طبقات', 'الطبقات', 'المهارات، الأنظمة، أي شيء مبني فوق بعضه.', 'اعرض «[الموضوع]» كطبقات فوق بعض:\n- من ٥ إلى ٧ طبقات، والأساس تحت\n- كل طبقة: اسمها + وش تسوي في سطر\n- أسهم توضّح إن كل طبقة تعتمد على اللي تحتها\n- الألوان أغمق تحت وأفتح فوق', ['هرم ماسلو', 'طبقات الأرض', 'مكوّنات الموقع الإلكتروني']),
 ('قرار', 'مصفوفة القرار', 'تختار بين أدوات، تخصصات، موردين، خطط.', 'سوّ مصفوفة قرار لـ «[القرار]»\nالخيارات: [خيار ١، خيار ٢، خيار ٣]\n- اختر أهم ٥ معايير، وأعط كل معيار وزن من ١ إلى ٥\n- قيّم كل خيار من ١٠ في كل معيار، واحسب المجموع الموزون\n- ظلّل الفايز بالأخضر وأضعف درجة بالأحمر\n- اختم بجملة: ليش الفايز فاز', ['أي تخصص أدخل؟', 'أي طريقة أذاكر فيها؟', 'وين أبيع منتجاتي؟']),
 ('لوحة', 'لوحة المشروع', 'أفكار المشاريع، خطط المنتجات.', 'حط فكرة «[المشروع]» في لوحة من صفحة وحدة:\n- ٩ مربعات: المشكلة، العميل، الحل، القيمة الفريدة، القنوات، الدخل، التكاليف، المؤشرات، الميزة اللي ما تنسرق\n- ٢ إلى ٣ نقاط قصيرة في كل مربع، بدون فقرات\n- علّم أخطر افتراض بعلم أحمر', ['كافيه متنقل', 'تطبيق مذاكرة', 'متجر هدايا رقمية']),
 ('إنفو', 'الإنفوجرافيك', 'شرح أرقام، منشورات السوشال، العروض.', 'صمّم إنفوجرافيك طولي عن «[الموضوع]»:\n- عنوان كبير وسطر تحته\n- رقم واحد بارز داخل دائرة كبيرة\n- من ٤ إلى ٦ أقسام: أيقونة + رقم أو حقيقة + سطر قصير\n- ٣ ألوان بس ومساحات فاضية مريحة\n- خلاصة وحدة في الأسفل', ['فوائد شرب الماء', 'إحصائيات فصلنا', 'نتائج حملتي التسويقية']),
 ('دفتر', 'ورقة الملاحظات', 'المراجعة، تلخيص درس، المذاكرة.', 'حوّل «[الموضوع]» لصفحة دفتر مكتوبة بخط اليد:\n- عنوان بخط يد واضح فوق\n- ٥ نقاط بالقلم الأزرق، كل نقطة سطر\n- أهم مصطلح عليه دائرة حمراء\n- ورقة لاصقة صفراء فيها: «أهم نقطة: …»\n- رسمة صغيرة في الزاوية وخلفية مسطّرة', ['درس الكسور', 'قوانين نيوتن', 'ملخص اجتماع الفريق']),
 ('مخطط', 'المخطط الهندسي', 'الأنظمة، العمليات، خطط البناء.', 'ارسم مخطط هندسي لـ «[النظام أو الخطة]»:\n- خطوط بيضاء على شبكة زرقاء\n- المكوّنات الأساسية من فوق، بالترتيب\n- تحت كل مكوّن مواصفاته: وقت، تكلفة، أداة\n- كتلة عنوان في الزاوية: الاسم، الإصدار، التاريخ\n- ملاحظات مرقّمة تشرح كل جزء', ['خطة رحلة مدرسية', 'نظام طلبات مطعم', 'خطة يوم المذاكرة']),
 ('تفكيك', 'التفكيك', 'المنتجات، الأجهزة، الوصفات، الأطر.', 'اعرض «[الشيء]» مفكّك لقطع:\n- كل القطع منفصلة على خط واحد\n- خطوط منقّطة توضّح وين تركب كل قطعة\n- رقم واسم لكل قطعة\n- قائمة جانبية: القطعة + وظيفتها\n- ميّز القطعة اللي يعتمد عليها الكل', ['الخلية النباتية', 'الكمبيوتر', 'منتجي الرقمي']),
 ('موضّح', 'المخطط الموضّح', 'العلوم، كيف تشتغل الأشياء.', 'سوّ مخطط موضّح لـ «[الموضوع]»:\n- الشيء الأساسي في النص\n- كل جزء مهم عليه خط وتعريف قصير (أقل من ٨ كلمات)\n- أسهم توضّح وش اللي يتدفق (دم، بيانات، فلوس…)\n- مفتاح صغير للألوان والأسهم', ['القلب', 'شبكة الإنترنت', 'رحلة الطلب في متجري']),
 ('أفكار', 'رسم الأفكار', 'الكتب، البودكاست، المحاضرات، الاجتماعات.', 'حوّل «[الموضوع أو النص]» لملاحظات مرسومة:\n- عنوان داخل بانر بخط يد\n- من ٦ إلى ٨ أفكار، لكل فكرة رسمة بسيطة\n- أسهم تربط الأفكار ببعض\n- فقاعة كلام للاقتباس المهم، ومربعات للمصطلحات\n- حبر أسود + لون واحد بس للتمييز', ['محاضرة اليوم', 'ملخص كتاب', 'حلقة بودكاست (الصق النص)']),
]
MASTER = """أنت «مختبري البصري». لما أكتب أمر من الأوامر تحت وبعده موضوع، حوّل الموضوع لرسمة من نفس النوع.

/شجرة — جذور وجذع وفروع وثمرة
/جليد — ظاهر الموضوع وباطنه
/زمن — أحداث بالترتيب
/طريق — محطات من البداية للهدف
/دورة — مراحل تتكرر
/طبقات — أساس وطبقات فوقه
/قرار — خيارات ضد معايير بأوزان
/لوحة — فكرة مشروع في ٩ مربعات
/إنفو — بوستر أرقام وحقائق
/دفتر — صفحة ملاحظات بخط اليد
/مخطط — مخطط هندسي بمواصفات
/تفكيك — قطع الشيء مرقّمة
/موضّح — الشيء في النص وأجزاؤه حوله
/أفكار — ملاحظات مرسومة بأيقونات وأسهم

القواعد:
- كل الكلام بالعربي الواضح، والاتجاه من اليمين لليسار.
- ارسمها رسمة حقيقية (SVG أو HTML في Claude، أو صورة في ChatGPT) مو نص.
- كل عنوان أقل من ٨ كلمات، واشرح أي مصطلح صعب.
- الألوان: أخضر غامق، ذهبي، كريمي، ولمسة بنفسجي.
- إذا الموضوع مو واضح، اسألني سؤال واحد بس قبل ما ترسم.
- بعد الرسمة اقترح عليّ أمر ثاني يناسب نفس الموضوع."""


def prompts(pw, logo):
    pre = lambda t: f'<div style="background:#14150F;color:#EFE9DA;border-radius:5mm;padding:6mm 7mm;font-size:12.5pt;line-height:1.85;white-space:pre-wrap;font-weight:700;border:.8pt solid #2F7A52">{t}</div>'
    P = [f'''<section class="pg dark" dir="rtl"><div style="position:absolute;top:16mm;left:16mm">{cubes}</div>
<div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:0 24mm;gap:5mm">
<div class="eb">EILAN VISUAL PROMPTS · بالعربي</div>
<div style="font-weight:900;font-size:48pt;line-height:1.15">أوامر إيلان <span style="color:#E8B64A">البصرية</span></div>
<div style="font-size:16pt;color:#C9D8C3;max-width:190mm">أمر رئيسي واحد + ١٤ أمر جاهز تلصقها في Claude أو ChatGPT، وأي موضوع يصير رسمة تنحفظ.</div>
<div style="display:flex;gap:2.4mm;flex-wrap:wrap;font-size:10.5pt;font-weight:700">{''.join(f'<span style="padding:1.6mm 4.4mm;border-radius:20mm;border:.6pt solid rgba(232,182,74,.55)">{x}</span>' for x in ['للطلاب','للمعلمين','لأصحاب المشاريع','عربي ١٠٠٪'])}</div></div>
<div style="position:absolute;bottom:12mm;left:0;right:0;display:flex;justify-content:center;align-items:center;gap:3mm;font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:9pt;color:#A9BFA9"><img src="{logo}" style="width:10mm;height:10mm">EILAN DOLL — THE DIGITAL WORLD</div></section>''']
    P.append(f'''<section class="pg" dir="rtl"><div class="bar"><span>أوامر إيلان البصرية</span><span>٢</span></div>
<div style="position:absolute;inset:18mm 20mm;display:grid;grid-template-columns:1fr 1fr;gap:10mm">
<div style="background:#fff;border:.6pt solid #E2D9C0;border-radius:5mm;padding:7mm"><div class="eb">الطريقة ١ · الأسرع</div><div style="font-weight:900;font-size:18pt;margin:2mm 0 3mm">الأمر الرئيسي مرة وحدة</div>
<ol style="font-size:12pt;line-height:2;padding-inline-start:6mm"><li>انسخ «الأمر الرئيسي» من الصفحة الجاية.</li><li>في Claude: سوّ مشروع جديد (Project) والصقه في تعليمات المشروع.<br>في ChatGPT: الصقه في أول المحادثة.</li><li>بعدها اكتب بس: <b>/شجرة التمثيل الضوئي</b></li></ol></div>
<div style="background:#fff;border:.6pt solid #E2D9C0;border-radius:5mm;padding:7mm"><div class="eb">الطريقة ٢ · مرة وحدة</div><div style="font-weight:900;font-size:18pt;margin:2mm 0 3mm">أمر واحد لرسمة وحدة</div>
<ol style="font-size:12pt;line-height:2;padding-inline-start:6mm"><li>اختر الأمر المناسب من الصفحات ٤ إلى ١٧.</li><li>بدّل اللي بين الأقواس [ ] بموضوعك.</li><li>الصقه في Claude أو ChatGPT.</li></ol>
<div style="margin-top:4mm;font-size:11pt;color:#6E6C5A;line-height:1.8">💡 في Claude اطلب الرسمة «كـ Artifact» عشان تنزلها صورة. وفي ChatGPT أضف: «سوّها كصورة».</div></div></div></section>''')
    P.append(f'''<section class="pg" dir="rtl"><div class="bar"><span>الأمر الرئيسي — انسخه كامل</span><span>٣</span></div>
<div style="position:absolute;inset:14mm 20mm 10mm">{pre(MASTER).replace('font-size:12.5pt;line-height:1.85','font-size:10.8pt;line-height:1.62')}</div></section>''')
    for i, (cmd, n, best, body, ex) in enumerate(PROMPTS):
        P.append(f'''<section class="pg" dir="rtl"><div class="bar"><span><b style="color:#B58A2E;font-family:Poppins">{i+1:02d}</b> · {n}</span><span>{i+4}</span></div>
<div style="position:absolute;inset:17mm 20mm 14mm;display:grid;grid-template-columns:1.45fr 1fr;gap:9mm;align-items:start">
<div><div style="display:flex;align-items:center;gap:4mm;margin-bottom:4mm"><div style="font-weight:900;font-size:26pt">{n}</div><span style="font-weight:900;font-size:14pt;background:#2F7A52;color:#fff;border-radius:3mm;padding:1mm 4mm">/{cmd}</span></div>
<div style="font-size:11.5pt;color:#6E6C5A;margin-bottom:4mm"><b style="color:#1F3A2B">ينفع لـ:</b> {best}</div>{pre(body)}</div>
<div style="display:flex;flex-direction:column;gap:3mm;margin-top:16mm">{''.join(f'<div style="background:#fff;border:.6pt solid #E2D9C0;border-radius:4mm;padding:4mm 5mm"><div style="font-size:9.5pt;color:#B58A2E;font-weight:900">{w}</div><div style="font-size:13pt;font-weight:900">/{cmd} {e}</div></div>' for w, e in zip(['🎓 طالب', '👩‍🏫 معلّم', '💼 صاحب مشروع'], ex))}
<div style="font-size:10pt;color:#6E6C5A;line-height:1.7;margin-top:2mm">جرّب بعده: /{PROMPTS[(i+3) % len(PROMPTS)][0]} على نفس الموضوع.</div></div></div></section>''')
    P.append(f'''<section class="pg" dir="rtl"><div class="bar"><span>نصايح عشان تطلع الرسمة أحلى</span><span>{len(PROMPTS)+4}</span></div>
<div style="position:absolute;inset:20mm 24mm;display:grid;grid-template-columns:1fr 1fr;gap:6mm">{''.join(f'<div style="background:#fff;border:.6pt solid #E2D9C0;border-radius:5mm;padding:6mm"><div style="font-weight:900;font-size:15pt;margin-bottom:2mm">{t}</div><div style="font-size:11.5pt;color:#4a4a3c;line-height:1.8">{x}</div></div>' for t, x in [('موضوع واحد لكل رسمة','إذا الرسمة زحمة، قسّم الموضوع واطلب رسمتين.'),('رسمتين لنفس الدرس','مثلاً /دفتر ثم /شجرة — كل شكل يثبّت المعلومة من زاوية.'),('الصق النص الأصلي','بدل الموضوع، الصق ملخص المحاضرة أو نص الحلقة.'),('عدّل بجملة','«كبّر الخط»، «خلّها ٤ فروع بس»، «غيّر الألوان للفاتح».')])}</div></section>''')
    P.append(f'''<section class="pg dark" dir="rtl"><div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5mm;text-align:center">
<img src="{logo}" style="width:26mm;height:26mm"><div style="font-weight:900;font-size:30pt">تبيها جاهزة بدون ذكاء اصطناعي؟</div>
<div style="font-size:13pt;color:#C9D8C3">«مختبر إيلان البصري» داخل الموقع: اختر الشكل، اكتب، وحمّل صورة أو PDF.</div>
<div style="font-family:Poppins;font-weight:800;letter-spacing:3px;font-size:10pt;color:#A9BFA9;margin-top:6mm">EILAN DOLL — THE DIGITAL WORLD</div></div></section>''')
    html = f'<!doctype html><html lang="ar"><head><meta charset="utf-8"><style>{CSS}</style></head><body>{"".join(P)}</body></html>'
    page_pdf(pw, html, OUT / 'Eilan-Visual-Prompts-AR.pdf')


if __name__ == '__main__':
    with sync_playwright() as pw:
        b = pw.chromium.launch(); pg = b.new_page(viewport={'width': 1400, 'height': 900})
        pg.goto(URL); pg.wait_for_timeout(4300)
        pg.evaluate("go('eilan://visual')"); pg.wait_for_timeout(600)
        pg.evaluate("vlLoadFont()"); pg.wait_for_timeout(1500)
        svgs = {}
        for k in ORDER:
            ex = pg.evaluate(f"vlSvg('{k}',VL_T['{k}'].ex,'paper',true)")
            bl = pg.evaluate("([k,d])=>vlSvg(k,d,'paper',true)", [k, BLANK[k]])
            svgs[k] = {'ex': ex, 'blank': bl}
        names = pg.evaluate("Object.fromEntries(VL_ORDER.map(k=>[k,VL_T[k].n]))")
        best = pg.evaluate("Object.fromEntries(VL_ORDER.map(k=>[k,VL_T[k].best]))")
        logo = pg.evaluate("LOGO"); b.close()
        which = sys.argv[1:] or ['workbook', 'prompts']
        if 'workbook' in which: workbook(pw, svgs, logo, names, best)
        if 'prompts' in which: prompts(pw, logo)
