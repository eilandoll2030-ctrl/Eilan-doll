/* موسوعة معادلات إيلان — الطائرات بدون طيار، المستشعرات والقياس، الورق والطباعة، الحيوانات الأليفة */
EQ.syms(`
# ---- drones
dmass|m|كتلة الدرون|drone mass|kg|1.2
nmot|n|عدد المحركات|number of motors||4
thrm|T|الدفع لكل محرك|thrust per motor|N|2.94
thmax|T_max|أقصى دفع لكل محرك|max thrust per motor|N|6
dtwr|TWR|نسبة الدفع للوزن|thrust-to-weight ratio||2
bwh|E|طاقة البطارية|battery energy|Wh|60
phov|P|قدرة التحليق|hover power|W|180
usefr|u|النسبة القابلة للاستخدام|usable fraction|%|80
dft|t|زمن الطيران|flight time|min|16
vcru|v|سرعة الطيران|cruise speed|m/s|10
drng|d|المدى|range|km|9.6
prpD|D|قطر المروحة|propeller diameter|in|10
prpN|n|سرعة المروحة|propeller speed|rpm|8000
vtip|v|سرعة طرف المروحة|tip speed|m/s|106
# ---- sensors & measurement
techo|t|زمن الصدى|echo time|ms|5.8
dsonic|d|المسافة|distance|cm|99.5
R25|R₀|المقاومة عند 25°|resistance at 25 °C|Ω|10000
betaT|β|ثابت بيتا|beta constant|K|3950
Rth_|R|المقاومة المقاسة|measured resistance|Ω|5000
Tth_|T|درجة الحرارة|temperature|°C|41.5
GF|GF|معامل المقياس|gauge factor||2
ustrain|ε|الانفعال|strain|μm/m|500
dRR|ΔR/R|التغير النسبي للمقاومة|relative resistance change|%|0.1
Vref|V_ref|الجهد المرجعي|reference voltage|V|3.3
adcb|n|دقة المحول|ADC bits||12
lsb|LSB|أصغر خطوة|smallest step|mV|0.806
Vadc|V_in|الجهد الداخل|input voltage|V|1.65
adcv|code|القراءة الرقمية|digital reading||2048
axg|a_x|التسارع في x|x acceleration|g|0.5
azg|a_z|التسارع في z|z acceleration|g|0.866
tilt|θ|زاوية الميل|tilt angle|°|30
# ---- paper & printing
asz|n|رقم المقاس A|A-size number||4
alen|L|الطول|long side|mm|297
awid|W|العرض|short side|mm|210
aarea|A|المساحة|area|m²|0.0625
gsmp|g|وزن الورق|paper weight|g/m²|80
sheets|n|عدد الأوراق|number of sheets||500
pmass|m|الكتلة|mass|kg|2.5
npg|P|عدد الصفحات|pages||300
calip|c|سماكة الورقة|sheet thickness|mm|0.1
spine|s|سماكة الكعب|spine width|mm|15
dpi2|DPI|الدقة|resolution|dpi|300
pxneed|px|البكسلات المطلوبة|pixels needed|px|2480
# ---- pets
dogage|t|عمر الكلب|dog’s age|years|4
dogh|age|العمر بسنوات الإنسان|age in human years||53
aqL|l|طول الحوض|tank length|cm|60
aqW|w|عرض الحوض|tank width|cm|30
aqH|h|ارتفاع الماء|water height|cm|35
aqV|V|حجم الحوض|tank volume|L|63
wchg|%|نسبة تغيير الماء|water change|%|25
wnew_|V|الماء الجديد|new water|L|15.75
`);

EQ.add('drn',`
الدفع اللازم لكل محرك للتحليق|Thrust per motor to hover|T = m g / n|thrm|dmass*g/nmot|dmass g nmot|الدرون يحلّق لما الدفع يساوي الوزن.|A drone hovers when thrust equals weight.
نسبة الدفع إلى الوزن للدرون|Drone thrust-to-weight ratio|TWR = n T_max / (m g)|dtwr|nmot*thmax/(dmass*g)|nmot thmax dmass g|2 تعتبر مناسبة لطيران مريح.|2 is comfortable for steady flying.
زمن طيران الدرون|Drone flight time|t = E × u / P × 60|dft|bwh*usefr/100/phov*60|bwh usefr phov|لا تفرّغ البطارية للآخر.|Don’t drain the battery completely.
مدى الدرون|Drone range|d = v × t × 60 / 1000|drng|vcru*dft*60/1000|vcru dft|بالكيلومتر، بدون حساب الرجعة.|In km, not counting the return trip.
سرعة طرف المروحة|Propeller tip speed|v = π D n / 60|vtip|PI*prpD*0.0254*prpN/60|prpD prpN|لازم تبقى أقل من سرعة الصوت بكثير.|Must stay well below the speed of sound.
`);

EQ.add('sns',`
المسافة بالموجات فوق الصوتية|Ultrasonic distance|d = v t / 2|dsonic|34300*techo/1000/2|techo|الصوت يروح ويرجع، عشان كذا نقسم على 2.|Sound goes there and back, so divide by 2.
حرارة الثرمستور (معادلة بيتا)|Thermistor temperature (beta equation)|1/T = 1/T₀ + ln(R/R₀)/β|Tth_|1/(1/298.15+log(Rth_/R25)/betaT)-273.15|Rth_ R25 betaT|حساس الحرارة في الأجهزة المنزلية.|The temperature sensor in household devices.
مقياس الانفعال|Strain gauge|ΔR/R = GF × ε|dRR|GF*ustrain*1e-6*100|GF ustrain|يحس بانحناء المعدن حتى لو بسيط.|Senses even tiny bending of metal.
قراءة المحول التناظري الرقمي|ADC reading|code = V_in / V_ref × (2ⁿ − 1)|adcv|round(Vadc/Vref*(pow(2,adcb)-1))|Vadc Vref adcb|كيف الأردوينو يقرأ الحساسات.|How an Arduino reads sensors.
زاوية الميل من مقياس التسارع|Tilt angle from an accelerometer|θ = atan2(a_x, a_z)|tilt|deg(atan2(axg,azg))|axg azg|كيف يعرف جوالك إنه مايل.|How your phone knows it is tilted.
`);

EQ.add('ppr',`
مقاسات الورق A (الطول)|A-series paper size (long side)|L = 1189 / (√2)ⁿ|alen|round(1189/pow(sqrt(2),asz))|asz|ورق A4 = 297 × 210 ملم.|A4 is 297 × 210 mm.
مقاسات الورق A (العرض)|A-series paper size (short side)|W = 841 / (√2)ⁿ|awid|round(841/pow(sqrt(2),asz))|asz|كل مقاس نص اللي قبله.|Each size is half the one before.
مساحة ورقة A|Area of an A-size sheet|A = 1 / 2ⁿ|aarea|1/pow(2,asz)|asz|ورقة A0 مساحتها متر مربع بالضبط.|An A0 sheet is exactly one square metre.
وزن رزمة الورق|Weight of a ream of paper|m = gsm × A × n / 1000|pmass|gsmp*aarea*sheets/1000|gsmp aarea sheets|رزمة A4 بوزن 80 غرام ≈ 2.5 كغ.|A ream of 80 g A4 is about 2.5 kg.
سماكة كعب الكتاب|Book spine width|s = P / 2 × c|spine|npg/2*calip|npg calip|كل ورقة فيها صفحتين.|Each sheet holds two pages.
البكسلات اللازمة للطباعة|Pixels needed for printing|px = L / 25.4 × DPI|pxneed|round(awid/25.4*dpi2)|awid dpi2|عشان الصورة تطلع حادة على الورق.|So the picture prints sharply.
`);

EQ.add('pet',`
عمر الكلب بسنوات الإنسان|Dog age in human years|age = 16 ln(t) + 31|dogh|16*log(dogage)+31|dogage|من دراسة 2020 على كلاب اللابرادور، للأعمار من سنة وفوق؛ أدق من «ضرب 7».|From a 2020 study of Labradors, for ages one year and up; better than “times 7”.
حجم حوض السمك|Aquarium volume|V = l × w × h / 1000|aqV|aqL*aqW*aqH/1000|aqL aqW aqH|باللتر.|In litres.
كمية تغيير الماء|Water-change volume|V = V_tank × % / 100|wnew_|aqV*wchg/100|aqV wchg|السمك يحب التغيير المنتظم.|Fish like regular water changes.
`);
