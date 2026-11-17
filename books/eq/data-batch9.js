/* موسوعة معادلات إيلان — التكييف والتبريد، الأنابيب والمضخات، نظرية الأعداد، الألعاب والتصنيف، التقويم والوقت */
EQ.syms(`
# ---- HVAC
tons|TR|طن التبريد|tons of refrigeration|TR|1.5
kwcool|Q|قدرة التبريد|cooling capacity|kW|5.28
eer|EER|نسبة كفاءة الطاقة|energy-efficiency ratio|BTU/(W·h)|11.5
pelec|P|القدرة الكهربائية|electrical input|W|1565
mair|ṁ|تدفق الهواء|air mass flow|kg/s|0.5
cpair|c_p|حرارة الهواء النوعية|specific heat of air|kJ/(kg·K)|1.006
dTair|ΔT|فرق حرارة الهواء|air temperature change|K|10
Qair|Q̇|الحرارة المنقولة|heat removed|kW|5.03
dT1|ΔT₁|فرق الحرارة عند الطرف الأول|temperature difference at end 1|K|40
dT2|ΔT₂|فرق الحرارة عند الطرف الثاني|temperature difference at end 2|K|15
lmtd|LMTD|متوسط فرق الحرارة اللوغاريتمي|log-mean temperature difference|K|25.5
Uhx|U|معامل الانتقال الكلي|overall coefficient|W/(m²·K)|500
Ahx|A|مساحة المبادل|exchanger area|m²|4
Qhx|Q̇|قدرة المبادل|exchanger duty|W|51000
pv_|p_v|ضغط البخار|vapour pressure|kPa|1.6
patm|p|الضغط الجوي|atmospheric pressure|kPa|101.325
wrat|w|نسبة الرطوبة|humidity ratio|kg/kg|0.00995
Tdb|T|حرارة البصيلة الجافة|dry-bulb temperature|°C|25
henth|h|إنثالبي الهواء|air enthalpy|kJ/kg|50.4
people|n|عدد الأشخاص|people||10
qperson|q|حرارة الشخص|heat per person|W|100
Qpeople|Q̇|حمل الأشخاص|occupant load|W|1000
ach|ACH|تغيير الهواء في الساعة|air changes per hour|1/h|6
Vroom|V|حجم الغرفة|room volume|m³|60
cfm_|Q|تدفق الهواء|airflow|m³/h|360
# ---- pipes & pumps
fD|f|معامل احتكاك دارسي|Darcy friction factor||0.02
Lpipe|L|طول الأنبوب|pipe length|m|100
Dpp|D|قطر الأنبوب|pipe diameter|m|0.1
vpipe|v|سرعة الماء|flow speed|m/s|2
hloss|h_f|فقد الضاغط|head loss|m|4.08
ReN|Re|رقم رينولدز|Reynolds number||200000
rough|ε|خشونة الأنبوب|pipe roughness|m|4.5e-5
Qpipe|Q|التدفق|flow rate|m³/s|0.0157
Chw|C|معامل هازن-ويليامز|Hazen–Williams coefficient||130
Hpump|H|ضاغط المضخة|pump head|m|30
etap_|η|كفاءة المضخة|pump efficiency|%|70
Ppump|P|قدرة المضخة|pump power|kW|6.6
n1pm|n₁|السرعة الأولى|speed 1|rpm|1450
n2pm|n₂|السرعة الثانية|speed 2|rpm|2900
Q1pm|Q₁|التدفق الأول|flow 1|m³/h|50
Q2pm|Q₂|التدفق الثاني|flow 2|m³/h|100
H1pm|H₁|الضاغط الأول|head 1|m|20
H2pm|H₂|الضاغط الثاني|head 2|m|80
P1pm|P₁|القدرة الأولى|power 1|kW|4
P2pm|P₂|القدرة الثانية|power 2|kW|32
Kfit|K|معامل الفقد في القطعة|fitting loss coefficient||0.9
hminor|h_m|الفقد الثانوي|minor head loss|m|0.18
# ---- number theory
nint|n|العدد|number||360
prm|p|عدد أولي|prime||7
ex1|k|الأس|exponent||2
phiN|φ(n)|دالة أويلر|Euler’s totient||42
ndiv|d(n)|عدد القواسم|number of divisors||24
a1|a|الأس الأول|first exponent||3
a2|b|الأس الثاني|second exponent||2
a3|c|الأس الثالث|third exponent||1
tri|T|العدد المثلثي|triangular number||55
sqr|S|مجموع المربعات|sum of squares||385
cub|C|مجموع المكعبات|sum of cubes||3025
fibn|F|عدد فيبوناتشي|Fibonacci number||55
mers|M|عدد ميرسين|Mersenne number||127
dsum|s|مجموع الأرقام|digit sum||9
# ---- games & rating
RA_|R_A|تصنيف اللاعب الأول|rating of player A||1600
RB_|R_B|تصنيف اللاعب الثاني|rating of player B||1400
EA|E_A|النتيجة المتوقعة|expected score||0.76
SAel|S_A|النتيجة الفعلية|actual score||1
Kelo|K|معامل K|K-factor||32
RAn|R′_A|التصنيف الجديد|new rating||1607.7
nrol|n|عدد الرميات|number of rolls||4
patl|P|الاحتمال|probability|%|51.8
ncoup|n|عدد الأنواع|number of kinds||6
ecoup|E|العدد المتوقع|expected number||14.7
nwalk|n|عدد الخطوات|number of steps||100
dwalk|d|البعد المتوقع|expected distance||10
pwin|p|احتمال الفوز|chance of winning|%|50
# ---- calendar & time
gyear|G|السنة الميلادية|Gregorian year||2027
hyear_|H|السنة الهجرية التقريبية|approximate Hijri year||1448
hyr|H|السنة الهجرية|Hijri year||1448
gyr|G|السنة الميلادية التقريبية|approximate Gregorian year||2026
dday|q|اليوم من الشهر|day of month||1
mmon|m|الشهر|month||1
yfull|y|السنة|year||2027
dow|h|يوم الأسبوع|day of the week||6
leap|leap|سنة كبيسة؟|leap year? (1 = yes)||0
lonz|λ|خط الطول|longitude|°|45
toff|Δt|الفرق الزمني الشمسي|solar time offset|h|3
secs|t|الثواني|seconds|s|100000
dhrs|t|الساعات|hours|h|27.8
jd|JD|اليوم اليولياني|Julian day number||2461407
`);

EQ.add('hvc',`
من طن التبريد إلى كيلوواط|Tons of refrigeration to kW|Q = TR × 3.517|kwcool|tons*3.517|tons|طن التبريد = 12000 وحدة حرارية في الساعة.|One ton is 12,000 BTU per hour.
نسبة كفاءة المكيف|Air-conditioner EER|EER = BTU/h / W|eer|tons*12000/pelec|tons pelec|كل ما زادت كان المكيف أوفر.|Higher means a more efficient unit.
الحرارة المسحوبة من الهواء|Heat removed from air|Q̇ = ṁ c_p ΔT|Qair|mair*cpair*dTair|mair cpair dTair|أساس حساب المكيفات.|The basis of air-conditioner sizing.
متوسط فرق الحرارة اللوغاريتمي|Log-mean temperature difference|LMTD = (ΔT₁ − ΔT₂) / ln(ΔT₁ / ΔT₂)|lmtd|(dT1-dT2)/log(dT1/dT2)|dT1 dT2|لتصميم المبادلات الحرارية.|For designing heat exchangers.
قدرة المبادل الحراري|Heat-exchanger duty|Q̇ = U A LMTD|Qhx|Uhx*Ahx*lmtd|Uhx Ahx lmtd|كم حرارة ينقل المبادل.|How much heat the exchanger moves.
نسبة الرطوبة في الهواء|Humidity ratio of air|w = 0.622 p_v / (p − p_v)|wrat|0.622*pv_/(patm-pv_)|pv_ patm|كيلوغرام ماء لكل كيلو هواء جاف.|Kilograms of water per kilogram of dry air.
إنثالبي الهواء الرطب|Enthalpy of moist air|h = 1.006 T + w(2501 + 1.86 T)|henth|1.006*Tdb+wrat*(2501+1.86*Tdb)|Tdb wrat|الحرارة المخزنة في الهواء والبخار.|Heat held by the air and its vapour.
حمل الأشخاص على المكيف|Cooling load from people|Q̇ = n × q|Qpeople|people*qperson|people qperson|كل شخص يطلع حوالي 100 واط.|Each person gives off about 100 W.
تدفق التهوية المطلوب|Ventilation airflow needed|Q = ACH × V|cfm_|ach*Vroom|ach Vroom|كم مرة يتجدد هواء الغرفة في الساعة.|How many times the room’s air is replaced each hour.
`);

EQ.add('pip',`
فقد الضاغط (دارسي-وايسباخ)|Head loss (Darcy–Weisbach)|h_f = f (L/D) v² / (2g)|hloss|fD*(Lpipe/Dpp)*vpipe*vpipe/(2*g)|fD Lpipe Dpp vpipe g|الأنبوب الأطول والأضيق يفقد ضغط أكثر.|Longer, narrower pipes lose more pressure.
معامل الاحتكاك للتدفق الطبقي|Friction factor for laminar flow|f = 64 / Re|fD|64/ReN|ReN|لما Re أقل من 2300.|When Re is below 2300.
معامل الاحتكاك (سوامي-جاين)|Friction factor (Swamee–Jain)|f = 0.25 / [log₁₀(ε/(3.7D) + 5.74/Re^0.9)]²|fD|0.25/pow(log10(rough/(3.7*Dpp)+5.74/pow(ReN,0.9)),2)|rough Dpp ReN|للتدفق المضطرب بدون جداول.|For turbulent flow without charts.
التدفق في الأنبوب|Flow rate in a pipe|Q = v π D² / 4|Qpipe|vpipe*PI*Dpp*Dpp/4|vpipe Dpp|السرعة × مساحة المقطع.|Speed × cross-section area.
فقد الضاغط (هازن-ويليامز)|Head loss (Hazen–Williams)|h_f = 10.67 L Q^1.852 / (C^1.852 D^4.87)|hloss|10.67*Lpipe*pow(Qpipe,1.852)/(pow(Chw,1.852)*pow(Dpp,4.87))|Lpipe Qpipe Chw Dpp|معادلة مهندسي شبكات المياه.|The water-network engineers’ formula.
قدرة المضخة|Pump power|P = ρ g Q H / η|Ppump|1000*g*Qpipe*Hpump/(etap_/100)/1000|g Qpipe Hpump etap_|بالكيلوواط.|In kilowatts.
قوانين التشابه: التدفق|Pump affinity law: flow|Q₂ = Q₁ (n₂ / n₁)|Q2pm|Q1pm*n2pm/n1pm|Q1pm n1pm n2pm|ضاعف السرعة يتضاعف التدفق.|Double the speed, double the flow.
قوانين التشابه: الضاغط|Pump affinity law: head|H₂ = H₁ (n₂ / n₁)²|H2pm|H1pm*pow(n2pm/n1pm,2)|H1pm n1pm n2pm|ضاعف السرعة يصير الضاغط 4 أضعاف.|Double the speed, four times the head.
قوانين التشابه: القدرة|Pump affinity law: power|P₂ = P₁ (n₂ / n₁)³|P2pm|P1pm*pow(n2pm/n1pm,3)|P1pm n1pm n2pm|ضاعف السرعة تصير القدرة 8 أضعاف!|Double the speed, eight times the power!
الفقد في الأكواع والصمامات|Losses in bends and valves|h_m = K v² / (2g)|hminor|Kfit*vpipe*vpipe/(2*g)|Kfit vpipe g|كل كوع وصمام يسرق شوي ضغط.|Every bend and valve steals a little pressure.
`);

EQ.add('nth',`
دالة أويلر لقوة عدد أولي|Euler’s totient of a prime power|φ(pᵏ) = pᵏ − pᵏ⁻¹|phiN|pow(prm,ex1)-pow(prm,ex1-1)|prm ex1|كم عدد أصغر من pᵏ ما يشاركه أي قاسم.|How many numbers below pᵏ share no factor with it.
عدد القواسم|Number of divisors|d(n) = (a + 1)(b + 1)(c + 1)|ndiv|(a1+1)*(a2+1)*(a3+1)|a1 a2 a3|360 = 2³·3²·5 عنده 24 قاسم.|360 = 2³·3²·5 has 24 divisors.
أعداد ميرسين|Mersenne numbers|M = 2ᵖ − 1|mers|pow(2,prm)-1|prm|أكبر الأعداد الأولية المعروفة منها.|The largest known primes are Mersenne primes.
اختبار القسمة على 9|Divisibility by 9|n ≡ مجموع أرقامه (mod 9)||||إذا مجموع الأرقام يقبل القسمة على 9، العدد كذلك.|If the digit sum divides by 9, so does the number.
اختبار القسمة على 11|Divisibility by 11|فرق مجموع الأرقام الفردية والزوجية يقبل القسمة على 11||||مثال: 121 ← 1 − 2 + 1 = 0.|Example: 121 → 1 − 2 + 1 = 0.
نظرية ويلسون|Wilson’s theorem|(p − 1)! ≡ −1 (mod p)||||صحيحة فقط إذا p أولي.|True only when p is prime.
الأعداد التامة|Perfect numbers|2ᵖ⁻¹(2ᵖ − 1)||||6 = 1 + 2 + 3 و 28 = 1 + 2 + 4 + 7 + 14.|6 = 1 + 2 + 3 and 28 = 1 + 2 + 4 + 7 + 14.
حدسية غولدباخ|Goldbach’s conjecture|كل عدد زوجي > 2 = مجموع عددين أوليين||||ما أحد أثبتها للحين!|Nobody has proved it yet!
مبرهنة فيثاغورس الثلاثية|Pythagorean triples|(m² − n², 2mn, m² + n²)||||تولد كل الثلاثيات مثل 3، 4، 5.|Generates every triple such as 3, 4, 5.
مبرهنة الباقي الصيني|Chinese remainder theorem|x ≡ aᵢ (mod mᵢ) لها حل وحيد||||إذا كانت المقاسات أولية فيما بينها.|When the moduli are pairwise coprime.
`);

EQ.add('gam',`
النتيجة المتوقعة (تصنيف إيلو)|Expected score (Elo rating)|E_A = 1 / (1 + 10^((R_B − R_A)/400))|EA|1/(1+pow(10,(RB_-RA_)/400))|RA_ RB_|نظام تصنيف الشطرنج والألعاب الإلكترونية.|The rating system of chess and online games.
تحديث تصنيف إيلو|Updating an Elo rating|R′ = R + K (S − E)|RAn|RA_+Kelo*(SAel-EA)|RA_ Kelo SAel EA|الفوز على لاعب أقوى يرفعك أكثر.|Beating a stronger player raises you more.
ستة واحدة على الأقل في n رمية|At least one six in n rolls|P = 1 − (5/6)ⁿ|patl|(1-pow(5/6,nrol))*100|nrol|في 4 رميات الاحتمال أكثر من النص.|With 4 rolls the chance is over half.
جمع كل الأنواع (مشكلة جامع الكوبونات)|Collecting every kind (coupon collector)|E = n (1 + 1/2 + … + 1/n)|ecoup|(()=>{let s=0;for(let k=1;k<=Math.round(ncoup);k++)s+=1/k;return ncoup*s})()|ncoup|كم علبة تشتري لين تجمع كل البطاقات.|How many packs until you collect every card.
المشي العشوائي|Random walk|d ≈ √n|dwalk|sqrt(nwalk)|nwalk|بعد 100 خطوة عشوائية تكون بعيد حوالي 10.|After 100 random steps you are about 10 away.
عدد الرميات المتوقع لستة|Expected rolls to get a six|E = 1 / p = 6||||في المتوسط 6 رميات.|On average, 6 rolls.
احتمال الفوز في سلسلة ضربات الترجيح|Penalty shoot-out odds|P(فوز) = Σ احتمالات التسجيل||||كل ركلة مستقلة عن الثانية.|Each kick is independent.
`);

EQ.add('cal',`
من الميلادي إلى الهجري (تقريب)|Gregorian to Hijri (approximate)|H ≈ (G − 622) × 33 / 32|hyear_|floor((gyear-622)*33/32)|gyear|السنة الهجرية أقصر بـ 11 يوم تقريبًا، فكل سنة ميلادية فيها جزء من سنتين هجريتين.|A Hijri year is about 11 days shorter, so each Gregorian year spans parts of two Hijri years.
من الهجري إلى الميلادي (تقريب)|Hijri to Gregorian (approximate)|G ≈ 622 + H × 32 / 33|gyr|round(622+hyr*32/33)|hyr|تقريب قد يختلف بسنة.|An estimate that can be off by one year.
السنة الكبيسة|Leap-year rule|كبيسة إذا (÷4 وليست ÷100) أو ÷400|leap|((yfull%4===0&&yfull%100!==0)+(yfull%400===0))>0?1:0|yfull|2000 كبيسة، 1900 لا.|2000 was a leap year; 1900 was not.
يوم الأسبوع (زيلر)|Day of the week (Zeller)|h = (q + ⌊13(m + 1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ + 5J) mod 7|dow|(()=>{let m=mmon,y=yfull;if(m<3){m+=12;y-=1}const K=y%100,J=Math.floor(y/100);return (dday+Math.floor(13*(m+1)/5)+K+Math.floor(K/4)+Math.floor(J/4)+5*J)%7})()|dday mmon yfull|0 = السبت، 1 = الأحد، … 6 = الجمعة. جرّب 1/1/2027 (افتتاح إيلان دول).|0 = Saturday, 1 = Sunday … 6 = Friday. Try 1 Jan 2027 (Eilan Doll’s launch).
الوقت الشمسي من خط الطول|Solar time from longitude|Δt = λ / 15|toff|lonz/15|lonz|كل 15 درجة = ساعة.|Every 15° is one hour.
الثواني إلى ساعات|Seconds to hours|t = s / 3600|dhrs|secs/3600|secs|اليوم = 86400 ثانية.|A day is 86,400 seconds.
اليوم اليولياني|Julian day number|JD = q + ⌊(153m′ + 2)/5⌋ + 365y′ + ⌊y′/4⌋ − ⌊y′/100⌋ + ⌊y′/400⌋ − 32045|jd|(()=>{const a=Math.floor((14-mmon)/12),y=yfull+4800-a,m=mmon+12*a-3;return dday+Math.floor((153*m+2)/5)+365*y+Math.floor(y/4)-Math.floor(y/100)+Math.floor(y/400)-32045})()|dday mmon yfull|الفلكيون يعدّون الأيام بدون شهور ولا سنين.|Astronomers count days with no months or years.
`);
