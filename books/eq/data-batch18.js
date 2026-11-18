/* موسوعة معادلات إيلان — الغوص والسباحة، النباتات والزراعة المنزلية، الراديو والاتصالات اللاسلكية، اللحام والورش */
EQ.syms(`
# ---- diving & swimming
ddep|D|العمق|depth|m|20
sac|SAC|استهلاك الهواء على السطح|surface air consumption|L/min|20
dtime|t|زمن الغوص|dive time|min|40
gasL|V|الهواء المستهلك|air used|L|2400
fox|FO₂|نسبة الأكسجين في الخليط|oxygen fraction||0.32
ppo2|ppO₂|أقصى ضغط جزئي للأكسجين|max partial pressure of O₂|bar|1.4
mod_|MOD|أقصى عمق تشغيل|maximum operating depth|m|33.8
ead|EAD|العمق المكافئ للهواء|equivalent air depth|m|15.6
plen|L|طول المسبح|pool length|m|25
sdist|d|المسافة|distance|m|1500
laps|n|عدد الأطوال|lengths||60
stime|t|زمن الطول|time for one length|s|25
strokes|s|عدد الضربات|strokes||18
swolf|SWOLF|مؤشر كفاءة السباحة|SWOLF score||43
# ---- plants & home growing
ppfd|PPFD|كثافة الضوء للنبات|photosynthetic photon flux density|μmol/(m²·s)|300
lhrs|h|ساعات الإضاءة|hours of light|h|16
dli|DLI|الضوء اليومي المتراكم|daily light integral|mol/(m²·day)|17.3
ecm_|EC|الموصلية الكهربائية|electrical conductivity|mS/cm|1.5
tds|TDS|الأملاح الذائبة|total dissolved solids|ppm|750
potD|D|قطر الأصيص|pot diameter|cm|20
potH|h|ارتفاع الأصيص|pot height|cm|18
potV|V|حجم التربة|soil volume|L|5.65
# ---- radio & wireless
hant1|h₁|ارتفاع الهوائي الأول|antenna 1 height|m|30
hant2|h₂|ارتفاع الهوائي الثاني|antenna 2 height|m|10
rhor|d|أفق الراديو|radio horizon|km|35.6
dlink|d|طول الوصلة|link distance|km|5
fghz|f|التردد|frequency|GHz|5.8
fres|r|نصف قطر منطقة فرينل|Fresnel zone radius|m|8
fspl|FSPL|فقد الفضاء الحر|free-space path loss|dB|121.7
ptx|P_t|قدرة الإرسال|transmit power|dBm|20
gtx|G_t|كسب هوائي الإرسال|transmit antenna gain|dBi|15
grx|G_r|كسب هوائي الاستقبال|receive antenna gain|dBi|15
prx|P_r|القدرة المستقبلة|received power|dBm|-71.7
# ---- welding & workshop
wV|V|جهد القوس|arc voltage|V|24
wI|I|تيار اللحام|welding current|A|200
wv|v|سرعة اللحام|travel speed|mm/s|5
weff|η|كفاءة العملية|process efficiency||0.8
hin|HI|المدخل الحراري|heat input|kJ/mm|0.77
dDrill|D|قطر البريمة|drill diameter|mm|8
vcut2|V_c|سرعة القطع|cutting speed|m/min|25
nDrill|n|سرعة المثقاب|drill speed|rpm|995
thrd|P|خطوة السن|thread pitch|mm|1.5
Dbolt|D|قطر البرغي|bolt diameter|mm|10
tap|d|قطر بريمة القلاووظ|tap drill size|mm|8.5
`);

EQ.add('div',`
الهواء المستهلك في الغوص|Air used on a dive|V = SAC × (D/10 + 1) × t|gasL|sac*(ddep/10+1)*dtime|sac ddep dtime|كل ما نزلت أعمق استهلكت هواء أسرع.|The deeper you go, the faster you use air.
أقصى عمق لخليط النيتروكس|Maximum operating depth for nitrox|MOD = (ppO₂ / FO₂ − 1) × 10|mod_|(ppo2/fox-1)*10|ppo2 fox|تحت هالعمق الأكسجين يصير خطر.|Below this depth oxygen becomes dangerous.
العمق المكافئ للهواء|Equivalent air depth|EAD = (1 − FO₂)/0.79 × (D + 10) − 10|ead|(1-fox)/0.79*(ddep+10)-10|fox ddep|النيتروكس يقلل النيتروجين اللي يمتصه الجسم.|Nitrox cuts the nitrogen the body absorbs.
عدد أطوال المسبح|Number of pool lengths|n = d / L|laps|sdist/plen|sdist plen|1500 متر في مسبح 25 = 60 طول.|1500 m in a 25 m pool is 60 lengths.
مؤشر SWOLF للسباحة|SWOLF swimming score|SWOLF = t + s|swolf|stime+strokes|stime strokes|الأقل أحسن: أسرع وبضربات أقل.|Lower is better: faster with fewer strokes.
`);

EQ.add('hgr',`
الضوء اليومي المتراكم للنبات|Daily light integral|DLI = PPFD × h × 0.0036|dli|ppfd*lhrs*0.0036|ppfd lhrs|الخس يحتاج 12–17، والطماطم أكثر من 20.|Lettuce needs 12–17; tomatoes over 20.
من الموصلية إلى الأملاح الذائبة|EC to dissolved solids|TDS ≈ EC × 500|tds|ecm_*500|ecm_|في الزراعة المائية، بمقياس 500.|For hydroponics, on the 500 scale.
حجم تربة الأصيص|Soil volume of a pot|V = π (D/2)² h / 1000|potV|PI*pow(potD/2,2)*potH/1000|potD potH|باللتر.|In litres.
`);

EQ.add('rad',`
أفق الراديو|Radio horizon|d = 4.12 (√h₁ + √h₂)|rhor|4.12*(sqrt(hant1)+sqrt(hant2))|hant1 hant2|الإشارة تمشي أبعد من الأفق البصري شوي.|Radio reaches a little beyond the visible horizon.
نصف قطر منطقة فرينل|Fresnel zone radius|r = 8.66 √(d / f)|fres|8.66*sqrt(dlink/fghz)|dlink fghz|لازم تكون فاضية من العوائق عشان الإشارة تكون قوية.|Must be clear of obstacles for a strong signal.
فقد الفضاء الحر|Free-space path loss|FSPL = 20 log₁₀ d + 20 log₁₀ f + 92.45|fspl|20*log10(dlink)+20*log10(fghz)+92.45|dlink fghz|d بالكيلومتر و f بالغيغاهرتز.|d in km, f in GHz.
ميزانية الوصلة اللاسلكية|Wireless link budget|P_r = P_t + G_t + G_r − FSPL|prx|ptx+gtx+grx-fspl|ptx gtx grx fspl|إذا القدرة المستقبلة أعلى من حساسية الجهاز، الوصلة تشتغل.|If received power beats the receiver’s sensitivity, the link works.
`);

EQ.add('wld',`
المدخل الحراري للحام|Welding heat input|HI = η V I / (1000 v)|hin|weff*wV*wI/(1000*wv)|weff wV wI wv|حرارة زيادة تضعف المعدن.|Too much heat weakens the metal.
سرعة المثقاب|Drill speed|n = 1000 V_c / (π D)|nDrill|1000*vcut2/(PI*dDrill)|vcut2 dDrill|البريمة الأكبر تدور أبطأ.|A bigger drill turns slower.
قطر بريمة القلاووظ|Tap drill size|d = D − P|tap|Dbolt-thrd|Dbolt thrd|برغي M10 بخطوة 1.5 يحتاج بريمة 8.5 ملم.|A standard M10 × 1.5 bolt needs an 8.5 mm drill.
`);
