/* موسوعة معادلات إيلان — الفلك في حياتنا (القبلة، طول النهار، الظهر)، علم الأدوية الحركي */
EQ.syms(`
# ---- everyday astronomy
latq|φ|خط العرض|latitude|°|24.71
lonq|λ|خط الطول|longitude|°|46.68
qibla|q|اتجاه القبلة من الشمال|Qibla bearing from north|°|244
dmak|d|المسافة إلى مكة|distance to Makkah|km|790
nday|N|رقم اليوم في السنة|day of the year||172
decl|δ|ميل الشمس|solar declination|°|23.44
dlen|t|طول النهار|day length|h|13.4
eot|EoT|معادلة الزمن|equation of time|min|-1.6
tzq|TZ|المنطقة الزمنية|time zone|h|3
noon|t|وقت الظهر الشمسي|solar noon|h|11.92
salt_|h|ارتفاع الشمس عند الظهر|noon sun altitude|°|88.7
objh|h|طول الجسم|object height|m|1
shad|s|طول الظل|shadow length|m|0.58
sunalt|α|ارتفاع الشمس|sun altitude|°|60
moonage|age|عمر القمر|moon age|days|7.4
illum|k|نسبة الإضاءة|illuminated fraction|%|50
# ---- pharmacokinetics
dmg|D|الجرعة|dose|mg|500
Vdist|V_d|حجم التوزيع|volume of distribution|L|40
C0|C₀|التركيز الابتدائي|initial concentration|mg/L|12.5
kelim|k|ثابت الإطراح|elimination rate constant|1/h|0.139
thl|t½|عمر النصف|half-life|h|5
CLr|CL|التصفية|clearance|L/h|5.5
Css|C_ss|التركيز المستهدف|target concentration|mg/L|10
tau|τ|الفاصل بين الجرعات|dosing interval|h|8
Dload|D_L|الجرعة الأولى|loading dose|mg|400
Dmaint|D_M|الجرعة المستمرة|maintenance dose|mg|440
auc|AUC|المساحة تحت المنحنى|area under the curve|mg·h/L|90.9
Fbio|F|التوافر الحيوي|bioavailability|%|80
Vbag|V|الحجم|volume|mL|1000
dropf|DF|معامل التنقيط|drop factor|drops/mL|20
tmin2|t|الزمن|time|min|480
drip|rate|معدل التنقيط|drip rate|drops/min|41.7
mlh|rate|معدل التسريب|infusion rate|mL/h|125
mgamt|m|كمية الدواء في المحلول|drug in the bag|mg|250
concmg|C|التركيز|concentration|mg/mL|0.5
nhl|n|عدد أعمار النصف|number of half-lives||5
remain|%|المتبقي|remaining|%|3.1
`);

EQ.add('qbl',`
اتجاه القبلة|Qibla direction|q = atan2(sin Δλ, cos φ tan φₖ − sin φ cos Δλ)|qibla|(deg(atan2(sin(rad(39.8262-lonq)),cos(rad(latq))*tan(rad(21.4225))-sin(rad(latq))*cos(rad(39.8262-lonq))))+360)%360|latq lonq|الكعبة عند 21.4225° شمالًا و 39.8262° شرقًا. الأرقام الافتراضية للرياض.|The Kaaba is at 21.4225° N, 39.8262° E. Defaults are for Riyadh.
المسافة إلى مكة المكرمة|Distance to Makkah|d = 2R asin √(…)|dmak|2*6371*asin(sqrt(pow(sin(rad(21.4225-latq)/2),2)+cos(rad(latq))*cos(rad(21.4225))*pow(sin(rad(39.8262-lonq)/2),2)))|latq lonq|بالكيلومتر على سطح الأرض.|In kilometres along the Earth’s surface.
ميل الشمس|Solar declination|δ ≈ −23.44° cos(360°(N + 10)/365)|decl|-23.44*cos(rad(360*(nday+10)/365))|nday|سبب الفصول الأربعة.|The reason for the four seasons.
طول النهار|Day length|t = (2/15) acos(−tan φ tan δ)|dlen|2/15*deg(acos(-tan(rad(latq))*tan(rad(decl))))|latq decl|النهار يطول في الصيف ويقصر في الشتاء.|Days are longer in summer and shorter in winter.
معادلة الزمن (تقريب)|Equation of time (approximation)|EoT ≈ 9.87 sin 2B − 7.53 cos B − 1.5 sin B|eot|(()=>{const B=rad(360*(nday-81)/365);return 9.87*sin(2*B)-7.53*cos(B)-1.5*sin(B)})()|nday|ليه الظهر ما يكون دايمًا 12:00 بالضبط.|Why noon isn’t always exactly 12:00.
وقت الظهر الشمسي|Solar noon (time of Dhuhr)|t = 12 + TZ − λ/15 − EoT/60|noon|12+tzq-lonq/15-eot/60|tzq lonq eot|وقت أذان الظهر تقريبًا (بالساعة العشرية).|Close to the Dhuhr time (decimal hours).
ارتفاع الشمس عند الظهر|Sun’s height at noon|h = 90° − ‖φ − δ‖|salt_|90-abs(latq-decl)|latq decl|في الرياض صيفًا الشمس تقريبًا فوق الرأس.|In Riyadh in summer the sun is almost overhead.
طول الظل|Shadow length|s = h / tan α|shad|objh/tan(rad(sunalt))|objh sunalt|يُستخدم في تحديد وقت العصر.|Used to work out the time of Asr.
إضاءة القمر من عمره|Moon illumination from its age|k = (1 − cos(2π age / 29.53)) / 2|illum|(1-cos(2*PI*moonage/29.53))/2*100|moonage|الشهر القمري 29.53 يوم.|A lunar month is 29.53 days.
`);

EQ.add('phk',`
التركيز الابتدائي في الدم|Initial blood concentration|C₀ = D / V_d|C0|dmg/Vdist|dmg Vdist|كم يتركز الدواء بعد ما ينتشر في الجسم.|How concentrated the drug is once spread through the body.
ثابت الإطراح من عمر النصف|Elimination constant from half-life|k = ln 2 / t½|kelim|log(2)/thl|thl|كل ما قصر عمر النصف خرج الدواء أسرع.|A shorter half-life means faster removal.
المساحة تحت المنحنى|Area under the curve|AUC = F D / CL|auc|Fbio/100*dmg/CLr|Fbio dmg CLr|التعرض الكلي للدواء.|The total exposure to a drug.
الجرعة التحميلية (نظريًا)|Loading dose (textbook)|D_L = C_ss V_d / F|Dload|Css*Vdist/(Fbio/100)|Css Vdist Fbio|مثال تعليمي فقط؛ الجرعات يحددها الطبيب.|A teaching example only; doctors set real doses.
الجرعة المستمرة (نظريًا)|Maintenance dose (textbook)|D_M = C_ss CL τ / F|Dmaint|Css*CLr*tau/(Fbio/100)|Css CLr tau Fbio|مثال تعليمي فقط؛ الجرعات يحددها الطبيب.|A teaching example only; doctors set real doses.
المتبقي بعد عدة أعمار نصف|Amount left after several half-lives|% = 100 × (½)ⁿ|remain|100*pow(0.5,nhl)|nhl|بعد 5 أعمار نصف يتبقى حوالي 3%.|After 5 half-lives about 3% remains.
معدل التسريب|Infusion rate|rate = V / t|mlh|Vbag/(tmin2/60)|Vbag tmin2|بالملي لتر في الساعة.|In millilitres per hour.
تركيز المحلول الوريدي|IV bag concentration|C = m / V|concmg|mgamt/Vbag|mgamt Vbag|ملغ لكل ملي لتر.|Milligrams per millilitre.
`);
