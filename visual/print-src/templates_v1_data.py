# -*- coding: utf-8 -*-
"""Content of «قوالب إيلان البصرية — الأربعة الأساسية» (Eilan Visual Templates — Core Four), v1.
Four fill-in templates (tree, iceberg, roadmap, cycle), each with one filled example, in Arabic and English.
All example content is original, general educational knowledge: no real people, no statistics, no protected works.
Arabic is written gender-neutral (nouns / passive / "we" forms, no masculine or feminine imperatives).
Used by build_templates_v1.py.
"""

ORDER = ['tree', 'iceberg', 'roadmap', 'cycle']

UI = {
 'ar': {
  'dir': 'rtl', 'lang': 'ar',
  'product': 'قوالب إيلان البصرية', 'product_sub': 'الأربعة الأساسية',
  'example': 'مثال جاهز', 'blank': 'صفحة للكتابة', 'topic': 'الموضوع:', 'index': 'الفهرس',
  'page': 'ص', 'sign': 'إيلان دول — EILAN DOLL',
  'cover_lead': 'أربعة قوالب تحوّل أي درس أو فكرة أو مشروع إلى رسمة واضحة تنحفظ: مثال جاهز لكل قالب، وصفحة فارغة للكتابة باليد أو بقلم الآيباد.',
  'chips': ['٤ قوالب', 'مثال + صفحة فارغة لكل قالب', 'للآيباد: GoodNotes · Notability', 'A4 بالعرض للطباعة'],
  'howto_t': 'طريقة الاستخدام',
  'howto': ['اختيار القالب المناسب من القائمة (الضغط على اسمه يفتح صفحته).',
            'قراءة المثال الجاهز لفهم فكرة القالب.',
            'الانتقال للصفحة التالية وكتابة الموضوع في الخانات.',
            'على الآيباد: تكرار الصفحة الفارغة من «تكرار الصفحة» لاستخدامها أكثر من مرة.',
            'للطباعة: نسخة الطباعة مرفقة — A4 بالعرض وبالحجم الفعلي ١٠٠٪.'],
  'which_t': 'أي قالب يناسب الموضوع؟',
  'end_t': 'القراءة تُفهِم… والرسم يُثبِّت',
  'end_s': 'موضوع واحد على قالبين مختلفين يثبت أكثر. ولرسم القوالب بالكمبيوتر: «مختبر إيلان البصري» داخل الموقع، وأوامر «شجرة» و«جليد» و«طريق» و«دورة» جاهزة في ملف «أوامر إيلان البصرية».',
  'print_how': ['الطباعة على A4 بالعرض، بالحجم الفعلي ١٠٠٪ (بدون «ملاءمة الصفحة»).', 'لكل قالب صفحتان: المثال ثم الصفحة الفارغة، فتصلح للطباعة وجه وظهر.', 'تُطبع الصفحة الفارغة وحدها لعمل نسخ كثيرة للصف أو للبيت.'],
  'print_t': 'نسخة الطباعة', 'print_s': 'A4 بالعرض · الحجم الفعلي ١٠٠٪ · ألوان خفيفة توفّر الحبر · كل قالب: مثال ثم صفحة فارغة (تصلح للطباعة وجه وظهر).',
 },
 'en': {
  'dir': 'ltr', 'lang': 'en',
  'product': 'Eilan Visual Templates', 'product_sub': 'The Core Four',
  'example': 'Worked example', 'blank': 'Your page', 'topic': 'Topic:', 'index': 'Contents',
  'page': 'p.', 'sign': 'EILAN DOLL — إيلان دول',
  'cover_lead': 'Four templates that turn any lesson, idea or project into a clear picture you remember: a worked example for each one, and a blank page to fill by hand or with an iPad pencil.',
  'chips': ['4 templates', 'Example + blank page each', 'iPad: GoodNotes · Notability', 'Prints on A4 landscape'],
  'howto_t': 'How to use',
  'howto': ['Pick the template that fits your topic (tap its name to jump to it).',
            'Look at the worked example to see the idea.',
            'Turn to the next page and write your own topic in the boxes.',
            'On iPad: duplicate the blank page to use it again and again.',
            'To print: use the print edition — A4 landscape, actual size 100%.'],
  'which_t': 'Which template fits?',
  'end_t': 'Reading helps it make sense. Drawing helps it stay.',
  'print_how': ['Print on A4 landscape at actual size 100% (no "fit to page").', 'Each template has two pages, example then blank, so it works double-sided.', 'Print the blank page on its own to make copies for a class or at home.'],
  'end_s': 'Try one topic on two different templates. To draw a template on a computer, open the «Eilan Visual Lab» on the website.',
  'print_t': 'Print edition', 'print_s': 'A4 landscape · actual size 100% · light colours to save ink · each template: example, then blank page (works double-sided).',
 },
}

T = {
 # ---------------------------------------------------------------- TREE
 'tree': {
  'ar': {'n': 'الشجرة', 'en': 'TREE', 'best': 'موضوع له أساسات وأقسام: مهارة، تصنيف، مادة دراسية.',
   'tips': 'البداية من الجذور: ما الأساسات؟ · الجذع جملة واحدة تلخّص الموضوع · الفروع أقسام، وتحت كل فرع مثال قصير.',
   'lab': {'fruit': 'الثمرة: النتيجة', 'trunk': 'الجذع: الفكرة الأساسية', 'branch': 'فرع', 'root': 'جذر: أساس'},
   'ex': {'title': 'مهارة الكتابة الواضحة',
          'fruit': 'نص يفهمه القارئ من أول قراءة',
          'trunk': ['إيصال فكرة واحدة بوضوح', 'كل جملة تخدم هذه الفكرة'],
          'branches': [['التخطيط', 'فكرة رئيسية ومخطط قصير'], ['الصياغة', 'جمل قصيرة وكلمات دقيقة'], ['الأمثلة', 'مثال لكل فكرة مهمة'],
                       ['التنظيم', 'عناوين وفقرات مرتّبة'], ['المراجعة', 'قراءة بصوت عالٍ وحذف الزائد']],
          'roots': [['القراءة المستمرة', 'حصيلة كلمات أكبر'], ['فهم الموضوع', 'قبل الكتابة عنه'], ['معرفة القارئ', 'لمن نكتب؟']]}},
  'en': {'n': 'Tree', 'en': 'TREE', 'best': 'Topics with foundations and parts: a skill, a classification, a school subject.',
   'tips': 'Start at the roots: what are the foundations? · The trunk is one sentence that sums it up · Branches are the parts, each with a short example.',
   'lab': {'fruit': 'Fruit: the result', 'trunk': 'Trunk: the core idea', 'branch': 'Branch', 'root': 'Root: a foundation'},
   'ex': {'title': 'Clear Writing',
          'fruit': 'A text readers understand the first time',
          'trunk': ['Getting one idea across clearly', 'Every sentence serves that idea'],
          'branches': [['Planning', 'A main idea and a short outline'], ['Wording', 'Short sentences, precise words'], ['Examples', 'One example for each key idea'],
                       ['Structure', 'Headings and ordered paragraphs'], ['Revising', 'Read it aloud, cut the extra']],
          'roots': [['Regular reading', 'A wider vocabulary'], ['Knowing the topic', 'Before writing about it'], ['Knowing the reader', 'Who are we writing for?']]}},
 },
 # ---------------------------------------------------------------- ICEBERG
 'iceberg': {
  'ar': {'n': 'جبل الجليد', 'en': 'ICEBERG', 'best': 'ما يظهر وما يختفي: أسباب خفية، نجاح، مشكلة تتكرر.',
   'tips': 'فوق الماء: ما يلاحظه أي شخص · تحت السطح: تفاصيل يعرفها المهتمّون · في العمق: السبب الحقيقي الذي لا يُرى.',
   'lab': {'top': 'فوق الماء: ما يراه الجميع', 'mid': 'تحت السطح: ما يلاحظه القليل', 'deep': 'في العمق: الأسباب الحقيقية', 'insight': 'الخلاصة',
           'z_mid': 'تحت السطح', 'z_deep': 'في العمق'},
   'ex': {'title': 'ما وراء الدرجة الجيدة',
          'top': ['الدرجة النهائية', 'الواجبات المسلّمة', 'المشاركة في الحصة'],
          'mid': ['مراجعة منتظمة', 'نوم كافٍ', 'طرح الأسئلة عند الغموض'],
          'deep': ['الفضول وحب الفهم', 'تقبّل الخطأ كجزء من التعلّم', 'عادة يومية صغيرة', 'فهم السبب لا الحفظ فقط'],
          'insight': 'الدرجة نتيجة تُرى… والعادات الخفية هي التي تصنعها.'}},
  'en': {'n': 'Iceberg', 'en': 'ICEBERG', 'best': 'What shows and what hides: hidden causes, success, a recurring problem.',
   'tips': 'Above the water: what anyone notices · Below the surface: details that interested people know · The deep: the real cause nobody sees.',
   'lab': {'top': 'Above the water: what everyone sees', 'mid': 'Below the surface: what few notice', 'deep': 'The deep: the real causes', 'insight': 'Takeaway',
           'z_mid': 'Below the surface', 'z_deep': 'The deep'},
   'ex': {'title': 'Behind a Good Grade',
          'top': ['The final grade', 'Homework handed in', 'Taking part in class'],
          'mid': ['Regular review', 'Enough sleep', 'Asking when something is unclear'],
          'deep': ['Curiosity about how things work', 'Seeing mistakes as part of learning', 'A small daily habit', 'Understanding why, not just memorising'],
          'insight': 'The grade is what we see. Hidden habits are what build it.'}},
 },
 # ---------------------------------------------------------------- ROADMAP
 'roadmap': {
  'ar': {'n': 'خارطة الطريق', 'en': 'ROADMAP', 'best': 'هدف له مراحل: مشروع، مسار تعلّم، خطة اختبار.',
   'tips': 'الهدف يُكتب أولًا عند العلم · لكل محطة علامة إنجاز واضحة · العقبة تُكتب مع طريقة تجاوزها.',
   'lab': {'stage': 'المحطة', 'hint': 'ماذا نفعل؟ · كيف نعرف أنها اكتملت؟', 'block': 'عقبة ← وطريقة تجاوزها', 'goal': 'الهدف', 'start': 'البداية'},
   'ex': {'title': 'خطة مشروع العلوم المدرسي',
          'stages': [['السؤال', 'سؤال واحد يمكن اختباره'], ['البحث', 'ثلاثة مصادر موثوقة'], ['الفرضية', 'توقّع مكتوب في جملة'],
                     ['التجربة', 'خطوات واضحة وتسجيل النتائج'], ['العرض', 'لوحة وشرح قصير']],
          'block': ['نتيجة غير متوقعة', 'تُسجَّل وتُناقش، فهي نتيجة أيضًا'],
          'goal': 'مشروع مكتمل يُعرض ويُشرح بثقة'}},
  'en': {'n': 'Roadmap', 'en': 'ROADMAP', 'best': 'A goal with stages: a project, a learning path, an exam plan.',
   'tips': 'Write the goal at the flag first · Every stage has a clear "done" sign · Write each obstacle with a way past it.',
   'lab': {'stage': 'Stage', 'hint': 'What do we do? · How do we know it is done?', 'block': 'Obstacle → way past it', 'goal': 'Goal', 'start': 'Start'},
   'ex': {'title': 'School Science Project Plan',
          'stages': [['The question', 'One question that can be tested'], ['Research', 'Three reliable sources'], ['Hypothesis', 'A prediction in one sentence'],
                     ['Experiment', 'Clear steps, results recorded'], ['Presentation', 'A poster and a short talk']],
          'block': ['An unexpected result', 'Record it and discuss it: it is a result too'],
          'goal': 'A finished project, presented with confidence'}},
 },
 # ---------------------------------------------------------------- CYCLE
 'cycle': {
  'ar': {'n': 'الدورة', 'en': 'CYCLE', 'best': 'كل ما يتكرر: دورات الطبيعة، العادات، مراحل العمل.',
   'tips': 'آخر مرحلة تعود إلى الأولى · في الوسط: ما الذي تنتجه الدورة؟ · نجمة عند المرحلة الأصعب.',
   'lab': {'stage': 'المرحلة', 'center': 'ما الذي يتجدد؟'},
   'ex': {'title': 'دورة حياة النبات',
          'stages': [['البذرة', 'تحمل نبتة صغيرة وغذاءها'], ['الإنبات', 'الماء والدفء يوقظان البذرة'], ['البادرة', 'أول جذر وأول أوراق'],
                     ['النمو', 'ساق وأوراق تصنع الغذاء'], ['الإزهار', 'التلقيح بالحشرات أو الرياح'], ['الثمرة', 'تحمي البذور وتنشرها']],
          'center': 'بذور جديدة… والدورة تبدأ من جديد'}},
  'en': {'n': 'Cycle', 'en': 'CYCLE', 'best': 'Anything that repeats: cycles in nature, habits, work routines.',
   'tips': 'The last stage leads back to the first · In the middle: what does the cycle produce? · Star the hardest stage.',
   'lab': {'stage': 'Stage', 'center': 'What renews?'},
   'ex': {'title': 'Plant Life Cycle',
          'stages': [['Seed', 'Holds a tiny plant and its food'], ['Germination', 'Water and warmth wake the seed'], ['Seedling', 'First root, first leaves'],
                     ['Growth', 'Stem and leaves make food'], ['Flowering', 'Pollinated by insects or wind'], ['Fruit', 'Protects and spreads the seeds']],
          'center': 'New seeds, and the cycle starts again'}},
 },
}

STORE = {
 'ar': {'name': 'قوالب إيلان البصرية — الأربعة الأساسية',
        'desc': 'أربعة قوالب للتعلّم البصري: الشجرة، جبل الجليد، خارطة الطريق، والدورة. لكل قالب مثال جاهز يوضّح الفكرة وصفحة فارغة للكتابة. '
                'ملف للآيباد بروابط تنقّل (يعمل مع GoodNotes وNotability) ونسخة طباعة A4 بالعرض بألوان خفيفة. بالعربي، ومعه نسخة إنجليزية. '
                'مناسب للطلاب والمعلمين والأهالي وأصحاب المشاريع.'},
 'en': {'name': 'Eilan Visual Templates — The Core Four',
        'desc': 'Four visual-learning templates: Tree, Iceberg, Roadmap and Cycle. Each comes with a worked example and a blank page to fill in. '
                'An iPad edition with tappable navigation (works in GoodNotes and Notability) plus a light-ink A4 landscape print edition. '
                'Arabic and English editions included. For students, teachers, parents and project owners.'},
}
