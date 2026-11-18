/* موسوعة معادلات إيلان — الطاقة المتجددة، الفضاء، البناء، التصوير، الطقس، تحويل الوحدات */
EQ.syms(`
# ---- renewables
irr|G|الإشعاع الشمسي|solar irradiance|W/m²|1000
etap|η|كفاءة اللوح|panel efficiency|%|20
ppanel|P|قدرة اللوح|panel output|W|400
rblade|r|طول الشفرة|blade length|m|40
Aswept|A|المساحة المجروفة|swept area|m²|5027
vwind|v|سرعة الرياح|wind speed|m/s|8
Cpw|C_p|معامل القدرة|power coefficient||0.4
pdens|P/A|كثافة قدرة الرياح|wind power density|W/m²|307
Eact|E|الطاقة المنتجة فعليًا|energy actually produced|MWh|3500
Prated|P|القدرة المقننة|rated power|MW|2
hyear|t|عدد الساعات|hours|h|8760
CF|CF|معامل السعة|capacity factor|%|20
capex|cost|تكلفة النظام|system cost|SAR|20000
saving|S|التوفير السنوي|annual saving|SAR|2500
payback|t|فترة الاسترداد|payback period|years|8
efac|k|انبعاثات كل كيلوواط ساعة|emission factor|kg/kWh|0.6
co2kg|CO₂|ثاني أكسيد الكربون|CO₂|kg|600
trees|N|عدد الأشجار|number of trees||27
vbat|V|جهد البطارية|battery voltage|V|12
ahbat|Ah|سعة البطارية|battery capacity|Ah|100
whbat|E|طاقة البطارية|battery energy|Wh|1200
eout|E_out|الطاقة الناتجة|energy delivered||30
ein|E_in|الطاقة المستثمرة|energy invested||3
eroi|EROI|عائد الطاقة على الاستثمار|energy return on investment||10
# ---- space
thrust|F|قوة الدفع|thrust|N|7.6e6
mrock|m|كتلة الصاروخ|rocket mass|kg|5.5e5
twr|TWR|نسبة الدفع إلى الوزن|thrust-to-weight ratio||1.5
isp|I_sp|الدفع النوعي|specific impulse|s|300
dkm2|d|المسافة|distance|km|2.25e8
tdelay|t|زمن التأخير|delay|s|750
gpl|g|جاذبية الكوكب|planet’s gravity|m/s²|3.71
wpl|W|الوزن على الكوكب|weight on the planet|N|260
dyear|T|طول سنة الكوكب|planet’s year|Earth days|687
agepl|age|العمر بسنوات الكوكب|age in planet years||7.4
rorb1|r₁|نصف قطر المدار الأول|first orbit radius|m|1.496e11
rorb2|r₂|نصف قطر المدار الثاني|second orbit radius|m|2.279e11
GMs|GM|ثابت جاذبية الشمس|Sun’s gravitational parameter|m³/s²|1.327e20
thoh|t|زمن الانتقال|transfer time|days|259
dau|d|البعد عن الشمس|distance from the Sun|AU|1.52
Psol|P|قدرة الألواح|solar-array power|W|1000
rstat|r|نصف قطر المحطة|station radius|m|100
aart|a|الجاذبية الصناعية|artificial gravity|m/s²|9.8
rpmst|rpm|دوران المحطة|station spin|rpm|3
# ---- construction
Lsl|L|الطول|length|m|6
Wsl|W|العرض|width|m|4
tsl|t|السماكة|thickness|m|0.15
Vcon|V|الحجم|volume|m³|3.6
Awall|A|مساحة الجدار|wall area|m²|12
abrick|a|مساحة وجه الطوبة مع المونة|brick face incl. mortar|m²|0.0133
nbrick|N|عدد الطوب|number of bricks||900
rise|rise|الارتفاع الكلي|total rise|cm|300
riser|R|ارتفاع الدرجة|riser height|cm|17
nstep|N|عدد الدرجات|number of steps||18
tread|T|عمق الدرجة|tread depth|cm|29
runh|run|المسافة الأفقية|horizontal run|cm|400
slopep|slope|الميل|slope|%|8
wload|w|الحمل الموزع|distributed load|N/m|5000
defl|δ|الهبوط|deflection|m|0.01
Keff|K|معامل طول العمود|effective-length factor||1
Pcr|P_cr|حمل الانبعاج الحرج|critical buckling load|N|1e6
qbear|q|ضغط الأساس على التربة|bearing pressure|kPa|150
Afoot|A|مساحة الأساس|footing area|m²|2
Fkn|P|الحمل|load|kN|300
rtank|r|نصف قطر الخزان|tank radius|m|1
htank|h|ارتفاع الخزان|tank height|m|2
Ltank|V|سعة الخزان|tank capacity|L|6283
dbar|d|قطر حديد التسليح|rebar diameter|mm|12
kgm|w|الوزن لكل متر|weight per metre|kg/m|0.89
wwall|b|عرض الجدار|wall width|m|5
Fwall|F|قوة الماء على الجدار|water force on the wall|N|98000
qwind|q|ضغط الرياح|wind pressure|Pa|613
# ---- photography & screens
fN|N|رقم البؤرة|f-number||2.8
flen|f|البعد البؤري|focal length|mm|50
Dlens|D|قطر فتحة العدسة|aperture diameter|mm|17.9
shut|t|سرعة الغالق|shutter time|s|0.008
EV|EV|قيمة التعريض|exposure value||9.9
sensor|w|عرض الحساس|sensor width|mm|36
fov|FOV|زاوية الرؤية|field of view|°|39.6
crop|k|معامل القص|crop factor||1.5
feq|f_eq|البعد البؤري المكافئ|equivalent focal length|mm|75
pxw|W|عرض الصورة|width|px|4000
pxh|H|ارتفاع الصورة|height|px|3000
mp|MP|الميغابكسل|megapixels||12
diag|d|قطر الشاشة|screen diagonal|in|6.1
ppi|PPI|كثافة البكسل|pixel density|px/in|460
dpi|DPI|نقاط لكل إنش|dots per inch||300
inch|L|الطول|length|in|13.3
coc|c|دائرة الاختلاط|circle of confusion|mm|0.03
hyper|H|المسافة فوق البؤرية|hyperfocal distance|m|29.8
fps|fps|إطارات في الثانية|frames per second||30
frame|t|زمن الإطار|frame time|ms|33.3
vbr|bit rate|معدل البت للفيديو|video bit rate|Mbit/s|20
vsize|size|حجم الفيديو|video size|MB|150
GN|GN|الرقم الدليلي للفلاش|flash guide number||36
dflash|d|بعد الهدف|subject distance|m|4
# ---- weather
Tair|T|درجة الحرارة|air temperature|°C|5
vkmh|v|سرعة الرياح|wind speed|km/h|30
Twc|T_wc|الإحساس بالبرودة|wind-chill temperature|°C|-0.6
Tdew|T_d|نقطة الندى|dew point|°C|10
hcloud|h|ارتفاع قاعدة السحب|cloud-base height|m|1250
Tair2|T|درجة الحرارة|air temperature|°C|25
esat|e_s|ضغط البخار المشبع|saturation vapour pressure|kPa|3.17
rainmm|depth|كمية المطر|rainfall|mm|10
Aroof|A|مساحة السطح|catchment area|m²|100
Lrain|V|كمية الماء المجمّعة|water collected|L|1000
bft|B|درجة بوفورت|Beaufort number||5
vbft|v|سرعة الرياح|wind speed|m/s|9.3
# ---- unit conversions
km_|km|كيلومتر|kilometres|km|10
mi_|mi|ميل|miles|mi|6.21
kg_|kg|كيلوغرام|kilograms|kg|70
lb_|lb|رطل|pounds|lb|154.3
cm_|cm|سنتيمتر|centimetres|cm|170
in_|in|إنش|inches|in|66.9
L_|L|لتر|litres|L|10
gal_|gal|غالون أمريكي|US gallons|gal|2.64
m2_|m²|متر مربع|square metres|m²|100
ft2_|ft²|قدم مربع|square feet|ft²|1076
kmh_|km/h|كم/ساعة|km/h|km/h|100
mph_|mph|ميل/ساعة|mph|mph|62.1
kcal_|kcal|سعرة|kilocalories|kcal|500
kJ_|kJ|كيلوجول|kilojoules|kJ|2092
bar_|bar|بار|bar|bar|2.2
psi_|psi|رطل لكل إنش مربع|psi|psi|31.9
g_|g|غرام|grams|g|100
oz_|oz|أونصة|ounces|oz|3.53
ha_|ha|هكتار|hectares|ha|2
dunam_|dunam|دونم|dunams||20
m_|m|متر|metres|m|100
ft_|ft|قدم|feet|ft|328
gb_|GB|غيغابايت|gigabytes|GB|1
mb_|MB|ميغابايت|megabytes|MB|1000
`);

EQ.add('env',`
كفاءة اللوح الشمسي|Solar-panel efficiency|η = P / (A G) × 100|etap|ppanel/(Ar*irr)*100|ppanel Ar irr|أغلب الألواح اليوم بين 18 و23%.|Most panels today are 18–23% efficient.
قدرة اللوح الشمسي|Solar-panel power|P = A G η / 100|ppanel|Ar*irr*etap/100|Ar irr etap|المساحة × الإشعاع × الكفاءة.|Area × sunlight × efficiency.
الطاقة اليومية من اللوح|Daily energy from a panel|E = P × h_sun / 1000|kwh|ppanel*psun/1000|ppanel psun|بالكيلوواط ساعة.|In kilowatt-hours.
المساحة المجروفة للتوربين|Swept area of a wind turbine|A = π r²|Aswept|PI*rblade*rblade|rblade|ضاعف طول الشفرة تصير المساحة 4 أضعاف.|Double the blade length and the area quadruples.
قدرة توربين الرياح|Wind-turbine power|P = ½ ρ A v³ C_p|P|0.5*rhoa*Aswept*vwind**3*Cpw|rhoa Aswept vwind Cpw|ضاعف سرعة الرياح تصير القدرة 8 أضعاف!|Double the wind speed and power rises eightfold!
كثافة قدرة الرياح|Wind power density|P/A = ½ ρ v³|pdens|0.5*rhoa*vwind**3|rhoa vwind|تقيس قوة الرياح في الموقع.|Measures how good a site’s wind is.
معامل السعة|Capacity factor|CF = E / (P × t) × 100|CF|Eact/(Prated*hyear)*100|Eact Prated hyear|كم تشتغل المحطة فعلًا مقارنة بأقصى طاقتها.|How much a plant really runs compared with its maximum.
فترة استرداد تكلفة الطاقة الشمسية|Solar payback period|t = cost / S|payback|capex/saving|capex saving|بعد كم سنة يرجع لك المبلغ.|How many years until the system pays for itself.
بصمة الكربون للكهرباء|Carbon footprint of electricity|CO₂ = E × k|co2kg|kwh*efac|kwh efac|k يختلف حسب مصدر الكهرباء في بلدك.|k depends on how your country makes electricity.
الأشجار اللازمة للتعويض|Trees needed to offset CO₂|N ≈ CO₂ / 22|trees|co2kg/22|co2kg|تقريب: الشجرة تمتص حوالي 22 كغ في السنة.|Rough guide: a tree absorbs about 22 kg a year.
طاقة بطارية التخزين|Storage-battery energy|E = V × Ah|whbat|vbat*ahbat|vbat ahbat|بالواط ساعة.|In watt-hours.
عائد الطاقة على الاستثمار|Energy return on investment|EROI = E_out / E_in|eroi|eout/ein|eout ein|كم مرة يرجع لك الطاقة اللي صرفتها.|How many times over you get your energy back.
`);

EQ.add('spc',`
نسبة الدفع إلى الوزن|Thrust-to-weight ratio|TWR = F / (m g)|twr|thrust/(mrock*g)|thrust mrock g|لازم تكون أكبر من 1 عشان الصاروخ يرتفع.|It must exceed 1 for a rocket to lift off.
الدفع النوعي|Specific impulse|I_sp = vₑ / g₀|isp|vexh/9.81|vexh|كل ما زاد كان المحرك أوفر في الوقود.|Higher means a more fuel-efficient engine.
تأخر الإشارة في الفضاء|Signal delay in space|t = d / c|tdelay|dkm2*1000/299792458|dkm2|الإشارة للمريخ تاخذ دقائق.|A signal to Mars takes minutes.
وزنك على كوكب ثاني|Your weight on another planet|W = m g|wpl|m*gpl|m gpl|الكتلة نفسها، الوزن يتغير.|Same mass, different weight.
عمرك بسنوات كوكب ثاني|Your age in another planet’s years|age = age × 365.25 / T|agepl|age*365.25/dyear|age dyear|سنة المريخ 687 يوم أرضي.|A Mars year is 687 Earth days.
زمن مدار القمر الصناعي|Satellite orbital period|T = 2π √((R + h)³ / (G M))|Tp|2*PI*sqrt((Rp+hAlt)**3/(G*Mp))|Rp hAlt G Mp|محطة الفضاء تلف الأرض في حوالي 92 دقيقة.|The space station circles Earth in about 92 minutes.
زمن رحلة هوهمان|Hohmann transfer time|t = π √(((r₁ + r₂)/2)³ / GM)|thoh|PI*sqrt(((rorb1+rorb2)/2)**3/GMs)/86400|rorb1 rorb2 GMs|أوفر طريق بين مدارين؛ النتيجة بالأيام.|The cheapest path between two orbits; result in days.
قدرة الألواح بعيدًا عن الشمس|Solar power far from the Sun|P = P₀ / d²|Psol|ppanel/(dau*dau)|ppanel dau|عند المريخ الألواح تعطي أقل من النصف.|At Mars, panels give less than half.
الجاذبية الصناعية بالدوران|Artificial gravity by spinning|a = ω² r|aart|(2*PI*rpmst/60)**2*rstat|rpmst rstat|محطة تدور تحسّسك بوزن.|A spinning station gives you weight.
دوران المحطة لجاذبية الأرض|Spin needed for Earth gravity|rpm = 60 √(g / r) / (2π)|rpmst|60*sqrt(g/rstat)/(2*PI)|g rstat|المحطة الأكبر تدور أبطأ.|A bigger station spins slower.
`);

EQ.add('civ',`
حجم خرسانة البلاطة|Concrete for a slab|V = L × W × t|Vcon|Lsl*Wsl*tsl|Lsl Wsl tsl|زِد 5–10% احتياط.|Add 5–10% extra.
عدد الطوب في الجدار|Bricks in a wall|N = A / a|nbrick|Awall/abrick|Awall abrick|الطوبة القياسية مع المونة ≈ 75 طوبة للمتر.|A standard brick with mortar is about 75 per m².
عدد درجات السلم|Number of stair steps|N = rise / R|nstep|rise/riser|rise riser|ارتفاع الدرجة المريح 15–18 سم.|A comfortable riser is 15–18 cm.
قاعدة الدرج المريح (بلوندل)|Comfortable stair rule (Blondel)|T = 63 − 2R|tread|63-2*riser|riser|خطوة الإنسان حوالي 63 سم.|A human step is about 63 cm.
ميل المنحدر|Ramp slope|slope = rise / run × 100|slopep|rise/runh*100|rise runh|منحدرات الكراسي المتحركة عادة أقل من 8%.|Wheelchair ramps are usually under 8%.
زاوية ميل السقف|Roof pitch angle|θ = atan(rise / run)|ang|deg(atan(rise/runh))|rise runh|تحويل الميل إلى درجات.|Turns a slope into degrees.
هبوط عارضة بحمل موزع|Beam deflection under a uniform load|δ = 5 w L⁴ / (384 E I)|defl|5*wload*Lbeam**4/(384*Ebeam*Ibeam)|wload Lbeam Ebeam Ibeam|العارضة الأطول تهبط أكثر بكثير.|A longer beam sags much more.
حمل انبعاج العمود (أويلر)|Column buckling load (Euler)|P = π² E I / (K L)²|Pcr|PI*PI*Ebeam*Ibeam/(Keff*Lbeam)**2|Ebeam Ibeam Keff Lbeam|الأعمدة النحيفة تنثني قبل ما تنكسر.|Slender columns bend before they crush.
ضغط الأساس على التربة|Footing bearing pressure|q = P / A|qbear|Fkn/Afoot|Fkn Afoot|لازم يكون أقل من تحمل التربة.|Must stay below what the soil can carry.
سعة خزان الماء|Water-tank capacity|V = π r² h × 1000|Ltank|PI*rtank*rtank*htank*1000|rtank htank|بالتر.|In litres.
وزن حديد التسليح|Rebar weight per metre|w = d² / 162|kgm|dbar*dbar/162|dbar|قاعدة مشهورة عند المهندسين (d بالملم).|A well-known site rule (d in mm).
قوة الماء على جدار الخزان|Water force on a tank wall|F = ½ ρ g h² b|Fwall|0.5*rho*g*hd*hd*wwall|rho g hd wwall|الضغط يزيد مع العمق.|Pressure grows with depth.
ضغط الرياح على المبنى|Wind pressure on a building|q = 0.613 v²|qwind|0.613*vwind**2|vwind|بالباسكال.|In pascals.
`);

EQ.add('pho',`
رقم البؤرة|f-number|N = f / D|fN|flen/Dlens|flen Dlens|الرقم الأصغر يعني فتحة أكبر وضوء أكثر.|A smaller number means a wider opening and more light.
قيمة التعريض|Exposure value|EV = log₂(N² / t)|EV|log2(fN*fN/shut)|fN shut|نفس القيمة تعطي نفس الإضاءة بإعدادات مختلفة.|The same EV gives the same exposure with different settings.
زاوية رؤية العدسة|Lens field of view|FOV = 2 atan(w / 2f)|fov|deg(2*atan(sensor/(2*flen)))|sensor flen|العدسة الواسعة تشوف أكثر.|A wide lens sees more.
البعد البؤري المكافئ|Equivalent focal length|f_eq = f × k|feq|flen*crop|flen crop|الحساس الأصغر يقرّب الصورة.|A smaller sensor crops in.
عدد الميغابكسل|Megapixels|MP = W × H / 10⁶|mp|pxw*pxh/1e6|pxw pxh|ملايين النقاط في الصورة.|Millions of dots in the picture.
كثافة بكسل الشاشة|Screen pixel density|PPI = √(W² + H²) / d|ppi|sqrt(pxw*pxw+pxh*pxh)/diag|pxw pxh diag|كل ما زادت كانت الشاشة أنعم.|Higher means a sharper screen.
حجم الطباعة|Print size|L = pixels / DPI|inch|pxw/dpi|pxw dpi|300 نقطة للإنش طباعة ممتازة.|300 dpi is excellent print quality.
المسافة فوق البؤرية|Hyperfocal distance|H = f² / (N c) + f|hyper|(flen*flen/(fN*coc)+flen)/1000|flen fN coc|ركّز هنا فيصير كل شي حاد من نص المسافة للأفق.|Focus here and everything from half that distance to infinity is sharp.
زمن الإطار|Frame time|t = 1000 / fps|frame|1000/fps|fps|60 إطار = 16.7 ملي ثانية للإطار.|60 fps is 16.7 ms per frame.
حجم ملف الفيديو|Video file size|size = bit rate × t × 60 / 8|vsize|vbr*tmin*60/8|vbr tmin|t بالدقائق، والناتج بالميغابايت.|t in minutes; result in megabytes.
قاعدة سرعة الغالق|Hand-held shutter rule|t = 1 / (f × k)|shut|1/(flen*crop)|flen crop|أبطأ من كذا الصورة تهتز.|Any slower and the picture may blur.
الرقم الدليلي للفلاش|Flash guide number|GN = d × N|GN|dflash*fN|dflash fN|يقيس قوة الفلاش.|Measures how strong a flash is.
`);

EQ.add('wth',`
الإحساس بالبرودة|Wind chill|T = 13.12 + 0.6215 T_a − 11.37 v^0.16 + 0.3965 T_a v^0.16|Twc|13.12+0.6215*Tair-11.37*pow(vkmh,0.16)+0.3965*Tair*pow(vkmh,0.16)|Tair vkmh|الرياح تخلي الجو يحسّسك أبرد.|Wind makes it feel colder.
ارتفاع قاعدة السحب|Cloud-base height|h ≈ 125 (T − T_d)|hcloud|125*(Tair2-Tdew)|Tair2 Tdew|كل ما زاد الفرق ارتفعت السحب.|The bigger the gap, the higher the clouds.
ضغط البخار المشبع (تيتنز)|Saturation vapour pressure (Tetens)|e_s = 0.6108 exp(17.27 T / (T + 237.3))|esat|0.6108*exp(17.27*Tair2/(Tair2+237.3))|Tair2|الهواء الحار يشيل بخار أكثر.|Warm air holds more water vapour.
حصاد مياه الأمطار|Rainwater harvesting|V = A × depth|Lrain|Aroof*rainmm|Aroof rainmm|كل ملم مطر على متر مربع = لتر.|Each mm of rain on 1 m² gives 1 litre.
سرعة الرياح من درجة بوفورت|Wind speed from the Beaufort number|v = 0.836 B^1.5|vbft|0.836*pow(bft,1.5)|bft|بوفورت 12 = إعصار.|Beaufort 12 is hurricane force.
`);

EQ.add('unt',`
كيلومتر إلى ميل|Kilometres to miles|mi = km × 0.621371|mi_|km_*0.621371|km_|الميل ≈ 1.609 كم.|One mile ≈ 1.609 km.
كيلوغرام إلى رطل|Kilograms to pounds|lb = kg × 2.20462|lb_|kg_*2.20462|kg_|الرطل ≈ 0.454 كغ.|One pound ≈ 0.454 kg.
سنتيمتر إلى إنش|Centimetres to inches|in = cm / 2.54|in_|cm_/2.54|cm_|الإنش = 2.54 سم بالضبط.|One inch is exactly 2.54 cm.
لتر إلى غالون|Litres to US gallons|gal = L / 3.78541|gal_|L_/3.78541|L_|الغالون الأمريكي ≈ 3.785 لتر.|One US gallon ≈ 3.785 L.
متر مربع إلى قدم مربع|Square metres to square feet|ft² = m² × 10.7639|ft2_|m2_*10.7639|m2_|مهم في إعلانات الشقق.|Handy for apartment listings.
كم/ساعة إلى ميل/ساعة|km/h to mph|mph = km/h × 0.621371|mph_|kmh_*0.621371|kmh_|لوحات السرعة في بعض الدول بالميل.|Some countries post speeds in mph.
سعرة إلى كيلوجول|Kilocalories to kilojoules|kJ = kcal × 4.184|kJ_|kcal_*4.184|kcal_|بعض الملصقات تكتب الطاقة بالكيلوجول.|Some labels list energy in kJ.
بار إلى psi|Bar to psi|psi = bar × 14.5038|psi_|bar_*14.5038|bar_|ضغط الإطارات.|Tyre pressure.
غرام إلى أونصة|Grams to ounces|oz = g / 28.3495|oz_|g_/28.3495|g_|الأونصة ≈ 28.35 غرام.|One ounce ≈ 28.35 g.
هكتار إلى دونم|Hectares to dunams|dunam = ha × 10|dunam_|ha_*10|ha_|الدونم 1000 متر مربع.|A dunam is 1000 m².
متر إلى قدم|Metres to feet|ft = m / 0.3048|ft_|m_/0.3048|m_|ارتفاع الطائرات يقاس بالقدم.|Aircraft altitude is measured in feet.
غيغابايت إلى ميغابايت|Gigabytes to megabytes|MB = GB × 1000|mb_|gb_*1000|gb_|بعض الأجهزة تحسب 1024 بدل 1000.|Some devices count 1024 instead of 1000.
`);
