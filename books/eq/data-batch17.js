/* موسوعة معادلات إيلان — الذاكرة والتعلم، البصريات اليومية، الشحن والتغليف، التجارة الإلكترونية */
EQ.syms(`
# ---- memory & learning
tdays|t|الأيام منذ المذاكرة|days since studying|days|3
Smem|S|قوة الذاكرة|memory strength|days|5
Rmem|R|ما تتذكره|retention|%|54.9
Iprev|I|الفاصل السابق|previous interval|days|6
EFm|EF|معامل السهولة|ease factor||2.5
Inext|I′|الفاصل التالي|next interval|days|15
words|N|عدد الكلمات|number of words||3000
wpm|r|كلمات في الدقيقة|words per minute||200
treadm|t|زمن القراءة|reading time|min|15
chars|c|عدد الحروف المكتوبة|characters typed||1500
tmint|t|الزمن|time|min|5
twpm|WPM|سرعة الكتابة|typing speed|wpm|60
# ---- everyday optics
hperson|h|طولك|your height|cm|170
hmir|m|طول المرآة اللازم|mirror height needed|cm|85
flens|f|البعد البؤري للعدسة المكبرة|magnifier focal length|cm|5
Mmag|M|التكبير|magnification||6
Dobj|D|قطر العدسة الشيئية|objective diameter|mm|50
Mbin|M|تكبير المنظار|binocular magnification||10
pupil|d|حدقة الخروج|exit pupil|mm|5
lmag|m|أخفت نجم يُرى|faintest visible magnitude||10.5
# ---- shipping & packaging
bxL|L|طول الصندوق|box length|cm|40
bxW|W|عرض الصندوق|box width|cm|30
bxH|H|ارتفاع الصندوق|box height|cm|20
volw|w_v|الوزن الحجمي|volumetric weight|kg|4.8
actw|w|الوزن الفعلي|actual weight|kg|3
chgw|w|الوزن المحتسب|chargeable weight|kg|4.8
pltL|L|طول الطبلية|pallet length|cm|120
pltW|W|عرض الطبلية|pallet width|cm|100
perlay|n|الصناديق في الطبقة|boxes per layer||10
pltH|H|الارتفاع المسموح|allowed stack height|cm|150
nbox|N|عدد الصناديق في الطبلية|boxes per pallet||70
rkg|r|سعر الكيلو|price per kg|SAR|15
shipc|cost|تكلفة الشحن|shipping cost|SAR|72
# ---- e-commerce
erev|R|الإيرادات|revenue|SAR|50000
ordr|n|عدد الطلبات|orders||250
aov|AOV|متوسط قيمة الطلب|average order value|SAR|200
carts|c|السلات المنشأة|carts created||1000
paid|p|الطلبات المكتملة|completed orders||300
aband|%|نسبة ترك السلة|cart abandonment|%|70
adsp|S|الإنفاق الإعلاني|ad spend|SAR|5000
roas|ROAS|العائد على الإعلان|return on ad spend||10
clicks|clicks|النقرات|clicks||2500
impr|imp|مرات الظهور|impressions||100000
ctr|CTR|نسبة النقر|click-through rate|%|2.5
cpc|CPC|تكلفة النقرة|cost per click|SAR|2
cpm|CPM|تكلفة الألف ظهور|cost per thousand impressions|SAR|50
opens|o|الرسائل المفتوحة|emails opened||2200
sent|s|الرسائل المرسلة|emails delivered||10000
openr|%|نسبة الفتح|open rate|%|22
ret|r|المرتجعات|returned orders||12
retr|%|نسبة الإرجاع|return rate|%|4.8
`);

EQ.add('mem',`
منحنى النسيان (إبنغهاوس)|Forgetting curve (Ebbinghaus)|R = e^(−t/S) × 100|Rmem|exp(-tdays/Smem)*100|tdays Smem|كل مراجعة تقوّي الذاكرة فيصير النسيان أبطأ.|Every review strengthens memory so forgetting slows down.
التكرار المتباعد (SM-2)|Spaced repetition (SM-2)|I′ = I × EF|Inext|round(Iprev*EFm)|Iprev EFm|راجع بعد يوم، ثم 6 أيام، ثم فترات تكبر.|Review after a day, then 6 days, then growing gaps.
زمن القراءة|Reading time|t = N / r|treadm|words/wpm|words wpm|القارئ العادي حوالي 200–250 كلمة بالدقيقة.|A typical reader manages 200–250 words a minute.
سرعة الكتابة على لوحة المفاتيح|Typing speed|WPM = (c / 5) / t|twpm|chars/5/tmint|chars tmint|الكلمة القياسية = 5 حروف.|A standard word is 5 characters.
`);

EQ.add('eop',`
طول المرآة اللي تشوف فيها نفسك كامل|Mirror height to see your whole body|m = h / 2|hmir|hperson/2|hperson|نص طولك بس، مهما بعدت!|Just half your height, however far away you stand!
تكبير العدسة المكبرة|Magnifying-glass magnification|M = 25 / f + 1|Mmag|25/flens+1|flens|العدسة الأقوى بعدها البؤري أقصر.|A stronger lens has a shorter focal length.
حدقة خروج المنظار|Binocular exit pupil|d = D / M|pupil|Dobj/Mbin|Dobj Mbin|منظار 10×50 مناسب للرؤية الليلية.|10×50 binoculars suit night viewing.
أخفت نجم يشوفه التلسكوب|Faintest star a telescope shows|m ≈ 2 + 5 log₁₀ D|lmag|2+5*log10(Dobj)|Dobj|العين وحدها تشوف حتى القدر 6 تقريبًا.|The naked eye reaches about magnitude 6.
`);

EQ.add('shi',`
الوزن الحجمي للشحنة|Volumetric weight of a parcel|w_v = L × W × H / 5000|volw|bxL*bxW*bxH/5000|bxL bxW bxH|شركات الشحن تحسب الأكبر بين الوزن الفعلي والحجمي.|Couriers charge for whichever is bigger: real or volumetric weight.
الوزن المحتسب للشحن|Chargeable weight|w = max(الفعلي، الحجمي)|chgw|max(actw,volw)|actw volw|صندوق كبير وخفيف ممكن يكلف أكثر من صغير وثقيل.|A big light box can cost more than a small heavy one.
تكلفة الشحن|Shipping cost|cost = w × r|shipc|chgw*rkg|chgw rkg|اختار أصغر صندوق يناسب المنتج.|Pick the smallest box that fits the product.
الصناديق في طبقة الطبلية|Boxes per pallet layer|n = ⌊L/l⌋ × ⌊W/w⌋|perlay|floor(pltL/bxL)*floor(pltW/bxW)|pltL bxL pltW bxW|بدون تدوير الصناديق.|Without rotating the boxes.
الصناديق في الطبلية|Boxes per pallet|N = n × ⌊H / h⌋|nbox|perlay*floor(pltH/bxH)|perlay pltH bxH|طبقات فوق بعض.|Layers stacked up.
`);

EQ.add('ecm',`
متوسط قيمة الطلب|Average order value|AOV = R / n|aov|erev/ordr|erev ordr|كم يصرف العميل في الطلب الواحد.|How much a customer spends per order.
نسبة ترك السلة|Cart abandonment rate|% = (1 − p / c) × 100|aband|(1-paid/carts)*100|paid carts|أغلب المتاجر تخسر حوالي 70% من السلات.|Most shops lose around 70% of carts.
العائد على الإنفاق الإعلاني|Return on ad spend|ROAS = R / S|roas|erev/adsp|erev adsp|كل ريال إعلان كم جاب ريال مبيعات.|How many riyals of sales each advertising riyal brings.
نسبة النقر على الإعلان|Ad click-through rate|CTR = clicks / impressions × 100|ctr|clicks/impr*100|clicks impr|كم من اللي شافوا الإعلان ضغطوا عليه.|How many people who saw the ad clicked it.
تكلفة النقرة|Cost per click|CPC = S / clicks|cpc|adsp/clicks|adsp clicks|كم تدفع على كل زائر.|What you pay for each visitor.
تكلفة الألف ظهور|Cost per thousand impressions|CPM = S / imp × 1000|cpm|adsp/impr*1000|adsp impr|سعر الوصول لألف شخص.|The price of reaching a thousand people.
نسبة فتح الرسائل البريدية|Email open rate|% = opened / delivered × 100|openr|opens/sent*100|opens sent|العنوان الحلو يرفعها.|A good subject line raises it.
نسبة الإرجاع|Return rate|% = returns / orders × 100|retr|ret/ordr*100|ret ordr|الصور والوصف الدقيق تقللها.|Accurate photos and descriptions lower it.
`);
