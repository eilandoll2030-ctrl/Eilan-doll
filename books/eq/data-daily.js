/* موسوعة معادلات إيلان — الحياة اليومية: الرياضة، الصحة، المطبخ، الموسيقى، السيارات، البيت */
EQ.syms(`
# ---- sport
dkm|d|المسافة|distance|km|5
tmin|t|الزمن|time|min|30
kmh|v|السرعة|speed|km/h|10
paceM|pace|الوتيرة|pace|min/km|6
mets|MET|المكافئ الأيضي للنشاط|MET value||8
kcal|E|الطاقة|energy|kcal|300
hrmax|HR_max|أقصى نبض|maximum heart rate|bpm|190
hrrest|HR_rest|نبض الراحة|resting heart rate|bpm|60
hrr|HRR|احتياطي النبض|heart-rate reserve|bpm|130
dm12|d|المسافة في 12 دقيقة|distance in 12 minutes|m|2400
vo2|VO₂max|أقصى استهلاك للأكسجين|VO₂max|mL/(kg·min)|42.4
wkg|w|الوزن المرفوع|weight lifted|kg|60
reps|r|عدد التكرارات|repetitions||8
orm|1RM|أقصى وزن لمرة واحدة|one-rep max|kg|76
hangT|t|زمن الطيران|hang time|s|0.5
jumpH|h|ارتفاع القفزة|jump height|m|0.31
Pwatt|P|القدرة|power|W|300
cad|cadence|سرعة التبديل|cadence|rpm|80
gratio|G|نسبة الترس|gear ratio||3
chainF|N_f|أسنان الترس الأمامي|front chainring teeth||48
chainR|N_r|أسنان الترس الخلفي|rear sprocket teeth||16
wdia|D|قطر العجلة|wheel diameter|m|0.7
pmaxw|P_max|أعلى قدرة|peak power|W|900
pminw|P_min|أقل قدرة|lowest power|W|600
pts|points|النقاط|points||240
games|games|عدد المباريات|games played||12
made|made|التسديدات الناجحة|shots made||45
att|attempts|عدد المحاولات|attempts||100
wins|wins|عدد الانتصارات|wins||8
# ---- health & nutrition
carb|C|الكربوهيدرات|carbohydrates|g|250
prot|P|البروتين|protein|g|80
fat|F|الدهون|fat|g|60
bmr|BMR|معدل الأيض الأساسي|basal metabolic rate|kcal/day|1600
actf|AF|معامل النشاط|activity factor||1.55
tdee|TDEE|الطاقة اليومية الكلية|total daily energy expenditure|kcal/day|2480
waist|waist|محيط الخصر|waist circumference|cm|80
hip|hip|محيط الورك|hip circumference|cm|100
cycles|n|عدد دورات النوم|sleep cycles||5
caf0|C₀|الكافيين في البداية|initial caffeine|mg|200
cafT|C|الكافيين المتبقي|caffeine remaining|mg|100
hrs|t|الزمن|time|h|5
steps|steps|عدد الخطوات|number of steps||8000
stride|L|طول الخطوة|stride length|m|0.7
dkcal|ΔE|فرق السعرات|calorie surplus or deficit|kcal|7700
dwt|Δm|تغير الوزن|change in body mass|kg|1
sugar|sugar|السكر|sugar|g|40
tsp|tsp|ملاعق صغيرة|teaspoons||10
per100|x₁₀₀|القيمة لكل 100 غرام|value per 100 g||20
grams|m|كمية الأكل|portion|g|150
dvn|DV|القيمة اليومية الموصى بها|daily value||2000
amt|x|الكمية|amount||300
gi|GI|المؤشر الجلايسيمي|glycaemic index||70
gl|GL|الحمل الجلايسيمي|glycaemic load||21
mpre|m₁|الوزن قبل التمرين|mass before exercise|kg|70
mpost|m₂|الوزن بعد التمرين|mass after exercise|kg|69.4
drink|V|السوائل المشروبة|fluid drunk|L|0.5
sweat|S|معدل التعرق|sweat rate|L/h|1.1
snel1|d₁|مسافة الاختبار|test distance|m|6
snel2|d₂|مسافة قراءة الحرف عند النظر الطبيعي|normal-vision distance for that line|m|6
acu|VA|حدة الإبصار|visual acuity||1
dBA|L|مستوى الضجيج|noise level|dB|85
thr|T|الزمن المسموح|allowed exposure time|h|8
# ---- kitchen
srv1|s₁|حصص الوصفة|recipe servings||4
srv2|s₂|الحصص المطلوبة|servings needed||6
q1k|x₁|الكمية في الوصفة|amount in recipe|g|200
q2k|x₂|الكمية الجديدة|new amount|g|300
flour|flour|الطحين|flour|g|500
ingr|x|المكوّن|ingredient|g|10
water|water|الماء|water|g|350
mw|m|كتلة الماء|mass of water|kg|1
pkettle|P|قدرة الغلاية|kettle power|W|2000
t1k|t₁|الزمن بالقدرة الأولى|time at power 1|s|120
p1k|P₁|القدرة الأولى|power 1|W|800
p2k|P₂|القدرة الثانية|power 2|W|1000
salt|salt|الملح|salt|g|50
coffee|coffee|البن|ground coffee|g|15
brew|r|نسبة التحضير|brew ratio||16
raw|m_raw|الوزن نيئًا|raw weight|g|1000
cooked|m_cook|الوزن مطبوخًا|cooked weight|g|700
usable|usable|الجزء الصالح للأكل|usable part|g|800
bought|bought|الكمية المشتراة|amount bought|g|1000
tcost|total|التكلفة الكلية|total cost|SAR|90
nsrv|n|عدد الحصص|servings||6
alt|h|الارتفاع عن سطح البحر|altitude|m|2000
tb|T_b|درجة الغليان|boiling point|°C|93.3
cups|cups|أكواب|cups||2
D1|D₁|قطر القالب الأصلي|original pan diameter|cm|20
D2|D₂|قطر القالب الجديد|new pan diameter|cm|24
pizzaD|D|قطر البيتزا|pizza diameter|cm|30
price|price|السعر|price|SAR|45
# ---- music & audio
key|n|رقم المفتاح في البيانو|piano key number||49
semis|s|عدد أنصاف النغمات|semitones||7
cents|cents|السنت|cents||702
bpm|BPM|الإيقاع|tempo|bpm|120
beat|t_b|زمن النبضة|beat duration|s|0.5
beats|b|عدد النبضات في الشطر|beats per bar||4
fret|n|رقم الدستان|fret number||12
Lsc|L|طول الوتر|scale length|cm|65
dfret|d|بعد الدستان عن الصامولة|distance from the nut|cm|32.5
L1|L₁|مستوى الصوت الأول|level 1|dB|80
L2|L₂|مستوى الصوت الثاني|level 2|dB|80
r1d|r₁|المسافة الأولى|distance 1|m|1
r2d|r₂|المسافة الثانية|distance 2|m|4
srate|f_s|معدل العينات|sample rate|Hz|44100
bdepth|bits|عمق البت|bit depth||16
chan|ch|عدد القنوات|channels||2
brate|bit rate|معدل البت|bit rate|kbit/s|1411
neckA|A|مساحة فتحة العنق|neck opening area|m²|3e-4
neckL|L|طول العنق|neck length|m|0.08
vcav|V|حجم التجويف|cavity volume|m³|7.5e-4
sabA|A|مساحة الامتصاص|absorption area|m² sabin|40
t60|T₆₀|زمن الصدى|reverberation time|s|1
# ---- cars & transport
fuelL|V|الوقود المستهلك|fuel used|L|40
kmpl|km/L|الكيلومترات لكل لتر|km per litre|km/L|12.5
l100|L/100 km|الاستهلاك لكل 100 كم|litres per 100 km|L|8
fprice|p|سعر اللتر|fuel price per litre|SAR|2.33
treact|t_r|زمن رد الفعل|reaction time|s|1.5
torq|τ|عزم المحرك|engine torque|N·m|250
erpm|N|سرعة المحرك|engine speed|rpm|4000
hp|hp|القدرة الحصانية|horsepower|hp|140
tireD|D|قطر الإطار|tyre diameter|m|0.65
kwh|E|الطاقة|energy|kWh|60
whkm|e|استهلاك الطاقة|energy use|Wh/km|160
kwc|P|قدرة الشاحن|charger power|kW|11
v1k|v₁|سرعة الذهاب|outbound speed|km/h|60
v2k|v₂|سرعة العودة|return speed|km/h|40
co2|CO₂|ثاني أكسيد الكربون|CO₂ emitted|kg|92
rhoa|ρ|كثافة الهواء|air density|kg/m³|1.2
vroom|V|حجم الغرفة|room volume|m³|200
CL|C_L|معامل الرفع|lift coefficient||1.2
Swing|S|مساحة الجناح|wing area|m²|16
Flift|L|قوة الرفع|lift force|N|14000
# ---- home
watt|P|قدرة الجهاز|appliance power|W|1500
hday|t|ساعات التشغيل|hours of use|h|8
tariff|price|سعر الكيلوواط ساعة|price per kWh|SAR|0.18
bill|bill|الفاتورة|bill|SAR|65
wold|P_old|قدرة اللمبة القديمة|old bulb power|W|60
wnew|P_new|قدرة اللمبة الجديدة|new bulb power|W|9
lumen|Φ|الإضاءة الكلية|luminous flux|lm|800
lux|E_v|شدة الإضاءة|illuminance|lux|200
eff|η_v|الكفاءة الضوئية|luminous efficacy|lm/W|89
wh|E|سعة البطارية|battery energy|Wh|50
mah|Q|سعة البطارية|battery capacity|mAh|5000
volt|V|جهد البطارية|battery voltage|V|3.7
ma|I|تيار الشحن|charging current|mA|2000
m3|V|كمية الماء|water used|m³|20
wprice|price|سعر المتر المكعب|price per m³|SAR|6
flow|Q|تدفق الدش|shower flow|L/min|9
litres|V|اللترات|litres|L|90
cover|k|تغطية الدهان|paint coverage|m²/L|10
paint|V|الدهان المطلوب|paint needed|L|4
tileA|a|مساحة البلاطة|tile area|m²|0.36
ntile|N|عدد القطع|number of pieces||28
psun|h_sun|ساعات الشمس الفعالة|peak sun hours|h|6
panelkw|P|قدرة اللوح|panel power|kW|0.4
npanel|N|عدد الألواح|number of panels||5
dkwh|E|الاستهلاك اليومي|daily use|kWh|12
btu|BTU/h|قدرة التبريد|cooling capacity|BTU/h|18000
`);

EQ.add('spt',`
السرعة المتوسطة للجري|Average running speed|v = d / t|kmh|dkm/(tmin/60)|dkm tmin|المسافة على الزمن بالساعات.|Distance over time in hours.
وتيرة الجري|Running pace|pace = t / d|paceM|tmin/dkm|tmin dkm|كم دقيقة تحتاج لكل كيلو.|Minutes needed for each kilometre.
زمن السباق من الوتيرة|Race time from pace|t = pace × d|tmin|paceM*dkm|paceM dkm|اعرف متى توصل خط النهاية.|Know when you will cross the finish line.
تحويل الوتيرة إلى سرعة|Pace to speed|v = 60 / pace|kmh|60/paceM|paceM|وتيرة 6 دقائق للكيلو = 10 كم/س.|A 6 min/km pace is 10 km/h.
السعرات المحروقة بالنشاط (MET)|Calories burned (MET)|E = MET × 3.5 × m × t / 200|kcal|mets*3.5*massKg*tmin/200|mets massKg tmin|MET يقيس شدة النشاط: المشي 3.5 والجري 8 تقريبًا.|MET measures intensity: walking ≈ 3.5, running ≈ 8.
أقصى نبض (تاناكا)|Maximum heart rate (Tanaka)|HR_max = 208 − 0.7 × age|hrmax|208-0.7*age|age|تقدير أدق قليلًا من 220 − العمر.|A slightly better estimate than 220 − age.
احتياطي النبض|Heart-rate reserve|HRR = HR_max − HR_rest|hrr|hrmax-hrrest|hrmax hrrest|المسافة بين نبض الراحة وأقصى نبض.|The gap between resting and maximum heart rate.
أقصى استهلاك للأكسجين (اختبار كوبر)|VO₂max (Cooper test)|VO₂max = (d − 504.9) / 44.73|vo2|(dm12-504.9)/44.73|dm12|اجرِ 12 دقيقة وقِس المسافة بالمتر.|Run for 12 minutes and measure the distance in metres.
أقصى وزن لمرة (إبلي)|One-rep max (Epley)|1RM = w (1 + r / 30)|orm|wkg*(1+reps/30)|wkg reps|تقدير أقصى وزن تقدر ترفعه مرة وحدة.|Estimates the most you could lift once.
أقصى وزن لمرة (برزيكي)|One-rep max (Brzycki)|1RM = w × 36 / (37 − r)|orm|wkg*36/(37-reps)|wkg reps|طريقة ثانية، أدق مع التكرارات القليلة.|Another method, best with few reps.
ارتفاع القفزة من زمن الطيران|Jump height from hang time|h = g t² / 8|jumpH|g*hangT*hangT/8|g hangT|نصف الزمن صعود ونصفه نزول.|Half the time going up, half coming down.
سرعة الإقلاع في القفز|Take-off speed of a jump|v = √(2 g h)|v|sqrt(2*g*jumpH)|g jumpH|السرعة اللازمة لتوصل هذا الارتفاع.|The speed needed to reach that height.
قدرة صعود الدرج|Stair-climbing power|P = m g h / t|Pwatt|massKg*g*h/t|massKg g h t|اصعد الدرج بسرعة واحسب قدرتك بالواط.|Run up stairs and work out your power in watts.
مدى رمية الكرة|Ball throw range|R = v² sin 2θ / g|R|v*v*sin(2*rad(th))/g|v th g|أبعد رمية عند زاوية 45° تقريبًا.|The longest throw is near 45°.
أقصى ارتفاع للكرة|Peak height of a ball|H = (v sin θ)² / (2g)|H|(v*sin(rad(th)))**2/(2*g)|v th g|كل ما زادت الزاوية زاد الارتفاع.|A steeper angle gives more height.
سرعة الكرة بعد الركلة|Ball speed after a kick|v = F Δt / m|v|F*dt/m|F dt m|الدفع (القوة × زمن التلامس) يغيّر الزخم.|Impulse (force × contact time) changes momentum.
الطاقة الحركية للكرة|Kinetic energy of a ball|Eₖ = ½ m v²|Ek|0.5*m*v*v|m v|ضاعف السرعة فتصير الطاقة أربعة أضعاف.|Double the speed and the energy is four times larger.
نسبة ترس الدراجة|Bicycle gear ratio|G = N_f / N_r|gratio|chainF/chainR|chainF chainR|كم لفة تلف العجلة مع كل لفة دواسة.|Wheel turns per pedal turn.
سرعة الدراجة من سرعة التبديل|Bike speed from cadence|v = cadence × G × πD / 60|v|cad*gratio*PI*wdia/60|cad gratio wdia|السرعة بالمتر في الثانية.|Speed in metres per second.
مؤشر التعب|Fatigue index|FI = (P_max − P_min) / P_max × 100|res|(pmaxw-pminw)/pmaxw*100|pmaxw pminw|كم نقصت القدرة خلال تمرين سريع.|How much power drops during a sprint test.
معدل النقاط في المباراة|Points per game|PPG = points / games|res|pts/games|pts games|متوسط بسيط لأداء اللاعب.|A simple average of a player’s scoring.
نسبة نجاح التسديد|Shooting percentage|% = made / attempts × 100|pct|made/att*100|made att|من كل 100 تسديدة، كم دخلت.|How many of every 100 shots go in.
نسبة الفوز|Win percentage|% = wins / games × 100|pct|wins/games*100|wins games|ترتيب الفرق في الدوري.|Used to rank teams in a league.
سرعة رأس المضرب|Racket-head speed|v = ω r|v|w*r|w r|المضرب الأطول يعطي سرعة أكبر بنفس الدوران.|A longer racket is faster at the same spin.
مقاومة الماء على السبّاح|Water drag on a swimmer|F = ½ ρ C A v²|Fd|0.5*rho*Cd*Ar*v*v|rho Cd Ar v|ليه السبّاحين يحاولون يصيرون انسيابيين.|Why swimmers try to be streamlined.
طاقة المشي لكل كيلو|Energy of walking per km|E ≈ 0.5 × m × d|kcal|0.5*massKg*dkm|massKg dkm|تقريب: نصف سعرة لكل كيلوغرام لكل كيلومتر.|Rule of thumb: about 0.5 kcal per kg per km.
طاقة الجري لكل كيلو|Energy of running per km|E ≈ 1 × m × d|kcal|massKg*dkm|massKg dkm|تقريب: سعرة لكل كيلوغرام لكل كيلومتر.|Rule of thumb: about 1 kcal per kg per km.
`);

EQ.add('hlt',`
السعرات من العناصر الغذائية|Calories from macronutrients|E = 4C + 4P + 9F|kcal|4*carb+4*prot+9*fat|carb prot fat|غرام الدهون فيه سعرات أكثر من ضعف غرام السكر.|A gram of fat has more than twice the calories of a gram of carbs.
نسبة سعرات البروتين|Share of calories from protein|% = 4P / E × 100|pct|4*prot/kcal*100|prot kcal|كم من طاقتك اليومية جاية من البروتين.|How much of your energy comes from protein.
نسبة سعرات الدهون|Share of calories from fat|% = 9F / E × 100|pct|9*fat/kcal*100|fat kcal|نسبة الدهون من مجموع السعرات.|Fat’s share of total calories.
الطاقة اليومية الكلية|Total daily energy expenditure|TDEE = BMR × AF|tdee|bmr*actf|bmr actf|معامل النشاط من 1.2 (قليل) إلى 1.9 (نشيط جدًا).|Activity factor runs from 1.2 (sedentary) to 1.9 (very active).
احتياج البروتين التقريبي|Approximate protein need|P = 0.8 × m|prot|0.8*massKg|massKg|التوصية العامة للبالغين: 0.8 غرام لكل كيلو.|The general adult guideline is 0.8 g per kg.
نسبة الخصر إلى الطول|Waist-to-height ratio|WHtR = waist / height|ratio|waist/hcm|waist hcm|مؤشر بسيط؛ أقل من 0.5 يعتبر جيدًا عادة.|A simple index; under 0.5 is usually considered healthy.
نسبة الخصر إلى الورك|Waist-to-hip ratio|WHR = waist / hip|ratio|waist/hip|waist hip|توزيع الدهون في الجسم.|How body fat is distributed.
وقت الاستيقاظ بدورات النوم|Sleep time by cycles|t = n × 90 min|tmin|cycles*90|cycles|الدورة الواحدة حوالي 90 دقيقة.|One sleep cycle is about 90 minutes.
الكافيين المتبقي في الجسم|Caffeine left in the body|C = C₀ (½)^(t/5)|cafT|caf0*pow(0.5,hrs/5)|caf0 hrs|نصف عمر الكافيين حوالي 5 ساعات.|Caffeine’s half-life is about 5 hours.
المسافة من الخطوات|Distance from steps|d = steps × L / 1000|dkm|steps*stride/1000|steps stride|حوّل عدد خطواتك إلى كيلومترات.|Turn your step count into kilometres.
طول الخطوة التقريبي|Approximate stride length|L ≈ 0.415 × height|stride|0.415*hgt|hgt|تقريب من طولك بالمتر.|An estimate from your height in metres.
تغير الوزن من فرق السعرات|Weight change from a calorie gap|Δm ≈ ΔE / 7700|dwt|dkcal/7700|dkcal|تقريب: 7700 سعرة ≈ كيلو دهون.|Rule of thumb: 7700 kcal ≈ 1 kg of fat.
السكر بالملاعق الصغيرة|Sugar in teaspoons|tsp = sugar / 4|tsp|sugar/4|sugar|الملعقة الصغيرة ≈ 4 غرامات سكر.|One teaspoon ≈ 4 g of sugar.
قراءة الملصق الغذائي للحصة|Nutrition label for a portion|x = x₁₀₀ × m / 100|amt|per100*grams/100|per100 grams|الملصق مكتوب لكل 100 غرام، وأنت تاكل كمية ثانية.|Labels are per 100 g; your portion is different.
نسبة القيمة اليومية|Percent daily value|%DV = x / DV × 100|pct|amt/dvn*100|amt dvn|كم تغطي الحصة من احتياجك اليومي.|How much of a daily need one serving covers.
الحمل الجلايسيمي|Glycaemic load|GL = GI × C / 100|gl|gi*carb/100|gi carb|يجمع نوع السكر وكميته معًا.|Combines the type and the amount of carbohydrate.
معدل التعرق|Sweat rate|S = (m₁ − m₂ + V) / t|sweat|(mpre-mpost+drink)/hrs|mpre mpost drink hrs|اوزن نفسك قبل وبعد التمرين لتعرف كم تشرب.|Weigh yourself before and after exercise to know how much to drink.
حدة الإبصار (سنيلن)|Visual acuity (Snellen)|VA = d₁ / d₂|acu|snel1/snel2|snel1 snel2|6/6 تعني نظرًا طبيعيًا.|6/6 means normal vision.
الزمن الآمن للضجيج|Safe noise-exposure time|T = 8 / 2^((L − 85)/3)|thr|8/pow(2,(dBA-85)/3)|dBA|كل زيادة 3 ديسيبل تنصّف الوقت الآمن.|Every extra 3 dB halves the safe time.
`);

EQ.add('ckn',`
تكبير الوصفة|Scaling a recipe|x₂ = x₁ × s₂ / s₁|q2k|q1k*srv2/srv1|q1k srv1 srv2|كل المقادير تتضاعف بنفس النسبة.|Every ingredient scales by the same factor.
نسبة الخبّاز|Baker’s percentage|% = ingredient / flour × 100|pct|ingr/flour*100|ingr flour|كل مكوّن ينحسب نسبة من الطحين.|Each ingredient is a percentage of the flour.
ترطيب العجين|Dough hydration|% = water / flour × 100|pct|water/flour*100|water flour|عجين البيتزا حوالي 60–70%.|Pizza dough is about 60–70%.
الطاقة لتسخين ماء الشاي|Energy to heat water for tea|Q = m × 4186 × ΔT|Qh|mw*4186*dT|mw dT|4186 جول تسخّن كيلو ماء درجة وحدة.|4186 J warm 1 kg of water by one degree.
زمن غلي الماء في الغلاية|Kettle boiling time|t = m × 4186 × ΔT / P|t|mw*4186*dT/pkettle|mw dT pkettle|الغلاية الأقوى تغلي أسرع.|A more powerful kettle boils faster.
تحويل زمن المايكرويف|Converting microwave time|t₂ = t₁ × P₁ / P₂|t|t1k*p1k/p2k|t1k p1k p2k|الوصفة مكتوبة لقدرة غير قدرة جهازك.|The recipe was written for a different power.
نسبة الملح في المحلول|Brine strength|% = salt / (salt + water) × 100|pct|salt/(salt+water)*100|salt water|للتخليل والتتبيل.|For pickling and brining.
كمية ماء القهوة|Coffee brewing water|water = coffee × r|water|coffee*brew|coffee brew|النسبة الشائعة 1 إلى 16.|A common ratio is 1 to 16.
فقد الوزن بالطبخ|Cooking loss|% = (m_raw − m_cook) / m_raw × 100|pct|(raw-cooked)/raw*100|raw cooked|اللحم يخسر ماء وهو ينطبخ.|Meat loses water as it cooks.
نسبة الجزء الصالح|Edible yield|% = usable / bought × 100|pct|usable/bought*100|usable bought|بعد التقشير والتنظيف.|After peeling and trimming.
تكلفة الحصة|Cost per serving|cost = total / n|cost|tcost/nsrv|tcost nsrv|اعرف كم تكلفك كل حصة.|Know what each serving costs.
نسبة تكلفة الطعام|Food-cost percentage|% = cost / price × 100|pct|cost/price*100|cost price|يستخدمها المطاعم لتسعير الأطباق.|Restaurants use it to price dishes.
درجة الغليان في المرتفعات|Boiling point at altitude|T_b ≈ 100 − h / 300|tb|100-alt/300|alt|تقريبًا درجة أقل لكل 300 متر.|About one degree lower per 300 m.
من الأكواب إلى الغرامات|Cups to grams|m = cups × 240 × ρ|mass|cups*240*dens|cups dens|الكوب 240 مل، والكثافة تختلف من مكوّن لثاني.|A cup is 240 mL; density changes by ingredient.
تحويل حجم القالب|Changing the cake-pan size|k = (D₂ / D₁)²|ratio|(D2/D1)**2|D1 D2|المساحة تكبر بمربع القطر.|Area grows with the square of the diameter.
سعر البيتزا لكل سنتيمتر مربع|Pizza price per square centimetre|price / (π (D/2)²)|res|price/(PI*(pizzaD/2)**2)|price pizzaD|البيتزا الكبيرة غالبًا أوفر.|A large pizza is often better value.
`);

EQ.add('mus',`
تردد نوتة البيانو|Piano note frequency|f = 440 × 2^((n − 49)/12)|f|440*pow(2,(key-49)/12)|key|المفتاح 49 هو نوتة لا (A4) = 440 هرتز.|Key 49 is A4 = 440 Hz.
النقل بأنصاف النغمات|Transposing by semitones|f₂ = f₁ × 2^(s/12)|f2|f1*pow(2,semis/12)|f1 semis|12 نصف نغمة = أوكتاف كامل.|12 semitones make a full octave.
الأوكتاف|The octave|f₂ = 2 f₁|f2|2*f1|f1|نفس النوتة لكن أعلى.|The same note, only higher.
الفرق بالسنت|Interval in cents|cents = 1200 log₂(f₂ / f₁)|cents|1200*log2(f2/f1)|f1 f2|الأوكتاف = 1200 سنت.|An octave is 1200 cents.
زمن النبضة من الإيقاع|Beat length from tempo|t = 60 / BPM|beat|60/bpm|bpm|120 نبضة في الدقيقة = نصف ثانية للنبضة.|120 bpm is half a second per beat.
طول الشطر الموسيقي|Length of a bar|t = beats × 60 / BPM|t|beats*60/bpm|beats bpm|كم ثانية يستمر الشطر.|How many seconds one bar lasts.
مكان الدستان على الجيتار|Guitar fret position|d = L (1 − 2^(−n/12))|dfret|Lsc*(1-pow(2,-fret/12))|Lsc fret|الدستان 12 في منتصف الوتر بالضبط.|Fret 12 sits exactly halfway along the string.
تردد الناي المفتوح|Open-pipe (flute) pitch|f = v / (2L)|f|vsnd/(2*Lstr)|vsnd Lstr|الأنبوب الأطول صوته أغلظ.|A longer pipe sounds lower.
تردد الأنبوب المغلق|Closed-pipe (clarinet) pitch|f = v / (4L)|f|vsnd/(4*Lstr)|vsnd Lstr|المغلق أغلظ بأوكتاف من المفتوح بنفس الطول.|A closed pipe is an octave lower than an open one of the same length.
جمع صوتين|Adding two sound levels|L = 10 log₁₀(10^(L₁/10) + 10^(L₂/10))|beta|10*log10(pow(10,L1/10)+pow(10,L2/10))|L1 L2|صوتان متساويان يزيدان 3 ديسيبل فقط.|Two equal sounds add only 3 dB.
نقص الصوت مع البعد|Sound fading with distance|L₂ = L₁ − 20 log₁₀(r₂ / r₁)|L2|L1-20*log10(r2d/r1d)|L1 r1d r2d|ضاعف المسافة يقل الصوت 6 ديسيبل.|Doubling the distance drops the level by 6 dB.
طول موجة النوتة|Wavelength of a note|λ = v / f|lam|vsnd/f|vsnd f|النوتات المنخفضة موجاتها طويلة جدًا.|Low notes have very long waves.
معدل البت للصوت|Audio bit rate|bit rate = f_s × bits × ch / 1000|brate|srate*bdepth*chan/1000|srate bdepth chan|جودة الأسطوانة: 1411 كيلوبت في الثانية.|CD quality is 1411 kbit/s.
حجم ملف الصوت|Audio file size|size = bit rate × t × 60 / 8000|fsize|brate*tmin*60/8000|brate tmin|t بالدقائق، والناتج بالميغابايت.|t in minutes; result in megabytes.
رنين القارورة (هلمهولتز)|Bottle resonance (Helmholtz)|f = (v / 2π) √(A / (V L))|f|vsnd/(2*PI)*sqrt(neckA/(vcav*neckL))|vsnd neckA vcav neckL|ليه القارورة تصفّر إذا نفخت فوقها.|Why a bottle hums when you blow across it.
زمن الصدى في الغرفة (سابين)|Room reverberation time (Sabine)|T₆₀ = 0.161 V / A|t60|0.161*vroom/sabA|vroom sabA|القاعات الكبيرة صداها أطول.|Big halls echo for longer.
`);

EQ.add('car',`
استهلاك الوقود لكل 100 كم|Fuel use per 100 km|L/100 km = V / d × 100|l100|fuelL/dkm*100|fuelL dkm|الرقم الأقل يعني سيارة أوفر.|A lower number means a more efficient car.
كيلومترات لكل لتر|Kilometres per litre|km/L = d / V|kmpl|dkm/fuelL|dkm fuelL|كم تمشي السيارة باللتر الواحد.|How far the car goes on one litre.
تكلفة وقود الرحلة|Trip fuel cost|cost = d / (km/L) × p|cost|dkm/kmpl*fprice|dkm kmpl fprice|قبل السفر احسب البنزين.|Work out the petrol before a road trip.
مسافة رد الفعل|Reaction distance|d = v t_r|d|kmh/3.6*treact|kmh treact|السيارة تمشي وأنت لسا ما ضغطت الفرامل.|The car keeps moving before you even brake.
مسافة الفرملة|Braking distance|d = v² / (2 μ g)|d|(kmh/3.6)**2/(2*mu*g)|kmh mu g|ضاعف السرعة تصير المسافة 4 أضعاف.|Double the speed and braking distance quadruples.
مسافة التوقف الكلية|Total stopping distance|d = v t_r + v² / (2 μ g)|d|kmh/3.6*treact+(kmh/3.6)**2/(2*mu*g)|kmh treact mu g|رد الفعل + الفرملة.|Reaction plus braking.
مسافة الثانيتين|Two-second following distance|d = v × 2|d|kmh/3.6*2|kmh|اترك ثانيتين بينك وبين السيارة اللي قدامك.|Keep two seconds behind the car in front.
زمن الرحلة|Journey time|t = d / v × 60|tmin|dkm/kmh*60|dkm kmh|بالدقائق.|In minutes.
متوسط سرعة الذهاب والعودة|Average speed for a round trip|v = 2 v₁ v₂ / (v₁ + v₂)|kmh|2*v1k*v2k/(v1k+v2k)|v1k v2k|ليس المتوسط العادي!|Not the simple average!
قدرة محرك السيارة من العزم|Car engine power from torque|P = 2π N τ / 60|P|2*PI*erpm*torq/60|erpm torq|بالواط.|In watts.
تحويل الواط إلى حصان|Watts to horsepower|hp = P / 745.7|hp|P/745.7|P|الحصان الميكانيكي = 745.7 واط.|One mechanical horsepower is 745.7 W.
دورات العجلة من السرعة|Wheel rpm from speed|rpm = v / (πD) × 60|rpm|kmh/3.6/(PI*tireD)*60|kmh tireD|كم لفة تلف العجلة في الدقيقة.|How many turns the wheel makes per minute.
مدى السيارة الكهربائية|Electric-car range|range = E × 1000 / e|dkm|kwh*1000/whkm|kwh whkm|سعة البطارية على الاستهلاك.|Battery size divided by energy use.
زمن شحن السيارة الكهربائية|EV charging time|t = E / P|hrs|kwh/kwc|kwh kwc|تقريب بدون فقد الشحن.|An estimate ignoring charging losses.
أقصى سرعة في المنعطف|Maximum cornering speed|v = √(μ g r)|v|sqrt(mu*g*r)|mu g r|الطريق المبلول يقلل μ فتقل السرعة الآمنة.|A wet road lowers μ and the safe speed.
ثاني أكسيد الكربون من البنزين|CO₂ from petrol|CO₂ ≈ 2.31 × V|co2|2.31*fuelL|fuelL|كل لتر بنزين يطلع حوالي 2.3 كغ CO₂.|Each litre of petrol releases about 2.3 kg of CO₂.
قوة رفع الطائرة|Aircraft lift|L = ½ ρ v² S C_L|Flift|0.5*rhoa*v*v*Swing*CL|rhoa v Swing CL|الطائرة تطير لما الرفع يغلب الوزن.|A plane flies when lift beats weight.
`);

EQ.add('hom',`
استهلاك الجهاز بالكيلوواط ساعة|Appliance energy in kWh|E = P × t / 1000|kwh|watt*hday/1000|watt hday|الواط × الساعات ÷ 1000.|Watts × hours ÷ 1000.
تكلفة تشغيل الجهاز|Running cost of an appliance|cost = P × t / 1000 × price|cost|watt*hday/1000*tariff|watt hday tariff|اعرف أي جهاز يرفع الفاتورة.|Find out which appliance raises the bill.
تكلفة الجهاز في الشهر|Monthly appliance cost|bill = P × t × 30 / 1000 × price|bill|watt*hday*30/1000*tariff|watt hday tariff|تشغيل يومي لمدة شهر.|Daily use for a month.
التيار الذي يسحبه الجهاز|Current drawn by an appliance|I = P / V|Iamp|watt/Vv|watt Vv|يساعد تختار الفيوز أو التمديد المناسب.|Helps pick the right fuse or extension.
توفير اللمبات الموفرة|Savings from LED bulbs|saving = (P_old − P_new) × t / 1000 × price|cost|(wold-wnew)*hday/1000*tariff|wold wnew hday tariff|التوفير اليومي للمبة وحدة.|Daily saving for one bulb.
الكفاءة الضوئية|Luminous efficacy|η = Φ / P|eff|lumen/wnew|lumen wnew|كم لومن تعطي كل واط.|Lumens per watt.
شدة إضاءة الغرفة|Room illuminance|E = Φ / A|lux|lumen/Ar|lumen Ar|المكتب يحتاج حوالي 300–500 لوكس.|A desk needs about 300–500 lux.
زمن تشغيل البطارية|Battery run time|t = E / P|hrs|wh/watt|wh watt|كم ساعة يشتغل الجهاز على البطارية.|How long a device runs on a battery.
سعة الباور بانك بالواط ساعة|Power-bank energy|E = Q × V / 1000|wh|mah*volt/1000|mah volt|الطيران يسمح عادة حتى 100 واط ساعة.|Airlines usually allow up to 100 Wh.
زمن شحن الجوال|Phone charging time|t = Q / I|hrs|mah/ma|mah ma|تقريب بدون فقد.|An estimate ignoring losses.
فاتورة الماء|Water bill|bill = V × price|bill|m3*wprice|m3 wprice|كل متر مكعب = 1000 لتر.|One cubic metre is 1000 litres.
ماء الدش|Shower water use|V = Q × t|litres|flow*tmin|flow tmin|دش 10 دقائق ممكن يصرف 90 لتر.|A 10-minute shower can use 90 litres.
طاقة سخان الماء|Water-heater energy|E = V × 4186 × ΔT / 3.6×10⁶|kwh|litres*4186*dT/3.6e6|litres dT|كل لتر ماء ≈ كيلو.|Each litre of water ≈ 1 kg.
كمية الدهان|Paint needed|V = A / k|paint|Ar/cover|Ar cover|اضربها في 2 إذا بتدهن طبقتين.|Double it for two coats.
عدد البلاط|Number of tiles|N = A / a|ntile|Ar/tileA|Ar tileA|زِد 10% للقص والكسر.|Add 10% for cuts and breakage.
عدد الألواح الشمسية للبيت|Solar panels for a home|N = E / (P × h_sun)|npanel|dkwh/(panelkw*psun)|dkwh panelkw psun|استهلاكك اليومي على إنتاج اللوح.|Daily use divided by one panel’s output.
تحويل قدرة المكيف|Air-conditioner capacity|P = BTU/h × 0.293|P|btu*0.293|btu|المكيف 18000 وحدة ≈ 5.3 كيلوواط تبريد.|An 18,000 BTU/h unit is about 5.3 kW of cooling.
`);
